import { motion } from 'framer-motion'
import { useState, type CSSProperties, type ReactNode } from 'react'
import { cn } from '../../lib/cn'

const palettes = [
  { key: 'erdig', label: 'Warm & erdig', colors: ['#3b2a20', '#c8742b', '#ead7b7', '#faf4ea'] },
  { key: 'frisch', label: 'Frisch & klar', colors: ['#0f2e3d', '#1f9e89', '#bfe8dd', '#f4fbf9'] },
  { key: 'elegant', label: 'Elegant & dunkel', colors: ['#121016', '#c9a46a', '#3a3440', '#f2eee7'] },
  { key: 'mutig', label: 'Mutig & kontrastreich', colors: ['#1b1464', '#ff5a36', '#ffd23f', '#ffffff'] },
  { key: 'sanft', label: 'Sanft & natürlich', colors: ['#3a4a3f', '#9aae8c', '#e8d9c9', '#fbf8f3'] },
] as const

const fonts = [
  { key: 'serif', label: 'Klassisch', sample: 'Serifen', head: 'var(--font-serif)', weight: 400, track: '-0.01em' },
  { key: 'grotesk', label: 'Modern', sample: 'Grotesk', head: 'var(--font-display)', weight: 650, track: '-0.04em' },
  { key: 'rund', label: 'Freundlich', sample: 'Rund', head: 'ui-rounded, "SF Pro Rounded", var(--font-sans)', weight: 700, track: '-0.02em' },
  { key: 'mono', label: 'Technisch', sample: 'Mono', head: 'ui-monospace, "SF Mono", Menlo, monospace', weight: 600, track: '-0.03em' },
] as const

const directions = [
  { key: 'minimal', label: 'Minimalistisch', radius: '4px', shape: 'line' },
  { key: 'verspielt', label: 'Verspielt', radius: '999px', shape: 'blob' },
  { key: 'editorial', label: 'Editorial', radius: '0px', shape: 'block' },
] as const

function Option({ active, onClick, children, label }: { active: boolean; onClick: () => void; children: ReactNode; label: string }) {
  return (
    <button type="button" aria-pressed={active} aria-label={label} onClick={onClick} className={cn('rounded-2xl border p-3 text-left transition', active ? 'border-glut bg-glut/[0.06] ring-2 ring-glut/20' : 'border-ink/10 bg-white hover:border-ink/30')}>
      {children}
    </button>
  )
}

