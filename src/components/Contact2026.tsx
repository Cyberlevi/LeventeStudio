import { ArrowUpRight, Mail, Phone } from 'lucide-react';

interface Props {
  sectionId?: string | null;
}

export default function Contact2026({ sectionId = 'kapcsolat' }: Props) {
  return (
    <section id={sectionId ?? undefined} className="scroll-mt-24 bg-graphite-950 px-5 py-16 pb-28 text-ivory-100 sm:px-6 md:pb-16 lg:px-8">
      <div className="mx-auto flex max-w-[86rem] flex-col gap-7 border-t border-white/15 pt-8 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-serif text-3xl font-light tracking-editorial sm:text-4xl">Beszéljünk közvetlenül.</h2>
          <p className="mt-3 text-sm text-ivory-400">Tarnóczi Levente · tervezés és weboldalkészítés</p>
        </div>
        <div className="flex flex-col gap-3 md:min-w-[21rem]">
          <a href="/kapcsolat/#diagnosztika" data-track-cta="Ajánlatot kérek" data-track-location="contact_section" className="signal-button-primary justify-center">Ajánlatot kérek <ArrowUpRight size={17} aria-hidden="true" /></a>
          <div className="grid gap-1 sm:grid-cols-2 sm:gap-3 md:grid-cols-1">
          <a href="mailto:hello@leventestudio.app" data-track-cta="Email" data-track-location="contact_section" className="inline-flex min-h-11 items-center gap-3 text-base hover:text-signal-300">
            <Mail size={18} aria-hidden="true" />hello@leventestudio.app <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <a href="tel:+36202826843" data-track-event="phone_click" data-track-location="contact_section" className="inline-flex min-h-11 items-center gap-3 text-base text-ivory-300 hover:text-signal-300">
            <Phone size={18} aria-hidden="true" />+36 20 282 6843
          </a>
          </div>
        </div>
      </div>
    </section>
  );
}
