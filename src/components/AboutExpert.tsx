export default function AboutExpert() {
  const credentials = [
    {
      stat: '3+',
      label: 'Saját éles szolgáltatói rendszer'
    },
    {
      stat: 'Web + Ads',
      label: 'Nem külön szigetekben gondolkodom'
    },
    {
      stat: 'SEO + mérés',
      label: 'Kereséstől a leadig'
    },
    {
      stat: 'AI-native',
      label: 'Gyorsabb elemzés és kivitelezés'
    }
  ];

  return (
    <section className="px-6 py-24 bg-white">
      <div className="max-w-5xl mx-auto">
        <p className="text-sm uppercase tracking-[0.18em] text-taupe-500 mb-4 text-center">A Levente Studio mögött</p>
        <h1 className="text-4xl md:text-5xl font-light text-taupe-900 mb-16 text-center">
          Rendszereket építek úgy, hogy közben én is használom őket.
        </h1>

        <div className="flex flex-col md:flex-row gap-12 mb-16">
          <div className="md:w-1/3 flex-shrink-0">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
              <img
                src="/levente_studio_portrait_final.webp"
                srcSet="/levente_studio_portrait_final.webp 1024w"
                sizes="(max-width: 768px) 100vw, 33vw"
                className="w-full h-full object-cover object-center"
                alt="Tarnóczi Levente – digitális rendszerépítő"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          <div className="md:w-2/3 space-y-6 text-taupe-700 font-light leading-relaxed text-lg">
            <p>
              A Levente Studio nem abból indult, hogy még egy webes ügynökséget akartam építeni. Saját szolgáltatói vállalkozásoknál kellett megoldanom ugyanazokat a problémákat, amelyekkel sok kisvállalkozás küzd: hogyan találjanak meg, hogyan legyen érthető az ajánlat, hogyan mérjem a leadet és hogyan legyen kevesebb kézi adminisztráció.
            </p>
            <p>
              Ezért a weboldalt, a SEO-t, a Google Ads mérését, az analitikát és a leadkezelést nem külön szolgáltatásokként nézem. Egyetlen folyamat részei. Ha valamelyik pont nincs összekötve a többivel, az egész rendszerből hiányzik az üzleti visszacsatolás.
            </p>
            <p>
              AI-val dolgozom, mert gyorsabbá teszi az elemzést, a fejlesztést és a napi működés egy részét. De nem az AI-t adom el. A cél az, hogy a technológia láthatatlanul tegye egyszerűbbé és mérhetőbbé a vállalkozást.
            </p>
            <p className="font-normal text-taupe-900">
              Amit ügyfélnek javaslok, azt lehetőség szerint előbb saját éles rendszerben tesztelem.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {credentials.map((item) => (
            <div key={item.stat} className="text-center">
              <div className="text-3xl font-normal text-taupe-900 mb-2">{item.stat}</div>
              <div className="text-sm text-taupe-600 font-light">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-taupe-900 text-cream-50 p-8 md:p-10 rounded-sm">
          <p className="text-2xl md:text-3xl font-light text-center max-w-3xl mx-auto leading-relaxed">
            Nem az a cél, hogy több technológiád legyen.<br />
            Az a cél, hogy a rendszered kevesebb kézi munkával<br />
            több értelmezhető adatot és jobb ügyfélutat adjon.
          </p>
        </div>
      </div>
    </section>
  );
}
