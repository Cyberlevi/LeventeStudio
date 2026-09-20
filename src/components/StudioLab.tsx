import { useState } from 'react';
import { ArrowUpRight, Monitor, PawPrint, Smartphone, Tablet } from 'lucide-react';
import { referenceProjects } from '../data/studio-offers';

type DeviceMode = 'all' | 'desktop' | 'tablet' | 'mobile';
type ReferenceProject = (typeof referenceProjects)[number];

const deviceOptions: Array<{ id: DeviceMode; label: string; icon: typeof Monitor }> = [
  { id: 'all', label: 'Összkép', icon: Monitor },
  { id: 'desktop', label: 'Desktop', icon: Monitor },
  { id: 'tablet', label: 'Tablet', icon: Tablet },
  { id: 'mobile', label: 'Mobil', icon: Smartphone },
];

function ProjectScreen({
  project,
  decorative = false,
  className = '',
}: {
  project: ReferenceProject;
  decorative?: boolean;
  className?: string;
}) {
  if (project.image) {
    return (
      <img
        src={project.image}
        loading="lazy"
        decoding="async"
        alt={decorative ? '' : `${project.name} – képernyőkép a weboldalról`}
        aria-hidden={decorative ? 'true' : undefined}
        className={`h-full w-full object-cover object-top ${className}`}
      />
    );
  }

  return (
    <div
      aria-hidden={decorative ? 'true' : undefined}
      className={`flex h-full w-full flex-col items-center justify-center gap-3 bg-[#eee5de] px-5 text-center text-[#655248] ${className}`}
    >
      <PawPrint size={decorative ? 26 : 38} strokeWidth={1.2} aria-hidden="true" />
      <span className={decorative ? 'font-serif text-lg' : 'font-serif text-2xl sm:text-3xl'}>
        Bundavarázs
      </span>
      {!decorative && (
        <span className="text-[9px] uppercase tracking-[.18em]">Kutyakozmetika · projektbemutatás</span>
      )}
    </div>
  );
}

function DeviceStage({ project, mode }: { project: ReferenceProject; mode: DeviceMode }) {
  const desktopFocus = mode === 'all' || mode === 'desktop';
  const tabletFocus = mode === 'all' || mode === 'tablet';
  const mobileFocus = mode === 'all' || mode === 'mobile';

  return (
    <div className="relative min-h-[330px] overflow-hidden bg-graphite-950 p-5 sm:min-h-[430px] sm:p-8 lg:min-h-[520px] lg:p-10">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
        style={{
          backgroundImage:
            'radial-gradient(circle at 78% 16%, rgba(216,255,120,.15), transparent 26%), linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)',
          backgroundSize: 'auto, 32px 32px, 32px 32px',
        }}
      />
      <div className="pointer-events-none absolute -right-12 top-10 h-52 w-52 rounded-full bg-signal-400/10 blur-3xl" aria-hidden="true" />

      <div
        className={`relative z-10 mx-auto w-[92%] origin-center transition-all duration-500 motion-reduce:transition-none sm:w-[88%] lg:w-[82%] ${
          desktopFocus ? 'translate-y-0 scale-100 opacity-100' : '-translate-y-2 scale-[.96] opacity-25'
        }`}
      >
        <div className="overflow-hidden rounded-xl border border-white/15 bg-white shadow-[0_28px_90px_rgba(0,0,0,.38)]">
          <div className="flex h-8 items-center gap-1.5 border-b border-graphite-950/10 bg-[#f4f4f1] px-3 sm:h-10 sm:px-4">
            <span className="h-2 w-2 rounded-full bg-graphite-300" />
            <span className="h-2 w-2 rounded-full bg-graphite-300" />
            <span className="h-2 w-2 rounded-full bg-graphite-300" />
            <div className="ml-3 min-w-0 flex-1 truncate rounded-md bg-white px-3 py-1 text-[9px] text-graphite-500 sm:text-[10px]">
              {project.liveUrl ? new URL(project.liveUrl).hostname : project.name.toLowerCase()}
            </div>
          </div>
          <div className="aspect-[1.55] overflow-hidden bg-ivory-100">
            <ProjectScreen project={project} />
          </div>
        </div>
      </div>

      <div
        className={`absolute bottom-5 left-[5%] z-20 w-[27%] min-w-[112px] max-w-[220px] origin-bottom-left -rotate-[2deg] transition-all duration-500 motion-reduce:transition-none sm:bottom-7 sm:left-[7%] lg:bottom-8 lg:left-[8%] ${
          tabletFocus
            ? mode === 'tablet'
              ? 'scale-[1.16] opacity-100'
              : 'scale-100 opacity-100'
            : 'scale-[.9] opacity-20'
        }`}
      >
        <div className="rounded-[18px] border border-white/20 bg-[#20211f] p-[5px] shadow-[0_22px_55px_rgba(0,0,0,.45)] sm:rounded-[24px] sm:p-[7px]">
          <div className="aspect-[4/5] overflow-hidden rounded-[13px] bg-white sm:rounded-[18px]">
            <ProjectScreen project={project} decorative className="object-cover object-top" />
          </div>
        </div>
      </div>

      <div
        className={`absolute bottom-3 right-[5%] z-30 w-[17%] min-w-[70px] max-w-[126px] origin-bottom-right rotate-[3deg] transition-all duration-500 motion-reduce:transition-none sm:bottom-6 sm:right-[7%] lg:bottom-7 lg:right-[9%] ${
          mobileFocus
            ? mode === 'mobile'
              ? 'scale-[1.2] opacity-100'
              : 'scale-100 opacity-100'
            : 'scale-[.88] opacity-20'
        }`}
      >
        <div className="rounded-[18px] border border-white/20 bg-[#161715] p-[4px] shadow-[0_22px_55px_rgba(0,0,0,.52)] sm:rounded-[24px] sm:p-[5px]">
          <div className="relative aspect-[9/19.5] overflow-hidden rounded-[14px] bg-white sm:rounded-[19px]">
            <div className="absolute left-1/2 top-1.5 z-10 h-1.5 w-[34%] -translate-x-1/2 rounded-full bg-black/75" aria-hidden="true" />
            <ProjectScreen project={project} decorative className="object-cover object-top" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-3 left-1/2 z-0 h-16 w-[72%] -translate-x-1/2 rounded-[50%] bg-black/40 blur-2xl" aria-hidden="true" />
    </div>
  );
}

