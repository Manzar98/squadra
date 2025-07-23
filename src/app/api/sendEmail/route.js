import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req) {
  const body = await req.json()
  // Accept both legacy and new keys for compatibility
  let  subject, html, to


    // fallback for legacy API
    to = body.email
    subject = body.subject
    html = body.body
  

  try {
    const data = await resend.emails.send({
      from: "Team Squadra <manzar.noman@deltacrontech.com>",
      to,
      subject,
      html,
    })

    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 })
  }
}
