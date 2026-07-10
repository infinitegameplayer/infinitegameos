---
name: anti-ai-edit-pass
description: Use when a long-form manuscript (book chapter, ebook, multi-chapter playbook, long-form digital product) needs an editing pass to identify and remove AI writing tells. Sweeps across 8 pattern categories, assembles a structured edit packet for operator review, and applies approved edits.
status: active
version: 1.2
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

This skill is self-contained. The pattern reference below replaces the external codex dependency. The library is extensible: when new patterns surface during a sweep, surface them as proposals for operator ratification, then add them to this section. Current entry count: 112 across 8 categories.

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
12a. **Worth-sitting-with phrase**: "Worth sitting with," "sit with that," "let that sit" appended to an idea as a reflective-weight marker. Replace: end the section and let white space do the sitting.
12b. **Seamless/cutting-edge pair**: "Seamless" and "cutting-edge" as default quality markers for technology or process. Replace: describe the experience.
12c. **Superlative inflation cluster**: "Unprecedented," "groundbreaking," "revolutionary" applied to incremental change. Replace: describe what changed; genuine rarity shows in the facts.
12d. **Actionable-insights phrase**: "Actionable insights," "valuable insights" as a substitute for naming the insight. Replace: state one insight concretely.
12e. **Ecosystem noun**: "Ecosystem" as default metaphor for any interconnected set when the components could be named. Replace: name the components; keep the word only when the system is genuinely interconnected and self-organizing.
12f. **Embark opener**: "Embark on a journey of..." framing any process or learning experience. Replace: start the thing without announcing it.
12g. **Redundant adverb stack**: "Truly," "really," "profoundly," "fundamentally," "ultimately" stacked before adjectives to inflate weight. Replace: cut the adverb; if the noun cannot carry the weight, find a stronger noun.

### Category II: Opener Tells

Failure modes at the first sentence of a piece, chapter or section.

13. **Temporal opener**: "In today's fast-paced world," "In an era of," "As we move forward." Replace: start with the actual situation.
14. **Whether-you're opener**: "Whether you're X or Y" naming two audience types before stating the point. Replace: write to the reader directly.
15. **Let's-dive opener**: "Let's dive in," "Let's explore," "Let's unpack this" before an explanation that would have begun anyway. Replace: start the explanation.
16. **Corrupted imagine opener**: "Imagine..." followed by a hypothetical scenario as emotional buy-in before the actual argument. Replace: drop into the lived moment.
17. **Sycophantic opener**: "Great question!" "Absolutely!" "Certainly!" in prose. Replace: answer the question or start the substance.
18. **"By the end of this..." opener**: Promising the reader what they will know by the end. Replace: begin with the lived moment or felt tension.
19. **Landscape opener**: "The landscape of X is shifting," "In a world where X..." as scene-setter before the actual point. Replace: start with the actual point.
20. **Empathy opener**: "You've probably felt the frustration of..." performing relatability before earning it. Replace: drop into the situation directly.
21. **Reciprocal acknowledgment opener**: "As you may already know," "You're probably familiar with..." pre-validating the reader before making a point. Replace: make the point.
22. **Opening restatement**: First sentence makes a claim. Second sentence restates it slightly differently as if clarifying. Replace: write one sentence, move on.

### Category III: Hedging, Padding and Disclaimer Reflexes

The most pervasive category. The fix is almost always: state the claim.

