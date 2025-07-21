import { NextRequest, NextResponse } from 'next/server'
import SibApiV3Sdk from 'sib-api-v3-sdk'


export async function POST(req: NextRequest) {
  const body = await req.json()
  const { toEmail, toName, params } = body

  const defaultClient = SibApiV3Sdk.ApiClient.instance
  defaultClient.authentications['api-key'].apiKey = process.env.BREVO_API_KEY

  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()

  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail({
    to: [{ email: toEmail, name: toName }],
    templateId: 2, // Replace with your template ID
    params: params,
    sender: { name: 'YourAppName', email: 'you@example.com' },
  })

  try {
    const response = await apiInstance.sendTransacEmail(sendSmtpEmail)
    return NextResponse.json({ success: true, data: response })
  } catch (error: any) {
    console.error('Brevo email error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
