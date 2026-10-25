import { site } from '../../content/site'
import { cn } from '../../lib/cn'

/**
 * Porträt von Adelina. Solange in site.ts kein Bild hinterlegt ist,
 * erscheint ein gestalteter, klar gekennzeichneter Platzhalter.
 */
export function Portrait({ className, eager, label = true }: { className?: string; eager?: boolean; label?: boolean }) {
  if (site.portrait.src) {
    return (
      <img
        src={site.portrait.src}
        alt={site.portrait.alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className={cn('h-full w-full object-cover', className)}
      />
    )
  }
  return (
    <div className={cn('relative h-full w-full overflow-hidden bg-gradient-to-b from-[#3a3046] via-[#2a2333] to-ink', className)} role="img" aria-label="Platzhalter für das Porträt von Adelina Rrustolli">
      <svg viewBox="0 0 400 500" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <defs>
          <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#e7d3b0" stopOpacity=".55" />
            <stop offset="1" stopColor="#e4572e" stopOpacity=".25" />
          </linearGradient>
        </defs>
        <circle cx="300" cy="110" r="70" fill="#e4572e" opacity=".22" />
        <path d="M200 120c46 0 76 36 76 84s-30 92-76 92-76-44-76-92 30-84 76-84Z" fill="url(#pg)" />
        <path d="M54 500c8-110 70-170 146-170s138 60 146 170Z" fill="url(#pg)" />
      </svg>
      {label && (
        <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/15 bg-black/30 p-3 text-center text-[11px] leading-snug text-white/80 backdrop-blur-md">
          <strong className="block text-xs text-white">Platz für dein Porträt</strong>
          Bild in <code className="text-sand">src/content/site.ts</code> eintragen
        </div>
      )}
    </div>
  )
}
