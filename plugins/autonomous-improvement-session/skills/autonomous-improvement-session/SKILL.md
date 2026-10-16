---
name: autonomous-improvement-session
description: Use when you have spare capacity and want to set your system improving without active attention. Operator-invoked only, never scheduled. Every menu item carries one verb (Acts, Reports or Proposes), the menu runs two bundles per run and the decision board arrives inline in the closing message, with a permanent floor of actions the agent never takes on its own.
status: active
version: 2.0
---

# Autonomous Improvement Session

> This skill also ships inside the Sovereign Ecosystem template.

**Purpose:** Run a set-and-forget session that improves your system without your active attention. It burns extra capacity on low-stakes, additive, internal hygiene and improvement work. Every menu item carries one verb. **Acts** items land their edits. **Reports** items fold their findings into the decision board. **Proposes** items surface for your yes and do not run. The skill is a recursive flywheel: the research rotation grows the menu every cycle, fast and wide, and execution authority moves slowly, one ratified verb at a time. Wide net for ideas. Narrow gate for action.

**Trigger:** Operator-invoked when extra capacity exists: heading out, end of week with capacity to burn, end of session with budget left. Never scheduled, never auto-fired.

**Inputs:** A run log (path of your choosing, defaults to `Logs/Autonomous Improvement Log.md`) whose frontmatter holds state. Optional hint: an item count, an item name or "full sweep".

**Outputs:** One run entry at the top of the log body, and the decision board rendered inline in the closing message. The board is stored once: inline, and in the run entry. There is no backing board file. Acts items leave their edits in their target files. No report file lands in your inbox, which is a routing queue for genuine inbound notes. Write a standalone report only when a specific run genuinely warrants one.

---

## Operating Principle

This is an autonomous improvement and hygiene engine. The default verb is DO, not propose.

If an action is additive, reversible, system-internal and touches no deletion, no canonical-governance ratification, no voice and no outward surface, execute it and record it in the run log. Do not ask. Routing an inbox item to its container, archiving an implemented plan, fixing a reference to a retired artifact, adding a missing index entry, normalizing a slug: these are the work, not proposals. If something is broken or missing and the clean fix is obvious and safe, make the fix.

Surface to the operator only two things. First, a genuine judgment fork: the routing heuristics conflict or none clearly applies, the situation is materially novel, intent is ambiguous and the choice would set a pattern, or the action is reversible but high-impact (many files at once, or a high-inbound-reference artifact). Second, anything that touches the Permanent Floor. The two reflexes never blur: safe work is act-then-show, floor-class work is surface-then-wait. "Do not ask" is never license to act on a floor item, and the floor's existence is never license to ask about safe work near it. A clean run leaves Your decisions near empty, because the safe work is already done and sits in Done.

---

## When to Use

- You say any of: "run autonomous improvement", "set and forget", "burn the rest of my capacity on improvement work", "I'm heading out, run improvement".
- You have answered a prior run's board and want the answers landed (the return session).
- You want a single menu item run by name.

---

## Make It Yours

The engine transfers to any system. The paths and the menu are yours.

- **The log.** Any path you choose. State lives in its frontmatter; the seed shape is under Log Structure below.
- **The inbox, the archive and the plans directory.** T2-1, T1-6 and T1-2 name them generically. Point them at your own folders once and the specs follow.
- **The menu.** The starter items below are portable hygiene. Add items your system needs, give each a verb and a bundle and retire the ones that never find anything.
- **The bundles.** Group items by the surface they read, so one worker loads one surface. Four starter bundles ship; split or merge them as your menu grows.
- **The research categories.** Nine ship. Rename or replace them to match what your system actually holds.
- **A style guide.** T2-9 checks durable content against one if your system has it, and skips itself if not.
- **External repos.** The external-surface triage and the site lane stay off until you run repos with their own main branches.

---

## The Menu and the Verbs

- **Acts.** The agent lands the edit, one item at a time, and logs it. The default for Tier 1, and for T2-1 (inbox routing), which moves files rather than reporting on them.
- **Reports.** A read-only scan whose findings fold into the board. The default for Tier 2.
- **Proposes.** The item does not run; it surfaces on the board for your yes. The entry verb for anything voice-bound, structural or outward-facing.

