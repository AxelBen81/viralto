import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  const { transcript } = await req.json();

  if (!transcript) {
    return NextResponse.json({ error: "Transcript manquant" }, { status: 400 });
  }

  const prompt = `Tu es un expert en création de contenu pour les réseaux sociaux. 
À partir de cette transcription vidéo, génère un kit de contenu complet.

TRANSCRIPTION :
${transcript}

Génère exactement ce JSON (sans markdown, sans backticks) :
{
  "caption": "Une caption Instagram avec emojis, hook accrocheur, corps du message et call-to-action",
  "tiktok": "Un script TikTok avec [0-3s] hook, [3-15s] développement, [15-25s] solution, [25-30s] CTA",
  "thread": "Un thread X de 5 tweets numérotés 1/ 2/ 3/ 4/ 5/",
  "email": "Un email newsletter avec objet et corps du message"
}`;

  const message = await client.messages.create({
    model: "claude-opus-4-5",
    max_tokens: 2000,
    messages: [{ role: "user", content: prompt }],
  });

  const content = message.content[0];
  if (content.type !== "text") {
    return NextResponse.json({ error: "Erreur IA" }, { status: 500 });
  }

  try {
    const result = JSON.parse(content.text);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Erreur parsing" }, { status: 500 });
  }
}

