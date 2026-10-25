import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { Reveal, SplitText } from './Reveal'

export function SectionHeading({ eyebrow, title, accent, intro, dark, center, className, kicker }: { eyebrow?: string; title: string; accent?: string; intro?: ReactNode; dark?: boolean; center?: boolean; className?: string; kicker?: string }) {
  return (
    <div className={cn('max-w-3xl', center && 'mx-auto text-center', className)}>
      {eyebrow && (
        <Reveal>
          <p className={cn('eyebrow', dark ? 'text-white/55' : 'text-muted')}>{eyebrow}</p>
        </Reveal>
      )}
      {kicker && (
        <Reveal delay={0.05}>
          <p className="script mt-5 -mb-5 text-5xl text-glut">{kicker}</p>
        </Reveal>
      )}
      <h2 className="display-lg mt-5">
        <SplitText text={title} />
        {accent && (
          <>
            {' '}
            <SplitText text={accent} className="serif-accent text-glut" delay={0.15} />
          </>
        )}
      </h2>
      {intro && (
        <Reveal delay={0.15}>
          <div className={cn('lead mt-6', dark ? 'text-white/65' : 'text-muted')}>{intro}</div>
        </Reveal>
      )}
    </div>
  )
}