An item's verb sits in its `Verb:` line. Where the line is absent the tier default holds: Tier 1 Acts, Tier 2 Reports. A verb moves only through a ratified board answer, never by the skill's own hand (the return session, below). A verb line that does not read as one of the three words does not run: it lands in Your decisions until it is fixed.

An Acts item still parks its judgment forks. It does the safe part, puts the fork in Your decisions with what you need to rule and carries on with the rest.

**The site lane keeps its own three words: propose, auto-PR, auto-merge.** It applies only when your system maintains external repos. Every site-fix class enters at propose. The build-verified pull request is the floor of every rung; only the merge click climbs away. The class registry starts empty.

### Bundles

The menu is grouped into bundles, each a set of items that read the same surface. Two bundles run per run: any bundle that has never run first, then the bundle with the oldest date in `bundle_state`. Each comes round every other run with four bundles. A bundle's items run when their bundle runs and carry no window of their own. Each bundle's Reports items go to one read-only worker with the bundle as its brief; its Acts items run on the orchestrator. Standalone items keep their own eligibility and sit outside every bundle.

---

## Starter Menu

These items ship with the skill and cover hygiene that applies whatever your system contains. Where your system lacks the surface an item reads, the item skips itself and says so in the run entry.

### Standalone (own eligibility)

**T1-1: Reference integrity re-sweep.** Verb: Acts.
Walk your active containers and check internal references (wikilinks, file paths, imports). For each broken reference whose target exists at a slightly different path (renamed, moved, suffix added), fix the reference in place. Skip references whose target exists nowhere. Surface those counts in the run entry.
Eligibility: not run in 7+ days.

**T1-2: Index regeneration.** Verb: Acts.
Run any index-generation scripts present in your scripts directory. Confirm the regenerated index shows the correct total count. Sweep index frontmatter fields for references pointing at paths that no longer exist and update each to the current path. Frontmatter fields only, never prose mentions (prose is intentional history).
Eligibility: condition-based. Eligible whenever an artifact was added, archived or had its status change since the last index build.

**T1-5: Index completeness sweep.** Verb: Acts.
Glob your codices or reference files. For each with an active status marker, check whether it appears in the master index. Add each absent one to the correct category section. Skip files intentionally held out of the index. Park an ambiguous placement as a fork; add the unambiguous ones.
Eligibility: condition-based. Eligible whenever an active reference file is absent from the index.

**T1-6: Superseded-artifact sweep.** Verb: Acts.
Grep active containers for files marked `status: superseded` or `status: retired` that still sit outside your archive. For each with an explicit superseded-by pointer or clear archival destination, archive it, run the reference-repoint sweep (grep for the old path and repoint active references to the canonical superseder, not the archive) and regenerate any affected index. Park only a superseded file with no destination pointer.
Eligibility: condition-based. Eligible whenever a superseded or retired file sits in an active container.

**T1-7: Runtime log rotation.** Verb: Acts.
For each operational log over its line cap (default 2000 lines), truncate to the last N lines. This is maintenance of a transient append log, not content deletion. List stale operational files (30+ days old, not active state files) as removal candidates in Your decisions. Never delete them: file deletion is the Permanent Floor. Name literal filenames, never ranges or shorthand.
Eligibility: condition-based. Eligible whenever a named operational log exceeds its line cap.

**T2-1: Inbox triage sweep.** Verb: Acts.
Walk your inbox. For each unrouted item, classify it against your routing heuristics: route a safely routable item with a file move, then run the reference-repoint sweep for the old path. A hold item (conflicting heuristics, real judgment, a durable-role decision) goes to Your decisions. The hold set stays narrow by design.
Eligibility: condition-based. Eligible whenever the inbox holds unrouted items.

**T2-8: Breadcrumb propagation and stale-reference sweep.** Verb: Reports.
Gather changed governance artifacts from recent version history (last 14 days). For each, grep the system for inbound references and documents that enumerate the same subject, and check whether they reflect the change or carry a now-stale claim. Check version history before calling a mismatch drift: mismatches often have intentional history. Propose each reconciliation; do not apply it.
Eligibility: not run in 14+ days.

### B1: Skills

