"use server"

import { createClient } from '@/lib/supabase/auth/server'
import { sendEmail } from "@/lib/email/email"
import { revalidatePath } from 'next/cache';



export async function forgotPasswordAction({ email }: { email: string }) {
  try {
    const supabase = await createClient();
    
    // Generate password reset link
    const { data, error } = await supabase.auth.admin.generateLink({
      type: "recovery",
      email,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_REDIRECT_URL}/reset-password`,
      },
    });

    if (error) {
      console.log("Error generating reset link:", error);
      return { success: false, message: error.message };
    }

    const resetLink = data?.properties?.action_link;
    if (!resetLink) {
      return { success: false, message: "Could not generate reset link" };
    }

    // Styled HTML email
    const emailBody = `
      <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
        <h2 style="color:#2d3748;">Password Reset Request</h2>
        <p>Hello,</p>
        <p>You requested to reset your password. Click the button below to proceed:</p>
        <p style="text-align:center; margin: 30px 0;">
          <a href="${resetLink}" 
             style="background-color:#4f46e5; color:#fff; text-decoration:none; 
                    padding:12px 24px; border-radius:6px; font-weight:bold;">
             Reset Password
          </a>
        </p>
        <p>If the button above doesn’t work, copy and paste this link into your browser:</p>
        <p><a href="${resetLink}">${resetLink}</a></p>
        <hr />
        <p style="font-size:12px; color:#777;">If you did not request this, you can ignore this email.</p>
      </div>
    `;

    // Send via Resend
    await sendEmail(email, "Reset your password", emailBody);

    return { success: true };
  } catch (err: unknown) {
    return { success: false, message: err instanceof Error ? err.message : "An error occurred" };
  }
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath('/dashboard');
  revalidatePath('/dashboard/*');
  revalidatePath('/');
  revalidatePath('/login');
    // Optionally, you can return a value or redirect
  return;
}


export async function getLastSignInAt(email: string) {

  const supabase = await createClient();
  const userId = await getUserId(email);

  if (!userId) return null
  const { data, error } = await supabase.auth.admin.getUserById(userId)
  if (error) throw error
  return data.user.last_sign_in_at
}

const getUserId = async (email: string) => {

  const supabase = await createClient();
  const { data, error } = await supabase
  .from('users-info')
  .select('*')
  .eq('email', email)
  .single()
  return data?.user_id
}

