---
name: skill-creator
description: Build new skills autonomously. Interview the operator about the skill's intent, research relevant patterns and protocols, write a complete SKILL.md to the canonical location.
status: active
version: 1.1
---

# Skill Creator

**Purpose:** Build new skills autonomously. Interview the operator about the skill's intent, research relevant patterns and protocols, write a complete SKILL.md to the canonical location, and propose the install path. Ensures every new skill is system-native from creation. Not a generic template dropped in.

## When to Use

- When the operator describes a workflow they want to repeat and it doesn't have a skill yet
- When a new protocol, tool or process would benefit from a reusable skill interface
- Triggered by: "build me a skill for...", "create a skill that...", "I need a skill to..."

## Make It Yours

This skill is a starting point, not a finished tool. It ships with a five-phase build sequence, a specific SKILL.md required-sections list and a junction-based install pattern for Windows and Mac. Your skill folder may have different conventions.

The interview-before-writing discipline (Phase 1) is the portable core. Every other operator who has skipped the interview and gone straight to drafting has produced a skill that doesn't know when to stop, doesn't name its own failure modes and has no governance constraints section. Keep Phase 1. The rest adapts.

**Seam 1: Required sections.** The default required-sections list (Purpose, When to Use, Steps, Constraints, Refinements) fits a general-purpose skill operating in a single-operator system. If your system adds frontmatter fields (status, version, owner, approval-tier), a Pairs With block, an External Orientation callout for outward-facing skills or a Model Routing matrix, add those to the required-sections list in Phase 3. The Refinements section is mandatory: keep it even if your other conventions differ.

**Seam 2: Filename and folder conventions.** The reference install path uses `SKILL.md` as the canonical filename inside a named folder. If your system uses a flat directory with descriptive filenames, or if your skills live inside a monorepo with a different structure, edit the Phase 3 write-path and Phase 4 install-path commands to match. The junction pattern (Phase 4) is Windows-specific; the `ln -s` variant is for Mac and Linux.

**Seam 3: Registry update targets.** Phase 5 names `CLAUDE.md` and a local skills index as the update targets. Your system may use `AGENTS.md`, a separate skills registry file, a database, a project-level config or a skills manifest. Edit Phase 5 to name your actual registry.

Run a brainstorm pass before first use. The skill is a substrate. You are the operator. Make it yours.

## Steps

**Phase 1: Interview (required before writing anything)**

Ask these questions before drafting:

1. What does this skill do in one sentence?
2. When should it activate? What triggers it or what does the operator say to invoke it?
3. What are the inputs and outputs?
4. Are there any approval gates, external calls with cost or governance constraints that apply?
5. Are there existing protocols, codices or tools this skill should reference?

Do not begin writing SKILL.md until the operator has answered all five.

**Phase 2: Research**

Before writing, check:
- Relevant existing protocols
- Related reference docs and codices
- Similar existing skills for structural patterns
- System-level conventions for naming and required sections

**Phase 3: Write**

Write SKILL.md to your skills directory.

Required sections in every skill:
- Purpose and trigger
- When to Use
- Steps or behavior
- Constraints (approval gates, governance limits, cost controls)
- Refinements (empty at creation. Populated as mistakes occur in sessions)

Conventions:
- No em dashes anywhere in skill body prose (frontmatter description fields and definition labels are exempt)
- Positive framing. Define behaviors by what they are, not what they avoid
- Constraints section is required. Capture every governance gate explicitly
- Refinements section is mandatory. Add it empty, leave it to accumulate organically

**Description field rule.** The `description` frontmatter field controls whether an AI assistant loads a skill for a given task. Write it as triggering conditions only. Never summarize the skill's workflow or steps in the description.

- Wrong: "Use when building features; interviews operator, researches patterns, writes SKILL.md, proposes junction"
- Right: "Use when the operator describes a repeatable workflow that does not have a skill yet"

A description that summarizes the process teaches the AI to narrate the workflow instead of running it.

**Model Routing decision.** Choose one of three shapes at write time:

- 4+ steps with a mix of mechanical, synthesis and judgment work: write a per-step routing table (see Model Routing section at end of this skill for the template).
- 3 or fewer steps, synthesis throughout: write an Opus-acknowledgment paragraph ("This skill operates at judgment density throughout. All phases default to Opus.").
- Worker fleet skill (dispatches many parallel sub-agents): write a matrix with a workers subsection naming per-worker model defaults.

