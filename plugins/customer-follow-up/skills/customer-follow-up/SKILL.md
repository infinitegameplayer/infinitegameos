---
description: Use to run a post-job relationship cadence. Four touchpoints: +24-48h thank-you, +14d referral ask, +90d maintenance check-in, +180d re-engagement. Customer notes live as Obsidian YAML frontmatter. A single Dataview query surfaces who is due for outreach. CRM-lite that covers a solo service business up to ~50 customers.
---

# Customer Follow-Up

Purpose: Build a relationship cadence that keeps customers warm between jobs, turns satisfied customers into referral sources and brings dormant customers back before they forget you exist. Every touchpoint is a short message, not a campaign. The skill runs after a job closes, then surfaces the right message at the right interval without the solopreneur having to remember.

This skill exists because follow-up is the most skipped stage in a service business. Not because operators don't care about their customers. Because there is no system doing the remembering. This skill is that system.

## Pairing

Customer Follow-Up pairs with the full **Solopreneur Admin Toolkit**:

- **Email Triage** surfaces incoming replies from customers who respond to follow-up messages. Route those replies there.
- **Quote Builder** generates the new quote when a re-engaged customer books again at the +180d touchpoint.
- **Invoice & Payment Tracker** handles billing when the re-engagement leads to a job.
- **Daily Admin Orchestrator** is the primary entry point. Each morning it checks `next-followup-date` across all customer notes and surfaces who is due today. Run this skill from that orchestrator sweep, not in isolation.

## Make It Yours

This skill is a starting point. Three seams are designed for your hands. Edit the SKILL.md directly before or after first use.

**Seam 1 — Cadence intervals.** The default touchpoints (+24-48h, +14d, +90d, +180d) fit a general service business. Tree trimming runs annual maintenance cycles, so the +90d check-in may move to +120d and the re-engagement to +365d. HVAC businesses follow seasonal triggers, not calendar intervals. Coaching practices run quarterly check-ins, making +90d the natural re-engagement beat. Design work often runs 30-60-90 follow-up tightly bound to project delivery.

Calibrate before first use. Look at your last ten jobs. When did customers actually call back? When did referrals come in? Your real data beats the defaults. Edit the intervals in the Steps section to match.

**Seam 2 — Customer note schema.** The default YAML frontmatter fields cover the minimum. Your business will tell you what else belongs. A tree trimmer might add `tree_species` or `property_size`. A house painter might track `paint_brand` and `color_codes`. A cleaning service might note `access_code` and `preferred_entry`. The schema is yours. Add fields that make your next visit smarter.

Do this before first use. Sit with two or three real customer files and ask: what would I want to know in thirty seconds before I show up? Those are your fields.

**Seam 3 — Referral ask language.** The +14d referral ask is the single touchpoint most solopreneurs skip or soften into uselessness. The default copy below is conservative and frictionless. After one cycle of live reps, edit it to match your voice. If you are naturally warm and direct, let the message be warm and direct. If you run a formal trades business, keep it tight and professional. The key is specificity: name the service, give a clear action, make it one sentence. Don't let it drift into a paragraph.

---

## Steps

**Step 1. Create or update the customer note.**

After a job closes, open (or create) the customer's note in your Obsidian vault at `Customers/<Customer-Name>.md`. The note is the CRM record. It is also a second-brain entry about this person.

Write what you know. Not just the job. The customer's name and how they found you. What they mentioned in passing. Whether they were a quick decision or a deliberate one. Whether their yard backs up to a neighbor who kept glancing over. These details make the next interaction feel like a relationship, not a transaction.

Update the YAML frontmatter after every job or touchpoint:

```yaml
---
name: Daniel Reyes
contact_email: joel@example.com
contact_phone: 555-867-5309
job_type: tree trimming
last_service_date: 2026-04-28
next_followup_date: 2026-04-30
referral_status: not-asked
notes: Removed two large oaks in backyard. Mentioned neighbor (Dave, two doors south) has the same oak species overhanging fence. Paid same day, no issues.
---
```

`next_followup_date` is the engine. The Daily Admin Orchestrator queries this field each morning to surface who is due. Set it immediately when the job closes, to the +24-48h window.

After each touchpoint, update `next_followup_date` to the next interval and update `referral_status` when the ask is made.

**Step 2. Cadence trigger logic.**

The four touchpoints advance in sequence. Each one resets the timer for the next.

| Touchpoint | Default interval | Trigger logic |
|---|---|---|
| Thank-you | +24-48h from `last_service_date` | Set at job close |
| Referral ask | +14d from `last_service_date` | Set after thank-you is sent |
| Maintenance check-in | +90d from `last_service_date` | Set after referral ask is sent |
| Re-engagement | +180d from `last_service_date` | Set after maintenance check-in is sent |

