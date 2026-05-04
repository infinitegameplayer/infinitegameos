---
description: Use when building, refreshing or extending a website with Claude Code as the primary build engine. Frame-agnostic by design. Triggered by "build the site," a redesign brief, a new page route or any project where the site needs to change.
---

# Website Builder

Purpose: Build, refresh and extend custom websites using Claude Code as the primary build engine. Fully self-contained. The skill produces deploy-ready site code with AI discoverability built in from the first scaffold.

Trigger: A new site needs to exist. An existing site needs a redesign. A new page route is on the plan. A discoverability audit has surfaced stale AI-facing surfaces. Any time "the site needs to change" is the state of play.

Triggered by: "build the site," "redesign," "add a page to," "update the website" or activation of any website-build plan that names this skill.

Inputs:

- `brand_spec` (required): your brand and voice specification. Tone, vocabulary, visual direction, audience, primary CTA. Can be a markdown file, a document or a detailed prompt brief.
- `design_system_spec` (optional): your design system document covering colors, typography, spacing, motion parameters, card architecture, interaction standards and anti-slop detection. If you don't have one yet, the HTML preview step will produce it.
- `page_list` (required): the pages and sections the site needs. Each page named with its sections, headline direction, content intent and CTA.
- `content_sources` (optional): existing copy, offer pages, articles, product descriptions or any material Claude can read to avoid inventing copy.
- `target_stack` (optional): framework preference, styling approach, hosting target. Defaults to the reference stack if not specified.
- `existing_repo` (optional): path or URL to an existing codebase for refresh or extension sessions.

Outputs:

- Page routes and component files for the full site
- `public/robots.txt`: crawler allowlist with no AI blocking
- `public/llms.txt`: plain-text site manifest for AI agents
- `public/llms-full.txt`: extended digest with vocabulary and concept-level depth (for content-rich sites)
- `src/app/sitemap.ts`: auto-generated sitemap route
- JSON-LD structured data on every page (schema type appropriate to page)
- Content negotiation route handler (serves `Accept: text/markdown` from your existing URLs)
- IndexNow integration (key file + API route)
- Deploy-ready repo with `README` covering local run and deploy steps

This skill exists because sites built without structural enforcement drift on every iteration. AI discoverability surfaces get written once and never updated. Design decisions live only in conversation context where a later executor can't see the reasoning. The anti-slop gate, the HTML preview protocol, the discoverability checklist and the three-state deploy verification are structurally impossible to skip when they live as skill steps rather than a memory.

## Make It Yours

This skill is a starting point, not a finished tool. An experienced web practitioner knows things this v1 can't anticipate: which framework quirks matter in your stack, which animation patterns fit your design language, which deployment edge cases your host introduces, which accessibility standards your audience requires, what your content update rhythm looks like in practice. The structural discipline (brand-input load, anti-slop gate, HTML preview before React build, design-decision protocol, AI discoverability checklist, three-state deploy verification) is the bone. Your experience is the muscle.

Run a brainstorm pass on this skill before first use or after a first run that surfaces gaps. Edit the SKILL.md directly. Swap stack components in the Steps where your framework differs from the reference. Tune the discoverability checklist for your site's audience and crawl posture. Add custom constraints ("never use external font CDNs," "always ship reduced-motion variants," "every image needs a logged alt attribute rationale"). Add your design system file to the brand input load so it arrives in every session without re-entering. The skill is a substrate. You are the operator. Make it yours.

## Why This Exists

Sites built in linear conversation sessions drift. Design decisions get made verbally and lost. AI-facing surfaces get written once and never updated. The anti-slop gate gets skipped when the build feels close. The discoverability checklist becomes a post-deploy fix rather than a ship gate. This skill structures the sequence so the discipline is always present, the decisions are always written back to the spec before code is touched and the ship gate runs before the deploy is called complete. The result is a site that works for AI agents and human visitors at the same level of precision.

## Cross-Site Memory Pattern

When operating multiple sibling sites, keep a lightweight cross-site findings file. While working on Site A, if you notice a fix that should also apply to Site B, append a one-liner to the Site B section in the file. Do not immediately work on Site B. Continue with Site A's planned scope. The note is the memory; the fix lands in Site B's next session.

