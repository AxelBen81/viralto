import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { YoutubeTranscript } from "youtube-transcript";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

function extractVideoId(url: string): string | null {
  const match = url.match(/(?:v=|youtu\.be\/|shorts\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

export async function POST(req: NextRequest) {
  const { transcript: url } = await req.json();

  if (!url) {
    return NextResponse.json({ error: "URL manquante" }, { status: 400 });
  }

  let transcriptText = url;

  try {
    const videoId = extractVideoId(url);
    if (videoId) {
      const transcript = await YoutubeTranscript.fetchTranscript(videoId);
      transcriptText = transcript.map((t) => t.text).join(" ");
    }
  } catch {
    console.log("Transcription impossible, utilisation de l'URL");
  }

  const prompt = `Tu es un expert en création de contenu pour les réseaux sociaux.
Voici la transcription d'une vidéo : ${transcriptText}

Génère un kit de contenu complet et original basé sur cette transcription.
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
