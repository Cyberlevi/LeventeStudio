import { ArrowUpRight, Mail, MessageCircle, Phone } from 'lucide-react';

export default function Contact2026() {
  return (
    <section id="kapcsolat" className="hightech-section relative scroll-mt-24 overflow-hidden bg-graphite-950 pb-32 text-white md:pb-24">
      <div className="subpage-signal-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="subpage-glow pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="hightech-container relative">
        <div className="mb-10 grid items-end gap-10 md:mb-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <div className="signal-kicker mb-5"><span className="signal-dot" />Direct channels</div>
            <h2 className="font-serif text-4xl font-light leading-[0.92] tracking-editorial text-balance sm:text-5xl md:text-7xl">
              Nézzük meg, hol lehet <span className="text-signal-400">egyszerűbb és mérhetőbb.</span>
            </h2>
          </div>
          <p className="max-w-2xl text-base font-light leading-relaxed text-white/60 sm:text-lg">
            Írd meg röviden, milyen szolgáltatást értékesítesz, honnan jönnek most az érdeklődők és hol érzed a legnagyobb elakadást. Innen már célzottan tudunk továbbmenni.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
          <a
            href="https://wa.me/36202826843?text=Szia%2C%20egy%20%C3%BCgyf%C3%A9lszerz%C5%91%20digit%C3%A1lis%20rendszerr%C5%91l%20szeretn%C3%A9k%20egyeztetni."
            target="_blank"
            rel="noopener noreferrer"
            data-track-event="whatsapp_click"
            data-track-location="contact_section"
            className="tech-card-dark group flex min-h-[190px] flex-col p-6 sm:p-7"
          >
            <div className="mb-10 flex items-start justify-between gap-4">
              <MessageCircle size={24} className="text-signal-400" aria-hidden="true" />
              <ArrowUpRight size={18} className="text-white/30 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-signal-400" aria-hidden="true" />
            </div>
            <div className="mt-auto">
              <div className="mb-2 text-xs uppercase tracking-[0.16em] text-white/40">Fast channel</div>
              <div className="mb-1 text-2xl text-white">WhatsApp</div>
              <div className="text-sm text-white/50">Írd le röviden a projektet</div>
            </div>
          </a>

          <a
            href="mailto:hello@leventestudio.app?subject=Digit%C3%A1lis%20rendszer%20egyeztet%C3%A9s"
            data-track-cta="Email"
            data-track-location="contact_section"
            className="tech-card-dark group flex min-h-[190px] flex-col p-6 sm:p-7"
          >
            <div className="mb-10 flex items-start justify-between gap-4">
              <Mail size={24} className="text-signal-400" aria-hidden="true" />
              <ArrowUpRight size={18} className="text-white/30 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-signal-400" aria-hidden="true" />
            </div>
            <div className="mt-auto">
              <div className="mb-2 text-xs uppercase tracking-[0.16em] text-white/40">Async channel</div>
              <div className="mb-1 text-2xl text-white">Email</div>
              <div className="text-sm text-white/50">hello@leventestudio.app</div>
            </div>
          </a>

          <a
            href="tel:+36202826843"
            data-track-event="phone_click"
            data-track-location="contact_section"
            className="tech-card-dark group flex min-h-[190px] flex-col p-6 sm:p-7"
          >
            <div className="mb-10 flex items-start justify-between gap-4">
              <Phone size={24} className="text-signal-400" aria-hidden="true" />
              <ArrowUpRight size={18} className="text-white/30 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-signal-400" aria-hidden="true" />
            </div>
            <div className="mt-auto">
              <div className="mb-2 text-xs uppercase tracking-[0.16em] text-white/40">Direct channel</div>
              <div className="mb-1 text-2xl text-white">Telefon</div>
              <div className="text-sm text-white/50">+36 20 282 6843</div>
            </div>
          </a>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-5 text-xs uppercase tracking-[0.14em] text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <span>Levente Studio / system design</span>
          <span className="text-signal-400">human response · no sales bot</span>
        </div>
      </div>
    </section>
  );
}
