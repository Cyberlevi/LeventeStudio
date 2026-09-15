import { BarChart3, Check, Globe2, Megaphone, Rocket, Search, Workflow, Wrench } from 'lucide-react';

const packages = [
  {
    code: 'LS/01',
    name: 'PRESENCE',
    price: '149 000 Ft-tól',
    tagline: 'Profi online jelenlét',
    description: 'Gyors, tiszta belépő azoknak, akiknek most egy hiteles és vállalható online alap kell — felesleges rendszerépítés nélkül.',
    icon: Globe2,
    features: [
      'Egyoldalas, mobil-first weboldal',
      'Gyors technikai felépítés',
      'Alap technikai SEO',
      'Kapcsolati és ajánlatkérési út',
      'Google Business Profile alapok',
      'Alap analitika',
    ],
    suitableFor: 'Induló vagy kisebb szolgáltató vállalkozásnak, amelynek először rendbe kell tenni az online jelenlétét.',
    accent: false,
  },
  {
    code: 'LS/02',
    name: 'START',
    price: '250 000 Ft-tól',
    tagline: 'Mérhető ügyfélszerző weboldal',
    description: 'Nem digitális névjegykártya: többoldalas, konverzióra felépített web, amelyből már látni lehet, honnan jön az érdeklődő.',
    icon: Search,
    features: [
      'Több aloldalas webstruktúra',
      'Ajánlatkérés és CTA-rendszer',
      'GA4 + alap konverziómérés',
      'Technikai SEO alapok',
      'Mobil UX és sebesség',
      'Lead útvonal kialakítása',
    ],
    suitableFor: 'Szolgáltatónak, aki már nem csak jelenlétet, hanem mérhető megkereséseket akar.',
    accent: false,
  },
  {
    code: 'LS/03',
    name: 'GROW',
    price: '450–650 000 Ft',
    tagline: 'Komplett ügyfélszerző rendszer',
    description: 'A weboldal köré felépítjük a keresési, landing-, mérési és kampánylogikát, hogy a rendszer ne csak elkészüljön, hanem dolgozzon is.',
    icon: Rocket,
    features: [
      'Kulcsszó- és konkurenciakutatás',
      'SEO-struktúra és több landing',
      'Kampányoldalak és ajánlati utak',
      'GA4 + GTM + lead események',
      'Google Ads-ready mérés',
      'Konverziós finomhangolás',
      'Alap lead automatizálás',
      '60 nap optimalizálás',
    ],
    suitableFor: 'Működő szolgáltató vállalkozásnak, amely stabilabban és mérhetőbben akar új érdeklődőket szerezni.',
    accent: true,
  },
  {
    code: 'LS/04',
    name: 'SCALE',
    price: '750 000 Ft-tól',
    tagline: 'Automatizált növekedési rendszer',
    description: 'Amikor már nem a weboldal a szűk keresztmetszet: CRM, automatizálás, dashboardok és összekötött belső folyamatok kerülnek a rendszerbe.',
    icon: Workflow,
    features: [
      'Minden szükséges GROW elem',
      'CRM / lead dashboard',
      'Automatikus utánkövetés',
      'Email- és workflow automatizálás',
      'AI-támogatott belső folyamatok',
      'Egyedi integrációk',
      'Fejlett konverziómérés',
      '90 nap optimalizálás',
    ],
    suitableFor: 'Növekedő vállalkozásnak, ahol a leadkezelés, az adminisztráció vagy az összetett marketingfolyamat a következő korlát.',
    accent: false,
  },
];

const growthOps = [
  {
    icon: Wrench,
    title: 'Technikai karbantartás',
    text: 'Frissítések, hibajavítás, teljesítmény és a mérési rendszer üzemben tartása.',
  },
  {
    icon: Search,
    title: 'SEO növekedés',
    text: 'Keresési szándék, új landingek, technikai SEO és folyamatos prioritások.',
  },
  {
    icon: Megaphone,
    title: 'Google Ads rendszer',
    text: 'Kampányoldalak, mérés, ajánlati összhang és folyamatos optimalizálás.',
  },
  {
    icon: BarChart3,
    title: 'Analitika & dashboard',
    text: 'Leadek, források és valódi üzleti eredmények átlátható riportban.',
  },
];

