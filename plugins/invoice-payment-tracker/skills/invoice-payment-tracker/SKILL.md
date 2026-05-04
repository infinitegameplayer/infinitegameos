---
description: Use to generate invoices and track paid/unpaid status after every job close. Hybrid architecture routes to Wave, FreshBooks, generic markdown-PDF or paste-into-other-tool based on practitioner setup. Same-day invoicing on job close is the load-bearing discipline. Pairs with Quote Builder and Daily Admin Orchestrator.
---

# Invoice & Payment Tracker

Purpose: Generate a complete, accurate invoice the moment a job closes and maintain a running paid/unpaid ledger. The skill is a starting point. The operator's business terms, platform choice and tracking preferences shape it from there.

Trigger: A job is complete and ready to bill. An invoice is overdue and needs a follow-up. The morning briefing surfaces unpaid balances. The operator wants a weekly payment status sweep.

---

## Pairing

Invoice & Payment Tracker pairs with three other skills in the solopreneur admin toolkit.

**Quote Builder** feeds this skill directly. When a quote is accepted, the line items, labor rate, materials and terms flow into the invoice without re-entry. The invoice is a confirmed quote with a due date attached.

**Customer Follow-Up** picks up when an invoice passes its due date without payment. The overdue sequence (reminder at due date, call prompt at +3 days, final notice at +7 days) lives in Customer Follow-Up, not here. This skill generates the handoff trigger.

**Daily Admin Orchestrator** is the primary entry point for most operators. The morning briefing surfaces unpaid invoices, flags overdue balances and queues same-day invoicing for jobs closed the prior day. Run this skill standalone when a job closes mid-day and needs an invoice immediately.

---

## Make It Yours

This skill is a starting point. Three seams invite operator customization. Shape them before and after first use.

**Seam 1: Platform selection.** At first run, the skill asks where you send invoices today and branches to the matching path: Wave free tier, FreshBooks paid, generic markdown-PDF or paste-into-other-tool. This is the keystone decision. It determines which template loads, what fields are required and how the tracking row gets written. Pick the platform that matches your actual billing practice, not the one that sounds most polished. You can switch later by re-running first-run setup. *When to do it: before first use. Takes five minutes.*

**Seam 2: Invoice template content.** The default template carries placeholder values for line item descriptions, payment terms, late fees and tax handling. These placeholders are not your business. Edit them to match your actual terms before you send a real invoice. At minimum: your standard labor rate description, your payment terms (Net 7 is the recommended default for service work), whether you charge a late fee and at what rate. Also confirm how you handle sales tax in your jurisdiction. *When to do it: before first use, alongside platform selection. Budget 15 to 20 minutes.*

**Seam 3: Payment tracking surface.** Generic-path operators track paid/unpaid in a local Obsidian table. Platform-coupled operators (Wave, FreshBooks) rely on the platform's native status. Either way, the tracking view belongs to you. After two weeks of reps you will know whether you need additional columns (deposit received, partial payment, disputed), whether you want a Dataview query surfacing overdue rows or whether the platform's dashboard already does what you need. *When to do it: after two weeks of reps, when patterns emerge.*

---

## Steps

**Step 1. First-run platform selection (run once, skip on subsequent uses).**

If this is the operator's first run, surface the routing question before any invoice work:

> "Where do you send invoices today? Options: (a) Wave, free tier, browser-based; (b) FreshBooks, paid subscription; (c) Generic markdown-PDF, I export or print from a markdown file; (d) Paste-into-other-tool, I'll paste the output into my own system."

Record the selection. All subsequent runs skip this prompt and load the matching branch.

If the operator selects (a) Wave or (b) FreshBooks, confirm they have an active account and working login before proceeding. The skill uses platform-specific field labels and output formats for those branches. If credentials are unavailable, default to the generic branch and flag the setup gap.

**Step 2. Gather invoice inputs.**

Collect the following. If a Quote Builder output is available, pull fields directly rather than re-prompting.

