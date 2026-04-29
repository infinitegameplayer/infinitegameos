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
    definition:
      'Source Harvest is a skill for extracting patterns from external repositories, plugins and tools at the source level rather than the description level. It reads the actual implementation. It classifies each component against your existing tooling. It executes approved integrations under governance. The README is not the nuance. The descriptions on a homepage are not the patterns. The patterns live in the skill files, the hook scripts, the command definitions, the configurations and the protocol documents that ship inside a repo. Source Harvest treats those as the evidence base. Every component receives one of four dispositions: Adopt, Enrich, Defer or Ignore. Adoptions are conscious, governed and adapted to your system\'s voice and conventions. Nothing installs wholesale. The result is a body of work that grows by intentional integration, not by accumulation.',
    howItWorks: [
      {
        heading: 'The four dispositions',
        paragraphs: [
          'Every component reviewed in a harvest receives exactly one disposition. Adopt means a genuinely new capability not covered by your existing system. The component becomes a new internal skill or protocol, adapted to your voice and conventions. Enrich means the component strengthens something you already have. The harvest names the exact change and the target file, then executes the edit under approval. Defer means the pattern is interesting but no immediate gap warrants integration. The component is filed in a deferred inventory with a promotion signal: the specific trigger that should pull it back off the shelf later. Ignore means the pattern is fully covered by current capability or not relevant. The harvest documents the reason briefly and moves on.',
          'The four dispositions are the spine of the discipline. They make sure every component lands somewhere. Nothing drifts. Nothing accumulates by accident. The harvest report becomes a record of conscious decisions rather than an inventory of stored ideas.',
        ],
      },
      {
        heading: 'How a harvest runs',
        paragraphs: [
          'A harvest opens by confirming access to the source. Public repos are read directly. Closed platforms substitute capability documentation and API references for the source code. The classification framework still applies. After access, the harvest inventories every component: skills, hooks, commands, configurations, protocols, scripts. The list is presented to the operator before classification proceeds.',
          'Each component is then read in full. Filenames and one-line descriptions do not classify. Source content is the evidence. Once read, each component receives its disposition with one to three lines of rationale. The compiled harvest report is presented at the approval gate. No changes execute without explicit approval. Approved items execute step by step. Adopted skills are written to canonical paths with proper frontmatter and discoverability registration. Enriched files receive their precise edits. Deferred items are logged with promotion signals. The harvest closes with a summary report.',
          'The approval gate is the discipline. It is the moment intelligence-gathering becomes integration. Without that gate, harvests drift toward wholesale install. With it, every adoption is a conscious choice on your terms.',
        ],
      },
    ],
    useCases: [
      {
        title: 'Open-source plugin source review',
        body:
          'When someone publishes a Claude Code plugin, the description rarely surfaces the load-bearing patterns. Source Harvest reads the hooks, commands and skills directly, surfacing patterns like four-phase debug gates, dual confidence scoring rubrics or per-phase verification disciplines that descriptions skip. Each pattern receives a disposition before any code is integrated.',
      },
      {
        title: 'Closed SaaS platform capability inventory',
        body:
          'Closed-source platforms cannot be source-read, but feature documentation and API references serve as the evidence base. A capability-level harvest classifies each feature against existing internal systems. Patterns adopt. Disconnected internal tools sometimes reveal a synthesis that none of them named alone, like a workflow architecture connecting three previously separate systems.',
      },
      {
        title: 'Multi-source comparative harvest',
        body:
          'Three related skills run as a simultaneous harvest produce more signal than any one alone. When all three independently flag the same anti-pattern, that convergence is itself the finding. The output becomes a synthesized codex rather than three parallel skill clones, plus targeted enrichments to existing internal protocols where the convergence pulled them.',
      },
      {
        title: 'First-pass review for a tech watchlist',
        body:
          'Adding a new repo to an ongoing tech-watch list begins with a Source Harvest, not a description scan. The first review establishes whether the repo offers anything genuinely novel or whether it duplicates current capability. The disposition becomes the entry\'s classification record for future changelog reviews and pulls forward the patterns worth watching.',
      },
      {
        title: 'Backend-dependent plugin extraction',
        body:
          'A plugin that requires a worker service or local backend gets classified at the source level even though most of its skills are not adoption candidates. The patterns inside, like phase-zero documentation discovery or smart token-economics tables, often integrate cleanly into existing protocols even when the full plugin does not. The infrastructure is deferred. The patterns travel.',
      },
    ],
    faq: [
      {
        q: 'Why read the source instead of the README?',
        a: 'Descriptions summarize intent. Source carries the load-bearing patterns. A four-phase debug gate, a dual confidence scoring rubric or a per-phase verification discipline is invisible from a homepage. The patterns live in the skill files, the hook scripts and the configs. Source Harvest treats those as the evidence base.',
      },
      {
        q: 'What does each disposition mean in practice?',
        a: 'Adopt creates a new internal skill, adapted to your conventions. Enrich edits an existing skill or protocol with a precise change. Defer files the pattern in an inventory with a promotion signal. Ignore is documented and dismissed because your system already covers it. Every component lands somewhere.',
      },
      {
        q: 'Can Source Harvest classify closed-source or SaaS platforms?',
        a: 'Yes. When source code is unavailable, capability documentation and API references become the evidence base. The four dispositions still apply. The harvest operates at the pattern level rather than the implementation level. Feature inventories run against existing internal systems the same way.',
      },
      {
        q: 'What happens at the approval gate?',
        a: 'Step 6 is a hard pause. The harvest report is presented to the operator with every component classified. Nothing installs without explicit approval. The operator can approve all, approve a subset or revise. Approved items execute. Rejected items either get filed or dismissed.',
      },
      {
        q: 'How does Source Harvest scale to large repos?',
        a: 'Group by category. Read the highest-relevance components first. Flag anything skipped and document why. A repo with forty components rarely needs each one read in full. Five Adopt candidates, ten Enrich candidates and the rest Ignore is a normal harvest shape.',
      },
    ],
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
