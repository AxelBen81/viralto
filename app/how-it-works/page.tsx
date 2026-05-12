"use client";
import { useUser } from "@clerk/nextjs";

export default function HowItWorks() {
  const { isSignedIn } = useUser();
  return (
    <main style={{ background: "#080B14", minHeight: "100vh", color: "white", fontFamily: "'Inter', sans-serif", position: "relative", overflow: "hidden" }}>

      {/* Glows */}
      <div style={{ position: "fixed", top: -150, left: -150, width: 700, height: 700, background: "radial-gradient(circle, rgba(55,138,221,0.35) 0%, transparent 60%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", top: -100, right: -100, width: 600, height: 600, background: "radial-gradient(circle, rgba(83,74,183,0.3) 0%, transparent 60%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: -50, left: "25%", width: 500, height: 500, background: "radial-gradient(circle, rgba(55,138,221,0.15) 0%, transparent 60%)", pointerEvents: "none", zIndex: 0 }} />

      {/* Grid */}
      <div style={{ position: "fixed", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "50px 50px", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* Navbar */}
        <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0px 48px", borderBottom: "1px solid rgba(255,255,255,0.04)", backdropFilter: "blur(20px)", background: "transparent" }}>
          <a href="/">
            <img src="/LOGO_VIRALTO.png" alt="Viralto" style={{ height: 150, width: "auto", objectFit: "contain" }} />
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <a href="/how-it-works" style={{ fontSize: 15, color: "white", textDecoration: "none", fontWeight: 500 }}>Comment ça marche</a>
            <a href="/pricing" style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>Tarifs</a>
           {isSignedIn ? (
  <a href="/pricing" style={{ fontSize: 15, color: "white", background: "linear-gradient(135deg, #378ADD, #534AB7)", border: "none", padding: "10px 24px", borderRadius: 24, textDecoration: "none", fontWeight: 500 }}>
    Passer à Pro →
  </a>
) : (
  <a href="/" style={{ fontSize: 15, color: "white", background: "linear-gradient(135deg, #378ADD, #534AB7)", border: "none", padding: "10px 24px", borderRadius: 24, textDecoration: "none", fontWeight: 500 }}>
    Essayer gratuitement
  </a>
)}
          </div>
        </nav>

        {/* Hero */}
        <section className="animate-fade-in" style={{ maxWidth: 700, margin: "0 auto", padding: "80px 48px 60px", textAlign: "center" }}>
          <h1 style={{ fontSize: 56, fontWeight: 600, lineHeight: 1.1, marginBottom: 20, letterSpacing: -2 }}>
            Comment ça{" "}
            <span className="gradient-animated">marche ?</span>
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
            {"En 3 étapes simples, transforme n'importe quelle vidéo en kit de contenu complet."}
          </p>
        </section>

        {/* Étapes */}
        <section className="animate-fade-in animate-fade-in-delay-1" style={{ maxWidth: 700, margin: "0 auto", padding: "0 48px 80px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              {
                num: "1",
                title: "Colle ton lien",
                desc: "Copie l'URL de ta vidéo YouTube ou TikTok et colle-la dans Viralto. C'est tout ce dont on a besoin.",
                icon: "🔗"
              },
              {
                num: "2",
                title: "Notre IA analyse ta vidéo",
                desc: "Viralto transcrit et analyse le contenu de ta vidéo en quelques secondes. Pas besoin de résumer, ni de recopier quoi que ce soit.",
                icon: "🤖"
              },
              {
                num: "3",
                title: "Récupère ton kit de contenu",
                desc: "En 30 secondes, tu reçois jusqu'à 6 formats prêts à publier. Copie et poste.",
                icon: "🚀"
              },
            ].map((step, i) => (
              <div key={step.num} className={`animate-fade-in animate-fade-in-delay-${i + 1}`} style={{ display: "flex", gap: 24, alignItems: "flex-start", padding: "32px 0", borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                <div style={{ width: 56, height: 56, background: "linear-gradient(135deg, #378ADD, #534AB7)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>
                  {step.icon}
                </div>
                <div>
                  <h2 style={{ fontSize: 22, fontWeight: 600, color: "white", marginBottom: 10 }}>{step.title}</h2>
                  <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Ce que tu obtiens */}
        <section style={{ maxWidth: 900, margin: "0 auto", padding: "0 48px 80px" }}>
          <h2 className="animate-fade-in" style={{ fontSize: 36, fontWeight: 600, textAlign: "center", marginBottom: 48, letterSpacing: -1 }}>
            {"Ce que tu obtiens"}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {[
              { icon: "ig", label: "Caption Instagram", desc: "Hook accrocheur + corps + CTA + emojis", bg: "rgba(55,138,221,0.2)", color: "#85B7EB", free: true },
              { icon: "tt", label: "Script TikTok", desc: "Structure en 4 temps pour maximiser la rétention", bg: "rgba(226,75,74,0.2)", color: "#F09595", free: true },
              { icon: "x", label: "Thread X", desc: "5 tweets enchaînés prêts à poster", bg: "rgba(99,153,34,0.2)", color: "#C0DD97", free: true },
              { icon: "@", label: "Email newsletter", desc: "Objet + corps + call-to-action", bg: "rgba(186,117,23,0.2)", color: "#FAC775", free: true },
              { icon: "#", label: "Pack hashtags", desc: "30 hashtags optimisés par catégorie", bg: "rgba(175,169,236,0.2)", color: "#AFA9EC", free: false },
              { icon: "st", label: "Story Instagram", desc: "5 slides structurées clés en main", bg: "rgba(55,138,221,0.2)", color: "#85B7EB", free: false },
            ].map((f) => (
              <div key={f.label} className="card-hover" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 20 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: f.bg, color: f.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600 }}>
                    {f.icon}
                  </div>
                  {!f.free && <span style={{ fontSize: 11, background: "rgba(186,117,23,0.2)", color: "#FAC775", padding: "3px 10px", borderRadius: 6, fontWeight: 500 }}>Pro</span>}
                </div>
                <p style={{ fontSize: 15, fontWeight: 500, color: "white", marginBottom: 6 }}>{f.label}</p>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ maxWidth: 700, margin: "0 auto", padding: "0 48px 80px" }}>
          <h2 className="animate-fade-in" style={{ fontSize: 36, fontWeight: 600, textAlign: "center", marginBottom: 48, letterSpacing: -1 }}>
            {"Questions fréquentes"}
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { q: "Quelles plateformes sont supportées ?", a: "Viralto fonctionne avec YouTube et TikTok. Tu peux coller n'importe quel lien public de ces plateformes." },
              { q: "Combien de temps prend une génération ?", a: "En général moins de 30 secondes. La transcription et la génération IA sont très rapides." },
              { q: "Le contenu est-il vraiment basé sur ma vidéo ?", a: "Oui — Viralto transcrit d'abord ta vidéo puis génère du contenu basé sur ce qui est dit. Chaque résultat est unique à ta vidéo." },
              { q: "Puis-je annuler mon abonnement Pro ?", a: "Oui, à tout moment depuis ton dashboard. L'annulation prend effet à la fin de la période en cours." },
              { q: "Mes contenus générés m'appartiennent-ils ?", a: "Oui, 100%. Tout ce que Viralto génère t'appartient entièrement." },
            ].map((item) => (
              <div key={item.q} className="card-hover" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 24 }}>
                <p style={{ fontSize: 16, fontWeight: 500, color: "white", marginBottom: 10 }}>{item.q}</p>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </section>

       {/* CTA */}
<section className="animate-fade-in" style={{ textAlign: "center", padding: "0 48px 80px" }}>
  <div style={{ background: "linear-gradient(135deg, rgba(55,138,221,0.1), rgba(83,74,183,0.1))", border: "1px solid rgba(55,138,221,0.2)", borderRadius: 24, padding: "48px", maxWidth: 600, margin: "0 auto" }}>
    {isSignedIn ? (
      <>
        <h2 style={{ fontSize: 32, fontWeight: 600, marginBottom: 16, letterSpacing: -1 }}>{"Passe à Pro 🚀"}</h2>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", marginBottom: 32 }}>{"Générations illimitées, Pack hashtags et Story Instagram inclus."}</p>
        <a href="/pricing" style={{ display: "inline-block", background: "linear-gradient(135deg, #378ADD, #534AB7)", color: "white", padding: "16px 40px", borderRadius: 50, fontSize: 16, fontWeight: 500, textDecoration: "none" }}>
          {"Passer à Pro → 9€/mois"}
        </a>
      </>
    ) : (
      <>
        <h2 style={{ fontSize: 32, fontWeight: 600, marginBottom: 16, letterSpacing: -1 }}>{"Prêt à gagner du temps ?"}</h2>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", marginBottom: 32 }}>{"3 générations gratuites pour commencer. Aucune carte bancaire requise."}</p>
        <a href="/" style={{ display: "inline-block", background: "linear-gradient(135deg, #378ADD, #534AB7)", color: "white", padding: "16px 40px", borderRadius: 50, fontSize: 16, fontWeight: 500, textDecoration: "none" }}>
          {"Essayer gratuitement →"}
        </a>
      </>
    )}
  </div>
</section>
        
        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "center", gap: 32, padding: "24px 48px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <a href="/cgu" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>{"CGU"}</a>
          <a href="/confidentialite" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>{"Politique de confidentialité"}</a>
          <a href="mailto:contact@viralto.fr" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>{"Contact"}</a>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.2)" }}>{"© 2026 Viralto"}</span>
        </div>

      </div>
    </main>
  );
}