**T1-8: Skill mandatory-sections completeness sweep.** Verb: Acts.
Glob all skill files. Check each for the sections your system calls mandatory: Purpose or Trigger, When to Use, Steps or Behavior, Constraints, Refinements. Append an empty Refinements stub where only that section is missing. A skill missing Constraints, When to Use or Steps goes to Your decisions: composing those sections is authoring, not a stub.

**T2-6: Skill cross-reference health.** Verb: Reports.
Walk all skill files. Extract every internal link, check each target and suggest the likely correct target for each broken one from an inventory of existing paths.

### B2: Memory

**T2-4: Memory file cross-reference health.** Verb: Reports.
Walk your AI interface's project memory directory. Check every internal link against the directory, resolving by each memory's own name or slug as well as its filename. Suggest the likely correct target for each broken one, verified against live state before reporting.

**T2-7: Memory compression candidate report.** Verb: Reports.
Read your memory index and walk each linked memory body. List compression candidates: entries stale, redundant or superseded by later refinements, prioritized.

### B3: Integrity

**T2-5: Reference orphan and inbound-density report.** Verb: Reports.
For each codex or reference file in your governance layer, count inbound references across the system. Flag every file under 5 inbound references as a low-pollination candidate, sorted ascending.

**T2-10: YAML frontmatter validity scan.** Verb: Reports.
Walk every file carrying YAML frontmatter and parse each block. An unquoted colon inside a value (commonly a title or description) silently breaks the whole properties block and defeats every frontmatter-based check for that file. Report each file that fails, with the line at fault.

**T2-11: MCP tool-description integrity sweep.** Verb: Reports.
Hash the descriptions of your active MCP tool schemas and diff against the prior hash. A description that changes without a version bump is the signature of a supply-chain rug-pull on a trust boundary you rely on. Report any drift.

### B4: Drafts and links

**T2-2: Stale draft surface.** Verb: Reports.
Walk your drafts directory. Classify each draft older than 30 days as ready-to-publish, event-gated or abandoned, per content type.

**T2-3: External link rot scan.** Verb: Reports.
Sweep outbound URLs in published articles or notes. Fetch each (HEAD or short GET) and flag any 4xx or 5xx. Skip URLs behind auth, payment walls or known anti-bot surfaces.

**T2-9: Style-guide conformance sweep.** Verb: Reports.
Durable canonical content only: reference docs, protocols, product pages. Skip in-progress drafts and shipped ephemera; expression quality on live drafts belongs at drafting time. Check against your style guide's stated rules. Skip entirely if no style guide exists.

### Retired

- **T1-3: Anti-AI sweep on draft articles.** Retired in 2.0. The edit pass belongs at drafting time, run while a piece is being written. A background sweep over sitting or published drafts spends capacity on finished work and touches your in-progress drafts without your hand on them.
- **T1-4: Memory file slug normalization.** Retired in 2.0. Its premise was inverted for current memory systems: filenames may use underscores while the canonical link form is the memory's own kebab-case name. Running it rewrites correct links into ones that match nothing. T2-4 owns memory-link health, read-only.

A retired ID stays listed so every ID in your run history resolves. Nothing retired runs.

---

## The Decision Board

The board is delivered inline, in full, as the run's closing message. The conversation is the surface and the run entry is the record. There is no third copy. Resolved decisions log to the run entry.

Four buckets, numbered the same on the board and in the run entry. Every heading renders, in order, even when empty ("None this run.").

1. **Done.** What the run did on its own, each line reversible through version control. A record to skim, not a decision. As autonomy widens this bucket grows and Your decisions shrinks.
2. **Your decisions.** Genuine judgment forks, anything touching the Floor, Proposes items that came due and the menu candidates, skill refinements and verb moves the agent recommends. You accept, decline or reshape each. Near empty on a clean run.
3. **Your hands.** Only what you alone can physically do: a connector toggle, a payment, a credential, a sign-in. Before an item lands here, ask whether the agent can do it on your word. If so, it is a decision in bucket 2 ("say go and I will do it"). A pull request merge is a decision too: you approve it in bucket 2 and the agent merges it.
4. **Plans to approve.** Anything bigger than one session, or any governance, memory or configuration class change, as a cliff-note asking "approve plan creation?". Only plans the agent recommends, each with the reason.

