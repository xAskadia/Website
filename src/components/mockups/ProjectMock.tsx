import { motion } from 'framer-motion'
import type { Project } from '../../content/projects'
import { cn } from '../../lib/cn'
import { DeviceFrame } from './DeviceFrame'
import { MiniSite, type Device } from './MiniSite'

const devices: { key: Device; label: string }[] = [
  { key: 'desktop', label: 'Desktop' },
  { key: 'tablet', label: 'Tablet' },
  { key: 'mobile', label: 'Mobil' },
]

export function DeviceSwitch({ value, onChange, dark }: { value: Device; onChange: (d: Device) => void; dark?: boolean }) {
  return (
    <div className={cn('inline-flex rounded-full p-1', dark ? 'bg-white/10' : 'border border-ink/10 bg-white')} role="group" aria-label="Geräteansicht wählen">
      {devices.map((d) => (
        <button key={d.key} type="button" aria-pressed={value === d.key} onClick={() => onChange(d.key)} className={cn('relative rounded-full px-4 py-2 text-sm font-medium transition', value === d.key ? (dark ? 'text-ink' : 'text-paper') : dark ? 'text-white/60 hover:text-white' : 'text-muted hover:text-ink')}>
          {value === d.key && <motion.span layoutId={dark ? 'dev-pill-dark' : 'dev-pill'} className={cn('absolute inset-0 rounded-full', dark ? 'bg-paper' : 'bg-glut')} transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
          <span className="relative">{d.label}</span>
        </button>
      ))}
    </div>
  )
}

export function ProjectMock({ p, device }: { p: Project; device: Device }) {
  const img = p.images?.[device]
  return (
    <div className={cn('mx-auto transition-all duration-700', device === 'desktop' ? 'w-full' : device === 'tablet' ? 'w-[62%]' : 'w-[38%]')}>
      <DeviceFrame device={device} url={`${p.slug}.de`}>
        {img ? <img src={img} alt={`${p.name} – ${device}-Ansicht`} className="h-full w-full object-cover object-top" loading="lazy" /> : <MiniSite theme={p.theme} name={p.name} device={device} />}
      </DeviceFrame>
    </div>
  )
}

