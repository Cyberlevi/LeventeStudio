import { Phone, MessageCircle } from 'lucide-react';
import { trackPhoneClick, trackWhatsAppClick, trackContactSubmit } from '../utils/gtm';

export default function MobileStickyBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-cream-50 border-t border-taupe-200 shadow-lg">
      <div className="grid grid-cols-2 gap-0">
        <a
          href="tel:+36202826843"
          onClick={() => {
            trackPhoneClick('mobile_sticky_bar');
            trackContactSubmit('phone_sticky');
          }}
          className="flex items-center justify-center gap-2 py-4 bg-taupe-600 text-cream-50 hover:bg-taupe-700 transition-colors duration-200 active:bg-taupe-800"
        >
          <Phone size={20} />
          <span className="font-light">Hívás</span>
        </a>

        <a
          href="https://wa.me/36202826843?text=Szia%2C%20weboldal%20auditot%20szeretn%C3%A9k%20k%C3%A9rni"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            trackWhatsAppClick('mobile_sticky_bar');
            trackContactSubmit('whatsapp_sticky');
          }}
          className="flex items-center justify-center gap-2 py-4 bg-taupe-900 text-cream-50 hover:bg-taupe-800 transition-colors duration-200 active:bg-taupe-950"
        >
          <MessageCircle size={20} />
          <span className="font-light">WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
