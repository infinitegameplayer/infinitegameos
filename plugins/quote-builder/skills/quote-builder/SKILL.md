---
description: Use when turning a service-business inquiry into a quote ready to send. Takes scope, cost, terms and customer details and produces the quote in your chosen format: email body, SMS summary or markdown/PDF. Triggered by a new job inquiry, a verbal estimate that needs writing down or a repeat customer asking for a price.
---

# Quote Builder

Purpose: Take an inbound inquiry and produce a clean, complete quote in the format you need. Email body for most sends. SMS summary for fast repeats. Markdown document for print or PDF export. The skill covers input gathering, output generation and the 48-72h follow-up trigger that research shows converts at the highest rate of any single discipline change a solopreneur can make.

The skill is a starting point. Your pricing judgment, your market and your customer relationships shape every quote it helps you produce.

## Pairing

Quote Builder is one of five skills in the Solopreneur Admin Toolkit.

- **Email Triage** (slug: `email-triage`) — sorts inbound email into service-business buckets, drafts replies and surfaces action items. Often where a quote request lands first.
- **Invoice & Payment Tracker** (slug: `invoice-payment-tracker`) — takes the accepted quote and converts it to a sent invoice. Tracks overdue balances.
- **Customer Follow-Up** (slug: `customer-follow-up`) — receives the follow-up trigger this skill fires at 48-72h and runs the full relationship cadence from there: thanks, referral ask, seasonal check-in, re-engagement.
- **Daily Admin Orchestrator** (slug: `daily-admin-orchestrator`) — the primary entry point for the toolkit. Runs a morning briefing and delegates to all four primitives in sequence. Start here if you are using the toolkit as a whole rather than invoking Quote Builder directly.

## Make It Yours

This skill ships with four input categories and three output formats. Out of the box it fits a tree trimmer, a handyman, a freelance designer, a coach or any service solopreneur who charges for labor plus materials or time. The default fields are generic. Your work is specific. Here is where to tune it.

**Seam 1. Input categories.** The four input categories (scope, cost, terms, customer) are your primary customization surface. Every service line has details that don't fit a generic template.

- Tree trimmer: add tree count, species if relevant, access notes (gate code, tight driveway, overhead lines), cleanup included or not.
- Freelance designer: swap labor hours for scope phases and revision rounds. Add deliverable types (logo, full brand kit, web assets).
- Coach: replace hours with session count, modality (video, phone, in-person) and program duration.
- Handyman: add room count, material responsibility (you supply vs. customer supplies) and permits if applicable.

Edit the scope-inputs block in Step 1 directly. Delete fields that don't apply. Add fields that are always on your quotes. Do this pass before first use, or after your first real quote surfaces what was missing. Budget 20-30 minutes with one recent quote in hand.

**Seam 2. Output format default.** The skill asks which format you want each run. If one format covers 90% of your sends, set it as your default in the prompt you use to invoke this skill. Email body is the most common default. SMS works best for repeat customers you already text. Markdown/PDF is the right call for new high-value bids where a polished document signals professionalism. Pick your default after one week of live reps, when you know what you actually reach for.

**Seam 3. Follow-up trigger timing.** The default follow-up is 48h after quote sent. Research on service businesses shows 30-40% of unsigned quotes convert with one follow-up in that window. That number drops sharply after 72h. Adjust the timing one direction: 24h for a hot lead who asked for a quick turnaround, 72h for a higher-value bid where you want to give the customer room to think. Tune this after a few cycles, not before.

## Steps

**Step 1. Gather scope inputs.** Collect the details that define the work.

Required fields:
- Service type (tree trimming, deck repair, brand identity, coaching program, etc.)
- Job address or service location
- Description of work. Be specific enough that the customer can confirm scope and you can price it without follow-up.
- Estimated duration (hours or days)
- Exclusions. Name what is not included when the boundary is ambiguous.

Optional but high-value:
- Site access notes (gate code, parking, physical constraints)
- Customer-supplied materials vs. operator-supplied
- Any prior work on the same site or customer

Halt if description is too vague to price. Ask one clarifying question, not five.

**Step 2. Gather cost inputs.** Collect the numbers that build the price.

Required fields:
- Labor rate (hourly or flat job rate)
- Labor hours or days
- Materials cost (if applicable)
- Materials markup percentage (if applicable; common range is 15-30% for service businesses)
- Subcontractor costs (if applicable)
- Travel or setup fees (if applicable)

Calculated output from these inputs:
- Labor subtotal = rate x hours (or flat rate)
- Materials subtotal = cost + (cost x markup)
- Total before tax = labor + materials + subcontractor + travel
- Tax (if applicable; prompt for rate if not configured)
- **Quote total**

Show the math. A quote the customer can check builds trust faster than a single number.

**Step 3. Gather terms inputs.** Collect the conditions that govern the transaction.

Required fields:
- Quote expiry date (default: 30 days from send date unless you have a reason for a different window; a quote with no expiry is a liability)
- Deposit requirement (percentage or flat amount, if any; standard for jobs over a threshold you define)
- Payment terms (due on completion / Net 7 / Net 14; Net 30 is too long for service work)
- Accepted payment methods

