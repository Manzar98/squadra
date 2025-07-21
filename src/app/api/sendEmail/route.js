import axios from 'axios';


export async function POST(req) {
    
  const { email, subject, body } = await req.json();
  console.log('Received email data:', process.env.RESEND_API_KEY);

  // Input validation
  if (!email || !subject || !body) {
    return new Response(
      JSON.stringify({ error: 'Missing required fields' }),
      { status: 400 }
    );
  }

  try {
    // Resend API call to send email
    const response = await axios.post(
      'https://api.resend.com/emails',
      {
        from: 'manzarnouman@gmail.com', // Replace with your verified Resend email
        to: email,
        subject: subject,
        html: body, // HTML email content
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`, // API Key from environment variable
        },
      }
    );

    // Return success response
    return new Response(
      JSON.stringify({ message: 'Email sent successfully!', response: response.data }),
      { status: 200 }
    );
  } catch (error) {
    // Handle any errors
    return new Response(
      JSON.stringify({ error: 'Failed to send email', details: error.message }),
      { status: 500 }
    );
  }
}
