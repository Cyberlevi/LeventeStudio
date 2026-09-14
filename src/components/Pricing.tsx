import { Check, Gauge, Rocket, Workflow } from 'lucide-react';
import { trackCTAClick } from '../utils/gtm';

export default function Pricing() {
  const packages = [
    {
      name: 'START',
      price: '250.000 Ft-tól',
      tagline: 'Ügyfélszerző jelenlét',
      description: 'Gyors indulás annak, akinek nem digitális névjegykártya kell, hanem mérhető online alap.',
      icon: Gauge,
      features: [
        'Konverzióra épített landing vagy kompakt weboldal',
        'Technikai SEO alapok és strukturált adatok',
        'GA4 + alap konverziómérés',
        'Mobil-first, gyors Astro megvalósítás',
        'Ajánlatkérő / kapcsolatfelvételi folyamat',
        '30 nap indulás utáni támogatás'
      ],
      suitableFor: 'Új vagy újrainduló szolgáltatói vállalkozásnak, ahol az első cél a stabil és mérhető leadgyűjtés.',
      popular: false
    },
    {
      name: 'GROW',
      price: '500.000 Ft-tól',
      tagline: 'Ügyfélszerző rendszer',
      description: 'A weboldal, a keresési jelenlét, a mérés és a leadfolyamat egyetlen üzleti rendszerként működik.',
      icon: Rocket,
      features: [
        'Komplett szolgáltatói web- és landing rendszer',
        'SEO + kulcsszó- és keresési szándék struktúra',
        'GA4 + GTM + lead események',
        'Google Ads-ready konverziómérés',
        'Ajánlatkérési funnel és CTA-optimalizálás',
        'Leadértesítések és alap automatizálások',
        '60 nap mérés és finomhangolás'
      ],
      suitableFor: 'Működő vállalkozásnak, amely több megkeresést szeretne és végre látni akarja, melyik csatorna termel üzletet.',
      popular: true
    },
    {
      name: 'SCALE',
      price: '750.000 Ft-tól',
      tagline: 'Digitális működési rendszer',
      description: 'Az ügyfélszerzés és az utánkövetés több pontját automatizáljuk, hogy a rendszer növekedés közben is kezelhető maradjon.',
      icon: Workflow,
      features: [
        'Minden a GROW rendszerből',
        'CRM vagy egyedi lead dashboard',
        'Automatikus státuszok és értesítések',
        'Email- és workflow automatizálások',
        'AI-támogatott belső folyamatok, ahol valóban indokolt',
        'Egyedi dashboard és döntéstámogató mérés',
        '90 nap közös optimalizálás'
      ],
      suitableFor: 'Növekedő szolgáltatóknak, ahol már nem a weboldal a szűk keresztmetszet, hanem a teljes lead- és ügyfélkezelési folyamat.',
      popular: false
    }
  ];

  return (
    <section id="csomagok" className="px-6 py-24 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="text-sm uppercase tracking-[0.18em] text-taupe-500 mb-4">Rendszerek, nem oldalszámok</div>
          <h2 className="font-serif text-4xl md:text-6xl font-light text-taupe-900 mb-6">
            Ott kezdjük, ahol most tart a vállalkozásod.
          </h2>
          <p className="text-xl text-taupe-700 font-light">
            Nem azért fizetsz többet, mert több aloldalt rajzolunk. Az ár a rendszer mélységével, a méréssel és az automatizálással nő.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {packages.map((pkg) => {
            const Icon = pkg.icon;
            return (
              <div
                key={pkg.name}
                className={`relative p-8 border ${
                  pkg.popular
                    ? 'bg-taupe-900 text-cream-50 border-taupe-900 ring-2 ring-taupe-300'
                    : 'bg-taupe-50 text-taupe-900 border-taupe-200'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cream-50 text-taupe-900 border border-taupe-300 px-4 py-1 text-sm font-medium">
                    Legjobb belépési pont
                  </div>
                )}

                <div className={`w-11 h-11 flex items-center justify-center border mb-6 ${pkg.popular ? 'border-taupe-600' : 'border-taupe-300'}`}>
                  <Icon size={21} />
                </div>

                <div className={`text-xs uppercase tracking-[0.18em] mb-2 ${pkg.popular ? 'text-cream-300' : 'text-taupe-500'}`}>
                  {pkg.name}
                </div>
                <h3 className="text-2xl font-normal mb-1">{pkg.tagline}</h3>
                <div className={`text-3xl font-light mb-5 ${pkg.popular ? 'text-cream-50' : 'text-taupe-900'}`}>{pkg.price}</div>
                <p className={`text-sm font-light leading-relaxed mb-7 ${pkg.popular ? 'text-cream-200' : 'text-taupe-700'}`}>
                  {pkg.description}
                </p>

                <div className="space-y-3 mb-7">
                  {pkg.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2">
                      <Check size={18} className={`flex-shrink-0 mt-0.5 ${pkg.popular ? 'text-cream-300' : 'text-green-700'}`} />
                      <span className={`text-sm ${pkg.popular ? 'text-cream-100' : 'text-taupe-700'}`}>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className={`mb-7 p-4 border ${pkg.popular ? 'border-taupe-600 bg-taupe-800/50' : 'border-taupe-200 bg-white/70'}`}>
                  <p className={`text-sm font-light ${pkg.popular ? 'text-cream-200' : 'text-taupe-700'}`}>
                    <strong className={pkg.popular ? 'text-cream-50' : 'text-taupe-900'}>Kinek való:</strong><br />
                    {pkg.suitableFor}
                  </p>
                </div>

                <a
                  href="#kapcsolat"
                  onClick={() => trackCTAClick(`Pricing - ${pkg.name}`, 'pricing_cta')}
                  className={`block w-full text-center px-6 py-3 font-normal transition-colors ${
                    pkg.popular
                      ? 'bg-cream-50 text-taupe-900 hover:bg-cream-100'
                      : 'bg-taupe-900 text-cream-50 hover:bg-taupe-800'
                  }`}
                >
                  Beszéljük át
                </a>
              </div>
            );
          })}
        </div>

        <div className="max-w-3xl mx-auto text-center text-sm text-taupe-600 leading-relaxed">
          A végleges ajánlatot a cél, a meglévő rendszer és a szükséges integrációk alapján adjuk. A cél minden csomagnál ugyanaz: mérhetőbb ügyfélszerzés és egyszerűbb működés.
        </div>
      </div>
    </section>
  );
}
