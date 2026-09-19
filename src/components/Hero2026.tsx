import { ArrowDown, ArrowUpRight, Check } from 'lucide-react';

export default function Hero2026() {
  return (
    <section className="relative overflow-hidden bg-graphite-950 px-5 pb-16 pt-32 text-ivory-100 sm:px-6 md:pb-20 md:pt-40 lg:px-8">
      <div className="pointer-events-none absolute inset-0 studio-grid-dark opacity-20" aria-hidden="true" />
      <div className="relative mx-auto max-w-[86rem]">
        <div className="grid gap-12 lg:grid-cols-[.95fr_1.05fr] lg:items-center lg:gap-14">
          <div>
            <p className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[.18em] text-signal-400"><span className="signal-dot" />Weboldalak szolgáltató vállalkozásoknak</p>
            <h1 className="max-w-[12ch] text-[clamp(2.6rem,5.2vw,4.8rem)] font-medium leading-[1.04] tracking-[-.045em]">Weboldal, amire <span className="font-serif font-light italic text-signal-300">büszkén</span> küldöd az ügyfeled.</h1>
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
            <a href="/esettanulmanyok/klima18ker-weboldal-audit/" className="group block overflow-hidden rounded-xl border border-white/15 bg-ivory-100 shadow-2xl shadow-black/40" aria-label="Klíma18ker projektbemutatás">
              <div className="flex items-center justify-between border-b border-graphite-950/10 px-4 py-3 text-graphite-600"><span className="flex gap-1.5" aria-hidden="true">{[1,2,3].map(dot => <span key={dot} className="h-2 w-2 rounded-full bg-graphite-300" />)}</span><span className="text-xs">klima18ker.hu</span><ArrowUpRight size={16} aria-hidden="true" /></div>
              <img src="/projects/klima18ker.webp" width="1348" height="926" alt="A Klíma18ker weboldala saját szerelési fotóval és jól látható ajánlatkéréssel" fetchPriority="high" className="block h-auto w-full" />
            </a>
            <div className="mt-5 flex items-center justify-between gap-4 text-xs text-ivory-400"><span>Saját projekt. Valódi szolgáltatás.</span><a href="#lab" className="inline-flex items-center gap-2 text-signal-300 hover:underline">Mindhárom munka <ArrowDown size={14} aria-hidden="true" /></a></div>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3"><img src="/levente_studio_portrait_final.webp" width="44" height="44" alt="Tarnóczi Levente" className="h-11 w-11 rounded-full object-cover" /><p className="text-sm">Tarnóczi Levente<span className="mt-1 block text-xs text-ivory-400">Szakemberként és weboldalkészítőként is a működő megoldásokat keresem.</span></p></div>
          <a href="#csomagok" className="text-sm text-ivory-300 transition hover:text-signal-300">Weboldalcsomagok 149 000 Ft-tól <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  );
}
