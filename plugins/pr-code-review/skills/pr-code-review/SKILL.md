---
name: pr-code-review
description: Automated pull request review for your repos. Five parallel agents, confidence scoring, convention-file compliance, and GitHub comment posting.
status: active
version: 1.1
---

# PR Code Review Skill

Purpose: Run an automated code review on any open PR in one of your repos before it merges. Five specialized agents analyze the diff from independent angles. Each finding is anchored for confidence, merged, gated and checked by an independent validator. Only high-confidence issues post to GitHub as a review comment.
Trigger: The operator invokes "PR Code Review" (or `/pr-review`) on a PR branch in a repo with open PRs.
Inputs: PR number or current branch (defaults to current branch if not specified).
Outputs: GitHub PR comment with numbered issues and full SHA links, or a no-issues confirmation.
Status: active

## Make It Yours

This skill assumes a convention file at the repo root, typically CLAUDE.md, but README.md, CONTRIBUTING.md or a .cursorrules file works the same way. Agent 1 (Convention Compliance) reads whatever convention file your repo uses and checks the diff against it.

If your team has mandatory standards that live in a separate document (a design system reference, an API style guide, a security checklist), name that document explicitly in Agent 1's brief so the lens checks against it too. If your convention file defines markup or content hygiene rules (title length limits, alt text requirements, heading structure), spot-check changed pages against those rules directly rather than relying on a general read.

The five-agent structure and the confidence anchoring, gate and validator pass transfer to any repo. The specific lenses in Step 4 are a starting set, not a fixed list. Add or swap a lens for what your codebase actually needs: accessibility, i18n, a specific framework's anti-patterns, a compliance requirement unique to your domain.

## Relationship to a Deeper Codebase Audit

Keep this skill distinct from any deeper periodic audit your team runs (a scheduled architecture review, a full-codebase security pass). This skill is the lightweight per-PR gate before a merge: scoped to the diff, automated, runs every time. A deeper audit is manual, multi-phase and infrastructure-wide. One is a merge guard. The other is a scheduled structural review. Don't collapse them into one process.

---

## Tool Scope

This skill uses `gh` CLI for all GitHub interaction. Allowed tools are scoped to:

```
gh pr view, gh pr diff, gh pr list, gh pr comment
gh issue view, gh issue list, gh search
```

Do not use WebFetch for GitHub data. Use `gh` only.

---

## Steps

### Step 1: Eligibility Check (Haiku)

Launch a Haiku agent to check whether the PR is eligible for review. Skip if any of the following are true:

- PR is closed
- PR is a draft
- PR is an automated PR (Dependabot, Renovate, or similar)
- PR is trivial and obviously safe (e.g., a single whitespace fix or README typo)
- A review comment from Claude already exists on this PR

If ineligible, halt and report why. Do not proceed.

### Step 2: Convention File Discovery (Haiku)

Launch a Haiku agent to return a list of file paths to relevant convention files in the repo:

- The root convention file (CLAUDE.md, README.md or equivalent, if one exists)
- Any convention files in directories whose files the PR modified

Return paths only, not file contents.

### Step 3: PR Summary (Haiku)

Launch a Haiku agent to view the PR and return:

- A one-paragraph summary of what the change does
- The list of files modified

### Step 4: Five-Lens Parallel Review (Sonnet x5)

Launch five Sonnet agents simultaneously. Each agent reads the PR diff and returns a list of issues with the reason each was flagged.

**Agent 1: Convention Compliance**
Read the convention files identified in Step 2. Check whether the changes comply. Note: a convention file is guidance for the coding agent as it writes code, so not all instructions apply during review. Focus on instructions that clearly govern the kind of change being made. If your convention file names mandatory per-page or per-module standards, spot-check changed files against those standards explicitly.

**Agent 2: Bug Scan (changes only)**
Read the file changes in the PR. Do a shallow scan for obvious bugs. Do not read extra context beyond the diff. Focus on large bugs. Avoid small issues and nitpicks. Ignore likely false positives.

**Agent 3: Git History Context**
Read the git blame and history of the files modified. Identify any bugs in light of that historical context, patterns that were intentional, decisions that have been made before, constraints that are structural.

**Agent 4: Prior PR Comment Review**
Read previous PRs that touched the same files. Check for comments on those PRs that may also apply to the current change.

**Agent 5: Code Comment Compliance**
Read code comments in the modified files. Check whether the changes comply with any guidance or constraints described in those comments.

### Step 5: Confidence Anchoring (Haiku, one per issue)

For each issue found in Step 4, launch a parallel Haiku agent. Give each agent the PR, the issue description, and the convention file list from Step 2.

Confidence is an **anchor**, not a score. Exactly one of five values. Each anchor carries a behavioral criterion the agent must honestly self-apply. A continuous 0-to-100 score invites false precision: "confidence 87" cannot be audited, reproduced or defended. Five anchors can be.

**Pass this rubric to each scoring agent verbatim:**

