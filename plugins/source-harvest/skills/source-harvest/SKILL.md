---
description: Use when extracting patterns from any external repo or tool. Source-level extraction not description-level. Classify, extract, integrate what serves your system.
---

# Source Harvest

Purpose: Extract actionable patterns from any external repo, plugin or resource by reading the actual source. Skills, hooks, commands, protocols, configs. Not the README. The nuance is in the implementation. Classify each component against your existing tooling and execute approved integrations with governance applied.

Trigger: A new repo, plugin or tool of interest. Also useful as the first-pass review when adding any new repo to an ongoing tech-watch list. The first review should always be a Source Harvest, not a description scan.

Inputs: Repo URL, tool reference or inbox item.

Outputs: Structured harvest report classified component by component, approved file edits, deferred items filed, optional follow-up plans for larger scope, optional tech-watch entry.

## Classification Framework

Every component is classified as one of four dispositions:

| Disposition | Meaning | Action |
|-------------|---------|--------|
| **Adopt** | Genuinely new capability not covered by your system | Build as a new skill or protocol, adapted to your system's conventions and governance |
| **Enrich** | Strengthens an existing skill or protocol | Identify the exact change and target file. Execute with approval |
| **Defer** | Useful but no immediate gap. Worth watching | File in your deferred inventory with a promotion signal |
| **Ignore** | Fully covered by existing capabilities, or not relevant | No action. Note briefly why |

The README is not the nuance. Skill descriptions and source implementations diverge significantly. Reading source is non-negotiable.

---

## Steps

### Step 1. Confirm Access

Identify the source and confirm it is publicly accessible. Common paths:
- GitHub repo: use `gh api repos/[owner]/[repo]/contents/` to list top-level structure
- npm package: fetch the package source
- Docs or protocol site: use a web fetch tool
- SaaS platform, API documentation or capability inventory: use web fetch and search to extract feature sets and technical documentation. When source code is unavailable, the harvest operates at the capability and pattern level. The classification framework still applies.

Check the license at the artifact before anything else: `gh api repos/[owner]/[repo] --jq .license` for a repo, the terms page for a product. A README sentence is a claim, not a license. Read it now, while it can still change where the harvest looks (see Refinements, 2026-07-29 and 2026-08-19).

If authentication is required or the source is private, halt: "Source requires authentication or is private. The operator must provide access or assess via available documentation."

Do not proceed using only the README or description as primary evidence. For non-repo sources where no code exists, capability documentation and API references serve as the evidence base.

### Step 2. Inventory the Source

Fetch and list all components. Typical targets:
- Skill files (any `.md` or scripted skill definitions)
- Hook scripts
- Command definitions
- Configuration files (settings, CLAUDE.md, config.json)
- Protocol or governance documents
- Supporting scripts

Present the inventory to the operator: "Found [N] components: [brief list by category]." Confirm before proceeding to classification.

### Step 3. Read Every Component

Read each component file. Do not classify from filenames or descriptions alone. The content is the evidence.

For large repos (20+ components), group by category and read the most relevant ones first. Flag anything skipped and why.

When a source names a primary source (a canon, an archive, a dataset, a scripture), fetch the primary source before classifying. The harvest's real value often sits one citation upstream (see Refinements, 2026-08-19).

### Step 4. Classify Each Component

For each component, assign a disposition (Adopt / Enrich / Defer / Ignore) and write one to three lines of rationale:
- What does this component actually do at the source level?
- Which existing skill or protocol is the comparison point?
- What specifically is novel, and what is already covered?

Three checks before a disposition stands (see Refinements, 2026-07-29 and 2026-08-19):
- Is the source's problem statement true? Verify the diagnosis as well as the solution. A harvest that accepts a source's premises imports them.
- If a finding implies a weakness in your system, open the file and confirm the weakness exists before classifying.
- If a pattern arrives with a blocker attached, search your system for how it already solves that problem before accepting the blocker.

### Step 5. Draft Harvest Report

Compile the full classification into a harvest report:

```
SOURCE HARVEST. [repo name]. [date]
-----------------------------------
Adopt:   [count]. [names]
Enrich:  [count]. [names + target file]
Defer:   [count]. [names]
Ignore:  [count]

[Per-component breakdown]
```

For each Enrich: specify the exact change to the target file (what to add, where, why).
For each Adopt: draft the adapted version in outline or propose a follow-up plan if scope requires more than one session.
For each Enrich that seeds one pattern into several files: list every file. They are one unit of work, and a later fix to one is incomplete until all are swept (see Refinements, 2026-07-13).
For each Ignore: mark it covered (already solved here) or contrast (your system chose differently). Record a contrast with one line on the road not taken (see Refinements, 2026-07-29).

### Step 6. Approval Gate

Present the harvest report to the operator. No changes execute without approval.

Ask: "Approve all, approve subset or revise?" Wait for explicit response.

If the operator approves a subset, note which items are deferred for a future run.

This gate holds everything. Information collected, decision made, action authorized.

### Step 7. Execute Approved Changes

For each approved Enrich: edit the target file.
For each approved Adopt: create the new skill or protocol file at the canonical path.

