import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { email, firstName } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Missing email" }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: "Viralto <onboarding@resend.dev>",
      to: email,
      subject: "Bienvenue sur Viralto 🚀",
      html: `
        <div style="background:#080B14;color:white;padding:48px;font-family:'Inter',sans-serif;max-width:600px;margin:0 auto;border-radius:16px;">
          <h1 style="font-size:32px;font-weight:600;margin-bottom:8px;">Bienvenue sur <span style="background:linear-gradient(135deg,#378ADD,#AFA9EC);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">Viralto</span> 🎉</h1>
          <p style="color:rgba(255,255,255,0.6);font-size:16px;line-height:1.7;margin-bottom:24px;">
            Salut ${firstName || ""},<br/><br/>
            Tu fais maintenant partie de Viralto — l'outil qui transforme tes vidéos en contenu viral en 30 secondes.
          </p>
          <p style="color:rgba(255,255,255,0.6);font-size:16px;line-height:1.7;margin-bottom:32px;">
            Tu as accès à <strong style="color:white;">3 générations gratuites</strong> ce mois-ci. Commence dès maintenant en collant un lien YouTube ou TikTok !
          </p>
          <a href="https://viralto.fr" style="background:linear-gradient(135deg,#378ADD,#534AB7);color:white;padding:14px 28px;border-radius:24px;text-decoration:none;font-weight:500;font-size:16px;">
            Commencer à générer →
          </a>
          <p style="color:rgba(255,255,255,0.3);font-size:13px;margin-top:48px;">
            Tu reçois cet email car tu viens de créer un compte sur Viralto.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
