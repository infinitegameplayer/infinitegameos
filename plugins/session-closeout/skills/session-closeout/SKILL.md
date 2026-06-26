---
name: session-closeout
description: Use when wrapping up a session that made commits or governance changes. A fast three-action close: breadcrumb what you touched, refresh your handoff note, commit with a readable body.
status: active
version: 1.1
---

# Session Closeout

> This skill also ships inside the Sovereign Ecosystem template.

Purpose: Close a session fast, leave the breadcrumbs that future review actually uses, and never tax a working session for a record it does not need.

The durable trail already lives in three places: the git commit body (the backward record of what the session did), archived artifacts (plans, codices, their activity logs) and governance breadcrumbs annotated where each change happened. Your primer or handoff note carries the forward handoff. Closeout feeds those trails. It does not duplicate them.

Operators name their handoff surfaces their own way. "Primer" and "command surface" are what the Sovereign Ecosystem calls these. Your equivalent is whatever file your AI reads first at session start and whatever surface you scan to see what is live and in motion.

Trigger: a session that made commits or governance-level changes.
Inputs: what shipped, what got touched, what comes next.
Outputs: breadcrumbs in the artifacts touched, a refreshed handoff note, a light-touch update to your command surface, a commit with a readable body.

## The Close

Three actions. Target under 3 minutes. Every session runs this. There is no heavier tier.

### 1. Breadcrumbs wherever they belong

By close, most breadcrumbs are already laid as you worked. This is the final settle: capture what resolved late, plus the items that now warrant a breadcrumb in more than one place because the final shape is clear.

Write a one-line breadcrumb straight into every artifact this session directly touched or materially affected, in its own location. Plans, codices, dashboards, notes, memory files. Not plans only. The breadcrumb lands where the next reader will look for it.

- **Scope boundary.** Artifacts this session directly touched go in-session, where the context is fresh. Exhaustive hunting for second-order staleness in parallel documents is a separate batched task, not part of every close.
- No separate reconciliation-summary section. The breadcrumb in the artifact is the reconciliation.
- For a plan touched this session, the breadcrumb is an activity-log line, an applicability change, a partial-implementation note or an evidence link. Do not change plan status without approval.

### 2. Refresh the handoff note

Update your primer or handoff note. This is the canonical forward handoff, the first thing your AI reads at session start. Refresh it after the breadcrumbs land, so it reflects the freshly-updated state of what you touched.

- **Stale-blocker purge first.** For each parked item, check whether it references a plan now in your archive. If yes, the plan is implemented. Drop the item. Resolved blockers left in place resurface as false signals every session until caught.
- **Lead with a `## Session Summary` section, 5 lines max.** Write this first. Your AI context loader should inject this section at session start rather than the full handoff note body. The compact summary is what gets read under token pressure; the detail lives below it.
- Rewrite to the rolling horizon: **Most Alive Next Move**, **In Execution** (plans and work in motion, high signal), **Active Commitments** (dated actions within the near horizon), **Parked** (waiting on an external trigger or your decision), **Session Opener**.
- Do not carry forward current-state narrative or completed-this-session history. Those live in the commit body and the git history. Remove items that completed this session. Add new time-bound items that emerged.
- End with a **Session Opener** line. Content: the intended starting point for next session, written as a one-line action or question ("Continue Chapter 6 voice pass," "Decide on pricing tier before building the paywall"). If the next move is genuinely unknown, write "Intent to be determined at session start." This is the line that carries energy forward. It is not a summary of what happened.
- **Under a concurrent sibling, read before write.** If another session is active, re-read your handoff note immediately before editing so you build on the sibling's latest write rather than overwriting it.

**Then give your command surface its light touch.** Your command surface is the minimal live-signal glance, not the handoff. The handoff note carries the detail. The command surface stays short. Two touches only: drop anything this session resolved, and shift the headline (Most Alive Next Move) if the lead moved. If neither changed, leave it.

### 3. Commit with a readable body

**The commit body carries 2-3 human-readable sentences:** what shipped (SHA or URL if relevant), the key decision, what comes next. This body is the always-on, searchable backward record. The commit plus the handoff note plus the breadcrumbs are the record for an ordinary session. Weave a light touch of humor or a meta-awareness beat into the body when it fits.

No per-session narrative log is written. Git is the log. The commit body is the session record, and the handoff note is the forward handoff.

## Auto-commit (mandatory, concurrency-aware)

