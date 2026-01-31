import { Phone, MessageCircle, Calendar, Mail } from 'lucide-react';
import { trackAuditRequest, trackPhoneClick, trackWhatsAppClick, trackCTAClick } from '../utils/gtm';

interface AuditCTAProps {
  variant?: 'primary' | 'secondary';
  title?: string;
  subtitle?: string;
}

export default function AuditCTA({
  variant = 'primary',
  title = 'Kérj weboldal auditot',
  subtitle = 'Válassz, ahogy neked kényelmes'
}: AuditCTAProps) {
  const isPrimary = variant === 'primary';

  return (
    <section className={`px-6 py-24 ${isPrimary ? 'bg-taupe-900 text-cream-50' : 'bg-cream-50'}`}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className={`text-4xl md:text-5xl font-light mb-8 ${isPrimary ? 'text-cream-50' : 'text-taupe-900'}`}>
          {title}
        </h2>

        {subtitle && (
          <p className={`text-xl font-light mb-12 ${isPrimary ? 'text-cream-100' : 'text-taupe-700'} max-w-2xl mx-auto`}>
            {subtitle}
          </p>
        )}

        <div className="max-w-2xl mx-auto mb-8">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <a
              href="tel:+36202826843"
              onClick={() => {
                trackPhoneClick('audit_cta_primary');
                trackAuditRequest('phone_primary');
              }}
              className="flex flex-col items-center gap-3 p-8 rounded-sm transition-colors duration-200 bg-taupe-900 text-cream-50 hover:bg-taupe-800"
            >
              <Phone size={32} />
              <span className="text-lg font-light">Azonnali hívás</span>
              <span className="text-sm opacity-80">+36 20 282 6843</span>
            </a>

            <a
              href="https://wa.me/36202826843?text=Szia%2C%20weboldal%20auditot%20szeretn%C3%A9k%20k%C3%A9rni"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackWhatsAppClick('audit_cta_primary');
                trackAuditRequest('whatsapp_primary');
              }}
              className="flex flex-col items-center gap-3 p-8 rounded-sm transition-colors duration-200 bg-taupe-900 text-cream-50 hover:bg-taupe-800"
            >
              <MessageCircle size={32} />
              <span className="text-lg font-light">WhatsApp üzenet</span>
              <span className="text-sm opacity-80">Gyors válasz 24 órán belül</span>
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="https://wa.me/36202826843?text=Szia%2C%20weboldal%20auditot%20szeretn%C3%A9k%20k%C3%A9rni"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackWhatsAppClick('audit_cta_secondary');
                trackAuditRequest('whatsapp_secondary');
              }}
              className="flex flex-col items-center gap-3 p-6 rounded-sm transition-colors duration-200 bg-taupe-100 text-taupe-900 hover:bg-taupe-200"
            >
              <MessageCircle size={28} />
              <span className="font-light">WhatsApp üzenet</span>
              <span className="text-sm opacity-70">Válaszolok 24 órán belül</span>
            </a>

            <a
              href="mailto:hello@leventestudio.app?subject=Weboldal%20audit%20k%C3%A9r%C3%A9s&body=Szia%2C%0A%0AWeboldal%20audit%C3%A1t%20szeretn%C3%A9m%20k%C3%A9rni.%0A%0AWeboldal%20URL%3A%20%0ATelefonsz%C3%A1m%3A%20%0A%0AProbléma%20r%C3%B6viden%3A%20"
              onClick={() => {
                trackCTAClick('Email írás', 'audit_cta_secondary');
                trackAuditRequest('email_secondary');
              }}
              className="flex flex-col items-center gap-3 p-6 rounded-sm transition-colors duration-200 bg-taupe-100 text-taupe-900 hover:bg-taupe-200"
            >
              <Mail size={28} />
              <span className="font-light">Email írás</span>
              <span className="text-sm opacity-70">hello@leventestudio.app</span>
            </a>
          </div>
        </div>

        <p className={`text-sm font-light ${isPrimary ? 'text-cream-200' : 'text-taupe-600'}`}>
          Az első konzultáció mindig ingyenes. Megbeszéljük a problémát, megmondom az árat.
        </p>
      </div>
    </section>
  );
}