export default function StudioLab() {
  const [focusedDevices, setFocusedDevices] = useState<Record<string, DeviceMode>>({});

  return (
    <section id="lab" className="scroll-mt-20 bg-ivory-100 px-5 py-20 text-graphite-950 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-[86rem]">
        <div className="mb-12 grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[.2em] text-graphite-500">Válogatott munkák · responsive showcase</p>
            <h2 className="font-serif text-5xl font-light leading-[1.02] tracking-editorial sm:text-6xl">
              Nem csak egy képernyőre építünk.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-graphite-600 lg:justify-self-end">
            Valós saját és családi projektek. Nézd meg ugyanazt a munkát desktop, tablet és mobil nézetben — mert az ügyfélút minden kijelzőn számít.
          </p>
        </div>

        <div className="space-y-7 lg:space-y-9">
          {referenceProjects.map((project, index) => {
            const primaryUrl = project.href;
            const mode = focusedDevices[project.id] ?? 'all';

            return (
              <article
                key={project.id}
                className="group overflow-hidden rounded-2xl border border-graphite-950/10 bg-white shadow-[0_14px_45px_rgba(18,20,17,.05)]"
              >
                <div className="grid lg:grid-cols-[1.32fr_.68fr]">
                  <div className="relative border-b border-graphite-950/10 lg:border-b-0 lg:border-r">
                    <div className="absolute left-5 top-5 z-40 flex items-center gap-2 rounded-full border border-white/15 bg-graphite-950/75 px-3 py-1.5 text-[9px] uppercase tracking-[.16em] text-white backdrop-blur-md sm:left-7 sm:top-7">
                      <span className="h-1.5 w-1.5 rounded-full bg-signal-400 shadow-[0_0_12px_rgba(216,255,120,.8)]" />
                      LS / CASE {String(index + 1).padStart(2, '0')}
                    </div>
                    <DeviceStage project={project} mode={mode} />
                  </div>

                  <div className="flex flex-col p-6 sm:p-8 lg:p-9 xl:p-10">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-[.16em] text-graphite-500">{project.category}</p>
                        <h3 className="mt-3 font-serif text-4xl font-light tracking-tight sm:text-[2.7rem]">{project.name}</h3>
                      </div>
                      <span className="hidden rounded-full border border-graphite-950/10 px-3 py-1 text-[9px] uppercase tracking-[.16em] text-graphite-500 sm:inline-flex">
                        Responsive
                      </span>
                    </div>

                    <p className="mt-5 text-base leading-relaxed text-graphite-700">{project.description}</p>
                    <p className="mt-3 text-sm leading-relaxed text-graphite-500">{project.detail}</p>

                    <div className="mt-7">
                      <p className="mb-3 text-[9px] uppercase tracking-[.18em] text-graphite-500">Nézet fókusz</p>
                      <div className="flex flex-wrap gap-2" role="group" aria-label={`${project.name} eszköznézet`}>
                        {deviceOptions.map((option) => {
                          const Icon = option.icon;
                          const active = mode === option.id;
                          return (
                            <button
                              key={option.id}
                              type="button"
                              aria-pressed={active}
                              onClick={() =>
                                setFocusedDevices((current) => ({
                                  ...current,
                                  [project.id]: option.id,
                                }))
                              }
                              className={`inline-flex min-h-12 items-center gap-2 rounded-full border px-3.5 py-2 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-400 focus-visible:ring-offset-2 ${
                                active
                                  ? 'border-graphite-950 bg-graphite-950 text-white'
                                  : 'border-graphite-950/10 bg-ivory-100 text-graphite-600 hover:border-graphite-950/30 hover:text-graphite-950'
                              }`}
                            >
                              <Icon size={14} strokeWidth={1.7} aria-hidden="true" />
                              {option.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="mt-auto pt-8">
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-graphite-950/10 pt-5 text-sm">
                        <a href={primaryUrl} className="inline-flex items-center gap-2 font-medium hover:underline">
                          Esettanulmány <ArrowUpRight size={15} aria-hidden="true" />
                        </a>
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-graphite-500 hover:text-graphite-950"
                          >
                            Élő weboldal <span className="sr-only">(új lapon)</span> ↗
                          </a>
                        )}
                      </div>
                      <a
                        href={`/kapcsolat/?projekt=${project.id}#diagnosztika`}
                        data-track-cta={`Hasonlót szeretnék - ${project.name}`}
                        data-track-location="portfolio"
                        className="mt-5 inline-flex w-fit items-center gap-2 text-sm text-graphite-600 underline decoration-graphite-300 underline-offset-4 hover:text-graphite-950"
                      >
                        Hasonló rendszert szeretnék <ArrowUpRight size={15} aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
