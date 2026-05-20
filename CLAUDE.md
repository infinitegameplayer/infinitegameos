@AGENTS.md

# Infinite Game OS — Claude Code Context

## File Architecture

```
src/app/
  layout.tsx                  Root layout — JSON-LD WebSite + Person schema, fonts, Nav, Footer
  globals.css                 Tailwind 4 design system — @theme tokens, custom utilities
  page.tsx                    Homepage — OS orientation frame
  the-os/page.tsx             Philosophy anchor — FAQPage schema, "What is Infinite Game OS?"
  infinite-game/page.tsx      Core Infinite Game philosophy
  agentic-systems/page.tsx    Post Web synthesis, GEO definition inline
  sovereignty/page.tsx        Sovereign life design (public layer of Kingdom model)
  playbooks/page.tsx          Frameworks index — brief descriptions, individual pages added as content builds
  updates/page.tsx            Dynamic content index (bi-monthly steady-state cadence)
  updates/[slug]/page.tsx     Individual update posts — Article + BreadcrumbList schema
  concepts/page.tsx            Concepts index — DefinedTermSet schema, card grid
  concepts/[slug]/page.tsx     Individual concept — DefinedTerm + Article + BreadcrumbList schema
  about/page.tsx              Lane as practitioner — Person schema anchor
  not-found.tsx               Branded 404

src/data/
  concepts.ts                 Concept page data — all content for /concepts/[slug] lives here

src/components/
  Nav.tsx                     Navigation ('use client' — scroll detection)
  Footer.tsx                  Four-node ecosystem links (load-bearing for agent traversal)
  SectionReveal.tsx           Scroll reveals (vanilla IntersectionObserver, no Framer Motion)

public/
  robots.txt                  AI crawlers explicitly allowed
  llms.txt                    Structured AI manifest
  llms-full.txt               Full content for deep LLM reads (update quarterly)
  sitemap.xml                 All routes
```

## Concept Pages

Content-driven pages at `/concepts/[slug]`. All concept data lives in `src/data/concepts.ts` (typed array). The dynamic route renders capsule, sections, related concepts, and CTAs from the data file. To add a new concept: add an entry to the concepts array, rebuild. Sitemap, llms.txt, and llms-full.txt must be updated manually.

## Critical Rules

**Do NOT add `'use client'` to page files unless they use client-side hooks directly.** `SectionReveal`, `Nav`, and other client components already carry their own `'use client'` — server component pages can import them without the directive. Adding `'use client'` to a page prevents JSON-LD `<script>` tags from rendering into static HTML (Google and AI agents can't read them). Pages that genuinely need `'use client'` (direct useState/useEffect): none currently. Client components cannot export `metadata` — all pages rely on root layout defaults.

**No em dashes.** Kingdom-wide rule. Replace with a period and new sentence, or a comma. Applies to all site copy and markdown content served via content negotiation.

---

## JSON-LD Locations

- `layout.tsx`: `WebSite` schema with `url`, `name`, `description`, `author`, `sameAs`
- `layout.tsx`: `Person` schema with `name`, `url`, `sameAs`, `knowsAbout`, `jobTitle`
- `/the-os/page.tsx`: `FAQPage` (5-8 Q&A on Infinite Game OS) + `BreadcrumbList`
- `/infinite-game/page.tsx`: `FAQPage` (4-6 Q&A) + `BreadcrumbList`
- `/updates/[slug]/page.tsx`: `Article` + `BreadcrumbList`
- All other pages: `BreadcrumbList`

## Design Tokens (Tailwind 4)

All tokens defined in `@theme {}` in `globals.css`. Reference via CSS vars or Tailwind utilities:
- `--color-bg` / `bg-bg` — page background (#06090e)
- `--color-surface` / `bg-surface` — card/section background (#0e1420)
- `--color-accent` / `bg-accent`, `text-accent` — electric cyan (#22d3ee)
- `--color-text` / `text-text` — primary text (#e2e8f0)
- `--color-muted` / `text-muted` — muted text (#64748b)
- `--font-display` — Space Grotesk (headings)
- `--font-body` — Inter (body)

## Session Maintenance

**When adding a new page:** Add its route to `public/sitemap.xml`. Add an entry to `public/llms.txt`. If the page has significant content, add a summary line to `public/llms-full.txt`.

**When updating content:** Update `dateModified` in any relevant Article schema. Refresh `llms-full.txt` entry for that page.

**When a new AI crawler is publicly announced:** Add it to `public/robots.txt` in the same format as existing entries.

## Broadcast Sends

Newsletter sends to the Infinite Game audience flow through the `/api/internal/broadcast-trigger` endpoint. The send is content-driven and operator-gated.

**Frontmatter convention.** When an `/updates/[slug]` article warrants a Broadcast send, add `broadcast: true` to its mdx frontmatter. This is the intent marker. The flag does not auto-fire a send in v1; it signals which articles are newsletter-eligible.

**Send action.** After Deploy Seal confirms a production deploy, the King runs the trigger script from the Kingdom vault:

```bash
node "Council Chamber/scripts/igos-broadcast-trigger.mjs" --slug <article-slug> --audience test --dry-run
node "Council Chamber/scripts/igos-broadcast-trigger.mjs" --slug <article-slug> --audience test
node "Council Chamber/scripts/igos-broadcast-trigger.mjs" --slug <article-slug> --audience production
```

The script verifies the article, calls the API route, and returns the broadcast id and send status. Test audience first, then production.

**Required env vars.**
- `RESEND_AUDIENCE_INFINITE_GAME_ID` (production audience, already set)
- `RESEND_AUDIENCE_TEST_ID` (test audience with belone@tutamail.com only)
- `BROADCAST_TRIGGER_SECRET` (shared secret on the IGOS site and in Kingdom `scripts/.env`)
- `RESEND_API_KEY` (already set)

**Shared email shell.** `src/lib/email-shell.ts` renders both the welcome (transactional) email and Broadcast email from one layout. Same typography, footer treatment and unsubscribe styling.

**Broadcast Sent state.** The Local to Submitted to Confirmed trio extends to Broadcast Sent for newsletter-eligible content. The script output (HTTP 200 plus broadcast id) is the Broadcast Sent confirmation. Failed sends leave the Broadcast in the Resend dashboard as a draft for manual retry.

**Auto-scan deferral.** A build-time scanner that auto-fires on `broadcast: true` deploys was scoped and deferred. Manual trigger gives the operator visibility per send and prevents accidental fires from unintended deploys.

## Security

- HTTP security headers configured in `next.config.ts` (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, HSTS, CSP)
- CSP is strict at launch: no third-party scripts, no embeds. See `SECURITY.md` for the deferred items list
- If HubSpot or other third-party scripts are added in future, CSP must be updated before deploying
- Dependency sprint cadence: 2026-07-01 (aligned with other sites)

## Refinements

**2026-04-10** — Site initialized. Next.js 16 + Tailwind 4 (first in the Kingdom ecosystem to use these versions). Key difference from other sites: Tailwind 4 uses CSS-first config via `@theme {}` in globals.css, not tailwind.config.ts. No @fontsource packages needed; fonts loaded via next/font/google. auto-generated AGENTS.md and CLAUDE.md from create-next-app were replaced with Kingdom-standard versions.
