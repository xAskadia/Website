import { Link } from 'react-router'
import { sections } from '../../content/sections'
import { site } from '../../content/site'
import { useGoToSection } from '../../lib/sections'
import { Logo } from '../ui/Logo'

export function Footer() {
  const year = new Date().getFullYear()
  const go = useGoToSection()
  const socials = site.social.filter((s) => s.href)
  return (
    <footer className="relative bg-paper-2">
      <div className="supergraphic h-1 w-full" aria-hidden="true" />
      <div className="container-x py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-sm leading-relaxed text-muted">Individuelle Websites für Unternehmen, die online so überzeugen wollen wie im persönlichen Gespräch.</p>
            <a href={`mailto:${site.contact.email}`} className="mt-5 inline-block text-lg font-medium text-glut underline-offset-4 hover:underline">
              {site.contact.email}
            </a>
          </div>
          <nav aria-label="Abschnitte">
            <p className="text-sm font-semibold">Auf dieser Seite</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 text-muted">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`/#${s.id}`} onClick={(e) => { e.preventDefault(); go(s.id) }} className="transition hover:text-glut">{s.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="text-sm font-semibold">Kontakt</p>
            <ul className="mt-4 space-y-2.5 text-muted">
              <li>{site.contact.region}</li>
              <li>{site.contact.phoneHref ? <a href={site.contact.phoneHref} className="hover:text-glut">{site.contact.phone}</a> : site.contact.phone}</li>
              {socials.map((s) => (
                <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-glut">{s.label} ↗</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-ink/10 pt-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.name}</p>
          <div className="flex flex-wrap gap-6">
            <Link to="/impressum" className="hover:text-ink">Impressum</Link>
            <Link to="/datenschutz" className="hover:text-ink">Datenschutz</Link>
            <span>Ohne Tracking-Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
