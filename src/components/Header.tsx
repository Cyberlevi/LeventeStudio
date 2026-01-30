import { MessageCircle, Phone, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { trackConversion } from '../utils/gtm';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Főoldal' },
    { path: '/rolam', label: 'Rólam' },
    { path: '/esettanulmanyok', label: 'Esettanulmányok' },
    { path: '/kapcsolat', label: 'Kapcsolat' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream-50/95 backdrop-blur-sm border-b border-taupe-100">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>
            <Logo variant="primary" theme="light" className="h-8" />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-light transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-taupe-900 font-normal'
                    : 'text-taupe-700 hover:text-taupe-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/36202826843?text=Szia%2C%20weboldal%20auditot%20szeretn%C3%A9k%20k%C3%A9rni"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackConversion('click_whatsapp', undefined, 'header')}
              className="hidden md:inline-flex items-center gap-2 px-6 py-3 bg-taupe-900 text-cream-50 rounded-sm hover:bg-taupe-800 transition-colors duration-200 text-sm font-light"
            >
              <MessageCircle size={18} />
              Ingyenes konzultáció
            </a>

            <a
              href="tel:+36202826843"
              onClick={() => trackConversion('click_phone', undefined, 'header')}
              className="lg:hidden inline-flex items-center gap-2 text-taupe-700 hover:text-taupe-900 transition-colors duration-200 text-sm font-light"
            >
              <Phone size={16} />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-taupe-900"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 flex flex-col gap-4 border-t border-taupe-200 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-light transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-taupe-900 font-normal'
                    : 'text-taupe-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://wa.me/36202826843?text=Szia%2C%20weboldal%20auditot%20szeretn%C3%A9k%20k%C3%A9rni"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackConversion('click_whatsapp', undefined, 'header_mobile');
                setMobileMenuOpen(false);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-taupe-900 text-cream-50 rounded-sm hover:bg-taupe-800 transition-colors duration-200 text-sm font-light justify-center"
            >
              <MessageCircle size={18} />
              Ingyenes konzultáció
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
