// IGOS Public Library asset registry.
// Source of truth for: src/app/[type]/[slug] pages, src/lib/markdown-content.ts
// markdown variants, /public/igos-index.json, /public/marketplace.json.
//
// Adding a new asset: append a new IGOSAsset entry below. The page route, the
// markdown route, the registry JSON and the marketplace JSON pick it up.

export type AssetType = 'skill' | 'protocol' | 'codex' | 'concept' | 'strategy'

export interface UseCase {
  title: string
  body: string
}

export interface FAQItem {
  q: string
  a: string
}

export interface AssetSection {
  heading: string
  paragraphs: string[]
}

export interface InstallSurface {
  marketplaceId?: string
  skillsTap?: string
  cursorMdc?: boolean
  sourceMarkdownUrl?: string
}

export interface SoftHook {
  body: string
  ctaHref?: string
  ctaLabel?: string
}

export interface IGOSAsset {
  slug: string
  type: AssetType
  title: string
  label: string
  version: string
  updated: string
  description: string
  tags: string[]
  capsule: string
  installable?: InstallSurface
  definition?: string
  howItWorks?: AssetSection[]
  useCases?: UseCase[]
  faq?: FAQItem[]
  relatedSlugs?: string[]
  softHook: SoftHook
}

export const igosAssets: IGOSAsset[] = [
  {
    slug: 'source-harvest',
    type: 'skill',
    title: 'Source Harvest',
    label: 'Skill',
    version: '1.0',
    updated: '2026-04-29',
    description:
      'Systematic pattern extraction from any external repo or tool at source level. Classify, extract, integrate.',
    tags: ['harvest', 'extraction', 'governance', 'kingdom-skill'],
    capsule:
      'Source Harvest is a skill for extracting patterns from external repositories at source level rather than description level. It reads the actual implementation, classifies each component as Adopt, Enrich, Defer or Ignore, and executes approved integrations under governance. The README is not the nuance.',
    installable: {
      marketplaceId: 'source-harvest',
      cursorMdc: true,
    },
    softHook: {
      body:
        'Source Harvest is one entry point. The full system it lives inside is The Sovereign Life Playbook. The Playbook gives you the design frame for which patterns are worth extracting in the first place.',
      ctaHref: 'https://sidequesthq.co/products/sovereign-life-playbook',
      ctaLabel: 'See the Sovereign Life Playbook',
    },
  },
]

export function getAssetBySlug(slug: string, type?: AssetType): IGOSAsset | undefined {
  return igosAssets.find(a => a.slug === slug && (type ? a.type === type : true))
}

export function getAssetsByType(type: AssetType): IGOSAsset[] {
  return igosAssets.filter(a => a.type === type)
}

export function getAllAssetSlugs(): { type: AssetType; slug: string }[] {
  return igosAssets.map(a => ({ type: a.type, slug: a.slug }))
}
