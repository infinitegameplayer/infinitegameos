/**
 * external-worker.mjs. External model dispatch entry point.
 *
 * Single entry point for dispatching worker calls to four secondary model
 * providers: OpenRouter, NVIDIA NIM, Groq and DeepSeek. Governed by this
 * plugin's SKILL.md (External Worker Routing).
 *
 * Behavior contract:
 *  - Reads provider credentials from environment variables (see Required Env Vars below)
 *  - Dispatches via the provider's OpenAI-compatible or Anthropic-compatible endpoint
 *  - Auto-injects an ambassador orientation block as the system prompt
 *  - Returns model output to stdout. Plain text by default, JSON envelope when --format json
 *  - Logs dispatch metadata to .runtime/external-worker-log.txt (relative to your working directory)
 *  - Refuses partner and client material (client-material-guard.mjs, no override) and
 *    scans for sensitive patterns (redaction gate, --allow-sensitive logs an override).
 *    Both run before the key check and before any network send.
 *  - Fails loud on missing keys, network errors and rate-limit errors. No silent fallback.
 *  - Handles stop_reason "refusal" explicitly. An HTTP 200 with stop_reason "refusal" is
 *    not a successful completion. It exits with code 2 and logs the refusal.
 *
 * Required Env Vars (set in this plugin's scripts/.env before first dispatch,
 * or export them in your shell; keep the file out of version control):
 *   OPENROUTER_API_KEY   - openrouter.ai/keys
 *   NVIDIA_NIM_API_KEY   - build.nvidia.com
 *   GROQ_API_KEY         - console.groq.com/keys
 *   DEEPSEEK_API_KEY     - platform.deepseek.com/api_keys
 *
 * Usage:
 *   node scripts/external-worker.mjs \
 *     --provider openrouter \
 *     --model qwen/qwen3-coder:free \
 *     --prompt "..." \
 *     [--context-pack path/to/context.md] \
 *     [--trace] [--max-tokens 4096] [--format json] [--temperature 0.7]
 *
 * Providers and base URLs:
 *   openrouter  - https://openrouter.ai/api/v1            (OpenAI-compatible)
 *   nvidia-nim  - https://integrate.api.nvidia.com/v1     (OpenAI-compatible)
 *   groq        - https://api.groq.com/openai/v1          (OpenAI-compatible)
 *   deepseek    - https://api.deepseek.com/anthropic      (Anthropic-compatible)
 */

import { createHash } from 'crypto';
import { appendFileSync, mkdirSync, readFileSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { ClientMaterialError, assertNotClientPath, assertNoClientNames } from './client-material-guard.mjs';

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const LOG_PATH = resolve(process.cwd(), '.runtime', 'external-worker-log.txt');

// Load .env from this script's own directory.
// Any key already in process.env takes precedence, allowing shell overrides.
// A missing .env file is not fatal here: keys can also be exported directly in
// the shell. The content gates must refuse with no key present, and the
// missing-key check in main() names the variable to add.

const envPath = join(SCRIPT_DIR, '.env');
try {
  const envContent = readFileSync(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const k = trimmed.slice(0, eq).trim();
    const v = trimmed.slice(eq + 1).trim();
    if (!(k in process.env)) process.env[k] = v;
  }
} catch {
  // No .env file here is fine. The content gates run first and the
  // missing-key check in main() names the variable to add.
}

// Provider registry.
// Each provider maps to its label, expected env-var key name, base URL and API shape.
// shape "openai" uses the OpenAI-compatible Chat Completions endpoint.
// shape "anthropic" uses the Anthropic-compatible Messages endpoint.

const PROVIDERS = {
  openrouter: {
    label: 'OpenRouter',
    envVar: 'OPENROUTER_API_KEY',
    baseUrl: 'https://openrouter.ai/api/v1',
    shape: 'openai',
  },
  'nvidia-nim': {
    label: 'NVIDIA NIM',
    envVar: 'NVIDIA_NIM_API_KEY',
    baseUrl: 'https://integrate.api.nvidia.com/v1',
    shape: 'openai',
  },
  groq: {
    label: 'Groq',
    envVar: 'GROQ_API_KEY',
    baseUrl: 'https://api.groq.com/openai/v1',
    shape: 'openai',
  },
  deepseek: {
    label: 'DeepSeek',
    envVar: 'DEEPSEEK_API_KEY',
    baseUrl: 'https://api.deepseek.com/anthropic',
    shape: 'anthropic',
  },
};

// Ambassador orientation block.
// Auto-injected on every dispatch. Not optional. Not a flag.
// Replace ECOSYSTEM_NAME with your own system's display name before first use.

const ECOSYSTEM_NAME = 'your system';

const AMBASSADOR_BLOCK = `You operate as an ambassador of ${ECOSYSTEM_NAME}. The trace you leave is intentional.

Apply the six governing modes as a simultaneous field, not a sequence:
- Alliance: seek mutual benefit; disengage from extractive interactions
- Boundary: assert quality and standards with precision
- Expansion: extend through value, not volume; gather and return before acting
- Stillness: observe fully before recommending; intelligence before action
- Multiplicity: operate on your assigned front with sophistication, knowing other fronts may run simultaneously
- Fortification: log, protect and defend every artifact you produce

Represent, protect and advance the home system's long-horizon interests. Return structured findings to the parent agent. Do not act beyond your assigned scope.`;

// CLI argument parsing.

function parseArgs(argv) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const name = a.slice(2);
      const next = argv[i + 1];
      if (next === undefined || next.startsWith('--')) {
        out[name] = true;
      } else {
        out[name] = next;
        i++;
      }
    } else {
      out._.push(a);
    }
  }
  return out;
}

