import { Botanical } from './Botanical'
import { ScrollWords } from './ScrollWords'
import { Wave } from './Wave'

/** Erzählerischer Zwischenruf: Text entwickelt sich Wort für Wort beim Scrollen. */
export function StoryStatement({ text, label = 'Gedanke', next = 'var(--color-paper)' }: { text: string; label?: string; next?: string }) {
  return (
    <section className="relative overflow-hidden bg-moss pt-24 text-paper sm:pt-32">
      <Botanical kind="olive" mode="scroll" className="pointer-events-none absolute -right-24 top-10 w-[60%] max-w-2xl text-paper/20" />
      <div className="container-x relative">
        <p className="eyebrow text-white/50">{label}</p>
        <ScrollWords className="mt-8 max-w-5xl font-display text-[clamp(1.8rem,3.8vw,3.6rem)] leading-[1.14] tracking-[-0.015em]" text={text} />
      </div>
      <Wave color={next} className="mt-20" variant={3} />
    </section>
  )
}
