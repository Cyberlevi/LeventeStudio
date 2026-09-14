import { Phone, MessageCircle, Mail } from 'lucide-react';
import { trackPhoneClick, trackWhatsAppClick, trackCTAClick } from '../utils/gtm';
import { isRateLimited, getRateLimitMessage } from '../utils/rateLimit';

export default function Contact() {
  return (
    <section id="kapcsolat" className="px-6 py-24 pb-32 md:pb-24 bg-taupe-900 text-cream-50 scroll-mt-24">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-sm uppercase tracking-[0.18em] text-cream-300 mb-4">Rendszertervezés</p>
        <h2 className="font-serif text-4xl md:text-6xl font-light mb-8 text-balance">
          Nézzük meg, hol lehet egyszerűbb és mérhetőbb a működésed.
        </h2>

        <p className="text-xl font-light mb-12 text-cream-100 max-w-3xl mx-auto text-balance">
          Írd meg röviden, milyen szolgáltatást értékesítesz, honnan jönnek most az érdeklődők és hol érzed a legnagyobb elakadást. Innen már célzottan tudunk továbbmenni.
        </p>

        <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto mb-8">
          <a
            href="https://wa.me/36202826843?text=Szia%2C%20egy%20%C3%BCgyf%C3%A9lszerz%C5%91%20digit%C3%A1lis%20rendszerr%C5%91l%20szeretn%C3%A9k%20egyeztetni."
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if (isRateLimited('click_whatsapp')) {
                e.preventDefault();
                alert(getRateLimitMessage());
                return;
              }
              trackWhatsAppClick('contact_section');
            }}
            className="studio-card flex flex-col items-center gap-3 p-6 bg-cream-50 text-taupe-900 rounded-sm"
          >
            <MessageCircle size={30} />
            <span className="text-lg font-light">WhatsApp</span>
            <span className="text-sm opacity-75">Írd le röviden a projektet</span>
          </a>

          <a
            href="mailto:hello@leventestudio.app?subject=Digit%C3%A1lis%20rendszer%20egyeztet%C3%A9s"
            onClick={(e) => {
              if (isRateLimited('click_email')) {
                e.preventDefault();
                alert(getRateLimitMessage());
                return;
              }
              trackCTAClick('Email', 'contact_section');
            }}
            className="studio-card flex flex-col items-center gap-3 p-6 bg-taupe-800 text-cream-50 rounded-sm border-taupe-700"
          >
            <Mail size={30} />
            <span className="text-lg font-light">Email</span>
            <span className="text-sm opacity-75">hello@leventestudio.app</span>
          </a>

          <a
            href="tel:+36202826843"
            onClick={(e) => {
              if (isRateLimited('click_phone')) {
                e.preventDefault();
                alert(getRateLimitMessage());
                return;
              }
              trackPhoneClick('contact_section');
            }}
            className="studio-card flex flex-col items-center gap-3 p-6 border border-taupe-700 text-cream-100 rounded-sm bg-taupe-900"
          >
            <Phone size={30} />
            <span className="text-lg font-light">Telefon</span>
            <span className="text-sm opacity-75">+36 20 282 6843</span>
          </a>
        </div>

        <p className="text-sm text-cream-300 font-light">
          Már az első egyeztetésen azt keressük, mi a legkisebb értelmes rendszer, ami üzletileg előrelépést ad.
        </p>
      </div>
    </section>
  );
}