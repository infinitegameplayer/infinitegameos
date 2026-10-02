---
name: systematic-debugging
description: Use when encountering any bug, unexpected behavior, test failure or system malfunction before proposing fixes. Use especially when under time pressure or when quick fixes have already failed.
status: active
version: 1.2
---

# Systematic Debugging

Purpose: Find root causes before attempting fixes. Applies to code bugs, integration failures, hook script errors, build failures and system malfunctions.
Trigger: Any technical issue. Error messages, unexpected behavior, failing tests, broken integrations, hooks not firing.
Inputs: Error message, symptom description, recent changes, system context.
Outputs: Root cause identification, single targeted fix, verification that the fix resolved the issue.
Status: active

## The Iron Law

```
NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST
```

If you have not completed Phase 1, you cannot propose fixes. Seeing symptoms is not understanding root cause.

## When to Use

Any technical issue: test failures, MCP errors, hook failures, build failures, deployment issues, unexpected output, integration breakdowns.

Use especially when:
- Under time pressure (emergencies make guessing tempting)
- A "quick fix" seems obvious
- Multiple fixes have already been tried
- The previous fix did not work
- You do not fully understand the issue

## The Four Phases

Complete each phase before proceeding to the next.

### Phase 1: Root Cause Investigation

Before attempting any fix:

1. **Read error messages carefully.** Stack traces, line numbers, error codes. They often contain the answer.

2. **Reproduce consistently.** Can you trigger it reliably? What are the exact steps? If not reproducible, gather more data before guessing.

3. **Check recent changes.** What changed that could cause this? Git diff, recent commits, new integration configurations, environment changes.

4. **Gather evidence in multi-component systems.** When the system has multiple layers (e.g., a hook script calling an ecosystem script calling an external API), add diagnostic instrumentation at each boundary before proposing fixes:

   For each component boundary:
   - Log what data enters the component
   - Log what data exits
   - Verify environment and config propagation at that layer
   - Check state at each boundary

   Run once to gather evidence showing where it breaks. Analyze the evidence. Then investigate the failing component specifically.

5. **Trace data flow.** Where does the bad value originate? What called this with the bad value? Keep tracing up until you find the source. Fix at source, not at symptom.

### Phase 2: Pattern Analysis

Find the pattern before fixing:

1. **Find working examples.** Locate similar working code or configuration in the same context.

2. **Compare against references.** If implementing a pattern, read the reference implementation completely. Not a skim. Every line.

3. **Identify differences.** What is different between working and broken? List every difference, however small.

4. **Understand dependencies.** What does this component need? What settings, environment variables, or upstream conditions does it assume?

### Phase 3: Hypothesis and Testing

0. **The bug-class checklist. Run this first, before deep tracing.** Thirty seconds spent eliminating a known class can save hours of speculative work. Ask whether the symptom fits any of these:

   Time and timezone (DST, epoch versus milliseconds, naive versus aware datetimes). Encoding and locale (mojibake, byte-versus-character off-by-one, BOM). Floating point (NaN propagation, precision loss). Integer overflow. Off-by-one and boundary conditions. Cache staleness (HTTP, CDN, memoization, service workers). Permissions and auth (works for one user, fails for another; dev auth differs from production). Dependency drift (lockfile versus manifest, a transitive update, a native module built against a different runtime). Path and case sensitivity (macOS is case-insensitive, Linux is not; separators differ on Windows). Concurrency and ordering (passes serially, fails in parallel). Stale build artifacts. Observer effect. TOCTOU (the check passed, then the state changed before the action ran).

1. **Assumption audit.** Before forming a hypothesis, list every "this must be true" belief the investigation rests on, and mark each one verified or assumed. Many wrong hypotheses are correct hypotheses tested against a wrong assumption.

2. **Form a single hypothesis.** State clearly: "I think X is the root cause because Y." Ground it in a concrete observation: a specific runtime value, a log line, a behavior delta. "X seems off" is not grounding.

3. **The causal chain gate.** State the full chain from trigger to symptom, step by step. **You may not proceed to Phase 4 until the chain has no gaps.** "Somehow X leads to Y" is a gap, not an explanation. If the chain cannot be completed, the root cause has not been found.

