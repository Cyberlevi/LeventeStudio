import { Phone, MessageCircle } from 'lucide-react';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 pt-32 bg-cream-50">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-5xl md:text-7xl font-light text-taupe-900 mb-8 leading-tight text-balance">
          Weboldal audit és SEO szakértő – Technikai optimalizálás Budapest
        </h1>

        <div className="text-lg md:text-xl text-taupe-700 mb-12 font-light max-w-3xl mx-auto space-y-4 text-balance">
          <p>
            Levente Stúdió – független weboldal audit és SEO szakértő Budapesten. Weboldal teljesítmény optimalizálás, technikai SEO audit, UX és konverziós tölcsér javítás. Nem ügynökség, hanem egyéni szakértői műhely adat-alapú megközelítéssel.
          </p>
          <p>
            Ha a weboldal nem konvertál, a Google nem talál, vagy a technikai problémák miatt elvész a forgalom – megnézem, mi nem működik, és rendbe teszem. Elemzés, diagnózis, javítás. Mérnöki munka, nem találgatás.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="tel:+36202826843"
            className="inline-flex items-center gap-3 px-8 py-4 bg-taupe-700 text-cream-50 rounded-sm hover:bg-taupe-800 transition-colors duration-200 text-lg"
          >
            <Phone size={20} />
            Hívás
          </a>

          <a
            href="https://wa.me/36202826843"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 border-2 border-taupe-700 text-taupe-700 rounded-sm hover:bg-taupe-50 transition-colors duration-200 text-lg"
          >
            <MessageCircle size={20} />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
