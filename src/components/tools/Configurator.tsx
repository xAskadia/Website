import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { pricing } from '../../content/pricing'
import { saveInquiryDraft } from '../../lib/inquiry'
import { cn } from '../../lib/cn'
import { Button } from '../ui/Button'

const industries = ['Handwerk', 'Gesundheit & Pflege', 'Gastronomie & Hotellerie', 'Beratung & Dienstleistung', 'Einzelhandel', 'Kreativbranche', 'Tourismus & Freizeit', 'Andere Branche']

interface Config {
  type: 'onepager' | 'multipage'
  industry: string
  pages: number
  customDesign: boolean
  contactForm: boolean
  animations: boolean
  booking: boolean
  multilingual: boolean
  seo: boolean
  maintenance: boolean
}

const initial: Config = {
  type: 'multipage',
  industry: '',
  pages: 5,
  customDesign: true,
  contactForm: true,
  animations: false,
  booking: false,
  multilingual: false,
  seo: true,
  maintenance: false,
}

const steps = ['Website-Art', 'Branche', 'Umfang', 'Design', 'Funktionen', 'Betreuung', 'Zusammenfassung']

const featureList: { key: keyof Config; label: string; hint: string }[] = [
  { key: 'contactForm', label: 'Kontaktformular', hint: 'Anfragen direkt über die Website – mit Pflichtfeldern und Datenschutzhinweis.' },
  { key: 'animations', label: 'Animationen', hint: 'Dezente Bewegungen, die führen und Akzente setzen.' },
  { key: 'booking', label: 'Buchungssystem', hint: 'Termine, Tische oder Kurse online buchen lassen.' },
  { key: 'multilingual', label: 'Mehrsprachigkeit', hint: 'Deine Website in weiteren Sprachen.' },
  { key: 'seo', label: 'SEO-Grundoptimierung', hint: 'Saubere Struktur, Titel, Beschreibungen und schnelle Ladezeiten.' },
]

const euro = (n: number) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: pricing.currency, maximumFractionDigits: 0 }).format(n)

/** Berechnet einen Beispielpreis aus den Platzhalterwerten in content/pricing.ts. */
function examplePrice(c: Config) {
  let sum = c.type === 'onepager' ? pricing.base.onepager : pricing.base.multipage
  if (c.type === 'multipage') sum += Math.max(0, c.pages - 1) * pricing.perExtraPage
  if (c.customDesign) sum += pricing.customDesign
  if (c.contactForm) sum += pricing.contactForm
  if (c.animations) sum += pricing.animations
  if (c.booking) sum += pricing.booking
  if (c.multilingual) sum += pricing.multilingual
  if (c.seo) sum += pricing.seo
  return sum
}

export function summarize(c: Config) {
  const feats = featureList.filter((f) => c[f.key]).map((f) => f.label)
  return [
    `Website-Art: ${c.type === 'onepager' ? 'Onepager' : `Mehrseitige Website (ca. ${c.pages} Seiten)`}`,
    `Branche: ${c.industry || 'nicht angegeben'}`,
    `Design: ${c.customDesign ? 'Individuelles Design' : 'Schlankes Design auf bewährter Grundlage'}`,
    `Funktionen: ${feats.length ? feats.join(', ') : 'keine Zusatzfunktionen'}`,
    `Pflege & Wartung: ${c.maintenance ? 'gewünscht' : 'nicht gewünscht'}`,
  ]
}

function Toggle({ checked, onChange, label, hint }: { checked: boolean; onChange: (v: boolean) => void; label: string; hint?: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn('flex w-full items-center justify-between gap-4 rounded-3xl border p-5 text-left transition-all duration-300', checked ? 'border-glut bg-glut/[0.06]' : 'border-ink/10 bg-white hover:border-ink/30')}
    >
      <span>
        <span className="block font-semibold">{label}</span>
        {hint && <span className="mt-1 block text-sm text-muted">{hint}</span>}
      </span>
      <span className={cn('relative h-7 w-12 shrink-0 rounded-full transition-colors', checked ? 'bg-glut' : 'bg-ink/15')} aria-hidden="true">
        <motion.span layout transition={{ type: 'spring', stiffness: 500, damping: 30 }} className={cn('absolute top-1 h-5 w-5 rounded-full bg-white shadow', checked ? 'right-1' : 'left-1')} />
      </span>
    </button>
  )
}

function Choice({ active, onClick, title, text, icon }: { active: boolean; onClick: () => void; title: string; text: string; icon: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn('group flex h-full flex-col rounded-4xl border p-6 text-left transition-all duration-300', active ? 'border-ink bg-ink text-paper' : 'border-ink/10 bg-white hover:-translate-y-0.5 hover:border-ink/30')}
    >
      <span className={cn('grid h-14 w-14 place-items-center rounded-2xl', active ? 'bg-glut text-white' : 'bg-paper-2 text-ink')}>{icon}</span>
      <span className="mt-6 font-display text-2xl font-semibold tracking-tight">{title}</span>
      <span className={cn('mt-2 text-sm leading-relaxed', active ? 'text-white/70' : 'text-muted')}>{text}</span>
    </button>
  )
}

