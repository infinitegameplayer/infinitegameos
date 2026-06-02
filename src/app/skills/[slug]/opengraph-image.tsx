import { ogCard, OG_SIZE, OG_CONTENT_TYPE, firstSentence } from '@/lib/og'
import { getAssetBySlug, getAssetsByType } from '@/data/library'

export const alt = 'Infinite Game OS Skill'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const dynamicParams = false

export function generateStaticParams() {
  return getAssetsByType('skill').map((a) => ({ slug: a.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const asset = getAssetBySlug(slug, 'skill')
  const summary = asset?.capsule || asset?.description

  return ogCard({
    eyebrow: 'Skill',
    title: asset?.title ?? 'Infinite Game OS',
    body: summary ? firstSentence(summary) : undefined,
    footer: 'infinitegameos.io/skills',
  })
}
