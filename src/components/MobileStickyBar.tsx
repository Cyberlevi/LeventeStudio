import { Phone, MessageCircle } from 'lucide-react';
import { trackPhoneClick, trackWhatsAppClick } from '../utils/gtm';

export default function MobileStickyBar() {
  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-graphite-950/95 backdrop-blur-xl border-t border-white/10 shadow-2xl shadow-black/30"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="grid grid-cols-2 gap-px bg-white/10">
        <a
          href="tel:+36202826843"
          onClick={() => trackPhoneClick('mobile_sticky_bar')}
          className="flex items-center justify-center gap-2.5 py-3.5 px-3 bg-graphite-950 text-white/75 active:bg-graphite-900 transition-colors"
        >
          <Phone size={18} className="text-signal-400" />
          <span className="text-sm font-medium">Hívás</span>
        </a>

        <a
          href="https://wa.me/36202826843?text=Szia%2C%20egy%20%C3%BCgyf%C3%A9lszerz%C5%91%20digit%C3%A1lis%20rendszerr%C5%91l%20szeretn%C3%A9k%20egyeztetni."
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick('mobile_sticky_bar')}
          className="flex items-center justify-center gap-2.5 py-3.5 px-3 bg-signal-400 text-graphite-950 active:bg-signal-300 transition-colors"
        >
          <MessageCircle size={18} />
          <span className="text-sm font-semibold">WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
