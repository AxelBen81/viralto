"use client";
import { useState, useEffect } from "react";
import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";

const fakeContent = {
  caption: `🎯 Tu pensais que c'était impossible ? Regarde ça.\n\nOn a testé cette méthode pendant 30 jours et les résultats sont dingues. Voici ce qu'on a appris :\n\n✅ Astuce 1 — Commence tôt le matin\n✅ Astuce 2 — Reste consistant\n✅ Astuce 3 — Mesure tout\n\nSauve ce post pour y revenir plus tard 👇\n\n#growth #creator #conseils`,
  tiktok: `[0-3s] Hook : "La majorité des gens font cette erreur sans le savoir..."\n\n[3-15s] Développement : Présente le problème principal avec un exemple concret et visuel.\n\n[15-25s] Solution : Montre ta méthode en 3 étapes rapides.\n\n[25-30s] CTA : "Suis-moi pour la suite, ça va changer ta façon de voir les choses."`,
  thread: `1/ La vérité que personne ne te dit sur la création de contenu en 2024.\n\nThread 🧵👇\n\n2/ La plupart des créateurs passent 80% de leur temps à produire, et 20% à distribuer.\n\nC'est exactement l'inverse qu'il faudrait faire.\n\n3/ Voici pourquoi : le meilleur contenu du monde ne sert à rien si personne ne le voit.\n\n4/ La solution : crée moins, distribue plus. Un seul bon contenu = 5 formats différents.\n\n5/ Sauve ce thread et partage-le si ça t'a aidé. 🙏`,
  email: `Objet : Ce que j'ai appris en 30 jours (et que je n'aurais pas dû ignorer)\n\nSalut [Prénom],\n\nJe voulais partager avec toi quelque chose d'important.\n\nCes dernières semaines, j'ai testé une nouvelle approche et les résultats m'ont surpris.\n\nVoici les 3 choses que j'ai retenues :\n\n1. La constance bat la perfection\n2. L'audience veut de l'authenticité\n3. Les petits formats convertissent mieux\n\nJ'espère que ça t'aide.\n\nÀ bientôt,\nViralto`,
};

