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

export const IGOS_MOD_SOVEREIGN_ECOSYSTEM: IgosMod = {
  href: '/sovereign-ecosystem',
  label: 'Sovereign Ecosystem',
  title: 'The foundational workspace template',
  description:
    'A foundational Obsidian and Claude Code workspace template. Directory structure, governance scaffolding and an initial skill set. The three-tier stack origin.',
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
  IGOS_MOD_SOVEREIGN_ECOSYSTEM,
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
    a: 'The Post Web is the technological expression of the Infinite Game. AI agents are dispatched by humans to find structured expertise and recommend it. Infinite Game OS is structured from the ground up for legibility because practitioners who build structured bodies of work will be found by agents, while those optimizing for attention will be outcompeted by machines doing that at scale.',
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
  'Sovereign AI practice and agentic architecture',
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
  href: 'https://www.sidequesthq.co',
}

export const IGOS_ECOSYSTEM_SOVEREIGN: IgosEcosystemLink = {
  label: 'Sovereign Ecosystem',
  description:
    'The technical infrastructure. Kingdom scripts, sovereign OS architecture and agentic layer on GitHub.',
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

// --- Play Your Own Game (audience-search front door, A2) ---

export const playYourOwnGameFaqs: FaqItem[] = [
  {
    q: "How do I know if I'm playing the wrong game?",
    a: 'The clearest indicator is a specific kind of success that feels hollow rather than incomplete. If wins are producing less than expected and the deficit is not explained by burnout or circumstance, the game itself is worth examining. The Infinite Game framework calls this the gap between Aliveness and conditioned performance.',
  },
  {
    q: 'What does it mean to make your own rules?',
    a: 'Making your own rules is not the same as rejecting all structure. It is the act of examining which rules were chosen and which were inherited, then consciously deciding which ones to keep. Joyful Sovereignty describes this as a chosen posture rather than a reaction against constraint.',
  },
  {
    q: 'How do I stop comparing myself to others?',
    a: 'Comparison is a symptom, not the root problem. The root problem is a borrowed scoreboard. When the governing measure of success is still defined by peer consensus, comparison follows automatically. Replacing borrowed scoreboards with self-authored ones removes the reference class that makes comparison meaningful.',
  },
  {
    q: "How do I find my own path when everything I've built is part of the old game?",
    a: 'The transition rarely requires destroying what was built. It requires re-evaluating what it was built for and whether that purpose still governs. The Pioneer archetype describes someone who moves into new territory while retaining the competencies developed in the previous one. What carries forward is skill. What gets released is the scoreboard.',
  },
  {
    q: 'What is success on your own terms, actually?',
    a: 'Success on your own terms is success measured against a standard you set, rather than one you inherited or absorbed. The operational version of this is knowing which scoreboards are governing your decisions and having actively chosen them. The Infinite Game offers a structural definition: a game worth playing to keep playing, where the metric is continuation rather than conclusion.',
  },
  {
    q: 'How do I stop following the script when the script is working?',
    a: "This is the specific difficulty of the already-accomplished person. The script working is exactly what makes it hard to question. The useful question is not whether the script is working but whether it is yours. Aliveness tends to answer that question clearly when given room. The Pioneer's territory begins the moment the working script is held as a choice rather than a given.",
  },
]

// --- Design Your Day (audience-search front door, B3) ---

export const designYourDayFaqs: FaqItem[] = [
  {
    q: 'How do I stop letting my to-do list run my day?',
    a: 'The to-do list runs the day when it holds the authority that belongs to desire and identity. A practical shift is to set an intention before opening the list: what kind of person do I want to be in this day, and what does that person do first. The Ideal Month concept in the Infinite Game offers a rhythm-based alternative to task-first planning that restores desire to the center of daily design.',
  },
  {
    q: 'What does an intentional routine actually look like for someone who hates rigid schedules?',
    a: 'An intentional routine for a schedule-averse person is built from anchors, not appointments. Two or three non-negotiable moments that hold the energy of the day without filling all the space between them. Aliveness moves in the open space. The Infinite Game describes Playgrounds of Exploration as one way to hold that open space with intention rather than leaving it to chance or guilt.',
  },
  {
    q: 'How do I align my day with my values when I have real obligations?',
    a: 'Obligations do not have to be treated as the whole day. Even a day full of commitments has decisions inside it: how to start, how to transition, where to place the energy that belongs to you. Aligning with values does not require a clean slate. It requires finding the degrees of freedom already present and using them with intention.',
  },
  {
    q: 'What is the difference between an ideal day and just a productive day?',
    a: 'A productive day measures output. An ideal day measures aliveness. The Ideal Month concept in the Infinite Game defines the ideal day not by what was accomplished but by what kind of person the day let you become. A person can be highly productive and feel nothing. An ideal day leaves a different residue.',
  },
  {
    q: 'How do I design my day around how I want to feel, not just what I need to do?',
    a: 'Start with the feeling target before the task list. Name the quality of experience you want the day to carry, whether that is ease, depth, play or presence, and then arrange the tasks around what creates that quality rather than against it. The Pioneer archetype in the Infinite Game names the person who has learned to use feeling as a navigation instrument rather than a distraction from the plan.',
  },
  {
    q: 'Is it realistic to design a day from desire when so much of life is already structured for you?',
    a: 'The question is not whether to have structure but where the structure comes from and what it serves. Even inside a heavily structured day, the Pioneer can identify which choices belong to external demand and which belong to them. Joyful Sovereignty in the Infinite Game names the practice of finding and using those choices rather than ceding the whole day to the structure around it.',
  },
]

// --- Creator Business Without Performing (audience-search front door, D2) ---

export const creatorBusinessWithoutPerformingFaqs: FaqItem[] = [
  {
    q: 'Can you build a sustainable creator business without posting every day?',
    a: 'Yes. A creator business built on structural discoverability does not require daily posting to grow. Evergreen content, AI-legible architecture and a sequenced offer ladder locate the practitioner without a continuous performance cadence. The Creator Flywheel is the Infinite Game OS framework for this operating model.',
  },
  {
    q: 'What is creator burnout and how do you avoid it?',
    a: 'Creator burnout is the compounding exhaustion that follows a growth model priced in constant personal performance. It is avoided by redesigning the model, not by managing the symptoms. When structure does the visibility work, the practitioner energy is reserved for creation and client delivery.',
  },
  {
    q: 'How do you build systems instead of content for a creator business?',
    a: 'Systems in a creator business are the durable elements that generate discovery and conversion without active input: indexed evergreen pages, sequenced email journeys and an offer ladder with leverage points. Content is an input to those systems, not the output the business depends on each week.',
  },
  {
    q: 'What does it mean to own your audience as a creator?',
    a: "Owning your audience means the relationship does not depend on a platform's algorithm or distribution mechanics. Email lists, owned content architecture and direct enrollment pathways are the sovereign alternatives. In Infinite Game OS terms, this is the structural expression of Joyful Sovereignty: the business runs on your infrastructure, not a platform's.",
  },
  {
    q: 'How do you create recurring revenue as a coach or consultant?',
    a: 'Recurring revenue for coaches and consultants comes from offer architecture, not from volume. A well-designed offer ladder moves clients from a low-friction entry point through progressively deeper engagements. Recurring formats, retained advisory and cohort structures convert without a new sales cycle each month.',
  },
  {
    q: 'What is an evergreen funnel for an expert business?',
    a: 'An evergreen funnel is an acquisition pathway that operates independently of posting frequency. It typically begins with a piece of deeply structured content that surfaces in search and AI responses, moves through a sequenced email journey and arrives at a relevant offer without live intervention. The Creator Flywheel describes how to build and tend this pathway.',
  },
]

// --- Infinite Game OS (namespace landing page) ---

export const infiniteGameOsFaqs: FaqItem[] = [
  {
    q: 'What is the Infinite Game OS?',
    a: 'The Infinite Game OS is an applied operating system for a Creator-led operation. It combines a structured vault, an agentic execution layer, governance protocols, concept pages and a deploy pipeline into one running system. It is designed to hold the full arc of a creative life across years and decades.',
  },
  {
    q: 'How does the Infinite Game OS work in practice?',
    a: 'The OS runs across three surfaces: the vault, where all canonical documents and active work live; the agentic layer, where Claude Code executes skills and dispatches workers; and the deploy pipeline, where finished work publishes to live websites with confirmation gates. Each layer performs a distinct function. Each layer connects to the others by design.',
  },
  {
    q: 'What is the vault in the Infinite Game OS?',
    a: 'The vault is an Obsidian-based file system containing governance codices, operating protocols, active project work and archived completions. It is the memory layer of the OS. Every canonical document the Kingdom produces lives here, structured and version-controlled.',
  },
  {
    q: 'What role does AI play in the Infinite Game OS?',
    a: 'AI operates as a working collaborator inside the OS. Claude Code holds context across sessions, executes governance-bound skills and dispatches parallel workers on complex tasks. The OS also structures its own content to be legible to AI surfaces, so the work is locatable by structure.',
  },
  {
    q: 'What is AI-legible identity in the context of the Infinite Game OS?',
    a: 'AI-legible identity means the system is structured so that AI surfaces can locate, read and accurately quote the work it contains. Every concept page is written in reference register with definitional sentences that stand alone as accurate snippets. The infrastructure layer includes llms.txt, JSON-LD markup, /markdown routes and IndexNow integration.',
  },
  {
    q: 'What kind of Creator is the Infinite Game OS built for?',
    a: 'The Infinite Game OS is built for the Pioneer: a Creator who designs their working life around a long arc rather than an immediate payoff. The system supports a Creator-led operation where the human steers and the system holds the discipline, the memory and the execution capacity across every session.',
  },
]

// --- Sovereign Ecosystem ---

export const sovereignEcosystemFaqs: FaqItem[] = [
  {
    q: 'What is the Sovereign Ecosystem?',
    a: 'The Sovereign Ecosystem is a foundational Obsidian and Claude Code workspace template. It ships the directory structure, governance scaffolding, a North Star template and an initial skill set needed to get a sovereign vault running. It is the starting conditions, not the finished system. Every practitioner who uses it ends up somewhere different.',
  },
  {
    q: 'Who is it for?',
    a: "Practitioners who want a structured first build of an Obsidian and Claude Code workspace. If you already have a vault set up, a Source Harvest of the repo gives you the same patterns without the full install. The Sovereign Ecosystem is one path of entry among many.",
  },
  {
    q: 'Do I have to use it?',
    a: "No. The Sovereign Ecosystem is one path among many. Veterans with an existing setup can grab individual skills and bundles from this site directly. The IGOS Public Library is designed so any practitioner can adopt what is useful regardless of whether they use the foundational template.",
  },
  {
    q: 'What is the three-tier stack?',
    a: 'Three layers, each swappable. The Sovereign Ecosystem is the file structure and templates. Obsidian is the reader and editor that turns those files into something you can navigate by hand. Claude Code (or Codex, or any future agentic interface) is the AI that can read, edit and restructure any of it on your instruction. Swap any layer and the others survive. The full case is at /concepts/data-sovereignty.',
  },
  {
    q: 'What does it cost?',
    a: 'Nothing. The repo is free and open on GitHub. Download the ZIP or clone it. Obsidian is free for personal use. Claude Code requires an Anthropic subscription. The total stack runs on a $20 to $200 monthly subscription depending on your usage level.',
  },
  {
    q: 'How does Source Harvest fit in?',
    a: 'Source Harvest is built to harvest any external repo at source level. The Sovereign Ecosystem repo is a natural first target. After installing the repo, run a Source Harvest over it. The skill classifies each governance file, protocol, codex and skill against your existing setup. Adopt what fills a gap, enrich what improves on what you have, defer what does not yet apply, ignore what is already covered. The harvest turns the template into your template.',
  },
]
