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
  {
    slug: 'the-writer',
    type: 'bundle',
    title: 'The Writer Bundle',
    label: 'Bundle',
    version: '1.0',
    updated: '2026-05-01',
    description:
      'Claude Code skills for newsletter operators, essayists, ghostwriters and indie authors in 2026. Two avatar-specific skills (Voice Ghostwriter, Humanizer) plus a workspace template (Multi-Format Content Writer) on top of the Foundational Creator Bundle substrate.',
    tags: ['bundle', 'writer', 'newsletter', 'essayist', 'ghostwriter', 'claude-code', 'voice', 'creator-os', '2026'],
    capsule:
      'The Writer Bundle is the avatar-specific layer for text-first creators: newsletter operators, essayists, ghostwriters, indie authors and threadwriters. Voice is the entire value proposition. Skills protect, extend or free up time for voice. Voice Ghostwriter calibrates against the writer\'s own work before generating a word. Humanizer detects 37 AI-writing patterns and rebuilds sentence structure rather than swapping synonyms. Multi-Format Content Writer is a workspace template that turns one essay into a thread, a newsletter section and a LinkedIn post in one pass. Sits on top of the Foundational Creator Bundle.',
    bundle: {
      installUrl: 'https://www.infinitegameos.io/bundles/the-writer/install.sh',
      command: 'curl -sSL https://www.infinitegameos.io/bundles/the-writer/install.sh | bash',
      skills: [
        {
          title: 'Voice Ghostwriter',
          description:
            'Voice calibration before generation. Four stages: calibrate against existing work, extract specifics through interview, draft in the calibrated voice, refine with targeted edits. Built originally for founders writing thought leadership; the four-stage flow maps cleanly to newsletter, essay and ghostwriting pipelines. The interview-extraction step is the move ghostwriters use to capture client-specific stories rather than a generic persona.',
          source: 'github.com/BayramAnnakov/founder-voice-ghostwriter',
          license: 'MIT',
          externalUrl: 'https://github.com/BayramAnnakov/founder-voice-ghostwriter',
        },
        {
          title: 'Humanizer',
          description:
            'AI-writing pattern detection across 37 specific signals in five categories. Rebuilds sentence structure rather than swapping synonyms. Five voice profiles (casual, professional, technical, warm, blunt) for different sub-archetypes. The detect-mode flag lets ghostwriters audit a draft before deciding how aggressively to rewrite it. Pure markdown skill, zero dependencies, installs by copying one file.',
          source: 'github.com/Aboudjem/humanizer-skill',
          license: 'MIT',
          externalUrl: 'https://github.com/Aboudjem/humanizer-skill',
        },
        {
          title: 'Multi-Format Content Writer (workspace template)',
          description:
            'A Claude Code workspace template, not a skill. Clone as your writing project. Add 2-3 examples of your own writing to teach Claude your voice. Drop unstructured thoughts into /rawnotes. Run /extract-themes, /research and /write to take one source idea through long-form draft and platform adaptation: LinkedIn, newsletter, Twitter thread, podcast Q&A. Companion install: use as a workspace alongside the two installed skills above.',
          source: 'github.com/WomenDefiningAI/claudecode-writer',
          license: 'MIT',
          externalUrl: 'https://github.com/WomenDefiningAI/claudecode-writer',
        },
      ],
    },
    definition:
      'The Writer Bundle is the avatar-specific stack for text-first creators working with Claude Code in 2026. The Foundational Creator Bundle (Researcher, Plan Challenger, Source Harvest, Skill Creator, Systematic Debugging plus Content Strategy and AI SEO) is the assumed pre-install. The Writer layer adds two installable skills and one companion workspace template. Voice Ghostwriter (Bayram Annakov, MIT) calibrates voice and runs interview-driven extraction before drafting. Humanizer (Aboudjem, MIT) detects 37 AI-writing patterns and rebuilds sentence structure across five voice profiles. Multi-Format Content Writer (WomenDefiningAI, MIT) is a workspace template repository for Claude Code; users clone it as their writing project, drop in voice examples and run platform-adaptation commands. Voice is the entire value proposition for the Writer archetype. Every resource in the bundle either protects voice, extends voice or frees up more time to use voice.',
    howItWorks: [
      {
        heading: 'Pre-install: the Foundational Creator Bundle',
        paragraphs: [
          'The Writer Bundle assumes the Foundational Creator Bundle is already present. The Foundational Bundle is the universal substrate: Researcher for upstream research before drafting, Plan Challenger for adversarial outline review, Source Harvest for pattern extraction from other writers and reference essays, Skill Creator for codifying recurring writing workflows, Systematic Debugging for when the multi-skill pipeline breaks, plus Content Strategy and AI SEO for the publishing rhythm and discoverability layer. Writers need all seven. Installing them once at the substrate level is enough.',
          'If the Foundational Bundle is not yet installed, install it first at /bundles/foundational-creator. The Writer Bundle install script in this page does not bring those skills again.',
        ],
      },
      {
        heading: 'What the install brings',
        paragraphs: [
          'The install script does two things. First, it clones the Voice Ghostwriter repository into the Claude Code skills directory. Second, it pulls the Humanizer SKILL.md file into the skills directory as a single-file skill. Both halves are idempotent. Re-running is safe. The script writes a timestamped backup before any change.',
          'After install, restart Claude Code. Voice Ghostwriter and Humanizer are both available as named skills. Voice Ghostwriter activates when the work calls for voice calibration, interview extraction or drafting in a calibrated voice. Humanizer activates with the /humanizer command or naturally when Claude reaches for AI-pattern detection.',
          'The Multi-Format Content Writer is a workspace template. Use the GitHub "Use this template" flow or git clone to set it up as a writing project, then add your voice examples and start the workflow. Treat it as the writing-room next to the two skills, not as a third install in the same directory.',
        ],
      },
      {
        heading: 'How the three resources compose',
        paragraphs: [
          'Voice Ghostwriter runs at the front of any drafting session. Calibrate against the writer\'s own published work or the client\'s past writing. Extract specifics through structured interview. Draft in the calibrated voice. The output reads like the writer instead of the model. Humanizer runs at the polish phase. Once a draft exists, the detect-mode flag audits it for the 37 AI-writing patterns. The rewrite mode rebuilds sentence structure rather than swapping synonyms. Five voice profiles let the same engine serve different sub-archetypes (casual newsletter operator, professional ghostwriter, technical essayist, warm storyteller, blunt thread writer).',
          'The Multi-Format Content Writer template runs once a long-form draft exists. The /write command produces a full article in the workspace. Specialized agents adapt it for LinkedIn, newsletter, Twitter thread and podcast Q&A formats. The repurposing step is where most writers bleed time; this workflow compresses it to one pass.',
          'The Foundational layer surrounds the three. Researcher gathers research before any draft begins. Plan Challenger stress-tests the outline before drafting. Source Harvest extracts patterns from other writers. Skill Creator codifies recurring drafting workflows. Systematic Debugging takes over when the multi-tool pipeline produces unexpected output. Together with the Writer layer, the practice covers research, challenge, voice-calibration, draft, polish, multi-format adaptation, debug and distribute under one roof.',
        ],
      },
    ],
    useCases: [
      {
        title: 'Newsletter operator publishing weekly',
        body:
          'A newsletter writer publishing every Thursday opens the drafting session Tuesday morning. Voice Ghostwriter calibrates against the last six issues. The interview extraction surfaces the specific story that anchors this week\'s edition. The draft lands in the writer\'s voice rather than a smoothed-out version. Humanizer detect-mode catches three AI-pattern slips. The Multi-Format template adapts the issue into a LinkedIn post and a Twitter thread for distribution day. Same source. Three surfaces. One voice across all of them.',
      },
      {
        title: 'Ghostwriter managing multiple clients',
        body:
          'A ghostwriter with four active clients keeps voice profiles separate by running Voice Ghostwriter per client at the start of each project. The calibration captures founder #1\'s technical density, founder #2\'s warmth, founder #3\'s blunt opinions and founder #4\'s storytelling rhythm. Humanizer detect-mode runs as the audit gate before delivery. The output sounds like each client, not like a smoothed ghostwriter persona. Voice contamination across projects drops to near zero.',
      },
      {
        title: 'Essayist writing long-arc work',
        body:
          'An essayist writing a 4,000-word piece runs Plan Challenger on the outline before drafting begins. Voice Ghostwriter calibrates against the last twenty essays for tonal consistency across the long arc. Researcher dispatches parallel workers for the source-gathering pass. After draft, Humanizer rebuilds the sections that drifted into AI smoothness. The published piece carries the recognizable voice the audience subscribed to.',
      },
      {
        title: 'Indie author maintaining voice across 50,000 words',
        body:
          'A nonfiction author writing book chapters runs Voice Ghostwriter at the start of each chapter session. Calibration locks the chapter\'s voice to the manuscript baseline. Humanizer audits the chapter at the section break before moving forward. Voice consistency over a manuscript-length project is the signature challenge for indie authors; the bundle makes the maintenance work systematic instead of intuition-only.',
      },
      {
        title: 'Threadwriter feeding a newsletter from short-form work',
        body:
          'A threadwriter operating on X or LinkedIn often feeds a newsletter as the deeper distribution layer. The Multi-Format template runs in reverse: the thread becomes the seed, /write produces the long-form newsletter version, Voice Ghostwriter calibrates the long-form voice against the writer\'s archive. Humanizer cleans the polish layer. One short post becomes one full newsletter without the writer redoing the thinking.',
      },
    ],
    faq: [
      {
        q: 'Does the Writer Bundle include the Foundational Creator Bundle?',
        a:
          'No. The Writer Bundle assumes the Foundational Bundle is already installed. Install /bundles/foundational-creator first if you have not already. The two-layer architecture means the medium-specific resources (Voice Ghostwriter, Humanizer, Multi-Format Content Writer template) install once on top of the universal substrate.',
      },
      {
        q: 'Why is Multi-Format Content Writer a "companion template" instead of an installed skill?',
        a:
          'The WomenDefiningAI claudecode-writer repository is a Claude Code workspace template, not a portable skill. It ships with project-specific folders (rawnotes, context, drafts, research) and slash commands designed to operate against those folders. Cloning it as your writing project is the upstream-recommended pattern. The Writer Bundle includes it as a companion link rather than forcing it into a skills directory where the commands would lose their workspace context.',
      },
      {
        q: 'Why two separate humanizer-style tools when both protect voice?',
        a:
          'Voice Ghostwriter and Humanizer solve different problems. Voice Ghostwriter calibrates voice before generation, so the draft starts in the writer\'s voice rather than the model\'s default. Humanizer audits and rewrites after generation, catching the 37 AI-writing patterns that drift in even when calibration is solid. The pair works front-to-back across the writing session.',
      },
      {
        q: 'Will Humanizer change my actual voice when I run it?',
        a:
          'Humanizer detect-mode reports patterns without rewriting. Run detect first to see what would change. Rewrite mode then targets specific sentences rather than smoothing the whole text. Five voice profiles (casual, professional, technical, warm, blunt) keep the rewrite consistent with the chosen archetype. The tool is structural, not stylistic; it removes AI tells, not authorial fingerprints.',
      },
      {
        q: 'What does the install script actually change on my system?',
        a:
          'It clones github.com/BayramAnnakov/founder-voice-ghostwriter into ~/.claude/skills/voice-ghostwriter (single-skill repo, SKILL.md at root). It writes the Humanizer SKILL.md file to ~/.claude/skills/humanizer/SKILL.md (pure markdown skill, no clone needed). It writes a timestamped backup of any existing files in those locations before overwriting. It does not touch settings.json. The Multi-Format template is not installed by the script; the Install page links to the template repository for the Use-this-template flow.',
      },
      {
        q: 'Is the install reversible?',
        a:
          'Yes. To remove Voice Ghostwriter, delete ~/.claude/skills/voice-ghostwriter. To remove Humanizer, delete ~/.claude/skills/humanizer. The Multi-Format template is your own cloned workspace; remove it like any other repo. No system-level changes happen.',
      },
      {
        q: 'How does the Writer Bundle relate to the other avatar bundles?',
        a:
          'Same two-layer pattern across every avatar bundle. The Foundational Bundle is the substrate. The Builder, Writer, Performer, Teacher, Curator and Strategist bundles each ship a small medium-specific layer on top. A creator who works as both a Writer and a Builder installs the Foundational Bundle once plus both avatar bundles. No skill duplication.',
      },
    ],
    relatedSlugs: ['foundational-creator', 'researcher', 'plan-challenger', 'source-harvest'],
    softHook: {
      body:
        'The Writer Bundle is one avatar-specific layer in a wider system. The substrate it sits on top of is the Foundational Creator Bundle. The design frame for the longer arc, where voice protected today becomes a body of work that compounds across decades, is the Sovereign Life Playbook.',
      ctaHref: 'https://sidequesthq.co/products/sovereign-life-playbook',
      ctaLabel: 'See the Sovereign Life Playbook',
    },
  },
  {
    slug: 'the-performer',
    type: 'bundle',
    title: 'The Performer Bundle',
    label: 'Bundle',
    version: '1.0',
    updated: '2026-05-02',
    description:
      'Claude Code skills for YouTubers, podcasters, livestreamers and short-form video creators in 2026. Two avatar-specific skills (YouTube Channel Manager, Video Watcher) plus a video production chapter already inside the Foundational substrate.',
    tags: ['bundle', 'performer', 'youtube', 'podcast', 'shorts', 'claude-code', 'video', 'creator-os', '2026'],
    capsule:
      'The Performer Bundle is the avatar-specific layer for recorded-media creators: YouTubers, podcasters, livestreamers and short-form video creators. Presence is the product. Skills protect the recording cadence, sharpen the discoverability layer and compress the multi-platform repurposing loop. YouTube Channel Manager handles audits, SEO, retention scripts, thumbnails, Shorts optimization and competitor research. Video Watcher gives Claude the ability to actually watch a video, extract frames, transcribe audio and reason about what was on screen. Content Repurposing rides the Foundational substrate already, ready to take one recording into a thread, a clip pack and a newsletter section. Sits on top of the Foundational Creator Bundle.',
    bundle: {
      installUrl: 'https://www.infinitegameos.io/bundles/the-performer/install.sh',
      command: 'curl -sSL https://www.infinitegameos.io/bundles/the-performer/install.sh | bash',
      skills: [
        {
          title: 'YouTube Channel Manager',
          description:
            'A YouTube creator skill covering channel audits, video SEO, retention-aware scripting, hook architecture, thumbnail design briefs, content calendars, Shorts optimization, analytics review, monetization checks, competitor research and cross-platform repurposing. Designed for solo YouTubers and small channel teams. Installs as a single skill at ~/.claude/skills/youtube/. Activate with /youtube audit or by naming the channel work in plain language.',
          source: 'github.com/AgriciDaniel/claude-youtube',
          license: 'MIT',
          externalUrl: 'https://github.com/AgriciDaniel/claude-youtube',
        },
        {
          title: 'Video Watcher',
          description:
            'Gives Claude the ability to actually watch a video. The /watch command takes a URL or local path, downloads with yt-dlp, extracts frames with ffmpeg, transcribes via captions or Whisper and hands the full multimodal package back to Claude. Use it to review your own recordings before publish, study a competitor video without sitting through the whole thing or pull verbatim quotes from a podcast for repurposing. Installs as a Claude Code marketplace plugin (watch@claude-video).',
          source: 'github.com/bradautomates/claude-video',
          license: 'MIT',
          externalUrl: 'https://github.com/bradautomates/claude-video',
        },
        {
          title: 'Content Repurposing (already in your Foundational substrate)',
          description:
            'The video production and repurposing chapter inside the marketing-skills plugin you installed with the Foundational Creator Bundle. Covers AI video generation, talking-head video, programmatic video frameworks (Remotion, Hyperframes), platform-specific cuts and template-driven repeated production. Does not require a separate install. Activate by asking Claude to plan a video, build a repurposing pipeline or design a multi-platform cut from one recording.',
          source: 'github.com/coreyhaines31/marketingskills (video skill, already installed via Foundational Bundle)',
          license: 'MIT',
          externalUrl: 'https://github.com/coreyhaines31/marketingskills/tree/main/skills/video',
        },
      ],
    },
    definition:
      'The Performer Bundle is the avatar-specific stack for recorded-media creators working with Claude Code in 2026. The Foundational Creator Bundle (Researcher, Plan Challenger, Source Harvest, Skill Creator, Systematic Debugging plus Content Strategy and AI SEO) is the assumed pre-install. The Performer layer adds two installable skills and surfaces a third skill that already rides the Foundational substrate. YouTube Channel Manager (AgriciDaniel, MIT) covers the YouTube creator surface end to end: channel audits, SEO, retention, hooks, thumbnails, Shorts and analytics. Video Watcher (Bradley Bonanno, MIT) gives Claude the ability to actually watch a video, extract frames, transcribe and reason about the content. Content Repurposing rides the marketing-skills plugin from the Foundational Bundle and covers AI video generation, programmatic video frameworks and multi-platform repurposing. Presence is the product for the Performer archetype. Every resource in the bundle either sharpens the discoverability layer, frees up time inside the production loop or extends what one recording can become across platforms.',
    howItWorks: [
      {
        heading: 'Pre-install: the Foundational Creator Bundle',
        paragraphs: [
          'The Performer Bundle assumes the Foundational Creator Bundle is already present. The Foundational Bundle is the universal substrate: Researcher for topic and audience research before scripting, Plan Challenger for adversarial review of the series concept or the episode outline, Source Harvest for pattern extraction from reference channels and reference shows, Skill Creator for codifying the recurring production rhythm, Systematic Debugging for when the multi-tool pipeline breaks, plus Content Strategy and AI SEO for the calendar and discoverability layer. Performers need all seven. Installing them once at the substrate level is enough.',
          'If the Foundational Bundle is not yet installed, install it first at /bundles/foundational-creator. The Performer Bundle install script in this page does not bring those skills again, and the Content Repurposing layer specifically rides the marketing-skills plugin that ships with the Foundational install.',
        ],
      },
      {
        heading: 'What the install brings',
        paragraphs: [
          'The install script does two things. First, it registers the claude-video marketplace and enables watch@claude-video for the Video Watcher skill. Second, it clones the AgriciDaniel/claude-youtube repository and copies the YouTube Channel Manager skill files into ~/.claude/skills/youtube/. Both halves are idempotent. Re-running is safe. The script writes a timestamped backup of any existing settings.json or skills directory before any change.',
          'After install, restart Claude Code. /watch becomes available for any video URL or local file. /youtube audit and the wider YouTube Channel Manager surface activate when channel work, video SEO, hook design or thumbnail briefs come up.',
          'Content Repurposing is reachable without a separate install. The marketing-skills plugin from the Foundational Bundle includes the video production chapter. Ask Claude to plan a video, design a repurposing pipeline or cut one recording into multiple platform-specific pieces. The skill activates from inside the Foundational substrate without any additional setup.',
        ],
      },
      {
        heading: 'How the three resources compose',
        paragraphs: [
          'YouTube Channel Manager runs at the planning and audit phases. Audit the channel before a series planning session. Generate retention-aware scripts before recording. Brief a thumbnail before publish. The skill carries the per-platform craft that channel work requires and that solo creators rarely have time to learn from first principles.',
          'Video Watcher runs after recording or while studying a reference. Hand it a draft cut and ask for the rough patches. Hand it a competitor video and ask what the hook structure was. Hand it a long podcast and pull the most quotable moments verbatim. The skill is the missing input modality for video work; without it, Claude can only reason about the title, description and metadata.',
          'Content Repurposing runs at distribution. One long recording becomes a thread, a short-form cut, a newsletter section, a LinkedIn carousel or a podcast clip. The video chapter inside marketing-skills handles the platform-aware cut design and the production pipeline (programmatic templates, AI avatars where appropriate, B-roll generation). The Foundational Bundle\'s Content Strategy skill sets the cadence; the video chapter executes the production.',
          'The Foundational layer surrounds the three. Researcher gathers topic and audience research before any series gets greenlit. Plan Challenger stress-tests the series concept or the episode outline before recording. Source Harvest extracts patterns from reference channels and reference shows. Skill Creator codifies the recurring production rhythm into a reusable workflow. Systematic Debugging takes over when yt-dlp, ffmpeg, Whisper or one of the plugin chains produces unexpected output. Together with the Performer layer, the practice covers research, challenge, scripting, recording, watching, audit, repurpose, debug and distribute under one roof.',
        ],
      },
    ],
    useCases: [
      {
        title: 'Solo YouTuber publishing a weekly long-form video',
        body:
          'A solo YouTuber recording a weekly long-form essay video opens the planning session Monday morning. Researcher dispatches parallel workers across the topic and the audience-search layer. Plan Challenger reviews the series concept and the episode outline before scripting begins. YouTube Channel Manager generates the retention-aware script, the hook structure and the thumbnail brief. Recording happens Tuesday. Wednesday, Video Watcher reviews the rough cut and flags the slow patches. Thursday, Content Repurposing cuts a Shorts version, a thread version and a newsletter section from the same recording. Same week. One recording. Five surfaces.',
      },
      {
        title: 'Podcaster running a weekly interview show',
        body:
          'A podcaster with a weekly interview format runs Researcher before the booking call to surface the guest\'s recent work and unanswered questions in the field. Plan Challenger stress-tests the question outline before the recording. After the recording, Video Watcher transcribes and pulls the three most quotable moments. YouTube Channel Manager turns those moments into Shorts-ready hooks for the YouTube channel. Content Repurposing handles the cross-platform pipeline: full episode on YouTube and audio platforms, three Shorts, a thread and a newsletter quote-card pack. The cadence becomes systematic instead of intuition-only.',
      },
      {
        title: 'Tutorial channel operator covering software walkthroughs',
        body:
          'A tutorial creator covering a piece of fast-changing software runs Source Harvest against the latest documentation before recording each tutorial. YouTube Channel Manager handles the SEO layer and the retention-aware script structure. Recording follows. Video Watcher reviews the screen-record cut and flags the moments where the on-screen action does not match the narration. Content Repurposing turns each tutorial into a written walkthrough for the blog and a short-form preview for distribution. The freshness gap between software updates and tutorial republish gets shorter.',
      },
      {
        title: 'Short-form video creator running a daily TikTok and Reels practice',
        body:
          'A short-form creator publishing a daily Reel runs Researcher weekly to refresh the topic queue. YouTube Channel Manager covers the cross-posting layer for the YouTube Shorts surface. Video Watcher reviews the day\'s draft cut against the platform-specific best practices for hook timing, mid-clip retention and end-card design. Content Repurposing handles the format-aware cuts: 9:16 for Reels and Shorts, 1:1 for the newsletter, 16:9 for the website embed. Daily output without daily reinvention of the wheel.',
      },
      {
        title: 'Livestreamer building an evergreen back catalog from broadcasts',
        body:
          'A livestreamer broadcasting weekly often loses the long-tail value of the broadcast once the stream ends. Video Watcher transcribes the full broadcast and segments it by topic. YouTube Channel Manager turns each segment into a back-catalog video with its own SEO and retention structure. Content Repurposing pulls clips for short-form distribution and quotes for the newsletter. The broadcast stops being a one-time event and starts becoming a content engine that feeds the rest of the practice.',
      },
    ],
    faq: [
      {
        q: 'Does the Performer Bundle include the Foundational Creator Bundle?',
        a:
          'No. The Performer Bundle assumes the Foundational Bundle is already installed. Install /bundles/foundational-creator first if you have not already. The two-layer architecture means the medium-specific resources (YouTube Channel Manager, Video Watcher) install once on top of the universal substrate, and the Content Repurposing layer rides the marketing-skills plugin that ships with the Foundational install.',
      },
      {
        q: 'Why is Content Repurposing not in the install script?',
        a:
          'It is already installed. The Foundational Creator Bundle ships the marketing-skills marketplace from Corey Haines, which includes a video production chapter covering AI video generation, programmatic video frameworks, AI avatars and platform-specific cut design. Performers who installed the Foundational Bundle already have it. The Performer Bundle install script only adds the two skills that are not already present (YouTube Channel Manager and Video Watcher).',
      },
      {
        q: 'What does Video Watcher actually do that I can\'t do without it?',
        a:
          'Without Video Watcher, Claude can only reason about a video\'s title, description, transcript-if-provided and metadata. With Video Watcher installed, /watch turns any video URL or local file into a multimodal package: yt-dlp downloads the file, ffmpeg extracts representative frames, Whisper transcribes the audio if no captions exist and the full set hands back to Claude. The result is that Claude can review your rough cut, study a competitor video, pull verbatim moments from a podcast or audit on-screen action against the narration. Video becomes an actual input modality.',
      },
      {
        q: 'I do not have a YouTube channel. Is this bundle still useful for podcasters or short-form creators?',
        a:
          'Yes. YouTube Channel Manager carries patterns that translate beyond YouTube: hook design, retention architecture, thumbnail composition and analytics review apply to TikTok, Reels, podcast cover art and short-form video on any platform. Video Watcher works on any video file or URL, not just YouTube content. The bundle is YouTube-aware but not YouTube-locked.',
      },
      {
        q: 'What does the install script actually change on my system?',
        a:
          'It registers the claude-video marketplace in ~/.claude/settings.json under extraKnownMarketplaces and enables watch@claude-video under enabledPlugins via a jq merge. It clones github.com/AgriciDaniel/claude-youtube into a temp directory and copies the contents of skills/claude-youtube/ to ~/.claude/skills/youtube/. It writes a timestamped backup of settings.json and any existing skills/youtube directory before any change. No system-level changes happen outside ~/.claude.',
      },
      {
        q: 'Is the install reversible?',
        a:
          'Yes. To remove watch@claude-video, restore the settings.json backup the script wrote, or delete the marketplace entry by hand. To remove YouTube Channel Manager, delete ~/.claude/skills/youtube. The Foundational Bundle is unaffected by either rollback.',
      },
      {
        q: 'How does the Performer Bundle relate to the other avatar bundles?',
        a:
          'Same two-layer pattern across every avatar bundle. The Foundational Bundle is the substrate. The Builder, Writer, Performer, Teacher, Curator and Strategist bundles each ship a small medium-specific layer on top. A creator who works as both a Performer and a Builder installs the Foundational Bundle once plus both avatar bundles. No skill duplication.',
      },
    ],
    relatedSlugs: ['foundational-creator', 'researcher', 'source-harvest', 'plan-challenger'],
    softHook: {
      body:
        'The Performer Bundle is one avatar-specific layer in a wider system. The substrate it sits on top of is the Foundational Creator Bundle. The design frame for the longer arc, where the recording rhythm becomes a body of work that compounds across years, is the Sovereign Life Playbook.',
      ctaHref: 'https://sidequesthq.co/products/sovereign-life-playbook',
      ctaLabel: 'See the Sovereign Life Playbook',
    },
  },
  {
    slug: 'the-teacher',
    type: 'bundle',
    title: 'The Teacher Bundle',
    label: 'Bundle',
    version: '1.0',
    updated: '2026-05-02',
    description:
      'Claude Code resources for course creators, cohort leaders, tutorial channel operators and knowledge product builders in 2026. The smallest avatar bundle by design. The Foundational Creator Bundle covers most of the Teacher\'s working surface; the Teacher layer adds one companion-install link to a deep pedagogy library and the framing that turns the universal stack into curriculum-shaped work.',
    tags: ['bundle', 'teacher', 'course-creator', 'cohort', 'tutorial', 'knowledge-product', 'claude-code', 'pedagogy', 'creator-os', '2026'],
    capsule:
      'The Teacher Bundle is the avatar-specific layer for structured-learning creators: course creators, cohort leaders, YouTube educators, tutorial channel operators, workshop facilitators and knowledge product builders. Unlike the other avatar bundles, this one adds almost no new installs. The Foundational Creator Bundle already carries the Teacher\'s research, plan-challenge, source-harvest, skill-creation, content-strategy and discoverability work. The Teacher layer adds one companion-install link to GarethManning\'s 111-skill evidence-based pedagogy library plus the framing that turns the universal stack into curriculum design, lesson architecture, cohort orchestration and knowledge product engineering.',
    bundle: {
      installUrl: 'https://www.infinitegameos.io/bundles/the-teacher/install.sh',
      command: 'curl -sSL https://www.infinitegameos.io/bundles/the-teacher/install.sh | bash',
      skills: [
        {
          title: 'Claude Education Skills (companion install, not bundled natively)',
          description:
            '111 evidence-based pedagogical skills built by Gareth Manning, an educator with twenty years of international school experience. Covers curriculum design, lesson planning, assessment design, backwards design, rubric creation, formative assessment, learning analytics, adaptive tutoring and AI Learning Science across 15 domains. The library is CC BY-SA 4.0 (share-alike), so the Teacher Bundle does not redistribute it. The install script prints the manual git clone command and the license context so Teachers can install directly from the source repository at the location of their choice.',
          source: 'github.com/GarethManning/claude-education-skills',
          license: 'CC BY-SA 4.0',
          externalUrl: 'https://github.com/GarethManning/claude-education-skills',
        },
      ],
    },
    definition:
      'The Teacher Bundle is the avatar-specific layer for structured-learning creators working with Claude Code in 2026. The Foundational Creator Bundle (Researcher, Plan Challenger, Source Harvest, Skill Creator, Systematic Debugging plus Content Strategy and AI SEO) is the assumed pre-install. For the Teacher archetype, the Foundational Bundle already covers the majority of the working surface. Researcher is the curriculum source-sweep engine. Plan Challenger is the pre-build curriculum review the solo Teacher could never afford to hire. Source Harvest extracts patterns from reference syllabi, open curricula and competitor learning products. Skill Creator builds custom course-design assistants and cohort-Q&A responders. Content Strategy and AI SEO handle the discoverability layer that turns published courses into found courses. The Teacher layer adds one companion-install link to Gareth Manning\'s 111-skill evidence-based pedagogy library, which is CC BY-SA licensed and therefore installed directly from the source rather than redistributed by the bundle. The framing of the bundle is the load-bearing piece. The Foundational stack is already the Teacher\'s stack; the Teacher Bundle teaches the Teacher how to use it as curriculum design rather than as general creator tooling.',
    howItWorks: [
      {
        heading: 'Pre-install: the Foundational Creator Bundle',
        paragraphs: [
          'The Teacher Bundle assumes the Foundational Creator Bundle is already present. The Foundational Bundle is the universal substrate: Researcher for curriculum source research, Plan Challenger for adversarial review of the curriculum or module outline, Source Harvest for pattern extraction from reference syllabi and learning products, Skill Creator for codifying recurring teaching workflows, Systematic Debugging for when the multi-tool pipeline breaks, plus Content Strategy and AI SEO for the publishing rhythm and discoverability layer. Teachers need all seven. Installing them once at the substrate level is enough.',
          'If the Foundational Bundle is not yet installed, install it first at /bundles/foundational-creator. The Teacher Bundle install script in this page does not bring those skills again, and it does not install any new skills natively.',
        ],
      },
      {
        heading: 'What the install brings (and what it does not)',
        paragraphs: [
          'The Teacher Bundle install script does two things. First, it verifies the Foundational substrate is present by checking for marketing-skills@marketingskills in your settings.json. Second, it prints the manual git clone command for the GarethManning/claude-education-skills companion library plus the CC BY-SA 4.0 license context. The script does not install GarethManning\'s skills automatically because the library is share-alike licensed and the Kingdom bundle does not redistribute share-alike code.',
          'Teachers who want the deep pedagogy layer copy the printed git clone command and run it themselves at the location of their choice. The full 111-skill library installs in seconds. After cloning, restart Claude Code and the GarethManning skills are available alongside the Foundational stack.',
          'For Teachers who only need a subset of the GarethManning library, the curriculum design and assessment domain (15 skills) is the highest-leverage starting point. The repo lets you cherry-pick specific skills by copying individual SKILL.md files into ~/.claude/skills/ rather than cloning the full library.',
        ],
      },
      {
        heading: 'How the Foundational substrate becomes the Teacher\'s stack',
        paragraphs: [
          'Researcher runs at the upstream of every curriculum design session. Multi-angle parallel sub-agent research builds the source corpus that the Teacher\'s own pedagogical judgment then sequences into a learning arc. The Researcher finds what has been proven; the Teacher decides what is worth teaching. For cohort leaders, Researcher powers the weekly insight drops that keep cohort content fresh. For YouTube educators, it powers the depth that separates a reference-worthy video from a shallow overview.',
          'Plan Challenger runs before any module gets recorded or any cohort gets opened. The five-angle adversarial pass against a curriculum outline catches the structural weakness, the sequencing gap and the false assumption while the cost is still zero. This is the instructional design review most solo Teachers skip because they have no curriculum specialist on staff. The skill is the editorial mirror that asks where the learning arc has a gap.',
          'Source Harvest runs when the Teacher needs to extract patterns from external educational repos, course libraries, reference frameworks or competitor curricula. The skill extracts patterns from any external repo at source level rather than at description level. For the Knowledge Product Builder this is the curriculum landscape audit that comes before building a new learning product. For the Tutorial Channel Operator this is the way to stay current with rapidly changing tool documentation.',
          'Skill Creator runs when the Teacher\'s system becomes sophisticated enough to teach others how to teach. Build a custom course-design assistant that encodes the Teacher\'s pedagogical voice. Build a cohort-Q&A responder that handles common student questions in the Teacher\'s register. Build a feedback engine that scores student work against the Teacher\'s rubric. The skill is the bridge from Teacher-as-user to Teacher-as-builder.',
          'Content Strategy and AI SEO run at the publishing layer. The Teacher\'s content is only as discoverable as the strategy behind it. Course landing pages, tutorial SEO, YouTube channel architecture and email sequences for pre-launch all require a content strategy layer that most curriculum-focused Teachers skip. AI SEO handles the discoverability layer that turns published courses into found courses in 2026, where Google AI Overviews and AI-generated answer surfaces are deciding what gets surfaced.',
          'Systematic Debugging runs when the multi-skill pipeline produces unexpected output. Every Teacher running a multi-tool workflow eventually hits the moment where the skills stop composing cleanly. Root-cause investigation discipline applies; symptoms are not understanding.',
        ],
      },
    ],
    useCases: [
      {
        title: 'Course creator launching a flagship cohort',
        body:
          'A course creator launching the first cohort of a new flagship program runs Researcher to gather the source corpus across the topic and the audience. Plan Challenger reviews the curriculum outline and surfaces the two modules where the sequencing logic breaks. The Teacher reorders. Source Harvest extracts pricing, format and structure patterns from three reference cohort programs. Content Strategy plans the eight-week pre-launch sequence. AI SEO structures the landing page for discoverability inside AI-generated answers. The cohort opens with a curriculum that survived adversarial review before recording started and a launch sequence designed for 2026 search behavior.',
      },
      {
        title: 'YouTube educator building a long-running educational series',
        body:
          'A YouTube educator launching a twelve-part series runs Plan Challenger against the series concept before the first script gets written. Researcher dispatches parallel workers on the topic across academic, practitioner and popular surfaces. Source Harvest extracts pattern libraries from three reference channels in adjacent territory. The series scripts ride the Foundational substrate; the platform-specific surface is handled by the YouTube Channel Manager from the [Performer Bundle](/bundles/the-performer) when the educator wants the YouTube-native craft layer. Twelve coherent episodes instead of twelve standalone videos that share a series number.',
      },
      {
        title: 'Tutorial channel operator covering fast-changing software',
        body:
          'A tutorial creator covering a piece of software that updates every quarter runs Source Harvest against the latest release notes before recording each tutorial. The skill extracts the structural changes that make the previous tutorial stale. Researcher gathers the community-reported pain points. Plan Challenger reviews the tutorial outline against the new release surface. The published tutorial covers what changed rather than re-recording what already worked. Tutorial freshness becomes a workflow rather than a heroic effort.',
      },
      {
        title: 'Cohort leader running a recurring program with a community',
        body:
          'A cohort leader running quarterly cohorts of a multi-week program runs Skill Creator to build a custom cohort-Q&A responder that knows the curriculum, the common student stuck-points and the Teacher\'s pedagogical voice. The skill answers 70% of student questions in the Teacher\'s register without the Teacher being in the room. Researcher continues to refresh the source corpus between cohorts. Plan Challenger reviews any curriculum revisions before they go live. The cohort experience deepens across iterations rather than degrading under leader bandwidth limits.',
      },
      {
        title: 'Knowledge product builder shipping a learning library',
        body:
          'A Teacher shipping a structured knowledge product (a learning library, a reference guide with embedded instruction, a certification program) runs Source Harvest against the existing landscape to identify what is already covered and what is missing. Researcher gathers the source material that anchors the unique angle. Plan Challenger stress-tests the product architecture before building. Skill Creator builds the learning companion that ships with the product. Content Strategy plans the discoverability layer. The product launches with structural integrity that knowledge products built without these gates often lack.',
      },
    ],
    faq: [
      {
        q: 'Why is the Teacher Bundle smaller than the other avatar bundles?',
        a:
          'Because the Foundational Creator Bundle already covers most of the Teacher\'s working surface. Researcher, Plan Challenger, Source Harvest, Skill Creator, Systematic Debugging, Content Strategy and AI SEO are universally relevant to creators of any avatar; for the Teacher specifically, those seven skills cover curriculum source research, curriculum review, pattern extraction, custom-tool authoring, root-cause debugging, publishing strategy and discoverability. The Teacher Bundle adds one optional companion-install link (GarethManning\'s 111-skill pedagogy library) plus the framing that turns the Foundational stack into a curriculum design environment. The bundle is small by design, not by oversight.',
      },
      {
        q: 'Why is GarethManning\'s library not bundled natively?',
        a:
          'The claude-education-skills repository carries a CC BY-SA 4.0 license, which is share-alike. Bundling those skills natively into our install pipeline could trigger derivative-work classification, which would propagate the share-alike license to the Kingdom bundle infrastructure. The conservative path is to link Teachers directly to the source repository and have them install from there. This sidesteps the share-alike question entirely while still giving Teachers full access to the 111-skill library.',
      },
      {
        q: 'Do I need GarethManning\'s library to use the Teacher Bundle?',
        a:
          'No. The Foundational Creator Bundle alone covers the majority of the Teacher\'s working surface. GarethManning\'s library adds depth in pedagogy specifically: evidence-based curriculum design, assessment design, backwards design, rubric creation, formative assessment, learning analytics and AI Learning Science. Teachers who want that depth follow the install instructions in the script. Teachers who do not still have a working stack from the Foundational substrate.',
      },
      {
        q: 'How does the Teacher Bundle relate to the other avatar bundles?',
        a:
          'Same two-layer pattern across every avatar bundle. The Foundational Bundle is the substrate. The Builder, Writer, Performer, Teacher, Curator and Strategist bundles each ship a small medium-specific layer on top. The Teacher\'s medium-specific layer happens to be the smallest of the six; that is a feature of the universal-stack alignment, not a gap in the Teacher\'s tooling.',
      },
      {
        q: 'A YouTube educator is also a Performer. Should I install both bundles?',
        a:
          'Yes. Cross-archetype creators install the Foundational Bundle once plus every avatar bundle that fits their work. A YouTube educator running a long-form educational channel installs Foundational plus the Teacher Bundle (for the curriculum and pedagogy framing) plus the Performer Bundle (for YouTube Channel Manager and Video Watcher). The two-layer architecture means no skill duplication; the avatar bundles only add medium-specific resources on top of the shared substrate.',
      },
      {
        q: 'What does the install script actually change on my system?',
        a:
          'Almost nothing. The script verifies the Foundational substrate is present by reading your settings.json and looking for marketing-skills@marketingskills. It prints the manual git clone command for GarethManning\'s library plus the license context. It does not modify settings.json, does not clone any repos and does not install any skills natively. The install is informational by design.',
      },
      {
        q: 'Is the install reversible?',
        a:
          'There is nothing to reverse. The script does not modify your system. If you choose to follow the printed git clone command for GarethManning\'s library, removing it later is a single rm -rf against the directory you cloned into. The Foundational Bundle is unaffected.',
      },
    ],
    relatedSlugs: ['foundational-creator', 'researcher', 'plan-challenger', 'source-harvest', 'skill-creator'],
    softHook: {
      body:
        'The Teacher Bundle is one avatar-specific layer in a wider system. The substrate it sits on top of is the Foundational Creator Bundle. The design frame for the longer arc, where the curriculum becomes a body of work that compounds across cohorts, students and decades, is the Sovereign Life Playbook.',
      ctaHref: 'https://sidequesthq.co/products/sovereign-life-playbook',
      ctaLabel: 'See the Sovereign Life Playbook',
    },
  },
  {
    slug: 'the-curator',
    type: 'bundle',
    title: 'The Curator Bundle',
    label: 'Bundle',
    version: '1.0',
    updated: '2026-05-02',
    description:
      'Claude Code skills for newsletter curators, industry digest writers, taste-forward recommendation creators and link aggregators in 2026. Two avatar-specific skills (Tech Digest, Newsletter Creation and Curation) on top of the Foundational Creator Bundle substrate.',
    tags: ['bundle', 'curator', 'newsletter', 'digest', 'rss', 'taste', 'claude-code', 'creator-os', '2026'],
    capsule:
      'The Curator Bundle is the avatar-specific layer for selection-first creators: industry digest writers, taste-forward newsletter authors, "5 things" personal curators, link aggregators and AI-assisted research digest curators. Taste is the entire value proposition. Skills handle the mechanical layer so the Curator can spend more hours doing the thing only they can do: deciding what earns a slot. Tech Digest aggregates RSS feeds, scores, deduplicates and surfaces a structured shortlist for editorial selection. Newsletter Creation and Curation produces the editorial framing, subject lines and synthesis paragraphs that make a curated list land with credibility. Sits on top of the Foundational Creator Bundle.',
    bundle: {
      installUrl: 'https://www.infinitegameos.io/bundles/the-curator/install.sh',
      command: 'curl -sSL https://www.infinitegameos.io/bundles/the-curator/install.sh | bash',
      skills: [
        {
          title: 'Tech Digest',
          description:
            'RSS aggregation engine designed for digest curators. Pulls from configurable feed lists, filters by score, deduplicates overlapping stories, groups by day and surfaces a structured shortlist ready for editorial selection. Pure Python stdlib, zero dependencies. Ships with developer-niche defaults (Hacker News, Lobste.rs); the YAML feed list is fully swappable for any niche. Invoke with /digest 7 for a weekly recap or /digest 3 for a tighter window. The intake engine of the bundle.',
          source: 'github.com/camilleroux/tech-digest',
          license: 'MIT',
          externalUrl: 'https://github.com/camilleroux/tech-digest',
        },
        {
          title: 'Newsletter Creation and Curation',
          description:
            'Editorial production layer. Industry-adaptive newsletter creation with stage, role and geography-aware workflows. Handles the one or two sentences per item that explain why each piece matters, the synthesis paragraph that ties an issue together and the subject lines that make the email worth opening. Pairs cleanly with Tech Digest above: aggregation upstream, editorial production downstream. Together they cover the Curator\'s full weekly loop from raw feed to send-ready copy.',
          source: 'github.com/BrianRWagner/ai-marketing-claude-code-skills',
          license: 'MIT',
          externalUrl: 'https://github.com/BrianRWagner/ai-marketing-claude-code-skills/tree/main/newsletter-creation-curation',
        },
      ],
    },
    definition:
      'The Curator Bundle is the avatar-specific stack for selection-first creators working with Claude Code in 2026. The Foundational Creator Bundle (Researcher, Plan Challenger, Source Harvest, Skill Creator, Systematic Debugging plus Content Strategy and AI SEO) is the assumed pre-install. The Curator layer adds two installable skills. Tech Digest (Camille Roux, MIT) handles RSS intake, scoring, dedup and structured shortlist surfacing. Newsletter Creation and Curation (Brian R Wagner, MIT) handles editorial production, synthesis framing and subject-line authoring. For the Curator, Source Harvest from the Foundational substrate plays a more central role than in any other avatar bundle: the Curator\'s long-term asset is the source map, not the issues. Researcher handles the deeper context-gathering when an issue calls for analytical synthesis rather than just link-plus-sentence framing. Skill Creator lets the Curator encode their selection criteria into custom skills for repeatable quality. Taste is the entire value proposition. Every resource in the bundle either protects taste, extends taste or frees up time to use taste.',
    howItWorks: [
      {
        heading: 'Pre-install: the Foundational Creator Bundle',
        paragraphs: [
          'The Curator Bundle assumes the Foundational Creator Bundle is already present. The Foundational Bundle is the universal substrate: Researcher for deeper context behind a curated item, Plan Challenger for adversarial review of the issue plan or the editorial direction, Source Harvest for building and maintaining the curated source map, Skill Creator for codifying selection criteria into reusable infrastructure, Systematic Debugging for when the multi-tool pipeline breaks, plus Content Strategy and AI SEO for cadence and discoverability. Curators need all seven. Installing them once at the substrate level is enough.',
          'If the Foundational Bundle is not yet installed, install it first at /bundles/foundational-creator. The Curator Bundle install script in this page does not bring those skills again.',
        ],
      },
      {
        heading: 'What the install brings',
        paragraphs: [
          'The install script does two things. First, it clones the Tech Digest repository and copies the digest skill files into the Claude Code skills directory at ~/.claude/skills/tech-digest/. Second, it clones the ai-marketing-claude-code-skills repository and copies the newsletter-creation-curation directory into ~/.claude/skills/newsletter-creation-curation/. Both halves are idempotent. Re-running is safe. The script writes a timestamped backup of any existing skills directory before overwriting.',
          'After install, restart Claude Code. /digest becomes available for any feed list configured in the YAML. The newsletter creation skill activates when the work calls for editorial framing, subject-line authoring or stage-aware sequence design.',
          'A note on the Content Research Writer skill: an additional skill named in the Curator avatar research (ComposioHQ\'s content-research-writer) is omitted from this v1 install pending license confirmation on the upstream repo. The eight-step research-to-draft model it covers (topic understanding, collaborative outlining, source research, hook improvement, section feedback, voice preservation, citation management, final polish) is queued for a Kingdom-native rebuild in v1.1. Curators who write deeper analytical synthesis can reach for the Foundational substrate\'s Researcher in the meantime.',
        ],
      },
      {
        heading: 'How the two skills compose',
        paragraphs: [
          'Tech Digest runs at intake. Configure the feed list once. Run /digest 7 every Monday or /digest 3 for a tighter window. The skill returns a scored, deduplicated shortlist of items grouped by day. The Curator still makes every final call, but they arrive at that decision with a pre-sorted set of candidates instead of 200 raw items. The score-based filtering and the deduplication are the differentiators over a generic RSS reader.',
          'Newsletter Creation and Curation runs at production. Once the items are selected, the skill handles the editorial layer: the one or two sentences per item that explain why each one matters, the synthesis paragraph that ties the issue together, the subject line that earns the open. Stage-aware workflows let the same engine produce a B2B industry digest, a consumer taste-forward newsletter or a "5 things" personal recommendation list with the appropriate voice register for each.',
          'The Foundational layer surrounds the two. Source Harvest is the proprietary source-map builder. Most curators discover good feeds accidentally and lose track of them just as fast; Source Harvest makes source-building deliberate. Researcher is the depth-pass for items that warrant analytical framing rather than a quick blurb. Plan Challenger reviews the issue plan when something feels off and the Curator wants a structural read before sending. Skill Creator lets the Curator encode their selection criteria as a custom skill, turning a felt sense into a repeatable quality bar. Systematic Debugging applies when the multi-tool pipeline produces unexpected output. Together with the Curator layer, the practice covers intake, triage, framing, production, source-mapping, depth-research, plan-review and debug under one roof.',
        ],
      },
    ],
    useCases: [
      {
        title: 'Industry digest curator publishing weekly',
        body:
          'A weekly industry digest writer opens the curation session Tuesday morning. Tech Digest has already aggregated the week\'s feeds and surfaced a scored shortlist. Source Harvest flags two new high-quality feeds added to the source map. The Curator triages the shortlist down to six items. Newsletter Creation and Curation generates the editorial framing per item plus a synthesis paragraph for the issue. Researcher handles a deeper contextual note on the headline item that warrants more than a sentence. The issue ships Wednesday morning with the structural production work compressed and the editorial judgment intact.',
      },
      {
        title: 'Taste-forward lifestyle curator across design and culture',
        body:
          'A lifestyle curator covering design, food, travel and culture runs Source Harvest monthly to vet the existing source map and surface new feeds. Tech Digest aggregates the cross-domain feed list and surfaces what earned a slot this week. The aesthetic eye stays human. Newsletter Creation and Curation handles the editorial framing in the curator\'s established register. The publication that takes a single curator three days to produce by hand becomes a one-day process without smoothing the voice.',
      },
      {
        title: '"5 Things" personal curator running a low-overhead daily list',
        body:
          'A personal recommendation curator publishing six items a week runs Tech Digest with a tightly scoped feed list (15-20 trusted sources). Daily intake takes minutes. Newsletter Creation and Curation handles the brief personal voice for each recommendation. The format that started as a low-overhead labor of love stays low-overhead even as the audience grows.',
      },
      {
        title: 'AI-assisted research digest curator',
        body:
          'An AI-assisted research digest curator uses Tech Digest for deterministic intake and classification across an academic, practitioner and popular feed mix. Researcher dispatches parallel sub-agents to gather context on the highest-priority items. The Curator stays in control of final selection and voice. Newsletter Creation and Curation handles synthesis. The machine handles the mechanical layer; the taste stays human.',
      },
      {
        title: 'Niche recommendation engine for a tight audience',
        body:
          'A niche recommendation curator running a Wirecutter-style format for a specific audience (knife collectors, indie game developers, herbalists) maintains the source map via Source Harvest and runs the weekly aggregation pass via Tech Digest. The recommendations themselves stay personal and voice-forward. Newsletter Creation and Curation handles the framing layer that makes each recommendation feel considered rather than generated.',
      },
    ],
    faq: [
      {
        q: 'Does the Curator Bundle include the Foundational Creator Bundle?',
        a:
          'No. The Curator Bundle assumes the Foundational Bundle is already installed. Install /bundles/foundational-creator first if you have not already. The two-layer architecture means the medium-specific skills (Tech Digest, Newsletter Creation and Curation) install once on top of the universal substrate.',
      },
      {
        q: 'I am not a developer. Will Tech Digest still work for my niche?',
        a:
          'Yes. Tech Digest ships with developer-niche feeds (Hacker News, Lobste.rs) as defaults but the YAML feed list is fully swappable. Replace the default sources with your niche feeds (design publications, climate tech outlets, food media, finance newsletters and so on) and the skill works identically. The first configuration step is editing the feed list to match your beat. The skill is feed-list-driven, not topic-locked.',
      },
      {
        q: 'Why is Content Research Writer not in the install script?',
        a:
          'The ComposioHQ content-research-writer skill named in the Curator avatar research is omitted from v1 pending license confirmation on the upstream repository. The eight-capability research-to-draft model it covers is queued for a Kingdom-native rebuild in v1.1. In the meantime, the Foundational substrate\'s Researcher handles the deeper analytical context that this skill would otherwise cover.',
      },
      {
        q: 'How is Tech Digest different from a regular RSS reader?',
        a:
          'Tech Digest scores items and deduplicates overlapping stories before surfacing them. A regular RSS reader hands you 200 items in chronological order. Tech Digest hands you a scored shortlist already grouped and deduplicated, ready for editorial selection. The selection layer stays human; the triage layer becomes machine-assisted.',
      },
      {
        q: 'What does the install script actually change on my system?',
        a:
          'It clones github.com/camilleroux/tech-digest into a temp directory and copies the contents of skills/digest/ to ~/.claude/skills/tech-digest/. It clones github.com/BrianRWagner/ai-marketing-claude-code-skills into a temp directory and copies the newsletter-creation-curation directory to ~/.claude/skills/newsletter-creation-curation/. It writes a timestamped backup of any existing files in those skills directories before overwriting. It does not touch settings.json. No system-level changes happen outside ~/.claude.',
      },
      {
        q: 'Is the install reversible?',
        a:
          'Yes. To remove Tech Digest, delete ~/.claude/skills/tech-digest. To remove Newsletter Creation and Curation, delete ~/.claude/skills/newsletter-creation-curation. The Foundational Bundle is unaffected by either rollback.',
      },
      {
        q: 'How does the Curator Bundle relate to the other avatar bundles?',
        a:
          'Same two-layer pattern across every avatar bundle. The Foundational Bundle is the substrate. The Builder, Writer, Performer, Teacher, Curator and Strategist bundles each ship a small medium-specific layer on top. A creator who works as both a Curator and a Writer installs the Foundational Bundle once plus both avatar bundles. No skill duplication.',
      },
    ],
    relatedSlugs: ['foundational-creator', 'source-harvest', 'researcher', 'skill-creator'],
    softHook: {
      body:
        'The Curator Bundle is one avatar-specific layer in a wider system. The substrate it sits on top of is the Foundational Creator Bundle. The design frame for the longer arc, where taste compounds into a relationship at scale across years of issues, is the Sovereign Life Playbook.',
      ctaHref: 'https://sidequesthq.co/products/sovereign-life-playbook',
      ctaLabel: 'See the Sovereign Life Playbook',
    },
  },
  {
    slug: 'the-strategist',
    type: 'bundle',
    title: 'The Strategist Bundle',
    label: 'Bundle',
    version: '1.0',
    updated: '2026-05-02',
    description:
      'Claude Code skills for independent management consultants, fractional executives, frameworks writers, growth strategists, decision-systems authors and applied operators in 2026. Three avatar-specific skills (Management Consulting, Decision Toolkit, MBB Management Consultant) on top of the Foundational Creator Bundle substrate.',
    tags: ['bundle', 'strategist', 'consultant', 'fractional', 'frameworks', 'advisory', 'claude-code', 'creator-os', '2026'],
    capsule:
      'The Strategist Bundle is the avatar-specific layer for structured-thinking creators: independent management consultants, fractional executives (CMO, COO, CFO, CTO), frameworks writers, growth strategists, decision-systems authors and applied operators. The intellectual product is the leverage. Skills compress the synthesis-to-delivery gap and turn accumulated patterns into a portable, reusable body of advisory knowledge. Management Consulting carries 42 frameworks across strategy, problem-solving, decision-making, financial and operations work in three output modes. Decision Toolkit runs structured decision frameworks and bias checkers. MBB Management Consultant adds executive communication discipline (Pyramid Principle) and sector-specific framing across nine industries. Sits on top of the Foundational Creator Bundle.',
    bundle: {
      installUrl: 'https://www.infinitegameos.io/bundles/the-strategist/install.sh',
      command: 'curl -sSL https://www.infinitegameos.io/bundles/the-strategist/install.sh | bash',
      skills: [
        {
          title: 'Management Consulting',
          description:
            '42 consulting frameworks at practitioner depth across strategy (Five Forces, Blue Ocean, Wardley Mapping), problem-solving (MECE, Issue Trees, Pyramid Principle), decision-making (RAPID, Pre-Mortem, Second-Order Thinking), financial (TAM/SAM/SOM, Unit Economics), operations and innovation (Jobs to Be Done, Business Model Canvas). Three output modes (Quick Structure, Full Case, Client Deliverable) match response depth to engagement stakes. The category-anchor skill for the bundle. Install first.',
          source: 'github.com/gcamilo/management-consulting',
          license: 'MIT',
          externalUrl: 'https://github.com/gcamilo/management-consulting',
        },
        {
          title: 'Decision Toolkit',
          description:
            'Structured decision-making frameworks and cognitive bias checkers as a dedicated skill layer, separate from the broader consulting framework suite. Opportunity cost analysis, scenario matrices and bias detection are all in scope. The Strategist uses it personally for their own practice decisions and deploys it with clients who need a structured decision session. Pairs with Management Consulting without duplicating it: client-facing deliverables versus structured reasoning under uncertainty.',
          source: 'github.com/glebis/claude-skills',
          license: 'MIT',
          externalUrl: 'https://github.com/glebis/claude-skills',
        },
        {
          title: 'MBB Management Consultant',
          description:
            'Calibrated to the McKinsey/Bain/BCG frame-structure-analyze-synthesize-deliver methodology. Covers executive communication (Pyramid Principle), case interview rigor (market sizing, profitability trees) and sector-specific strategy across nine industries (healthcare, fintech, energy, retail and more). All frameworks derive from public sources, no proprietary firm material. Pairs with Management Consulting above for expanded framework coverage; the sector-depth angles are the primary differentiator.',
          source: 'github.com/charlie989898/-mbb-management-consultant-claude-skill',
          license: 'MIT',
          externalUrl: 'https://github.com/charlie989898/-mbb-management-consultant-claude-skill',
        },
      ],
    },
    definition:
      'The Strategist Bundle is the avatar-specific stack for structured-thinking creators working with Claude Code in 2026. The Foundational Creator Bundle (Researcher, Plan Challenger, Source Harvest, Skill Creator, Systematic Debugging plus Content Strategy and AI SEO) is the assumed pre-install. The Strategist layer adds three installable skills. Management Consulting (gcamilo, MIT) is the category-anchor skill: 42 frameworks at practitioner depth across strategy, problem-solving, decision-making, financial, operations and innovation domains, with three output modes that match response depth to engagement stakes. Decision Toolkit (Gleb Kalinin, MIT) installs as a Claude Code marketplace plugin and provides structured decision frameworks plus cognitive bias checkers as a dedicated layer. MBB Management Consultant (charlie989898, MIT) adds executive communication discipline (Pyramid Principle), case interview rigor and sector-specific strategy across nine industries. For the Strategist, Researcher from the Foundational substrate is the engagement intake engine and Source Harvest is the proprietary pattern-library builder. Systematic Debugging transfers directly into operational and strategic root-cause analysis. The intellectual product is the leverage. Frameworks outlive any individual engagement.',
    howItWorks: [
      {
        heading: 'Pre-install: the Foundational Creator Bundle',
        paragraphs: [
          'The Strategist Bundle assumes the Foundational Creator Bundle is already present. The Foundational Bundle is the universal substrate: Researcher for engagement intake research, Plan Challenger for adversarial review of recommendations before delivery, Source Harvest for building the proprietary pattern library across engagements, Skill Creator for encoding recurring advisory patterns, Systematic Debugging for root-cause investigation when strategies hit unexpected resistance in implementation, plus Content Strategy and AI SEO for the publishing layer when frameworks become content. Strategists need all seven. Installing them once at the substrate level is enough.',
          'If the Foundational Bundle is not yet installed, install it first at /bundles/foundational-creator. The Strategist Bundle install script in this page does not bring those skills again.',
        ],
      },
      {
        heading: 'What the install brings',
        paragraphs: [
          'The install script does three things. First, it clones the gcamilo/management-consulting repository into the Claude Code skills directory at ~/.claude/skills/management-consulting/. Second, it registers the glebis-skills marketplace and enables the Decision Toolkit plugin via a jq merge into settings.json. Third, it clones the charlie989898 MBB Management Consultant repository and copies the skill contents into ~/.claude/skills/mbb-consultant/. All three halves are idempotent. Re-running is safe. The script writes a timestamped backup of any existing settings.json and skills directories before any change.',
          'After install, restart Claude Code. Management Consulting activates on any strategy question, market analysis or structured recommendation request. Decision Toolkit activates with /decision commands or naturally when Claude reaches for structured decision frameworks. MBB Management Consultant activates when executive communication structure or sector-specific strategy framing is in scope.',
        ],
      },
      {
        heading: 'How the three skills compose',
        paragraphs: [
          'Management Consulting runs as the working horse. Three modes match the stakes. Quick Structure for an inline framework hit during a working session. Full Case for a complete diagnostic across an engagement. Client Deliverable for a polished output ready to present. The 42 frameworks span strategy (Porter\'s Five Forces, Blue Ocean, Wardley Mapping), problem-solving (MECE, Issue Trees, Pyramid Principle), decision-making (RAPID, Pre-Mortem, Second-Order Thinking), financial work (TAM/SAM/SOM, Unit Economics), operations and innovation (Jobs to Be Done, Business Model Canvas). Most strategy work in any week reaches for one of these.',
          'Decision Toolkit runs at the decision-point itself. Strategy work is decision work. The skill carries cognitive bias checkers, opportunity cost analysis and scenario matrices as a dedicated layer separate from the broader consulting framework suite. The Strategist uses it personally for their own practice decisions (which client to take, which framework to publish, which engagement to defer) and deploys it with clients running structured decision sessions. The pairing with Management Consulting matters: gcamilo for client-facing deliverables, Decision Toolkit for structured reasoning under uncertainty.',
          'MBB Management Consultant runs when executive communication discipline matters or sector depth is required. Pyramid Principle structuring for board-ready memos. Market sizing and profitability tree rigor for sector-specific engagements. Nine industries with their own framing layers (healthcare, fintech, energy, retail and others). For the Strategist working in a specific vertical, the sector depth here fills the gap that a generalist framework library leaves open.',
          'The Foundational layer surrounds the three. Researcher dispatches parallel sub-agents on the engagement intake research that used to take a half-day. Source Harvest extracts patterns from across engagements into the Strategist\'s pattern library, the long-term sovereign asset that compounds across years of advisory work. Plan Challenger runs the adversarial pre-delivery review before any client-facing recommendation goes out. Skill Creator codifies the Strategist\'s own recurring patterns into custom skills (the discovery-call template, the diagnostic structure for a specific engagement type, the recommendation format for a specific client profile). Systematic Debugging applies when a strategy hits unexpected resistance in implementation, which is the moment the Strategist\'s value proposition is tested. Content Strategy and AI SEO handle the publishing layer when frameworks become content. Together with the Strategist layer, the practice covers research, structuring, decision-rigor, sector-depth, framework application, pattern-harvest, plan-review, custom-tool authoring, root-cause and publishing under one roof.',
        ],
      },
    ],
    useCases: [
      {
        title: 'Independent management consultant running 3-5 concurrent engagements',
        body:
          'An independent consultant with four active engagements opens the working session. Researcher dispatches parallel workers on this morning\'s engagement intake. Management Consulting structures the diagnostic in Full Case mode. Plan Challenger reviews the recommendation outline before drafting. MBB Management Consultant applies Pyramid Principle to the executive summary. The deliverable that used to consume a full day of synthesis-to-delivery work ships in two hours with the structural rigor intact and the Strategist\'s judgment as the load-bearing layer.',
      },
      {
        title: 'Fractional executive embedded across multiple clients',
        body:
          'A fractional CMO embedded part-time in three companies runs Researcher each Monday on the week\'s priority decisions across all three. Management Consulting structures the recommendation framework. Decision Toolkit handles the bias-check pass before each client presentation. Source Harvest captures the operational pattern that worked at company two for application at company three (without violating confidentiality, since patterns are extracted at structural level). The fractional model that depends on multiplied hours becomes structurally sustainable.',
      },
      {
        title: 'Frameworks writer publishing strategic intellectual property',
        body:
          'A frameworks writer publishing on Substack, LinkedIn and through books runs Researcher to gather the source corpus for the next major framework. Source Harvest extracts pattern libraries from reference work in adjacent territory. Management Consulting provides the framework architecture. Plan Challenger stress-tests the framework before publication. AI SEO handles the discoverability layer for the published piece. The intellectual property pipeline that takes most frameworks writers months to maintain becomes a weekly rhythm.',
      },
      {
        title: 'Growth strategist designing GTM systems for early-stage companies',
        body:
          'A growth strategist running advisory engagements for early-stage companies runs Management Consulting in Full Case mode for the GTM diagnostic. Decision Toolkit handles the channel-prioritization decision. MBB Management Consultant provides the sector framing for the specific industry vertical. Source Harvest builds a portable playbook library across the engagements that compounds the advisory value over time. The early-stage advisory engagement that depends on senior judgment under time pressure becomes structurally repeatable.',
      },
      {
        title: 'Decision-systems author writing for knowledge workers and leaders',
        body:
          'A decision-systems author writing books and courses on probabilistic thinking, cognitive bias and decision frameworks runs Researcher for source triangulation and Decision Toolkit as both a working tool and a body of patterns to write about. Source Harvest extracts existing decision frameworks at source level. Management Consulting provides adjacent strategic framework material. The intellectual property that anchors the author\'s public surface stays grounded in working tools rather than abstractions.',
      },
    ],
    faq: [
      {
        q: 'Does the Strategist Bundle include the Foundational Creator Bundle?',
        a:
          'No. The Strategist Bundle assumes the Foundational Bundle is already installed. Install /bundles/foundational-creator first if you have not already. The two-layer architecture means the medium-specific skills (Management Consulting, Decision Toolkit, MBB Management Consultant) install once on top of the universal substrate.',
      },
      {
        q: 'Why two consulting framework skills (gcamilo and MBB) instead of one?',
        a:
          'Both cover different territory. Management Consulting (gcamilo) is the category-anchor with 42 frameworks at practitioner depth and three output modes matched to engagement stakes. MBB Management Consultant focuses on executive communication discipline (Pyramid Principle) and sector-specific framing across nine industries. They overlap meaningfully on common frameworks (Porter\'s Five Forces, Jobs to Be Done) but diverge on output style and sector depth. For Strategists working in a specific vertical, the MBB sector-depth fills the gap. For Strategists working broad-spectrum advisory, the gcamilo three-mode model is the daily driver.',
      },
      {
        q: 'How does Decision Toolkit differ from the decision-making frameworks already in Management Consulting?',
        a:
          'Management Consulting includes RAPID, Pre-Mortem and Second-Order Thinking as part of its broader framework suite for client-facing deliverables. Decision Toolkit is the dedicated decision-rigor layer: cognitive bias checkers, opportunity cost analysis, scenario matrices and structured decision sessions. The Strategist uses Decision Toolkit personally for their own practice decisions and deploys it for clients running structured decision sessions. Management Consulting is for client-facing diagnostic and recommendation work. Decision Toolkit is for structured reasoning under uncertainty, including the Strategist\'s own.',
      },
      {
        q: 'I work in a specific industry vertical (healthcare, fintech, energy). Is this bundle still useful?',
        a:
          'Yes. MBB Management Consultant carries sector-specific framing across nine industries explicitly. Management Consulting is sector-agnostic but its 42 frameworks apply across verticals. The combination gives you generalist depth plus sector-specific framing in the same install. For verticals not covered by the MBB sector list, the Plan Challenger and Source Harvest skills from the Foundational substrate let you build sector-specific advisory patterns over time.',
      },
      {
        q: 'What does the install script actually change on my system?',
        a:
          'It clones github.com/gcamilo/management-consulting into a temp directory and copies the contents to ~/.claude/skills/management-consulting/. It registers the glebis-skills marketplace in ~/.claude/settings.json under extraKnownMarketplaces and enables the decision-toolkit plugin under enabledPlugins via a jq merge. It clones github.com/charlie989898/-mbb-management-consultant-claude-skill into a temp directory and copies the skill contents to ~/.claude/skills/mbb-consultant/. It writes a timestamped backup of settings.json and any existing skills directories before any change. No system-level changes happen outside ~/.claude.',
      },
      {
        q: 'Is the install reversible?',
        a:
          'Yes. To remove Management Consulting, delete ~/.claude/skills/management-consulting. To remove Decision Toolkit, restore the settings.json backup the script wrote or delete the marketplace entry by hand. To remove MBB Management Consultant, delete ~/.claude/skills/mbb-consultant. The Foundational Bundle is unaffected by any rollback.',
      },
      {
        q: 'How does the Strategist Bundle relate to the other avatar bundles?',
        a:
          'Same two-layer pattern across every avatar bundle. The Foundational Bundle is the substrate. The Builder, Writer, Performer, Teacher, Curator and Strategist bundles each ship a small medium-specific layer on top. A creator who works as both a Strategist and a Writer (frameworks writer with a publication arm) installs the Foundational Bundle once plus both avatar bundles. No skill duplication.',
      },
    ],
    relatedSlugs: ['foundational-creator', 'researcher', 'source-harvest', 'plan-challenger', 'systematic-debugging'],
    softHook: {
      body:
        'The Strategist Bundle is one avatar-specific layer in a wider system. The substrate it sits on top of is the Foundational Creator Bundle. The design frame for the longer arc, where pattern libraries become a sovereign intellectual asset that compounds across decades, is the Sovereign Life Playbook.',
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
