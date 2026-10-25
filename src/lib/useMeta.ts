import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { getMeta } from '../content/seo'
import { site } from '../content/site'

function setTag(selector: string, attr: string, key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement | HTMLLinkElement>(selector)
  if (!el) {
    el = document.createElement(selector.startsWith('link') ? 'link' : 'meta') as HTMLMetaElement
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute(selector.startsWith('link') ? 'href' : 'content', content)
}

/** Aktualisiert Titel, Description, Open-Graph und Canonical bei jedem Seitenwechsel. */
export function useRouteMeta() {
  const { pathname } = useLocation()
  useEffect(() => {
    const meta = getMeta(pathname)
    document.title = meta.title
    setTag('meta[name="description"]', 'name', 'description', meta.description)
    setTag('meta[property="og:title"]', 'property', 'og:title', meta.title)
    setTag('meta[property="og:description"]', 'property', 'og:description', meta.description)
    setTag('link[rel="canonical"]', 'rel', 'canonical', site.url.replace(/\/$/, '') + pathname)
  }, [pathname])
}
