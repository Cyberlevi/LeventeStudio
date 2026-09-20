import { useState } from 'react';
import { ArrowUpRight, Monitor, PawPrint, Smartphone, Sparkles, Tablet } from 'lucide-react';
import { referenceProjects } from '../data/studio-offers';

type DeviceMode = 'all' | 'desktop' | 'tablet' | 'mobile';
type ShowcaseView = 'presentation' | 'page';
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

function BundavarazsPresentation() {
  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-[#211c1b]">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        aria-hidden="true"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 18%, rgba(232,194,177,.24), transparent 30%), radial-gradient(circle at 82% 76%, rgba(196,151,137,.18), transparent 34%), linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px)',
          backgroundSize: 'auto, auto, 30px 30px, 30px 30px',
        }}
      />

      <div className="absolute left-[8%] top-[12%] w-[72%] overflow-hidden rounded-[18px] border border-white/15 bg-[#f5eee9] shadow-[0_28px_80px_rgba(0,0,0,.4)] sm:rounded-[24px]">
        <div className="flex h-8 items-center gap-1.5 border-b border-[#6a5148]/10 bg-[#eadfd8] px-3 sm:h-10 sm:px-4">
          <span className="h-2 w-2 rounded-full bg-[#c9b4aa]" />
          <span className="h-2 w-2 rounded-full bg-[#c9b4aa]" />
          <span className="h-2 w-2 rounded-full bg-[#c9b4aa]" />
          <span className="ml-auto text-[8px] uppercase tracking-[.16em] text-[#5a433b] sm:text-[9px]">Bundavarázs</span>
        </div>

        <div className="grid min-h-[215px] grid-cols-[1.15fr_.85fr] gap-4 p-5 sm:min-h-[275px] sm:gap-7 sm:p-7">
          <div className="flex flex-col justify-center">
            <div className="mb-3 flex items-center gap-2 text-[8px] uppercase tracking-[.17em] text-[#6b4c43] sm:text-[9px]">
              <PawPrint size={13} strokeWidth={1.5} aria-hidden="true" />
              Kutyakozmetika
            </div>
            <div className="font-serif text-[clamp(1.5rem,3vw,3rem)] leading-[.96] tracking-tight text-[#5a433b]">
              Ápolt bunda.<br />Nyugodt gazdi.
            </div>
            <p className="mt-3 max-w-xs text-[8px] leading-relaxed text-[#5f4a43] sm:text-[10px]">
              Személyes, barátságos megjelenés helyi ügyfelekre és egyszerű időpontkérésre építve.
            </p>
            <div className="mt-4 flex gap-2">
              <span className="rounded-full bg-[#6b4c43] px-3 py-1.5 text-[7px] font-medium uppercase tracking-[.12em] text-white sm:text-[8px]">
                Időpontot kérek
              </span>
              <span className="rounded-full border border-[#6b4c43]/15 px-3 py-1.5 text-[7px] uppercase tracking-[.12em] text-[#6b4c43] sm:text-[8px]">
                Szolgáltatások
              </span>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute h-[72%] w-[72%] rounded-full bg-[#d9beb1]/35 blur-2xl" aria-hidden="true" />
            <div className="relative flex aspect-square w-[78%] items-center justify-center rounded-[32%] border border-[#9a6e61]/15 bg-[#eadbd3] shadow-inner">
              <PawPrint className="text-[#8a6258]" size={58} strokeWidth={1.05} aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[7%] right-[8%] w-[24%] min-w-[82px] max-w-[155px] rotate-[3deg] rounded-[20px] border border-white/20 bg-[#332927] p-[5px] shadow-[0_24px_55px_rgba(0,0,0,.5)] sm:rounded-[28px] sm:p-[6px]">
        <div className="relative aspect-[9/19.5] overflow-hidden rounded-[15px] bg-[#f8f1ed] p-3 sm:rounded-[21px] sm:p-4">
          <div className="mx-auto h-1.5 w-[34%] rounded-full bg-[#332927]/80" />
          <div className="mt-5 flex justify-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eadbd3]">
              <PawPrint size={18} className="text-[#7b574d]" aria-hidden="true" />
            </div>
          </div>
          <p className="mt-4 text-center font-serif text-[12px] leading-tight text-[#5a433b] sm:text-base">Bundavarázs</p>
          <div className="mt-4 space-y-2">
            <div className="h-2 rounded-full bg-[#ddcec7]" />
            <div className="h-2 w-4/5 rounded-full bg-[#e7dbd5]" />
            <div className="mt-4 h-7 rounded-lg bg-[#6b4c43]" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 z-20 rounded-xl border border-white/15 bg-black/35 px-4 py-3 text-white backdrop-blur-md sm:bottom-6 sm:left-6">
        <p className="text-[9px] uppercase tracking-[.18em] text-[#f1c9b9]">Bundavarázs · vizuális irány</p>
        <p className="mt-1 text-xs text-white/85">Fotók nélkül is saját, felismerhető projektmegjelenés.</p>
      </div>
    </div>
  );
}

