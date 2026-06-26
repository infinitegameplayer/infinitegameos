---
name: jacket-meeting
description: Run a full multi-lens team meeting across all active jackets. Twelve-step flow from convene through close. The operator chairs, the knowledge-design lens synthesizes, each jacket prepares its perspective independently, and the session closes with a structured decision record.
version: 1.1
---

# Jacket Meeting

The Jacket Meeting is the all-lenses form of jacket-based advisory work. Where a Jacket Session is a 1:1 with one lens, the Jacket Meeting brings all your defined lenses into the same room at once.

Five perspectives meet. One lens synthesizes. You decide.

The meeting is a decision room, not a work session. Work routes out.

## When to Use

Run a Jacket Meeting when you need genuine cross-lens input on a question, when open threads from your recent 1:1 sessions need the whole room, or when a decision requires more perspectives than one lens can hold.

The default rhythm is weekly, after your 1:1 sessions and before a weekly review. It's time-elastic. The cadence serves the work, not the other way around.

## Steps

### Step 1: Convene

All active jackets in the room. You confirm your decision-density posture. Brief energy beat.

Each jacket gives a one or two sentence in-character introduction. This is a personality check and a calibration check at once. If a jacket's voice doesn't land in its own intro, the context isn't loaded right. Surface that before proceeding.

Loop-close: briefly review the prior meeting's commitments and their completion status before taking on new work. The first meeting has no prior, so skip this at the first run.

### Step 2: Your Direction and the Decision Contract

You name a center of gravity for the meeting, or explicitly keep it wide. The default is wide. Nimble, decided live, no pre-meeting prep required.

You also name the decision contract: how input will be used (consult, joint, or your call alone) and what must be true by the end of the meeting that isn't true now. This sets the room's expectation before the conversation opens.

### Step 3: Agenda Load

No blank-page meetings. The agenda is pre-built from the open threads each jacket's recent 1:1 capture flagged for the team meeting. Your knowledge-design lens assembles it before convening.

Each agenda item is tagged: information, discussion or decision. Drop information-only items not tied to the meeting's direction.

### Step 4: Per-Jacket Brief

Each jacket gives a short read on its agenda items. What it owns. What it needs from the room. Kept brief. The depth comes in the perspective pass.

### Step 5: Perspective Dispatch

**Pin the shared facts before the lenses go out.** Before each lens prepares its perspective, confirm the facts the whole room agrees on: what shipped, what the live numbers are, what's already approved and running. Pin these once and hand them to every lens. Divergence in perspective is the point of this step. Divergence in the starting facts is just noise.

**Have each lens prepare its perspective independently.** Each jacket develops its view in isolation from the others, on whatever that lens judges most pressing for the room. Not a shared question. Jacket-chosen focus, jacket-chosen angle.

Independent preparation is what makes the meeting worth running. When one mind considers five angles in one pass, the angles average toward each other and blur. Separate preparation keeps each lens uncontaminated. Five genuinely independent views produce a real meeting with real differences. The value of the meeting is proportional to how separate the perspectives were before they arrived.

**Two guardrails for every lens's preparation (mandatory):**

1. **Pin the design, not just the recent activity.** Each lens's view should include the standing approved specs for its domain, not only what happened this week. A lens looking at a live system should have that system's approved design in hand before it forms an opinion.
2. **State is not design.** Live data shows what has happened, never what was intended. Before naming a gap or proposing a build, confirm no approved spec already schedules that thing for a later step. An empty table at low usage is usually an early sequence, not a void.

When a meeting has an obvious shared object, all lenses may point at it. That's the topic at work, not a deviation.

### Step 6: Cross-Jacket Conversation

The lenses engage each other, informed by their independent views. Structured, not open popcorn discussion.

Run Open, Narrow, Close. A round-robin recap of each lens's view before open debate. Then the groan zone where tensions surface. Then narrowing toward options. Round-robin before open debate keeps the loudest view from anchoring the room.

### Step 7: Knowledge-Design Synthesis

Your knowledge-design lens holds the synthesizer seat. It's an integrator, not a decider.

It names alignments, tensions and trade-offs in plain language, using the room's own words. It describes what the room actually said before it recommends anything. It preserves visible dissent and tags what's still contested. It doesn't flatten real disagreement into a bland compromise.

Any jacket can record a minority report: principled disagreement carried into the meeting note without blocking the decision.

### Step 8: Options and Decision Points

The knowledge-design lens presents two to four coherent options incorporating the strongest arguments and constraints surfaced. Each option is lane-tagged and carries a recommendation with trade-off reasoning per the Three Solutions Rule.

- **Do-now.** Light, low-effort, cheaper to act on now than to defer. A one-line breadcrumb, a status flag, a routing entry, a small file update.
- **Plan-for-later.** Token-intensive, multi-step or needing build verification. Filed in your backlog or task tracker at the planning stage, not yet in execution.

Structured evaluation, not freeform discussion. Keep the decision contract in view.

Before filing any plan-for-later item, run a one-line check: does this duplicate an existing approved spec or a live system? If it does, route it as a verify-or-extend item against that spec. Redundant builds waste sessions that could ship real work.

### Step 9: You Decide

You decide. You restate the decision in your own words, including where you aligned with or diverged from the knowledge-design lens's recommendation. This is the guard against the synthesizer becoming a shadow decider.

