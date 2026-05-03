---
description: Use when executing an approved 9-post social batch draft (status `approved-pending-scheduling`). Owns the downstream pipeline: image generation, asset staging, scheduler integration with channel discovery and slot resolution, and post-publish manual handoff surfacing. Triggered by Social Batch Drafting at the queue phase, or direct invocation on any approved batch file.
---

# Social Batch Queue

Purpose: Take an approved 9-post batch draft and ship it as scheduled posts. Image generation, template edits, asset staging, scheduler integration, channel discovery, slot resolution and post-publish handoff all live here. The skill exists because the path from approved copy to scheduled posts has too many moving pieces to run ad-hoc reliably.

Trigger: A batch file in your social drafts directory advances to `status: approved-pending-scheduling`. The Social Batch Drafting skill's handover map names this skill at the queue phase. Operator invokes directly on any approved batch file.

Inputs: A `batch_path` to the approved batch markdown file. Optional: `desktop_review_pause` (default `true` for the first several runs), `desktop_folder` for review images, `failure_protocol_active` (default `true`).

Outputs: A Desktop review folder with all rendered images, asset URLs from your staging service, scheduled posts in your social scheduler with permalinks captured, an updated batch file with execution log entries and a structured manual-handoff list for the operator.

## Pairing

This skill pairs with **Social Batch Drafting**. Drafting produces the approved batch file; this skill consumes it. The two work as a flywheel. The boundary is firm: voice and copy are Drafting's responsibility; execution and scheduling are Queue's. If a voice violation surfaces during execution, Queue halts and routes back to Drafting.

## Reference Implementations

This skill names a specific stack as the reference implementation, then frames each component generically. Operators with different stacks can substitute component-by-component.

