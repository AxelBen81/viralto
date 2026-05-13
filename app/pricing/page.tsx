"use client";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";

export default function Pricing() {
  const { user, isSignedIn } = useUser();
  const [loading, setLoading] = useState(false);
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    if (isSignedIn && user) {
      fetch(`/api/generations?userId=${user.id}`)
        .then((res) => res.json())
        .then((data) => setIsPro(data.is_pro ?? false));
    }
  }, [isSignedIn, user]);

  async function handleUpgrade() {
    if (!isSignedIn || !user) {
      window.location.href = "/";
      return;
    }
    setLoading(true);
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        email: user.emailAddresses[0]?.emailAddress,
      }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    setLoading(false);
  }

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
            <a href="/how-it-works" style={{ fontSize: 16, color: "white", textDecoration: "none", fontWeight: 500 }}>Comment ça marche</a>
            <a href="/pricing" style={{ fontSize: 16, color: "white", textDecoration: "none", fontWeight: 500 }}>Tarifs</a>
            {!isSignedIn ? (
              <a href="/" style={{ fontSize: 15, color: "white", background: "linear-gradient(135deg, #378ADD, #534AB7)", padding: "10px 24px", borderRadius: 24, textDecoration: "none", fontWeight: 500 }}>
                Essayer gratuitement
              </a>
            ) : isPro ? (
              <a href="/" style={{ fontSize: 15, color: "white", background: "linear-gradient(135deg, #378ADD, #534AB7)", padding: "10px 24px", borderRadius: 24, textDecoration: "none", fontWeight: 500 }}>
                {"Générer du contenu →"}
              </a>
            ) : (
              <a href="/" style={{ fontSize: 15, color: "white", background: "linear-gradient(135deg, #378ADD, #534AB7)", padding: "10px 24px", borderRadius: 24, textDecoration: "none", fontWeight: 500 }}>
                {"Essayer gratuitement"}
              </a>
            )}
          </div>
        </nav>

        {/* Hero */}
        <section className="animate-fade-in" style={{ maxWidth: 700, margin: "0 auto", padding: "80px 48px 60px", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, color: "#85B7EB", background: "rgba(55,138,221,0.1)", border: "1px solid rgba(55,138,221,0.2)", padding: "6px 16px", borderRadius: 24, marginBottom: 32 }}>
            <div style={{ width: 6, height: 6, background: "#378ADD", borderRadius: "50%", boxShadow: "0 0 6px #378ADD" }} />
            {"Moins cher qu'une heure de travail"}
          </div>
          <h1 style={{ fontSize: 56, fontWeight: 600, lineHeight: 1.1, marginBottom: 20, letterSpacing: -2 }}>
            {"Arrête de perdre"}{" "}
            <span className="gradient-animated">{"des heures"}</span>
            <br />{"à créer du contenu."}
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
            {"Un créateur passe en moyenne 3h par semaine à adapter son contenu. Viralto Pro le fait en 30 secondes."}
          </p>
        </section>

        {/* Valeur perçue */}
        <section className="animate-fade-in animate-fade-in-delay-1" style={{ maxWidth: 800, margin: "0 auto", padding: "0 48px 60px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {[
              { icon: "⏱️", label: "3h économisées", desc: "par semaine en moyenne" },
              { icon: "📱", label: "6 formats", desc: "générés en 30 secondes" },
              { icon: "💸", label: "9€/mois", desc: "soit 0,30€ par jour" },
            ].map((item) => (
              <div key={item.label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 24, textAlign: "center" }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>{item.icon}</div>
                <p style={{ fontSize: 18, fontWeight: 600, color: "white", marginBottom: 4 }}>{item.label}</p>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>{item.desc}</p>
              </div>
            ))}
          </div>
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
                  { text: "Générations illimitées", included: false },
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
              <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg, #378ADD, #534AB7)", color: "white", fontSize: 12, fontWeight: 500, padding: "4px 16px", borderRadius: 20, whiteSpace: "nowrap" }}>
                🔥 Le plus populaire
              </div>
              <p style={{ fontSize: 13, color: "#85B7EB", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.1em" }}>Pro</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 6 }}>
                <span style={{ fontSize: 48, fontWeight: 600, color: "white" }}>9€</span>
                <span style={{ fontSize: 15, color: "rgba(255,255,255,0.4)" }}>/mois</span>
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", marginBottom: 32 }}>{"Sans engagement · Annulable à tout moment"}</p>

              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
                {[
                  "✨ Générations illimitées",
                  "Caption Instagram",
                  "Script TikTok",
                  "Thread X",
                  "Email newsletter",
                  "Pack hashtags (30 hashtags)",
                  "Story Instagram (5 slides)",
                ].map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ color: "#378ADD", fontSize: 16 }}>✓</span>
                    <span style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>{item}</span>
                  </div>
                ))}
              </div>

              {isPro ? (
                <div style={{ display: "block", width: "100%", textAlign: "center", background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)", padding: "14px", borderRadius: 12, fontSize: 15, fontWeight: 500 }}>
                  {"✅ Tu es déjà Pro !"}
                </div>
              ) : (
                <button
                  onClick={handleUpgrade}
                  disabled={loading}
                  style={{ display: "block", width: "100%", textAlign: "center", background: "linear-gradient(135deg, #378ADD, #534AB7)", color: "white", padding: "14px", borderRadius: 12, fontSize: 15, fontWeight: 500, border: "none", cursor: "pointer", opacity: loading ? 0.7 : 1 }}
                >
                  {loading ? "Chargement..." : "Passer à Pro → 9€/mois"}
                </button>
              )}

              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", textAlign: "center", marginTop: 12 }}>
                {"🔒 Paiement sécurisé par Stripe"}
              </p>
            </div>
          </div>

          {/* Garantie */}
          <div style={{ marginTop: 32, background: "rgba(99,153,34,0.08)", border: "1px solid rgba(99,153,34,0.2)", borderRadius: 16, padding: 24, textAlign: "center" }}>
            <p style={{ fontSize: 16, fontWeight: 500, color: "white", marginBottom: 6 }}>{"🛡️ Satisfait ou remboursé 7 jours"}</p>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)" }}>{"Si Viralto ne te convient pas, contacte-nous sous 7 jours et on te rembourse intégralement."}</p>
          </div>

          {/* FAQ */}
          <div style={{ marginTop: 80 }}>
            <h2 style={{ fontSize: 32, fontWeight: 600, color: "white", marginBottom: 40, textAlign: "center", letterSpacing: -1 }}>{"Questions fréquentes"}</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { q: "Est-ce que je peux annuler à tout moment ?", a: "Oui, sans engagement. Tu annules en un clic depuis ton dashboard et tu ne seras plus prélevé le mois suivant." },
                { q: "Quelles plateformes sont supportées ?", a: "Viralto fonctionne avec YouTube et TikTok. Tu colles le lien, on s'occupe du reste." },
                { q: "Le contenu est-il vraiment basé sur ma vidéo ?", a: "Oui — Viralto transcrit ta vidéo et génère du contenu basé exactement sur ce qui est dit. Chaque résultat est unique." },
                { q: "Que se passe-t-il quand j'atteins ma limite gratuite ?", a: "Tu peux passer à Pro pour des générations illimitées, ou attendre le mois suivant pour avoir à nouveau 3 générations gratuites." },
                { q: "Est-ce que le paiement est sécurisé ?", a: "Oui — les paiements sont traités par Stripe, le leader mondial du paiement en ligne. Viralto ne stocke jamais tes données bancaires." },
              ].map((item) => (
                <div key={item.q} className="card-hover" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 24 }}>
                  <p style={{ fontSize: 16, fontWeight: 500, color: "white", marginBottom: 10 }}>{item.q}</p>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "center", gap: 32, padding: "24px 48px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <a href="/cgu" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>{"CGU"}</a>
          <a href="/confidentialite" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>{"Politique de confidentialité"}</a>
          <a href="/mentions-legales" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>{"Mentions légales"}</a>
          <a href="/contact" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>{"Contact"}</a>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.2)" }}>{"© 2026 Viralto"}</span>
        </div>

      </div>
    </main>
  );
}
