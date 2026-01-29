import { CheckCircle2, FileText, BarChart3, Zap, Target, Shield, Lock } from 'lucide-react';

export default function AuditDeliverables() {
  const deliverables = [
    {
      icon: FileText,
      title: 'Részletes audit dokumentáció',
      description: 'Minden megtalált probléma, prioritási sorrendben. Technikai hibák, SEO problémák, UX akadályok.'
    },
    {
      icon: BarChart3,
      title: 'Teljesítmény elemzés',
      description: 'PageSpeed, Core Web Vitals, betöltési idő mobilon és desktopon. Mérések, nem találgatás.'
    },
    {
      icon: Target,
      title: 'SEO technikai audit',
      description: 'Meta tagek, strukturált adatok, sitemap, robots.txt, indexelés. Mi látszik a Google-nek, mi nem.'
    },
    {
      icon: Zap,
      title: 'Konverziós gátló pontok',
      description: 'Hol vesznek el az emberek. Heatmap, Analytics, felhasználói útvonal. Adatokkal.'
    },
    {
      icon: CheckCircle2,
      title: 'Javítási ütemterv',
      description: 'Mit kell javítani először, mit később. Prioritás, hatás, bonyolultság. Lépésről lépésre.'
    },
    {
      icon: Lock,
      title: 'Biztonsági sebezhetőségek',
      description: 'SQL injection, XSS, CSRF, elavult szoftverek, gyenge konfiguráció. Minden biztonsági rés súlyossági szinttel.'
    },
    {
      icon: Shield,
      title: 'Ajánlás további lépésekre',
      description: 'Ha a javítás kész, mi jön utána. Hirdetés, SEO kampány, konverziós teszt. Következő szint.'
    }
  ];

  return (
    <section className="px-6 py-24 bg-cream-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-light text-taupe-900 mb-8 text-center">
          Mit kapsz a Weboldal Auditban
        </h2>

        <p className="text-xl text-taupe-700 font-light text-center mb-16 max-w-3xl mx-auto">
          Nem egy 10 oldalas semmitmondó PDF. Hanem konkrét problémák, konkrét javítások, konkrét ütemterv.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {deliverables.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="bg-white p-8 rounded-sm border border-taupe-200">
                <Icon size={32} className="text-taupe-700 mb-4" />
                <h3 className="text-xl font-normal text-taupe-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-taupe-700 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="bg-taupe-900 text-cream-50 p-8 md:p-12 rounded-sm">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-light mb-6 text-center">
              Mennyi időt vesz igénybe?
            </h3>
            <div className="space-y-4 text-cream-100 font-light">
              <p className="text-center">
                Egy átlagos weboldal auditja <span className="text-cream-50 font-normal">5-7 munkanap</span>.
                Nagyobb rendszereknél (e-commerce, több nyelv, sok oldal) 10-14 nap.
              </p>
              <p className="text-center">
                A dokumentáció átadása után közösen átbeszéljük az eredményeket.
                Kérdések, magyarázat, prioritások – amíg nem érted, addig magyarázom.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-taupe-700 font-light mb-8">
            <span className="font-normal text-taupe-900">Ár: 150.000–300.000 Ft</span>
            <br />
            (a weboldal méretétől és összetettségétől függően)
          </p>
          <p className="text-taupe-600 font-light text-sm">
            Az első 15 perces konzultáció ingyenes. Megbeszéljük az igényeket, megmondom a pontos árat.
          </p>
        </div>
      </div>
    </section>
  );
}
