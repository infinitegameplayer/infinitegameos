---
name: anti-ai-edit-pass
description: Use when a long-form manuscript (book chapter, ebook, multi-chapter playbook, long-form digital product) needs an editing pass to identify and remove AI writing tells. Sweeps across 8 pattern categories, assembles a structured edit packet for operator review, and applies approved edits.
status: active
version: 1.0
---

# Anti-AI Edit Pass Skill

> This skill also ships inside the Sovereign Ecosystem template for operators using the full Infinite Game OS vault.

Purpose: Find and remove the writing patterns that betray LLM authorship from long-form manuscripts. This skill does not rewrite prose wholesale. It flags AI-pattern instances, proposes replacements, surfaces them for operator judgment and applies only what the operator approves.

Trigger: Operator invokes "Anti-AI Edit Pass" with a manuscript path or file. Also usable chapter-by-chapter during drafting to prevent accumulating a backlog of AI tells before final review.

Inputs: `target_path` pointing to the manuscript file or directory. Optional parameters defined in Entry Contract.

Outputs: A structured edit packet organized by category, the edited manuscript with all operator-approved changes applied, and a changelog entry.

Status: active

---

## The 8 Pattern Categories (Built-In Reference)

This skill is self-contained. The full pattern reference below replaces the external codex dependency.

### Category I: Lexical Blacklist

Single words and short phrases that appear so often in AI-generated text they read as fingerprints. Some may surface in the operator's natural vocabulary. The Vocabulary Reconciliation pass (Entry Contract: `vocab_overrides`) identifies verified exceptions.

1. **Delve tic**: "Delve into" as the default verb for exploration. Replace: name the specific act.
2. **Tapestry noun**: "Tapestry" as a container noun for anything complex. Replace: name the actual things.
3. **Landscape noun**: "Landscape" as spatial metaphor for any field or domain. Replace: name the actual terrain.
4. **Realm abstractor**: "Realm of" elevating the ordinary to mystical. Replace: drop it.
5. **Lever verb cluster**: Reflexive "utilize," "harness" instead of simpler verbs. Replace: "use" or the specific action.
6. **Elevation verb cluster**: "Foster," "unleash," "unlock" without specifying mechanism. Replace: name what actually changes.
7. **Robust adjective**: "Robust" applied as filler intensifier. Replace: say what makes it strong.
8. **Comprehensive adjective**: "Comprehensive" before any noun to signal completeness. Replace: cut it.
9. **Pivotal/multifaceted/meticulous family**: Adjectives inflating ordinary significance. Replace: show what makes it pivotal; name one facet.
10. **Testament/serves-as construction**: Copula avoidance: "is a testament to," "serves as," "acts as." Replace: use "is."
11. **Business jargon cluster**: "Move the needle," "circle back," "double down," "low-hanging fruit." Replace: name what actually changes.
12. **Vague demonstrative anchor**: Overuse of "this" and "these" as paragraph openers without clear antecedent. Replace: name the actual thing.

### Category II: Opener Tells

Failure modes at the first sentence of a piece, chapter or section.

13. **Temporal opener**: "In today's fast-paced world," "In an era of," "As we move forward." Replace: start with the actual situation.
14. **Whether-you're opener**: "Whether you're X or Y" naming two audience types before stating the point. Replace: write to the reader directly.
15. **Let's-dive opener**: "Let's dive in," "Let's explore," "Let's unpack this" before an explanation that would have begun anyway. Replace: start the explanation.
16. **Corrupted imagine opener**: "Imagine..." followed by a hypothetical scenario as emotional buy-in before the actual argument. Replace: drop into the lived moment.
17. **Sycophantic opener**: "Great question!" "Absolutely!" "Certainly!" in prose. Replace: answer the question or start the substance.
18. **"By the end of this..." opener**: Promising the reader what they will know by the end. Replace: begin with the lived moment or felt tension.

### Category III: Hedging, Padding and Disclaimer Reflexes

The most pervasive category. The fix is almost always: state the claim.

19. **Importance hedge**: "It's important to note," "It's worth noting" before stating something. Replace: state the thing.
20. **Moreover escalator**: Opening consecutive sentences with "Moreover," "Furthermore," "Additionally." Replace: cut the transition or name the relationship.
21. **That-said pivot**: "That said," "With that said," "That being said." Replace: start the contrasting sentence without the pivot.
22. **Hedge stacking**: Multiple qualifiers pile onto one assertion: "could potentially," "may often," "might ultimately." Replace: "This works. Here is why."
23. **Faux humility**: "I'm just one perspective here," "I could be wrong," "Take this with a grain of salt." Replace: state what you know.
24. **False vulnerability**: Performative self-disclosure that simulates authenticity without genuine risk. Replace: name the actual thing struggled with.
25. **"I want to be clear" disclaimer**: "I want to be clear," "to be clear," "let me be direct" performing directness rather than being direct. Replace: be direct.
26. **Tautological padding**: Same point restated in slightly different phrasing across three to four consecutive sentences. Replace: write the sentence once and move on.
27. **"I should mention" hedge**: "I should mention," "I should note," "One thing to keep in mind." Replace: state the caveat directly or cut it.
28. **AI-identity disclaimer leakage**: "As an AI language model" or equivalent phrases leaking into human-voice prose. Replace: write from the operator's lived experience.

