// Canonical data for infinitegameos.io pages.
// Single source of truth imported by both markdown-content.ts generate functions
// and page.tsx components. Eliminates drift between the React surface and AI-facing
// /markdown/ routes.

// --- Shared types ---

export interface FaqItem {
  q: string
  a: string
}

export interface IgosMod {
  href: string
  label: string
  title: string
  description: string
}

export interface IgosEcosystemLink {
  label: string
  description: string
  href: string
}

export interface UpcomingPlaybook {
  title: string
  description: string
  status: string
}

// --- Home ---

export const igosBio =
  'Lane Belone is a thought doer. Former Green Beret, strategic advisor and sovereign systems builder operating from inside the practice. Infinite Game OS is not theory. It is architecture running live, documented in real time.'

export const IGOS_MOD_THE_OS: IgosMod = {
  href: '/the-os',
  label: 'The OS',
  title: 'What is Infinite Game OS?',
  description:
    'The philosophy and architecture behind this operating system. Why it exists and what it runs on.',
}

export const IGOS_MOD_INFINITE_GAME: IgosMod = {
  href: '/infinite-game',
  label: 'Infinite Game',
  title: 'The core philosophy',
  description:
    'The game with no endpoint, no winner and no finish line. Applied to sovereign creative life.',
}

export const IGOS_MOD_AGENTIC_SYSTEMS: IgosMod = {
  href: '/agentic-systems',
  label: 'Agentic Systems',
  title: 'The Post Web and sovereign presence',
  description:
    'How AI agents reshape who gets found, why structured expertise wins and what practitioners build now.',
}

export const IGOS_MOD_SOVEREIGNTY: IgosMod = {
  href: '/sovereignty',
  label: 'Sovereignty',
  title: 'Sovereign life design',
  description:
    'Building a life as an operating system. Kingdom model, creative sovereignty and long-horizon architecture.',
}

export const IGOS_MOD_PLAYBOOKS: IgosMod = {
  href: '/playbooks',
  label: 'Playbooks',
  title: 'Frameworks and tools',
  description:
    'Practical frameworks for long-term thinking, sovereign systems and agentic life design.',
}

export const IGOS_MOD_UPDATES: IgosMod = {
  href: '/updates',
  label: 'Updates',
  title: 'From inside the practice',
  description:
    'Regular dispatches as the OS evolves. What is being learned, built and applied.',
}

export const igosMods: IgosMod[] = [
  IGOS_MOD_THE_OS,
  IGOS_MOD_INFINITE_GAME,
  IGOS_MOD_AGENTIC_SYSTEMS,
  IGOS_MOD_SOVEREIGNTY,
  IGOS_MOD_PLAYBOOKS,
  IGOS_MOD_UPDATES,
]

// --- The OS ---

export const theOsFaqs: FaqItem[] = [
  {
    q: 'What is Infinite Game OS?',
    a: 'Infinite Game OS is a structured knowledge base and operating system for practitioners who have chosen the Infinite Game. The Infinite Game is a cause, a practice or a creative life that has no endpoint, no final score and no single winner. The OS provides the philosophy, frameworks and systems for sustaining that kind of life.',
  },
  {
    q: 'What is the Infinite Game?',
    a: "James Carse introduced the concept in 1986: there is one Infinite Game, the game of existence itself. Simon Sinek adapted it for organizational leadership in 2019, useful for corporations and not designed for individuals. Lane Belone applies the concept to the sovereign human life: the creative practice, the operating system, the long-horizon work that compounds across decades. The Infinite Game has no endpoint, no scoreboard, no winner. The goal is to keep playing well, for as long as possible, for reasons that matter.",
  },
  {
    q: 'Who is Infinite Game OS for?',
    a: 'Practitioners: creators, founders, coaches, advisors and thinkers who have moved past short-term optimization and are building something that compounds over time. Specifically those working at the intersection of Infinite Game philosophy, sovereign creative systems and agentic architecture.',
  },
  {
    q: 'How does this relate to agentic systems and the Post Web?',
    a: 'The Post Web is the technological expression of the Infinite Game. AI agents are dispatched by humans to find structured expertise and recommend it. Infinite Game OS is built AI-agent-first because practitioners who build structurally legible bodies of work will be found by those agents, while those optimizing for attention will be outcompeted by machines doing that at scale.',
  },
  {
    q: 'What is sovereign life design?',
    a: "Sovereign life design is building a life with the intentionality of an operating system. Rather than reacting to external structures, the sovereign practitioner defines their own governance, values, systems and creative cadence. The Kingdom model explored in the Sovereignty section of this OS is Lane Belone's lived architecture for this kind of life.",
  },
  {
    q: 'What is Generative Engine Optimization (GEO)?',
    a: 'Generative Engine Optimization (GEO) is the 2026 strategic layer on top of traditional SEO. Where SEO optimizes for search rankings, GEO optimizes for inclusion in AI-generated answers. When an agent is asked a question, it retrieves structured, legible expertise from bodies of work with consistent vocabulary, freshness signals and cross-links. Infinite Game OS is designed according to GEO principles from the ground up.',
  },
]

