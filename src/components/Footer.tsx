import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="px-6 py-12 pb-24 md:pb-12 bg-taupe-900 border-t border-taupe-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-6">
          <Logo variant="primary" theme="dark" className="h-8" />
          <div className="flex flex-col items-center gap-4 text-center">
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              <a
                href="/privacy-policy"
                className="text-cream-300 hover:text-cream-100 transition-colors font-light"
              >
                Adatvédelmi Tájékoztató
              </a>
              <a
                href="/cookie-policy"
                className="text-cream-300 hover:text-cream-100 transition-colors font-light"
              >
                Süti Szabályzat
              </a>
              <a
                href="/legal"
                className="text-cream-300 hover:text-cream-100 transition-colors font-light"
              >
                Jogi Információk
              </a>
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