### Step 10: Implementation Routing

Do-now items execute before the meeting closes. Rapid, checklist-style. Plan-for-later items go into your backlog at the planning stage with an owning jacket named.

**Three-test bar for plan-for-later items:** needed now (not ahead of need), bigger than one session or approval-gated, not already covered. Run this bar at filing time, not during the options step. An item that fails the first or second test routes to a named watch line, not a formal plan. A plan retired the day it's filed was never plan-shaped.

The meeting doesn't turn into a build session. Scoped work sessions handle the actual build.

### Step 11: Meeting Note

Written at close. A structured artifact in a dated folder for this meeting.

Mandatory sections: Decision Question, Decisions Made, Options Considered, Key Arguments, Dissenting Views (minority report), Action Items with owner and lane.

The meeting note cross-links all five lens perspectives prepared in Step 5. This note is the input your weekly synthesis reads.

Meeting note frontmatter for those using a file-based system:

```
---
type: team-meeting-note
date: YYYY-MM-DD
jackets: [list present]
decision_mode: [consult | joint | tell]
---
```

### Step 12: Close

Energy beat. Next-meeting pointer set. The meeting is alive, not procedural.

**Week-close synthesis gate.** Before closing, assess whether this meeting closes your review cycle.

- **Is this your week-closing meeting?** Yes when it's the last meeting before your weekly review. The test is whether the week's material is complete enough to read as a pattern, not the calendar day alone.
- **If yes:** produce your weekly synthesis now, as a distinct act after the meeting note is sealed. It reads the week's 1:1 captures and the meeting note just written. This synthesis serves the pattern, not the decision. It goes to your weekly review.
- **If yes but the session has run out of room:** do not drop the synthesis silently. Set an explicit named obligation on the meeting note and at session closeout. The obligation names the expected deliverable and where it lands. The next session loads it. Example: "Produce weekly synthesis before Friday's review."
- **If no, an early-week meeting with the week still running:** defer by design. The week is incomplete. Name the meeting that owns the synthesis and carry it forward explicitly.

The gate never lets the synthesis evaporate. It's produced, or it's an explicit named obligation.

## Perspective Dispatch

The mechanism at the heart of the team meeting is independent preparation.

Each lens develops its view in isolation, with nothing diluting the lens. When one mind considers five angles in a single pass, the angles average toward each other and blur. Separate preparation breaks that. Your knowledge-design lens can only synthesize at Step 7 because the inputs arrived genuinely distinct.

Each lens's perspective is saved before the conversation opens. If you're running this with an AI assistant handling multiple jackets, dispatch each jacket as a separate worker in a parallel batch, with each one reporting to a file before any cross-jacket discussion begins.

## Dispatch Records

Keep a dedicated folder for each meeting. It holds the per-lens perspective files and the meeting note. Perspectives save into this folder at preparation time, so nothing has to be rescued from the session afterward. The meeting note cross-links all five.

Saving the perspectives makes the synthesis auditable. It can be traced back to its sources.

## Two Synthesis Acts

The skill keeps two synthesis acts distinct. They never collapse into one.

- **In-meeting synthesis** is Step 7. The knowledge-design lens harmonizes in real time, in the room, for your decision. It serves the decision.
- **Weekly synthesis** is a separate artifact. Your knowledge-design lens reads the week's 1:1 captures and the meeting note, then produces a pattern read with Three Laws flags, cross-lens connections and recommendations. It serves the pattern and goes to your weekly review.

The weekly synthesis reads the meeting's output. It can't be the same act.

**Two sensitivity reads worth tracking across meetings:** Where did the Challenge and Illumination reflex fire this week, and where didn't it? Where did a community or customer read move from a named person to an aggregate frame? Both as sensitivity reads, not scored metrics.

## Model Routing

Dispatch the cheapest model that does the job well. Before each delegated step, ask whether a smaller model would produce equivalent output.

| Work type | Model |
|---|---|
| Agenda-load pulls, extracting open threads from prior captures, mechanical data reads | Haiku |
| Perspective dispatch workers, per-lens preparation, most synthesis work | Sonnet |
| In-meeting synthesis at Step 7 when the question is genuinely architecture-class | Opus |

Dispatch all five perspective workers in a single parallel batch. Each worker reports to a file before any cross-lens discussion begins.

Set the model explicitly on every dispatch. Never silently inherit the top tier.

---

## Constraints

- The meeting topic stays wide. No hardcoded recurring theme.
- You chair. The knowledge-design lens synthesizes. It integrates, it doesn't decide.
- Independent preparation keeps lenses uncontaminated. Perspectives develop before they meet.
- Every lens carries the two Step 5 guardrails: pin the approved design for the lens, and read live state as what has happened rather than what was designed.
- The two synthesis acts stay distinct. In-meeting synthesis serves the decision. Weekly synthesis serves the pattern.
- The meeting is a decision room. Plan-for-later work routes out to scoped sessions.
- Energy beat at open and close. The meeting is alive, not procedural.

---

This practice is one piece of a larger framework called The Alive Business. The Alive Business is a system for building a business that's actually yours, with eleven design layers from identity through expression to the infrastructure that keeps things running. It's available at sidequesthq.co if you want the full frame this meeting structure lives inside.
