---
name: pending-plan-implementation
description: Execute an approved plan (or approved subset) using the plan note as the implementation context, breadcrumb record and outcome summary.
status: active
version: 1.2
---

# Pending Plan Implementation Skill

Purpose: Execute an approved plan (or approved subset) using the plan note as the implementation context, breadcrumb record and outcome summary.
Trigger: User selects a plan to implement and grants execution approval for all or part of the plan.
Inputs: Target plan link, approved execution scope, approval boundaries, dependencies/links, desired outcome for this run.
Outputs: Implemented changes (if approved), updated plan note (snapshot + execution log + outcome) and a proposal for status/archival updates if applicable.
Status: active

## Make It Yours

This skill is a starting point, not a finished tool. It assumes a specific plan artifact: a markdown note with frontmatter fields for status, scope and an activity log. Your planning system may live somewhere entirely different.

The core discipline transfers to any format. Read the plan before executing. Confirm scope before touching anything. Log what you did as you do it. Surface proposed status changes for approval rather than writing them unilaterally. That sequence is the bone. The artifact format is the muscle, and muscle is yours to shape.

**If your plans live in Linear, Jira or GitHub Issues.** Replace "read the plan note" in Step 1 with a fetch of the issue or epic. Replace "update the plan note" in Steps 2 and 5 with comments on the issue and field updates on the record. The scope-confirm gate (Step 3) and the execution log (Step 4) translate directly.

**If your plans live in Notion.** The frontmatter fields become database properties. Status advances via property update rather than frontmatter edit. The activity log becomes a Notion comment thread or a child page. The skill's step sequence holds.

**If your plans live in plain markdown without frontmatter.** Drop the frontmatter requirement. Use a `## Status` heading section instead. The read-confirm-execute-log-propose sequence doesn't depend on frontmatter. It depends on reading intent before acting and writing outcomes after.

**Status vocabulary.** The reference status ladder (`proposed`, `approved`, `ready-for-execution`, `implemented`) is one convention. Your system may use different terms. Status advances in one direction. "Not yet approved" blocks execution. The final state captures a breadcrumb with a timestamp and what shipped.

Edit the Steps to name your planning artifact format before first use. The skill is a substrate. You are the operator. Make it yours.

## Pre-Execution Checklist

Run these gates before Step 1. All must pass before execution begins.

1. **Status gate.** If the plan's status is `proposed` or `draft`, stop. Execution is not authorized. Surface the status to the operator and ask what approval is needed before proceeding.
2. **Upstream read-first.** If prior session artifacts exist (notes, logs, prior output documents), read them before touching raw data. Executing against a stale context is the most common source of duplicate or conflicting work. When the run builds its own excerpt of someone's source material (emails, transcripts, conversations), keep the raw pull beside the excerpt. Any cold reader gets the raw.
3. **Re-entry fields (multi-session plans).** For plans spanning two or more sessions, confirm that Current State, Decision Point and Next Move fields are populated. If they are blank, ask the operator to fill them in or surface the last known state from breadcrumbs before continuing.
4. **Tool fitness check.** Verify that any tool, MCP server, API or script the plan depends on is available and authenticated. If a required tool is missing or broken, flag it as a blocker. Do not substitute a workaround silently.
5. **Prospective wiring scan.** Confirm that downstream obligations triggered by this plan (notifications, publishes, status updates, dependent plans) are explicitly encoded in the artifact. If they exist only as informal breadcrumbs, surface them for operator confirmation before starting.
6. **Placeholder scan.** Scan the plan body for TBD, TODO or under-specified steps. Flag each one before executing. A plan with unresolved placeholders may commit you to decisions the operator has not yet made.
7. **Re-scope on entry.** Plans written from audit summaries can carry pre-audit estimates that diverge from current corpus shape. A single pre-edit search pass often reveals factor-of-two variances. Do not plan the edits against numbers older than a week. If the plan cites a count or size estimate, verify it against the live state before proceeding.

## Steps

1. Confirm the target plan and read back plan intent, risk, affected areas and current breadcrumb context.

   Surface the plan's stated goal and its "Distinct from" contrast if one is present. "Building toward X. Distinct from Y." This is the within-session drift detection point. If the plan does not have an explicit contrast, ask the operator to name one before execution begins.
