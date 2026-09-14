import { MessageCircle, Phone } from 'lucide-react';

export default function MobileStickyBar2026() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-graphite-950/95 shadow-2xl shadow-black/30 backdrop-blur-xl md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="grid grid-cols-2 gap-px bg-white/10">
        <a
          href="tel:+36202826843"
          data-track-event="phone_click"
          data-track-location="mobile_sticky_bar"
          className="flex items-center justify-center gap-2.5 bg-graphite-950 px-3 py-3.5 text-white/75 transition-colors active:bg-graphite-900"
        >
          <Phone size={18} className="text-signal-400" aria-hidden="true" />
          <span className="text-sm font-medium">Hívás</span>
        </a>

        <a
          href="https://wa.me/36202826843?text=Szia%2C%20egy%20%C3%BCgyf%C3%A9lszerz%C5%91%20digit%C3%A1lis%20rendszerr%C5%91l%20szeretn%C3%A9k%20egyeztetni."
          target="_blank"
          rel="noopener noreferrer"
          data-track-event="whatsapp_click"
          data-track-location="mobile_sticky_bar"
          className="flex items-center justify-center gap-2.5 bg-signal-400 px-3 py-3.5 text-graphite-950 transition-colors active:bg-signal-300"
        >
          <MessageCircle size={18} aria-hidden="true" />
          <span className="text-sm font-semibold">WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
