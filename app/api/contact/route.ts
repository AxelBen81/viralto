import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: "Viralto <contact@viralto.fr>",
      to: "contact@viralto.fr",
      subject: `Nouveau message de ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
          <h2>Nouveau message de contact</h2>
          <p><strong>Prénom :</strong> ${name}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Message :</strong></p>
          <p style="background: #f5f5f5; padding: 16px; border-radius: 8px;">${message}</p>
        </div>
      `,
      replyTo: email,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
