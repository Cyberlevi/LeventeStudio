import { ArrowRight, Bot, Search, Workflow } from 'lucide-react';

const nodes = [
  ['01', 'FIGYELEM', 'Search / Ads', 'releváns belépés'],
  ['02', 'KONVERZIÓ', 'Landing / Offer', 'egyértelmű következő lépés'],
  ['03', 'LEAD', 'Source captured', 'mérhető érdeklődő'],
  ['04', 'MŰKÖDÉS', 'Follow-up', 'kevesebb kézi admin'],
];

export default function Hero2026() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-graphite-950 px-5 pb-14 pt-28 text-ivory-100 sm:px-6 sm:pt-32 md:pt-36">
      <div className="absolute inset-0 studio-grid-dark opacity-70" aria-hidden="true" />
      <div className="absolute -right-40 -top-48 h-[34rem] w-[34rem] rounded-full bg-signal-300/[0.07] blur-[110px]" aria-hidden="true" />

      <div className="relative mx-auto flex min-h-[calc(100svh-10rem)] max-w-[86rem] flex-col justify-between">
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_.92fr] xl:gap-20">
          <div className="max-w-4xl min-w-0">
            <div className="mb-8 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-ivory-400">
              <span className="inline-flex items-center gap-2 text-signal-300"><span className="signal-dot" />Levente Studio</span>
              <span className="text-white/20">/</span><span>Systems Lab</span>
              <span className="text-white/20">/</span><span>2026</span>
            </div>

            <h1 className="max-w-5xl text-[clamp(2.45rem,12vw,7.6rem)] leading-[0.9] tracking-[-0.05em] text-balance sm:leading-[0.88] sm:tracking-[-0.055em]">
              Nem weboldalt
              <span className="block">építünk.</span>
              <span className="mt-2 block font-serif-display italic font-light tracking-[-0.035em] text-ivory-400">Ügyfélszerző rendszert.</span>
            </h1>

            <div className="mt-8 max-w-3xl border-l border-white/15 pl-5 sm:mt-9 md:pl-7">
              <p className="text-lg text-ivory-100 sm:text-xl md:text-2xl">Web + SEO + hirdetés + mérés + automatizálás.</p>
              <p className="mt-3 text-base font-light leading-relaxed text-ivory-400 md:text-lg">
                Egy összekötött ügyfélút szolgáltató vállalkozásoknak — saját, éles projekteken tesztelt rendszerlogikával.
              </p>
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:mt-10 sm:flex-row">
              <a href="#diagnosztika" data-track-cta="2 perces rendszerdiagnózis" data-track-location="hero_primary" className="group inline-flex min-h-14 items-center justify-center gap-3 bg-signal-300 px-5 py-4 text-center font-medium text-graphite-950 transition hover:-translate-y-0.5 hover:bg-signal-500 sm:px-7">
                Indítsd a 2 perces diagnózist
                <ArrowRight size={18} className="shrink-0 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#lab" data-track-cta="Studio Lab" data-track-location="hero_secondary" className="inline-flex min-h-14 items-center justify-center border border-white/15 bg-white/[0.025] px-5 py-4 text-center text-ivory-100 transition hover:border-white/30 hover:bg-white/[0.06] sm:px-7">
                Nézd meg a Labot
              </a>
            </div>

            <div className="mt-9 flex flex-wrap gap-2 text-xs text-ivory-400">
              <span className="signal-chip inline-flex items-center gap-2 px-3 py-2"><Search size={14} /> saját éles projektek</span>
              <span className="signal-chip inline-flex items-center gap-2 px-3 py-2"><Bot size={14} /> AI-native workflow</span>
              <span className="signal-chip inline-flex items-center gap-2 px-3 py-2"><span className="h-1.5 w-1.5 rounded-full bg-signal-300" /> mérhető funnel</span>
            </div>
          </div>

          <div className="system-panel relative min-w-0 overflow-hidden border border-white/10 p-4 sm:p-5 md:p-7">
            <div className="absolute inset-0 studio-grid-dark opacity-55" aria-hidden="true" />
            <div className="relative">
              <div className="flex flex-col gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div><div className="text-[10px] uppercase tracking-[0.22em] text-ivory-400">System signal</div><div className="mt-1 text-base font-medium sm:text-lg">Acquisition operating map</div></div>
                <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-signal-300"><span className="signal-dot" />online</div>
              </div>

              <div className="relative mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="signal-line absolute left-[14%] right-[14%] top-1/2 hidden h-px md:block" aria-hidden="true" />
                {nodes.map(([step, label, title, detail], index) => (
                  <div key={step} className={`relative min-h-[8.25rem] border p-4 sm:min-h-[9rem] ${index === 2 ? 'border-signal-300/40 bg-signal-300/[0.055]' : 'border-white/10 bg-graphite-950/70'}`}>
                    <div className="flex justify-between gap-3 text-[9px] uppercase tracking-[0.16em] text-ivory-400"><span>{step}</span><span className="text-right">{label}</span></div>
                    <div className="mt-6 text-sm font-medium sm:mt-7 md:text-base">{title}</div>
                    <div className="mt-1 text-xs leading-relaxed text-ivory-400">{detail}</div>
                    {index === 2 && <span className="absolute bottom-4 right-4 h-2 w-2 rounded-full bg-signal-300" />}
                  </div>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-1 gap-2 text-center text-[9px] uppercase tracking-[0.12em] text-ivory-400 min-[360px]:grid-cols-3">
                {['Klima18ker', 'FuratMester', 'Bundavarázs'].map(project => <div key={project} className="border border-white/10 bg-white/[0.025] px-2 py-3">{project}</div>)}
              </div>

              <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
                <div className="flex min-w-0 items-center gap-3">
                  <img src="/levente_studio_portrait_final.webp" width="44" height="44" decoding="async" alt="Tarnóczi Levente" className="h-11 w-11 shrink-0 rounded-full object-cover grayscale" />
                  <div className="min-w-0"><div className="text-sm">Operator-built systems</div><div className="text-xs text-ivory-400">Tarnóczi Levente</div></div>
                </div>
                <Workflow size={19} className="shrink-0 text-signal-300" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 border-t border-white/10 pt-5 min-[360px]:grid-cols-2 md:grid-cols-4">
          {[
            ['01', 'Own projects', 'nem demo'],
            ['02', 'Real tracking', 'forrástól a leadig'],
            ['03', 'AI-native ops', 'AI mint motor'],
            ['04', 'Continuous', 'build → measure → improve'],
          ].map(([n, title, detail]) => (
            <div key={n} className="border-b border-white/10 py-4 pr-4 min-[360px]:border-b-0 md:border-r md:px-5 first:pl-0 last:border-r-0">
              <div className="text-[10px] uppercase tracking-[0.18em] text-signal-300">{n}</div>
              <div className="mt-2 text-sm font-medium">{title}</div>
              <div className="mt-1 text-xs text-ivory-400">{detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
