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
    <section className="relative overflow-hidden border-y border-white/10 bg-graphite-950 px-5 py-20 text-ivory-100 sm:px-6 md:py-28 lg:px-8">
      <div className="pointer-events-none absolute inset-0 studio-grid-dark opacity-20" aria-hidden="true" />
      <div className="relative mx-auto max-w-[86rem]">
        <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="signal-kicker mb-5">
              <span className="signal-dot" />
              SYSTEM / VALUE FLOW
            </div>
            <h2 className="max-w-xl font-serif text-5xl font-light leading-[.94] tracking-editorial sm:text-6xl">
              A weboldal ne csak <span className="italic text-signal-400">jól nézzen ki.</span>
            </h2>
            <p className="mt-6 max-w-lg text-base font-light leading-relaxed text-ivory-400">
              Az érték ott kezdődik, amikor a látogató érti, mit kínálsz, könnyen lép tovább, te pedig látod, mi működik.
            </p>

            <div className="mt-8 hidden max-w-md items-center gap-3 border-t border-white/10 pt-4 text-[9px] uppercase tracking-[.16em] text-ivory-500 sm:flex">
              <MousePointerClick size={14} className="text-signal-400" aria-hidden="true" />
              Látogató <ArrowRight size={12} /> Bizalom <ArrowRight size={12} /> Ajánlatkérés <ArrowRight size={12} /> Mérés
            </div>
          </div>

          <div className="border-x border-t border-white/10">
            {stages.map(({ code, icon: Icon, eyebrow, title, text, signal }, index) => (
              <article
                key={code}
                className={`group relative grid border-b border-white/10 bg-graphite-950 transition-colors hover:bg-white/[.025] sm:grid-cols-[5.5rem_1fr_auto] ${index === 1 ? 'bg-white/[.018]' : ''}`}
              >
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-4 sm:block sm:border-b-0 sm:border-r sm:px-5 sm:py-6">
                  <span className="text-[10px] tracking-[.2em] text-signal-400">{code}</span>
                  <Icon size={18} strokeWidth={1.45} className="text-white/55 sm:mt-8" aria-hidden="true" />
                </div>

                <div className="px-5 py-6 sm:px-7 sm:py-7">
                  <p className="text-[9px] uppercase tracking-[.2em] text-signal-300">{eyebrow}</p>
                  <h3 className="mt-3 max-w-2xl text-2xl font-medium leading-tight tracking-[-.03em] sm:text-[1.8rem]">{title}</h3>
                  <p className="mt-4 max-w-2xl text-sm font-light leading-relaxed text-ivory-400">{text}</p>
                </div>

                <div className="flex items-end border-t border-white/10 px-5 py-4 sm:min-w-40 sm:border-l sm:border-t-0 sm:px-5 sm:py-6">
                  <div className="text-[8px] uppercase tracking-[.16em] text-white/60">
                    SIGNAL
                    <span className="mt-2 block text-[10px] normal-case tracking-normal text-white/55">{signal}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