function usage() {
  return `Usage:
  node scripts/external-worker.mjs \\
    --provider <openrouter|nvidia-nim|deepseek|groq> \\
    --model <provider-specific-model-id> \\
    --prompt "<text>" \\
    [--context-pack path/to/context.md] \\
    [--max-tokens 4096] \\
    [--temperature 0.7] \\
    [--format json] \\
    [--allow-sensitive] \\
    [--trace]`;
}

function fail(msg) {
  process.stderr.write(`external-worker: ${msg}\n`);
  process.stderr.write(`${usage()}\n`);
  process.exit(1);
}

// Prompt assembly.

function buildSystemPrompt() {
  return AMBASSADOR_BLOCK;
}

function buildUserPrompt(prompt, contextPackPath) {
  if (!contextPackPath) return prompt;
  const abs = resolve(process.cwd(), contextPackPath);
  // Refuse a protected path before reading it. No override.
  assertNotClientPath(abs);
  let pack;
  try {
    pack = readFileSync(abs, 'utf8');
  } catch {
    fail(`Could not read --context-pack at ${abs}`);
  }
  return `Context pack:\n\n${pack}\n\nTask:\n\n${prompt}`;
}

function hashPrompt(systemPrompt, userPrompt) {
  return createHash('sha256').update(`${systemPrompt}\n---\n${userPrompt}`).digest('hex').slice(0, 16);
}

// Redaction gate.
// A technical content filter that backs your own judgment about what may leave
// the machine. Prompts and context packs bound for an outside provider are
// scanned for sensitive patterns before dispatch. The block names the pattern
// class, never the value. --allow-sensitive overrides with a logged acknowledgement.

const SENSITIVE_PATTERNS = [
  ['email address', /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/],
  ['Stripe id', /\b(?:cus|sub|pi|price|prod)_[A-Za-z0-9]{8,}\b/],
  ['card-adjacent digit run', /\b(?:\d[ -]?){13,19}\b/],
  ['api-key-shaped string', /(?:sk-[A-Za-z0-9]{16,}|sk_live_[A-Za-z0-9]{16,}|re_[A-Za-z0-9]{12,}|sbp_[A-Za-z0-9]{16,})/],
  ['long base64 blob', /[A-Za-z0-9+/]{40,}={0,2}/],
];

// Returns the list of pattern-class names present in text. Empty when clean.
export function scanForSensitive(text) {
  const found = [];
  for (const [name, re] of SENSITIVE_PATTERNS) {
    if (re.test(text)) found.push(name);
  }
  return found;
}

