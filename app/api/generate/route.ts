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
  const { transcript: url, isPro } = await req.json();

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

  const proFormatsPrompt = isPro ? `,"hashtags":"Un pack de 30 hashtags optimisés groupés par catégorie : niche (10), tendance (10), large audience (10). Format : #hashtag séparés par des espaces","story":"Un script Story Instagram de 5 slides : Slide 1: [accroche] Slide 2: [problème] Slide 3: [solution] Slide 4: [preuve] Slide 5: [CTA]"` : "";

  const prompt = `Tu es un expert en création de contenu pour les réseaux sociaux.
Voici la transcription d'une vidéo : "${transcriptText}"

IMPORTANT : Le contenu que tu génères doit être DIRECTEMENT basé sur cette transcription. Utilise les mêmes sujets, exemples, anecdotes et messages clés de la vidéo. Ne génère PAS de contenu générique.

Réponds UNIQUEMENT avec ce JSON exact, sans backticks, sans markdown :
{"caption":"Caption Instagram basée sur le contenu exact de la vidéo avec emojis hook accrocheur corps du message et call-to-action","tiktok":"Script TikTok basé sur le contenu exact de la vidéo avec [0-3s] hook [3-15s] développement [15-25s] solution [25-30s] CTA","thread":"Thread X de 5 tweets basés sur le contenu exact de la vidéo numérotés 1/ 2/ 3/ 4/ 5/","email":"Email newsletter basé sur le contenu exact de la vidéo avec objet et corps du message"${proFormatsPrompt}}`;

  try {
    const message = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 3000,
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
