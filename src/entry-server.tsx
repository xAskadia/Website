import { prerenderToNodeStream } from 'react-dom/static'
import { StaticRouter } from 'react-router'
import App from './App'
import { pageMeta, getMeta } from './content/seo'
import { site } from './content/site'

export { pageMeta, getMeta, site }

export async function render(url: string) {
  const { prelude } = await prerenderToNodeStream(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  )
  const chunks: Buffer[] = []
  for await (const c of prelude) chunks.push(Buffer.from(c))
  return Buffer.concat(chunks).toString('utf8')
}
