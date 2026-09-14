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
      features: ['Konverziós landing vagy kompakt web', 'Technikai SEO + schema', 'GA4 + alap leadmérés', 'Mobil-first Astro', 'Ajánlatkérési út', '30 nap támogatás'],
      suitableFor: 'Új vagy újrainduló szolgáltató vállalkozásnak.',
      popular: false
    },
    {
      name: 'GROW',
      price: '500.000 Ft-tól',
      tagline: 'Ügyfélszerző rendszer',
      description: 'A web, a keresési jelenlét, a mérés és a leadfolyamat egyetlen üzleti rendszerként működik.',
      icon: Rocket,
      features: ['Komplett web- és landing rendszer', 'SEO + keresési szándék', 'GA4 + GTM + lead események', 'Ads-ready konverziómérés', 'CTA + funnel optimalizálás', 'Alap automatizálások', '60 nap finomhangolás'],
      suitableFor: 'Működő vállalkozásnak, amely több és mérhetőbb megkeresést akar.',
      popular: true
    },
    {
      name: 'SCALE',
      price: '750.000 Ft-tól',
      tagline: 'Digitális működési rendszer',
      description: 'Az ügyfélszerzés és utánkövetés több pontját automatizáljuk, hogy növekedés közben is kezelhető maradjon.',
      icon: Workflow,
      features: ['Minden a GROW rendszerből', 'CRM vagy lead dashboard', 'Automatikus státuszok', 'Email/workflow automatizálás', 'AI-támogatott belső folyamatok', 'Egyedi dashboard', '90 nap optimalizálás'],
      suitableFor: 'Növekedő szolgáltatónak, ahol már a teljes működés a szűk keresztmetszet.',
      popular: false
    }
  ];

  return (
    <section id="csomagok" className="relative overflow-hidden bg-graphite-950 px-5 py-24 text-white sm:px-6 md:py-32 lg:px-8">
      <div className="absolute inset-0 subpage-signal-grid opacity-20" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-14 grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end md:mb-16">
          <div>
            <div className="signal-kicker mb-5"><span className="signal-dot" />Rendszerek, nem oldalszámok</div>
            <h2 className="font-serif text-4xl font-light leading-[0.94] tracking-editorial text-balance sm:text-5xl md:text-6xl">Ott kezdjük, <span className="text-signal-400">ahol most tartasz.</span></h2>
          </div>
          <p className="max-w-2xl text-base font-light leading-relaxed text-white/55 sm:text-lg lg:justify-self-end">Az ár nem az aloldalak számától nő, hanem a rendszer mélységétől, a méréstől és az automatizálástól.</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-12">
          {packages.map((pkg, index) => {
            const Icon = pkg.icon;
            const span = pkg.popular ? 'lg:col-span-6' : 'lg:col-span-3';
            const mobileOrder = pkg.popular ? 'order-first lg:order-none' : 'lg:order-none';
            return (
              <article key={pkg.name} className={`${mobileOrder} ${span} relative flex min-h-full flex-col border p-6 sm:p-7 ${pkg.popular ? 'system-panel border-signal-400/35' : 'border-white/10 bg-white/[0.02]'}`}>
                {pkg.popular && <div className="absolute right-5 top-5 text-[10px] uppercase tracking-[0.18em] text-signal-400">Recommended</div>}
                <div className="mb-10 flex h-11 w-11 items-center justify-center border border-white/10 text-signal-400"><Icon size={20} /></div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-white/35">SYS/{String(index + 1).padStart(2, '0')} · {pkg.name}</div>
                <h3 className={`${pkg.popular ? 'text-4xl sm:text-5xl' : 'text-3xl'} mt-3 font-serif font-light tracking-editorial text-white`}>{pkg.tagline}</h3>
                <div className="mt-3 text-xl text-signal-400">{pkg.price}</div>
                <p className="mt-5 text-sm font-light leading-relaxed text-white/50">{pkg.description}</p>

                <div className="my-7 h-px bg-white/10" />
                <div className="space-y-3">
                  {pkg.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2.5 text-sm text-white/65"><Check size={16} className="mt-0.5 flex-shrink-0 text-signal-400" /><span>{feature}</span></div>
                  ))}
                </div>

                <div className="mt-auto pt-8">
                  <p className="mb-5 border-t border-white/10 pt-5 text-xs leading-relaxed text-white/40"><span className="text-white/70">Kinek való:</span> {pkg.suitableFor}</p>
                  <a href="#diagnosztika" onClick={() => trackCTAClick(`Pricing - ${pkg.name}`, 'pricing_cta')} className={pkg.popular ? 'signal-button-primary w-full' : 'signal-button-secondary w-full'}>Rendszerdiagnózis ↗</a>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-center text-xs leading-relaxed text-white/35">A végleges ajánlatot a cél, a meglévő rendszer és a szükséges integrációk alapján adjuk. A cél minden szinten ugyanaz: mérhetőbb ügyfélszerzés és egyszerűbb működés.</p>
      </div>
    </section>
  );
}
