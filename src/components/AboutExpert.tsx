import { Code2, Users, Building2, TrendingUp } from 'lucide-react';

export default function AboutExpert() {
  const credentials = [
    {
      icon: Code2,
      stat: '8+ év',
      label: 'Webes technológiákban'
    },
    {
      icon: Users,
      stat: '30+',
      label: 'Sikeres audit projekt'
    },
    {
      icon: Building2,
      stat: 'B2B és B2C',
      label: 'Mindkét modellben'
    },
    {
      icon: TrendingUp,
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

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6 text-taupe-700 font-light leading-relaxed">
            <p>
              Nem vagyok kreatív ügynökség, nem vagyok dizájn stúdió. Nem mondok olyat, hogy
              "majd kitaláljuk". Nem dolgozom találgatásból.
            </p>
            <p>
              Mérnöki háttér, adat-alapú gondolkodás. Mielőtt bármit megváltoztatnék, tudom,
              hogy miért. Mert látom az Analytics-ben, a Search Console-ban, a heatmap-en.
              Mert mérem, nem érzem.
            </p>
            <p className="font-normal text-taupe-900">
              Ha valami működik, nem nyúlok hozzá. Ha nem működik, megjavítom.
              Ha túlbonyolított, egyszerűsítem. Ha felesleges, kidobom.
            </p>
          </div>

          <div className="space-y-6 text-taupe-700 font-light leading-relaxed">
            <p>
              Dolgoztam helyi szolgáltatóknak, e-commerce oldalaknak, SaaS termékeknek.
              Kis weboldalaktól nagyobb rendszerekig. WordPress-től custom fejlesztésig.
            </p>
            <p>
              Minden projektnél ugyanaz a kérdés: működik vagy nem működik. Ha nem, miért.
              Ha lassu, miért. Ha nem konvertál, miért. Addig nem állok meg, amíg nincs válasz.
            </p>
            <p>
              Nem "segítek növekedni". Konkrétan megjavítom, ami nem működik. Ez a különbség
              egy tanácsadó és egy szakértő között.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {credentials.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="text-center">
                <Icon size={32} className="text-taupe-700 mx-auto mb-4" />
                <div className="text-3xl font-light text-taupe-900 mb-2">
                  {item.stat}
                </div>
                <div className="text-sm text-taupe-600 font-light">
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-taupe-50 p-8 md:p-10 rounded-sm border border-taupe-200">
          <p className="text-lg text-taupe-700 font-light text-center max-w-3xl mx-auto">
            Dolgoztam már: local business-eknek, e-commerce oldalaknak, SaaS startupoknak,
            szolgáltató cégeknek. Budapesten és azon túl. Zoom-on is, személyesen is.
          </p>
        </div>
      </div>
    </section>
  );
}