2. Document `Implementation Snapshot (When Executing)` and `Approved Execution Scope (This Run)`. Record the starting commit with `git rev-parse HEAD` in each repo the run will touch. The Step 5 alignment check diffs from it.
3. Confirm exactly what is approved to implement now and what remains out of scope.
4. Execute approved work and log actions in `Implementation Actions (Execution Log)`.

   **Skill Handover Map.** Before executing, scan the plan for a `## Skill Handover Map` section. If present, treat it as canonical phase-by-phase orchestration. For each named phase, invoke the specified skill with the context payload the map provides, and capture output before advancing to the next phase. Plans without a Skill Handover Map execute normally through the steps below.

   **Archival discipline.** When the plan includes a file archival step, never write a new copy and delete the original as two separate operations. Move or rename directly. `rm` commands are for actual deletions only, not for clearing a replaced copy.
5. Update `Evidence / Implementation Refs` and `Implementation Outcome (This Run)`.

   **Plan-alignment check (every run that changed files).** Before writing the Outcome, hand a fresh agent three inputs: the approved scope, the plan's design decisions and the diff since the starting commit recorded in Step 2. Never self-check, because the orchestrator wrote the diff and self-agreement is not verification. The question: does this implementation match the plan that authorized it, and where it deviates, is the deviation a justified improvement or a quiet departure? Fix departures in the run, or list them in the Outcome as open with a done-check. A run that changed no files skips the check and says so in one line.

   **Session Boundary Block.** For multi-session plans, write a structured re-entry anchor at the end of each session's log entry:

   ```
   ### Session Boundary: YYYY-MM-DD
   **Completed this run:** [one sentence]
   **Decision point:** [any approval or gate holding next session]
   **Next move:** [first action next session picks up]
   **Live constraints:** [blockers, dependencies, anything that changed]
   ```

   This block is what the Pre-Execution Checklist Step 3 reads at next-session entry. Keep it current.
6. Propose `implementation_state` and any status/archival changes (approval-gated).
7. **Audit gate.** Plans spanning 3 or more phases get a Phase Audit as the default exit gate before archival. Run two concurrent passes: a checklist pass (does the output match the plan's stated goal and scope?) and a challenger pass (does any finding contradict the plan's assumptions?). Smaller plans get an optional offer in one line ("Audit warranted?"). Do not offer for operational outputs (scripts, logs, sync results, backup records).
   - The audit is a session event. Findings get worked through and acted on in the session.
   - At audit close, ask one question ("Anything worth a long-term note?"). The filter is recurrence. Not whether the finding was surfaced, but whether a future session would benefit from knowing it. If yes, append a single date-stamped entry to `## Refinements` in the audited document. Keep it to the durable insight, not a transcript of the full report. If no, close and move on.
8. Read back the implementation summary and apply approval-gated changes only with explicit consent.

## Quick Entry Tags (Optional, Dataview-Friendly)

- `#field`
- `#ai`
- `#learning`
- `#decision`

## Software Build Protocol

Use this block for plans that involve building or modifying software. Skip it for documentation, governance and content plans.

**Phase 0: Documentation Discovery.** Before planning any implementation that touches an external API, library or tool, find the actual current API reference. Do not plan against assumed method signatures or remembered behavior. A single documentation pass at the start prevents cascading rework.

**Phase 0.5: The idempotency check.** Before starting any unit, check whether its work already shipped and matches the plan. It may have landed in a prior session or on a prior branch. If it matches, mark the unit done and move on. Never silently reimplement. A retry re-inspects, never redoes.

**Evidence Strategy.** Before any edit that changes behavior, choose the proof: an existing failing test, an existing test with a wrong assertion to update, an over-mocked test to strengthen, a new focused test or a deliberate no-test exception recorded with its replacement verification. Never write the test and the implementation in the same step. Watch the test fail for the expected reason first. A test written after the code, to match the code, proves only that the code is the code.

**The two-hop trace.** Before marking any task done, ask what fires when this runs: callbacks, middleware, event handlers, webhooks. Ask whether the tests exercise the real chain or only a mock. Ask whether a failure can leave orphaned state.

**Subagent Reporting Contract.** When dispatching sub-agents for research or implementation phases, require each to return: sources consulted, concrete findings (not conclusions), copy-ready code snippets where relevant, and a confidence note. Reject and re-prompt any sub-agent that returns conclusions without cited sources.

