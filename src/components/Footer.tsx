import Logo from './Logo';
import { navigate } from '../utils/navigation';

export default function Footer() {
  return (
    <footer className="px-6 py-12 pb-24 md:pb-12 bg-taupe-900 border-t border-taupe-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-6">
          <Logo variant="primary" theme="dark" className="h-8" />
          <div className="flex flex-col items-center gap-4 text-center">
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              <button
                onClick={() => navigate('/privacy-policy')}
                className="text-cream-300 hover:text-cream-100 transition-colors font-light cursor-pointer"
              >
                Adatvédelmi Tájékoztató
              </button>
              <button
                onClick={() => navigate('/cookie-policy')}
                className="text-cream-300 hover:text-cream-100 transition-colors font-light cursor-pointer"
              >
                Süti Szabályzat
              </button>
              <button
                onClick={() => navigate('/legal')}
                className="text-cream-300 hover:text-cream-100 transition-colors font-light cursor-pointer"
              >
                Jogi Információk
              </button>
            </nav>
            <p className="text-cream-200 text-sm font-light">
              © {new Date().getFullYear()} Levente Stúdió
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
