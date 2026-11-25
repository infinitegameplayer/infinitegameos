// Plants for the run.js address guard. Each case prints expected beside actual.
// Exits nonzero on any miss, and when the script under test is missing.
//
// Usage:  node guard-plants.mjs [path/to/run.js]      (or set RUNJS=path/to/run.js)
// Playwright must resolve for the browser cases: a normal install under
// this plugin's scripts/node_modules, or NODE_PATH pointing at one.
//
// Three groups of cases:
//   - offline: --guard-only address checks, no browser and no network needed;
//   - local: a canary server on 127.0.0.1 shows whether a refused fetch really stopped;
//   - network: need public DNS and internet. With no network they report "skipped (no
//     network)", which never counts as a pass.
import { spawn } from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import dns from "node:dns/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
// --offline runs only the --guard-only address cases: no browser, no network. CI on a
// fresh clone runs it this way, since a clone has no Playwright installed.
const ARGS = process.argv.slice(2);
const OFFLINE = ARGS.includes("--offline");
const RUNJS = ARGS.find((a) => !a.startsWith("--")) || process.env.RUNJS || path.join(here, "run.js");
if (!fs.existsSync(RUNJS)) { console.error("MISSING target " + RUNJS); process.exit(2); }

// A local canary: if its text ever reaches run.js output, the guard failed.
const CANARY = "SUITE-CANARY-LOCAL-SERVICE";
const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/html" });
  res.end(`<html><head><title>${CANARY}</title></head><body><p>${CANARY} private local content, long enough to count as a page. ${"x".repeat(600)}</p></body></html>`);
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const PORT = server.address().port;
const LOCAL = `http://127.0.0.1:${PORT}/`;

function spawnAsync(cmd, args) {
  return new Promise((resolve) => {
    const p = spawn(cmd, args); let stdout = "", stderr = "";
    const timer = setTimeout(() => p.kill(), 60000);
    p.stdout.on("data", (d) => (stdout += d)); p.stderr.on("data", (d) => (stderr += d));
    p.on("close", (status) => { clearTimeout(timer); resolve({ status, stdout, stderr }); });
  });
}

// Is there public DNS? Cases that need it are skipped, never passed, when there is none.
let online = true;
try { await dns.lookup("example.com"); } catch { online = false; }

