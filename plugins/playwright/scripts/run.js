#!/usr/bin/env node
/**
 * Playwright scraper, a browser automation tool.
 * Usage: node run.js <url>
 * Returns: JSON with title, text, and links.
 *
 * Requires playwright installed in this plugin's scripts/node_modules/.
 * Run once: npm install playwright --prefix "<path-to-plugin>/scripts" && npx playwright install chromium
 */

const url = process.argv[2];

if (!url) {
  console.error(JSON.stringify({ error: "URL argument required. Usage: node run.js <url>" }));
  process.exit(1);
}

// Resolve playwright from this plugin's scripts/node_modules (plugin-local)
const path = require("path");
const playwrightPath = path.resolve(__dirname, "node_modules/playwright");

let chromium;
try {
  chromium = require(playwrightPath).chromium;
} catch {
  console.error(JSON.stringify({
    error: "Playwright not found. Run: npm install playwright --prefix \"<path-to-plugin>/scripts\" && npx playwright install chromium"
  }));
  process.exit(1);
}

(async () => {
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
    });
    const page = await context.newPage();

    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 15000 });

    const result = await page.evaluate(() => {
      // Strip nav, footer, cookie banners, scripts, styles
      const remove = document.querySelectorAll("nav, footer, header, .cookie-banner, .cookie-notice, [aria-label='cookie'], script, style, noscript");
      remove.forEach(el => el.remove());

      const title = document.title || "";
      const text = (document.body?.innerText || "").replace(/\s+/g, " ").trim().slice(0, 8000);

      const links = Array.from(document.querySelectorAll("a[href]"))
        .map(a => ({ text: a.innerText.trim().slice(0, 100), href: a.href }))
        .filter(l => l.href.startsWith("http") && l.text.length > 0)
        .slice(0, 50);

      return { title, text, links };
    });

    console.log(JSON.stringify({ url, ...result }, null, 2));
  } finally {
    if (browser) await browser.close();
  }
})();
