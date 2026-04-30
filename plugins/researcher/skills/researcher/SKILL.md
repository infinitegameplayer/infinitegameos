---
name: researcher
description: Parallel sub-agent research on a topic, aggregated into a structured report. Spawns up to 4 independent workers and synthesizes findings.
status: active
version: 1.0
---

# Researcher

**Purpose:** Parallel sub-agent research on a topic, aggregated into a structured report. Spawns up to 4 independent workers, each investigating a different angle, then synthesizes findings into a single report for operator review. Research feeds decision-making. It does not trigger execution.

## When to Use

- Pre-plan deep dives before major plans (understand the landscape before committing to a design)
- Tech-watch analysis. Compare multiple repos or changelogs in one pass
- Article research. Gather background, angles and evidence before drafting
- Architectural decisions spanning multiple protocols or systems
- Any time "I need to understand X before deciding" is the state of play

Triggered by: "research...", "give me a deep dive on...", "before we plan this, let me understand...", "what's the landscape for..."

## Steps

**Phase 1 — Clarify angles**

If the research request does not specify angles, propose them before spawning:

> "I'll research [topic] from these angles: [A], [B], [C], [D]. Confirm or adjust before I begin."

Typical angle patterns:
- What exists vs what's missing
- Best practices vs common failure modes
- Compatible vs incompatible patterns for your context
- Short-term vs long-horizon considerations

**Phase 2 — Spawn parallel workers**

Spawn up to 4 sub-agents simultaneously. Each worker gets:
- A specific research angle
- Relevant context (file paths, protocols, external sources as appropriate)
- A clear output format: summary + key findings + relevant links or file references

Workers are independent. They do not communicate with each other. Only their final outputs return.

**Phase 3 — Synthesize**

Aggregate all worker outputs into a single structured report:

```
## Research Report: [Topic]
Date: [YYYY-MM-DD]

### Summary
[2-4 sentence synthesis across all angles]

### Findings by Angle
#### [Angle A]
...
#### [Angle B]
...

### Recommended Actions / Decision Points
[Proposed next steps for operator review. Never auto-implement]

### Sources
[Files read, repos checked, protocols referenced]
```

**Phase 4 — Present**

Present the report. Do not act on findings. The operator decides what moves forward.

## Constraints

- Research output is always a structured report for operator review. Never auto-implement findings
- External web research (WebSearch, WebFetch) is allowed. External writes are not
- If research surfaces a candidate plan, propose it. Do not create it without approval
- Sub-agent depth is max 1 (no nested sub-agents within workers)

## Use Cases

- **Tech Watch:** Spawn workers per watched repo. Surface new patterns, hook types, skills since last review date
- **Article research:** Workers cover different perspectives or evidence bases. Report feeds the article draft
- **Pre-plan research:** Workers cover problem landscape, existing patterns, risk surface and adoption examples. Report feeds plan design
- **Protocol design:** Workers cover existing protocols for conflicts, relevant references, external precedents and implementation complexity

## External Boundaries

This skill spawns parallel sub-agents for research. Sub-agents are intelligence-gathering only. They do not implement, write to canonical files or trigger external actions. Every report returns to the operator for review and decision. That boundary is non-negotiable.

## Pairs With

**Source Harvest** is the gateway skill for systematic pattern extraction from external repos and tools. Researcher gathers signals; Source Harvest extracts patterns once you've decided which sources to dig into. Many users adopt Source Harvest first, then layer additional skills like this one on top.

If Source Harvest isn't installed yet: [Install Source Harvest via IGOS](https://www.infinitegameos.io/skills/source-harvest).

## Refinements

- [2026-03-23] Research output is always a structured report for operator review. Never auto-implement findings. Research feeds decision-making; it does not trigger execution.
