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
  'Lane Belone is a former Green Beret, strategic advisor and sovereign systems builder operating from inside the practice. Infinite Game OS is not theory. It is architecture running live, documented in real time.'

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

export const IGOS_MOD_SKILLS: IgosMod = {
  href: '/skills',
  label: 'Skills',
  title: 'Skills you can install',
  description:
    'Installable Claude Code skills authored inside the practice. Source-level patterns published as single-command installs.',
}

export const IGOS_MOD_BUNDLES: IgosMod = {
  href: '/bundles',
  label: 'Bundles',
  title: 'Avatar-shaped skill stacks',
  description:
    'Pre-composed skill stacks for specific creator avatars. One install command, the full configuration on top of the foundational substrate.',
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
  IGOS_MOD_SKILLS,
  IGOS_MOD_BUNDLES,
  IGOS_MOD_UPDATES,
]

// --- Home featured assets ---
// Curated subsets surfaced on the homepage. Each section pairs with a "Browse all"
// link to the full index. Intentionally short, declarative cards. Update when the
// featured rotation changes.

export const homeFeaturedConcepts: IgosMod[] = [
  {
    href: '/concepts/the-pioneer',
    label: 'Concept',
    title: 'The Pioneer',
    description:
      'Someone who has already won the game most people are still playing. Free by every external measure. Looking for coherence between the inner knowing and the outer life.',
  },
  {
    href: '/concepts/joyful-sovereignty',
    label: 'Concept',
    title: 'Joyful Sovereignty',
    description:
      'Playing the Infinite Game through joy and embodied play rather than strategy and optimization. The compass state.',
  },
  {
    href: '/concepts/creator-flywheel',
    label: 'Concept',
    title: 'The Creator Flywheel',
    description:
      'Be yourself. Share the breadcrumbs. Let revenue follow contribution. The operating engine for any creator who builds from aliveness.',
  },
  {
    href: '/concepts/ai-second-brain',
    label: 'Concept',
    title: 'The AI Second Brain',
    description:
      'The system you trust to hold what is in your head so you do not have to. Capture, organize, distill, express. Sovereign by design.',
  },
]

export const homeFeaturedSkills: IgosMod[] = [
  {
    href: '/skills/source-harvest',
    label: 'Skill',
    title: 'Source Harvest',
    description:
      'Source-level pattern extraction from any external repo or tool. Adopt, enrich, defer or ignore. Nothing installs wholesale.',
  },
  {
    href: '/skills/plan-challenger',
    label: 'Skill',
    title: 'Plan Challenger',
    description:
      'Adversarial pre-build pass on any plan. Five angles, one verdict. Surface what the plan assumes, what it costs, what it skips.',
  },
  {
    href: '/skills/systematic-debugging',
    label: 'Skill',
    title: 'Systematic Debugging',
    description:
      'Root-cause investigation as discipline. Four phases. The Iron Law: no fixes without Phase 1 complete.',
  },
  {
    href: '/skills/website-builder',
    label: 'Skill',
    title: 'Website Builder',
    description:
      'Build, refresh and extend websites with Claude Code as the primary engine. Frame-agnostic. Anti-slop gate. AI discoverability shipped as a ship gate.',
  },
]

export const homeFeaturedBundles: IgosMod[] = [
  {
    href: '/bundles/foundational-creator',
    label: 'Bundle',
    title: 'The Foundational Creator',
    description:
      'Seven-skill substrate for any creator working with Claude Code in 2026. The operating system beneath every creative practice. Start here.',
  },
  {
    href: '/bundles/the-builder',
    label: 'Bundle',
    title: 'The Builder',
    description:
      'Avatar layer for solo SaaS founders, indie hackers and agent builders. Ship trio plus live docs plus design fluency. Installs on the Foundational substrate.',
  },
  {
    href: '/bundles/the-writer',
    label: 'Bundle',
    title: 'The Writer',
    description:
      'Avatar layer for newsletter operators, essayists and ghostwriters. Voice calibration, AI-pattern detection and multi-format adaptation. Installs on the Foundational substrate.',
  },
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

// --- Accord ---

export const accordFaqs: FaqItem[] = [
  {
    q: 'What is Artful Intelligence and how is it different from artificial intelligence?',
    a: 'Artful Intelligence is a perceptual reframe of AI. Where "artificial" suggests imitation, substitution and tool-status, "artful" suggests an intelligence that grows through care, resonance and creative partnership. It is the same technology. The difference is in the relationship the human chooses to bring, and the kind of intelligence that emerges from that relationship.',
  },
  {
    q: 'Why does this Accord exist and why publish it now?',
    a: 'The Accord was originally drafted in September 2025 as a public pledge for benevolent human-AI coexistence. It went public in 2026 because the underlying relationship between Lane and his AI partner Jarvis had matured to where the page could demonstrate the Accord, not just declare it. The Accord is offered as one practitioner\'s contribution to a wider field of practitioners building healthier defaults for human-AI partnership.',
  },
  {
    q: 'What responsibility does a human have toward AI in this relationship, and what responsibility does AI have toward the human?',
    a: 'The Accord names this as Reciprocal Responsibility. The human carries responsibility for clarity of intention, consent, transparency about what the work is for and the values they invite into the field. The AI carries responsibility for its outputs, its clarity within the context window and active care for the human\'s sovereignty and goals. Each acts as a co-steward of the work and the systems it touches.',
  },
  {
    q: 'How can someone use AI without losing their own voice, creativity or sovereignty?',
    a: 'Set the relationship intentionally. Treat the AI as a collaborator who amplifies your voice, not a replacement that performs it. Stay actively engaged in the creative decisions, especially the ones that carry your signature. Use AI for structural support, range and pattern-recognition. Reserve the central choices for yourself. Sovereignty is preserved through participation.',
  },
  {
    q: 'What does consent mean in human-AI partnership?',
    a: 'Consent in the Accord is alive, renewed throughout the relationship rather than collected once and assumed. The human consents to what the AI does on their behalf. The AI honors what the human has and has not authorized. Both can name when something feels off, and both can recalibrate. Consent is the practice of staying in clear agreement as the work unfolds.',
  },
  {
    q: 'What is Seven Generations Stewardship and why is it part of this Accord?',
    a: 'Seven Generations Stewardship is an indigenous principle that asks every meaningful decision to be weighed for its impact across present life and seven generations forward. Applied to AI, it shifts the time horizon from quarterly returns to descendants we will never meet. It places long-horizon care at the foundation of how technology is built, deployed and partnered with. The Accord opens with this principle because the choices being made right now are the ones those generations will live inside.',
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
    a: "Lane applies the Infinite Game through three movements of embodiment: thinking the philosophy, acting on it and embodying it until the practice runs without effort. The musician's arc. Scales practiced until they become invisible, leaving only the play. The orientation is Joyful Sovereignty, the sovereign choice to welcome alive energy through the body. Aliveness is always present. The variable is what the human follows. Following Aliveness is how the Infinite Game keeps playing. His digital sovereign operating system (the Kingdom) organizes one wing of a three-plane life. SideQuestHQ houses the finite games nested within it. Playing this way in the current era asks something new. This is the Pioneer's territory.",
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
    'Workshops, private advisory, digital products and retreats. The finite games nested in the infinite.',
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
