export default function CGU() {
  return (
    <main style={{ background: "#080B14", minHeight: "100vh", color: "white", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "80px 48px" }}>
        <h1 style={{ fontSize: 40, fontWeight: 600, letterSpacing: -1, marginBottom: 8 }}>{"Conditions Générales d'Utilisation"}</h1>
        <p style={{ color: "rgba(255,255,255,0.4)", marginBottom: 48 }}>{"Dernière mise à jour : mai 2026"}</p>

        {[
          {
            title: "1. Objet",
            content: "Les présentes conditions générales d'utilisation (CGU) régissent l'accès et l'utilisation du service Viralto, accessible sur viralto.fr. En utilisant Viralto, vous acceptez sans réserve les présentes CGU."
          },
          {
            title: "2. Description du service",
            content: "Viralto est un outil SaaS propulsé par l'intelligence artificielle permettant aux créateurs de contenu de transformer leurs vidéos YouTube et TikTok en contenus optimisés pour les réseaux sociaux (captions Instagram, scripts TikTok, threads X, emails newsletter)."
          },
          {
            title: "3. Accès au service",
            content: "L'accès au service nécessite la création d'un compte. Le plan gratuit permet 3 générations par mois. Le plan Pro à 9€/mois permet des générations illimitées. Vous êtes responsable de la confidentialité de vos identifiants."
          },
          {
            title: "4. Abonnement et paiement",
            content: "Le plan Pro est facturé 9€ TTC par mois. Le paiement est traité par Stripe. Vous pouvez annuler votre abonnement à tout moment depuis votre espace client. L'annulation prend effet à la fin de la période de facturation en cours."
          },
          {
            title: "5. Propriété intellectuelle",
            content: "Les contenus générés par Viralto vous appartiennent. Vous êtes seul responsable de l'utilisation des contenus générés. Viralto et son interface sont protégés par les droits de propriété intellectuelle."
          },
          {
            title: "6. Responsabilité",
            content: "Viralto s'engage à fournir le service avec soin mais ne garantit pas des résultats spécifiques. Viralto ne saurait être tenu responsable des contenus générés par l'IA ni de leur utilisation par les utilisateurs."
          },
          {
            title: "7. Données personnelles",
            content: "Le traitement de vos données personnelles est décrit dans notre Politique de Confidentialité. En utilisant Viralto, vous acceptez cette politique."
          },
          {
            title: "8. Modification des CGU",
            content: "Viralto se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs seront informés des modifications par email."
          },
          {
            title: "9. Droit applicable",
            content: "Les présentes CGU sont soumises au droit français. En cas de litige, les tribunaux français seront compétents."
          },
          {
            title: "10. Contact",
            content: "Pour toute question concernant les présentes CGU, contactez-nous à : contact@viralto.fr"
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
