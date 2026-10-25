import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useId, useState, type FormEvent, type ReactNode } from 'react'
import { Link } from 'react-router'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { Portrait } from '../ui/Portrait'
import { websiteTypes } from '../../content/websiteTypes'
import { contactEndpoint, site } from '../../content/site'
import { clearInquiryDraft, readInquiryDraft, type InquiryDraft } from '../../lib/inquiry'
import { cn } from '../../lib/cn'
import { useGoToSection } from '../../lib/sections'

const serviceOptions = [...websiteTypes.map((w) => w.title), 'Noch unklar – Beratung gewünscht']

interface FormState {
  name: string
  company: string
  email: string
  service: string
  details: string
  budget: string
  timeframe: string
  privacy: boolean
  website: string // Honeypot (für Menschen unsichtbar)
}

const empty: FormState = { name: '', company: '', email: '', service: '', details: '', budget: '', timeframe: '', privacy: false, website: '' }
const budgets = ['Noch offen', 'bis 2.000 €', '2.000 – 5.000 €', '5.000 – 10.000 €', 'über 10.000 €']
const timeframes = ['So bald wie möglich', 'In 1–3 Monaten', 'In 3–6 Monaten', 'Flexibel']

type Errors = Partial<Record<keyof FormState, string>>

function validate(f: FormState): Errors {
  const e: Errors = {}
  if (f.name.trim().length < 2) e.name = 'Bitte gib deinen Namen an.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = 'Bitte gib eine gültige E-Mail-Adresse an.'
  if (!f.service) e.service = 'Bitte wähle eine Website-Art aus.'
  if (f.details.trim().length < 20) e.details = 'Erzähl mir bitte etwas mehr (mindestens 20 Zeichen).'
  if (!f.privacy) e.privacy = 'Bitte bestätige die Datenschutzhinweise.'
  return e
}

