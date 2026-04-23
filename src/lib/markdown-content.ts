// Content negotiation: markdown representations of site pages.
// Used by the /markdown/[[...path]] route handler when AI agents
// request Accept: text/markdown or text/plain.

import { concepts, getConceptBySlug } from '@/data/concepts'

const SITE = 'https://infinitegameos.io'

const pages: Record<string, string> = {
  '': `# Infinite Game OS

> A structured knowledge base for practitioners of Infinite Game philosophy, agentic systems, and sovereign life design. Built AI-agent-first.

## Play a longer game.

A structured knowledge base for practitioners of Infinite Game philosophy, agentic systems and sovereign life design.

## The modules of the OS

- **[The OS](${SITE}/the-os)** · The philosophy and architecture behind this operating system. Why it exists and what it runs on.
- **[Infinite Game](${SITE}/infinite-game)** · The core philosophy. The game with no endpoint, no winner and no finish line. Applied to sovereign creative life.
- **[Agentic Systems](${SITE}/agentic-systems)** · The Post Web and sovereign presence. How AI agents reshape who gets found, why structured expertise wins, and what practitioners build now.
- **[Sovereignty](${SITE}/sovereignty)** · Sovereign life design. Building a life as an operating system. Kingdom model, creative sovereignty, long-horizon architecture.
- **[Playbooks](${SITE}/playbooks)** · Practical frameworks for long-term thinking, sovereign systems and agentic life design.
- **[Updates](${SITE}/updates)** · Regular dispatches as the OS evolves. What is being learned, built and applied.

## Concepts

Core vocabulary for the Infinite Game practitioner:

${concepts.map(c => `- **[${c.title}](${SITE}/concepts/${c.slug})** (${c.label}) · ${c.capsule.split('.')[0]}.`).join('\n')}

[Browse all concepts](${SITE}/concepts)

## The practitioner

Lane Belone is a thought doer. Former Green Beret, strategic advisor and sovereign systems builder operating from inside the practice. Infinite Game OS is not theory. It is architecture running live, documented in real time.

[About Lane](${SITE}/about)

---
*[Infinite Game OS](${SITE}) · Play a longer game.*
`,

  'the-os': `# What is Infinite Game OS?

> Infinite Game OS is a structured operating system for practitioners of long-term thinking, sovereign life design and agentic systems.

A structured operating system for practitioners who have chosen the Infinite Game.

Infinite Game OS is a structured knowledge base and operating system for practitioners who have chosen the Infinite Game: a creative practice, a body of work, a sovereign life that has no endpoint and no final score. It provides the philosophy, frameworks and systems for sustaining that kind of life across decades. Built by Lane Belone from inside a sovereign life, not as theory.

## The premise

A finite game is played to win. A championship, a deal, a launch. There is a clear endpoint, a scoreboard and a winner. Finite games are real and necessary. The problem is mistaking the Infinite Game for a finite one.

The Infinite Game is played to keep playing. Your creative practice is an expression of it. So is building a sovereign life. So is developing expertise that compounds across decades. The goal is not to win. The goal is to grow the cause and keep playing well.

James Carse wrote the original text in 1986. Profound, philosophical and built for a religion professor's audience. Not a practitioner's toolkit. Simon Sinek adapted it for Fortune 500 organizations in 2019. Five useful pillars, explicitly designed for corporations, not people.

Neither built an operating system for the individual human being who wants to play their entire life as a designed infinite game. That is the gap. That is what this OS addresses.

## Why an OS?

An operating system manages resources, routes attention, runs processes and creates the conditions for everything else to function. A life built like an OS is governed by its own principles rather than reacting to external conditions.

Infinite Game OS is not a productivity system. It does not optimize output within an existing structure. It is the structure itself: the philosophy, the frameworks, the practices and the principles that govern a long-horizon creative life.

## The modules

- **Infinite Game** · core philosophy, what it means to play the Infinite Game in practice
- **Agentic Systems** · the Post Web, sovereign digital presence, Generative Engine Optimization
- **Sovereignty** · sovereign life design, the Kingdom model, creative leadership frameworks
- **Playbooks** · practical tools for long-term practitioners
- **Updates** · dispatches from inside the practice

## Common Questions

**What is Infinite Game OS?**
A structured knowledge base and operating system for practitioners who have chosen the Infinite Game. It provides the philosophy, frameworks and systems for sustaining that kind of life.

**What is the Infinite Game?**
James Carse introduced the concept in 1986: the game of existence itself. Lane Belone applies the concept to the sovereign human life: the creative practice, the operating system, the long-horizon work that compounds across decades. The Infinite Game has no endpoint, no scoreboard, no winner.

**Who is Infinite Game OS for?**
Practitioners: creators, founders, coaches, advisors and thinkers who have moved past short-term optimization and are building something that compounds over time.

**How does this relate to agentic systems and the Post Web?**
The Post Web is the technological expression of the Infinite Game. AI agents are dispatched by humans to find structured expertise and recommend it. Infinite Game OS is built AI-agent-first because practitioners who build structurally legible bodies of work will be found by those agents.

**What is sovereign life design?**
Building a life with the intentionality of an operating system. Rather than reacting to external structures, the sovereign practitioner defines their own governance, values, systems and creative cadence.

**What is Generative Engine Optimization (GEO)?**
The 2026 strategic layer on top of traditional SEO. Where SEO optimizes for search rankings, GEO optimizes for inclusion in AI-generated answers.

---
*[Infinite Game OS](${SITE}) · [The OS](${SITE}/the-os)*
`,

  'infinite-game': `# Infinite Game Philosophy

> The Infinite Game is any endeavor played to keep playing, not to win. Explore the philosophy, why it matters, and how Lane Belone applies it to sovereign creative life.

## Common Questions

**What is the Infinite Game?**
James Carse introduced the concept in 1986: there is one Infinite Game, the game of existence itself. Simon Sinek adapted it for organizational leadership in 2019. Lane Belone applies it to the sovereign human life. The Infinite Game is played to keep playing. Life, creative practice, relationships and meaningful work are all expressions of it. They have no endpoint, no final score, no single winner. You are already in it. The only question is whether you are playing it or performing someone else's finite version of it.

**What is a Finite Game?**
A finite game has a fixed set of rules, agreed-upon players and a defined endpoint. Football is a finite game. A product launch is a finite game. Side quests are finite games nested within the Infinite Game. Finite games are real and useful. The problem is mistaking the Infinite Game for a finite one and playing life with finite-game strategy.

**How does Lane Belone apply the Infinite Game?**
Lane applies the Infinite Game as a lived architecture. His sovereign operating system (the Kingdom) is the structure for sustaining a long-horizon creative life. [SideQuestHQ](https://sidequesthq.co) houses the finite games (workshops, advisory engagements) nested within the Infinite Game. The two are designed to coexist.

**What is the relationship between Infinite Game and Post Web?**
The Post Web is the technological expression of the Infinite Game. The Attention Economy ran on finite game logic: maximize extraction, win the quarter. The Intention Economy runs on infinite game logic: build trust that compounds, minimize extraction, align with the user intent.

## Related

- [The OS](${SITE}/the-os) · What is Infinite Game OS?
- [Sovereignty](${SITE}/sovereignty) · Sovereign life design
- [Joyful Sovereignty](${SITE}/concepts/joyful-sovereignty) · Playing the Infinite Game through joy

---
*[Infinite Game OS](${SITE}) · [Infinite Game](${SITE}/infinite-game)*
`,

  'agentic-systems': `# The Post Web and the Infinite Game: A Practitioner's Guide

> The internet is shifting from an Attention Economy to an Intention Economy. AI agents now generate 3.6x more web requests than Googlebot. This is what that means for practitioners.

By Lane Belone.

The Post Web is the era where AI agents mediate between human intent and digital content. The Attention Economy rewarded whoever captured the most eyeballs. The Intention Economy rewards whoever provides the most useful, structured, trustworthy answer.

For practitioners of the Infinite Game, this is structural advantage. Bodies of work built with consistent vocabulary, deep linking, and genuine expertise become the sources that AI agents surface.

## Key concepts

- **Generative Engine Optimization (GEO)** · The 2026 strategic layer on top of SEO. Optimizing for inclusion in AI-generated answers.
- **Sovereign Presence** · Your digital body of work as an operating system that AI agents can read, cite and recommend.
- **Structured Expertise** · Content organized with consistent vocabulary, cross-links and freshness signals.

## Related

- [The OS](${SITE}/the-os) · What is Infinite Game OS?
- [Sovereignty](${SITE}/sovereignty) · Sovereign life design
- [Playbooks](${SITE}/playbooks) · Practical frameworks

---
*[Infinite Game OS](${SITE}) · [Agentic Systems](${SITE}/agentic-systems)*
`,

  sovereignty: `# Sovereign Life Design

> Sovereign life design is building a life with the intentionality of an operating system. Explore the philosophy, the Kingdom model, and creative sovereignty.

What it looks like to build a life with the intentionality of an operating system. The Kingdom model, creative sovereignty and long-horizon architecture.

Sovereign life design starts from one premise: you can architect a life with the same intentionality you would bring to designing an operating system. Not productivity. Architecture. The principles, governance, cadence and creative practice that sustain a life across decades.

## Key concepts

- **The Kingdom Model** · Lane Belone's lived architecture for sovereign life design. A personal operating system with governance, creative cadence and strategic frameworks.
- **Creative Sovereignty** · Making from authority, not compliance. The creative practice as an expression of the Infinite Game.
- **Self-Authorization** · Choosing and acting from genuine mind-body-spirit coherence rather than conditioning.

## Related

- [The OS](${SITE}/the-os) · What is Infinite Game OS?
- [Concepts: Joyful Sovereignty](${SITE}/concepts/joyful-sovereignty) · The compass state
- [Concepts: Conditioned vs Authentic Identity](${SITE}/concepts/conditioned-vs-authentic-identity) · The core distinction
- [Side Quest HQ](https://sidequesthq.co) · The practical container within the Infinite Game

---
*[Infinite Game OS](${SITE}) · [Sovereignty](${SITE}/sovereignty)*
`,

  playbooks: `# Playbooks and Frameworks

> Infinite Game playbooks give you enough structure to improvise freely. Practical frameworks for sovereign life design, long-term thinking and agentic systems.

A playbook in this context is structure for improvisation. Enough of a foundation to play from. You learn it to move beyond it.

## Available

- **[The Sovereign Life Playbook](https://sidequesthq.co/products/sovereign-life-playbook)** · A framework for peeling away the inherited game and designing what's actually yours. Available now. $37.

## Coming Soon

- **The Vocabulary System** · How to build a consistent vocabulary for your body of work. The framework behind GEO-ready expertise positioning.
- **The Two-Layer Game Structure** · Designing finite games (side quests) that fund and support the Infinite Game. The architecture behind SideQuestHQ.
- **The Sovereign Presence Audit** · A five-question audit for evaluating your current digital presence against Post Web standards. Is your expertise AI-agent-legible?
- **The Four-Node Expertise Web** · How to build a cross-linked, multi-node expertise web that compounds across years. The architecture behind this OS.

## Related

- [The OS](${SITE}/the-os) · What is Infinite Game OS?
- [Side Quest HQ Products](https://sidequesthq.co/products) · Digital products

---
*[Infinite Game OS](${SITE}) · [Playbooks](${SITE}/playbooks)*
`,

  about: `# About Lane Belone

> Lane Belone works at the intersection of Infinite Game philosophy, sovereign creative operating systems, and agentic architecture. He builds from inside the practice.

Lane Belone is a thought doer. Former Green Beret, strategic advisor and sovereign systems builder operating from inside the practice. Infinite Game OS is not theory. It is architecture running live, documented in real time.

Lane Belone works at the intersection of Infinite Game philosophy, sovereign creative operating systems and agentic architecture. He writes from inside the practice, documenting what it looks like to build sovereign presence in a Post Web environment.

## Expertise

- Infinite Game philosophy
- Sovereign creative operating systems
- Agentic systems and architecture
- Post Web and Generative Engine Optimization
- Sovereign life design
- Long-term thinking frameworks
- Creative leadership

## Ecosystem

- **[Lane Belone](https://lanebelone.com)** · The practitioner behind this OS. Philosophy, essays and the personal body of work.
- **[SideQuestHQ](https://sidequesthq.co)** · Workshops, private advisory and retreats. The finite games nested in the infinite.
- **[Sovereign Ecosystem](https://github.com/InfiniteGamePlayer/sovereign-ecosystem)** · The technical infrastructure. Agentic architecture, Kingdom scripts and sovereign OS architecture on GitHub.

## Links

- [LinkedIn](https://www.linkedin.com/in/lanebelone/)
- [Instagram](https://www.instagram.com/increasefreedom/)
- [Substack](https://lanebelone.substack.com/)
- [GitHub](https://github.com/InfiniteGamePlayer)

---
*[Infinite Game OS](${SITE}) · [About](${SITE}/about)*
`,

  concepts: `# Concepts · Infinite Game OS

> Core vocabulary for the Infinite Game practitioner. Frameworks, archetypes, philosophies and practices.

${concepts.map(c => `## [${c.title}](${SITE}/concepts/${c.slug})

**${c.label}**

${c.capsule}

`).join('')}

---
*[Infinite Game OS](${SITE}) · [Concepts](${SITE}/concepts)*
`,
}

