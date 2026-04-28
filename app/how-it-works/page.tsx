export default function HowItWorks() {
  return (
    <main className="min-h-screen bg-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
        <a href="/" className="text-lg font-medium">Viralto</a>
        <div className="flex items-center gap-6">
          <a href="/how-it-works" className="text-sm text-blue-600 font-medium">Comment ça marche</a>
          <a href="/pricing" className="text-sm text-gray-500">Tarifs</a>
          <button className="text-sm font-medium text-blue-600">Se connecter</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-2xl mx-auto px-8 py-16 text-center">
        <h1 className="text-4xl font-medium text-gray-900 mb-4">
          Comment ça marche ?
        </h1>
        <p className="text-gray-500">
          En 3 étapes simples, transforme n&apos;importe quelle vidéo en kit de contenu complet.
        </p>
      </section>

      {/* Étapes */}
      <section className="max-w-3xl mx-auto px-8 pb-24">

        <div className="flex flex-col gap-8">

          {/* Étape 1 */}
          <div className="flex gap-6 items-start">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
              1
            </div>
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">Colle ton lien</h2>
              <p className="text-gray-500 text-sm">
                Copie l&apos;URL de ta vidéo YouTube, TikTok ou Instagram Reel et colle-la dans Viralto. C&apos;est tout ce dont on a besoin.
              </p>
            </div>
          </div>

          <div className="w-px h-8 bg-gray-100 ml-5" />

          {/* Étape 2 */}
          <div className="flex gap-6 items-start">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
              2
            </div>
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">Notre IA analyse ta vidéo</h2>
              <p className="text-gray-500 text-sm">
                Viralto transcrit et analyse le contenu de ta vidéo en quelques secondes. Pas besoin de résumer, ni de recopier quoi que ce soit.
              </p>
            </div>
          </div>

          <div className="w-px h-8 bg-gray-100 ml-5" />

          {/* Étape 3 */}
          <div className="flex gap-6 items-start">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
              3
            </div>
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">Récupère ton kit de contenu</h2>
              <p className="text-gray-500 text-sm">
                En 30 secondes, tu reçois une caption Instagram, un script TikTok, un thread X et un email prêts à publier. Copie et poste.
              </p>
            </div>
          </div>

        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a href="/" className="bg-blue-600 text-white px-8 py-3 rounded-xl text-sm font-medium">
            Essayer gratuitement
          </a>
        </div>

      </section>

    </main>
  );
}
