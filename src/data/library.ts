// IGOS Public Library asset registry.
// Source of truth for: src/app/[type]/[slug] pages, src/lib/markdown-content.ts
// markdown variants, /public/igos-index.json, /public/marketplace.json.
//
// Adding a new asset: append a new IGOSAsset entry below. The page route, the
// markdown route, the registry JSON and the marketplace JSON pick it up.

export type AssetType = 'skill' | 'protocol' | 'codex' | 'concept' | 'strategy' | 'bundle'

export interface UseCase {
  title: string
  body: string
}

export interface FAQItem {
  q: string
  a: string
}

export interface AssetSection {
  heading: string
  paragraphs: string[]
}

export interface InstallSurface {
  marketplaceId?: string
  skillsTap?: string
  cursorMdc?: boolean
  sourceMarkdownUrl?: string
}

export interface BundleSkillRef {
  title: string
  description: string
  source: string
  license: string
  igosSlug?: string
  externalUrl?: string
}

export interface BundleSurface {
  installUrl: string
  command: string
  skills: BundleSkillRef[]
}

export interface SoftHook {
  body: string
  ctaHref?: string
  ctaLabel?: string
}

export interface IGOSAsset {
  slug: string
  type: AssetType
  title: string
  label: string
  version: string
  updated: string
  description: string
  tags: string[]
  capsule: string
  installable?: InstallSurface
  bundle?: BundleSurface
  definition?: string
  howItWorks?: AssetSection[]
  useCases?: UseCase[]
  faq?: FAQItem[]
  relatedSlugs?: string[]
  softHook: SoftHook
}

