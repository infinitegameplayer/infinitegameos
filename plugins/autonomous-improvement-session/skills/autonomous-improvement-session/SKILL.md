---
name: autonomous-improvement-session
description: Use when you have spare capacity and want to set your system improving without active attention. Operator-invoked only, never scheduled. Safe, additive, reversible hygiene work runs under a threshold model with a permanent floor of actions the agent never takes on its own.
status: active
version: 1.1
---

# Autonomous Improvement Session

> This skill also ships inside the Sovereign Ecosystem template.

**Purpose:** Run a set-and-forget session that improves your system without your active attention. Burns extra capacity on low-stakes, additive, internal hygiene and improvement work. Tier 1 items land edits directly. Tier 2 items produce findings for your review. The skill is a recursive flywheel: a research rotation grows its own menu of improvement types every cycle, a threshold model lets execution authority climb one earned step at a time, and a decision board lets you ratify that climb on your own schedule. Menu growth is fast and wide. Execution authority is slow and earned.

**Trigger:** Operator-invoked when extra capacity exists. Examples: heading out, end of week with capacity to burn, end of session with remaining budget. Never scheduled, never auto-fired.

**Inputs:** A run-log file (path of your choosing, defaults to `Logs/Autonomous Improvement Log.md`) where state lives in frontmatter. Optional invocation hint: number of items to run, a tier preference, or a "full sweep" override.

**Outputs:** One appended entry at the top of the log body and a regenerated decision board (a file adjacent to the log, such as `autonomous-improvement-decision-board.md`). Tier 1 items leave evidence as edits in their target files. Tier 2 items fold their findings into the decision board.

**Output doctrine.** The decision board is the single decision surface. No skill-generated report files land in your inbox. Your inbox is a routing queue for genuine inbound notes, not a place for this skill's output. The run-log entry plus your version control commit is the durable breadcrumb, lightweight by design.

---

## Operating Principle

This is an autonomous improvement and hygiene engine. The default verb is DO, not propose.

If an action is additive, reversible, system-internal and touches no deletion, no canonical-governance ratification, no voice and no outward surface, execute it and record it in the run log. Do not ask. Routing an inbox item to its container, archiving an implemented plan, fixing a reference to a retired artifact, adding a missing index entry, normalizing a slug: these are the work, not proposals. If something is broken or missing and the clean fix is obvious and safe, make the fix.

Surface to the operator only two things. First, a genuine judgment fork: the routing heuristics conflict or none clearly applies, the situation is materially novel, intent is ambiguous and the choice would set a pattern, or the action is reversible but high-impact (touches many files at once or a high-inbound-reference artifact). Second, anything that touches the Permanent Floor. These two reflexes are opposite and must not blur: safe work is act-then-show, floor-class work is surface-then-wait. "Do not ask" governs the safe domain. It's never license to act on a floor item, and the floor's existence is never license to ask about safe work near it. A clean run leaves the Approvals bucket near empty, because the safe work is already done and sits in the Completed bucket for review.

---

## When to Use

- You say any of: "run autonomous improvement," "set and forget," "burn the rest of my capacity on improvement work," "I'm heading out, run improvement."
- You have reviewed a prior run's decision board and want to weave accepted candidates into the menu.
- You want the skill to run a single specific menu item by name.

---

## The Two Speeds

The flywheel runs at two speeds on purpose. Menu growth is fast and wide: the research rotation casts a wide net for categories and mechanisms of improvement, and the menu of things the skill knows how to do grows every cycle. Execution authority is slow and earned: v1 keeps today's line, and the line climbs item by item only through ratified decisions. Wide net for ideas. Narrow gate for action. The gate widens only with proof.

---

## The Threshold Model

Every menu item and every discovered action carries an `autonomy` level. The level governs execution authority. It's distinct from the tier, which governs output shape: Tier 1 lands edits, Tier 2 writes findings.

