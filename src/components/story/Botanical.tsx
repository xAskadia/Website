import { motion, useSpring, useTransform, type MotionValue } from 'framer-motion'
import { useRef, type RefObject } from 'react'
import { cn } from '../../lib/cn'
import { useScrollProgress } from '../../lib/motion'

/**
 * Botanische Linienzeichnungen. Sie „zeichnen“ sich selbst – entweder beim
 * Erscheinen (mode="view") oder gekoppelt an den Scrollfortschritt (mode="scroll").
 * Sinnbild der Marke: Aus einer Linie wächst etwas Lebendiges.
 */
type Kind = 'branch' | 'fern' | 'flower' | 'grass' | 'olive'

const art: Record<Kind, { viewBox: string; stems: string[]; leaves: string[] }> = {
  branch: {
    viewBox: '0 0 200 400',
    stems: ['M100 400 C 98 320, 108 250, 96 170 S 104 60, 112 6'],
    leaves: [
      'M99 330 C 70 318, 52 296, 44 268 C 72 276, 92 296, 99 330 Z',
      'M101 292 C 130 282, 150 262, 160 232 C 132 238, 110 258, 101 292 Z',
      'M98 238 C 68 226, 52 204, 46 176 C 74 186, 92 206, 98 238 Z',
      'M100 196 C 128 186, 146 166, 156 138 C 128 144, 108 164, 100 196 Z',
      'M101 140 C 76 128, 62 108, 58 82 C 82 92, 98 112, 101 140 Z',
      'M104 100 C 126 92, 142 74, 150 50 C 126 56, 110 74, 104 100 Z',
      'M110 40 C 96 30, 90 18, 92 2 C 104 12, 110 24, 110 40 Z',
    ],
  },
  olive: {
    viewBox: '0 0 400 160',
    stems: ['M4 120 C 80 110, 160 90, 240 70 S 360 30, 396 20'],
    leaves: [
      'M60 112 C 70 88, 92 76, 118 76 C 106 98, 86 110, 60 112 Z',
      'M90 104 C 96 128, 116 142, 140 146 C 132 124, 114 108, 90 104 Z',
      'M150 92 C 160 68, 184 56, 210 58 C 196 80, 176 92, 150 92 Z',
      'M186 84 C 194 108, 214 120, 238 122 C 228 100, 210 88, 186 84 Z',
      'M246 68 C 256 44, 278 32, 304 34 C 292 56, 272 68, 246 68 Z',
      'M290 52 C 300 74, 320 84, 344 84 C 332 64, 314 52, 290 52 Z',
      'M350 32 C 358 14, 374 6, 392 8 C 382 24, 368 32, 350 32 Z',
    ],
  },
  fern: {
    viewBox: '0 0 200 400',
    stems: ['M100 400 C 100 300, 96 200, 104 10'],
    leaves: Array.from({ length: 12 }, (_, i) => {
      const y = 360 - i * 28
      const s = 1 - i * 0.065
      const l = `M100 ${y} C ${100 - 30 * s} ${y - 6}, ${100 - 56 * s} ${y - 20}, ${100 - 70 * s} ${y - 40}`
      const r = `M101 ${y - 8} C ${101 + 30 * s} ${y - 14}, ${101 + 56 * s} ${y - 28}, ${101 + 70 * s} ${y - 48}`
      return `${l} ${r}`
    }),
  },
  flower: {
    viewBox: '0 0 200 400',
    stems: ['M100 400 C 104 330, 92 270, 100 180', 'M100 300 C 120 280, 140 270, 160 268'],
    leaves: [
      'M100 120 C 84 120, 76 104, 82 92 C 90 80, 110 80, 118 92 C 124 104, 116 120, 100 120 Z',
      'M100 150 C 70 160, 50 140, 58 118 C 66 100, 90 108, 100 128',
      'M100 150 C 130 160, 150 140, 142 118 C 134 100, 110 108, 100 128',
      'M100 180 C 80 170, 78 150, 100 128 C 122 150, 120 170, 100 180 Z',
      'M98 250 C 70 246, 54 228, 52 206 C 76 210, 94 228, 98 250 Z',
      'M160 268 C 170 256, 178 254, 186 258 C 182 270, 172 274, 160 268 Z',
    ],
  },
  grass: {
    viewBox: '0 0 300 200',
    stems: [
      'M30 200 C 34 150, 26 110, 40 60',
      'M70 200 C 66 140, 80 100, 72 30',
      'M110 200 C 116 160, 104 120, 120 70',
      'M160 200 C 156 150, 170 110, 160 40',
      'M200 200 C 206 150, 194 120, 212 80',
      'M240 200 C 236 160, 250 120, 244 50',
      'M275 200 C 280 170, 270 140, 284 100',
    ],
    leaves: [
      'M40 60 C 36 50, 38 42, 44 36 C 48 44, 46 52, 40 60 Z',
      'M72 30 C 66 22, 68 12, 74 6 C 80 14, 78 22, 72 30 Z',
      'M160 40 C 154 32, 156 22, 162 16 C 168 24, 166 32, 160 40 Z',
      'M244 50 C 238 42, 240 32, 246 26 C 252 34, 250 42, 244 50 Z',
    ],
  },
}

interface Props {
  kind?: Kind
  className?: string
  color?: string
  strokeWidth?: number
  /** "view": zeichnet sich beim Erscheinen. "scroll": folgt dem Scrollfortschritt. */
  mode?: 'view' | 'scroll'
  progress?: MotionValue<number>
  delay?: number
  fill?: boolean
}

export function Botanical({ kind = 'branch', className, color = 'currentColor', strokeWidth = 1.2, mode = 'view', progress, delay = 0, fill = false }: Props) {
  const ref = useRef<SVGSVGElement>(null)
  const { scrollYProgress } = useScrollProgress({ target: ref as unknown as RefObject<HTMLElement>, offset: ['start end', 'center 40%'] })
  const p = useSpring(progress ?? scrollYProgress, { stiffness: 80, damping: 24 })
  const stemLen = useTransform(p, [0, 0.6], [0, 1])
  const leafLen = useTransform(p, [0.25, 1], [0, 1])
  const a = art[kind]
  const scroll = mode === 'scroll'

  const common = { fill: 'none', stroke: color, strokeWidth, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, vectorEffect: 'non-scaling-stroke' as const }

  return (
    <svg ref={ref} viewBox={a.viewBox} className={cn('overflow-visible', className)} aria-hidden="true">
      {a.stems.map((d, i) =>
        scroll ? (
          <motion.path key={d} d={d} {...common} style={{ pathLength: stemLen }} />
        ) : (
          <motion.path key={d} d={d} {...common} initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, margin: '-10%' }} transition={{ duration: 1.6, delay: delay + i * 0.2, ease: [0.65, 0, 0.35, 1] }} />
        ),
      )}
      {a.leaves.map((d, i) =>
        scroll ? (
          <motion.path key={i} d={d} {...common} fill={fill ? color : 'none'} fillOpacity={fill ? 0.12 : 0} style={{ pathLength: leafLen }} />
        ) : (
          <motion.path
            key={i}
            d={d}
            {...common}
            fill={fill ? color : 'none'}
            initial={{ pathLength: 0, fillOpacity: 0 }}
            whileInView={{ pathLength: 1, fillOpacity: fill ? 0.12 : 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1.1, delay: delay + 0.6 + i * 0.12, ease: [0.65, 0, 0.35, 1] }}
          />
        ),
      )}
    </svg>
  )
}
