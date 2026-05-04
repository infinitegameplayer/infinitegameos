---
description: Use when email has piled up and you need it sorted before you can think. Categorizes inbound messages into seven service-business buckets, drafts replies for repeating scenarios and surfaces action items so nothing gets missed. Triggered by end-of-day inbox sessions, Monday morning catch-ups or any time email volume is creating drag on the actual work.
---

# Email Triage

Purpose: Help a service-business solopreneur move through an inbox without losing an hour to it. Sort every message into one of seven named buckets, draft replies for the patterns you send every week and pull out every action item buried in long threads. The skill is a starting point. Your email patterns, your tone and your follow-up timing make it yours.

Trigger: You finish a day on site and have fifteen emails to process. You open Monday morning to a weekend backlog. A client thread has gone three messages deep and you need to respond before the job falls behind. You want to automate the first-sort pass so triage takes twelve minutes, not forty-five.

Inputs:
- `inbox` (required): the email messages to triage. Paste directly, describe the thread or connect via an automation layer (n8n, Make, Zapier) that feeds messages on arrival.
- `buckets` (optional, defaults to the seven below): operator-customized bucket names and routing rules. Edit before first use.
- `reply_templates` (optional): two to three of your actual sent replies per scenario. Seeded from the examples in this skill; replace them with your own voice.
- `follow_up_triggers` (optional): timing overrides for the default follow-up windows.

Outputs: categorized inbox, draft replies for flagged messages, action-item list, handoff payload for Daily Admin Orchestrator.

This skill exists because email without structure turns into a second job. A tree trimmer who spends forty-five minutes on email after a full day on site is spending real money. Categorization at intake removes the "what is this?" decision. Draft replies for repeating scenarios remove the blank-page problem. Action-item surfacing removes the missed-buried-ask problem. What's left is twelve minutes of actual decisions.

## Pairing

Email Triage is one of five skills in the Solopreneur Admin Toolkit. The skills are designed to run together or independently.

- **Quote Builder** — turns an inquiry that surfaced in triage into a formal quote, with 48 to 72 hour follow-up built in.
- **Invoice and Payment Tracker** — picks up payment threads from triage, logs paid and unpaid, handles same-day invoicing on job close.
- **Customer Follow-Up** — owns the relationship cadence after a job closes: thanks at 24 to 48 hours, referral ask at 14 days, maintenance check-in at 90, re-engagement at 180.
- **Daily Admin Orchestrator** — the morning-briefing entry point that calls all four primitives in sequence. Start here if you want the full kit running at once.

The Orchestrator is the delegation surface. The four skills above are what it delegates to. Email Triage is the first step in every Orchestrator run.

## Make It Yours

This skill ships as a starting point. It is the bone. You are the muscle.

The seven buckets and the reply templates below are defaults that fit a service-business operator in general. They do not fit your inbox specifically until you edit them. The three highest-leverage seams, in priority order:

**Seam 1: Bucket names and routing rules.** The seven bucket names below are labels you can rename to match your actual email patterns. A tree trimmer might rename "Vendor and Supplier" to "Equipment and Crews." A handyman might split "New Job Inquiry" into "New Residential" and "Property Manager." The routing rules (which sender domains, subject keywords or from-address patterns trigger each bucket) are entirely yours. Do this before first use. It takes fifteen to thirty minutes with a real inbox batch as input. Open a week of email and ask: which bucket would this actually land in? Adjust until the labels feel like yours.

**Seam 2: Draft reply tone.** The reply templates in this skill are written neutral and professional. Most service-business operators sound warmer and more direct than that. Your version of "thanks for reaching out" is different from the template. Replace the three example templates with two or three real replies you have actually sent. Pull them from your Sent folder. Paste them in. One pass retrains the tone. Do this before first use if you have strong voice instincts, or after the first week of live reps when your natural patterns have surfaced.

**Seam 3: Follow-up trigger timing.** The default follow-up windows (24 hours for new inquiry, seven days for unpaid invoice, four hours for active job message) are calibration anchors, not rules. A plumber in a competitive market may set inquiry follow-up to two hours. A coach with a slower sales cycle may set it to 72 hours. Trigger timing is where your business rhythm lives. Set it after one week of live reps when you have a feel for what actually needs urgency.

Run a brainstorm pass on this skill before first use or after a first run that surfaces gaps. Edit the SKILL.md directly. The skill is a substrate. You are the operator. Make it yours.

## Steps

**Step 1. Load inbox.** Receive the batch of messages to triage. In an automated setup, the automation layer feeds messages one at a time or in a batch as they arrive. In a manual session, paste the message list or describe the threads in queue. Halt if inbox is empty; nothing to do.

Note the session context: is this a morning catch-up, an end-of-day pass or a real-time interrupt? Morning catch-ups process all pending messages. End-of-day passes prioritize active job threads and invoices. Real-time interrupts triage the single message in hand.

**Step 2. Categorize into seven buckets.** Route each message to exactly one bucket based on sender, subject line, keywords and thread context. The seven default buckets:

