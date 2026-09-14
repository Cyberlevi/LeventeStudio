export default function TrustBar() {
  const signals = [
    ['Saját projektek', 'Valós üzleti környezetben tesztelve'],
    ['Mérhető funnel', 'Forgalomtól a leadig követhető'],
    ['Modern stack', 'Gyors, karbantartható alapok'],
    ['Folyamatos javítás', 'Adatok alapján, nem megérzésből']
  ];

  return (
    <section className="py-12 px-6 bg-taupe-50 border-y border-taupe-200">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {signals.map(([title, description]) => (
            <div className="text-center" key={title}>
              <div className="text-xl md:text-2xl font-normal text-taupe-900 mb-2">{title}</div>
              <div className="text-sm text-taupe-600 font-light">{description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
