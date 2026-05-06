"use client";
import { useState, useEffect } from "react";
import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";

const fakeContent = {
  caption: `🎯 Tu pensais que c'était impossible ? Regarde ça.\n\nOn a testé cette méthode pendant 30 jours et les résultats sont dingues. Voici ce qu'on a appris :\n\n✅ Astuce 1 — Commence tôt le matin\n✅ Astuce 2 — Reste consistant\n✅ Astuce 3 — Mesure tout\n\nSauve ce post pour y revenir plus tard 👇\n\n#growth #creator #conseils`,
  tiktok: `[0-3s] Hook : "La majorité des gens font cette erreur sans le savoir..."\n\n[3-15s] Développement : Présente le problème principal avec un exemple concret et visuel.\n\n[15-25s] Solution : Montre ta méthode en 3 étapes rapides.\n\n[25-30s] CTA : "Suis-moi pour la suite, ça va changer ta façon de voir les choses."`,
  thread: `1/ La vérité que personne ne te dit sur la création de contenu en 2024.\n\nThread 🧵👇\n\n2/ La plupart des créateurs passent 80% de leur temps à produire, et 20% à distribuer.\n\nC'est exactement l'inverse qu'il faudrait faire.\n\n3/ Voici pourquoi : le meilleur contenu du monde ne sert à rien si personne ne le voit.\n\n4/ La solution : crée moins, distribue plus. Un seul bon contenu = 5 formats différents.\n\n5/ Sauve ce thread et partage-le si ça t'a aidé. 🙏`,
  email: `Objet : Ce que j'ai appris en 30 jours (et que je n'aurais pas dû ignorer)\n\nSalut [Prénom],\n\nJe voulais partager avec toi quelque chose d'important.\n\nCes dernières semaines, j'ai testé une nouvelle approche et les résultats m'ont surpris.\n\nVoici les 3 choses que j'ai retenues :\n\n1. La constance bat la perfection\n2. L'audience veut de l'authenticité\n3. Les petits formats convertissent mieux\n\nJ'espère que ça t'aide.\n\nÀ bientôt,\nViralto`,
};

const formats = [
  { key: "caption", label: "Caption Instagram", desc: "Hook · corps · CTA · emojis", icon: "ig", bg: "rgba(55,138,221,0.15)", color: "#85B7EB" },
  { key: "tiktok", label: "Script TikTok", desc: "Hook 3s · narration · fin", icon: "tt", bg: "rgba(226,75,74,0.15)", color: "#F09595" },
  { key: "thread", label: "Thread X", desc: "5 tweets enchaînés", icon: "x", bg: "rgba(99,153,34,0.15)", color: "#C0DD97" },
  { key: "email", label: "Email newsletter", desc: "Objet · corps · CTA", icon: "@", bg: "rgba(186,117,23,0.15)", color: "#FAC775" },
];

const proFormats = [
  { label: "Pack hashtags", desc: "30 hashtags optimisés", icon: "#" },
  { label: "Story Instagram", desc: "Slides · textes clés", icon: "st" },
];

