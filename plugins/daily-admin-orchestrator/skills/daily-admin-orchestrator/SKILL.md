---
description: Use to run the complete solopreneur admin ritual in one session. Sequences Email Triage, Customer Follow-Up, Invoice & Payment Tracker and Quote Builder in order. Three variants: morning briefing (5-10 min), end-of-day rolldown (5 min), Friday weekly review (45-60 min). Pairs with all four admin primitives.
---

# Daily Admin Orchestrator

This skill is the delegation surface. It replaces the question "which skill do I start?" with a single ritual that runs all four admin primitives in sequence. Joel said it plainly: "I have no one to delegate to." This skill is that one delegate.

---

## Pairing

This skill is the primary entry point for the full solopreneur admin toolkit. It pairs with all four primitives and names itself as the sequencer that connects them.

**Email Triage.** The orchestrator opens there every session. Email Triage's handoff payload is a sorted inbox with action items flagged by bucket. The orchestrator reads those action items and routes them: client follow-up items flow into Step 2, invoice triggers flow into Step 3, unsigned-quote replies flow into Step 4.

**Customer Follow-Up.** The orchestrator checks the cadence queue each session against today's date. Customer Follow-Up's handoff payload is a list of customers with their last-touchpoint date and next-touchpoint type. The orchestrator flags any customer at or past their +24h, +14d, +90d or +180d window and surfaces those as today's outreach actions.

**Invoice & Payment Tracker.** The orchestrator runs a paid/unpaid sweep each session. Invoice & Payment Tracker's handoff payload is the current invoice ledger with status, customer, amount and days outstanding. The orchestrator surfaces unpaid invoices past their due window and flags any completed jobs from Email Triage that need same-session invoicing.

**Quote Builder.** The orchestrator closes the sequence with a follow-up check on unsigned quotes. Quote Builder's handoff payload is the open quote log with issue date, customer and status. The orchestrator surfaces any quote that has reached the 48-72h follow-up window without a signed response, and hands those to the practitioner for outreach.

---

## Make It Yours

This skill is a starting point, not a finished tool. The default sequence and timing are calibrated for a tree-trimming solopreneur running a 10-minute morning ritual. Your business has different rhythms. Three seams to tune, in priority order.

**Seam 1: Ritual time-of-day.** The default is morning, first thing before job site. That anchor works because the briefing orients the day before the physical work begins. If your business runs better with an end-of-day close as the primary ritual, shift it there. Pick once. Run that rhythm for two weeks before deciding to change it. The discipline is the anchor, not the clock time.

*When to tune:* Before first use. Pick your primary ritual window and write it into your copy of this skill at the top of Step 1.

**Seam 2: Sequence override.** The default order is Triage first, then Follow-Up, then Invoice, then Quote. That order reflects a specific bottleneck theory: clearing inbound before running proactive outreach prevents duplicate action on the same customer. If your bottleneck runs differently (invoicing avoidance is your real problem, not email overload), put Invoice & Payment Tracker first. The primitives are independent. The sequence is a dial, not a rule.

*When to tune:* After your first week of reps, when your actual bottleneck pattern emerges from the data instead of from assumption.

**Seam 3: Depth per session.** The three variants (morning briefing, end-of-day rolldown, Friday weekly) differ in how far each primitive runs, not in whether it runs. Morning briefing skims; Friday weekly goes all the way to the bottom of each primitive's queue. You can set a default depth and override it per session. A Monday morning after a three-day weekend might warrant a Friday-depth run on a Monday.

*When to tune:* Before first use, pick your default depth. After first use, override per session as needed.

---

## Steps

**Step 1. Orient.** Name the variant for this session. Morning briefing, end-of-day rolldown or Friday weekly. If the practitioner has not chosen, default to morning briefing.

Pull up the four primitive skill files if they are not already loaded. This skill delegates. It does not re-implement. Each step below names the primitive it hands off to and the payload it passes in.

> "I have no one to delegate to" is the starting condition this skill addresses. By the end of Step 4, every open commitment in the business has a surface. Nothing lives only in the practitioner's head.

---

**Step 2. Email Triage.**

*Depth by variant:*
- Morning briefing: run the triage sort and surface today's action items. Flag anything time-sensitive. Do not draft replies unless the practitioner requests it.
- End-of-day rolldown: run triage sort on any messages received since morning. Flag tomorrow's priority items. Close the inbox mentally for the day.
- Friday weekly: run full triage including WAITING and READ LATER bucket review. Surface any thread that has gone stale past 7 days.

*Handoff from this step:* A list of today's action items sorted by type, client follow-up items, invoice triggers for completed jobs, unsigned-quote replies. These route into the steps below.

---

**Step 3. Customer Follow-Up cadence check.**

Read the customer notes file (Obsidian YAML or equivalent). Check every active customer's last-touchpoint date against today. Surface customers at or past their next scheduled touchpoint window.

Touchpoint windows from the primitive: +24-48h post-job thank-you, +14d referral ask, +90d maintenance check-in, +180d re-engagement.

Also route any client follow-up action items flagged in Step 2 here. If a customer appears in both the cadence queue and the email action items, consolidate into one outreach action.

