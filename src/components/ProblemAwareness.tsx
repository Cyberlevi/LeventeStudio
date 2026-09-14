import { BarChart3, Link2Off, MessageSquareWarning, SearchX } from 'lucide-react';

export default function ProblemAwareness() {
  const problems = [
    {
      icon: SearchX,
      title: 'Van oldalad, de nincs rendszer',
      description: 'A weboldal külön él a kereséstől, a hirdetéstől és az ajánlatkéréstől. Emiatt nehéz megmondani, mi hoz valódi üzletet.'
    },
    {
      icon: Link2Off,
      title: 'Szétesik az ügyfélút',
      description: 'A látogató eljut az oldalra, de nem egyértelmű a következő lépés. A CTA, az ajánlat és a leadkezelés nincs összekötve.'
    },
    {
      icon: BarChart3,
      title: 'Mérsz, de nem tudod mit',
      description: 'Van GA4 vagy Ads, mégsem látszik tisztán, melyik kampányból, oldalból vagy keresésből lett valódi érdeklődő.'
    },
    {
      icon: MessageSquareWarning,
      title: 'Túl sok a kézi munka',
      description: 'Leadek e-mailben, jegyzetben és üzenetekben. A folyamat nehezen követhető, az adminisztráció pedig elveszi az időt az értékes munkától.'
    }
  ];

  return (
    <section className="px-6 py-24 bg-white">
      <div className="max-w-5xl mx-auto">
        <p className="text-sm uppercase tracking-[0.18em] text-taupe-500 mb-4 text-center">A valódi probléma</p>
        <h2 className="text-4xl md:text-5xl font-light text-taupe-900 mb-8 text-center">
          Nem az a kérdés, van-e weboldalad.
        </h2>

        <p className="text-xl text-taupe-700 font-light text-center mb-16 max-w-3xl mx-auto">
          Az a kérdés, hogy a teljes digitális folyamat együtt dolgozik-e azért, hogy a megfelelő érdeklődőből mérhető lead legyen.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {problems.map((problem) => {
            const Icon = problem.icon;
            return (
              <div key={problem.title} className="bg-taupe-50 p-8 rounded-sm border border-taupe-200">
                <Icon size={32} className="text-taupe-700 mb-4" />
                <h3 className="text-2xl font-normal text-taupe-900 mb-3">{problem.title}</h3>
                <p className="text-taupe-700 font-light leading-relaxed">{problem.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