When a touchpoint is sent, update two fields: `next_followup_date` to the next interval and add a log line in the note body with the date and a one-line summary of what was sent.

If the customer books a job before a touchpoint fires, reset the cadence from the new `last_service_date`. The timer starts fresh.

**Step 3. Touchpoint 1: Thank-you (+24-48h).**

Send within 48 hours of job completion. The goal is satisfaction confirmation, not a hard ask. Keep it short.

Default message (email or text):

> Hi [Name], just wanted to say thank you for having me out yesterday. Really glad we could get those trees cleared before the storm season. If anything looks off or you have questions, just reach out. Happy to help.

Variants: if the customer shared anything personal (upcoming trip, kid's graduation, the neighbor who kept watching), echo it back. That one sentence of specificity does more than three paragraphs of polish.

After sending: update `next_followup_date` to +14d from `last_service_date`.

**Step 4. Touchpoint 2: Referral ask (+14d).**

This is the load-bearing touchpoint. It outperforms any ad spend per dollar of effort. Most solopreneurs skip it. Do not skip it.

Send at 14 days, when the customer has had time to experience the result and their satisfaction is at its peak. A referral ask too early (same day as the thank-you) feels rushed. A referral ask at 90 days is too late. Fourteen days is the window.

One sentence. Specific. Frictionless.

Default message:

> Hi [Name], hope those oaks are looking good. Quick ask: if anyone in your circle needs tree work, I'd love the introduction. A text or email to [your contact] is plenty. Thanks for thinking of me.

Do not write a paragraph. Do not explain why referrals matter to your business. Do not offer an incentive in the first message. The ask should feel like what a trusted contractor says after doing good work.

Update `referral_status` in the frontmatter to `asked` after sending. If a referral comes in, update to `referred`. If it converts to a job, update to `converted`.

After sending: update `next_followup_date` to +90d from `last_service_date`.

**Step 5. Touchpoint 3: Maintenance check-in (+90d).**

Not a sales call. A genuine check-in. This message positions you as someone who thinks about their customers' property, not just their invoice.

Default message:

> Hi [Name], checking in around the three-month mark. How are things looking out there? Happy to answer any questions or swing by for a quick look if anything came up since the last visit. No pressure either way.

For seasonal businesses: adapt the trigger. An HVAC business might send this before the first hot week of summer. A tree trimmer in a storm-prone region might advance this to late spring before the season peaks. A lawn care service might time this to the first mow of the season.

After sending: update `next_followup_date` to +180d from `last_service_date`.

**Step 6. Touchpoint 4: Re-engagement (+180d).**

Six months is far enough out that the customer may have forgotten to book. This message reactivates them before they call a competitor.

Default message:

> Hi [Name], it's been about six months since we last worked on your property. Customers are booking early for [relevant seasonal service] this year. Happy to get you on the schedule. Just reply here or call [your number] and we'll sort out timing.

Name the season or the service. Vague re-engagement messages get ignored. A message that says "fall tree inspection before the leaves come down" gets replies.

After sending: update `next_followup_date` to +365d from `last_service_date` if you run an annual cycle, or leave it blank if re-booking resets the whole cadence.

---

## Worked Examples

### Tree trimming: Daniel Reyes through the full cycle

Daniel closed a job on April 28, 2026. Customer note:

```yaml
---
name: Daniel Reyes
contact_email: joel@example.com
job_type: tree trimming — two oak removals
last_service_date: 2026-04-28
next_followup_date: 2026-04-30
referral_status: not-asked
notes: Removed two large oaks. Mentioned neighbor Dave (two doors south) has same species overhanging his fence. Quick pay, no scope issues. First-time customer via word-of-mouth from Sarah Chen.
---
```

**April 30 (Day 2):** Daily Admin Orchestrator surfaces Daniel's note. Send thank-you. Update `next_followup_date: 2026-05-12`.

**May 12 (Day 14):** Orchestrator surfaces Daniel again. Send referral ask:

> Hi Daniel, hope those oaks are settling into the yard. Quick ask: if anyone in your circle needs tree work, I'd love the introduction. A text to 555-0142 is plenty. Thanks for thinking of me.

Update `referral_status: asked`. Update `next_followup_date: 2026-07-28`.

**July 28 (Day 90):** Maintenance check-in. Daniel's neighbor Dave was mentioned in the original note.

> Hi Daniel, just checking in at the three-month mark. How's the yard looking since the removal? If that neighbor of yours ever decides to deal with his oak overhang, feel free to pass along my number.

Update `next_followup_date: 2026-10-28`.

**October 28 (Day 180):** Re-engagement.

> Hi Daniel, it's been about six months. Customers are booking fall tree inspections before the wind season. Happy to put you on the schedule if you want a look before the leaves come down. Just reply or call 555-0142.

Daniel books a fall inspection. Cadence resets from new `last_service_date`.

---

### Referral ask working: Sarah Chen

Sarah was the word-of-mouth source for Daniel Reyes. Her note:

```yaml
---
name: Sarah Chen
contact_email: sarah@example.com
job_type: tree trimming — crown reduction
last_service_date: 2026-04-01
next_followup_date: 2026-04-15
referral_status: not-asked
notes: Told me she had mentioned my name to her neighbor Daniel before I even asked. Responsive, paid immediately. Excellent relationship candidate.
---
```

**April 15 (Day 14):** Referral ask to Sarah.

> Hi Sarah, glad those trees are looking good. Quick ask: if anyone else in the neighborhood needs tree work, I'd love the introduction. You already made one happen with Daniel, which I really appreciated. A text anytime is plenty.

Update `referral_status: asked`. Sarah replies within an hour with two more names. Update `referral_status: referred`. Both names convert within the month. Update `referral_status: converted`.

This is the referral ask working. One sentence. Personal detail. No pressure. Sarah felt seen, not pitched.

---

## Reference Implementations

The skill names Obsidian as the reference stack. Operators with different setups substitute component by component.

**Customer note location:** `Customers/<Customer-Name>.md` inside your Obsidian vault. One file per customer. All jobs, touchpoints and referral history live in a single file per person.

**Reference YAML frontmatter:**

```yaml
---
name:
contact_email:
contact_phone:
job_type:
last_service_date:        # ISO 8601: YYYY-MM-DD
next_followup_date:       # ISO 8601: YYYY-MM-DD — the engine for Dataview surfacing
referral_status:          # not-asked | asked | referred | converted
notes:
---
```

**Dataview query for Daily Admin Orchestrator:**

Place this query in your orchestrator note or a dedicated `Follow-Up Queue` note. It surfaces every customer with a `next_followup_date` on or before today.

```dataview
TABLE name, job_type, last_service_date, next_followup_date, referral_status
FROM "Customers"
WHERE next_followup_date <= date(today)
SORT next_followup_date ASC
```

This query is the surfacing mechanism. No separate tool. No notification system. It runs every time you open the orchestrator note.

**Upgrade threshold:** When your active customer count crosses 50, or when a second person needs to access and update customer records, migrate to a dedicated platform. HubSpot Starter, Notion and Pipedrive are the natural candidates at this tier. HubSpot provides native contact records and email logging. Notion gives a database view with similar field structure. Pipedrive adds pipeline visibility if the business grows toward a formal sales motion. The customer note schema above maps cleanly to any of these platforms. The migration is a data export, not a rethink.

Until that threshold, the Obsidian-native pattern is sufficient and has zero subscription cost.

**Substitutability:** Any markdown-based note system with frontmatter support works (Logseq, Roam, plain folders). Any task or calendar tool can substitute for Dataview if the solopreneur manually checks dates. The structural discipline (one note per customer, `next_followup_date` as the timer, four touchpoints in sequence, referral status tracked) holds across stacks.

---

## Outputs

- **Customer notes.** One markdown file per customer in `Customers/`. Updated after every job and every touchpoint. Contains YAML frontmatter for structured data and a prose body for context, history and relationship detail.
- **Follow-up triggers.** The `next_followup_date` field surfaces each customer in the Daily Admin Orchestrator's Dataview query on the correct day. No separate reminder system needed.
- **Referral ask drafts.** Per-customer referral ask text, personalized with job detail and any personal context from the note. Ready to send as email or SMS.
- **Touchpoint log.** A running log in the note body, one line per touchpoint, capturing date, channel and outcome. Provides conversation history before any call or visit.

---

## Constraints

- **The +14d referral ask is load-bearing.** Per service-business research, it outperforms ad spend at this budget tier. It is the most skipped touchpoint and the highest-leverage one. Do not let it slip. Do not fold it into the thank-you. Send it separately, on day 14.

- **The customer notes are second-brain entries, not database rows.** The YAML frontmatter handles structured data. The prose body captures the customer as a person. What they mentioned in passing. What kind of decision-maker they are. What their property tells you about them. This context makes every future interaction feel like a relationship. Strip it down to fields only and you have a spreadsheet with extra steps.

- **Do not sanitize the referral ask.** One frictionless sentence beats a paragraph of explanation. The instinct to over-explain is strong. Resist it. Edit Seam 3 after live reps if the tone needs calibration, but keep the ask short.

- **Reset the cadence on re-booking.** If a customer books a new job before a touchpoint fires, update `last_service_date` and recalculate `next_followup_date` from the new date. The customer relationship clock starts fresh from the most recent job.

- **The upgrade threshold is a real decision point, not a suggestion.** At 50 customers or with a second operator, the one-file-per-customer pattern starts to show cracks. Name that threshold in your operations calendar and treat it as a migration trigger, not a future problem.
