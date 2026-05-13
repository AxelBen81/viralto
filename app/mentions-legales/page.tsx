export default function MentionsLegales() {
  return (
    <main style={{ background: "#080B14", minHeight: "100vh", color: "white", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "80px 48px" }}>
        <h1 style={{ fontSize: 40, fontWeight: 600, letterSpacing: -1, marginBottom: 8 }}>{"Mentions légales"}</h1>
        <p style={{ color: "rgba(255,255,255,0.4)", marginBottom: 48 }}>{"Dernière mise à jour : mai 2026"}</p>

        {[
          {
            title: "Éditeur du site",
            content: "Le site viralto.fr est édité par Axel Benmarnia, micro-entrepreneur. SIRET : 880 879 382 00021. Email : contact@viralto.fr"
          },
          {
            title: "Hébergement",
            content: "Le site est hébergé par Vercel Inc., 340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis. Site : vercel.com"
          },
          {
            title: "Propriété intellectuelle",
            content: "L'ensemble du contenu du site viralto.fr (textes, images, logo, interface) est protégé par le droit d'auteur. Toute reproduction sans autorisation est interdite."
          },
          {
            title: "Données personnelles",
            content: "Pour toute question relative à vos données personnelles, consultez notre Politique de Confidentialité ou contactez-nous à contact@viralto.fr."
          },
          {
            title: "Cookies",
            content: "Le site utilise des cookies techniques nécessaires à son fonctionnement. Aucun cookie publicitaire n'est utilisé."
          },
          {
            title: "Responsabilité",
            content: "Viralto s'efforce de maintenir le site accessible et à jour. Viralto ne saurait être tenu responsable des interruptions de service ou des erreurs dans les contenus générés par l'IA."
          },
          {
            title: "Droit applicable",
            content: "Le présent site est soumis au droit français. Tout litige sera soumis aux tribunaux compétents français."
          },
          {
            title: "Contact",
            content: "Pour toute question : contact@viralto.fr"
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