### Category IV: Negation and Pivot Constructions

Used sparingly in specific idioms. Used reflexively by AI as default rhetorical structure.

29. **"It's not X, it's Y" pivot**: Whole-sentence reframe delivered as revelation. Replace: state Y directly.
30. **Not-A-Not-B-Not-C triad**: Pure negation run three times before any affirmative content. Replace: lead with the affirmative.
31. **Not-just-but-also escalation**: "Not just X, but Y." Replace: state Y.
32. **Balanced-perspective sandwich**: Position A, position B, "the truth lies between." Replace: have a position.
33. **False concession**: Granting the opposing position without engaging it. Replace: either engage it or do not bring it up.

### Category V: Rhetorical Reflexes

Multi-sentence patterns that simulate thoughtful structure. The reader senses them as theater.

34. **Faux-Socratic chain**: Sequence of escalating rhetorical questions answering nothing. Replace: one question, let it work.
35. **Preamble announcement**: "Let me explain what I mean." Replace: start the explanation.
36. **"Here's why this matters" frame**: Announcing importance before delivering. Replace: state the importance through the sentence itself.
37. **Engagement-bait revelation**: "Nobody is talking about this," "everyone is getting this wrong." Replace: make the observation; rarity is obvious from the content.
38. **Anaphoric hammer**: Same phrase opens 3 or more consecutive sentences. Replace: one declarative sentence then white space.
39. **Explicit insight delivery**: "Here's the key insight." Replace: let the revelation arrive without the flag.

### Category VI: Voice and Register Signatures

Personality-level tells. Above structure, in the felt register the reader picks up.

40. **Wisdom-broker register**: Every paragraph delivers one portable insight. Writer's purpose is to hand the reader a quotable truth. Replace: hold the thought longer; let it arrive through a scene.
41. **Performed warmth**: Declaring warmth rather than demonstrating it. Replace: warmth lives in noticing a specific thing.
42. **False intimacy**: "Between you and me," "let's be honest," "here's the thing." Replace: be honest without announcing the honesty.
43. **Coach voice**: "You need to," "the key is to," "the most important thing." Replace: offer curiosity, never commands.
44. **TED-talk cadence**: Build, build, build, drop the line. Engineered to feel like revelation. Replace: land the observation at the start.
45. **Vague-attribution authority**: "Experts say," "research shows," "studies suggest." Replace: own the claim or drop it.
46. **Wholesome-uplift drift**: Every piece must end inspiring. Arc always resolves upward. Replace: end where the thought ends.
47. **Uniform register**: Single tonal temperature throughout. Never shifts, never gets specific. Replace: let register move.

### Category VII: Structural Tics

Multi-section and multi-chapter patterns. Most damaging in book form.

48. **Triadic reflex**: Everything in threes regardless of natural fit. Replace: name the actual count.
49. **Fractal summary**: Summaries at every level (intro, section end, conclusion). Replace: one arc, one arrival.
50. **Conclusion that closes**: Closing paragraph summarizes what was just said. Replace: end on image or forward pull.
51. **Chapter-opening preamble**: "In this chapter, we will explore..." Replace: open on the experience or question.
52. **Chapter-closing recap**: "In this chapter, we covered..." Replace: end on the last true line.
53. **Elegant variation spiral**: Same concept referred to by a different name every time. Replace: repeat the name of the thing.

### Category VIII: Formatting and Visual Tics

Visual fingerprints. Especially damaging in book-form prose.

54. **Bolded-every-paragraph**: Every paragraph contains at least one bolded phrase. Replace: let the sentence carry its own weight.
55. **Header-above-everything**: Descriptive header precedes every paragraph. Replace: visual breaks between major turns only.
56. **Listicle-creep**: Prose reasoning broken into bullets. Replace: write the sentence that holds all the items.
57. **Key-takeaways box**: Visually demarcated block labeled "Key Takeaways." Replace: prose carried the point; trust that.
58. **Markdown-in-book pattern**: Asterisks, hashes, backticks in prose meant to be read as a book. Replace: strip every markdown convention.
59. **Uniform paragraph weight**: Every paragraph approximately the same length and density. Replace: vary weight deliberately.
60. **Significance tail**: Sentence ends with a present-participle phrase claiming significance: "highlighting the importance of," "underscoring the need for." Replace: two sentences; no tail.

