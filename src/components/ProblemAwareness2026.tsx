import { ArrowRight, BarChart3, Eye, MessageSquare, MousePointerClick } from 'lucide-react';

const stages = [
  {
    code: '01',
    icon: Eye,
    eyebrow: 'Bizalom',
    title: 'Látszódjon, miben vagy jó',
    text: 'Saját munkák, érthető szolgáltatások és az érdeklődő valódi kérdéseire adott válaszok.',
    signal: 'Munka → bizonyíték',
  },
  {
    code: '02',
    icon: MessageSquare,
    eyebrow: 'Kapcsolat',
    title: 'Legyen egyszerű ajánlatot kérni',
    text: 'Mobilon is könnyen használható gombok és olyan űrlap, amely a munkához szükséges információt kéri be.',
    signal: 'Érdeklődés → megkeresés',
  },
  {
    code: '03',
    icon: BarChart3,
    eyebrow: 'Mérés',
    title: 'Lásd, honnan jön az érdeklődés',
    text: 'A választott csomaghoz illő mérés segít követni a kapcsolatfelvételeket és a későbbi fejlesztések irányát.',
    signal: 'Megkeresés → döntés',
  },
];

export default function ProblemAwareness2026() {
  return (
    <section className="award-system-map relative overflow-hidden bg-graphite-950 px-5 py-20 text-ivory-100 sm:px-6 md:py-24 lg:px-8">
      <div className="pointer-events-none absolute inset-0 studio-grid-dark opacity-20" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-32 top-12 h-80 w-80 rounded-full bg-signal-400/10 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-[86rem] gap-12 lg:grid-cols-[.72fr_1.28fr] lg:items-start lg:gap-16">
        <div className="lg:sticky lg:top-28">
          <div className="signal-kicker mb-5">
            <span className="signal-dot" />
            A látvány mögötti rendszer
          </div>
          <h2 className="max-w-xl font-serif text-5xl font-light leading-[.98] tracking-editorial sm:text-6xl">
            A weboldal ne csak <span className="text-signal-400">jól nézzen ki.</span>
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-ivory-400">
            Az érték ott kezdődik, amikor a látogató érti, mit kínálsz, könnyen lép tovább, te pedig látod, mi működik.
          </p>

          <div className="mt-8 hidden max-w-md items-center gap-3 text-[10px] uppercase tracking-[.16em] text-ivory-500 sm:flex">
            <MousePointerClick size={15} className="text-signal-400" aria-hidden="true" />
            Látogató
            <ArrowRight size={14} aria-hidden="true" />
            Bizalom
            <ArrowRight size={14} aria-hidden="true" />
            Ajánlatkérés
            <ArrowRight size={14} aria-hidden="true" />
            Mérés
          </div>
        </div>

        <div className="relative">
          <div className="absolute bottom-8 left-[2.05rem] top-8 w-px bg-gradient-to-b from-signal-400/70 via-white/15 to-transparent sm:left-[2.55rem]" aria-hidden="true" />

          <div className="space-y-4 sm:space-y-5">
            {stages.map(({ code, icon: Icon, eyebrow, title, text, signal }, index) => (
              <article
                key={code}
                className={`award-system-stage relative ml-16 overflow-hidden rounded-2xl border border-white/10 bg-white/[.045] p-5 shadow-[0_20px_60px_rgba(0,0,0,.16)] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 motion-reduce:transform-none motion-reduce:transition-none sm:ml-20 sm:p-6 lg:p-7 ${
                  index === 1 ? 'lg:ml-28' : ''
                }`}
              >
                <div className="absolute -left-16 top-7 flex h-10 w-10 items-center justify-center rounded-full border border-signal-400/40 bg-graphite-950 text-[10px] font-medium tracking-[.15em] text-signal-400 shadow-[0_0_28px_rgba(216,255,120,.12)] sm:-left-20 sm:h-12 sm:w-12">
                  {code}
                </div>

                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-[10px] uppercase tracking-[.18em] text-signal-300">{eyebrow}</p>
                    <h3 className="mt-3 max-w-xl text-2xl font-medium leading-tight tracking-tight sm:text-[1.7rem]">
                      {title}
                    </h3>
                  </div>
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[.055] text-signal-400">
                    <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
                  </div>
                </div>

                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ivory-400">{text}</p>

                <div className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4 text-[10px] uppercase tracking-[.16em] text-ivory-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-signal-400" />
                  {signal}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
