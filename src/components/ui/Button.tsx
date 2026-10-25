import { Link } from 'react-router'
import type { ReactNode, MouseEventHandler } from 'react'
import { cn } from '../../lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost' | 'light' | 'outline-light'

const styles: Record<Variant, string> = {
  primary: 'bg-glut text-white hover:bg-glut-dark shadow-[0_14px_34px_-14px_rgba(154,116,67,0.8)]',
  secondary: 'bg-ink text-paper hover:bg-moss',
  ghost: 'border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-paper',
  light: 'bg-paper text-ink hover:bg-white',
  'outline-light': 'border border-white/25 text-paper hover:border-paper hover:bg-paper hover:text-ink',
}

interface Props {
  to?: string
  href?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  type?: 'button' | 'submit'
  variant?: Variant
  children: ReactNode
  className?: string
  arrow?: boolean
  disabled?: boolean
  size?: 'md' | 'lg'
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={cn('h-4 w-4', className)}>
      <path d="M4 10h11m0 0-4.5-4.5M15 10l-4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Button({ to, href, onClick, type = 'button', variant = 'primary', children, className, arrow = true, disabled, size = 'md' }: Props) {
  const cls = cn(
    'group relative inline-flex items-center justify-center gap-3 overflow-hidden whitespace-nowrap rounded-full font-medium uppercase tracking-[0.16em] transition-all duration-500 ease-out active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50',
    size === 'lg' ? 'px-8 py-[1.1rem] text-[0.78rem]' : 'px-6 py-3.5 text-[0.72rem]',
    styles[variant],
    className,
  )
  const inner = (
    <>
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" aria-hidden="true" />
      <span className="relative">{children}</span>
      {arrow && (
        <span className="relative grid h-6 w-6 place-items-center overflow-hidden rounded-full bg-current/0">
          <Arrow className="transition-transform duration-300 group-hover:translate-x-6" />
          <Arrow className="absolute -translate-x-6 transition-transform duration-300 group-hover:translate-x-0" />
        </span>
      )}
    </>
  )
  if (to) return <Link to={to} className={cls}>{inner}</Link>
  if (href) return <a href={href} className={cls}>{inner}</a>
  return <button type={type} onClick={onClick} className={cls} disabled={disabled}>{inner}</button>
}