---

## Entry Contract

**Required input:**

- `target_path`: file path or directory path to the manuscript. The skill HALTS if `target_path` is missing or unreadable.

**Optional inputs:**

- `chapter_scope`: when target_path is a directory, names the specific chapter(s) to edit. Default: all chapters.
- `vocab_overrides`: additional operator-vocab exceptions specific to this manuscript. Surfaced for operator approval before sweep begins.
- `sample_first`: when set, runs all 8 sweeps on the first chapter only for calibration before processing the remainder. Default behavior on first invocation against any new manuscript.
- `lexical_intensity`: `light` (Category I only), `standard` (Categories I, II, III, VIII) or `full` (all 8 categories). Default: `full`.
- `apply_mode`: `surface_only` (build packet, do not edit), `apply_approved` (apply edits after operator review) or `auto_apply_safe` (auto-apply Category I and VIII fixes, surface the rest). Default: `apply_approved`.

---

## Steps

**Step 1. Entry validation and target load.**

Verify `target_path` exists. If it is a directory, enumerate all `.md` files. Apply `chapter_scope` filter if provided. Parse frontmatter on each file to capture title, chapter number and any voice notes. HALT if any file fails to load.

If `sample_first` is set or this is the first invocation against this manuscript (no prior run logged in changelog), default to sampling the first chapter.

---

**Step 2. Vocabulary reconciliation setup.**

If `vocab_overrides` is provided, surface the proposed operator-vocab exceptions for approval before sweep begins. This approval gate prevents the blacklist from drifting without explicit operator update.

Note any words the operator has previously marked as reconciled (permitted in embodied use, flagged in mechanical use). Apply the embodied-vs-mechanical heuristic at Step 3.

---

**Step 3. Lexical Sweep (Category I).**

Run a scan for each Category I entry across the target text. For each hit, capture: file path, line number, surrounding sentence, the matched pattern entry and whether the context appears embodied (authentic operator voice) or mechanical (AI-generated).

For operator-reconciled vocabulary, apply the heuristic. When the word reads as mechanical-default framing, flag. When it reads as embodied weight, permit.

Output: lexical findings array, with embodied-vs-mechanical pre-classification.

---

**Step 4. Opener Sweep (Category II).**

Extract the first sentence of every chapter, major section break and subsection. Judge each opener against Category II. Flag any AI-tic opener. Pay special attention to chapter-opening sentences. An AI-tic opener compounds damage across the whole chapter because the reader's register-detector calibrates against it.

Output: opener findings array with proposed operator-voice replacements.

---

**Step 5. Hedging, Padding and Disclaimer Sweep (Category III).**

Line-by-line scan for Category III entries. Flag every hit. For accumulation-density patterns, measure density per paragraph. Flag paragraphs with 3 or more qualifiers in one paragraph or 4 or more near-identical restatements in consecutive sentences.

This is the most pervasive category in AI-assisted prose. Expect the largest finding volume here.

Output: hedging findings array with replacements and density notes.

---

**Step 6. Negation and Pivot Sweep (Category IV).**

Whole-construction detection for Category IV entries. Flag pivots, triads, escalations, balanced-perspective sandwiches and false concessions.

Output: negation findings array.

---

**Step 7. Rhetorical Reflex Sweep (Category V).**

Multi-sentence pattern detection for Category V entries. Flag faux-Socratic chains, preamble announcements, importance frames, anaphoric hammers and explicit insight delivery.

Output: rhetorical findings array.

---

**Step 8. Voice and Register Sweep (Category VI).**

This step requires the most senior model available. The failure modes are tonal, not pattern-matchable. Read each chapter holistically. Before judging, load the operator's voice anchor: read the operator's Governing Essence (from their Writing Style Codex or equivalent), and the most recent published piece on file. Voice judgment without anchoring produces false flags.

Flag wisdom-broker register, performed warmth, false intimacy, coach voice, TED-talk cadence, vague-attribution authority, wholesome-uplift drift and uniform register.

Output: voice findings array with chapter-level register notes.

---

**Step 9. Structural Sweep (Category VII).**

Chapter-level and manuscript-level judgment for Category VII entries. Read chapter openers against preamble patterns. Read chapter closings against recap and closing patterns. Read section breaks against summary patterns.

If the manuscript has 3 or more chapters with parallel structure throughout, flag the Predictable Section-of-Three Architecture pattern at the manuscript level.

Output: structural findings array with manuscript-level notes when relevant.

---

