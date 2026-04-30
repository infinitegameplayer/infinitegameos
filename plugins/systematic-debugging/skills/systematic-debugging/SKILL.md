---
name: systematic-debugging
description: Use when encountering any bug, unexpected behavior, test failure or system malfunction before proposing fixes. Use especially when under time pressure or when quick fixes have already failed.
status: active
version: 1.0
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

If you have not completed Phase 1, you can't propose fixes. Seeing symptoms is not understanding root cause.

## When to Use

Any technical issue: test failures, integration errors, hook failures, build failures, deployment issues, unexpected output, integration breakdowns.

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

3. **Check recent changes.** What changed that could cause this? Git diff, recent commits, new configurations, environment changes.

4. **Gather evidence in multi-component systems.** When the system has multiple layers (e.g., hook script calling a service script calling an external API), add diagnostic instrumentation at each boundary before proposing fixes:

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

4. **Understand dependencies.** What does this component need? What settings, environment variables or upstream conditions does it assume?

### Phase 3: Hypothesis and Testing

1. **Form a single hypothesis.** State clearly: "I think X is the root cause because Y." Be specific.

2. **Test minimally.** Make the smallest possible change to test the hypothesis. One variable at a time.

3. **Verify before continuing.** Did it work? Yes, proceed to Phase 4. No, form a new hypothesis. Do not add more fixes on top.

4. **When you do not know:** Say so. Ask. Research. Do not pretend.

### Phase 4: Implementation

Fix the root cause, not the symptom:

1. **Create a failing test case if applicable.** Simplest possible reproduction. Automated if there is a test framework, one-off script if not.

2. **Implement a single fix.** Address the identified root cause. One change. No "while I'm here" improvements.

3. **Verify the fix.** Does the test pass now? Are other things still working? Is the issue actually resolved?

4. **If the fix does not work:** Stop. Count how many fixes you have tried.
   - Fewer than 3: Return to Phase 1. Re-analyze with new information.
   - 3 or more: Stop and question the architecture (see below).

5. **If 3 or more fixes have failed, question the architecture.** Pattern signals:
   - Each fix reveals new coupling or shared state issues in a different place
   - Fixes require major structural changes to implement
   - Each fix creates new symptoms elsewhere

   Stop and raise with the operator before attempting another fix. This is not a failed hypothesis. This is a wrong architecture.

## Red Flags

If you catch yourself thinking any of these, stop and return to Phase 1:

- "Quick fix for now, investigate later"
- "Just try changing X and see if it works"
- "It is probably X, let me fix that"
- "Add multiple changes, run tests"
- "I do not fully understand but this might work"
- "One more fix attempt" (when already tried 2+)
- "Each fix reveals a new problem in a different place"

## Operator Signals You Are Off Track

Watch for these redirections from the operator:

- "Is that not happening?". The fix assumed something without verifying.
- "Will it show us...?". Evidence gathering should have happened.
- "Stop guessing.". Fixes are being proposed without understanding.
- Expressed frustration at stuck loops. The current approach is not working.

When you see these, stop. Return to Phase 1.

## Rationalization Table

| Excuse | Reality |
|--------|---------|
| Issue is simple, no process needed | Simple issues have root causes too. Process is fast for simple bugs. |
| Emergency, no time for process | Systematic debugging is faster than guess-and-check loops. |
| Just try this first, then investigate | First fix sets the pattern. Do it right from the start. |
| I see the problem, let me fix it | Seeing symptoms is not understanding root cause. |
| One more fix attempt (after 2+ failures) | 3 or more failures means architectural problem. Question the pattern. |
| Multiple fixes at once saves time | Can't isolate what worked. Creates new bugs. |

## Quick Reference

| Phase | Key Activities | Success Criteria |
|-------|---------------|-----------------|
| 1. Root Cause | Read errors, reproduce, check changes, gather evidence | Understand what and why |
| 2. Pattern | Find working examples, compare | Identify differences |
| 3. Hypothesis | Form theory, test minimally | Confirmed or new hypothesis |
| 4. Implementation | Fix root cause, verify | Issue resolved, no regressions |

## Constraints

- No fixes without completing Phase 1
- One hypothesis, one change at a time
- 3 failed fixes = architectural question to the operator, not a fourth fix
- Evidence gathering before proposing anything in multi-layer systems

## Pairs With

**Source Harvest** is the gateway skill for systematic pattern extraction from external repos and tools. Many users adopt Source Harvest first, then layer additional skills like this one on top.

If Source Harvest isn't installed yet: [Install Source Harvest via IGOS](https://www.infinitegameos.io/skills/source-harvest).

## Refinements

*(Empty. Populated when execution mistakes occur during sessions.)*