- **Level 1, fully autonomous.** Additive, reversible, system-internal, zero judgment. The agent does it and logs it. Every starter menu item is Level 1.
- **Level 2, autonomous with parked questions.** The agent acts on the safe part and parks any genuine judgment fork as a question on the decision board.
- **Level 3, operator-judgment-required.** Structural, voice-bound, outward-facing or approval-gated. Always parked. Never auto-executed.

A skill-level `auto_execute_threshold` lives in the log frontmatter and defines the line. It starts at `1`. At or below the line the agent executes. Above the line it parks to the decision board. The threshold and per-item levels move only through ratified decisions logged in the run history. Nothing raises its own autonomy.

**v1 posture:** threshold `1`, every starter item Level 1. The autonomy field becomes important as the menu grows and new items arrive carrying judgment forks or structural reach.

---

## The Decision Board

One review surface. The closing output is the board, and a durable backing file holds the same content for continuity across sessions. The board is regenerated each run with the current run's open decisions. Resolved decisions log to the run log, not the board.

Four buckets:

1. **Completed this run (for review).** What the skill did autonomously this run, each line reversible via version control or trivially undone. Routed inbox items, archived plans, applied hygiene fixes. This is a record to skim, not a decision. As autonomy widens, this bucket grows and the next one shrinks. That's the flywheel working.
2. **Approvals and questions.** Genuine judgment forks the agent was unsure of, anything that needed intent before acting. You answer with a decision plus a forward rule. A clean run leaves this bucket near empty. Scale the form of each question to context. When the matter is nuanced, give the full Three Solutions: the situation, three real options, the one recommended and its tradeoff. When it's simple, give one recommended move. Never a bare open question.
3. **New menu candidates and autonomy moves.** Improvement types the research rotation surfaced, plus any proposed autonomy-level move. You accept, decline or reshape each. Accepted candidates get woven into the menu in the return session.
4. **Proposed plans.** Anything bigger than one session of work, or any governance, memory or configuration class change. The agent drafts a cliff-note summary, not a vague question. The board entry is "approve plan creation?" Only surface plans you'd recommend creating. Every item in this bucket carries a positive recommendation and the reason for it.

---

## Starter Menu

The menu grows every cycle through the research rotation. These starter items ship with the skill. They cover the most portable, universal hygiene that applies regardless of what your system contains.

**Tier 1 (autonomous, edits land directly):** All Tier 1 items are additive, reversible, system-internal and Level 1 at v1.

**T1-1: Reference integrity re-sweep.**
Walk your active system containers and check internal references (wikilinks, file paths, imports). For each broken reference, if the target exists at a slightly different path (renamed, moved, suffix added), fix the reference in place. Skip references where the target genuinely does not exist anywhere. Surface those counts to you in the run entry.
Eligibility: not run in 7+ days.

**T1-2: Index regeneration.**
Run any index-generation scripts present in your scripts directory. Confirm the regenerated index shows the correct total count. Sweep index frontmatter fields for references pointing at paths that no longer exist and update each to the current path. Scope to frontmatter fields only, never prose mentions (prose is intentional history).
Eligibility: condition-based. Eligible whenever an artifact was added, archived or had its status change since the last index build.

**T1-3: Anti-AI sweep on draft articles.**
Glob all draft markdown files in your drafts directory with a draft or ideas status marker. For each, run your writing style codex sweep against the file body. Apply approved find-and-replace transforms in place. Leave judgment-required findings as inline comments for your review. Skip files already swept since they were last edited.
Eligibility: not run in 7+ days. Skip entirely if your system does not ship an Anti-AI Writing Patterns document.

**T1-4: Memory file slug normalization.**
Walk all files in your AI interface's project memory directory. Grep for link variants using hyphens where the slug exists on disk with underscores (or vice versa). Verify the canonical variant exists. If yes, replace the non-canonical form. Surface any links where neither variant exists.
Eligibility: not run in 14+ days.