function Field({ label, error, optional, children, id }: { label: string; error?: string; optional?: boolean; children: ReactNode; id: string }) {
  return (
    <div>
      <label htmlFor={id} className="label">
        {label} {optional ? <span className="font-normal text-muted">(optional)</span> : <span className="text-glut" aria-hidden="true">*</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p id={`${id}-err`} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-2 text-sm font-medium text-glut-dark" role="alert">
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'sent' } | { kind: 'error'; message: string } | { kind: 'no-backend' }

export function ContactSection() {
  const go = useGoToSection()
  const uid = useId()
  const [f, setF] = useState<FormState>(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState(false)
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const [draft, setDraft] = useState<InquiryDraft | null>(null)

  useEffect(() => {
    const d = readInquiryDraft()
    if (d) setDraft(d)
    const onDraft = (e: Event) => setDraft((e as CustomEvent<InquiryDraft>).detail)
    window.addEventListener('inquiry:draft', onDraft)
    return () => window.removeEventListener('inquiry:draft', onDraft)
  }, [])

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    const next = { ...f, [k]: v }
    setF(next)
    if (touched) setErrors(validate(next))
  }

  const applyDraft = () => {
    if (!draft) return
    const matched = serviceOptions.find((t) => draft.service?.includes(t) || draft.summary.includes(t))
    setF((p) => ({ ...p, service: matched ?? p.service, details: `${draft.summary}\n\n${p.details}`.trim() }))
    clearInquiryDraft()
    setDraft(null)
  }

  const mailto = () => {
    const body = [`Name: ${f.name}`, `Unternehmen: ${f.company || '–'}`, `E-Mail: ${f.email}`, `Website-Art: ${f.service}`, `Budget: ${f.budget || '–'}`, `Zeitraum: ${f.timeframe || '–'}`, '', f.details].join('\n')
    return `mailto:${site.contact.email}?subject=${encodeURIComponent(`Projektanfrage: ${f.service || 'Website'}`)}&body=${encodeURIComponent(body)}`
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setTouched(true)
    const errs = validate(f)
    setErrors(errs)
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0]
      document.getElementById(`${uid}-${first}`)?.focus()
      return
    }
    if (f.website) return // Spam-Schutz
    if (!contactEndpoint) {
      setStatus({ kind: 'no-backend' })
      return
    }
    setStatus({ kind: 'sending' })
    try {
      const { website: _hp, ...payload } = f
      void _hp
      const res = await fetch(contactEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...payload, _subject: `Projektanfrage von ${f.name}` }),
      })
      if (!res.ok) throw new Error(`Status ${res.status}`)
      setStatus({ kind: 'sent' })
      setF(empty)
      setTouched(false)
    } catch {
      setStatus({ kind: 'error', message: 'Deine Nachricht konnte leider nicht übermittelt werden. Bitte versuche es erneut oder schreib mir direkt per E-Mail.' })
    }
  }

  const id = (k: keyof FormState) => `${uid}-${k}`
  const aria = (k: keyof FormState) => ({ 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `${id(k)}-err` : undefined })

  return (
    <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Intro */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow text-muted">Kontakt & Projektanfrage</p>
          <h2 className="display-lg mt-5">Erzähl mir von <span className="serif-accent text-glut">deinem Projekt.</span></h2>
          <p className="lead mt-6 text-muted">Ob fertige Vorstellung oder erste Idee: Schreib mir, was du vorhast. {site.contact.responseTime}</p>
          <div className="mt-10 flex items-center gap-4 rounded-3xl border border-ink/10 bg-white p-4">
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl"><Portrait label={false} /></div>
            <div>
              <p className="font-semibold">{site.name}</p>
              <p className="text-sm text-muted">Deine persönliche Ansprechpartnerin</p>
            </div>
          </div>
          <ul className="mt-8 space-y-4">
            <li className="flex items-center gap-3"><Icon name="chat" className="h-5 w-5 text-glut" /><a href={`mailto:${site.contact.email}`} className="font-medium underline-offset-4 hover:underline">{site.contact.email}</a></li>
            <li className="flex items-center gap-3"><Icon name="phone" className="h-5 w-5 text-glut" />{site.contact.phoneHref ? <a href={site.contact.phoneHref}>{site.contact.phone}</a> : <span>{site.contact.phone}</span>}</li>
            <li className="flex items-center gap-3"><Icon name="map" className="h-5 w-5 text-glut" />{site.contact.region}</li>
          </ul>
          <div className="mt-10 rounded-3xl bg-white p-6">
            <p className="font-semibold">Noch unsicher, was du brauchst?</p>
            <p className="mt-2 text-sm text-muted">Mit dem Website-Finder oder dem Konfigurator kannst du deine Wünsche vorab sortieren – und das Ergebnis hier übernehmen.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button type="button" onClick={() => go('konfigurator')} className="chip border-ink/15 bg-white hover:border-ink">Konfigurator</button>
              <button type="button" onClick={() => document.getElementById('finder')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="chip border-ink/15 bg-white hover:border-ink">Website-Finder</button>
            </div>
          </div>
        </div>

        {/* Formular */}
        <div>
          <AnimatePresence>
            {draft && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }} className="mb-6 overflow-hidden rounded-3xl border border-glut/30 bg-glut/[0.06] p-6">
                <p className="font-semibold">Ergebnis aus dem {draft.source} gefunden</p>
                <pre className="mt-3 whitespace-pre-wrap font-sans text-sm text-muted">{draft.summary}</pre>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button onClick={applyDraft} className="!py-2.5">In Anfrage übernehmen</Button>
                  <button type="button" onClick={() => { clearInquiryDraft(); setDraft(null) }} className="text-sm font-medium text-muted hover:text-ink">Verwerfen</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {status.kind === 'sent' ? (
            <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="rounded-[2.5rem] bg-ink p-10 text-paper" role="status">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-glut"><Icon name="check" className="h-8 w-8" strokeWidth={2.4} /></span>
              <h2 className="display-md mt-8">Danke für deine Nachricht!</h2>
              <p className="mt-4 text-white/70">Deine Anfrage ist bei mir angekommen. {site.contact.responseTime}</p>
              <button type="button" onClick={() => setStatus({ kind: 'idle' })} className="mt-8 font-semibold text-glut">Weitere Anfrage senden</button>
            </motion.div>
          ) : (
            <form noValidate onSubmit={submit} className="space-y-6 rounded-[2.5rem] border border-ink/10 bg-white p-6 sm:p-10" aria-label="Projektanfrage">
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Name" id={id('name')} error={errors.name}>
                  <input id={id('name')} className="field" autoComplete="name" value={f.name} onChange={(e) => set('name', e.target.value)} {...aria('name')} />
                </Field>
                <Field label="Unternehmen" optional id={id('company')}>
                  <input id={id('company')} className="field" autoComplete="organization" value={f.company} onChange={(e) => set('company', e.target.value)} />
                </Field>
              </div>
              <Field label="E-Mail" id={id('email')} error={errors.email}>
                <input id={id('email')} type="email" className="field" autoComplete="email" value={f.email} onChange={(e) => set('email', e.target.value)} {...aria('email')} />
              </Field>
              <Field label="Gewünschte Website-Art" id={id('service')} error={errors.service}>
                <select id={id('service')} className="field appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 12 12%22><path d=%22m3 4.5 3 3 3-3%22 stroke=%22%23222a21%22 stroke-width=%221.5%22 fill=%22none%22/></svg>')] bg-[length:14px] bg-[right_1rem_center] bg-no-repeat pr-10" value={f.service} onChange={(e) => set('service', e.target.value)} {...aria('service')}>
                  <option value="">Bitte wählen …</option>
                  {serviceOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </Field>
              <Field label="Projektdetails" id={id('details')} error={errors.details}>
                <textarea id={id('details')} rows={7} className="field resize-y" placeholder="Was macht dein Unternehmen? Was soll deine Website erreichen? Gibt es schon eine Website?" value={f.details} onChange={(e) => set('details', e.target.value)} {...aria('details')} />
              </Field>

              <fieldset>
                <legend className="label">Budget <span className="font-normal text-muted">(optional)</span></legend>
                <div className="flex flex-wrap gap-2">
                  {budgets.map((b) => (
                    <button key={b} type="button" aria-pressed={f.budget === b} onClick={() => set('budget', f.budget === b ? '' : b)} className={cn('chip', f.budget === b ? 'border-ink bg-ink text-paper' : 'border-ink/15 hover:border-ink/40')}>{b}</button>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className="label">Wunschzeitraum <span className="font-normal text-muted">(optional)</span></legend>
                <div className="flex flex-wrap gap-2">
                  {timeframes.map((b) => (
                    <button key={b} type="button" aria-pressed={f.timeframe === b} onClick={() => set('timeframe', f.timeframe === b ? '' : b)} className={cn('chip', f.timeframe === b ? 'border-ink bg-ink text-paper' : 'border-ink/15 hover:border-ink/40')}>{b}</button>
                  ))}
                </div>
              </fieldset>

              <div className="hidden" aria-hidden="true">
                <label>Website <input tabIndex={-1} autoComplete="off" value={f.website} onChange={(e) => set('website', e.target.value)} /></label>
              </div>

              <div>
                <label className="flex cursor-pointer items-start gap-3">
                  <input id={id('privacy')} type="checkbox" checked={f.privacy} onChange={(e) => set('privacy', e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-[#9a7443]" {...aria('privacy')} />
                  <span className="text-sm leading-relaxed text-muted">
                    Ich habe die <Link to="/datenschutz" className="text-ink underline underline-offset-2">Datenschutzerklärung</Link> gelesen und bin einverstanden, dass meine Angaben zur Bearbeitung meiner Anfrage verwendet werden. <span className="text-glut">*</span>
                  </span>
                </label>
                {errors.privacy && <p id={`${id('privacy')}-err`} className="mt-2 text-sm font-medium text-glut-dark" role="alert">{errors.privacy}</p>}
              </div>

              <div aria-live="polite">
                {status.kind === 'no-backend' && (
                  <div className="rounded-3xl border border-sand bg-sand/40 p-5 text-sm leading-relaxed">
                    <p className="font-semibold">Der Online-Versand ist noch nicht eingerichtet.</p>
                    <p className="mt-1 text-ink/75">Deine Anfrage wurde deshalb <strong>nicht</strong> verschickt. Du kannst sie aber mit einem Klick als vorausgefüllte E-Mail senden:</p>
                    <a href={mailto()} className="mt-3 inline-flex items-center gap-2 font-semibold text-glut underline underline-offset-4">Anfrage per E-Mail senden →</a>
                  </div>
                )}
                {status.kind === 'error' && (
                  <div className="rounded-3xl border border-glut/30 bg-glut/[0.06] p-5 text-sm">
                    <p>{status.message}</p>
                    <a href={mailto()} className="mt-2 inline-block font-semibold text-glut underline underline-offset-4">Per E-Mail senden →</a>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <p className="text-xs text-muted"><span className="text-glut">*</span> Pflichtfeld</p>
                <Button type="submit" size="lg" disabled={status.kind === 'sending'}>
                  {status.kind === 'sending' ? 'Wird gesendet …' : 'Jetzt unverbindlich anfragen'}
                </Button>
              </div>
            </form>
          )}
        </div>
    </div>
  )
}