4. **Predictions for uncertain links.** Any uncertain link needs a prediction: something in a *different* code path or scenario that must also be true if the hypothesis is correct.

   A bad prediction restates the hypothesis and cannot be wrong if the hypothesis is right ("the user will be null when I log it"). A good prediction names something not yet looked at ("non-cached requests will NOT produce the null pointer, and the X-Cache header will be present"). If the chain is obvious (a missing import, a clear null reference), the chain explanation alone suffices and no prediction is needed.

5. **Test minimally.** Make the smallest possible change to test the hypothesis. One variable at a time.

6. **Verify before continuing.** Did it work? Yes, proceed to Phase 4. No, **explicitly invalidate the current hypothesis**: state what evidence ruled it out, then form a new one. Never retry variants of the same theory. Do not add more fixes on top.

7. **When you do not know:** Say so. Ask. Research. Do not pretend.

### Phase 4: Implementation

Fix the root cause, not the symptom:

1. **Create a failing test case if applicable.** Simplest possible reproduction. Automated if there is a test framework, one-off script if not.

2. **Implement a single fix.** Address the identified root cause. One change. No "while I'm here" improvements.

3. **Verify the fix.** Does the test pass now? Are other things still working? Is the issue actually resolved?

4. **If the fix does not work:** Stop. Count how many fixes you have tried.
   - Fewer than 3: Return to Phase 1. Re-analyze with new information.
   - 3 or more: Stop and question the architecture (see below).

5. **If 3 or more fixes have failed, question the architecture.** Stop and raise it with the operator before attempting another fix. This is not a failed hypothesis. This is a wrong architecture.

## Smart Escalation

After two or three exhausted hypotheses, stop trying harder and diagnose *why* you are stuck. The pattern names the problem.

| Pattern | Diagnosis | Next move |
|---|---|---|
| Hypotheses point to different subsystems | Architecture or design problem | Stop debugging. Raise the design question. |
| The evidence contradicts itself | Wrong mental model | Re-read the code with no assumptions carried in. |
| Works locally, fails in production or CI | Environment problem | The difference IS the investigation. Focus there. |
| The fix works but the prediction was wrong | Symptom patch, not root cause | Keep investigating. You got lucky, not right. |
| Each fix creates a new symptom elsewhere | Coupling or shared state | Architectural question to the operator. |

## Defense in Depth

Apply when invalid state reaching a vulnerable path caused the bug, and fixing one layer leaves other paths free to reintroduce it.

Trigger: the same pattern exists in three or more other files, OR the bug would have been catastrophic in production, OR the operation is dangerous regardless of caller.

Four layers. Pick what applies. Never all four by default.

| Layer | Purpose |
|---|---|
| 1. Entry validation | Reject invalid input at the boundary, before anything downstream sees it. |
| 2. Invariant check | Enforce a precondition that entry validation cannot express. |
| 3. Environment guard | Refuse a dangerous operation in the wrong context. |
| 4. Diagnostic breadcrumb | Capture forensic context before the risky operation runs. |

The common mistakes: duplicating the same check at every layer (each layer catches a *distinct* failure class), adding guards speculatively with no bug to justify them, and skipping layer 4. When layers 1 through 3 get bypassed, and eventually one will, the breadcrumb is what makes the next bug debuggable.

## Anti-Patterns

**Shotgun debugging.** Changing several things to see if it helps. Feels productive. Eliminates nothing. One hypothesis, one change, one test. Revert before trying the next.

**Confirmation bias.** Reading ambiguous evidence as support for the current theory. A maybe-relevant log line treated as proof. A passing test declared victory without checking it exercised the failure path. The defense is one question: **what evidence would DISPROVE this hypothesis?** If you cannot name any, you are justifying, not testing.

**It works now, move on.** The symptom stopped after a change and the why is unexplained. The test: can you explain the fix without using the word "somehow" or the phrase "I think"? If not, you have not fixed it. You have disturbed it.

**The heisenbug.** When instrumentation makes the bug disappear, that disappearance is diagnostic, not a fix. A fix that only works while the instrumentation is present *is itself the bug*.