*Depth by variant:*
- Morning briefing: surface names and touchpoint type only. The practitioner decides whether to act now or schedule.
- End-of-day rolldown: surface any touchpoints that became due today and were not acted on. Queue them for tomorrow morning.
- Friday weekly: run a full cadence audit across all active customers. Flag any customer who has dropped off the 180d window entirely. That customer is a lapsed relationship, not just a delayed touchpoint.

*Handoff from this step:* Named outreach list with touchpoint type and suggested message framing for each customer.

---

**Step 4. Invoice and Payment Tracker sweep.**

Pull the invoice ledger. Check paid/unpaid status. Surface outstanding invoices by days outstanding.

Also pull any invoice triggers from Step 2 (completed jobs mentioned in email that have not yet been invoiced). Same-session invoicing is the default for completed jobs; do not let a job leave this step without either an issued invoice or an explicit practitioner decision to defer.

*Depth by variant:*
- Morning briefing: surface overdue invoices (past due window) and any newly completed jobs needing invoicing. Two items maximum to keep the briefing tight.
- End-of-day rolldown: issue invoices for all jobs completed today. This is the primary close ritual for the end-of-day variant. Do not skip it.
- Friday weekly: full ledger review. Aged receivables analysis (0-30d, 31-60d, 60d+). Surface any invoice past 30 days outstanding for a follow-up call, not another email.

*Handoff from this step:* Invoices issued, outstanding balance total, overdue accounts flagged by name.

---

**Step 5. Quote Builder follow-up check.**

Pull the open quote log. Check issue date and status for every unsigned quote. Surface any quote that has reached the 48-72h follow-up window without a signed response.

For morning briefing and end-of-day variants, flag unsigned quotes by name and issue date only. The practitioner decides whether to act now.

For Friday weekly, run a full open-quote audit. Any quote past 7 days unsigned gets a status decision: follow up, reprice or close the opportunity. Quotes do not age gracefully. An unsigned quote past two weeks is an unanswered question that costs more to carry than to close.

*Handoff from this step:* List of unsigned quotes past their follow-up window, with customer name, quote amount and days outstanding.

---

**Step 6. Daily briefing summary.**

Consolidate the outputs from Steps 2-5 into a single briefing document. Format:

```
Date: [today]
Variant: [morning / end-of-day / friday-weekly]

Email action items: [count and list]
Customer touchpoints due: [names and touchpoint type]
Invoices outstanding: [count, total amount, overdue flagged]
Unsigned quotes past follow-up window: [names and days outstanding]

Today's three actions: [top three ranked by revenue or relationship urgency]
```

The three actions at the bottom are the practitioner's call. The skill surfaces what is due. The practitioner decides what runs first.

---

## Reference Implementations

This skill is the orchestration layer. It holds no data of its own. It reads what each primitive produces and sequences the reads.

**Email Triage integration.** Read the action items output from Email Triage. Route each action item to the appropriate downstream step: client-related items to Step 3, invoice triggers to Step 4, quote replies to Step 5. On morning briefing, the Email Triage run is the shortest of the day. On Friday weekly, the full bucket review runs including WAITING and READ LATER sweeps.

**Customer Follow-Up integration.** Read the customer notes file for all active customers. Compare last-touchpoint-date and touchpoint-type against today's date. Surface matches by window. Email Triage's client action items merge here to prevent duplicate outreach on the same customer in the same session.

**Invoice & Payment Tracker integration.** Read the invoice ledger. Check status fields. Surface overdue accounts. Merge any completed-job triggers from Email Triage as new invoice candidates. On end-of-day variant, this step is the primary ritual, not the secondary sweep.

**Quote Builder integration.** Read the open quote log. Check issue-date against today. Surface quotes past 48-72h unsigned. On Friday weekly, add a status-decision pass on any quote past 7 days.

**Substitutability.** The orchestrator is a starting point, not a requirement. Some practitioners prefer running primitives standalone, especially on days when only one function needs attention. A practitioner who knows their email is clear and their invoices are current can invoke Quote Builder or Customer Follow-Up directly without running the full briefing. The orchestrator's value is the sequence, not the lock-in. Power users run the primitives directly. The orchestrator serves the practitioner who would otherwise stare at the screen for 90 seconds deciding where to start. That 90-second decision tax, repeated daily, is a real friction point. The skill removes it.

---

## Outputs

**Morning briefing summary.** Single document covering email action items, customer touchpoints due today, invoice status and outstanding quotes. Five to ten minutes to produce. Three prioritized actions at the bottom.

**End-of-day rolldown summary.** Shorter document: new email items from the afternoon, any today-due touchpoints that need queuing for tomorrow, invoices issued for today's completed jobs, quote follow-ups due tomorrow. Five minutes or less.

**Friday weekly review document.** Full sweep output across all four primitives. Aged receivables analysis, full cadence audit, open quote status decisions, email backlog cleared. Saved to the practitioner's admin folder with the date. This document serves as the weekly snapshot of business health. It is also the document to pull up when a client asks "what is my outstanding balance" or "when did you last reach out to me."

