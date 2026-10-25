import { motion } from 'framer-motion'
import { useId, useState } from 'react'

const fmt = (n: number, d = 0) => new Intl.NumberFormat('de-DE', { maximumFractionDigits: d, minimumFractionDigits: d }).format(n)
const months = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']

function Slider({ label, value, min, max, step, onChange, display }: { label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; display: string }) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id} className="flex items-end justify-between gap-4">
        <span className="text-sm text-white/70">{label}</span>
        <span className="font-display text-3xl font-semibold tabular-nums">{display}</span>
      </label>
      <input id={id} type="range" className="range mt-4" min={min} max={max} step={step} value={value} onChange={(e) => onChange(+e.target.value)} style={{ ['--fill' as string]: `${((value - min) / (max - min)) * 100}%`, background: `linear-gradient(to right, #e4572e var(--fill), rgba(255,255,255,0.15) var(--fill))` }} />
      <div className="mt-1.5 flex justify-between text-xs text-white/40">
        <span>{fmt(min, step < 1 ? 1 : 0)}</span>
        <span>{fmt(max, step < 1 ? 1 : 0)}</span>
      </div>
    </div>
  )
}

/**
 * Besucher-zu-Anfragen-Rechner. Rein rechnerisches Szenario:
 * Anfragen = Besuche × Anfragequote. Optional mit monatlichem Wachstum der Besuche.
 */
export function InquiryCalculator() {
  const [visits, setVisits] = useState(800)
  const [rate, setRate] = useState(1.5)
  const [growth, setGrowth] = useState(3)
  const [hover, setHover] = useState<number | null>(null)

  const data = months.map((m, i) => {
    const v = visits * Math.pow(1 + growth / 100, i)
    return { m, visits: v, inquiries: (v * rate) / 100 }
  })
  const perMonth = (visits * rate) / 100
  const year = data.reduce((s, d) => s + d.inquiries, 0)
  const max = Math.max(...data.map((d) => d.inquiries)) * 1.15 || 1

  const W = 600
  const H = 260
  const pad = { l: 36, r: 8, t: 16, b: 28 }
  const bw = (W - pad.l - pad.r) / data.length
  const y = (v: number) => pad.t + (H - pad.t - pad.b) * (1 - v / max)
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => max * f)
  const active = hover ?? data.length - 1

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <div className="space-y-9 rounded-4xl border border-white/10 bg-white/[0.04] p-7">
        <Slider label="Website-Besuche pro Monat" value={visits} min={100} max={10000} step={100} onChange={setVisits} display={fmt(visits)} />
        <Slider label="Angenommene Anfragequote" value={rate} min={0.1} max={6} step={0.1} onChange={setRate} display={`${fmt(rate, 1)} %`} />
        <Slider label="Monatliches Wachstum der Besuche" value={growth} min={0} max={10} step={1} onChange={setGrowth} display={`${fmt(growth)} %`} />
        <p className="text-xs leading-relaxed text-white/45">
          Die Anfragequote ist der Anteil der Besuche, aus dem eine Anfrage entsteht. Sie hängt stark von Branche, Angebot und Website ab – setze hier deine eigene Annahme ein.
        </p>
      </div>

      <div className="rounded-4xl bg-paper p-6 text-ink sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="text-sm text-muted">Rechnerische Anfragen im ersten Monat</p>
            <p className="font-display text-6xl font-semibold tabular-nums" aria-live="polite">{fmt(perMonth, perMonth < 10 ? 1 : 0)}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted">Summe über 12 Monate</p>
            <p className="font-display text-4xl font-semibold tabular-nums text-glut">{fmt(year)}</p>
          </div>
        </div>

        <figure className="mt-8">
          <figcaption className="mb-3 text-sm font-semibold">Rechnerische Anfragen pro Monat</figcaption>
          <div className="relative">
            <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={`Balkendiagramm: rechnerische Anfragen pro Monat, von ${fmt(data[0].inquiries, 1)} im ersten bis ${fmt(data[11].inquiries, 1)} im zwölften Monat.`} onMouseLeave={() => setHover(null)}>
              {ticks.map((t) => (
                <g key={t}>
                  <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} stroke="#16131d" strokeOpacity={t === 0 ? 0.35 : 0.08} />
                  <text x={pad.l - 8} y={y(t) + 4} textAnchor="end" fontSize="11" fill="#6d6676">{fmt(t, max < 8 ? 1 : 0)}</text>
                </g>
              ))}
              {data.map((d, i) => {
                const x = pad.l + i * bw + 3
                const top = y(d.inquiries)
                const h = Math.max(0, y(0) - top)
                const w = bw - 6
                const r = Math.min(4, w / 2, h)
                return (
                  <g key={d.m} onMouseEnter={() => setHover(i)}>
                    <rect x={pad.l + i * bw} y={pad.t} width={bw} height={H - pad.t - pad.b} fill="transparent" />
                    <motion.path
                      initial={false}
                      animate={{ d: `M${x},${y(0)} V${top + r} Q${x},${top} ${x + r},${top} H${x + w - r} Q${x + w},${top} ${x + w},${top + r} V${y(0)} Z` }}
                      transition={{ type: 'spring', stiffness: 140, damping: 20 }}
                      fill="#e4572e"
                      fillOpacity={i === active ? 1 : 0.55}
                    />
                    <text x={x + w / 2} y={H - 8} textAnchor="middle" fontSize="11" fill="#6d6676">{d.m}</text>
                  </g>
                )
              })}
            </svg>
            <div className="pointer-events-none absolute rounded-xl bg-ink px-3 py-2 text-xs text-paper shadow-lg transition-all" style={{ left: `${((pad.l + active * bw + bw / 2) / W) * 100}%`, top: `${(y(data[active].inquiries) / H) * 100}%`, transform: 'translate(-50%, calc(-100% - 10px))' }}>
              <p className="font-semibold">Monat {active + 1}</p>
              <p className="whitespace-nowrap text-white/70">{fmt(data[active].visits)} Besuche → {fmt(data[active].inquiries, 1)} Anfragen</p>
            </div>
          </div>
          <details className="mt-4 text-sm">
            <summary className="cursor-pointer text-muted hover:text-ink">Werte als Tabelle anzeigen</summary>
            <table className="mt-3 w-full text-left tabular-nums">
              <thead>
                <tr className="border-b border-ink/10 text-muted"><th className="py-1.5 font-medium">Monat</th><th className="font-medium">Besuche</th><th className="font-medium">Anfragen</th></tr>
              </thead>
              <tbody>
                {data.map((d, i) => (
                  <tr key={d.m} className="border-b border-ink/5"><td className="py-1.5">{i + 1}</td><td>{fmt(d.visits)}</td><td>{fmt(d.inquiries, 1)}</td></tr>
                ))}
              </tbody>
            </table>
          </details>
        </figure>

        <p className="mt-6 rounded-2xl bg-sand/60 p-4 text-xs leading-relaxed text-ink/80">
          <strong>Illustratives Szenario, keine Prognose:</strong> Die Werte ergeben sich ausschließlich aus deinen Eingaben (Besuche × Quote). Sie stellen keine garantierten Ergebnisse dar. Tatsächliche Zahlen hängen von vielen Faktoren ab – Markt, Angebot, Wettbewerb, Saison und mehr.
        </p>
      </div>
    </div>
  )
}
