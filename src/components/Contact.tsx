import { Phone, MessageCircle, Mail } from 'lucide-react';
import { trackConversion } from '../utils/gtm';
import { isRateLimited, getRateLimitMessage } from '../utils/rateLimit';

export default function Contact() {
  return (
    <section className="px-6 py-24 pb-32 md:pb-24 bg-taupe-900 text-cream-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-light mb-8">
          Indítsuk el
        </h2>

        <p className="text-xl md:text-2xl font-light mb-12 text-cream-100 max-w-2xl mx-auto text-balance">
          Ha komoly problémát látsz a weboldaladon, és adatokkal akarod megoldani – beszéljünk.
        </p>

        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
          <a
            href="tel:+36202826843"
            onClick={(e) => {
              if (isRateLimited('click_phone')) {
                e.preventDefault();
                alert(getRateLimitMessage());
                return;
              }
              trackConversion('click_phone', undefined, 'contact');
            }}
            className="flex flex-col items-center gap-3 p-6 bg-cream-50 text-taupe-900 rounded-sm hover:bg-cream-100 transition-colors duration-200"
          >
            <Phone size={32} />
            <span className="text-lg font-light">Azonnali hívás</span>
            <span className="text-sm opacity-80">+36 20 282 6843</span>
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
              trackConversion('click_whatsapp', undefined, 'contact');
            }}
            className="flex flex-col items-center gap-3 p-6 bg-taupe-800 text-cream-50 rounded-sm hover:bg-taupe-700 transition-colors duration-200"
          >
            <MessageCircle size={32} />
            <span className="text-lg font-light">WhatsApp</span>
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
              trackConversion('click_email', undefined, 'contact');
            }}
            className="flex flex-col items-center gap-3 p-6 bg-cream-50 text-taupe-900 rounded-sm hover:bg-cream-100 transition-colors duration-200"
          >
            <Mail size={32} />
            <span className="text-lg font-light">Email</span>
            <span className="text-sm opacity-80">hello@leventestudio.app</span>
          </a>
        </div>

        <p className="text-sm text-cream-200 font-light">
          Nem válaszolok mindenre azonnal, de 24 órán belül mindenképp jelzek.
        </p>
      </div>
    </section>
  );
}
