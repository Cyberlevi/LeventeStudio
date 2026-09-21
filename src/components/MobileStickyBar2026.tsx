import { ArrowUpRight, Phone } from 'lucide-react';

interface Props {
  ctaHref?: string;
}

export default function MobileStickyBar2026({ ctaHref = '/kapcsolat/#diagnosztika' }: Props) {
  return (
    <nav
      data-mobile-sticky
      aria-label="Gyors kapcsolat"
      aria-hidden="true"
      className="mobile-sticky-cta pointer-events-none fixed inset-x-0 bottom-0 z-40 translate-y-full border-t border-white/15 bg-graphite-950/95 opacity-0 backdrop-blur-xl transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="grid grid-cols-[.75fr_1.25fr]">
        <a href="tel:+36202826843" tabIndex={-1} data-track-event="phone_click" data-track-location="mobile_sticky_bar" className="flex min-h-14 items-center justify-center gap-2 text-sm text-ivory-100">
          <Phone size={17} aria-hidden="true" />Hívás
        </a>
        <a href={ctaHref} tabIndex={-1} data-track-cta="Ajánlatot kérek" data-track-location="mobile_sticky_bar" className="flex min-h-14 items-center justify-center gap-2 bg-signal-400 px-3 text-sm font-medium text-graphite-950">
          Ajánlatot kérek <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      </div>
    </nav>
  );
}
