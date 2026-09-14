import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="px-6 py-12 pb-24 md:pb-12 bg-taupe-900 border-t border-taupe-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-6">
          <Logo variant="primary" theme="dark" className="h-8" />
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="max-w-xl text-cream-300 text-sm font-light leading-relaxed">
              AI-native digitális ügyfélszerző rendszerek szolgáltató vállalkozásoknak — web, SEO, mérés, leadkezelés és automatizálás egy rendszerben.
            </p>
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm" aria-label="Jogi és adatvédelmi linkek">
              <a
                href="/adatvedelem/"
                className="text-cream-300 hover:text-cream-100 transition-colors font-light"
              >
                Adatvédelmi Tájékoztató
              </a>
              <a
                href="/suti-szabalyzat/"
                className="text-cream-300 hover:text-cream-100 transition-colors font-light"
              >
                Süti Szabályzat
              </a>
              <button
                type="button"
                data-cookie-settings
                className="text-cream-300 hover:text-cream-100 transition-colors font-light cursor-pointer"
              >
                Süti Beállítások
              </button>
              <a
                href="/jogi-informaciok/"
                className="text-cream-300 hover:text-cream-100 transition-colors font-light"
              >
                Jogi Információk
              </a>
            </nav>
            <p className="text-cream-200 text-sm font-light">
              © {new Date().getFullYear()} Levente Studio
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