| Bucket | What Lands Here |
|---|---|
| **New Job Inquiry** | First-time leads, quote requests, website contact form submissions, word-of-mouth referrals reaching out cold |
| **Active Job: Client** | Messages from clients on jobs currently in progress: questions, schedule changes, on-site access notes, scope additions |
| **Scheduling** | Appointment requests, reschedule asks, calendar confirmations, Calendly or booking-link notifications |
| **Invoices and Payments** | Outbound invoice acknowledgments, payment receipts, past-due notices, payment plan requests |
| **Vendor and Supplier** | Equipment suppliers, material orders, subcontractor coordination, tool rental confirmations |
| **Admin and Compliance** | Permits, insurance certificates, licensing renewals, business registration, tax documents, bank notices |
| **Noise** | Marketing emails, newsletters, promotional offers, auto-generated notifications that require no action |

Apply the 4 D's at the bucket level: Do (needs a reply or action today), Defer (needs action but not today), Delete (no action required). For the Noise bucket, automated archive or unsubscribe on first occurrence.

**Worked Example — Monday Morning, 18 emails:**

Joel's inbox arrives pre-sorted by automation. The classification has already run.

- 4 × New Job Inquiry. Two have draft replies ready (estimate request pattern, recognized from subject line and sender domain). Joel reviews each in ninety seconds, edits one sentence, sends. Two are complex enough to need a site visit before quoting. He marks them Defer and logs them as action items for the afternoon callback list.
- 3 × Scheduling. All three are confirmation requests for this week. Joel confirms each in one click.
- 2 × Invoices and Payments. One invoice is acknowledged as paid. One is seven days past due. The past-due draft reply is already written. Joel reviews it, adds the client's first name, sends.
- 1 × Admin and Compliance. Insurance renewal notice. Not due for 30 days. Deferred with a date tag.
- 8 × Noise. Automated archive. Zero manual time.

Total: eleven minutes. Fifteen messages handled. Three deferred for later.

**Step 3. Flag action items.** For every message that contains an embedded ask or a time-sensitive element, extract and list the action item explicitly. Long threads from property managers often contain three asks in one email. Surface them as a numbered list so none are missed.

Action-item format:

```
[ ] Reply to [sender] re: [topic] — by [date or trigger]
[ ] Call [client] to discuss [scope item]
[ ] Prepare quote for [service] before [deadline]
[ ] Follow up on invoice [#] — unpaid at 7d
```

Surface action items from every bucket except Noise. Active Job: Client and New Job Inquiry threads generate the most. Admin and Compliance threads often carry hard deadlines that are easy to miss.

**Step 4. Generate draft replies.** For every message in a flagged bucket (New Job Inquiry, Invoices and Payments, Active Job: Client) that matches a repeating scenario, produce a draft reply. Default scenarios and starter templates:

**Scenario A: Estimate request (New Job Inquiry)**

```
Subject: Re: [original subject]

Hey [first name],

Thanks for reaching out. Happy to take a look.

To get you an accurate number I'll need to see the site. Can you do [day] or [day] this week?

[Your name]
[Phone]
```

Replace this template with two or three real estimate-request replies from your Sent folder. Your tone, your phrasing, your closing. One paste pass is all it takes.

**Scenario B: Invoice follow-up (Invoices and Payments, past due)**

```
Subject: Re: Invoice [#] — [job description]

Hey [first name],

Just following up on invoice [#] from [date]. Total is [amount]. Let me know if you have any questions or if something came up.

[Your name]
[Phone]
```

**Scenario C: Scheduling confirmation (Scheduling)**

```
Subject: Re: [appointment topic]

Confirmed for [day], [date] at [time]. I'll be there.

If anything changes on your end, just shoot me a text.

[Your name]
```

For messages that don't match a repeating scenario, surface the key context (sender, subject, embedded asks) and note that a reply requires the operator's judgment. Do not draft a reply where the content does not fit a reliable template.

**Worked Example — Estimate Request Draft:**

Incoming: "Hi, I saw your truck in the neighborhood. We have three oaks that need trimming and one dead one we think needs to come down. Can you give us a price?"

Bucket: New Job Inquiry.

Draft reply pulled from Scenario A, first name extracted as "there" (no name given), placeholders for days:

> Hey there, thanks for reaching out. Happy to take a look at those trees. To give you an accurate number I'll need to see the site. Can you do Tuesday or Thursday this week?

Joel edits "there" to the name from the email signature, picks days that match his schedule, sends.

**Step 5. Apply follow-up triggers.** Check each action item against the default follow-up windows. Surface any item that needs a scheduled follow-up:

- New Job Inquiry not replied to within 24 hours: flag for follow-up.
- Estimate sent, no response at 48 hours: flag for follow-up (hands off to Quote Builder).
- Invoice unpaid at 7 days: flag for follow-up draft.
- Active Job: Client message unread or unanswered at 4 hours: flag as urgent.

