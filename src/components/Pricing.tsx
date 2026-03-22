import { Check } from 'lucide-react';
import { trackCTAClick } from '../utils/gtm';

export default function Pricing() {
  const packages = [
    {
      name: 'Induló weboldal',
      price: '250.000 Ft-tól',
      description: 'Egyszerű bemutatkozó oldal, akiknek digitális névjegykártya kell',
      features: [
        '1 landing page (főoldal)',
        'SEO alapbeállítások',
        'Mobil-barát design',
        'Kapcsolat űrlap',
        'Google Analytics telepítés',
        '30 nap támogatás'
      ],
      notIncluded: [
        'Blog funkció',
        'Több aloldal',
        'Havidíjas karbantartás'
      ],
      suitableFor: 'Induló vállalkozások, akiknek egyszerű online jelenlét kell',
      popular: false
    },
    {
      name: 'Ügyfélszerző weboldal',
      price: '500.000 Ft-tól',
      description: 'Teljes körű weboldal, ami tényleg hoz ügyfeleket',
      features: [
        'Főoldal + 4 aloldal',
        'Teljes SEO optimalizálás (kulcsszó kutatás, on-page)',
        'Konverzió optimalizálás',
        'Blog funkció (opcionális tartalom írás)',
        'Kapcsolat űrlap + időpontfoglalás integráció',
        'Google Analytics + Search Console',
        '60 nap támogatás',
        '1 hónapos finomítási lehetőség'
      ],
      notIncluded: [],
      suitableFor: 'Kisvállalkozások (fodrász, ügyvéd, könyvelő, szerviz), akiknek bevételt kell generálnia a weboldalnak',
      popular: true
    },
    {
      name: 'Prémium online rendszer',
      price: '750.000 Ft-tól',
      description: 'Komplett megoldás időpontfoglalással és ügyfélkezeléssel',
      features: [
        'Korlátlan aloldal',
        'Minden az Ügyfélszerző csomagból',
        'Online időpontfoglalás',
        'Admin felület (ügyfélkezelés)',
        'Email automatizálás',
        'Havidíjas karbantartás első 3 hónap ingyen',
        '90 nap támogatás'
      ],
      notIncluded: [],
      suitableFor: 'Nagyobb szolgáltatók (ügyvédi iroda, egészségügyi rendelő, coworking), akiknek komplex funkciók kellenek',
      popular: false
    }
  ];

  return (
    <section id="csomagok" className="px-6 py-24 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-light text-taupe-900 mb-8 text-center">
          Melyik csomag való neked?
        </h2>

        <p className="text-xl text-taupe-700 font-light text-center mb-16 max-w-3xl mx-auto">
          Átlátható árak, nincs rejtett költség. Amiben megegyeztünk, az lesz.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-sm border ${
                pkg.popular
                  ? 'bg-gradient-to-br from-blue-50 to-taupe-50 border-blue-300 ring-2 ring-blue-300'
                  : 'bg-taupe-50 border-taupe-200'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-sm text-sm font-medium">
                  Legnépszerűbb
                </div>
              )}

              <h3 className="text-2xl font-normal text-taupe-900 mb-2">
                {pkg.name}
              </h3>

              <div className="text-3xl font-normal text-taupe-900 mb-4">
                {pkg.price}
              </div>

              <p className="text-sm text-taupe-700 font-light mb-6">
                {pkg.description}
              </p>

              <div className="space-y-3 mb-6">
                {pkg.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-taupe-700">{feature}</span>
                  </div>
                ))}
                {pkg.notIncluded.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2 opacity-40">
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-sm text-taupe-700">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mb-6 p-4 bg-white/50 rounded-sm border border-taupe-200">
                <p className="text-sm text-taupe-700 font-light">
                  <strong className="text-taupe-900">Kinek való:</strong><br />
                  {pkg.suitableFor}
                </p>
              </div>

              <a
                href="#kapcsolat"
                onClick={() => trackCTAClick(`Pricing - ${pkg.name}`, 'pricing_cta')}
                className={`block w-full text-center px-6 py-3 rounded-sm font-normal transition-colors ${
                  pkg.popular
                    ? 'bg-taupe-900 text-cream-50 hover:bg-taupe-800'
                    : 'bg-taupe-700 text-cream-50 hover:bg-taupe-800'
                }`}
              >
                Ezt választom
              </a>
            </div>
          ))}
        </div>

        <div className="text-center text-sm text-taupe-600 space-y-2">
          <p>
            💳 <strong>Fizetés:</strong> 50% előleg, 50% átadáskor | Számla, átutalás
          </p>
          <p>
            🔒 <strong>Garancia:</strong> Ha 30 napon belül nem vagy elégedett, visszaadjuk a pénzed
          </p>
        </div>
      </div>
    </section>
  );
}
