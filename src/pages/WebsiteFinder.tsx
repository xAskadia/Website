import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Botanical } from '../components/story/Botanical'
import { Button } from '../components/ui/Button'
import { Icon } from '../components/ui/Icon'
import { answerSummary, evaluate, questions, solutions, type Answers } from '../lib/finder'
import { saveInquiryDraft } from '../lib/inquiry'
import { cn } from '../lib/cn'

const labels = { onepager: 'Onepager', unternehmen: 'Unternehmenswebsite', landing: 'Landingpage', relaunch: 'Relaunch' }

function Result({ answers, onRestart }: { answers: Answers; onRestart: () => void }) {
  const navigate = useNavigate()
  const r = evaluate(answers)
  const s = solutions[r.primary]
  const alt = solutions[r.secondary]
  const takeOver = () => {
    saveInquiryDraft({
      source: 'Website-Finder',
      service: s.service,
      summary: [`Empfehlung: ${s.title}`, ...answerSummary(answers)].join('\n'),
    })
    navigate('/kontakt')
  }
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
      <div className="rounded-[2.5rem] bg-paper p-7 text-ink sm:p-10">
        <p className="eyebrow text-muted">Meine Empfehlung für dich</p>
        <h2 className="display-lg mt-4">{s.title}</h2>
        <p className="serif-accent mt-2 text-2xl text-glut sm:text-3xl">{s.tagline}</p>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{s.text}</p>
        {r.reasons.length > 0 && (
          <div className="mt-8">
            <p className="font-semibold">Warum das zu dir passt:</p>
            <ul className="mt-4 space-y-3">
              {r.reasons.slice(0, 5).map((x) => (
                <li key={x} className="flex gap-3 leading-relaxed"><Icon name="check" className="mt-1 h-5 w-5 shrink-0 text-glut" />{x}</li>
              ))}
            </ul>
          </div>
        )}
        {r.features.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {r.features.map((f) => <span key={f} className="chip border-ink/15 bg-white">+ {f}</span>)}
          </div>
        )}
        <div className="mt-10 flex flex-wrap gap-3">
          <Button onClick={takeOver}>Als Anfrage übernehmen</Button>
          <Button to={s.path} variant="ghost">Mehr zur Leistung</Button>
        </div>
      </div>
      <div className="space-y-6">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7">
          <p className="text-sm text-white/60">So verteilen sich deine Antworten</p>
          <ul className="mt-5 space-y-4">
            {(Object.keys(r.score) as (keyof typeof r.score)[]).sort((a, b) => r.score[b] - r.score[a]).map((k) => (
              <li key={k}>
                <div className="flex justify-between text-sm"><span className={cn(k === r.primary && 'font-semibold text-paper')}>{labels[k]}</span><span className="tabular-nums text-white/50">{Math.round((r.score[k] / r.total) * 100)} %</span></div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                  <motion.div className={cn('h-full rounded-full', k === r.primary ? 'bg-glut' : 'bg-iris/60')} initial={{ width: 0 }} animate={{ width: `${(r.score[k] / r.total) * 100}%` }} transition={{ duration: 1, delay: 0.3 }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-[2rem] border border-white/10 p-7">
          <p className="text-sm text-white/60">Auch denkbar</p>
          <p className="mt-2 font-display text-2xl font-semibold">{alt.title}</p>
          <p className="mt-2 text-sm leading-relaxed text-white/60">{alt.tagline}</p>
        </div>
        <button type="button" onClick={onRestart} className="w-full rounded-full border border-white/20 py-3.5 font-semibold transition hover:bg-white/10">↺ Antworten ändern</button>
        <p className="text-xs leading-relaxed text-white/40">Die Empfehlung basiert ausschließlich auf deinen Antworten und ersetzt kein persönliches Gespräch.</p>
      </div>
    </motion.div>
  )
}

export default function WebsiteFinder() {
  const [step, setStep] = useState(-1)
  const [answers, setAnswers] = useState<Answers>({})
  const done = step >= questions.length
  const q = questions[step]
  const selected = q ? answers[q.id] ?? [] : []

  const choose = (id: string) => {
    if (!q) return
    if (q.multi) {
      setAnswers((a) => {
        const cur = a[q.id] ?? []
        let next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]
        if (id === 'keine') next = next.includes('keine') ? ['keine'] : []
        else next = next.filter((x) => x !== 'keine')
        return { ...a, [q.id]: next }
      })
    } else {
      setAnswers((a) => ({ ...a, [q.id]: [id] }))
      window.setTimeout(() => setStep((s) => s + 1), 280)
    }
  }

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-moss pb-24 pt-32 text-paper sm:pt-40">
      <Botanical kind="fern" className="pointer-events-none absolute -bottom-10 right-[4%] h-[70%] text-paper/15" />
      <div className="pointer-events-none absolute -right-40 -top-40 h-[40rem] w-[40rem] rounded-full bg-glut/20 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[30rem] w-[30rem] rounded-full bg-iris/15 blur-3xl" aria-hidden="true" />
      <div className="container-x relative">
        <AnimatePresence mode="wait">
          {step === -1 && (
            <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-4xl">
              <p className="eyebrow text-white/60">Website-Finder</p>
              <p className="script mt-8 text-6xl text-sand">Finde es heraus</p>
              <h1 className="display-xl mt-2">Welche Website passt zu <span className="serif-accent text-sand">deinem Unternehmen?</span></h1>
              <p className="lead mt-8 max-w-2xl text-white/70">Sechs kurze Fragen, etwa eine Minute. Am Ende bekommst du eine Empfehlung, die auf deinen Antworten basiert – und kannst sie direkt als Grundlage für eine unverbindliche Anfrage nutzen.</p>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <Button onClick={() => setStep(0)} size="lg">Finder starten</Button>
                <span className="text-sm text-white/50">Keine Anmeldung · nichts wird gespeichert</span>
              </div>
            </motion.div>
          )}

          {q && (
            <motion.div key={q.id} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
              <div className="flex items-center gap-4">
                <span className="font-display text-sm tabular-nums text-white/50">Frage {step + 1} / {questions.length}</span>
                <div className="flex flex-1 gap-1.5" aria-hidden="true">
                  {questions.map((_, i) => <span key={i} className={cn('h-1.5 flex-1 rounded-full transition-colors duration-500', i <= step ? 'bg-glut' : 'bg-white/15')} />)}
                </div>
              </div>
              <fieldset className="mt-10">
                <legend className="display-lg max-w-4xl">{q.title}</legend>
                {q.hint && <p className="mt-3 text-white/50">{q.hint}</p>}
                <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {q.options.map((o, i) => {
                    const on = selected.includes(o.id)
                    return (
                      <motion.button key={o.id} type="button" aria-pressed={on} onClick={() => choose(o.id)} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className={cn('group flex items-center justify-between gap-4 rounded-3xl border p-5 text-left text-lg font-medium transition-all duration-300 sm:p-6', on ? 'border-glut bg-glut text-white' : 'border-white/20 bg-white/[0.05] hover:border-white/50 hover:bg-white/[0.1]')}>
                        {o.label}
                        <span className={cn('grid h-7 w-7 shrink-0 place-items-center border-2 transition', q.multi ? 'rounded-lg' : 'rounded-full', on ? 'border-white bg-white text-glut' : 'border-white/25')}>{on && <Icon name="check" className="h-4 w-4" strokeWidth={3} />}</span>
                      </motion.button>
                    )
                  })}
                </div>
              </fieldset>
              <div className="mt-10 flex items-center justify-between">
                <button type="button" onClick={() => setStep((s) => s - 1)} className="font-semibold text-white/60 hover:text-white">← Zurück</button>
                {(q.multi || selected.length > 0) && (
                  <Button onClick={() => setStep((s) => s + 1)} variant="light" disabled={q.multi && selected.length === 0}>
                    {step === questions.length - 1 ? 'Ergebnis anzeigen' : 'Weiter'}
                  </Button>
                )}
              </div>
            </motion.div>
          )}

          {done && <Result key="result" answers={answers} onRestart={() => { setAnswers({}); setStep(0) }} />}
        </AnimatePresence>
      </div>
    </section>
  )
}
