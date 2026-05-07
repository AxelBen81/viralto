import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Viralto — Transforme tes vidéos en contenu viral",
  description: "Colle ton lien YouTube ou TikTok et génère en 30 secondes une caption Instagram, un script TikTok, un thread X et un email newsletter. Propulsé par Claude AI.",
  keywords: ["création de contenu", "IA", "TikTok", "Instagram", "YouTube", "caption", "script", "thread", "newsletter"],
  authors: [{ name: "Viralto" }],
  openGraph: {
    title: "Viralto — Transforme tes vidéos en contenu viral",
    description: "Génère en 30 secondes une caption Instagram, un script TikTok, un thread X et un email à partir de n'importe quelle vidéo.",
    url: "https://viralto.fr",
    siteName: "Viralto",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Viralto — Transforme tes vidéos en contenu viral",
    description: "Génère en 30 secondes une caption Instagram, un script TikTok, un thread X et un email à partir de n'importe quelle vidéo.",
  },
  icons: {
    icon: [{ url: "/Favicon_Viralto.png", type: "image/png" }],
    apple: "/Favicon_Viralto.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="fr">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