function PresentationStage({ project }: { project: ReferenceProject }) {
  if (!project.showcaseImage) {
    return <BundavarazsPresentation />;
  }

  return (
    <div className="relative overflow-hidden bg-graphite-950">
      <img
        src={project.showcaseImage}
        width="512"
        height="384"
        loading="lazy"
        decoding="async"
        alt={`${project.name} – vizuális projektbemutató desktop, tablet és mobil kompozícióval`}
        className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.012] motion-reduce:transform-none motion-reduce:transition-none"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-graphite-950/55 via-transparent to-transparent"
      />
      <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-end justify-between gap-3 sm:bottom-6 sm:left-6 sm:right-6">
        <div className="max-w-lg rounded-xl border border-white/15 bg-graphite-950/75 px-4 py-3 text-white shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-2 text-[9px] uppercase tracking-[.18em] text-signal-300">
            <Sparkles size={13} aria-hidden="true" />
            Vizuális projektbemutató
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-white/70">
            Prémium prezentációs kompozíció. A tényleges oldal külön megnyitható és az Oldalnézetben is ellenőrizhető.
          </p>
        </div>
        <span className="rounded-full border border-white/15 bg-black/45 px-3 py-1.5 text-[9px] uppercase tracking-[.16em] text-white/75 backdrop-blur-md">
          Concept visual
        </span>
      </div>
    </div>
  );
}

export default function StudioLab() {
  const [focusedDevices, setFocusedDevices] = useState<Record<string, DeviceMode>>({});
  const [showcaseViews, setShowcaseViews] = useState<Record<string, ShowcaseView>>({});

  return (
    <section id="lab" className="scroll-mt-20 bg-ivory-100 px-5 py-20 text-graphite-950 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-[86rem]">
        <div className="mb-12 grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[.2em] text-graphite-500">Válogatott munkák · prémium bemutató</p>
            <h2 className="font-serif text-5xl font-light leading-[1.02] tracking-editorial sm:text-6xl">
              A munka, amit látni is lehet.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-graphite-600 lg:justify-self-end">
            Először a projekt vizuális történetét mutatjuk meg, utána egy kattintással megnézheted az oldal tényleges képernyőnézetét is. Látvány és ellenőrizhető munka, egymás mellett.
          </p>
        </div>

        <div className="space-y-7 lg:space-y-9">
          {referenceProjects.map((project, index) => {
            const primaryUrl = project.href;
            const mode = focusedDevices[project.id] ?? 'all';
            const showcaseView = showcaseViews[project.id] ?? 'presentation';

            return (
              <article
                key={project.id}
                className="group overflow-hidden rounded-2xl border border-graphite-950/10 bg-white shadow-[0_18px_70px_rgba(18,20,17,.07)]"
              >
                <div className="grid lg:grid-cols-[1.42fr_.58fr]">
                  <div className="relative border-b border-graphite-950/10 lg:border-b-0 lg:border-r">
                    <div className="absolute left-5 top-5 z-40 flex items-center gap-2 rounded-full border border-white/15 bg-graphite-950/80 px-3 py-1.5 text-[9px] uppercase tracking-[.16em] text-white shadow-lg backdrop-blur-md sm:left-7 sm:top-7">
                      <span className="h-1.5 w-1.5 rounded-full bg-signal-400 shadow-[0_0_12px_rgba(216,255,120,.8)]" />
                      LS / CASE {String(index + 1).padStart(2, '0')}
                    </div>
                    {showcaseView === 'presentation' ? (
                      <PresentationStage project={project} />
                    ) : (
                      <DeviceStage project={project} mode={mode} />
                    )}
                  </div>

                  <div className="flex flex-col p-6 sm:p-8 lg:p-9 xl:p-10">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-[.16em] text-graphite-500">{project.category}</p>
                        <h3 className="mt-3 font-serif text-4xl font-light tracking-tight sm:text-[2.7rem]">{project.name}</h3>
                      </div>
                      <span className="hidden rounded-full border border-graphite-950/10 px-3 py-1 text-[9px] uppercase tracking-[.16em] text-graphite-500 sm:inline-flex">
                        Case study
                      </span>
                    </div>

                    <p className="mt-5 text-base leading-relaxed text-graphite-700">{project.description}</p>
                    <p className="mt-3 text-sm leading-relaxed text-graphite-500">{project.detail}</p>

                    <div className="mt-7">
                      <p className="mb-3 text-[9px] uppercase tracking-[.18em] text-graphite-500">Projekt megjelenítése</p>
                      <div className="grid grid-cols-2 gap-2" role="group" aria-label={`${project.name} megjelenítési mód`}>
                        <button
                          type="button"
                          aria-pressed={showcaseView === 'presentation'}
                          onClick={() =>
                            setShowcaseViews((current) => ({ ...current, [project.id]: 'presentation' }))
                          }
                          className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-medium transition-colors ${
                            showcaseView === 'presentation'
                              ? 'border-graphite-950 bg-graphite-950 text-white'
                              : 'border-graphite-950/10 bg-ivory-100 text-graphite-600 hover:border-graphite-950/30 hover:text-graphite-950'
                          }`}
                        >
                          <Sparkles size={14} aria-hidden="true" />
                          Prezentáció
                        </button>
                        <button
                          type="button"
                          aria-pressed={showcaseView === 'page'}
                          onClick={() =>
                            setShowcaseViews((current) => ({ ...current, [project.id]: 'page' }))
                          }
                          className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-medium transition-colors ${
                            showcaseView === 'page'
                              ? 'border-graphite-950 bg-graphite-950 text-white'
                              : 'border-graphite-950/10 bg-ivory-100 text-graphite-600 hover:border-graphite-950/30 hover:text-graphite-950'
                          }`}
                        >
                          <Monitor size={14} aria-hidden="true" />
                          Oldalnézet
                        </button>
                      </div>
                    </div>

                    {showcaseView === 'page' && (
                      <div className="mt-5">
                        <p className="mb-3 text-[9px] uppercase tracking-[.18em] text-graphite-500">Eszköz fókusz</p>
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
                                className={`inline-flex min-h-12 items-center gap-2 rounded-full border px-3.5 py-2 text-xs transition-colors ${
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
                    )}

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
