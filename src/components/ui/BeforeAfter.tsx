import { useCallback, useRef, useState, type ReactNode } from 'react'

interface Props {
  before: ReactNode
  after: ReactNode
  beforeLabel?: string
  afterLabel?: string
  initial?: number
  className?: string
}

/**
 * Vorher-Nachher-Vergleich. Bedienbar per Ziehen (Maus/Touch), Klick und
 * Tastatur (Pfeiltasten, Pos1/Ende) – als ARIA-Slider ausgezeichnet.
 */
export function BeforeAfter({ before, after, beforeLabel = 'Vorher', afterLabel = 'Nachher', initial = 50, className }: Props) {
  const [pos, setPos] = useState(initial)
  const ref = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const update = useCallback((clientX: number) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)))
  }, [])

  return (
    <div
      ref={ref}
      className={`relative select-none overflow-hidden touch-pan-y ${className ?? ''}`}
      style={{ containerType: 'inline-size' }}
      onPointerDown={(e) => {
        dragging.current = true
        ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
        update(e.clientX)
      }}
      onPointerMove={(e) => dragging.current && update(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <div className="absolute inset-0">{after}</div>
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        {before}
      </div>

      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur" style={{ opacity: pos > 12 ? 1 : 0 }}>
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-glut px-3 py-1 text-xs font-semibold text-white" style={{ opacity: pos < 88 ? 1 : 0 }}>
        {afterLabel}
      </span>

      <div className="absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.15)]" style={{ left: `${pos}%` }}>
        <div
          role="slider"
          tabIndex={0}
          aria-label={`Vergleich ${beforeLabel} und ${afterLabel}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={`${Math.round(pos)} % ${beforeLabel} sichtbar`}
          onKeyDown={(e) => {
            const step = e.shiftKey ? 10 : 4
            if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') setPos((p) => Math.max(0, p - step))
            else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') setPos((p) => Math.min(100, p + step))
            else if (e.key === 'Home') setPos(0)
            else if (e.key === 'End') setPos(100)
            else return
            e.preventDefault()
          }}
          className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full border-4 border-white bg-glut text-white shadow-xl transition-transform hover:scale-110"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
            <path d="m9 6-6 6 6 6M15 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  )
}