export default function Home() {
  const { isSignedIn, user } = useUser();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState("");
  const [generations, setGenerations] = useState(0);
  const [generatedContent, setGeneratedContent] = useState<Record<string, string>>({});
  const MAX_FREE = 3;

  useEffect(() => {
    if (isSignedIn && user) {
      fetch(`/api/generations?userId=${user.id}`)
        .then((res) => res.json())
        .then((data) => setGenerations(data.count));
    }
  }, [isSignedIn, user]);

  function handleCopy(key: string, text: string) {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(""), 2000);
  }

  async function handleGenerate() {
    if (!url || !isSignedIn || !user) return;
    if (generations >= MAX_FREE) return;
    setLoading(true);
    setGenerated(false);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript: url }),
      });

      const data = await res.json();
      if (data.caption) setGeneratedContent(data);

      await fetch("/api/generations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      });

      setGenerations(generations + 1);
      setGenerated(true);
    } catch {
      console.error("Erreur génération");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ background: "#080B14", minHeight: "100vh", color: "white", fontFamily: "sans-serif", position: "relative", overflow: "hidden" }}>

      {/* Glows */}
      <div style={{ position: "absolute", top: -100, left: -100, width: 400, height: 400, background: "radial-gradient(circle, rgba(55,138,221,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: -80, right: -80, width: 350, height: 350, background: "radial-gradient(circle, rgba(83,74,183,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* Navbar */}
        <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 28px", borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Image src="/LOGO_VIRALTO.png" alt="Viralto" width={140} height={35} style={{ objectFit: "contain" }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <a href="/how-it-works" style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>Comment ça marche</a>
            <a href="/pricing" style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>Tarifs</a>
            <SignedOut>
              <SignInButton mode="modal">
                <button style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", background: "transparent", border: "0.5px solid rgba(255,255,255,0.15)", padding: "7px 16px", borderRadius: 20, cursor: "pointer" }}>
                  Se connecter
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </nav>

        {/* Hero */}
        <section style={{ maxWidth: 680, margin: "0 auto", padding: "80px 24px 48px", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "#85B7EB", background: "rgba(55,138,221,0.1)", border: "0.5px solid rgba(55,138,221,0.25)", padding: "5px 12px", borderRadius: 20, marginBottom: 24 }}>
            <div style={{ width: 5, height: 5, background: "#378ADD", borderRadius: "50%" }} />
            Propulsé par Claude AI
          </div>
          <h1 style={{ fontSize: 46, fontWeight: 500, lineHeight: 1.15, marginBottom: 18, letterSpacing: -1 }}>
            Colle ta vidéo,{" "}
            <span style={{ background: "linear-gradient(135deg, #378ADD, #AFA9EC)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              tout le reste
            </span>
            <br />on s&apos;en occupe.
          </h1>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, marginBottom: 40, maxWidth: 460, margin: "0 auto 40px" }}>
            Transforme n&apos;importe quelle vidéo en kit de contenu complet — caption Instagram, script TikTok, thread X et email en 30 secondes.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: 8, maxWidth: 520, margin: "0 auto 14px", background: "rgba(255,255,255,0.05)", border: "0.5px solid rgba(255,255,255,0.1)", borderRadius: 50, padding: "6px 6px 6px 20px" }}>
            <input
              type="text"
              placeholder="Colle ton lien YouTube ou TikTok..."
              style={{ flex: 1, border: "none", background: "transparent", fontSize: 13, color: "white", outline: "none" }}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            {!isSignedIn ? (
              <SignedOut>
                <SignInButton mode="modal">
                  <button style={{ background: "linear-gradient(135deg, #378ADD, #534AB7)", color: "white", border: "none", padding: "10px 22px", borderRadius: 50, fontSize: 13, fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap" }}>
                    Se connecter →
                  </button>
                </SignInButton>
              </SignedOut>
            ) : generations >= MAX_FREE ? (
              <button style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)", border: "none", padding: "10px 22px", borderRadius: 50, fontSize: 13, fontWeight: 500, cursor: "not-allowed", whiteSpace: "nowrap" }}>
                Limite atteinte
              </button>
            ) : (
              <button
                onClick={handleGenerate}
                disabled={loading || !url}
                style={{ background: "linear-gradient(135deg, #378ADD, #534AB7)", color: "white", border: "none", padding: "10px 22px", borderRadius: 50, fontSize: 13, fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap", opacity: loading || !url ? 0.5 : 1 }}
              >
                {loading ? "Génération..." : "Générer →"}
              </button>
            )}
          </div>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>YouTube · TikTok · Instagram Reels</p>
        </section>

        {/* Stats */}
        <div style={{ display: "flex", justifyContent: "center", gap: 40, padding: "24px", borderTop: "0.5px solid rgba(255,255,255,0.05)", borderBottom: "0.5px solid rgba(255,255,255,0.05)", margin: "0 24px" }}>
          {[["4", "formats générés"], ["30s", "temps moyen"], ["100%", "basé sur ta vidéo"]].map(([num, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 24, fontWeight: 500, color: "white" }}>{num}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 3 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Formats */}
        <section style={{ maxWidth: 680, margin: "0 auto", padding: "28px 24px 32px" }}>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>Contenu généré</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
            {formats.map((f) => (
              <div key={f.key} style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 16 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 7, background: f.bg, color: f.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 500 }}>
                      {f.icon}
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.85)" }}>{f.label}</span>
                  </div>
                  {generated && (
                    <button onClick={() => handleCopy(f.key, generatedContent[f.key] || fakeContent[f.key as keyof typeof fakeContent])} style={{ fontSize: 11, color: "#85B7EB", background: "none", border: "none", cursor: "pointer", fontWeight: 500 }}>
                      {copied === f.key ? "✅ Copié !" : "Copier"}
                    </button>
                  )}
                </div>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginBottom: 10 }}>{f.desc}</p>
                {generated ? (
                  <pre style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", whiteSpace: "pre-wrap", background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.06)", borderRadius: 8, padding: 12, maxHeight: 160, overflowY: "auto" }}>
                    {generatedContent[f.key] || fakeContent[f.key as keyof typeof fakeContent]}
                  </pre>
                ) : (
                  <div>
                    <div style={{ height: 5, background: "rgba(255,255,255,0.06)", borderRadius: 3, marginBottom: 5 }} />
                    <div style={{ height: 5, background: "rgba(255,255,255,0.06)", borderRadius: 3, width: "55%" }} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Pro formats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, marginTop: 10 }}>
            {proFormats.map((f) => (
              <div key={f.label} style={{ background: "rgba(255,255,255,0.02)", border: "0.5px solid rgba(255,255,255,0.05)", borderRadius: 12, padding: 16, opacity: 0.3 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 7, background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>
                      {f.icon}
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.7)" }}>{f.label}</span>
                  </div>
                  <span style={{ fontSize: 10, background: "rgba(186,117,23,0.2)", color: "#FAC775", padding: "2px 8px", borderRadius: 4, fontWeight: 500 }}>Pro</span>
                </div>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 24px", borderTop: "0.5px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.02)" }}>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
            Plan gratuit · {MAX_FREE - generations} génération{MAX_FREE - generations > 1 ? "s" : ""} restante{MAX_FREE - generations > 1 ? "s" : ""} ce mois
          </span>
          <a href="/pricing" style={{ fontSize: 12, fontWeight: 500, background: "linear-gradient(135deg, #378ADD, #534AB7)", color: "white", padding: "7px 16px", borderRadius: 20, textDecoration: "none" }}>
            Passer à Pro →
          </a>
        </div>
      </div>
    </main>
  );
}
