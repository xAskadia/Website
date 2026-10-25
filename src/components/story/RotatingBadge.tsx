import { useId, type ReactNode } from 'react'
import { cn } from '../../lib/cn'

/** Kreisförmig laufender Text – wie ein Siegel oder Stempel. */
export function RotatingBadge({ text, className, children }: { text: string; className?: string; children?: ReactNode }) {
  const id = useId().replace(/:/g, '')
  return (
    <div className={cn('relative grid aspect-square place-items-center', className)} aria-hidden="true">
      <svg viewBox="0 0 200 200" className="animate-spin-slow absolute inset-0 h-full w-full">
        <defs>
          <path id={`c-${id}`} d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text fontSize="13.5" letterSpacing="4.2" fill="currentColor" style={{ fontFamily: 'var(--font-sans)', textTransform: 'uppercase' }}>
          <textPath href={`#c-${id}`}>{text}</textPath>
        </text>
      </svg>
      <div className="relative">{children}</div>
    </div>
  )
}
