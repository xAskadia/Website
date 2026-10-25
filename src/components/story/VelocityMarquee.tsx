import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity, wrap } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '../../lib/cn'

/** Riesige Laufschrift, deren Tempo und Richtung auf die Scrollgeschwindigkeit reagiert. */
export function VelocityMarquee({ items, baseVelocity = -3, className, outline }: { items: string[]; baseVelocity?: number; className?: string; outline?: boolean }) {
  const reduce = useReducedMotion()
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 })
  const factor = useTransform(smooth, [-1000, 0, 1000], [-4, 0, 4], { clamp: false })
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`)
  const dir = useRef(1)

  useAnimationFrame((_, delta) => {
    if (reduce) return
    let move = dir.current * baseVelocity * (delta / 1000)
    const f = factor.get()
    if (f < 0) dir.current = -1
    else if (f > 0) dir.current = 1
    move += dir.current * move * f
    baseX.set(baseX.get() + move)
  })

  const row = (
    <span className="flex shrink-0 items-center">
      {items.map((t, i) => (
        <span key={i} className="flex items-center">
          <span className={cn(i % 2 === 1 && 'serif-accent', outline && i % 2 === 0 && 'text-outline')}>{t}</span>
          <svg viewBox="0 0 40 40" className="mx-[0.35em] h-[0.42em] w-[0.42em] text-glut" aria-hidden="true">
            <path d="M20 0 C 22 14, 26 18, 40 20 C 26 22, 22 26, 20 40 C 18 26, 14 22, 0 20 C 14 18, 18 14, 20 0 Z" fill="currentColor" />
          </svg>
        </span>
      ))}
    </span>
  )
  return (
    <div className={cn('overflow-hidden whitespace-nowrap', className)} aria-hidden="true">
      <motion.div className="flex w-max font-display leading-none tracking-[-0.03em]" style={{ x }}>
        {row}
        {row}
      </motion.div>
    </div>
  )
}