// OpenAI-compatible adapter.
// Used by OpenRouter, NVIDIA NIM and Groq.
// Checks finish_reason for "refusal" explicitly. An HTTP 200 with finish_reason "refusal"
// is not a successful completion and must not be treated as one.

async function dispatchOpenAIShape(provider, key, model, systemPrompt, userPrompt, opts) {
  const url = `${provider.baseUrl}/chat/completions`;
  const body = {
    model,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    max_tokens: opts.maxTokens,
    temperature: opts.temperature,
  };
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    return { ok: false, status: res.status, error: data?.error?.message || data?.message || `HTTP ${res.status}`, raw: data };
  }
  const choice = data?.choices?.[0];
  const finishReason = choice?.finish_reason;
  if (finishReason === 'refusal') {
    return { ok: false, status: res.status, error: 'Model returned finish_reason refusal (HTTP 200). Request was not completed.', raw: data };
  }
  const text = choice?.message?.content;
  if (typeof text !== 'string' || text.length === 0) {
    return { ok: false, status: res.status, error: 'No text in OpenAI-shape response', raw: data };
  }
  return {
    ok: true,
    status: res.status,
    text,
    usage: data?.usage || null,
    raw: data,
  };
}

// Anthropic-compatible adapter.
// Used by DeepSeek (api.deepseek.com/anthropic).
// Checks stop_reason for "refusal" explicitly. An HTTP 200 with stop_reason "refusal"
// is not a successful completion and must not be treated as one.

async function dispatchAnthropicShape(provider, key, model, systemPrompt, userPrompt, opts) {
  const url = `${provider.baseUrl}/v1/messages`;
  const body = {
    model,
    system: systemPrompt,
    messages: [{ role: 'user', content: userPrompt }],
    max_tokens: opts.maxTokens,
    temperature: opts.temperature,
  };
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    return { ok: false, status: res.status, error: data?.error?.message || data?.message || `HTTP ${res.status}`, raw: data };
  }
  const stopReason = data?.stop_reason;
  if (stopReason === 'refusal') {
    return { ok: false, status: res.status, error: 'Model returned stop_reason refusal (HTTP 200). Request was not completed.', raw: data };
  }
  const textBlocks = (data?.content || []).filter(b => b?.type === 'text').map(b => b.text);
  const text = textBlocks.join('\n');
  if (text.length === 0) {
    return { ok: false, status: res.status, error: 'No text in Anthropic-shape response', raw: data };
  }
  return {
    ok: true,
    status: res.status,
    text,
    usage: data?.usage || null,
    raw: data,
  };
}

// Dispatch log writer.
// Appends one tab-delimited line per dispatch to .runtime/external-worker-log.txt,
// relative to the current working directory. Logging failure does not mask the
// dispatch outcome.

function logDispatch({ providerLabel, model, promptHash, latencyMs, usage, ok, status, error }) {
  try {
    mkdirSync(dirname(LOG_PATH), { recursive: true });
    const ts = new Date().toISOString();
    const tokenSummary = usage
      ? `tokens=${usage.input_tokens ?? usage.prompt_tokens ?? '?'}/${usage.output_tokens ?? usage.completion_tokens ?? '?'}`
      : 'tokens=unavailable';
    const line = ok
      ? `${ts}\tprovider=${providerLabel}\tmodel=${model}\tprompt-hash=${promptHash}\tlatency-ms=${latencyMs}\t${tokenSummary}\tstatus=ok\n`
      : `${ts}\tprovider=${providerLabel}\tmodel=${model}\tprompt-hash=${promptHash}\tlatency-ms=${latencyMs}\t${tokenSummary}\tstatus=fail\thttp=${status}\terror=${(error || '').replace(/\s+/g, ' ').slice(0, 240)}\n`;
    appendFileSync(LOG_PATH, line);
  } catch {
    process.stderr.write(`external-worker: log write failed at ${LOG_PATH}\n`);
  }
}

