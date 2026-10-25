import { motion, useTransform } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { useScrollProgress } from '../../lib/motion'

/**
 * Bogenförmiger Bildrahmen mit Enthüllungs-Animation (wächst von unten)
 * und leichtem Zoom beim Scrollen. Optional mit versetzter Messing-Kontur.
 */
export function ArchFrame({ children, className, outline = true, delay = 0, shape = 'arch' }: { children: ReactNode; className?: string; outline?: boolean; delay?: number; shape?: 'arch' | 'circle' | 'rect' }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScrollProgress({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1])
  const radius = shape === 'arch' ? '999px 999px 1.25rem 1.25rem' : shape === 'circle' ? '999px' : '1.25rem'
  return (
    <div ref={ref} className={cn('relative', className)}>
      {outline && (
        <motion.div
          className="pointer-events-none absolute inset-0 border border-glut/60"
          style={{ borderRadius: radius }}
          initial={{ opacity: 0, x: 0, y: 0 }}
          whileInView={{ opacity: 1, x: 14, y: -14 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 1.2, delay: delay + 0.5, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        />
      )}
      <motion.div
        className="relative h-full w-full overflow-hidden"
        style={{ borderRadius: radius }}
        initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 1.4, delay, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.div className="h-full w-full" style={{ scale }}>
          {children}
        </motion.div>
      </motion.div>
    </div>
  )
}