> Anchor this issue's confidence. Use **exactly one of 0, 25, 50, 75, 100**. No other value is valid.
>
> 0: Not confident. This is a false positive that does not stand up to light scrutiny, or a pre-existing issue this PR did not introduce.
>
> 25: Somewhat confident. Might be a real issue, might be a false positive. You could not verify it from the diff and the surrounding code alone.
>
> 50: Moderately confident. You verified this is a real issue, and it may be a nitpick, a narrow edge case or of minimal practical impact. Style preferences and subjective improvements land here.
>
> 75: Highly confident. You double-checked the diff and confirmed the issue will affect users, downstream callers or runtime behavior in normal usage. The bug, vulnerability or contract violation is clearly present and actionable.
>
> 100: Absolutely certain. The issue is verifiable from the code itself: a compile error, a type mismatch, a definitive logic bug, or an explicit convention file violation with a quotable rule. No interpretation required.
>
> **The quote-the-line gate.** Before you anchor at 75 or 100, quote the verbatim line that makes the issue true, with `file:line`, as your first evidence item. **If you cannot quote the motivating line, you may not claim 75 or above. Step down to 50.** This kills the most common false-positive class: asserting a bug exists without pointing at the code that proves it.
>
> For an issue flagged under a convention file instruction: quote the rule verbatim. If the convention file does not call out that issue specifically, anchor lower.
>
> Return the anchor value, the `file:line` quote (or an explicit statement that you could not produce one) and one sentence of reasoning.

### Step 5b: Merge and Gate

1. **Enforce the quote gate mechanically.** Any issue arriving at anchor 75 or 100 without a verbatim `file:line` quote is demoted to 50. The reviewer's self-report does not override the missing evidence.
2. **Corroboration promotion.** When two independent Step 4 lenses flag the same issue, promote it one anchor step (50 becomes 75, 75 becomes 100). Two carve-outs:
   - Promotion never bypasses the quote gate. Two un-quoted findings must not combine into a quote-free 75. Agreement corroborates that an issue is real; the quoted line is what licenses high confidence.
   - Agreement between lenses that share a model tier is weaker evidence than it looks. Note it, and do not treat same-model agreement as independent verification. Self-agreement dressed as consensus is not evidence.

### Step 5c: Validator Pass (Sonnet, one per surviving issue)

Every issue that survives Step 5b gets its own fresh validator subagent. **One per issue, never batched.** A single validator looking at all issues together pattern-matches across them and recreates the reviewer bias this pass exists to remove.

**Pass this to each validator verbatim:**

> You have no commitment to the original finding. If it is wrong, say so. False positives are common. Do not feel pressure to confirm.
>
> Answer three questions against the actual code:
> 1. **Is the issue real in the code as written?** Check for an existing guard, null check or validation the reviewer missed. Check for a misread type or signature. Check whether the pattern is intentional (comments, parallel handlers, project convention).
> 2. **Did THIS diff introduce it?** Use git blame against the reviewed tree. A pre-existing, undisturbed line fails validation regardless of whether the underlying claim is true.
> 3. **Is it not already handled elsewhere?** Check callers, middleware, framework defaults and parallel handlers.
>
> Conservative bias is preferred. When in doubt, reject.
>
> Return exactly: `{"validated": true|false, "reason": "<one sentence>"}`

A `validated: false` verdict drops the issue. **Record the reason in the run summary so the loss is auditable rather than silent.**

If the validator dispatch itself fails (timeout, malformed return), that is infrastructure failure, not a rejection. Keep anchor-100 issues and mark them degraded; drop the rest conservatively.

### Step 6: Filter

Post issues at **anchor 75 or 100** that survived the validator pass.

One exception: an issue that would be critical if real (security, data loss, credential exposure, a hard-boundary violation your governance treats as non-negotiable) surfaces at anchor 50, flagged as unverified. A critical-but-uncertain issue is worse to lose than to over-report.

Suppress everything else.

If no issues remain after filtering, proceed to Step 7. Do not post a comment yet.

### Step 7: Eligibility Re-check (Haiku)

Repeat the eligibility check from Step 1. The PR state may have changed while analysis was running. If the PR is now ineligible, halt without posting.

### Step 8: Post GitHub Comment (gh CLI)

If issues remain after filtering, post a PR comment using `gh pr comment`. Follow this format exactly:

---

### Code review

Found [N] issues:

1. [Brief description of issue] (convention file says "[exact quote]")

[Link to file and line: full SHA, line range with at least 1 line of context on each side]
https://github.com/[owner]/[repo]/blob/[full-sha]/[path/to/file]#L[start]-L[end]

2. [Brief description of issue] (bug due to [file and code snippet])

[Link]

---

If no issues passed the filter, post:

---

### Code review

No issues found. Checked for bugs and convention file compliance.

