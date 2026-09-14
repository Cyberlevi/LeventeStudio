export default function AuthorBox() {
  return (
    <div className="tech-card-dark my-12 p-6 sm:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        <div className="flex-shrink-0">
          <div className="relative">
            <img src="/levente_studio_portrait_final.webp" alt="Tarnóczi Levente" className="h-24 w-24 rounded-full border border-white/10 object-cover grayscale" loading="lazy" />
            <span className="absolute -bottom-1 -right-1 signal-dot" aria-hidden="true" />
          </div>
        </div>
        <div className="flex-1">
          <div className="mb-2 text-[10px] uppercase tracking-[0.18em] text-signal-400">Author / operator</div>
          <h3 className="mb-3 font-serif text-3xl font-light tracking-editorial text-white">Tarnóczi Levente</h3>
          <p className="mb-5 leading-relaxed text-white/55">
            A Levente Studio digitális rendszerépítője. Webet, SEO-t, mérést, leadkezelést és AI-assisted folyamatokat kötök össze úgy, hogy a rendszer üzletileg is követhető legyen. A módszereket saját éles szolgáltatói projekteken is tesztelem.
          </p>
          <div className="flex flex-wrap items-center gap-5 text-sm">
            <a href="/rolam/" className="border-b border-signal-400 pb-1 text-white hover:text-signal-400">Bővebben rólam</a>
            <a href="https://github.com/Cyberlevi" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white">GitHub</a>
          </div>
        </div>
      </div>
    </div>
  );
}
