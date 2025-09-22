"use server";

import { createClient } from "@/lib/supabase/auth/server";
import { runWithSpan } from "@/lib/api-client";
import { CaputureMomentOfFlow, RegisterFormData } from "@/types";


export async function validateReferralCode(code: string): Promise<string | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("users-info")
    .select("referral_code")
    .eq("referral_code", code)
    .maybeSingle();

  return data?.referral_code === code ? code : null;
}

async function generateUniqueReferralCode(): Promise<string> {
  const supabase = await createClient();
  while (true) {
    const candidate = Math.random().toString(36).substring(2, 8).toUpperCase();
    const { data } = await supabase
      .from("users-info")
      .select("id")
      .eq("referral_code", candidate)
      .maybeSingle();
    if (!data) return candidate;
  }
}

export async function signUpWithProfile(
  form: RegisterFormData,
  referredBy: string | null
) {
  const supabase = await createClient();
  const { email, password, name, teamName, teamRole, emailConsent } = form;

  try {
    return await runWithSpan(
      "User Signup",
      async () => {
        // 1. Check if user already exists before signup
        const { data: existingUserInfo, error: existingError } = await supabase
          .from("users-info")
          .select("id")
          .eq("email", email)
          .maybeSingle();

        if (existingError) throw existingError;
        if (existingUserInfo) {
          throw new Error("User already registered with this email.");
        }

        // 2. Sign up user in Supabase Auth
        const { data: signUpData, error: signUpError } =
          await supabase.auth.signUp({ email, password });

        if (signUpError) throw signUpError;

        const userId = signUpData.user?.id;
        if (!userId) throw new Error("User ID not returned");

        // 3. Generate referral code
        const referralCode = await generateUniqueReferralCode();

        // 4. Insert profile
        const userPayload = {
          user_id: userId,
          email,
          name,
          team_name: teamName,
          team_role: teamRole,
          email_consent: emailConsent,
          referral_code: referralCode,
          referred_by: referredBy || null,
        } as const;

        const { error: insertError } = await supabase
          .from("users-info")
          .insert(userPayload);

        if (insertError) throw insertError;

        return { userId, referralCode };
      },
      { email }
    );
  } catch (error) {
    console.error("Signup failed:", error);
    // Re-throw if you want calling code to handle it
    throw error;
  }
}



export async function createCaputreMomentFlow(form: CaputureMomentOfFlow) {
  const supabase = await createClient();
  try {
    return await runWithSpan(
      "Add capture moment of flow",
      async () => {
        const momentFlow = {
          user_info_id: form.squadmateId,
          flow_zone_id: form.flowZoneId,
          show_your_reaction: form.reaction,
          personal_note: form.note,
          created_by: form.created_by,
        }

        const { error: insertError } = await supabase
        .from("moment-of-flow")
        .insert(momentFlow);

        if (insertError) throw insertError;
        return {success: true, msg: "Moment added"}

      }
    )
    
  } catch (error) {
    console.error("Add capture moment of flow failed:", error);
    // Re-throw if you want calling code to handle it
    throw error;
    
  }
}