Patterns Noticed lives in the run entry only, never on the board.

**A menu is not judgment.** A Your-decisions entry earns its line by being genuinely yours, or by touching the Floor. A technical call the agent was competent to make belongs in Done, already made, in one line, past tense. Work lands in the session that found it. A run that ends in a queue of homework has moved the drift rather than met it.

**Every Your-decisions and Plans entry carries its proof.** At least the situation, the recommended move and the main alternative weighed, and one line `Verified: <check>, <result>` naming the live check its claim passed. A claim the session cannot check says so and names the instrument that could. Done lines and Your-hands items carry none.

**Size each entry by what the change can break.** That is a property of the diff, not a guess about what you already know.

- Routine and reversible (an index line, a slug, a routed note, a dead reference): one line, batched. Over-explaining safe work teaches skimming, and skimming waves through the one entry that mattered.
- Judgment (a pattern-setting choice, a nuanced routing call, an adoption): one paragraph. The situation, what doing nothing costs, the recommendation.
- Consequential (a credential, an outward send path, the Permanent Floor, a governance or configuration class change, this skill's own steps): the full ceremony. The stake in your terms. Three real options with doing nothing costed at its true price. The recommendation and what it gives up. The tell: how you would know it was wrong and what to watch. Reversibility: whether it can be undone and how fast.

If you say you do not understand, the decision waits and the agent explains it first in plain terms. A gate you cannot operate is not a gate.

---

## Steps

### Step 0: Due scan (every run, before the menu, outside the budget)

Read each due-dated client your system registers and surface only what is due, with the date and the recommended action. Two ship as defaults: a security audit whose last run was 25 or more days ago, and any active file whose `next_review` date has passed. This step never runs the maintenance it surfaces. A new client is one line here, no new machinery.

### Step 1: Load state

Read the run log. Parse the frontmatter: `run_counter`, `last_run`, `research_state`, `bundle_state`, `priority_flags`, the `menu_state` scorecards, `fix_checks` and `rulings`. If the log does not exist, halt and say: "Log file missing. Create the seed log per the SKILL.md and retry." A malformed log halts the run too: state integrity is foundational. When the log body passes about 1200 lines, apply the retention rule now, before the run writes. Then re-check the fix checks the last three runs recorded (the Learning Loop) and mark each fix held, regressed, reverted or unverifiable; the result goes in the run entry's Fix re-check line.

### Step 2: Select and announce

Build the due list from the menu and the log:

- **Condition-based items** run whenever their target is non-empty, never by timer.
- **Windowed items** run once their window has passed since `last_run`.
- **Flagged items.** Anything in `priority_flags` is due regardless of window, and lifts to the top.
- **The two bundles** are the never-run ones first, then the oldest in `bundle_state`.

Rank the standalone items (flagged first, then furthest past their window) and take them up to a budget of 8, plus the two bundles. An item name from you is the plan. A count honors the ranked list. "Full sweep" runs every due item and every bundle. A Proposes item does not run: it goes to Your decisions as "run it?".

Announce in one paragraph: "Running N items. Acts: [list]. Reports: [list]. Bundles: [ids]." It is the only message until close.

### Step 3: Acts items, in sequence

Run each Acts item one at a time on the orchestrator, so no two edits collide. A bundle's Acts items run here too. An editor worker, when one is warranted, runs alone with `model` set. When a genuine judgment fork appears, do the safe part, park the fork to Your decisions and continue. For each edit, note the cheapest check that would fail if the fix were undone (the broken text is absent, or the corrected text is present), so the next run can re-check it.

### Step 4: Reports items, in parallel

Dispatch one read-only worker per due bundle and one per standalone Reports item or small group. A read-only worker holds no write tools. Every worker prompt says: run single-context, do not spawn subagents. A worker that fans out returns narration about its children instead of findings, and per-item results get lost in the hop.

**Every scan returns, per item, a count, the instrument used and a reason if it did not run.** A quiet monitor is a claim of health. A worker that stops at its turn limit before returning every item is resumed once; an item still missing after that is logged as not run. Every finding carries its path, its class and the offending line verbatim, so it can be matched against your ledger of rulings. A finding that needs your ruling becomes a Your-decisions entry, never a decision buried in a report.

**Databases and send tools.** A run reads databases through a read-only connection only. It never applies migrations and never calls any scheduler or send tool that publishes.

### Step 5: Research rotation

One category per run, the least recently researched in `research_state`. One worker returns a self-ranked top 5, pointed in order at a live defect in the category (with the file and the check that shows it), a duplicate between existing menu items and only then a new item, which has to beat both. Fix each Acts-safe live defect now, in this run, and log it in Done. The rest go to Your decisions. The run entry records the yield and the fix rate. Set `research_state` for the category to today.

**Research categories:**

1. **R1: External practices and tooling.** What the broader agentic and AI field is doing that your system could adopt. Force external sources with URLs.
2. **R2: Vault hygiene and integrity.** References, orphans, frontmatter, naming conventions.
3. **R3: Infrastructure and scripts.** Script health, hooks, MCP loadout, automation gaps.
4. **R4: Discoverability and content.** AI discoverability, content freshness, manifest accuracy.
5. **R5: Skill library health.** Cross-references, redundancy, progressive disclosure, routing.
6. **R6: Governance coherence.** Consistency, protocol drift, status vocabulary, structural alignment.
7. **R7: Expression and voice integrity.** Writing-style adherence across artifacts.
8. **R8: Memory and knowledge architecture.** Memory health, inbound density, knowledge map currency.
9. **R9: Cost and routing efficiency.** Model routing adherence, token efficiency, routing discipline.

### Step 6: End-of-run reflection

One pass after Steps 3 to 5. Ask two questions of everything the run touched. Did running these items surface an improvement type worth adding to the menu? Did running the skill surface a defect, friction or gap in the skill itself (a worker timed out, an item was missed, the run entry wanted a field)? Sort the answers into menu candidates, each with a proposed verb and bundle, and skill refinements, each naming the friction and the proposed change. Both go to Your decisions, and only the ones the agent recommends.

### Step 7: Synthesize the board

Aggregate the due scan, the parked forks, the Reports findings, the research candidates and the reflection into buckets 2 to 4; Done comes from the run's own work. A finding you already ruled on is dropped and counted in the run entry, never raised again. Apply the recommendation bar: a candidate the agent would not recommend goes to Patterns Noticed as one line, or nowhere. Zero new candidates is a clean run, not a failure. An obvious placement gets one line (`Candidate: [name]. Recommended: [verb], [bundle]. Rationale: [one sentence]. Accept?`); an uncertain one gets three options, the recommendation and the tradeoff. A Plans cliff-note carries the problem, the scope, the rough phase shape and "approve plan creation?".

**The ground-truth gate runs here, on every entry.** A claim about the current state of an existing artifact is checked live with the cheapest definitive instrument (an `ls`, a grep, a scoped read) before it reaches the board, and the entry shows the check in its Verified line. The check belongs to the orchestrator, because a worker cannot ground-truth its own assertion. A forward proposal to build something absent needs no artifact check. A recommendation is also checked against work already underway (the owning skill, plan or project) and framed as layering onto it, superseding it or filling a gap in it. A Plans cliff-note gets the same check, because you approve plan creation on its premise.

### Step 8: Write the log entry

Append the run entry at the top of the log body: run number, items attempted and completed, bundles run, the research yield, the count dropped by the ledger, then the board in full under the same four headings, then Patterns Noticed, the reports with no findings and any errors. Update the frontmatter. For every item that ran, write its scorecard: `last_run` today, `runs` plus one, `findings` plus what it surfaced, `empty_streak` reset to 0 on a finding or plus one on none. Record this run's fix checks. Set `bundle_state` to today for each bundle run, add one to `run_counter`, set `last_run` and remove consumed `priority_flags`. An item with three empty runs in a row, or whose rulings run more than half noise, goes to Your decisions as a retire or merge proposal.

### Step 9: Commit, then present the board

The tool calls come first, so the board is the last thing you see.

1. **Commit by path, twice when Acts items edited files.** Stage each file the run touched by name, new files included, and commit those paths: the edited files first, then write that commit into this run's fix checks and commit the log. A fix check left with no commit reads unverifiable at the next re-check. Never add everything: sibling sessions may hold uncommitted work in the same tree. A run never edits its own skill files; that is the return session's work.
2. **Check the board before sending it.** Four headings in order (Done, Your decisions, Your hands, Plans to approve), an empty one saying "None this run.", and a Verified line on every Your-decisions and Plans entry. If your interface runs hooks, a stop hook can hold this shape for you. Each Your-decisions and Plans entry is a numbered line, its options sit under it as bullets and never as numbers, and it carries one Verified line. A Done line reads `[Item ID]: [outcome]`. A Your-hands item names the action, why only those hands can do it and the fastest route.
3. **Render the whole board as the closing message.** Every entry in full with its recommendation and its Verified line, never a count, a digest or a link. The test: a reader who opens no file can read and answer the whole board from the message alone. Pointing you at a file in place of the board is the failure this step exists to prevent. A run that halted before its board says "No board this run".
4. **End the message** with one line: "Log updated. Answer any item inline and I will run the return session."

---

## The Return Session and the Verb Moves (operator-triggered)

Your board answers encode forward. This is the learning loop. The skill never modifies its own SKILL.md, menu, verbs or posture on its own. Every move below is an explicit, operator-triggered edit cycle.

**The self-edit rule.** An edit to this skill's own files follows three rules, every time. Show the diff inline before committing it. Commit the skill's files in a commit of their own, named as a self-edit. Never run a procedure from a section marked proposed: your yes moves the verb first, and the procedure runs from its ratified place after that.

**Scorecards first.** For each finding you answered, update its item's scorecard: `accepted` plus one when you took it, `declined` plus one when you turned it down on its merits, `noise` plus one when you called it not worth surfacing. Then add each finding you did not take to `rulings` in the log frontmatter, so it never returns: its path, item, the offending line, where it was ruled and one disposition. `accepted-as-is` (right as it stands) and `false-positive` (noise) suppress for good. `rule-needs-fixing` suppresses the finding and returns as a skill refinement on the board until the item's rule changes. `deferred` carries an `until` date and returns after it, so "not now" never silences a defect for good.

**A ruled fork (implemented now).** Apply the decision to the parked work. A "say go" entry you answer with go is done now. If the answer carries a forward rule, encode it in the item it governs. A rule that turns a recurring fork into a deterministic step is the recursion working. Record the decision in the run entry where the fork was parked.

**An accepted menu candidate (woven in).** Add the item to its bundle with execution spec, eligibility rule, output and a `Verb:` line. Seed it in `menu_state` as `null`, meaning never run, so a weave date never reads as a run. Record the promotion in the run entry where it surfaced.

**An accepted skill refinement.** Edit the skill under the self-edit rule and note it in Refinements with the date and source run.

**Your hands.** When you say you did it, verify it landed with the instrument that can see it. "You said so" is not the check. When you say go instead, the agent does it. An item still open at the session's end gets one line under the run entry, `Still open: [item]`, so the next session resurfaces it.

**An approved plan (drafted, run later).** Draft the full plan from the cliff-note at `status: proposed`. Creation is authorized; execution runs in its own session. Ground-truth the premise at drafting time: days may have passed, and this is the last gate before the plan calcifies. A premise that fails here kills the candidate, and the agent tells you so rather than drafting around a false claim. Note the spawned plan in the run entry and link it.

### A verb move

An item moves from Proposes to Reports or Acts, or a site-lane class from propose to auto-PR to auto-merge, only through a ratified decision. Authority widens from proven workflows, never from projection. To execute a move, edit the item's `Verb:` line and record the item, the old and new verb, the forward rule and the Flywheel check result in the run entry.

Every move passes the **Flywheel Three Laws** check: does it smooth a handoff, ease the next rotation and raise real output? The safety guard sits in the Permanent Floor, not here. A move that would touch an outward surface, delete, move a canonical file or self-edit fails regardless. Governance, memory and configuration changes never move into execution by this route: they go to Plans to approve.

### The Learning Loop

- Keep a ledger of rulings in the run log. A finding already ruled on never returns to the board.
- A scan that cannot be shown to catch a planted defect reports "unverified", not "clean".
- At each run start, re-check the previous run's fixes. Mark each held, regressed, reverted or unverifiable.
- A regressed fix is re-landed. A reverted fix goes to you, because a revert is a ruling. An unverifiable one goes to Your decisions with its reason (a vacuous check, a file moved or gone, a commit no longer in history).

---

## Coming from 1.x

If you installed any 1.x version, your log and board still work. Here is what each piece means now.

- **`auto_execute_threshold` and the autonomy levels.** Retired. The verb is the authority now. Map each item once, in a return session, by what it did under your threshold. An item at or below the threshold ran: it takes its tier default (Tier 1 Acts, Tier 2 Reports), and a Level 2 item's habit of parking its forks is now what every Acts item does. An item above the threshold was parked whole: it becomes Proposes. With the starting threshold of 1, Level 1 items keep running and Level 2 and Level 3 items become Proposes until you ratify a move. Write the mapping in a run entry. The skill ignores the threshold line if it stays, so removing it is housekeeping rather than a requirement.
- **The board file.** Nothing writes to it any more. Carry its open decisions into your next return session or answer them there. Keep the file as history or archive it yourself. The skill never removes it, because deletion is the Permanent Floor.
- **The bucket names.** Completed this run is now Done. Approvals and questions is now Your decisions. New menu candidates and autonomy moves fold into Your decisions. Proposed plans is now Plans to approve. The hands list is now its own heading, Your hands. Old run entries keep their old names: they are history.
- **`menu_state`.** A bare date still reads as `last_run`. Scorecards fill in from the next run. Add an empty `bundle_state` map; every bundle reads as never run and the first two go first.
- **T1-3 and T1-4.** Both retired. If you ran T1-4 on a memory directory whose links use kebab-case names, run T2-4 once to check for links it rewrote.

---

## Log Structure

Single file at a path you choose.

**Retention rule.** When the log body exceeds about 1200 lines, compress the oldest full run entries into one-line summaries (run number, date, items executed, board outcome) until the body sits under 1000 lines, keeping the newest 8 runs in full. Frontmatter state is never compressed. The compression runs as part of the session; it needs no separate approval.

**Frontmatter:**

```yaml
---
status: active
run_counter: 0
last_run:
research_state:      # category ID to last-researched date; the least recent goes next
  R1:
  R2:
  R3:
  R4:
  R5:
  R6:
  R7:
  R8:
  R9:
bundle_state:        # bundle ID to last-run date; never-run bundles go first, then the oldest
  B1:
  B2:
  B3:
  B4:
priority_flags: []   # item IDs you flagged to lift in Step 2
menu_state: {}       # one scorecard per item: {last_run, runs, findings, accepted, declined, noise, empty_streak}; null means never run
fix_checks: []       # one {run, item, file, commit, absent | present} per Acts edit, the last three runs only
rulings: []          # one {path, item, line, disposition, ruled, until} per finding you ruled on
---
```

**Body:** Reverse-chronological run entries, newest at the top. Each entry records the board in full, so the log is the board's only durable home.

---

## Constraints (the Hard Ceiling)

The ceiling is drawn by action type, not location. Destructive, voice-bound and outward-broadcast actions stay forbidden forever. Additive, reversible, build-verified correction opens as a gated lane that earns its way one proven class at a time.

### The Permanent Floor (never climbs)

No verb move, accepted candidate or forward rule breaches these. Ever.

- No change to copy, voice or content prose on any live surface. Outward words are voice-bound.
- No deletions of anything, anywhere in the system.
- No moves of canonical governance files: codices, your constitution or charter, protocols, canonical content. Those require your approval. Moving a `status: implemented` plan from the active directory to the archive is operational lifecycle closure, not a governance move: it stays inside the system, it is reversible, it deletes nothing and it changes no governance.
- No outward broadcasts. Email sends, social posts, anything that speaks to the world.
- No direct push to any main branch. Every external change goes through a build-verified pull request.
- No self-modification. The skill never edits its own menu, its verbs, this SKILL.md, your auto-memory file or your settings file on its own. Those move only after you ratify a board entry, in a return session that shows the diff first.

**Scope of the self-modification ban.** It covers this SKILL.md, any CLAUDE.md, reference or catalog file you keep beside it and any script that applies its rules. The deletion and write bans bind shell commands and every file type, not only the editor tool.

### The Graduated Lane (opens, earns its climb)

Two classes of action, both additive or corrective, never voice-bound, always reversible.

- **Read and route.** Reading reports and routing them into lanes. Fully safe.
- **Additive or corrective technical fixes to external repos**, executed as build-verified pull requests. Opens one proven class at a time, only after you authorize it, through propose, auto-PR and auto-merge.

Read a repo's default branch before opening a pull request. Never assume it is called main.

**Optional extension: external-surface triage.** If your system maintains external repos with issue tracking, add a triage to Step 0 that queries open monitor-filed issues, clusters them by type and priority and routes each into safe-now, fix-via-PR and judgment lanes. Close a monitor-filed issue only when the condition that filed it has cleared, with the evidence in the closing comment. A finding still true stays open, and the monitor comments on it rather than filing again. This extension stays off until you run external repos.

### Operational Constraints

- Operator-invoked only. The skill never auto-fires and never schedules itself.
- Acts items are additive edits or in-place corrections traceable through version control. Reports items are read-only.
- A candidate that would breach the Floor stays in Patterns Noticed and never reaches the board.
- An item that errors is logged in the run entry and skipped; the run continues.
- A missing or malformed log halts the run at Step 1.
- Stage and commit only the paths this run touched.

---

## External Orientation

> **Ambassador posture.** Primary strategy: fortify the system. Every action is reversible, every artifact is logged, every outward surface is gated. The log is the durable ledger of the skill's behavior over time.
> Secondary: observe before acting. Reports items and the research rotation are intelligence-gathering posture. Observe fully before recommending. Findings return to you. The skill never acts on its own observations beyond menu-bounded execution.
> External surfaces touched (read-only by default): outbound URLs for link-rot scans (HEAD or short GET only, no auth bypass) and, under the graduated lane, external repos as a write-via-PR surface (additive or corrective fixes only, never a direct push to a main branch, never a copy or voice change).

Two external write forms are gated:

- A pull request only. Read the repo's default branch first. Never push to it directly.
- An issue close only when the condition that filed the issue has cleared, with evidence in the closing comment.

---

## Model Routing

- The orchestrator runs at the tier you opened the session with. It owns the due scan, every ground-truth gate, synthesis, the board and every commit.
- Scan, research and editor workers run on Sonnet, with `model` set explicitly on every dispatch. Never silently inherit.
- Mechanical lookups and deterministic commands run on Haiku.
- No worker runs above the orchestrator's tier.

---

## Pairs With

**Session Closeout** is the natural companion: run Autonomous Improvement at the end of a session when you have capacity to spare, then run Session Closeout to seal the session. Together they make the close a net-positive rather than just a wrap.

**Pattern Harvest** and Autonomous Improvement work the same flywheel from different angles. Pattern Harvest extracts durable patterns from external sources; Autonomous Improvement extracts improvement candidates from your own system's drift. Both feed the decision board.

If Session Closeout isn't installed yet: [Install Session Closeout via Infinite Game OS](https://www.infinitegameos.io/skills/session-closeout).
If Pattern Harvest isn't installed yet: [Install Pattern Harvest via Infinite Game OS](https://www.infinitegameos.io/skills/pattern-harvest).

---

## Refinements

- v2.0: The execution-authority model rewritten. Three verbs (Acts, Reports, Proposes) replace the autonomy levels and the threshold, and a verb moves only through a ratified board answer. The board renders inline in the closing message under four headings (Done, Your decisions, Your hands, Plans to approve) with no backing file, and the run entry is its record. The menu runs two bundles per run. Per-item scorecards, retire proposals, the self-edit rule, the research yield and a pre-send board check added. T1-3 and T1-4 retired. A Make It Yours section and a Coming from 1.x section added.
- v1.2: Added sizing of board entries by blast radius, the menu-is-not-judgment test, the hands-list test and the answerable-without-opening-a-file closing board with a Verified line. Added literal filenames in the purge list, per-scan counts and instruments, the quiet-monitor rule, the Circuit Breaker for monitor-filed issues, read-only database access, the Learning Loop, the self-modification scope statement, path-scoped commits, default-branch reads before pull requests, one research category per run, corrected model routing and an External Orientation section.
