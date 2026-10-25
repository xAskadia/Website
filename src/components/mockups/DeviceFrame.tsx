import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import type { Device } from './MiniSite'

interface Props {
  device?: Device
  url?: string
  children: ReactNode
  className?: string
  dark?: boolean
  /** feste Höhe des Viewports beim Browser (Seitenverhältnis) */
  aspect?: string
}

/** Browserfenster, Tablet oder Smartphone als Rahmen für Website-Vorschauen. */
export function DeviceFrame({ device = 'desktop', url = 'deine-website.de', children, className, dark, aspect = '16 / 10.5' }: Props) {
  if (device === 'desktop') {
    return (
      <div className={cn('overflow-hidden rounded-[14px] border shadow-[0_40px_80px_-30px_rgba(34,42,33,0.45)]', dark ? 'border-white/10 bg-ink-2' : 'border-ink/10 bg-white', className)}>
        <div className={cn('flex items-center gap-3 border-b px-3 py-2', dark ? 'border-white/10' : 'border-ink/10 bg-paper/70')}>
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className={cn('mx-auto flex max-w-[60%] flex-1 items-center justify-center gap-1.5 truncate rounded-md px-3 py-1 text-[10px]', dark ? 'bg-white/5 text-white/60' : 'bg-ink/[0.05] text-muted')}>
            <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 shrink-0" aria-hidden="true">
              <path d="M3.5 5V3.8a2.5 2.5 0 0 1 5 0V5M2.5 5h7v5h-7z" fill="none" stroke="currentColor" strokeWidth="1.2" />
            </svg>
            <span className="truncate">{url}</span>
          </div>
          <span className="w-10" aria-hidden="true" />
        </div>
        <div className="relative overflow-hidden" style={{ containerType: 'inline-size', aspectRatio: aspect }}>
          {children}
        </div>
      </div>
    )
  }
  if (device === 'tablet') {
    return (
      <div className={cn('rounded-[28px] bg-ink p-[10px] shadow-[0_40px_80px_-30px_rgba(34,42,33,0.55)] ring-1 ring-white/10', className)}>
        <div className="relative overflow-hidden rounded-[18px] bg-white" style={{ containerType: 'inline-size', aspectRatio: '3 / 4' }}>
          {children}
        </div>
      </div>
    )
  }
  return (
    <div className={cn('rounded-[34px] bg-ink p-[8px] shadow-[0_40px_80px_-30px_rgba(34,42,33,0.55)] ring-1 ring-white/10', className)}>
      <div className="relative overflow-hidden rounded-[27px] bg-white" style={{ containerType: 'inline-size', aspectRatio: '9 / 19' }}>
        <div className="absolute left-1/2 top-[7px] z-10 h-[16px] w-[32%] -translate-x-1/2 rounded-full bg-ink" aria-hidden="true" />
        <div className="h-full pt-[24px]">{children}</div>
      </div>
    </div>
  )
}
