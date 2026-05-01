import type { MetadataRoute } from 'next'
import { getAllUpdates } from '@/lib/updates'
import { getAllConceptSlugs } from '@/data/concepts'
import { getAssetsByType } from '@/data/library'

export default function sitemap(): MetadataRoute.Sitemap {
  const updates = getAllUpdates()
  const updateEntries: MetadataRoute.Sitemap = updates.map(u => ({
    url: `https://www.infinitegameos.io/updates/${u.slug}`,
    lastModified: new Date(u.date + 'T00:00:00Z'),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const conceptEntries: MetadataRoute.Sitemap = getAllConceptSlugs().map(slug => ({
    url: `https://www.infinitegameos.io/concepts/${slug}`,
    lastModified: new Date('2026-04-19T00:00:00Z'),
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  const skillEntries: MetadataRoute.Sitemap = getAssetsByType('skill').map(asset => ({
    url: `https://www.infinitegameos.io/skills/${asset.slug}`,
    lastModified: new Date(asset.updated + 'T00:00:00Z'),
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  const bundleEntries: MetadataRoute.Sitemap = getAssetsByType('bundle').map(asset => ({
    url: `https://www.infinitegameos.io/bundles/${asset.slug}`,
    lastModified: new Date(asset.updated + 'T00:00:00Z'),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  return [
    {
      url: 'https://www.infinitegameos.io/',
      lastModified: new Date('2026-04-19T00:00:00Z'),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: 'https://www.infinitegameos.io/the-os',
      lastModified: new Date('2026-04-19T00:00:00Z'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://www.infinitegameos.io/accord',
      lastModified: new Date('2026-04-28T00:00:00Z'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://www.infinitegameos.io/infinite-game',
      lastModified: new Date('2026-04-19T00:00:00Z'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://www.infinitegameos.io/agentic-systems',
      lastModified: new Date('2026-04-19T00:00:00Z'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://www.infinitegameos.io/sovereignty',
      lastModified: new Date('2026-04-26T00:00:00Z'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.infinitegameos.io/playbooks',
      lastModified: new Date('2026-04-19T00:00:00Z'),
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
      lastModified: new Date('2026-04-19T00:00:00Z'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://www.infinitegameos.io/concepts',
      lastModified: new Date('2026-04-19T00:00:00Z'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...conceptEntries,
    ...skillEntries,
    ...bundleEntries,
    ...updateEntries,
  ]
}