**Worker Dispatch Contract.** When dispatching implementation workers, give each a bounded unit packet: the goal, the definition of done, its one unit's section and the cited excerpts. Never hand a worker the whole plan. Each worker returns changed file paths and verification evidence: what behavior changed, which tests were inspected or added, whether the failure was observed before the fix and any deliberate exception. Those fields cannot be rebuilt from the tree afterward, and a guessed "tests passed" is a fabricated claim. Workers never commit. Your AI interface, as orchestrator, inspects the actual tree, never trusting reported paths alone, and owns all staging and committing.

**Parallel Safety Check.** Before any parallel dispatch, remember that file overlap is necessary and insufficient. Also serialize on contention that no file list shows: shared types, database migrations, generated artifacts, lockfiles and environment singletons such as one dev server, one port, one database or one browser session. Cap concurrency at three to five workers. Over-parallelizing costs more in merge and integration than it saves.

**Per-Phase Verification Before Commit.** Before committing each phase's output, grep for the anti-patterns identified in Phase 0 documentation discovery. Do not advance phases on unverified work. Verification is part of the phase, not an optional close step.

- The commit heuristic: can you write a message describing a complete, valuable change? Commit. Would the message be "WIP" or "partial X"? Wait.

**Simplify at phase boundaries, not per unit.** Early patterns may look duplicated and then intentionally diverge in later units. Wait for two or three units or a natural boundary.

**The durable sink rule.** Any known issue, deferred finding or accepted residual goes into a durable record before the run closes. For code repos that record lives in the repo, not only in the plan log, because the repo is where the next agent will be standing. A defer that produces no durable artifact is data loss.

**Compound before close.** A software build run closes by asking whether it produced a learning worth keeping: a verified non-trivial fix, or a decision worth not relitigating. If yes, write it to your repo's learnings folder, one learning per file, and check it for overlap against existing entries first. A build that banks nothing has spent the effort and kept none of it.

## Planning Mode Rule

- If status is proposed or draft, execution is not authorized.

## External Orientation

This skill acts on your behalf wherever a plan reaches outside your workspace. The status gate blocks any plan that is not yet approved. Workers never commit, and your AI interface inspects the tree and owns all staging and committing. Any publish or deploy step in a plan follows your own confirm-before-ship rule, and status or archival changes stay proposals until you consent.

## Pairs With

**Source Harvest** is the gateway skill for systematic pattern extraction from external repos and tools. Many users adopt Source Harvest first, then layer additional skills like this one on top.

**Plan Challenger** runs an adversarial pre-build pass on the plan before this skill executes. Strong pairing for high-stakes implementations.

If Source Harvest isn't installed yet: [Install Source Harvest via IGOS](https://www.infinitegameos.io/skills/source-harvest).
If Plan Challenger isn't installed yet: [Install Plan Challenger via IGOS](https://www.infinitegameos.io/skills/plan-challenger).

## Model Routing

Dispatch the cheapest model that does the job well. Before each delegated step, ask whether a smaller model would produce equivalent output.

| Work type | Model |
|---|---|
| Mechanical lookups, deterministic commands, structured extraction against a spec | Haiku |
| Multi-step synthesis, drafting, diagnosis, most worker dispatch | Sonnet |
| Architectural judgment, plan design, judgment-dense synthesis | Opus |

Per-step defaults: Pre-Execution Checklist (mechanical field checks) routes to Haiku. Steps 1 and 3 (operator-facing scope reads and confirmations) route to Opus. Steps 2, 4 and 5 (execution and logging) route to Sonnet. The Step 5 plan-alignment check goes to a fresh Sonnet agent, never the orchestrator that wrote the diff. Step 7 audit passes route to Sonnet for checklist and Opus for challenger.

Set the model explicitly on every subagent dispatch. Never silently inherit the top tier.

## Refinements

*(Empty. Populated when execution mistakes occur during sessions.)*

**v1.2.** Added to the Software Build Protocol: the idempotency check, the Evidence Strategy gate, the two-hop trace, the Worker Dispatch Contract, the Parallel Safety Check, the commit heuristic, simplify-at-boundaries, the durable sink rule and compound-before-close. Step 2 now records the starting commit and Step 5 runs a fresh-agent plan-alignment check. Upstream read-first keeps the raw pull beside any excerpt of someone's source material. Added an External Orientation block.
