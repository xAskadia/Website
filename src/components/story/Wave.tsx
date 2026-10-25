import { cn } from '../../lib/cn'

/** Organischer Übergang zwischen zwei Abschnitten. `color` = Farbe des folgenden Abschnitts. */
export function Wave({ color = 'var(--color-paper)', flip, className, variant = 1 }: { color?: string; flip?: boolean; className?: string; variant?: 1 | 2 | 3 }) {
  const d = {
    1: 'M0 60 C 160 10, 320 10, 480 40 S 800 90, 960 50 S 1280 0, 1440 30 L1440 100 L0 100 Z',
    2: 'M0 40 C 240 90, 480 0, 720 40 S 1200 90, 1440 20 L1440 100 L0 100 Z',
    3: 'M0 70 C 300 70, 400 10, 720 20 S 1180 80, 1440 50 L1440 100 L0 100 Z',
  }[variant]
  return (
    <div className={cn('pointer-events-none relative z-10 -mt-px h-[6vw] min-h-10 w-full', flip && 'rotate-180', className)} aria-hidden="true">
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <path d={d} fill={color} />
      </svg>
    </div>
  )
}
