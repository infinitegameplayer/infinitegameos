---
description: Use when executing an approved 9-post social batch draft (status `approved-pending-scheduling`). Owns the downstream pipeline: image rendering, asset staging, scheduler integration with channel discovery and slot resolution, and post-publish manual handoff surfacing. Triggered by Social Batch Drafting at the queue phase, or direct invocation on any approved batch file.
---

# Social Batch Queue

Purpose: Take an approved 9-post batch draft and ship it as scheduled posts. Image generation, template edits, asset staging, scheduler integration, channel discovery, slot resolution and post-publish handoff all live here. The skill exists because the path from approved copy to scheduled posts has too many moving pieces to run ad-hoc reliably.

Trigger: A batch file in your social drafts directory advances to `status: approved-pending-scheduling`. The Social Batch Drafting skill's handover map names this skill at the queue phase. Operator invokes directly on any approved batch file.

Inputs: A `batch_path` to the approved batch markdown file. Optional: `desktop_review_pause` (default `true` for the first several runs), `desktop_folder` for review images, `failure_protocol_active` (default `true`).

Outputs: A Desktop review folder with all rendered images, asset URLs from your staging service, scheduled posts in your social scheduler with permalinks captured, an updated batch file with execution log entries and a structured manual-handoff list for the operator.

## Pairing

This skill pairs with **Social Batch Drafting**. Drafting produces the approved batch file; this skill consumes it. The two work as a flywheel. The boundary is firm: voice and copy are Drafting's responsibility; execution and scheduling are Queue's. If a voice violation surfaces during execution, Queue halts and routes back to Drafting.

## Make It Yours

This skill is a starting point, not a finished tool. The reference stack (fal.ai for background generation, a self-hosted local renderer for card generation, Vercel Blob for staging, Buffer via MCP for scheduling) is what the author runs. It works. It is not the only thing that works.

The structural discipline is the portable part: Desktop review pause before queuing, self-validation on every render, heading overflow detection from the actual render rather than character count alone, channel IDs discovered at run-time rather than hardcoded, native-isolation test as the first failure-protocol move. That discipline holds across every stack combination below.

**Image pipeline substitutions.** Background generation works with any tool that produces a 16:9 PNG at your size target. Midjourney, DALL-E, Adobe Firefly, a Stable Diffusion endpoint or a manual export all land in the same slot. Card rendering works with any tool that supports programmatic text and image replacement, whether a local headless browser running an HTML/CSS template, Canva via MCP, or a manual design-tool pass. The Refinements section is where you'll log your template's specific character budgets and any stack-specific offsets as you discover them.

**Scheduler substitutions.** Buffer is the reference. Hypefury, Typefully, Later, Publer, native platform scheduling or any scheduler with an API and channel discovery all work in the same slot. The key rule stays regardless of tool: discover channel IDs at run-time. Don't hardcode. A disconnect rotates the ID on most platforms.

**Staging substitutions.** Vercel Blob, S3, R2, Cloudinary, Imgix, a public GitHub release asset, a shared Dropbox folder with a public link: anything that produces a stable HTTPS URL works. The scheduler just needs the URL.

Edit the Steps to name your stack explicitly before first use. The author's tool names are breadcrumbs, not requirements. The skill is a substrate. You are the operator. Make it yours.

## Reference Implementations

This skill names a specific stack as the reference implementation, then frames each component generically. Operators with different stacks can substitute component-by-component.

