"use client";
import { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!name || !email || !message) return;
    setLoading(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      setSent(true);
    } catch {
      alert("❌ Une erreur est survenue. Réessaie ou écris-nous directement à contact@viralto.fr");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ background: "#080B14", minHeight: "100vh", color: "white", fontFamily: "'Inter', sans-serif", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "fixed", top: -150, left: -150, width: 700, height: 700, background: "radial-gradient(circle, rgba(55,138,221,0.35) 0%, transparent 60%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", top: -100, right: -100, width: 600, height: 600, background: "radial-gradient(circle, rgba(83,74,183,0.3) 0%, transparent 60%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "50px 50px", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0px 48px", borderBottom: "1px solid rgba(255,255,255,0.04)", backdropFilter: "blur(20px)", background: "transparent" }}>
          <a href="/">
            <img src="/LOGO_VIRALTO.png" alt="Viralto" style={{ height: 150, width: "auto", objectFit: "contain" }} />
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <a href="/how-it-works" style={{ fontSize: 16, color: "white", textDecoration: "none", fontWeight: 500 }}>Comment ça marche</a>
            <a href="/pricing" style={{ fontSize: 16, color: "white", textDecoration: "none", fontWeight: 500 }}>Tarifs</a>
            <a href="/" style={{ fontSize: 15, color: "white", background: "linear-gradient(135deg, #378ADD, #534AB7)", padding: "10px 24px", borderRadius: 24, textDecoration: "none", fontWeight: 500 }}>
              Essayer gratuitement
            </a>
          </div>
        </nav>

        <div style={{ maxWidth: 600, margin: "0 auto", padding: "80px 48px" }}>
          {sent ? (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 64, marginBottom: 24 }}>✅</div>
              <h1 style={{ fontSize: 36, fontWeight: 600, marginBottom: 16, letterSpacing: -1 }}>{"Message envoyé !"}</h1>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", marginBottom: 40 }}>{"On te répondra dans les 24h sur ton email."}</p>
              <a href="/" style={{ display: "inline-block", background: "linear-gradient(135deg, #378ADD, #534AB7)", color: "white", padding: "14px 28px", borderRadius: 24, textDecoration: "none", fontWeight: 500 }}>
                {"Retour à l'accueil"}
              </a>
            </div>
          ) : (
            <>
              <h1 style={{ fontSize: 40, fontWeight: 600, letterSpacing: -1, marginBottom: 8 }}>{"Nous contacter"}</h1>
              <p style={{ color: "rgba(255,255,255,0.4)", marginBottom: 48 }}>{"On répond dans les 24h. Tu peux aussi écrire directement à contact@viralto.fr"}</p>

              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div>
                  <label style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginBottom: 8, display: "block" }}>{"Ton prénom"}</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Axel"
                    style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "14px 16px", fontSize: 15, color: "white", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginBottom: 8, display: "block" }}>{"Ton email"}</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="axel@email.com"
                    style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "14px 16px", fontSize: 15, color: "white", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginBottom: 8, display: "block" }}>{"Ton message"}</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Bonjour, je voudrais..."
                    rows={6}
                    style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "14px 16px", fontSize: 15, color: "white", outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "'Inter', sans-serif" }}
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={loading || !name || !email || !message}
                  style={{ background: "linear-gradient(135deg, #378ADD, #534AB7)", color: "white", border: "none", padding: "16px", borderRadius: 12, fontSize: 16, fontWeight: 500, cursor: "pointer", opacity: loading || !name || !email || !message ? 0.5 : 1 }}
                >
                  {loading ? "Envoi..." : "Envoyer le message →"}
                </button>
              </div>
            </>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 32, padding: "24px 48px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <a href="/cgu" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>{"CGU"}</a>
          <a href="/mentions-legales" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>{"Mentions légales"}</a>
          <a href="/confidentialite" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>{"Politique de confidentialité"}</a>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.2)" }}>{"© 2026 Viralto"}</span>
        </div>
      </div>
    </main>
  );
}