---

## Worked Examples

### Monday Morning — Joel the tree trimmer

Joel finishes his coffee. It is 7:15 AM. He has four jobs scheduled today and is running the morning briefing before driving to the first site.

**Step 2 (Email Triage, briefing depth):** Three emails overnight. One is a client asking whether the quote from Thursday is still valid. One is a new inquiry from a property manager asking for a large-lot estimate. One is a past client saying the oak removal last week looks great. Triage routes: quote-validity question flags to Step 5; new inquiry is a new quote opportunity, flagged as today's first action; past client note is a relationship touchpoint, filed as a warm follow-up.

**Step 3 (Customer Follow-Up):** The cadence check surfaces two names. Marcus, last service was 14 days ago, referral-ask touchpoint due. Sandra, last service was 91 days ago, maintenance check-in due. The thank-you note from the past client email in Step 2 is the same person as Sandra. Consolidated: one outreach message covers both the relationship reply and the maintenance check-in.

**Step 4 (Invoice sweep):** Two unpaid invoices over 30 days. One for $480, one for $275. Both flagged for a phone call, not email. Three jobs completed last Friday have invoices already issued. No new invoice triggers from email this morning.

**Step 5 (Quote follow-up):** The client email from Step 2 is the same quote that hit 72 hours unsigned overnight. One unsigned quote from the new property manager inquiry does not exist yet (new inquiry, not an existing quote). Surfaces: follow up with the Thursday quote client today.

**Briefing summary:**
```
Date: Monday, [date]
Variant: morning-briefing

Email action items: 3 (1 quote follow-up, 1 new inquiry, 1 relationship reply)
Customer touchpoints due: Sandra (maintenance + relationship reply consolidated), Marcus (referral ask)
Invoices outstanding: 2 overdue (>30d). Call both. No new invoices needed today
Unsigned quotes past follow-up: 1 (Thursday client, 72h)

Today's three actions:
1. Call Thursday client on the quote before driving to job one
2. Send Sandra a combined reply + maintenance check-in message
3. Call both overdue invoice accounts during lunch
```

Joel looks at this list for 45 seconds. He knows exactly what to do before he leaves the driveway.

---

### Friday Weekly Review — Joel, end of week

It is Friday at 6:30 AM. No jobs are scheduled until noon. Joel runs the full weekly review.

**Step 2 (Email Triage, Friday depth):** Full bucket review. WAITING folder has six threads from the week. Two are resolved (clients replied). Two are overdue for follow-up from Joel. Two are informational threads he can archive. READ LATER has four items: one relevant industry note he scans in two minutes, three he marks done without reading. Action items from the full review: four threads need Joel's response before the weekend.

**Step 3 (Customer Follow-Up, Friday depth):** Full cadence audit. Fourteen active customers on file. Three have touchpoints due this week that were not acted on (two +14d referral asks, one +90d maintenance). One customer has gone past 180 days with no record of re-engagement outreach. Flag as lapsed. Joel decides to send a quick personal message to the lapsed customer before the weekend rather than waiting for Monday.

**Step 4 (Invoice sweep, Friday depth):** Aged receivables: 0-30d total $1,840 (four invoices, all on normal terms). 31-60d total $480 (one invoice, flagged). 60d+ total $0. Full ledger is clean except the one 31-60d account. No jobs completed today yet. Invoice for Thursday's job already issued.

**Step 5 (Quote follow-up, Friday depth):** Four open quotes. Two are within 48h (no action). One is at 72h (the same Thursday client from the Monday briefing, now five days unsigned; escalate from email to phone call). One is 12 days unsigned from a client who has not responded to the 72h follow-up. Status decision: Joel calls today or closes the opportunity. He decides to close it, notes it in the log and moves on.

**Weekly review document saved** to `admin/weekly-reviews/YYYY-MM-DD-friday.md`. Joel checks the document at Sunday night to orient Monday morning's briefing. He skips the step where he stares at the whiteboard trying to remember what was open.

---

## Constraints

The load-bearing benefit of this skill is one thing: the practitioner does not decide where to start. The briefing starts. The sequence runs. That is the value.

Do not add functionality beyond what the four primitives already provide. The orchestrator is a sequencer. It reads handoff payloads. It produces a consolidated summary. It does not have its own data model, its own customer records, its own invoice ledger. Those live in the primitives.

Do not let the ritual itself become avoidance. Research names this directly: a well-designed admin ritual can become a substitute for the actual actions it surfaces. The briefing is orientation, not resolution. If the practitioner finishes the briefing and feels productive without having acted on any of the three priority items, the ritual has inverted. The summary is not the work. The three actions at the bottom are the work.

Do not over-engineer the sequence. Five to ten minutes on a morning briefing means five to ten minutes. If the practitioner is spending thirty minutes on a morning briefing, one of two things has happened: a primitive is running too deep for the variant, or the practitioner is using the ritual to avoid the job site. Tune the depth seam (Make It Yours, Seam 3) before concluding the system is wrong.

The practitioner controls the sequence. The skill holds the sequence. These are different jobs. Do not conflate them.
