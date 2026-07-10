---
name: external-worker-routing
description: Use when deciding whether a piece of deterministic, no-judgment work should route to a secondary AI provider instead of your primary interface. Covers the provider catalog, the five-condition eligibility test and the dispatch script.
status: active
version: 1.0
---

# External Worker Routing

> This skill also ships inside the Sovereign Ecosystem template.

Purpose: Give deterministic, no-judgment work a cheaper, faster home than your primary AI interface. Four secondary providers (OpenRouter, NVIDIA NIM, Groq, DeepSeek) sit behind one dispatch script. A five-condition test decides what is eligible to route there. Voice-bound and judgment-bound work never routes. It stays on your primary interface.

Trigger: any recurring task class that is deterministic and no-judgment. Audit sweeps, schema validation, smoke tests against a known baseline and repetitive classification are the common shapes.

Inputs: a task class, the gathered context it needs (pre-fetched, since the worker has no disk or network access), a provider and model pair.

Outputs: a structured worker response (text or JSON), a dispatch-log line and, for the eligible-task taxonomy, a routing decision your primary interface can reuse next time the same class comes up.

## The Routing Discipline

Two questions decide where work runs.

**Does the primary interface need to gather anything first?** Walking a filesystem, running a grep, fetching a URL, checking whether a file exists: these stay on the primary interface, because the secondary providers have no disk or network access of their own. Gather happens before dispatch, never inside it.

**Is the task itself deterministic, or does it carry judgment and voice?** Grouping, ranking, flagging and formatting a pre-gathered dataset is worker-eligible. Anything voice-adjacent, style-sensitive or personality-dependent is not, no matter how mechanical it looks on the surface. A task that reads as "just formatting" but actually encodes a stylistic choice belongs on the primary interface.

The pattern that emerges: gather on the primary interface, synthesize on the worker, verify the worker's output back on the primary interface. That three-step shape is the template for every worker-eligible task class.

## Provider Catalog

Each provider gets its own account, its own key and its own env-var slot. Add these to your environment file before first dispatch:

```
OPENROUTER_API_KEY=
NVIDIA_NIM_API_KEY=
GROQ_API_KEY=
DEEPSEEK_API_KEY=
```

| Provider | Env Var | Key Acquisition | Endpoint Shape |
|---|---|---|---|
| OpenRouter | `OPENROUTER_API_KEY` | openrouter.ai/keys | OpenAI-compatible, broadest single integration, many models at varying free-tier limits |
| NVIDIA NIM | `NVIDIA_NIM_API_KEY` | build.nvidia.com | OpenAI-compatible, several models on a direct-host free tier |
| Groq | `GROQ_API_KEY` | console.groq.com/keys | OpenAI-compatible, LPU hardware, very low latency, free tier |
| DeepSeek | `DEEPSEEK_API_KEY` | platform.deepseek.com/api_keys | Native Anthropic-compatible Messages API, paid but low cost per call |

**A key is not a guarantee of dispatch.** Signup, key acquisition and first dispatch are three separate gates, each with its own payment-method threshold. A provider can issue a working key against a zero-balance account. The first dispatch to a paid provider may return a balance error rather than a model response, and that is a normal outcome to check for, not a bug.

**Use-case fit.**

- **OpenRouter** is the default entry point for free-tier dispatch: high-volume audit work, schema diff scans, smoke tests against known baselines, repetitive tagging where the rule is fully specified. It is an aggregator, so two rate limits operate in parallel: the per-key aggregator ceiling and the upstream host's own capacity limit. Pair every OpenRouter slot with a fallback slug on a different host.
- **NVIDIA NIM** fits tool-use orchestration patterns and long-context bulk classification. Validate `tool_calls` payloads defensively; some models on this provider have intermittent malformed JSON.
- **Groq** fits latency-sensitive calls on open-weight models, short prompts in a tight loop where wall-clock time matters more than context window. Handle structured-output enforcement with prompt discipline plus client-side validation rather than relying on JSON Schema.
- **DeepSeek** fits code-focused work where the Anthropic-compatible endpoint shape simplifies wiring, and where output quality matters more than free-tier price. **Risk-scoping guardrail:** DeepSeek is PRC-headquartered and suffered a confirmed infrastructure breach in early 2025 that exposed prompt and metadata logs. Treat it as an untrusted external worker. Dispatch only non-sensitive batch work. Confidential payloads, regulated personal data and judgment-bound work stay on your primary interface.

Every dispatch carries an ambassador orientation automatically (see Dispatch below). It represents your system's essence, protects what should not leave it and advances your long-horizon interests, the same three duties any agent operating outside its home system carries.

## Worker-Eligible Task Taxonomy

**Five-condition eligibility test.** A task class routes to an external worker only when it satisfies all five:

