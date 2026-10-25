import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { scrollToId } from './cn'
import { sections, type SectionId } from '../content/sections'

/** Springt zu einem Abschnitt der Onepage – auch von Unterseiten aus. */
export function useGoToSection() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  return useCallback(
    (id: SectionId) => {
      if (pathname !== '/') {
        navigate('/', { state: { scrollTo: id } })
        return
      }
      scrollToId(id)
      if (import.meta.env.MODE !== 'preview') history.replaceState(null, '', id === 'start' ? '/' : `/#${id}`)
    },
    [pathname, navigate],
  )
}

/** Ermittelt den Abschnitt, der gerade im Blickfeld ist (Scrollspy). */
export function useActiveSection() {
  const [active, setActive] = useState<SectionId>('start')
  const { pathname } = useLocation()
  useEffect(() => {
    if (pathname !== '/') return
    const onScroll = () => {
      const line = window.innerHeight * 0.35
      let current: SectionId = 'start'
      for (const s of sections) {
        const el = document.getElementById(s.id)
        if (el && el.getBoundingClientRect().top <= line) current = s.id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])
  return pathname === '/' ? active : null
}
