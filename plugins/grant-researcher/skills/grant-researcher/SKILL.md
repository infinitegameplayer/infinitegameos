---
description: Use to discover grants whose mission alignment, eligibility and deadline runway fit an operator profile. Two modes. Discovery sweeps wide and ranks by fit; Fit Deep-Dive runs a yes/no memo on one opportunity. Pairs with Grant Manager.
---

# Grant Researcher

Purpose: Help an operator find grants their work already fits, ranked by mission alignment, eligibility match, deadline runway, ask-size fit, funder track record and capacity match. Output is a ranked opportunity report (Discovery mode) or a single-opportunity fit memo (Fit Deep-Dive mode). The skill is a starting point. The operator's domain expertise shapes it from there.

Trigger: An operator wants funded work that compounds with what they already do. A grant cycle opens for the operator's domain. A specific RFP needs a fast yes/no fit decision. A funded program approaches renewal. The operator wants a quarterly grant landscape sweep before allocating writing capacity.

Inputs:
- `profile` (required): operator profile at a defined path covering mission, org type, geography, focus areas, prior grant history, ask-size range, capacity, eligibility constraints (citizenship, certifications, fiscal sponsorship status, indirect cost rate). Markdown with frontmatter is the reference format; YAML works.
- `mode` (default `discovery`): `discovery` | `fit-deep-dive`.
- `opportunity` (required for `fit-deep-dive`): identifier, RFP URL or solicitation number with whatever metadata is in hand.
- `cycle_window` (default `12-months`): forward window for deadline filtering in Discovery mode.
- `sources` (optional): override the default source mix.
- `output_path` (default `grants/research/YYYY-MM-DD-<slug>.md`).

Outputs: a structured markdown report at `output_path`. Discovery output is a ranked list (top 10 by fit score) plus a disqualified-with-reasons block plus a sources sweep log. Fit Deep-Dive output is a single memo on the named opportunity. Each opportunity entry carries why-it-fits, key criteria, deadline, link, suggested next move and a fit score with component breakdown.

This skill exists because grant discovery without structure produces noise. Newcomers chase opportunities they can't win. Experienced practitioners revisit the same shortlist out of habit and miss adjacent funders. A skill that makes the operator profile load-bearing, runs fit scoring against multiple sources and produces a ranked report keeps the surface honest from cycle to cycle.

## Make It Yours

This skill is a starting point, not a finished tool. A 20-year practitioner knows things this v1 can't anticipate: which specific funders are reachable, which board members shift annual priorities, which RFPs read better than they fund, which deadlines are real versus padded. The skill's structure (profile-load, source-sweep, fit-score, ranked-output, deadline-shadow) is the bone. The operator's experience is the muscle.

Run a brainstorm pass on this skill before first use or after a first run that surfaces gaps. Edit the SKILL.md directly. Tune the fit-scoring weights for your domain. Add or remove sources from the default mix. Adjust the report shape to match how your team reads it. Add custom decision rules ("never pursue federal grants under $50k," "skip RFPs from funders with under two-year track records," "always prioritize multi-year over single-year"). The skill is a substrate. You are the operator. Make it yours.

## Pairing

Grant Researcher pairs with **Grant Manager**. Researcher discovers and shortlists; Manager handles the lifecycle from "we are pursuing this one" forward (LOI drafting, full proposal authoring, budget composition, submission portal handling, post-award reporting, stewardship). The boundary is firm: discovery and fit live here; intake through stewardship live in Manager.

## Steps

**Step 1. Profile load.** Read the operator profile at `profile`. Halt if missing. The profile is the spine of every fit decision downstream.

Required fields: mission statement, org type (501c3, LLC, individual, fiscally sponsored, public agency), primary geography, focus areas, prior grant history (won, lost, pending, never applied), ask-size range, current capacity for new work, eligibility constraints.

Useful additional fields: board composition, fiscal-year cadence, audited financials availability, indirect cost rate, named funders worth tracking, named no-go funders.

**Step 2. Source sweep (Discovery mode).** Query the configured sources within the cycle window. Default source mix:

