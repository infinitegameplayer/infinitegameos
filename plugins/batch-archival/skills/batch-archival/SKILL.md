---
name: batch-archival
description: Use when archiving several workspace artifacts at once with per-artifact approval gates before any archive move executes.
status: active
version: 1.0
---

# Batch Archival

> This skill also ships inside the Sovereign Ecosystem template.

Purpose: Move completed work into your archive in batches without losing anything and without moving anything the operator did not approve. The scan proposes. The operator approves. Only then do files move.

Trigger: a batch archival request, a sweep of completed plans or stale notes, or any cleanup that would relocate multiple files to your archive at once.

Inputs:
- Scan criteria (status, tags, age)
- Domain or object-type mapping rules
- Approval preferences
- Optional object-specific readiness checks (for example, a related-note link scan for creative artifacts)

Outputs:
- Approval list grouped by domain or object type
- Readiness audit notes and blockers per item, proposal-only
- Proposed archive moves
- Archive-eligibility candidate list for time-gated material, proposal-only

## The Workflow

1. Scan your active containers for eligible artifacts.
2. Classify by domain or object type.
3. Generate the approval list grouped by domain or object type, workspace-wide, including every active domain when relevant.
4. Run a lightweight readiness audit on proposed items: metadata completeness, links, routing path and any object-specific checks.
5. Obtain explicit approval for the pilot selection and the execution order.
6. Confirm eligible items carry their terminal status (see Status Rules). Archival is a location change; the status stays as it is.
7. Upon approval, move artifacts to the archive.
8. Run your post-archival routine for each artifact (breadcrumbs, index updates, whatever your system wires to an archive event).

## Status Rules

Terminal status is the eligibility signal. A file moves to the archive because its lifecycle ended, not because it looks old.

- Eligible for scan: `status: implemented` for plans, `status: complete` for non-plan artifacts, plus any object-specific terminal status your system defines (for example `retired` for quest-style notes).
- Exclude: `status: draft`, `status: proposed`, `status: approved` and `status: ready-for-execution` unless the operator explicitly approves an exception. Those statuses mean the work is still alive.
- Where an object type distinguishes `completed` from `retired`, preserve the distinction in the metadata even when both land in a shared archive folder. Avoid splitting archive folders by terminal status unless a review workflow explicitly benefits from it.

## Readiness Audit (Lightweight, Recommended)

Before proposing a move, check that the move will land clean:

- Validate the destination path and domain routing before anything changes.
- Confirm object-specific linkage where applicable (example: a creative artifact whose matching strategy note should link back to it).
- For plans that kept a support-files subtree, confirm permanent artifacts have moved to a canonical home, preserved provenance has moved to an archive location and the subtree itself is cleared.

The readiness audit is proposal and prep work only. No moves and no status changes come out of it.

## Time-Gated Material (Proposal-Only)

Some material becomes archive-eligible on a clock rather than a status change: transcripts and session notes after a holding period, for example. Include a proposal-only audit for these. The audit proposes candidates. Nothing moves and no status changes without operator approval.

## Approval

- Early phase requires explicit approval per domain or object-type list. Per-artifact approval is the default posture.
- Run one pilot batch before full activation. Domain-specific pilots are valid (a single artifact class first) before broader workspace-wide runs.
- Automation may be enabled after stable operation, one proven artifact class at a time.

## Constraints

- No moves without explicit approval.
- No status changes without explicit approval.
- The eligibility audit is proposal-only and requires operator approval before anything acts on it.
- Consult-type and planning-only notes stay in place unless explicitly marked complete.

## Model Routing

Dispatch the cheapest model that does the job well. Before each delegated step, ask whether a smaller model would produce equivalent output.

| Work type | Model |
|---|---|
| Status scans, file inventory, metadata reads | Haiku |
| Classification, readiness audit, approval-list drafting | Sonnet |
| Judgment calls on ambiguous lifecycle state | Opus |

Set the model explicitly on every subagent dispatch. Never silently inherit the top tier.

## Pairs With

**Session Closeout** is where archival candidates usually surface. A close that marks a plan implemented queues it for the next batch sweep.

**Pending Plan Implementation** produces the `implemented` plans that this skill eventually carries to the archive.

If Session Closeout isn't installed yet: [Install Session Closeout via Infinite Game OS](https://www.infinitegameos.io/skills/session-closeout).
If Pending Plan Implementation isn't installed yet: [Install Pending Plan Implementation via Infinite Game OS](https://www.infinitegameos.io/skills/pending-plan-implementation).

## Refinements

*(Empty. Populated when execution mistakes occur during sessions.)*
