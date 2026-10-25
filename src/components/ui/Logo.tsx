import { cn } from '../../lib/cn'

/** Wortbildmarke: Monogramm + Name. */
export function Logo({ className, light }: { className?: string; light?: boolean }) {
  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <span className={cn('relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl text-[0.95rem] font-semibold tracking-tight', light ? 'bg-white text-ink' : 'bg-ink text-white')}>
        ar
        <span className="supergraphic absolute inset-x-0 bottom-0 h-[3px]" />
      </span>
      <span className="leading-none">
        <span className="block text-[1.02rem] font-semibold tracking-tight">Adelina Rrustolli</span>
        <span className={cn('mt-1 block text-[0.72rem]', light ? 'text-white/60' : 'text-muted')}>Websites, die wirken</span>
      </span>
    </span>
  )
}
