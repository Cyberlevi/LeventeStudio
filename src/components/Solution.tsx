import { Check } from 'lucide-react';

export default function Solution() {
  const oldWay = [
    'Weboldal külön projektként',
    'Marketing külön rendszerben',
    'Leadek e-mailben és üzenetekben',
    'Riportok üzleti összefüggés nélkül'
  ];

  const systemWay = [
    'Egy ügyfélút a kereséstől a leadig',
    'SEO, Ads és landing közös logikában',
    'Mérhető konverziós események',
    'Leadkezelés és automatizálható folyamatok'
  ];

  return (
    <section className="px-6 py-24 bg-taupe-50">
      <div className="max-w-5xl mx-auto">
        <p className="text-sm uppercase tracking-[0.18em] text-taupe-500 mb-4 text-center">A Levente Studio módszer</p>
        <h2 className="text-4xl md:text-5xl font-light text-taupe-900 mb-8 text-center">
          Nem több eszköz kell. Jobban összekötött rendszer kell.
        </h2>

        <p className="text-xl text-taupe-700 font-light text-center mb-16 max-w-3xl mx-auto">
          Az ügyfél nem weboldalt, GA4-et vagy CRM-et akar. Azt akarja, hogy egyszerűbben jöjjön be a megfelelő érdeklődő, és ne vesszen el a folyamatban.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/60 p-8 rounded-sm border border-taupe-200">
            <h3 className="text-2xl font-normal text-taupe-900 mb-6">Széttagolt működés</h3>
            <div className="space-y-4 text-taupe-700">
              {oldWay.map((item) => (
                <p className="flex items-start gap-3" key={item}>
                  <span className="text-taupe-400 mt-0.5">—</span>
                  <span>{item}</span>
                </p>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-sm border border-taupe-400">
            <h3 className="text-2xl font-normal text-taupe-900 mb-6">Összekötött ügyfélszerző rendszer</h3>
            <div className="space-y-4 text-taupe-700">
              {systemWay.map((item) => (
                <p className="flex items-start gap-3" key={item}>
                  <Check size={20} className="text-green-600 flex-shrink-0 mt-1" />
                  <span>{item}</span>
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto text-center border-t border-taupe-200 pt-10">
          <p className="text-lg text-taupe-700 font-light leading-relaxed">
            Az AI felgyorsítja az elemzést, a fejlesztést és az adminisztrációt. A döntéseket viszont továbbra is a valós üzleti folyamat és a mérési adatok vezetik.
          </p>
        </div>
      </div>
    </section>
  );
}
