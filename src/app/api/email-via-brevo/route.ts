import { NextRequest, NextResponse } from "next/server";
import Brevo from "@getbrevo/brevo";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { toEmail, toName, params } = body;

  const apiInstance = new Brevo.TransactionalEmailsApi();
  apiInstance.setApiKey(
    Brevo.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY as string
  );

  const sendSmtpEmail = new Brevo.SendSmtpEmail();
  sendSmtpEmail.to = [{ email: toEmail, name: toName }];
  sendSmtpEmail.templateId = 2;
  sendSmtpEmail.params = params;
  sendSmtpEmail.sender = { name: "YourAppName", email: "you@example.com" };

  try {
    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    return NextResponse.json({ success: true, data: response });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Brevo email error:", error.message);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }
    console.error("Brevo email unknown error:", error);
    return NextResponse.json(
      { success: false, error: "Unknown error" },
      { status: 500 }
    );
  }
}
