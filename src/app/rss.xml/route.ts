import { getAllUpdates } from '@/lib/updates'

export const dynamic = 'force-static'

const SITE = 'https://www.infinitegameos.io'

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const updates = getAllUpdates()
  const buildDate = updates[0]?.date ? new Date(`${updates[0].date}T12:00:00Z`) : new Date(0)

  const items = updates
    .map(u => {
      const url = `${SITE}/updates/${u.slug}`
      const pubDate = new Date(`${u.date}T12:00:00Z`).toUTCString()
      return `    <item>
      <title>${escapeXml(u.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(u.summary || '')}</description>
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Infinite Game OS</title>
    <link>${SITE}</link>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Updates from the Infinite Game OS. The framework, the concepts and the practice, mapped.</description>
    <language>en-us</language>
    <lastBuildDate>${buildDate.toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
