import { BarChart3, Link2Off, MessageSquareWarning, SearchX } from 'lucide-react';

export default function ProblemAwareness() {
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
    <section className="relative overflow-hidden bg-graphite-950 px-5 py-24 text-white sm:px-6 md:py-32 lg:px-8">
      <div className="absolute inset-0 subpage-signal-grid opacity-25" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <div className="signal-kicker mb-5"><span className="signal-dot" />A valódi probléma</div>
            <h2 className="font-serif text-4xl font-light leading-[0.94] tracking-editorial text-balance sm:text-5xl md:text-6xl">
              Nem az a kérdés,
              <span className="block text-signal-400">van-e weboldalad.</span>
            </h2>
          </div>
          <p className="max-w-2xl text-base font-light leading-relaxed text-white/55 sm:text-lg lg:justify-self-end">
            Az a kérdés, hogy a teljes digitális folyamat együtt dolgozik-e azért, hogy a megfelelő érdeklődőből mérhető lead legyen.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {problems.map((problem) => {
            const Icon = problem.icon;
            return (
              <article key={problem.title} className="tech-card-dark p-6 sm:p-7 md:p-8">
                <div className="mb-10 flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center border border-white/10 text-signal-400"><Icon size={20} /></div>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-white/30">{problem.code}</span>
                </div>
                <h3 className="font-serif text-3xl font-light tracking-editorial text-white sm:text-4xl">{problem.title}</h3>
                <p className="mt-4 max-w-xl font-light leading-relaxed text-white/55">{problem.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
