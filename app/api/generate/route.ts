import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function getTranscript(url: string): Promise<{ text: string; error?: string }> {
  if (!url.includes("youtube.com") && !url.includes("youtu.be") && !url.includes("tiktok.com")) {
    return { text: "", error: "Lien invalide. Utilise un lien YouTube ou TikTok." };
  }

  try {
    const res = await fetch(`https://api.supadata.ai/v1/transcript?url=${encodeURIComponent(url)}&text=true`, {
      headers: {
        "x-api-key": process.env.SUPADATA_API_KEY!,
      },
    });
    const data = await res.json();
    if (data.content) return { text: data.content };
    return { text: "", error: "Impossible de récupérer la transcription. La vidéo est peut-être privée ou sans sous-titres." };
  } catch {
    return { text: "", error: "Erreur lors de la transcription. Réessaie." };
  }
}

export async function POST(req: NextRequest) {
  const { transcript: url, isPro } = await req.json();

  if (!url) {
    return NextResponse.json({ error: "URL manquante" }, { status: 400 });
  }

  const transcriptResult = await getTranscript(url);
  if (transcriptResult.error) {
    return NextResponse.json({ error: transcriptResult.error }, { status: 400 });
  }
  const transcriptText = transcriptResult.text;

  const proFormatsPrompt = isPro ? `,"hashtags":"Un pack de 30 hashtags optimisés groupés par catégorie : niche (10), tendance (10), large audience (10). Format : #hashtag séparés par des espaces","story":"Un script Story Instagram de 5 slides : Slide 1: [accroche] Slide 2: [problème] Slide 3: [solution] Slide 4: [preuve] Slide 5: [CTA]"` : "";

  const prompt = `Tu es un expert en création de contenu pour les réseaux sociaux.
Voici la transcription d'une vidéo : "${transcriptText}"

IMPORTANT : Le contenu que tu génères doit être DIRECTEMENT basé sur cette transcription. Utilise les mêmes sujets, exemples, anecdotes et messages clés de la vidéo. Ne génère PAS de contenu générique.

Réponds UNIQUEMENT avec ce JSON exact, sans backticks, sans markdown :
{"caption":"Caption Instagram basée sur le contenu exact de la vidéo avec emojis hook accrocheur corps du message et call-to-action","tiktok":"Script TikTok basé sur le contenu exact de la vidéo avec [0-3s] hook [3-15s] développement [15-25s] solution [25-30s] CTA","thread":"Thread X de 5 tweets basés sur le contenu exact de la vidéo numérotés 1/ 2/ 3/ 4/ 5/","email":"Email newsletter basé sur le contenu exact de la vidéo avec objet et corps du message"${proFormatsPrompt}}`;

  try {
    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
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
