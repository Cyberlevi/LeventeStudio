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
          <p className="text-taupe-700 mb-4">
            Weboldal audit szakértő 8+ éves webfejlesztői tapasztalattal.
            50+ sikeres audit során átlagosan 65%+ teljesítménynövekedést értem el
            strukturális webes növekedési audit módszertanommal.
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <a
              href="/rolam/"
              className="text-sm text-taupe-900 hover:text-taupe-700 font-normal underline"
            >
              Bővebben rólam
            </a>
            <a
              href="https://www.linkedin.com/in/tarnóczi-levente/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-taupe-600 hover:text-taupe-900 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
