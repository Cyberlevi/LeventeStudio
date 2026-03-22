import { AlertCircle, TrendingDown, Clock, Search } from 'lucide-react';

export default function ProblemAwareness() {
  const problems = [
    {
      icon: Clock,
      title: 'Lassú oldal',
      description: 'Sokáig tölt be, a látogató nem vár. A Google sem szereti.'
    },
    {
      icon: Search,
      title: 'Nem találják meg',
      description: 'Ha rákeresnek a szolgáltatásodra, te nem jössz fel. A konkurencia előrébb van.'
    },
    {
      icon: TrendingDown,
      title: 'Nem hoz ügyfelet',
      description: 'Van látogató, de senki nem hív, nem ír. A weboldal csak "ott van".'
    },
    {
      icon: AlertCircle,
      title: 'Mobilon használhatatlan',
      description: 'A látogatók 70%-a mobilról nézi. Ha ott rossz, nem működik semmi.'
    }
  ];

  return (
    <section className="px-6 py-24 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-light text-taupe-900 mb-8 text-center">
          Ismerős ez neked?
        </h2>

        <p className="text-xl text-taupe-700 font-light text-center mb-16 max-w-3xl mx-auto">
          Van weboldalad, de nem cseng a telefon. Nem jönnek ügyfelek.
          Négy gyakori probléma, amiért a weboldalak nem működnek:
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <div key={index} className="bg-taupe-50 p-8 rounded-sm border border-taupe-200">
                <Icon size={32} className="text-taupe-700 mb-4" />
                <h3 className="text-2xl font-normal text-taupe-900 mb-3">
                  {problem.title}
                </h3>
                <p className="text-taupe-700 font-light leading-relaxed">
                  {problem.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-cream-50 p-8 md:p-12 rounded-sm border border-taupe-200">
          <p className="text-lg text-taupe-700 font-light leading-relaxed text-center">
            Ha legalább kettőre ráismertél, akkor jó helyen jársz.
            Ezeket a problémákat meg tudjuk oldani.
          </p>
        </div>
      </div>
    </section>
  );
}