**The bad instrument.** A weak probe returns a confident wrong answer and the check looks like it works. Guard against this directly: a media-analysis check that was fed a 1x1 test pixel that should be trivially rejected, but instead produced a plausible-sounding, filename-flavored answer from the model, which read as a working check. **A test that cannot fail informatively is not a test.**

## Red Flags

If you catch yourself thinking any of these, stop and return to Phase 1:

- "Quick fix for now, investigate later"
- "Just try changing X and see if it works"
- "It is probably X, let me fix that"
- "Add multiple changes, run tests"
- "I do not fully understand but this might work"
- "One more fix attempt" (when already tried 2+)
- "Each fix reveals a new problem in a different place"

And the thought-tells that a shortcut is coming:

- Proposing a fix before explaining the cause
- Reaching for a fourth attempt with no new information
- Certainty before reading the code ("I know what this is")
- **The word "just."** "It is probably just a..." is a minimizing tell, and it is almost always wrong.
- Treating an environmental difference as irrelevant. The difference is the investigation.

## Operator Signals You Are Off Track

Watch for these redirections from the operator:

- "Is that not happening?" means you assumed without verifying
- "Will it show us...?" means you should have added evidence gathering
- "Stop guessing" means you are proposing fixes without understanding
- Expressed frustration at stuck loops means your approach is not working

When you see these, stop. Return to Phase 1.

## Rationalization Table

| Excuse | Reality |
|--------|---------|
| Issue is simple, no process needed | Simple issues have root causes too. Process is fast for simple bugs. |
| Emergency, no time for process | Systematic debugging is faster than guess-and-check loops. |
| Just try this first, then investigate | First fix sets the pattern. Do it right from the start. |
| I see the problem, let me fix it | Seeing symptoms is not understanding root cause. |
| One more fix attempt (after 2+ failures) | 3 or more failures means architectural problem. Question the pattern. |
| Multiple fixes at once saves time | Cannot isolate what worked. Creates new bugs. |

## Quick Reference

| Phase | Key Activities | Success Criteria |
|-------|---------------|-----------------|
| 1. Root Cause | Read errors, reproduce, check changes, gather evidence | Understand what and why |
| 2. Pattern | Find working examples, compare | Identify differences |
| 3. Hypothesis | Form theory, test minimally | Confirmed or new hypothesis |
| 4. Implementation | Fix root cause, verify | Issue resolved, no regressions |

## Constraints

- No fixes without completing Phase 1
- No fix proposed until the causal chain is explainable with no gaps
- One hypothesis, one change at a time
- A failed hypothesis is explicitly invalidated before the next one is formed
- 3 failed fixes = architectural question to the operator, not a fourth fix
- Evidence gathering before proposing anything in multi-layer systems

## Model Routing

This skill is orchestrator-level investigation work. No fixed subagent dispatch. When a specific diagnostic step is purely mechanical (running a deterministic command, reading a known file path), a Haiku-tier call is appropriate. Phase 1 evidence gathering and Phase 2 pattern analysis involve enough judgment that Sonnet or above is the right default. Use the cheapest model that produces reliable output at each step.

## Pairs With

**Source Harvest** is the gateway skill for systematic pattern extraction from external repos and tools. Many users adopt Source Harvest first, then layer additional skills like this one on top.

If Source Harvest isn't installed yet: [Install Source Harvest via IGOS](https://www.infinitegameos.io/skills/source-harvest).

## Related

A bug worth the ceremony of this skill is usually a bug worth a learning. At close, ask whether the fix belongs in the repo's `docs/solutions/` corpus, if you keep one. The filter is recurrence: would a future agent in this repo change its behavior because it read this? Lean into capture when the pattern appears in three or more places or when the bug revealed a wrong assumption about a shared dependency. Skip it silently for a mechanical fix with no transferable lesson.

## Refinements

**2026-10-02. Version 1.2.** Adds the bug-class checklist, the assumption audit, the causal chain gate, predictions for uncertain links, explicit hypothesis invalidation, Smart Escalation, Defense in Depth and Anti-Patterns. The Iron Law was already correct. What it lacked was the technique to satisfy it and the vocabulary to catch itself failing.
