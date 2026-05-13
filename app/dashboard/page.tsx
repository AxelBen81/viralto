"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

interface Generation {
  id: string;
  url: string;
  created_at: string;
  month: string;
}

export default function Dashboard() {
  const { isSignedIn, user } = useUser();
  const [generations, setGenerations] = useState(0);
  const [isPro, setIsPro] = useState(false);
  const [history, setHistory] = useState<Generation[]>([]);

  useEffect(() => {
    if (isSignedIn && user) {
      fetch(`/api/generations?userId=${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setGenerations(data.count);
          setIsPro(data.is_pro ?? false);
        });

      fetch(`/api/history?userId=${user.id}`)
        .then((res) => res.json())
        .then((data) => setHistory(data.history ?? []));
    }
  }, [isSignedIn, user]);

  return (
    <main style={{ background: "#080B14", minHeight: "100vh", color: "white", fontFamily: "'Inter', sans-serif", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "fixed", top: -150, left: -150, width: 700, height: 700, background: "radial-gradient(circle, rgba(55,138,221,0.35) 0%, transparent 60%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", top: -100, right: -100, width: 600, height: 600, background: "radial-gradient(circle, rgba(83,74,183,0.3) 0%, transparent 60%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: -50, left: "25%", width: 500, height: 500, background: "radial-gradient(circle, rgba(55,138,221,0.15) 0%, transparent 60%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "50px 50px", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "80px 48px" }}>
          <h1 style={{ fontSize: 40, fontWeight: 600, letterSpacing: -1, marginBottom: 8 }}>Mon Dashboard</h1>
          <p style={{ color: "rgba(255,255,255,0.4)", marginBottom: 48 }}>{"Bienvenue, "}{user?.firstName} 👋</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 48 }}>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 24 }}>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>{"Générations ce mois"}</p>
              <p style={{ fontSize: 40, fontWeight: 600 }}>{generations}</p>
            </div>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 24 }}>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>{"Plan actuel"}</p>
              <p style={{ fontSize: 40, fontWeight: 600 }}>{isPro ? "Pro 🚀" : "Gratuit"}</p>
            </div>
          </div>

          {!isPro && (
            <div style={{ background: "linear-gradient(135deg, rgba(55,138,221,0.1), rgba(83,74,183,0.1))", border: "1px solid rgba(55,138,221,0.2)", borderRadius: 16, padding: 24, marginBottom: 48, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ fontWeight: 500, marginBottom: 4 }}>{"Passe à Pro pour des générations illimitées"}</p>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)" }}>{"9€/mois · Annulable à tout moment"}</p>
              </div>
              <a href="/pricing" style={{ background: "linear-gradient(135deg, #378ADD, #534AB7)", color: "white", padding: "12px 24px", borderRadius: 24, textDecoration: "none", fontWeight: 500, whiteSpace: "nowrap" }}>
                {"Passer à Pro →"}
              </a>
            </div>
          )}

          {/* Historique */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 20 }}>{"Historique des générations"}</h2>
            {history.length === 0 ? (
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 32, textAlign: "center" }}>
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 15 }}>{"Aucune génération pour l'instant — commence à générer du contenu !"}</p>
                <a href="/" style={{ display: "inline-block", marginTop: 16, background: "linear-gradient(135deg, #378ADD, #534AB7)", color: "white", padding: "10px 24px", borderRadius: 24, textDecoration: "none", fontSize: 14, fontWeight: 500 }}>
                  {"Générer du contenu →"}
                </a>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {history.map((gen) => (
                  <div key={gen.id} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(55,138,221,0.2)", color: "#85B7EB", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>
                        {gen.url?.includes("tiktok") ? "tt" : "yt"}
                      </div>
                      <div>
                        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", marginBottom: 2, maxWidth: 400, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {gen.url || "Vidéo générée"}
                        </p>
                        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
                          {new Date(gen.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                        </p>
                      </div>
                    </div>
                    <a href={gen.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "#85B7EB", textDecoration: "none" }}>
                      {"Voir →"}
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>

          <a href="/" style={{ display: "inline-block", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "white", padding: "12px 24px", borderRadius: 24, textDecoration: "none", fontWeight: 500 }}>
            {"← Retour à l'app"}
          </a>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 32, padding: "24px 48px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <a href="/cgu" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>{"CGU"}</a>
          <a href="/mentions-legales" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>{"Mentions légales"}</a>
          <a href="/confidentialite" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>{"Politique de confidentialité"}</a>
          <a href="/contact" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>{"Contact"}</a>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.2)" }}>{"© 2026 Viralto"}</span>
        </div>
      </div>
    </main>
  );
}
