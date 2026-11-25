#!/usr/bin/env node
/**
 * Playwright scraper, a browser automation tool.
 * Usage: node run.js <url> [--allow-private] [--guard-only]
 * Returns: JSON with title, text, and links.
 *
 *   --allow-private   permit localhost and private addresses (local site testing only)
 *   --guard-only      run the address check and exit (0 pass, 1 refused); fetch nothing
 *
 * Address guard. A URL handed to a browser script is untrusted: it may have come from a
 * web page, a search result or another agent. Left alone, a browser will fetch this
 * machine's own services, anything on the local network and the cloud metadata address
 * (169.254.169.254) that hands out credentials. So the script:
 *   - allows only http and https (file://, ftp:// and the rest are refused);
 *   - refuses local names (localhost, *.localhost, *.local, *.internal);
 *   - refuses loopback, private, link-local, CGNAT and cloud metadata addresses, IPv4
 *     and IPv6, including IPv4-mapped IPv6 such as [::ffff:127.0.0.1];
 *   - treats an address it cannot parse as private (refuse rather than guess);
 *   - runs these checks on the URL you give, again after DNS resolution (so a public
 *     name that points at a private address is refused), and on every request the page
 *     makes afterward, redirect hops and iframes included.
 * A refusal prints {"error": "refused: ...", "guard": true} and exits 1. Requests the
 * guard stopped mid-page are listed in a guard_blocked array in the output.
 *
 * Why two layers. Playwright's route handler never sees the later hops of a server
 * redirect: a public page that answers 302 to http://127.0.0.1/ walks straight past it.
 * The guard therefore also attaches at the DevTools Fetch level, which pauses every
 * request Chromium makes (each redirect hop, iframes and popups included) and checks it
 * before it goes out.
 *
 * What the guard cannot see. Chromium resolves DNS again after the check, so a host that
 * answers with a public address to the check and a private one to the connection (DNS
 * rebinding) could still get through. It also does not stop a page from sending data to
 * a public address, and it does not judge what a public page says. Use --allow-private
 * only for a site you run yourself.
 *
 * Requires playwright installed in this plugin's scripts/node_modules/.
 * Run once: npm install playwright --prefix "<path-to-plugin>/scripts" && npx playwright install chromium
 */

const path = require("path");
const net = require("net");
const dns = require("dns").promises;

function fail(msg, extra) {
  console.error(JSON.stringify({ error: msg, ...(extra || {}) }));
  process.exit(1);
}

// ---- arguments ----
let url = null;
let allowPrivate = false;
let guardOnly = false;
for (const a of process.argv.slice(2)) {
  if (a === "--allow-private") allowPrivate = true;
  else if (a === "--guard-only") guardOnly = true;
  else if (a.startsWith("--")) fail(`unknown option ${a}`);
  else if (!url) url = a;
  else fail(`unexpected argument ${a}`);
}
if (!url) fail("URL argument required. Usage: node run.js <url> [--allow-private] [--guard-only]");

// ---- address guard ----
function ipv4Private(ip) {
  const p = ip.split(".").map(Number);
  if (p.length !== 4 || p.some((n) => !Number.isInteger(n) || n < 0 || n > 255)) return true; // unparseable counts as private: refuse rather than guess
  const [a, b] = p;
  return a === 0 || a === 10 || a === 127 || a >= 224 ||
    (a === 100 && b >= 64 && b <= 127) ||          // CGNAT
    (a === 169 && b === 254) ||                     // link-local, cloud metadata
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    (a === 192 && b === 0 && p[2] === 0) ||         // IETF protocol assignments
    (a === 198 && (b === 18 || b === 19));          // benchmarking
}
function ipPrivate(ip) {
  if (net.isIPv4(ip)) return ipv4Private(ip);
  if (!net.isIPv6(ip)) return true; // not an address at all: refuse
  const s = ip.toLowerCase().replace(/^\[|\]$/g, "");
  const mapped = s.match(/(?:^|:)(\d+\.\d+\.\d+\.\d+)$/);       // ::ffff:a.b.c.d and kin
  if (mapped) return ipv4Private(mapped[1]);
  const hex = s.match(/^::ffff:([0-9a-f]{1,4}):([0-9a-f]{1,4})$/); // ::ffff:7f00:1 form
  if (hex) { const n = (parseInt(hex[1], 16) << 16) | parseInt(hex[2], 16); return ipv4Private([n >>> 24, (n >> 16) & 255, (n >> 8) & 255, n & 255].join(".")); }
  return s === "::" || s === "::1" || /^f[cd]/.test(s) || /^fe[89ab]/.test(s) || /^ff/.test(s) || s.startsWith("64:ff9b:") || s.startsWith("2001:db8:");
}
function hostRefusal(host) {
  const h = host.replace(/^\[|\]$/g, "").toLowerCase();
  if (h === "localhost" || h.endsWith(".localhost") || h.endsWith(".local") || h.endsWith(".internal")) return `${host} is a local name`;
  if (net.isIP(h) && ipPrivate(h)) return `${host} is a private or local address`;
  return null;
}
// Every request the guard stops mid-page is listed here and reported in the output.
const guardBlocked = [];

