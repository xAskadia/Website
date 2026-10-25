import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, HashRouter, matchRoutes } from 'react-router'
import App from './App'
import { pages, routeTable } from './routes'
import './styles/index.css'

// Vorschau-Build (z. B. für statische Hosts ohne Rewrite-Regeln) nutzt Hash-Routing.
const useHash = import.meta.env.MODE === 'preview'
const Router = useHash ? HashRouter : BrowserRouter

async function start() {
  const path = useHash ? window.location.hash.replace(/^#/, '') || '/' : window.location.pathname
  const match = matchRoutes(routeTable, path)?.[0]
  await pages[match ? match.route.page : 'notFound'].preload()
  // Vorgerendertes HTML wird durch die interaktive App ersetzt (identisches Markup).
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Router>
        <App />
      </Router>
    </StrictMode>,
  )
}

start()
