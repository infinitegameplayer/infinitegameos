import { ogCard, OG_SIZE, OG_CONTENT_TYPE, firstSentence } from '@/lib/og'
import { getAllUpdates, getUpdate } from '@/lib/updates'

export const alt = 'Infinite Game OS'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const dynamicParams = false

export function generateStaticParams() {
  return getAllUpdates().map((u) => ({ slug: u.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const update = getUpdate(slug)

  return ogCard({
    eyebrow: 'Updates',
    title: update?.title ?? 'Infinite Game OS',
    body: update?.summary ? firstSentence(update.summary) : undefined,
    footer: 'infinitegameos.io/updates',
  })
}
