import type { MetadataRoute } from 'next'
import { getAllUpdates } from '@/lib/updates'
import { concepts } from '@/data/concepts'
import { getAssetsByType } from '@/data/library'

// Dates for pages whose content is static and tracked manually.
// Update these when the page content changes rather than leaving them
// as hardcoded launch-day timestamps. Per codex V.8: lastModified must
// reflect actual page-data timestamps, not deployment boilerplate.
const PAGE_DATES: Record<string, string> = {
  '/':                   '2026-04-19',
  '/the-os':             '2026-04-19',
  '/accord':             '2026-04-28',
  '/infinite-game':      '2026-04-19',
  '/agentic-systems':    '2026-04-19',
  '/sovereignty':        '2026-04-26',
  '/playbooks':          '2026-04-19',
  '/about':              '2026-04-19',
  '/concepts':           '2026-04-19',
  '/protocols':          '2026-05-06',
  '/sovereign-ecosystem': '2026-05-05',
  '/play-your-own-game': '2026-05-19',
  '/design-your-day':    '2026-05-19',
  '/creator-business-without-performing': '2026-05-19',
  '/infinite-game-os':   '2026-05-19',
}

function pageDate(path: string): Date {
  const d = PAGE_DATES[path]
  return d ? new Date(d + 'T00:00:00.000Z') : new Date()
}

export default function sitemap(): MetadataRoute.Sitemap {
  const updates = getAllUpdates()
  const updateEntries: MetadataRoute.Sitemap = updates.map(u => ({
    url: `https://www.infinitegameos.io/updates/${u.slug}`,
    lastModified: new Date(u.date + 'T00:00:00.000Z'),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // Concepts have no per-entry updated field; use the concepts index date
  // until per-concept updated timestamps are added to concepts.ts.
  const conceptEntries: MetadataRoute.Sitemap = concepts.map(c => ({
    url: `https://www.infinitegameos.io/concepts/${c.slug}`,
    lastModified: pageDate('/concepts'),
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  const skillEntries: MetadataRoute.Sitemap = getAssetsByType('skill').map(asset => ({
    url: `https://www.infinitegameos.io/skills/${asset.slug}`,
    lastModified: new Date(asset.updated + 'T00:00:00.000Z'),
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  const protocolEntries: MetadataRoute.Sitemap = getAssetsByType('protocol').map(asset => ({
    url: `https://www.infinitegameos.io/protocols/${asset.slug}`,
    lastModified: new Date(asset.updated + 'T00:00:00.000Z'),
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  const bundleEntries: MetadataRoute.Sitemap = getAssetsByType('bundle').map(asset => ({
    url: `https://www.infinitegameos.io/bundles/${asset.slug}`,
    lastModified: new Date(asset.updated + 'T00:00:00.000Z'),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  return [
    {
      url: 'https://www.infinitegameos.io/',
      lastModified: pageDate('/'),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: 'https://www.infinitegameos.io/the-os',
      lastModified: pageDate('/the-os'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://www.infinitegameos.io/accord',
      lastModified: pageDate('/accord'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://www.infinitegameos.io/infinite-game',
      lastModified: pageDate('/infinite-game'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://www.infinitegameos.io/agentic-systems',
      lastModified: pageDate('/agentic-systems'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://www.infinitegameos.io/sovereignty',
      lastModified: pageDate('/sovereignty'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.infinitegameos.io/playbooks',
      lastModified: pageDate('/playbooks'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.infinitegameos.io/updates',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.infinitegameos.io/about',
      lastModified: pageDate('/about'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://www.infinitegameos.io/concepts',
      lastModified: pageDate('/concepts'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.infinitegameos.io/protocols',
      lastModified: pageDate('/protocols'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.infinitegameos.io/sovereign-ecosystem',
      lastModified: pageDate('/sovereign-ecosystem'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://www.infinitegameos.io/infinite-game-os',
      lastModified: pageDate('/infinite-game-os'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://www.infinitegameos.io/play-your-own-game',
      lastModified: pageDate('/play-your-own-game'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: 'https://www.infinitegameos.io/design-your-day',
      lastModified: pageDate('/design-your-day'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: 'https://www.infinitegameos.io/creator-business-without-performing',
      lastModified: pageDate('/creator-business-without-performing'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    ...conceptEntries,
    ...skillEntries,
    ...protocolEntries,
    ...bundleEntries,
    ...updateEntries,
  ]
}
