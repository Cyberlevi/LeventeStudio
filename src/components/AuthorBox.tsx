export default function AuthorBox() {
  return (
    <div className="bg-cream-50 rounded-sm border border-taupe-200 p-8 my-12">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="flex-shrink-0">
          <img
            src="/levente_studio_portrait_final.webp"
            alt="Tarnóczi Levente"
            className="w-24 h-24 rounded-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex-1">
          <div className="mb-2">
            <span className="text-sm text-taupe-600">Szerző</span>
          </div>
          <h3 className="text-2xl font-normal text-taupe-900 mb-3">
            Tarnóczi Levente
          </h3>
          <p className="text-taupe-700 mb-4 leading-relaxed">
            A Levente Studio digitális rendszerépítője. Webet, SEO-t, mérést, leadkezelést és AI-assisted folyamatokat kötök össze úgy, hogy a rendszer üzletileg is követhető legyen. A módszereket saját éles szolgáltatói projekteken is tesztelem.
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <a
              href="/rolam/"
              className="text-sm text-taupe-900 hover:text-taupe-700 font-normal underline"
            >
              Bővebben rólam
            </a>
            <a
              href="https://github.com/Cyberlevi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-taupe-600 hover:text-taupe-900"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