The routing decision is made at skill-creation time, not at invocation time. A skill written without a routing section leaves every future invocation to inherit silently from whatever model is active. That's the drift this prevents.

**Known Drift Checklist.** Run before finalizing SKILL.md:

- [ ] Em dashes in skill body prose
- [ ] Oxford commas in lists
- [ ] Internal system names, private paths or private person names in public-surface copy
- [ ] Restricted words in outward-facing copy (check your system's banned-word list)
- [ ] Description field summarizing workflow steps instead of triggers
- [ ] Missing Model Routing section when the skill's step shape calls for one
- [ ] SKILL.md written but install path deferred without surfacing the deferred state explicitly
- [ ] Outward-facing skill finalized without an External Orientation note

**Phase 4: Propose install path**

After writing SKILL.md, propose the appropriate install or registration step for your platform:

Windows (PowerShell):
```powershell
New-Item -ItemType Junction -Path '.claude/skills/[Name]' -Target 'path/to/Skills/[Name]'
```

Mac/Linux (Terminal, run from your project root):
```bash
ln -s "path/to/Skills/[Name]" ".claude/skills/[Name]"
```

Do not create the junction or register the skill without explicit operator approval.

**Install path precedence rule.** A junction or symlink created mid-session does not make the new skill invocable in the same session. The link must exist when the next session boots. Never end a skill-creation session with SKILL.md written but the install link missing or deferred without surfacing that state.

If the operator defers the install step, close the session with an explicit announcement: "SKILL.md is written. The skill is not yet installed and will not be invocable until [junction/symlink] is created and approved."

Before finalizing, verify: does the install link exist? Is it resolvable from the project root? Run the verify step; do not assume the write step completed it.

**Phase 5: Update registry**

After the install path is approved and created, propose updates to:
- Your CLAUDE.md or AGENTS.md skills registry
- Any local skills index

## Constraints

- Never write SKILL.md without completing the Phase 1 interview
- Never auto-create junctions or symlinks. Always propose first
- Never skip the Refinements section
- Skills that call external APIs or write to canonical files require an explicit approval gate in their Constraints section
- **External-system check:** Before finalizing any SKILL.md, ask: does this skill interact with any external system (APIs, git remotes, web, messaging services, calendar tools, image generation, browser automation, MCP tools)? If yes, add a clear note in the skill about what data flows out and what authorization is required.

## Model Routing

Dispatch the cheapest model that does the job well. Before each delegated step, ask whether a smaller model would produce equivalent output.

| Work type | Model |
|---|---|
| Mechanical lookups, deterministic commands, structured extraction against a spec | Haiku |
| Multi-step synthesis, drafting, diagnosis, most worker dispatch | Sonnet |
| Architectural judgment, plan design, judgment-dense synthesis | Opus |

Per-phase defaults: Phase 1 (interview, real-time operator engagement) routes to Opus. Phase 2 (research, multi-file synthesis) routes to Sonnet. Phase 3 (write) routes to Opus for the SKILL.md body and judgment calls; Haiku for brand-voice and banned-word sweeps. Phase 4 and 5 (install, registry) route to Sonnet.

Set the model explicitly on every subagent dispatch. Never silently inherit the top tier.

**Template: per-step routing table (4+ step skills)**

```
| Step | Work type | Model |
|---|---|---|
| Step N | Mechanical field check | Haiku |
| Step N | Synthesis or drafting | Sonnet |
| Step N | Judgment, governance, scope | Opus |
```

**Template: Opus-acknowledgment paragraph (3-or-fewer step, synthesis-throughout skills)**

```
This skill operates at judgment density throughout. All phases default to Opus. No sub-model dispatch.
```

## Pairs With

**Source Harvest** is the gateway skill for systematic pattern extraction from external repos and tools. Many users adopt Source Harvest first, then layer additional skills like this one on top.

If Source Harvest isn't installed yet: [Install Source Harvest via IGOS](https://www.infinitegameos.io/skills/source-harvest).

## Refinements

*(Empty. Populated when execution mistakes occur during sessions.)*
