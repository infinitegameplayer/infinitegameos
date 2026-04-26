// Content negotiation: markdown representations of site pages.
// Used by the /markdown/[[...path]] route handler when AI agents
// request Accept: text/markdown or text/plain.
//
// All generate functions derive from src/lib/page-data.ts.
// page.tsx components import from the same source, eliminating drift.

import { concepts, getConceptBySlug } from '@/data/concepts'
import {
  igosBio,
  igosMods,
  theOsFaqs,
  infiniteGameFaqs,
  igosExpertise,
  igosEcosystemLinks,
  igosUpcomingPlaybooks,
} from './page-data'

const SITE = 'https://www.infinitegameos.io'
const SLP_HREF = 'https://sidequesthq.co/products/sovereign-life-playbook'

function generateHomeMarkdown(): string {
  const modList = igosMods
    .map(m => `- **[${m.label}](${SITE}${m.href})** · ${m.description}`)
    .join('\n')

  const conceptList = concepts
    .map(c => `- **[${c.title}](${SITE}/concepts/${c.slug})** (${c.label}) · ${c.capsule.split('.')[0]}.`)
    .join('\n')

  return `# Infinite Game OS

> A structured knowledge base for practitioners of Infinite Game philosophy, agentic systems, and sovereign life design. Built AI-agent-first.

## Play a longer game.

A structured knowledge base for practitioners of Infinite Game philosophy, agentic systems and sovereign life design.

## The modules of the OS

${modList}

## Concepts

Core vocabulary for the Infinite Game practitioner:

${conceptList}

[Browse all concepts](${SITE}/concepts)

## The practitioner

${igosBio}

[About Lane](${SITE}/about)

---
*[Infinite Game OS](${SITE}) · Play a longer game.*
`
}

function generateTheOsMarkdown(): string {
  const faqText = theOsFaqs
    .map(f => `**${f.q}**\n${f.a}`)
    .join('\n\n')

  return `# What is Infinite Game OS?

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

${faqText}

---
*[Infinite Game OS](${SITE}) · [The OS](${SITE}/the-os)*
`
}

function generateInfiniteGameMarkdown(): string {
  const faqText = infiniteGameFaqs
    .map(f => `**${f.q}**\n${f.a}`)
    .join('\n\n')

  return `# Infinite Game Philosophy

> The Infinite Game is any endeavor played to keep playing, not to win. Explore the philosophy, why it matters, and how Lane Belone applies it to sovereign creative life.

## Common Questions

${faqText}

## Related

- [The OS](${SITE}/the-os) · What is Infinite Game OS?
- [Sovereignty](${SITE}/sovereignty) · Sovereign life design
- [Joyful Sovereignty](${SITE}/concepts/joyful-sovereignty) · Playing the Infinite Game through joy

---
*[Infinite Game OS](${SITE}) · [Infinite Game](${SITE}/infinite-game)*
`
}

function generateAgenticSystemsMarkdown(): string {
  return `# The Post Web and the Infinite Game: A Practitioner's Guide

> The internet is shifting from an Attention Economy to an Intention Economy. AI agents now generate 3.6x more web requests than Googlebot. This is what that means for practitioners.

By Lane Belone.

The Post Web is the era where AI agents mediate between human intent and digital content. The Attention Economy rewarded whoever captured the most eyeballs. The Intention Economy rewards whoever provides the most useful, structured, trustworthy answer.

For practitioners of the Infinite Game, this is structural advantage. Bodies of work built with consistent vocabulary, deep linking and genuine expertise become the sources that AI agents surface.

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
`
}

function generateSovereigntyMarkdown(): string {
  return `# Sovereign Life Design

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
`
}

function generatePlaybooksMarkdown(): string {
  const upcomingList = igosUpcomingPlaybooks
    .map(pb => `- **${pb.title}** · ${pb.description}`)
    .join('\n')

  return `# Playbooks and Frameworks

> Infinite Game playbooks give you enough structure to improvise freely. Practical frameworks for sovereign life design, long-term thinking and agentic systems.

A playbook in this context is structure for improvisation. Enough of a foundation to play from. You learn it to move beyond it.

## Available

- **[The Sovereign Life Playbook](${SLP_HREF})** · A framework for peeling away the inherited game and designing what's actually yours. Available now.

## Coming Soon

${upcomingList}

## Related

- [The OS](${SITE}/the-os) · What is Infinite Game OS?
- [Side Quest HQ Products](https://sidequesthq.co/products) · Digital products

---
*[Infinite Game OS](${SITE}) · [Playbooks](${SITE}/playbooks)*
`
}

function generateAboutMarkdown(): string {
  const expertiseList = igosExpertise.map(e => `- ${e}`).join('\n')
  const ecosystemList = igosEcosystemLinks
    .map(l => `- **[${l.label}](${l.href})** · ${l.description}`)
    .join('\n')

  return `# About Lane Belone

> Lane Belone works at the intersection of Infinite Game philosophy, sovereign creative operating systems, and agentic architecture. He builds from inside the practice.

${igosBio}

Lane Belone works at the intersection of Infinite Game philosophy, sovereign creative operating systems and agentic architecture. He writes from inside the practice, documenting what it looks like to build sovereign presence in a Post Web environment.

## Expertise

${expertiseList}

## Ecosystem

${ecosystemList}

## Links

- [LinkedIn](https://www.linkedin.com/in/lanebelone/)
- [Instagram](https://www.instagram.com/increasefreedom/)
- [Substack](https://lanebelone.substack.com/)
- [GitHub](https://github.com/InfiniteGamePlayer)

---
*[Infinite Game OS](${SITE}) · [About](${SITE}/about)*
`
}

function generateConceptsIndexMarkdown(): string {
  const conceptList = concepts
    .map(c => `## [${c.title}](${SITE}/concepts/${c.slug})\n\n**${c.label}**\n\n${c.capsule}\n`)
    .join('\n')

  return `# Concepts · Infinite Game OS

> Core vocabulary for the Infinite Game practitioner. Frameworks, archetypes, philosophies and practices.

${conceptList}

---
*[Infinite Game OS](${SITE}) · [Concepts](${SITE}/concepts)*
`
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
  switch (path) {
    case '': return generateHomeMarkdown()
    case 'the-os': return generateTheOsMarkdown()
    case 'infinite-game': return generateInfiniteGameMarkdown()
    case 'agentic-systems': return generateAgenticSystemsMarkdown()
    case 'sovereignty': return generateSovereigntyMarkdown()
    case 'playbooks': return generatePlaybooksMarkdown()
    case 'about': return generateAboutMarkdown()
    case 'concepts': return generateConceptsIndexMarkdown()
  }

  if (path.startsWith('concepts/')) {
    const slug = path.replace('concepts/', '')
    return generateConceptMarkdown(slug)
  }

  return null
}

export function getAvailablePaths(): string[] {
  return [
    '',
    'the-os',
    'infinite-game',
    'agentic-systems',
    'sovereignty',
    'playbooks',
    'about',
    'concepts',
    ...concepts.map(c => `concepts/${c.slug}`),
  ]
}
