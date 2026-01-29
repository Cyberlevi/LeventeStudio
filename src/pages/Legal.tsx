import { ArrowLeft, Scale } from 'lucide-react';
import Logo from '../components/Logo';

export default function Legal() {
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
          <Scale className="text-taupe-700" size={32} />
          <h1 className="text-4xl font-normal text-taupe-900">Jogi Információk</h1>
        </div>

        <div className="prose prose-taupe max-w-none space-y-8 text-taupe-800 font-light leading-relaxed">
          <section>
            <p className="text-sm text-taupe-600 mb-6">
              Utolsó frissítés: {new Date().toISOString().split('T')[0]}
            </p>
            <p>
              Ez az oldal tartalmazza a leventestudio.app weboldal üzemeltetőjének és
              szolgáltatójának kötelező adatait a hatályos magyar jogszabályok szerint.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-normal text-taupe-900 mb-4">1. Szolgáltató adatai</h2>
            <div className="bg-white p-6 rounded-sm border-2 border-taupe-300">
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-taupe-600 font-normal">Név:</p>
                  <p className="text-lg text-taupe-900">Tarnóczi Levente</p>
                </div>

                <div className="border-t border-taupe-200 pt-3">
                  <p className="text-sm text-taupe-600 font-normal">E-mail:</p>
                  <p className="text-lg">
                    <a href="mailto:tarnoczilevente@gmail.com" className="text-taupe-900 underline hover:text-taupe-700">
                      tarnoczilevente@gmail.com
                    </a>
                  </p>
                </div>

                <div className="border-t border-taupe-200 pt-3">
                  <p className="text-sm text-taupe-600 font-normal">Telefon:</p>
                  <p className="text-lg">
                    <a href="tel:+36303337272" className="text-taupe-900 underline hover:text-taupe-700">
                      +36 30 333 7272
                    </a>
                  </p>
                </div>

                <div className="border-t border-taupe-200 pt-3">
                  <p className="text-sm text-taupe-600 font-normal">Weboldal:</p>
                  <p className="text-lg">
                    <a href="https://leventestudio.app" className="text-taupe-900 underline hover:text-taupe-700">
                      leventestudio.app
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-normal text-taupe-900 mb-4">2. Tevékenység</h2>
            <p>
              A Levente Stúdió weboldal audit, SEO tanácsadás és teljesítmény optimalizálás
              szolgáltatásokat nyújt elsősorban budapesti vállalkozások, kisvállalatok és
              vállalkozók részére.
            </p>

            <div className="mt-6 space-y-4">
              <div className="bg-white p-5 rounded-sm border border-taupe-200">
                <h3 className="font-normal text-taupe-900 mb-2">Fő szolgáltatások:</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Weboldal audit és elemzés</li>
                  <li>SEO (keresőoptimalizálás) tanácsadás</li>
                  <li>Teljesítmény optimalizálás</li>
                  <li>Weboldal technikai felülvizsgálat</li>
                  <li>Konverzió optimalizálás</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-normal text-taupe-900 mb-4">3. Tárhely szolgáltató</h2>
            <div className="bg-white p-6 rounded-sm border border-taupe-200">
              <p className="mb-2"><strong>Szolgáltató:</strong> Netlify, Inc.</p>
              <p className="mb-2"><strong>Cím:</strong> 44 Montgomery Street, Suite 300, San Francisco, CA 94104, USA</p>
              <p className="mb-2"><strong>Weboldal:</strong> <a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer" className="text-taupe-900 underline hover:text-taupe-700">netlify.com</a></p>
              <p><strong>Adatvédelmi tájékoztató:</strong> <a href="https://www.netlify.com/privacy/" target="_blank" rel="noopener noreferrer" className="text-taupe-900 underline hover:text-taupe-700">Netlify Privacy Policy</a></p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-normal text-taupe-900 mb-4">4. Szellemi tulajdon</h2>
            <p>
              A leventestudio.app weboldalon megjelenő tartalmak (szövegek, képek, logók,
              grafikai elemek, dizájn) szerzői jogi védelem alatt állnak.
            </p>
            <p className="mt-4">
              <strong>Jogosult:</strong> Tarnóczi Levente
            </p>
            <p className="mt-4">
              A tartalmak bármilyen formában történő másolása, terjesztése vagy felhasználása
              csak az üzemeltető előzetes írásos engedélyével lehetséges.
            </p>

            <h3 className="text-xl font-normal text-taupe-900 mb-3 mt-6">Használt nyílt forráskódú szoftverek:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>React (MIT License)</li>
              <li>Vite (MIT License)</li>
              <li>Tailwind CSS (MIT License)</li>
              <li>Lucide React (ISC License)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-normal text-taupe-900 mb-4">5. Felelősség korlátozás</h2>
            <p>
              A leventestudio.app weboldalon található információk tájékoztató jellegűek.
              Törekszünk arra, hogy a tartalmak pontosak és naprakészek legyenek, azonban nem
              vállalunk felelősséget az esetleges pontatlanságokért vagy hiányosságokért.
            </p>
            <p className="mt-4">
              A weboldalon található külső linkekért (harmadik felek weboldalai) nem vállalunk
              felelősséget. A linkelt oldalak tartalma a saját üzemeltetőik felelősségi körébe tartozik.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-normal text-taupe-900 mb-4">6. Alkalmazandó jog és jogviták</h2>
            <p>
              A weboldal használatára és a szolgáltatásokra a magyar jog az irányadó.
            </p>
            <p className="mt-4">
              Az esetleges jogvitákat a felek elsősorban békés úton próbálják rendezni.
              Ennek eredménytelensége esetén a magyar bíróságok rendelkeznek hatáskörrel
              és illetékességgel.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-normal text-taupe-900 mb-4">7. Kapcsolódó dokumentumok</h2>
            <div className="grid gap-4 mt-6">
              <a
                href="/privacy-policy"
                className="block p-5 bg-white border-2 border-taupe-200 rounded-sm hover:border-taupe-400 transition-colors group"
              >
                <h3 className="font-normal text-taupe-900 mb-2 group-hover:text-taupe-700 transition-colors">
                  Adatvédelmi Tájékoztató
                </h3>
                <p className="text-sm text-taupe-600">
                  Részletes információk az adatkezelésről, az Ön jogairól és a GDPR megfelelésről.
                </p>
              </a>

              <a
                href="/cookie-policy"
                className="block p-5 bg-white border-2 border-taupe-200 rounded-sm hover:border-taupe-400 transition-colors group"
              >
                <h3 className="font-normal text-taupe-900 mb-2 group-hover:text-taupe-700 transition-colors">
                  Süti Szabályzat
                </h3>
                <p className="text-sm text-taupe-600">
                  Információk a weboldalon használt sütikről és azok kezeléséről.
                </p>
              </a>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-normal text-taupe-900 mb-4">8. Kapcsolatfelvétel</h2>
            <p className="mb-6">
              Ha kérdése van a jogi információkkal, szolgáltatásainkkal vagy a weboldal
              működésével kapcsolatban, forduljon hozzánk bizalommal az alábbi elérhetőségeken:
            </p>

            <div className="bg-taupe-900 text-cream-50 p-8 rounded-sm space-y-4">
              <div>
                <p className="text-sm text-cream-300 font-normal mb-1">E-mail:</p>
                <a href="mailto:tarnoczilevente@gmail.com" className="text-lg hover:text-cream-200 transition-colors underline">
                  tarnoczilevente@gmail.com
                </a>
              </div>

              <div>
                <p className="text-sm text-cream-300 font-normal mb-1">Telefon:</p>
                <a href="tel:+36303337272" className="text-lg hover:text-cream-200 transition-colors underline">
                  +36 30 333 7272
                </a>
              </div>

              <div>
                <p className="text-sm text-cream-300 font-normal mb-1">WhatsApp:</p>
                <a
                  href="https://wa.me/36303337272"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg hover:text-cream-200 transition-colors underline"
                >
                  +36 30 333 7272
                </a>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-normal text-taupe-900 mb-4">9. Hatálybalépés</h2>
            <p>
              Ez a Jogi Információk oldal 2026. január 29-én lép hatályba.
            </p>
          </section>

          <section className="border-t border-taupe-200 pt-8 mt-12">
            <p className="text-sm text-taupe-600">
              Ez az oldal az elektronikus kereskedelmi szolgáltatások, valamint az
              információs társadalommal összefüggő szolgáltatások egyes kérdéseiről szóló
              2001. évi CVIII. törvény (Elker. tv.) és vonatkozó jogszabályok előírásainak
              megfelelően készült.
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
