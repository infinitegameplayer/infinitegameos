---
name: playwright
description: Use when you need to scrape pages, extract structured data or interact with web interfaces via headless browser automation without using screenshots.
status: active
version: 1.0
---

# Playwright

> This skill also ships inside the Sovereign Ecosystem template.

**Purpose:** Browser automation via headless Chromium. Scrape pages, extract structured data, and interact with web interfaces. Returns clean JSON, not screenshots.

**Token efficiency:** approximately 200-500 tokens per page vs 20,000-30,000 for screenshot-based approaches.

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
- **Timeout:** Increase all timeouts to 15 seconds and switch to `networkidle` for slow pages.
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

## Refinements

*(Empty. Populated when execution mistakes occur during sessions.)*
