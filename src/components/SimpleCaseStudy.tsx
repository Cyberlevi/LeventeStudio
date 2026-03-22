export default function SimpleCaseStudy() {
  return (
    <section className="px-6 py-24 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-light text-taupe-900 mb-8 text-center">
          Valódi eredmények
        </h2>

        <p className="text-xl text-taupe-700 font-light text-center mb-16">
          Konkrét projekt, konkrét eredmény
        </p>

        <div className="bg-gradient-to-br from-blue-50 to-taupe-50 p-8 md:p-12 rounded-sm border border-blue-200">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-taupe-900 text-cream-50 text-sm font-light rounded-sm">
              Klímatechnika
            </span>
          </div>

          <h3 className="text-3xl font-light text-taupe-900 mb-8">
            Klima18ker – Klímaszerelés Budapest
          </h3>

          <div className="space-y-6 text-taupe-700 font-light leading-relaxed">
            <div>
              <h4 className="text-taupe-900 font-normal mb-3 text-lg">Mi volt a probléma</h4>
              <p>
                A weboldal lassú volt (6-8 másodperc mobilon). A Google több tucatnyi hibát jelzett.
                Az organikus forgalom csökkent, miközben a konkurensek forgalma nőtt.
                Senki nem találta meg őket kereséskor.
              </p>
            </div>

            <div>
              <h4 className="text-taupe-900 font-normal mb-3 text-lg">Mit csináltunk</h4>
              <ul className="space-y-2 list-disc list-inside">
                <li>Képek optimalizálása, gyorsabb betöltés</li>
                <li>Google hibák javítása (42 hiba → 0)</li>
                <li>Szerver frissítés, stabilabb működés</li>
                <li>SEO beállítások módosítása, jobb találhatóság</li>
              </ul>
            </div>

            <div>
              <h4 className="text-taupe-900 font-normal mb-3 text-lg">Mi lett az eredmény</h4>
              <p>
                A weboldal betöltése 65%-kal gyorsabb lett (1.8 mp). A Google az összes oldalt indexelte.
                Az organikus forgalom 34%-kal nőtt 8 hét alatt. Több látogató, jobb találhatóság,
                stabilabb rendszer.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-taupe-200">
            <a
              href="/esettanulmanyok/klima18ker-weboldal-audit/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-sm hover:bg-blue-700 transition-colors"
            >
              Részletes esettanulmány
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-12 bg-cream-50 p-8 rounded-sm border border-taupe-200">
          <p className="text-lg text-taupe-700 font-light text-center">
            Ha hasonló problémát látsz a saját weboldaladon, beszéljük meg.
          </p>
        </div>
      </div>
    </section>
  );
}
