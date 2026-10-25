import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { Reveal } from './Reveal'

export function SectionHeading({ eyebrow, title, accent, intro, dark, center, className }: { eyebrow?: string; title: string; accent?: string; intro?: ReactNode; dark?: boolean; center?: boolean; className?: string }) {
  return (
    <Reveal className={cn('max-w-3xl', center && 'mx-auto text-center', className)}>
      {eyebrow && <p className={cn('eyebrow', dark ? 'text-white/55' : 'text-muted')}>{eyebrow}</p>}
      <h2 className="display-lg mt-5">
        {title} {accent && <span className="serif-accent text-glut">{accent}</span>}
      </h2>
      {intro && <div className={cn('lead mt-6', dark ? 'text-white/65' : 'text-muted')}>{intro}</div>}
    </Reveal>
  )
}
