import { Phone } from 'lucide-react';
import Logo from './Logo';
import { trackConversion } from '../utils/gtm';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream-50/95 backdrop-blur-sm border-b border-taupe-100">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Logo variant="primary" theme="light" className="h-8" />

        <a
          href="tel:+36202826843"
          onClick={() => trackConversion('click_phone', undefined, 'header')}
          className="inline-flex items-center gap-2 px-6 py-2 bg-taupe-700 text-cream-50 rounded-sm hover:bg-taupe-800 transition-colors duration-200 text-sm"
        >
          <Phone size={16} />
          Hívás
        </a>
      </div>
    </header>
  );
}
