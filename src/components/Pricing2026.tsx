import { Check, Gauge, Rocket, Workflow } from 'lucide-react';

const packages = {
  start: {
    name: 'INDULÁS',
    code: 'SYS/01',
    price: '250.000 Ft-tól',
    tagline: 'Ügyfélszerző weboldal',
    description: 'Annak, akinek egy profi, gyors és mérhető online alap kell — nem csak egy szép digitális névjegykártya.',
    icon: Gauge,
    features: ['Konverziós landing vagy kompakt web', 'Mobil-first, gyors felépítés', 'Technikai SEO alapok', 'GA4 + leadmérés', 'Ajánlatkérési út', '30 nap támogatás'],
    suitableFor: 'Induló vagy megújuló szolgáltató vállalkozásnak, amelynek először stabil online alap kell.'
  },
  grow: {
    name: 'ÜGYFÉLSZERZÉS',
    code: 'SYS/02',
    price: '500.000 Ft-tól',
    tagline: 'Komplett ügyfélszerző rendszer',
    description: 'Nem csak elkészül a weboldalad: felépítjük köré azt a mérhető rendszert, amely keresletet fog, érdeklődőt szerez és megmutatja, mi hozza az ügyfelet.',
    icon: Rocket,
    features: ['Komplett web- és landing rendszer', 'Kulcsszó- és konkurenciakutatás', 'SEO + keresési szándék', 'GA4 + GTM + lead események', 'Google Ads-ready mérés', 'CTA + funnel optimalizálás', 'Alap lead automatizálás', '60 nap finomhangolás'],
    suitableFor: 'Működő szolgáltató vállalkozásnak, amely több és mérhetőbb megkeresést akar.'
  },
  scale: {
    name: 'RENDSZER',
    code: 'SYS/03',
    price: '750.000 Ft-tól',
    tagline: 'Automatizált ügyfélkezelés',
    description: 'Az ügyfélszerzés után a leadkezelést és az ismétlődő folyamatokat is rendszerbe tesszük, hogy kevesebb érdeklődő vesszen el és kevesebb legyen a kézi munka.',
    icon: Workflow,
    features: ['Minden az ÜGYFÉLSZERZÉS csomagból', 'CRM vagy lead dashboard', 'Automatikus státuszok és utánkövetés', 'Email/workflow automatizálás', 'AI-támogatott belső folyamatok', 'Egyedi dashboard', '90 nap optimalizálás'],
    suitableFor: 'Növekedő szolgáltatónak, ahol már az érdeklődők kezelése és a kézi adminisztráció a szűk keresztmetszet.'
  }
};

function CompactPackage({ pkg }: { pkg: typeof packages.start }) {
  const Icon = pkg.icon;
  return (
    <article className="flex h-full flex-col border border-graphite-950/10 bg-white p-6 shadow-[0_18px_60px_rgba(11,13,12,.05)] sm:p-7">
      <div className="flex items-start justify-between gap-5">
        <div className="flex h-11 w-11 items-center justify-center border border-graphite-950/10 bg-ivory-100 text-graphite-950"><Icon size={19} /></div>
        <div className="text-right text-[10px] uppercase tracking-[0.18em] text-graphite-400">{pkg.code} · {pkg.name}</div>
      </div>
      <h3 className="mt-7 font-serif text-3xl font-light tracking-editorial text-graphite-950">{pkg.tagline}</h3>
      <div className="mt-2 text-lg font-medium text-graphite-950">{pkg.price}</div>
      <p className="mt-4 text-sm font-light leading-relaxed text-graphite-600">{pkg.description}</p>
      <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {pkg.features.map((feature) => (
          <div key={feature} className="flex items-start gap-2 text-xs leading-relaxed text-graphite-600"><Check size={14} className="mt-0.5 shrink-0 text-graphite-950" /><span>{feature}</span></div>
        ))}
      </div>
      <div className="mt-auto pt-7">
        <p className="border-t border-graphite-950/10 pt-4 text-xs leading-relaxed text-graphite-500"><span className="text-graphite-800">Kinek való:</span> {pkg.suitableFor}</p>
        <a href="#diagnosztika" data-track-cta={`Pricing - ${pkg.name}`} data-track-location="pricing_cta" className="mt-5 inline-flex min-h-12 w-full items-center justify-center border border-graphite-950/15 px-5 py-3 text-sm font-medium text-graphite-950 transition hover:border-graphite-950 hover:bg-graphite-950 hover:text-white">Megnézem, mire van szükségem ↗</a>
      </div>
    </article>
  );
}

