import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router'
import { Arrow, Button } from '../components/ui/Button'
import { CtaBand } from '../components/ui/CtaBand'
import { PageHero } from '../components/ui/PageHero'
import { Reveal } from '../components/ui/Reveal'
import { services } from '../content/services'
import { cn } from '../lib/cn'

export default function Services() {
  const [hover, setHover] = useState(0)
  return (
    <>
      <PageHero
        eyebrow="Leistungen"
        title="Design, Strategie und Technik –"
        accent="aus einer Hand."
        intro="Von der ersten Skizze bis zur fertigen Website, vom Logo bis zur Social-Media-Vorlage: Ich begleite dich dabei, digital so aufzutreten, wie es zu deinem Unternehmen passt."
      >
        <Button to="/website-finder">Passende Leistung finden</Button>
        <Button to="/kontakt" variant="ghost">Direkt anfragen</Button>
      </PageHero>

      <section className="bg-paper pb-24">
        <div className="container-x grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <ul className="space-y-3">
            {services.map((s, i) => (
              <Reveal as="li" key={s.slug} delay={i * 0.05}>
                <Link
                  to={s.path}
                  onMouseEnter={() => setHover(i)}
                  onFocus={() => setHover(i)}
                  className={cn('group flex items-center gap-6 rounded-4xl border p-6 transition-all duration-500 sm:p-8', hover === i ? 'border-ink bg-ink text-paper' : 'border-ink/10 bg-white')}
                >
                  <span className="font-display text-lg font-semibold text-glut">{s.number}</span>
                  <span className="flex-1">
                    <span className="block font-display text-2xl font-semibold tracking-tight sm:text-3xl">{s.title}</span>
                    <span className={cn('mt-2 block text-sm leading-relaxed transition-colors', hover === i ? 'text-white/65' : 'text-muted')}>{s.teaser}</span>
                  </span>
                  <span className={cn('hidden h-12 w-12 shrink-0 place-items-center rounded-full transition-all sm:grid', hover === i ? 'bg-glut text-white' : 'border border-ink/15')}>
                    <Arrow />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
          <div className="hidden lg:block">
            <div className="sticky top-28 overflow-hidden rounded-[2.5rem] bg-glut p-10 text-white">
              <motion.div key={hover} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                <p className="font-display text-[9rem] font-bold leading-none tracking-tighter text-white/20">{services[hover].number}</p>
                <p className="eyebrow mt-4 text-white/70">Interaktiv auf der Seite</p>
                <p className="mt-3 font-display text-4xl font-semibold leading-tight">{services[hover].tool}</p>
                <p className="mt-6 text-white/80">Auf jeder Leistungsseite findest du ein interaktives Werkzeug, mit dem du direkt ausprobieren kannst, worum es geht.</p>
                <Link to={services[hover].path} className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 font-semibold">
                  Ausprobieren <Arrow />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  )
}