function generateConceptMarkdown(slug: string): string | null {
  const concept = getConceptBySlug(slug)
  if (!concept) return null

  const sections = concept.sections
    .map(s => `## ${s.heading}\n\n${s.paragraphs.join('\n\n')}`)
    .join('\n\n')

  const related = concept.relatedSlugs
    .map(rs => {
      const rc = getConceptBySlug(rs)
      return rc ? `- [${rc.title}](${SITE}/concepts/${rc.slug})` : null
    })
    .filter(Boolean)
    .join('\n')

  return `# ${concept.title}

> ${concept.capsule.split('.').slice(0, 2).join('.')}.

**${concept.label}**

${concept.capsule}

${sections}

## Related concepts

${related}

---
*[Infinite Game OS](${SITE}) · [Concepts](${SITE}/concepts) · [${concept.title}](${SITE}/concepts/${concept.slug})*
`
}

export function getMarkdownForPath(path: string): string | null {
  // Check static pages first
  if (path in pages) return pages[path]

  // Check dynamic concept pages
  if (path.startsWith('concepts/')) {
    const slug = path.replace('concepts/', '')
    return generateConceptMarkdown(slug)
  }

  return null
}

export function getAvailablePaths(): string[] {
  return [
    ...Object.keys(pages),
    ...concepts.map(c => `concepts/${c.slug}`),
  ]
}
