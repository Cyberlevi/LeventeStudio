import { CheckCircle2, FileText, MessageSquareText, Rocket } from 'lucide-react';

const steps = [
  {
    number: '01',
    label: 'DISCOVERY',
    icon: MessageSquareText,
    title: 'Elmondod, mire van szükséged',
    description: 'Röviden megismerem a vállalkozásodat, a szolgáltatásaidat és azt, mit vársz az oldaltól. E-mailben, szükség esetén videóhívásban egyeztetünk.',
    outcome: 'Tiszta kiindulópont',
  },
  {
    number: '02',
    label: 'SCOPE',
    icon: FileText,
    title: 'Rögzítjük a feladatot és az árat',
    description: 'Írásos ajánlat készül a tartalomról, a funkciókról, a határidőről és a módosítási körökről. Innen mindketten tudjuk, mi készül.',
    outcome: 'Írásos vállalás',
  },
  {
    number: '03',
    label: 'PREVIEW',
    icon: CheckCircle2,
    title: 'Megnézed az első változatot',
    description: 'Áttekinthető előnézetben mutatom meg az oldalt. Az egyeztetett visszajelzések alapján finomítjuk a szöveget és a megjelenést.',
    outcome: 'Ellenőrizhető előnézet',
  },
  {
    number: '04',
    label: 'LAUNCH',
    icon: Rocket,
    title: 'Ellenőrizzük és átadjuk',
    description: 'Mobilon is átnézzük, ellenőrizzük a kapcsolatfelvételt, és átbeszéljük a használatot. A domain és a tárhely a te nevedre kerül.',
    outcome: 'Saját hozzáférések',
  },
];

export default function ProjectProcess() {
  return (
    <section id="folyamat" className="relative scroll-mt-20 overflow-hidden bg-graphite-900 px-5 py-20 text-ivory-100 sm:px-6 md:py-24 lg:px-8">
      <div className="pointer-events-none absolute inset-0 studio-grid-dark opacity-15" aria-hidden="true" />
      <div className="relative mx-auto max-w-[86rem]">
        <div className="grid gap-8 lg:grid-cols-[.78fr_1.22fr] lg:items-end">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[.2em] text-signal-300">Így dolgozunk együtt</p>
            <h2 className="max-w-3xl font-serif text-5xl font-light leading-[1.02] tracking-editorial sm:text-6xl">
              Nem fekete doboz.<br />
              <span className="text-signal-400">Látod, hol tartunk.</span>
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-ivory-400 lg:justify-self-end">
            Minden szakasznak van célja, ellenőrizhető kimenete és következő lépése. Így nem folyik szét sem a kommunikáció, sem a projekt.
          </p>
        </div>

        <ol className="relative mt-12 grid gap-4 lg:mt-14 lg:grid-cols-4 lg:gap-3">
          <div className="pointer-events-none absolute left-[8%] right-[8%] top-8 hidden h-px bg-gradient-to-r from-transparent via-signal-400/45 to-transparent lg:block" aria-hidden="true" />

          {steps.map(({ number, label, icon: Icon, title, description, outcome }, index) => (
            <li
              key={number}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[.04] p-5 shadow-[0_18px_50px_rgba(0,0,0,.13)] backdrop-blur-sm sm:p-6 ${
                index === 2 ? 'lg:-translate-y-3 lg:border-signal-400/30 lg:bg-signal-400/[.055]' : ''
              }`}
            >
              <div className="relative z-10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-signal-400/35 bg-graphite-950 text-[10px] tracking-[.16em] text-signal-400">
                    {number}
                  </span>
                  <span className="text-[9px] uppercase tracking-[.18em] text-ivory-500">{label}</span>
                </div>
                <Icon size={19} strokeWidth={1.5} className="text-signal-400" aria-hidden="true" />
              </div>

              <h3 className="relative z-10 mt-7 text-xl font-medium leading-snug tracking-tight">{title}</h3>
              <p className="relative z-10 mt-4 text-sm leading-relaxed text-ivory-400">{description}</p>

              <div className="relative z-10 mt-7 border-t border-white/10 pt-4">
                <p className="text-[9px] uppercase tracking-[.16em] text-ivory-500">Kimenet</p>
                <p className="mt-1.5 text-sm text-ivory-200">{outcome}</p>
              </div>

              <div className="pointer-events-none absolute -bottom-10 -right-8 h-28 w-28 rounded-full bg-signal-400/[.035] blur-2xl transition-colors duration-300 group-hover:bg-signal-400/[.08]" aria-hidden="true" />
            </li>
          ))}
        </ol>

        <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-5 text-xs leading-relaxed text-ivory-500 sm:flex-row sm:items-center sm:justify-between">
          <p>Domain és tárhely: az ügyfél nevén.</p>
          <p>Ár, határidő és módosítási körök: írásban rögzítve.</p>
        </div>
      </div>
    </section>
  );
}
