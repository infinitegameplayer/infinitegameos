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

// The site's RSS feed, as an `alternates.types` entry.
//
// Next.js replaces a route's `alternates` object wholesale rather than merging
// it with the root layout's, so a page that declares its own canonical drops
// the layout's feed link. Every page that sets `alternates` spreads this into
// its `types`, or the page stops advertising the feed. Found 2026-11-25: all
// 140 sitemap pages served no feed link while /rss.xml was live.
export const FEED_TYPES = {
  'application/rss+xml': 'https://www.infinitegameos.io/rss.xml',
} as const
