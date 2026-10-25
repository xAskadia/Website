import { Link } from 'react-router'
import { services } from '../../content/services'
import { site } from '../../content/site'
import { VelocityMarquee } from '../story/VelocityMarquee'
import { Logo } from '../ui/Logo'
import { mainNav } from './Header'

export function Footer() {
  const year = new Date().getFullYear()
  const socials = site.social.filter((s) => s.href)
  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      <div className="container-x relative pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Logo light />
            <p className="mt-6 max-w-sm leading-relaxed text-white/60">
              Websites, Design und Kommunikation für Unternehmen, die online so überzeugen wollen wie im persönlichen Gespräch.
            </p>
            <a href={`mailto:${site.contact.email}`} className="mt-6 inline-block font-display text-2xl italic underline decoration-glut decoration-1 underline-offset-[8px] transition hover:text-glut">
              {site.contact.email}
            </a>
          </div>
          <nav aria-label="Leistungen">
            <p className="eyebrow text-white/45">Leistungen</p>
            <ul className="mt-5 space-y-3 text-white/75">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to={s.path} className="transition hover:text-glut">{s.navTitle}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Seiten">
            <p className="eyebrow text-white/45">Entdecken</p>
            <ul className="mt-5 space-y-3 text-white/75">
              {[{ to: '/', label: 'Startseite' }, ...mainNav, { to: '/website-finder', label: 'Website-Finder' }, { to: '/kontakt', label: 'Kontakt' }].map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="transition hover:text-glut">{n.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="eyebrow text-white/45">Kontakt</p>
            <ul className="mt-5 space-y-3 text-white/75">
              <li>{site.contact.region}</li>
              <li>{site.contact.phoneHref ? <a href={site.contact.phoneHref} className="hover:text-glut">{site.contact.phone}</a> : site.contact.phone}</li>
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-glut">{s.label} ↗</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
      <VelocityMarquee items={['Deine Vision', 'Mein Design', 'Gemeinsam sichtbar']} baseVelocity={-2} outline className="mb-8 mt-20 py-4 text-[15vw] text-paper/20 lg:text-[10rem]" />
      <div className="container-x relative pb-10">

        <div className="flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.name}. Alle Rechte vorbehalten.</p>
          <div className="flex gap-6">
            <Link to="/impressum" className="hover:text-paper">Impressum</Link>
            <Link to="/datenschutz" className="hover:text-paper">Datenschutz</Link>
            <span>Ohne Tracking-Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