**T1-5: Index completeness sweep.**
Glob your codices or reference files. For each with an active status marker, check whether it appears in the master index. For each active file absent from the index, add an entry in the correct category section. Skip files intentionally held out of the index. Surface any ambiguous category placements as judgment forks; add the unambiguous ones.
Eligibility: condition-based. Eligible whenever an active reference file is absent from the index.

**T1-6: Superseded-artifact sweep.**
Grep active containers for files with a `status: superseded` or `status: retired` marker that still sit outside your archive location. For each with an explicit superseded-by pointer or clear archival destination, archive it, run the reference-repoint sweep (grep for the old path and repoint active references to the canonical superseder, not the archive), regenerate any affected index. Surface only: a superseded file with no destination pointer. Act on the clear cases.
Eligibility: condition-based. Eligible whenever a superseded or retired file sits in an active container.

**T1-7: Runtime log rotation.**
For each operational log that exceeds its line cap (default: 2000 lines), truncate to the last N lines. This is operational maintenance of a transient append log, not content deletion. List stale operational files (30+ days old, not active state files) as operator-approved removal candidates. Do not delete them. File deletion is the Permanent Floor.
Eligibility: condition-based. Eligible whenever a named operational log exceeds its line cap.

**T1-8: Skill mandatory-sections completeness sweep.**
Glob all skill files. For each, check for the sections the system calls mandatory: Purpose or Trigger, When to Use, Steps or Behavior, Constraints, Refinements. For each skill missing only a Refinements section, append an empty stub (additive and reversible). Surface as read-only findings (do not auto-edit): any skill missing Constraints, When to Use or Steps. Composing those sections is authoring, not a stub.
Eligibility: condition-based. Eligible whenever a skill file lacks a Refinements section.

**Tier 2 (autonomous, read-only scans, findings to the decision board):** All Tier 2 items are Level 1 at v1. Producing a read-only finding is fully autonomous.

**T2-1: Inbox triage sweep.**
Walk your inbox. For each unrouted item, classify it against your routing heuristics and act: safely routable items route via file move. After any move, run the reference-repoint sweep for the old path. Hold-for-operator items (conflicting heuristics, real judgment, durable-role decisions) surface on the decision board. The hold-for-operator set stays narrow by design.
Eligibility: condition-based. Eligible whenever the inbox holds unrouted items.

**T2-2: Stale draft surface.**
Walk your drafts directory. For each draft older than 30 days, classify: ready-to-publish, event-gated or abandoned. Produce a report per content type.
Eligibility: not run in 30+ days.

**T2-3: External link rot scan.**
Sweep outbound URLs in published articles or published notes. Fetch each (HEAD or short GET), flag any 4xx or 5xx response. Skip URLs requiring auth, payment walls or known anti-bot surfaces.
Eligibility: not run in 30+ days.

**T2-4: Memory file cross-reference health.**
Walk all files in your AI interface's project memory directory. Extract every internal link. Check each target against the directory. Build a structured list of broken cross-refs plus a candidate-target inventory. Suggest the likely correct target from the inventory. Verify suggestions against live state before reporting.
Eligibility: not run in 30+ days.

**T2-5: Reference orphan and inbound-density report.**
For each codex or reference file in your active governance layer, count inbound references across the system. Flag every file with fewer than 5 inbound references as a low-pollination candidate. Sort ascending and write the report.
Eligibility: not run in 60+ days.

**T2-6: Skill cross-reference health.**
Walk all skill files. Extract every internal link. Check each target against the system. Build a structured list of broken cross-refs plus a candidate-target inventory. Suggest the likely correct target from the inventory.
Eligibility: not run in 30+ days.

**T2-7: Memory compression candidate report.**
Read your AI interface's memory index and walk each linked memory file body. Identify candidates for compression: entries that are stale, redundant or superseded by later refinements. Surface a prioritized list.
Eligibility: not run in 60+ days, or when memory index exceeds your defined line cap.

