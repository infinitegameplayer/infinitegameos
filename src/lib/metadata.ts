import type { Metadata } from 'next'

// Shared Twitter Card builder.
//
// Next.js does not synthesize twitter:title and twitter:description from a
// route's openGraph or top-level title/description the way it derives
// og:description from the top-level description field. A route that omits
// `twitter` entirely inherits the root layout's twitter object wholesale,
// title and description included. Every page with page-specific OG values
// needs its own explicit twitter block, mirroring those values, or the card
// renders the site default instead of the page.
export function twitterCard(input: {
  title: string
  description: string
  imageUrl: string
}): NonNullable<Metadata['twitter']> {
  return {
    card: 'summary_large_image',
    title: input.title,
    description: input.description,
    images: [input.imageUrl],
  }
}
