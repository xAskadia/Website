import { motion, useTransform } from 'framer-motion'
import { useId, useRef } from 'react'
import { cn } from '../../lib/cn'
import { useScrollProgress } from '../../lib/motion'

/**
 * Generierte, aquarellartige Natur-Szenen als hochwertige Bildplatzhalter.
 * Sie lassen sich später jederzeit durch echte Fotos ersetzen (z. B. <img> in <ArchFrame>).
 * Die Ebenen bewegen sich beim Scrollen unterschiedlich schnell (Parallax).
 */
export type SceneKind = 'hills' | 'sea' | 'meadow' | 'studio' | 'dune' | 'forest'

const palettes: Record<SceneKind, { sky: [string, string]; layers: string[]; sun: string }> = {
  hills: { sky: ['#efe7d8', '#dfe5d5'], layers: ['#c9d3bb', '#a4b294', '#7c8c6e', '#4a5743'], sun: '#e7cfa5' },
  sea: { sky: ['#f2ece1', '#d7e1dc'], layers: ['#b8cbc6', '#8fada8', '#6f918c', '#e8dcc6'], sun: '#efd7b0' },
  meadow: { sky: ['#f4eee3', '#ece2cf'], layers: ['#dccfae', '#c4b48c', '#a49166', '#7c6b45'], sun: '#f0dcb8' },
  studio: { sky: ['#ede6da', '#e3d8c6'], layers: ['#d6c8b0', '#c2b195', '#a8957a', '#857257'], sun: '#f5ead6' },
  dune: { sky: ['#f3e9da', '#ead6bb'], layers: ['#e2c7a2', '#d0ae84', '#b89167', '#9a7443'], sun: '#f7e4c6' },
  forest: { sky: ['#3c4838', '#222a21'], layers: ['#55654d', '#45533f', '#354131', '#222a21'], sun: '#d9c9a2' },
}

const ridge = (base: number, amp: number, seed: number) => {
  let d = `M0 ${base}`
  for (let x = 0; x <= 400; x += 50) {
    const y = base - Math.sin((x + seed * 37) / 70) * amp - Math.cos((x + seed * 13) / 43) * amp * 0.5
    d += ` S ${x - 25} ${y + amp * 0.4}, ${x} ${y}`
  }
  return d + ' L400 500 L0 500 Z'
}