Session-start workflow: read the file, surface items for the current site, confirm with the operator whether to address them in this session or defer. For items addressed: remove the line as part of the same commit. This pattern avoids context bloat from bundling two sites in one session while ensuring cross-site fixes don't get lost.

---

## Design Decision Protocol

Any visual or design choice reached via mock comparison (HTML preview, variant bake-off, token exploration) gets written back into the active design spec before code is touched. The spec holds the decision; the code implements it. This prevents decisions from living only in conversation context where a later executor can't see the reasoning.

Scope: new components, color or typography choices, motion parameters, interaction patterns. The principle: if you made a decision visually, record it structurally before building it.

---

## Subagent Dispatch

Set `model` explicitly on every `Agent` call. Sonnet for page-scaffolding workers and copy-drafting. Haiku for mechanical lookups (file reads, route inventory, config checks). Opus for architectural judgment (new site structure, cross-page pattern decisions). Default-Opus inheritance is not the answer. The discipline is the asking.

---

## Steps

### Step 1 — Brand Input

Load your brand and voice materials before writing a single line of prompt.

Minimum inputs:
- Your design system spec (colors, typography, spacing, motion gates, anti-slop detection, polish checklist, card architecture, interaction standards). If you don't have a formal spec yet, note the key decisions you've already made and the HTML preview step will produce a spec artifact you can reference in future sessions.
- Your brand voice spec (tone, vocabulary, reading level, archetype, key phrases to use, key phrases to avoid).
- Your offer architecture or site content spec (what the site sells or offers, primary CTA, supporting pages, section order).
- Your build plan (the current state of what needs to change, any pages already in scope, any decisions already made).

Fill in the build prompt template (see below) before opening your Claude Code session in the site directory.

