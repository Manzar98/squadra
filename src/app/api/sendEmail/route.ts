// app/api/send-email/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { withErrorHandler } from "../../../lib/api-handler";

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmailHandler(req: Request) {
  const body = await req.json();

  const to = body.email;
  const subject = body.subject;
  const html = body.body;

  const data = await resend.emails.send({
    from: `Team Squadra <${process.env.NEXT_PUBLIC_EMAIL}>`,
    to,
    subject,
    html,
  });

  return NextResponse.json({ success: true, data });
}

export const POST = withErrorHandler(sendEmailHandler, "/api/send-email");
