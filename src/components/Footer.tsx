export default function Footer() {
  return (
    <footer className="site-footer px-5 sm:px-6 lg:px-8 py-12 sm:py-14 pb-14 bg-graphite-950 border-t border-white/10 text-white relative overflow-hidden">
      <div className="absolute inset-0 subpage-signal-grid opacity-20 pointer-events-none" aria-hidden="true" />
      <div className="max-w-[86rem] mx-auto relative">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-end border-b border-white/10 pb-10 sm:pb-12">
          <div>
            <a href="/" className="mb-6 inline-flex items-center gap-3" aria-label="Levente Studio főoldal"><img src="/brand-mark.svg" width="36" height="36" alt="" className="h-9 w-9 shrink-0" aria-hidden="true" /><span className="leading-none"><span className="block text-sm font-medium tracking-[0.14em]">LEVENTE</span><span className="mt-1 block text-[9px] uppercase tracking-[0.28em] text-ivory-400">weboldalak</span></span></a>
            <p className="max-w-xl text-white/70 text-sm sm:text-base font-light leading-relaxed">
              Weboldalak szolgáltató vállalkozásoknak. Tervezés, fejlesztés és gondozás, saját projektekből szerzett tapasztalattal.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 text-sm">
            <div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/50 mb-3">Navigáció</div>
              <div className="space-y-2 text-white/70">
                <a href="/megoldasok/" className="block hover:text-signal-400 transition-colors">Megoldások</a>
                <a href="/#csomagok" className="block hover:text-signal-400 transition-colors">Csomagok</a>
                <a href="/esettanulmanyok/" className="block hover:text-signal-400 transition-colors">Munkáink</a>
                <a href="/blog/" className="block hover:text-signal-400 transition-colors">Tudástár</a>
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/50 mb-3">Stúdió</div>
              <div className="space-y-2 text-white/70">
                <a href="/rolam/" className="block hover:text-signal-400 transition-colors">Rólam</a>
                <a href="/kapcsolat/" className="block hover:text-signal-400 transition-colors">Kapcsolat</a>
                <a href="/kapcsolat/#diagnosztika" className="block hover:text-signal-400 transition-colors">Ajánlatkérés</a>
              </div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/50 mb-3">Jogi</div>
              <div className="space-y-2 text-white/70">
                <a href="/adatvedelem/" className="block hover:text-signal-400 transition-colors">Adatvédelem</a>
                <a href="/suti-szabalyzat/" className="block hover:text-signal-400 transition-colors">Süti szabályzat</a>
                <button type="button" data-cookie-settings className="block hover:text-signal-400 transition-colors cursor-pointer">Süti beállítások</button>
                <a href="/jogi-informaciok/" className="block hover:text-signal-400 transition-colors">Jogi információk</a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-[10px] sm:text-xs uppercase tracking-[0.16em] text-white/50">
          <span>© {new Date().getFullYear()} Levente Studio</span>
          <span className="inline-flex items-center gap-2 text-signal-400"><span className="signal-dot" />Levente Studio</span>
        </div>
      </div>
    </footer>
  );
}
