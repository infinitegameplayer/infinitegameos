---
name: plan-challenger
description: Adversarial pre-build pass that challenges a plan before execution begins. Five angles, one verdict.
status: active
version: 1.2
---

# Plan Challenger Skill

Purpose: Surface the hard questions before a plan goes into execution. Not a veto. A mirror. Five structured angles against the plan, with a one-line verdict at the end.
Trigger: The operator invokes "Plan Challenger" with a plan name or plan content. Also surfaces as a one-line opt-in inside Pending Plan Implementation after the Pre-Execution Checklist.
Inputs: Plan content (name to locate, or paste directly).
Outputs: Five-angle challenge report, taste-decision flags for near-call questions, one-line verdict and the same report appended to the plan's own note as a dated section.
Status: active

## Steps

### Step 1: Load the Plan

Read the target plan. If a name was given, locate it in your plans directory. If content was pasted, use it directly.

Confirm the plan title and intent back to the operator in one sentence before proceeding.

### Step 2: Five-Angle Challenge

Before the angles, state the plan at its strongest in two lines. The challenge lands only against the best version of the plan.

Run each angle in sequence. Each angle produces one to three sharp observations or questions, not a list of everything that could go wrong. Surface what matters most.

**Angle 1: Strategic Fit**
Is this the right problem for this moment? What else is actively competing for this slot? Does this plan advance the operator's current primary arc, or does it branch sideways?

**Angle 2: Timing**
Why now? What changes if this is deferred two weeks? What external factors or internal pressures are driving the timing? Is the urgency real or inherited from habit?

**Angle 3: Baked-In Assumptions**
What must be true for this plan to succeed that has not been verified? Name the assumptions explicitly. Rate the risk of each: low (safe to proceed), medium (worth a quick check), high (should be resolved before execution begins).

**Angle 4: Architectural Risk**
What is the most likely way this plan breaks or creates debt? What part of the implementation is most fragile? What does success look like on paper but create pain in six months?

**Angle 5: Opportunity Cost**
What are we not doing by doing this? What capability, relationship or momentum is being paused or sacrificed to run this plan now?

### Step 3: Taste-Decision Surfacing

After the five angles, scan for near-call questions. Places where two framings are genuinely close, scope is borderline, or a reasonable case exists for a different direction. Surface these explicitly rather than collapsing to one answer.

Format: "Close call: [question]. Both [framing A] and [framing B] are defensible. The operator decides."

Surface only genuine near-calls. Do not manufacture uncertainty where clarity exists.

### Step 4: Verdict

One line. No hedging.

- **Proceed:** No blocking concerns. Execute as planned.
- **Revise [specific element]:** One thing to change before execution. Name it.
- **Pause [specific reason]:** An assumption or risk needs resolution first. Name it.

After the verdict, add one line: **What would change this verdict.**

The verdict is a recommendation, not a gate. The operator decides.

### Step 5: Write to the Plan

Append the five-angle report, flags and verdict to the plan's own note as a dated section, including the strongest-version lines and the "What would change this verdict" line. This step is mandatory. A Pause verdict must outlive the session.

## Confidence Anchoring

Give each finding from the five angles exactly one anchor: 0, 25, 50, 75 or 100. Any other value is re-anchored to the nearest anchor the evidence supports. This turns a list of objections into a weighted list where severity is explicit. Anchoring is required on high-stakes plans and optional on straightforward ones.

Use this rubric (pass verbatim to any sub-agent doing the anchoring):

> 0: Not confident at all. This concern does not hold up to scrutiny or is already addressed in the plan.
>
> 25: Somewhat confident. This might be a real concern but may also resolve on closer inspection. Worth noting, not blocking.
>
> 50: Moderately confident. This is a real concern but a minor one. It would not change the execution path.
>
> 75: Highly confident. This concern is very likely real and will affect the plan in practice. The existing approach is insufficient without addressing it.
>
> 100: Absolutely certain. This concern is definitely real, confirmed by evidence in the plan, and will block or break execution if unresolved.

Quote-the-line gate: before anchoring a finding at 75 or 100, quote the verbatim plan text that makes the objection true. If you cannot quote it, step down to 50.

Anchors 0 and 25 are notes, not challenges. Anchors 75 and 100 warrant a named action in the verdict.

## Model Routing

Dispatch the cheapest model that does the job well.

| Step | Default model | Rationale |
|---|---|---|
| Step 1: Load the plan | Haiku | File read and one-sentence intent confirmation; no judgment required |
| Step 2: Five-angle challenge | Opus | Adversarial architectural judgment across five distinct lenses; depth over breadth demands the strongest model |
| Step 3: Taste-decision surfacing | Opus | Identifying genuine near-calls requires nuanced judgment; false certainty here harms decision quality |
| Step 4: Verdict | Opus | One-line verdict is an operator-facing judgment call; precision and accountability make Opus the right tier |
| Confidence anchoring | Sonnet | Applying a rubric to anchor existing findings is structured evaluation, not fresh architectural judgment |
| Step 5: Write to the plan | Haiku | Appending the finished report to the plan note is a mechanical file write |

Set the model explicitly on every subagent dispatch. Never silently inherit the top tier.

## Constraints

- Does not implement anything.
- Does not rewrite the plan or propose rewrites. It appends its own dated section and changes nothing else.
- Does not replace the operator's judgment.
- Does not run in plan mode (this skill IS the challenge layer; it does not spawn another one).
- Depth over breadth. Three sharp observations beat ten generic ones.

## Pairs With

**Source Harvest** is the gateway skill for systematic pattern extraction from external repos and tools. Many users adopt Source Harvest first, then layer additional skills like this one on top.

**Pending Plan Implementation** executes a plan after challenge. Strong pairing for high-stakes work: challenge first, then implement.

Two-skill handoff protocol: after the Pre-Execution Checklist in Pending Plan Implementation, a one-line opt-in appears: "Challenge warranted?" If yes, invoke Plan Challenger with the plan content, work through findings, then return to Pending Plan Implementation Step 1. If no, proceed immediately.

If Source Harvest isn't installed yet: [Install Source Harvest via IGOS](https://www.infinitegameos.io/skills/source-harvest).
If Pending Plan Implementation isn't installed yet: [Install Pending Plan Implementation via IGOS](https://www.infinitegameos.io/skills/pending-plan-implementation).

## Refinements

- [v1.2] Added a steelman before the angles, a "What would change this verdict" line, a mandatory write-back to the plan's note and anchored confidence with a quote-the-line gate.