export const igosAssets: IGOSAsset[] = [
  {
    slug: 'source-harvest',
    type: 'skill',
    title: 'Source Harvest',
    label: 'Skill',
    version: '1.0',
    updated: '2026-04-29',
    description:
      'Systematic pattern extraction from any external repo or tool at source level. Classify, extract, integrate.',
    tags: ['harvest', 'extraction', 'governance', 'kingdom-skill'],
    capsule:
      'Source Harvest is a skill for extracting patterns from external repositories at source level rather than description level. It reads the actual implementation, classifies each component as Adopt, Enrich, Defer or Ignore, and executes approved integrations under governance. The README is not the nuance.',
    installable: {
      marketplaceId: 'source-harvest',
      cursorMdc: true,
    },
    definition:
      'Source Harvest is a skill for extracting patterns from external repositories, plugins and tools at the source level rather than the description level. It reads the actual implementation. It classifies each component against your existing tooling. It executes approved integrations under governance. The README is not the nuance. The descriptions on a homepage are not the patterns. The patterns live in the skill files, the hook scripts, the command definitions, the configurations and the protocol documents that ship inside a repo. Source Harvest treats those as the evidence base. Every component receives one of four dispositions: Adopt, Enrich, Defer or Ignore. Adoptions are conscious, governed and adapted to your system\'s voice and conventions. Nothing installs wholesale. The result is a body of work that grows by intentional integration, not by accumulation.',
    howItWorks: [
      {
        heading: 'The four dispositions',
        paragraphs: [
          'Every component reviewed in a harvest receives exactly one disposition. Adopt means a genuinely new capability not covered by your existing system. The component becomes a new internal skill or protocol, adapted to your voice and conventions. Enrich means the component strengthens something you already have. The harvest names the exact change and the target file, then executes the edit under approval. Defer means the pattern is interesting but no immediate gap warrants integration. The component is filed in a deferred inventory with a promotion signal: the specific trigger that should pull it back off the shelf later. Ignore means the pattern is fully covered by current capability or not relevant. The harvest documents the reason briefly and moves on.',
          'The four dispositions are the spine of the discipline. They make sure every component lands somewhere. Nothing drifts. Nothing accumulates by accident. The harvest report becomes a record of conscious decisions rather than an inventory of stored ideas.',
        ],
      },
      {
        heading: 'How a harvest runs',
        paragraphs: [
          'A harvest opens by confirming access to the source. Public repos are read directly. Closed platforms substitute capability documentation and API references for the source code. The classification framework still applies. After access, the harvest inventories every component: skills, hooks, commands, configurations, protocols, scripts. The list is presented to the operator before classification proceeds.',
          'Each component is then read in full. Filenames and one-line descriptions do not classify. Source content is the evidence. Once read, each component receives its disposition with one to three lines of rationale. The compiled harvest report is presented at the approval gate. No changes execute without explicit approval. Approved items execute step by step. Adopted skills are written to canonical paths with proper frontmatter and discoverability registration. Enriched files receive their precise edits. Deferred items are logged with promotion signals. The harvest closes with a summary report.',
          'The approval gate is the discipline. It is the moment intelligence-gathering becomes integration. Without that gate, harvests drift toward wholesale install. With it, every adoption is a conscious choice on your terms.',
        ],
      },
    ],
    useCases: [
      {
        title: 'Open-source plugin source review',
        body:
          'When someone publishes a Claude Code plugin, the description rarely surfaces the load-bearing patterns. Source Harvest reads the hooks, commands and skills directly, surfacing patterns like four-phase debug gates, dual confidence scoring rubrics or per-phase verification disciplines that descriptions skip. Each pattern receives a disposition before any code is integrated.',
      },
      {
        title: 'Closed SaaS platform capability inventory',
        body:
          'Closed-source platforms cannot be source-read, but feature documentation and API references serve as the evidence base. A capability-level harvest classifies each feature against existing internal systems. Patterns adopt. Disconnected internal tools sometimes reveal a synthesis that none of them named alone, like a workflow architecture connecting three previously separate systems.',
      },
      {
        title: 'Multi-source comparative harvest',
        body:
          'Three related skills run as a simultaneous harvest produce more signal than any one alone. When all three independently flag the same anti-pattern, that convergence is itself the finding. The output becomes a synthesized codex rather than three parallel skill clones, plus targeted enrichments to existing internal protocols where the convergence pulled them.',
      },
      {
        title: 'First-pass review for a tech watchlist',
        body:
          'Adding a new repo to an ongoing tech-watch list begins with a Source Harvest, not a description scan. The first review establishes whether the repo offers anything genuinely novel or whether it duplicates current capability. The disposition becomes the entry\'s classification record for future changelog reviews and pulls forward the patterns worth watching.',
      },
      {
        title: 'Backend-dependent plugin extraction',
        body:
          'A plugin that requires a worker service or local backend gets classified at the source level even though most of its skills are not adoption candidates. The patterns inside, like phase-zero documentation discovery or smart token-economics tables, often integrate cleanly into existing protocols even when the full plugin does not. The infrastructure is deferred. The patterns travel.',
      },
    ],
    faq: [
      {
        q: 'Why read the source instead of the README?',
        a: 'Descriptions summarize intent. Source carries the load-bearing patterns. A four-phase debug gate, a dual confidence scoring rubric or a per-phase verification discipline is invisible from a homepage. The patterns live in the skill files, the hook scripts and the configs. Source Harvest treats those as the evidence base.',
      },
      {
        q: 'What does each disposition mean in practice?',
        a: 'Adopt creates a new internal skill, adapted to your conventions. Enrich edits an existing skill or protocol with a precise change. Defer files the pattern in an inventory with a promotion signal. Ignore is documented and dismissed because your system already covers it. Every component lands somewhere.',
      },
      {
        q: 'Can Source Harvest classify closed-source or SaaS platforms?',
        a: 'Yes. When source code is unavailable, capability documentation and API references become the evidence base. The four dispositions still apply. The harvest operates at the pattern level rather than the implementation level. Feature inventories run against existing internal systems the same way.',
      },
      {
        q: 'What happens at the approval gate?',
        a: 'Step 6 is a hard pause. The harvest report is presented to the operator with every component classified. Nothing installs without explicit approval. The operator can approve all, approve a subset or revise. Approved items execute. Rejected items either get filed or dismissed.',
      },
      {
        q: 'How does Source Harvest scale to large repos?',
        a: 'Group by category. Read the highest-relevance components first. Flag anything skipped and document why. A repo with forty components rarely needs each one read in full. Five Adopt candidates, ten Enrich candidates and the rest Ignore is a normal harvest shape.',
      },
    ],
    relatedSlugs: ['plan-challenger', 'systematic-debugging', 'pending-plan-implementation', 'skill-creator', 'researcher'],
    softHook: {
      body:
        'Source Harvest is one entry point. The full system it lives inside is The Sovereign Life Playbook. The Playbook gives you the design frame for which patterns are worth extracting in the first place.',
      ctaHref: 'https://sidequesthq.co/products/sovereign-life-playbook',
      ctaLabel: 'See the Sovereign Life Playbook',
    },
  },
  {
    slug: 'plan-challenger',
    type: 'skill',
    title: 'Plan Challenger',
    label: 'Skill',
    version: '1.0',
    updated: '2026-04-29',
    description:
      'Adversarial pre-build pass that challenges a plan before execution begins. Five angles, one verdict.',
    tags: ['planning', 'review', 'adversarial', 'governance'],
    capsule:
      'Plan Challenger is a skill for surfacing the hard questions before a plan goes into execution. Five structured angles (strategic fit, timing, baked-in assumptions, architectural risk, opportunity cost) produce sharp observations and a one-line verdict. Not a veto. A mirror.',
    installable: {
      marketplaceId: 'plan-challenger',
      cursorMdc: true,
    },
    definition:
      'Plan Challenger runs an adversarial pre-build pass on any plan before execution begins. It is a discipline, not a tool. Five angles work the plan systematically: strategic fit, timing, baked-in assumptions, architectural risk, opportunity cost. Each angle produces one to three sharp observations or questions, not a checklist of every concern. The output is a five-angle challenge report plus near-call decisions plus a one-line verdict (Proceed, Revise [specific element] or Pause [specific reason]). The verdict is a recommendation, not a gate. The operator decides what moves forward.',
    howItWorks: [
      {
        heading: 'The five angles',
        paragraphs: [
          'Strategic Fit: is this the right problem for this moment? What competes for the slot? Does this plan advance the operator\'s primary arc, or branch sideways?',
          'Timing: why now? What changes if deferred two weeks? Is the urgency real or inherited from habit?',
          'Baked-In Assumptions: what must be true for this plan to succeed that has not been verified? Each assumption gets a risk rating of low, medium or high.',
          'Architectural Risk: what is the most likely way this plan breaks or creates debt? What looks fine on paper but creates pain in six months?',
          'Opportunity Cost: what are we not doing by doing this? What capability or momentum is being paused or sacrificed?',
        ],
      },
    ],
    useCases: [
      {
        title: 'Pre-execution sanity check on a multi-week plan',
        body:
          'Before kicking off a multi-week implementation, the operator runs Plan Challenger on the written plan. The five angles surface a baked-in assumption that would have collapsed Week 3. The plan revises before commit; Week 3 lands as intended.',
      },
      {
        title: 'Resolving close-call scope decisions',
        body:
          'Two framings for scope are both defensible. Plan Challenger surfaces the close call rather than collapsing to a single answer. The operator sees the trade explicitly and decides with full visibility instead of arbitrating in the moment.',
      },
      {
        title: 'High-stakes plans with confidence scoring',
        body:
          'For high-stakes plans, the optional confidence scoring rubric (0-100) runs over each finding. Findings below 50 are notes; findings at 75 or above earn a named action in the verdict. The operator sees ranked severity instead of a flat list of objections.',
      },
    ],
    faq: [
      {
        q: 'Does Plan Challenger replace operator judgment?',
        a:
          'No. The verdict is a recommendation, not a gate. The skill surfaces the hard questions; the operator decides what moves forward. Even a Pause verdict can be overridden if the operator has context the skill could not see.',
      },
      {
        q: 'How is this different from generic plan review?',
        a:
          'Generic review produces a list of concerns. Plan Challenger produces five angles plus a one-line verdict, with optional confidence scoring for severity ranking. The structure forces depth in each angle rather than breadth across many.',
      },
      {
        q: 'When should the optional confidence scoring be used?',
        a:
          'Use it when the five angles produce many findings and you need a ranked view before deciding. On straightforward plans, qualitative assessment is sufficient. The scoring layer is optional, not default.',
      },
    ],
    relatedSlugs: ['pending-plan-implementation', 'source-harvest'],
    softHook: {
      body:
        'Plan Challenger pairs naturally with Pending Plan Implementation. Challenge the plan, then execute. If you want the design frame for which plans are worth running in the first place, the Sovereign Life Playbook is the upstream architecture.',
      ctaHref: 'https://sidequesthq.co/products/sovereign-life-playbook',
      ctaLabel: 'See the Sovereign Life Playbook',
    },
  },
  {
    slug: 'systematic-debugging',
    type: 'skill',
    title: 'Systematic Debugging',
    label: 'Skill',
    version: '1.0',
    updated: '2026-04-29',
    description:
      'Root-cause investigation discipline. Use before proposing fixes. The Iron Law: no fixes without Phase 1 complete.',
    tags: ['debugging', 'diagnostics', 'root-cause', 'discipline'],
    capsule:
      'Systematic Debugging is a four-phase discipline for finding root causes before attempting fixes. The Iron Law: no fixes without Phase 1 complete. Use under time pressure especially, when guessing is most tempting.',
    installable: {
      marketplaceId: 'systematic-debugging',
      cursorMdc: true,
    },
    definition:
      'Systematic Debugging is a root-cause investigation discipline applied to any technical issue: code bugs, integration failures, hook script errors, build failures, system malfunctions. Four phases run in sequence. Phase 1 identifies the root cause through error reading, reproduction, change tracking and evidence gathering. Phase 2 finds the pattern by comparing against working examples. Phase 3 forms a single hypothesis and tests it minimally. Phase 4 implements one targeted fix and verifies. The Iron Law applies: no fixes without Phase 1 complete. Three failed fix attempts indicates an architectural problem, not a fourth fix.',
    howItWorks: [
      {
        heading: 'The Iron Law and the four phases',
        paragraphs: [
          'The Iron Law: no fixes without root cause investigation first. Seeing symptoms is not understanding root cause. Phase 1 is non-negotiable. Phase 2 finds the pattern by locating working examples and identifying every difference, however small. Phase 3 forms exactly one hypothesis and tests it with the smallest possible change. One variable at a time.',
          'Phase 4 implements the single fix and verifies. If the fix does not work, return to Phase 1 with new information. After three failed attempts, stop and question the architecture. The pattern signals are clear: each fix reveals new coupling in a different place; fixes require major structural changes; each fix creates new symptoms elsewhere. That is wrong architecture, not a failed hypothesis.',
        ],
      },
    ],
    useCases: [
      {
        title: 'Production bug under time pressure',
        body:
          'A production bug surfaces during a high-stakes window. The temptation is guess-and-check. Systematic Debugging applies its Iron Law: Phase 1 first. Evidence gathering at component boundaries surfaces the actual root cause in minutes; the targeted fix in Phase 4 resolves cleanly without introducing new symptoms.',
      },
      {
        title: 'Multi-layer integration failure',
        body:
          'A hook script calls a service that calls an external API. Something breaks; the symptom is at the top of the stack. Phase 1 step 4 (multi-component evidence gathering) instruments each boundary to log entry/exit data. The failing component surfaces from the evidence rather than from a guess.',
      },
      {
        title: 'Architectural problem masquerading as a bug',
        body:
          'Three fixes have been attempted. Each one revealed a new problem. Systematic Debugging recognizes this pattern: this is not a failed hypothesis, this is a wrong architecture. The skill stops the fix loop and surfaces the architectural question to the operator before attempting a fourth fix.',
      },
    ],
    faq: [
      {
        q: 'Is this overkill for simple bugs?',
        a:
          'No. Simple bugs have root causes too, and the process is fast for simple cases. The discipline is the same whether the bug is small or large; the time spent in each phase scales with complexity. Skipping Phase 1 on simple bugs creates the habit that fails on hard ones.',
      },
      {
        q: 'What if the fix is obvious?',
        a:
          'Verify it is obvious by completing Phase 1 quickly. Often what looks obvious is a symptom, not the root cause. The Iron Law applies even when the answer feels certain. Quick Phase 1 confirms or redirects.',
      },
      {
        q: 'What does it mean when 3 fixes have failed?',
        a:
          'It means the architecture is wrong, not the hypothesis. Stop attempting fixes. Surface the architectural question to the operator. A fourth attempt without that conversation creates more debt and moves further from resolution.',
      },
    ],
    relatedSlugs: ['source-harvest'],
    softHook: {
      body:
        'Systematic Debugging is one entry point. The wider operating system that uses it is Infinite Game OS. The full life-design frame that motivates clean architecture in the first place is the Sovereign Life Playbook.',
      ctaHref: 'https://sidequesthq.co/products/sovereign-life-playbook',
      ctaLabel: 'See the Sovereign Life Playbook',
    },
  },
  {
    slug: 'pending-plan-implementation',
    type: 'skill',
    title: 'Pending Plan Implementation',
    label: 'Skill',
    version: '1.0',
    updated: '2026-04-29',
    description:
      'Execute approved plans with checkpoint gates, breadcrumb logging and outcome summaries.',
    tags: ['planning', 'execution', 'governance', 'audit'],
    capsule:
      'Pending Plan Implementation is a skill for executing approved plans with checkpoint gates, breadcrumb logging and outcome summaries. Each step has explicit approval boundaries. The plan note becomes the implementation context, the execution log and the outcome record in one document.',
    installable: {
      marketplaceId: 'pending-plan-implementation',
      cursorMdc: true,
    },
    definition:
      'Pending Plan Implementation executes an approved plan (or approved subset) using the plan note itself as the implementation context, breadcrumb record and outcome summary. The skill confirms intent and risk before starting, documents the execution scope and what remains out of scope, executes approved work step by step, logs every action in the plan\'s execution log, updates evidence references, proposes status changes (approval-gated) and reads back the implementation summary before applying any approval-gated changes. An optional second-AI audit gate offers a challenger pass on substantive output documents before close, with a one-line opt-in framing.',
    howItWorks: [
      {
        heading: 'Execution flow with approval gates',
        paragraphs: [
          'The skill opens by reading back plan intent, risk, affected areas and current breadcrumbs. The operator confirms exactly what is approved to implement now and what remains out of scope. The skill then executes step by step, logging actions in the plan\'s execution log section as it goes. Status changes never auto-apply; they surface as proposals for explicit consent.',
          'An optional audit gate at Step 7 assesses whether the primary output document would benefit from a second-AI challenger pass. A one-line opt-in offers it without requiring it. If yes, the configured second-AI tool reviews the document inline; findings work through in the session, and durable insights graduate to a Refinements section. The audit is a session event, not a separate ritual.',
        ],
      },
    ],
    useCases: [
      {
        title: 'Multi-session implementation with state preservation',
        body:
          'A plan runs across three sessions. Each session updates the plan\'s execution log with what shipped, evidence references and outcome notes. The next session resumes from the plan note itself; no separate continuity doc required. The plan IS the breadcrumb record.',
      },
      {
        title: 'Approval-bounded subset execution',
        body:
          'An approved plan has eight steps. The operator approves only steps 1-3 for this session. The skill executes 1-3, logs them, surfaces what remains out of scope and proposes the implementation_state advance. Steps 4-8 wait for the next approval window.',
      },
      {
        title: 'Substantive output with second-AI audit',
        body:
          'A session produces a new codex section. The optional audit gate offers a challenger pass before close. The operator accepts; the second-AI tool reviews the section. One finding warrants a permanent rule. It graduates to the Refinements section as a single date-stamped entry.',
      },
    ],
    faq: [
      {
        q: 'How is this different from just executing a plan manually?',
        a:
          'Manual execution often skips the breadcrumb update, leaves the plan note stale and loses track of what shipped vs what remains. This skill makes the plan note the source of truth: every action logs there, every status change proposes there, every outcome records there. State preservation is structural, not incidental.',
      },
      {
        q: 'What is the audit gate for?',
        a:
          'It is a one-line opt-in offered before session close on substantive output documents (codex, protocol, governance artifact, finished argument). The operator can accept, decline or skip. When accepted, it routes the document to a second-AI tool for adversarial review. Optional, never default.',
      },
      {
        q: 'Can it auto-execute approved plans?',
        a:
          'No. The skill confirms approved scope explicitly at the start of each session. Status changes propose for explicit consent. Approval is granular and per-session, not blanket and persistent.',
      },
    ],
    relatedSlugs: ['plan-challenger', 'source-harvest'],
    softHook: {
      body:
        'Pending Plan Implementation pairs naturally with Plan Challenger. Challenge first, then implement. Both are tools for an operator playing a longer game. The full architectural frame that motivates per-plan governance is the Sovereign Life Playbook.',
      ctaHref: 'https://sidequesthq.co/products/sovereign-life-playbook',
      ctaLabel: 'See the Sovereign Life Playbook',
    },
  },
  {
    slug: 'skill-creator',
    type: 'skill',
    title: 'Skill Creator',
    label: 'Skill',
    version: '1.0',
    updated: '2026-04-29',
    description:
      'Build new skills autonomously. Interview, research, write a complete SKILL.md, propose the install path.',
    tags: ['meta', 'authoring', 'skills', 'structure'],
    capsule:
      'Skill Creator is a meta-skill for building new skills autonomously. Five-phase process: interview the operator, research relevant patterns, write a complete SKILL.md to the canonical location, propose the install path, propose the registry update. Ensures every new skill is system-native from creation.',
    installable: {
      marketplaceId: 'skill-creator',
      cursorMdc: true,
    },
    definition:
      'Skill Creator builds new skills with a five-phase process. Phase 1 is the interview: five required questions the operator must answer before any drafting begins (one-sentence purpose, trigger conditions, inputs and outputs, governance constraints, related references). Phase 2 researches existing patterns and conventions. Phase 3 writes the complete SKILL.md to the canonical location with required sections (purpose and trigger, when to use, steps or behavior, constraints, refinements). Phase 4 proposes the install path for the operator\'s platform. Phase 5 proposes registry updates. The skill never auto-creates junctions or symlinks. Always proposes first.',
    howItWorks: [
      {
        heading: 'The five-phase build',
        paragraphs: [
          'Phase 1 is the interview, required before any writing begins. Five questions: what does this skill do in one sentence, when should it activate, what are the inputs and outputs, are there governance constraints, are there existing protocols or tools to reference. Phase 2 researches existing patterns. Phase 3 writes SKILL.md with required sections (purpose and trigger, when to use, steps or behavior, constraints, refinements as empty placeholder).',
          'Phase 4 proposes the install path for the operator\'s platform (PowerShell junction on Windows, ln -s on Unix). Phase 5 proposes registry updates (CLAUDE.md or AGENTS.md, local skills index). The skill never auto-creates junctions or registers anything. Always proposes first. The operator approves at each gate. An external-system check applies to skills that touch APIs, git remotes, web services or any external surface.',
        ],
      },
    ],
    useCases: [
      {
        title: 'Building a recurring workflow as a callable skill',
        body:
          'The operator notices they walk through the same workflow every week. Skill Creator interviews them, researches existing patterns, drafts a SKILL.md and proposes the install path. The workflow becomes invocable by name; the operator stops re-explaining it each session.',
      },
      {
        title: 'Wrapping a new tool or API as an interface',
        body:
          'A new external tool enters the operator\'s stack. Skill Creator builds an interface skill: when to use, what inputs, what governance gates, what to do at the external-system check. The tool becomes legible to the operator\'s existing workflow rather than a separate context.',
      },
      {
        title: 'Codifying a discovered pattern after it earns its keep',
        body:
          'A pattern proved itself across multiple sessions. The operator decides to codify it. Skill Creator runs the interview to surface the load-bearing constraints, drafts the SKILL.md and proposes the registry entry. The pattern becomes permanent infrastructure.',
      },
    ],
    faq: [
      {
        q: 'Why a five-question interview before writing?',
        a:
          'Skipping the interview produces generic templates, not system-native skills. The five questions force clarity on purpose, trigger, inputs/outputs, governance and references before any words land. A skill that survives is one whose load-bearing constraints were explicit at creation.',
      },
      {
        q: 'What is the external-system check?',
        a:
          'Before finalizing any SKILL.md that interacts with external systems (APIs, git remotes, web, messaging, calendar tools, image generation, browser automation, MCP tools), the skill prompts for explicit notes about what data flows out and what authorization is required. This protects the operator\'s external surface area.',
      },
      {
        q: 'Does it auto-install the skill it builds?',
        a:
          'No. Phases 4 and 5 propose the install path and the registry update. Both wait for explicit approval. Auto-install would route around governance; the proposal-then-approval pattern preserves operator control over what becomes permanent.',
      },
    ],
    relatedSlugs: ['source-harvest', 'researcher'],
    softHook: {
      body:
        'Skill Creator pairs naturally with Source Harvest. Harvest patterns from elsewhere, then convert them into your own skills. The Sovereign Life Playbook is the design frame for which workflows are worth codifying in the first place.',
      ctaHref: 'https://sidequesthq.co/products/sovereign-life-playbook',
      ctaLabel: 'See the Sovereign Life Playbook',
    },
  },
  {
    slug: 'researcher',
    type: 'skill',
    title: 'Researcher',
    label: 'Skill',
    version: '1.0',
    updated: '2026-04-29',
    description:
      'Parallel sub-agent research on a topic, aggregated into a structured report. Up to 4 independent workers, synthesized output.',
    tags: ['research', 'investigation', 'parallel', 'synthesis'],
    capsule:
      'Researcher spawns up to 4 parallel sub-agents on a research topic, each investigating a different angle, then synthesizes findings into a single structured report. Research feeds decision-making. It does not trigger execution. Every report returns to the operator for review.',
    installable: {
      marketplaceId: 'researcher',
      cursorMdc: true,
    },
    definition:
      'Researcher runs parallel sub-agent research on any topic. Up to 4 independent workers spawn simultaneously, each assigned a specific research angle with relevant context and a clear output format. Workers do not communicate with each other; only their final outputs return. The skill aggregates worker outputs into a single structured report (summary, findings by angle, recommended actions or decision points, sources). Research is intelligence-gathering only. Workers do not implement, do not write to canonical files, do not trigger external actions. Every report returns to the operator for review and decision.',
    howItWorks: [
      {
        heading: 'Parallel workers, synthesized report',
        paragraphs: [
          'Phase 1 clarifies angles before spawning. If the request did not specify, the skill proposes angles (typical patterns: what exists vs what is missing; best practices vs common failure modes; compatible vs incompatible patterns; short-term vs long-horizon considerations). Phase 2 spawns up to four workers in parallel, each with a specific angle, context and output format. Workers are independent; sub-agent depth caps at 1.',
          'Phase 3 synthesizes worker outputs into a single structured report (summary, findings by angle, recommended actions for operator review, sources). Phase 4 presents the report. The operator decides what moves forward; the skill never auto-implements findings. External web research via WebSearch and WebFetch is allowed; external writes are not. Every report returns to the operator. That boundary is non-negotiable.',
        ],
      },
    ],
    useCases: [
      {
        title: 'Pre-plan deep dive across multiple angles',
        body:
          'Before committing to a major plan design, the operator dispatches Researcher on the topic. Four parallel workers investigate problem landscape, existing patterns, risk surface and adoption examples. The synthesized report feeds the plan design with grounded context rather than first-principle guessing.',
      },
      {
        title: 'Tech-watch comparative scan across multiple repos',
        body:
          'Watched repos accumulate over time. Researcher spawns workers per repo to surface new patterns, hook types and skills since last review. The report shows what changed across the watched set in one pass rather than serial reviews.',
      },
      {
        title: 'Architectural decision spanning multiple protocols',
        body:
          'A decision touches multiple systems. Workers cover existing protocols for conflicts, relevant references, external precedents and implementation complexity. The report surfaces dependencies the operator would have missed in linear research, plus a Decision Points section for what needs explicit choice.',
      },
    ],
    faq: [
      {
        q: 'Why parallel workers instead of one deep agent?',
        a:
          'Parallel workers cover more ground per unit of time and surface convergence that one agent would miss. When two workers independently flag the same finding, that overlap is itself a result. A single deep agent produces a linear report; parallel workers produce a triangulated one.',
      },
      {
        q: 'Can workers act on findings?',
        a:
          'No. Workers gather and report. They do not implement, do not write to canonical files, do not trigger external actions. Every report returns to the operator for review and decision. That boundary is non-negotiable.',
      },
      {
        q: 'What is the maximum sub-agent depth?',
        a:
          'Sub-agent depth is capped at 1. Workers do not spawn nested sub-agents within themselves. This prevents recursive cost spirals and keeps the research surface area observable.',
      },
    ],
    relatedSlugs: ['source-harvest', 'skill-creator'],
    softHook: {
      body:
        'Researcher pairs naturally with Source Harvest. Researcher gathers signals across many sources; Source Harvest extracts patterns from the sources worth digging into. The Sovereign Life Playbook is the upstream design frame for which questions are worth researching in the first place.',
      ctaHref: 'https://sidequesthq.co/products/sovereign-life-playbook',
      ctaLabel: 'See the Sovereign Life Playbook',
    },
  },
  {
    slug: 'foundational-creator',
    type: 'bundle',
    title: 'The Foundational Creator Bundle',
    label: 'Bundle',
    version: '1.0',
    updated: '2026-05-01',
    description:
      'Seven Claude Code skills that form the universal substrate for any creator working with AI agents in 2026. Five IGOS-native plus the marketing-skills plugin from Corey Haines.',
    tags: ['bundle', 'creator', 'foundational', 'claude-code', 'creator-os', '2026'],
    capsule:
      'The Foundational Creator Bundle is seven skills that compose the operating layer beneath every creator archetype. Five are IGOS-native (Researcher, Plan Challenger, Source Harvest, Skill Creator, Systematic Debugging). Two come from the marketing-skills plugin by Corey Haines (Content Strategy, AI SEO). Together they cover research, adversarial review, intelligence gathering, custom-tool authoring, root-cause debugging, content planning and AI-era discoverability. One install. Avatar bundles ride on top of this substrate.',
    bundle: {
      installUrl: 'https://www.infinitegameos.io/bundles/foundational-creator/install.sh',
      command: 'curl -sSL https://www.infinitegameos.io/bundles/foundational-creator/install.sh | bash',
      skills: [
        {
          title: 'Researcher',
          description:
            'Parallel sub-agent research on any topic. Up to 4 independent workers spawn simultaneously, each with a specific angle, then a single synthesized report returns. The intake engine for every creative practice.',
          source: 'IGOS Library',
          license: 'CC BY 4.0',
          igosSlug: 'researcher',
        },
        {
          title: 'Plan Challenger',
          description:
            'Adversarial pre-build pass on any plan before execution begins. Five angles (strategic fit, timing, baked-in assumptions, architectural risk, opportunity cost) and a one-line verdict. The editorial director the solo creator never had.',
          source: 'IGOS Library',
          license: 'CC BY 4.0',
          igosSlug: 'plan-challenger',
        },
        {
          title: 'Source Harvest',
          description:
            'Pattern extraction at the source level rather than the description level. Reads actual implementations, classifies each component as Adopt, Enrich, Defer or Ignore and integrates under governance. Compounding intelligence across every external surface a creator touches.',
          source: 'IGOS Library',
          license: 'CC BY 4.0',
          igosSlug: 'source-harvest',
        },
        {
          title: 'Skill Creator',
          description:
            'Build new skills autonomously. Five-phase process: interview, research, write SKILL.md, propose install path, propose registry update. The growth-horizon skill: every creator who reaches workflow sophistication eventually builds custom tools.',
          source: 'IGOS Library',
          license: 'CC BY 4.0',
          igosSlug: 'skill-creator',
        },
        {
          title: 'Systematic Debugging',
          description:
            'Root-cause investigation discipline applied to any technical issue. Four phases. The Iron Law: no fixes without Phase 1 complete. Three failed attempts means architectural problem, not a fourth fix. Universal as creators assemble multi-skill pipelines.',
          source: 'IGOS Library',
          license: 'CC BY 4.0',
          igosSlug: 'systematic-debugging',
        },
        {
          title: 'Content Strategy',
          description:
            'Plans topics, content roadmaps and distribution logic across platform surfaces. Closes the gap between making the work and the work getting found. Distribution is the universal second act of creator work.',
          source: 'marketing-skills (Corey Haines)',
          license: 'MIT',
          externalUrl: 'https://github.com/coreyhaines31/marketingskills/tree/main/skills/content-strategy',
        },
        {
          title: 'AI SEO',
          description:
            'Optimization for AI-generated answers as well as traditional search. Google AI Overviews trigger on roughly half of queries in 2026. Content not structured for AI citation gets filtered out at the discovery layer. The discoverability skill of the moment.',
          source: 'marketing-skills (Corey Haines)',
          license: 'MIT',
          externalUrl: 'https://github.com/coreyhaines31/marketingskills/tree/main/skills/ai-seo',
        },
      ],
    },
    definition:
      'The Foundational Creator Bundle is a seven-skill substrate for any creator working with Claude Code in 2026. Five skills are IGOS-native and were not built for any specific archetype: Researcher, Plan Challenger, Source Harvest, Skill Creator, Systematic Debugging. They are the operating system beneath every creative practice. Two skills come from the marketing-skills plugin by Corey Haines (MIT-licensed): Content Strategy and AI SEO. They cover the distribution and discoverability layer the IGOS library does not yet ship natively. One install command brings the IGOS plugins via the IGOS marketplace and the marketing-skills plugin via its own marketplace. Avatar bundles (the Builder, the Writer, the Performer and so on) ship the medium-specific skills on top of this substrate.',
    howItWorks: [
      {
        heading: 'Two-layer architecture',
        paragraphs: [
          'The Foundational Bundle is the substrate. Every creator who works with Claude Code in 2026 needs the same five capabilities underneath whatever specific output they produce. Pre-creation research. Adversarial review before significant investment. Intelligence extraction from external sources. Custom-tool authoring as the practice deepens. Root-cause debugging when the multi-skill pipeline breaks. Plus the distribution and discoverability layer for any work that meets the public web.',
          'Avatar bundles (the Builder for solo SaaS founders, the Writer for newsletter creators, the Performer for YouTubers and podcasters, the Teacher for course makers, the Curator for digest publishers, the Strategist for fractional executives) ship the medium-specific skills on top of this substrate. The Foundational Bundle installs once. Avatar bundles install per archetype the creator inhabits.',
        ],
      },
      {
        heading: 'What the install brings',
        paragraphs: [
          'The install script adds two Claude Code marketplaces and installs two plugins. The IGOS marketplace ships the five IGOS-native skills as individual plugins. The marketingskills marketplace ships the marketing-skills plugin which contains 40 marketing skills, including Content Strategy and AI SEO. The other 38 marketing skills are bonus depth from the Corey Haines library. They do not auto-execute. They become available to Claude Code based on the work the creator brings.',
          'The install is idempotent. Running the script a second time updates marketplace registrations and re-affirms plugin enablement without duplicating entries. The script edits Claude Code settings.json in place. Claude Code restart picks up the new plugins.',
        ],
      },
      {
        heading: 'How the seven skills compose',
        paragraphs: [
          'Researcher gathers the upstream signal. Multiple parallel workers triangulate a topic faster than serial reading. Plan Challenger stress-tests the design before the creator commits significant effort. Source Harvest extracts patterns from external repos and tools at source level rather than description level. Skill Creator codifies recurring workflows into permanent infrastructure. Systematic Debugging applies root-cause discipline when the multi-skill pipeline produces unexpected behavior.',
          'Content Strategy plans the publishing rhythm and platform surface. AI SEO ensures the work is structured for both traditional search and AI-generated answers. Together the seven cover the upstream (research), midstream (challenge, harvest, build, debug) and downstream (plan distribution, optimize for discovery) of any creative practice that ships work into the world.',
        ],
      },
    ],
    useCases: [
      {
        title: 'New creator setting up their first AI-augmented workflow',
        body:
          'A creator new to Claude Code installs the Foundational Bundle as their starting substrate. Within the first week Researcher dispatches parallel workers for a content idea, Plan Challenger stress-tests the editorial calendar, Content Strategy maps the rollout sequence and AI SEO checks the publishing surface. The bundle replaces a typical six-month tool-stack assembly with a one-command starting line.',
      },
      {
        title: 'Established creator integrating Claude Code into existing practice',
        body:
          'A creator with a working stack adds Claude Code on top. The Foundational Bundle slots underneath their existing tools: Source Harvest extracts patterns from the repos they already follow, Systematic Debugging takes over from ad-hoc fix attempts when the integration layer breaks, Skill Creator codifies their existing workflows into reusable skills. Their stack does not change. The discipline underneath it does.',
      },
      {
        title: 'Creator preparing to add an avatar bundle',
        body:
          'A solo SaaS founder plans to install the Builder bundle. Installing the Foundational Bundle first removes the dedup confusion: the Builder bundle ships only the medium-specific skills (gstack, Context7, Impeccable) because Researcher, Source Harvest, Plan Challenger and Systematic Debugging are already present. Two installs, no overlap. The Foundational layer is the pre-install for every avatar.',
      },
      {
        title: 'Team or studio standardizing on a creator OS',
        body:
          'A small studio decides every collaborator should run the same baseline. The Foundational Bundle is the standard install. New team members get the substrate in one command. The studio adds avatar bundles per role (Writer for content team, Builder for engineering, Strategist for operations) without re-installing the underlying five skills for each person.',
      },
    ],
    faq: [
      {
        q: 'Why a bundle instead of installing each skill individually?',
        a:
          'The five IGOS skills and two marketing skills work together as a substrate. Installing them as a bundle preserves that intent and removes the friction of seven separate install steps. The bundle install is also idempotent, so re-running it updates the registration without duplicating anything.',
      },
      {
        q: 'Does the install bring extra skills I did not ask for?',
        a:
          'Yes, intentionally. The marketing-skills plugin ships 40 skills as one unit, including Content Strategy and AI SEO. The other 38 are bonus marketing depth from the Corey Haines library: copywriting, paid ads, customer research, churn prevention, schema markup, programmatic SEO and more. They do not auto-execute. Claude Code surfaces them only when your work matches their description.',
      },
      {
        q: 'How does this relate to the avatar bundles (Builder, Writer, Performer)?',
        a:
          'Two-layer architecture. The Foundational Bundle is the universal substrate. Avatar bundles ship the medium-specific skills on top of it. A creator picks the avatar that matches their working surface and installs the avatar bundle, which assumes the Foundational Bundle is already present. No skill duplication across avatar bundles.',
      },
      {
        q: 'Can I install the Foundational Bundle without an avatar bundle?',
        a:
          'Yes. Many creators inhabit multiple archetypes or do not fit a single avatar cleanly. The Foundational Bundle alone is a complete starting stack. Avatar bundles are optional medium-specific extensions for creators whose practice is concentrated in one surface (writing, building, performing and so on).',
      },
      {
        q: 'What does the install script actually change on my system?',
        a:
          'It edits Claude Code settings.json (default location: ~/.claude/settings.json) to register two marketplaces (igos-library and marketingskills) and enable six plugins (the five IGOS skills plus marketing-skills). It does not download skill files directly; Claude Code does that on next launch via the marketplace registrations. The script prints every change before applying.',
      },
      {
        q: 'Is the install reversible?',
        a:
          'Yes. The bundle is just settings.json entries. To remove the bundle, remove the marketplace and plugin entries from settings.json (or run /plugin uninstall for each plugin from inside Claude Code). No system-level changes happen.',
      },
    ],
    relatedSlugs: ['researcher', 'plan-challenger', 'source-harvest', 'skill-creator', 'systematic-debugging'],
    softHook: {
      body:
        'The Foundational Creator Bundle is one entry point. The full system the IGOS skills live inside is Infinite Game OS itself. The design frame for which workflows are worth codifying in the first place is the Sovereign Life Playbook.',
      ctaHref: 'https://sidequesthq.co/products/sovereign-life-playbook',
      ctaLabel: 'See the Sovereign Life Playbook',
    },
  },
  {
    slug: 'the-builder',
    type: 'bundle',
    title: 'The Builder Bundle',
    label: 'Bundle',
    version: '1.0',
    updated: '2026-05-01',
    description:
      'Claude Code skills for solo SaaS founders, indie hackers, AI agent builders and hardware tinkerers in 2026. Three avatar-specific installs (gstack ship-trio, Context7, Impeccable) on top of the Foundational Creator Bundle substrate.',
    tags: ['bundle', 'builder', 'solo-saas', 'indie-hacker', 'claude-code', 'shipping', 'creator-os', '2026'],
    capsule:
      'The Builder Bundle is the avatar-specific layer for functional-output creators: solo SaaS founders, indie hackers, AI agent builders, plugin authors and hardware makers. Three skills sit on top of the Foundational Creator Bundle substrate. gstack ships the deploy ritual (/ship, /land-and-deploy, /canary) plus 30 companion commands from Garry Tan. Context7 injects live, version-specific documentation directly into the AI coding session. Impeccable gives a structured design vocabulary for builders who ship the product and the UI. Build is solved in 2026; distribution is the bottleneck. The Builder Bundle protects shipping cadence so attention can move to the harder problem.',
    bundle: {
      installUrl: 'https://www.infinitegameos.io/bundles/the-builder/install.sh',
      command: 'curl -sSL https://www.infinitegameos.io/bundles/the-builder/install.sh | bash',
      skills: [
        {
          title: 'gstack (ship, land-and-deploy, canary, plus 30 companion commands)',
          description:
            'The shipping ritual for solo builders. /ship opens a clean PR with sync and tests. /land-and-deploy merges, deploys and verifies production. /canary watches the post-deploy window most solo builders skip and most regret skipping. The same install brings 30+ companion commands from Garry Tan: CEO review, eng manager, PR review, QA against a real browser, security audit, retro and more. Twenty-three specialists and eight power tools, all slash commands, all Markdown.',
          source: 'github.com/garrytan/gstack',
          license: 'MIT',
          externalUrl: 'https://github.com/garrytan/gstack',
        },
        {
          title: 'Context7 (live documentation injection MCP)',
          description:
            'Pulls version-specific, up-to-date documentation and code examples directly from source repositories into the AI coding session. Eliminates hallucinated API signatures and stale examples for fast-moving libraries (Supabase, Next.js, Tailwind, Stripe, the rest). Two-step pattern: resolve the library ID, then query live docs. Works across Claude Code, Cursor and other AI editors.',
          source: 'github.com/upstash/context7',
          license: 'MIT',
          externalUrl: 'https://github.com/upstash/context7',
        },
        {
          title: 'Impeccable (design steering for code-first builders)',
          description:
            'One skill, 23 commands, curated anti-pattern detection. /impeccable polish, /impeccable audit, /impeccable critique, /impeccable harden (error handling, i18n, edge cases), /impeccable onboard (first-run flows, empty states) and the rest. Gives the non-designer builder a structured vocabulary for visual quality without hiring a designer. The bottleneck for indie products in 2026 is polish, not speed; this skill addresses it directly.',
          source: 'github.com/pbakaus/impeccable',
          license: 'Apache-2.0',
          externalUrl: 'https://github.com/pbakaus/impeccable',
        },
      ],
    },
    definition:
      'The Builder Bundle is the avatar-specific stack for functional-output creators working with Claude Code in 2026. Three skills install on top of the Foundational Creator Bundle: gstack (Garry Tan, MIT) brings the deploy ritual plus a wider engineering-team toolkit. Context7 (Upstash, MIT) injects live documentation. Impeccable (Paul Bakaus, Apache 2.0) handles design steering. The Foundational Bundle (Researcher, Plan Challenger, Source Harvest, Skill Creator, Systematic Debugging plus Content Strategy and AI SEO) is the assumed pre-install. The Builder Bundle does not duplicate those skills. It adds the medium-specific layer a solo SaaS founder, indie hacker, AI agent builder, plugin author or hardware maker needs.',
    howItWorks: [
      {
        heading: 'Pre-install: the Foundational Creator Bundle',
        paragraphs: [
          'The Builder Bundle assumes the Foundational Creator Bundle is already present. The Foundational Bundle is the universal substrate: Researcher for upstream research, Plan Challenger for adversarial pre-build review, Source Harvest for pattern extraction from external repos, Skill Creator for codifying recurring workflows, Systematic Debugging for root-cause investigation, plus Content Strategy and AI SEO from the marketing-skills plugin. Builders need all seven. Installing them once at the substrate level is enough.',
          'If the Foundational Bundle is not yet installed, install it first at /bundles/foundational-creator. The Builder Bundle install script in this page does not bring those skills again.',
        ],
      },
      {
        heading: 'What the install brings',
        paragraphs: [
          'The install script does two things. First, it registers two Claude Code marketplaces (context7-marketplace and impeccable) and enables their plugins by editing settings.json in place. Second, it clones the gstack repository into the Claude Code skills directory and runs the gstack setup, which auto-detects Claude Code and installs all gstack slash commands. Both halves are idempotent. Re-running is safe.',
          'After install, restart Claude Code. /plugin shows context7-plugin and impeccable enabled. The gstack commands (/ship, /land-and-deploy, /canary, /office-hours, /plan-ceo-review, /review, /qa, /retro and the rest) are available as slash commands. The full gstack list ships under one install because the underlying repo is one tightly-integrated toolkit.',
        ],
      },
      {
        heading: 'How the three skills compose',
        paragraphs: [
          'Context7 runs during the build phase. Whenever Claude Code reaches for a library API, Context7 injects the current version-specific docs instead of letting the model improvise from training data. Impeccable runs at the polish phase. Once the feature works, /impeccable polish and /impeccable audit raise the visual baseline before the public sees it. gstack runs at the shipping phase. /ship opens the PR, /land-and-deploy merges and deploys, /canary monitors the post-deploy window. The wider gstack toolkit (CEO review, eng review, QA, retro) covers the team-of-twenty roles a solo founder otherwise carries alone.',
          'The Foundational layer surrounds the three. Researcher runs upstream of the build (user-pain mapping, competitive teardowns). Plan Challenger runs before significant code lands (catches the wrong product before it is built). Source Harvest extracts patterns from upstream libraries. Skill Creator codifies your own recurring shipping workflows. Systematic Debugging runs when the multi-skill pipeline produces unexpected behavior. Together with the Builder layer, you get research, challenge, build, ship, polish, monitor, debug under one roof.',
        ],
      },
    ],
    useCases: [
      {
        title: 'Solo SaaS founder shipping the next feature',
        body:
          'A founder running a $5K MRR micro-SaaS picks up the next ticket. Researcher dispatches parallel workers to map user pain. Plan Challenger stress-tests the proposed solution. Context7 injects the current Supabase and Next.js docs during the build. Impeccable polishes the new flow. /ship opens the PR. /land-and-deploy merges and verifies production. /canary watches the post-deploy window. One operator. Seven roles. No tooling friction between phases.',
      },
      {
        title: 'Indie hacker running multiple products simultaneously',
        body:
          'An indie hacker with three products in different stages keeps shipping rhythm with the same skill set across all three. Each product is a separate repository. The bundle installs once at the user level and applies to every project. Context-switching between products no longer means relearning a tooling stack per repo. The Builder Bundle is the same in every working surface.',
      },
      {
        title: 'AI agent builder working at the frontier',
        body:
          'A builder working on Claude Code plugins or n8n workflows operates where documentation is incomplete and APIs change weekly. Context7 is the load-bearing skill: live docs on every coding pass remove the hallucination tax that compounds across an unstable surface. Source Harvest (from the Foundational layer) extracts integration patterns from upstream MCP servers. Plan Challenger catches MCP integration assumptions before they break at runtime.',
      },
      {
        title: 'Plugin author extending an existing platform',
        body:
          'A builder shipping Obsidian, VS Code or Figma plugins works inside platform constraints. Impeccable enforces visual fluency that matches the host platforms expectation. /ship and /land-and-deploy handle the marketplace publishing rhythm. /canary monitors the install metrics post-publish. The substrate plus the Builder Bundle covers the full plugin lifecycle from idea to deprecation.',
      },
    ],
    faq: [
      {
        q: 'Does the Builder Bundle include the Foundational Creator Bundle?',
        a:
          'No. The Builder Bundle assumes the Foundational Bundle is already installed. Install /bundles/foundational-creator first if you have not already. The two-layer architecture means the medium-specific skills (gstack, Context7, Impeccable) install once on top of the universal substrate (Researcher, Plan Challenger, Source Harvest, Skill Creator, Systematic Debugging plus Content Strategy and AI SEO).',
      },
      {
        q: 'Why does gstack install differently from Context7 and Impeccable?',
        a:
          'Context7 and Impeccable ship as Claude Code marketplace plugins, so they install via settings.json registration. gstack ships as a single repository with 30+ slash commands and its own setup script. The gstack maintainer chose this distribution model intentionally to keep the toolkit tightly integrated. The Builder Bundle install script handles both patterns in one run.',
      },
      {
        q: 'I only want /ship, /land-and-deploy and /canary from gstack. Can I skip the rest?',
        a:
          'gstack distributes as one bundle. Installing brings the full slash-command set. The other commands (CEO review, eng manager, QA, retro and the rest) do not auto-execute. They become available when you invoke them. Most solo builders find at least three or four additional gstack commands useful within the first week. Skipping the install would mean cherry-picking individual command files manually, which the gstack repo does not support cleanly.',
      },
      {
        q: 'Is Context7 a Claude Code plugin or an MCP server?',
        a:
          'It ships as a Claude Code marketplace plugin (context7-plugin under the context7-marketplace marketplace). The plugin internally manages the MCP-style live-docs lookup. You install it via the Builder Bundle script and it works across Claude Code sessions. For Cursor or other AI editors, follow the alternate install path documented in the upstash/context7 repository.',
      },
      {
        q: 'What does the install script actually change on my system?',
        a:
          'It edits Claude Code settings.json (default ~/.claude/settings.json) to register two marketplaces (context7-marketplace, impeccable) and enable two plugins. It clones github.com/garrytan/gstack into ~/.claude/skills/gstack and runs the gstack setup script. It writes a timestamped backup of settings.json before any edit. The script prints every change before applying.',
      },
      {
        q: 'Is the install reversible?',
        a:
          'Yes. To remove the marketplace plugins, restore settings.json from the backup the script writes, or run /plugin uninstall for each plugin from inside Claude Code. To remove gstack, delete ~/.claude/skills/gstack. No system-level changes happen.',
      },
      {
        q: 'How does the Builder Bundle relate to the other avatar bundles?',
        a:
          'Same two-layer pattern across every avatar bundle. The Foundational Bundle is the substrate. The Writer, Performer, Teacher, Curator and Strategist bundles each ship a small medium-specific layer on top. A creator who works as both a Builder and a Writer installs the Foundational Bundle once plus both avatar bundles. No skill duplication.',
      },
    ],
    relatedSlugs: ['foundational-creator', 'source-harvest', 'systematic-debugging', 'plan-challenger'],
    softHook: {
      body:
        'The Builder Bundle is one avatar-specific layer in a wider system. The substrate it sits on top of is the Foundational Creator Bundle. The design frame for which workflows are worth shipping in the first place, and which finite games to play inside the Infinite one, is the Sovereign Life Playbook.',
      ctaHref: 'https://sidequesthq.co/products/sovereign-life-playbook',
      ctaLabel: 'See the Sovereign Life Playbook',
    },
  },
]

export function getAssetBySlug(slug: string, type?: AssetType): IGOSAsset | undefined {
  return igosAssets.find(a => a.slug === slug && (type ? a.type === type : true))
}

export function getAssetsByType(type: AssetType): IGOSAsset[] {
  return igosAssets.filter(a => a.type === type)
}

export function getAllAssetSlugs(): { type: AssetType; slug: string }[] {
  return igosAssets.map(a => ({ type: a.type, slug: a.slug }))
}
