import { AlertCircle, TrendingDown, Clock, Search } from 'lucide-react';

export default function ProblemAwareness() {
  const problems = [
    {
      icon: Clock,
      title: 'Lassú betöltés',
      description: '5 másodperc felett 90%-uk elmegy. A Google bünteti, a látogató nem vár.'
    },
    {
      icon: Search,
      title: 'Rossz SEO',
      description: 'Nem találják meg. Technikai hibák, rossz struktúra, érthetetlen tartalom.'
    },
    {
      icon: TrendingDown,
      title: 'Nincs konverzió',
      description: 'Sok látogató, nulla eredmény. Hiányzik a bizalom, a CTA, a logika.'
    },
    {
      icon: AlertCircle,
      title: 'Mobil katasztrófa',
      description: 'A forgalom 70%-a mobilról jön. Ha ott nem működik, üres a kasza.'
    }
  ];

  return (
    <section className="px-6 py-24 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-light text-taupe-900 mb-8 text-center">
          Miért nem működik a weboldalak többsége
        </h2>

        <p className="text-xl text-taupe-700 font-light text-center mb-16 max-w-3xl mx-auto">
          A weboldal készül, felkerül, aztán… semmi. Nem konvertál, nem hoz ügyfelet, nem termel pénzt.
          Négy fő ok van, amiért ez történik:
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <div key={index} className="bg-taupe-50 p-8 rounded-sm border border-taupe-200">
                <Icon size={32} className="text-taupe-700 mb-4" />
                <h3 className="text-2xl font-normal text-taupe-900 mb-3">
                  {problem.title}
                </h3>
                <p className="text-taupe-700 font-light leading-relaxed">
                  {problem.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-cream-50 p-8 md:p-12 rounded-sm border border-taupe-200">
          <p className="text-lg text-taupe-700 font-light leading-relaxed text-center">
            Ezek nem vélemények. Ezek mérések. Minden probléma kimutatható Analytics-ben,
            Search Console-ban, PageSpeed-ben. És ha kimutatható, akkor javítható is.
          </p>
        </div>
      </div>
    </section>
  );
}
