---
name: playwright
description: Use when you need to scrape pages, extract structured data or interact with web interfaces via headless browser automation without using screenshots.
status: active
version: 1.2
---

# Playwright

> This skill also ships inside the Sovereign Ecosystem template.

**Purpose:** Browser automation via headless Chromium. Scrape pages, extract structured data, and interact with web interfaces. Returns clean JSON, not screenshots.

**Token efficiency:** `run.js` returns body text capped at 8000 characters plus up to 50 links, far less than a screenshot-based read.

## When to Use

- Tech watch repo checks: retrieve changelogs, release notes, README updates from GitHub
- Scraping any page for structured data (pricing tables, product lists, article text)
- Checking if a URL loads and what it contains
- Extracting links, headings or specific content from a page

## How to Use

The run.js script ships inside this plugin's `scripts/` directory. Pass a URL argument and it returns JSON.

```bash
node "<path-to-plugin>/scripts/run.js" https://example.com
```

Replace `<path-to-plugin>` with the path where this plugin is installed in your environment. For plugin-based runtimes (Claude Code with IGOS), the script lives at:

```
plugins/playwright/scripts/run.js
```

Output format:
```json
{
  "url": "https://example.com",
  "title": "Page title",
  "text": "Cleaned body text...",
  "links": [
    { "text": "Link text", "href": "https://..." }
  ]
}
```

## Requirements

Playwright must be installed before first use. Run these once from the plugin's `scripts/` directory:

```bash
npm install playwright --prefix "<path-to-plugin>/scripts"
npx playwright install chromium
```

Chromium binary installs to the `node_modules/` directory inside `scripts/`. Add this path to your AI interface's ignore configuration so it does not appear in context reads.

## Troubleshooting

- **Empty text:** If a page returns empty text, switch `waitUntil` to `networkidle` and retry.
- **Browser binary not found:** Run `npx playwright install chromium` from the scripts directory.
- **Cloudflare blocking:** Add `playwright-extra` and `puppeteer-extra-plugin-stealth` if a site blocks the script.
- **Timeout:** `run.js` already navigates with a 15000 ms timeout and `waitUntil: "domcontentloaded"`. For slow pages, raise the timeout and switch to `networkidle`.
- **Social post URLs:** A direct social-post URL may bounce to a login wall. Check the landed URL, and try the platform's share or mobile URL.
- Always close the browser in a `finally` block. This is already handled in run.js.

## Invocation

Tell your AI interface what you need in plain English. Example prompts:

- "Scrape the changelog from github.com/[repo] and summarize what's new."
- "Check the releases page at [URL] and tell me what shipped since [date]."
- "Extract the pricing table from [URL] as a JSON array."

Your AI reads this SKILL.md, runs the script, and returns the data.

## Pairs With

**Researcher** pairs naturally. Use Playwright for structured page extraction when web search tools return incomplete or truncated content.

**Source Harvest** often needs deep reads of external repos or documentation. Playwright handles pages that block standard fetch tools.

If Researcher isn't installed yet: [Install Researcher via Infinite Game OS](https://www.infinitegameos.io/skills/researcher).
If Source Harvest isn't installed yet: [Install Source Harvest via Infinite Game OS](https://www.infinitegameos.io/skills/source-harvest).

## Model Routing

Dispatch the cheapest model that does the job well. Before each delegated step, ask whether a smaller model would produce equivalent output.

| Task type | Model |
|---|---|
| Script invocation, URL scrape, structured data extraction from clean JSON output | Haiku |
| Changelog or release-note summarization, multi-item synthesis with temporal filtering | Sonnet |
| Troubleshooting blocked or failed scrapes, multi-step diagnosis and option selection | Sonnet |
| Interpreting extracted data for a strategic decision | Opus |

Set the model explicitly on every subagent dispatch. Never silently inherit the top tier.

---

## Refinements

**`Execution context was destroyed` means a bot challenge, and it is not an empty page.**

A scrape failed with `page.evaluate: Execution context was destroyed, most likely because of a navigation`. **Root cause:** the shared script waits only for `domcontentloaded`, and the site redirected to a bot-challenge page before the evaluation ran. A plain fetch of the same URL returned empty content for the same reason.

**Two things to hold.**

- **Neither failure is evidence about the page.** Reporting an empty scrape as "the page has no content" is a false claim of absence. Name the observation: the fetch failed, and the cause was a challenge redirect. Check `location.href` in the result to see where you actually landed.
- **`networkidle` alone does not clear a challenge.** A second attempt reached the challenge screen and reported it honestly, a short page titled as a robot check.

**What worked** was a scratchpad variant rather than a change to the shared script: launch args `--disable-blink-features=AutomationControlled`, a current Chrome user agent, a real viewport, locale and timezone, an init script clearing `navigator.webdriver`, then a 12-second wait before evaluating.

**Not folded into `run.js` on purpose.** The shared script stays simple. Copy the variant into the scratchpad when a site challenges, and leave the default alone.

- [v1.2] Added the bot-challenge refinement, corrected the token and timeout figures and added the social-post URL tip.
