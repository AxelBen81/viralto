export default function Confidentialite() {
  return (
    <main style={{ background: "#080B14", minHeight: "100vh", color: "white", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "80px 48px" }}>
        <h1 style={{ fontSize: 40, fontWeight: 600, letterSpacing: -1, marginBottom: 8 }}>{"Politique de Confidentialité"}</h1>
        <p style={{ color: "rgba(255,255,255,0.4)", marginBottom: 48 }}>{"Dernière mise à jour : mai 2026"}</p>

        {[
          {
            title: "1. Responsable du traitement",
            content: "Viralto, accessible sur viralto.fr, est responsable du traitement de vos données personnelles."
          },
          {
            title: "2. Données collectées",
            content: "Nous collectons les données suivantes : adresse email et prénom (via Clerk lors de la création de compte), données de paiement (traitées directement par Stripe, non stockées par Viralto), identifiant utilisateur et nombre de générations effectuées."
          },
          {
            title: "3. Utilisation des données",
            content: "Vos données sont utilisées pour : gérer votre compte et votre abonnement, vous envoyer des emails liés au service (bienvenue, notifications), améliorer le service Viralto."
          },
          {
            title: "4. Conservation des données",
            content: "Vos données sont conservées pendant toute la durée de votre utilisation du service, et supprimées dans un délai de 30 jours suivant la clôture de votre compte."
          },
          {
            title: "5. Partage des données",
            content: "Vos données ne sont jamais vendues à des tiers. Elles peuvent être partagées avec nos prestataires techniques : Clerk (authentification), Stripe (paiement), Supabase (base de données), Resend (emails), Anthropic (génération IA) et Supadata (transcription vidéo)."
          },
          {
            title: "6. Vos droits",
            content: "Conformément au RGPD, vous disposez des droits suivants : droit d'accès, de rectification, d'effacement, de limitation, de portabilité et d'opposition. Pour exercer ces droits, contactez-nous à contact@viralto.fr."
          },
          {
            title: "7. Cookies",
            content: "Viralto utilise des cookies techniques nécessaires au fonctionnement du service (authentification, session). Aucun cookie publicitaire ou de tracking n'est utilisé."
          },
          {
            title: "8. Sécurité",
            content: "Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte ou divulgation."
          },
          {
            title: "9. Contact",
            content: "Pour toute question relative à vos données personnelles : contact@viralto.fr"
          },
        ].map((section) => (
          <div key={section.title} style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12, color: "white" }}>{section.title}</h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>{section.content}</p>
          </div>
        ))}

        <a href="/" style={{ display: "inline-block", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "white", padding: "12px 24px", borderRadius: 24, textDecoration: "none", fontWeight: 500, marginTop: 24 }}>
          {"← Retour à l'accueil"}
        </a>
      </div>
    </main>
  );
}
