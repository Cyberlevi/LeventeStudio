import { Phone, MessageCircle, Mail, ArrowUpRight } from 'lucide-react';
import { trackPhoneClick, trackWhatsAppClick, trackCTAClick } from '../utils/gtm';
import { isRateLimited, getRateLimitMessage } from '../utils/rateLimit';

export default function Contact() {
  return (
    <section id="kapcsolat" className="hightech-section pb-32 md:pb-24 bg-graphite-950 text-white scroll-mt-24 relative overflow-hidden">
      <div className="absolute inset-0 subpage-signal-grid opacity-30 pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 subpage-glow pointer-events-none" aria-hidden="true" />

      <div className="hightech-container relative">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-end mb-10 md:mb-14">
          <div>
            <div className="signal-kicker mb-5"><span className="signal-dot" />Direct channels</div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-7xl font-light tracking-editorial leading-[0.92] text-balance">
              Nézzük meg, hol lehet <span className="text-signal-400">egyszerűbb és mérhetőbb.</span>
            </h2>
          </div>
          <p className="text-base sm:text-lg text-white/60 font-light leading-relaxed max-w-2xl">
            Írd meg röviden, milyen szolgáltatást értékesítesz, honnan jönnek most az érdeklődők és hol érzed a legnagyobb elakadást. Innen már célzottan tudunk továbbmenni.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-5">
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
            className="tech-card-dark group p-6 sm:p-7 min-h-[190px] flex flex-col"
          >
            <div className="flex items-start justify-between gap-4 mb-10">
              <MessageCircle size={24} className="text-signal-400" />
              <ArrowUpRight size={18} className="text-white/30 group-hover:text-signal-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </div>
            <div className="mt-auto">
              <div className="text-xs uppercase tracking-[0.16em] text-white/40 mb-2">Fast channel</div>
              <div className="text-2xl text-white mb-1">WhatsApp</div>
              <div className="text-sm text-white/50">Írd le röviden a projektet</div>
            </div>
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
            className="tech-card-dark group p-6 sm:p-7 min-h-[190px] flex flex-col"
          >
            <div className="flex items-start justify-between gap-4 mb-10">
              <Mail size={24} className="text-signal-400" />
              <ArrowUpRight size={18} className="text-white/30 group-hover:text-signal-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </div>
            <div className="mt-auto">
              <div className="text-xs uppercase tracking-[0.16em] text-white/40 mb-2">Async channel</div>
              <div className="text-2xl text-white mb-1">Email</div>
              <div className="text-sm text-white/50">hello@leventestudio.app</div>
            </div>
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
            className="tech-card-dark group p-6 sm:p-7 min-h-[190px] flex flex-col"
          >
            <div className="flex items-start justify-between gap-4 mb-10">
              <Phone size={24} className="text-signal-400" />
              <ArrowUpRight size={18} className="text-white/30 group-hover:text-signal-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </div>
            <div className="mt-auto">
              <div className="text-xs uppercase tracking-[0.16em] text-white/40 mb-2">Direct channel</div>
              <div className="text-2xl text-white mb-1">Telefon</div>
              <div className="text-sm text-white/50">+36 20 282 6843</div>
            </div>
          </a>
        </div>

        <div className="mt-8 border-t border-white/10 pt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs uppercase tracking-[0.14em] text-white/35">
          <span>Levente Studio / system design</span>
          <span className="text-signal-400">human response · no sales bot</span>
        </div>
      </div>
    </section>
  );
}
