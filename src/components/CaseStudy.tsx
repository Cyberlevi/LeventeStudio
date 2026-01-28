import { useEffect, useRef } from 'react';
import { trackInteraction } from '../utils/gtm';

export default function CaseStudy() {
  const sectionRef = useRef<HTMLElement>(null);
  const tracked = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !tracked.current) {
          tracked.current = true;
          trackInteraction('case_study_view', 'bundavarazs', 'viewed');
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="px-6 py-24 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-light text-taupe-900 mb-16 text-center">
          Esettanulmány – Bundavarázs Kutyakozmetika
        </h2>

        <div className="bg-taupe-50 p-8 md:p-12 rounded-sm">
          <div className="space-y-8 text-taupe-700 font-light leading-relaxed">
            <div>
              <h3 className="text-taupe-900 font-normal mb-4 text-xl">Mi volt a probléma</h3>
              <p>
                A weboldal nem hozott foglalásokat. Lassan töltött be, a Google Analytics nem működött rendesen, a mobil nézet olvashatatlan volt. Az online jelenlétet kézben tartották, de eredmény nem volt. Fizetett hirdetések futottak, de a konverzió nulla. Senki nem hívott, senki nem foglalt időpontot.
              </p>
            </div>

            <div>
              <h3 className="text-taupe-900 font-normal mb-4 text-xl">Mit néztem meg</h3>
              <p>
                Végigmentem a teljes felhasználói úton mobilon és asztali gépen. Megnéztem a teljesítményadatokat: betöltési idő, Core Web Vitals, szerver válaszidő. Ellenőriztem a Google Search Console hibajelzéseket, az Analytics beállításokat. Strukturált adatok, meta tagek, sitemap, robots.txt – minden technikai SEO alapot átnéztem. Teszteltem a CTA gombokat, az űrlapot, a mobilnézetet.
              </p>
            </div>

            <div>
              <h3 className="text-taupe-900 font-normal mb-4 text-xl">Mit javítottam</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>Mobil layout teljes újratervezése: tisztább hierarchia, nagyobb gombok, olvasható szöveg</li>
                <li>Betöltési idő optimalizálás: képek tömörítése, fölösleges scriptek eltávolítása, lazy loading</li>
                <li>Google Analytics helyes telepítése és konfigurálása: konverziós célok, eseménykövetés</li>
                <li>Local SEO setup: strukturált adatok (LocalBusiness), Google Business profil integráció</li>
                <li>CTA gombok átgondolása: telefonszám és foglalás egyértelmű fókuszban</li>
              </ul>
            </div>

            <div>
              <h3 className="text-taupe-900 font-normal mb-4 text-xl">Mi lett az eredmény</h3>
              <p>
                A betöltési idő 7 másodpercről 1.8 másodpercre csökkent. A helyi kereséseknél (kutyakozmetika + városnév) az első 3 találat közé került. A telefonos megkeresések száma 3 hónap alatt megduplázódott. Most már látszik, hogy honnan jönnek az ügyfelek, melyik hirdetés működik, és melyik kulcsszó hoz foglalást. Az Analytics tiszta, a konverziók mérhetők.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-taupe-700 font-light text-lg">
              Ha Budapesten vagy környékén keresel megbízható weboldal audit szakértőt hasonló problémákra, hívj fel bizalommal.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