// Resolve a host and hand back a refusal when it is local or private. Cached per host
// for the life of one run, so a page with many subresources costs one lookup per host.
const resolveCache = new Map();
function resolveSafe(host) {
  const h = host.replace(/^\[|\]$/g, "").toLowerCase();
  if (!resolveCache.has(h)) {
    resolveCache.set(h, (async () => {
      const lit = hostRefusal(h);
      if (lit) return { refusal: lit };
      if (net.isIP(h)) return {};
      let addrs;
      try { addrs = await dns.lookup(h, { all: true }); } catch { return { dnsFail: true }; } // DNS failure: the browser reports its own error
      const bad = addrs.find((x) => ipPrivate(x.address));
      return bad ? { refusal: `${h} resolves to ${bad.address}` } : {};
    })());
  }
  return resolveCache.get(h);
}

async function guardUrl(u) {
  let parsed;
  try { parsed = new URL(u); } catch { return "not a valid URL"; }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return `scheme ${parsed.protocol} is refused (http and https only)`;
  if (allowPrivate) return null;
  const lit = hostRefusal(parsed.hostname);
  if (lit) return lit;
  if (!net.isIP(parsed.hostname.replace(/^\[|\]$/g, ""))) {
    let addrs;
    try { addrs = await dns.lookup(parsed.hostname, { all: true }); } catch { return null; } // DNS failure: let the browser report its own error
    const bad = addrs.find((x) => ipPrivate(x.address));
    if (bad) return `${parsed.hostname} resolves to ${bad.address}, a private or local address`;
  }
  return null;
}

// The DevTools guard: pauses every request Chromium makes, redirect hops and iframes
// included, and fails the ones that point at a refused address.
async function attachCdpGuard(context, target) {
  let cdp;
  try { cdp = await context.newCDPSession(target); }
  catch { return; } // a same-process frame shares its parent's session, which is already guarded
  cdp.on("Fetch.requestPaused", async (ev) => {
    let refusal = null;
    try {
      const u = new URL(ev.request.url);
      if (/^(https?|wss?):$/.test(u.protocol)) refusal = (await resolveSafe(u.hostname)).refusal || null;
      else if (!/^(data|blob|about):$/.test(u.protocol)) refusal = `scheme ${u.protocol} is refused`;
    } catch { refusal = "unparseable URL"; }
    if (refusal) {
      guardBlocked.push(ev.request.url.slice(0, 200));
      return cdp.send("Fetch.failRequest", { requestId: ev.requestId, errorReason: "BlockedByClient" }).catch(() => {}); // the request may already be gone
    }
    return cdp.send("Fetch.continueRequest", { requestId: ev.requestId }).catch(() => {}); // the request may already be gone
  });
  await cdp.send("Fetch.enable", { patterns: [{ urlPattern: "*", requestStage: "Request" }] });
}

(async () => {
  // The URL check runs before playwright loads, so --guard-only needs no browser.
  const refusal = await guardUrl(url);
  if (refusal) fail(`refused: ${refusal}`, { url, guard: true });
  if (guardOnly) { console.log(JSON.stringify({ url, guard: "pass" })); process.exit(0); }

  // Resolve playwright from this plugin's scripts/node_modules (a normal install is the fallback)
  let chromium;
  try {
    chromium = require(path.resolve(__dirname, "node_modules/playwright")).chromium;
  } catch {
    try { chromium = require("playwright").chromium; }
    catch { fail("Playwright not found. Run: npm install playwright --prefix \"<path-to-plugin>/scripts\" && npx playwright install chromium"); }
  }

  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
    });
    // Route handler: the address guard on every request it sees (subresources and the
    // first navigation). Later redirect hops are caught by the DevTools guard below.
    if (!allowPrivate) {
      await context.route("**/*", async (route) => {
        const req = route.request();
        const reqUrl = req.url();
        let host = "";
        try { host = new URL(reqUrl).hostname; } catch {}
        const why = req.isNavigationRequest() ? await guardUrl(reqUrl) : (host ? hostRefusal(host) : null);
        if (why) { guardBlocked.push(reqUrl.slice(0, 200)); return route.abort("blockedbyclient"); }
        return route.continue();
      });
    }
    const page = await context.newPage();
    if (!allowPrivate) {
      await attachCdpGuard(context, page);
      // Popups and out-of-process iframes are their own targets; guard each as it appears.
      context.on("page", (p) => { attachCdpGuard(context, p); });
      page.on("frameattached", (f) => { attachCdpGuard(context, f); });
    }

    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 15000 });

    // A redirect that ended on a refused address is a refusal, never a page.
    if (!allowPrivate) {
      let landedHost = "";
      try { landedHost = new URL(page.url()).hostname; } catch {}
      const r = landedHost ? await resolveSafe(landedHost) : {};
      if (r.refusal) fail(`refused: the page redirected to ${page.url().slice(0, 120)}, and ${r.refusal}`, { url, guard: true, guard_blocked: guardBlocked });
    }

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

    const out = { url, ...result };
    if (guardBlocked.length) out.guard_blocked = guardBlocked;
    console.log(JSON.stringify(out, null, 2));
  } catch (e) {
    const msg = String(e && e.message ? e.message : e).split("\n")[0];
    if (guardBlocked.length) fail(`refused: the page reached for a private or local address (${guardBlocked[0].slice(0, 100)})`, { url, guard: true, guard_blocked: guardBlocked, browser_error: msg });
    fail(msg, { url });
  } finally {
    if (browser) await browser.close();
  }
  process.exit(0); // the result is printed; leave even if a DevTools session still holds the loop
})();
