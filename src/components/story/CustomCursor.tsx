import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

/** Dezenter Messing-Cursor, der über Links und Buttons wächst. Nur bei Maus-Bedienung. */
export function CustomCursor() {
  const reduce = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [hover, setHover] = useState(false)
  const [label, setLabel] = useState('')
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 })

  useEffect(() => {
    if (reduce || !window.matchMedia('(pointer: fine)').matches) return
    setEnabled(true)
    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const t = (e.target as HTMLElement).closest?.('a, button, [role="slider"], [data-cursor]') as HTMLElement | null
      setHover(!!t)
      setLabel(t?.dataset.cursor ?? '')
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [reduce, x, y])

  if (!enabled) return null
  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[150] grid place-items-center rounded-full border border-glut text-[10px] font-medium uppercase tracking-[0.2em] text-paper"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      animate={{ width: label ? 92 : hover ? 54 : 18, height: label ? 92 : hover ? 54 : 18, backgroundColor: label ? 'rgba(154,116,67,0.95)' : hover ? 'rgba(154,116,67,0.12)' : 'rgba(154,116,67,0)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      aria-hidden="true"
    >
      {label}
    </motion.div>
  )
}