Log each change as it completes.

Your system's conventions apply to all adoptions:
- Skill format and frontmatter conventions of your runtime
- Your system's voice and conventions
- Approval gates for structural changes
- When creating a skill that operates externally, add a scope or permissions declaration to signal its external reach. The allowed-tools pattern in the Tool Scoping section applies here.

### Step 8. Registry Housekeeping

For every new skill or protocol created in Step 7, run housekeeping before proceeding to Step 9:

**a. Register the skill.** New skills are only discoverable by your runtime after registration. The exact mechanism depends on your environment:
- Plugin-based runtimes: ensure the skill is in the plugin manifest's discovery path
- Junction-based local layouts: create the link or copy required by your platform
- Settings-based: update the relevant settings file

Confirm the path resolves correctly after creation.

**b. Update any skill registry index** your system uses to surface available skills.

**c. Note if a new skill requires a standing-instruction update.** If the skill introduces a standing behavior (a new trigger phrase, a new mandatory gate, a new integration), check whether your global instructions need an entry. If yes, flag it as a recommendation before Step 10.

A skill that exists in the canonical path but has no registration is a ghost. Discoverable only by accident.

### Step 9. File Deferred Items

For each Defer and any unapproved Adopt: add an entry to your deferred inventory.

Each entry must include:
- Source and license
- Deferred reason
- Promotion signal (what specific gap or trigger should pull this off the shelf)
- Context notes (specific patterns worth preserving for future reference)

### Step 10. Tech Watch Entry

If ongoing monitoring of this source is warranted (active development, high relevance, good signal-to-noise), add a row to your tech-watch list.

Note what was adopted or enriched from this first harvest so future changelog reviews have context.

### Step 11. Inbox Disposition

If the source arrived via an inbox queue, note the disposition in the file or confirm with the operator whether to archive it.

### Step 12. Summary Report

Output a final summary:

```
Source Harvest complete. [repo name]. [date]
Adopted:  [N skills/protocols created]
Enriched: [N existing files updated]
Deferred: [N items filed]
Ignored:  [N]
Watch entry: [added / not added]
```

---

## Tool Scoping Pattern

When creating a new skill that operates externally, declare the allowed tools in the command frontmatter using the `allowed-tools` key. This scopes the permission surface to the minimum required for that skill's job.

Example:

```
---
allowed-tools: Bash(gh issue view:*), Bash(gh pr comment:*), Bash(gh pr diff:*)
---
```

This is a boundary discipline at the command level. It prevents a skill from reaching tools it has no business touching. Apply it to any skill that uses external CLIs (gh, Stripe, HubSpot) or operates with scoped permissions.

Not all runtimes can use this pattern in every execution environment. Flag it in new skill design as the intended permission boundary even if the runtime does not enforce it yet.

---

## Constraints

- Source must be read before classification. Descriptions and README are supporting context only.
- No wholesale installs. Every adoption is a conscious, adapted implementation.
- Your system's voice and conventions apply to all new content generated.
- Structural file changes (renames, moves, deletions of existing files) require explicit operator approval.
- If a component's source can't be fetched (private, auth-gated, minified), classify it as Defer with a note explaining the access limitation.

## Operating Posture

This skill is intelligence gathering first, integration second. The harvest collects information. The approval gate at Step 6 is where information becomes action. Steps 7-12 execute decisions already made.

Source-vs-description discipline is the keystone. Skill descriptions advertise intent. Source code shows the actual implementation, including the patterns invisible from the outside: the four-phase debug gate, the dual confidence gating, the taste-decision surfacing, the per-phase verification-before-commit discipline. These are the patterns worth harvesting. They live in the source.

---

## Model Routing

Dispatch the cheapest model that does the job well. Before each delegated step, ask whether a smaller model would produce equivalent output.

| Step | Default model | Rationale |
|---|---|---|
| 1. Confirm Access | Sonnet | Source identification and access verification with light judgment |
| 2. Inventory the Source | Sonnet | Structured listing and category grouping for operator confirmation |
| 3. Read Every Component | Sonnet | Multi-file read sweep across heterogeneous component types |
| 4. Classify Each Component | Opus | Disposition judgment against system equivalents; novelty assessment |
| 5. Draft Harvest Report | Opus | Synthesis across all classified components; Enrich and Adopt specificity |
| 6. Approval Gate | (yields, no model) | Operator approval before any changes execute |
| 7. Execute Approved Changes | Sonnet | File edits and new skill creation per approved classification |
| 8. Skill Registry Housekeeping | Haiku | Mechanical file writes and registry updates |
| 9. File Deferred Items | Haiku | Structured append to deferred inventory |
| 10. Tech Watch Entry | Haiku | Single-row append to watched repos table |
| 11. Inbox Disposition | Haiku | File archival note or operator confirmation request |
| 12. Summary Report | Sonnet | Final structured summary across all dispositions |

Set the model explicitly on every subagent dispatch. Never silently inherit the top tier.

---

## Refinements

Dated lessons from real harvests, newest first. Each one changed how the next harvest ran. The sources are described rather than named: the lesson travels, the source stays its author's.

**2026-09-28:** the lessons moved into the steps