23. **Importance hedge**: "It's important to note," "It's worth noting" before stating something. Replace: state the thing.
24. **Moreover escalator**: Opening consecutive sentences with "Moreover," "Furthermore," "Additionally." Replace: cut the transition or name the relationship.
25. **That-said pivot**: "That said," "With that said," "That being said." Replace: start the contrasting sentence without the pivot.
26. **Hedge stacking**: Multiple qualifiers pile onto one assertion: "could potentially," "may often," "might ultimately." Replace: "This works. Here is why."
27. **Faux humility**: "I'm just one perspective here," "I could be wrong," "Take this with a grain of salt." Replace: state what you know.
28. **False vulnerability**: Performative self-disclosure that simulates authenticity without genuine risk. Replace: name the actual thing struggled with.
29. **"I want to be clear" disclaimer**: "I want to be clear," "to be clear," "let me be direct" performing directness rather than being direct. Replace: be direct.
30. **Tautological padding**: Same point restated in slightly different phrasing across three to four consecutive sentences. Replace: write the sentence once and move on.
31. **"I should mention" hedge**: "I should mention," "I should note," "One thing to keep in mind." Replace: state the caveat directly or cut it.
32. **AI-identity disclaimer leakage**: "As an AI language model" or equivalent phrases leaking into human-voice prose. Replace: write from the operator's lived experience.
33. **Model-specific hedge cluster**: "As a large language model I don't have real-time data," "my training data suggests." Replace: own the scope boundary directly or remove the caveat.
34. **Certainty-softening reflex**: Adding "I believe," "I think," "it seems" to claims the prose can simply assert. Replace: assert.
35. **Foreshadowing without delivery**: "I'll address this in more detail later" without the detail ever arriving. Replace: cut the foreshadow or deliver the substance now.
35a. **Hedge-then-pivot**: Acknowledging a position the writer does not hold, then pivoting to the real claim, using the hedge as unearned credibility scaffolding. Replace: state the real claim plainly; grant the other position only if it changes the argument.
35b. **Pronouncement inflation**: Ordinary claims amplified via "fundamentally," "ultimately," "undoubtedly," "essentially," "at its core." Replace: let the claim carry its own weight.
35c. **Safety-disclaimer reflex**: Formulaic "consult a qualified professional" or "individual results vary" disclaimers attached to general reflection rather than specific advice. Replace: if a real boundary exists, write it in your own voice; otherwise cut the template.

### Category IV: Negation and Pivot Constructions

Used sparingly in specific idioms. Used reflexively by AI as default rhetorical structure.

36. **"It's not X, it's Y" pivot**: Whole-sentence reframe delivered as revelation. Replace: state Y directly.
37. **Not-A-Not-B-Not-C triad**: Pure negation run three times before any affirmative content. Replace: lead with the affirmative.
38. **Not-just-but-also escalation**: "Not just X, but Y." Replace: state Y.
39. **Balanced-perspective sandwich**: Position A, position B, "the truth lies between." Replace: have a position.
40. **False concession**: Granting the opposing position without engaging it. Replace: either engage it or do not bring it up.
41. **Pre-emptive reframe**: "Before we get into X, let me first address Y." Replace: address Y or don't; don't announce the detour.
41a. **Stacked classifying negation**: Two or more consecutive denials classifying a thing by what it is, before the affirmative lands ("It isn't X. It isn't Y. It's Z."). Replace: lead with the affirmative; let one contrast earn its place only if the sentence truly needs it.
41b. **Counterfactual frame**: "I won't pretend," "I don't mean to imply," constructing sentences around what the writer is not doing. Replace: direct affirmation of what is.

### Category V: Rhetorical Reflexes

Multi-sentence patterns that simulate thoughtful structure. The reader senses them as theater.

42. **Faux-Socratic chain**: Sequence of escalating rhetorical questions answering nothing. Replace: one question, let it work.
43. **Preamble announcement**: "Let me explain what I mean." Replace: start the explanation.
44. **"Here's why this matters" frame**: Announcing importance before delivering. Replace: state the importance through the sentence itself.
45. **Engagement-bait revelation**: "Nobody is talking about this," "everyone is getting this wrong." Replace: make the observation; rarity is obvious from the content.
46. **Anaphoric hammer**: Same phrase opens 3 or more consecutive sentences. Replace: one declarative sentence then white space.
47. **Explicit insight delivery**: "Here's the key insight." Replace: let the revelation arrive without the flag.
48. **Rhetorical-question-as-transition**: Closing a paragraph with a question that the next paragraph immediately answers. Replace: write both paragraphs as assertions; let the implicit question do its work.
49. **AI-introspection theater**: "What does it mean to truly understand X?" as paragraph opener, followed by a tour of sub-questions. Replace: start with what you actually know.
50. **Clarifying-before-asked construction**: "You might be wondering..." or "To be clear..." anticipating objections that the reader hasn't raised. Replace: make the point clearly enough that the clarification is unnecessary.
50a. **Named-plainly move**: Announcing that naming is happening: "named plainly," "to name it plainly," "call it what it is." Replace: skip the announcement and write the plain sentence.
50b. **"This is where X comes in" hinge**: Announcing a concept's arrival rather than letting it arrive. Replace: the concept arrives in the prose; no announcement.
50c. **"And that's the beauty of it" closer**: Announcing that preceding content is beautiful or profound. Replace: end on the image; the image carries the beauty.
50d. **Reader-steering pre-annotation**: Labels for how the reader should experience information: "interestingly," "importantly," "surprisingly." Replace: write the fact; let the reader decide what is interesting.

### Category VI: Voice and Register Signatures

Personality-level tells. Above structure, in the felt register the reader picks up.

