import { motion, useTransform } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { useScrollProgress } from '../../lib/motion'

/**
 * Karten, die sich beim Scrollen übereinander stapeln: Jede Karte bleibt
 * oben „kleben“, die vorherige wird kleiner und tritt zurück.
 */
export function StackCard({ children, index, total, className }: { children: ReactNode; index: number; total: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScrollProgress({ target: ref, offset: ['start start', 'end start'] })
  const targetScale = 1 - (total - index - 1) * 0.04
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale])
  const brightness = useTransform(scrollYProgress, [0, 1], [1, 0.82])
  const filter = useTransform(brightness, (b) => `brightness(${b})`)
  return (
    <div ref={ref} className="sticky h-[80svh] min-h-[520px]" style={{ top: `calc(5.5rem + ${index * 22}px)` }}>
      <motion.div style={{ scale, filter, transformOrigin: 'top center' }} className={className}>
        {children}
      </motion.div>
    </div>
  )
}
