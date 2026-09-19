const steps = [
  ['01', 'Elmondod, mire van szükséged', 'Röviden megismerem a vállalkozásodat, a szolgáltatásaidat és azt, mit vársz az oldaltól. E-mailben, szükség esetén videóhívásban egyeztetünk.'],
  ['02', 'Rögzítjük a feladatot és az árat', 'Írásos ajánlat készül a tartalomról, a funkciókról, a határidőről és a módosítási körökről. Innen mindketten tudjuk, mi készül.'],
  ['03', 'Megnézed az első változatot', 'Áttekinthető előnézetben mutatom meg az oldalt. Az egyeztetett visszajelzések alapján finomítjuk a szöveget és a megjelenést.'],
  ['04', 'Ellenőrizzük és átadjuk', 'Mobilon is átnézzük, ellenőrizzük a kapcsolatfelvételt, és átbeszéljük a használatot. A domain és a tárhely a te nevedre kerül.'],
];

export default function ProjectProcess() {
  return <section id="folyamat" className="scroll-mt-20 bg-graphite-900 px-5 py-20 text-ivory-100 sm:px-6 md:py-24 lg:px-8"><div className="mx-auto max-w-[86rem]"><p className="mb-4 text-xs uppercase tracking-[.2em] text-signal-300">Így dolgozunk együtt</p><h2 className="max-w-3xl font-serif text-5xl font-light leading-[1.02] tracking-editorial sm:text-6xl">Minden lépésnek megvan a helye.</h2><ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{steps.map(([number,title,description]) => <li key={number} className="border-t border-white/15 pt-5"><span className="text-sm text-signal-400">{number}</span><h3 className="mt-5 text-xl font-medium leading-snug">{title}</h3><p className="mt-4 text-sm leading-relaxed text-ivory-400">{description}</p></li>)}</ol></div></section>;
}
