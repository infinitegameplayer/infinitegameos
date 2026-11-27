// Every file an agent reads to discover this site. The proxy matcher reaches
// each one (none sits under /api/, /_next/ or /markdown, and none carries an
// asset extension, the matcher's only exclusions), and agent-log.test.ts holds
// this list against public/ and the app directory, so a new discovery file
// cannot ship unlisted. `source` is the file that serves the path.

export const DISCOVERY_FILES: readonly { path: string; source: string }[] = [
  { path: '/robots.txt', source: 'public/robots.txt' },
  { path: '/sitemap.xml', source: 'src/app/sitemap.ts' },
  { path: '/llms.txt', source: 'public/llms.txt' },
  { path: '/llms-full.txt', source: 'public/llms-full.txt' },
  { path: '/AGENTS.md', source: 'public/AGENTS.md' },
  { path: '/marketplace.json', source: 'public/marketplace.json' },
  { path: '/igos-index.json', source: 'public/igos-index.json' },
  { path: '/infinite-game-os-primer.md', source: 'public/infinite-game-os-primer.md' },
  { path: '/rss.xml', source: 'src/app/rss.xml/route.ts' },
]
