import { motion } from 'framer-motion'
import { Button } from '../components/ui/Button'

export default function NotFound() {
  return (
    <section className="grid min-h-[90svh] place-items-center bg-paper px-5 pt-24 text-center">
      <div>
        <motion.p initial={{ rotate: -8, scale: 0.8, opacity: 0 }} animate={{ rotate: 0, scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 120 }} className="font-display text-[clamp(7rem,24vw,16rem)] font-bold leading-none tracking-tighter">
          4<span className="serif-accent text-glut">0</span>4
        </motion.p>
        <h1 className="mt-4 text-3xl">Diese Seite ist noch eine Idee.</h1>
        <p className="mx-auto mt-4 max-w-md text-muted">Leider gibt es hier nichts zu sehen – vielleicht hat sich ein Tippfehler eingeschlichen oder die Seite ist umgezogen.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button to="/">Zur Startseite</Button>
          <Button to="/kontakt" variant="ghost">Kontakt aufnehmen</Button>
        </div>
      </div>
    </section>
  )
}
