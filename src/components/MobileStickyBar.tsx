import { Phone, Calendar } from 'lucide-react';
import { trackConversion } from '../utils/gtm';

export default function MobileStickyBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-cream-50 border-t border-taupe-200 shadow-lg">
      <div className="grid grid-cols-2 gap-0">
        <a
          href="tel:+36202826843"
          onClick={() => trackConversion('click_phone', undefined, 'sticky_bar')}
          className="flex items-center justify-center gap-2 py-4 bg-taupe-700 text-cream-50 hover:bg-taupe-800 transition-colors duration-200 active:bg-taupe-900"
        >
          <Phone size={20} />
          <span className="font-light">Hívás</span>
        </a>

        <a
          href="https://cal.com/leventestudio/15min"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackConversion('click_calendar', undefined, 'sticky_bar')}
          className="flex items-center justify-center gap-2 py-4 bg-taupe-900 text-cream-50 hover:bg-taupe-800 transition-colors duration-200 active:bg-taupe-700"
        >
          <Calendar size={20} />
          <span className="font-light">Időpont</span>
        </a>
      </div>
    </div>
  );
}
