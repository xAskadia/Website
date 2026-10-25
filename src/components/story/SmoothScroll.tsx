import Lenis from 'lenis'
import { useEffect } from 'react'
import { useLocation } from 'react-router'

let lenis: Lenis | null = null
export const getLenis = () => lenis

/** Weiches, träges Scrollen (Lenis). Deaktiviert bei reduzierter Bewegung und auf Touch-Geräten. */
export function SmoothScroll() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true })
    ;(window as unknown as { __lenis?: Lenis }).__lenis = lenis
    let raf = 0
    const loop = (time: number) => {
      lenis?.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis?.destroy()
      lenis = null
      delete (window as unknown as { __lenis?: Lenis }).__lenis
    }
  }, [])
  useEffect(() => {
    lenis?.resize()
  }, [pathname])
  return null
}
