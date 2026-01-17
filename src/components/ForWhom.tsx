import { Check, X } from 'lucide-react';

export default function ForWhom() {
  return (
    <section className="px-6 py-24 bg-cream-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-light text-taupe-900 mb-16 text-center">
          Kinek való – és kinek nem
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-sm border border-taupe-200">
            <h3 className="text-2xl font-normal text-taupe-900 mb-6 flex items-center gap-3">
              <Check size={28} className="text-taupe-700" />
              Neked való, ha
            </h3>
            <ul className="space-y-4 text-taupe-700 font-light">
              <li className="flex items-start gap-3">
                <Check size={20} className="text-taupe-400 mt-1 flex-shrink-0" />
                <span>Nem sablont keresel, hanem egyedi megoldást a valódi problémára</span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={20} className="text-taupe-400 mt-1 flex-shrink-0" />
                <span>Fontos a minőség, és hajlandó vagy érte fizetni</span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={20} className="text-taupe-400 mt-1 flex-shrink-0" />
                <span>Érted az adatokat, és azon alapuló döntéseket akarsz hozni</span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={20} className="text-taupe-400 mt-1 flex-shrink-0" />
                <span>Hosszú távra tervezel, nem gyors megoldást keresel</span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={20} className="text-taupe-400 mt-1 flex-shrink-0" />
                <span>Komoly üzleti problémád van, ami pénzbe kerül</span>
              </li>
            </ul>
          </div>

          <div className="bg-taupe-50 p-8 rounded-sm border border-taupe-200">
            <h3 className="text-2xl font-normal text-taupe-900 mb-6 flex items-center gap-3">
              <X size={28} className="text-taupe-500" />
              Nem neked való, ha
            </h3>
            <ul className="space-y-4 text-taupe-700 font-light">
              <li className="flex items-start gap-3">
                <X size={20} className="text-taupe-400 mt-1 flex-shrink-0" />
                <span>Olcsón kell, és az ár fontosabb, mint az eredmény</span>
              </li>
              <li className="flex items-start gap-3">
                <X size={20} className="text-taupe-400 mt-1 flex-shrink-0" />
                <span>Csak legyen valami, mindegy hogy működik-e</span>
              </li>
              <li className="flex items-start gap-3">
                <X size={20} className="text-taupe-400 mt-1 flex-shrink-0" />
                <span>A szomszéd unokaöccse is megcsinálja ingyen</span>
              </li>
              <li className="flex items-start gap-3">
                <X size={20} className="text-taupe-400 mt-1 flex-shrink-0" />
                <span>Gyors csodát vársz 2 nap alatt</span>
              </li>
              <li className="flex items-start gap-3">
                <X size={20} className="text-taupe-400 mt-1 flex-shrink-0" />
                <span>Nem vagy hajlandó adatokat nézni, csak "érzésre" mész</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
