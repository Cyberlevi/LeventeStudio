export default function AboutExpert() {
  const credentials = [
    { stat: '3+', label: 'saját éles rendszer', code: 'LAB' },
    { stat: 'Web + Ads', label: 'egy közös funnelben', code: 'GROWTH' },
    { stat: 'SEO + mérés', label: 'kereséstől a leadig', code: 'SIGNAL' },
    { stat: 'AI-native', label: 'gyorsabb iteráció', code: 'OPS' }
  ];

  return (
    <main className="bg-cream-50">
      <section className="subpage-hero">
        <div className="subpage-signal-grid" aria-hidden="true" />
        <div className="subpage-glow" aria-hidden="true" />

        <div className="subpage-container relative z-10">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-16 items-end">
            <div>
              <div className="signal-kicker mb-6"><span className="signal-dot" />Operator profile · Levente Studio</div>
              <h1 className="subpage-title">
                Nem kívülről nézem a rendszereket.
                <span className="block text-signal-400">Benne dolgozom.</span>
              </h1>
              <p className="subpage-lead">
                Saját szolgáltatói vállalkozásokon építem, mérem és finomítom ugyanazokat a webes, SEO-, Ads- és automatizálási folyamatokat, amelyeket ügyfélprojektekben is használok.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 border border-white/10" aria-hidden="true" />
              <div className="relative aspect-[4/5] overflow-hidden border border-white/10 bg-graphite-900">
                <img
                  src="/levente_studio_portrait_final.webp"
                  className="w-full h-full object-cover object-center grayscale contrast-[1.04]"
                  alt="Tarnóczi Levente – digitális rendszerépítő"
                  loading="eager"
                  decoding="async"
                />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 bg-gradient-to-t from-graphite-950 via-graphite-950/70 to-transparent">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-signal-400 mb-2"><span className="signal-dot" />Active operator</div>
                  <div className="text-white text-xl">Tarnóczi Levente</div>
                  <div className="text-white/50 text-sm">digitális rendszerépítő</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="hightech-section bg-cream-50">
        <div className="hightech-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 border-y border-graphite-950/10 mb-14 sm:mb-20">
            {credentials.map((item, index) => (
              <div key={item.code} className={`py-6 sm:py-8 px-3 sm:px-5 ${index % 2 === 0 ? 'border-r border-graphite-950/10' : ''} lg:border-r lg:last:border-r-0`}>
                <div className="text-[10px] uppercase tracking-[0.18em] text-graphite-400 mb-3">{item.code}</div>
                <div className="font-serif text-3xl sm:text-4xl font-light tracking-editorial text-graphite-950 mb-1">{item.stat}</div>
                <div className="text-xs sm:text-sm text-graphite-600 font-light">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-10 lg:gap-16 items-start">
            <div className="lg:sticky lg:top-28">
              <div className="text-xs uppercase tracking-[0.18em] text-graphite-400 mb-4">Why this exists</div>
              <h2 className="editorial-heading">Nem még egy ügynökséget akartam.</h2>
            </div>

            <div className="space-y-7 text-base sm:text-lg text-graphite-700 font-light leading-relaxed max-w-3xl">
              <p>
                Saját szolgáltatói vállalkozásoknál kellett megoldanom ugyanazokat a problémákat, amelyekkel sok kisvállalkozás küzd: hogyan találjanak meg, hogyan legyen érthető az ajánlat, hogyan mérjem a leadet és hogyan legyen kevesebb kézi adminisztráció.
              </p>
              <p>
                Ezért a weboldalt, a SEO-t, a Google Ads mérését, az analitikát és a leadkezelést nem külön szolgáltatásokként nézem. Egyetlen folyamat részei. Ha valamelyik pont nincs összekötve a többivel, az egész rendszerből hiányzik az üzleti visszacsatolás.
              </p>
              <p>
                AI-val dolgozom, mert gyorsabbá teszi az elemzést, a fejlesztést és a napi működés egy részét. De nem az AI-t adom el. A technológia akkor jó, ha szinte láthatatlanul teszi egyszerűbbé és mérhetőbbé a vállalkozást.
              </p>
              <p className="text-graphite-950 font-medium border-l-2 border-signal-400 pl-5 py-1">
                Amit ügyfélnek javaslok, azt lehetőség szerint előbb saját éles rendszerben tesztelem.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="hightech-section bg-graphite-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 subpage-signal-grid opacity-30 pointer-events-none" />
        <div className="hightech-container relative grid lg:grid-cols-[1fr_0.85fr] gap-10 lg:gap-16 items-end">
          <div>
            <div className="signal-kicker mb-5"><span className="signal-dot" />Operating principle</div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-7xl font-light tracking-editorial leading-[0.92] text-balance">
              Kevesebb technológiai zaj.
              <span className="block text-signal-400">Több visszacsatolás.</span>
            </h2>
          </div>
          <p className="text-lg text-white/60 font-light leading-relaxed">
            A cél nem az, hogy több rendszered legyen. Az a cél, hogy pontosabban lásd, honnan jön az üzlet, és kevesebb manuális súrlódással működjön a teljes folyamat.
          </p>
        </div>
      </section>
    </main>
  );
}
