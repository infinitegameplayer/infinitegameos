import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'

export const alt = 'Infinite Game OS'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default async function Image() {
  return ogCard({
    eyebrow: 'Infinite Game OS',
    title: 'Philosophy, frameworks and systems for the long game.',
    body: 'A structured knowledge base for practitioners of Infinite Game philosophy, sovereign life design and agentic systems.',
  })
}