- **Grants.gov** (federal opportunities) via the legacy `search2` endpoint at `https://api.grants.gov/v1/api/search2`. No auth required. Filterable by ALN (Activity Listing Number, the post-2020 replacement for CFDA, though practitioners still say "CFDA"), agency code, eligibility type, opportunity status (`forecasted`, `posted`, `closed`, `archived`), funding category and deadline range. Cache to file per session rather than re-querying on every operator question. The newer `simpler.grants.gov` API requires Login.gov auth and is under active development; treat it as progressive enhancement, not the v1 source.
- **Web search** for foundation, state, local, corporate and RFP-feed opportunities matching the operator's mission and geography. Use the operator's configured search engine.
- **Foundation directories** if the operator subscribes (Foundation Directory Online via Candid, Instrumentl, GrantStation, Pivot, GrantWatch, GrantForward). Skip cleanly when no subscription. Note that many public libraries offer free FDO access; surface this to operators paying out of pocket.
- **IRS 990 data** via ProPublica Nonprofit Explorer (3M+ filings, free, public) for direct funder discovery. Peer organizations' 990s name their funders; that funder list seeds discovery. USASpending.gov tracks federal awards actually paid out (not just posted), useful for funder track-record analysis.
- **State and local grant portals** for the operator's geography. Federal pass-through grants often flow through state agencies; state agency grant pages are separate from Grants.gov.

Skip Step 2 entirely in Fit Deep-Dive mode; the operator has already named the opportunity.

**Step 3. Fit scoring.** Score each opportunity (or the single opportunity in Fit Deep-Dive mode) against six criteria. The default weights below are a starting point; tune them in your local copy.

- **Mission alignment** (0-30 pts): is the funder's stated priority a direct match for the operator's work?
- **Eligibility** (0-25 pts, gating): does the operator meet every required criterion? Failures here are disqualifying, not penalizing.
- **Deadline runway** (0-15 pts): enough time to write the proposal well without burning the operator's capacity?
- **Ask-size fit** (0-10 pts): is the ask within the funder's typical award range AND within the operator's stated ask-size range?
- **Funder track record** (0-10 pts): has the funder funded similar work? Sustained over multiple years?
- **Capacity match** (0-10 pts): can the operator deliver what the proposal requires without distorting existing work?

Disqualifiers (any one is fatal):
- Operator doesn't meet a stated eligibility requirement.
- Funder doesn't fund this work type or geography.
- Deadline runway is so short the proposal will be weak (under 4-6 weeks for federal; under 2-3 weeks for most foundations).
- Ask-size is well outside funder norms (operator asking $500k from a funder who caps awards at $50k).
- For federal opportunities: operator isn't registered in SAM.gov with an active UEI. Federal applications require 2-4 weeks of pre-registration; an opportunity with under that runway and no existing registration is structurally disqualified.
- The program looks like scope distortion (the work would have to bend to fit the funder rather than the funder fitting the work).
- The sovereignty gate: "would the operator do this work without this grant?" If the answer is no, surface the tension explicitly rather than scoring the opportunity. Grants are appropriate for proving a new program model, funding infrastructure the operator controls or supporting time-bound research that strengthens organizational knowledge. They are extractive when the program exists only because the grant exists, when reporting consumes more capacity than the award provides or when the funder relationship creates advocacy constraints.

**Step 4. Ranked output (Discovery mode).** Top 10 opportunities sorted by fit score, descending. Per opportunity: name, funder, ask range, deadline, fit score with component breakdown, why-it-fits (3-5 bullets keyed to the profile), key criteria (the 2-3 must-meet eligibility and structural points), suggested next move (LOI, full proposal, contact program officer first, monitor for next cycle, skip with reason logged).

Below the top 10, surface the disqualified-with-reasons block. The operator should see what was filtered out so a wrong heuristic can be reversed.

**Step 5. Fit Deep-Dive memo (Fit Deep-Dive mode).** A single memo on the named opportunity. Sections: opportunity summary, eligibility against profile, mission alignment analysis, ask-size and capacity analysis, deadline and effort estimate, funder track record from public records (recent awardees, typical award range, repeat-funder pattern), three risk factors, recommended next move with reasoning.

**Step 6. Deadline shadow.** For every opportunity the operator decides to pursue, push the deadline (and any required intermediate dates: LOI deadline, board approval gate, submission window opening) into the operator's capture system (calendar, to-do, project tracker). Halt if the operator hasn't configured a capture target; surface the path to fix rather than skipping silently.

## Reference Implementations