**Reference image-generation pipeline (the author's stack):**
- Background generation: fal.ai FLUX.1 [dev] via a small CLI script
- Card rendering: self-hosted local renderer (headless browser + HTML/CSS card template + pdf-lib for the LinkedIn PDF). Runs as a single batch command for all three days. Self-validates every render: exits nonzero on any card under 5KB or any slide heading that renders more than 2 lines. Eliminates CDN race conditions because the render is local.
- Export: PNG for social platforms, PDF for LinkedIn document posts (built automatically with a clickable link annotation on the close slide)
- Public asset staging: Vercel Blob with a per-batch URL prefix
- Local archive: a folder on the operator's cloud-synced drive

**Reference social scheduler:** Buffer via the Buffer MCP (channel discovery via `list_channels`, scheduling via `create_post` with `customScheduled`).

**Substitutability:** any image pipeline that produces PNG and PDF outputs and stages them at a public URL works for the asset side. Any scheduling tool with channel discovery, slot configuration and an API or MCP for `customScheduled` posting works for the scheduler side. The structural discipline (Desktop review pause, self-validation with nonzero exit on render failure, heading overflow detection from actual render, channel ID never hardcoded, native-isolation test on failure) holds across stacks. Canva, Midjourney and similar hosted design tools are valid substitutions for the local renderer; see Refinements for stack-specific notes.

## Steps

**Step 0. Verify infrastructure.** Confirm scheduler auth (e.g. Buffer MCP `get_account`, or your scheduler's equivalent). Confirm credentials present for your image-generation pipeline. On any auth failure, halt and surface the fix before proceeding.

**Step 0.5. Archive sweep.** Before processing the target batch, sweep your active social drafts directory and move fully-posted batches to your archive folder. Eligibility: batch filename pattern + `status` is `scheduled` or `executed` + last scheduled date has passed. Skip organic posts, recurring queues and reference docs. This keeps the active folder clean while the Drafting skill's look-back reads from both the active and archive directories. The sweep runs before Step 1 so the active folder reflects current state before you read.

**Step 1. Read the approved batch draft.** Parse the batch file's frontmatter. Read the `batch_state` field first. If `batch_state` is past `draft` (e.g. `images-generated`, `desktop-reviewed`, `uploaded`), resume from the corresponding step below; do not repeat completed steps. Then parse target page, scheduled dates, campaign, source and body sections (Day 1 Hook, Day 2 Carousel slides, Day 3 Action, image brief, headlines, per-platform body copy, hashtags, CTA closes).

Resume entry points by `batch_state`:
- `approved-pending-queue`: begin at Step 2.
- `images-generated`: begin at Step 4 (Desktop review).
- `desktop-reviewed`: begin at Step 5 (Stage assets).
- `uploaded`: begin at Step 6 (Channel resolution).
- `scheduled`: verify Step 9 log completeness; proceed to Step 10 if not done.

**Step 2. Generate the Day 3 background image.** Day 3 typically uses a generated cinematic background per the brief in the batch file. Run your image-generation pipeline. Output to your image source directory using a slug-stable naming convention (`YYYY-MM-DD-batch-slug.png`). Save a copy to the Desktop review folder as `fal-preview-day3-background.png` (or equivalent for your pipeline).

**Step 3. Render the three template designs.** Run your image rendering pipeline against the batch draft. The reference pipeline is a local self-hosted renderer that accepts the batch's copy and image brief as input and outputs all three days in a single command.

Per template:

- **Day 1 Hook:** single headline (3 to 6 words, ends with period). No background swap. Single-page export, PNG only, 1080×1080 (Instagram-default square).
- **Day 2 Carousel (8 slides):** all 8 slides rendered with headings and body text in a single pass. Export 8 separate PNG pages (1080×1080 each) for Instagram and Facebook, plus a single PDF for LinkedIn. The LinkedIn PDF includes a clickable link annotation on the close slide.
- **Day 3 Action:** headline replacement plus background image swap. If using a local renderer, the background is read from a local path directly; no CDN pre-staging required before render. If using a hosted design tool, pre-stage the background to your asset host before the template can ingest it. Single-page PNG, 1080×1080.

**Self-validation (local renderer).** A well-configured local renderer exits nonzero on any card under 5KB or any slide heading that renders more than 2 lines. Treat a nonzero exit as a hard halt: fix the offending copy or template before proceeding. Heading overflow detection from the actual render is more reliable than character-count estimates alone.

**Download and validation (hosted design-tool stack).** After each export call returns URLs, download to the Desktop review folder. Sequential or batches of 3 to 4 maximum. Parallel batches above 5 can hit signed-URL race conditions on hosted CDNs. After every download, validate each file by size: PNGs must be greater than 5KB, PDFs greater than 500KB. Any file under threshold is an error response disguised as HTTP 200. Re-export and re-download sequentially for any failed file before proceeding to Step 4.

Save each export to the Desktop review folder using a canonical naming pattern: `Day1-Hook.png`, `Day2-Carousel-01.png` through `Day2-Carousel-08.png`, `Day2-Carousel-LinkedIn.pdf`, `Day3-Action.png`. Update `batch_state` to `images-generated`.

**Step 4. Desktop review pause (when `desktop_review_pause: true`).** Surface the Desktop folder path and the file inventory to the operator. Wait for explicit "approved" or specific adjustment requests. On adjustment requests, loop back to Step 3 for the affected images. Do NOT proceed to asset staging or scheduling without operator review confirmation when this pause is active. On approval, update `batch_state` to `desktop-reviewed`.

**Step 5. Stage assets at a public URL.** Upload all rendered exports to your asset host (Vercel Blob, S3, R2 or equivalent) under a per-batch prefix: `social/YYYY-MM-DD-batch-slug/`. Returns public HTTPS URLs for each asset. Required for scheduler media attachments. After upload, copy the full Desktop folder contents to your local archive directory if you keep one (the author archives to a cloud-synced drive folder; substitute your preferred archive location). Do NOT archive into the source draft directory if the source directory is text-primary by design. Update `batch_state` to `uploaded`.

**Step 6. Resolve channel IDs and schedules.** Discover current channel IDs via your scheduler's listing API (e.g. Buffer `list_channels`). Channels rotate on disconnect for many tools; never hardcode. Pull each target platform's timezone and existing posting slots.

**Step 6.5. Channel-health check.** Before queuing, verify each target channel's last-post timestamp via your scheduler's channel API (e.g. `get_channel`). A channel that has not posted in 72+ hours despite having scheduled posts in that window may have a silently dropped auth token. If any channel shows this pattern, disconnect and reconnect before queueing. Silent auth drops do not surface as errors at queue time. They surface as missing posts after publish. Catching the drop here costs one reconnect; catching it after costs a re-queue and a missed slot.

**Step 7. Compute per-post scheduled times.** Default: schedule at each channel's existing slot for the target day. Day 1 provision: when queueing on Day 1 and the preferred slot has already passed, use the next available future slot on Day 1 rather than falling to Day 2. The day-arc structure takes precedence over slot optimality for Day 1 only. Days 2 and 3 always use standard optimal slots. Parallel-day fallback: when a channel lacks a slot for the target day, parallel the nearest day's time at the same hour-minute. Use the `scheduled_dates` from batch frontmatter as the day anchor.

**Link tagging.** Do not bake UTM query parameters into social post bodies or carousel close-slide URLs. A visible UTM tail reads as a funnel. Attribution arrives through click-id and referrer on the live capture side.

**Step 8. Queue each post.** Per platform per day, create a scheduled post with:
- Custom scheduled mode at the resolved due-time
- Image or PDF attachments referenced by the public asset URLs from Step 5
- Alt text per attachment (always provide; accessibility default)

Capture each post's scheduler permalink as it queues.

**Step 9. Update the batch file's Activity Log.** Append per-post execution receipts: scheduled time, channel ID, scheduler permalink. Advance batch `status` from `approved-pending-scheduling` to `scheduled-awaiting-publish`. Update `batch_state` to `scheduled`.

**Step 10. Surface manual post-publish steps.** Final report names the operations the scheduler can't do and the operator handles natively:

- Platform-native operations the scheduler doesn't support (collab tags, first-comment hashtags, Instagram broadcast features, LinkedIn document re-pinning).
- Failure flags: any post that hit a scheduler error during Step 8 surfaced separately with a directive to run a native-isolation test (post directly on the platform first; that's the cheapest diagnostic).

## Image Generation Reference

### Day 1 Hook (single-headline template)

- One headline replacement (3 to 6 words, ends with period or `?`).
- No background image change.
- Single-page export, PNG only, 1080×1080.

### Day 2 Carousel (8 slides)

- Each slide: heading + body text.
- Bulk find-and-replace across all 8 slides in a single editing transaction (when your tool supports it).
- Export: 8 separate PNG pages (1080×1080 each), plus a single PDF document for LinkedIn document posts.
- Slide content map: Cover, Foundation, Distinction, Core Practice, Second Layer, Fear or Turn, Connection (to parent concept), Close (threads prior installments).

### Day 3 Action (background-swap template)

- Generated background image: cinematic, 16:9 (1792×1024), no figures, photographic realism.
- One headline replacement plus one background image replacement.
- Single-page export, PNG only, 1080×1080.

## Scheduler Integration Reference

### Tier-aware scheduling architecture

Many free-tier schedulers cap the queue window. Plan batch size accordingly. The 9-post batch (3 days × 3 platforms) fits inside a 9 to 10 slot window on most free tiers. When running multi-batch arcs (Batch A then Batch B), space them so the first batch's queue is cleared (or nearly cleared) before the second queues.

### Scheduling fallback policy

Default: schedule at each channel's existing slot for the target day. When a channel lacks a slot for the target day, parallel the nearest day's time at the same hour-minute. Don't push to the next available slot; parallel preserves the day-arc structure.

### Channel discovery vs hardcoding

Always discover channel IDs at run-time via your scheduler's list endpoint. Many schedulers rotate the internal channel ID on full disconnect/reconnect, orphaning posts queued against the old ID. Hardcoding breaks silently.

### Failure-protocol entry

On any scheduler-to-platform error, halt iteration and route to a native-isolation test (post directly on the platform first as the cheapest diagnostic). Don't iterate scheduler-layer variations beyond two or three attempts without operator authorization. A full disconnect-and-reconnect on the scheduler often has destructive cost (channel ID rotation orphans the queue); always offer to drain the queue before any disconnect runs.

## Voice and Copy Constraints

This skill executes copy that the Drafting skill has already produced. Voice changes are out of scope here. If the batch draft contains voice violations (em dashes, missing contractions, Oxford commas, "cannot," internal names, fabricated anecdotes, bracketed editorial notes that should not ship), halt and route back to the Drafting skill for re-draft. Never publish a draft that hasn't passed Drafting's voice sweep gate.

## Output Format

This skill writes to two surfaces:

1. **Desktop review folder** containing `Day1-Hook.png`, `Day2-Carousel-01.png` through `08.png`, `Day2-Carousel-LinkedIn.pdf`, `Day3-Action.png`, the Day 3 background preview and any per-batch helper scripts.
2. **Batch file Activity Log update** appended to the batch markdown's `## Approval Gate` or new `## Execution Log` section, capturing scheduled time, channel ID and scheduler permalink per post, plus any manual handoff items surfaced.

## Refinements (operating-experience field log)

These refinements were extracted from real production runs of the author's stack. The patterns are stack-agnostic; the specific numbers (font-size pixel values, container heights) are stack-specific to the reference implementation. Adapt to your tooling.

**Self-validation is the first gate.** A self-hosted local renderer should exit nonzero on any card under 5KB or any slide heading that exceeds 2 rendered lines. Heading overflow detection from the actual render is more reliable than character-count estimates alone. Build this validation into your pipeline before the Desktop review pause; catching overflows at render time is cheaper than catching them after the operator has reviewed.

**Font sizes are static. Never adjust.** (Specific to a hosted design-tool stack; not applicable with a local self-hosted renderer that uses CSS-locked font sizes.) When a text-replacement operation is applied and the new text length differs from the original, many hosted tools auto-resize the font to fit the container. This breaks visual uniformity across slides within a batch and across batches over time. Treat the template's original font sizes as locked. After every replacement on a text element, verify the resulting font size matches the pre-replacement value. If the tool auto-resized, immediately apply a format operation with the original font size to restore.

**Vertical centering check after text replacement on single-headline templates.** (Specific to a hosted design-tool stack; not applicable with a local self-hosted renderer using CSS flexbox centering.) The Day 1 Hook and Day 3 Action templates render a single headline inside a tall text container. When the replacement text has fewer (or more) lines than the original, the container's whitespace distributes unevenly. After every replacement on these templates, verify vertical centering. Read the text element's vertical position and container height before and after replacement. If line count changed, recompute the top position so the rendered text block is centered in its container. Issue a position operation with the new top.

**Heading character budgets per template.** Character budgets are template-specific and must be calibrated to your actual render output. The two-slot model: Cover (slide 1) has a tighter heading ceiling than Body slides (slides 2 to 8) because a long Cover heading can wrap onto a third line and overlap the body at most template sizes. Calibrate your own ceilings from render tests, not from these numbers. The Drafting skill carries the default starting budgets. If the source draft exceeds budget, halt and route back for a shorter line; do NOT shrink the font. The budgets below are the Canva-era reference values; calibrate to your renderer.

- Day 1 Hook and Day 3 Action: ≤ 30 chars, 2 to 3 lines max
- Carousel slides 2 to 7: ≤ 22 chars ideal, ≤ 30 chars max, 1 line ideal
- Carousel slide 1 (Cover) and slide 8 (Close): ≤ 50 chars, 2 to 3 lines max

**Image generation pause is the operator's review gate.** The image-generation step is where review prevents downstream rework. Issues caught here are cheap to fix; caught after the queue runs, expensive (re-export, re-upload, re-queue, possibly delete and re-create posts). The Desktop review pause stays default-on for the first several live runs of this skill. After multiple consecutive perfect first-time renders, the pause may relax to default-off as trust builds.

**Export-download race condition under heavy parallelism.** (Specific to a hosted design-tool stack; not applicable with a local self-hosted renderer, which writes to local disk directly.) Downloading multiple exports via parallel background jobs from a hosted tool sometimes returns error responses (typically small XML or signature-mismatch payloads) instead of valid files. Download exports either sequentially or in batches of 3 to 4 maximum. Verify each download by file size after the request completes. If any file is below the size threshold, treat it as a failure, re-export and re-download sequentially.

## Model Routing

Dispatch the cheapest model that does the job well. Before each delegated step, ask whether a smaller model would produce equivalent output.

| Work type | Model |
|---|---|
| Mechanical lookups, deterministic commands, structured extraction against a spec | Haiku |
| Multi-step synthesis, drafting, diagnosis, most worker dispatch | Sonnet |
| Architectural judgment, plan design, judgment-dense synthesis | Opus |

Set the model explicitly on every subagent dispatch. Never silently inherit the top tier.

## Constraints

- `batch_path` is required and must point to a file with `status: approved-pending-scheduling`. Halt at Step 1 if missing or wrong status.
- Voice changes are out of scope. Halt and route back to Drafting on any voice violation.
- Never bypass the Desktop review pause when `desktop_review_pause: true`. Operator reviews images before scheduler queue runs.
- Never hardcode channel IDs. Always discover via your scheduler's list endpoint at run-time.
- Never run a full scheduler disconnect without operator authorization and queue drain.
- Never publish without alt text on every media attachment.
- Never bake UTM parameters into post bodies or carousel close-slide URLs.

## Operating Posture

The Drafting skill draws the line. Queue ships across it. The boundary between voice and execution is what makes both skills clean. When in doubt about which skill owns a step, ask: is this about what the words are, or about how they get on the platforms? Words go to Drafting. Pixels and permalinks come here.
