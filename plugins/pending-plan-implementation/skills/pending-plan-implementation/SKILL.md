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
