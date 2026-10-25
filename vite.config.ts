import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// "preview"-Modus: baut eine Version mit Hash-Routing und relativen Pfaden,
// die ohne Server-Konfiguration aus jedem Ordner heraus funktioniert.
export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],
  base: mode === 'preview' ? './' : '/',
  build: { target: 'es2020', cssCodeSplit: true },
}))
