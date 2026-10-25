import { lazy, type ComponentType } from 'react'

type Loader = () => Promise<{ default: ComponentType }>

export interface LazyPage {
  Component: ComponentType
  preload: () => Promise<unknown>
}

/**
 * Code-Splitting pro Seite. `preload()` lädt den Seiten-Chunk vorab – so kann
 * die aktuelle Seite vor dem ersten Rendern geladen werden (kein Flackern über
 * dem vorgerenderten HTML) und Links können beim Hover vorladen.
 */
export function lazyPage(loader: Loader): LazyPage {
  let loaded: ComponentType | null = null
  let promise: Promise<unknown> | null = null
  const preload = () =>
    (promise ??= loader().then((m) => {
      loaded = m.default
    }))
  const Lazy = lazy(() => loader())
  const Component = () => {
    const L = loaded
    return L ? <L /> : <Lazy />
  }
  return { Component, preload }
}