**A lesson that says "add this to Step 1" is not applied until Step 1 carries it.** Two entries below ended on exactly that instruction, and the steps they named never changed. They now live in Steps 1, 3, 4 and 5, each pointing back to the entry that earned it. When an entry here ends on an instruction, apply it to the step in the same pass.

**2026-08-19:** a closed product built on a family archive (all rights reserved, no source code)

**When a source names a primary source, go get the primary source before classifying anything.** This product's entire differentiator was privileged access to a family association's published volumes from the early twentieth century, passed down through the author's family. True, and two of the three volumes had been free full text on the Internet Archive for years, and all three were full view at HathiTrust under a public-domain rights code. Fetching them cost four tool calls and produced more than the product would have. **The scarcity was in the reading, not the access.** Generalize it past repos. Any product standing on a canon, an archive, a dataset or a scripture is standing on something you can reach directly, and a harvest's real value often sits one citation upstream of the thing being harvested.

**A restrictive license is a routing instruction, not only a wall.** The product's terms prohibited using its materials to create or train any competing product, curriculum or platform, and prohibited compiling its content into a knowledge base. That closed the option of borrowing its frameworks, which is what pushed the harvest to the public-domain source and the independently published work behind it. Both were better material. **Read the license early enough that it can change where you look, rather than late enough that it only tells you what to delete.**

**Verify the problem statement, not only the solution.** This source defined its market with four statistics, and the headline one was already discredited: a researcher traced the 70 percent wealth-transfer claim in 2022 and found it inverts a business-continuity rate, applied to data never measured for it. The harvesting system's own research notes were carrying the same number, cited from the same downstream literature. **A harvest that checks a source's mechanics while accepting its premises imports the premises.** The diagnosis is a claim, and it gets verified at the moment it is made. Add the problem statement to what gets verified.

**2026-07-29:** a public skill repo (license ambiguous, 11 skills)

**Check the license file, never the license claim.** The README said MIT. There was no LICENSE file, the GitHub API reported none and a hardcoded vendor path inside one skill showed part of the repo had come from a commercial plugin belonging to a third party. A README sentence is a claim about provenance, and Step 1 verifies it the same way any other claim gets verified: at the artifact, not at the description. Add `gh api repos/OWNER/REPO --jq .license` to the access check.

**A harvest can find the gap it was looking for already open in your own system, and should go look.** The strongest finding here was a verification-gate pattern. Rather than classify it against the harvesting system's rules in the abstract, the classification pass opened the actual ledgers and found five past-dated reminders with no check for whether they were done. That evidence is what turned a plausible Enrich into an obviously correct one, and it took one file read. **When a harvest finding implies a weakness in your system, go verify the weakness exists before classifying.** A finding with a live example behind it survives the approval gate on its own merit. A finding argued from theory competes with every other good idea.

**A harvest imports the source's constraints along with its patterns, and the constraints travel invisibly.** An adopted illustration pipeline shipped as a draft, held on a blocker that turned out to belong to the source rather than to the harvesting system. The source asked one image model to draw the panels and the lettering together, so it depended on a model that renders legible text inside an image. That dependency came across intact and produced a decision about wiring new image providers. One question dissolved it: the harvesting system already generated textless images and set real type on top of them, in two working scripts, the whole time.

The asymmetry is the lesson. **A pattern gets examined on adoption, because the pattern is the thing being adopted. The limitation the pattern was designed around gets carried in silently**, still shaped by the original author's tooling, budget and platform. So before accepting any blocker that arrives attached to a harvested pattern, search your own system for how it already solves that problem. Checking your own canon first applies to constraints, not only to content. A harvest that imports a blocker your system already answered has adopted the source's limits as though they were laws.

**Name the road not taken.** This source's identity doctrine held that the agent's self-authored identity is its own to evolve, and that requests to change it are suggestions. The harvesting system holds the inverse: no agent modifies its own rules. That is an Ignore in the disposition table and a genuinely valuable artifact in the report, because it is a coherent system answering the same question the other way. **When an Ignore is an Ignore because you chose differently rather than because you already cover it, record it as contrast rather than filing it under covered.** Those two look identical in a count and carry completely different information.

**2026-07-13:** a large open-source engineering plugin (MIT, 26 skills)

**A harvest can seed a defect, and the harvest log will record it as a success.** An earlier harvest's log states, in its own words, an 80-plus confidence threshold for posting review comments. That threshold was set against an anchored 0, 25, 50, 75, 100 scale, so the review skill silently discarded its entire 75 tier on every run for three months while reporting clean. The same harvest had propagated the same rubric into two more instruments. All three were repaired together. **An Enrich propagates whatever it carries, including the flaw. When a harvest seeds one pattern into N places, the N places are one unit of work, and a later correction to one of them is incomplete until the other N-1 are swept.**

**The gap between a source's writing and its source is the whole reason this skill exists.** The operator had followed the authors' newsletter for months. The practice in the repo runs substantially deeper than the writing about it: the confidence anchors, the quote-the-line gate and the validator pass appear nowhere in the public prose. Reading source is non-negotiable, and this harvest is the strongest evidence for it yet.