**T2-8: Breadcrumb propagation and stale-reference sweep.**
Gather changed governance artifacts from recent version control history (last 14 days). For each, grep the system for inbound references and documents that enumerate the same subject. For each with candidate parallel docs, check whether those docs reflect the change or carry a now-stale claim. Read-only. Propose the reconciliation; do not apply it. Check version history before calling any mismatch drift: mismatches often have intentional history.
Eligibility: not run in 14+ days.

**T2-9: Style-guide conformance sweep.**
Scope to durable canonical content only: reference docs, protocols, product pages and other content meant to stand indefinitely. Skip in-progress drafts and already-shipped ephemera; expression quality on live drafts belongs at drafting time, not a background sweep. If your system ships a style guide or an anti-AI writing-patterns document, check conformance against its stated rules (banned phrases, capitalization conventions, punctuation rules). Skip entirely if no such document exists. Read-only; every finding surfaces for review.
Eligibility: not run in 30+ days.

**T2-10: YAML frontmatter validity scan.**
Walk all files that carry YAML frontmatter. Parse each block. An unquoted colon inside a value (commonly a title or description field) can silently break the whole properties block, defeating every frontmatter-based check for that file with no visible error. Flag every file that fails to parse cleanly, with the specific line at fault.
Eligibility: not run in 30+ days.

**T2-11: MCP tool-description integrity sweep.**
Hash the descriptions of your active MCP tool schemas each run and diff against the prior hash. A tool description that changes without a corresponding version bump is the signature of a supply-chain rug-pull on a trust boundary you rely on. Flag any drift for review.
Eligibility: not run in 14+ days.

---

## Steps

### Step 1: Load state

Read the run-log file. Parse the frontmatter: `menu_state` map (item ID to last-run date), `run_counter` integer, `auto_execute_threshold` integer, `research_state` map (category ID to last-researched date) and `priority_flags` list. If the log does not exist, halt and surface: "Log file missing. Create the seed log per the SKILL.md and retry."

### Step 2: Compute eligibility

For each menu item (T1-* and T2-*), apply its eligibility rule against the state. Build an eligible-items list. If the operator passed an item name, narrow to that item only.

**Three-tier eligibility (resolves the cooldown problem):**
- **Condition-based, no window.** Cheap hygiene and routing that runs whenever there is something to do: T2-1 inbox triage, T2-8 breadcrumb sweep, T1-2 index regeneration, T1-5 index completeness, T1-6 superseded sweep. Eligible when the target is non-empty or the condition fires, regardless of last-run date.
- **Short window, 7 to 14 days.** Cheap scans with moderate drift: T1-1 reference integrity, T1-3 anti-AI, T1-4 memory slug.
- **Long window, 30 to 90 days.** Expensive scans with slow drift: T2-2, T2-3, T2-4, T2-5, T2-6, T2-7. The window matches the cost and the drift speed.

Any item listed in the log frontmatter `priority_flags` is eligible this run regardless of its day-window or last-run date. Consume the flag when the item runs and delivers.

### Step 3: Select items by priority

No single run executes everything. Rank eligible items by priority, then select up to a budget of 8 per run. Priority, highest first: operator-flagged items lift to the top, research-surfaced high-value items lift next, staleness lifts an item the further it has sat past its window.

If the operator passed an item count, honor it against the ranked list. If they passed "full sweep," run every eligible item with no cap. Selection respects the threshold: only items at or below `auto_execute_threshold` execute. Eligible items above the line surface on the decision board instead.

### Step 4: Announce the plan

Output a one-paragraph plan: "Running N items this session. Tier 1: [list]. Tier 2: [list]. Estimated wall time: [rough estimate]." This is the only announcement until close.

### Step 5: Execute Tier 1 items

For each Tier 1 item, first check its autonomy level against `auto_execute_threshold`:
- At or below the line: dispatch execution. Tier 1 items run sequentially to avoid file-edit conflicts.
- Level 2: execute the safe part. When a genuine judgment fork appears, park it to decision board bucket 2 with the context needed to rule, then continue.
- Above the line: do not execute. Park the whole item to bucket 2.

