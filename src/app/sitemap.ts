import type { MetadataRoute } from 'next'
import { getAllUpdates } from '@/lib/updates'

export default function sitemap(): MetadataRoute.Sitemap {
  const updates = getAllUpdates()
  const updateEntries: MetadataRoute.Sitemap = updates.map(u => ({
    url: `https://infinitegameos.io/updates/${u.slug}`,
    lastModified: new Date(u.date + 'T00:00:00Z'),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [
    {
      url: 'https://infinitegameos.io/',
      lastModified: new Date('2026-04-10T00:00:00Z'),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: 'https://infinitegameos.io/the-os',
      lastModified: new Date('2026-04-10T00:00:00Z'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://infinitegameos.io/infinite-game',
      lastModified: new Date('2026-04-10T00:00:00Z'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://infinitegameos.io/agentic-systems',
      lastModified: new Date('2026-04-11T00:00:00Z'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://infinitegameos.io/sovereignty',
      lastModified: new Date('2026-04-10T00:00:00Z'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://infinitegameos.io/playbooks',
      lastModified: new Date('2026-04-10T00:00:00Z'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://infinitegameos.io/updates',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://infinitegameos.io/about',
      lastModified: new Date('2026-04-10T00:00:00Z'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...updateEntries,
  ]
}