**Anti-slop gate:** After scaffold output (Step 3) and before iteration, run an anti-slop scan. Check for generic typography tells (hero headline that could describe any site), color tells (arbitrary blues and grays without rationale), layout tells (generic three-card grid used without intent), motion tells (animation that fires everywhere without purpose) and content tells (lorem ipsum still present, or placeholder copy that wasn't replaced). Flag any instance and fix before proceeding.

### Step 2 — Environment

Each site lives in its own directory outside your system's core vault or monorepo.

Open a Claude Code session in the site directory (e.g., `~/sites/your-site-name/`). Confirm Node.js (LTS) is installed. Confirm git is initialized in the directory before scaffold output so no work gets lost.

### Step 3 — Scaffold

Paste the completed build prompt template into Claude Code. Claude generates the full site structure. Expect:

- `src/` with page and component files
- `package.json` with framework, styling and relevant dependencies
- `public/` with `robots.txt`, `llms.txt` and favicon
- README with local run instructions

Run locally: `npm install && npm run dev`

Verify the local build is clean before moving to design preview.

### Step 3.5 — HTML Design Preview

Before writing framework code, build local HTML preview files for operator review. This is a standard step, not optional. The pattern accelerates decisions by making them visual and tangible.

**How it works:**
1. Build self-contained HTML files with inline `<style>`, CDN font links (no npm dependency) and real copy (no lorem ipsum).
2. Save to Desktop or a designated preview folder for easy browser access (e.g., `Desktop/site-design-preview.html`).
3. CSS custom properties should match exact variable names from the target `globals.css` so translation to production is 1:1.
4. Include labeled variants where decisions are open (e.g., "Variant A / B / C" with visible labels).
5. Operator reviews in browser, picks winners, parameters get locked.
6. Locked decisions cascade into the next preview. No preview starts until the previous one is approved.

**What to preview:**
- Design system foundations (fonts, colors, backgrounds) when tokens are changing
- Full homepage layout with real copy when the homepage is being redesigned
- Interaction patterns (scroll reveals, ambient effects) when the interaction layer is being upgraded
- Interior page propagation (before/after comparisons) when a design system change affects multiple pages

**Why this is standard:** The pattern accelerates design decisions by turning abstract conversations into "I can see it, I can react to it" moments. Decision-making is fastest when the operator can subtract from visible options. The preview is the source of truth for design parameters before code is written. Write the locked decisions back to your design spec before opening the codebase.

### Step 3.7 — Design Polish

After HTML preview approval and before framework build, run a pre-ship polish pass. Twelve dimensions:

1. Visual/spacing: consistent rhythm, no orphan padding, section breathing room adequate
2. Typography: scale intentional, no orphan lines in hero text, line-height appropriate
3. Color/contrast: WCAG AA minimum, meaningful color usage, no arbitrary grays
4. Interaction states: hover, focus, active states present on all interactive elements
5. Micro-interactions: scroll reveals purposeful, hover lifts proportional, button press feedback present
6. Content: no placeholder text, no lorem ipsum, all CTAs written to spec
7. Icons/images: descriptive alt text on every image, icons consistent weight and style
8. Forms: labels visible, error states handled, field order logical
9. Edge cases: long names, empty states, mobile keyboard overlap handled
10. Responsiveness: mobile-first, breakpoints intentional, touch targets 44x44px minimum
11. Performance: no render-blocking imports, images appropriately sized, LCP candidate identified
12. Code quality: no dead imports, no hardcoded magic numbers, no commented-out blocks

Also verify:
- `prefers-reduced-motion` is implemented on all animations
- Button press feedback (`scale(0.97)` on `:active`) is present on all buttons
- Animation frequency, purpose, easing and duration each pass your design's motion gates (four gates: is this frequency necessary? is there a purpose? is the easing appropriate? is the duration right?)

### Step 4 — Iterate

Refine conversationally. Examples of valid iteration prompts:

- "Make the hero section bolder and add a scroll-reveal animation to the subheading."
- "The CTA block feels too heavy. Lighten it. More whitespace, smaller button."
- "Add a `/speaking` page with the four pillars from the brand input."
- "The nav feels corporate. Make it minimal, no borders."

One change at a time. Verify in browser between iterations.

**Design audit capability:** At any point during iteration, run a design audit. Five dimensions scored (accessibility, performance, theming, responsive, anti-patterns) with severity ratings (P0 critical, P1 ship-blocker, P2 polish, P3 nice-to-have). Use this when the build feels "close but something is off" or before final deploy.

### Step 5 — AI Layer

Before deploying, verify all items on the AI Discoverability Checklist (see below). Most will already be generated from the build prompt template. Verify each one manually.

### Step 6 — Deploy

1. Initialize a git repo in the site directory: `git init && git add . && git commit -m "initial build"`
2. Push to a new private GitHub repo
3. Connect repo to hosting provider (Vercel, Netlify, Cloudflare Pages or your preferred host)
4. Add custom domain in the host's dashboard
5. Update DNS at your domain registrar: point A record or CNAME to the host's values
6. Verify SSL auto-provisioned (most major hosts handle this automatically)
7. Test at live domain
8. **Run three-state deploy verification.** Confirm Local / Submitted / Confirmed. A deployment is not complete until it's verified live at the public URL. Never stop at Local or Submitted and call it done.
9. **Notify search engines.** Run your IndexNow notification script after three-state confirmation. This notifies search engines that content has changed. Run only after verification. Pinging before confirmation notifies crawlers to fetch stale content.

### Step 7 — Seal

- Update your build plan: mark status as `implemented`, add breadcrumb with live URL
- Log in your project tracker: "Site name live at domain. Stack: [your stack summary]."
- Add a `## Security` section to the site's `CLAUDE.md`. This section is the live security status indicator. Minimum fields: last check date and session, current status (what is active, what is deferred), next dependency sprint date (quarterly is a reasonable cadence) and a cross-site note if you operate multiple sites.

---

## Build Prompt Template

Copy and fill this before Step 3. Paste the completed template as the opening message in Claude Code in your site directory.

```
Build me a complete, production-ready website with the following specifications.

SITE IDENTITY
Name: [site-name]
Domain: [domain.com]
Purpose: [One sentence: what this site does and who it's for]
Primary CTA: [The one action visitors should take]

BRAND TONE
Voice: [Describe your brand voice, e.g., warm and direct / mythic simplicity / professional-casual]
Energy: [Invitation / showcase / authority / community / etc.]
Reading level: 5th grade. Short sentences. One idea per paragraph. No jargon.

VISUAL DIRECTION
Palette: [Describe your color direction. Specific hex codes if you have them, or descriptive anchors]
Font style: [Describe your typography pairing, e.g., editorial serif display + clean sans body]
Feel: [Dark and grounded / warm and open / minimal and refined / etc.]
Reference sites (vibes only, not copy): [Optional]

PAGES AND SECTIONS
[List each page and its sections. Example:]
Home:
  - Hero: [Headline, subheading, CTA button text]
  - Offers: [Section heading, offer cards with name + one-line description]
  - About: [2-3 sentences about the operator, no bio format]
  - Footer: [Links, email]
[Add more pages as needed]

COPY DIRECTION
[Paste or reference specific copy for key sections. Or: "Generate copy aligned to brand tone above."]

TECHNICAL REQUIREMENTS
- [Your framework of choice, e.g., Next.js, Astro, Remix]
- CSS animations only (no Framer Motion). IntersectionObserver for scroll reveals. CSS transitions for hovers and press feedback.
- [Your styling approach, e.g., Tailwind CSS, CSS Modules, vanilla CSS]
- Fully responsive (mobile-first)
- [Font approach: system fonts / self-hosted / CDN with specific font names]
- Generate public/robots.txt (allow all crawlers), public/llms.txt (see template below) and proper meta tags on all pages
- JSON-LD structured data on home page (Organization or Person schema)
- Clean URL slugs for all pages

LLMS.TXT CONTENT
[Fill from llms.txt template below]
```

---

## llms.txt Template

`llms.txt` lives at the site root (`/public/llms.txt`). It's plain text. AI agents read it to understand who runs the site and what it contains.

```
# [Site Name]
> [One sentence: what this site is and who it's for]

[2-3 sentences: what visitors will find here, what the site is not for and who the operator is]

## Pages
- /: [Home, brief description]
- /[page]: [Description]
[Add one line per page]

## Owner
[Your name | your@email.com | yourdomain.com]

## Last Updated
[YYYY-MM-DD]
```

---

## Figma Integration

When a Figma design file is the source for a site build, use the Figma MCP server alongside this skill to implement with 1:1 visual fidelity.

**Activation prerequisite:** The Figma MCP (`https://mcp.figma.com/mcp`, streamable-HTTP, OAuth) must be connected before any Figma-sourced session. Add it to your MCP configuration before opening the site directory.

**Context-first rule:** Always call `get_design_context` and `get_screenshot` before writing any implementation code. Never implement from a Figma screenshot shared in chat alone.

**URL parsing:** From any `figma.com/design/...` URL, extract the fileKey (segment after `/design/`) and nodeId (value of the `node-id` query parameter).

**Asset rule:** If the Figma MCP returns a localhost source for an image or SVG, use it directly. Never install new icon packages. Never create placeholders when a localhost source is provided.

**Validation gate:** Before marking a component or section complete, validate the implemented code against the `get_screenshot` output. Check spacing, typography, colors, interactive states and responsive behavior.

---

## Concept Pages Pattern

When a site has named frameworks, archetypes, practices or distinctions that should be findable by AI systems, build a `/concepts/[slug]` route using this architecture:

**Data file:** `src/data/concepts.ts`. Typed array of concept objects (slug, title, label, capsule, subtitle, sections, relatedSlugs, ctaLinks). All content lives here, not in page files.

**Dynamic route:** `src/app/concepts/[slug]/page.tsx`. `generateStaticParams` from the data file. Each page renders: answer-first capsule (40-60 words, prominent text, not muted), depth sections with scroll reveals, related concept cards grid, CTA buttons.

**Index page:** `src/app/concepts/page.tsx`. Card grid of all concepts with label, title, subtitle.

**JSON-LD per concept page:** `DefinedTerm` (name, description, inDefinedTermSet) + `Article` (headline, author, publisher) + `BreadcrumbList` (Home > Concepts > Title).

**JSON-LD on index:** `DefinedTermSet` with `hasDefinedTerm` array listing all concepts.

**After adding concepts:** update sitemap.ts, llms.txt (vocabulary cluster + concept pages section), llms-full.txt (capsule + summary per concept), navigation and footer.

---

## Website Refresh Sequence

When refreshing an existing site (not building from scratch), use this 5-engagement sequence. Each engagement produces a deliverable the operator reviews before the next begins.

1. **Design Tokens.** Lock colors, typography, spacing, radius, grain. Save to a token sheet in your brand folder for cross-session use. Operator approves before moving on.
2. **Homepage Layout.** HTML preview with real copy. Content structure, section order, hero direction, card layout. No interactions yet. Operator approves layout.
3. **Interaction Layer.** HTML preview with live intensity controls (radio buttons for pulse, cursor parallax, scroll reveal variants). Operator tunes intensity and locks parameters.
4. **Interior Page Propagation.** Side-by-side old/new HTML preview for every interior page. Confirms token changes propagate cleanly. Operator confirms nothing breaks.
5. **Framework Build + Ship.** Implement everything in the actual codebase. Button audit (every link, every class, every handler). Build verification. Push. Three-state deploy confirmation. Run AI Discoverability Refresh Audit before treating the ship as complete.

**Key principle:** All design decisions happen in HTML preview form (Engagements 1-4). No framework code is written until the design is fully locked. This eliminates rework.

**Design authority chain:** Brand spec → Design token sheet → Site CLAUDE.md. The token sheet is the implementation reference. The CLAUDE.md is the session-level governance.

**New Route Checklist (activate when this session adds a new page route):** Before treating any new route as shipped, verify all of the following:
- `page.tsx` with metadata (title, description, canonical, OG, Twitter card)
- JSON-LD schema (Article, FAQPage, BreadcrumbList as appropriate for the page type)
- Structured content added to `src/lib/page-data.ts` (for any data arrays or shared strings)
- Generate function added to `src/lib/markdown-content.ts` and route wired into `getMarkdownForPath`
- `generateStaticParams` updated if the route is dynamic
- `src/app/sitemap.ts` covers the new route
- `public/llms.txt` updated if the page is a meaningful new offering or section
- Run AI Discoverability Refresh Audit at Tier 4 (full audit, IndexNow ping required)

---

## Reference Implementation

The skill names a specific stack as the reference, then frames each component generically. Operators with different stacks substitute component by component.

| Component | Reference | Alternatives |
|---|---|---|
| Build engine | Claude Code | Universal. Stays. |
| Framework | Next.js | Astro, Remix, vanilla React, Eleventy, Hugo, SvelteKit |
| Animation | CSS animations + IntersectionObserver | Framework-agnostic. No JS animation libraries required. |
| Styling | Tailwind CSS | CSS Modules, vanilla CSS, CSS-in-JS (Stitches, Emotion), Sass |
| Hosting | Vercel | Netlify, Cloudflare Pages, GitHub Pages, self-hosted VPS |
| DNS | Registrar-agnostic | Vercel, Netlify and most hosts provide A record and CNAME values. Your registrar applies them. |

The build steps hold across every combination. The HTML preview pattern, the anti-slop gate, the design decision protocol and the discoverability checklist are all framework-agnostic. The Master Prompt Template has a `TECHNICAL REQUIREMENTS` block where you specify your stack; swap those lines to match your choice.

---

## AI Discoverability Checklist

Run this before DNS cutover on new builds and before deploy seal on any page-content change. Check each item manually.

- [ ] `/llms.txt` exists at site root, content is descriptive and accurate
- [ ] `/robots.txt` exists, `User-agent: *` with `Allow: /` (no AI blocking)
- [ ] JSON-LD structured data present on home page (`Organization` or `Person` schema as appropriate)
- [ ] Every page includes `BreadcrumbList` JSON-LD at minimum (Home > Page Name)
- [ ] `<h1>` present and unique on every page
- [ ] Heading hierarchy correct: `h1` once per page, `h2` for sections, `h3` for subsections
- [ ] `<meta name="description">` on every page, 120-160 characters, keyword-intentional
- [ ] `<title>` tag on every page, includes site name
- [ ] Metadata includes `robots: { index: true, follow: true }` with `'max-image-preview': 'large'` (required for Google Discover eligibility)
- [ ] Open Graph metadata with `og:image` (min 1200px wide) on every page
- [ ] Twitter card metadata (`summary_large_image`) on every page
- [ ] Clean URL slugs: `/speaking`, `/workshop`, `/about` (no query strings, no IDs)
- [ ] All images have descriptive `alt` attributes
- [ ] Sitemap generated (`/sitemap.xml` via `sitemap.ts`) and linked in `robots.txt`
- [ ] IndexNow key file present in `public/` and API route at `src/app/api/indexnow/route.ts`
- [ ] `INDEXNOW_SECRET` env var set in your hosting provider's project settings
- [ ] Content negotiation: `Accept: text/markdown` rewrite in `next.config.ts` (or equivalent in your framework), catch-all route handler at `src/app/markdown/[[...path]]/route.ts`, content map at `src/lib/markdown-content.ts` (see Content Negotiation Pattern below)
- [ ] `<link rel="alternate" type="text/markdown" href="/llms.txt">` in site `<head>` for clients that can't set Accept headers
- [ ] apex→www redirect uses 308 (permanent) not 307 (temporary). 307 breaks redirect chains and leaks PageRank

---

## Content Negotiation Pattern

Three-file implementation for serving `Accept: text/markdown` and `text/plain` from the same URLs as HTML:

1. **Rewrite rule** in your framework config (e.g., `next.config.ts`): rewrites requests with `Accept: text/markdown` header to a markdown handler path.
2. **Route handler** at `src/app/markdown/[[...path]]/route.ts` (or your framework's equivalent): reads the incoming path, looks up the content map and returns the markdown string with `Content-Type: text/markdown`.
3. **Content map** at `src/lib/markdown-content.ts`: maps each route path to a function that returns the markdown representation of that page's content.

**Maintenance:** when page content changes, the markdown content map drifts unless updated. The preferred drift prevention is data-layer separation: move static page text into `src/lib/page-data.ts`; both `markdown-content.ts` and `page.tsx` import from it so both surfaces update together.

**Named-export rule:** When `page-data.ts` exports an array of named objects, co-export a named constant for each member and compose the array from those constants. Consumers reference named constants directly. Never use `array.find()!` on a data-layer array in consumers. This eliminates a runtime crash path that's easy to write under execution density.

**FAQ dual-surface rule:** When a page has both a JSON-LD `FAQPage` schema block and rendered FAQ components, create a single `FAQItem[]` export in `page-data.ts`. Both the schema generation and the component rendering derive from it. The schema block and the component list are a hidden second drift surface. Scan for it before closing any page file edit.

---

## AI Discoverability Refresh Audit

Any time page-level content changes (a full refresh, a hero copy revision, a new section, renamed offerings), the AI-agent-facing surfaces can silently drift from the live HTML. The sitemap regenerates automatically. The hand-authored surfaces don't. Run this audit before treating any page-content change as shipped.

**Content change severity tiers. Determine audit depth before running any steps:**

| Tier | Change type | Audit required |
|---|---|---|
| **Tier 1** | Visual or styling only. No copy changes, no structural changes. | None. No AI surface impact. Exit immediately. |
| **Tier 2** | Copy change within existing data structure. `page-data.ts` auto-propagates to both `page.tsx` and `markdown-content.ts`. | Spot-verify: `curl -sL -H "Accept: text/markdown" <url>`. Confirm output reflects the change. Steps 2-4 only if `llms.txt` or metadata were also touched. |
| **Tier 3** | New structured data: new product, price change, new FAQ, new section. | Extend `page-data.ts`. Extend generate function. Run all audit steps 1-6 including IndexNow ping. |
| **Tier 4** | New page route added. | Run the New Route Checklist first. Then run all audit steps 1-6. IndexNow ping required. |

Identify the tier first. Tier 1 exits immediately. Tier 2 exits after a spot-check. Tiers 3 and 4 run all steps.

**Surfaces that drift when page content changes:**

| Surface | File | Drifts when... |
|---|---|---|
| Hand-authored page markdown (per-route) | `src/lib/markdown-content.ts` | Page structure changes, copy changes, links change, offerings change |
| Site-level AI overview | `public/llms.txt` | Active offerings change, page names change, pages are added or removed |
| Full site digest | `public/llms-full.txt` | Philosophical content or concept vocabulary shifts |
| Root metadata (OG, Twitter, description) | `src/app/layout.tsx` metadata | Identity imagery changes, positioning line changes |
| Per-page JSON-LD | `layout.tsx` root + per-page schemas | Description fields, @id references or schema types drift from new content |

**Surfaces that do NOT drift (auto-generated or static-by-design):**

- `sitemap.xml`: regenerated every build from `src/app/sitemap.ts`
- `robots.txt`: static, crawler allowlist unchanged by content
- IndexNow key file: static infrastructure
- `src/lib/markdown-content.ts` routes that derive from `src/lib/page-data.ts` are structurally drift-proof. Both the page component and the markdown generator import from the same source

**When to run this audit:**

- At the end of any Website Refresh Sequence (step 5, before three-state deploy confirms Confirmed state)
- After any edit to `page.tsx`, `layout.tsx` or page-structure components that changes visible copy
- After any copy refresh that changes offerings, titles, CTAs or section structure
- Before calling your IndexNow notification script post-deploy

**Audit steps:**

1. **Triage routes by pattern first.** For routes on the `page-data.ts` pattern: skip content comparison (structurally drift-proof). Run a structural drift check instead: compare `GENERATED_PATHS` in `markdown-content.ts` against all routes in `src/app/`. Any route without a corresponding generate function is an uncovered surface. For routes using hand-authored static strings: read the relevant entry in `src/lib/markdown-content.ts`, compare section by section to the new HTML and fix any stale sections, offerings, links or CTAs.
2. **Grep `public/llms.txt`** for any page names, product names or offering labels you changed. Fix if stale.
3. **Scan `public/llms-full.txt`** for homepage-structure references. Update only if the refresh touched concept vocabulary or philosophical framing.
4. **Review root metadata in `layout.tsx`** if the refresh changed hero identity imagery, the site description line or OG surface content.
5. **Post-deploy verification:** `curl -sL -H "Accept: text/markdown" "https://<domain>/<route>"` and confirm the response matches the new page structure.
6. **IndexNow ping (Tiers 3 and 4; optional for significant Tier 2 changes):** run your IndexNow script from your project root. Notifies search engines that content has changed. Run only after step 5 confirms markdown endpoints are correct.

**Why this exists:** A site refresh can ship the HTML layer cleanly while leaving `src/lib/markdown-content.ts` and `public/llms.txt` pointing at old copy. AI agents requesting `Accept: text/markdown` would see the old site. This audit is the standing gate that prevents that recurrence.

---

## Constraints

- Site code is a sovereign asset. It lives in your own git repo. Your hosting provider serves the code; it doesn't own it.
- Never auto-deploy. All DNS cutover and deploy confirmation require explicit operator approval.
- If a build plan gates the site work, confirm the plan's status is approved before building.
- When operating multiple sibling sites: design each one in awareness of the others. Run a cross-site gut check before finalizing any design.
- No em dashes anywhere in site copy. Short sentences. One idea per paragraph.
- **Positive framing pre-check on all hero and positioning copy.** Hero headlines, subheadlines, problem sections and positioning statements must define what things ARE, not what they are not. "Design your own game" not "Stop optimizing someone else's game." This check runs during generation, not as a post-hoc fix.
- If a build or deploy error surfaces, run a root-cause investigation before proposing any fix. Seeing the symptom is not understanding the cause.
- Apex-to-www redirect must be 308 (permanent) not 307 (temporary). A 307 breaks redirect chains and leaks PageRank. Check the hosting provider's domain configuration.

## External Orientation

This skill operates under an ambassador posture. Primary: expand through value, not volume. Each site is a precision artifact that draws in aligned people. It's not a broadcast surface. Secondary: every site artifact is traceable back to operator intent. The site code is an ambassador. Every paragraph, every component, every meta tag carries the operator's frequency.

---

## Operating Posture

The brand input is the spine. The anti-slop gate is the filter. The discoverability audit is the ship gate. The site is a precision artifact, not a broadcast surface.