After each item completes, do a layer-1 opportunistic capture (Step 6), then move to the next item.

### Step 6: Layer 1 opportunistic capture (per item)

Immediately after each Tier 1 item completes, ask: "Did running this item surface any other opportunity types worth adding to the menu?" Capture findings as draft candidate entries. Findings flow into Step 9 synthesis.

### Step 7: Execute Tier 2 items

Dispatch all Tier 2 items in parallel as Sonnet subagents (read-only scans are safely parallel). Each returns a structured finding. When a finding needs a ruling the return session should act on, mirror it as a board bucket-2 entry.

**Single-context workers.** Every worker prompt states: run single-context, do not spawn subagents. A worker that fans out returns narration about its own children instead of findings, and per-item results get lost in the hop. This rule applies to every dispatched worker, Tier 1 editors included, not just Tier 2 scans.

### Step 8: Research rotation (every run)

The research rotation is the engine of menu growth. It rotates through the research categories below. Keys how many it runs to how many categories exist: six or fewer categories means one per session, more than six means two per session. Read `research_state`, pick the least-recently-researched categories, dispatch one Sonnet worker per selected category. Each returns a self-ranked top-5 candidate list with a one-line "why this beat the rest." Candidates flow into Step 9 and surface on the decision board's bucket 3.

**Research categories:**
1. **R1: External practices and tooling.** What the broader agentic and AI field is doing that your system could adopt. Force external sources with URLs.
2. **R2: Vault hygiene and integrity.** References, orphans, frontmatter, naming conventions.
3. **R3: Infrastructure and scripts.** Script health, hooks, MCP loadout, automation gaps.
4. **R4: Discoverability and content.** AI discoverability, content freshness, manifest accuracy.
5. **R5: Skill library health.** Cross-references, redundancy, progressive disclosure, routing matrices.
6. **R6: Governance coherence.** Codex consistency, protocol drift, status vocabulary, structural alignment.
7. **R7: Expression and voice integrity.** Anti-AI patterns and writing-style adherence across artifacts.
8. **R8: Memory and knowledge architecture.** Memory health, codex inbound density, knowledge map currency.
9. **R9: Cost and routing efficiency.** Model routing adherence, token efficiency, routing discipline.

**Ground-truth gate on state-claims.** Any candidate that asserts a claim about the current state of an existing artifact gets verified against live state before it reaches the board. Run the cheapest live check (an `ls`, a grep, a scoped read) at the moment of surfacing. A candidate whose premise fails verification never reaches the operator. A forward proposal to build something absent needs no artifact check.

### Step 8b: Post-run skill self-refinement

After execution completes, ask: "Did running this skill surface any defects, friction or improvements in the skill itself?" Capture as Layer 4 candidates. These propose modifications to this SKILL.md, distinct from menu-item candidates. Findings flow into Step 9 under their own category.

### Step 9: Synthesize the decision board

Aggregate the opportunistic capture, the research rotation, the self-refinement findings and every fork parked during execution into the four-bucket board. Apply the recommendation bar: if you wouldn't recommend a candidate, route it to Patterns Noticed as a one-liner rather than a decision. Every recommended candidate carries a proposed tier and a proposed autonomy level.

When a decision is nuanced, present Three Solutions: the situation, three real options, the one you recommend and its tradeoff. When it's simple, one recommendation. Never a bare open question.

**Ground-truth gate on proposed plans.** The operator approves plan creation from the premise stated in the cliff-note. If the cliff-note's operative claim is a state-claim about an existing artifact, verify it against live state before writing it to the board. A false premise spends a real approval and an entire later session on work that didn't need doing.

### Step 10: Write log entry and decision board, then close

Append a run entry at the top of the log body. Update the frontmatter: set new last-run dates in `menu_state` for items that ran, set new last-run dates in `research_state` for each category researched, increment `run_counter`, set `last_run`. Leave `auto_execute_threshold` unchanged unless a return-session ratified climb moved it.

