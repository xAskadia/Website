export const cn = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(' ')

/** Sanft zu einem Abschnitt scrollen (funktioniert auch mit Hash-Routing). */
export const scrollToId = (id: string) => {
  const el = document.getElementById(id)
  if (!el) return
  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement, o?: object) => void } }).__lenis
  if (lenis) {
    lenis.scrollTo(el, { offset: -90 })
    el.focus?.({ preventScroll: true })
    return
  }
  el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  el.focus?.({ preventScroll: true })
}