export function Scene({ kind = 'hills', className, parallax = true }: { kind?: SceneKind; className?: string; parallax?: boolean }) {
  const id = useId().replace(/:/g, '')
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScrollProgress({ target: ref, offset: ['start end', 'end start'] })
  const p = palettes[kind]
  const y0 = useTransform(scrollYProgress, [0, 1], parallax ? [-10, 30] : [0, 0])
  const y1 = useTransform(scrollYProgress, [0, 1], parallax ? [20, -10] : [0, 0])
  const y2 = useTransform(scrollYProgress, [0, 1], parallax ? [40, -25] : [0, 0])
  const y3 = useTransform(scrollYProgress, [0, 1], parallax ? [60, -40] : [0, 0])
  const ys = [y0, y1, y2, y3]

  return (
    <div ref={ref} className={cn('relative h-full w-full overflow-hidden', className)} aria-hidden="true">
      <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id={`sky-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={p.sky[0]} />
            <stop offset="1" stopColor={p.sky[1]} />
          </linearGradient>
          <filter id={`wc-${id}`} x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="3" seed="4" />
            <feDisplacementMap in="SourceGraphic" scale="14" />
          </filter>
          <filter id={`grain-${id}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix values="0 0 0 0 0.2  0 0 0 0 0.18  0 0 0 0 0.12  0 0 0 0.09 0" />
          </filter>
        </defs>
        <rect width="400" height="500" fill={`url(#sky-${id})`} />
        <motion.circle cx={kind === 'studio' ? 300 : 280} cy={kind === 'sea' ? 190 : 150} r={kind === 'studio' ? 120 : 52} fill={p.sun} style={{ y: y0 }} filter={`url(#wc-${id})`} opacity={kind === 'studio' ? 0.6 : 0.95} />

        {kind === 'sea' ? (
          <g filter={`url(#wc-${id})`}>
            <motion.path d="M0 250 L400 250 L400 500 L0 500 Z" fill={p.layers[0]} style={{ y: y1 }} />
            <motion.path d={ridge(300, 8, 2)} fill={p.layers[1]} style={{ y: y2 }} />
            <motion.path d="M0 400 C 80 380, 140 420, 220 400 S 340 370, 400 390 L400 500 L0 500 Z" fill={p.layers[3]} style={{ y: y3 }} />
          </g>
        ) : kind === 'studio' ? (
          <g>
            <motion.rect x="0" y="360" width="400" height="140" fill={p.layers[1]} style={{ y: y2 }} filter={`url(#wc-${id})`} />
            <motion.g style={{ y: y2 }} fill="none" stroke="#4a5743" strokeWidth="1.6" strokeLinecap="round">
              <rect x="110" y="250" width="150" height="100" rx="6" fill="#f4efe6" />
              <path d="M95 352 h180 l-12 10 h-156 Z" fill="#e5d6bd" />
              <rect x="122" y="262" width="126" height="76" rx="2" fill="#dbe2d2" stroke="none" />
              <path d="M134 280 h60 M134 292 h80 M134 304 h40" stroke="#4a5743" />
              <circle cx="226" cy="315" r="12" fill="#9a7443" stroke="none" opacity=".8" />
            </motion.g>
            <motion.g style={{ y: y1 }} fill="none" stroke="#4a5743" strokeWidth="1.4" strokeLinecap="round">
              <path d="M320 360 c-8-40 -8-60 0-90 c8 30 8 50 0 90 Z" fill="#c9b99c" />
              <path d="M320 272 C 300 230, 290 200, 300 160 M320 272 C 336 226, 350 200, 344 150 M320 272 C 318 220, 324 190, 322 140" />
              <path d="M300 160 c-14-6 -20-18 -18-30 c12 6 18 16 18 30 Z M344 150 c12-8 22-10 30-6 c-6 10 -18 12 -30 6 Z M322 140 c-6-14 -4-26 4-34 c6 12 4 24 -4 34 Z" fill="#a4b294" />
            </motion.g>
          </g>
        ) : (
          <g filter={`url(#wc-${id})`}>
            {p.layers.map((c, i) => (
              <motion.path key={i} d={ridge(260 + i * 55, 18 + i * 6, i + kind.length)} fill={c} style={{ y: ys[i] }} opacity={0.95} />
            ))}
          </g>
        )}

        {(kind === 'meadow' || kind === 'hills') && (
          <motion.g style={{ y: y3 }} stroke={kind === 'meadow' ? '#7c6b45' : '#354131'} strokeWidth="1.2" fill="none" strokeLinecap="round">
            {Array.from({ length: 22 }, (_, i) => {
              const x = 8 + i * 18 + (i % 3) * 4
              const h = 60 + ((i * 37) % 50)
              return (
                <g key={i}>
                  <path d={`M${x} 500 C ${x + 4} ${500 - h / 2}, ${x - 4} ${500 - h * 0.7}, ${x + 2} ${500 - h}`} />
                  {i % 3 === 0 && <circle cx={x + 2} cy={500 - h} r="4" fill={kind === 'meadow' ? '#f4efe6' : '#e5d6bd'} stroke="none" />}
                </g>
              )
            })}
          </motion.g>
        )}
        {kind === 'sea' &&
          [0, 1, 2].map((i) => <path key={i} d={`M${60 + i * 90} ${330 + i * 22} q 12 -8 24 0 t 24 0`} stroke="#f4efe6" strokeWidth="1.4" fill="none" opacity=".8" />)}
        {kind === 'forest' && <circle cx="300" cy="120" r="3" fill="#f4efe6" opacity=".7" />}
        <rect width="400" height="500" filter={`url(#grain-${id})`} />
      </svg>
    </div>
  )
}