// --- Infinite Game ---

export const infiniteGameFaqs: FaqItem[] = [
  {
    q: 'What is the Infinite Game?',
    a: "James Carse introduced the concept in 1986: there is one Infinite Game, the game of existence itself. Simon Sinek adapted it for organizational leadership in 2019. Lane Belone applies it to the sovereign human life. The Infinite Game is played to keep playing. Life, creative practice, relationships and meaningful work are all expressions of it. They have no endpoint, no final score, no single winner. You are already in it. The only question is whether you are playing it or performing someone else's finite version of it.",
  },
  {
    q: 'What is a Finite Game?',
    a: 'A finite game has a fixed set of rules, agreed-upon players and a defined endpoint. Football is a finite game. A product launch is a finite game. Side quests are finite games nested within the Infinite Game. Finite games are real and useful. The problem is mistaking the Infinite Game for a finite one and playing life with finite-game strategy.',
  },
  {
    q: 'How does Lane Belone apply the Infinite Game?',
    a: "Lane applies the Infinite Game through three movements of embodiment: thinking the philosophy, acting on it and embodying it until the practice runs without effort. The musician's arc. Scales practiced until they become invisible, leaving only the play. The endpoint is the Embodied Player. The orientation is Joyful Sovereignty, the sovereign choice to welcome alive energy through the body. Aliveness is always present. The variable is what the human follows. Following Aliveness is how the Infinite Game keeps playing. His digital sovereign operating system (the Kingdom) organizes one wing of a three-plane life. SideQuestHQ houses the finite games nested within it. Playing this way in the current era asks something new. This is the Pioneer's territory.",
  },
  {
    q: 'What is the relationship between Infinite Game and Post Web?',
    a: 'The Post Web is the technological expression of the Infinite Game. The Attention Economy ran on finite-game logic: maximize extraction, win the quarter. The Intention Economy runs on Infinite Game logic: build trust that compounds, minimize extraction, align with user intent. Practitioners who understand both have structural advantage in both the philosophical and the digital layer.',
  },
]

// --- About ---

export const igosExpertise: string[] = [
  'Infinite Game philosophy',
  'Sovereign creative operating systems',
  'Agentic systems and architecture',
  'Post Web and Generative Engine Optimization',
  'Sovereign life design',
  'Long-term thinking frameworks',
  'Creative leadership',
]

export const IGOS_ECOSYSTEM_LANE: IgosEcosystemLink = {
  label: 'Lane Belone',
  description:
    'The practitioner behind this OS. Philosophy, essays and the personal body of work.',
  href: 'https://lanebelone.com',
}

export const IGOS_ECOSYSTEM_SQHQ: IgosEcosystemLink = {
  label: 'SideQuestHQ',
  description:
    'Workshops, private advisory and retreats. The finite games nested in the infinite.',
  href: 'https://sidequesthq.co',
}

export const IGOS_ECOSYSTEM_SOVEREIGN: IgosEcosystemLink = {
  label: 'Sovereign Ecosystem',
  description:
    'The technical infrastructure. Agentic architecture, Kingdom scripts and sovereign OS architecture on GitHub.',
  href: 'https://github.com/InfiniteGamePlayer/sovereign-ecosystem',
}

export const igosEcosystemLinks: IgosEcosystemLink[] = [
  IGOS_ECOSYSTEM_LANE,
  IGOS_ECOSYSTEM_SQHQ,
  IGOS_ECOSYSTEM_SOVEREIGN,
]

// --- Playbooks ---

export const IGOS_PLAYBOOK_VOCABULARY: UpcomingPlaybook = {
  title: 'The Vocabulary System',
  description:
    'How to build a consistent vocabulary for your body of work. The framework behind GEO-ready expertise positioning.',
  status: 'coming soon',
}

export const IGOS_PLAYBOOK_TWO_LAYER: UpcomingPlaybook = {
  title: 'The Two-Layer Game Structure',
  description:
    'Designing finite games (side quests) that fund and support the Infinite Game. The architecture behind SideQuestHQ.',
  status: 'coming soon',
}

export const IGOS_PLAYBOOK_PRESENCE_AUDIT: UpcomingPlaybook = {
  title: 'The Sovereign Presence Audit',
  description:
    'A five-question audit for evaluating your current digital presence against Post Web standards. Is your expertise AI-agent-legible?',
  status: 'coming soon',
}

export const IGOS_PLAYBOOK_FOUR_NODE: UpcomingPlaybook = {
  title: 'The Four-Node Expertise Web',
  description:
    'How to build a cross-linked, multi-node expertise web that compounds across years. The architecture behind this OS.',
  status: 'coming soon',
}

export const igosUpcomingPlaybooks: UpcomingPlaybook[] = [
  IGOS_PLAYBOOK_VOCABULARY,
  IGOS_PLAYBOOK_TWO_LAYER,
  IGOS_PLAYBOOK_PRESENCE_AUDIT,
  IGOS_PLAYBOOK_FOUR_NODE,
]
