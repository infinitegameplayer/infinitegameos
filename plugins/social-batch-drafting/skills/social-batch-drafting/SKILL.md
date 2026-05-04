---
description: Use when drafting a 9-post social batch (3 days × 3 platforms) from any source. Triggered by content-strategy plans, article breakdown protocols, workshop or product-launch campaigns, freeform sequence batches or any plan whose handover map names this skill at a social-batch phase.
---

# Social Batch Drafting

Purpose: Produce a complete 9-post social batch (3 days × 3 platforms) from a single source artifact, with voice rules enforced before drafting begins, prior-batch threading running by default and an approved batch file as the durable handoff artifact for the downstream queue skill.

Trigger: A polished article ships and needs distribution. A workshop or product launch demands a sequence. A content-strategy session names this skill at a social-batch phase. A campaign that runs as a multi-batch arc needs the next installment.

Inputs: A `source` (article path, page URL, session reference or campaign reference). Optional: `campaign` name, `series_predecessor` link, `anchor_arc` state, `voice_addenda` for context-specific voice rules.

Outputs: A batch markdown file at your social drafts directory, written in the canonical structure described under Output Format. Initial status `draft`. Advances to `approved-pending-scheduling` only on operator approval. The downstream queue skill consumes the file from there.

This skill exists because batches drafted without structural enforcement drift on every iteration. Em dashes slip in. Internal names leak into public copy. Forward-reference threading skips one platform. Anchor arcs lose continuity. The pre-flight checklist becomes structurally impossible to skip when it lives as a skill rather than a memory.

## Pairing

This skill pairs with **Social Batch Queue**. Drafting produces the approved batch file; Queue consumes it and ships through your social scheduling tool. The two work as a flywheel. Run Drafting alone for copy-only batches. Run both for copy-to-scheduled-posts in one session.

## Make It Yours

This skill is a starting point, not a finished tool. It ships with a 9-post structure (3 days × 3 platforms), Instagram, Facebook and LinkedIn as the default surface mix and a voice-rules set built from the author's real failure modes. Your setup is different.

Three seams worth editing before first use.

**Seam 1: Platform mix.** The 3-day arc holds for any combination of platforms. If you publish on Twitter/X, Threads, Substack Notes or a text-first surface instead of one of the three defaults, swap the platform name in the Batch Format table and update the corresponding mechanics block. The Day 1 / Day 2 / Day 3 structure doesn't change. The platform mechanics do.

**Seam 2: Post count.** The 9-post default fits a 3-platform, every-other-day publishing cadence. A 5-post batch (1 platform × 5 days, or 1 day × multiple platforms) fits a different rhythm. Edit the Steps to reflect your cadence. The engagement gate, prior-batch look-back and voice sweep logic are cadence-agnostic. Keep them.

**Seam 3: Voice rules.** The Voice Rules section is the author's enforcement layer, extracted from live production runs. Some rules are structural ("no em dashes," "no Oxford commas") and worth keeping regardless of whose voice is running. Others are contextual ("LinkedIn Subtle Professional Register," contraction list). If your brand voice runs more formal, expand the LinkedIn register to all platforms. If your brand voice is looser, adjust the contraction enforcement list. The `voice_addenda` input is the clean entry point for layering your rules without touching the defaults. If your rules diverge enough, replace the section directly.

Run a brainstorm pass before first use. Edit the SKILL.md directly. The skill is a substrate. You are the operator. Make it yours.

## Steps

**Step 1. Engagement gate.** One engagement, two questions on direction. Confirm (a) which concept has the most energy in the source for the operator right now and (b) who the batch is primarily speaking to. This confirms direction. It does not substitute for structural anchoring.

**Step 2. Read source content.** Open the source named in the entry contract. Not skim. Read. Extract the thesis, key sensory moments, the anchor seed phrasing if any and any line in the source that would land verbatim in social copy.

**Step 3. Read prior batches (always-on look-back).** Always scan your social drafts directory and read the most recent 3 to 5 batches. Two outcomes:

