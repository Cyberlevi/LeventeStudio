export default function AboutExpertDark() {
  const stats = [
    ['PROJEKTEK', '4', 'saját vagy családi projekt'],
    ['ÜGYFÉLSZERZÉS', 'Web + hirdetés', 'egy közös folyamatban'],
    ['MÉRÉS', 'SEO + mérés', 'kereséstől a megkeresésig'],
    ['MÓDSZER', 'AI-val támogatva', 'gyorsabb kivitelezés']
  ];

  return (
    <main className="bg-graphite-950 text-white">
      <section className="subpage-hero">
        <div className="subpage-signal-grid" aria-hidden="true" />
        <div className="subpage-container relative z-10 grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-end lg:gap-16">
          <div>
            <div className="signal-kicker mb-6"><span className="signal-dot" />Rólam · Levente Studio</div>
            <h1 className="subpage-title">Nem kívülről nézem a rendszereket.{' '}<span className="block text-signal-400">Benne dolgozom.</span></h1>
            <p className="subpage-lead">Saját szolgáltatói vállalkozásokon építem, mérem és finomítom ugyanazokat a webes, SEO-, Ads- és automatizálási folyamatokat, amelyeket ügyfélprojektekben is használok.</p>
          </div>
          <div
            data-portrait-signal
            className="group relative overflow-hidden border border-white/10 bg-graphite-900 p-2 shadow-[0_24px_80px_rgba(0,0,0,.22)]"
          >
            <div className="pointer-events-none absolute inset-0 z-[1] opacity-45 studio-grid-dark" aria-hidden="true" />
            <span className="pointer-events-none absolute left-3 top-3 z-10 h-3 w-3 border-l border-t border-signal-400/25" aria-hidden="true" />
            <span className="pointer-events-none absolute right-3 top-3 z-10 h-3 w-3 border-r border-t border-signal-400/25" aria-hidden="true" />
            <span className="pointer-events-none absolute bottom-3 left-3 z-10 h-3 w-3 border-b border-l border-signal-400/20" aria-hidden="true" />
            <span className="pointer-events-none absolute bottom-3 right-3 z-10 h-3 w-3 border-b border-r border-signal-400/20" aria-hidden="true" />
            <div className="relative aspect-[4/5] overflow-hidden bg-graphite-950">
              <div
                className="portrait-ambient-field pointer-events-none absolute inset-0 z-[1]"
                aria-hidden="true"
              />
              <img
                data-portrait-image
                src="/levente_studio_portrait_final.webp"
                width={800}
                height={533}
                className="relative z-0 h-full w-full object-cover grayscale transition-[filter,transform,opacity] duration-700 ease-out group-hover:scale-[1.008] group-hover:grayscale-[.9]"
                alt="Tarnóczi Levente – weboldalkészítő"
                decoding="async"
                fetchPriority="high"
              />
              <canvas
                data-portrait-canvas
                className="pointer-events-none absolute inset-0 z-[2] h-full w-full opacity-0 transition-opacity duration-500"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-px bg-gradient-to-r from-transparent via-signal-400/70 to-transparent opacity-70"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute right-3 top-3 z-20 border border-white/10 bg-graphite-950/58 px-2 py-1 text-[7px] uppercase tracking-[.16em] text-white/38 backdrop-blur-sm"
                aria-hidden="true"
              >
                LS / IDENTITY 01
              </div>
            </div>
            <div className="absolute inset-x-2 bottom-2 z-20 bg-gradient-to-t from-graphite-950 via-graphite-950/80 to-transparent p-5">
              <div className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-[.15em] text-signal-400/70"><span className="signal-dot scale-90 opacity-60" />Közvetlen kapcsolat</div>
              <div className="text-xl">Tarnóczi Levente</div><div className="text-sm text-white/60">weboldalkészítő · Levente Studio</div>
            </div>
          </div>
        </div>
      </section>

      <section className="hightech-section relative overflow-hidden bg-graphite-900">
        <div className="absolute inset-0 studio-grid-dark opacity-20" aria-hidden="true" />
        <div className="hightech-container relative">
          <div className="mb-16 grid grid-cols-2 border-y border-white/10 lg:grid-cols-4">
            {stats.map(([code, value, label], i) => <div key={code} className={`p-5 sm:p-7 ${i < 3 ? 'lg:border-r lg:border-white/10' : ''}`}><div className="text-[10px] uppercase tracking-[.18em] text-signal-400">{code}</div><div className="mt-3 font-serif text-3xl font-light tracking-editorial sm:text-4xl">{value}</div><div className="mt-1 text-sm text-white/60">{label}</div></div>)}
          </div>
          <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-16">
            <div><div className="mb-4 text-xs uppercase tracking-[.18em] text-white/55">Miért így dolgozom</div><h2 className="font-serif text-4xl font-light leading-[.94] tracking-editorial sm:text-5xl md:text-6xl">Nem még egy <span className="text-signal-400">ügynökséget</span> akartam.</h2></div>
            <div className="space-y-7 text-base font-light leading-relaxed text-white/55 sm:text-lg">
              <p>Saját szolgáltatói vállalkozásoknál kellett megoldanom ugyanazokat a problémákat: hogyan találjanak meg, hogyan legyen érthető az ajánlat, hogyan mérjem a megkeresést és hogyan legyen kevesebb kézi adminisztráció.</p>
              <p>A weboldalt, SEO-t, hirdetési mérést, analitikát és megkeresés-kezelést ezért egyetlen folyamat részeként kezelem.</p>
              <p>AI-val dolgozom, mert gyorsítja az elemzést és a kivitelezést. Nem az AI-t adom el, hanem a tisztább és mérhetőbb működést.</p>
              <p className="border-l-2 border-signal-400 py-1 pl-5 font-medium text-white">Amit ügyfélnek javaslok, azt lehetőség szerint előbb saját éles rendszerben tesztelem.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="hightech-section relative overflow-hidden bg-graphite-950">
        <div className="absolute inset-0 subpage-signal-grid opacity-25" />
        <div className="hightech-container relative grid gap-8 lg:grid-cols-[1fr_.85fr] lg:items-end lg:gap-16">
          <h2 className="font-serif text-4xl font-light leading-[.92] tracking-editorial sm:text-5xl md:text-7xl">Kevesebb technológiai zaj.{' '}<span className="block text-signal-400">Több visszacsatolás.</span></h2>
          <p className="text-lg font-light leading-relaxed text-white/55">A cél nem több rendszer. A cél az, hogy pontosabban lásd, honnan jön az üzlet, és kevesebb manuális súrlódással működjön a folyamat.</p>
        </div>
      </section>
    </main>
  );
}
