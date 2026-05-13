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
  const [showLimitModal, setShowLimitModal] = useState(false);

  useEffect(() => {
    if (isSignedIn && user) {
      fetch(`/api/generations?userId=${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setGenerations(data.count);
          setIsPro(data.is_pro ?? false);
          if (data.count === 0) {
            fetch("/api/welcome", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: user.primaryEmailAddress?.emailAddress,
                firstName: user.firstName,
              }),
            });
          }
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
        body: JSON.stringify({ transcript: url, isPro }),
      });
      const data = await res.json();
      if (data.error) {
        alert("❌ Erreur lors de la génération. Vérifie que le lien est valide et réessaie.");
        return;
      }
      if (data.caption) setGeneratedContent(data);
      await fetch("/api/generations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      });
      setGenerations(generations + 1);
      setGenerated(true);
    } catch {
      alert("❌ Une erreur est survenue. Vérifie ta connexion et réessaie.");
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
            <a href="/how-it-works" style={{ fontSize: 16, color: "white", textDecoration: "none", fontWeight: 500 }}>Comment ça marche</a>
            <a href="/pricing" style={{ fontSize: 16, color: "white", textDecoration: "none", fontWeight: 500 }}>Tarifs</a>
            <SignedOut>
              <SignInButton mode="modal">
                <button style={{ fontSize: 15, color: "white", background: "linear-gradient(135deg, #378ADD, #534AB7)", border: "none", padding: "10px 24px", borderRadius: 24, cursor: "pointer", fontWeight: 500 }}>
                  Se connecter
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <a href="/dashboard" style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>Dashboard</a>
              <UserButton />
            </SignedIn>
          </div>
        </nav>

        {/* Hero */}
        <section className="animate-fade-in" style={{ maxWidth: 900, margin: "0 auto", padding: "60px 48px 40px", textAlign: "center" }}>

          <h1 style={{ fontSize: 64, fontWeight: 600, lineHeight: 1.1, marginBottom: 24, letterSpacing: -2 }}>
            Colle ta vidéo,{" "}
            <span className="gradient-animated">tout le reste</span>
            <br />on s&apos;en occupe.
          </h1>

          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 48, maxWidth: 560, margin: "0 auto 48px" }}>
            Transforme n&apos;importe quelle vidéo en kit de contenu complet — caption Instagram, script TikTok, thread X et email en 30 secondes.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: 8, maxWidth: 600, margin: "0 auto 16px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 50, padding: "8px 8px 8px 24px" }} className="search-bar">
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
              <button
                onClick={() => setShowLimitModal(true)}
                style={{ background: "linear-gradient(135deg, #378ADD, #534AB7)", color: "white", border: "none", padding: "12px 28px", borderRadius: 50, fontSize: 15, cursor: "pointer", whiteSpace: "nowrap" }}>
                Passer à Pro →
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
        <div className="animate-fade-in animate-fade-in-delay-1" style={{ display: "flex", justifyContent: "center", gap: 64, padding: "32px 48px", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", margin: "0 48px" }}>
         {[["+3h", "économisées par semaine"], ["0,30€", "par jour seulement"], ["YouTube & TikTok", "supportés"]].map(([num, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 32, fontWeight: 600, color: "white", letterSpacing: -1 }}>{num}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Formats */}
        <section style={{ maxWidth: 960, margin: "0 auto", padding: "40px 48px 48px" }}>
          <p className="animate-fade-in animate-fade-in-delay-2" style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 20 }}>Contenu généré</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {formats.map((f, i) => (
              <div key={f.key} className={`card-hover animate-fade-in animate-fade-in-delay-${i + 1}`} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 20 }}>
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
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 12 }}>{f.desc}</p>
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
            {[
              { key: "hashtags", label: "Pack hashtags", desc: "30 hashtags optimisés", icon: "#", bg: "rgba(175,169,236,0.2)", color: "#AFA9EC" },
              { key: "story", label: "Story Instagram", desc: "Slides · textes clés", icon: "st", bg: "rgba(55,138,221,0.2)", color: "#85B7EB" },
            ].map((f) => (
              <div key={f.label} className="card-hover" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${isPro ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.05)"}`, borderRadius: 16, padding: 20, position: "relative", opacity: isPro ? 1 : 0.5 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: isPro ? f.bg : "rgba(255,255,255,0.04)", color: isPro ? f.color : "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600 }}>
                      {f.icon}
                    </div>
                    <span style={{ fontSize: 15, fontWeight: 500, color: isPro ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.5)" }}>{f.label}</span>
                  </div>
                  {isPro ? (
                    generated && generatedContent[f.key] && (
                      <button onClick={() => handleCopy(f.key, generatedContent[f.key])} style={{ fontSize: 12, color: "#85B7EB", background: "none", border: "none", cursor: "pointer", fontWeight: 500 }}>
                        {copied === f.key ? "✅ Copié !" : "Copier"}
                      </button>
                    )
                  ) : (
                    <a href="/pricing" style={{ fontSize: 11, background: "rgba(186,117,23,0.2)", color: "#FAC775", padding: "3px 10px", borderRadius: 6, fontWeight: 500, textDecoration: "none" }}>🔒 Pro</a>
                  )}
                </div>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>{f.desc}</p>
                {isPro && generated && generatedContent[f.key] ? (
                  <pre style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", whiteSpace: "pre-wrap", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: 14, maxHeight: 180, overflowY: "auto", margin: 0 }}>
                    {generatedContent[f.key]}
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
        </section>
        
        {/* Pourquoi Viralto */}
        <section style={{ maxWidth: 960, margin: "0 auto", padding: "24px 48px 24" }}>
         <div style={{ textAlign: "center", marginBottom: 48 }}>
  <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 16, color: "#85B7EB", background: "rgba(55,138,221,0.1)", border: "1px solid rgba(55,138,221,0.2)", padding: "8px 20px", borderRadius: 24, marginBottom: 20 }}>
    <div style={{ width: 6, height: 6, background: "#378ADD", borderRadius: "50%", boxShadow: "0 0 6px #378ADD" }} />
    Pourquoi Viralto
  </div>
  <h2 style={{ fontSize: 48, fontWeight: 600, letterSpacing: -2, lineHeight: 1.1 }}>
    {"Arrête de perdre du temps"}<br />
    <span className="gradient-animated">{"à adapter ton contenu"}</span>
  </h2>
</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {[
              { icon: "⏱️", title: "3h économisées par semaine", desc: "Un créateur passe en moyenne 3h à adapter son contenu. Viralto le fait en 30 secondes." },
              { icon: "🎯", title: "Contenu basé sur ta vidéo", desc: "Chaque résultat est unique et directement tiré de ce que tu as dit dans ta vidéo. Zéro contenu générique." },
              { icon: "📱", title: "6 formats en un clic", desc: "Instagram, TikTok, X, email, hashtags et Story — tout est prêt à copier-coller directement." },
              { icon: "🤖", title: "Propulsé par Claude AI", desc: "L'IA la plus avancée du marché analyse ta vidéo et génère du contenu de qualité professionnelle." },
              { icon: "🔒", title: "Sans engagement", desc: "Plan gratuit pour tester, Pro à 9€/mois sans engagement. Tu annules quand tu veux." },
              { icon: "🚀", title: "Prêt en 30 secondes", desc: "Colle ton lien, clique sur Générer. Ton kit de contenu complet est prêt avant que tu aies fini ton café." },
            ].map((item) => (
              <div key={item.title} className="card-hover" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 24 }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{item.icon}</div>
                <p style={{ fontSize: 16, fontWeight: 600, color: "white", marginBottom: 8 }}>{item.title}</p>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{item.desc}</p>
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

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "center", gap: 32, padding: "24px 48px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <a href="/cgu" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>{"CGU"}</a>
          <a href="/confidentialite" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>{"Politique de confidentialité"}</a>
          <a href="/mentions-legales" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>{"Mentions légales"}</a>
          <a href="/contact" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>{"Contact"}</a>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.2)" }}>{"© 2026 Viralto"}</span>
        </div>
      </div>

      {/* Modal limite atteinte */}
      {showLimitModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, backdropFilter: "blur(4px)" }}>
          <div style={{ background: "#0D1117", border: "1px solid rgba(55,138,221,0.3)", borderRadius: 24, padding: 48, maxWidth: 480, width: "90%", textAlign: "center", position: "relative" }}>
            <button onClick={() => setShowLimitModal(false)} style={{ position: "absolute", top: 16, right: 20, background: "none", border: "none", color: "rgba(255,255,255,0.4)", fontSize: 20, cursor: "pointer" }}>✕</button>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🚀</div>
            <h2 style={{ fontSize: 28, fontWeight: 600, marginBottom: 12, letterSpacing: -1 }}>{"Tu as atteint ta limite gratuite"}</h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 32 }}>{"Passe à Pro pour des générations illimitées, le Pack hashtags et la Story Instagram — pour seulement 9€/mois."}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <a href="/pricing" style={{ background: "linear-gradient(135deg, #378ADD, #534AB7)", color: "white", padding: "14px 28px", borderRadius: 12, fontSize: 16, fontWeight: 500, textDecoration: "none" }}>
                {"Passer à Pro → 9€/mois"}
              </a>
              <button onClick={() => setShowLimitModal(false)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", fontSize: 14, cursor: "pointer" }}>
                {"Continuer avec le plan gratuit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
