export default function About() {
  const credentials = [
    {
      stat: '8+ év',
      label: 'Webes technológiákban'
    },
    {
      stat: '30+',
      label: 'Sikeres audit projekt'
    },
    {
      stat: 'B2B és B2C',
      label: 'Mindkét modellben'
    },
    {
      stat: '100%',
      label: 'Adat-alapú megközelítés'
    }
  ];

  const tools = [
    'Google Analytics & GA4',
    'Google Search Console',
    'Google Tag Manager',
    'Hotjar & Microsoft Clarity',
    'Lighthouse & PageSpeed Insights',
    'Screaming Frog',
    'Ahrefs & SEMrush',
    'Chrome DevTools'
  ];

  const experience = [
    {
      title: 'Helyi szolgáltatások',
      description: 'Éttermek, szépségszalonok, fodrászatok, kozmetikák – helyi SEO, Google My Business optimalizálás, helyi organikus forgalom növelés.'
    },
    {
      title: 'E-commerce',
      description: 'Webshopok technikai SEO-ja, termékoldal optimalizálás, checkout folyamat javítás, kosárelhagyási arány csökkentés.'
    },
    {
      title: 'SaaS és B2B',
      description: 'Landing page optimalizálás, trial regisztrációs arány növelés, customer journey javítás, funnel analízis.'
    },
    {
      title: 'Tartalom oldalak',
      description: 'Blogok, médiaoldalak, tartalomközpontú weboldalak – organikus forgalom növelés, technical SEO, oldalsebességoptimalizálás.'
    }
  ];

  return (
    <>

        <section className="px-6 pt-32 pb-24 bg-white">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-light text-taupe-900 mb-8 text-center">
              Nem vagyok ügynökség.<br />Egy szakértő vagyok.
            </h1>

            <p className="text-xl md:text-2xl text-taupe-700 font-light text-center mb-16 max-w-3xl mx-auto leading-relaxed">
              Mérnöki háttér, adat-alapú gondolkodás. Nem találgatásból dolgozom.
            </p>

            <div className="flex flex-col md:flex-row gap-12 mb-16">
              <div className="md:w-1/3 flex-shrink-0">
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                  <img
                    src="/levente_studio_portrait_final.webp"
                    srcSet="/levente_studio_portrait_final.webp 1024w"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="w-full h-full object-cover object-center"
                    alt="Levente – Weboldal Audit Szakértő"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              </div>

              <div className="md:w-2/3 space-y-6 text-taupe-700 font-light leading-relaxed text-lg">
                <p>
                  Nem vagyok kreatív ügynökség, nem vagyok dizájn stúdió. Nem dolgozom találgatásból.
                  Mérnöki háttér, adat-alapú gondolkodás.
                </p>
                <p>
                  Mielőtt bármit megváltoztatnék, tudom, hogy miért. Mert látom az Analytics-ben,
                  a Search Console-ban, a heatmap-en. Mert mérem, nem érzem.
                </p>
                <p>
                  Dolgoztam helyi szolgáltatóknak, e-commerce oldalaknak, SaaS termékeknek.
                  Kis weboldalaktól nagyobb rendszerekig. WordPress-től custom fejlesztésig.
                </p>
                <p className="font-normal text-taupe-900">
                  Nem "segítek növekedni". Konkrétan megjavítom, ami nem működik.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              {credentials.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-normal text-taupe-900 mb-2">
                    {item.stat}
                  </div>
                  <div className="text-sm text-taupe-600 font-light">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-taupe-900 text-cream-50 p-8 md:p-10 rounded-sm mb-16">
              <p className="text-2xl md:text-3xl font-light text-center max-w-3xl mx-auto leading-relaxed">
                Ha valami működik, nem nyúlok hozzá.<br />
                Ha nem működik, megjavítom.<br />
                Ha felesleges, kidobom.
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 py-24 bg-taupe-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-taupe-900 mb-12 text-center">
              Milyen területeken dolgoztam
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {experience.map((item, index) => (
                <div key={index} className="bg-white p-8 rounded-sm border border-taupe-200">
                  <h3 className="text-2xl font-light text-taupe-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-taupe-700 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-24 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-taupe-900 mb-12 text-center">
              Milyen eszközöket használok
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {tools.map((tool, index) => (
                <div key={index} className="bg-taupe-50 p-6 rounded-sm border border-taupe-200 text-center">
                  <span className="text-taupe-900 font-light text-lg">{tool}</span>
                </div>
              ))}
            </div>

            <p className="text-center text-taupe-700 font-light text-lg max-w-3xl mx-auto">
              Ezek nem csak eszközök. Ezek mutatják, hogy mi nem működik, hol van a probléma, mit kell megjavítani.
            </p>
          </div>
        </section>

        <section className="px-6 py-24 bg-taupe-900 text-cream-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light mb-8">
              Hogyan dolgozom
            </h2>

            <div className="space-y-8 text-left max-w-3xl mx-auto">
              <div className="bg-taupe-800 p-8 rounded-sm">
                <h3 className="text-xl font-normal text-cream-50 mb-3">1. Diagnózis</h3>
                <p className="text-cream-100 font-light leading-relaxed">
                  Megnézem a teljes weboldalt: technikai SEO, teljesítmény, Analytics setup, user experience. Nem feltételezek, hanem mérek. Heatmap, session recording, Analytics adatok.
                </p>
              </div>

              <div className="bg-taupe-800 p-8 rounded-sm">
                <h3 className="text-xl font-normal text-cream-50 mb-3">2. Priorizálás</h3>
                <p className="text-cream-100 font-light leading-relaxed">
                  Nem mindent kell megjavítani egyszerre. Megmondom, mi a legfontosabb, mi hozza a legnagyobb eredményt. Impact vs. effort. Első a gyors win, aztán a nagyobb projekt.
                </p>
              </div>

              <div className="bg-taupe-800 p-8 rounded-sm">
                <h3 className="text-xl font-normal text-cream-50 mb-3">3. Végrehajtás</h3>
                <p className="text-cream-100 font-light leading-relaxed">
                  Konkrétan megjavítom, amit kell. Nem csak ajánlást adok, hanem ha kell, megcsinálom. Technikai SEO setup, Analytics konfiguráció, sebesség optimalizálás – amit szükséges.
                </p>
              </div>

              <div className="bg-taupe-800 p-8 rounded-sm">
                <h3 className="text-xl font-normal text-cream-50 mb-3">4. Mérés</h3>
                <p className="text-cream-100 font-light leading-relaxed">
                  Nem hagyom ott azzal, hogy "majd működni fog". Követem az adatokat, megnézem, hogy tényleg javul-e a konverzió, a forgalom, az eredmény. Ha nem, korrigálunk.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-24 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light text-taupe-900 mb-8">
              Kinek nem dolgozom
            </h2>

            <div className="space-y-4 text-taupe-700 font-light text-lg max-w-3xl mx-auto text-left">
              <p>
                ❌ Nem dolgozom azzal, aki "csak valami szépet" akar, de nem érdekli az eredmény.
              </p>
              <p>
                ❌ Nem dolgozom azzal, aki nem akar adatokat nézni, csak érzésből dönt.
              </p>
              <p>
                ❌ Nem dolgozom azzal, aki azonnal nagy eredményt vár, holnaptól.
              </p>
              <p>
                ❌ Nem dolgozom azzal, aki folyamatosan változtat mindent, mielőtt mérhető lenne az eredmény.
              </p>
            </div>

            <div className="mt-12">
              <div className="bg-taupe-50 p-8 rounded-sm border border-taupe-200 max-w-3xl mx-auto">
                <p className="text-taupe-900 font-normal text-xl mb-4">
                  Kivel dolgozom szívesen?
                </p>
                <p className="text-taupe-700 font-light text-lg">
                  Azzal, aki látja, hogy valami nem működik. Aki szeretné tudni, hogy miért. Aki kész rá, hogy adatok alapján döntsünk. Aki nem csak "valami szép oldalt" akar, hanem egy működő rendszert, ami hoz ügyfelet.
                </p>
              </div>
            </div>
          </div>
        </section>

    </>
  );
}
