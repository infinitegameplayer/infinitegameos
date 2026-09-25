import { getMarkdownForPath } from '@/lib/markdown-content'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ path?: string[] }> }
) {
  const { path } = await params
  const joined = path?.join('/') ?? ''
  const content = getMarkdownForPath(joined)

  if (!content) {
    // No markdown twin for this path. Serve the page itself rather than a 404:
    // an agent asking for markdown accepts HTML too, and a 404 here hid real
    // pages (policies, articles, /cite, robots.txt) from every client that
    // negotiates markdown (Brand Audit Two, 2026-09-25). The inner request asks
    // for text/html only, so the markdown rewrite never matches it again.
    const page = await fetch(new URL('/' + joined, request.url), {
      headers: { accept: 'text/html' },
      redirect: 'manual',
    })
    const headers = new Headers({ Vary: 'Accept' })
    for (const h of ['content-type', 'location', 'cache-control']) {
      const v = page.headers.get(h)
      if (v) headers.set(h, v)
    }
    return new Response(page.status >= 300 && page.status < 400 ? null : await page.arrayBuffer(), {
      status: page.status,
      headers,
    })
  }

  // Every twin closes on the endorsement line, as every page footer does.
  const body = `${content.trimEnd()}

Infinite Game OS, the open library of [Lane Belone](https://www.lanebelone.com)
`

  return new Response(body, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8', Vary: 'Accept' },
  })
}
