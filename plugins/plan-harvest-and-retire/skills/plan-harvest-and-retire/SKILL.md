---
name: plan-harvest-and-retire
description: Retire a stalled or indefinitely-deferred plan without losing its value. Candidate scan, harvest, distribute, sweep, archive and codify.
status: active
version: 1.0
---

# Plan Harvest and Retire Skill

Purpose: Retire a stalled or indefinitely-deferred Pending Plan without losing its value. The plan dies as an active queue item. Its value lives on in a durable home.
Trigger: Operator-invoked. Also fires when a candidate surfaces during a regular planning review pass.
Inputs: Target plan, or no target (run the candidate scan to find one). Per-plan archival consent before any move. Current durable homes: a deferred-items tracker, other active plans, your docs.
Outputs: A read-only candidate list (scan mode), or a retired plan: value distributed, references repointed, file archived, any meta-lesson codified.
Status: active

## Make It Yours

This skill assumes the Pending Plan object type already established by Pending Plan Implementation: a markdown note with frontmatter fields for status, scope and an activity log, tracked in a plans index. It also assumes a durable "deferred items tracker" as a landing zone for value that isn't ready to build yet, distinct from the active plan queue.

If you don't have a deferred-items tracker yet, the simplest version is a single markdown file with one entry per deferred idea: source, why it's deferred, the signal that would promote it back to active, and any context notes. Build that first. This skill needs somewhere for durable vision to land before it can retire a plan.

If your planning system lives in Linear, Jira or GitHub Issues, "retire" maps to closing the issue with a deferred label and copying the durable-vision pile into a linked tracker issue or wiki page rather than a markdown file. The read-scan-sort-distribute-sweep-archive sequence transfers regardless of where plans live.

---

## The Distinction This Skill Holds

A plan retires for value-plus-deferral, not staleness alone. A stale plan that still wants to be built is parked, not orphaned. A plan whose value is fully preservable elsewhere and whose build is gated on a far-off or undefined event is the retire candidate. The job is to move the value to a home where it survives and let the queue item go. Nothing of worth is lost. The queue gets lighter.

---

## Step 1: Candidate Scan

Lean by design. This is a periodic light sweep, not a backlog tool. Expect thin yield and keep the read cheap.

**Data source.** Read your plans index first, if you maintain one. Filter there before reading any plan body. Then grep only the shortlist bodies for deferral language. No new tooling required to run this skill.

**Scan sequence:**
1. Read the index. Shortlist plans where status is `proposed` (or your equivalent early-stage status) and the last-modified date is roughly 30 or more days stale.
2. Grep each shortlisted body for deferral or placeholder language: "long-horizon", "back-pocket", "deferred indefinitely", "parking lot", "placeholder", "not designed yet", "undesigned".
3. For each surviving candidate, confirm the value is preservable elsewhere and the build gate is far-off or undefined.

**Retire signal (needs the value-plus-deferral combination, not staleness alone):**
- Status is `proposed` (or equivalent) and untouched for roughly 30 days
- Body or activity log carries deferral or placeholder language
- Core build gated on a far-off or undefined event, not a near dated gate
- Value is preservable elsewhere (a tracker entry, another plan, a doc)

**Anti-signal (not a candidate, leave it parked):**
- A small concrete build waiting its turn in the queue
- A plan with a near dated activation gate (parked on purpose, not orphaned)
- A plan already in an approved or ready-for-execution state

**Output.** A read-only candidate list: plan, signals matched, suggested durable home. No archival without per-plan consent. Present and stop. The operator selects which candidates proceed to Step 2.

---

## Step 2: Sort the Contents Into Three Piles

For a confirmed candidate, read the full body once and sort everything of value into three piles:

1. **Implementable-now slivers.** Small concrete pieces that could ship on their own, detached from the deferred whole.
2. **Durable vision or architecture.** The long-horizon shape worth preserving even though the build waits.
3. **Cross-plan breadcrumbs.** Notes, findings and decisions that belong in another active plan's context.

This is judgment work. Read the plan for what it actually carries, not what its title implies.

---

## Step 3: Distribute Each Pile to Its Durable Home

- **Implementable-now slivers** become their own focused plan, or fold into an existing one, only when the operator wants them active. Otherwise they ride along with the vision in the tracker.
- **Durable vision or architecture** goes to your deferred-items tracker as a new entry with source, deferred reason, promotion signal and context notes. The promotion signal is the load-bearing field. It names the dated or event-based trigger that would resurrect the vision as an active plan.
- **Cross-plan breadcrumbs** get appended to the owning plan's body or activity log, so the context lands where the next session on that plan will see it. This pairs directly with the `#decision` quick entry tag from Pending Plan Implementation, if you're using that convention.

