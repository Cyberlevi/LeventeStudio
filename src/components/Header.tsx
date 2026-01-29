import { Calendar, Phone } from 'lucide-react';
import Logo from './Logo';
import { trackConversion } from '../utils/gtm';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream-50/95 backdrop-blur-sm border-b border-taupe-100">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Logo variant="primary" theme="light" className="h-8" />

        <a
          href="https://cal.com/leventestudio/15min"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackConversion('click_calendar', undefined, 'header')}
          className="hidden md:inline-flex items-center gap-2 px-6 py-3 bg-taupe-900 text-cream-50 rounded-sm hover:bg-taupe-800 transition-colors duration-200 text-sm font-light"
        >
          <Calendar size={18} />
          Ingyenes konzultáció
        </a>

        <a
          href="tel:+36202826843"
          onClick={() => trackConversion('click_phone', undefined, 'header')}
          className="md:hidden inline-flex items-center gap-2 text-taupe-700 hover:text-taupe-900 transition-colors duration-200 text-sm font-light"
        >
          <Phone size={16} />
          +36 20 282 6843
        </a>
      </div>
    </header>
  );
}
