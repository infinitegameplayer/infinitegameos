import type { MetadataRoute } from 'next'
import { getAllUpdates } from '@/lib/updates'
import { concepts } from '@/data/concepts'
import { getAssetsByType } from '@/data/library'
import routeDates from '@/lib/route-dates.json'

// lastModified for static pages comes from src/lib/route-dates.json, written by
// scripts/route-dates.mjs (prebuild) from the last commit that touched each
// page or a module it imports. A static route with no date fails the build on
// purpose, so a new route is added to scripts/route-dates.mjs ROUTES in the
// same change (Web Strategy Codex V.8: lastModified from page data).
const dates = routeDates as Record<string, string>
function pageDate(path: string): Date {
  const iso = dates[path]
  if (!iso) throw new Error(`sitemap: no date for ${path} in src/lib/route-dates.json (add it to scripts/route-dates.mjs ROUTES and run npm run route-dates)`)
  return new Date(iso)
}

export default function sitemap(): MetadataRoute.Sitemap {
  const updates = getAllUpdates()
  // getAllUpdates sorts newest first; same date source as the entries below.
  const latestUpdateDate = updates.length ? new Date(updates[0].date + 'T00:00:00.000Z') : pageDate('/updates')
  const updateEntries: MetadataRoute.Sitemap = updates.map(u => ({
    url: `https://www.infinitegameos.io/updates/${u.slug}`,
    lastModified: new Date(u.date + 'T00:00:00.000Z'),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // Per-concept updated timestamps live in concepts.ts (all 14 carry one).
  const conceptEntries: MetadataRoute.Sitemap = concepts.map(c => ({
    url: `https://www.infinitegameos.io/concepts/${c.slug}`,
    lastModified: c.updated ? new Date(c.updated + 'T00:00:00.000Z') : pageDate('/concepts'),
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
      url: 'https://www.infinitegameos.io/updates',
      lastModified: latestUpdateDate,
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
      url: 'https://www.infinitegameos.io/skills',
      lastModified: pageDate('/skills'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.infinitegameos.io/bundles',
      lastModified: pageDate('/bundles'),
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
      url: 'https://www.infinitegameos.io/charter',
      lastModified: pageDate('/charter'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://www.infinitegameos.io/privacy',
      lastModified: pageDate('/privacy'),
      changeFrequency: 'yearly',
      priority: 0.3,
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
    {
      url: 'https://www.infinitegameos.io/game-theory',
      lastModified: pageDate('/game-theory'),
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
