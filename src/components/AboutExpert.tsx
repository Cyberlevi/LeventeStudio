export default function AboutExpert() {
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

  return (
    <section className="px-6 py-24 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-light text-taupe-900 mb-16 text-center">
          Miért szakértő, nem ügynökség
        </h2>

        <div className="flex flex-col md:flex-row gap-12 mb-16">
          <div className="md:w-1/3 flex-shrink-0">
            <div className="relative aspect-square overflow-hidden rounded-sm">
              <img
                src="/levente_studio_avatar_1024.webp"
                srcSet="/levente_studio_avatar_1024.webp 1024w"
                sizes="(max-width: 768px) 100vw, 33vw"
                className="w-full h-full object-cover object-center"
                alt="Levente – Weboldal Audit Szakértő"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          <div className="md:w-2/3 space-y-6 text-taupe-700 font-light leading-relaxed">
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

        <div className="bg-taupe-900 text-cream-50 p-8 md:p-10 rounded-sm">
          <p className="text-2xl md:text-3xl font-light text-center max-w-3xl mx-auto leading-relaxed">
            Ha valami működik, nem nyúlok hozzá.<br />
            Ha nem működik, megjavítom.<br />
            Ha felesleges, kidobom.
          </p>
        </div>
      </div>
    </section>
  );
}