**Reference image-generation pipeline (the author's stack):**
- Background generation: fal.ai FLUX.1 [dev] via a small CLI script
- Template editing: Canva via the Canva MCP (find_and_replace_text, update_fill, position_element, get-design-thumbnail)
- Export: PNG for social platforms, PDF for LinkedIn document posts
- Public asset staging: Vercel Blob with a per-batch URL prefix
- Local archive: a folder on the operator's cloud-synced drive

**Reference social scheduler:** Buffer via the Buffer MCP (channel discovery via `list_channels`, scheduling via `create_post` with `customScheduled`).

**Substitutability:** any image-generation pipeline that produces PNG and PDF outputs and stages them at a public URL works for the asset side. Any scheduling tool with channel discovery, slot configuration and an API or MCP for `customScheduled` posting works for the scheduler side. The structural discipline (Desktop review pause, font-size lock, vertical centering check, channel ID never hardcoded, native-isolation test on failure) holds across stacks.

## Steps

**Step 0. Verify infrastructure.** Confirm scheduler auth (e.g. Buffer MCP `get_account`, or your scheduler's equivalent). Confirm credentials present for your image-generation pipeline. On any auth failure, halt and surface the fix before proceeding.

**Step 1. Read the approved batch draft.** Parse the batch file's frontmatter (target page, scheduled dates, campaign, source) and body sections (Day 1 Hook, Day 2 Carousel slides, Day 3 Action, image brief, headlines, per-platform body copy, hashtags, CTA closes).

**Step 2. Generate the Day 3 background image.** Day 3 typically uses a generated cinematic background per the brief in the batch file. Run your image-generation pipeline. Output to your image source directory using a slug-stable naming convention (`YYYY-MM-DD-batch-slug.png`). Save a copy to the Desktop review folder as `fal-preview-day3-background.png` (or equivalent for your pipeline).

**Step 3. Render the three template designs.** Per template:

- **Day 1 Hook:** single headline replacement (3 to 6 words, ends with period). No background image change. Single-page export, PNG only, 1080×1080 (Instagram-default square).
- **Day 2 Carousel (8 slides):** bulk find_and_replace across all 8 slides for headings and body. Single editing transaction. Export 8 separate PNG pages (1080×1080 each) for Instagram and Facebook, plus a single PDF document for LinkedIn.
- **Day 3 Action:** the Day 3 background must be staged at a public URL before the template can ingest it. Pre-stage to your asset host. Then upload to the template surface. Then start the editing transaction, replace the headline, swap the background fill, commit the transaction and export. Single-page PNG, 1080×1080.

Save each export to the Desktop review folder using a canonical naming pattern: `Day1-Hook.png`, `Day2-Carousel-01.png` through `Day2-Carousel-08.png`, `Day2-Carousel-LinkedIn.pdf`, `Day3-Action.png`.

**Step 3 download discipline.** After each export call returns URLs, download to the Desktop review folder. Sequential or batches of 3 to 4 maximum. Parallel batches above 5 hit signed-URL race conditions on most CDNs (the author has observed this on Canva's CDN; the same pattern applies broadly). After every download, validate each file by size: PNGs must be greater than 5KB, PDFs greater than 500KB. Any file under threshold is an error response disguised as HTTP 200. For any failed file, re-export the specific design and re-download sequentially before proceeding to Step 4.

**Step 4. Desktop review pause (when `desktop_review_pause: true`).** Surface the Desktop folder path and the file inventory to the operator. Wait for explicit "approved" or specific adjustment requests. On adjustment requests, loop back to Step 3 for the affected images. Do NOT proceed to asset staging or scheduling without operator review confirmation when this pause is active.

**Step 5. Stage assets at a public URL.** Upload all rendered exports to your asset host (Vercel Blob, S3, R2 or equivalent) under a per-batch prefix: `social/YYYY-MM-DD-batch-slug/`. Returns public HTTPS URLs for each asset. Required for scheduler media attachments. After upload, copy the full Desktop folder contents to your local archive directory if you keep one (the author archives to a cloud-synced drive folder; substitute your preferred archive location). Do NOT archive into the source draft directory if the source directory is text-primary by design.

**Step 6. Resolve channel IDs and schedules.** Discover current channel IDs via your scheduler's listing API (e.g. Buffer `list_channels`). Channels rotate on disconnect for many tools; never hardcode. Pull each target platform's timezone and existing posting slots.

**Step 7. Compute per-post scheduled times.** Default: schedule at each channel's existing slot for the target day. Parallel-day fallback: when a channel lacks a slot for the target day, parallel the nearest day's time at the same hour-minute. Use the `scheduled_dates` from batch frontmatter as the day anchor.

**Step 8. Queue each post.** Per platform per day, create a scheduled post with:
- Custom scheduled mode at the resolved due-time
- Image or PDF attachments referenced by the public asset URLs from Step 5
- Alt text per attachment (always provide; accessibility default)

Capture each post's scheduler permalink as it queues.

**Step 9. Update the batch file's Activity Log.** Append per-post execution receipts: scheduled time, channel ID, scheduler permalink. Advance batch `status` from `approved-pending-scheduling` to `scheduled-awaiting-publish`.

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

**Font sizes are static. Never adjust.** When a text-replacement operation is applied and the new text length differs from the original, many tools auto-resize the font to fit the container. This breaks visual uniformity across slides within a batch and across batches over time. Treat the template's original font sizes as locked. After every replacement on a text element, verify the resulting font size matches the pre-replacement value. If the tool auto-resized, immediately apply a format operation with the original font size to restore.

**Vertical centering check after text replacement on single-headline templates.** The Day 1 Hook and Day 3 Action templates render a single headline inside a tall text container. When the replacement text has fewer (or more) lines than the original, the container's whitespace distributes unevenly. After every replacement on these templates, verify vertical centering. Read the text element's vertical position and container height before and after replacement. If line count changed, recompute the top position so the rendered text block is centered in its container. Issue a position operation with the new top.

**Heading character budgets per template.** Every heading destined for these templates ships within budget. Drafting and Queue both enforce. If the source draft exceeds the budget, halt and route back for a shorter line; do NOT shrink the font. Approximate budgets (calibrate to your template):
- Day 1 Hook and Day 3 Action: ≤ 30 chars, 2 to 3 lines max
- Carousel slides 2 to 7: ≤ 22 chars ideal, ≤ 30 chars max, 1 line ideal
- Carousel slide 1 (Cover) and slide 8 (Close): ≤ 50 chars, 2 to 3 lines max

**Image generation pause is the operator's review gate.** The image-generation step is where review prevents downstream rework. Centering and font-size issues caught here are cheap to fix; caught after the queue runs, expensive (re-export, re-upload, re-queue, possibly delete and re-create posts). The Desktop review pause stays default-on for the first several live runs of this skill. After multiple consecutive perfect first-time renders, the pause may relax to default-off as trust builds.

**Export-download race condition under heavy parallelism.** Downloading multiple exports via parallel background jobs sometimes returns error responses (typically small XML or signature-mismatch payloads) instead of valid files. The author has observed this on Canva's signed-URL CDN at parallelism above 5. Download exports either sequentially or in batches of 3 to 4 maximum. Verify each download by file size after the request completes. If any file is below the size threshold, treat it as a failure, re-export and re-download sequentially.

## Constraints

- `batch_path` is required and must point to a file with `status: approved-pending-scheduling`. Halt at Step 1 if missing or wrong status.
- Voice changes are out of scope. Halt and route back to Drafting on any voice violation.
- Never bypass the Desktop review pause when `desktop_review_pause: true`. Operator reviews images before scheduler queue runs.
- Never hardcode channel IDs. Always discover via your scheduler's list endpoint at run-time.
- Never run a full scheduler disconnect without operator authorization and queue drain.
- Never publish without alt text on every media attachment.

## Operating Posture

The Drafting skill draws the line. Queue ships across it. The boundary between voice and execution is what makes both skills clean. When in doubt about which skill owns a step, ask: is this about what the words are, or about how they get on the platforms? Words go to Drafting. Pixels and permalinks come here.
