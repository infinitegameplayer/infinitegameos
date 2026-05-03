---
description: Use to manage the full grant lifecycle on a chosen opportunity. LOI drafting, full proposal authoring, budget assistance, submission portal handling, post-award reporting and funder stewardship. Phase-routed. Pairs with Grant Researcher.
---

# Grant Manager

Purpose: Take an opportunity the operator has decided to pursue and shepherd it through the full grant lifecycle. LOI through proposal through submission through award reporting through stewardship. The skill is a starting point. The operator's domain expertise shapes it from there.

Trigger: An opportunity from a Grant Researcher report (or directly named) is chosen for pursuit. A funder has invited an LOI. A proposal deadline approaches. An award has landed and reporting is due. A funder relationship needs a touchpoint between cycles.

Inputs:
- `opportunity` (required): identifier, RFP URL or solicitation number with key metadata (funder, ask range, deadlines, submission portal).
- `phase` (required): `loi` | `proposal` | `submission` | `post-award` | `stewardship`.
- `profile` (required): operator profile (same shape as Grant Researcher's profile input).
- `boilerplate` (optional but high-leverage): operator's reusable artifact directory (org background, mission statement, theory of change, evaluation framework, budget template, key personnel bios, audited financials summary, IRS determination letter, board list).
- `output_path` (default `grants/<funder-slug>/<opportunity-slug>/`).

Outputs: phase-specific deliverables saved to `output_path`. LOI draft, full proposal section drafts, completed budget workbook, submission package checklist, post-award report draft, stewardship touchpoint draft. Plus a per-opportunity tracking file that captures status across phases and a funder-relationship file that lives across opportunities.

This skill exists because grant management without structure causes the operator to repeat work across cycles, miss reporting deadlines, lose institutional memory between funder relationships and write proposals from scratch when boilerplate already exists. A skill that holds per-opportunity state, runs phase-specific flows and pulls from a reusable artifact library frees the operator to focus on the substantive writing only they can do.

## Make It Yours

This skill is a starting point, not a finished tool. A 20-year practitioner knows what funders actually read versus what they say they want, which logic-model frameworks land with which program officers, which budget structures get funded versus which get cut, which reporting formats funders forgive lateness on and which they don't. The skill's structure (phase routing, boilerplate ingestion, deadline tracking, per-opportunity file shape, funder-relationship file) is the bone. The operator's experience is the muscle.

Run a brainstorm pass on this skill before first use or after a first run that surfaces gaps. Edit the SKILL.md directly. Add custom phase flows for your domain (federal grants run different rhythms than family foundations). Add custom artifact types to the boilerplate library. Adjust the per-opportunity file shape to match your team's tracking. Add stewardship rituals that match your relationship cadence. The skill is a substrate. You are the operator. Make it yours.

## Pairing

Grant Manager pairs with **Grant Researcher**. Researcher discovers and shortlists. Manager runs the lifecycle from "we are pursuing this one" forward. The boundary is firm: discovery and fit live in Researcher; intake, drafting, submission, reporting and stewardship live here.

## Phase Routing

The skill routes by `phase`. Each phase has its own flow.

### Phase: LOI

**Step 1.** Read the opportunity metadata and the funder's LOI guidelines. If guidelines are absent (some funders accept LOIs without explicit format), use a standard 1-2 page LOI structure: organization, need, project summary, ask, alignment paragraph.

**Step 2.** Read the profile and any boilerplate. Pull mission language and org background verbatim from boilerplate when applicable; don't re-invent.

**Step 3.** Draft the LOI. Standard sections:
- Opener: organization in one sentence.
- Need: the problem in plain language with one or two anchoring data points.
- Project summary: what the operator will do, who benefits, in what timeframe.
- Ask: specific dollar amount and project window.
- Alignment: why this funder, why this work, why now.

**Step 4.** Voice and clarity sweep (operator's voice rules layered via `voice_addenda` if configured). Common defaults: tighten passive constructions, specific numbers over vague ranges, no jargon the program officer wouldn't use, no "transformative" without evidence.

**Step 5.** Save to `output_path/loi-draft-v1.md`. Update the per-opportunity tracking file with phase status `loi-drafted`.

### Phase: Proposal

**Step 1.** Read the opportunity metadata, RFP guidelines and any prior funded proposals from the operator's archive. The most useful boilerplate is the operator's own past wins.

**Step 2.** Build the section outline against the funder's required structure. Common section set:
- Cover sheet (funder format, exact).
- Executive summary.
- Statement of need.
- Project description (goals, objectives, activities, timeline).
- Methods and approach.
- Logic model or theory of change (Kellogg, United Way or operator's framework).
- Evaluation plan (outputs, outcomes, indicators, data collection).
- Organizational capacity.
- Key personnel.
- Budget and budget narrative.
- Sustainability plan.
- Letters of support.
- Appendices (financials, board list, IRS letter, organizational policies).

Funders vary. Adapt to the funder's specific structure.

**Step 3.** Draft section by section. Pull boilerplate where available; new writing for the project-specific sections (need, project description, methods, evaluation, sustainability). Surface decision points to the operator before drafting where multiple structurally valid approaches exist (logic model versus theory of change, outcomes-based versus outputs-based evaluation framing).

**Step 4.** Coherence pass across sections. Logic models match evaluation plans. Budgets match project descriptions. Personnel listed in the proposal appear in the budget narrative. Timeline dates are consistent throughout.

**Step 5.** Voice and clarity sweep. Jargon out. Specific numbers over vague ranges. Active voice. Funder's own terms reflected back where appropriate (evidence of careful reading) without slavish mirroring.

**Step 6.** Save section drafts to `output_path/proposal/`. Update tracking file with phase status `proposal-drafted`.

### Phase: Submission

**Step 1.** Read the funder's submission portal documentation. Common portals: Grants.gov for federal, Submittable, SurveyMonkey Apply (also called Fluid Review), Foundant and bespoke foundation portals for foundations, email submission for many smaller community funders. Each portal has quirks (file format limits, character counts, attachment caps); don't assume.

For federal opportunities: confirm SAM.gov registration is active and the UEI matches the operator profile. SAM.gov registration takes 2-4 weeks to obtain or reactivate; flag this as a hard prerequisite at the LOI or proposal phase rather than discovering it at submission.

**Step 2.** Build the submission checklist. Every required upload, every required form field, every required signature, every required attachment. The checklist is the gate.

**Step 3.** Pre-flight. Confirm every checklist item is in hand before any submission action. Halt if any item is missing; surface the gap.

**Step 4.** Surface the operator-only steps the skill can't perform: portal login, final submission button, e-signatures requiring credentialed signers. The skill prepares the package; the operator submits.

**Step 5.** After the operator confirms submission, capture the confirmation number, submission timestamp and any portal-generated receipts. Update tracking file with phase status `submitted`.

### Phase: Post-Award

**Step 1.** Read the award letter and grant agreement. Surface every reporting deadline, every payment milestone, every compliance requirement, every restricted-use clause.

**Step 2.** Push every deadline into the operator's capture system. Reporting deadlines are non-negotiable; missed reports kill renewal.

**Step 3.** When a reporting deadline approaches, run the report-drafting flow. Pull the project's progress data, structure against the funder's report format, surface gaps, draft.

**Step 4.** For multi-year awards, track year-over-year metrics so each annual report can show progression rather than restating year one.

### Phase: Stewardship

**Step 1.** Read the operator's funder-relationship file (or create one if missing). Track program officer name, last touchpoint, next planned touchpoint, funder's giving cycle, internal updates worth sharing.

**Step 2.** Surface stewardship moves between cycles. Thank-you notes within 48 hours of award notice (the high-leverage move newcomers underinvest in). Mid-year impact updates unprompted (not just inside required reports). Invitations to events the funder might value. Congratulations on funder milestones (board changes, anniversary years, named program launches). Program officer check-in calls mid-grant. Stewardship is what makes warm-relationship pipelines convert at materially higher rates than cold discovery.

**Step 3.** Update the funder-relationship file after every touchpoint with date, channel, content, response.

## Reference Implementations

**Reference boilerplate library:** A directory at `boilerplate_path` containing markdown files for org background, mission statement, theory of change, evaluation framework, budget template, key personnel bios, IRS determination letter, audited financials summary, board list. Updated annually or on material change.

**Reference logic model framework:** Kellogg Foundation logic model (inputs, activities, outputs, outcomes, impact) as the default. United Way's outcomes-and-indicators framework as the alternative when a funder prefers it. Theory of change as the option for operators whose work is more emergent than deliverable.

**Reference submission portals:** Grants.gov for federal. Foundation-specific portals (some adopt Common Grant Application variants; most run their own). Email submission for smaller foundations and family foundations.

**Reference per-opportunity folder shape:**

```
grants/<funder-slug>/<opportunity-slug>/
  00-research/
    funder-profile-notes.md
    funder-990.pdf
  01-loi/
    loi-draft-v1.md
    loi-submitted.pdf
  02-proposal/
    need-statement.md
    project-narrative.md
    logic-model.md
    budget.xlsx
    full-proposal-final.pdf
  03-award/
    award-notice.pdf
    award-agreement.pdf
  04-reports/
    progress-report-1.md
    financial-report-1.xlsx
  05-stewardship/
    thank-you-sent.md
    check-in-notes.md
  tracking.md
```

**Reference per-opportunity tracking file:** markdown frontmatter capturing funder, opportunity, ask, phase status, deadlines, decision history. Body section for narrative log of touchpoints, decisions and learnings.

**Reference lead-time math (working backward from a proposal deadline):** 1-2 weeks for final assembly and portal submission, 4-6 weeks for writing, 2-4 weeks for internal review, plus an additional 2-4 weeks for SAM.gov registration if federal and not already active. A federal proposal needs roughly 9-16 weeks of runway for a competitive submission; foundation proposals run 6-12 weeks. These are calibration anchors, not rules.

**Federal compliance reference:** 2 CFR 200 (Uniform Guidance) governs federal grant compliance. Indirect cost rates, allowable versus unallowable costs, time-and-effort reporting, draws against approved budgets and grant closeout requirements all flow from it. Surface the relevant subparts to the operator at proposal and post-award phases for federal opportunities.

**Reference funder-relationship file:** one markdown file per funder, persisting across opportunities. Captures program officer name, funder cycle, prior asks and outcomes, touchpoint history, named relationship anchors (peer-of-board-member, prior co-funder relationship).

**Substitutability:** Logic model frameworks are interchangeable. Boilerplate format is operator choice. Tracking and relationship file formats can adopt the operator's project management tool (Notion, Airtable, Obsidian, plain folders). The structural discipline (per-opportunity state file, phase routing, submission checklist as gate, post-award deadline shadow, stewardship as ongoing rather than event-based) holds across stacks.

## Constraints

- `phase`, `opportunity` and `profile` are required. Halt at intake if any is missing.
- Submission phase never auto-submits. The skill prepares; the operator submits.
- Post-award reporting deadlines are non-negotiable. Surface them as hard halts in the operator's capture system.
- Never write commitments into a proposal the operator hasn't confirmed they can deliver. Capacity match is the operator's call.
- Never bypass funder-required formats. If a funder demands their own forms, the skill works within those forms; voice rules apply within constraints.
- Never represent the operator to the funder. The skill drafts; the operator reviews, edits and signs.

## Operating Posture

The opportunity is the focus. The phase is the discipline. The boilerplate is the lever. The relationship is the long game. Grant management is funded curiosity in motion: the operator's work earns the funder's interest; the skill protects the cadence so the operator's attention stays on the work, not on remembering what week the report is due.
