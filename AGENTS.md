<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Infinite Game OS — Agent Context

## Project Identity

`infinitegameos.io` is the AI-agent-first structured knowledge base in Lane Belone's four-node sovereign expertise web. This site is built to be found and read by AI agents. Every structural decision prioritizes machine legibility: semantic HTML, JSON-LD schema on every page, FAQPage schema on philosophy anchors, explicit AI crawler access, and consistent vocabulary throughout.

This is not a conversion funnel. It is a knowledge node. No forms, no embeds, no third-party scripts at launch.

## Ecosystem Position

Part of a four-node expertise web. Canonical source: [Sovereign Ecosystem Architecture Codex](https://github.com/InfiniteGamePlayer/sovereign-ecosystem).

| Node | URL | Role |
|---|---|---|
| **infinitegameos.io** | https://www.infinitegameos.io | AI-agent-first knowledge base — Infinite Game philosophy, agentic systems, sovereign life design |
| **lanebelone.com** | https://lanebelone.com | Personal brand anchor — thought leadership, philosophy, personal story |
| **SideQuestHQ.co** | https://sidequesthq.co | Offer hub — workshops, private advisory, retreats |
| **Sovereign Ecosystem** | https://github.com/InfiniteGamePlayer/sovereign-ecosystem | Technical infrastructure reference |

Cross-link obligations: Footer and About page must link to all four nodes with descriptive label text (not generic "visit"). These links are load-bearing for AI agent graph traversal.

## Stack

| Layer | Version / Choice |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript) |
| React | 19.x |
| Styling | Tailwind CSS 4 (CSS-first config, `@theme` block in globals.css) |
| Fonts | Space Grotesk (display), Inter (body) — both via `next/font/google` |
| Hosting | Vercel (auto-deploy from master branch) |
| Forms | None at launch |
| Image format | WebP preferred, max 1920px, under 200KB |

## Build and Dev Commands

```bash
npm run dev      # Development server (localhost:3000)
npm run build    # Production build (must pass cleanly before deploy)
npm run lint     # ESLint check
```

A clean `npm run build` with no TypeScript or lint errors is required before any push to master.

## Critical Rules

**No em dashes anywhere.** Replace with a period and new sentence, or a comma. Applies to all copy, JSX, and component strings. This rule has no exceptions.

**Never use Framer Motion.** It triggers CSP `unsafe-eval` violations in Brave Browser with Shields enabled. Use CSS `@keyframes` for animations and vanilla IntersectionObserver for scroll reveals.

**No `'use client'` on pages that export `metadata`.** These are incompatible in Next.js App Router. If a page needs both, extract the interactive portion to a child component and mark only that component `'use client'`.

**AI discoverability is load-bearing.** This site exists to be found by AI agents. Every schema field, heading hierarchy, and `llms.txt` entry is structural. Never defer or deprioritize AI-first elements for visual work.

**suppressHydrationWarning on `<body>`.** Password managers inject attributes that cause React hydration mismatches. Always present on the body element.

**Tailwind 4 CSS-first config.** There is no `tailwind.config.ts`. All custom tokens are defined in `@theme {}` inside `globals.css`. Utility classes are auto-generated from `@theme` tokens (e.g., `--color-accent` becomes `bg-accent`, `text-accent`).

## Content and Voice

Vocabulary to use consistently (agents build entity recognition from consistency):
- Infinite Game OS
- Infinite Game philosophy
- Sovereign creative operating system
- Agentic systems / agentic architecture
- Post Web
- Sovereign life design
- Creative leadership frameworks
- Long-term thinking systems
- Generative Engine Optimization (GEO)

Tone: precise, practitioner-facing, minimal. Sentences are short. Paragraphs are single-idea. No Oxford comma. No performative enthusiasm.

## AI Discoverability

| File | Status | Purpose |
|---|---|---|
| `public/robots.txt` | Active | Explicitly allows GPTBot, ClaudeBot, PerplexityBot, GoogleExtended, Applebot-Extended |
| `public/llms.txt` | Active | Structured manifest for AI systems |
| `public/llms-full.txt` | Active | Full page content for deep LLM reads |
| `public/sitemap.xml` | Active | All routes |

Schema types deployed:
- `WebSite` + `Person` — `layout.tsx` (site-wide)
- `FAQPage` + `BreadcrumbList` — `/the-os`, `/infinite-game`
- `Article` + `BreadcrumbList` — `/updates/[slug]`
- `BreadcrumbList` — all remaining pages

## Cross-Ecosystem Links

These links must be maintained. They are load-bearing for agent discovery:

| From | To | Location |
|---|---|---|
| About page | lanebelone.com | "The practitioner behind this OS" |
| About page | sidequesthq.co | "Workshops and advisory" |
| Agentic Systems page | Sovereign Ecosystem GitHub | "The technical infrastructure" |
| Footer | All four nodes | Descriptive labels, not generic text |

## Refinements

_Empty at creation. Add date-stamped entries as sessions reveal new constraints._
