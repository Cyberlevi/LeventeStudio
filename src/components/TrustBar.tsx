export default function TrustBar() {
  return (
    <section className="py-12 px-6 bg-taupe-50 border-y border-taupe-200">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-normal text-taupe-900 mb-2">5-7 nap</div>
            <div className="text-sm text-taupe-600">Gyors átfutás</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-normal text-taupe-900 mb-2">SEO</div>
            <div className="text-sm text-taupe-600">Google-barát felépítés</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-normal text-taupe-900 mb-2">Mobilbarát</div>
            <div className="text-sm text-taupe-600">Minden eszközön tökéletes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-normal text-taupe-900 mb-2">Kisvállalkozásoknak</div>
            <div className="text-sm text-taupe-600">Egyszerű, érthető, hatékony</div>
          </div>
        </div>
      </div>
    </section>
  );
}
