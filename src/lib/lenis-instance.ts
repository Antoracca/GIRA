/**
 * Singleton Lenis instance — shared across components
 * Set by MarketingLayout, used by Navbar pill tabs
 */
let _lenis: { scrollTo: (target: HTMLElement | string | number, opts?: { offset?: number; duration?: number }) => void } | null = null;

export function setLenisInstance(instance: typeof _lenis) {
  _lenis = instance;
}

export function scrollToElement(selector: string, offset = -88) {
  const el = document.querySelector(selector) as HTMLElement | null;
  if (!el) return;
  if (_lenis) {
    _lenis.scrollTo(el, { offset, duration: 1.0 });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