51. **Wisdom-broker register**: Every paragraph delivers one portable insight. Writer's purpose is to hand the reader a quotable truth. Replace: hold the thought longer; let it arrive through a scene.
52. **Performed warmth**: Declaring warmth rather than demonstrating it. Replace: warmth lives in noticing a specific thing.
53. **False intimacy**: "Between you and me," "let's be honest," "here's the thing." Replace: be honest without announcing the honesty.
54. **Coach voice**: "You need to," "the key is to," "the most important thing." Replace: offer curiosity, never commands.
55. **TED-talk cadence**: Build, build, build, drop the line. Engineered to feel like revelation. Replace: land the observation at the start.
56. **Vague-attribution authority**: "Experts say," "research shows," "studies suggest." Replace: own the claim or drop it.
57. **Wholesome-uplift drift**: Every piece must end inspiring. Arc always resolves upward. Replace: end where the thought ends.
58. **Uniform register**: Single tonal temperature throughout. Never shifts, never gets specific. Replace: let register move.
59. **Corporate warmth**: Warm-sounding language that is actually organizational-speak in disguise. "We're on a journey together," "You deserve better." Replace: name the actual situation.
60. **Teacher-explaining-to-the-class register**: Prose that positions the reader as student rather than peer. Explaining things the reader already knows in order to seem thorough. Replace: write to an equal.
61. **Sage tone**: Measured, slow cadence that performs wisdom without delivering specificity. Replace: be specific or be brief.
62. **Navigating-complexities we-voice**: "As we navigate these challenges," "when we think about how to move forward." Replace: name who is navigating and what.
63. **Manufactured stakes**: Urgency or significance inserted without a concrete cause. "This is more important than ever." Replace: name what changed that makes it important.
63a. **Reader-instruction on feeling**: Directing the reader's inner state: "notice what comes up," "let that land," "feel the difference," "take a breath here." Replace: build the moment that produces the feeling; the reader's inner state is theirs.
63b. **Earn-it framing**: Telling the reader something must be earned before it lands: "you have to earn this," "the ending earns its weight," "an earned insight." Replace: do the earning invisibly; the verdict word belongs to critics, not the page.
63c. **Constant reader validation**: Narrating the reader's experience back as affirmation: "if you've ever felt this way," "you're not alone." Replace: write from your own experience precisely; the reader finds themselves in the specificity.
63d. **Sycophantic closer**: "I hope this helps!" "Let me know if you have questions!" bleeding from chat mode into prose. Replace: end on substance, image or forward pull.

### Category VII: Structural Tics

Multi-section and multi-chapter patterns. Most damaging in book form.

64. **Triadic reflex**: Everything in threes regardless of natural fit. Replace: name the actual count.
65. **Fractal summary**: Summaries at every level (intro, section end, conclusion). Replace: one arc, one arrival.
66. **Conclusion that closes**: Closing paragraph summarizes what was just said. Replace: end on image or forward pull.
67. **Chapter-opening preamble**: "In this chapter, we will explore..." Replace: open on the experience or question.
68. **Chapter-closing recap**: "In this chapter, we covered..." Replace: end on the last true line.
69. **Elegant variation spiral**: Same concept referred to by a different name every time. Replace: repeat the name of the thing.
70. **Predictable section-of-three architecture**: Every chapter has exactly three named sections. The structure is never varied. Replace: let section count follow the actual argument.
71. **Mirror-close**: The final paragraph mirrors the opening paragraph's imagery or vocabulary as a callback. Looks intentional; reads as a template. Replace: end where the thought ends.
72. **Graduated revelation structure**: Each section is longer than the one before. Builds to a crescendo. Replace: let natural weight determine section length.
73. **Pre-conclusion transition paragraph**: A paragraph whose only purpose is to signal the conclusion is coming. "With all of this in mind, let's bring these threads together." Replace: start the conclusion.
73a. **Rigid-progression framing**: Any development framed as a fixed staged sequence ("first you notice, then you name, finally you release") imposed on material that lives non-linearly. Replace: let the material keep its real shape; if it loops, write the loop.
73b. **Symmetry-forced parallel**: All list items forced into identical grammatical structure at the cost of natural emphasis. Replace: let items take different shapes if the ideas have different shapes, or dissolve into prose.
73c. **Therapeutic close**: Ending by affirming the reader emotionally: "Trust the process. You've got this." Replace: end on image, sensation or open question.
73d. **Balanced conclusion default**: A conclusion that refuses to land on a claim: "ultimately, it's about finding what works for you." Replace: take a position.
73e. **Reader walkthrough**: Narrating the reader's journey in advance: "First we'll look at... Next we'll explore... Finally we'll see..." Replace: drop the reader into the first true sentence; the arc carries itself.
73f. **Listicle-in-a-trench-coat**: Prose that is actually a numbered list with "first/second/third" substituted for bullets. Replace: develop the ideas as paragraphs or collapse them into one sentence; never numbered.