🤖 Generated with [Claude Code](https://claude.ai/code)

---

**Link format rules:**
- Full SHA required, not abbreviated
- Use `gh pr view --json headRefOid` to get the full SHA. Do not construct it from shell expansion
- Format: `https://github.com/[owner]/[repo]/blob/[full-sha]/[path]#L[start]-L[end]`
- Include at least 1 line of context before and after the flagged line

**Comment style:**
- Brief descriptions only
- No emojis in issue descriptions
- Cite and link every issue
- Add the Claude Code attribution footer

---

## False Positive Taxonomy

Do not flag any of the following categories. Pass this list to anchoring agents to reduce noise:

1. Pre-existing issues not introduced by this PR
2. Something that looks like a bug but is not actually a bug
3. Pedantic nitpicks a senior engineer would not call out
4. Issues a linter, typechecker, or compiler would catch (missing imports, type errors, formatting). CI handles these separately.
5. General code quality issues (test coverage, documentation, general security hygiene) unless explicitly required in the convention file
6. Issues called out in the convention file but explicitly silenced in the code via a lint ignore comment
7. Changes in functionality that are likely intentional or directly related to the broader change
8. Real issues on lines the PR did not modify
9. Style issues not explicitly mentioned in the convention file
10. Issues already discussed and resolved in previous PR comments
11. Issues that are only relevant if an unlikely edge case occurs with no supporting evidence it will

---

## Model Routing Summary

**Subagent dispatch:** set `model` explicitly per the table below. Never silently inherit the orchestrator's model.

| Step | Model | Reason |
|------|-------|--------|
| 1, 7 | Haiku | Lightweight eligibility gate |
| 2 | Haiku | File path listing only |
| 3 | Haiku | PR summary |
| 4 (x5) | Sonnet | Deep parallel analysis |
| 5 (x N issues) | Haiku | Anchoring against a fixed rubric |
| 5b | Orchestrator | Mechanical gate and merge, no dispatch |
| 5c (x N survivors) | Sonnet | Adversarial verification needs a real read of the code, not a rubric application. Haiku is too cheap for this step. A validator that rubber-stamps is worse than no validator. |
| 8 | Direct (gh CLI) | Comment posting |

---

## Constraints

- Do not build, run tests, or typecheck the app. CI handles these. Do not attempt them.
- Use `gh` CLI for all GitHub operations. Do not use WebFetch for GitHub data.
- Always get the full SHA via `gh pr view --json headRefOid`, never via shell variable expansion in the comment.
- Confidence is anchored to exactly one of 0, 25, 50, 75, 100. Any other value is invalid and gets re-anchored, never rounded.
- The actionable floor is anchor 75. Do not lower it without operator approval. The one carve-out is the critical-at-50 exception in Step 6.
- No finding posts at 75 or above without a verbatim `file:line` quote. This gate is not waivable.
- Every posted finding survived an independent validator pass.
- Post at most one review comment per PR run.
- If a technical error surfaces during the review run (MCP failure, gh CLI error, agent failure), run root-cause investigation before retrying. Do not layer workarounds on top of undiagnosed errors.

---

## Planning Mode Rule

Status is active. Execution is authorized on operator invocation. No pre-approval gate required beyond the Step 1 eligibility check.

---

## External Orientation

This skill operates under an ambassador posture: it posts comments to public repositories on your behalf. Primary: hold the quality bar. Only high-confidence findings post. A false positive on a public PR costs credibility, not just review time. Secondary: every comment is a logged, citable artifact. The posted review is the trace, and it needs to be accurate. The anchor floor, the quote-the-line gate, the validator pass and the false positive taxonomy are all expressions of that boundary. None of them is optional.

---

## Pairs With

**Source Harvest** is the gateway skill for systematic pattern extraction from external repos and tools. Many users adopt Source Harvest first, then layer additional skills like this one on top.

**Systematic Debugging** is the discipline this skill defers to when something breaks mid-run. If a technical error surfaces during a review run, that skill's Phase 1 investigation runs before any retry attempt.

If Source Harvest isn't installed yet: [Install Source Harvest via IGOS](https://www.infinitegameos.io/skills/source-harvest).
If Systematic Debugging isn't installed yet: [Install Systematic Debugging via IGOS](https://www.infinitegameos.io/skills/systematic-debugging).

## Refinements

**2026-10-02. Version 1.1.** Adds anchored confidence, the quote-the-line gate and the validator pass.

An earlier rubric already produced anchored values (0, 25, 50, 75, 100), but the filter step thresholded at 80. Every anchor-75 finding, defined in the rubric itself as "highly confident, double-checked, will be hit in practice", was silently dropped. The skill had been quietly discarding its best-calibrated tier and reporting clean runs.

Three changes close it. Step 5 now anchors confidence to exactly one of five values, each with a behavioral criterion, and the floor moves to anchor 75. Step 5b merges and gates: any 75 or 100 without a verbatim `file:line` quote is demoted to 50, and two independent lenses flagging the same issue promote it one anchor step without ever bypassing the quote gate. Step 5c gives every surviving finding its own fresh Sonnet validator, told it has no commitment to the finding, answering three questions: is it real, did this diff introduce it, is it not handled elsewhere. Every rejection's reason is recorded so the loss is auditable. The Constraints now state the anchor rules.

The general lesson is false precision. A threshold set against a continuous scale, applied to output from an anchored scale, drops a whole tier and looks like it is working.
