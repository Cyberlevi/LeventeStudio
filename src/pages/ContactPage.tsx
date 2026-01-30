import { Phone, MessageCircle, Mail, MapPin, Clock } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StructuredData from '../components/StructuredData';
import CookieBanner from '../components/CookieBanner';
import MobileStickyBar from '../components/MobileStickyBar';
import { trackConversion } from '../utils/gtm';
import { isRateLimited, getRateLimitMessage } from '../utils/rateLimit';

export default function ContactPage() {
  return (
    <>
      <StructuredData />
      <CookieBanner />
      <MobileStickyBar />
      <div className="min-h-screen bg-white">
        <Header />

        <section className="px-6 pt-32 pb-24 bg-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-light text-taupe-900 mb-8 text-center">
              Beszéljünk
            </h1>

            <p className="text-xl md:text-2xl text-taupe-700 font-light text-center mb-16 max-w-2xl mx-auto leading-relaxed">
              Ha komoly problémát látsz a weboldaladon, és adatokkal akarod megoldani – vedd fel velem a kapcsolatot.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <a
                href="tel:+36202826843"
                onClick={(e) => {
                  if (isRateLimited('click_phone')) {
                    e.preventDefault();
                    alert(getRateLimitMessage());
                    return;
                  }
                  trackConversion('click_phone', undefined, 'contact_page');
                }}
                className="flex flex-col items-center gap-3 p-8 bg-taupe-900 text-cream-50 rounded-sm hover:bg-taupe-800 transition-colors duration-200"
              >
                <Phone size={40} />
                <span className="text-xl font-light">Hívj fel</span>
                <span className="text-sm opacity-90">+36 20 282 6843</span>
              </a>

              <a
                href="https://wa.me/36202826843?text=Szia%2C%20weboldal%20auditot%20szeretn%C3%A9k%20k%C3%A9rni"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (isRateLimited('click_whatsapp')) {
                    e.preventDefault();
                    alert(getRateLimitMessage());
                    return;
                  }
                  trackConversion('click_whatsapp', undefined, 'contact_page');
                }}
                className="flex flex-col items-center gap-3 p-8 bg-taupe-50 text-taupe-900 rounded-sm hover:bg-taupe-100 transition-colors duration-200 border border-taupe-200"
              >
                <MessageCircle size={40} />
                <span className="text-xl font-light">WhatsApp</span>
                <span className="text-sm opacity-80">Gyors válasz</span>
              </a>

              <a
                href="mailto:hello@leventestudio.app?subject=Weboldal%20audit%20k%C3%A9r%C3%A9s"
                onClick={(e) => {
                  if (isRateLimited('click_email')) {
                    e.preventDefault();
                    alert(getRateLimitMessage());
                    return;
                  }
                  trackConversion('click_email', undefined, 'contact_page');
                }}
                className="flex flex-col items-center gap-3 p-8 bg-taupe-50 text-taupe-900 rounded-sm hover:bg-taupe-100 transition-colors duration-200 border border-taupe-200"
              >
                <Mail size={40} />
                <span className="text-xl font-light">Email</span>
                <span className="text-sm opacity-80">hello@leventestudio.app</span>
              </a>
            </div>

            <div className="bg-taupe-50 p-8 md:p-12 rounded-sm border border-taupe-200 mb-16">
              <h2 className="text-2xl md:text-3xl font-light text-taupe-900 mb-8 text-center">
                Mi történik utána?
              </h2>

              <div className="space-y-6 max-w-2xl mx-auto">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-taupe-900 text-cream-50 flex items-center justify-center font-light">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-normal text-taupe-900 mb-2">Első beszélgetés</h3>
                    <p className="text-taupe-700 font-light leading-relaxed">
                      15-20 perc telefonon vagy online. Elmondod, mi a probléma, mit szeretnél elérni. Nem sales call, hanem diagnosztikai beszélgetés.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-taupe-900 text-cream-50 flex items-center justify-center font-light">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-normal text-taupe-900 mb-2">Gyors áttekintés</h3>
                    <p className="text-taupe-700 font-light leading-relaxed">
                      Megnézem a weboldaladat (publikus adatok): sebesség, mobil nézet, alapvető SEO. Megmondom, hogy látok-e gyorsan javítható hibát, vagy komolyabb audit kell.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-taupe-900 text-cream-50 flex items-center justify-center font-light">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-normal text-taupe-900 mb-2">Ajánlat vagy tanács</h3>
                    <p className="text-taupe-700 font-light leading-relaxed">
                      Ha érdemes audit, küldök egy konkrét ajánlatot (mit nézek meg, mit kapsz, mennyibe kerül). Ha gyors fix elég, megmondom, mit csinálj. Ha nem tudok segíteni, azt is megmondom.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-24 bg-taupe-900 text-cream-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light mb-12 text-center">
              Gyakori kérdések a kapcsolatfelvételről
            </h2>

            <div className="space-y-6 max-w-3xl mx-auto">
              <div className="bg-taupe-800 p-6 rounded-sm">
                <h3 className="text-lg font-normal text-cream-50 mb-3">
                  Milyen gyorsan válaszolsz?
                </h3>
                <p className="text-cream-100 font-light leading-relaxed">
                  24 órán belül mindenképp jelzek. Ha sürgős, hívj fel vagy írj WhatsApp-on – arra általában pár órán belül válaszolok.
                </p>
              </div>

              <div className="bg-taupe-800 p-6 rounded-sm">
                <h3 className="text-lg font-normal text-cream-50 mb-3">
                  Fizetni kell a első beszélgetésért?
                </h3>
                <p className="text-cream-100 font-light leading-relaxed">
                  Nem. Az első 15-20 perces beszélgetés ingyenes. Ha látom, hogy tudok segíteni, ajánlok egy konkrét auditot. Ha nem tudok segíteni, megmondom, és nem kerül semmibe.
                </p>
              </div>

              <div className="bg-taupe-800 p-6 rounded-sm">
                <h3 className="text-lg font-normal text-cream-50 mb-3">
                  Kell valami előkészület?
                </h3>
                <p className="text-cream-100 font-light leading-relaxed">
                  Nem kell. Elég, ha tudod, mi a probléma, vagy mit szeretnél elérni. Ha van Analytics hozzáférésed, azt majd később kérem, az első beszélgetéshez nem kell.
                </p>
              </div>

              <div className="bg-taupe-800 p-6 rounded-sm">
                <h3 className="text-lg font-normal text-cream-50 mb-3">
                  Dolgozhatok kis projektekkel is?
                </h3>
                <p className="text-cream-100 font-light leading-relaxed">
                  Igen. Nem számít, hogy mekkora a weboldal vagy a forgalom. Ha komoly probléma van, és adatokkal akarod megoldani, tudok segíteni.
                </p>
              </div>

              <div className="bg-taupe-800 p-6 rounded-sm">
                <h3 className="text-lg font-normal text-cream-50 mb-3">
                  Milyen nyelveken dolgozol?
                </h3>
                <p className="text-cream-100 font-light leading-relaxed">
                  Magyarul és angolul is. Ha nemzetközi projekt, nincs probléma.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-24 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-taupe-50 p-8 rounded-sm border border-taupe-200">
                <div className="flex items-start gap-4 mb-4">
                  <Clock size={24} className="text-taupe-900 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-light text-taupe-900 mb-2">
                      Elérhetőség
                    </h3>
                    <p className="text-taupe-700 font-light leading-relaxed">
                      Hétköznap 9:00-18:00 között elérhető vagyok telefonon és email-ben. WhatsApp-on általában este is válaszolok.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-taupe-50 p-8 rounded-sm border border-taupe-200">
                <div className="flex items-start gap-4 mb-4">
                  <MapPin size={24} className="text-taupe-900 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-light text-taupe-900 mb-2">
                      Személyes találkozó
                    </h3>
                    <p className="text-taupe-700 font-light leading-relaxed">
                      Ha Budapest, szívesen találkozunk személyesen is. Más városból vagy nemzetközi projekt esetén online meeting.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
