import { useState } from 'react';
import { ArrowUpRight, Monitor, PawPrint, Smartphone, Sparkles, Tablet } from 'lucide-react';
import { referenceProjects } from '../data/studio-offers';

type DeviceMode = 'all' | 'desktop' | 'tablet' | 'mobile';
type ShowcaseView = 'presentation' | 'page';
type ReferenceProject = (typeof referenceProjects)[number];
type ProjectDevice = 'desktop' | 'tablet' | 'mobile';

const deviceOptions: Array<{ id: DeviceMode; label: string; icon: typeof Monitor }> = [
  { id: 'all', label: 'Összkép', icon: Monitor },
  { id: 'desktop', label: 'Desktop', icon: Monitor },
  { id: 'tablet', label: 'Tablet', icon: Tablet },
  { id: 'mobile', label: 'Mobil', icon: Smartphone },
];

function BundavarazsScreen({ compact = false }: { compact?: boolean }) {
  return (
    <div className="relative flex h-full w-full overflow-hidden bg-[#f7f0eb] text-[#5a433b]">
      <div
        className="pointer-events-none absolute inset-0 opacity-65"
        aria-hidden="true"
        style={{
          backgroundImage:
            'radial-gradient(circle at 18% 18%, rgba(208,169,151,.25), transparent 28%), radial-gradient(circle at 82% 72%, rgba(181,137,121,.16), transparent 30%)',
        }}
      />
      <div className="relative z-10 grid h-full w-full grid-cols-[1.08fr_.92fr] items-center gap-3 p-[7%]">
        <div>
          <div className="mb-2 flex items-center gap-1.5 text-[7px] uppercase tracking-[.17em] text-[#6b4c43] sm:text-[9px]">
            <PawPrint size={compact ? 10 : 13} strokeWidth={1.5} aria-hidden="true" />
            Kutyakozmetika
          </div>
          <div className={`font-serif leading-[.98] tracking-tight ${compact ? 'text-[13px]' : 'text-[clamp(1rem,2.4vw,2.25rem)]'}`}>
            Ápolt bunda.<br />Nyugodt gazdi.
          </div>
          {!compact && (
            <>
              <p className="mt-2 max-w-xs text-[8px] leading-relaxed text-[#5f4a43] sm:text-[10px]">
                Személyes, barátságos megjelenés helyi ügyfelekre és egyszerű időpontkérésre építve.
              </p>
              <div className="mt-3 inline-flex rounded-full bg-[#6b4c43] px-3 py-1.5 text-[7px] font-medium uppercase tracking-[.12em] text-white sm:text-[8px]">
                Időpontot kérek
              </div>
            </>
          )}
        </div>
        <div className="relative flex items-center justify-center">
          <div className="absolute h-[72%] w-[72%] rounded-full bg-[#d9beb1]/40 blur-2xl" aria-hidden="true" />
          <div className="relative flex aspect-square w-[76%] items-center justify-center rounded-[30%] border border-[#9a6e61]/15 bg-[#eadbd3] shadow-inner">
            <PawPrint className="text-[#7b574d]" size={compact ? 26 : 52} strokeWidth={1.05} aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectScreen({
  project,
  device = 'desktop',
  decorative = false,
  className = '',
  compact = false,
}: {
  project: ReferenceProject;
  device?: ProjectDevice;
  decorative?: boolean;
  className?: string;
  compact?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const source =
    device === 'tablet'
      ? project.tabletImage
      : device === 'mobile'
        ? project.mobileImage
        : project.image;

  if (source && !failed) {
    return (
      <img
        src={source}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        alt={decorative ? '' : `${project.name} – ${device} nézet a weboldalról`}
        aria-hidden={decorative ? 'true' : undefined}
        onError={() => setFailed(true)}
        className={`h-full w-full object-cover object-top ${className}`}
      />
    );
  }

  if (device === 'desktop' && project.id === 'bundavarazs') {
    return <BundavarazsScreen compact={compact} />;
  }

  return (
    <div
      className={`flex h-full w-full items-center justify-center bg-graphite-900 p-4 text-center text-white/55 ${className}`}
      aria-hidden={decorative ? 'true' : undefined}
    >
      <div>
        <div className="text-[8px] uppercase tracking-[.18em] text-signal-400">LS / PREVIEW</div>
        <div className="mt-2 text-[10px] font-medium text-white/80">{project.name}</div>
        <div className="mt-1 text-[8px] uppercase tracking-[.12em]">
          {device} nézet nem tölthető be
        </div>
      </div>
    </div>
  );
}
function PageStage({ project }: { project: ReferenceProject }) {
  return (
    <div className="relative min-h-[330px] overflow-hidden bg-graphite-950 p-5 sm:min-h-[430px] sm:p-8 lg:min-h-[520px] lg:p-10">
      <div
        className="pointer-events-none absolute inset-0 opacity-35"
        aria-hidden="true"
        style={{
          backgroundImage:
            'radial-gradient(circle at 78% 16%, rgba(216,255,120,.13), transparent 26%), linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)',
          backgroundSize: 'auto, 32px 32px, 32px 32px',
        }}
      />

      <div className="relative z-10 mx-auto w-[94%] max-w-4xl">
        <div className="overflow-hidden rounded-xl border border-white/15 bg-white shadow-[0_32px_90px_rgba(0,0,0,.42)]">
          <div className="flex h-9 items-center gap-1.5 border-b border-graphite-950/10 bg-[#f4f4f1] px-3 sm:h-10 sm:px-4">
            <span className="h-2 w-2 rounded-full bg-graphite-300" />
            <span className="h-2 w-2 rounded-full bg-graphite-300" />
            <span className="h-2 w-2 rounded-full bg-graphite-300" />
            <div className="ml-3 min-w-0 flex-1 truncate rounded-md bg-white px-3 py-1 text-[9px] text-graphite-500 sm:text-[10px]">
              {new URL(project.liveUrl).hostname}
            </div>
          </div>
          <div className="aspect-[1.55] overflow-hidden bg-ivory-100">
            <ProjectScreen project={project} />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 text-[9px] uppercase tracking-[.16em] text-white/45 sm:text-[10px]">
          <span>Oldalnézet · ugyanaz a projektforrás</span>
          <span className="hidden sm:inline">Tiszta browser frame</span>
        </div>
      </div>
    </div>
  );
}

function PresentationStage({ project, mode }: { project: ReferenceProject; mode: DeviceMode }) {
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
        className={`relative z-10 mx-auto w-[92%] origin-center transition-all duration-500 motion-reduce:transform-none motion-reduce:transition-none sm:w-[88%] lg:w-[82%] ${
          desktopFocus ? 'translate-y-0 scale-100 opacity-100' : '-translate-y-2 scale-[.96] opacity-25'
        }`}
      >
        <div className="overflow-hidden rounded-xl border border-white/15 bg-white shadow-[0_28px_90px_rgba(0,0,0,.38)]">
          <div className="flex h-8 items-center gap-1.5 border-b border-graphite-950/10 bg-[#f4f4f1] px-3 sm:h-10 sm:px-4">
            <span className="h-2 w-2 rounded-full bg-graphite-300" />
            <span className="h-2 w-2 rounded-full bg-graphite-300" />
            <span className="h-2 w-2 rounded-full bg-graphite-300" />
            <div className="ml-3 min-w-0 flex-1 truncate rounded-md bg-white px-3 py-1 text-[9px] text-graphite-500 sm:text-[10px]">
              {new URL(project.liveUrl).hostname}
            </div>
          </div>
          <div className="aspect-[1.55] overflow-hidden bg-ivory-100">
            <ProjectScreen project={project} />
          </div>
        </div>
      </div>

      <div
        className={`absolute bottom-5 left-[5%] z-20 w-[27%] min-w-[112px] max-w-[220px] origin-bottom-left -rotate-[2deg] transition-all duration-500 motion-reduce:transform-none motion-reduce:transition-none sm:bottom-7 sm:left-[7%] lg:bottom-8 lg:left-[8%] ${
          tabletFocus
            ? mode === 'tablet'
              ? 'scale-[1.16] opacity-100'
              : 'scale-100 opacity-100'
            : 'scale-[.9] opacity-20'
        }`}
      >
        <div className="rounded-[18px] border border-white/20 bg-[#20211f] p-[5px] shadow-[0_22px_55px_rgba(0,0,0,.45)] sm:rounded-[24px] sm:p-[7px]">
          <div className="overflow-hidden rounded-[13px] bg-white sm:rounded-[18px]" style={{ aspectRatio: "834 / 1194" }}>
            <ProjectScreen project={project} device="tablet" decorative compact className="object-cover object-top" />
          </div>
        </div>
      </div>

      <div
        className={`absolute bottom-3 right-[5%] z-30 w-[17%] min-w-[70px] max-w-[126px] origin-bottom-right rotate-[3deg] transition-all duration-500 motion-reduce:transform-none motion-reduce:transition-none sm:bottom-6 sm:right-[7%] lg:bottom-7 lg:right-[9%] ${
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
            <ProjectScreen project={project} device="mobile" decorative compact className="object-cover object-top" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-3 left-1/2 z-0 h-16 w-[72%] -translate-x-1/2 rounded-[50%] bg-black/40 blur-2xl" aria-hidden="true" />

      <div className="absolute bottom-4 left-4 z-40 rounded-full border border-white/10 bg-black/35 px-3 py-1.5 text-[8px] uppercase tracking-[.16em] text-white/60 backdrop-blur sm:bottom-6 sm:left-6 sm:text-[9px]">
        Valódi reszponzív nézet · desktop / tablet / mobil
      </div>
    </div>
  );
}

export default function StudioLab() {
  const [focusedDevices, setFocusedDevices] = useState<Record<string, DeviceMode>>({});
  const [showcaseViews, setShowcaseViews] = useState<Record<string, ShowcaseView>>({});

  return (
    <section id="lab" className="scroll-mt-20 bg-ivory-100 px-5 py-20 text-graphite-950 sm:px-6 md:py-24 lg:px-8" style={{ contentVisibility: 'auto', containIntrinsicSize: '1400px' }}>
      <div className="mx-auto max-w-[86rem]">
        <div className="mb-12 grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[.2em] text-graphite-500">Válogatott munkák · prémium bemutató</p>
            <h2 className="font-serif text-5xl font-light leading-[1.02] tracking-editorial sm:text-6xl">
              A munka, amit látni is lehet.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-graphite-600 lg:justify-self-end">
            Ugyanazt az élő projektet kétféleképpen mutatjuk: tiszta oldalnézetben és valódi desktop, tablet és mobil viewportból készített prezentációban.
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
                      <PresentationStage project={project} mode={mode} />
                    ) : (
                      <PageStage project={project} />
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

                    {showcaseView === 'presentation' && (
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
