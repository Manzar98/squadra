import { NextResponse } from "next/server";
import { createClient } from "../../../lib/supabase/auth/client";
import { withErrorHandler } from "../../../lib/api-handler";

export const GET = withErrorHandler(async (request: Request) => {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  let next = searchParams.get("next") ?? "/";

  if (!next.startsWith("/")) {
    next = "/";
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { error: upsertError } = await supabase
          .from("users-info")
          .upsert(
            {
              user_id: user.id,
              email: user.email,
              name: user.user_metadata.full_name || user.user_metadata.name,
            },
            {
              onConflict: "user_id",
              ignoreDuplicates: true,
            }
          );

        if (upsertError) {
          // Will be caught by withErrorHandler and sent to Sentry
          throw upsertError;
        }
      }

      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";

      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}, "auth/callback");
