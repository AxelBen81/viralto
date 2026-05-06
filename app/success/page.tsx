export default function Success() {
  return (
    <main style={{ background: "#080B14", minHeight: "100vh", color: "white", fontFamily: "'Inter', sans-serif", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", maxWidth: 500, padding: "0 24px" }}>
        <div style={{ fontSize: 64, marginBottom: 24 }}>🎉</div>
        <h1 style={{ fontSize: 40, fontWeight: 600, marginBottom: 16, letterSpacing: -1 }}>
          Bienvenue dans{" "}
          <span style={{ background: "linear-gradient(135deg, #378ADD, #AFA9EC)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Viralto Pro !
          </span>
        </h1>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 40 }}>
          Ton abonnement est actif. Tu as maintenant accès à des générations illimitées et à tous les formats Pro.
        </p>
        <a href="/" style={{ display: "inline-block", background: "linear-gradient(135deg, #378ADD, #534AB7)", color: "white", padding: "14px 32px", borderRadius: 50, fontSize: 15, fontWeight: 500, textDecoration: "none" }}>
          Commencer à générer →
        </a>
      </div>
    </main>
  );
}