### Category VIII: Formatting and Visual Tics

Visual fingerprints. Especially damaging in book-form prose.

74. **Bolded-every-paragraph**: Every paragraph contains at least one bolded phrase. Replace: let the sentence carry its own weight.
75. **Header-above-everything**: Descriptive header precedes every paragraph. Replace: visual breaks between major turns only.
76. **Listicle-creep**: Prose reasoning broken into bullets. Replace: write the sentence that holds all the items.
77. **Key-takeaways box**: Visually demarcated block labeled "Key Takeaways." Replace: prose carried the point; trust that.
78. **Markdown-in-book pattern**: Asterisks, hashes, backticks in prose meant to be read as a book. Replace: strip every markdown convention.
79. **Uniform paragraph weight**: Every paragraph approximately the same length and density. Replace: vary weight deliberately.
80. **Significance tail**: Sentence ends with a present-participle phrase claiming significance: "highlighting the importance of," "underscoring the need for." Replace: two sentences; no tail.
81. **Em dash as drama**: An em dash used to create a pause or reveal effect. Replace: a period. Then the reveal.
82. **Nested-bullet explosion**: A three-level nested bullet list for information that could be one sentence. Replace: one sentence.
83. **Consistent-depth illusion**: Every section has exactly the same number of subsections, giving a false sense of comprehensiveness. Replace: let natural depth determine subsection count.
84. **Decorative rule between every paragraph**: Horizontal rules used as visual breathing room between normal paragraphs. Replace: white space. Rules are structural, not decorative.
85. **TL;DR reflex**: A summary labeled "TL;DR" at top or bottom, a preemptive escape from the reading itself. Replace: if a summary is needed before engagement, the opening failed; fix the opening.
86. **Definition-list reflex**: Abstract terms followed by a colon and a one-sentence definition, turning prose into a glossary. Replace: name the concept in context; let the prose demonstrate before defining.

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

**Step 0. Model routing confirmation.**

Confirm the orchestrator is running at your most capable available model before any sweep begins. Steps 8 and 9 (voice and structural judgment) require high-judgment capacity. Pattern matching in Steps 3-7 runs adequately at a cost-efficient tier. If you are running at a reduced-cost setting, surface that now before the sweep starts so you can choose to escalate or scope to the mechanical categories only.

For manuscripts exceeding approximately 50,000 words, route the Category I lexical sweep to a separate cost-efficient worker rather than the orchestrator. Return structured output in the format: `[{file, line, context, pattern_entry, embodied_check}]`.

---

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

**Step 8. Voice and Register Sweep (Category VI).** [Model: highest-capability available]

This step requires the most senior model available. The failure modes are tonal, not pattern-matchable. Read each chapter holistically. Before judging, load the operator's voice anchor: read the operator's Governing Essence (from their Writing Style Codex or equivalent), and the most recent published piece on file. Voice judgment without anchoring produces false flags.

Flag wisdom-broker register, performed warmth, false intimacy, coach voice, TED-talk cadence, vague-attribution authority, wholesome-uplift drift, uniform register, corporate warmth, teacher-explaining-to-the-class register, sage tone, navigating-complexities we-voice and manufactured stakes.

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
## Pattern Reference: Built-in (112 entries across 8 categories; extensible)

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

**Cross-model audit gate.** When a chapter exceeds approximately 4,000 words, or when the total findings exceed 40 for a chapter, offer a second-model audit pass on the assembled edit packet before operator review. A different model catches blind-spot patterns the primary sweep missed. This gate is an offer, not a mandate. The operator decides whether to run it.

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

## Model Routing

Dispatch the cheapest model that does the job well. Before each step, ask whether a smaller model would produce equivalent output.

| Work type | Model |
|---|---|
| Category I lexical scan, file loading, formatting checks (Categories III mechanics, VIII) | Haiku |
| Hedging/negation/rhetorical sweeps (Categories III, IV, V); edit packet assembly | Sonnet |
| Voice and structural judgment (Steps 8 and 9); architectural synthesis | Opus |

For large manuscripts (50,000+ words), dispatch the lexical sweep as a separate worker at the cost-efficient tier. The orchestrator handles judgment steps only.

Set the model explicitly on every dispatch. Never silently inherit the top tier.

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