1. The synthesis is deterministic and no-judgment. The rule is fully specified, not left to interpretation.
2. The output is bounded. A worker asked to faithfully reproduce a long flat list is unreliable. Judgment over a small number of groups is reliable.
3. No disk or network access is required. Your primary interface pre-gathers every input before dispatch.
4. The task is not voice-bound. Voice-adjacent, style-sensitive or personality-dependent work stays on your primary interface.
5. Your primary interface can verify the result without redoing the synthesis itself.

**Worker-eligible shapes.** Cross-reference health checks, structural scans over a fixed set of files, gap scans against a known checklist. Populate your own taxonomy table as you verify each class against a specific provider and model; a class is not eligible until you have actually run it and checked the output.

**Held on the primary interface even when they look mechanical.** Completeness verification against a spec (comparison judgment resists full specification). Compression or redundancy candidates (judgment about meaning, not deterministic synthesis). Link-rot residuals (the fetch has to happen on the primary interface anyway, so the leftover synthesis is trivial and not worth a second hop).

**Never worker-eligible, as a permanent boundary, not a maturity stage:** voice-bound drafting, concept or copy drafting, strategy and judgment work, anything that requires holding the full context only your primary interface has.

**The enumeration-completeness ceiling.** A worker that groups and suggests over a short set is reliable. The same worker given a long flat list to reproduce faithfully will often truncate under its own token cap. Keep large enumerations and their thresholds on the primary interface, and reserve the worker for the genuine synthesis judgment layered on top.

## Dispatch

The dispatch script ships inside this plugin's `scripts/` directory. It is the single entry point for every secondary-provider call.

```bash
node "<path-to-plugin>/scripts/external-worker.mjs" \
  --provider openrouter \
  --model qwen/qwen3-coder:free \
  --prompt "..." \
  [--context-pack path/to/context.md] \
  [--max-tokens 4096] [--temperature 0.7] [--format json] [--trace]
```

Replace `<path-to-plugin>` with the path where this plugin is installed in your environment. For plugin-based runtimes (Claude Code with IGOS), the script lives at:

```
plugins/external-worker-routing/scripts/external-worker.mjs
```

`--provider` accepts `openrouter`, `nvidia-nim`, `groq` or `deepseek`. Each provider adapter reads its key from the matching env var and calls its own base URL. `--context-pack` points at a file with the pre-gathered material the worker needs, since the worker cannot read your filesystem itself.

**What the script does automatically, every dispatch, not optional:**

- Reads provider credentials from your environment.
- Injects the ambassador orientation block as the system prompt.
- Returns model output to stdout: plain text by default, a JSON envelope with `--format json`.
- Logs dispatch metadata (provider, model, prompt hash, latency, token count) to `.runtime/external-worker-log.txt`.
- Fails loud on missing keys, network errors and rate-limit errors. No silent fallback to another provider.
- Treats a `stop_reason` or `finish_reason` of `"refusal"` as a failed dispatch even though the HTTP status is 200. A response handler that only checks the status code will misread a refusal as a success. This script does not make that mistake, and neither should any code that wraps it.

## Constraints

- Voice-bound and judgment-bound work never routes here. That boundary is permanent, not a scope you can widen with a good prompt.
- No silent fallback across providers. A failed dispatch surfaces the failure; it does not retry against a different provider without you knowing.
- A worker that fails a dispatch is not automatically demoted from the taxonomy. Check whether the failure was a rate limit, a key problem or a genuine quality miss before deciding whether the class stays eligible.
- Confidential payloads and regulated personal data stay on your primary interface regardless of which provider looks cheapest for the task shape.

## Model Routing

Dispatch the cheapest model that does the job well. Before each delegated step, ask whether a smaller model would produce equivalent output.

| Work type | Where it runs |
|---|---|
| Gathering (filesystem walks, greps, fetches, existence checks) | Primary interface, always |
| Deterministic synthesis over pre-gathered data (grouping, ranking, flagging, formatting) | External worker, once eligibility is verified |
| Verifying a worker's output against the gathered data | Primary interface, always |
| Voice-bound drafting, strategy, judgment-dense synthesis | Primary interface, never delegated externally |

Set the model and provider explicitly on every dispatch. Never silently inherit a default.

## Pairs With

**Source Harvest** produces the kind of large, repetitive classification passes that are the clearest worker-eligible shape once a source is inventoried.

**Systematic Debugging** stays entirely on your primary interface. Root-cause judgment is exactly the kind of work this skill's five-condition test excludes.

If Source Harvest isn't installed yet: [Install Source Harvest via Infinite Game OS](https://www.infinitegameos.io/skills/source-harvest).
If Systematic Debugging isn't installed yet: [Install Systematic Debugging via Infinite Game OS](https://www.infinitegameos.io/skills/systematic-debugging).

## Refinements

*(Empty. Populated when execution mistakes occur during sessions.)*
