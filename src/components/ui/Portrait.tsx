import { site } from '../../content/site'
import { cn } from '../../lib/cn'

/**
 * Porträt von Adelina. Solange in site.ts kein Bild hinterlegt ist,
 * erscheint eine gestaltete, klar gekennzeichnete Platzhalter-Illustration.
 */
export function Portrait({ className, eager, label = true }: { className?: string; eager?: boolean; label?: boolean }) {
  if (site.portrait.src) {
    return (
      <img
        src={site.portrait.src}
        srcSet={`${site.portrait.srcSmall} 560w, ${site.portrait.src} 1122w`}
        sizes="(max-width: 640px) 50vw, 440px"
        width={1122}
        height={1402}
        alt={site.portrait.alt}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : undefined}
        decoding="async"
        className={cn('h-full w-full object-cover', className)}
        style={{ objectPosition: site.portrait.focus }}
      />
    )
  }
  return (
    <div className={cn('relative h-full w-full overflow-hidden bg-[#c9d3bb]', className)} role="img" aria-label="Platzhalter für das Porträt von Adelina Rrustolli">
      <svg viewBox="0 0 400 500" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <defs>
          <linearGradient id="pt-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#dfe5d5" />
            <stop offset="1" stopColor="#a4b294" />
          </linearGradient>
          <linearGradient id="pt-fig" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#e9dcc4" />
            <stop offset="1" stopColor="#cdb48e" />
          </linearGradient>
          <filter id="pt-wc">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" seed="7" />
            <feDisplacementMap in="SourceGraphic" scale="10" />
          </filter>
        </defs>
        <rect width="400" height="500" fill="url(#pt-bg)" />
        <circle cx="300" cy="120" r="70" fill="#f1e6d1" opacity=".7" filter="url(#pt-wc)" />
        <g filter="url(#pt-wc)">
          <path d="M200 130c44 0 72 34 72 82s-28 90-72 90-72-42-72-90 28-82 72-82Z" fill="url(#pt-fig)" />
          <path d="M150 170c0-60 40-88 82-80 44 10 60 50 46 110-6-40-26-60-58-64-34-4-58 10-70 34Z" fill="#6b5236" opacity=".85" />
          <path d="M56 500c8-112 70-172 144-172s136 60 144 172Z" fill="#f4efe6" />
          <path d="M120 500c10-70 40-112 80-118 40 6 70 48 80 118Z" fill="#e5d6bd" />
        </g>
        <g stroke="#4a5743" strokeWidth="1.2" fill="none" opacity=".55">
          <path d="M20 500 C 30 420, 18 380, 40 320" />
          <path d="M40 320 c-12-6 -18-18 -14-30 c10 6 16 18 14 30 Z M30 380 c-14 0 -24-10 -26-22 c12 0 22 8 26 22 Z" fill="#8f9e83" fillOpacity=".4" />
        </g>
      </svg>
      {label && (
        <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/40 bg-white/40 p-3 text-center text-[11px] leading-snug text-ink/80 backdrop-blur-md">
          <strong className="block text-xs text-ink">Platz für dein Porträt</strong>
          Bild in <code>src/content/site.ts</code> eintragen
        </div>
      )}
    </div>
  )
}
