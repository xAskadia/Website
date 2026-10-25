import { cn } from '../../lib/cn'

/** Wortbildmarke: Monogramm im Kreis + Name in Versalien. */
export function Logo({ className, light }: { className?: string; light?: boolean }) {
  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <span className={cn('relative grid h-11 w-11 place-items-center rounded-full border font-display text-[1.05rem] italic', light ? 'border-paper/40 text-paper' : 'border-ink/25 text-ink')}>
        A<span className="-ml-0.5 not-italic">R</span>
        <span className="absolute -right-0.5 top-1 h-2 w-2 rounded-full bg-glut" />
      </span>
      <span className="leading-none">
        <span className="block font-display text-[1.02rem] uppercase tracking-[0.16em]">Adelina Rrustolli</span>
        <span className={cn('mt-1.5 block text-[0.6rem] uppercase tracking-[0.34em]', light ? 'text-white/55' : 'text-muted')}>Webdesign · Sichtbarkeit</span>
      </span>
    </span>
  )
}
