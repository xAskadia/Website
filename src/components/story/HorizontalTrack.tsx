import { motion, useTransform } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useScrollProgress } from '../../lib/motion'

/**
 * Horizontaler Scroll-Abschnitt: Beim vertikalen Scrollen gleitet die Reihe
 * seitwärts durch das Bild. Auf kleinen Bildschirmen normales Wischen.
 */
export function HorizontalTrack({ children, header, className }: { children: ReactNode; header?: ReactNode; className?: string }) {
  const section = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const measure = () => {
      const on = window.matchMedia('(min-width: 768px) and (prefers-reduced-motion: no-preference)').matches
      setEnabled(on)
      if (track.current) setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth + 48))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const { scrollYProgress } = useScrollProgress({ target: section, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -distance])
  const progressW = useTransform(scrollYProgress, [0.05, 0.95], ['0%', '100%'])

  if (!enabled) {
    return (
      <section className={className}>
        {header}
        <div className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6">{children}</div>
      </section>
    )
  }
  return (
    <section ref={section} className={className} style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        {header}
        <motion.div ref={track} style={{ x }} className="mt-12 flex w-max gap-8 pl-[max(1.25rem,calc((100vw-1320px)/2+3rem))] pr-12">
          {children}
        </motion.div>
        <div className="container-x mt-10">
          <div className="h-px w-full bg-current/15">
            <motion.div className="h-px bg-glut" style={{ width: progressW }} />
          </div>
        </div>
      </div>
    </section>
  )
}
