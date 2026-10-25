/**
 * Statisches Prerendering: erzeugt für jede Route eine eigene HTML-Datei mit
 * fertigem Inhalt, Seitentitel und Meta-Beschreibung (gut für SEO und Ladezeit).
 * Ergebnis in /dist kann auf jedem statischen Hosting liegen.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const { render, pageMeta, getMeta, site } = await import(pathToFileURL(path.join(root, 'dist-ssr/entry-server.js')).href)

const template = await fs.readFile(path.join(dist, 'index.html'), 'utf8')
const base = site.url.replace(/\/$/, '')
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

function page(url, html) {
  const meta = getMeta(url)
  return template
    .replace(/<title>.*?<\/title>/s, `<title>${esc(meta.title)}</title>`)
    .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${esc(meta.description)}" />`)
    .replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${esc(meta.title)}" />`)
    .replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${esc(meta.description)}" />`)
    .replace('<!--head-extra-->', `<link rel="canonical" href="${base}${url === '/' ? '/' : url}" />\n    <meta property="og:image" content="${base}/images/portrait.webp" />\n    <link rel="preload" as="image" href="/images/portrait-560.webp" media="(max-width: 640px)" />`)
    .replace('<!--app-html-->', html)
}

const urls = Object.keys(pageMeta)
for (const url of urls) {
  const html = await render(url)
  const file = url === '/' ? path.join(dist, 'index.html') : path.join(dist, url, 'index.html')
  await fs.mkdir(path.dirname(file), { recursive: true })
  await fs.writeFile(file, page(url, html))
  console.log('✓', url)
}
await fs.writeFile(path.join(dist, '404.html'), page('/404', await render('/404')))

const today = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${base}${u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`
await fs.writeFile(path.join(dist, 'sitemap.xml'), sitemap)
await fs.writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`)
await fs.rm(path.join(root, 'dist-ssr'), { recursive: true, force: true })
console.log(`\n${urls.length} Seiten vorgerendert.`)