Required fields:
- Client name, billing email, billing address (or "same as job site")
- Job description (one-line summary)
- Line items: description, quantity, unit price for each (labor, materials, travel, other)
- Invoice date (default: today)
- Due date (default: invoice date + 7 days for Net 7; adjust to operator's configured terms)
- Invoice number (auto-increment from the operator's last invoice number, or operator-supplied)

Optional fields:
- Deposit already received (deducts from total due)
- Materials markup percentage
- Sales tax rate (see Constraints for jurisdiction note)
- Late fee terms (e.g., 1.5% per month after due date)
- Notes field (access instructions, satisfaction check-in language, payment method instructions)

**Step 3. Generate the invoice per platform branch.**

*Branch A: Wave.*

Produce a formatted invoice body using Wave's standard field labels. Output includes: Wave invoice header fields (client, invoice number, invoice date, due date), line items table, subtotal, tax line (if applicable), total due. Include a plain-text note block the operator pastes into Wave's "Note to client" field. Flag any field Wave requires that was not supplied.

*Branch B: FreshBooks.*

Produce a formatted invoice body using FreshBooks field labels. Output includes: client, invoice number, issue date, due date, line items with descriptions and amounts, tax line, total. Include FreshBooks-specific note: if the operator uses FreshBooks' online payment link, remind them to enable it before sending. Flag missing required fields.

*Branch C: Generic markdown-PDF.*

Produce a complete markdown invoice document ready for PDF export. Standard structure:

```
# Invoice

**From:** [Operator name, business name, contact info]
**To:** [Client name, address, email]
**Invoice #:** [number]
**Date:** [invoice date]
**Due:** [due date]

---

| Description | Qty | Unit Price | Amount |
|---|---|---|---|
| [line item 1] | | | |
| [line item 2] | | | |

**Subtotal:** $[amount]
**Tax ([rate]%):** $[amount]
**Total Due:** $[amount]

**Payment terms:** Net [n] days. [Late fee language if configured.]
**Accepted payment methods:** [list]

[Notes / access instructions / thank-you line]
```

Save to `invoices/YYYY-MM-DD-[client-slug]-[invoice-number].md`. Instruct the operator to export via their markdown tool (Obsidian, Typora, VS Code + extension or Pandoc) for PDF delivery.

*Branch D: Paste-into-other-tool.*

Produce a plain-text invoice body with clean formatting suitable for pasting into any tool: QuickBooks, spreadsheet, email, Word, Google Docs. No markdown syntax. Label fields with plain labels (Invoice Number:, Client:, Due Date:, etc.). Total, line items and terms in a readable block. No file saved by default; operator copies the output.

**Step 4. Same-day invoicing discipline.**

Before closing the invoice-generation step, confirm the invoice will be sent today. If the job closed today, the invoice goes out today. Not at end of week. Not when the next batch is ready. Today.

If the operator indicates they want to batch invoices or delay, surface the cost: delayed invoicing is the single highest-leverage failure point in solopreneur cash flow. A one-week delay on three $500 jobs is $1,500 of float absorbed by your business for no reason. Send it now.

If the invoice is for a prior job (opened during a Daily Admin Orchestrator morning briefing), flag the date gap and send immediately.

**Step 5. Log the invoice in the payment tracker.**

*Generic-path operators (branches C and D):*

Append a row to the payment tracker file at `invoices/payment-tracker.md`. Table structure:

```
| Invoice # | Client | Job | Date | Due | Amount | Status | Paid Date | Notes |
|---|---|---|---|---|---|---|---|---|
```

Status values: `unpaid`, `paid`, `overdue`, `partial`, `disputed`.

Create the file with the header row if it does not exist.

*Platform-coupled operators (branches A and B):*

The platform tracks status natively. Log a one-line entry in the local Obsidian daily note or a lightweight `invoices/sent-log.md` as a backup reference. Format: `[date] Invoice #[n] to [client] for $[amount] via [platform].`

**Step 6. Overdue check and follow-up handoff.**

At each run, scan the payment tracker for rows where status is `unpaid` and the due date has passed. For each overdue invoice:

- Surface the invoice number, client, amount and days overdue.
- Recommend the appropriate follow-up action per the overdue ladder: reminder message at due date, phone call prompt at +3 days, final notice at +7 days.
- Hand off to Customer Follow-Up for the actual message drafting and touchpoint scheduling.

Do not draft overdue messages in this skill. The boundary is firm: Invoice & Payment Tracker generates invoices and tracks status; Customer Follow-Up owns the client communication cadence.

---

## Reference Implementations

The skill names specific platforms as reference implementations. Each is substitutable. The structural discipline holds across all of them.

**Wave (free tier).** Browser-based invoicing and payment tracking at wave.com. Free for unlimited invoices and basic accounting. Online payment processing available at a transaction fee. Best fit for solopreneurs who want a lightweight platform without a monthly subscription. Wave's invoice fields map directly to Branch A output. Substitutable with: Zoho Invoice (free tier), Invoice Ninja (self-hosted free tier), PayPal Invoicing.

**FreshBooks (paid).** Cloud accounting platform with strong mobile invoicing, time tracking and recurring invoice support. Paid subscription starting at the Lite tier. Best fit for solopreneurs already using FreshBooks for expense tracking or who want native payment processing with ACH and card. Substitutable with: QuickBooks Simple Start, Xero, HoneyBook (service-business focused).

**Generic markdown-PDF.** No platform required. Markdown invoice document exported to PDF via any tool the operator already uses. Best fit for operators who prefer local files, want no subscription cost and have a PDF export path (Obsidian to PDF, Pandoc, VS Code). Substitutable with: Google Docs template, Word template, LibreOffice template. The file format is the operator's choice; the field structure is the reference.

**Paste-into-other-tool.** Plain-text output copied manually into any existing billing or tracking system. Best fit for operators already committed to a specific tool (QuickBooks, Harvest, Bonsai) who want AI-assisted invoice drafting without platform lock-in. Substitutable with any tool that accepts pasted text input.

**Substitutability note:** Any platform that accepts invoice inputs (client, line items, date, terms) and produces a deliverable invoice is substitutable for the reference implementations above. The skill's structural discipline (same-day invoicing, complete line item capture, paid/unpaid tracking, overdue handoff) holds regardless of which platform the operator uses. Switching platforms means re-running Step 1 and updating the invoice template content in Step 2. No other steps change.

**Jurisdiction note:** Tax compliance requirements and late-fee enforceability vary by jurisdiction. The skill provides configurable fields for tax rate and late fee terms. The operator is responsible for confirming the correct tax rate for their jurisdiction, whether sales tax applies to their service type and whether their late-fee terms comply with applicable consumer protection rules. This skill does not provide tax or legal advice.

---

## Outputs

**Per invoice run:**
- Invoice in the selected format: Wave or FreshBooks body for platform-coupled operators; markdown-PDF document at `invoices/YYYY-MM-DD-[client-slug]-[invoice-number].md` for generic-path operators; plain-text block for paste-into-other-tool operators.
- Payment tracker row appended (generic-path) or sent-log entry appended (platform-coupled).
- Same-day send confirmation or explicit gap flag if the invoice is for a prior job.

**Per overdue check:**
- Overdue invoice list with client, amount, days overdue and recommended follow-up action per the overdue ladder.
- Handoff note for Customer Follow-Up with the invoice number, client contact and appropriate touchpoint type.

---

## Worked Examples

### Example 1: Tree trimming, generic markdown-PDF path

**Setup:** Tomas, tree trimmer. First run, selected generic markdown-PDF. Invoice template updated with his Net 7 terms and 1.5% monthly late fee. No sales tax in his state for labor-only jobs.

**Inputs:** Client: Sandra Park, 4402 Elm St. Job: Remove two dead limbs, haul debris. Labor: 3.5 hours at $95/hour. Debris disposal: $40 flat. Job closed today.

**Output:** Markdown invoice document at `invoices/2026-05-03-sandra-park-0042.md`. Line items: "Dead limb removal and debris haul, 3.5 hrs @ $95" = $332.50, "Debris disposal" = $40.00. Subtotal: $372.50. No tax. Total due: $372.50. Due: 2026-05-10 (Net 7). Late fee language: "Invoices unpaid after due date accrue 1.5% per month." Payment methods: Venmo, check.

Tracker row appended: `| 0042 | Sandra Park | Dead limb removal | 2026-05-03 | 2026-05-10 | $372.50 | unpaid | | |`

Step 4 prompt: "Invoice 0042 is ready. Send it to Sandra today. Job closed today."

### Example 2: Freelance design project, FreshBooks path

**Setup:** Maya, freelance brand designer. Existing FreshBooks Lite subscriber. First run, selected FreshBooks. Invoice template updated with Net 14 terms, 2% monthly late fee, 8.25% sales tax (Texas, consulting services taxable).

**Inputs:** Client: Northgate Coffee Co., billing contact ops@northgatecoffee.com. Job: Logo package and brand guide. Deliverables: logo files (5 hrs @ $120), brand guide document (8 hrs @ $120), revision round (2 hrs @ $120). Job closed today.

**Output:** FreshBooks-formatted body. Line items: "Logo design and source files, 5 hrs @ $120" = $600.00, "Brand guide document, 8 hrs @ $120" = $960.00, "Revision round, 2 hrs @ $120" = $240.00. Subtotal: $1,800.00. Tax (8.25%): $148.50. Total due: $1,948.50. Due: 2026-05-17 (Net 14). Note to client: "Files delivered via shared folder link in prior email. Reach out with questions within 14 days of receipt."

Reminder to Maya: "Enable the FreshBooks online payment link before sending if you want card or ACH payment." Sent-log entry: `2026-05-03 Invoice #0017 to Northgate Coffee Co. for $1,948.50 via FreshBooks.`

---

## Constraints

- This skill generates invoices and tracks paid/unpaid status. It does not replace accountant counsel for tax handling, sales tax nexus determination, revenue recognition or compliance questions. Tax rate and late-fee fields are configurable inputs; the operator confirms the correct values for their jurisdiction.
- Same-day invoicing on job close is the load-bearing discipline. Every drift toward "I'll invoice later" or "I'll batch them at end of week" costs real cash flow. The skill will flag delayed invoicing and prompt immediate action. This is not a soft reminder. It is the highest-leverage behavior change in solopreneur billing.
- Platform credentials for Wave and FreshBooks are operator-managed. The skill does not store or transmit login credentials.
- The overdue follow-up sequence lives in Customer Follow-Up. This skill generates the handoff trigger only. Do not draft overdue messages here.
- Invoice number sequencing is the operator's responsibility. The skill uses operator-supplied numbers or auto-increments from the last logged number. Gaps or duplicates in the sequence are flagged but not corrected automatically.
- The generic markdown-PDF branch produces a markdown document. PDF export requires a tool the operator already has. Common options: Obsidian's built-in PDF export, Pandoc, VS Code with a markdown-pdf extension. The skill does not install or configure export tooling.

---

## Operating Posture

The invoice is not paperwork. It is the final act of the job. A job is not done until the invoice is sent. Same-day. Complete. With payment terms that protect your cash flow. The skill's job is to make that act take less than three minutes so there is no reason to defer it.