function ProductCard({ pkg }: { pkg: (typeof packages)[number] }) {
  const Icon = pkg.icon;

  if (pkg.accent) {
    return (
      <article className="relative flex h-full flex-col overflow-hidden border border-signal-400/30 bg-graphite-950 p-7 text-white shadow-[0_28px_90px_rgba(11,13,12,.18)] sm:p-8 lg:-translate-y-3">
        <div className="absolute inset-0 studio-grid-dark opacity-30" aria-hidden="true" />
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-signal-400/[0.10] blur-[80px]" aria-hidden="true" />
        <div className="relative flex h-full flex-col">
          <div className="flex items-start justify-between gap-5">
            <div className="flex h-12 w-12 items-center justify-center border border-white/10 text-signal-400"><Icon size={21} /></div>
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-[0.18em] text-signal-400">Leggyakoribb választás</div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/50">{pkg.code} · {pkg.name}</div>
            </div>
          </div>

          <h3 className="mt-9 font-serif text-4xl font-light leading-[0.98] tracking-editorial text-white">{pkg.tagline}</h3>
          <div className="mt-3 text-xl font-medium text-signal-400">{pkg.price}</div>
          <p className="mt-5 text-sm font-light leading-relaxed text-white/65">{pkg.description}</p>

          <div className="mt-7 space-y-3">
            {pkg.features.map((feature) => (
              <div key={feature} className="flex items-start gap-3 border-t border-white/10 pt-3 text-sm text-white/75">
                <Check size={15} className="mt-0.5 shrink-0 text-signal-400" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-8">
            <p className="border-t border-white/10 pt-5 text-xs leading-relaxed text-white/55"><span className="text-white/85">Kinek való:</span> {pkg.suitableFor}</p>
            <a href="#diagnosztika" data-track-cta={`Product - ${pkg.name}`} data-track-location="product_showcase" className="signal-button-primary mt-6 w-full">Ezt a rendszert nézem meg ↗</a>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="flex h-full flex-col border border-graphite-950/10 bg-white p-7 shadow-[0_18px_60px_rgba(11,13,12,.05)] transition duration-300 hover:-translate-y-1 hover:border-graphite-950/20 hover:shadow-[0_24px_70px_rgba(11,13,12,.08)] sm:p-8">
      <div className="flex items-start justify-between gap-5">
        <div className="flex h-12 w-12 items-center justify-center border border-graphite-950/10 bg-ivory-100 text-graphite-950"><Icon size={20} /></div>
        <div className="text-right text-[10px] uppercase tracking-[0.18em] text-graphite-500">{pkg.code} · {pkg.name}</div>
      </div>

      <h3 className="mt-9 font-serif text-4xl font-light leading-[0.98] tracking-editorial text-graphite-950">{pkg.tagline}</h3>
      <div className="mt-3 text-xl font-medium text-graphite-950">{pkg.price}</div>
      <p className="mt-5 text-sm font-light leading-relaxed text-graphite-600">{pkg.description}</p>

      <div className="mt-7 space-y-3">
        {pkg.features.map((feature) => (
          <div key={feature} className="flex items-start gap-3 border-t border-graphite-950/10 pt-3 text-sm text-graphite-600">
            <Check size={15} className="mt-0.5 shrink-0 text-graphite-950" />
            <span>{feature}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-8">
        <p className="border-t border-graphite-950/10 pt-5 text-xs leading-relaxed text-graphite-500"><span className="text-graphite-800">Kinek való:</span> {pkg.suitableFor}</p>
        <a href="#diagnosztika" data-track-cta={`Product - ${pkg.name}`} data-track-location="product_showcase" className="mt-6 inline-flex min-h-12 w-full items-center justify-center border border-graphite-950/15 px-5 py-3 text-sm font-medium text-graphite-950 transition hover:border-graphite-950 hover:bg-graphite-950 hover:text-white">Megnézem, mire van szükségem ↗</a>
      </div>
    </article>
  );
}

export default function Pricing2026() {
  return (
    <section id="csomagok" className="relative overflow-hidden bg-ivory-100 px-5 py-24 text-graphite-950 sm:px-6 md:py-32 lg:px-8">
      <div className="absolute inset-0 studio-grid opacity-35" aria-hidden="true" />
      <div className="relative mx-auto max-w-[86rem]">
        <div className="mx-auto mb-14 max-w-6xl border-b border-graphite-950/10 pb-12 md:mb-20">
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
            <div>
              <div className="mb-5 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-graphite-500"><span className="signal-dot" />Levente Studio · termékek</div>
              <h2 className="font-serif text-4xl font-light leading-[0.94] tracking-editorial text-balance sm:text-5xl md:text-7xl">Nem egyetlen „weboldalcsomag”. <span className="text-graphite-500">Négy növekedési szint.</span></h2>
            </div>
            <div className="max-w-2xl lg:justify-self-end">
              <p className="text-base font-light leading-relaxed text-graphite-600 sm:text-lg">A piac nem ugyanazt kéri minden vállalkozástól. Van, akinek csak profi jelenlét kell. Másnak már mérhető leadgenerálás, kampányrendszer vagy automatizálás. Ezért a kínálatot üzleti helyzet szerint csomagoltuk.</p>
              <p className="mt-4 text-sm leading-relaxed text-graphite-500">A csomagok egymásra épülnek, de nem kell végiglépkedni rajtuk. A diagnózis alapján ott kezdünk, ahol most a legnagyobb üzleti érték van.</p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4 xl:items-stretch">
          {packages.map((pkg) => <ProductCard key={pkg.name} pkg={pkg} />)}
        </div>

        <div className="mx-auto mt-20 max-w-6xl border-t border-graphite-950/10 pt-12 sm:mt-24 sm:pt-16">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-graphite-500">Growth Ops · folyamatos működés</div>
              <h3 className="mt-4 font-serif text-4xl font-light leading-[0.98] tracking-editorial sm:text-5xl">A rendszer átadás után is tud tovább nőni.</h3>
            </div>
            <p className="max-w-2xl text-base font-light leading-relaxed text-graphite-600 lg:justify-self-end">A projektcsomagok mellé külön is kérhető folyamatos technikai, SEO-, Ads- és analitikai munka. Így nem kell minden fejlesztési körnél új szolgáltatót keresni.</p>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {growthOps.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="border border-graphite-950/10 bg-white p-6">
                  <div className="flex h-10 w-10 items-center justify-center border border-graphite-950/10 bg-ivory-100"><Icon size={18} /></div>
                  <h4 className="mt-6 font-serif text-2xl font-light tracking-editorial">{item.title}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-graphite-600">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-5 border-t border-graphite-950/10 pt-7 md:grid-cols-[1.2fr_.8fr] md:items-start">
          <p className="text-xs leading-relaxed text-graphite-500">Az árak induló vagy irányadó projektárak. A végleges ajánlatot a cél, a meglévő rendszer, a tartalom és a szükséges integrációk alapján adjuk. Hirdetési költés, külső szoftverek és fizetős licencek csak akkor részei az ajánlatnak, ha ezt külön feltüntetjük.</p>
          <p className="text-xs leading-relaxed text-graphite-500 md:text-right"><span className="font-medium text-graphite-800">Nem tudod, melyik kell?</span><br />A 2 perces diagnózis után nem a drágábbat, hanem a szükséges szintet javasoljuk.</p>
        </div>
      </div>
    </section>
  );
}