After the handoff note is refreshed, reconcile against any concurrent session, stage this session's work, commit with a readable body, and report. No ask. Push only if your vault has a configured remote and you have authorized push at closeout.

**a. Concurrency check (before staging).** A sibling session can leave uncommitted work in the tree. A blind `git add -A` sweeps it into this commit under the wrong message. Check first:

```bash
git -C "<your vault path>" log --oneline -8
git -C "<your vault path>" status --short
```

Compare current HEAD to the HEAD you saw at session start.

**If your concurrency check script fails or is unavailable:** fall back to the manual check above. Compare current HEAD to the HEAD at session start using `git log --oneline -8`, then run `git status --short` to see what is dirty. A script failure never blocks the commit. It only drops you to the manual check.

**b. Solo path (no sibling active and HEAD unchanged since start).** Use the convenient sweep, then unstage transient runtime files your setup generates:

```bash
git add -A
git reset HEAD -- <transient runtime files, e.g. editor workspace state, local settings>
```

**c. Concurrent path (a sibling is or was active, or HEAD moved).** Do not `git add -A`. Stage only the files this session created or edited, named explicitly. Files dirty in the tree that this session did not touch belong to the sibling. When in doubt whether a dirty file is yours, it is not.

```bash
git add "path/one.md" "path/two.md"   # this session's files only
```

**d. Commit only if something is staged.** The body is the readable 2-3 sentence summary:

```bash
git diff --cached --quiet || git commit -m "Session Closeout YYYY-MM-DD-X: <title>" -m "<2-3 readable sentences: what shipped, key decision, what's next>"
```

**Failure handling:** if the commit fails (pre-commit hook, signing), do not amend or bypass. Surface the failure, name the cause, let the operator decide.

**Closing line.** After the commit succeeds, conclude with one line: *Today's harvest is closed out. The next move queues.* Single line, no flourish.

## Reconciliation Escalation (rare, not a mode)

Reconciliation of what this session touched is action 1, inline, where freshness keeps it accurate. For a genuinely large session (6 or more plans touched) or when you say "full reconciliation," escalate: dispatch parallel workers, each independent, holding proposals for one approval gate.

- **Worker A: Plan Reconciliation.** Read your plan index as the pre-filter. Read only plans named in this session or marked touched recently. Draft breadcrumb updates. No status changes. Proposal-only.
- **Worker B: Inadvertent Completions Sweep.** Scan quests, experiments, intake for items this session completed or retired. Proposal-only.
- **Worker C: Inbox and Consult Closeout Sweep.** Process deferred activations, consults that produced downstream artifacts. Proposal-only.

This is an escalation tool on the shelf, not a standing choice every close.

## Plan Exit-Criteria Verification (conditional)

If this session advanced a plan, read the plan's exit-criteria block for that session and verify each criterion against actual evidence. Do not accept a self-reported "all criteria met." For each criterion, name the specific file, commit, script output or live test that verifies it. If a criterion can't be verified, flag it as pending and either address it now or move it to the next session's scope. This is the gate between "I think it landed" and "it is demonstrably landed."

## Enforcement Regression Gate

If this session changed a skill, a style rule, a hook or a system-level configuration file, run any available validation scripts before the commit. The test is simple: does the changed rule still evaluate correctly against a known-good input? A validation failure before commit is cheap. A broken rule discovered three sessions later is not.

This gate is conditional. It fires when a behavior-governing artifact changed. It does not fire on content-only sessions.

## Model Routing

Dispatch the cheapest model that does the job well. Before each delegated step, ask whether a smaller model would produce equivalent output.

| Work type | Model |
|---|---|
| Mechanical lookups, git status reads, file inventory | Haiku |
| Reconciliation workers, completions sweep, plan breadcrumb drafting | Sonnet |
| Architectural judgment, complex multi-plan reconciliation | Opus |

Set the model explicitly on every subagent dispatch. Never silently inherit the top tier.

---

## Pairs With

**Pending Plan Implementation** is the primary context where session closeout fires. Plan implementation advances the work. Closeout seals it.

**Source Harvest** frequently produces new skills or protocols worth recording in the commit body and handoff note. The two skills often run in the same session.

If Pending Plan Implementation isn't installed yet: [Install Pending Plan Implementation via Infinite Game OS](https://www.infinitegameos.io/skills/pending-plan-implementation).
If Source Harvest isn't installed yet: [Install Source Harvest via Infinite Game OS](https://www.infinitegameos.io/skills/source-harvest).

## Refinements

*(Empty. Populated when execution mistakes occur during sessions.)*
