import { cn } from '../../lib/cn'

/** Wortbildmarke: Monogramm-Kachel + Name. */
export function Logo({ className, light }: { className?: string; light?: boolean }) {
  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <span className={cn('relative grid h-10 w-10 place-items-center rounded-[14px] font-display text-[1.05rem] font-bold tracking-tight', light ? 'bg-paper text-ink' : 'bg-ink text-paper')}>
        ar
        <span className="absolute right-[7px] top-[7px] h-[7px] w-[7px] rounded-full bg-glut" />
      </span>
      <span className="leading-none">
        <span className="block font-display text-[1.05rem] font-semibold tracking-tight">Adelina Rrustolli</span>
        <span className={cn('mt-1 block text-[0.68rem] uppercase tracking-[0.2em]', light ? 'text-white/55' : 'text-muted')}>Webdesign · Sichtbarkeit</span>
      </span>
    </span>
  )
}