export default function Pricing2026() {
  const GrowIcon = packages.grow.icon;

  return (
    <section id="csomagok" className="relative overflow-hidden bg-ivory-100 px-5 py-24 text-graphite-950 sm:px-6 md:py-32 lg:px-8">
      <div className="absolute inset-0 studio-grid opacity-35" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-14 grid gap-8 border-b border-graphite-950/10 pb-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end md:mb-16">
          <div>
            <div className="mb-5 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-graphite-500"><span className="signal-dot" />Három üzleti helyzet · három rendszer</div>
            <h2 className="font-serif text-4xl font-light leading-[0.94] tracking-editorial text-balance sm:text-5xl md:text-6xl">Ne funkciót válassz. <span className="text-graphite-500">A célodhoz válassz rendszert.</span></h2>
          </div>
          <p className="max-w-2xl text-base font-light leading-relaxed text-graphite-600 sm:text-lg lg:justify-self-end">Van, akinek először egy erős weboldal kell. Van, akinek több érdeklődő. És van, ahol már az ügyfélkezelést kell automatizálni. Innen indul az árazás.</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-12">
          <article className="order-first relative flex min-h-[43rem] flex-col overflow-hidden bg-graphite-950 p-7 text-white lg:col-span-7 lg:row-span-2 sm:p-9 md:p-10">
            <div className="absolute inset-0 studio-grid-dark opacity-35" aria-hidden="true" />
            <div className="absolute -right-28 -top-24 h-80 w-80 rounded-full bg-signal-400/[0.08] blur-[90px]" aria-hidden="true" />
            <div className="relative flex h-full flex-col">
              <div className="flex items-start justify-between gap-5">
                <div className="flex h-12 w-12 items-center justify-center border border-white/10 text-signal-400"><GrowIcon size={21} /></div>
                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-signal-400">Leggyakoribb választás</div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/35">{packages.grow.code} · {packages.grow.name}</div>
                </div>
              </div>

              <div className="mt-16 max-w-2xl">
                <h3 className="font-serif text-5xl font-light leading-[0.94] tracking-editorial text-white sm:text-6xl">{packages.grow.tagline}</h3>
                <div className="mt-5 text-2xl font-medium text-signal-400">{packages.grow.price}</div>
                <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-white/55 sm:text-lg">{packages.grow.description}</p>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                {packages.grow.features.map((feature) => (
                  <div key={feature} className="flex min-h-12 items-start gap-3 border-t border-white/10 pt-3 text-sm text-white/70"><Check size={16} className="mt-0.5 shrink-0 text-signal-400" /><span>{feature}</span></div>
                ))}
              </div>

              <div className="mt-auto pt-10">
                <p className="border-t border-white/10 pt-5 text-sm leading-relaxed text-white/45"><span className="text-white/75">Kinek való:</span> {packages.grow.suitableFor}</p>
                <a href="#diagnosztika" data-track-cta="Pricing - ACQUISITION" data-track-location="pricing_cta" className="signal-button-primary mt-6 w-full sm:w-auto">Kérem a rendszerdiagnózist ↗</a>
              </div>
            </div>
          </article>

          <div className="grid gap-4 lg:col-span-5 lg:grid-rows-2">
            <CompactPackage pkg={packages.start} />
            <CompactPackage pkg={packages.scale} />
          </div>
        </div>

        <div className="mt-10 grid gap-5 border-t border-graphite-950/10 pt-7 md:grid-cols-[1.2fr_.8fr] md:items-start">
          <p className="text-xs leading-relaxed text-graphite-500">Az árak induló projektárak. A végleges ajánlatot a cél, a meglévő rendszer, a tartalom és a szükséges integrációk alapján adjuk. Hirdetési költés, külső szoftverek és fizetős licencek csak akkor részei az ajánlatnak, ha ezt külön feltüntetjük.</p>
          <p className="text-xs leading-relaxed text-graphite-500 md:text-right"><span className="font-medium text-graphite-800">Nem tudod, melyik kell?</span><br />A 2 perces diagnózis után nem a drágábbat, hanem a szükséges szintet javasoljuk.</p>
        </div>
      </div>
    </section>
  );
}