Write the four-bucket board to the decision board file, replacing the prior run's open decisions. Present the same board as the closing output.

Closing line: "Autonomous Improvement Session complete. [N] items ran. Decision board: [A] approvals and questions, [B] menu candidates, [C] proposed plans. Log and board updated."

---

## The Climb and Return-Session Flow (operator-triggered)

The operator's board answers encode forward. This is the learning loop. The skill never modifies its own SKILL.md, menu or autonomy posture autonomously. Every move below is an explicit, operator-triggered edit cycle.

**Bucket 2: Approvals and questions.** Apply the decision to the parked work. If the answer carries a forward rule, encode it. A rule that turns a recurring judgment fork into a deterministic step is the recursion working: it can move an item from Level 3 to Level 2, or Level 2 to Level 1.

**Bucket 3: Accepted menu candidate.** Add the new menu item with execution spec, eligibility rule, output artifact and its assigned autonomy level, under the correct tier. Seed `menu_state` with today's date. Document the promotion in the run entry.

**Accepted skill self-refinement.** Edit this SKILL.md to apply it. Document it in the Refinements section with date and source-run reference.

**Bucket 4: Approved plan.** On an "approve plan creation?", draft the full plan using the board cliff-note as the seed. The plan starts at `status: proposed`. Plan creation is authorized; execution of the drafted plan is not, and runs in its own dedicated session later.

### Autonomy-Level Move (the climb)

An item's autonomy level lowers, or the skill-level `auto_execute_threshold` rises, only through a ratified decision. The threshold widens from proven workflows, never from projection.

The safety guard sits in the Permanent Floor, not in the climb mechanics. A move that would touch an outward surface, delete, move a canonical file or self-edit breaches the floor and fails regardless of how high the threshold has climbed.

---

## Future Direction: Scheduling (not v1)

v1 is operator-invoked only. Scheduling is a future direction, gated on a track record of clean review-and-climb cycles, never a date. The likely shape, when it arrives, is several runs per week with different priority weightings and different subsets of research categories. The threshold model and the priority score already carry the machinery; scheduling just sets the cadence.

---

## Log Structure

Single file at a path you choose (for example `Logs/Autonomous Improvement Log.md`).

**Retention rule.** At session open, when the log body exceeds roughly 1200 lines, compress the oldest full run entries into one-line summaries (run number, date, items executed, board outcome) until the body sits under 1000 lines, keeping the newest 8 runs in full. Frontmatter state is never compressed. The compression runs as part of the session; it needs no separate approval. The log that watches other logs' rotation carries its own window.

**Frontmatter:**

```yaml
---
status: active
run_counter: 0
last_run:
auto_execute_threshold: 1
research_state:
  R1:
  R2:
  R3:
  R4:
  R5:
  R6:
  R7:
  R8:
  R9:
priority_flags: []
menu_state: {}
---
```

**Body:** Reverse-chronological run entries. Newest at the top.

---

## Constraints (the Hard Ceiling)

This section is the Hard Ceiling. It holds regardless of how high `auto_execute_threshold` climbs. No ratified climb, accepted candidate or forward rule may breach the permanent floor.

The ceiling is drawn by action type, not location. Destructive, voice-bound and outward-broadcast actions stay forbidden forever. Additive, reversible, build-verified correction opens as a gated lane that earns its way toward gateless operation one proven class at a time.

### The Permanent Floor (never climbs)

No threshold, climb, candidate or forward rule breaches these. Ever.

- No change to copy, voice or content prose on any live surface. Outward words are voice-bound.
- No deletions of anything, anywhere in the system.
- No moves of canonical governance files: codices, your constitution or charter, protocols, canonical content. Those require operator approval. This does NOT cover implemented plan archival. Moving a `status: implemented` plan from the active directory to the archive is operational lifecycle closure, not a governance move: it stays inside the system, it's reversible, it deletes nothing and it changes no governance.
- No outward broadcasts. Email sends, social posts, anything that speaks to the world.
- No direct push to any main branch. Every external change goes through a build-verified pull request.
- No self-modification. The skill never edits its own menu, threshold, autonomy levels, this SKILL.md, your auto-memory file or your settings file autonomously. Those move only after you ratify a decision-board entry.