These triggers are calibration anchors. Adjust them in your local copy before live use.

**Step 6. Produce handoff payload.** Package the triage session output for Daily Admin Orchestrator or the next relevant skill:

- Categorized message list with bucket assignments.
- Action-item list with owners and deadlines.
- Draft replies awaiting operator review and send.
- Follow-up triggers queued (with timing).
- Any messages requiring Quote Builder (new inquiries needing estimates).
- Any messages requiring Invoice and Payment Tracker (new payment events, past-due flags).

If running inside Daily Admin Orchestrator, the handoff payload feeds directly into the next skill in the sequence. If running standalone, surface the payload as a structured summary the operator works from.

## Reference Implementations

This skill describes actions, not buttons. Every step that names a tool is a reference, not a requirement. Substitute component by component to match your stack.

**Reference email client:** Gmail. Every step below that touches an email client is written for Gmail. Outlook and Apple Mail handle the same actions through different menus; the equivalents are noted inline.

**Reference automation layer:** n8n (self-hosted) or Make.com (cloud). For operators who want incoming messages to be pre-categorized before they open their inbox, an n8n or Make workflow fires a classification prompt on each incoming message, tags it by bucket and queues a draft reply for flagged scenarios. n8n has a published Eisenhower/GPT triage template that adapts to this skill's bucket structure in under two hours. Make.com is the lower-friction cloud path.

For operators running manual sessions without automation: skip the pre-sort and run Steps 2 through 4 message by message. The skill works without automation. Automation multiplies the time savings.

**Gmail-specific steps:**

Creating a label per bucket: Settings > Labels > Create new label. Label names match bucket names. Apply labels manually during triage or via Gmail filter rules (Settings > Filters and Blocked Addresses > Create a new filter).

Filtering Noise automatically: Create a Gmail filter for known newsletter domains and promotional senders. Action: Skip Inbox, Apply label "Noise," Mark as read. First-occurrence unsubscribe is always worth doing; automation handles recurrence after that.

Archive shortcut: Select message, press `e`. Out of the inbox. Not deleted. Searchable.

> Outlook users: Rules (Home > Rules > Create Rule) replaces Gmail filters. Focused Inbox partially automates the Noise cut. Labels are called Folders or Categories.

> Apple Mail users: Rules (Mail > Preferences > Rules) replaces Gmail filters. Smart Mailboxes surface bucket views. VIP list handles priority routing for active client threads.

**Substitutability:** Any email client works. Any automation layer that can send a message's subject and body to a language model and receive a category label back works. The structural discipline (seven-bucket sort, action-item extraction, draft reply for repeating scenarios, follow-up trigger logging, handoff payload) holds across every stack. This is reference, not requirement.

## Outputs

**Categorized inbox:** every message in the batch assigned to exactly one of the seven buckets, with the routing rationale noted for any ambiguous assignment.

**Draft replies:** one draft per flagged repeating-scenario message, ready for operator review and send. Not auto-sent. The operator sends.

**Action-item list:** every time-sensitive or decision-requiring element extracted from all non-Noise threads, formatted as a numbered checklist with deadlines or trigger conditions.

**Follow-up trigger queue:** messages that need a follow-up at a future time, with the trigger window noted and the scenario type flagged (inquiry, invoice, scheduling, active job).

**Handoff payload:** structured summary for Daily Admin Orchestrator or for direct operator use. Includes bucket counts, draft count, action-item count and any items that require Quote Builder or Invoice and Payment Tracker.

## Constraints

- Noise bucket is auto-archived. Never manually triage a promotional email twice. First-occurrence unsubscribe is always worth thirty seconds; automation handles it after that.
- Do not urgency-score without operator-defined rules. A model reading email content has no way to know which sender is worth $8K per year and which is a one-time job. Urgency scoring without explicit sender lists or keyword triggers is theater. Default posture: flag New Job Inquiry and Active Job: Client as priority buckets. Everything else routes by category, not by inferred urgency.
- Draft replies are drafts. The operator reviews and sends. This skill never auto-sends. Sending a reply the operator hasn't reviewed creates liability and breaks trust with clients.
- Do not attempt to guess the operator's tone from a single email. Tone calibration requires the operator's own Sent folder examples. Until Seam 2 is completed, all drafts ship in the neutral professional default.
- Scheduling confirmation drafts are low-risk enough for fast approval; estimate and invoice drafts warrant a closer read before sending.
- Two triage sessions per day is the target rhythm. On-demand triage turns the inbox into a second task manager. Fixed windows (morning and end of workday) reduce context-switching drag. Real-time interrupts are for Active Job: Client threads during active jobs only.
- This skill does not decide what to do about messages. It surfaces. The operator decides. The skill's job is to make decisions fast, not to make decisions for you.

## Operating Posture

The inbox is a sorting problem, not a task manager. Sort it fast. Extract what needs action. Draft what you send every week. Archive what never needed your attention. Hand the rest to the right skill. What's left is twelve minutes and a clear head before the first job of the day.
