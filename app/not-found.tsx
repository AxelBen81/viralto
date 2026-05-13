export default function NotFound() {
  return (
    <main style={{ background: "#080B14", minHeight: "100vh", color: "white", fontFamily: "'Inter', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "fixed", top: -150, left: -150, width: 700, height: 700, background: "radial-gradient(circle, rgba(55,138,221,0.35) 0%, transparent 60%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", top: -100, right: -100, width: 600, height: 600, background: "radial-gradient(circle, rgba(83,74,183,0.3) 0%, transparent 60%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "50px 50px", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "0 48px" }}>
        <div style={{ fontSize: 80, marginBottom: 24 }}>🎬</div>
        <h1 style={{ fontSize: 64, fontWeight: 600, letterSpacing: -2, marginBottom: 16 }}>404</h1>
        <p style={{ fontSize: 20, color: "rgba(255,255,255,0.5)", marginBottom: 48 }}>{"Cette page n'existe pas — mais ton contenu viral, oui."}</p>
        <a href="/" style={{ display: "inline-block", background: "linear-gradient(135deg, #378ADD, #534AB7)", color: "white", padding: "16px 40px", borderRadius: 50, fontSize: 16, fontWeight: 500, textDecoration: "none" }}>
          {"Retour à l'accueil →"}
        </a>
      </div>
    </main>
  );
}
