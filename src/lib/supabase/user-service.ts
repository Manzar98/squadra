"use client";

import { createClient } from "@/lib/supabase/auth/client";
import { runWithSpan } from "@/lib/api-client";

const supabase = createClient();

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  teamName: string;
  teamRole: string;
  emailConsent: boolean;
}

export async function validateReferralCode(code: string): Promise<string | null> {
  const { data } = await supabase
    .from("users-info")
    .select("referral_code")
    .eq("referral_code", code)
    .maybeSingle();

  return data?.referral_code === code ? code : null;
}

async function generateUniqueReferralCode(): Promise<string> {
  // Rare loop, will exit quickly in practice
  // Kept client-side to mirror current behavior; could be moved to an RPC for atomicity.
  // Ensures no collision in "users-info.referral_code".
  // Note: consider securing via Postgres unique index.
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

export async function signUpWithProfile(form: SignupFormData, referredBy: string | null) {
  const { email, password, name, teamName, teamRole, emailConsent } = form;

  return runWithSpan("User Signup", async () => {
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
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ email, password });
    if (signUpError) throw signUpError;

    const userId = signUpData.user?.id;
    if (!userId) throw new Error("User ID not returned");

    // 3. Generate referral code
    const referralCode = await generateUniqueReferralCode();

    // 4. Insert profile (since we know it doesn’t exist)
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

    const { error: insertError } = await supabase.from("users-info").insert(userPayload);
    if (insertError) throw insertError;

    return { userId, referralCode };
  }, { email });
}



