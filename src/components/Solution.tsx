import { Check } from 'lucide-react';

export default function Solution() {
  return (
    <section className="px-6 py-24 bg-taupe-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-light text-taupe-900 mb-8 text-center">
          Hogyan csináljuk másképp
        </h2>

        <p className="text-xl text-taupe-700 font-light text-center mb-16 max-w-3xl mx-auto">
          Nem csak megtervezzük. Megépítjük, beindítjuk és megtanítjuk használni.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/50 p-8 rounded-sm border border-taupe-200">
            <h3 className="text-2xl font-normal text-taupe-900 mb-6">
              Hagyományos webfejlesztő
            </h3>
            <div className="space-y-3 text-taupe-700">
              <p className="flex items-start gap-2">
                <span className="text-red-500 mt-1">✗</span>
                <span>Hónapokig tart</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-red-500 mt-1">✗</span>
                <span>Kapsz egy WordPress admin belépést</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-red-500 mt-1">✗</span>
                <span>Utána magadra maradsz</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-red-500 mt-1">✗</span>
                <span>Fókusz: szép design</span>
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-sm border border-blue-200">
            <h3 className="text-2xl font-normal text-taupe-900 mb-6">
              LeventeStudio módszer
            </h3>
            <div className="space-y-3 text-taupe-700">
              <p className="flex items-start gap-2">
                <Check size={20} className="text-green-600 flex-shrink-0 mt-1" />
                <span>5-7 nap és kész</span>
              </p>
              <p className="flex items-start gap-2">
                <Check size={20} className="text-green-600 flex-shrink-0 mt-1" />
                <span>Élő weboldal + videó útmutató</span>
              </p>
              <p className="flex items-start gap-2">
                <Check size={20} className="text-green-600 flex-shrink-0 mt-1" />
                <span>30-90 nap support</span>
              </p>
              <p className="flex items-start gap-2">
                <Check size={20} className="text-green-600 flex-shrink-0 mt-1" />
                <span>Fókusz: ügyfelek, telefonhívások</span>
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-lg text-taupe-700 font-light italic">
            Nem csak dizájner vagyok. Üzleti megközelítésű fejlesztő,<br />
            aki weboldalakat épít, amik hoznak eredményt.
          </p>
        </div>
      </div>
    </section>
  );
}
