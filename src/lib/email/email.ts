// lib/email.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(
  email: string,
  subject: string,
  body: string,      // HTML content
  replyTo?: string   // optional reply-to email
) {
  const fromEmail = process.env.RESEND_EMAIL ?? "";

  // console.log("📧 Preparing email:", { from: fromEmail, to: email, subject, replyTo });

  if (!fromEmail || fromEmail.length > 320) {
    throw new Error("Invalid sender email address");
  }

  if (!email || email.length > 320) {
    throw new Error("Invalid recipient email address");
  }

  try {
    const response = await resend.emails.send({
      from: `Team Squadra <${fromEmail}>`,
      to: email,
      subject,
      html: body, // ✅ email body goes here
      ...(replyTo ? { replyTo } : {}),
    });

    console.log("✅ Email sent successfully:", response);
    return response;
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    throw error;
  }
}



