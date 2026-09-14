import { Check, Minus } from 'lucide-react';

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
    <section className="relative overflow-hidden bg-graphite-900 px-5 py-24 text-white sm:px-6 md:py-32 lg:px-8">
      <div className="absolute inset-0 studio-grid-dark opacity-20" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end md:mb-16">
          <div>
            <div className="signal-kicker mb-5"><span className="signal-dot" />A Levente Studio módszer</div>
            <h2 className="font-serif text-4xl font-light leading-[0.94] tracking-editorial text-balance sm:text-5xl md:text-6xl">
              Nem több eszköz kell.
              <span className="block text-signal-400">Jobban összekötött rendszer kell.</span>
            </h2>
          </div>
          <p className="max-w-2xl text-base font-light leading-relaxed text-white/55 sm:text-lg lg:justify-self-end">
            Az ügyfél nem weboldalt, GA4-et vagy CRM-et akar. Azt akarja, hogy egyszerűbben jöjjön be a megfelelő érdeklődő, és ne vesszen el a folyamatban.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="border border-white/10 bg-white/[0.02] p-6 sm:p-8">
            <div className="mb-8 text-[10px] uppercase tracking-[0.2em] text-white/30">Legacy / fragmented</div>
            <h3 className="mb-7 font-serif text-3xl font-light tracking-editorial text-white/70">Széttagolt működés</h3>
            <div className="space-y-4">
              {oldWay.map((item) => (
                <p className="flex items-start gap-3 text-white/45" key={item}>
                  <Minus size={18} className="mt-1 flex-shrink-0 text-white/25" />
                  <span>{item}</span>
                </p>
              ))}
            </div>
          </div>

          <div className="system-panel border border-signal-400/25 p-6 sm:p-8">
            <div className="mb-8 flex items-center justify-between gap-4">
              <span className="text-[10px] uppercase tracking-[0.2em] text-signal-400">System / connected</span>
              <span className="signal-dot" />
            </div>
            <h3 className="mb-7 font-serif text-3xl font-light tracking-editorial text-white">Összekötött ügyfélszerző rendszer</h3>
            <div className="space-y-4">
              {systemWay.map((item) => (
                <p className="flex items-start gap-3 text-white/75" key={item}>
                  <Check size={18} className="mt-1 flex-shrink-0 text-signal-400" />
                  <span>{item}</span>
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-8 md:mt-12">
          <p className="max-w-3xl text-base font-light leading-relaxed text-white/45 sm:text-lg">
            Az AI felgyorsítja az elemzést, a fejlesztést és az adminisztrációt. A döntéseket viszont továbbra is a valós üzleti folyamat és a mérési adatok vezetik.
          </p>
        </div>
      </div>
    </section>
  );
}
