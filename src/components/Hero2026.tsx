import { ArrowDown, ArrowUpRight, Check } from 'lucide-react';

export default function Hero2026() {
  return (
    <div className="relative z-10 px-5 pb-16 pt-32 text-ivory-100 sm:px-6 md:pb-20 md:pt-40 lg:px-8">
      <div className="relative mx-auto max-w-[86rem]">
        <div className="grid gap-12 lg:grid-cols-[.95fr_1.05fr] lg:items-center lg:gap-14">
          <div>
            <p className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[.18em] text-signal-400"><span className="signal-dot" />Weboldalak szolgáltató vállalkozásoknak</p>
            <h1 className="max-w-[12ch] text-[clamp(2.75rem,5.6vw,5.25rem)] font-medium leading-[.98] tracking-[-.055em] text-balance">Weboldal, amire <span className="font-serif font-light italic text-signal-300 drop-shadow-[0_0_28px_rgba(216,255,120,.12)]">büszkén</span> küldöd az ügyfeled.</h1>
            <p className="mt-7 max-w-xl text-lg font-light leading-relaxed text-ivory-300">Megmutatjuk, miben vagy jó, rendbe tesszük az ajánlatodat, és egyszerűvé tesszük a kapcsolatfelvételt. A tervezéstől a működő oldalig.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#diagnosztika" className="signal-button-primary" data-track-cta="Ajánlatot kérek" data-track-location="hero_primary">Ajánlatot kérek <ArrowUpRight size={18} aria-hidden="true" /></a>
              <a href="#lab" className="signal-button-secondary" data-track-cta="Megnézem a munkákat" data-track-location="hero_secondary">Megnézem a munkákat <ArrowDown size={17} aria-hidden="true" /></a>
            </div>
            <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-xs text-ivory-300">
              {['Saját, működő projektek', 'Előre egyeztetett feladatok', 'Közvetlenül velem dolgozol'].map(text => <li key={text} className="flex items-center gap-2"><Check size={14} className="text-signal-400" aria-hidden="true" />{text}</li>)}
            </ul>
          </div>
          <div className="min-w-0">
            <a
              href="/esettanulmanyok/klimatisztak-kalkulator-ugyfelut/"
              className="group relative block overflow-hidden rounded-2xl border border-white/15 bg-graphite-900 shadow-2xl shadow-black/40"
              aria-label="KlímaTiszták projektbemutatás"
            >
              <img
                src="https://d33wubrfki0l68.cloudfront.net/6aa7727ca06f6a4ae42ef0e7/screenshot_2026-09-14-04-05-37-0000.webp"
                width="1348"
                height="926"
                alt="A KlímaTiszták éles weboldalának főoldala és kalkulátora"
                fetchPriority="high"
                className="aspect-[1.456] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.012] motion-reduce:transform-none motion-reduce:transition-none"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" aria-hidden="true" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 sm:bottom-5 sm:left-5 sm:right-5">
                <div className="rounded-xl border border-white/15 bg-graphite-950/75 px-4 py-3 text-white backdrop-blur-md">
                  <p className="text-[9px] uppercase tracking-[.18em] text-signal-300">LS / CASE 01</p>
                  <p className="mt-1 text-sm font-medium">KlímaTiszták · saját digitális projekt</p>
                </div>
                <span className="hidden rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-[9px] uppercase tracking-[.16em] text-white/80 backdrop-blur sm:inline-flex">
                  Desktop · Tablet · Mobil
                </span>
              </div>
            </a>
            <div className="mt-5 flex items-center justify-between gap-4 text-xs text-ivory-400"><span><a href="https://klimatisztak.hu/" target="_blank" rel="noopener noreferrer" className="hover:text-signal-300">KlímaTiszták · éles weboldal ↗</a></span><a href="#lab" className="inline-flex items-center gap-2 text-signal-300 hover:underline">Mind a négy munka <ArrowDown size={14} aria-hidden="true" /></a></div>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3"><img src="/levente_studio_portrait_final.webp" width="44" height="44" alt="Tarnóczi Levente" className="h-11 w-11 rounded-full object-cover" /><p className="text-sm">Tarnóczi Levente<span className="mt-1 block text-xs text-ivory-400">Szakemberként és weboldalkészítőként is a működő megoldásokat keresem.</span></p></div>
          <a href="#csomagok" className="text-sm text-ivory-300 transition hover:text-signal-300">Weboldalcsomagok 149 000 Ft-tól <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </div>
  );
}
