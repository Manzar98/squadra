// lib/email.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(email: string, subject: string, replyTo?: string, body?: string) {
  console.log("Sending email to:", email);
  return await resend.emails.send({
    from: `Team Squadra <${process.env.NEXT_PUBLIC_EMAIL}>`,
    to: email,
    subject,
    html: `<p>${body}</p>`,
    ...(replyTo ? { replyTo } : {}),
  });

}
