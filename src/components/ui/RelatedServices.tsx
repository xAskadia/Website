import { Link } from 'react-router'
import { services, type ServiceSlug } from '../../content/services'
import { Arrow } from './Button'
import { Reveal } from './Reveal'

/** Querverweise auf weitere Leistungen am Ende einer Leistungsseite. */
export function RelatedServices({ current }: { current: ServiceSlug }) {
  const others = services.filter((s) => s.slug !== current).slice(0, 3)
  return (
    <section className="bg-paper pt-24">
      <div className="container-x">
        <p className="eyebrow text-muted">Passt gut dazu</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {others.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.06}>
              <Link to={s.path} className="group flex h-full flex-col justify-between rounded-4xl border border-ink/10 bg-white p-7 transition hover:border-ink">
                <div>
                  <span className="font-display text-sm font-semibold text-glut">{s.number}</span>
                  <p className="mt-3 font-display text-2xl font-semibold leading-tight tracking-tight">{s.title}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{s.teaser}</p>
                </div>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">
                  Mehr erfahren <Arrow className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
