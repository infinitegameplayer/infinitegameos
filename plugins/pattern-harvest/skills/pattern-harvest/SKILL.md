---
description: Use after substantial sessions to extract meta-level patterns, system upgrade opportunities and expression-quality observations. Produces a numbered recommendation list the operator selects from. Run before session closeout when warranted.
contrast_not: session logging, vault archival, plan reconciliation
false_twins: Session Closeout (logs what happened), system-level security audit
anti_patterns: running as a checklist; producing a document; replacing session closeout; running automatically
boundary_conditions: operator-invoked only; skip for lightweight sessions; run before session closeout when warranted
clarity_triggers: "analyze this session", "meta patterns", "pattern harvest", "ways to improve my system", "upgrade recommendations"
---

# Pattern Harvest

Purpose: Extract meta-level patterns from a working session. Patterns in how the work happened, system upgrade opportunities, expression and output-quality observations. Produces a flat numbered recommendation list the operator selects from by number. Output lives in conversation context and is naturally absorbed by any session-closeout flow that runs after.

Trigger: Operator-invoked. Not automatic. Use after substantial sessions: vocabulary work, governance design, multi-artifact builds, structural decisions, co-creation sessions. Skip for lightweight single-task sessions.

Inputs: Conversation context from the current session. No additional files unless a specific pattern needs verification.

Outputs: Structured findings in three labeled sections followed by a numbered recommendation list. No output document. Findings live in conversation context.

---

## Steps

### Step 1. Run three lenses simultaneously. Do not serialize.

Scan the session across all three lenses in parallel. Hold findings until Step 2.

**Lens A. Meta Patterns**

How did the work happen? What patterns in the collaboration, the co-creation process or how concepts emerged? What does this session reveal about the operator's thinking and building style? Note any spontaneous articulations that produced sharper language than the operator's reference documents. Those point to where the richest material lives.

Drift check (always included): did the session stay calibrated? Tone, humor balance, expression standards, execution-density. Flag any moments where the session felt mechanical or where meta-awareness was crowded out. This is not a judgment. It is input for the next session.

**Lens B. System Upgrades**

What would make the operator's system work better after this session? Cast wide:

- Infrastructure gaps (missing documents, broken links, structural needs)
- Governance improvements (protocols that should exist or be updated)
- Skill gaps (something that required improvised behavior a skill should govern)
- Standing-instruction gaps (a global rule that was missing or underspecified this session)
- Memory currency (things from this session that should be in the operator's memory store but are not, plus existing memory entries this session made stale). Before recommending a new memory entry, scan the existing memory index for an entry that could be broadened, updated or remixed. Default to update over create.
- Token efficiency: flag any redundant file reads, sequential tool calls that could have been parallel or tool choices that carried unnecessary context weight. One flag per observation. Not a detailed audit.

**Lens C. Expression and Output Quality**

Did the session's produced artifacts meet the operator's expression standards? Spot-check the documents built this session for the operator's named drift patterns and execution-density markers. One-line observation only. Not a full review.

---

### Step 2. Present findings in three labeled sections.

Use this structure exactly. Keep each section tight. Bullet points, one idea per line. No narrative padding.

```
## Meta Patterns

[Findings from Lens A. Process observations, collaboration insights, drift check.]

## System Upgrades

[Findings from Lens B. Infrastructure, governance, skills, standing instructions, memory, token efficiency.]

## Expression Check

[Findings from Lens C. One-line quality observation. "Clean" is a valid output if nothing flagged.]
```

---

### Step 3. Present numbered recommendations.

Flat numbered list. Each recommendation is sourced from any lens above. Actionable. Tagged with effort:

- `[now]` runs in this session and takes under five minutes
- `[quick]` runs in this session with one to three file edits if the operator approves
- `[plan]` warrants a pending plan or multi-session work
- `[defer]` is worth noting and not urgent. Log and revisit

Format:

```
## Recommendations

1. [Recommendation] `[effort tag]`
2. [Recommendation] `[effort tag]`
3. [Recommendation] `[effort tag]`
```

The operator selects by number: "Implement 1, 3, 5" or "All" or "Pass." Execute approved items before proceeding to session closeout.

---

## Pairing with Session Closeout

Pattern Harvest runs before session closeout when warranted. Because it runs first, its findings are in the conversation context when closeout executes. The closeout flow naturally captures what the harvest produced without any explicit handoff. The two flows are independent. Neither needs to know whether the other ran.

Sequence: Pattern Harvest, then operator selection and implementation, then session closeout.

---

## Constraints

- Does not write session logs, update standing primers or run reconciliation workers. That is a session-closeout job.
- Does not produce an output document unless a specific recommendation warrants one (e.g., a new pending plan).
- Does not run automatically. Always operator-invoked.
- Does not replace a full system-level security or infrastructure audit.
- Recommendations are proposals, not directives. The operator decides what gets implemented.
- Token efficiency observations are flags, not detailed audits. One line each.
- When a recommendation depends on a specific CLI flag, API parameter or tool behavior, mark it as unverified during harvest if not confirmed against the tool's help output or documentation. Verification belongs in the harvest, not the build.
- When a recommendation calls for expression-standard cleanup on a file, prefer targeted line edits over global replace. A `replace_all` pass can convert structural formatting (headings, definition labels, colons) by mistake. Targeted per-line edits are slower but do not create secondary damage.
- Cross-model verification: when Pattern Harvest produces a high-confidence system upgrade recommendation that would amend a governance document, consider a challenger pass on the recommendation using a different model or tool. When a Lens B recommendation hinges on external-reality state (current practitioner patterns, third-party tool capabilities) that may lie outside the AI's training data, consider a web-current verification before treating the recommendation as confirmed.

---

## Operating Posture

This skill is reflective work, not execution work. The three-lens parallel analysis (Step 1), the findings presentation (Step 2) and the numbered recommendation list (Step 3) are all synthesis. No step in the skill itself involves mechanical file operations or scripted external calls.

When a specific recommendation requires a file verification (e.g., confirming an entry in the operator's memory index exists before flagging it for update), that verification is a targeted lookup the orchestrator dispatches on the fly. No pre-planned dispatch. The orchestrator decides at execution time based on the specific recommendation shape.

The harvest is the moment the session reflects on itself. Without it, the patterns the work surfaced stay trapped in the transcript. With it, the patterns become structural upgrades to the system that does the next session.

---

## Model Routing

This skill runs at the highest available reasoning tier throughout. The three-lens parallel analysis, the findings presentation and the numbered recommendation list are all judgment work with no separable mechanical sub-tasks that warrant a lower tier.

Exception: if a specific recommendation requires a targeted file verification (e.g., confirming an entry in the memory index before flagging it for update), that verification dispatches as a lighter mechanical call. The orchestrator decides at execution time based on the recommendation shape.

| Work type | Model |
|---|---|
| Three-lens analysis, findings synthesis, recommendation list | Opus |
| Targeted file verification dispatched by a specific recommendation | Haiku |

Set the model explicitly on every dispatch. Never silently inherit the top tier.