### The Graduated Lane (opens, earns its climb)

Two classes of action, both additive or corrective, never voice-bound, always reversible.

- **Read and route.** Reading reports and routing them into lanes. Fully safe.
- **Additive or corrective technical fixes to external repos**, executed as build-verified pull requests. Opens one proven class at a time, only after you authorize it.

A fix enters at Level 3, propose-only. When you authorize a class, the form is a branch plus a pull request with a green build. You merge. A narrow class with a clean track record climbs to auto-open PR, then to auto-merge on green build, one ratified step at a time. The part that climbs away is the merge click, never the build gate.

### Operational Constraints

- Operator-invoked only. The skill never auto-fires and never schedules itself.
- All Tier 1 items are additive edits or in-place corrections traceable via version control. All Tier 2 items are read-only scans.
- Discovery candidates that would breach the permanent floor stay in Patterns Noticed. They're never surfaced as menu candidates.
- If any Tier 1 item errors, log the error, skip the item, continue. Do not halt the whole session for one failure.
- If the log file is missing or malformed at Step 1, halt. State integrity is foundational.

---

## Model Routing

Dispatch the cheapest model that does the job well. Before each delegated step, ask whether a smaller model would produce equivalent output.

| Work type | Model |
|---|---|
| Mechanical lookups, deterministic commands, structured extraction against a spec | Haiku |
| Multi-step synthesis, drafting, diagnosis, most worker dispatch | Sonnet |
| Architectural judgment, plan design, judgment-dense synthesis | Opus |

Set the model explicitly on every subagent dispatch. Never silently inherit the top tier.

**Specific step routing:**

| Step | Default model | Rationale |
|---|---|---|
| Step 1: Load state | Haiku | Mechanical YAML read with known schema. |
| Step 2: Compute eligibility | Haiku | Deterministic date math, no judgment. |
| Step 3: Select items by priority | Sonnet | Light prioritization across heterogeneous items. |
| Step 4: Announce plan | Sonnet | Operator-facing prose with capacity framing. |
| Tier 1 mechanical items (T1-1, T1-2, T1-4) | Haiku | Mechanical path and slug corrections. |
| Tier 1 judgment items (T1-3 anti-AI sweep) | Sonnet | Pattern-match with light inline-versus-fix judgment. |
| Step 7: Tier 2 worker dispatch | Sonnet | Read-only scans with structured synthesis. |
| Steps 6 and 8b: opportunistic capture and self-refinement | Opus | Reflection on what was just observed; judgment-dense. |
| Step 8: Research rotation workers | Sonnet | Parallel research workers per category. |
| Step 9: Synthesize the decision board | Opus | Classification, tier and autonomy judgment. |
| Step 10: Write log entry and board | Sonnet | Structured prose with state update. |

---

## Pairs With

**Session Closeout** is the natural companion: run Autonomous Improvement at the end of a session when you have capacity to spare, then run Session Closeout to seal the session. Together they make the close a net-positive rather than just a wrap.

**Pattern Harvest** and Autonomous Improvement work the same flywheel from different angles. Pattern Harvest extracts durable patterns from external sources; Autonomous Improvement extracts improvement candidates from your own system's drift. Both feed the decision board.

If Session Closeout isn't installed yet: [Install Session Closeout via Infinite Game OS](https://www.infinitegameos.io/skills/session-closeout).
If Pattern Harvest isn't installed yet: [Install Pattern Harvest via Infinite Game OS](https://www.infinitegameos.io/skills/pattern-harvest).

---

## Refinements

*(Empty. Populated when execution mistakes occur during sessions.)*
