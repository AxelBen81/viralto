import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  const { transcript } = await req.json();

  if (!transcript) {
    return NextResponse.json({ error: "URL manquante" }, { status: 400 });
  }

  const prompt = `Tu es un expert en création de contenu pour les réseaux sociaux.
L'utilisateur t'a fourni ce lien vidéo : ${transcript}

Génère un kit de contenu complet et original pour cette vidéo.
Réponds UNIQUEMENT avec ce JSON exact, sans backticks, sans markdown :
{"caption":"Une caption Instagram originale avec emojis hook accrocheur corps du message et call-to-action","tiktok":"Un script TikTok avec [0-3s] hook [3-15s] développement [15-25s] solution [25-30s] CTA","thread":"Un thread X de 5 tweets numérotés 1/ 2/ 3/ 4/ 5/","email":"Un email newsletter complet avec objet et corps du message"}`;

  try {
    const message = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 2000,
      messages: [{ role: "user", content: prompt }],
    });

    const content = message.content[0];
    if (content.type !== "text") {
      return NextResponse.json({ error: "Erreur IA" }, { status: 500 });
    }

    const cleaned = content.text.replace(/```json|```/g, "").trim();
    const result = JSON.parse(cleaned);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Erreur generate:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
    return NextResponse.json({ error: "Erreur parsing" }, { status: 500 });
  }
}

