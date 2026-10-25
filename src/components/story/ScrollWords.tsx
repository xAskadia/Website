import { motion, useTransform, type MotionValue } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '../../lib/cn'
import { useScrollProgress } from '../../lib/motion'

function Word({ children, progress, range, accent }: { children: string; progress: MotionValue<number>; range: [number, number]; accent?: boolean }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  const y = useTransform(progress, range, [6, 0])
  return (
    <motion.span style={{ opacity, y }} className={cn('inline-block', accent && 'serif-accent text-glut')}>
      {children}
      {' '}
    </motion.span>
  )
}

/**
 * Text, der sich beim Scrollen Wort für Wort „entwickelt“.
 * Wörter in *Sternchen* werden als Akzent hervorgehoben.
 */
export function ScrollWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScrollProgress({ target: ref, offset: ['start 85%', 'end 45%'] })
  const words = text.split(' ')
  const plain = text.replace(/\*/g, '')
  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{plain}</span>
      <span aria-hidden="true">
        {words.map((w, i) => {
          const accent = w.startsWith('*')
          const start = i / words.length
          return (
            <Word key={i} progress={scrollYProgress} range={[start, Math.min(1, start + 2 / words.length)]} accent={accent}>
              {w.replace(/\*/g, '')}
            </Word>
          )
        })}
      </span>
    </p>
  )
}
