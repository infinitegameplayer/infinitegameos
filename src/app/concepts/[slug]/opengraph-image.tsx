import { ogCard, OG_SIZE, OG_CONTENT_TYPE, firstSentence } from '@/lib/og'
import { getConceptBySlug, getAllConceptSlugs } from '@/data/concepts'

export const alt = 'Infinite Game OS Concept'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const dynamicParams = false

export function generateStaticParams() {
  return getAllConceptSlugs().map((slug) => ({ slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const concept = getConceptBySlug(slug)

  return ogCard({
    eyebrow: 'Concept',
    title: concept?.title ?? 'Infinite Game OS',
    body: concept?.capsule ? firstSentence(concept.capsule) : undefined,
    footer: 'infinitegameos.io/concepts',
  })
}