- If `series_predecessor` is present (or a campaign series exists per `campaign` and tags): perform heavy extraction. Pull which prior batches are already threaded, the current anchor arc state verbatim and the Day 1 opener pattern from the predecessor. Forward-reference threading protocol activates in Step 4.
- If no series exists: perform light breadcrumb discovery. Surface 1 to 2 quotable lines, recurring images or voice anchors from recent batches that could thread subtly into this draft. Present to operator. Operator chooses whether to weave them. Always optional. Never forced.

**Step 4. Forward-reference threading plan (heavy, when series exists).** If predecessor exists, name the batches to thread before drafting. ALL platforms get the thread, not just one. Draft the Day 1 opener explicitly before any other copy. Skipped cleanly when no series.

**Step 5. Anchor arc escalation.** If `anchor_arc` is present, state the prior arc phrasing verbatim. Propose the escalated phrasing for this batch. Operator approves or redirects before drafting proceeds. Skipped cleanly when no arc.

**Step 6. Voice sweep pre-flight.** Before writing the first word of copy, confirm the Voice Rules section gates are active in current context. Non-negotiable.

**Step 7. Draft the 9-post batch.** Three days × three platforms × the canonical structure. Reference the Batch Format section for the table, platform mechanics, headline rules, 8-slide carousel architecture and image brief format.

**Step 8. Voice sweep post-draft.** Re-run the Voice Rules against the produced copy before presenting to the operator. If any rule is violated, return to Step 7 for the affected post and re-draft. Do not present a draft with violations.

**Step 9. Output and approval gate.** Save to your social drafts directory using the canonical frontmatter format (see Output Format). Initial `status: draft`. Wait for operator approval, then update to `status: approved-pending-scheduling`. Do NOT save with `status: approved` without explicit operator consent.

## Batch Format

