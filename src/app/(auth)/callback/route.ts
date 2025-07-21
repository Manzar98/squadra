import { NextResponse } from 'next/server'
// The client you created from the Server-Side Auth instructions
import { createSupabaseServerClient } from '../../../lib/supabase/client'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  let next = searchParams.get('next') ?? '/';

  if (!next.startsWith('/')) {
    next = '/';
  }

  if (code) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { error: upsertError } = await supabase
          .from('users-info')
          .upsert({
            user_id: user.id,
            email: user.email,
            name: user.user_metadata.full_name || user.user_metadata.name,
          }, {
            onConflict: 'user_id',
            ignoreDuplicates: true,
          });

        if (upsertError) {
          console.error('Error saving user info:', upsertError);
        }
      }

      const forwardedHost = request.headers.get('x-forwarded-host');
      const isLocalEnv = process.env.NODE_ENV === 'development';

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
}