**Step 4. Gather customer inputs.** Collect the contact details for this quote.

Required fields:
- Customer name
- Customer email
- Customer phone
- Job site contact if different from billing contact (name and phone)

**Step 5. Select output format.** Ask the operator which format this quote goes out in.

Options:
- `email` — formatted email body, ready to paste into any email client
- `sms` — compressed plain-text summary under 160 characters for the core figure, with a follow-up line pointing to the full quote
- `markdown` — full structured document, printable or exportable to PDF via the operator's preferred tool

If the operator has set a default format, use it without asking.

**Step 6. Generate the quote.** Produce the quote in the selected format. Templates are in the Reference Implementations section below.

Email body: subject line, greeting, scope summary in plain language, itemized cost breakdown, terms, call to action, signature block. Readable without scrolling. One purpose per paragraph.

SMS summary: job type + total + expiry + one action line. Under 160 characters for the core amount. A second message pointing to the full quote is acceptable.

Markdown document: structured quote with all four input categories presented formally. Suitable for printing or PDF export. Carries the operator's name and contact as a header.

**Step 7. Fire the follow-up trigger.** This step is not optional.

After the quote is generated, output a follow-up trigger payload the operator can hand to Customer Follow-Up or to the Daily Admin Orchestrator.

The trigger contains:
- Customer name and contact
- Quote date
- Quote total
- Follow-up timing: 48h default (adjust to 24h or 72h per the operator's calibration)
- Follow-up message type: `quote-follow-up` (handled by Customer Follow-Up skill)
- Job brief: one-sentence job description for context when the follow-up fires

If the operator is running the Daily Admin Orchestrator, that skill picks up this payload automatically. If running Quote Builder directly, output the trigger as a block the operator can copy into their task manager, calendar or Customer Follow-Up prompt.

Research anchor: 30-40% of unsigned quotes convert with a single follow-up sent 48-72h after the quote. Most solopreneurs do not send it. This step is where that changes.

## Reference Implementations

The skill is tool-agnostic by design. Platform diversity across solopreneurs is too wide to couple to any one quoting tool. The formats below are output shapes, not locked templates. Substitute your preferred tool at every step without changing the workflow.

**Email body format:**

```
Subject: Quote for [service type] — [customer name] — [brief location]

Hi [customer name],

Thanks for reaching out. Here is the quote for [brief scope description].

SCOPE
[Description of work in 2-3 plain-language sentences. Name any exclusions.]

COST BREAKDOWN
  Labor: [hours or days] x $[rate] = $[subtotal]
  Materials: $[cost] + [markup]% markup = $[subtotal]
  [Other line items if applicable]
  ────────────────────────────
  Total: $[quote total]

TERMS
  Quote valid through: [expiry date]
  Deposit: [percentage or amount, or "none required"]
  Payment due: [due on completion / Net 7 / Net 14]
  Payment methods: [list]

To move forward, reply to this email or call/text me at [phone].

[Operator name]
[Business name]
[Phone]
[Email]
```

Substitutability: paste this into Gmail, Outlook, iCloud Mail, Proton Mail or any email client. Copy into HubSpot, Mailchimp or any CRM's email composer. No platform dependency.

**SMS summary format:**

```
[Service type] quote for [customer name]: $[total]. Valid [expiry date].
Reply YES to confirm or call [phone] for questions. Full quote by email.
```

Keep the first message at or under 160 characters if the total amount permits. If the total requires a longer line, split into two messages. Substitutability: send from any phone, iMessage, WhatsApp or any SMS-capable platform.

**Markdown document format:**

```markdown
# Quote

**Prepared for:** [Customer name]
**Date:** [Quote date]
**Valid through:** [Expiry date]

---

## Scope of Work

[Full description of work, 3-5 sentences. Name exclusions explicitly.]

## Cost Breakdown

| Item | Detail | Amount |
|------|--------|--------|
| Labor | [hours] x $[rate]/hr | $[subtotal] |
| Materials | $[cost] + [markup]% markup | $[subtotal] |
| Travel / Setup | | $[amount or "included"] |
| **Total** | | **$[total]** |

## Terms

- **Deposit:** [percentage or amount, or "none required"]
- **Payment due:** [due on completion / Net 7 / Net 14]
- **Accepted methods:** [list]

## Questions or Ready to Book?

[Operator name]
[Business name]
[Phone] | [Email]
```

Substitutability: export to PDF via Pandoc (`pandoc quote.md -o quote.pdf`), browser print-to-PDF, Obsidian's PDF export, Typora, iA Writer, VS Code with a markdown preview extension or any markdown-to-PDF tool the operator already uses. The markdown document is the input. The export tool is the operator's choice.

---

### Worked Example A: Tree Trimming (Joel)

**Inputs:**

- Service type: Tree trimming and removal
- Location: 412 Maplewood Drive, residential back yard
- Scope: Remove one 40-ft pine (dead, near fence line), trim three oaks for clearance from roof, haul debris to curb
- Duration: 1 day (6 hours labor)
- Exclusions: Stump grinding not included
- Access notes: Narrow side gate, max equipment width 30 inches
- Labor: $85/hr x 6 hrs
- Materials: Rope and rigging rental $60, no markup applied
- Travel: Included
- Quote expiry: 30 days
- Deposit: 25% on booking
- Payment terms: Balance due on completion
- Payment methods: Check, Venmo, Zelle

**Email body output:**

```
Subject: Quote for Tree Trimming and Removal — Patterson — Maplewood Drive

Hi [Customer name],

Thanks for reaching out. Here is the quote for the pine removal and oak trimming at 412 Maplewood Drive.

SCOPE
Remove one 40-ft dead pine near the fence line, trim three oaks for roof clearance and haul all debris to the curb. Stump grinding is not included in this quote.

COST BREAKDOWN
  Labor: 6 hours x $85/hr = $510.00
  Rigging rental: $60.00
  ─────────────────────────────────
  Total: $570.00

TERMS
  Quote valid through: [date 30 days out]
  Deposit: 25% ($142.50) due on booking
  Balance due on completion
  Payment: Check, Venmo, Zelle

Note: Side gate access required. Max equipment width 30 inches.
Please confirm gate will be accessible on the scheduled date.

To move forward, reply here or text me at [phone].

Joel
[Business name]
[Phone]
[Email]
```

**Follow-up trigger payload:**

```
FOLLOW-UP TRIGGER
Customer: [Name]
Phone / Email: [contact]
Quote date: [date]
Quote total: $570.00
Job: Tree trimming and removal, Maplewood Drive
Follow-up timing: 48 hours after quote sent
Message type: quote-follow-up
Action: hand to Customer Follow-Up skill or Orchestrator
```

---

### Worked Example B: Service-Agnostic Case (Coaching or Freelance Design)

**Inputs (coaching):**

- Service type: Leadership coaching program
- Location: Video sessions (Zoom)
- Scope: 6 biweekly coaching sessions, 60 minutes each, over 12 weeks. Includes async message support between sessions.
- Exclusions: Personality assessments not included
- Labor: $250/session x 6 sessions
- Materials: None
- Quote expiry: 14 days (coaching programs fill on a rolling basis; shorter window is appropriate)
- Deposit: 50% on booking
- Payment terms: Balance due before session 4
- Payment methods: Stripe, bank transfer

**Email body output:**

```
Subject: Quote for 6-Session Coaching Program — [Customer name]

Hi [Customer name],

Here is the quote for the 12-week leadership coaching program we discussed.

SCOPE
Six biweekly coaching sessions via Zoom, 60 minutes each, over 12 weeks.
Async message support available between sessions via email.
Personality assessments are not included in this package.

COST BREAKDOWN
  Coaching: 6 sessions x $250 = $1,500.00
  ──────────────────────────────────────
  Total: $1,500.00

TERMS
  Quote valid through: [date 14 days out]
  Deposit: 50% ($750) due on booking
  Balance due before Session 4
  Payment: Stripe, bank transfer

To confirm your spot or ask questions, reply here.

[Coach name]
[Phone] | [Email]
```

**Follow-up trigger payload:**

```
FOLLOW-UP TRIGGER
Customer: [Name]
Phone / Email: [contact]
Quote date: [date]
Quote total: $1,500.00
Job: 6-session coaching program, 12 weeks
Follow-up timing: 48 hours after quote sent
Message type: quote-follow-up
Action: hand to Customer Follow-Up skill or Orchestrator
```

---

## Outputs

1. **Quote in selected format** — email body, SMS summary or markdown document. Ready to send or export.
2. **Follow-up trigger payload** — structured block containing customer contact, quote date, job brief, quote total and trigger timing. Passes cleanly to Customer Follow-Up or Daily Admin Orchestrator.
3. **Cost math transparency** — itemized breakdown visible in the quote. Builds customer trust. Protects the operator from scope disputes.

## Constraints

- Never lock the operator to a specific quoting platform. The skill produces output the operator sends and stores however they choose. Wave, HoneyBook, Jobber, QuickBooks, Google Docs, a plain email: all are valid delivery surfaces.
- The follow-up trigger at 48-72h is not optional. Research is consistent: it is the highest-leverage single discipline change in a service business. It fires on every quote, every time. The only tuning is timing, not whether.
- Quote expiry date is required. A quote with no expiry is open-ended liability. The operator sets the window. The default is 30 days. Shorter windows are appropriate for time-sensitive materials, peak-season pricing or programs that fill on a rolling basis.
- Deposit terms must be explicit or explicitly waived. "No deposit required" is a valid terms line. Silence is not.
- The skill does not submit, send or post anything. It produces output. The operator reviews and sends. Every time.
- Never produce a quote without the cost breakdown visible. A single total with no line items is a guess dressed as a number. Show the math.
- Tool substitution is always available. Every reference format names its export or send path as operator choice. If a format or tool listed in Reference Implementations doesn't fit the operator's stack, swap it. The discipline (four input categories, three format options, 48-72h trigger) holds across all substitutions.