/** Website-Konfigurator mit Fortschrittsanzeige und Übernahme in die Anfrage. */
export function Configurator() {
  const [step, setStep] = useState(0)
  const [c, setC] = useState<Config>(initial)
  const navigate = useNavigate()
  const set = <K extends keyof Config>(k: K, v: Config[K]) => setC((p) => ({ ...p, [k]: v }))
  const price = useMemo(() => examplePrice(c), [c])
  const progress = ((step + 1) / steps.length) * 100
  const last = step === steps.length - 1

  const takeOver = () => {
    saveInquiryDraft({ source: 'Website-Konfigurator', service: 'Webdesign & Website-Erstellung', summary: summarize(c).join('\n') })
    navigate('/kontakt')
  }

  return (
    <div className="overflow-hidden rounded-[2.5rem] border border-ink/10 bg-paper-2/60">
      {/* Fortschritt */}
      <div className="border-b border-ink/10 bg-paper px-6 py-5 sm:px-10">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold">
            Schritt {step + 1} von {steps.length}: <span className="text-glut">{steps[step]}</span>
          </span>
          <span className="tabular-nums text-muted">{Math.round(progress)} %</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-ink/10" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100} aria-label="Fortschritt im Konfigurator">
          <motion.div className="h-full rounded-full bg-glut" animate={{ width: `${progress}%` }} transition={{ type: 'spring', stiffness: 120, damping: 20 }} />
        </div>
        <ol className="mt-4 hidden gap-1 lg:flex">
          {steps.map((s, i) => (
            <li key={s} className="flex-1">
              <button type="button" onClick={() => setStep(i)} className={cn('w-full truncate rounded-full px-2 py-1 text-xs transition', i === step ? 'bg-ink text-paper' : i < step ? 'text-ink hover:bg-ink/5' : 'text-muted hover:bg-ink/5')}>
                {i < step ? '✓ ' : ''}
                {s}
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className="min-h-[26rem] p-6 sm:p-10">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
            {step === 0 && (
              <fieldset>
                <legend className="font-display text-3xl font-semibold tracking-tight">Welche Art von Website stellst du dir vor?</legend>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <Choice
                    active={c.type === 'onepager'}
                    onClick={() => set('type', 'onepager')}
                    title="Onepager"
                    text="Alle Inhalte auf einer Seite, die man von oben nach unten entdeckt. Ideal für einen kompakten, schnellen Start."
                    icon={<svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="6" y="2.5" width="12" height="19" rx="2" /><path d="M9 7h6M9 11h6M9 15h4" /></svg>}
                  />
                  <Choice
                    active={c.type === 'multipage'}
                    onClick={() => set('type', 'multipage')}
                    title="Mehrseitige Website"
                    text="Eigene Unterseiten für Leistungen, Team, Referenzen und mehr. Ideal, wenn du viel zu erzählen hast."
                    icon={<svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="5" width="11" height="15" rx="2" /><path d="M8 3h11a2 2 0 0 1 2 2v13" /></svg>}
                  />
                </div>
              </fieldset>
            )}

            {step === 1 && (
              <fieldset>
                <legend className="font-display text-3xl font-semibold tracking-tight">In welcher Branche bist du tätig?</legend>
                <div className="mt-8 flex flex-wrap gap-2.5">
                  {industries.map((ind) => (
                    <button key={ind} type="button" aria-pressed={c.industry === ind} onClick={() => set('industry', ind)} className={cn('chip', c.industry === ind ? 'border-ink bg-ink text-paper' : 'border-ink/15 bg-white hover:border-ink/40')}>
                      {ind}
                    </button>
                  ))}
                </div>
                <p className="mt-6 text-sm text-muted">Die Branche hilft mir, Inhalte, Bildsprache und typische Funktionen besser einzuschätzen.</p>
              </fieldset>
            )}

            {step === 2 && (
              <div>
                <h3 className="font-display text-3xl font-semibold tracking-tight">Wie umfangreich soll die Website werden?</h3>
                {c.type === 'onepager' ? (
                  <p className="mt-6 max-w-xl rounded-3xl bg-white p-6 leading-relaxed text-muted">
                    Du hast einen <strong className="text-ink">Onepager</strong> gewählt – alle Inhalte stehen auf einer Seite. Rechtlich notwendige Seiten wie Impressum und Datenschutz kommen natürlich trotzdem dazu.
                    <button type="button" onClick={() => set('type', 'multipage')} className="mt-3 block font-semibold text-glut underline underline-offset-4">Doch lieber mehrseitig?</button>
                  </p>
                ) : (
                  <div className="mt-10 max-w-xl">
                    <label htmlFor="cfg-pages" className="flex items-end justify-between">
                      <span className="font-medium">Anzahl der Unterseiten</span>
                      <span className="font-display text-6xl font-semibold tabular-nums text-glut">{c.pages}</span>
                    </label>
                    <input id="cfg-pages" type="range" min={2} max={20} value={c.pages} onChange={(e) => set('pages', +e.target.value)} className="range mt-6" style={{ ['--fill' as string]: `${((c.pages - 2) / 18) * 100}%` }} />
                    <div className="mt-2 flex justify-between text-xs text-muted">
                      <span>2</span>
                      <span>20+</span>
                    </div>
                    <p className="mt-6 text-sm text-muted">Typisch: Start, Leistungen, Über uns, Referenzen, Kontakt. Impressum und Datenschutz zählen nicht mit.</p>
                  </div>
                )}
              </div>
            )}

            {step === 3 && (
              <fieldset>
                <legend className="font-display text-3xl font-semibold tracking-tight">Wie individuell soll das Design sein?</legend>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <Choice
                    active={c.customDesign}
                    onClick={() => set('customDesign', true)}
                    title="Individuelles Design"
                    text="Ein Auftritt, der nur dir gehört – entwickelt aus deiner Marke, deinen Zielen und deiner Zielgruppe."
                    icon={<svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 3a9 9 0 1 0 0 18c1 0 1.5-.8 1.2-1.6-.4-1 .3-2 1.3-2H17a4 4 0 0 0 4-4c0-5-4-10.4-9-10.4Z" /><circle cx="7.5" cy="11" r="1" /><circle cx="10" cy="7" r="1" /><circle cx="15" cy="7.5" r="1" /></svg>}
                  />
                  <Choice
                    active={!c.customDesign}
                    onClick={() => set('customDesign', false)}
                    title="Schlank & bewährt"
                    text="Ein klares, professionelles Design auf Basis bewährter Strukturen – angepasst an deine Farben und Inhalte."
                    icon={<svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>}
                  />
                </div>
              </fieldset>
            )}

            {step === 4 && (
              <fieldset>
                <legend className="font-display text-3xl font-semibold tracking-tight">Welche Funktionen brauchst du?</legend>
                <div className="mt-8 grid gap-3 md:grid-cols-2">
                  {featureList.map((f) => (
                    <Toggle key={f.key} checked={c[f.key] as boolean} onChange={(v) => set(f.key, v as never)} label={f.label} hint={f.hint} />
                  ))}
                </div>
              </fieldset>
            )}

            {step === 5 && (
              <fieldset>
                <legend className="font-display text-3xl font-semibold tracking-tight">Soll ich mich nach dem Launch weiter kümmern?</legend>
                <div className="mt-8 max-w-xl">
                  <Toggle checked={c.maintenance} onChange={(v) => set('maintenance', v)} label="Pflege & Wartung" hint="Technische Updates, kleine Änderungen und ein Ansprechpartner, wenn etwas zu tun ist." />
                </div>
              </fieldset>
            )}

            {last && (
              <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                <div>
                  <h3 className="font-display text-3xl font-semibold tracking-tight">Deine Projektzusammenfassung</h3>
                  <ul className="mt-6 divide-y divide-ink/10 rounded-3xl bg-white px-6">
                    {summarize(c).map((line) => {
                      const [k, v] = line.split(': ')
                      return (
                        <li key={k} className="flex flex-col gap-1 py-4 sm:flex-row sm:justify-between sm:gap-6">
                          <span className="text-sm text-muted">{k}</span>
                          <span className="font-medium sm:text-right">{v}</span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
                <div className="flex flex-col justify-between rounded-4xl bg-ink p-7 text-paper">
                  {pricing.showExamplePrices ? (
                    <div>
                      <span className="demo-badge">Beispielpreis · Platzhalter</span>
                      <p className="mt-5 text-sm text-white/60">Rechnerischer Orientierungswert ab</p>
                      <p className="font-display text-5xl font-semibold tabular-nums">{euro(price)}</p>
                      {c.maintenance && <p className="mt-2 text-sm text-white/60">+ Pflege ab {euro(pricing.maintenancePerMonth)} / Monat (Platzhalter)</p>}
                      <p className="mt-5 text-xs leading-relaxed text-white/50">
                        Unverbindlicher Beispielwert auf Basis von Platzhalterpreisen – kein Angebot. Dein tatsächlicher Preis richtet sich nach deinem individuellen Projekt und wird nach einem Gespräch transparent kalkuliert.
                      </p>
                    </div>
                  ) : (
                    <p className="text-white/70">Dein individuelles Angebot erhältst du nach einem kurzen, unverbindlichen Gespräch.</p>
                  )}
                  <div className="mt-8 space-y-3">
                    <Button onClick={takeOver} className="w-full">In Anfrage übernehmen</Button>
                    <button type="button" onClick={() => { setC(initial); setStep(0) }} className="w-full text-sm text-white/60 underline-offset-4 hover:text-white hover:underline">
                      Neu konfigurieren
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {!last && (
        <div className="flex items-center justify-between border-t border-ink/10 bg-paper px-6 py-5 sm:px-10">
          <button type="button" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="font-semibold text-ink/70 transition hover:text-ink disabled:opacity-30">
            ← Zurück
          </button>
          <Button onClick={() => setStep((s) => s + 1)} variant="secondary">
            {step === steps.length - 2 ? 'Zusammenfassung ansehen' : 'Weiter'}
          </Button>
        </div>
      )}
    </div>
  )
}