**Step 10. Formatting Sweep (Category VIII).**

Mechanical scan for Category VIII entries. Count bold markers per paragraph. Count headers per chapter (flag above one per roughly 500 words). Identify Key Takeaways boxes, listicle-creep, nested bullets beyond 2 levels and decorative horizontal rules between every paragraph.

Special check: Elegant Variation Spiral. Flag any chapter where the subject is referred to by 4 or more different synonyms in consecutive paragraphs.

Special check: Uniform Paragraph Weight. Flag chapters where every paragraph runs at roughly the same sentence count.

Output: formatting findings array with quantitative measures where applicable.

---

**Step 11. Vocabulary Reconciliation Cross-Check.**

For every Category I finding involving an operator-reconciled word, apply the embodied-vs-mechanical heuristic. Embodied uses come off the flag list. Mechanical uses stay. Ambiguous cases surface for operator review.

Output: reconciled findings.

---

**Step 12. Edit Packet Assembly.**

Assemble all findings into a single structured edit packet for operator review. Format:

```
# Anti-AI Edit Pass: Edit Packet
## Manuscript: [name]
## Date: [YYYY-MM-DD]
## Pattern Reference: Built-in (60 entries across 8 categories)

### Summary
- Total findings: [count]
- By category: I [n], II [n], III [n], IV [n], V [n], VI [n], VII [n], VIII [n]
- Highest-density chapter: [name] ([n] findings)
- Voice register notes: [chapter-level observations from Step 8]

### Category I: Lexical Findings
[file:line] [pattern entry] | [current text] → [proposed replacement] | [embodied/mechanical]
...

[continue for all 8 categories]

### Ambiguous Cases: Operator Review Required
[Findings the skill could not auto-classify]

### Recommendations
[Synthesis: which chapters need deepest rework, which patterns appear most frequently, which operator-vocab exceptions surfaced new usage worth adding to the reconciliation list]
```

Output: edit packet markdown ready for operator review.

---

**Step 13. Operator Review.**

YIELD. Present edit packet to the operator. The operator reviews and approves, modifies or rejects each finding. The operator may also:
- Add new vocab exceptions discovered during review
- Flag new AI tells the pattern list did not catch
- Reject the embodied-vs-mechanical pre-classification on any finding

The skill does not proceed without operator input. No auto-apply.

---

**Step 14. Apply Approved Edits.**

For each operator-approved edit, apply via the Edit tool. Preserve all surrounding context. Match indentation, list markers, frontmatter. Do not introduce em dashes or Oxford commas in any replacement (verify before write).

For edits that affect chapter-level structure, apply via larger Edit calls with explicit before/after context windows. Confirm each Edit succeeded before moving to the next.

If any Edit fails, HALT and surface to the operator. Do not proceed past a failed edit.

Output: edit application log, with file:line of every change applied.

---

**Step 15. Verification Pass.**

Re-run a lightweight version of Steps 3, 5, 7 and 10 against the edited manuscript. Confirm fixes landed and did not introduce new tells. Replacement sentences should not themselves contain em dashes, Oxford commas or new AI-pattern entries.

If verification surfaces new findings, loop back to Step 12 with a second-pass edit packet (typically much smaller than the first).

Output: verification report. Pass/fail per category.

---

**Step 16. Changelog Entry.**

Append a changelog entry to the manuscript's index or scratch pad noting:
- Date of edit pass
- Pattern reference version used
- Total findings, total applied
- Any new operator-vocab exceptions surfaced
- Any new AI tells surfaced (with note to add to the pattern list)

---

## Constraints

- Does not edit prose without operator approval (unless `auto_apply_safe` mode is explicitly set for Category I and VIII).
- Does not rewrite passages wholesale. Flags and proposes. The operator writes the replacement when a proposed replacement does not fit.
- Does not run voice judgment (Steps 8, 9) without first loading the operator's voice anchor.
- Does not commit or publish. Editing is complete at Step 16.
- Does not update the pattern list itself. New entries are surfaced as proposals; the operator applies them separately.

## Pairs With

**Source Harvest** extracts patterns from external repos and tools. Operators often run Source Harvest to gather voice examples before running Anti-AI Edit Pass on a draft that synthesizes those materials.

**Session Closeout** runs after this skill when the edit session is complete. Anti-AI Edit Pass cleans the prose; Session Closeout commits and closes.

If Source Harvest isn't installed yet: [Install Source Harvest via IGOS](https://www.infinitegameos.io/skills/source-harvest).
If Session Closeout isn't installed yet: [Install Session Closeout via IGOS](https://www.infinitegameos.io/skills/session-closeout).

## Refinements

*(Empty. Populated when execution mistakes occur during sessions.)*
