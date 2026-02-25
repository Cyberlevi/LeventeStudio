export default function TrustBar() {
  return (
    <section className="py-12 px-6 bg-taupe-50 border-y border-taupe-200">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-normal text-taupe-900 mb-2">50+</div>
            <div className="text-sm text-taupe-600">Sikeres audit</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-normal text-taupe-900 mb-2">65%+</div>
            <div className="text-sm text-taupe-600">Átl. sebesség javulás</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-normal text-taupe-900 mb-2">98%</div>
            <div className="text-sm text-taupe-600">Ügyfél elégedettség</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-normal text-taupe-900 mb-2">5-7 nap</div>
            <div className="text-sm text-taupe-600">Átfutási idő</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-normal text-taupe-900 mb-2">8+ év</div>
            <div className="text-sm text-taupe-600">Szakmai tapasztalat</div>
          </div>
        </div>
      </div>
    </section>
  );
}
