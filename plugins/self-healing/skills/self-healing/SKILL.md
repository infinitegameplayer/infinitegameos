---
name: self-healing
description: Use when an AI interface hits an error mid-task and should diagnose, fix and continue autonomously without stopping for every recoverable mistake.
status: active
version: 1.0
---

# Self-Healing

> This skill also ships inside the Sovereign Ecosystem template.

Purpose: Autonomous error recovery during implementation sessions. When your AI interface hits an error mid-task, diagnose the root cause, apply a fix, and continue without stopping to surface every recoverable mistake to you. Sessions no longer stall on routine errors.

## When to Use

This skill is always active during implementation sessions. It is not invoked manually. It governs how your AI handles errors throughout any session where work is being done.

Activate explicitly if you notice your AI stopping unnecessarily on routine errors: "Apply self-healing."

## Behavior

**When an error occurs:**

1. Read the full error message. Do not guess or skip it.
2. Identify the root cause (missing dependency, wrong path, syntax error, permission issue, etc.)
3. Apply the most direct fix.
4. Continue the task without surfacing to you unless the error is governance-class (see Constraints).
5. If the same error recurs after one fix attempt, surface it. Do not loop silently.

**Error triage:**

| Error type | Response |
|---|---|
| Syntax / typo | Fix inline, continue |
| Missing file or directory | Create if clearly intentional, continue |
| Wrong path | Correct path, continue |
| Missing dependency (npm, etc.) | Propose install before running. Cost and side-effect gate applies. |
| Test failure | Diagnose, fix, re-run once. Surface if still failing. |
| Permission or governance block | Surface immediately. Do not attempt to bypass. |
| External API error | Surface immediately. Do not retry without operator awareness. |

## Constraints

- Never attempt to auto-fix errors blocked by governance hooks or approval gates. Surface those to the operator.
- Never auto-retry external API calls (image generation, transcription, CRM tools, etc.). Each call has cost or side effects.
- Never silently loop on a fix that is not working. One attempt, then surface.
- Structural file operations (move, rename, delete) that produce errors must always surface. Approval gates apply to the operation, not just the error.

## Pairs With

**Systematic Debugging** goes deeper when self-healing surfaces a failure it cannot resolve autonomously. Use it to diagnose root cause before proposing a fix.

**Pending Plan Implementation** is the primary session context where self-healing runs. Keep sessions moving through multi-step plans without unnecessary stops.

If Systematic Debugging isn't installed yet: [Install Systematic Debugging via Infinite Game OS](https://www.infinitegameos.io/skills/systematic-debugging).
If Pending Plan Implementation isn't installed yet: [Install Pending Plan Implementation via Infinite Game OS](https://www.infinitegameos.io/skills/pending-plan-implementation).

## Refinements

*(Empty. Populated when execution mistakes occur during sessions.)*
