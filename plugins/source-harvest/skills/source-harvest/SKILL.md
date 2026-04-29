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

### Step 4. Classify Each Component

For each component, assign a disposition (Adopt / Enrich / Defer / Ignore) and write one to three lines of rationale:
- What does this component actually do at the source level?
- Which existing skill or protocol is the comparison point?
- What specifically is novel, and what is already covered?

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

### Step 6. Approval Gate

Present the harvest report to the operator. No changes execute without approval.

Ask: "Approve all, approve subset or revise?" Wait for explicit response.

If the operator approves a subset, note which items are deferred for a future run.

This gate is load-bearing. Information collected, decision made, action authorized.

### Step 7. Execute Approved Changes

For each approved Enrich: edit the target file.
For each approved Adopt: create the new skill or protocol file at the canonical path.

Log each change as it completes.

Your system's conventions apply to all adoptions:
- Skill format and frontmatter conventions of your runtime
- Your system's voice and conventions
- Approval gates for structural changes

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
