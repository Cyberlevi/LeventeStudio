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
    <section id="folyamat" className="relative scroll-mt-20 overflow-hidden border-y border-white/10 bg-graphite-900 px-5 py-20 text-ivory-100 sm:px-6 md:py-28 lg:px-8">
      <div className="pointer-events-none absolute inset-0 studio-grid-dark opacity-15" aria-hidden="true" />
      <div className="relative mx-auto max-w-[86rem]">
        <div className="grid gap-8 lg:grid-cols-[.78fr_1.22fr] lg:items-end">
          <div>
            <p className="mb-4 text-[10px] uppercase tracking-[.22em] text-signal-300">PROCESS / CONTROL FLOW</p>
            <h2 className="max-w-3xl font-serif text-5xl font-light leading-[.96] tracking-editorial sm:text-6xl">
              Nem fekete doboz.<br />
              <span className="italic text-signal-400">Látod, hol tartunk.</span>
            </h2>
          </div>
          <p className="max-w-xl text-base font-light leading-relaxed text-ivory-400 lg:justify-self-end">
            Minden szakasznak van célja, ellenőrizhető kimenete és következő lépése. Így nem folyik szét sem a kommunikáció, sem a projekt.
          </p>
        </div>

        <ol className="mt-12 grid border-l border-t border-white/10 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {steps.map(({ number, label, icon: Icon, title, description, outcome }, index) => (
            <li
              key={number}
              className={`group relative flex min-h-[27rem] flex-col border-b border-r border-white/10 bg-graphite-900 px-5 py-6 transition-colors hover:bg-white/[.025] sm:px-6 ${index === 2 ? 'bg-signal-400/[.035]' : ''}`}
            >
              {index === 2 && <span className="absolute inset-x-0 top-0 h-px bg-signal-400" aria-hidden="true" />}

              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className={`text-[10px] tracking-[.2em] ${index === 2 ? 'text-signal-400' : 'text-white/55'}`}>{number}</span>
                  <span className="mt-2 block text-[9px] uppercase tracking-[.18em] text-ivory-500">{label}</span>
                </div>
                <Icon size={18} strokeWidth={1.45} className={index === 2 ? 'text-signal-400' : 'text-white/55'} aria-hidden="true" />
              </div>

              <div className="mt-10">
                <h3 className="max-w-[15ch] text-[1.45rem] font-medium leading-[1.08] tracking-[-.03em]">{title}</h3>
                <p className="mt-5 text-sm font-light leading-relaxed text-ivory-400">{description}</p>
              </div>

              <div className="mt-auto border-t border-white/10 pt-5">
                <p className="text-[8px] uppercase tracking-[.18em] text-ivory-500">Kimenet / OUTPUT</p>
                <p className="mt-2 text-sm text-ivory-200">{outcome}</p>
              </div>

              <span className="pointer-events-none absolute bottom-3 right-3 text-[8px] tracking-[.16em] text-white/50" aria-hidden="true">
                LS/P{number}
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-5 text-[10px] uppercase tracking-[.14em] text-ivory-500 sm:flex-row sm:items-center sm:justify-between">
          <p>DOMAIN + HOSTING / ÜGYFÉL NEVÉN</p>
          <p>ÁR + HATÁRIDŐ + MÓDOSÍTÁS / ÍRÁSBAN</p>
        </div>
      </div>
    </section>
  );
}
