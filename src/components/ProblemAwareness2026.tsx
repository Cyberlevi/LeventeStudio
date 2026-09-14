import { BarChart3, Link2Off, MessageSquareWarning, SearchX } from 'lucide-react';

export default function ProblemAwareness2026() {
  const problems = [
    {
      icon: SearchX,
      code: 'SIGNAL/01',
      title: 'Van oldalad, de nincs rendszer',
      description: 'A weboldal külön él a kereséstől, a hirdetéstől és az ajánlatkéréstől. Emiatt nehéz megmondani, mi hoz valódi üzletet.'
    },
    {
      icon: Link2Off,
      code: 'SIGNAL/02',
      title: 'Szétesik az ügyfélút',
      description: 'A látogató eljut az oldalra, de nem egyértelmű a következő lépés. A CTA, az ajánlat és a leadkezelés nincs összekötve.'
    },
    {
      icon: BarChart3,
      code: 'SIGNAL/03',
      title: 'Mérsz, de nem tudod mit',
      description: 'Van GA4 vagy Ads, mégsem látszik tisztán, melyik kampányból, oldalból vagy keresésből lett valódi érdeklődő.'
    },
    {
      icon: MessageSquareWarning,
      code: 'SIGNAL/04',
      title: 'Túl sok a kézi munka',
      description: 'Leadek e-mailben, jegyzetben és üzenetekben. A folyamat nehezen követhető, az adminisztráció pedig elveszi az időt az értékes munkától.'
    }
  ];

  return (
    <section className="relative overflow-hidden bg-ivory-100 px-5 py-24 text-graphite-950 sm:px-6 md:py-32 lg:px-8">
      <div className="absolute inset-0 studio-grid opacity-45" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-12 border-b border-graphite-950/10 pb-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-graphite-500">
              <span className="signal-dot" />A valódi probléma
            </div>
            <h2 className="font-serif text-4xl font-light leading-[0.94] tracking-editorial text-balance sm:text-5xl md:text-6xl">
              Nem az a kérdés,
              <span className="block text-graphite-500">van-e weboldalad.</span>
            </h2>
          </div>
          <div className="lg:justify-self-end">
            <div className="mb-5 text-[10px] uppercase tracking-[0.2em] text-graphite-400">System health / 04 signals</div>
            <p className="max-w-2xl text-base font-light leading-relaxed text-graphite-600 sm:text-lg">
              Az a kérdés, hogy a teljes digitális folyamat együtt dolgozik-e azért, hogy a megfelelő érdeklődőből mérhető lead legyen.
            </p>
          </div>
        </div>

        <div className="mt-4">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <article key={problem.title} className="group grid gap-5 border-b border-graphite-950/10 py-8 transition-colors hover:bg-white/50 sm:grid-cols-[3.5rem_1fr] sm:px-4 md:grid-cols-[3.5rem_1fr_1.1fr] md:items-center md:gap-8 md:py-9">
                <div className="flex h-12 w-12 items-center justify-center border border-graphite-950/10 bg-white text-graphite-950 transition group-hover:border-signal-500/60 group-hover:bg-signal-400">
                  <Icon size={20} />
                </div>
                <div>
                  <div className="mb-2 text-[10px] uppercase tracking-[0.18em] text-graphite-400">{problem.code} · 0{index + 1}</div>
                  <h3 className="font-serif text-2xl font-light tracking-editorial text-graphite-950 sm:text-3xl">{problem.title}</h3>
                </div>
                <p className="font-light leading-relaxed text-graphite-600 sm:col-start-2 md:col-start-auto">{problem.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
