import { ArrowLeft } from 'lucide-react';
import Logo from '../components/Logo';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-cream-50">
      <header className="sticky top-0 z-50 bg-white border-b border-taupe-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Logo variant="primary" theme="light" className="h-8" />
          <a
            href="/"
            className="flex items-center gap-2 text-taupe-700 hover:text-taupe-900 transition-colors text-sm font-light"
          >
            <ArrowLeft size={16} />
            Vissza a főoldalra
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-normal text-taupe-900 mb-8">Adatvédelmi Tájékoztató</h1>

        <div className="prose prose-taupe max-w-none space-y-8 text-taupe-800 font-light leading-relaxed">
          <section>
            <p className="text-sm text-taupe-600 mb-6">
              Utolsó frissítés: {new Date().toISOString().split('T')[0]}
            </p>
            <p>
              A Levente Stúdió elkötelezett a személyes adatok védelme iránt. Ez az Adatvédelmi Tájékoztató
              részletesen ismerteti, hogyan gyűjtjük, használjuk és védjük az Ön adatait a
              leventestudio.app weboldalon.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-normal text-taupe-900 mb-4">1. Adatkezelő</h2>
            <div className="bg-white p-6 rounded-sm border border-taupe-200">
              <p><strong>Név:</strong> Tarnóczi Levente</p>
              <p><strong>E-mail:</strong> tarnoczilevente@gmail.com</p>
              <p><strong>Weboldal:</strong> leventestudio.app</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-normal text-taupe-900 mb-4">2. Milyen adatokat gyűjtünk?</h2>

            <h3 className="text-xl font-normal text-taupe-900 mb-3 mt-6">2.1. Kapcsolatfelvételi adatok</h3>
            <p>
              Amikor Ön kapcsolatba lép velünk telefonon, e-mailben vagy WhatsApp-on keresztül,
              az alábbi adatokat kezeljük:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Telefonszám</li>
              <li>E-mail cím</li>
              <li>Név (ha megadja)</li>
              <li>Kommunikáció tartalma</li>
            </ul>
            <p className="mt-4">
              <strong>Jogalap:</strong> Hozzájárulás és jogos érdek (GDPR 6. cikk (1) bekezdés a) és f) pont)
              - a kapcsolatfelvétel megválaszolása és szolgáltatásaink nyújtása.
            </p>

            <h3 className="text-xl font-normal text-taupe-900 mb-3 mt-6">2.2. Technikai és viselkedési adatok</h3>
            <p>Weboldal használata során automatikusan gyűjtött adatok:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>IP-cím (anonim módon tároljuk)</li>
              <li>Böngésző típusa és verziója</li>
              <li>Operációs rendszer</li>
              <li>Megtekintett oldalak és látogatási időpontok</li>
              <li>Oldal görgetési mélység (scroll tracking)</li>
              <li>Oldal látogatási időtartam (time on page)</li>
              <li>Kattintási események és konverziók</li>
              <li>Hivatkozó weboldal (referrer)</li>
            </ul>
            <p className="mt-4">
              <strong>Jogalap:</strong> Hozzájárulás (GDPR 6. cikk (1) bekezdés a) pont) - süti beállításokon
              keresztül adott engedély alapján.
            </p>

            <h3 className="text-xl font-normal text-taupe-900 mb-3 mt-6">2.3. Cookie-k és helyi tárolás</h3>
            <p>
              Weboldalunk sütiket (cookie) és localStorage technológiát használ. Részletes információkat
              a <a href="/cookie-policy" className="text-taupe-900 underline hover:text-taupe-700">Süti Szabályzatban</a> talál.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-normal text-taupe-900 mb-4">3. Adatkezelés célja</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Kapcsolatfelvételi kérések kezelése és megválaszolása</li>
              <li>Szolgáltatásaink nyújtása és üzleti ajánlatok készítése</li>
              <li>Weboldal működésének biztosítása</li>
              <li>Weboldal teljesítményének és használhatóságának elemzése</li>
              <li>Felhasználói élmény javítása</li>
              <li>Marketing tevékenység hatékonyságának mérése</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-normal text-taupe-900 mb-4">4. Adattovábbítás harmadik feleknek</h2>

            <h3 className="text-xl font-normal text-taupe-900 mb-3 mt-6">4.1. Google LLC (Analytics & Tag Manager)</h3>
            <p>
              Weboldalunk Google Analytics és Google Tag Manager szolgáltatásokat használ
              látogatói statisztikák gyűjtésére.
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Adatkezelő:</strong> Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA</li>
              <li><strong>Átadott adatok:</strong> IP-cím (anonimizált), böngésző információk, látogatási adatok</li>
              <li><strong>Adatkezelési tájékoztató:</strong> <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-taupe-900 underline hover:text-taupe-700">Google Privacy Policy</a></li>
              <li><strong>Adatvédelmi garancia:</strong> Standard Contractual Clauses (SCC) és Google EU-US Data Privacy Framework tanúsítás</li>
            </ul>

            <h3 className="text-xl font-normal text-taupe-900 mb-3 mt-6">4.2. Plausible Analytics</h3>
            <p>
              Weboldalunk Plausible Analytics-et használ privacy-first webanalitika céljából.
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Adatkezelő:</strong> Plausible Insights OÜ, Vabaduse väljak 5-26, 10146 Tallinn, Észtország</li>
              <li><strong>Átadott adatok:</strong> Oldal látogatások, anonimizált technikai adatok</li>
              <li><strong>Különlegesség:</strong> Nem használ sütiket, nem gyűjt személyes adatokat</li>
              <li><strong>Adatkezelési tájékoztató:</strong> <a href="https://plausible.io/data-policy" target="_blank" rel="noopener noreferrer" className="text-taupe-900 underline hover:text-taupe-700">Plausible Data Policy</a></li>
            </ul>

            <h3 className="text-xl font-normal text-taupe-900 mb-3 mt-6">4.3. WhatsApp (Meta Platforms)</h3>
            <p>
              Ha Ön a WhatsApp kapcsolatfelvételi lehetőséget választja, adatai a Meta Platforms
              adatkezelési gyakorlatai alá kerülnek.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-normal text-taupe-900 mb-4">5. Adatmegőrzés</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Kapcsolatfelvételi adatok:</strong> Maximum 3 év vagy az Ön törlési kérelméig</li>
              <li><strong>Analitikai adatok (Google Analytics):</strong> 26 hónap (alapértelmezett beállítás)</li>
              <li><strong>Analitikai adatok (Plausible):</strong> Folyamatos, de anonimizált módon</li>
              <li><strong>Cookie hozzájárulás:</strong> 12 hónap vagy visszavonásig</li>
            </ul>
            <p className="mt-4">
              A megőrzési időszak lejártával, vagy az Ön kérésére az adatokat véglegesen töröljük.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-normal text-taupe-900 mb-4">6. Az Ön jogai (GDPR)</h2>
            <p>Ön az alábbi jogokkal rendelkezik személyes adataival kapcsolatban:</p>

            <div className="space-y-4 mt-4">
              <div className="bg-white p-4 rounded-sm border border-taupe-200">
                <h4 className="font-normal text-taupe-900 mb-2">Hozzáférés joga</h4>
                <p className="text-sm">Tájékoztatást kérhet arról, hogy kezelünk-e Önről adatokat, és másolatot kérhet róluk.</p>
              </div>

              <div className="bg-white p-4 rounded-sm border border-taupe-200">
                <h4 className="font-normal text-taupe-900 mb-2">Helyesbítés joga</h4>
                <p className="text-sm">Kérheti pontatlan vagy hiányos adatainak javítását vagy kiegészítését.</p>
              </div>

              <div className="bg-white p-4 rounded-sm border border-taupe-200">
                <h4 className="font-normal text-taupe-900 mb-2">Törléshez való jog ("elfeledtetéshez való jog")</h4>
                <p className="text-sm">Kérheti személyes adatainak törlését, ha már nincs jogalapunk a kezelésükhöz.</p>
              </div>

              <div className="bg-white p-4 rounded-sm border border-taupe-200">
                <h4 className="font-normal text-taupe-900 mb-2">Adatkezelés korlátozásának joga</h4>
                <p className="text-sm">Bizonyos esetekben kérheti adatai kezelésének korlátozását.</p>
              </div>

              <div className="bg-white p-4 rounded-sm border border-taupe-200">
                <h4 className="font-normal text-taupe-900 mb-2">Adathordozhatóság joga</h4>
                <p className="text-sm">Kérheti, hogy az Önről gyűjtött adatokat strukturált, géppel olvasható formátumban bocsássuk rendelkezésére.</p>
              </div>

              <div className="bg-white p-4 rounded-sm border border-taupe-200">
                <h4 className="font-normal text-taupe-900 mb-2">Tiltakozás joga</h4>
                <p className="text-sm">Tiltakozhat személyes adatai kezelése ellen, különösen közvetlen üzletszerzés esetén.</p>
              </div>

              <div className="bg-white p-4 rounded-sm border border-taupe-200">
                <h4 className="font-normal text-taupe-900 mb-2">Hozzájárulás visszavonásának joga</h4>
                <p className="text-sm">Bármikor visszavonhatja a hozzájárulását a süti beállításokban vagy írásban.</p>
              </div>
            </div>

            <p className="mt-6">
              <strong>Jogai gyakorlásához</strong> írjon nekünk: tarnoczilevente@gmail.com
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-normal text-taupe-900 mb-4">7. Panasztétel joga</h2>
            <p>
              Ha úgy érzi, hogy megsértettük az adatvédelmi jogszabályokat, panaszt tehet a
              Nemzeti Adatvédelmi és Információszabadság Hatóságnál (NAIH):
            </p>
            <div className="bg-white p-6 rounded-sm border border-taupe-200 mt-4">
              <p><strong>Nemzeti Adatvédelmi és Információszabadság Hatóság</strong></p>
              <p>Cím: 1055 Budapest, Falk Miksa utca 9-11.</p>
              <p>Postacím: 1363 Budapest, Pf. 9.</p>
              <p>Telefon: +36 (1) 391-1400</p>
              <p>E-mail: ugyfelszolgalat@naih.hu</p>
              <p>Weboldal: <a href="https://naih.hu" target="_blank" rel="noopener noreferrer" className="text-taupe-900 underline hover:text-taupe-700">naih.hu</a></p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-normal text-taupe-900 mb-4">8. Adatbiztonság</h2>
            <p>
              Az Ön adatainak védelme érdekében megfelelő technikai és szervezési intézkedéseket
              alkalmazunk:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>HTTPS titkosítás a teljes weboldalon</li>
              <li>Google Consent Mode v2 implementáció</li>
              <li>Rendszeres biztonsági frissítések</li>
              <li>Hozzáférés-korlátozás az adatokhoz</li>
              <li>IP anonimizálás a Google Analytics-ben</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-normal text-taupe-900 mb-4">9. Kiskorúak adatai</h2>
            <p>
              Szolgáltatásaink 18 év alatti személyek számára nem elérhetők. Tudatosan nem gyűjtünk
              16 év alatti személyektől adatokat. Ha tudomásunkra jut, hogy 16 év alatti személytől
              gyűjtöttünk adatokat, azonnal töröljük azokat.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-normal text-taupe-900 mb-4">10. Módosítások</h2>
            <p>
              Fenntartjuk a jogot, hogy ezt az Adatvédelmi Tájékoztatót bármikor módosítsuk.
              A módosítások ezen az oldalon kerülnek közzétételre. Javasoljuk, hogy rendszeresen
              ellenőrizze ezt az oldalt.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-normal text-taupe-900 mb-4">11. Kapcsolat</h2>
            <p>
              Ha kérdése van az adatkezeléssel kapcsolatban, vegye fel velünk a kapcsolatot:
            </p>
            <div className="bg-white p-6 rounded-sm border border-taupe-200 mt-4">
              <p><strong>E-mail:</strong> tarnoczilevente@gmail.com</p>
              <p><strong>Telefon:</strong> <a href="tel:+36303337272" className="text-taupe-900 underline hover:text-taupe-700">+36 30 333 7272</a></p>
            </div>
          </section>

          <section className="border-t border-taupe-200 pt-8 mt-12">
            <p className="text-sm text-taupe-600">
              Ez az Adatvédelmi Tájékoztató a GDPR (EU 2016/679 rendelet) és a magyar
              információs önrendelkezési jogról és az információszabadságról szóló 2011. évi CXII.
              törvény (Infotv.) előírásainak megfelelően készült.
            </p>
          </section>
        </div>
      </main>

      <footer className="bg-taupe-900 border-t border-taupe-800 px-6 py-8 mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-cream-200 text-sm font-light">
            © {new Date().getFullYear()} Levente Stúdió
          </p>
        </div>
      </footer>
    </div>
  );
}
