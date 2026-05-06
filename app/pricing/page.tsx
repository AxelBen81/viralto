export default function Pricing() {
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
            <a href="/how-it-works" style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>Comment ça marche</a>
            <a href="/pricing" style={{ fontSize: 15, color: "white", textDecoration: "none", fontWeight: 500 }}>Tarifs</a>
            <a href="/" style={{ fontSize: 15, color: "white", background: "linear-gradient(135deg, #378ADD, #534AB7)", border: "none", padding: "10px 24px", borderRadius: 24, textDecoration: "none", fontWeight: 500 }}>
              Essayer gratuitement
            </a>
          </div>
        </nav>

        {/* Hero */}
        <section style={{ maxWidth: 700, margin: "0 auto", padding: "80px 48px 60px", textAlign: "center" }}>
          <h1 style={{ fontSize: 56, fontWeight: 600, lineHeight: 1.1, marginBottom: 20, letterSpacing: -2 }}>
            Simple et{" "}
            <span style={{ background: "linear-gradient(135deg, #378ADD, #AFA9EC)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              transparent
            </span>
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
            Commence gratuitement, passe à Pro quand tu es prêt.
          </p>
        </section>

        {/* Plans */}
        <section style={{ maxWidth: 800, margin: "0 auto", padding: "0 48px 80px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>

            {/* Plan Gratuit */}
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 32 }}>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.1em" }}>Gratuit</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 6 }}>
                <span style={{ fontSize: 48, fontWeight: 600, color: "white" }}>0€</span>
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", marginBottom: 32 }}>Pour toujours</p>

              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
                {[
                  { text: "3 générations par mois", included: true },
                  { text: "Caption Instagram", included: true },
                  { text: "Script TikTok", included: true },
                  { text: "Thread X", included: true },
                  { text: "Email newsletter", included: true },
                  { text: "Pack hashtags", included: false },
                  { text: "Story Instagram", included: false },
                ].map((item) => (
                  <div key={item.text} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ color: item.included ? "#378ADD" : "rgba(255,255,255,0.2)", fontSize: 16 }}>{item.included ? "✓" : "✗"}</span>
                    <span style={{ fontSize: 14, color: item.included ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.25)" }}>{item.text}</span>
                  </div>
                ))}
              </div>

              <a href="/" style={{ display: "block", textAlign: "center", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)", padding: "14px", borderRadius: 12, fontSize: 15, textDecoration: "none", fontWeight: 500 }}>
                Commencer gratuitement
              </a>
            </div>

            {/* Plan Pro */}
            <div style={{ background: "rgba(55,138,221,0.08)", border: "1px solid rgba(55,138,221,0.3)", borderRadius: 20, padding: 32, position: "relative" }}>
              <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg, #378ADD, #534AB7)", color: "white", fontSize: 12, fontWeight: 500, padding: "4px 16px", borderRadius: 20 }}>
                Recommandé
              </div>
              <p style={{ fontSize: 13, color: "#85B7EB", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.1em" }}>Pro</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 6 }}>
                <span style={{ fontSize: 48, fontWeight: 600, color: "white" }}>9€</span>
                <span style={{ fontSize: 15, color: "rgba(255,255,255,0.4)" }}>/mois</span>
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", marginBottom: 32 }}>Sans engagement</p>

              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
                {[
                  "Générations illimitées",
                  "Caption Instagram",
                  "Script TikTok",
                  "Thread X",
                  "Email newsletter",
                  "Pack hashtags",
                  "Story Instagram",
                ].map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ color: "#378ADD", fontSize: 16 }}>✓</span>
                    <span style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>{item}</span>
                  </div>
                ))}
              </div>

              <a href="/" style={{ display: "block", textAlign: "center", background: "linear-gradient(135deg, #378ADD, #534AB7)", color: "white", padding: "14px", borderRadius: 12, fontSize: 15, textDecoration: "none", fontWeight: 500 }}>
                Passer à Pro
              </a>
            </div>
          </div>

          {/* FAQ */}
          <div style={{ marginTop: 80 }}>
            <h2 style={{ fontSize: 32, fontWeight: 600, color: "white", marginBottom: 40, textAlign: "center", letterSpacing: -1 }}>Questions fréquentes</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {[
                { q: "Est-ce que je peux annuler à tout moment ?", a: "Oui, tu peux annuler ton abonnement Pro à tout moment depuis ton compte. Aucun engagement." },
                { q: "Quelles plateformes sont supportées ?", a: "Viralto fonctionne avec YouTube, TikTok et Instagram Reels." },
                { q: "Que se passe-t-il quand j'atteins ma limite gratuite ?", a: "Tu reçois une notification et tu peux passer à Pro pour continuer à générer du contenu illimité." },
              ].map((item) => (
                <div key={item.q} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 24 }}>
                  <p style={{ fontSize: 16, fontWeight: 500, color: "white", marginBottom: 10 }}>{item.q}</p>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
