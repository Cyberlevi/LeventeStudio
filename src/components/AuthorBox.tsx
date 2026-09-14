export default function AuthorBox() {
  return (
    <div className="my-12 border-y border-graphite-950/10 py-8 sm:py-10">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <div className="flex-shrink-0">
          <div className="relative">
            <img
              src="/levente_studio_portrait_final.webp"
              alt="Tarnóczi Levente"
              className="h-24 w-24 rounded-full border border-graphite-950/10 object-cover grayscale"
              loading="lazy"
              decoding="async"
              width="96"
              height="96"
            />
            <span className="absolute -bottom-1 -right-1 signal-dot" aria-hidden="true" />
          </div>
        </div>
        <div className="flex-1">
          <div className="mb-2 text-[10px] uppercase tracking-[0.18em] text-graphite-500">Szerző · rendszerépítő</div>
          <h3 className="mb-3 font-serif text-3xl font-light tracking-editorial text-graphite-950">Tarnóczi Levente</h3>
          <p className="mb-5 max-w-2xl leading-relaxed text-graphite-600">
            A Levente Studio digitális rendszerépítője. Webet, SEO-t, mérést, leadkezelést és AI-assisted folyamatokat kötök össze úgy, hogy a rendszer üzletileg is követhető legyen. A módszereket saját éles szolgáltatói projekteken is tesztelem.
          </p>
          <div className="flex flex-wrap items-center gap-5 text-sm">
            <a href="/rolam/" className="border-b-2 border-signal-500 pb-1 font-medium text-graphite-950 hover:border-graphite-950">Bővebben rólam</a>
            <a href="https://github.com/Cyberlevi" target="_blank" rel="noopener noreferrer" className="text-graphite-500 hover:text-graphite-950">GitHub</a>
          </div>
        </div>
      </div>
    </div>
  );
}
