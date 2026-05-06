export default function HowItWorks() {
  return (
    <main style={{ background: "#080B14", minHeight: "100vh", color: "white", fontFamily: "'Inter', sans-serif", position: "relative", overflow: "hidden" }}>

      {/* Glows */}
      <div style={{ position: "fixed", top: -150, left: -150, width: 700, height: 700, background: "radial-gradient(circle, rgba(55,138,221,0.35) 0%, transparent 60%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", top: -100, right: -100, width: 600, height: 600, background: "radial-gradient(circle, rgba(83,74,183,0.3) 0%, transparent 60%)", pointerEvents: "none", zIndex: 0 }} />

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
            <a href="/" style={{ fontSize: 15, color: "white", background: "linear-gradient(135deg, #378ADD, #534AB7)", border: "none", padding: "10px 24px", borderRadius: 24, textDecoration: "none", fontWeight: 500 }}>
              Essayer gratuitement
            </a>
          </div>
        </nav>

        {/* Hero */}
        <section style={{ maxWidth: 700, margin: "0 auto", padding: "80px 48px 60px", textAlign: "center" }}>
          <h1 style={{ fontSize: 56, fontWeight: 600, lineHeight: 1.1, marginBottom: 20, letterSpacing: -2 }}>
            Comment ça{" "}
            <span style={{ background: "linear-gradient(135deg, #378ADD, #AFA9EC)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              marche ?
            </span>
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
            En 3 étapes simples, transforme n&apos;importe quelle vidéo en kit de contenu complet.
          </p>
        </section>

        {/* Étapes */}
        <section style={{ maxWidth: 700, margin: "0 auto", padding: "0 48px 80px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>

            {/* Étape 1 */}
            <div style={{ display: "flex", gap: 24, alignItems: "flex-start", padding: "32px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ width: 48, height: 48, background: "linear-gradient(135deg, #378ADD, #534AB7)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 600, flexShrink: 0 }}>
                1
              </div>
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 600, color: "white", marginBottom: 10 }}>Colle ton lien</h2>
                <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
                  Copie l&apos;URL de ta vidéo YouTube, TikTok ou Instagram Reel et colle-la dans Viralto. C&apos;est tout ce dont on a besoin.
                </p>
              </div>
            </div>

            {/* Étape 2 */}
            <div style={{ display: "flex", gap: 24, alignItems: "flex-start", padding: "32px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ width: 48, height: 48, background: "linear-gradient(135deg, #378ADD, #534AB7)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 600, flexShrink: 0 }}>
                2
              </div>
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 600, color: "white", marginBottom: 10 }}>Notre IA analyse ta vidéo</h2>
                <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
                  Viralto transcrit et analyse le contenu de ta vidéo en quelques secondes. Pas besoin de résumer, ni de recopier quoi que ce soit.
                </p>
              </div>
            </div>

            {/* Étape 3 */}
            <div style={{ display: "flex", gap: 24, alignItems: "flex-start", padding: "32px 0" }}>
              <div style={{ width: 48, height: 48, background: "linear-gradient(135deg, #378ADD, #534AB7)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 600, flexShrink: 0 }}>
                3
              </div>
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 600, color: "white", marginBottom: 10 }}>Récupère ton kit de contenu</h2>
                <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
                  En 30 secondes, tu reçois une caption Instagram, un script TikTok, un thread X et un email prêts à publier. Copie et poste.
                </p>
              </div>
            </div>

          </div>

          {/* CTA */}
          <div style={{ marginTop: 64, textAlign: "center" }}>
            <a href="/" style={{ display: "inline-block", background: "linear-gradient(135deg, #378ADD, #534AB7)", color: "white", padding: "16px 40px", borderRadius: 50, fontSize: 16, fontWeight: 500, textDecoration: "none" }}>
              Essayer gratuitement →
            </a>
          </div>
        </section>

      </div>
    </main>
  );
}
