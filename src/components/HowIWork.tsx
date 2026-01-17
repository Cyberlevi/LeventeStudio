export default function HowIWork() {
  const steps = [
    'Elemzés',
    'Diagnózis',
    'Javítás',
    'Egyszerűsítés',
    'Automatizálás'
  ];

  return (
    <section className="px-6 py-24 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-light text-taupe-900 mb-16 text-center">
          Hogyan dolgozom
        </h2>

        <div className="grid md:grid-cols-5 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 rounded-full bg-taupe-100 flex items-center justify-center mx-auto mb-4 text-taupe-700 font-light text-lg">
                {index + 1}
              </div>
              <p className="text-taupe-700 font-light">{step}</p>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto space-y-6 text-taupe-700 font-light leading-relaxed">
          <p>
            Nem kezdem azzal, hogy "mit szeretnél". Először megnézem az adatokat: mit mutat a Google Analytics, a Search Console, a heatmap. Aztán a kódot: hogyan van megírva, mit lassít, mi törik el. Aztán azt, amit a felhasználó lát: mobilon, desktopon, különböző böngészőkben.
          </p>
          <p>
            Csak utána nyúlok hozzá. Nem találgatásból, hanem mert látom, mi a probléma. Minden beavatkozás mögött van adat, van ok, van cél. Javítok, amit javítani kell. Egyszerűsítem, amit túlbonyolítottak. Automatizálom, amit felesleges kézzel csinálni.
          </p>
          <p className="font-normal text-taupe-900">
            Ez nem kreatív ötletelés. Ez mérnöki munka.
          </p>
        </div>
      </div>
    </section>
  );
}
