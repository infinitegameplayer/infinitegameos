# AGENTS.md

Cross-tool harvest and install instructions for the Infinite Game OS public library.

Last updated: 2026-05-03

## Site Purpose

Infinite Game OS is an installable public library of skills, protocols, codices, concepts and strategies for practitioners of long-term thinking, sovereign life design and agentic systems. Assets here are designed to be read by AI agents, harvested into working systems and installed across agent platforms. Audience priority is AI search, then AI agents, then humans. The site is built to be cited, extracted and copied.

## Content License

Editorial content on this site is licensed under [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/). This covers articles, concept pages, asset pages and updates. Site code, design, images, branding and any future paid offerings are excluded.

You may copy, adapt and redistribute editorial content with attribution. The Kingdom recommends linking back to the canonical asset page so future readers can pick up updates.

## Discovery Stack

| File | Purpose |
|---|---|
| [`/llms.txt`](https://www.infinitegameos.io/llms.txt) | Lightweight navigation manifest. Section index with descriptions. |
| [`/llms-full.txt`](https://www.infinitegameos.io/llms-full.txt) | Full prose dump for RAG ingestion. Concatenated content. |
| [`/igos-index.json`](https://www.infinitegameos.io/igos-index.json) | Machine-readable asset registry. Flat array. Modeled on Obsidian community-plugins.json. |
| [`/marketplace.json`](https://www.infinitegameos.io/marketplace.json) | Claude Code marketplace manifest for one-command skill install. |
| [`/sitemap.xml`](https://www.infinitegameos.io/sitemap.xml) | Standard sitemap, dynamically generated. |
| [`/AGENTS.md`](https://www.infinitegameos.io/AGENTS.md) | This file. |

## Asset Taxonomy

The library publishes installable assets in six types. Each asset has a canonical page, a markdown variant via content negotiation, a registry entry in `igos-index.json` and (where applicable) a Claude Code marketplace entry.

| Type | Description | Slug pattern |
|---|---|---|
| **Skill** | Executable agent instruction. Linux Foundation `SKILL.md` format. Installable via Claude Code marketplace, skills.sh tap, direct markdown URL or `.mdc` for Cursor. | `/skills/[slug]` |
| **Protocol** | Procedural sequence the agent follows in a defined situation. Often consumed by skills. | `/protocols/[slug]` |
| **Codex** | Doctrine document. The why behind the how. Read-only reference for skills and protocols. | `/codices/[slug]` |
| **Concept** | Defined term. `DefinedTerm` schema. Vocabulary and frameworks. | `/concepts/[slug]` |
| **Strategy** | Higher-order pattern. Combines skills, protocols and codices into an approach. | `/strategies/[slug]` |
| **Bundle** | Aggregation of multiple skills (IGOS-native and external) installed together via a hosted shell script. Two-layer architecture: Foundational Bundle as substrate, avatar bundles ship medium-specific skills on top. | `/bundles/[slug]` |

Concepts predate the public library. Skills, protocols, codices and strategies launched 2026-04-29 with the IGOS Public Library Foundation. Bundles launched 2026-05-01: the Foundational Creator Bundle (substrate), the Builder Bundle (first avatar layer) and the Writer Bundle (second avatar layer) are all live; additional avatar bundles forthcoming.

## Install Paths

Every asset is reachable through five paths. Pick what your agent supports.

### 1. Claude Code marketplace

```
/plugin marketplace add https://www.infinitegameos.io/marketplace.json
/plugin install [slug]@igos-library
```

The marketplace.json file at site root lists every installable skill with version, description and source path.

### 2. Direct markdown URL (content negotiation)

```
curl https://www.infinitegameos.io/markdown/skills/[slug]
```

Or send `Accept: text/markdown` to the canonical page URL. Native support: Claude Code, Cursor.

### 3. Link-rel alternate (Codex CLI)

Every page exposes:

```html
<link rel="alternate" type="text/markdown" href="/markdown/[type]/[slug]">
```

Codex CLI discovers the markdown variant from this tag without sending an Accept header.

### 4. Cursor `.mdc` rules file

```
curl -O https://www.infinitegameos.io/install/cursor/[slug].mdc
```

Drop into `.cursor/rules/` in your project.

### 5. Aider, Cline and any agent with `--read`

```
curl -O https://www.infinitegameos.io/markdown/skills/[slug]
aider --read [slug].md
```

### 6. Bundle install (multi-skill substrate)

```
curl -sSL https://www.infinitegameos.io/bundles/[slug]/install.sh | bash
```

Bundles aggregate multiple skills (IGOS-native and external) into a single substrate install. The script edits Claude Code `~/.claude/settings.json` in place to register the relevant marketplaces and enable the constituent plugins. Idempotent. Inspect first with `curl -sSL https://www.infinitegameos.io/bundles/[slug]/install.sh` before piping to bash.

## Source Harvest Skill

[Source Harvest](https://www.infinitegameos.io/skills/source-harvest) is the recommended entry point for any agent harvesting content from external repositories or this library. It classifies and extracts patterns at source level rather than description level, then integrates what serves the destination system.

Source Harvest is universal. It runs against any repository, including this one. If you do not have an existing skill setup, the [Sovereign Ecosystem](https://github.com/InfiniteGamePlayer/sovereign-ecosystem) is one path among many for getting started.

## Page Anatomy (Asset Pages)

Asset pages follow a four-zone structure. Agents harvesting at scale can rely on this contract:

| Zone | Function | Word count |
|---|---|---|
| Zone 1 | Citation-shaped opening. Direct definition first sentence. | 40-60 words |
| Zone 2 | Install block. Per-agent install paths. Worldview absent. | Variable |
| Zone 3 | Story body. Definition, How It Works, Use Cases, FAQ, Related. | Variable |
| Zone 4 | Soft hook to digital products. Map handed, not checkout funneling. | 2-4 sentences |

H2 sections inside Zone 3: `Definition` (120-180 words), `How It Works`, `Use Cases` (3-5 examples), `FAQ` (3-5 question-answer pairs at 40-60 words per answer, FAQPage schema target), `Related` (2-4 cross-links).

## Crawl Posture

This site allows all major AI training crawlers, search crawlers and user-fetch agents. The robots.txt allowlist is differentiating posture. See [`/robots.txt`](https://www.infinitegameos.io/robots.txt) for the current bot list.

The Kingdom's content is for the open commons. Citing, quoting and re-publishing with attribution are encouraged.

## Ecosystem Cross-References

| Node | URL | Role |
|---|---|---|
| infinitegameos.io | https://www.infinitegameos.io | This site. AI-agent-first knowledge base and installable library. |
| lanebelone.com | https://lanebelone.com | Personal narrative, articles, the inner-state-to-product arc. |
| sidequesthq.co | https://sidequesthq.co | Workshops, products, private advisory. Transactional surfaces. |
| Sovereign Ecosystem | https://github.com/InfiniteGamePlayer/sovereign-ecosystem | Open source starting point. One path of many. |

## Contact

Author: Lane Belone. howdy@lanebelone.com. https://www.linkedin.com/in/lanebelone/