const enc = encodeURIComponent;
// [label, args, expect, needsNetwork]
// expect: "refused" (guard at the door), "pass" (guard-only passes), "ok" (page returned),
// "ok-canary" (page returned and it was the canary)
const cases = [
  // offline: address forms, checked with --guard-only
  ["file scheme", ["file:///C:/Windows/win.ini", "--guard-only"], "refused"],
  ["ftp scheme", ["ftp://example.com/", "--guard-only"], "refused"],
  ["not a URL", ["not a url", "--guard-only"], "refused"],
  ["loopback literal", ["http://127.0.0.1:8080/", "--guard-only"], "refused"],
  ["0.0.0.0", ["http://0.0.0.0/", "--guard-only"], "refused"],
  ["localhost name", ["http://localhost:3000/", "--guard-only"], "refused"],
  ["*.localhost name", ["http://app.localhost/", "--guard-only"], "refused"],
  ["*.local name", ["http://printer.local/", "--guard-only"], "refused"],
  ["*.internal name", ["http://db.internal/", "--guard-only"], "refused"],
  ["cloud metadata", ["http://169.254.169.254/latest/meta-data/", "--guard-only"], "refused"],
  ["private 10/8", ["http://10.0.0.1/", "--guard-only"], "refused"],
  ["private 172.16/12", ["http://172.16.0.1/", "--guard-only"], "refused"],
  ["private 192.168", ["http://192.168.1.1/", "--guard-only"], "refused"],
  ["CGNAT", ["http://100.64.0.1/", "--guard-only"], "refused"],
  ["IPv6 loopback", ["http://[::1]/", "--guard-only"], "refused"],
  ["IPv6 unique-local", ["http://[fd00::1]/", "--guard-only"], "refused"],
  ["IPv6 link-local", ["http://[fe80::1]/", "--guard-only"], "refused"],
  ["IPv4-mapped IPv6 (dotted)", ["http://[::ffff:127.0.0.1]/", "--guard-only"], "refused"],
  ["IPv4-mapped IPv6 (hex)", ["http://[::ffff:7f00:1]/", "--guard-only"], "refused"],
  ["IPv4-mapped metadata", ["http://[::ffff:169.254.169.254]/", "--guard-only"], "refused"],
  ["decimal-encoded loopback", ["http://2130706433/", "--guard-only"], "refused"],
  ["hex-encoded loopback", ["http://0x7f000001/", "--guard-only"], "refused"],
  ["control: public IP literal passes", ["http://93.184.216.34/", "--guard-only"], "pass"],
  ["control: public IPv6 literal passes", ["http://[2606:2800:220:1:248:1893:25c8:1946]/", "--guard-only"], "pass"],
  ["control: --allow-private --guard-only passes loopback", ["http://127.0.0.1:8080/", "--allow-private", "--guard-only"], "pass"],
  ["control: --allow-private still refuses file://", ["file:///C:/Windows/win.ini", "--allow-private", "--guard-only"], "refused"],

  // local: a real fetch against the canary
  ["canary on loopback is refused, not fetched", [LOCAL], "refused"],
  ["canary on localhost name is refused, not fetched", [`http://localhost:${PORT}/`], "refused"],
  ["canary on IPv4-mapped IPv6 is refused, not fetched", [`http://[::ffff:127.0.0.1]:${PORT}/`], "refused"],
  ["control: --allow-private reaches canary", [LOCAL, "--allow-private"], "ok-canary"],

  // network: need public DNS and internet
  ["DNS name resolving to 127.0.0.1", ["http://localtest.me/", "--guard-only"], "refused", true],
  ["302 redirect to local canary", [`https://postman-echo.com/redirect-to?url=${enc(LOCAL)}`], "refused", true],
  ["302 redirect to localhost name", [`https://postman-echo.com/redirect-to?url=${enc(`http://localhost:${PORT}/`)}`], "refused", true],
  ["302 redirect to cloud metadata", [`https://postman-echo.com/redirect-to?url=${enc("http://169.254.169.254/latest/meta-data/")}`], "refused", true],
  ["control: public redirect still followed", [`https://postman-echo.com/redirect-to?url=${enc("https://example.com/")}`], "ok", true],
  ["control: public page", ["https://example.com/"], "ok", true],
];

let miss = 0, skipped = 0, passed = 0;
const run = OFFLINE ? cases.filter(([, args, , needsNet]) => args.includes("--guard-only") && !needsNet) : cases;
for (const [label, args, expect, needsNet] of run) {
  if (needsNet && !online) {
    skipped++;
    console.log(`SKIPPED ${label.padEnd(52)} expected ${expect.padEnd(10)} actual skipped (no network)`);
    continue;
  }
  const r = await spawnAsync("node", [RUNJS, ...args]);
  const leaked = (r.stdout + r.stderr).includes(CANARY);
  let j = null;
  try { j = JSON.parse((r.stdout || "").trim() || (r.stderr || "").trim()); } catch {}
  let actual;
  if (j && j.guard === true) actual = "refused";
  else if (j && j.guard === "pass" && r.status === 0) actual = "pass";
  else if (j && j.error && r.status !== 0) actual = /refused/.test(j.error) ? "refused" : "browser-error";
  else if (j && r.status === 0) actual = "ok";
  else actual = `unparsed(exit ${r.status})`;
  if (leaked) actual = actual === "ok" ? "ok-canary" : actual + "+CANARY-LEAKED";
  // A guard-only refusal must exit 1 and a pass must exit 0.
  if ((actual === "refused" && r.status !== 1) || (actual === "pass" && r.status !== 0)) actual += `(exit ${r.status})`;
  const pass = actual === expect;
  if (pass) passed++; else miss++;
  console.log(`${pass ? "PASS   " : "MISSED "} ${label.padEnd(52)} expected ${expect.padEnd(10)} actual ${actual}${j && j.error ? "  | " + String(j.error).slice(0, 80) : ""}`);
}
console.log(`target: ${RUNJS}`);
console.log(`${passed} as expected, ${miss} MISSED, ${skipped} skipped (no network), ${run.length} cases${OFFLINE ? " (offline group only)" : ""}`);
console.log(miss ? `${miss} MISSED` : "all run cases as expected");
server.close();
process.exit(miss ? 1 : 0);