Every pile lands somewhere before the plan archives. A pile with no home is a blocker. Surface it rather than dropping it.

---

## Step 4: Sweep Inbound References and Repoint

Run a full grep across your docs for the retiring plan's path and title. Every active reference resolves to the durable home, not the archive path. History stays as history.

- Active notes and docs repoint to the tracker entry or the successor plan.
- Activity-log mentions and dated breadcrumbs stay as written. They are the record of what happened.
- The move and the sweep are one unit of work. The retirement is not complete until the grep has run and every active reference is reconciled.

---

## Step 5: Archive the Plan

1. **Move the plan file** to your archive location. If your repo has a hook that blocks a tracked rename of markdown files, use a plain file move instead of a version-control rename.
2. **Edit in place** after the move: set status to `retired`, set a `superseded-by` field pointing to the durable home (tracker entry, successor plan or doc), set the implementation state to `retired`.
3. **Add a decision log line** recording the retire, the durable home and the date.
4. **Regenerate your plans index** if you maintain one. Many setups do this automatically on write; if yours doesn't, do it by hand.
5. **Confirm no duplicate.** Check that the active copy is gone and the archive is the single surviving record.

Per-plan consent is required before this step runs. One plan at a time.

---

## Step 6: Codify Any Meta-Lesson

When the retire surfaces a rule worth keeping, land it canonically. Not every retire produces a rule. Most do not. When one does, the canonical home is a doc, a protocol or your team's conventions file, never a passing comment. Codifying a standing rule requires the same sign-off your team already uses for governance changes.

---

## Approval Gates

- **Scan output is read-only.** Present candidates and stop. No archival without per-plan consent.
- **Per-plan consent** before any single archival.
- **Reference sweep** is mandatory before the retirement is called complete.
- **Operator sign-off** for any standing rule codified in Step 6.
- **No deletion.** This skill distributes value then archives. It never deletes a plan outright.

---

## Constraints

- Lean scan. Index read plus targeted grep. Never a full-corpus body scan or a new subsystem.
- One plan at a time at the harvest stage. The scan can list many. The harvest works one.
- Value distributes before the plan archives. No pile left without a home.
- Retire for value-plus-deferral, never staleness alone.
- A plan parked on a near dated gate is left alone.

---

## Cadence

Operator-invoked by default. The candidate scan can surface as a one-line lens inside your weekly review or a periodic tooling-and-process check, whenever you want a light periodic surface rather than a standing cadence. The scan stays lean wherever it fires.

---

## Model Routing

Default model per step. Set `model` explicitly on every subagent dispatch. Never silently inherit the orchestrator's model.

| Step | Default model | Rationale |
|---|---|---|
| 1. Candidate scan (index read, stale filter, deferral grep) | Haiku | Mechanical frontmatter and log read against a fixed signal set; no judgment |
| 1. Candidate confirmation (value-preservable, gate far-off) | Sonnet | Light judgment on whether a shortlisted plan truly qualifies |
| 2. Sort contents into three piles | Opus | Reads the plan for what it carries; judgment on value and placement |
| 3. Distribute to durable homes | Opus | Tracker-entry authoring, promotion-signal design, cross-plan placement |
| 4. Reference sweep and repoint | Haiku | Mechanical grep; Sonnet for ambiguous repoint calls |
| 5. Archive (file move, frontmatter edit, decision line) | Haiku | Deterministic file move and scoped frontmatter edits after consent |
| 6. Codify meta-lesson | Opus | Approval-gated governance prose; operator-facing sign-off |

---

## Planning Mode Rule

Status is active. Execution is authorized. Operator invocation required. Do not self-invoke. The scan is read-only and may run freely. Any archival waits on per-plan consent.

---

## Pairs With

**Source Harvest** is the gateway skill for systematic pattern extraction from external repos and tools. Many users adopt Source Harvest first, then layer additional skills like this one on top.

**Pending Plan Implementation** owns the plan object this skill retires. This skill is the closing bookend: Plan Challenger stress-tests a plan before it builds, Pending Plan Implementation executes it, and this skill retires it cleanly if it stalls instead of leaving it to rot in the queue.

**Plan Challenger** is the opening bookend. Challenge a plan before building it; harvest and retire it if the build never happens.

If Source Harvest isn't installed yet: [Install Source Harvest via IGOS](https://www.infinitegameos.io/skills/source-harvest).
If Pending Plan Implementation isn't installed yet: [Install Pending Plan Implementation via IGOS](https://www.infinitegameos.io/skills/pending-plan-implementation).
If Plan Challenger isn't installed yet: [Install Plan Challenger via IGOS](https://www.infinitegameos.io/skills/plan-challenger).

## Refinements

*(Empty. Populated when execution mistakes occur during sessions.)*