Three days. Three posts per day. Three platforms per post (Instagram, Facebook, LinkedIn by default; substitute or extend per the operator's surface mix).

| Day | Post | Function |
|---|---|---|
| 1 | Hook | Opens a tension or scene. Retroactive callback where warranted. |
| 2 | Carousel (8 slides) | Full arc. Foundation, framework, application, parent-concept connection, close threading prior installments. |
| 3 | Action | Direct invitation. Anchor seed. References prior installments. Standalone-capable. |

### Platform mechanics (identical every batch)

**Instagram:** body copy, hashtags (3 to 5), `Link in bio.` on its own line.

**Facebook:** body copy with URL inline in body, hashtags (3 to 5), sign-off line, blank line, closing line. URL goes in the post itself, not the first comment. Algorithm reach hit accepted in exchange for delivery reliability across batched scheduling. Most schedulers can't reliably post a first comment timed with publish; inline URLs sidestep the failure mode.

**LinkedIn:** body copy with URL inline in body, invitational question, sign-off line, blank line, closing line, hashtags (3 to 5). LinkedIn body carries a slightly more polished register than Instagram and Facebook. Apply the LinkedIn Subtle Professional Register voice rule.

Threads, Substack notes and other text-first surfaces can substitute for any of the three native platforms above. The 9-post structure (3 days × 3 platforms) holds; the platform mix is operator choice.

### Headline rules (Day 1 and Day 3 single-headline templates)

- Headline ends with a period (or `?` for questions). Never without punctuation.
- Carousel slide headings: punctuation optional.
- 3 to 6 words preferred. Punchy. Direct. Pulled from the source content, not invented.

### Carousel slide structure (8 slides every batch)

| Slide | Function |
|---|---|
| 1. Cover | Concept name with subtitle. Full sentence heading. |
| 2. Foundation | What the concept is built on. Pre-existing order, not an invention. |
| 3. The Distinction | What most people think vs what's actually true. |
| 4. Core Practice | The daily application. First-person question format where it serves. |
| 5. Second Layer | The less-obvious dimension. Goes one level deeper. |
| 6. The Fear or The Turn | What comes up, and what's on the other side. Honest. |
| 7. The Connection | How this concept connects to the parent concept or wider arc. Always present. |
| 8. Close | Threads prior installments where they exist. URL. Forward reference to source. |

### Image brief (Day 3 Action background)

When Day 3 uses a generated background image, the brief format is: cinematic, specific lighting, landscape and sensory detail, no figures (keeps the central archetype elusive), color palette that bridges into the carousel template, photographic realism, 16:9 (1792×1024) for social-friendly framing. Include a one-sentence rationale explaining the visual metaphor and why it carries the batch's concept. The brief lives in the batch draft file. Generation execution belongs to the downstream queue skill.

## Forward-Reference Threading (heavy, when series exists)

For series batches (when `series_predecessor` present). Universal pattern across platforms.

**Rule:** ALL platforms get the forward-reference thread. Not LinkedIn only. All three.

**Day 1 opener:** Named explicitly in Step 4. Pattern: name what came before, name where we are now. Example shape: "Three weeks of building. This is the ground beneath it all. The wide frame as the why. The daily architecture as the how. And now: this batch's concept." The exact language shifts each batch; the pattern is constant.

**Day 1 LinkedIn body:** Full forward-reference paragraph naming prior installments with natural language. "A few weeks ago I wrote about X. Last week Y. This week Z." Temporal language only. No internal session names, no plan names, no protocol references.

**Carousel Slide 8:** Closes by threading prior installments. The accumulation is the story. "Prior 1 gives you the frame. Prior 2 gives you the architecture. Current gives you the foundation."

**Day 3 across all platforms:** References prior installments before the anchor seed.

## Light Breadcrumb Weaving (default for non-series)

For one-off batches, freeform campaigns, product-launch posts. Step 3 surfaces candidate breadcrumb lines from recent batches even when no formal series is declared. Subtle. The principle: every social post knows what came before it, even when not formally part of a series.

Examples of light weaving:

- A quotable phrase from a recent batch echoed in this batch's Day 2 carousel slide.
- A sensory image (a recurring metaphor, a familiar visual register) lightly recalled.
- A voice anchor (a recurring opening register) carried forward without explicit reference.

Always optional. Never forced. Operator chooses whether to weave each candidate.

## Anchor Arc Escalation

When a multi-batch campaign carries an escalating reference (a reveal arc, a seat-count countdown, a product hint), the arc state lives in `anchor_arc`. Examples of arc shapes:

**Reveal arc:**
- Early: "There's something coming (more on that later)."
- Mid: "A piece that walks through the full framework (more on that later)."
- Late: A named reveal once it feels earned.

**Seat-count escalation:**
- Early week: "Seats are open."
- Mid week: "Seats are filling. N left."
- Final week: "N seats remaining. Doors close on date."

**Product reveal arc:**
- Pre-reveal: hint at a coming offering without naming it.
- Reveal week: name it once.
- Post-reveal: reference it as live and link.

**Mechanism:** Skill reads the predecessor's anchor arc state verbatim, proposes the escalated phrasing for this batch, operator approves or redirects before drafting proceeds.

## Voice Rules

Non-negotiable gates. The skill does not present a draft until all gates pass. Not a suggestion list. A pre-flight.

These voice rules are the author's defaults, surfaced from real failure modes. Operators can layer their own voice rules on top via `voice_addenda`. Replacing the defaults is the operator's call. The structural enforcement (sweep before drafting, sweep after drafting, halt on violation) is the skill's contribution.

- **No em dashes.** Replace with a period and a new sentence, or a comma. Absolute. Structural markdown labels (skill step headings, table column dividers, frontmatter description fields) are exempt.
- **Contractions throughout.** Hard pre-flight scan, not a vibe check. Common contractions to enforce: `it is` to `it's`, `that is` to `that's`, `do not` to `don't`, `does not` to `doesn't`, `cannot` to `can't`, `we are` to `we're`, `you are` to `you're`, `they are` to `they're`, `I am` to `I'm`, `is not` to `isn't`, `have not` to `haven't`, `should not` to `shouldn't`. Quotation block exception: when copy verbatim-quotes a published source line that uses non-contracted form, the quote stands. Flag the exception in the Source Reference Map.
- **No Oxford commas.**
- **No internal names in public copy.** No session numbers. No internal plan titles. No protocol names. No skill names. No vault scaffolding of any kind. Public copy is for public eyes.
- **No "signal" as a noun replacement.** Reads AI. Replace with concrete alternatives.
- **No "cannot."** Always "can't."
- **Parenthetical humor at clause level.** 5 words max. Rides inside the sentence, not appended.
- **No fabricated anecdotes.** Every story confirmed real before it goes in any draft.
- **Positive framing with rhetorical-negation nuance.** Define ideas primarily by what they are, not what they are not. Two patterns to distinguish:
  - **Pure negation** (banned): "Not X. Not Y." with no immediate affirmative reframe. Reads as brainstorming output. Reads AI.
  - **Negation-then-reframe** (allowed sparingly): "Not X. Not Y. It's Z." Negation immediately resolved by an affirmative line. Rhetorical, lands. Default to affirmative-only. The reframe pattern lives in roughly 1 out of 10 batch surfaces or as a deliberate opener. Repeated use across multiple posts in a batch reads AI.
- **LinkedIn Subtle Professional Register.** LinkedIn body copy is a quarter-turn more measured than Instagram and Facebook. Same voice, just slightly more polished. Concrete moves:
  - Full sentences over fragments where the fragment would read casual.
  - Business-context framing where it lands naturally ("operating posture", "daily architecture", "the actual practice").
  - Invitational closing question stays. It's the LinkedIn engagement primitive.
  - Forward-reference threading uses temporal language ("a few weeks ago I wrote", "last week", "this week").

When `voice_addenda` is supplied, layer those rules on top. Examples of context-specific addenda:

- Sovereignty contexts: vocabulary preferences specific to the field.
- Workshop contexts: date specificity required (e.g. "Saturday May 2" not "this weekend").

## Output Format

The batch file written at Step 9 follows this canonical structure.

**Frontmatter (required):**

```yaml
---
title: Batch name. Concept-forward, no internal names
status: draft  # advances to "approved-pending-scheduling" on operator approval
created: YYYY-MM-DD
campaign: campaign name or null
source: source identifier. Article path, page URL, etc.
target_page: primary destination URL
scope: 3-post arc × 3 platforms = 9 posts
scheduled_dates: TBD or actual
sequence: if series, what comes before in plain language
tags:
  - social
  - campaign tag
  - concept tags
---
```

**Body sections (required, in order):**

- Title and one-paragraph intro naming the source and any forward-reference framing.
- Source trail (links to plan, campaign, source content).
- Voice anchors (one-line summary referencing the active voice rules).
- Platform CTA mechanics (one block).
- `## Day 1. Hook` with headline + Instagram body + Instagram close + Facebook body + Facebook close + hashtags + LinkedIn body + LinkedIn hashtags.
- `## Day 2. Carousel` with template reference + 8 slides (heading + body each) + per-platform captions + hashtags for each platform.
- `## Day 3. Action` with headline + image brief + Instagram body + Instagram close + Facebook body + Facebook close + LinkedIn body + hashtags + the anchor seed callout (named explicitly under "Anchor seed:").
- `## Source Reference Map` table mapping draft lines to their source (page section, harvest moment, codex reference, prior batch reference, etc.).
- `## Anchor Arc` (when applicable) the escalation arc state through this batch.
- `## Approval Gate` empty until operator approves; on approval, captures the approval line and any conditions.

## Handoff to Queue

On `status: approved-pending-scheduling`, hand off to the Social Batch Queue skill. The queue skill owns image generation, asset staging, scheduling-tool integration and post-publish manual handoff surfacing. The batch file at your social drafts directory is the durable handoff artifact.

## Constraints

- `source` is required. Halt at preflight if missing.
- Voice Rules are non-negotiable gates. Halt at Step 8 if any rule is violated; return to Step 7.
- Operator approval is required before file `status` advances from `draft` to `approved-pending-scheduling`. Never save approved without explicit operator consent.
- Never write to your social drafts directory without preflight passing.
- Never attempt image generation, template editing or scheduler queueing in this skill. Those belong downstream in the queue skill.
- Never use this skill for posting failure recovery. That belongs to a separate failure-protocol pattern.

## Operating Posture

Source is the spine. Voice is the gate. Threading is the memory. The skill exists to make a batch that knows what it's a part of and respects what it ships into.
