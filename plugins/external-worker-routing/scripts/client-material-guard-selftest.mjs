#!/usr/bin/env node
/**
 * client-material-guard-selftest.mjs
 *
 * Proves the partner and client material guard refuses, permits and is wired
 * into external-worker.mjs. Runs on a FIXTURE project built in the OS temp folder,
 * never on your real folders. The fixture is deleted at the end.
 *
 *   Arm A  refuse   paths and names the guard must refuse
 *   Arm B  permit   paths and text the guard must let through
 *   Arm C  liveness every Arm A case passes when the rules are emptied, so Arm A
 *                   is proven to be the rules at work and not a stuck refusal
 *   Arm D  wiring   external-worker.mjs, spawned with NO provider key, refuses
 *                   at each gate and a clean prompt gets past every gate
 *   Config          a malformed or wrong-shape config refuses
 *   Redaction       scanForSensitive detects each of its five classes
 *
 * Run: node client-material-guard-selftest.mjs [--worker path/to/external-worker.mjs]
 * Exit 0 on PASS, 1 on any FAIL. Nothing here reaches a provider.
 */

import { spawnSync } from 'child_process';
import { mkdirSync, mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { dirname, join, resolve } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const HERE = dirname(fileURLToPath(import.meta.url));
// The worker under test. Defaults to the sibling script. --worker (or EWR_WORKER) points
// the same suite at another copy, which is how a plant proves the suite sees a hole.
const argv = process.argv.slice(2);
const workerFlag = argv.indexOf('--worker');
const WORKER = resolve(workerFlag >= 0 ? argv[workerFlag + 1] : (process.env.EWR_WORKER || join(HERE, 'external-worker.mjs')));

// Fixture project. The guard resolves against the working directory, so the suite
// moves into the fixture before any check runs. The config is read from a fixture path.
const FIXTURE = realpathSync.native(mkdtempSync(join(tmpdir(), 'ewr-guard-')));
const PARTNER = 'Zebulon Quarterfield';
mkdirSync(join(FIXTURE, 'Collaborations', PARTNER), { recursive: true });
writeFileSync(join(FIXTURE, 'Collaborations', PARTNER, 'plant.md'), 'fixture partner note\n', 'utf8');
mkdirSync(join(FIXTURE, 'Collaborations', 'Acme'), { recursive: true });
mkdirSync(join(FIXTURE, 'docs'), { recursive: true });
writeFileSync(join(FIXTURE, 'docs', 'note.md'), 'ordinary note\n', 'utf8');
process.chdir(FIXTURE);
delete process.env.CLIENT_GUARD_EXTRA_NAMES;

const CONFIG_PATH = join(FIXTURE, 'client-material.config.json');
process.env.CLIENT_MATERIAL_CONFIG = CONFIG_PATH;
const VALID_CONFIG = { blockedPrefixes: ['Clients/'], names: ['Jane Example'] };
const writeConfig = (text) => writeFileSync(CONFIG_PATH, text, 'utf8');
const removeConfig = () => rmSync(CONFIG_PATH, { force: true });

let passed = 0;
let failed = 0;
function record(arm, name, expected, actual) {
  const good = expected === actual;
  if (good) passed++; else failed++;
  console.log(`${good ? 'ok  ' : 'FAIL'} [${arm}] ${name} | expected=${expected} actual=${actual}`);
}

async function main() {
  const guard = await import(pathToFileURL(join(HERE, 'client-material-guard.mjs')).href);
  const { ClientMaterialError, assertNotClientPath, assertNoClientNames } = guard;

  const refuses = (fn) => {
    try { fn(); } catch (e) { return e instanceof ClientMaterialError && e.code === 'CLIENT_MATERIAL' ? 'refuse' : `threw ${e && e.name}`; }
    return 'permit';
  };
  const pathCase = (p, rules) => () => assertNotClientPath(p, rules);
  const textCase = (t, rules) => () => assertNoClientNames(t, rules);

  // Defaults only: no config file in the fixture yet.
  removeConfig();
  const defaultsOnly = [
    ['relative Collaborations path', 'path', 'Collaborations/Acme/notes.md'],
    ['lowercase collaborations path', 'path', 'collaborations/acme/notes.md'],
    ['absolute Collaborations path', 'path', join(FIXTURE, 'Collaborations', PARTNER, 'plant.md')],
    ['the Collaborations folder itself', 'path', 'Collaborations'],
    ['fixture full name in text', 'text', `Please summarize the call with ${PARTNER} today.`],
    ['fixture name, other case and spacing', 'text', 'notes on zebulon    QUARTERFIELD from friday'],
  ];
  for (const [name, kind, input] of defaultsOnly) {
    record('A', name, 'refuse', refuses(kind === 'path' ? pathCase(input) : textCase(input)));
  }

  // With a valid config added.
  writeConfig(JSON.stringify(VALID_CONFIG));
  const withConfig = [
    ['path under a config-added prefix', 'path', 'Clients/Whoever/brief.md'],
    ['config-added name in text', 'text', 'Draft a note for Jane Example about the schedule.'],
  ];
  for (const [name, kind, input] of withConfig) {
    record('A', name, 'refuse', refuses(kind === 'path' ? pathCase(input) : textCase(input)));
  }
  const armA = [...defaultsOnly, ...withConfig];

  // Arm B: permit (config still in place, so a config must not over-block).
  const armB = [
    ['ordinary docs path', 'path', 'docs/note.md'],
    ['sibling folder that only starts like Collaborations', 'path', 'CollaborationsArchive/x.md'],
    ['path outside the project', 'path', join(tmpdir(), 'elsewhere', 'Collaborations', 'x.md')],
    ['text with no name', 'text', 'Summarize the quarterly schedule for the team.'],
    ['first name alone', 'text', 'Zebulon sent the schedule over.'],
    ['single-word folder name Acme', 'text', 'Acme sent the schedule over.'],
  ];
  for (const [name, kind, input] of armB) {
    record('B', name, 'permit', refuses(kind === 'path' ? pathCase(input) : textCase(input)));
  }

  // Test hook can only add.
  process.env.CLIENT_GUARD_EXTRA_NAMES = 'Hook Planted';
  record('A', 'CLIENT_GUARD_EXTRA_NAMES adds a name', 'refuse', refuses(textCase('about Hook Planted here')));
  record('A', 'CLIENT_GUARD_EXTRA_NAMES leaves a fixture name refused', 'refuse', refuses(textCase(`about ${PARTNER} here`)));
  delete process.env.CLIENT_GUARD_EXTRA_NAMES;

  // Arm C: liveness. Every Arm A case passes with the rules emptied.
  const EMPTY = { blockedPrefixes: [], clientNames: [] };
  for (const [name, kind, input] of armA) {
    record('C', `${name} (rules emptied)`, 'permit', refuses(kind === 'path' ? pathCase(input, EMPTY) : textCase(input, EMPTY)));
  }

  // Config shape: a broken config refuses, never reads as no rule.
  const brokenConfigs = [
    ['malformed JSON', '{ "names": ['],
    ['empty file', ''],
    ['top level array', '[]'],
    ['top level null', 'null'],
    ['names is a string', '{"names": "Jane Example"}'],
    ['blockedPrefixes holds a number', '{"blockedPrefixes": [1]}'],
    ['names holds an empty string', '{"names": [""]}'],
  ];
  for (const [name, text] of brokenConfigs) {
    writeConfig(text);
    record('Config', `${name} refuses a path check`, 'refuse', refuses(pathCase('docs/note.md')));
    record('Config', `${name} refuses a text check`, 'refuse', refuses(textCase('a clean sentence')));
  }
  writeConfig(JSON.stringify({ _readme: 'ignored key', blockedPrefixes: [], names: [] }));
  record('Config', 'valid config with empty arrays and a _readme key permits', 'permit', refuses(pathCase('docs/note.md')));
  removeConfig();
  record('Config', 'no config file means defaults only (clean path)', 'permit', refuses(pathCase('docs/note.md')));
  record('Config', 'no config file still refuses Collaborations', 'refuse', refuses(pathCase('Collaborations/x.md')));

  // Redaction gate: import the worker in a helper process (it only auto-runs
  // when invoked directly). A helper keeps an old worker that exits on import
  // from ending this whole suite before the wiring cases run.
  {
    const samples = [
      ['email address', 'write to alex.person@example.com please'],
      ['Stripe id', 'customer cus_AbCdEfGh1234 renewed'],
      ['card-adjacent digit run', 'card 4111 1111 1111 1111 on file'],
      ['api-key-shaped string', `token ${'sk-' + 'abcdefghijklmnopqrst'} in the log`],
      ['long base64 blob', `blob ${'QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVowMTIzNDU2'} end`],
    ];
    const clean = 'The quarterly schedule is ready for review.';
    const helperPath = join(FIXTURE, 'scan-helper.mjs');
    writeFileSync(helperPath, [
      `import { scanForSensitive } from ${JSON.stringify(pathToFileURL(WORKER).href)};`,
      `const inputs = JSON.parse(process.argv[2]);`,
      `process.stdout.write('RESULT ' + JSON.stringify(inputs.map((t) => scanForSensitive(t))));`,
      '',
    ].join('\n'), 'utf8');
    const helperEnv = { ...process.env };
    for (const k of Object.keys(helperEnv)) if (k.endsWith('_API_KEY')) delete helperEnv[k];
    const h = spawnSync(process.execPath, [helperPath, JSON.stringify([...samples.map((s) => s[1]), clean])], { env: helperEnv, cwd: FIXTURE, encoding: 'utf8', timeout: 30000 });
    const m = /RESULT (.*)$/.exec(h.stdout || '');
    const results = m ? JSON.parse(m[1]) : null;
    samples.forEach(([cls], i) => {
      record('Redaction', `detects ${cls}`, 'detected', results && results[i].includes(cls) ? 'detected' : 'missed');
    });
    record('Redaction', 'clean text returns empty', '0', results ? String(results[samples.length].length) : 'import failed');
  }

  // Arm D: wiring. Spawn the worker with no provider key in the env.
  const workerSource = readFileSync(WORKER, 'utf8');
  const keyNames = new Set([...workerSource.matchAll(/envVar:\s*'([A-Z0-9_]+)'/g)].map((m) => m[1]));
  const childEnv = { ...process.env };
  for (const k of Object.keys(childEnv)) if (k.endsWith('_API_KEY')) delete childEnv[k];
  // An empty value also stops the worker's .env loader from filling the key back in.
  for (const k of keyNames) childEnv[k] = '';
  record('D', 'worker names at least one provider key var', 'true', String(keyNames.size > 0));
  writeConfig(JSON.stringify(VALID_CONFIG));

  const run = (extra) => {
    const r = spawnSync(process.execPath, [WORKER, '--provider', 'groq', '--model', 'fixture-model', ...extra], { env: childEnv, cwd: FIXTURE, encoding: 'utf8', timeout: 30000 });
    return { code: r.status, out: `${r.stdout || ''}${r.stderr || ''}` };
  };

  let r = run(['--prompt', 'Summarize this.', '--context-pack', `Collaborations/${PARTNER}/plant.md`]);
  record('D', 'context-pack under Collaborations refuses (exit)', '1', String(r.code));
  record('D', 'context-pack refusal says Refused', 'true', String(/Refused/.test(r.out)));
  record('D', 'context-pack refusal is not a read failure', 'false', String(/Could not read/.test(r.out)));

  r = run(['--prompt', 'Summarize this.', '--context-pack', 'docs/does-not-exist.md']);
  record('D', 'an ordinary missing context-pack still reports Could not read', 'true', String(/Could not read/.test(r.out)));

  r = run(['--prompt', `Please summarize the call with ${PARTNER}.`]);
  record('D', 'prompt naming the fixture partner refuses (exit)', '1', String(r.code));
  record('D', 'name refusal says Refused', 'true', String(/Refused/.test(r.out)));
  record('D', 'name refusal never echoes the name', 'false', String(r.out.includes(PARTNER)));

  const fakeKey = 'sk-' + 'abcdefghijklmnopqrst';
  r = run(['--prompt', `Use this credential ${fakeKey} to log in.`]);
  record('D', 'redaction gate refuses a key-shaped prompt (exit)', '1', String(r.code));
  record('D', 'redaction message names the class', 'true', String(/api-key-shaped string/.test(r.out)));
  record('D', 'redaction message never echoes the value', 'false', String(r.out.includes(fakeKey)));
  record('D', 'redaction refusal is the gate, not the key check', 'false', String(/Missing GROQ_API_KEY/.test(r.out)));

  r = run(['--prompt', 'Summarize the quarterly schedule for the team.']);
  record('D', 'clean prompt gets past every gate (exit)', '1', String(r.code));
  record('D', 'clean prompt fails only on the missing key', 'true', String(/Missing GROQ_API_KEY/.test(r.out) && !/Refused|Redaction gate/.test(r.out)));

  writeConfig('{ broken');
  r = run(['--prompt', 'Summarize the quarterly schedule for the team.']);
  record('D', 'malformed config refuses a clean prompt (exit)', '1', String(r.code));
  record('D', 'malformed config refusal says Refused', 'true', String(/Refused/.test(r.out)));
  removeConfig();
}

let crashed = null;
try {
  await main();
} catch (err) {
  crashed = err;
} finally {
  try { rmSync(FIXTURE, { recursive: true, force: true }); } catch { /* temp folder, the OS clears it */ }
}
if (crashed) {
  console.log(`FAIL selftest crashed: ${crashed?.stack || crashed}`);
  failed++;
}
console.log(`\n${failed === 0 ? 'PASS' : 'FAIL'} client-material-guard-selftest: ${passed} ok, ${failed} failed`);
process.exit(failed === 0 ? 0 : 1);
