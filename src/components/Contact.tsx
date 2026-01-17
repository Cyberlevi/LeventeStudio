import { Phone, MessageCircle } from 'lucide-react';

export default function Contact() {
  return (
    <section className="px-6 py-24 bg-taupe-900 text-cream-50">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-light mb-8">
          Kapcsolat
        </h2>

        <p className="text-xl md:text-2xl font-light mb-12 text-cream-100 max-w-2xl mx-auto text-balance">
          Ha értelmes problémád van, hívj fel.<br />
          Ha nincs, az is rendben van.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="tel:+36202826843"
            className="inline-flex items-center gap-3 px-8 py-4 bg-cream-50 text-taupe-900 rounded-sm hover:bg-cream-100 transition-colors duration-200 text-lg"
          >
            <Phone size={20} />
            +36 20 282 6843
          </a>

          <a
            href="https://wa.me/36202826843"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 border-2 border-cream-50 text-cream-50 rounded-sm hover:bg-taupe-800 transition-colors duration-200 text-lg"
          >
            <MessageCircle size={20} />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
