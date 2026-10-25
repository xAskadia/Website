import type { CSSProperties } from 'react'
import type { MockTheme } from '../../content/projects'

export type Device = 'desktop' | 'tablet' | 'mobile'
export type MockMode = 'sketch' | 'wire' | 'final'

const fontFamily: Record<MockTheme['font'], string> = {
  serif: 'var(--font-serif)',
  grotesk: 'var(--font-display)',
  rounded: 'ui-rounded, "SF Pro Rounded", var(--font-sans)',
}

/** Skalierungsfaktor je Gerät – alle Maße sind in Container-Einheiten (cqw). */
const scale: Record<Device, number> = { desktop: 1, tablet: 1.55, mobile: 2.6 }

export function Motif({ kind, accent, soft, fg }: { kind: MockTheme['motif']; accent: string; soft: string; fg: string }) {
  switch (kind) {
    case 'arch':
      return (
        <svg viewBox="0 0 200 220" className="h-full w-full" aria-hidden="true">
          <path d="M20 220V100a80 80 0 0 1 160 0v120Z" fill={soft} />
          <path d="M55 220v-95a45 45 0 0 1 90 0v95Z" fill={accent} />
          <circle cx="150" cy="40" r="16" fill={fg} opacity=".85" />
        </svg>
      )
    case 'circle':
      return (
        <svg viewBox="0 0 200 220" className="h-full w-full" aria-hidden="true">
          <circle cx="100" cy="110" r="88" fill={soft} />
          <circle cx="128" cy="92" r="46" fill={accent} />
          <circle cx="62" cy="150" r="20" fill={fg} opacity=".8" />
        </svg>
      )
    case 'grid':
      return (
        <svg viewBox="0 0 200 220" className="h-full w-full" aria-hidden="true">
          <rect x="10" y="10" width="110" height="130" rx="6" fill={soft} />
          <rect x="130" y="10" width="60" height="60" rx="6" fill={accent} />
          <rect x="130" y="80" width="60" height="130" rx="6" fill={fg} opacity=".85" />
          <rect x="10" y="150" width="110" height="60" rx="6" fill={accent} opacity=".5" />
        </svg>
      )
    case 'wave':
      return (
        <svg viewBox="0 0 200 220" className="h-full w-full" aria-hidden="true">
          <circle cx="140" cy="60" r="30" fill={accent} />
          <path d="M0 150c40-30 60 20 100-5s60-30 100 0v75H0Z" fill={soft} />
          <path d="M0 180c40-25 70 15 105-5s60-20 95 5v40H0Z" fill={accent} opacity=".55" />
        </svg>
      )
    case 'stack':
    default:
      return (
        <svg viewBox="0 0 200 220" className="h-full w-full" aria-hidden="true">
          <rect x="30" y="30" width="140" height="44" rx="22" fill={soft} />
          <rect x="18" y="88" width="164" height="44" rx="22" fill={accent} />
          <rect x="44" y="146" width="112" height="44" rx="22" fill={fg} opacity=".85" />
        </svg>
      )
  }
}

interface Props {
  theme: MockTheme
  name: string
  device?: Device
  mode?: MockMode
  /** Überschreibt Headline/CTA – z. B. für die Landingpage-Vorschau */
  override?: Partial<Pick<MockTheme, 'headline' | 'subline' | 'cta' | 'layout'>>
  showSections?: boolean
}

/**
 * Generiertes Website-Mockup. Rendert eine kleine, vollständig responsive
 * "Website" aus einem Theme. Muss in einem Element mit `container-type: inline-size`
 * stehen (z. B. in DeviceFrame).
 */
