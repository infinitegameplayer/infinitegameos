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
    relatedSlugs: ['plan-challenger', 'systematic-debugging', 'pending-plan-implementation', 'skill-creator', 'researcher', 'website-builder'],
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
    slug: 'social-batch-drafting',
    type: 'skill',
    title: 'Social Batch Drafting',
    label: 'Skill',
    version: '1.0',
    updated: '2026-05-03',
    description:
      'Draft a 9-post social batch (3 days × 3 platforms) from any source. Voice rules enforced before drafting begins. Approved batch becomes the durable handoff to the queue skill.',
    tags: ['social', 'drafting', 'voice', 'creator', 'publishing'],
    capsule:
      'Social Batch Drafting is a skill for producing a complete 9-post social batch (3 days × 3 platforms) from any source artifact, with voice rules enforced as pre-flight gates and prior-batch threading running by default. The output is an approved batch markdown file ready for the downstream queue skill to ship.',
    installable: {
      marketplaceId: 'social-batch-drafting',
      cursorMdc: true,
    },
    definition:
      'Social Batch Drafting takes a single source (an article, a session reference, a workshop campaign, a product page) and produces nine posts: three days, three platforms per day. The skill enforces voice rules before drafting begins and re-runs the sweep against the produced copy before presenting it to the operator. Forward-reference threading runs automatically when a series predecessor is named; light breadcrumb weaving runs by default for one-off batches. Anchor arcs (multi-batch escalations like reveal arcs, seat-count countdowns or product hints) carry state across batches so the next installment honors what came before. The output is an approved batch markdown file that becomes the durable handoff artifact for the Social Batch Queue skill. Voice and threading discipline live here; execution and scheduling belong downstream.',
    howItWorks: [
      {
        heading: 'The 9-post structure',
        paragraphs: [
          'Three days. Three posts per day. Three platforms per post (Instagram, Facebook, LinkedIn by default; Threads, Substack notes and other text-first surfaces substitute as the operator chooses). Day 1 is a hook that opens a tension or scene. Day 2 is an 8-slide carousel that walks the full arc: cover, foundation, distinction, core practice, second layer, fear or turn, connection to the parent concept, close. Day 3 is a direct invitation with an anchor seed and references to prior installments. The carousel exports as 8 PNG pages for Instagram and Facebook plus a single PDF document for LinkedIn.',
          'The three days move from tension to architecture to invitation. Each day is standalone-capable; together they tell a complete arc. Headlines on Day 1 and Day 3 end with a period (or a question mark for questions) and stay between three and six words. Carousel slide headings stay punchy and pull from source content rather than getting invented at draft time.',
        ],
      },
      {
        heading: 'Voice rules and threading as pre-flight discipline',
        paragraphs: [
          'Voice rules run as gates, not suggestions. Em dashes, missing contractions, Oxford commas, internal names in public copy, fabricated anecdotes, pure-negation framing without an affirmative reframe: each gets caught before the draft reaches the operator. The skill ships with the author\'s defaults; operators layer their own rules via voice addenda. The structural enforcement (sweep before drafting, sweep after drafting, halt on violation) is the contribution.',
          'Forward-reference threading is the second layer of discipline. When a series predecessor is named, all platforms get the thread, not just LinkedIn. The Day 1 opener names what came before and where the batch is now. The carousel close threads the accumulation. The Day 3 action references prior installments before the anchor seed. When no series exists, the skill still surfaces light breadcrumbs from recent batches: a quotable phrase, a sensory image, a recurring opening register. The principle: every social post knows what came before it.',
        ],
      },
    ],
    useCases: [
      {
        title: 'Article-driven batch from a polished long-form piece',
        body:
          'A long-form article ships and the operator wants a 9-post sequence carrying the same thesis to social. Social Batch Drafting reads the article, extracts the load-bearing sensory moments and the lines that would land verbatim, threads any prior-batch references and produces the full 9-post draft. The operator reviews, approves, hands off to the queue skill for scheduling.',
      },
      {
        title: 'Workshop or product-launch campaign with seat-count escalation',
        body:
          'A workshop runs in three weeks. The operator wants an arc of three batches across the campaign window, each one escalating the seat-count language. Social Batch Drafting reads the prior batch\'s anchor arc state verbatim and proposes the escalated phrasing for this batch before any copy is written. Continuity becomes structural rather than rememberable.',
      },
      {
        title: 'Multi-batch series with forward-reference threading',
        body:
          'A content arc spans many weeks. Each batch references prior installments to make the arc visible to the audience. Social Batch Drafting names which batches to thread before drafting, then drafts the Day 1 opener explicitly first. The accumulation becomes part of the story across LinkedIn body copy, carousel close slide and Day 3 action.',
      },
      {
        title: 'Freeform sequence batch with light breadcrumb weaving',
        body:
          'A one-off batch with no formal series. The skill still scans recent batches and surfaces 1 to 2 candidate breadcrumb lines: a quotable phrase, a recurring image, a voice anchor. The operator chooses whether to weave them. The principle holds even outside formal series: every batch knows what came before it.',
      },
      {
        title: 'Workshop attendee-driven sequence with date specificity',
        body:
          'A live workshop produced themes worth carrying forward into public batches. Social Batch Drafting takes a workshop-summary or topic-harvest doc as the source, applies a voice addendum requiring date specificity (specific weekday and date rather than "this weekend") and produces the batch with workshop continuity preserved.',
      },
      {
        title: 'Solo nonprofit comms from a program update report',
        body:
          'A solo nonprofit communications coordinator wants a 9-post arc carrying the latest program update to the community. Social Batch Drafting reads the program update report, extracts the load-bearing community moments and the impact lines that would land in mission-aligned voice, threads any prior-batch references and produces the full 9-post draft. Mission framing stays intact across the arc; the operator reviews and approves before handoff to the queue skill.',
      },
    ],
    faq: [
      {
        q: 'Why a skill instead of a memory or a checklist?',
        a:
          'Memories drift. Checklists get skipped under deadline pressure. A skill makes the pre-flight structurally impossible to skip: the voice sweep gates are explicit steps, the threading scan runs by default, the approval gate is a hard pause. The discipline becomes the file rather than the operator\'s willpower.',
      },
      {
        q: 'What if my voice rules are different from the defaults?',
        a:
          'Layer your own via voice addenda. The skill\'s structural enforcement (sweep before drafting, sweep after drafting, halt on violation) holds. The specific rules are operator choice. Some rules ship as defaults because they catch common failure modes (em dashes reading AI, Oxford commas drifting in via dictation tools); replacing them is a deliberate operator decision.',
      },
      {
        q: 'How does forward-reference threading work in practice?',
        a:
          'When a series predecessor is named, the skill reads its anchor arc state verbatim, names which prior batches to thread before drafting and writes the Day 1 opener explicitly first. All platforms get the thread, not just LinkedIn. Temporal language carries the references ("a few weeks ago I wrote", "last week", "this week") rather than internal names.',
      },
      {
        q: 'What happens if the post-draft sweep catches a voice violation?',
        a:
          'The skill halts at Step 8 and routes back to Step 7 for the affected post. The draft does not reach the operator until all gates pass. This is non-negotiable; presenting a draft with violations forces the operator to do the sweep manually, which defeats the skill\'s purpose.',
      },
      {
        q: 'Does this skill schedule the posts?',
        a:
          'No. Drafting produces the approved batch file; the Social Batch Queue skill consumes it and ships through the operator\'s scheduling tool. The boundary is firm. Voice and copy are Drafting\'s responsibility; image generation, asset staging and scheduler integration belong downstream.',
      },
    ],
    relatedSlugs: ['social-batch-queue', 'grant-researcher', 'pending-plan-implementation', 'plan-challenger'],
    softHook: {
      body:
        'Social Batch Drafting pairs with Social Batch Queue. Drafting produces the approved batch; Queue ships it as scheduled posts. The two work as a flywheel. The Sovereign Life Playbook is the upstream design frame for which work is worth distributing in the first place.',
      ctaHref: 'https://sidequesthq.co/products/sovereign-life-playbook',
      ctaLabel: 'See the Sovereign Life Playbook',
    },
  },
  {
    slug: 'social-batch-queue',
    type: 'skill',
    title: 'Social Batch Queue',
    label: 'Skill',
    version: '1.0',
    updated: '2026-05-03',
    description:
      'Execute an approved 9-post social batch. Image generation, asset staging, scheduler integration with channel discovery, post-publish handoff. Pairs with Social Batch Drafting.',
    tags: ['social', 'scheduling', 'queue', 'image-generation', 'creator', 'publishing'],
    capsule:
      'Social Batch Queue is a skill for shipping an approved 9-post batch as scheduled posts. Image generation, asset staging, scheduler integration with channel discovery and slot resolution, post-publish handoff. The full pipeline lives here. Pairs with Social Batch Drafting.',
    installable: {
      marketplaceId: 'social-batch-queue',
      cursorMdc: true,
    },
    definition:
      'Social Batch Queue takes an approved batch markdown file (status `approved-pending-scheduling`) and ships it as scheduled posts across the operator\'s social platforms. Image generation runs first: a cinematic Day 3 background per the brief in the batch file, plus headline replacements on the Day 1 hook template and the Day 3 action template, plus bulk text replacement across the 8 carousel slides for Day 2. A Desktop review pause surfaces all rendered exports for operator review before any asset staging or scheduler queue runs. After approval, assets stage to a public URL host, channel IDs discover at run-time (never hardcoded), schedules resolve against each channel\'s existing slots and posts queue with alt text on every attachment. The output is a batch file with execution log entries, scheduled posts in the operator\'s scheduler with permalinks captured and a structured manual-handoff list for any platform-native operations the scheduler can\'t do.',
    howItWorks: [
      {
        heading: 'Reference implementations and substitutability',
        paragraphs: [
          'The skill names a specific stack as the reference implementation, then frames each component generically. The reference image-generation pipeline uses fal.ai for backgrounds, Canva for template editing, Vercel Blob for public asset staging and a cloud-synced drive for local archive. The reference scheduler is Buffer with channel discovery and custom-scheduled posting. Operators with different stacks substitute component by component: any image-generation pipeline that produces PNG and PDF outputs and stages them at a public URL works for the asset side; any scheduling tool with channel discovery, slot configuration and a `customScheduled` API works for the scheduler side.',
          'The structural discipline is what holds across stacks. Desktop review pause as the operator gate. Font sizes locked at template-load time. Vertical centering check after every text replacement on single-headline templates. Heading character budgets enforced at draft time so font sizes never have to drift. Channel IDs discovered at run-time. Native-isolation test as the cheapest first diagnostic on scheduler failure.',
        ],
      },
      {
        heading: 'The Desktop review pause',
        paragraphs: [
          'Image generation is where review prevents downstream rework. A centering issue caught in the Desktop folder is cheap to fix; the same issue caught after the queue runs is expensive (re-export, re-upload, re-queue, possibly delete and re-create posts). The pause stays default-on for the first several live runs of this skill on any given operator stack. After multiple consecutive perfect first-time renders, the pause may relax to default-off as trust builds.',
          'When the pause is active, the skill surfaces the Desktop folder path and the file inventory, then waits for explicit "approved" or specific adjustment requests. On adjustment, the skill loops back to the rendering step for the affected images. This is the firm gate. Bypassing the pause when it is set to true defeats the trust-building rhythm and reintroduces the rework cost the pause exists to prevent.',
        ],
      },
    ],
    useCases: [
      {
        title: 'First live run on a new operator stack',
        body:
          'An operator runs the skill for the first time. Desktop review pause is default-on. The skill renders all 10 image exports (Day 1 hook, 8 carousel slides plus Day 3 action), surfaces the Desktop folder for review and waits. The operator catches a font-size drift on slide 6 and a centering shift on Day 3. The skill loops back to the affected renders, fixes both and re-surfaces. Approved. Assets stage, schedule and queue.',
      },
      {
        title: 'Multi-batch arc execution with scheduler tier awareness',
        body:
          'An operator runs three batches across a campaign window. The scheduler is on a free tier with a 9-slot queue cap. The skill spaces the batches so each batch\'s queue is cleared (or nearly cleared) before the next queues. Channel ID discovery runs every batch since the scheduler rotates IDs on disconnect.',
      },
      {
        title: 'Image-pipeline-only run for asset reuse',
        body:
          'An operator wants the rendered assets but plans to schedule manually inside the platform-native UI. The skill runs Steps 1 through 5 (read draft, generate background, render templates, Desktop review, stage to public URLs) and then halts. The operator pulls the URLs and posts manually. The voice-and-copy boundary holds; the operator never edits the approved batch file.',
      },
      {
        title: 'Scheduler-failure recovery with native-isolation test',
        body:
          'A scheduled post fails to publish on Instagram. The skill halts before iterating scheduler-layer variations. It surfaces the native-isolation test directive: post directly on the platform first as the cheapest diagnostic. If the native post succeeds, the issue is scheduler-layer; if it fails, the issue is platform-side. The test costs minutes and prevents hours of fruitless scheduler retries.',
      },
      {
        title: 'Substituting the reference image stack with the operator\'s preferred tools',
        body:
          'An operator already has a Figma-based template editing flow and a Stability AI image generation pipeline. The skill\'s structural discipline (Desktop review, font-size lock, vertical centering check, character budgets, parallel-download race-condition discipline) applies to the operator\'s tools without modification. The reference stack is a starting point, not a requirement.',
      },
    ],
    faq: [
      {
        q: 'Does this skill require Buffer specifically?',
        a:
          'No. Buffer is the reference implementation; the skill names it explicitly so operators can see the working pattern. Any scheduling tool with channel discovery, slot configuration and a `customScheduled` API works. The structural discipline (channel IDs discovered at run-time, native-isolation test on failure, alt text on every attachment) holds across schedulers.',
      },
      {
        q: 'What happens if the batch draft contains voice violations?',
        a:
          'The skill halts and routes back to the Drafting skill. Voice changes are out of scope here; this skill executes copy that Drafting has already approved. Publishing a draft with voice violations would defeat the Drafting skill\'s gate. The boundary is firm.',
      },
      {
        q: 'Why is the Desktop review pause non-negotiable for first runs?',
        a:
          'Image-generation issues caught in the Desktop folder are cheap (re-export and continue). The same issues caught after the queue runs are expensive (re-export, re-upload, re-queue, possibly delete and re-create). The pause is the operator\'s leverage point. After multiple consecutive perfect renders, the pause may relax; until then it stays default-on.',
      },
      {
        q: 'Can I use a different image-generation stack?',
        a:
          'Yes. The skill names fal.ai, Canva and Vercel Blob as the reference implementation. The image-generation pipeline is component-by-component substitutable. The structural discipline is what travels across stacks: Desktop review, font-size lock, vertical centering check, heading character budgets, parallel-download race-condition discipline.',
      },
      {
        q: 'How does the skill handle scheduler-to-platform failures?',
        a:
          'On any scheduler error, the skill halts iteration and surfaces the native-isolation test as the cheapest first diagnostic: post directly on the platform first to determine whether the issue is scheduler-layer or platform-side. The skill does not iterate scheduler-layer variations beyond two or three attempts without operator authorization.',
      },
    ],
    relatedSlugs: ['social-batch-drafting', 'systematic-debugging', 'pending-plan-implementation'],
    softHook: {
      body:
        'Social Batch Queue pairs with Social Batch Drafting. Drafting produces the approved batch; Queue ships it as scheduled posts. The two work as a flywheel. The Sovereign Life Playbook is the upstream design frame for which work is worth distributing in the first place.',
      ctaHref: 'https://sidequesthq.co/products/sovereign-life-playbook',
      ctaLabel: 'See the Sovereign Life Playbook',
    },
  },
  {
    slug: 'grant-researcher',
    type: 'skill',
    title: 'Grant Researcher',
    label: 'Skill',
    version: '1.0',
    updated: '2026-05-03',
    description:
      'Discover grants whose mission alignment, eligibility and deadline runway fit an operator profile. Two modes: Discovery sweeps wide and ranks by fit; Fit Deep-Dive runs a yes/no memo on one opportunity. Pairs with Grant Manager.',
    tags: ['grants', 'research', 'funding', 'nonprofit', 'discovery'],
    capsule:
      'Grant Researcher is a skill for finding grants whose priorities already match an operator\'s actual work. The profile is the spine: mission, org type, geography, focus areas, prior grant history, ask-size range, capacity, eligibility constraints. Two modes. Discovery sweeps wide across federal, foundation, state and local sources, then ranks the top 10 by fit score. Fit Deep-Dive analyzes a single opportunity for a fast yes/no memo. Pairs with Grant Manager for the lifecycle from intake forward.',
    installable: {
      marketplaceId: 'grant-researcher',
      cursorMdc: true,
    },
    definition:
      'Grant Researcher takes an operator profile and a cycle window and produces a ranked list of grants whose mission, eligibility, deadline runway, ask-size, funder track record and capacity match the operator\'s actual work. The default source mix queries Grants.gov via the public search2 endpoint (federal opportunities, no auth), a configured web search engine (foundation, state, local, corporate, RFP feeds) and ProPublica Nonprofit Explorer (peer organizations\' 990 filings as funder discovery). Optional paid databases (Foundation Directory Online, Instrumentl, GrantStation) layer in when the operator subscribes. Fit scoring runs a six-component rubric (mission alignment, eligibility as gating, deadline runway, ask-size, funder track record, capacity). Disqualifiers are gates not warnings: missing eligibility, mismatched ask-size, scope distortion that would bend the work to fit the funder, missing SAM.gov registration for federal applications. The skill\'s highest-leverage function is fast disqualification, helping the operator say no quickly to poor-fit opportunities so writing capacity goes to high-fit ones.',
    howItWorks: [
      {
        heading: 'Profile as the spine, fit score as the ranking',
        paragraphs: [
          'The operator profile is the spine of every fit decision downstream. Required fields: mission, org type (501c3, LLC, individual, fiscally sponsored, public agency), primary geography, focus areas, prior grant history, ask-size range, current capacity, eligibility constraints (citizenship, certifications, fiscal sponsorship status, indirect cost rate). The reference format is markdown with frontmatter for structured fields and a prose body for nuance. Without the profile, fit scoring has no inputs; the skill halts at Step 1.',
          'Fit scoring runs a six-component rubric: mission alignment (0-30), eligibility as gating (0-25), deadline runway (0-15), ask-size fit (0-10), funder track record (0-10), capacity match (0-10). Disqualifiers act as filters not penalties: a missing eligibility requirement, an ask-size well outside funder norms, a deadline runway too short for a competitive proposal, a federal opportunity without active SAM.gov registration. The skill\'s job is fast disqualification first, ranked recommendation second. The operator\'s writing capacity gets protected before the funnel expands.',
        ],
      },
      {
        heading: 'Discovery versus Fit Deep-Dive',
        paragraphs: [
          'Discovery mode is the cold-start sweep. It queries the configured sources within a cycle window, scores each opportunity, surfaces a top-10 ranked list and below it a disqualified-with-reasons block so the operator can see what was filtered out. Best for new operators entering a funding landscape, established practitioners running quarterly landscape refreshes or a domain shift requiring a fresh source mix.',
          'Fit Deep-Dive mode runs against one named opportunity. The output is a single memo covering eligibility analysis, mission alignment, ask-size and capacity, deadline and effort estimate, funder track record from public records, three risk factors and a recommended next move with reasoning. Best for an experienced practitioner who already has a known universe and wants a fast yes/no on a specific RFP, or a board ask for a fit memo before committing capacity.',
        ],
      },
    ],
    useCases: [
      {
        title: 'Quarterly grant landscape refresh for an established nonprofit',
        body:
          'A 501c3 with five years of grant history wants to surface adjacent funders before allocating Q3 writing capacity. Discovery mode sweeps Grants.gov, web search and the operator\'s configured paid databases against the 12-month cycle window. The top 10 ranked opportunities arrive with fit scores, why-it-fits bullets and suggested next moves. The disqualified-with-reasons block surfaces where filters might be over-aggressive.',
      },
      {
        title: 'Fast yes/no on a specific federal RFP',
        body:
          'A program officer recommends a federal opportunity. The operator wants a fit decision before committing writing capacity. Fit Deep-Dive mode runs against the named opportunity, produces a single memo with eligibility analysis (including SAM.gov registration check), mission alignment, ask-size analysis, deadline runway and three risk factors. The memo lands in under an hour; the operator decides in minutes.',
      },
      {
        title: 'New nonprofit entering the funding landscape',
        body:
          'A newly-incorporated 501c3 wants to see what is out there for their domain. Discovery mode sweeps wide. The disqualifier block teaches the operator which kinds of opportunities to filter against (eligibility mismatches, federal opportunities requiring SAM.gov registration the operator hasn\'t completed, ask-sizes well outside the operator\'s capacity). The first run is partly a calibration exercise; the second run, weeks later, is materially more efficient.',
      },
      {
        title: 'Funder relationship discovery via peer 990s',
        body:
          'An experienced practitioner wants to find foundations that fund peer organizations. The skill queries ProPublica Nonprofit Explorer for the operator\'s named peers, extracts their funder lists from 990 filings and surfaces funders that appear across multiple peers. The output ranks by frequency-of-funding and ask-size match. Warm-relationship pipelines convert at materially higher rates than cold discovery; this is how the warm pipeline gets seeded.',
      },
      {
        title: 'Quarterly board memo on the funding landscape',
        body:
          'A board asks "what is out there for our work?" before the next planning meeting. Discovery mode produces the ranked list. The operator pairs it with a brief board memo summarizing the top 3-5 opportunities, the disqualified opportunities worth surfacing as not-yet-fit-but-watching and any structural shifts in the funder landscape (new program launches, board changes at named funders, geography expansions).',
      },
    ],
    faq: [
      {
        q: 'Why a skill instead of just searching Grants.gov directly?',
        a:
          'Grants.gov gives raw opportunities; the skill gives ranked fit. The profile-load gate, the six-component scoring rubric and the disqualifier filter are what convert "100 opportunities returned" into "5 to 8 worth writing." Searching directly is the cheap part; the skill\'s contribution is the structural discipline that protects writing capacity.',
      },
      {
        q: 'Do I need a paid database subscription?',
        a:
          'No. The default source mix runs on free public data: Grants.gov for federal, web search for foundation discovery, ProPublica Nonprofit Explorer for 990 lookups. Foundation Directory Online and Instrumentl layer in if the operator subscribes; many public libraries offer free FDO access. The skill works either way; depth scales with the source mix.',
      },
      {
        q: 'How does the sovereignty gate work?',
        a:
          'The disqualifier list includes a gate question: would the operator do this work without this grant? If the answer is no, the skill surfaces the tension explicitly rather than scoring the opportunity. Grants compound when they fund work that was going to happen anyway. They become extractive when the program exists only because the grant exists.',
      },
      {
        q: 'What if I already know my universe of funders?',
        a:
          'Run Fit Deep-Dive mode against specific opportunities rather than Discovery sweeps. The skill\'s structural value applies equally to known opportunities: eligibility analysis, ask-size fit, deadline runway, funder track record from 990 records. Experienced practitioners often run Fit Deep-Dive most of the time and Discovery quarterly to surface adjacent funders.',
      },
      {
        q: 'Can this skill submit applications?',
        a:
          'No. Researcher discovers and analyzes; it never auto-submits. Submission lives in the paired Grant Manager skill, where the operator confirms the package before any submission action. The boundary protects the operator from auto-submitting a proposal whose final pass they didn\'t personally review.',
      },
    ],
    relatedSlugs: ['grant-manager', 'social-batch-drafting', 'plan-challenger', 'pending-plan-implementation'],
    softHook: {
      body:
        'Grant Researcher pairs with Grant Manager. Researcher discovers and shortlists; Manager runs the lifecycle from intake forward. The two work as a flywheel. The Sovereign Life Playbook is the upstream design frame for whether a given funded work direction belongs in the operator\'s longer arc in the first place.',
      ctaHref: 'https://sidequesthq.co/products/sovereign-life-playbook',
      ctaLabel: 'See the Sovereign Life Playbook',
    },
  },
  {
    slug: 'grant-manager',
    type: 'skill',
    title: 'Grant Manager',
    label: 'Skill',
    version: '1.0',
    updated: '2026-05-03',
    description:
      'Manage the full grant lifecycle on a chosen opportunity. LOI drafting, full proposal authoring, budget assistance, submission portal handling, post-award reporting and funder stewardship. Phase-routed. Pairs with Grant Researcher.',
    tags: ['grants', 'management', 'proposals', 'loi', 'stewardship', 'nonprofit'],
    capsule:
      'Grant Manager is a skill for shepherding a chosen opportunity through the full grant lifecycle. Five phases: LOI, proposal, submission, post-award reporting, stewardship. The skill holds per-opportunity state across phases, pulls from a reusable boilerplate library and surfaces every deadline as a hard halt in the operator\'s capture system. The output is phase-specific deliverables and a per-opportunity tracking file. Pairs with Grant Researcher; the boundary is firm at intake.',
    installable: {
      marketplaceId: 'grant-manager',
      cursorMdc: true,
    },
    definition:
      'Grant Manager routes by phase. LOI phase produces a 1 to 2 page letter using standard sections (organization, need, project summary, ask, alignment) with boilerplate pulled where applicable. Proposal phase builds the section outline against the funder\'s required structure (cover sheet, executive summary, statement of need, project description, methods, logic model or theory of change, evaluation plan, organizational capacity, key personnel, budget and budget narrative, sustainability plan, letters of support, appendices), drafts section by section with surface-decision-points to the operator and runs a coherence pass across sections so logic models match evaluation plans and budgets match project descriptions. Submission phase builds a checklist as the gate, pre-flights every required upload and form field, then surfaces operator-only steps the skill can\'t perform (portal login, final submission button, e-signatures). Post-award phase pushes every reporting deadline into the capture system and runs report-drafting flows when deadlines approach. Stewardship phase tracks funder relationships across cycles. Federal compliance flows from 2 CFR 200; the skill surfaces the relevant subparts at proposal and post-award phases.',
    howItWorks: [
      {
        heading: 'Phase routing as the discipline',
        paragraphs: [
          'The skill routes by phase. LOI, proposal, submission, post-award, stewardship. Each phase has its own flow with its own gates. The phase parameter is required at intake; the skill halts if it\'s missing. This structural separation is what allows the operator to resume work cleanly across sessions: the per-opportunity tracking file captures phase status, the boilerplate library persists across opportunities and the funder-relationship file persists across cycles.',
          'Lead-time math is calibrated into each phase. Working backward from a proposal deadline: 1 to 2 weeks for final assembly, 4 to 6 weeks for writing, 2 to 4 weeks for internal review, plus 2 to 4 weeks for SAM.gov registration if federal and not active. A federal proposal needs 9 to 16 weeks of runway; a foundation proposal runs 6 to 12 weeks. The skill surfaces the math at LOI and proposal phases so the operator knows whether the deadline runway is structurally writable.',
        ],
      },
      {
        heading: 'Boilerplate as leverage',
        paragraphs: [
          'The reusable boilerplate library is the operator\'s leverage point. Org background, mission statement, theory of change, evaluation framework, budget template, key personnel bios, IRS determination letter, audited financials summary, board list. Updated annually or on material change. The skill pulls boilerplate where applicable rather than re-inventing project-specific sections from scratch each cycle.',
          'The most useful boilerplate is the operator\'s own past wins. Prior funded proposals carry the language patterns that already worked with funders in the operator\'s ecosystem; pulling from them at proposal phase compresses drafting time and preserves voice consistency across applications. The skill reads the prior-wins archive when configured and surfaces the most-applicable prior proposals as drafting reference.',
        ],
      },
    ],
    useCases: [
      {
        title: 'LOI for an invited foundation opportunity',
        body:
          'A program officer invites an LOI. The skill reads the funder\'s LOI guidelines (or applies a standard 1 to 2 page structure if guidelines are absent), pulls organizational background and mission language verbatim from boilerplate and drafts the five standard sections. The operator reviews, edits and submits. The per-opportunity tracking file captures the LOI submission timestamp.',
      },
      {
        title: 'Federal full proposal with SAM.gov check',
        body:
          'A federal opportunity advances to full-proposal phase. The skill confirms SAM.gov registration is active and the UEI matches the operator profile before any drafting begins. If registration is inactive or the runway is tight, the skill flags the prerequisite as a hard halt. Proposal drafting then runs section by section with logic-model and evaluation plan coherence pass, surfaces decision points to the operator and saves drafts to the per-opportunity folder.',
      },
      {
        title: 'Submission package pre-flight',
        body:
          'A proposal advances to submission. The skill builds the checklist from the funder\'s portal documentation (Grants.gov, Submittable, Foundant or bespoke), pre-flights every required upload, character-count limit and form field. Halts on any missing item. After operator confirms submission, captures the confirmation number and submission timestamp.',
      },
      {
        title: 'Post-award reporting deadline cascade',
        body:
          'An award lands. The skill reads the grant agreement, surfaces every reporting deadline (interim, annual, financial) and pushes them into the operator\'s capture system. When a deadline approaches, the skill runs the report-drafting flow against the project\'s progress data structured to the funder\'s report format. For multi-year awards, year-over-year metrics get tracked so each annual report shows progression.',
      },
      {
        title: 'Stewardship between cycles',
        body:
          'A grant cycle closes. The skill surfaces stewardship moves: thank-you note within 48 hours, mid-year impact updates unprompted, invitations to events the funder might value, congratulations on funder milestones. The funder-relationship file updates after every touchpoint. Stewardship is what makes warm-relationship pipelines convert at materially higher rates than cold discovery; the skill protects the cadence the operator might otherwise drop.',
      },
    ],
    faq: [
      {
        q: 'Why route by phase instead of one continuous flow?',
        a:
          'Phase routing matches how grant work actually happens. LOI happens months before proposal. Submission happens weeks after proposal. Post-award reporting happens months after submission. Stewardship runs continuously. Treating them as one continuous flow forces the operator to re-load context on every resumed session; phase routing lets the skill pick up exactly where the previous session left off.',
      },
      {
        q: 'How does the boilerplate library work?',
        a:
          'The operator maintains a directory of reusable artifacts: organizational background, mission statement, theory of change, evaluation framework, budget template, key personnel bios, financial summaries, board list. The skill reads from it during LOI and proposal phases, pulls applicable sections verbatim and stops the operator from re-inventing the same sections cycle after cycle. Updated annually or on material change.',
      },
      {
        q: 'Does this skill auto-submit?',
        a:
          'No. The submission phase prepares the package and pre-flights every required item; the operator confirms and submits. The skill captures the confirmation number after the operator confirms submission, never before. The boundary protects the operator from auto-submitting a proposal whose final review they didn\'t personally complete.',
      },
      {
        q: 'How does this handle federal compliance?',
        a:
          '2 CFR 200 (Uniform Guidance) governs federal grant compliance. The skill surfaces the relevant subparts at proposal phase (indirect cost rates, allowable costs, evaluation requirements) and post-award phase (draws against approved budgets, time-and-effort reporting, closeout requirements). Compliance interpretation is the operator\'s call; the skill\'s job is to surface what to read and when.',
      },
      {
        q: 'What if the funder uses a portal the skill doesn\'t recognize?',
        a:
          'The skill works from the funder\'s portal documentation rather than a hard-coded portal list. Grants.gov, Submittable, SurveyMonkey Apply (Fluid Review), Foundant and bespoke portals are all common; each has quirks. The pre-flight checklist is built from whatever the portal documentation surfaces. Email submission gets handled the same way: build the package, pre-flight, halt for operator review.',
      },
    ],
    relatedSlugs: ['grant-researcher', 'plan-challenger', 'pending-plan-implementation'],
    softHook: {
      body:
        'Grant Manager pairs with Grant Researcher. Researcher discovers and shortlists; Manager runs the lifecycle from intake forward. The two work as a flywheel. The Sovereign Life Playbook is the upstream design frame for whether a given funded work direction belongs in the operator\'s longer arc in the first place.',
      ctaHref: 'https://sidequesthq.co/products/sovereign-life-playbook',
      ctaLabel: 'See the Sovereign Life Playbook',
    },
  },
  {
    slug: 'email-triage',
    type: 'skill',
    title: 'Email Triage',
    label: 'Skill',
    version: '1.0',
    updated: '2026-05-03',
    description:
      'Sort a service-business inbox into seven named buckets, draft replies for repeating scenarios and surface every action item so nothing gets missed.',
    tags: ['email', 'triage', 'inbox', 'solopreneur', 'service-business', 'admin'],
    capsule:
      'Email Triage is a skill for moving through a service-business inbox without losing an hour to it. Seven named buckets, draft replies for the patterns you send every week and a structured action-item list pulled from every non-noise thread. Twelve minutes, not forty-five.',
    installable: {
      marketplaceId: 'email-triage',
      cursorMdc: true,
    },
    definition:
      'Email Triage helps a service-business solopreneur process an inbox in a fixed, predictable window. Every message routes to one of seven named buckets (New Job Inquiry, Active Job: Client, Scheduling, Invoices and Payments, Vendor and Supplier, Admin and Compliance, Noise). Draft replies generate automatically for repeating scenarios. Action items surface from every non-Noise thread so buried asks do not fall through. The skill is a starting point: the operator\'s bucket names, reply tone and follow-up timing make it theirs.',
    howItWorks: [
      {
        heading: 'Seven buckets and the 4 D\'s',
        paragraphs: [
          'Every message lands in exactly one bucket based on sender, subject line, keywords and thread context. The seven default buckets fit a general service-business operator and are fully renameable. A tree trimmer might rename Vendor and Supplier to Equipment and Crews; a property manager might split New Job Inquiry into New Residential and Property Manager. The routing rules per bucket (sender domains, subject keywords, from-address patterns) are the operator\'s first customization. Budget 15 to 30 minutes with a real inbox batch before first use.',
          'The 4 D\'s apply at the bucket level: Do (needs action today), Defer (needs action, not today), Delete (no action needed). The Noise bucket auto-archives on first occurrence with an unsubscribe on repeat senders. Action items extract from every non-Noise thread as a numbered checklist with deadlines or trigger conditions named. Draft replies generate for New Job Inquiry, Invoices and Payments and Active Job: Client threads that match a repeating scenario. The operator reviews and sends; the skill never auto-sends.',
        ],
      },
      {
        heading: 'Handoff payload and pairing',
        paragraphs: [
          'Each triage session closes with a structured handoff payload: categorized message list, action-item checklist, draft replies awaiting send, follow-up triggers queued with timing. The payload feeds directly into Daily Admin Orchestrator or into the operator\'s direct workflow. New inquiries flag for Quote Builder. Payment events flag for Invoice and Payment Tracker.',
          'Three follow-up trigger windows anchor the defaults: new inquiry unanswered at 24 hours, estimate sent with no response at 48 hours (hands off to Quote Builder), invoice unpaid at 7 days. These are calibration anchors, not rules. A competitive-market plumber might set inquiry follow-up to 2 hours; a coaching practice might set it to 72 hours. Adjust after one week of live reps when the actual business rhythm has surfaced.',
        ],
      },
    ],
    useCases: [
      {
        title: 'Monday morning catch-up for a tree trimmer',
        body:
          'Tomas finishes his coffee before the first job site. Eighteen weekend emails run through triage in eleven minutes. Four new inquiries get draft replies ready for his review. Eight noise emails auto-archive. Two past-due invoice follow-ups draft with the client\'s first name already pulled. He leaves the driveway knowing exactly what needs action today.',
      },
      {
        title: 'End-of-day pass for a handyman with active jobs',
        body:
          'A handyman with three jobs running simultaneously gets a dozen client messages through the week. End-of-day triage prioritizes Active Job: Client threads first, flags any unanswered client message past 4 hours as urgent and surfaces tomorrow\'s schedule confirms as a batch. The inbox stops being a second task manager.',
      },
      {
        title: 'Property manager email volume for a landscaping solopreneur',
        body:
          'A landscaping solopreneur manages twelve commercial accounts through a single property management company. Those emails often contain three asks buried in one thread. Email Triage extracts each ask as a separate numbered action item. Nothing gets missed even in the longest threads.',
      },
      {
        title: 'Freelance designer recovering from a project-crunch backlog',
        body:
          'A freelance brand designer surfaces from a two-week intensive with 40 emails in the inbox. A single triage pass buckets every message, drafts replies for the six estimate requests and the three payment follow-ups and identifies the two threads that need her judgment before a reply goes out.',
      },
      {
        title: 'First-time automation setup for a plumbing solopreneur',
        body:
          'A plumber using n8n or Make.com feeds incoming Gmail messages through a classification prompt that pre-sorts the inbox before he opens it. Triage time drops from 45 minutes to under 10. The automation layer runs the categorization; the skill\'s bucket structure and action-item extraction define what the automation produces.',
      },
    ],
    faq: [
      {
        q: 'How do I customize the seven buckets for my business?',
        a: 'Rename the bucket labels directly in your copy of the skill. Set routing rules for each bucket: the sender domains, subject-line keywords or from-address patterns that trigger that bucket. A 15-to-30-minute pass with a real week of email as input is the fastest calibration. Change what does not fit. Add a bucket if a category is missing. The defaults are a starting point, not a prescription.',
      },
      {
        q: 'Does this skill auto-send draft replies?',
        a: 'No. The skill generates draft replies for repeating scenarios and surfaces them for the operator\'s review. The operator sends. Auto-send creates liability and breaks client trust when a draft goes out without a human read. The discipline is that the draft exists at all, not that it sends itself.',
      },
      {
        q: 'How does it work without an automation layer?',
        a: 'Fully. The automation layer (n8n, Make.com, Gmail filters) multiplies the time savings by pre-sorting messages before the operator opens the inbox. Without it, triage runs Steps 2 through 4 message by message in a manual session. The skill works either way. Automation is a multiplier, not a requirement.',
      },
      {
        q: 'What is the right triage rhythm?',
        a: 'Two fixed windows per day: morning and end of workday. On-demand triage throughout the day turns the inbox into a real-time interrupt loop and creates context-switching drag. Real-time interrupts are appropriate only for Active Job: Client threads during an active job. Fixed windows are the discipline.',
      },
      {
        q: 'How does Email Triage connect to the other toolkit skills?',
        a: 'Email Triage is the first step in every Daily Admin Orchestrator run. Its handoff payload routes new inquiries to Quote Builder, payment events to Invoice and Payment Tracker and relationship touchpoints to Customer Follow-Up. Running triage standalone is valid; running it as the first step of the Orchestrator is how the whole toolkit connects.',
      },
    ],
    relatedSlugs: ['daily-admin-orchestrator', 'customer-follow-up', 'quote-builder'],
    softHook: {
      body:
        'Email Triage is one skill in the Solopreneur Admin Toolkit. The full toolkit runs as a daily ritual through the Daily Admin Orchestrator. The design frame for building a service business that runs on systems rather than willpower is the Sovereign Life Playbook.',
      ctaHref: 'https://sidequesthq.co/products/sovereign-life-playbook',
      ctaLabel: 'See the Sovereign Life Playbook',
    },
  },
  {
    slug: 'quote-builder',
    type: 'skill',
    title: 'Quote Builder',
    label: 'Skill',
    version: '1.0',
    updated: '2026-05-03',
    description:
      'Turn a service-business inquiry into a complete quote in email, SMS or markdown-PDF format, with a 48-72h follow-up trigger built in on every run.',
    tags: ['quotes', 'pricing', 'follow-up', 'solopreneur', 'service-business', 'admin'],
    capsule:
      'Quote Builder is a skill for turning a service-business inquiry into a clean, complete quote in the format you need. Email body, SMS summary or markdown-PDF. Four input categories, three output formats, and a 48-72h follow-up trigger on every run. Research shows that single follow-up converts 30-40% of unsigned quotes.',
    installable: {
      marketplaceId: 'quote-builder',
      cursorMdc: true,
    },
    definition:
      'Quote Builder takes an inbound inquiry and produces a complete quote in the operator\'s chosen format. Scope, cost, terms and customer details are the four input categories. Email body, SMS summary and markdown-PDF are the three output formats. After every quote, the skill fires a follow-up trigger payload the operator hands to Customer Follow-Up or Daily Admin Orchestrator: 48 hours default, adjustable to 24 or 72 hours. The follow-up trigger is not optional. Research on service businesses is consistent: 30-40% of unsigned quotes convert with a single follow-up in the 48-72h window. Most solopreneurs do not send it. This is where that changes.',
    howItWorks: [
      {
        heading: 'Four input categories, three output formats',
        paragraphs: [
          'Scope inputs define the work: service type, job address, description specific enough to price, estimated duration, exclusions. Cost inputs build the price: labor rate, hours, materials, markup, subcontractor costs, travel. Terms inputs govern the transaction: quote expiry date (required, 30-day default), deposit requirement (explicit or explicitly waived), payment terms, accepted methods. Customer inputs complete the package: name, email, phone, job-site contact if different.',
          'Three output formats serve different send contexts. Email body is the default for most sends. SMS summary compresses the core figure to under 160 characters for repeat customers who text. Markdown-PDF is the right call for new high-value bids where a polished document signals professionalism. The format is the operator\'s choice per run. After one week of live reps, the operator sets a default for 90% of their sends and overrides per run as needed.',
        ],
      },
      {
        heading: 'The follow-up trigger as load-bearing discipline',
        paragraphs: [
          'After every quote, the skill outputs a follow-up trigger payload containing customer name, contact, quote date, job brief, quote total and timing. The operator hands this to Customer Follow-Up or to Daily Admin Orchestrator. The timing is 48h by default. Adjust to 24h for a hot lead who asked for a quick turnaround, 72h for a higher-value bid where the customer needs room to think.',
          'Quote expiry date is required on every quote. A quote with no expiry is an open-ended liability. The default is 30 days; shorter windows apply for time-sensitive materials, peak-season pricing or coaching programs that fill on a rolling basis. Deposit terms are explicit or explicitly waived: "no deposit required" is a valid terms line; silence is not.',
        ],
      },
    ],
    useCases: [
      {
        title: 'Tree removal quote for a new residential customer',
        body:
          'Tomas receives an inquiry about removing a dead pine and trimming three oaks. Quote Builder gathers scope, cost and terms in under five minutes, produces an email body with the itemized breakdown, fires the 48h follow-up trigger payload for Customer Follow-Up and logs the open quote for Daily Admin Orchestrator to surface on Wednesday morning if it goes unsigned.',
      },
      {
        title: 'Coaching program quote with a shorter expiry window',
        body:
          'A coach quoting a six-session leadership program sets a 14-day expiry because her calendar fills on a rolling basis and a 30-day window would create scheduling conflicts. Quote Builder produces the email body with the deposit, session count and payment terms stated explicitly. The follow-up fires at 48h.',
      },
      {
        title: 'Repeat customer SMS quote for a routine job',
        body:
          'A handyman quotes a repeat customer who always texts. Quote Builder produces the SMS summary (service plus total plus expiry plus one action line) under 160 characters, with a second message pointing to the full terms by email. The customer confirms in two minutes.',
      },
      {
        title: 'High-value bid for a property management company',
        body:
          'A landscaping solopreneur quotes a commercial contract that will go to a property manager\'s board for approval. Quote Builder produces the markdown-PDF format, which the solopreneur exports via Obsidian and emails as a professional PDF attachment. The follow-up timing extends to 72h given the board review cycle.',
      },
      {
        title: 'Brand identity quote for a freelance designer',
        body:
          'A freelance designer quotes a full brand identity project: logo, brand guide and web assets as phase-scoped deliverables with revision rounds named and personality assessments explicitly excluded. Quote Builder produces the email body, shows the math for each phase and fires the follow-up trigger. The designer stops sending "just following up" emails from scratch every time.',
      },
    ],
    faq: [
      {
        q: 'Why is the follow-up trigger not optional?',
        a: 'Service-business research is consistent: 30-40% of unsigned quotes convert with a single follow-up sent 48-72 hours after the quote. Most solopreneurs do not send it because there is no system doing the remembering. The trigger fires on every quote, every time. The only tuning is timing. Whether it fires is not a decision.',
      },
      {
        q: 'Can I lock one format as the default?',
        a: 'Yes. After a week of live reps you will know which format covers 90% of your sends. Set it as the default in the prompt you use to invoke this skill. Override per run as needed. Email body is the most common default; SMS suits repeat customers you already text; markdown-PDF is for new high-value bids.',
      },
      {
        q: 'What if my service type does not fit the default input fields?',
        a: 'Edit the scope-inputs block directly. Tree trimmers add tree count and access notes. Designers swap labor hours for scope phases and revision rounds. Coaches replace hours with session count. The four input categories (scope, cost, terms, customer) hold for every service type; the specific fields within scope are yours to shape. Budget 20-30 minutes with one recent quote in hand.',
      },
      {
        q: 'Does Quote Builder submit or send the quote?',
        a: 'No. The skill produces the quote in the chosen format and fires the follow-up trigger payload. The operator reviews and sends. The output is designed to make that step take under two minutes, not to skip it.',
      },
      {
        q: 'How does Quote Builder connect to the rest of the toolkit?',
        a: 'Email Triage is often where a quote request surfaces first. When an accepted quote moves to billing, Invoice and Payment Tracker picks up the line items. Customer Follow-Up receives the 48-72h follow-up trigger and runs the relationship cadence from there. Daily Admin Orchestrator closes the sequence with a follow-up check on unsigned quotes each morning.',
      },
    ],
    relatedSlugs: ['daily-admin-orchestrator', 'invoice-payment-tracker', 'customer-follow-up'],
    softHook: {
      body:
        'Quote Builder is one skill in the Solopreneur Admin Toolkit. The full toolkit runs as a daily ritual through the Daily Admin Orchestrator. The design frame for a service business that compounds on systems rather than memory is the Sovereign Life Playbook.',
      ctaHref: 'https://sidequesthq.co/products/sovereign-life-playbook',
      ctaLabel: 'See the Sovereign Life Playbook',
    },
  },
  {
    slug: 'invoice-payment-tracker',
    type: 'skill',
    title: 'Invoice & Payment Tracker',
    label: 'Skill',
    version: '1.0',
    updated: '2026-05-03',
    description:
      'Generate invoices and maintain a paid/unpaid ledger for every job. Same-day invoicing on job close is the load-bearing discipline. Pairs with Quote Builder and Daily Admin Orchestrator.',
    tags: ['invoicing', 'payments', 'billing', 'cash-flow', 'solopreneur', 'service-business', 'admin'],
    capsule:
      'Invoice and Payment Tracker is a skill for generating a complete invoice the moment a job closes and maintaining a running paid/unpaid ledger. Four platform paths: Wave, FreshBooks, generic markdown-PDF or paste-into-other-tool. Same-day invoicing on job close is the load-bearing discipline. A delayed invoice is a cash-flow leak with no upside.',
    installable: {
      marketplaceId: 'invoice-payment-tracker',
      cursorMdc: true,
    },
    definition:
      'Invoice and Payment Tracker generates a complete, accurate invoice the moment a job closes and maintains a running paid/unpaid ledger. First-run setup routes the operator to one of four platform paths: Wave (free tier), FreshBooks (paid), generic markdown-PDF or paste-into-other-tool. Same-day invoicing on job close is the load-bearing behavior the skill enforces on every run. A one-week delay on three $500 jobs is $1,500 of float absorbed by the business for no reason. Overdue invoices hand off to Customer Follow-Up for the reminder sequence; the boundary is firm. The tracker, not the inbox, is where overdue accounts live.',
    howItWorks: [
      {
        heading: 'Platform routing and same-day discipline',
        paragraphs: [
          'First-run setup surfaces one routing question: Wave, FreshBooks, generic markdown-PDF or paste-into-other-tool. The answer determines which template loads, which field labels apply and how the tracking row gets written. Subsequent runs skip the question and load the matching branch. When a Quote Builder output is available, line items, labor rate, materials and terms flow in without re-entry. The invoice is the confirmed quote with a due date attached.',
          'Same-day invoicing on job close is enforced at Step 4 of every run. If the job closed today, the invoice goes out today. Not at end of week. Not when the next batch is ready. Today. If the operator indicates a preference to batch or delay, the skill surfaces the cost directly. The discipline is the skill\'s highest-leverage contribution to solopreneur cash flow.',
        ],
      },
      {
        heading: 'Overdue check and handoff',
        paragraphs: [
          'Every run scans the payment tracker for rows where status is unpaid and the due date has passed. Overdue invoices surface with client, amount, days outstanding and the recommended action per the overdue ladder: reminder message at due date, phone-call prompt at plus 3 days, final notice at plus 7 days. The actual message drafting and touchpoint scheduling belong to Customer Follow-Up. The boundary is firm: this skill generates and tracks; Customer Follow-Up communicates.',
          'Generic-path operators track paid/unpaid in a local markdown table at invoices/payment-tracker.md. Platform-coupled operators (Wave, FreshBooks) rely on the platform\'s native status and log a backup entry in a lightweight sent log. The tracking surface is the operator\'s choice; the structural discipline (invoice number, client, amount, due date, status, paid date) holds across all surfaces.',
        ],
      },
    ],
    useCases: [
      {
        title: 'Same-day invoice on job close for a tree trimmer',
        body:
          'Tomas finishes a dead-limb removal at 4:30 PM. He opens Invoice and Payment Tracker on his phone, pulls the inputs from his Quote Builder output, confirms the markdown-PDF path and has an invoice in Sandra Park\'s inbox before he is off the property. Net 7. $372.50. The tracker row appends. He does not carry it to Friday.',
      },
      {
        title: 'Weekly overdue sweep during a Friday morning review',
        body:
          'Daily Admin Orchestrator surfaces three overdue invoices during the Friday weekly review. Two are past 7 days. Invoice and Payment Tracker flags both for a phone call, not another email, and generates the handoff notes for Customer Follow-Up. The 30-day receivables total surfaces as a single number. No spreadsheet needed.',
      },
      {
        title: 'FreshBooks path for a freelance designer with complex tax handling',
        body:
          'A Texas-based freelance designer uses FreshBooks and charges 8.25% sales tax on consulting services. Invoice and Payment Tracker routes to the FreshBooks branch, applies the correct tax rate per her configured terms, reminds her to enable the online payment link before sending and logs the sent entry. Each invoice takes under three minutes.',
      },
      {
        title: 'Markdown-PDF path for a coaching practice',
        body:
          'A coach without a dedicated billing platform uses the generic markdown-PDF path. Invoice and Payment Tracker produces a complete markdown invoice at invoices/YYYY-MM-DD-client-slug-number.md, which she exports to PDF via Obsidian and emails directly. Net 14 terms. Deposit already collected at booking deducted from the total due.',
      },
      {
        title: 'Morning briefing invoice trigger from Email Triage',
        body:
          'Daily Admin Orchestrator surfaces a completed-job email from triage that has not yet been invoiced. Invoice and Payment Tracker picks up the trigger and prompts for the inputs before the morning briefing closes. The job does not leave the briefing without an invoice issued or an explicit practitioner decision to defer.',
      },
    ],
    faq: [
      {
        q: 'Why is same-day invoicing the load-bearing behavior?',
        a: 'Delayed invoicing is the single highest-leverage failure point in solopreneur cash flow. A one-week delay on a week of completed jobs is a week of float absorbed for no reason. The invoice is the final act of the job. A job is not done until the invoice is sent. The skill treats this as a hard constraint, not a soft recommendation.',
      },
      {
        q: 'Does this skill handle overdue follow-up messages?',
        a: 'No. Invoice and Payment Tracker identifies overdue invoices and generates the handoff trigger. Customer Follow-Up drafts and schedules the actual messages. The boundary is firm. Having one skill track status and another manage client communication keeps each skill clean and prevents duplicate outreach.',
      },
      {
        q: 'What if I switch billing platforms?',
        a: 'Re-run the first-run setup in Step 1. Pick the new platform. The invoice template content (labor rate descriptions, payment terms, late-fee language, tax handling) carries over; only the field labels and output format shift to match the new platform. No other steps change.',
      },
      {
        q: 'Do I need to subscribe to Wave or FreshBooks?',
        a: 'No. The generic markdown-PDF path requires no subscription. You produce a markdown invoice file and export to PDF via any tool you already have (Obsidian, Pandoc, VS Code, Typora). The paste-into-other-tool path requires no platform at all. Platform paths (Wave, FreshBooks) are options for operators who already use those tools.',
      },
      {
        q: 'How does this skill connect to Quote Builder?',
        a: 'When a Quote Builder output is available, line items, labor rate, materials and terms flow into the invoice without re-entry. The invoice is the confirmed quote with a due date attached. No double-entry. If the quote was built in Quote Builder, the invoice takes under two minutes to generate.',
      },
    ],
    relatedSlugs: ['daily-admin-orchestrator', 'quote-builder', 'customer-follow-up'],
    softHook: {
      body:
        'Invoice and Payment Tracker is one skill in the Solopreneur Admin Toolkit. The full toolkit runs as a daily ritual through the Daily Admin Orchestrator. The design frame for a service business that runs on systems rather than end-of-week catch-up is the Sovereign Life Playbook.',
      ctaHref: 'https://sidequesthq.co/products/sovereign-life-playbook',
      ctaLabel: 'See the Sovereign Life Playbook',
    },
  },
  {
    slug: 'customer-follow-up',
    type: 'skill',
    title: 'Customer Follow-Up',
    label: 'Skill',
    version: '1.0',
    updated: '2026-05-03',
    description:
      'Run a four-touchpoint post-job relationship cadence: thank-you at 24-48h, referral ask at 14d, maintenance check-in at 90d, re-engagement at 180d. CRM-lite for solo service businesses up to 50 customers.',
    tags: ['follow-up', 'crm', 'referrals', 'relationships', 'solopreneur', 'service-business', 'admin'],
    capsule:
      'Customer Follow-Up is a skill for building a relationship cadence that keeps customers warm between jobs, turns satisfied customers into referral sources and brings dormant customers back before they forget you exist. Four touchpoints, one customer note per person, a single Dataview query that surfaces who is due today. No separate reminder system needed.',
    installable: {
      marketplaceId: 'customer-follow-up',
      cursorMdc: true,
    },
    definition:
      'Customer Follow-Up runs a four-touchpoint post-job cadence anchored by a single customer note per person in the operator\'s vault. Four touchpoints advance in sequence: thank-you at 24-48 hours from job close, referral ask at 14 days, maintenance check-in at 90 days, re-engagement at 180 days. The next_followup_date field in each note\'s YAML frontmatter is the engine: Daily Admin Orchestrator queries it each morning to surface who is due today. The referral ask at 14 days is the load-bearing touchpoint. Service-business research is clear: it outperforms ad spend at this budget tier, most solopreneurs skip it and the window is exactly 14 days. The skill is designed so none of that gets skipped by accident.',
    howItWorks: [
      {
        heading: 'The customer note as second-brain CRM',
        paragraphs: [
          'One markdown file per customer at Customers/<Customer-Name>.md. The YAML frontmatter holds structured data: name, contact, job type, last service date, next followup date, referral status and notes. The prose body captures the customer as a person: what they mentioned in passing, what kind of decision-maker they are, details that make the next interaction feel like a relationship rather than a transaction. The YAML is the query surface. The prose body is the second brain.',
          'After every job close, three things happen: last_service_date updates, next_followup_date sets to the 24-48h window and the new job logs in the note body. After each touchpoint, next_followup_date advances to the next interval and the touchpoint logs with a one-line summary. The touchpoint log is the conversation history that makes every future call or visit feel like a continuation.',
        ],
      },
      {
        heading: 'The referral ask at 14 days',
        paragraphs: [
          'Fourteen days is the window when customer satisfaction is at its peak. Same-day referral asks feel rushed. Ninety-day asks are too late. One sentence, specific, frictionless. Name the service. Give a clear action. Keep it shorter than a paragraph. The default template below is a starting point; the operator edits Seam 3 after one cycle of live reps to match their actual voice.',
          'Referral status tracks through four values in the frontmatter: not-asked, asked, referred, converted. The Daily Admin Orchestrator queries next_followup_date to surface the ask at the right day. The Dataview query in the operator\'s vault shows every customer with a next_followup_date on or before today, sorted by date. No separate tool. No calendar entry. The system surfaces it.',
        ],
      },
    ],
    useCases: [
      {
        title: 'Full four-touchpoint cycle for a tree trimmer',
        body:
          'Tomas closes a job on April 28. Thank-you goes out April 30. Referral ask fires May 12 at exactly day 14, naming the neighbor mentioned in the original note. The maintenance check-in arrives July 28 three months later with a seasonal hook. The re-engagement arrives October 28 and books a fall inspection. Cadence resets from the new job date. The entire cycle ran on one customer note and zero calendar reminders.',
      },
      {
        title: 'Referral conversion from a word-of-mouth source',
        body:
          'Sarah Chen mentioned the operator\'s name before being asked. The referral ask at day 14 acknowledges that fact in one sentence. She replies within an hour with two more names. Both convert within the month. The note updates to referral_status: converted. One sentence, one personal detail, no pressure.',
      },
      {
        title: 'Maintenance check-in timing for a seasonal HVAC business',
        body:
          'An HVAC solopreneur adjusts the 90-day interval to fire the week before the first hot week of summer rather than on a calendar anchor. Every customer gets a check-in timed to seasonal relevance. The operator edits Seam 1 once; every subsequent cycle runs on the adjusted timing.',
      },
      {
        title: 'Re-engagement message for a coaching practice',
        body:
          'A coach\'s re-engagement runs at 180 days and names the specific program the client completed. Not a vague "checking in" message. A reference to the work done and an invitation to book the next phase. Vague re-engagement gets ignored. Specific re-engagement gets replies.',
      },
      {
        title: 'CRM migration at the 50-customer threshold',
        body:
          'A growing cleaning service hits 50 active customers and decides to migrate to HubSpot Starter. The customer note schema (one file per customer, structured frontmatter) maps cleanly to HubSpot contact records. The migration is a data export. The relationship history in each note\'s prose body carries over into the contact notes field. Nothing is lost.',
      },
    ],
    faq: [
      {
        q: 'Why does the referral ask have to be at exactly 14 days?',
        a: 'Fourteen days is the window when satisfaction is at its peak and the memory of the work is still fresh. A same-day ask feels rushed and transactional. A 90-day ask arrives when the customer has moved on. The 14-day window is consistent across service-business research. Tune it one direction for specific business types, but hold the principle: it is a specific day, not someday.',
      },
      {
        q: 'What if a customer books again before a touchpoint fires?',
        a: 'Reset the cadence from the new last_service_date. Update last_service_date, recalculate next_followup_date to the 24-48h window from the new close date and log the new job in the note body. The customer relationship clock starts fresh from the most recent job.',
      },
      {
        q: 'Does this require Obsidian?',
        a: 'No. Any markdown-based note system with frontmatter support works (Logseq, Roam, plain folders). Any task or calendar tool substitutes for Dataview if you prefer to check dates manually. The structural discipline (one note per customer, next_followup_date as the timer, four touchpoints, referral status tracked) holds across stacks.',
      },
      {
        q: 'When should I migrate to a real CRM?',
        a: 'At 50 active customers or when a second person needs to access and update customer records. HubSpot Starter, Notion and Pipedrive are the natural candidates at that tier. The customer note schema maps cleanly to any of them. Treat the threshold as a migration trigger on your operations calendar, not a future problem.',
      },
      {
        q: 'How does this skill know who is due for outreach today?',
        a: 'The next_followup_date field in each customer note\'s YAML frontmatter is the engine. The Daily Admin Orchestrator queries that field each morning via a Dataview query across the Customers folder. No separate reminder system, no calendar entries, no manual tracking. The field updates after every touchpoint; the Orchestrator reads it every morning.',
      },
    ],
    relatedSlugs: ['daily-admin-orchestrator', 'email-triage', 'invoice-payment-tracker'],
    softHook: {
      body:
        'Customer Follow-Up is one skill in the Solopreneur Admin Toolkit. The full toolkit runs as a daily ritual through the Daily Admin Orchestrator. The design frame for building a service business that compounds on relationships rather than advertising is the Sovereign Life Playbook.',
      ctaHref: 'https://sidequesthq.co/products/sovereign-life-playbook',
      ctaLabel: 'See the Sovereign Life Playbook',
    },
  },
  {
    slug: 'daily-admin-orchestrator',
    type: 'skill',
    title: 'Daily Admin Orchestrator',
    label: 'Skill',
    version: '1.0',
    updated: '2026-05-03',
    description:
      'Run the complete solopreneur admin ritual in one session. Sequences Email Triage, Customer Follow-Up, Invoice and Payment Tracker and Quote Builder in order. Three variants: morning briefing, end-of-day rolldown, Friday weekly review.',
    tags: ['orchestrator', 'admin', 'morning-briefing', 'ritual', 'solopreneur', 'service-business'],
    capsule:
      'Daily Admin Orchestrator is the delegation surface for the Solopreneur Admin Toolkit. It replaces the question "which skill do I start?" with a single ritual that runs all four admin primitives in sequence. Three variants: morning briefing (5-10 min), end-of-day rolldown (5 min), Friday weekly review (45-60 min). Nothing lives only in the practitioner\'s head after this runs.',
    installable: {
      marketplaceId: 'daily-admin-orchestrator',
      cursorMdc: true,
    },
    definition:
      'Daily Admin Orchestrator runs Email Triage, Customer Follow-Up, Invoice and Payment Tracker and Quote Builder in sequence, reads each skill\'s handoff payload and routes action items between skills. Three variants calibrate depth per session: morning briefing skims each primitive for today\'s priorities in 5-10 minutes; end-of-day rolldown issues invoices for completed jobs and queues tomorrow\'s touchpoints in under 5 minutes; Friday weekly review runs every primitive to the bottom of its queue in 45-60 minutes. The Orchestrator holds no data of its own. It reads what the four primitives produce and sequences the reads. The load-bearing benefit is one thing: the practitioner does not decide where to start.',
    howItWorks: [
      {
        heading: 'The four-step sequence',
        paragraphs: [
          'Step 2 runs Email Triage at the depth appropriate for the variant. Morning briefing: sort and surface today\'s action items, flag anything time-sensitive, skip drafts unless requested. End-of-day: triage new messages since morning and close the inbox for the day. Friday weekly: full bucket review including WAITING and READ LATER sweeps. The triage handoff payload routes to the three downstream steps.',
          'Step 3 checks the Customer Follow-Up cadence queue against today\'s date. Any customer with a next_followup_date on or before today surfaces with their touchpoint type. Action items from the triage step merge here to prevent duplicate outreach on the same customer in the same session. Step 4 runs the Invoice and Payment Tracker sweep: overdue invoices, same-session invoicing for jobs that closed since the last run. Step 5 checks the open quote log for unsigned quotes past the 48-72h follow-up window.',
        ],
      },
      {
        heading: 'Daily briefing summary and the three-action list',
        paragraphs: [
          'Step 6 consolidates outputs from Steps 2-5 into a single briefing document: email action items, customer touchpoints due today, invoice status and outstanding quotes. At the bottom: today\'s three actions, ranked by revenue or relationship urgency. The practitioner looks at the list for 45 seconds and knows exactly what to do before leaving the driveway.',
          'The Orchestrator is a sequencer, not a cage. Practitioners who know their email is clear and their invoices are current can invoke any primitive directly without running the full briefing. The Orchestrator\'s value is the sequence. The briefing is orientation, not resolution. If the practitioner finishes the briefing and feels productive without having acted on any of the three priority items, the ritual has inverted. The three actions at the bottom are the work.',
        ],
      },
    ],
    useCases: [
      {
        title: 'Monday morning briefing for a tree trimmer with four jobs scheduled',
        body:
          'Tomas runs the morning briefing at 7:15 AM before the first site. Three emails overnight. Two customer touchpoints due. One overdue invoice needs a phone call. One unsigned quote hit its 72h window. The briefing summary lands in under ten minutes. Three actions at the bottom. He looks at the list for 45 seconds, makes two calls on the way to the first job and sends one message at lunch.',
      },
      {
        title: 'End-of-day rolldown as the primary invoice ritual',
        body:
          'A handyman sets end-of-day rolldown as his primary variant because invoicing avoidance is his real bottleneck, not email overload. The end-of-day variant puts Invoice and Payment Tracker as the primary ritual step. Every job that closed today gets an invoice before he puts the truck in the garage. No batch, no delay.',
      },
      {
        title: 'Friday weekly review as the business health snapshot',
        body:
          'A freelance designer runs the Friday weekly review at 6:30 AM before her first meeting. Full triage sweep, full cadence audit, aged receivables analysis, open quote status decisions. The output saves to admin/weekly-reviews/YYYY-MM-DD-friday.md. She pulls it up Sunday night to orient Monday morning. She skips the step where she stares at the whiteboard trying to remember what was open.',
      },
      {
        title: 'Consolidated outreach for a customer who appears in both cadence queue and email triage',
        body:
          'Sandra is due for a 90-day maintenance check-in and also sent an email this morning. The Orchestrator merges both in Step 3: one outreach message covers the maintenance check-in and replies to the email. Not two separate messages. The Orchestrator prevents duplicate outreach on the same customer in the same session.',
      },
      {
        title: 'Sequence override for a solopreneur whose bottleneck is cash flow',
        body:
          'A plumber whose real problem is delayed invoicing moves Invoice and Payment Tracker to position 2 in the sequence, directly after Email Triage. The Orchestrator\'s default order (Triage, Follow-Up, Invoice, Quote) is a dial, not a rule. Tune the sequence to your actual bottleneck after the first week of reps.',
      },
    ],
    faq: [
      {
        q: 'Do I need all four primitive skills installed to use this?',
        a: 'Yes. The Orchestrator is a sequencer; it delegates to the four primitives rather than re-implementing their logic. All four (Email Triage, Customer Follow-Up, Invoice and Payment Tracker, Quote Builder) need to be loaded in your session. The Orchestrator reads their handoff payloads and routes between them.',
      },
      {
        q: 'What if I only have one thing to deal with today?',
        a: 'Run the relevant primitive directly. The Orchestrator\'s value is the sequence for days when everything is in motion. A practitioner who knows their email is clear and their invoices are current can invoke Quote Builder or Customer Follow-Up directly without running the full briefing. The Orchestrator is not required for every session.',
      },
      {
        q: 'How long does each variant actually take?',
        a: 'Morning briefing: 5-10 minutes. Each primitive runs at shallow depth; the output is a prioritized list, not a full deep dive. End-of-day rolldown: under 5 minutes; the focus is invoice issuance for today\'s jobs and tomorrow\'s queue. Friday weekly: 45-60 minutes when the business has meaningful volume across all four primitives.',
      },
      {
        q: 'Can I change the order of the four steps?',
        a: 'Yes. The default order (Triage, Follow-Up, Invoice, Quote) reflects a specific bottleneck theory: clear inbound before running proactive outreach. If invoicing avoidance is your real problem, move Invoice to position 2. The primitives are independent. The sequence is a dial you tune after your first week of reps.',
      },
      {
        q: 'What does the Friday weekly review produce?',
        a: 'A complete business health snapshot saved to your admin folder: email backlog cleared, full cadence audit across all active customers, aged receivables analysis (0-30d, 31-60d, 60d+), open quote status decisions. Pull it up Sunday night to orient Monday morning. The document is the weekly snapshot of everything open in the business.',
      },
    ],
    relatedSlugs: ['email-triage', 'quote-builder', 'invoice-payment-tracker', 'customer-follow-up'],
    softHook: {
      body:
        'Daily Admin Orchestrator is the entry point for the Solopreneur Admin Toolkit. The four primitives it sequences are Email Triage, Quote Builder, Invoice and Payment Tracker and Customer Follow-Up. The design frame for a service business that runs on systems rather than the practitioner\'s working memory is the Sovereign Life Playbook.',
      ctaHref: 'https://sidequesthq.co/products/sovereign-life-playbook',
      ctaLabel: 'See the Sovereign Life Playbook',
    },
  },
  {
    slug: 'website-builder',
    type: 'skill',
    title: 'Website Builder',
    label: 'Skill',
    version: '1.0',
    updated: '2026-05-04',
    description:
      'Build, refresh or extend a website with Claude Code as the primary build engine. Frame-agnostic by design. AI discoverability and three-state deploy verification built in from the first scaffold.',
    tags: ['website', 'web', 'build', 'deploy', 'discoverability', 'creator'],
    capsule:
      'Website Builder is a skill for producing deploy-ready sites with Claude Code as the primary build engine, a reference stack named and every component substitutable. It enforces brand input load, anti-slop detection, HTML preview before framework build and an AI discoverability checklist as ship gates. The three-state deploy verification is the close.',
    installable: {
      marketplaceId: 'website-builder',
      cursorMdc: true,
    },
    definition:
      'Website Builder takes a brand spec, a page list and a target stack and produces a deploy-ready site with AI discoverability built in from the first scaffold. The skill is frame-agnostic by design: it names Next.js as the reference framework and substitutes every component for operators on different stacks. The build sequence runs in seven steps. Brand input load first, then environment, then scaffold from a filled build prompt template, then HTML design preview before any framework code is written, then design polish on twelve dimensions, then iteration, then the AI layer before deploy. The anti-slop gate fires after scaffold output and before iteration: it checks for typography tells, color tells, layout tells, motion tells and content tells. No code proceeds to production review until the anti-slop scan passes. The AI Discoverability Refresh Audit runs before the deploy seal and catches the hand-authored surfaces (llms.txt, markdown content map, JSON-LD per-page schemas) that drift silently when page content changes. The three-state deploy verification confirms Local, Submitted and Confirmed before any deploy is called complete.',
    howItWorks: [
      {
        heading: 'The build phases as standard discipline',
        paragraphs: [
          'The build sequence runs in seven named steps. Brand input load first: brand voice spec, design system spec, offer architecture and the current build plan all load before a single prompt is written. The build prompt template (included in the skill) is filled with these inputs before opening Claude Code in the site directory. Scaffold output lands in Step 3. Before any framework code from the scaffold is accepted, the anti-slop gate fires: it scans for generic typography tells, arbitrary color choices, copy-paste layout patterns, animation without purpose and placeholder content. Flag every instance. Fix before proceeding.',
          'Step 3.5 is the HTML design preview, a standard step and not optional. Self-contained HTML files with inline styles and real copy (no lorem ipsum) preview design decisions visually before framework code is written. The operator reviews in a browser, picks winners and the locked decisions get written back to the design spec before opening the codebase. Step 3.7 is design polish on twelve dimensions: visual spacing, typography, color contrast, interaction states, micro-interactions, content, icons and images, forms, edge cases, responsiveness, performance and code quality. Step 4 iterates conversationally. Step 5 is the AI layer verification. Step 6 is deploy with three-state confirmation. Step 7 seals the build with a project tracker update and a security section in the site\'s CLAUDE.md.',
        ],
      },
      {
        heading: 'Discoverability as a ship gate',
        paragraphs: [
          'The AI Discoverability Checklist runs before DNS cutover on new builds and before deploy seal on any page-content change. It covers robots.txt allowlist (no AI blocking), llms.txt content accuracy, JSON-LD per page type (Organization or Person on home, BreadcrumbList on every page, Article and FAQPage where appropriate), heading hierarchy, meta descriptions, Open Graph and Twitter card metadata, clean URL slugs, image alt text, sitemap generation, IndexNow integration and content negotiation. The checklist is the minimum; the AI Discoverability Refresh Audit is the deeper gate for any session that changes page-level copy.',
          'The Content Negotiation Pattern (three files: framework rewrite rule, route handler and content map) serves the same page as HTML to AI agents requesting Accept: text/markdown. The hand-authored content map is the drift surface: when page content changes, the map drifts unless updated. The preferred prevention is data-layer separation. Move page text into page-data.ts so both the page component and the markdown generator import from the same source. The named-export rule and the FAQ dual-surface rule are the two structural guards the skill enforces to prevent runtime crash paths and hidden drift surfaces. Three-state deploy verification (Local, Submitted, Confirmed) is the close. Never stop at Local or Submitted and call it done.',
        ],
      },
    ],
    useCases: [
      {
        title: 'Freelance writer launching a personal site',
        body:
          'A freelance writer wants a personal site with a homepage, an about page and a writing portfolio. Website Builder loads the brand voice doc as the brand input, builds the HTML preview for homepage layout approval before any framework code is written, runs the anti-slop gate on scaffold output and ships the site with llms.txt, robots.txt and JSON-LD structured data. The three-state deploy verification confirms it\'s live before the session closes.',
      },
      {
        title: 'Solo creator rebuilding a portfolio with a refresh sequence',
        body:
          'An existing portfolio site needs a full visual refresh. Website Builder runs the five-engagement refresh sequence: design tokens first, then homepage layout in HTML preview, then interaction layer with live intensity controls, then interior page propagation side-by-side, then framework build and ship. All design decisions are locked in HTML preview before any framework code is touched. The AI Discoverability Refresh Audit runs at step 5 to catch hand-authored surfaces that drifted during the refresh.',
      },
      {
        title: 'Service-business owner shipping a marketing site',
        body:
          'A service-business owner needs a marketing site with a services page, a contact form and a clear primary CTA. Website Builder loads the offer architecture and brand tone as inputs, scaffolds the full site from the build prompt template, runs the anti-slop gate to check that hero copy is affirmative and not negation-framed, and produces a deploy-ready repo with content negotiation and IndexNow integration so the site is findable by AI agents from day one.',
      },
      {
        title: 'Practitioner adding a new page route to an existing site',
        body:
          'An operator wants to add a new speaking page to an existing site. Website Builder activates the New Route Checklist: page.tsx with full metadata, JSON-LD schema appropriate to the page type, content added to page-data.ts, a generate function wired into markdown-content.ts, sitemap.ts updated, llms.txt updated. The AI Discoverability Refresh Audit runs at Tier 4. IndexNow pings after three-state confirmation.',
      },
      {
        title: 'Multi-site operator running a discoverability refresh audit across sibling sites',
        body:
          'An operator running two sibling sites wants to confirm AI-facing surfaces are current after a content update on both. Website Builder runs the AI Discoverability Refresh Audit on each site sequentially: triage routes by pattern, spot-verify markdown endpoints, grep llms.txt for stale offering names, review root metadata and run IndexNow. The cross-site memory pattern captures any finding from Site A that should propagate to Site B without bundling both sites in one session.',
      },
    ],
    faq: [
      {
        q: 'Does this work with frameworks other than Next.js?',
        a:
          'Yes. The skill names Next.js as the reference framework and notes alternatives component by component: Astro, Remix, SvelteKit, Eleventy, Hugo for the framework layer; CSS Modules or vanilla CSS for styling; Netlify, Cloudflare Pages or GitHub Pages for hosting. Swap the Technical Requirements block in the build prompt template to match your stack. The HTML preview pattern, anti-slop gate and discoverability checklist are all framework-agnostic.',
      },
      {
        q: 'What does the AI Discoverability Refresh Audit catch?',
        a:
          'It catches the hand-authored AI-facing surfaces that drift silently when page content changes: the markdown content map (markdown-content.ts), the site-level AI overview (llms.txt), root metadata in layout.tsx and per-page JSON-LD schemas. The sitemap regenerates automatically; these don\'t. The audit tiers the depth by change type. Visual-only changes exit immediately. Copy changes in existing data structures need a spot-check. New structured data and new routes run all steps.',
      },
      {
        q: 'Why HTML preview before the framework build?',
        a:
          'Design decisions made in conversation context get lost when the session closes. HTML previews make decisions visual and tangible: the operator sees options, subtracts from them and locks winners. Locked decisions get written back to the design spec before any framework code is touched. This eliminates the most common rework loop, building something in the framework and then redesigning it because the decision was never properly anchored.',
      },
      {
        q: 'When should I use this skill versus a no-code site builder?',
        a:
          'Use this skill when you want to own the code and the deployment, customize the AI discoverability layer to your audience and build in content negotiation (serving markdown to AI agents from your existing URLs). No-code builders abstract ownership away. This skill keeps the site in your own git repo, on your own hosting account, with a discoverability posture you control. The build takes longer but the output is sovereign.',
      },
      {
        q: 'What is the three-state deploy verification?',
        a:
          'Local, Submitted and Confirmed. Local means the build passes in your development environment. Submitted means the deploy was pushed to your hosting provider and accepted. Confirmed means the live public URL returns the expected content with the correct status code. Never stop at Local or Submitted and call it done. A deployment is not complete until it\'s verified live.',
      },
    ],
    relatedSlugs: ['source-harvest'],
    softHook: {
      body:
        'Website Builder produces the site. The upstream design frame for which sites are worth building, and what they\'re expressions of, is the Sovereign Life Playbook. The Playbook is the architecture behind the artifact. The skill ships the code; the Playbook shapes the intention behind it.',
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
