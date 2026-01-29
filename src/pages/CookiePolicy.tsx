import { ArrowLeft, Cookie } from 'lucide-react';
import Logo from '../components/Logo';

export default function CookiePolicy() {
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
        <div className="flex items-center gap-4 mb-8">
          <Cookie className="text-taupe-700" size={32} />
          <h1 className="text-4xl font-normal text-taupe-900">Süti Szabályzat</h1>
        </div>

        <div className="prose prose-taupe max-w-none space-y-8 text-taupe-800 font-light leading-relaxed">
          <section>
            <p className="text-sm text-taupe-600 mb-6">
              Utolsó frissítés: {new Date().toISOString().split('T')[0]}
            </p>
            <p>
              Ez a Süti Szabályzat részletesen ismerteti, hogy a leventestudio.app weboldal milyen
              sütiket használ, milyen célból, és hogyan kezelheti azokat.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-normal text-taupe-900 mb-4">1. Mi az a süti (cookie)?</h2>
            <p>
              A sütik (cookie-k) olyan kis szöveges fájlok, amelyeket a weboldalak a látogató
              eszközén (számítógép, telefon, tablet) tárolnak. A sütik lehetővé teszik a weboldal
              számára, hogy felismerje az Ön eszközét, és információkat tároljon a látogatásáról.
            </p>
            <p className="mt-4">
              A sütik többféle típusúak lehetnek attól függően, hogy:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Ki helyezi el őket:</strong> első féltől származó (first-party) vagy harmadik féltől származó (third-party)</li>
              <li><strong>Meddig tárolódnak:</strong> munkamenet (session) vagy állandó (persistent) sütik</li>
              <li><strong>Mi a céljuk:</strong> szükséges, funkcionális, analitikai vagy marketing sütik</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-normal text-taupe-900 mb-4">2. Miért használunk sütiket?</h2>
            <p>Weboldalunkon az alábbi okokból használunk sütiket:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>A weboldal megfelelő működésének biztosítása</li>
              <li>A süti beállításokkal kapcsolatos választások megjegyzése</li>
              <li>A weboldal használatának elemzése és javítása</li>
              <li>Marketing tevékenységek hatékonyságának mérése</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-normal text-taupe-900 mb-4">3. Milyen sütiket használunk?</h2>

            <div className="space-y-6 mt-6">
              <div className="bg-white p-6 rounded-sm border-2 border-taupe-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <h3 className="text-xl font-normal text-taupe-900">3.1. Szükséges sütik</h3>
                </div>
                <p className="mb-4">
                  Ezek a sütik elengedhetetlenek a weboldal megfelelő működéséhez. Nélkülük
                  bizonyos funkciók nem lennének elérhetők. <strong>Ezek nem kapcsolhatók ki.</strong>
                </p>

                <div className="bg-taupe-50 p-4 rounded-sm mt-4">
                  <h4 className="font-normal text-taupe-900 mb-3">LocalStorage: cookie_consent</h4>
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b border-taupe-200">
                        <td className="py-2 font-normal">Szolgáltató:</td>
                        <td className="py-2">leventestudio.app</td>
                      </tr>
                      <tr className="border-b border-taupe-200">
                        <td className="py-2 font-normal">Cél:</td>
                        <td className="py-2">Az Ön süti beállításainak tárolása</td>
                      </tr>
                      <tr className="border-b border-taupe-200">
                        <td className="py-2 font-normal">Típus:</td>
                        <td className="py-2">LocalStorage (nem süti, de hasonló funkció)</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-normal">Lejárat:</td>
                        <td className="py-2">12 hónap vagy manuális törlésig</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white p-6 rounded-sm border-2 border-blue-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <h3 className="text-xl font-normal text-taupe-900">3.2. Analitikai sütik (Opcionális)</h3>
                </div>
                <p className="mb-4">
                  Ezek a sütik segítenek megérteni, hogy a látogatók hogyan használják a weboldalt.
                  Az információkat összesített, anonim formában gyűjtjük.
                </p>

                <div className="bg-taupe-50 p-4 rounded-sm mt-4 space-y-4">
                  <div>
                    <h4 className="font-normal text-taupe-900 mb-3">Google Analytics sütik</h4>
                    <table className="w-full text-sm">
                      <tbody>
                        <tr className="border-b border-taupe-200">
                          <td className="py-2 font-normal">Szolgáltató:</td>
                          <td className="py-2">Google LLC</td>
                        </tr>
                        <tr className="border-b border-taupe-200">
                          <td className="py-2 font-normal">Sütik:</td>
                          <td className="py-2">_ga, _ga_*, _gid, _gat</td>
                        </tr>
                        <tr className="border-b border-taupe-200">
                          <td className="py-2 font-normal">Cél:</td>
                          <td className="py-2">Látogatók megkülönböztetése, munkamenetek követése, kérések limitálása</td>
                        </tr>
                        <tr className="border-b border-taupe-200">
                          <td className="py-2 font-normal">Típus:</td>
                          <td className="py-2">Harmadik féltől származó, állandó</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-normal">Lejárat:</td>
                          <td className="py-2">_ga: 2 év, _gid: 24 óra, _gat: 1 perc</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="pt-4 border-t border-taupe-200">
                    <h4 className="font-normal text-taupe-900 mb-3">Google Tag Manager</h4>
                    <table className="w-full text-sm">
                      <tbody>
                        <tr className="border-b border-taupe-200">
                          <td className="py-2 font-normal">Szolgáltató:</td>
                          <td className="py-2">Google LLC</td>
                        </tr>
                        <tr className="border-b border-taupe-200">
                          <td className="py-2 font-normal">Süti:</td>
                          <td className="py-2">_dc_gtm_UA-*</td>
                        </tr>
                        <tr className="border-b border-taupe-200">
                          <td className="py-2 font-normal">Cél:</td>
                          <td className="py-2">Tag menedzsment és követés koordinálása</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-normal">Lejárat:</td>
                          <td className="py-2">1 perc (munkamenet)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="pt-4 border-t border-taupe-200">
                    <h4 className="font-normal text-taupe-900 mb-3">Plausible Analytics</h4>
                    <p className="text-sm mb-3">
                      <strong>Megjegyzés:</strong> A Plausible Analytics <strong>nem használ sütiket</strong>,
                      teljesen privacy-first módon működik.
                    </p>
                    <table className="w-full text-sm">
                      <tbody>
                        <tr className="border-b border-taupe-200">
                          <td className="py-2 font-normal">Szolgáltató:</td>
                          <td className="py-2">Plausible Insights OÜ</td>
                        </tr>
                        <tr className="border-b border-taupe-200">
                          <td className="py-2 font-normal">Sütik:</td>
                          <td className="py-2">Nincs (cookie-mentes)</td>
                        </tr>
                        <tr className="border-b border-taupe-200">
                          <td className="py-2 font-normal">Cél:</td>
                          <td className="py-2">Anonimizált webanalitika</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-normal">GDPR megfelelés:</td>
                          <td className="py-2">Teljes mértékben GDPR compliant, személyes adatok nélkül</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-blue-50 rounded-sm border border-blue-200">
                  <p className="text-sm">
                    <strong>Google Consent Mode v2:</strong> Weboldalunk Google Consent Mode v2-t használ,
                    ami biztosítja, hogy a Google Analytics csak akkor gyűjtsön adatokat, ha Ön ehhez
                    hozzájárult.
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-sm border-2 border-purple-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <h3 className="text-xl font-normal text-taupe-900">3.3. Marketing sütik (Opcionális)</h3>
                </div>
                <p className="mb-4">
                  Ezek a sütik marketing tevékenységek mérésére és remarketing kampányok
                  támogatására szolgálnak.
                </p>

                <div className="bg-taupe-50 p-4 rounded-sm mt-4">
                  <h4 className="font-normal text-taupe-900 mb-3">Google Ads sütik</h4>
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b border-taupe-200">
                        <td className="py-2 font-normal">Szolgáltató:</td>
                        <td className="py-2">Google LLC</td>
                      </tr>
                      <tr className="border-b border-taupe-200">
                        <td className="py-2 font-normal">Sütik:</td>
                        <td className="py-2">_gcl_*, IDE, test_cookie</td>
                      </tr>
                      <tr className="border-b border-taupe-200">
                        <td className="py-2 font-normal">Cél:</td>
                        <td className="py-2">Konverziók követése, remarketing, hirdetések optimalizálása</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-normal">Lejárat:</td>
                        <td className="py-2">_gcl_*: 90 nap, IDE: 13 hónap</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-normal text-taupe-900 mb-4">4. Hogyan kezelhetem a sütiket?</h2>

            <h3 className="text-xl font-normal text-taupe-900 mb-3 mt-6">4.1. Süti Banner</h3>
            <p>
              Első látogatáskor egy süti banner jelenik meg, ahol kiválaszthatja, mely sütiket
              fogadja el:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Összes elfogadása:</strong> Minden süti típus engedélyezése</li>
              <li><strong>Csak szükségesek:</strong> Csak az elengedhetetlen sütik engedélyezése</li>
              <li><strong>Testreszabás:</strong> Egyedi beállítások kategóriánként</li>
            </ul>

            <h3 className="text-xl font-normal text-taupe-900 mb-3 mt-6">4.2. Beállítások módosítása</h3>
            <p>
              Bármikor módosíthatja süti beállításait:
            </p>
            <ol className="list-decimal pl-6 space-y-2 mt-4">
              <li>Törölje a böngészőjében a cookie-kat és localStorage-t a leventestudio.app oldalról</li>
              <li>Töltse újra az oldalt</li>
              <li>A süti banner újra megjelenik</li>
            </ol>

            <h3 className="text-xl font-normal text-taupe-900 mb-3 mt-6">4.3. Böngésző beállítások</h3>
            <p>
              Böngészőjében is korlátozhatja vagy blokkolhatja a sütiket. Az alábbi linkeken
              található útmutatás a legnépszerűbb böngészőkhöz:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-taupe-900 underline hover:text-taupe-700">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/hu/kb/sutik-engedelyezese-es-tiltasa-amit-weboldak-haszn" target="_blank" rel="noopener noreferrer" className="text-taupe-900 underline hover:text-taupe-700">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/hu-hu/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-taupe-900 underline hover:text-taupe-700">Safari</a></li>
              <li><a href="https://support.microsoft.com/hu-hu/microsoft-edge/cookie-k-t%C3%B6rl%C3%A9se-a-microsoft-edge-ben-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-taupe-900 underline hover:text-taupe-700">Microsoft Edge</a></li>
            </ul>

            <div className="bg-amber-50 border border-amber-200 p-4 rounded-sm mt-6">
              <p className="text-sm text-amber-900">
                <strong>Figyelem:</strong> A sütik blokkolása vagy törlése korlátozhatja a
                weboldal egyes funkcióinak használatát.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-normal text-taupe-900 mb-4">5. Google Analytics leiratkozás</h2>
            <p>
              Ha szeretné letiltani a Google Analytics követést minden weboldalon, telepítheti
              a Google által biztosított böngésző kiegészítőt:
            </p>
            <p className="mt-4">
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-taupe-900 text-cream-50 rounded-sm hover:bg-taupe-800 transition-colors text-sm font-light"
              >
                Google Analytics Opt-out Bővítmény
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-normal text-taupe-900 mb-4">6. További információk</h2>
            <p>
              A sütikezeléssel kapcsolatos további információkért olvassa el az{' '}
              <a href="/privacy-policy" className="text-taupe-900 underline hover:text-taupe-700">
                Adatvédelmi Tájékoztatónkat
              </a>.
            </p>
            <p className="mt-4">
              Ha kérdése van a sütikkel kapcsolatban, forduljon hozzánk bizalommal:
            </p>
            <div className="bg-white p-6 rounded-sm border border-taupe-200 mt-4">
              <p><strong>E-mail:</strong> tarnoczilevente@gmail.com</p>
              <p><strong>Telefon:</strong> <a href="tel:+36303337272" className="text-taupe-900 underline hover:text-taupe-700">+36 30 333 7272</a></p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-normal text-taupe-900 mb-4">7. Módosítások</h2>
            <p>
              Fenntartjuk a jogot, hogy ezt a Süti Szabályzatot időről időre frissítsük,
              különösen akkor, ha új sütiket kezdünk használni, vagy megváltozik a jogi környezet.
              A módosítások ezen az oldalon kerülnek közzétételre.
            </p>
          </section>

          <section className="border-t border-taupe-200 pt-8 mt-12">
            <p className="text-sm text-taupe-600">
              Ez a Süti Szabályzat az ePrivacy irányelv (2002/58/EK), a GDPR (EU 2016/679)
              és a vonatkozó magyar jogszabályok előírásainak megfelelően készült.
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