export function MiniSite({ theme, name, device = 'desktop', mode = 'final', override, showSections = true }: Props) {
  const t = { ...theme, ...override }
  const s = scale[device]
  const u = (n: number) => `${n * s}cqw`
  const mobile = device === 'mobile'
  const wire = mode !== 'final'
  const sketch = mode === 'sketch'

  const fg = wire ? '#1b1820' : t.fg
  const bg = wire ? '#ffffff' : t.bg
  const accent = wire ? '#cfc9d6' : t.accent
  const soft = wire ? '#ece8f0' : t.soft

  const block = (w: string, h: string, extra: CSSProperties = {}): CSSProperties => ({
    width: w,
    height: h,
    borderRadius: u(0.4),
    background: sketch ? 'transparent' : soft,
    border: sketch ? `${u(0.18)} dashed #9b93a6` : 'none',
    ...extra,
  })

  const headline = (
    <div
      style={{
        fontFamily: wire ? 'var(--font-sans)' : fontFamily[t.font],
        fontSize: u(t.layout === 'editorial' ? 5.4 : 4.4),
        lineHeight: 1.02,
        letterSpacing: t.font === 'serif' ? '-0.01em' : '-0.04em',
        fontWeight: t.font === 'serif' ? 400 : 650,
        color: fg,
      }}
    >
      {wire ? (
        <div className="flex flex-col" style={{ gap: u(0.8) }}>
          <div style={block('90%', u(3.2))} />
          <div style={block('60%', u(3.2))} />
        </div>
      ) : (
        t.headline
      )}
    </div>
  )

  const sub = wire ? (
    <div className="flex flex-col" style={{ gap: u(0.5), marginTop: u(1.6) }}>
      <div style={block('85%', u(0.9))} />
      <div style={block('70%', u(0.9))} />
    </div>
  ) : (
    <p style={{ fontSize: u(1.25), lineHeight: 1.45, marginTop: u(1.4), color: fg, opacity: 0.75, maxWidth: '34em' }}>{t.subline}</p>
  )

  const cta = (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: u(0.6),
        marginTop: u(2),
        padding: `${u(0.9)} ${u(1.8)}`,
        borderRadius: 999,
        fontSize: u(1.1),
        fontWeight: 600,
        background: sketch ? 'transparent' : wire ? '#1b1820' : t.accent,
        border: sketch ? `${u(0.18)} dashed #9b93a6` : 'none',
        color: sketch ? '#9b93a6' : '#fff',
        width: 'fit-content',
      }}
    >
      {wire ? 'Button' : t.cta} <span aria-hidden="true">→</span>
    </div>
  )

  const visual = (
    <div style={{ aspectRatio: '200 / 220', width: '100%', ...(sketch ? block('100%', 'auto', { aspectRatio: '200/220' }) : {}) }}>
      {sketch ? (
        <svg viewBox="0 0 200 220" className="h-full w-full" aria-hidden="true">
          <path d="M20 200 180 20M20 20l160 180" stroke="#c7c0cf" strokeWidth="1.5" strokeDasharray="5 5" />
        </svg>
      ) : (
        <Motif kind={t.motif} accent={accent} soft={wire ? '#e3dee8' : soft} fg={wire ? '#bdb5c6' : fg} />
      )}
    </div>
  )

  const layout = mobile ? 'stack' : t.layout

  return (
    <div className="h-full w-full overflow-hidden text-left" style={{ background: bg, color: fg, transition: 'background .6s, color .6s' }}>
      {/* Navigation */}
      <div className="flex items-center justify-between" style={{ padding: `${u(1.4)} ${u(2.4)}` }}>
        <div style={{ fontFamily: wire ? 'var(--font-sans)' : fontFamily[t.font], fontWeight: 700, fontSize: u(1.3), letterSpacing: '-0.02em' }}>
          {wire ? <div style={block(u(9), u(1.3))} /> : name}
        </div>
        {mobile ? (
          <div className="flex flex-col" style={{ gap: u(0.35) }} aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ width: u(1.6), height: u(0.22), background: fg, borderRadius: 4 }} />
            ))}
          </div>
        ) : (
          <div className="flex items-center" style={{ gap: u(2), fontSize: u(0.95) }}>
            {t.nav.map((n) => (wire ? <div key={n} style={block(u(5), u(0.9))} /> : <span key={n} style={{ opacity: 0.75 }}>{n}</span>))}
            <span style={{ padding: `${u(0.5)} ${u(1.1)}`, borderRadius: 999, border: `1px solid ${fg}`, opacity: wire ? 0.3 : 1 }}>Kontakt</span>
          </div>
        )}
      </div>

      {/* Hero */}
      {layout === 'split' && (
        <div className="grid items-center" style={{ gridTemplateColumns: '1.15fr 0.85fr', gap: u(3), padding: `${u(3)} ${u(2.4)} ${u(2)}` }}>
          <div>
            {headline}
            {sub}
            {cta}
          </div>
          {visual}
        </div>
      )}
      {layout === 'centered' && (
        <div className="relative flex flex-col items-center text-center" style={{ padding: `${u(4)} ${u(6)} ${u(2)}` }}>
          <div className="pointer-events-none absolute opacity-30" style={{ width: u(26), right: u(-4), top: u(-2) }}>
            {!sketch && visual}
          </div>
          <div className="relative" style={{ maxWidth: '80%' }}>
            {headline}
          </div>
          <div className="relative flex flex-col items-center">
            {sub}
            {cta}
          </div>
        </div>
      )}
      {layout === 'editorial' && (
        <div style={{ padding: `${u(2.4)} ${u(2.4)} ${u(2)}` }}>
          {headline}
          <div className="grid items-end" style={{ gridTemplateColumns: '1fr 1fr 0.8fr', gap: u(2), marginTop: u(2) }}>
            <div>
              {sub}
              {cta}
            </div>
            <div style={{ height: u(14), borderRadius: u(0.6), background: sketch ? 'transparent' : accent, border: sketch ? `${u(0.18)} dashed #9b93a6` : 'none' }} />
            <div style={{ height: u(20), borderRadius: u(0.6), background: sketch ? 'transparent' : soft, border: sketch ? `${u(0.18)} dashed #9b93a6` : 'none' }} />
          </div>
        </div>
      )}
      {layout === 'stack' && (
        <div style={{ padding: `${u(2)} ${u(2.4)}` }}>
          {headline}
          {sub}
          {cta}
          <div style={{ width: '70%', marginTop: u(3), marginLeft: 'auto' }}>{visual}</div>
        </div>
      )}

      {/* Inhaltsbereich */}
      {showSections && (
        <div className="grid" style={{ gridTemplateColumns: mobile ? '1fr' : 'repeat(3, 1fr)', gap: u(1.4), padding: `${u(2)} ${u(2.4)} ${u(3)}` }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                padding: u(1.6),
                borderRadius: u(0.8),
                background: sketch ? 'transparent' : wire ? '#f5f3f7' : `${t.soft}`,
                border: sketch ? `${u(0.18)} dashed #b8b0c2` : 'none',
              }}
            >
              <div style={{ width: u(2.4), height: u(2.4), borderRadius: 999, background: sketch ? 'transparent' : accent, border: sketch ? `${u(0.18)} dashed #b8b0c2` : 'none' }} />
              <div style={{ ...block('70%', u(1)), marginTop: u(1.2), background: sketch ? 'transparent' : wire ? '#dcd6e2' : fg, opacity: wire ? 1 : 0.8 }} />
              <div style={{ ...block('95%', u(0.6)), marginTop: u(0.8), background: sketch ? 'transparent' : wire ? '#e6e1eb' : fg, opacity: wire ? 1 : 0.25 }} />
              <div style={{ ...block('80%', u(0.6)), marginTop: u(0.5), background: sketch ? 'transparent' : wire ? '#e6e1eb' : fg, opacity: wire ? 1 : 0.25 }} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