/** Brand-Style-Explorer: Farben, Schrift und Designrichtung live kombinieren. */
export function BrandExplorer() {
  const [p, setP] = useState(0)
  const [f, setF] = useState(1)
  const [d, setD] = useState(0)
  const [name, setName] = useState('Lumen & Co.')
  const pal = palettes[p].colors
  const font = fonts[f]
  const dir = directions[d]
  const [dark, accent, soft, light] = pal

  const head: CSSProperties = { fontFamily: font.head, fontWeight: font.weight, letterSpacing: font.track }
  const brand = name.trim() || 'Deine Marke'
  const initials = brand.replace(/[^A-Za-zÄÖÜäöü ]/g, '').split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase() || 'M'

  const shape =
    dir.shape === 'blob' ? (
      <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true"><path d="M50 6c22 0 42 15 42 40S74 94 48 94 8 76 8 50 28 6 50 6Z" fill={accent} /></svg>
    ) : dir.shape === 'block' ? (
      <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true"><rect x="0" y="0" width="60" height="100" fill={accent} /><rect x="60" y="50" width="40" height="50" fill={soft} /></svg>
    ) : (
      <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true"><circle cx="50" cy="50" r="40" fill="none" stroke={accent} strokeWidth="3" /><path d="M10 50h80" stroke={accent} strokeWidth="3" /></svg>
    )

  const t = { duration: 0.5 }

  return (
    <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
      <div className="space-y-7 rounded-4xl border border-ink/10 bg-paper p-6">
        <div>
          <label htmlFor="brand-name" className="mb-3 block text-xs font-semibold uppercase tracking-[0.18em] text-muted">Markenname</label>
          <input id="brand-name" className="field" value={name} maxLength={24} onChange={(e) => setName(e.target.value)} />
        </div>
        <div role="group" aria-label="Farbwelt">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted">Farbwelt</p>
          <div className="grid grid-cols-1 gap-2">
            {palettes.map((pl, i) => (
              <Option key={pl.key} active={p === i} onClick={() => setP(i)} label={pl.label}>
                <span className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium">{pl.label}</span>
                  <span className="flex -space-x-1.5">
                    {pl.colors.map((c) => <span key={c} className="h-5 w-5 rounded-full ring-2 ring-white" style={{ background: c }} />)}
                  </span>
                </span>
              </Option>
            ))}
          </div>
        </div>
        <div role="group" aria-label="Schriftstil">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted">Schriftstil</p>
          <div className="grid grid-cols-2 gap-2">
            {fonts.map((fo, i) => (
              <Option key={fo.key} active={f === i} onClick={() => setF(i)} label={fo.label}>
                <span className="block text-2xl leading-none" style={{ fontFamily: fo.head, fontWeight: fo.weight }}>Aa</span>
                <span className="mt-1 block text-xs text-muted">{fo.label}</span>
              </Option>
            ))}
          </div>
        </div>
        <div role="group" aria-label="Designrichtung">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted">Designrichtung</p>
          <div className="grid grid-cols-3 gap-2">
            {directions.map((di, i) => (
              <Option key={di.key} active={d === i} onClick={() => setD(i)} label={di.label}>
                <span className="block text-center text-xs font-medium">{di.label}</span>
              </Option>
            ))}
          </div>
        </div>
      </div>

      {/* Markenpräsentation */}
      <motion.div className="grid gap-4 rounded-4xl p-4 sm:grid-cols-6 sm:p-6" animate={{ backgroundColor: light }} transition={t} aria-live="polite" aria-label={`Markenpräsentation für ${brand}`}>
        {/* Logo */}
        <motion.div className="relative flex min-h-[220px] flex-col justify-between overflow-hidden p-6 sm:col-span-4" animate={{ backgroundColor: dark, borderRadius: dir.radius === '999px' ? '32px' : dir.radius }} transition={t}>
          <div className="absolute -right-8 -top-8 h-40 w-40 opacity-90">{shape}</div>
          <p className="relative text-[10px] uppercase tracking-[0.3em]" style={{ color: soft }}>Logo · Wortmarke</p>
          <p className="relative text-4xl sm:text-5xl" style={{ ...head, color: light }}>{brand}</p>
        </motion.div>
        {/* Farben */}
        <div className="grid grid-cols-2 gap-2 sm:col-span-2">
          {pal.map((c) => (
            <motion.div key={c + p} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex aspect-square flex-col justify-end p-2 text-[10px] font-medium ring-1 ring-black/5" style={{ background: c, color: c === light || c === soft ? dark : light, borderRadius: dir.radius === '999px' ? '24px' : dir.radius }}>
              {c.toUpperCase()}
            </motion.div>
          ))}
        </div>
        {/* Visitenkarte */}
        <motion.div className="flex aspect-[1.7] flex-col justify-between p-5 shadow-lg sm:col-span-3" animate={{ backgroundColor: '#ffffff', borderRadius: dir.radius === '999px' ? '22px' : dir.radius }} transition={t}>
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center text-xs text-white" style={{ background: accent, borderRadius: dir.radius === '0px' ? 0 : 999, ...head }}>{initials}</span>
            <span className="text-sm" style={{ ...head, color: dark }}>{brand}</span>
          </div>
          <div>
            <p className="text-sm font-semibold" style={{ color: dark }}>Vorname Nachname</p>
            <p className="text-[11px]" style={{ color: dark, opacity: 0.6 }}>Geschäftsführung · hallo@marke.de</p>
          </div>
        </motion.div>
        {/* Social Post */}
        <motion.div className="relative flex aspect-square flex-col justify-end overflow-hidden p-5 sm:col-span-3 sm:aspect-auto" animate={{ backgroundColor: accent, borderRadius: dir.radius === '999px' ? '28px' : dir.radius }} transition={t}>
          <div className="absolute -right-6 -top-6 h-28 w-28 opacity-40">
            <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true"><circle cx="50" cy="50" r="50" fill={light} /></svg>
          </div>
          <p className="text-[10px] uppercase tracking-[0.25em]" style={{ color: light, opacity: 0.8 }}>Social Media</p>
          <p className="mt-2 text-2xl leading-tight" style={{ ...head, color: light }}>Neu bei uns: unser Frühlingsangebot.</p>
          <span className="mt-4 w-fit px-3 py-1.5 text-xs font-semibold" style={{ background: light, color: dark, borderRadius: dir.radius }}>Mehr erfahren</span>
        </motion.div>
        {/* Typo */}
        <motion.div className="p-5 sm:col-span-6" animate={{ backgroundColor: soft, borderRadius: dir.radius === '999px' ? '28px' : dir.radius }} transition={t}>
          <div className="flex flex-wrap items-end justify-between gap-4" style={{ color: dark }}>
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] opacity-60">Typografie · {font.label}</p>
              <p className="mt-2 text-3xl sm:text-4xl" style={head}>Klare Worte, starke Wirkung.</p>
              <p className="mt-2 max-w-md text-sm opacity-75">Fließtext bleibt ruhig und gut lesbar – damit die Headline wirken kann.</p>
            </div>
            <span className="px-5 py-3 text-sm font-semibold" style={{ background: dark, color: light, borderRadius: dir.radius }}>Button-Stil →</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
