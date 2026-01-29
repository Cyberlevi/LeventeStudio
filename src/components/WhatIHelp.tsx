export default function WhatIHelp() {
  const services = [
    {
      title: 'Weboldalak technikai és UX auditja',
      problem: 'A weboldal lassú, nehezen használható, nem konvertál. A látogatók 3 másodperc után elmennek, mert nem találják meg, amit keresnek, vagy túl bonyolult a folyamat.',
      consequence: 'A hirdetési költés kidobott pénz. Az organikus forgalom értéktelen, mert senki sem marad. Minden kattintás pénzbe kerül, de eredmény nincs.',
      solution: 'Végigmegyek a teljes felhasználói úton mobilon és desktopon. Megnézem a teljesítményt, elemzem a viselkedési adatokat, tesztelem a kritikus pontokat. Megmutatom, hol vész el a látogató – és mit kell javítani, hogy maradjon.'
    },
    {
      title: 'SEO és AI-olvashatóság rendbetétele',
      problem: 'Nem találnak meg Google-ben, vagy rossz keresésekre bukkan fel az oldal. A tartalom nem strukturált, az AI rendszerek (ChatGPT, Google SGE) nem értik, mit csinálsz.',
      consequence: 'Organikus forgalom nulla. Csak fizetett hirdetés működik, de azt is versenytársak nyomják túl. Az AI keresések megkerülik az oldaladat.',
      solution: 'Megnézem, hogyan látja az oldaladat a Google és az AI rendszerek. Strukturált adatok, meta információk, tartalom hierarchia – technikai SEO, ami tényleg számít. Nem kulcsszóhalmozás, hanem érthető, rangsorolható struktúra.'
    },
    {
      title: 'Konverziós tölcsérek javítása',
      problem: 'Sok látogató van, de senki sem vesz, nem ír, nem hív. A landing page szép, de nem történik semmi. A kosár megtelt, de a checkout elhagyott.',
      consequence: 'A forgalom ott van, de nem termel pénzt. Hetente százak nézik meg az oldalt, de senki sem lép. Üres inbox, csendes telefon.',
      solution: 'Végigkövetem az útvonalat a landing page-től a checkout-ig, az űrlaptól a sikeres küldésig. Ahol elvész az ember, ott javítom: CTA, szöveg, folyamat, bizalom. Minden lépés számít.'
    },
    {
      title: 'Teljesítmény és mobil optimalizálás',
      problem: 'Az oldal mobilon lassú, desktopon is töltöget. A Google PageSpeed piros, a Core Web Vitals rossz. A felhasználó nem vár 5 másodpercet.',
      consequence: 'Rosszabb rangsorolás a Google-ben. Magasabb visszapattanási arány. A mobil forgalom elveszik, pedig ma már 70% onnan jön.',
      solution: 'Optimalizálom a kódot, tömörítem a képeket, rendbe teszem a betöltési sorrendet. Critical CSS, lazy loading, CDN – amit a Google mér, azt rendbe teszem. Az oldal gyors lesz, mobilon is.'
    },
    {
      title: 'Digitális rendszerek egyszerűsítése',
      problem: 'Túlbonyolított stack: 10 különböző eszköz, 5 plugin, 3 integráció. Senki nem érti, hogy mi miért van. Ha valami elromlik, senki nem tudja megjavítani.',
      consequence: 'Drága fenntartás, lassú fejlesztés, állandó függőség külső segítségtől. Bármi változtatás hetekig tart, mert senki nem mer hozzányúlni.',
      solution: 'Leegyszerűsítem a rendszert. Kiveszem, ami felesleges. Amit marad, azt dokumentálom, hogy érthető és karbantartható legyen. A cél: kevesebb eszköz, tisztább logika, gyorsabb munka.'
    },
    {
      title: 'Kiberbiztonsági audit',
      problem: 'A weboldal vagy rendszer biztonsági résekkel tele. Elavult szoftverek, gyenge jelszavak, nem védett adminfelület. SQL injection, XSS, CSRF – kifejezések, amiket nem értesz, de a hackerek igen.',
      consequence: 'Adatszivárgás, feltört admin, ügyfél adatok az interneten. GDPR bírság milliós tételben. Bizalomvesztés, hírhedelem, üzleti kár. Egy sikeres támadás és vége.',
      solution: 'Átfogó biztonsági audit: sebezhetőség-elemzés, penetrációs teszt, konfiguráció ellenőrzés. SSL, HTTPS, szerverbeállítások, kód-szintű vizsgálat. Megmutatom, hol törhet be valaki – és mit kell megerősíteni, hogy ne tudjon.'
    }
  ];

  return (
    <section className="px-6 py-24 bg-cream-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-light text-taupe-900 mb-16 text-center">
          Weboldal audit és SEO szolgáltatások
        </h2>

        <div className="space-y-12">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-8 md:p-10 rounded-sm border border-taupe-100">
              <h3 className="text-2xl font-normal text-taupe-900 mb-6">
                {service.title}
              </h3>

              <div className="space-y-4 text-taupe-700 font-light leading-relaxed">
                <div>
                  <span className="text-taupe-500 text-sm uppercase tracking-wide">Mi a probléma</span>
                  <p className="mt-1">{service.problem}</p>
                </div>

                <div>
                  <span className="text-taupe-500 text-sm uppercase tracking-wide">Mi a következmény</span>
                  <p className="mt-1">{service.consequence}</p>
                </div>

                <div>
                  <span className="text-taupe-900 text-sm uppercase tracking-wide font-normal">Mit csinálok másképp</span>
                  <p className="mt-1 text-taupe-900">{service.solution}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
