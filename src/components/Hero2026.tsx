import { ArrowRight, Bot, Search, Workflow } from 'lucide-react';
import { trackCTAClick } from '../utils/gtm';

const nodes = [
  ['01', 'FIGYELEM', 'Search / Ads', 'releváns belépés'],
  ['02', 'KONVERZIÓ', 'Landing / Offer', 'egyértelmű következő lépés'],
  ['03', 'LEAD', 'Source captured', 'mérhető érdeklődő'],
  ['04', 'MŰKÖDÉS', 'Follow-up', 'kevesebb kézi admin'],
];

export default function Hero2026() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-graphite-950 px-6 pb-14 pt-32 text-ivory-100 md:pt-36">
      <div className="absolute inset-0 studio-grid-dark opacity-70" aria-hidden="true" />
      <div className="absolute -right-40 -top-48 h-[34rem] w-[34rem] rounded-full bg-signal-300/[0.07] blur-[110px]" aria-hidden="true" />

      <div className="relative mx-auto flex min-h-[calc(100svh-10rem)] max-w-[86rem] flex-col justify-between">
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_.92fr] xl:gap-20">
          <div className="max-w-4xl">
            <div className="mb-8 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-ivory-400">
              <span className="inline-flex items-center gap-2 text-signal-300"><span className="signal-dot" />Levente Studio</span>
              <span className="text-white/20">/</span><span>Systems Lab</span>
              <span className="text-white/20">/</span><span>2026</span>
            </div>

            <h1 className="max-w-5xl text-[clamp(3.6rem,7vw,7.6rem)] leading-[0.88] tracking-[-0.055em] text-balance">
              Nem weboldalt
              <span className="block">építünk.</span>
              <span className="mt-2 block font-serif-display italic font-light tracking-[-0.035em] text-ivory-400">Ügyfélszerző rendszert.</span>
            </h1>

            <div className="mt-9 max-w-3xl border-l border-white/15 pl-5 md:pl-7">
              <p className="text-xl text-ivory-100 md:text-2xl">Web + SEO + hirdetés + mérés + automatizálás.</p>
              <p className="mt-3 text-base font-light leading-relaxed text-ivory-400 md:text-lg">
                Egy összekötött ügyfélút szolgáltató vállalkozásoknak — saját, éles projekteken tesztelt rendszerlogikával.
              </p>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href="#diagnosztika" onClick={() => trackCTAClick('2 perces rendszerdiagnózis', 'hero_primary')} className="group inline-flex min-h-14 items-center justify-center gap-3 bg-signal-300 px-7 py-4 font-medium text-graphite-950 transition hover:-translate-y-0.5 hover:bg-signal-500">
                Indítsd a 2 perces diagnózist
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#lab" onClick={() => trackCTAClick('Studio Lab', 'hero_secondary')} className="inline-flex min-h-14 items-center justify-center border border-white/15 bg-white/[0.025] px-7 py-4 text-ivory-100 transition hover:border-white/30 hover:bg-white/[0.06]">
                Nézd meg a Labot
              </a>
            </div>

            <div className="mt-9 flex flex-wrap gap-2 text-xs text-ivory-400">
              <span className="signal-chip inline-flex items-center gap-2 px-3 py-2"><Search size={14} /> saját éles projektek</span>
              <span className="signal-chip inline-flex items-center gap-2 px-3 py-2"><Bot size={14} /> AI-native workflow</span>
              <span className="signal-chip inline-flex items-center gap-2 px-3 py-2"><span className="h-1.5 w-1.5 rounded-full bg-signal-300" /> mérhető funnel</span>
            </div>
          </div>

          <div className="system-panel relative overflow-hidden border border-white/10 p-5 md:p-7">
            <div className="absolute inset-0 studio-grid-dark opacity-55" aria-hidden="true" />
            <div className="relative">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div><div className="text-[10px] uppercase tracking-[0.22em] text-ivory-400">System signal</div><div className="mt-1 text-lg font-medium">Acquisition operating map</div></div>
                <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-signal-300"><span className="signal-dot" />online</div>
              </div>

              <div className="relative mt-7 grid grid-cols-2 gap-3">
                <div className="signal-line absolute left-[14%] right-[14%] top-1/2 hidden h-px md:block" aria-hidden="true" />
                {nodes.map(([step, label, title, detail], index) => (
                  <div key={step} className={`relative min-h-[9rem] border p-4 ${index === 2 ? 'border-signal-300/40 bg-signal-300/[0.055]' : 'border-white/10 bg-graphite-950/70'}`}>
                    <div className="flex justify-between text-[9px] uppercase tracking-[0.16em] text-ivory-400"><span>{step}</span><span>{label}</span></div>
                    <div className="mt-7 text-sm font-medium md:text-base">{title}</div>
                    <div className="mt-1 text-xs leading-relaxed text-ivory-400">{detail}</div>
                    {index === 2 && <span className="absolute bottom-4 right-4 h-2 w-2 rounded-full bg-signal-300" />}
                  </div>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[9px] uppercase tracking-[0.12em] text-ivory-400">
                {['Klima18ker', 'FuratMester', 'Bundavarázs'].map(project => <div key={project} className="border border-white/10 bg-white/[0.025] px-2 py-3">{project}</div>)}
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-5">
                <div className="flex items-center gap-3">
                  <img src="/levente_studio_portrait_final.webp" alt="Tarnóczi Levente" className="h-11 w-11 rounded-full object-cover grayscale" />
                  <div><div className="text-sm">Operator-built systems</div><div className="text-xs text-ivory-400">Tarnóczi Levente</div></div>
                </div>
                <Workflow size={19} className="text-signal-300" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 border-t border-white/10 pt-5 md:grid-cols-4">
          {[
            ['01', 'Own projects', 'nem demo'],
            ['02', 'Real tracking', 'forrástól a leadig'],
            ['03', 'AI-native ops', 'AI mint motor'],
            ['04', 'Continuous', 'build → measure → improve'],
          ].map(([n, title, detail]) => (
            <div key={n} className="py-4 pr-4 md:border-r md:border-white/10 md:px-5 first:pl-0 last:border-r-0">
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
