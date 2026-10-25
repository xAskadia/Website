export const cn = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(' ')

/** Sanft zu einem Abschnitt scrollen (funktioniert auch mit Hash-Routing). */
export const scrollToId = (id: string) => {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  el.focus?.({ preventScroll: true })
}
