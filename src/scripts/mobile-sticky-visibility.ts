const sticky = document.querySelector<HTMLElement>('[data-mobile-sticky]');

if (sticky && sticky.dataset.visibilityReady !== 'true') {
  sticky.dataset.visibilityReady = 'true';

  const focusables = Array.from(sticky.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
  const hero = document.querySelector<HTMLElement>('[data-sticky-threshold]');
  const blockers = Array.from(
    document.querySelectorAll<HTMLElement>('#diagnosztika, #kapcsolat, .site-footer'),
  );
  const mobileQuery = window.matchMedia('(max-width: 767px)');
  let visible = false;
  let rafId = 0;

  const setVisible = (next: boolean) => {
    const shouldShow = next && mobileQuery.matches;
    if (shouldShow === visible) return;
    visible = shouldShow;

    sticky.classList.toggle('translate-y-full', !shouldShow);
    sticky.classList.toggle('opacity-0', !shouldShow);
    sticky.classList.toggle('pointer-events-none', !shouldShow);
    sticky.setAttribute('aria-hidden', shouldShow ? 'false' : 'true');

    focusables.forEach((element) => {
      if (shouldShow) element.removeAttribute('tabindex');
      else element.setAttribute('tabindex', '-1');
    });
  };

  const isBlockingZoneVisible = () => {
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    return blockers.some((element) => {
      const rect = element.getBoundingClientRect();
      return rect.top < viewportHeight * 0.88 && rect.bottom > viewportHeight * 0.1;
    });
  };

  const evaluate = () => {
    rafId = 0;

    if (!mobileQuery.matches) {
      setVisible(false);
      return;
    }

    const pastHero = hero
      ? hero.getBoundingClientRect().bottom < Math.min(140, window.innerHeight * 0.18)
      : window.scrollY > Math.max(360, window.innerHeight * 0.72);

    setVisible(pastHero && !isBlockingZoneVisible());
  };

  const requestEvaluate = () => {
    if (!rafId) rafId = requestAnimationFrame(evaluate);
  };

  window.addEventListener('scroll', requestEvaluate, { passive: true });
  window.addEventListener('resize', requestEvaluate, { passive: true });
  mobileQuery.addEventListener?.('change', requestEvaluate);

  requestAnimationFrame(evaluate);

  window.addEventListener(
    'pagehide',
    () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', requestEvaluate);
      window.removeEventListener('resize', requestEvaluate);
      mobileQuery.removeEventListener?.('change', requestEvaluate);
    },
    { once: true },
  );
}
