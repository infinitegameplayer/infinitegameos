// Markdown route handler: src/app/markdown/[[...path]]/route.ts (Next.js App Router).
//
// Pairs with the rewrite rule in next.config.ts, which sends any request whose
// Accept header asks for text/markdown or text/plain to /markdown/<path>. This
// handler fetches the same path as HTML and converts what the page rendered,
// so the page is the only place copy lives.
//
// The inner request asks for text/html only, so the rewrite never matches it
// again. Anything that is not a 200 HTML page (a redirect, a 404, robots.txt)
// passes through as the page answered it, so a markdown request never answers
// 404 for a page that exists. Vary: Accept rides on both answers, so an edge
// cache never serves one audience the other's format.
//
// From the Website Builder skill, https://www.infinitegameos.io/skills/website-builder (CC BY 4.0)

import { pageToTwin } from '@/lib/twin'

// Your canonical origin. Links in the twin resolve against it.
const SITE = 'https://www.example.com'

// Optional: a line every twin closes on, the way every page footer does.
// Leave it empty to add nothing.
const CLOSING_LINE = ''

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
      const body = CLOSING_LINE ? `${twin.trimEnd()}\n\n${CLOSING_LINE}\n` : twin
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