The skill names a working stack as the reference, then frames each component generically. Operators with different stacks substitute component by component.

**Reference data sources:**
- Federal: Grants.gov public API (no auth, generous rate limits, full opportunity metadata).
- Foundation: web search through the operator's configured engine (Brave, Tavily, Google Programmable Search, Bing). Direct funder websites for known funders.
- 990 data: ProPublica Nonprofit Explorer (free, public).
- Optional paid databases: Foundation Directory Online (Candid), Instrumentl, GrantStation, Pivot, GrantWatch, GrantForward.

**Reference profile format:** markdown file with frontmatter for structured fields, prose body for nuance:

```yaml
---
mission: One-sentence mission.
org_type: 501c3
geography: [Colorado, regional]
focus_areas: [veteran services, community resilience, applied technology]
ask_size_range: [10000, 250000]
capacity_for_new_work: medium
fiscal_sponsor: null
indirect_cost_rate: 0.10
---
```

Prose body sections: prior grant history with outcomes, board composition, current commitments, named funders worth tracking, named no-go funders, recent shifts in mission or capacity.

**Reference output format:** markdown at `output_path`. Operators can pipe to PDF, sync to Notion or Obsidian or pair with Grant Manager directly.

**Substitutability:** Any web search engine works. Any operator-tracked profile format works. Any to-do or calendar system works for deadline shadow. The structural discipline (profile-load gate, fit-scoring rubric, disqualifier checks, deadline shadow) holds across stacks.

## Modes

### Discovery

Cold-start mode. Sweep wide, score, rank, present. Best for: a new operator entering the funding landscape; an established operator running a quarterly landscape refresh; a domain shift requiring a fresh source mix; a board ask for "what's out there for our work right now."

### Fit Deep-Dive

Single opportunity, deep analysis. Best for: an experienced operator with a known universe who wants a fast yes/no on a specific RFP; a board or partner asking for a fit memo before committing capacity; a peer-referred opportunity that warrants more analysis than a Discovery line item.

## Output Format

Discovery mode output is a markdown report at `output_path`. Required sections in order:

1. Frontmatter: `profile_snapshot`, `cycle_window`, `sources_used`, `generated_at`.
2. `## Top Opportunities` table with columns: rank, funder, opportunity, ask range, deadline, fit score.
3. `## Per-Opportunity Detail` block per opportunity with name and funder, URL, deadline, ask range, fit score with component breakdown, why-it-fits (3-5 bullets), key criteria, suggested next move, risk notes.
4. `## Disqualified Opportunities` with a brief reason per disqualified opportunity.
5. `## Sources Sweep Log` listing what was queried and what returned.

Fit Deep-Dive output is a single memo at `output_path` with: opportunity summary, eligibility analysis, mission alignment, ask-size and capacity analysis, deadline and effort estimate, funder track record, risk factors, recommended next move with reasoning.

## Constraints

- `profile` is required. Halt at Step 1 if missing.
- Disqualifiers are gates, not warnings. Halt scoring on disqualified opportunities, log the reason and move on.
- Never recommend an opportunity the operator doesn't meet eligibility for. Eligibility is non-negotiable.
- Never recommend pursuing a grant that would distort the operator's mission to fit the funder. Sovereignty over scope.
- Never auto-submit anything. This skill discovers and analyzes; it doesn't act.
- Deadline shadow halts if no capture target is configured. Surface the path to fix.
- The fit-scoring weights are tunable defaults, not rules. Treat them as a starting point your domain experience will refine.

## Triage Funnel (Calibration Reference)

Experienced practitioners run a familiar funnel: 100 cold leads narrow to 30-40 that survive eligibility and mission fit; 15-20 survive deadline runway and funder track record; 5-8 are worth deep writing; active pursuit lands at 3-5 per cycle. Win rates for well-fit applications by experienced practitioners run 25-40%.

The skill's highest-leverage function is fast disqualification, not pipeline filling. Help the operator say no quickly to poor-fit opportunities so they can invest writing time in high-fit ones. The output should protect calendar time before it expands the funnel.

## Operating Posture

The profile is the spine. The fit score is the ranking. The disqualifiers are the filter. Grants are funded curiosity, not the begging bowl. The operator's existing work earns the fit; the skill's job is to find the funders whose priorities already match.