const formats = [
  { key: "caption", label: "Caption Instagram", desc: "Hook · corps · CTA · emojis", icon: "ig", bg: "rgba(55,138,221,0.2)", color: "#85B7EB" },
  { key: "tiktok", label: "Script TikTok", desc: "Hook 3s · narration · fin", icon: "tt", bg: "rgba(226,75,74,0.2)", color: "#F09595" },
  { key: "thread", label: "Thread X", desc: "5 tweets enchaînés", icon: "x", bg: "rgba(99,153,34,0.2)", color: "#C0DD97" },
  { key: "email", label: "Email newsletter", desc: "Objet · corps · CTA", icon: "@", bg: "rgba(186,117,23,0.2)", color: "#FAC775" },
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
const [isPro, setIsPro] = useState(false);

  useEffect(() => {
  if (isSignedIn && user) {
    fetch(`/api/generations?userId=${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setGenerations(data.count);
        setIsPro(data.is_pro ?? false);
      });
  }
}, [isSignedIn, user]);
  function handleCopy(key: string, text: string) {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(""), 2000);
  }

  async function handleGenerate() {
    if (!url || !isSignedIn || !user) return;
    if (!isPro && generations >= MAX_FREE) return;
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
    <main style={{ background: "#080B14", minHeight: "100vh", color: "white", fontFamily: "'Inter', sans-serif", position: "relative", overflow: "hidden" }}>

      {/* Glow effects */}
     <div style={{ position: "fixed", top: -150, left: -150, width: 700, height: 700, background: "radial-gradient(circle, rgba(55,138,221,0.35) 0%, transparent 60%)", pointerEvents: "none", zIndex: 0 }} />
<div style={{ position: "fixed", top: -100, right: -100, width: 600, height: 600, background: "radial-gradient(circle, rgba(83,74,183,0.3) 0%, transparent 60%)", pointerEvents: "none", zIndex: 0 }} />
<div style={{ position: "fixed", bottom: -50, left: "25%", width: 500, height: 500, background: "radial-gradient(circle, rgba(55,138,221,0.15) 0%, transparent 60%)", pointerEvents: "none", zIndex: 0 }} />

      {/* Grid background */}
      <div style={{ position: "fixed", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "50px 50px", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* Navbar */}
     <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0px 48px", borderBottom: "1px solid rgba(255,255,255,0.04)", backdropFilter: "blur(20px)", background: "transparent" }}>
  <img src="/LOGO_VIRALTO.png" alt="Viralto" style={{ height: 150, width: "auto", objectFit: "contain" }} />
  <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
    <a href="/how-it-works" style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>Comment ça marche</a>
    <a href="/pricing" style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>Tarifs</a>
    <SignedOut>
      <SignInButton mode="modal">
        <button style={{ fontSize: 15, color: "white", background: "linear-gradient(135deg, #378ADD, #534AB7)", border: "none", padding: "10px 24px", borderRadius: 24, cursor: "pointer", fontWeight: 500 }}>
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
        <section style={{ maxWidth: 900, margin: "0 auto", padding: "100px 48px 60px", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, color: "#85B7EB", background: "rgba(55,138,221,0.1)", border: "1px solid rgba(55,138,221,0.2)", padding: "6px 16px", borderRadius: 24, marginBottom: 32 }}>
            <div style={{ width: 6, height: 6, background: "#378ADD", borderRadius: "50%", boxShadow: "0 0 6px #378ADD" }} />
            Propulsé par Claude AI
          </div>

          <h1 style={{ fontSize: 64, fontWeight: 600, lineHeight: 1.1, marginBottom: 24, letterSpacing: -2 }}>
            Colle ta vidéo,{" "}
            <span style={{ background: "linear-gradient(135deg, #378ADD, #AFA9EC)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              tout le reste
            </span>
            <br />on s&apos;en occupe.
          </h1>

          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 48, maxWidth: 560, margin: "0 auto 48px" }}>
            Transforme n&apos;importe quelle vidéo en kit de contenu complet — caption Instagram, script TikTok, thread X et email en 30 secondes.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: 8, maxWidth: 600, margin: "0 auto 16px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 50, padding: "8px 8px 8px 24px" }}>
            <input
              type="text"
              placeholder="Colle ton lien YouTube ou TikTok..."
              style={{ flex: 1, border: "none", background: "transparent", fontSize: 15, color: "white", outline: "none" }}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            {!isSignedIn ? (
              <SignedOut>
                <SignInButton mode="modal">
                  <button style={{ background: "linear-gradient(135deg, #378ADD, #534AB7)", color: "white", border: "none", padding: "12px 28px", borderRadius: 50, fontSize: 15, fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap" }}>
                    Se connecter →
                  </button>
                </SignInButton>
              </SignedOut>
           ) : !isPro && generations >= MAX_FREE ? (
              <button style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)", border: "none", padding: "12px 28px", borderRadius: 50, fontSize: 15, cursor: "not-allowed", whiteSpace: "nowrap" }}>
                Limite atteinte
              </button>
            ) : (
              <button
                onClick={handleGenerate}
                disabled={loading || !url}
                style={{ background: "linear-gradient(135deg, #378ADD, #534AB7)", color: "white", border: "none", padding: "12px 28px", borderRadius: 50, fontSize: 15, fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap", opacity: loading || !url ? 0.5 : 1 }}
              >
                {loading ? "Génération..." : "Générer →"}
              </button>
            )}
          </div>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.2)" }}>YouTube · TikTok · Instagram Reels</p>
        </section>

        {/* Stats */}
        <div style={{ display: "flex", justifyContent: "center", gap: 64, padding: "32px 48px", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", margin: "0 48px" }}>
          {[["4", "formats générés"], ["30s", "temps moyen"], ["100%", "basé sur ta vidéo"]].map(([num, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 32, fontWeight: 600, color: "white", letterSpacing: -1 }}>{num}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Formats */}
        <section style={{ maxWidth: 960, margin: "0 auto", padding: "40px 48px 48px" }}>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 20 }}>Contenu généré</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {formats.map((f) => (
              <div key={f.key} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 20 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: f.bg, color: f.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600 }}>
                      {f.icon}
                    </div>
                    <span style={{ fontSize: 15, fontWeight: 500, color: "rgba(255,255,255,0.9)" }}>{f.label}</span>
                  </div>
                  {generated && (
                    <button onClick={() => handleCopy(f.key, generatedContent[f.key] || fakeContent[f.key as keyof typeof fakeContent])} style={{ fontSize: 12, color: "#85B7EB", background: "none", border: "none", cursor: "pointer", fontWeight: 500 }}>
                      {copied === f.key ? "✅ Copié !" : "Copier"}
                    </button>
                  )}
                </div>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", marginBottom: 12 }}>{f.desc}</p>
                {generated ? (
                  <pre style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", whiteSpace: "pre-wrap", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: 14, maxHeight: 180, overflowY: "auto", margin: 0 }}>
                    {generatedContent[f.key] || fakeContent[f.key as keyof typeof fakeContent]}
                  </pre>
                ) : (
                  <div>
                    <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3, marginBottom: 6 }} />
                    <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3, width: "60%", marginBottom: 6 }} />
                    <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3, width: "40%" }} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Pro formats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginTop: 16 }}>
            {proFormats.map((f) => (
              <div key={f.label} style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 16, padding: 20, opacity: 0.35 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>
                      {f.icon}
                    </div>
                    <span style={{ fontSize: 15, fontWeight: 500, color: "rgba(255,255,255,0.7)" }}>{f.label}</span>
                  </div>
                  <span style={{ fontSize: 11, background: "rgba(186,117,23,0.2)", color: "#FAC775", padding: "3px 10px", borderRadius: 6, fontWeight: 500 }}>Pro</span>
                </div>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.25)" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 48px", borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>
  {isPro ? "Plan Pro · Générations illimitées 🚀" : `Plan gratuit · ${MAX_FREE - generations} génération${MAX_FREE - generations > 1 ? "s" : ""} restante${MAX_FREE - generations > 1 ? "s" : ""} ce mois`}
</span>
          <a href="/pricing" style={{ fontSize: 15, fontWeight: 500, background: "linear-gradient(135deg, #378ADD, #534AB7)", color: "white", padding: "12px 28px", borderRadius: 24, textDecoration: "none" }}>
            Passer à Pro →
          </a>
        </div>
      </div>
    </main>
  );
}
