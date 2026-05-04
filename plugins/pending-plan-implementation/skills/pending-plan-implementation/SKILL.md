---
name: pending-plan-implementation
description: Execute an approved plan (or approved subset) using the plan note as the implementation context, breadcrumb record and outcome summary.
status: active
version: 1.0
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

## Steps

1. Confirm the target plan and read back plan intent, risk, affected areas and current breadcrumb context.
2. Document `Implementation Snapshot (When Executing)` and `Approved Execution Scope (This Run)`.
3. Confirm exactly what is approved to implement now and what remains out of scope.
4. Execute approved work and log actions in `Implementation Actions (Execution Log)`.
5. Update `Evidence / Implementation Refs` and `Implementation Outcome (This Run)`.
6. Propose `implementation_state` and any status/archival changes (approval-gated).
7. **Optional audit gate:** Before closing, assess whether the primary output document (codex, protocol, governance artifact, finished argument) would benefit from a second-AI challenger pass. Offer it in one line ("Audit warranted?") without requiring it. If yes, call your configured second-AI interface tool with the document content inline. Do not offer for operational outputs (scripts, logs, sync results, backup records).
   - The audit is a session event. Findings get worked through and acted on in the session.
   - At audit close, ask one question ("Anything worth a long-term note?"). The filter is recurrence. Not whether the finding was surfaced, but whether a future session would benefit from knowing it. If yes, append a single date-stamped entry to `## Refinements` in the audited document. Keep it to the durable insight, not a transcript of the full report. If no, close and move on.
8. Read back the implementation summary and apply approval-gated changes only with explicit consent.

## Quick Entry Tags (Optional, Dataview-Friendly)

- `#field`
- `#ai`
- `#learning`
- `#decision`

## Planning Mode Rule

- If status is proposed or draft, execution is not authorized.

## Pairs With

**Source Harvest** is the gateway skill for systematic pattern extraction from external repos and tools. Many users adopt Source Harvest first, then layer additional skills like this one on top.

**Plan Challenger** runs an adversarial pre-build pass on the plan before this skill executes. Strong pairing for high-stakes implementations.

If Source Harvest isn't installed yet: [Install Source Harvest via IGOS](https://www.infinitegameos.io/skills/source-harvest).
If Plan Challenger isn't installed yet: [Install Plan Challenger via IGOS](https://www.infinitegameos.io/skills/plan-challenger).

## Refinements

*(Empty. Populated when execution mistakes occur during sessions.)*
