import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="px-6 py-12 pb-24 md:pb-12 bg-taupe-900 border-t border-taupe-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-6">
          <Logo variant="primary" theme="dark" className="h-8" />
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="text-cream-300 text-xs font-light max-w-md">
              Ez az oldal nem használ sütiket és nem végez felhasználói adatgyűjtést.
            </p>
            <p className="text-cream-200 text-sm font-light">
              {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