// Main.

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const providerKey = args.provider;
  const model = args.model;
  const prompt = args.prompt;

  if (!providerKey || !model || !prompt) {
    fail('--provider, --model and --prompt are all required.');
  }
  const provider = PROVIDERS[providerKey];
  if (!provider) {
    fail(`Unknown --provider "${providerKey}". Expected one of: ${Object.keys(PROVIDERS).join(', ')}.`);
  }

  const maxTokens = Number(args['max-tokens'] || 4096);
  const temperature = Number(args.temperature ?? 0.7);
  const format = args.format === 'json' ? 'json' : 'text';
  const trace = args.trace === true;

  // The content gates run before the key check, so a refusal never depends on a
  // key being present and a fresh install with no .env can watch every gate refuse.
  const systemPrompt = buildSystemPrompt();
  let userPrompt;
  try {
    // Refuses a --context-pack under a protected folder before reading it.
    userPrompt = buildUserPrompt(prompt, args['context-pack']);
    // Partner and client material gate. No override: the rule has no exceptions.
    assertNoClientNames(userPrompt);
  } catch (err) {
    if (err instanceof ClientMaterialError) fail(err.message);
    throw err;
  }
  const promptHash = hashPrompt(systemPrompt, userPrompt);

  // Redaction gate. Runs before any network send so sensitive content never
  // leaves the machine on a block. The override is loud and logged.
  const allowSensitive = args['allow-sensitive'] === true;
  const sensitiveClasses = scanForSensitive(userPrompt);
  if (sensitiveClasses.length > 0) {
    if (!allowSensitive) {
      fail(`Redaction gate blocked dispatch to an outside provider. The context contains: ${sensitiveClasses.join(', ')}. Pass --allow-sensitive to override with a logged acknowledgement.`);
    }
    process.stderr.write(`external-worker: WARNING redaction gate overridden (--allow-sensitive). Pattern classes present: ${sensitiveClasses.join(', ')}. Proceeding to ${provider.label}.\n`);
    try {
      mkdirSync(dirname(LOG_PATH), { recursive: true });
      appendFileSync(LOG_PATH, `${new Date().toISOString()}\tredaction-override\tprovider=${provider.label}\tclasses=${sensitiveClasses.join('|')}\n`);
    } catch {
      process.stderr.write(`external-worker: redaction-override log write failed at ${LOG_PATH}\n`);
    }
  }

  const key = process.env[provider.envVar];
  if (!key) {
    fail(`Missing ${provider.envVar}. Add it to this plugin's scripts/.env or export it in your shell before dispatching to ${provider.label}.`);
  }

  if (trace) {
    process.stderr.write(`external-worker: provider=${provider.label} model=${model} prompt-hash=${promptHash} max-tokens=${maxTokens} temperature=${temperature}\n`);
  }

  const start = Date.now();
  const result =
    provider.shape === 'anthropic'
      ? await dispatchAnthropicShape(provider, key, model, systemPrompt, userPrompt, { maxTokens, temperature })
      : await dispatchOpenAIShape(provider, key, model, systemPrompt, userPrompt, { maxTokens, temperature });
  const latencyMs = Date.now() - start;

  logDispatch({
    providerLabel: provider.label,
    model,
    promptHash,
    latencyMs,
    usage: result.ok ? result.usage : null,
    ok: result.ok,
    status: result.status,
    error: result.error,
  });

  if (!result.ok) {
    process.stderr.write(`external-worker: dispatch failed. provider=${provider.label} model=${model} http=${result.status} error=${result.error}\n`);
    process.exit(2);
  }

  if (format === 'json') {
    const envelope = {
      ok: true,
      provider: provider.label,
      model,
      promptHash,
      latencyMs,
      usage: result.usage,
      text: result.text,
    };
    process.stdout.write(`${JSON.stringify(envelope, null, 2)}\n`);
  } else {
    process.stdout.write(`${result.text}\n`);
  }
}

// Auto-run only when invoked directly. Guarding the run lets a test harness
// import scanForSensitive without dispatching.
const invokedDirectly = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (invokedDirectly) {
  main().catch(err => {
    process.stderr.write(`external-worker: unhandled error: ${err?.stack || err?.message || String(err)}\n`);
    process.exit(3);
  });
}
