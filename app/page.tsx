"use client";
import { useState } from "react";

const fakeContent = {
  caption: `🎯 Tu pensais que c'était impossible ? Regarde ça.\n\nOn a testé cette méthode pendant 30 jours et les résultats sont dingues. Voici ce qu'on a appris :\n\n✅ Astuce 1 — Commence tôt le matin\n✅ Astuce 2 — Reste consistant\n✅ Astuce 3 — Mesure tout\n\nSauve ce post pour y revenir plus tard 👇\n\n#growth #creator #conseils`,
  tiktok: `[0-3s] Hook : "La majorité des gens font cette erreur sans le savoir..."\n\n[3-15s] Développement : Présente le problème principal avec un exemple concret et visuel.\n\n[15-25s] Solution : Montre ta méthode en 3 étapes rapides.\n\n[25-30s] CTA : "Suis-moi pour la suite, ça va changer ta façon de voir les choses."`,
  thread: `1/ La vérité que personne ne te dit sur la création de contenu en 2024.\n\nThread 🧵👇\n\n2/ La plupart des créateurs passent 80% de leur temps à produire, et 20% à distribuer.\n\nC'est exactement l'inverse qu'il faudrait faire.\n\n3/ Voici pourquoi : le meilleur contenu du monde ne sert à rien si personne ne le voit.\n\n4/ La solution : crée moins, distribue plus. Un seul bon contenu = 5 formats différents.\n\n5/ Sauve ce thread et partage-le si ça t'a aidé. 🙏`,
  email: `Objet : Ce que j'ai appris en 30 jours (et que je n'aurais pas dû ignorer)\n\nSalut [Prénom],\n\nJe voulais partager avec toi quelque chose d'important.\n\nCes dernières semaines, j'ai testé une nouvelle approche et les résultats m'ont surpris.\n\nVoici les 3 choses que j'ai retenues :\n\n1. La constance bat la perfection\n2. L'audience veut de l'authenticité\n3. Les petits formats convertissent mieux\n\nJ'espère que ça t'aide.\n\nÀ bientôt,\nViralto`,
};

const formats = [
  { key: "caption", label: "Caption Instagram", desc: "Hook + corps + CTA + emojis", icon: "ig", color: "bg-blue-50 text-blue-600" },
  { key: "tiktok", label: "Script TikTok", desc: "Hook 3s + narration + fin", icon: "tt", color: "bg-red-50 text-red-500" },
  { key: "thread", label: "Thread X", desc: "5 tweets enchaînés", icon: "x", color: "bg-green-50 text-green-600" },
  { key: "email", label: "Email", desc: "Objet + corps newsletter", icon: "@", color: "bg-yellow-50 text-yellow-600" },
];

const proFormats = [
  { label: "Pack hashtags", desc: "30 hashtags optimisés", icon: "#" },
  { label: "Story Instagram", desc: "Slides + textes clés", icon: "st" },
];

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState("");

  async function handleGenerate() {
    if (!url) return;
    setLoading(true);
    setGenerated(false);
    await new Promise((r) => setTimeout(r, 2000));
    setLoading(false);
    setGenerated(true);
  }

  function handleCopy(key: string, text: string) {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(""), 2000);
  }

  return (
    <main className="min-h-screen bg-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
        <span className="text-lg font-medium">Viralto</span>
        <div className="flex items-center gap-6">
          <span className="text-sm text-gray-500 cursor-pointer">Comment ça marche</span>
          <span className="text-sm text-gray-500 cursor-pointer">Tarifs</span>
          <button className="text-sm font-medium text-blue-600">Se connecter</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-2xl mx-auto px-8 py-24 text-center">
        <div className="inline-block text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full mb-6">
          IA générative
        </div>
        <h1 className="text-4xl font-medium text-gray-900 mb-4 leading-tight">
          Colle ta vidéo, tout le reste<br />on s&apos;en occupe.
        </h1>
        <p className="text-gray-500 mb-10">
          Transforme n&apos;importe quelle vidéo en kit de contenu prêt à publier.
        </p>

        <div className="flex gap-3 max-w-lg mx-auto mb-3">
          <input
            type="text"
            placeholder="Colle ton lien YouTube ou TikTok..."
            className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            onClick={handleGenerate}
            disabled={loading || !url}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-medium disabled:opacity-50"
          >
            {loading ? "Génération..." : "Générer"}
          </button>
        </div>
        <p className="text-xs text-gray-400">Fonctionne avec YouTube, TikTok et Instagram Reels</p>
      </section>

      {/* Section formats */}
      <section className="max-w-3xl mx-auto px-8 pb-24">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">Contenu généré</p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-2">
          {formats.map((f) => (
            <div key={f.key} className="border border-gray-100 rounded-xl p-4 bg-gray-50">
              <div className={`w-7 h-7 ${f.color} rounded-lg mb-3 flex items-center justify-center text-xs`}>
                {f.icon}
              </div>
              <p className="text-sm font-medium text-gray-800 mb-1">{f.label}</p>
              <p className="text-xs text-gray-400 mb-3">{f.desc}</p>
              {generated ? (
                <div className="relative">
                  <pre className="text-xs text-gray-600 whitespace-pre-wrap bg-white border border-gray-100 rounded-lg p-3 max-h-40 overflow-y-auto">
                    {fakeContent[f.key as keyof typeof fakeContent]}
                  </pre>
                  <button
                    onClick={() => handleCopy(f.key, fakeContent[f.key as keyof typeof fakeContent])}
                    className="mt-2 text-xs text-blue-600 font-medium"
                  >
                    {copied === f.key ? "✅ Copié !" : "Copier"}
                  </button>
                </div>
              ) : (
                <div className="h-8 bg-gray-100 rounded-lg animate-pulse" />
              )}
            </div>
          ))}
        </div>

        {/* Formats Pro */}
        <div className="grid grid-cols-2 gap-3 mt-3">
          {proFormats.map((f) => (
            <div key={f.label} className="border border-gray-100 rounded-xl p-4 bg-gray-50 opacity-40">
              <div className="w-7 h-7 bg-gray-100 rounded-lg mb-3 flex items-center justify-center text-gray-400 text-xs">
                {f.icon}
              </div>
              <p className="text-sm font-medium text-gray-800 mb-1">{f.label}</p>
              <p className="text-xs text-gray-400">{f.desc}</p>
              <p className="text-xs text-gray-300 mt-2">Pro</p>
            </div>
          ))}
        </div>

        {/* Barre du bas */}
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
          <span className="text-xs text-gray-400">Plan gratuit — 3 générations restantes</span>
          <button className="text-xs font-medium text-blue-600">Passer à Pro →</button>
        </div>
      </section>

    </main>
  );
}
