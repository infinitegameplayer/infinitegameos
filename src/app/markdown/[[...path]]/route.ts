import { pageToTwin } from '@/lib/twin'

const SITE = 'https://www.infinitegameos.io'

// Every markdown twin is generated from the page itself (parity build,
// 2026-09-25). The inner request asks for text/html only, so the markdown
// rewrite never matches it again. Anything that is not a 200 HTML page (a
// redirect, a 404, robots.txt) passes through as the page answered it, so a
// markdown request never answers 404 for a page that exists (Brand Audit Two).
export async function GET(
  request: Request,
  { params }: { params: Promise<{ path?: string[] }> }
) {
  const { path } = await params
  const joined = path?.join('/') ?? ''
  const page = await fetch(new URL('/' + joined, request.url), {
    headers: { accept: 'text/html' },
    redirect: 'manual',
  })
  const type = page.headers.get('content-type') ?? ''

  const html = page.status === 200 && type.includes('text/html') ? await page.text() : null
  if (html !== null) {
    const twin = pageToTwin(html, `${SITE}/${joined}`.replace(/\/$/, ''))
    if (twin) {
      // Every twin closes on the endorsement line, as every page footer does.
      const body = `${twin.trimEnd()}

Infinite Game OS, the open library of [Lane Belone](https://www.lanebelone.com)
`
      return new Response(body, {
        headers: { 'Content-Type': 'text/markdown; charset=utf-8', Vary: 'Accept' },
      })
    }
  }

  const headers = new Headers({ Vary: 'Accept' })
  for (const h of ['content-type', 'location', 'cache-control']) {
    const v = page.headers.get(h)
    if (v) headers.set(h, v)
  }
  return new Response(page.status >= 300 && page.status < 400 ? null : html ?? await page.arrayBuffer(), {
    status: page.status,
    headers,
  })
}
