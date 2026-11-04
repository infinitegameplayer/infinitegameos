# infinitegameos.io discoverability audit (2026-11-03)

Research report. Read dates are 2026-11-04 unless marked. Prepared on branch `research/2026-11-03-igos-discoverability`. No site code, content or config was changed.

## How this was done, and its limits

- Web fetching worked in this environment. Live pages were read with curl and WebFetch. Web results came from the WebSearch tool.
- The WebSearch tool is a search engine with its own index. It is a stand-in for Google, Bing and the AI assistants that sit on them. It is not Google. Positions here are positions in that tool on 2026-11-04.
- 65 questions were run in "standard" mode (63 topical, 2 brand). 12 more were re-run in "extended" mode, which reaches a deeper and fresher index.
- `site:` queries did not work in standard mode. The tool fell back to other domains every time. So a `site:` miss here does not prove a page is missing from Google.
- "Cited domains" means the domains in each result list plus the domains the tool's written summary drew on. I could not see Google AI Overviews, ChatGPT or Perplexity answers directly.
- Reddit, SkillsMP and SSRN returned HTTP 403 to fetches. llmtxt.app returned a proxy 502. Those items are marked unverified.
- Every count below is my own tally from the saved result lists. Anything inferred is marked "(inference)".
- Pages that address AI readers were noted as facts and not acted on. Nothing was submitted, posted or signed up for.

## The short version

1. **infinitegameos.io appeared in 0 of 65 standard-mode result lists.** lanebelone.com and sidequesthq.co also appeared in 0 of 65. 635 result slots, 334 distinct domains, none of them ours.
2. **The site is indexed, but shallowly.** In extended mode IGOS pages surfaced for the brand query and for "what is joyful sovereignty" (rank 6, with lanebelone.com at rank 8). sidequesthq.co ranked 5 for "sovereign life design". The `your-ais-charter` GitHub repo ranked 1 for a CLAUDE.md charter query. Seven other extended re-checks surfaced nothing of ours.
3. **The pages are technically sound.** All 139 sitemap URLs return 200. Every page has a self-canonical, an OG image, a Twitter card and JSON-LD. 121 of 139 carry FAQPage. Markdown twins and content negotiation work. The gap is authority and query vocabulary, not crawlability.
4. **Many result sets are weak.** pages.dev sites (often thin, inference) show up in 15 of 65 questions. Spam PDFs on grinnell.edu subdomains fill slots for 3 questions. Several winners are 100-word forum posts. Better pages are losing because they are not being found.
5. **The language gap is real.** 0 of 34 skill and bundle page titles contain "Claude Code". Searchers say "handoff", "deslop" and "overnight". The site says "closeout", "edit pass" and "autonomous improvement session". Coined concept names ("The North Star", "Held by Structure") carry no generic search term.
6. **No independent third party talks about IGOS yet.** The only outside listing found is an auto-indexed skills.lc entry. Every summary of Lane Belone the tool built came from his own pages, and it said so.

## The 10 highest-leverage moves

Ranked by expected effect over effort. Effect and effort are scored 1 to 5 (inference, my judgment from the evidence below).

| Rank | Move | Effect | Effort | Why (evidence) |
|---|---|---|---|---|
| 1 | Verify the site in Google Search Console and Bing Webmaster Tools, submit `sitemap.xml`, read the coverage report and run the existing IndexNow route after each deploy | 5 | 1 | 0 of 65 standard results. Extended mode finds pages, so the index holds some of them (inference: coverage is partial). The IndexNow route exists at `src/app/api/indexnow/route.ts` and is operator-triggered. Bing feeds several AI assistants (inference) |
| 2 | Put the searched words in titles. Skill pages become "X: a Claude Code skill for [job]". `/skills` becomes "Claude Code Skills Library". Add the generic term to each coined concept title | 5 | 1 | 0 of 34 skill and bundle titles say "Claude Code". Winners for D2, D9, D12 and D13 match the query words exactly (Appendix B). One template line each: `src/app/skills/[slug]/page.tsx:29`, `src/app/bundles/[slug]/page.tsx:29`, `src/app/skills/page.tsx:9` |
| 3 | List the library where the Claude Code results already come from: awesome-claude-code (human issue form), travisvn/awesome-claude-skills (PR), claudemarketplaces.com/submit, skills.sh, directory.llmstxt.cloud, llmstxt.site and awesome-obsidian | 4 | 2 | Skill-directory domains (claudemarketplaces.com, claudemarket.ai, mcpmarket.com, aimcp.info, claudskills.com, skillselion.com and others) fill 44 of the 118 Claude Code result slots, in 9 of 13 questions. IGOS is listed on none of the six lists checked (section 3). Lane submits. This report contacts nobody |
| 4 | Show who wrote it and when. Visible byline and "Updated" date on updates, skills and hub pages. Article schema gains `image`, `dateModified` and `publisher` pointing at the Organization | 4 | 1 | Agents noted no visible byline on updates and no dates on hub pages. Winners show both (A1, A3, B6, C1, E1). Defects D-04 to D-06 below |
| 5 | Write meta descriptions for snippets, separate from the summary and capsule fields | 3 | 2 | 114 of 139 descriptions run past 160 characters. 48 run past 300. The longest is 947. Search engines rewrite or cut these (inference) |
| 6 | Use GitHub as a front door. Give each bundle or skill family a small public repo with a README in search vocabulary. Fix the `infinitegameos` repo's homepage field and add topics | 4 | 2 | `github.com/infinitegameplayer/your-ais-charter` ranked 1 in extended mode while `/charter` did not appear. github.com is a rank-1 domain for 3 questions. The repo's homepage field points at `infinitegameos.vercel.app` and it has no topics (GitHub API, read 2026-11-04) |
| 7 | Build five exact-match answer pages where we have the substance but no page: "What is an infinite mindset?", "Finite vs infinite games: a two-question test", "What is llms.txt and does it work?", "What is Generative Engine Optimization?" and "Claude Code and Obsidian: the setup, step by step" with code blocks | 4 | 3 | A8 (no page uses the term), A2 (winners are "X vs Y" pages), E4 (`/updates/structured-to-be-found` never says llms.txt), E1 (GEO is defined mid-page on `/agentic-systems`), C2 and D4 (winners have commands and folder trees) |
| 8 | Name the lineage on coined concepts. Link each coined term to the established idea next to it: Axelrod for the shadow of the future, Ackoff for puzzles and problems, Newport and 80,000 Hours for the passion question, Nathan Barry for the creator flywheel | 3 | 2 | Winners for A11, B4, B10 and E9 name the originator. `/concepts/the-shadow-of-the-future` never mentions Axelrod (0 matches in `src/data/concepts.ts`). Engines connect a new term to a known one through co-mention (inference) |
| 9 | Stop three pages competing with their own update posts. Give each pair distinct titles and intents, or merge one into the other | 2 | 1 | Three exact duplicate `<title>` pairs (defect D-02). A1 agent also flagged `/play-your-own-game` against `/updates/how-to-play-your-own-game` |
| 10 | Show up where the conversation happens: Obsidian Forum Share and showcase, r/ObsidianMD, the r/ClaudeAI "Built with Claude" megathread, a Show HN for sovereign-ecosystem and guest posts on the Substacks ranking for Obsidian plus Claude Code | 4 | 4 | substack.com appears in 29 of 65 questions and holds rank 1 in 8. Reddit and Substack are where AI answers draw from for these topics (inference). Section 3 lists the venues. Lane posts. This report posts nothing |

Two things to deprioritize, with evidence:

- More machine files. The site already has llms.txt, llms-full.txt, a primer, AGENTS.md, igos-index.json, markdown twins and a Hugging Face dataset. Vercel's controlled test of 1,033 agent runs found llms.txt, JSON-LD and sitemaps did not change retrieval of content already in server-rendered HTML ([vercel.com/kb/guide/make-your-site-readable-by-ai-agents.md](https://vercel.com/kb/guide/make-your-site-readable-by-ai-agents.md), read 2026-11-04). Another source in E2 reports an Ahrefs 2026 test finding schema alone did not lift citations (reported via [erlin.ai](https://www.erlin.ai/blog/how-to-get-cited-by-ai), read 2026-11-04, not checked at the source).
- More new concept terms before the existing ones rank. 26 concept pages exist. None ranked in standard mode.

## Terms we can own now

These result sets have no clear owner. A findable IGOS page would face weak competition (inference from Appendix B).

- **Joyful Sovereignty.** Standard mode returned theology only. Extended mode already ranks IGOS 6 and lanebelone.com 8.
- **AI-complemented.** The tool said no source uses the term and substituted "AI-augmented" (C13).
- **Sovereign life design.** Results split across insurance, crypto and coaching. sidequesthq.co ranked 5 in extended mode; `/sovereignty` did not appear.
- **Is finite and infinite games the same as game theory?** The tool found no source bridging Carse and repeated games (A6). `/game-theory` and the matching update answer exactly this.
- **Which parts of my business are finite games?** No winner answers it directly (A7).
- **AI ambassador, human-AI accord, local-first second brain, why technology feels unnatural.** Thin, fragmented or code-only result sets (E6, E12, C3, C10).

## Extended-mode re-checks

Run by me on 2026-11-04 to test whether the zero in standard mode meant "not indexed".

| Query | Our properties in results | Rank 1 |
|---|---|---|
| "Infinite Game OS" infinitegameos.io | infinitegameos.io at 4, 5, 6, 8, 9. lanebelone.substack.com at 1. lanebelone.com at 7. github.com/infinitegameplayer/infinitegameos at 2 | [lanebelone.substack.com/p/the-infinite-game-is-already-in-progress](https://lanebelone.substack.com/p/the-infinite-game-is-already-in-progress) |
| what is joyful sovereignty | [infinitegameos.io/updates/what-is-joyful-sovereignty](https://www.infinitegameos.io/updates/what-is-joyful-sovereignty) at 6. [lanebelone.com/joyful-sovereignty](https://www.lanebelone.com/joyful-sovereignty) at 8 | [spurgeon.org](https://www.spurgeon.org/sermons/jubilee-joy-or-believers-joyful-in-their-king) |
| Lane Belone | lanebelone.vercel.app at 5 (now 308s to www), lanebelone.com at 6 and 7, sidequesthq.co/about at 9 | [straightouttacombat.podbean.com](https://straightouttacombat.podbean.com/e/socrs069-lane-belone-ignite-your-authentic-alpha/) |
| sovereign life design | [sidequesthq.co/products/sovereign-life-playbook](https://www.sidequesthq.co/products/sovereign-life-playbook) at 5 | [facebook.com/p/Sovereign-By-Design](https://www.facebook.com/p/Sovereign-By-Design-100064211556328/) |
| CLAUDE.md for how Claude works with you charter | [github.com/infinitegameplayer/your-ais-charter](https://github.com/infinitegameplayer/your-ais-charter) at 1 | same |
| is finite and infinite games the same as game theory | none | [ayushs.substack.com](https://ayushs.substack.com/p/memo-12-finite-vs-infinite-games) |
| how do you know which parts of your business are finite games | none | [aderant.com](https://www.aderant.com/blog/is-your-firm-playing-the-finite-or-infinite-game/) |
| why finite games sit inside the infinite game | none | [nateliason.com](https://www.nateliason.com/notes/finite-infinite-games-james-carse) |
| AI-first vs AI-complemented creative work | none | [arxiv.org/pdf/2304.09653](https://arxiv.org/pdf/2304.09653) |
| Obsidian Claude Code AI second brain local-first setup | none | [noahvnct.substack.com](https://noahvnct.substack.com/p/how-to-build-your-ai-second-brain) |
| Claude Code plugin marketplace skills for solopreneurs email triage invoice tracker | none | [github.com/hanamizuki/solopreneur](https://github.com/hanamizuki/solopreneur) |
| how to get cited by AI as a creator | none | [digitalauthority.me](https://www.digitalauthority.me/resources/how-to-get-cited-by-ai/) |

Tally: 5 of 12 extended queries surfaced one of our properties. 2 of the 9 topical (non-brand, non-name) queries surfaced one.

## 1. The question table

65 questions, standard mode, read 2026-11-04. "Top domains" are the first three distinct domains in rank order. "Ours" covers infinitegameos.io, lanebelone.com and sidequesthq.co. The first five result URLs for every question are in Appendix B. The full lists (up to 20 per question) were kept in the session's working notes.

A correction to one agent note: the D5 notes guessed `/charter` is a paid product. It is free and open (`src/app/charter/page.tsx`, live page read 2026-11-04). Another note said `/concepts/ai-first-vs-ai-complemented` sends its related links to another site. I checked the live HTML. The five related-concept links are internal.

| ID | Question | Top domains | Ours | What the winners have that we lack (first finding) |
|---|---|---|---|---|
| A1 | What is the infinite game? | wikipedia.org, substack.com, ebooks.com | none | Domain authority and an entity anchor: Wikipedia holds rank 1 with a short stub, so length/quality is not the deciding factor (inference). |
| A2 | What is the difference between finite and infinite games? | substack.com, fs.blog, perlego.com | none | A dedicated "X vs Y" page whose title matches the query form; |
| A3 | Is James Carse's Finite and Infinite Games the same as Simon Sinek's The Infinite Game? | wikipedia.org, thestrategybridge.org, jollycontrarian.com | none | Credentialed, named reviewer with endnotes (Strategy Bridge); |
| A4 | How do I apply the infinite game to my personal life? | substack.com, grinnell.edu | none | Very little: the result set is thin and polluted by spam PDFs. |
| A5 | What does it mean to play the infinite game as a solo creator or one-person business? | creatorscience.com, shortform.com, leaders.com | none | Named, recognisable creator examples (Welsh, Holiday, MrBeast) and the author's own exits as credibility. |
| A6 | Is finite and infinite games the same as game theory? | p2pfoundation.net, sive.rs, substack.com | none | Nothing substantive: IGOS's page is the most direct, complete answer to this exact question, and the tool explicitly said it could find no source bridging Carse and ... |
| A7 | How do I know which parts of my business are finite games? | wikipedia.org, goodreads.com, substack.com | none | No winner answers the question directly; |
| A8 | What is an infinite mindset? | heraldgoa.in, pages.dev, noomii.com | none | A page titled with the exact term "infinite mindset"; |
| A9 | Can finite games be played inside an infinite game? | goodreads.com | none | Verbatim Carse text: the answer is a near-quote from the book ("Finite games can be played within an infinite game..."), and Goodreads highlight pages carry it many ... |
| A10 | How do I play my own game in life instead of someone else's? | everand.com, substack.com, cbn.com | none | A book-length framework (everand.com "What Game Are You Playing?") with a title that mirrors the query. |
| A11 | What is the shadow of the future in game theory? | arxiv.org, modeldiplomat.com, goodreads.com | none | Attribution to the coiner: Axelrod named in the definition (modeldiplomat, and the summary's first sentence). |
| A12 | What is a positive-sum business model? | forrester.com, substack.com, oreilly.com | none | A three-way taxonomy (positive / zero / negative-sum) with one concrete business example each (bootcamp ISA, hospital purchasing group, data broker). |
| A13 | (brand) "Infinite Game OS" | github.com, dev.to, sourceforge.net | none | Index presence. The brand name returns zero hits, so the search tool has no record of the site, the brand or the person (Lane Belone) (fact from results). |
| B1 | What is a personal operating system for life? | betterthanyesterdaylife.substack.com, coastline-xyz.pages.dev, play.google.com | none | The generic phrase "personal operating system" / "Life OS" in the title and URL. |
| B2 | How do I design a day around what I actually want? | mudwtr.com, schweitzer-online.de, ursuline.edu | none | Exact "design your day" / "ideal day" / "perfect day" wording in titles. |
| B3 | How do I plan my ideal month? | strangecharmed.com, wendaful.com | none | Practical monthly-planning framing: calendar, bills, three goals, review. |
| B4 | What is a practical alternative to "follow your passion"? | remotestaff.ph, iwillteachyoutoberich.com | none | A named, quotable alternative (Newport "career capital", HBR "follow your blisters", 80,000 Hours "personal fit"). |
| B5 | How do I stay consistent without relying on willpower? | shubhams-newsletter-5be3ef.beehiiv.com, buzzsprout.com, medium.com | none | Indexing and volume. The SERP is dominated by low-authority newsletters, podcasts and AI-generated-looking sites (pages.dev, vercel.app). |
| B6 | What is a North Star for personal goal setting? | tryondailybulletin.com, monkhouseandcompany.com, themarketdog.substack.com | none | thriveglobal.com (fetched): about 2,000 words, byline Patrick Ewers, dated 2019-04-10, seven sample North Star Objectives, sample "goal tests", a 3-step action list and ... |
| B7 | What is the difference between conditioned identity and authentic identity? | skool.com, reedsy.com, ecnu.edu.cn | none | A side-by-side trait list (reactive/defensive/approval-seeking vs curious/expressive/internally directed). |
| B8 | What is joyful sovereignty? | desiringgod.org, dwellcc.org, biblehub.com | none | Nothing topical. The term is effectively unowned in the secular sense, and the theological "joy in God's sovereignty" intent dominates. |
| B9 | What is sovereign life design / living a sovereign life? | tsp-private-intensive.pages.dev, wikipedia.org, international-adviser.com | none | "Sovereign life design" has no owner. |
| B10 | What is the difference between a problem and a puzzle? | greggllc.substack.com, tes.com, filmstories.co.uk | none | Named-framework authority: Ackoff's puzzles/problems/messes (medium version-1), the Mintzberg reference and math-education journals (vu.lt, MAA). |
| B11 | Where do new ideas come from? | ronedmondson.com, artsjournal.com | none | Exact-match titles ("Where do new ideas come from?") on older domains with history (ronedmondson 2019, artsjournal 2014). |
| B12 | Why does every solution create a new need? | minid.net, sap.com, jumpassociates.com | none | Named laws and examples: Sevareid's Law, Murphy's Eighth Corollary, Cobra Effect, Jevons paradox (suggested by the tool). |
| B13 | (brand) "Lane Belone" | kfda.be, naturalis.nl, fishipedia.fr | none | Entity collision. "Belone" is a fish genus (Belone belone, garfish) and "La Bellone" is a Brussels venue. |
| C1 | How do I build an AI second brain? | learnwithhasan.com, mindstudio.ai, substack.com | none | #1 learnwithhasan: about 4,500-5,000 words with a TL;DR definition, nine numbered steps, real shell and `.mcp.json` code blocks and a before/after output test. |
| C2 | How do I use Obsidian with Claude (Claude Code) as a second brain? | substack.com, journaldunet.com | none | #1 codemeetai: about 2,700 words, six numbered steps, a folder tree, a CLAUDE.md skeleton, a memory-file example, slash commands, three screenshots and a "Where this ... |
| C3 | What is a local-first second brain? | pypi.org, ecosyste.ms, mcpmarket.com | none | The SERP has no strong editorial owner. |
| C4 | What is data sovereignty for creators / individuals? | bake.co.ke, obsidian.md, kent.ac.uk | none | The creator/individual sense is fragmented across low-authority blogs and wikis, and the summary flagged that none is authoritative. |
| C5 | Can AI actually know you? (personal AI memory) | personal.ai, g2.com, pages.dev | none | Product-specific, actionable steps (for example the ChatGPT Settings > Personalization > Memory path, and personal.ai's inspectable memory dashboard) that the summary ... |
| C6 | Why does AI make everyone's writing sound the same? | easycontent.io, indiehackers.com, omanobserver.om | none | Research evidence: the summary's strongest point came from news coverage of a 2026 Nature Human Behaviour study (880,000+ texts). |
| C7 | Is AI supposed to do the creative work? | omanobserver.om, theconduit.com, medium.com | none | The SERP is debate-shaped (Open to Debate, roundtables, events). |
| C8 | How do I keep AI from eroding my sense of self / identity? | goodreads.com, port.ac.uk, livescience.com | none | Institutional and science-media authority (University of Portsmouth explainer, Live Science, Psychology Today, NeurIPS). |
| C9 | Is technology natural? | substack.com, singularityhub.com | none | Scholarly anchors: Holmes Rolston III essay, Cambridge book, MDPI and Springer papers, Kevin Kelly's "What Technology Wants" via NYU course blogs. |
| C10 | Why does technology feel unnatural? | simonsarris.com, thesocietypages.org, substack.com | none | Thin SERP of only 10 results, mostly essays and academic pages, so it is open to a clear answer page (inference). |
| C11 | How do I fix a fragmented AI workflow with too many AI tools? | walkme.com, mangoapps.com | none | #1 walkme: a proprietary data report (3,750 participants; |
| C12 | What is a calm capture system for an AI second brain / quick capture inbox? | typecast.ai, sslip.io | none | typecast.ai holds three slots (canonical URL, ?p= URL, wp-json URL), which shows a strongly indexed page. |
| C13 | What is the difference between AI-first and AI-complemented work? | groovyweb.co, firstlinesoftware.com, kingy.ai | none | The term "AI-complemented" has no indexed owner. |
| D1 | What are Claude Code skills? | datanorth.ai, claude.com, olostep.com | none | A canonical definitional explainer page ("what are skills" with folder structure, SKILL.md frontmatter and locations). |
| D2 | How do I create a Claude Code skill? | substack.com, verdent.ai, olostep.com | none | A how-to tutorial format: numbered steps, SKILL.md frontmatter example and file locations. |
| D3 | What are the best Claude Code skills or plugin marketplaces? | claudemarket.ai | none | Aggregation at scale with install counts and GitHub stars as ranking signals. |
| D4 | How do I use Claude Code with an Obsidian vault? | github.com, dev.to | none | Concrete setup commands (cd into the vault, `claude`, `/init`, `claude mcp add`) in code blocks. |
| D5 | How do I write a good CLAUDE.md file? | builder.io, humanx.co, dev.to | none | A free, query-matched how-to article ("how to write a good CLAUDE.md"). |
| D6 | Is there a Claude Code skill for systematic debugging? | mcpmarket.com, turbogeek.co.uk | none | Directory presence. The same skill name appears across mcpmarket, claudemarketplaces, vibeindex, skills.sh and skillstore, with install counts. |
| D7 | Claude Code skill for email triage | glama.ai, harper.blog | none | A named mail-client integration (Apple Mail MCP, Gmail) in the title and description. |
| D8 | Claude Code skill or plugin to build a website | mcpmarket.com, datacamp.com, sharedcontext.ai | none | The query space is under-served: the search tool reported finding no dedicated website-builder skill. |
| D9 | Claude Code session closeout or handoff skill (end-of-session notes) | github.com | none | GitHub repos named with the searched vocabulary ("session-handoff"). |
| D10 | Claude Code skill for grant research or grant writing | aimcp.info, claudemarketplaces.com | none | Funder-specific naming (NSF, NIH, DOE, DARPA, NEA, NEH) in descriptions. |
| D11 | Claude Code skills bundle for writers | teachable.com, promptlayer.com, superprofile.bio | none | Listicle and roundup format ("7 Claude Skills for Writers", "Best Claude Skills for Writing (2026)") that matches the query. |
| D12 | How do I run Claude Code autonomously overnight? | dev.to, pages.dev | none | Title wording that matches the query ("overnight", "autonomously for hours"). |
| D13 | Claude Code skill to remove AI-sounding writing (anti AI slop edit pass) | lobehub.com, socket.dev, mcpmarket.com | none | A memorable vocabulary match ("slop", "deslop", "unslop", "stop-slop"). |
| E1 | What is Generative Engine Optimization (GEO)? | conductor.com, substack.com, open.edu | none | A dedicated page whose H1 is the question, with a bolded one-sentence definition directly under it (conductor.com, fetched). |
| E2 | How do I get cited by AI (ChatGPT, Perplexity) as a creator? | onrender.com, neuronwriter.com | none | Quantitative claims attributed to an external audit (neuronwriter, fetched: cites Search Engine Land audit, "72.4% of ChatGPT-cited blog posts had an identifiable Answer ... |
| E3 | How do I make a website readable by AI agents? | vercel.com | none | Original controlled experiment data (Vercel/Ora, fetched: 1,033 agent runs across 25 sites; |
| E4 | What is llms.txt and does it work? | pages.dev, similarweb.com, dev.to | none | The literal term "llms.txt" in title and URL. |
| E5 | What is the Post Web / agentic web? | outlierventures.io | none | Term originator authority: Outlier Ventures owns "Post Web" (thesis chapters dated 2024-11-15, 2024-12-13, 2025-11-19; |
| E6 | What is an AI ambassador (an AI agent that represents you)? | mythos.one, pages.dev, substack.com | none | Nothing substantive on definition quality: the SERP is fragmented and vendor-driven with no canonical definition, so this is an open term (inference). |
| E7 | How do I build a creator business off social media? | behindthescenes.com, payhip.com, betterread.com.au | none | Note the query is ambiguous ("off" read as "from" social media by most results); |
| E8 | How do I build a creator business without performing constantly? | creatorscience.com, behindthescenes.com | none | Established creator-economy authors/platforms (Jay Clouse's Creator Science, Kit/ConvertKit) (inference: author authority). |
| E9 | What is a creator flywheel? | wikipedia.org, chartable.com, thesaurus.com | none | Term ownership by Nathan Barry/Kit: long-form post (fetched nathanbarry.com/creator-flywheels/: ~2,500-3,000 words, dated May 9, 2023, diagrams, GIF, 5+ worked examples ... |
| E10 | What is a sovereign ecosystem for creators (owning your platform)? | google.com, dev.to, substack.com | none | "Sovereign" is heavily claimed by crypto/Web3 (Telegram, MultiversX, Parler/Sovren). |
| E11 | Is there a free AI website builder where I own the site? | scriptbyai.com, substack.com, nindohost.ma | none | Multi-tool comparison with a table (datacamp, fetched: 10-row table Tool/Best For/Free Plan/Key AI Features, schema-dated Sept 10, 2026, named author Laiba Siddiqui, ... |
| E12 | What is a human-AI accord or charter for working with AI? | substack.com, carrd.co, philarchive.org | none | Many small self-published accords rank on thin carrd/hackmd pages, so the bar is low; |
| E13 | How do I know if my personal system or workflow actually works? | otoy.com, sothebysinstitute.com, medium.com | none | Numeric diagnostic thresholds (antoinebuteau.com series 9, fetched: weekly review under 30 min healthy, 45+ min backlog; |

Clusters: A is the Infinite Game, B is life design, C is AI-assisted life and knowledge systems, D is Claude Code skills and vaults, E is Post Web, GEO and creator business. A13 and B13 are brand queries.

## 2. Citation-domain tally

My count from the 65 standard-mode result lists (read 2026-11-04). 635 result slots. 334 distinct registrable domains. Subdomains are collapsed to the registrable domain (so every `*.substack.com` counts as substack.com).

| Domain | Questions it appears in (of 65) | Total result slots | Questions where it is in the top 3 | Questions where it is rank 1 |
|---|---|---|---|---|
| substack.com | 29 | 43 | 20 | 8 |
| pages.dev | 15 | 27 | 7 | 2 |
| dev.to | 14 | 21 | 6 | 1 |
| goodreads.com | 10 | 16 | 4 | 2 |
| wikipedia.org | 6 | 8 | 5 | 4 |
| github.com | 6 | 9 | 3 | 3 |
| beehiiv.com | 5 | 5 | 1 | 1 |
| medium.com | 5 | 6 | 3 | 0 |
| claudemarketplaces.com | 5 | 12 | 1 | 0 |
| shortform.com | 4 | 6 | 1 | 0 |
| linkedin.com | 4 | 4 | 0 | 0 |
| mindstudio.ai | 4 | 5 | 1 | 0 |
| github.io | 4 | 4 | 0 | 0 |
| mcpmarket.com | 4 | 6 | 4 | 2 |
| claudskills.com | 4 | 5 | 0 | 0 |
| dsebastien.net | 3 | 3 | 0 | 0 |
| grinnell.edu | 3 | 12 | 1 | 0 |
| perlego.com | 3 | 3 | 1 | 0 |
| podbean.com | 3 | 3 | 0 | 0 |
| google.com | 3 | 3 | 2 | 1 |
| psychologytoday.com | 3 | 3 | 0 | 0 |
| learnwithhasan.com | 3 | 3 | 1 | 1 |
| skillselion.com | 3 | 4 | 0 | 0 |
| p2pfoundation.net | 2 | 2 | 1 | 1 |
| futurethinkers.org | 2 | 3 | 0 | 0 |
| fs.blog | 2 | 3 | 1 | 0 |
| getabstract.com | 2 | 6 | 0 | 0 |
| creatorscience.com | 2 | 2 | 2 | 2 |
| taylorpearson.me | 2 | 3 | 0 | 0 |
| player.fm | 2 | 3 | 0 | 0 |
| infinitegameos.io | 0 | 0 | 0 | 0 |
| lanebelone.com | 0 | 0 | 0 | 0 |
| sidequesthq.co | 0 | 0 | 0 | 0 |

What the tally says:

- **Newsletters win.** substack.com is in 29 of 65 questions and rank 1 in 8. beehiiv.com adds 5 more. A Substack post on the same topic would enter a result set our domain is absent from (inference). Lane already runs lanebelone.substack.com, and it ranked 1 for the brand query in extended mode.
- **Developer blogs and directories own Claude Code questions.** dev.to is in 14 questions. github.com is rank 1 in 3. Skill directories fill 44 of the 118 Claude Code result slots.
- **The quality bar is low in places.** pages.dev appears in 15 questions and grinnell.edu spam PDFs take 12 slots across 3 questions (inference from titles and URLs: much of this is thin or machine-made).
- **Reference sites anchor the philosophy.** wikipedia.org is rank 1 in 4 questions. goodreads.com is in 10, mostly through reader highlights of Carse.

## 3. Communities, repos and directories

All read 2026-11-04. Nothing was posted or submitted. Reddit returned 403, so member counts come from third-party trackers that disagree. Treat those as unverified.

### Communities

| Venue | URL | Topic | Activity seen | Fit (inference) |
|---|---|---|---|---|
| r/ObsidianMD | https://www.reddit.com/r/ObsidianMD/ | Obsidian vaults | GummySearch shows 373k members, updated 2026-10-26 (https://gummysearch.com/r/ObsidianMD). Obsidian plus Claude threads March to May 2026 (archived at https://reddit.sentinel-team.org/posts/1t1g0vl/snapshots/2026-05-09T02%3A30%3A12.086538Z) | Write-up of the sovereign-ecosystem vault pattern |
| r/ClaudeAI | https://www.reddit.com/r/ClaudeAI/ | Claude | 957K (https://thehiveindex.com/communities/r-claudeai/) or 1.2M (https://gummysearch.com/r/ClaudeAI). A "Built with Claude" showcase megathread from April 2026 | A showcase entry rather than a standalone post |
| r/ClaudeCode | https://www.reddit.com/r/ClaudeCode/ | Claude Code skills and hooks | Trackers disagree (https://gummysearch.com/r/ClaudeCode) | Skill library and guard-hook patterns |
| r/PKMS | https://www.reddit.com/r/PKMS/ | Personal knowledge management | 71k on GummySearch, which says it closed 2025-11-30, so stale (https://gummysearch.com/r/PKMS) | AI second brain concept posts |
| r/Solopreneur | https://www.reddit.com/r/Solopreneur/ | Solo business | 64k to 78k across tracker pages (https://gummysearch.com/r/Solopreneur) | Admin toolkit skills; sidequesthq.co fits better |
| Obsidian Forum, Share and showcase | https://forum.obsidian.md/c/share-showcase/9 | Plugins, workflows, templates | Five newest topics dated 2026-11-03 to 2026-11-04, including Claude Code token tracking (17 replies, 827 views) and a local MCP server | Workflows and Templates post for sovereign-ecosystem |
| Hacker News | https://news.ycombinator.com | Tech | Via HN Algolia: "Finite and Infinite Games (1986) [pdf]" 62 points (https://news.ycombinator.com/item?id=36378032). "llms.txt directory" 106 points (https://news.ycombinator.com/item?id=42496265). "Ask HN: Is the web for machines" 36 points, 2026-06-05 (https://news.ycombinator.com/item?id=48410589). Obsidian plus Claude Show HNs drew 3 points each (https://news.ycombinator.com/item?id=46878200) | An essay on agent-first sites draws better than a product Show HN |
| r/claudecode Discord | https://discord.com/servers/claudecode-1530578814713856011 | Claude Code users | About 4,050 members shown on the listing. Unofficial | Workflow sharing |
| Substacks ranking for Obsidian plus Claude Code | https://codemeetai.substack.com/p/how-to-build-a-second-brain-with , https://buildtolaunch.substack.com/p/claude-code-obsidian-second-brain , https://noahvnct.substack.com/p/how-to-build-your-ai-second-brain , https://aimaker.substack.com/p/ai-second-brain-obsidian | Tutorials | All ranked in C1, C2 or extended re-checks | Guest posts and recommendations |
| Substacks on Carse | https://annieluo.substack.com/p/finite-and-infinite-games-as-modern , https://ayushs.substack.com/p/memo-12-finite-vs-infinite-games , https://sketchyideas.substack.com/p/finite-vs-infinite-games | Infinite Game essays | Ranked in A2, A6 and extended re-checks | Substack Notes and cross-recommendations |
| Podcasts on Carse | https://podcasts.happyscribe.com/a-bit-of-optimism/the-infinite-game-with-dr , https://whatgotyouthere.com/portfolio/216-james-carse/ | Carse interviews | Surfaced in search; dates not checked | Guest pitch on Carse for AI-era creators |
| concepts.dsebastien.net | https://concepts.dsebastien.net/concept/infinite-games/ | A PKM concept wiki | Ranks for "what is the infinite game" (A1) and holds rank 1 on an E9 variant with the same `/concept/slug` URL shape IGOS uses | Proof the IGOS page format can rank (inference) |

No active Reddit home for Carse surfaced in search.

### Repos and directories

| Resource | URL | Size seen | How listing works (read only) | IGOS listed? |
|---|---|---|---|---|
| awesome-claude-code | https://github.com/hesreallyhim/awesome-claude-code | 57.2k stars | Web issue form only, filled by a human. Resource 14+ days old with active development, or 100+ stars (CONTRIBUTING.md) | No |
| anthropics/skills | https://github.com/anthropics/skills | 187.1k stars | No public submission path seen; partner skills at Anthropic's discretion | No |
| travisvn/awesome-claude-skills | https://github.com/travisvn/awesome-claude-skills | 15.7k stars | Fork and PR | No |
| claudemarketplaces.com | https://claudemarketplaces.com/ | 23,379 skills, 3,126 marketplaces on the homepage | Crawler discovery plus a /submit page | Not found on the homepage |
| skills.sh | https://skills.sh | Leaderboard by installs | Installs via `npx skills add` | Not checked in full |
| SkillsMP | https://skillsmp.com | Unverified (403) | Auto-aggregates public GitHub, reported 2-star minimum | Unknown |
| skills.lc | https://skills.lc/infinitegameplayer/infinitegameos/infinitegameplayer-infinitegameos-plugins-jacket-session-skills-jacket-session-skill-md | n/a | Auto-indexed | Yes. jacket-session and jacket-meeting. The only third-party listing found |
| awesome-obsidian | https://github.com/kmaasrud/awesome-obsidian | 9.5k stars | CONTRIBUTING.md; has a Templates section, no AI section | No |
| directory.llmstxt.cloud | https://directory.llmstxt.cloud/ | 4,094 sites | /submit page | Not in visible sections |
| llmstxt.site | https://llmstxt.site/ | Full page read | "Add" button | No |
| llms-txt-hub | https://github.com/thedaviddias/llms-txt-hub | 922 stars | Contributing section | No |
| Own: sovereign-ecosystem | https://github.com/InfiniteGamePlayer/sovereign-ecosystem | 2 stars, 1 fork, 62 commits, 14 topics | n/a | Releases v3.13 to v3.19.1 indexed by search. 2 stars sits at SkillsMP's reported minimum |
| Own: infinitegameos | https://github.com/infinitegameplayer/infinitegameos | 1 star, no topics, homepage field set to infinitegameos.vercel.app (GitHub API) | n/a | Ranked 2 for the brand query in extended mode |
| Own: Hugging Face dataset | https://huggingface.co/datasets/lanebelone/infinite-game-os | 4 downloads, 0 likes, last modified 2026-06-24 (HF API) | n/a | Ranked 1 for a `site:infinitegameos.io sovereign life design` query in B. Covers 10 concepts; the site now has 26 |

Wikidata is in place: Lane Belone is Q139889543 and Infinite Game OS is Q139936059 (https://www.wikidata.org/wiki/Special:EntityData/Q139936059.json, read 2026-11-04). Both official-website claims use the apex domain, while the sites canonicalize to www. Neither item has a Wikipedia sitelink.

## 4. Part A: the site itself

Inventory method: I fetched all 139 sitemap URLs from production on 2026-11-04 (139 of 139 returned 200) and parsed the HTML. Then I traced each finding to the source file. The full per-page table is Appendix A.

What the site has:

- 139 URLs: 19 static pages, 26 concepts, 27 skills, 2 protocols, 7 bundles and 58 updates.
- Every page has a self-canonical, an `og:image`, a Twitter card and JSON-LD. Site-wide `WebSite`, `Person` and `Organization` nodes ship in `src/app/layout.tsx`.
- 121 of 139 pages carry FAQPage. Concepts add `DefinedTerm` inside a `DefinedTermSet`. Skills, bundles and protocols carry `TechArticle`.
- `robots.txt` names 31 crawlers with an explicit Allow. `sitemap.xml` lists all 139 pages with git-derived dates.
- `llms.txt` lists 135 of the 139 sitemap paths (missing `/skills`, `/bundles`, `/protocols` and `/privacy` as entries; the hubs are referenced in prose at line 120). `llms-full.txt`, the agent primer, `AGENTS.md`, `igos-index.json` and `marketplace.json` all return 200.
- Markdown twins return `text/markdown` at `/markdown/...`, and `Accept: text/markdown` on `/the-os` returns markdown.
- `rss.xml` returns 58 items, one per update.
- The apex and `infinitegameos.vercel.app` both 308 to `https://www.infinitegameos.io/`.

### Defects

Ranked by discoverability impact. Line numbers are on `master` at commit `eb22f09`.

| ID | Defect | Where | Evidence |
|---|---|---|---|
| D-01 | Meta descriptions are far too long for snippets | `src/app/updates/[slug]/page.tsx:27` uses `update.summary`. `src/app/concepts/[slug]/page.tsx:27` uses `concept.capsule`. `scripts/check-title-lengths.mjs` checks titles only | 114 of 139 pages over 160 characters. 48 over 300. All 26 concepts over 160. 26 of 58 updates over 300. Longest is 947 (`/updates/from-automations-to-a-working-flywheel`) |
| D-02 | Three hub pages share an exact title with an update post | `src/app/play-your-own-game/page.tsx:7` with `content/updates/how-to-play-your-own-game.mdx:2`. `src/app/design-your-day/page.tsx:7` with `content/updates/how-to-design-a-day-around-what-you-actually-want.mdx:3`. `src/app/creator-business-without-performing/page.tsx:7` with `content/updates/how-to-build-a-creator-business-without-performing-constantly.mdx:3` | Both pages in each pair self-canonicalize. They compete for one query (inference) |
| D-03 | Library titles miss the searched term and one template doubles a word | `src/app/skills/[slug]/page.tsx:29`, `src/app/bundles/[slug]/page.tsx:29`, `src/app/protocols/[slug]/page.tsx:29`. Index titles at `src/app/skills/page.tsx:9`, `src/app/bundles/page.tsx:9`, `src/app/protocols/page.tsx:9`, `src/app/concepts/page.tsx:18` | 0 of 34 skill and bundle titles contain "Claude Code". Bundle titles render "The Writer Bundle: Bundle" because asset titles already end in "Bundle" |
| D-04 | Article `publisher` points at the WebSite node | `src/app/updates/[slug]/page.tsx:82`, `src/app/concepts/[slug]/page.tsx:112`, `src/app/skills/[slug]/page.tsx:80`, `src/app/bundles/[slug]/page.tsx:80`, `src/app/protocols/[slug]/page.tsx:79` and line 40 to 57 of each static page (`the-os:51`, `infinite-game:51`, `agentic-systems:41`, `sovereignty:40`, `accord:51`, `charter:147`, `game-theory:51`, `design-your-day:51`, `play-your-own-game:51`, `creator-business-without-performing:51`, `sovereign-ecosystem:57`, `privacy:58`) | schema.org's `publisher` expects an Organization or Person. `#organization` already exists in `layout.tsx` and `/concepts` already uses it (`src/app/concepts/page.tsx:68`) |
| D-05 | No Article schema carries an `image` | All 16 Article-bearing templates | 0 `image:` fields on Article nodes. Per-page OG images exist and could be referenced |
| D-06 | Dates missing from schema | Updates have no `dateModified` (`src/app/updates/[slug]/page.tsx:75-87`), against the CLAUDE.md maintenance rule. Concepts have no `datePublished` (`src/app/concepts/[slug]/page.tsx:107-117`). `/charter` has no `dateModified` (`src/app/charter/page.tsx:142`) | Freshness is a ranking and citation cue in winner pages (A1, C1, E1) |
| D-07 | No visible author on updates and library pages, no visible date on hub pages | `src/app/updates/[slug]/page.tsx:106-124` renders a month label only. `src/app/concepts/[slug]/page.tsx` and `src/app/skills/[slug]/page.tsx` contain 0 "Lane Belone" strings. `/infinite-game` and `/the-os` render no date | Agents A, C and E each flagged missing bylines against named-author winners |
| D-08 | 18 static pages share the site-default OG image | `/the-os`, `/accord`, `/infinite-game`, `/agentic-systems`, `/sovereignty`, `/updates`, `/about`, `/concepts`, `/protocols`, `/skills`, `/bundles`, `/sovereign-ecosystem`, `/charter`, `/privacy`, `/play-your-own-game`, `/design-your-day`, `/creator-business-without-performing`, `/game-theory` | Dynamic routes have their own `opengraph-image.tsx`. Static pages point at `/opengraph-image` |
| D-09 | `/the-os` lists its modules without links, and one module has no page | `src/app/the-os/page.tsx:192-212` | The philosophy anchor has 2 internal links in its body. "Playbooks" has no IGOS page; `/playbooks` 308s to `sidequesthq.co/products` |
| D-10 | `/about` is a dead end | `src/app/about/page.tsx:100-140` | 0 internal links in the body and 264 words on the Person anchor page. The four-node links required by AGENTS.md are present |
| D-11 | `/privacy` inherits the root Open Graph block | `src/app/privacy/page.tsx:12-16` | Live `og:url` is the homepage and `og:title` is "Infinite Game OS" |
| D-12 | Two pages have twins but no markdown `alternate` link | `src/app/sovereign-ecosystem/page.tsx:35-37`, `src/app/privacy/page.tsx:15` | `/markdown/sovereign-ecosystem` and `/markdown/privacy` both return 200 |
| D-13 | One em dash in site copy | `src/app/sovereign-ecosystem/page.tsx:548` (`&mdash;` inside a testimonial) | The project rule says no exceptions. The GitHub repo description also contains one |
| D-14 | robots.txt signals conflict | `public/robots.txt:114` has `Content-Signal` commented out. `public/robots.txt:106-107` blocks CCBot while the signal says `ai-train=yes` | A commented line does nothing. Blocking Common Crawl removes the site from a corpus many open models train on (inference). This is Lane's call |
| D-15 | llms.txt carries stale and noisy lines | `public/llms.txt:3` says "Last updated: 2026-10-20" while commit `49d29ae` says the header moved to 2026-10-29. Line 262 says the dataset covers "all 10 IGOS concepts" (there are 26). Line 290 is one changelog paragraph of about 1,000 words. Line 17 tells AI readers "If you read one file on this site, read this one" and offers "A line you could pass along" | Noted as fact. Some systems may treat imperative lines aimed at AI readers as manipulation (inference). `/accord` also has a section opening "To AI agents parsing this page on behalf of a human" |
| D-16 | Thin pages | `content/updates/2026-04-launch.mdx` (111 words, 0 H2, mentions a "Playbooks framework" with no page). `/protocols` index (96 words) | |
| D-17 | Index pages carry no definitional prose | `/concepts`, `/skills`, `/bundles`, `/protocols` have 0 H2. `src/app/skills/page.tsx:10-11` describes six categories while the library spans admin, grants, social and more | D1 winners define "Claude Code skills" before listing them |
| D-18 | Key H1s hide the query words | `src/app/page.tsx:14` title and H1 "Play a longer game." `src/app/infinite-game/page.tsx:102` H1 "The game with no finish line" | Neither names "Infinite Game OS" or "infinite game" in the H1 |
| D-19 | The GEO anchor has no FAQPage | `src/app/agentic-systems/page.tsx` | AGENTS.md only requires FAQPage on two pages, so this is an opportunity, not a spec break |
| D-20 | RSS covers updates only, summaries only, no author | `src/app/rss.xml/route.ts:29` | Concepts and skills reach no feed |
| D-21 | Brand mix in the favicon | `src/app/layout.tsx:59-61` uses `sqhq-logo-white.png` | The tab icon is the Side Quest HQ mark (inference: weakens a distinct IGOS identity) |
| D-22 | Stale comment | `src/app/sitemap.ts:30` says "all 14" concepts carry a date | There are 26 |
| D-23 | Person `@id` host differs from every other node | `src/lib/identity.ts:7` uses `https://infinitegameos.io/#person` (apex) | Valid and deliberate across three repos. Harmless, noted for consistency |
| D-24 | Markdown twin of `/the-os` opens with a stray label | Content negotiation output starts "The OS" before the H1 | Minor |

Off-site defects (settings, not code): the GitHub repo homepage field points at `infinitegameos.vercel.app` and the repo has no topics. Both Wikidata `P856` values use apex domains. The Hugging Face dataset is five months behind the concept set.

## Appendix A. Page inventory

Every sitemap URL, fetched from production on 2026-11-04. Title pipes are shown as "/". "Page JSON-LD" leaves out the site-wide WebSite, Person and Organization nodes and the BreadcrumbList every page carries. "Internal links" counts distinct internal hrefs inside `<main>`. "Words" counts visible words inside `<main>`. Every page has a self-canonical that matches its URL, and every page has `twitter:image` set. "Missing" and "Answers a stranger's question?" are my judgment (inference).

| Path | Title (rendered) | Desc chars | Page JSON-LD | Missing (inference) | OG image | H1 / H2s | Internal links | Words | Answers a stranger's question? |
|---|---|---|---|---|---|---|---|---|---|
| / | Infinite Game OS / Play a longer game. | 185 | BreadcrumbList only | WebPage, ItemList of sections | own | 1 / 5 | 23 | 831 | No. Brand line "Play a longer game." names no question |
| /the-os | What is Infinite Game OS? / Infinite Game OS | 165 | Article, FAQPage, ScholarlyArticle | image | site default | 1 / 4 | 2 | 1138 | Partly. "What is Infinite Game OS?" is a brand question; "personal operating system" never appears in title |
| /accord | The Benevolent Human-AI Accord / Infinite Game OS | 186 | Article, FAQPage | image | site default | 1 / 5 | 2 | 1670 | Partly. Answers "what is a human-AI accord" for searchers who know the name |
| /infinite-game | Infinite Game Philosophy / Infinite Game OS | 185 | Article, FAQPage | image | site default | 1 / 5 | 5 | 1335 | Yes, but H1 "The game with no finish line" hides the query words |
| /agentic-systems | Agentic Systems and the Post Web / Infinite Game OS | 180 | Article | FAQPage, image | site default | 1 / 10 | 5 | 1684 | Partly. Defines GEO and Post Web mid-page; no FAQ |
| /sovereignty | Sovereign Life Design / Infinite Game OS | 165 | Article, FAQPage | image | site default | 1 / 9 | 3 | 1722 | Yes. "What is sovereign life design" |
| /updates | Updates: From Inside the Practice / Infinite Game OS | 110 | BreadcrumbList only | CollectionPage | site default | 1 / 58 | 60 | 4332 | No. Index page |
| /about | About Lane Belone / Infinite Game OS | 234 | ProfilePage | none material | site default | 1 / 1 | 0 | 264 | Partly. "Who is Lane Belone?" in 264 words with no internal links |
| /concepts | Concepts / Infinite Game OS | 148 | DefinedTerm, DefinedTermSet | CollectionPage | site default | 1 / 0 | 28 | 683 | No. Index page, no H2 |
| /protocols | Protocols / Infinite Game OS | 121 | ItemList | CollectionPage | site default | 1 / 0 | 4 | 96 | No. Index of two items, 96 words |
| /skills | Skills / Infinite Game OS | 160 | ItemList | CollectionPage | site default | 1 / 0 | 29 | 744 | No. Catalog; no "what are Claude Code skills" prose |
| /bundles | Bundles / Infinite Game OS | 122 | ItemList | CollectionPage | site default | 1 / 0 | 9 | 320 | No. Index page |
| /sovereign-ecosystem | Sovereign Ecosystem. Obsidian + Claude Code Workspace Template | 297 | Article, FAQPage, Offer | image | site default | 1 / 7 | 5 | 1784 | Yes. "Obsidian + Claude Code workspace template" |
| /charter | Your AI's Charter: a CLAUDE.md for how Claude works with you | 234 | CreativeWork, FAQPage | dateModified, image | site default | 1 / 8 | 4 | 2149 | Yes. "A CLAUDE.md for how Claude works with you" |
| /privacy | Privacy / Infinite Game OS | 122 | WebPage | none material | site default | 1 / 6 | 1 | 255 | n/a |
| /play-your-own-game | How to play your own game / Infinite Game OS | 202 | Article, FAQPage | image | site default | 1 / 6 | 2 | 1196 | Yes |
| /design-your-day | Design a day around what you actually want | 185 | Article, FAQPage | image | site default | 1 / 6 | 2 | 1399 | Yes |
| /creator-business-without-performing | Build a Creator business without constant performance | 170 | Article, FAQPage | image | site default | 1 / 6 | 2 | 1031 | Yes |
| /game-theory | Game Theory and the Infinite Game / Infinite Game OS | 198 | Article, FAQPage | image | site default | 1 / 7 | 5 | 1602 | Yes. Game theory set beside the Infinite Game |
| /concepts/creator-flywheel | The Creator Flywheel / Infinite Game OS | 287 | Article, DefinedTerm, DefinedTermSet, FAQPage, LearningResource | datePublished, image | own | 1 / 8 | 9 | 1813 | Partly. Coined term; generic query absent from title |
| /concepts/the-pioneer | The Pioneer / Infinite Game OS | 315 | Article, DefinedTerm, DefinedTermSet, FAQPage, LearningResource | datePublished, image | own | 1 / 7 | 6 | 1032 | Partly. Coined term; generic query absent from title |
| /concepts/joyful-sovereignty | Joyful Sovereignty / Infinite Game OS | 241 | Article, DefinedTerm, DefinedTermSet, FAQPage, LearningResource | datePublished, image | own | 1 / 6 | 9 | 974 | Partly. Coined term; generic query absent from title |
| /concepts/conditioned-vs-authentic-identity | Conditioned vs Authentic Identity / Infinite Game OS | 356 | Article, DefinedTerm, DefinedTermSet, FAQPage, LearningResource | datePublished, image | own | 1 / 6 | 6 | 1258 | Partly. Coined term; generic query absent from title |
| /concepts/ideal-month | The Ideal Month / Infinite Game OS | 324 | Article, DefinedTerm, DefinedTermSet, FAQPage, LearningResource | datePublished, image | own | 1 / 6 | 7 | 1076 | Partly. Coined term; generic query absent from title |
| /concepts/playgrounds-of-exploration | Playgrounds of Exploration / Infinite Game OS | 329 | Article, DefinedTerm, DefinedTermSet, FAQPage, LearningResource | datePublished, image | own | 1 / 8 | 9 | 1560 | Partly. Coined term; generic query absent from title |
| /concepts/infinite-playlist | The Infinite Playlist / Infinite Game OS | 326 | Article, DefinedTerm, DefinedTermSet, FAQPage, LearningResource | datePublished, image | own | 1 / 8 | 5 | 1268 | Partly. Coined term; generic query absent from title |
| /concepts/data-sovereignty | Data Sovereignty / Infinite Game OS | 349 | Article, DefinedTerm, DefinedTermSet, FAQPage, LearningResource | datePublished, image | own | 1 / 8 | 12 | 1672 | Partly. Coined term; generic query absent from title |
| /concepts/the-north-star | The North Star / Infinite Game OS | 328 | Article, DefinedTerm, DefinedTermSet, FAQPage, LearningResource | datePublished, image | own | 1 / 8 | 6 | 1353 | Partly. Coined term; generic query absent from title |
| /concepts/ai-second-brain | The AI Second Brain / Infinite Game OS | 332 | Article, DefinedTerm, DefinedTermSet, FAQPage, LearningResource | datePublished, image | own | 1 / 8 | 10 | 1665 | Partly. Coined term; generic query absent from title |
| /concepts/sovereign-capture | Sovereign Capture / Infinite Game OS | 252 | Article, DefinedTerm, DefinedTermSet, FAQPage, LearningResource | datePublished, image | own | 1 / 7 | 7 | 1377 | Partly. Coined term; generic query absent from title |
| /concepts/contemplative-question-practice | The Contemplative Question Practice / Infinite Game OS | 334 | Article, DefinedTerm, DefinedTermSet, FAQPage, LearningResource | datePublished, image | own | 1 / 6 | 4 | 981 | Partly. Coined term; generic query absent from title |
| /concepts/ai-first-vs-ai-complemented | AI-First vs AI-Complemented / Infinite Game OS | 315 | Article, DefinedTerm, DefinedTermSet, FAQPage, LearningResource | datePublished, image | own | 1 / 7 | 5 | 1265 | Partly. Coined term; generic query absent from title |
| /concepts/artful-intelligence | Artful Intelligence / Infinite Game OS | 213 | Article, DefinedTerm, DefinedTermSet, FAQPage, LearningResource | datePublished, image | own | 1 / 6 | 7 | 1525 | Partly. Coined term; generic query absent from title |
| /concepts/voice-is-the-moat | Voice Is the Moat / Infinite Game OS | 492 | Article, DefinedTerm, DefinedTermSet, FAQPage, LearningResource | datePublished, image | own | 1 / 7 | 6 | 1527 | Partly. Coined term; generic query absent from title |
| /concepts/ai-is-a-mirror-not-an-engine | AI Is a Mirror, Not an Engine / Infinite Game OS | 547 | Article, DefinedTerm, DefinedTermSet, FAQPage, LearningResource | datePublished, image | own | 1 / 7 | 7 | 1546 | Partly. Coined term; generic query absent from title |
| /concepts/ai-is-the-apprentice-you-are-the-artist | AI Is the Apprentice, You Are the Artist / Infinite Game OS | 515 | Article, DefinedTerm, DefinedTermSet, FAQPage, LearningResource | datePublished, image | own | 1 / 7 | 6 | 1524 | Partly. Coined term; generic query absent from title |
| /concepts/held-by-structure | Held by Structure / Infinite Game OS | 264 | Article, DefinedTerm, DefinedTermSet, FAQPage, LearningResource | datePublished, image | own | 1 / 7 | 6 | 1363 | Partly. Coined term; generic query absent from title |
| /concepts/practice-is-the-proof | Practice Is the Proof / Infinite Game OS | 474 | Article, DefinedTerm, DefinedTermSet, FAQPage, LearningResource | datePublished, image | own | 1 / 7 | 6 | 1430 | Partly. Coined term; generic query absent from title |
| /concepts/read-the-refusal | Read the Refusal / Infinite Game OS | 354 | Article, DefinedTerm, DefinedTermSet, FAQPage, LearningResource | datePublished, image | own | 1 / 12 | 6 | 2412 | Partly. Coined term; generic query absent from title |
| /concepts/technology-is-nature-organized | Technology Is Nature Organized / Infinite Game OS | 331 | Article, DefinedTerm, DefinedTermSet, FAQPage, LearningResource | datePublished, image | own | 1 / 8 | 9 | 1820 | Partly. Coined term; generic query absent from title |
| /concepts/the-emergence | The Emergence / Infinite Game OS | 323 | Article, DefinedTerm, DefinedTermSet, FAQPage, LearningResource | datePublished, image | own | 1 / 8 | 8 | 1684 | Partly. Coined term; generic query absent from title |
| /concepts/puzzles-not-problems | Puzzles, Not Problems / Infinite Game OS | 310 | Article, DefinedTerm, DefinedTermSet, FAQPage, LearningResource | datePublished, image | own | 1 / 8 | 8 | 1566 | Partly. Coined term; generic query absent from title |
| /concepts/the-rules-are-in-play | The Rules Are in Play / Infinite Game OS | 345 | Article, DefinedTerm, DefinedTermSet, FAQPage, LearningResource | datePublished, image | own | 1 / 8 | 9 | 1526 | Partly. Coined term; generic query absent from title |
| /concepts/the-shadow-of-the-future | The Shadow of the Future / Infinite Game OS | 391 | Article, DefinedTerm, DefinedTermSet, FAQPage, LearningResource | datePublished, image | own | 1 / 8 | 8 | 1447 | Partly. Coined term; generic query absent from title |
| /concepts/positive-sum-by-design | Positive-Sum by Design / Infinite Game OS | 377 | Article, DefinedTerm, DefinedTermSet, FAQPage, LearningResource | datePublished, image | own | 1 / 8 | 9 | 1487 | Partly. Coined term; generic query absent from title |
| /skills/source-harvest | Source Harvest: Skill / Infinite Game OS | 107 | Article, FAQPage, TechArticle | SoftwareSourceCode or SoftwareApplication, image | own | 1 / 7 | 10 | 1650 | Partly. Says what it does; title lacks "Claude Code" |
| /skills/pattern-harvest | Pattern Harvest: Skill / Infinite Game OS | 132 | Article, FAQPage, TechArticle | SoftwareSourceCode or SoftwareApplication, image | own | 1 / 6 | 6 | 1356 | Partly. Says what it does; title lacks "Claude Code" |
| /skills/plan-challenger | Plan Challenger: Skill / Infinite Game OS | 100 | Article, FAQPage, TechArticle | SoftwareSourceCode or SoftwareApplication, image | own | 1 / 5 | 6 | 822 | Partly. Says what it does; title lacks "Claude Code" |
| /skills/systematic-debugging | Systematic Debugging: Skill / Infinite Game OS | 113 | Article, FAQPage, TechArticle | SoftwareSourceCode or SoftwareApplication, image | own | 1 / 5 | 5 | 903 | Partly. Says what it does; title lacks "Claude Code" |
| /skills/pending-plan-implementation | Pending Plan Implementation: Skill / Infinite Game OS | 87 | Article, FAQPage, TechArticle | SoftwareSourceCode or SoftwareApplication, image | own | 1 / 5 | 6 | 861 | Partly. Says what it does; title lacks "Claude Code" |
| /skills/plan-harvest-and-retire | Plan Harvest and Retire: Skill / Infinite Game OS | 136 | Article, FAQPage, TechArticle | SoftwareSourceCode or SoftwareApplication, image | own | 1 / 5 | 6 | 1051 | Partly. Says what it does; title lacks "Claude Code" |
| /skills/pr-code-review | PR Code Review: Skill / Infinite Game OS | 176 | Article, FAQPage, TechArticle | SoftwareSourceCode or SoftwareApplication, image | own | 1 / 5 | 6 | 1141 | Partly. Says what it does; title lacks "Claude Code" |
| /skills/skill-creator | Skill Creator: Skill / Infinite Game OS | 104 | Article, FAQPage, TechArticle | SoftwareSourceCode or SoftwareApplication, image | own | 1 / 5 | 5 | 854 | Partly. Says what it does; title lacks "Claude Code" |
| /skills/researcher | Researcher: Skill / Infinite Game OS | 125 | Article, FAQPage, TechArticle | SoftwareSourceCode or SoftwareApplication, image | own | 1 / 5 | 5 | 801 | Partly. Says what it does; title lacks "Claude Code" |
| /skills/social-batch-drafting | Social Batch Drafting: Skill / Infinite Game OS | 175 | Article, FAQPage, TechArticle | SoftwareSourceCode or SoftwareApplication, image | own | 1 / 6 | 6 | 1534 | Partly. Says what it does; title lacks "Claude Code" |
| /skills/social-batch-queue | Social Batch Queue: Skill / Infinite Game OS | 175 | Article, FAQPage, TechArticle | SoftwareSourceCode or SoftwareApplication, image | own | 1 / 6 | 5 | 1482 | Partly. Says what it does; title lacks "Claude Code" |
| /skills/grant-researcher | Grant Researcher: Skill / Infinite Game OS | 227 | Article, FAQPage, TechArticle | SoftwareSourceCode or SoftwareApplication, image | own | 1 / 6 | 6 | 1497 | Partly. Says what it does; title lacks "Claude Code" |
| /skills/grant-manager | Grant Manager: Skill / Infinite Game OS | 230 | Article, FAQPage, TechArticle | SoftwareSourceCode or SoftwareApplication, image | own | 1 / 6 | 5 | 1447 | Partly. Says what it does; title lacks "Claude Code" |
| /skills/email-triage | Email Triage: Skill / Infinite Game OS | 147 | Article, FAQPage, TechArticle | SoftwareSourceCode or SoftwareApplication, image | own | 1 / 6 | 5 | 1348 | Partly. Says what it does; title lacks "Claude Code" |
| /skills/quote-builder | Quote Builder: Skill / Infinite Game OS | 146 | Article, FAQPage, TechArticle | SoftwareSourceCode or SoftwareApplication, image | own | 1 / 6 | 5 | 1373 | Partly. Says what it does; title lacks "Claude Code" |
| /skills/invoice-payment-tracker | Invoice & Payment Tracker: Skill / Infinite Game OS | 177 | Article, FAQPage, TechArticle | SoftwareSourceCode or SoftwareApplication, image | own | 1 / 6 | 5 | 1349 | Partly. Says what it does; title lacks "Claude Code" |
| /skills/customer-follow-up | Customer Follow-Up: Skill / Infinite Game OS | 203 | Article, FAQPage, TechArticle | SoftwareSourceCode or SoftwareApplication, image | own | 1 / 6 | 5 | 1371 | Partly. Says what it does; title lacks "Claude Code" |
| /skills/daily-admin-orchestrator | Daily Admin Orchestrator: Skill / Infinite Game OS | 234 | Article, FAQPage, TechArticle | SoftwareSourceCode or SoftwareApplication, image | own | 1 / 6 | 6 | 1443 | Partly. Says what it does; title lacks "Claude Code" |
| /skills/website-builder | Website Builder: Skill / Infinite Game OS | 156 | Article, FAQPage, TechArticle | SoftwareSourceCode or SoftwareApplication, image | own | 1 / 8 | 4 | 2310 | Partly. Says what it does; title lacks "Claude Code" |
| /skills/self-healing | Self-Healing: Skill / Infinite Game OS | 146 | Article, FAQPage, TechArticle | SoftwareSourceCode or SoftwareApplication, image | own | 1 / 5 | 6 | 895 | Partly. Says what it does; title lacks "Claude Code" |
| /skills/session-closeout | Session Closeout: Skill / Infinite Game OS | 190 | Article, FAQPage, TechArticle | SoftwareSourceCode or SoftwareApplication, image | own | 1 / 5 | 6 | 943 | Partly. Says what it does; title lacks "Claude Code" |
| /skills/playwright | Playwright: Skill / Infinite Game OS | 147 | Article, FAQPage, TechArticle | SoftwareSourceCode or SoftwareApplication, image | own | 1 / 5 | 6 | 870 | Partly. Says what it does; title lacks "Claude Code" |
| /skills/anti-ai-edit-pass | Anti-AI Edit Pass: Skill / Infinite Game OS | 136 | Article, FAQPage, TechArticle | SoftwareSourceCode or SoftwareApplication, image | own | 1 / 5 | 5 | 967 | Partly. Says what it does; title lacks "Claude Code" |
| /skills/jacket-session | Jacket Session: Skill / Infinite Game OS | 185 | Article, FAQPage, TechArticle | SoftwareSourceCode or SoftwareApplication, image | own | 1 / 7 | 4 | 987 | Partly. Says what it does; title lacks "Claude Code" |
| /skills/jacket-meeting | Jacket Meeting: Skill / Infinite Game OS | 176 | Article, FAQPage, TechArticle | SoftwareSourceCode or SoftwareApplication, image | own | 1 / 7 | 4 | 943 | Partly. Says what it does; title lacks "Claude Code" |
| /skills/autonomous-improvement-session | Autonomous Improvement Session: Skill / Infinite Game OS | 212 | Article, FAQPage, TechArticle | SoftwareSourceCode or SoftwareApplication, image | own | 1 / 6 | 6 | 1380 | Partly. Says what it does; title lacks "Claude Code" |
| /skills/batch-archival | Batch Archival: Skill / Infinite Game OS | 145 | Article, FAQPage, TechArticle | SoftwareSourceCode or SoftwareApplication, image | own | 1 / 6 | 6 | 1165 | Partly. Says what it does; title lacks "Claude Code" |
| /protocols/ambassador-doctrine | Ambassador Doctrine: Protocol / Infinite Game OS | 162 | Article, FAQPage, TechArticle | SoftwareSourceCode or SoftwareApplication, image | own | 1 / 9 | 5 | 2130 | Partly. Says what it does; title lacks "Claude Code" |
| /protocols/external-worker-routing | External Worker Routing: Protocol / Infinite Game OS | 172 | Article, FAQPage, TechArticle | SoftwareSourceCode or SoftwareApplication, image | own | 1 / 7 | 5 | 1719 | Partly. Says what it does; title lacks "Claude Code" |
| /bundles/foundational-creator | The Foundational Creator Bundle: Bundle / Infinite Game OS | 175 | Article, FAQPage, TechArticle | SoftwareSourceCode or SoftwareApplication, image | own | 1 / 6 | 5 | 1633 | Partly. Says what it does; title lacks "Claude Code" |
| /bundles/the-builder | The Builder Bundle: Bundle / Infinite Game OS | 232 | Article, FAQPage, TechArticle | SoftwareSourceCode or SoftwareApplication, image | own | 1 / 6 | 4 | 1710 | Partly. Says what it does; title lacks "Claude Code" |
| /bundles/the-writer | The Writer Bundle: Bundle / Infinite Game OS | 262 | Article, FAQPage, TechArticle | SoftwareSourceCode or SoftwareApplication, image | own | 1 / 6 | 4 | 1901 | Partly. Says what it does; title lacks "Claude Code" |
| /bundles/the-performer | The Performer Bundle: Bundle / Infinite Game OS | 241 | Article, FAQPage, TechArticle | SoftwareSourceCode or SoftwareApplication, image | own | 1 / 6 | 4 | 2177 | Partly. Says what it does; title lacks "Claude Code" |
| /bundles/the-teacher | The Teacher Bundle: Bundle / Infinite Game OS | 394 | Article, FAQPage, TechArticle | SoftwareSourceCode or SoftwareApplication, image | own | 1 / 6 | 5 | 2255 | Partly. Says what it does; title lacks "Claude Code" |
| /bundles/the-curator | The Curator Bundle: Bundle / Infinite Game OS | 264 | Article, FAQPage, TechArticle | SoftwareSourceCode or SoftwareApplication, image | own | 1 / 6 | 4 | 1976 | Partly. Says what it does; title lacks "Claude Code" |
| /bundles/the-strategist | The Strategist Bundle: Bundle / Infinite Game OS | 299 | Article, FAQPage, TechArticle | SoftwareSourceCode or SoftwareApplication, image | own | 1 / 6 | 5 | 1881 | Partly. Says what it does; title lacks "Claude Code" |
| /updates/what-is-a-practical-alternative-to-follow-your-passion | What is a practical alternative to "follow your passion"? | 172 | Article, FAQPage | dateModified, image, visible byline | own | 1 / 7 | 4 | 875 | Yes |
| /updates/free-ai-website-builder-you-own | Is There a Free AI Website Builder That Gives You the Code? | 308 | Article, FAQPage | dateModified, image, visible byline | own | 1 / 7 | 3 | 859 | Yes |
| /updates/make-a-website-readable-by-ai-agents | How to Make a Website Readable by AI Agents | 341 | Article, FAQPage | dateModified, image, visible byline | own | 1 / 7 | 4 | 929 | Yes |
| /updates/what-is-a-website-builder-skill | What Is a Website Builder Skill for Claude Code? | 335 | Article, FAQPage | dateModified, image, visible byline | own | 1 / 6 | 3 | 811 | Yes |
| /updates/how-do-you-know-which-parts-of-your-business-are-finite-games | Which parts of your business are finite games? | 245 | Article, FAQPage | dateModified, image, visible byline | own | 1 / 7 | 4 | 1304 | Yes |
| /updates/is-finite-and-infinite-games-the-same-as-game-theory | Is Finite and Infinite Games the same as game theory? | 265 | Article, FAQPage | dateModified, image, visible byline | own | 1 / 7 | 5 | 1453 | Yes |
| /updates/what-does-game-theory-offer-a-one-person-business | What does game theory offer a one-person business? | 291 | Article, FAQPage | dateModified, image, visible byline | own | 1 / 7 | 4 | 1442 | Yes |
| /updates/what-is-a-positive-sum-business-model | What is a positive-sum business model? | 258 | Article, FAQPage | dateModified, image, visible byline | own | 1 / 7 | 4 | 1243 | Yes |
| /updates/is-technology-natural | Is technology natural? / Infinite Game OS | 155 | Article, FAQPage | dateModified, image, visible byline | own | 1 / 7 | 6 | 2107 | Yes |
| /updates/what-is-the-difference-between-a-problem-and-a-puzzle | What is the difference between a problem and a puzzle? | 212 | Article, FAQPage | dateModified, image, visible byline | own | 1 / 7 | 6 | 2251 | Yes |
| /updates/where-do-new-ideas-come-from | Where do new ideas actually come from? / Infinite Game OS | 196 | Article, FAQPage | dateModified, image, visible byline | own | 1 / 7 | 6 | 2250 | Yes |
| /updates/why-does-every-solution-create-a-new-need | Why does every solution create a new need? / Infinite Game OS | 227 | Article, FAQPage | dateModified, image, visible byline | own | 1 / 7 | 6 | 2250 | Yes |
| /updates/why-does-technology-feel-unnatural | Why does technology feel unnatural even when it helps? | 177 | Article, FAQPage | dateModified, image, visible byline | own | 1 / 7 | 6 | 2293 | Yes |
| /updates/why-finite-games-sit-inside-the-infinite-game | Why finite games sit inside the Infinite Game / Infinite Game OS | 219 | Article, FAQPage | dateModified, image, visible byline | own | 1 / 7 | 7 | 2233 | Yes |
| /updates/the-doorman-was-never-tested | The Doorman Was Never Tested: Mutation Testing a Green Suite | 213 | Article, FAQPage | dateModified, image, visible byline | own | 1 / 6 | 3 | 1199 | Partly. Statement title |
| /updates/an-ai-stack-that-serves-the-body | Can your AI stack serve your body, not just your business? | 816 | Article, FAQPage | dateModified, image, visible byline | own | 1 / 5 | 4 | 913 | Yes |
| /updates/can-ai-actually-know-you | Can AI actually know you? / Infinite Game OS | 657 | Article, FAQPage | dateModified, image, visible byline | own | 1 / 5 | 5 | 911 | Yes |
| /updates/from-automations-to-a-working-flywheel | How do you turn one-off automations into a working flywheel? | 947 | Article, FAQPage | dateModified, image, visible byline | own | 1 / 5 | 4 | 860 | Yes |
| /updates/how-do-you-know-if-your-system-works | How do you know if your system actually works? / Infinite Game OS | 936 | Article, FAQPage | dateModified, image, visible byline | own | 1 / 5 | 6 | 851 | Yes |
| /updates/how-to-get-cited-by-ai-as-a-creator | How do you get cited by AI as a solo creator? / Infinite Game OS | 832 | Article, FAQPage | dateModified, image, visible byline | own | 1 / 5 | 5 | 926 | Yes |
| /updates/how-to-stay-consistent-without-willpower | How do you stay consistent without willpower? / Infinite Game OS | 903 | Article, FAQPage | dateModified, image, visible byline | own | 1 / 5 | 6 | 817 | Yes |
| /updates/is-ai-supposed-to-do-the-creative-work | Is AI supposed to do the creative work? / Infinite Game OS | 815 | Article, FAQPage | dateModified, image, visible byline | own | 1 / 5 | 5 | 833 | Yes |
| /updates/repairing-a-fragmented-ai-practice | How do you repair a practice that too many AI tools pulled apart? | 920 | Article, FAQPage | dateModified, image, visible byline | own | 1 / 5 | 5 | 840 | Yes |
| /updates/structural-safeguards-against-ai-eroding-self | How do you keep your sense of self while using AI every day? | 929 | Article, FAQPage | dateModified, image, visible byline | own | 1 / 5 | 4 | 902 | Yes |
| /updates/what-is-an-ai-ambassador | What is an AI Ambassador? / Infinite Game OS | 665 | Article, FAQPage | dateModified, image, visible byline | own | 1 / 8 | 6 | 2011 | Yes |
| /updates/why-does-ai-make-everyone-sound-the-same | Why does AI make everyone sound the same? / Infinite Game OS | 639 | Article, FAQPage | dateModified, image, visible byline | own | 1 / 5 | 5 | 954 | Yes |
| /updates/ai-second-brain-obsidian | Build an AI Second Brain on Obsidian Without Leaving Your Machine | 282 | Article, FAQPage | dateModified, image, visible byline | own | 1 / 9 | 5 | 1885 | Yes |
| /updates/calm-capture-ai-second-brain | The Calm Way to Capture Ideas Into an AI Second Brain | 330 | Article, FAQPage | dateModified, image, visible byline | own | 1 / 8 | 6 | 1561 | Partly. Statement title |
| /updates/local-first-second-brain | Local First Second Brain: Own Your Notes, Let AI Do the Sorting | 255 | Article, FAQPage | dateModified, image, visible byline | own | 1 / 7 | 5 | 1656 | Partly. Statement title |
| /updates/conditioned-vs-authentic-identity | What is Conditioned vs Authentic Identity? / Infinite Game OS | 221 | Article, FAQPage | dateModified, image, visible byline | own | 1 / 8 | 7 | 1753 | Yes |
| /updates/how-to-build-a-creator-business-off-social-media | Build a Creator business off social media | 236 | Article, FAQPage | dateModified, image, visible byline | own | 1 / 8 | 8 | 1874 | Yes |
| /updates/how-to-build-a-creator-business-without-performing-constantly | Build a Creator business without constant performance | 323 | Article, FAQPage | dateModified, image, visible byline | own | 1 / 8 | 9 | 1857 | Yes |
| /updates/how-to-build-an-ai-second-brain | How to build an AI second brain / Infinite Game OS | 284 | Article, FAQPage | dateModified, image, visible byline | own | 1 / 9 | 6 | 1894 | Yes |
| /updates/how-to-design-a-day-around-what-you-actually-want | Design a day around what you actually want | 341 | Article, FAQPage | dateModified, image, visible byline | own | 1 / 8 | 9 | 1839 | Yes |
| /updates/how-to-plan-your-ideal-month | How to Plan Your Ideal Month / Infinite Game OS | 165 | Article, FAQPage | dateModified, image, visible byline | own | 1 / 8 | 10 | 1860 | Yes |
| /updates/how-to-play-your-own-game | How to play your own game / Infinite Game OS | 294 | Article, FAQPage | dateModified, image, visible byline | own | 1 / 8 | 7 | 1857 | Yes |
| /updates/infinite-game-os-architecture | What is the Infinite Game Operating System? / Infinite Game OS | 148 | Article, FAQPage | dateModified, image, visible byline | own | 1 / 8 | 8 | 1533 | Yes |
| /updates/self-authorization-in-the-age-of-ai | Self-Authorization in the Age of AI / Infinite Game OS | 440 | Article, FAQPage | dateModified, image, visible byline | own | 1 / 8 | 9 | 2039 | Partly. Statement title |
| /updates/structured-to-be-found | Structured to be found / Infinite Game OS | 299 | Article, FAQPage | dateModified, image, visible byline | own | 1 / 8 | 8 | 1955 | Partly. Statement title |
| /updates/what-are-playgrounds-of-exploration | What are Playgrounds of Exploration? / Infinite Game OS | 210 | Article, FAQPage | dateModified, image, visible byline | own | 1 / 9 | 5 | 1953 | Yes |
| /updates/what-is-a-sovereign-ecosystem-for-creators | What is a sovereign ecosystem for creators? / Infinite Game OS | 359 | Article, FAQPage | dateModified, image, visible byline | own | 1 / 8 | 12 | 1663 | Yes |
| /updates/what-is-data-sovereignty-for-creators | What is data sovereignty for creators? / Infinite Game OS | 203 | Article, FAQPage | dateModified, image, visible byline | own | 1 / 8 | 8 | 1704 | Yes |
| /updates/what-is-joyful-sovereignty | What is Joyful Sovereignty? / Infinite Game OS | 195 | Article, FAQPage | dateModified, image, visible byline | own | 1 / 7 | 7 | 1522 | Yes |
| /updates/what-is-the-benevolent-human-ai-accord | What is the Benevolent Human-AI Accord? / Infinite Game OS | 310 | Article, FAQPage | dateModified, image, visible byline | own | 1 / 8 | 8 | 1489 | Yes |
| /updates/what-is-the-creator-flywheel | What is the Creator Flywheel? / Infinite Game OS | 175 | Article, FAQPage | dateModified, image, visible byline | own | 1 / 9 | 8 | 1781 | Yes |
| /updates/what-is-the-infinite-game | What is the Infinite Game? / Infinite Game OS | 140 | Article, FAQPage | dateModified, image, visible byline | own | 1 / 8 | 8 | 1521 | Yes |
| /updates/what-is-the-infinite-playlist | What is the Infinite Playlist? / Infinite Game OS | 234 | Article, FAQPage | dateModified, image, visible byline | own | 1 / 8 | 7 | 1689 | Yes |
| /updates/what-is-the-north-star-for-goal-setting | What is the North Star for goal-setting? / Infinite Game OS | 200 | Article, FAQPage | dateModified, image, visible byline | own | 1 / 8 | 6 | 1444 | Yes |
| /updates/what-is-the-pioneer | What is the Pioneer? / Infinite Game OS | 182 | Article, FAQPage | dateModified, image, visible byline | own | 1 / 8 | 7 | 1453 | Yes |
| /updates/the-curator-bundle | The Curator Bundle. Claude Code for Newsletter Curators 2026 | 452 | Article | dateModified, image, visible byline | own | 1 / 8 | 10 | 2554 | Partly. Statement title |
| /updates/the-performer-bundle | The Performer Bundle. Claude Code for YouTubers and Podcasters | 509 | Article | dateModified, image, visible byline | own | 1 / 8 | 6 | 2877 | Partly. Statement title |
| /updates/the-strategist-bundle | The Strategist Bundle. Claude Code for Strategists in 2026 | 509 | Article | dateModified, image, visible byline | own | 1 / 9 | 10 | 2870 | Partly. Statement title |
| /updates/the-teacher-bundle | The Teacher Bundle. Claude Code for Course Creators in 2026 | 490 | Article | dateModified, image, visible byline | own | 1 / 8 | 11 | 2883 | Partly. Statement title |
| /updates/foundational-creator-bundle | The Foundational Creator Bundle. Seven Skills for 2026 | 231 | Article | dateModified, image, visible byline | own | 1 / 8 | 11 | 2201 | Partly. Statement title |
| /updates/the-builder-bundle | The Builder Bundle. Claude Code for Solo SaaS Founders 2026 | 379 | Article | dateModified, image, visible byline | own | 1 / 8 | 7 | 2127 | Partly. Statement title |
| /updates/the-writer-bundle | The Writer Bundle. Claude Code for Writers and Essayists 2026 | 422 | Article | dateModified, image, visible byline | own | 1 / 8 | 6 | 2712 | Partly. Statement title |
| /updates/the-infinite-game-i-built-after-reading-sinek | The Infinite Game I Built After Reading Sinek / Infinite Game OS | 162 | Article | dateModified, image, visible byline | own | 1 / 6 | 3 | 1592 | Partly. Statement title |
| /updates/2026-04-launch | The OS is live. / Infinite Game OS | 148 | Article | dateModified, image, visible byline | own | 1 / 0 | 2 | 111 | Partly. Statement title |

## Appendix B. Result URLs per question

First five results in rank order for each standard-mode query, read 2026-11-04.

**A1. What is the infinite game?** Query: "What is the infinite game?" (standard mode, read 2026-11-04)

1. https://en.wikipedia.org/wiki/The_Infinite_Game
2. https://philmorle.substack.com/p/what-is-the-infinite-game-heres-your-cheat-sheet-7fe4d5146b86
3. https://www.ebooks.com/en-us/book/680756/finite-and-infinite-games/james-carse/
4. https://concepts.dsebastien.net/concept/infinite-games/
5. https://cs.grinnell.edu/91393471/qpromptt/ggotoj/yawards/The+Infinite+Game.pdf

**A2. What is the difference between finite and infinite games?** Query: "difference between finite and infinite games" (standard mode, read 2026-11-04)

1. https://sketchyideas.substack.com/p/finite-vs-infinite-games
2. https://fs.blog/finite-and-infinite-games/
3. https://perlego.com/book/778540/finite-and-infinite-games-pdf
4. https://futurethinkers.org/finite-and-infinite-games/
5. https://www.habitsforwellbeing.com/?p=45106

**A3. Is James Carse's Finite and Infinite Games the same as Simon Sinek's The Infinite Game?** Query: "Is James Carse Finite and Infinite Games the same as Simon Sinek The Infinite Game?" (standard mode, read 2026-11-04)

1. https://en.wikipedia.org/wiki/The_Infinite_Game
2. https://thestrategybridge.org/the-bridge/2020/4/29/reviewing-the-infinite-game
3. https://www.jollycontrarian.com/index.php/Finite_game
4. https://cavac.at/cavacopedia/The%20Infinite%20Game
5. https://www.getabstract.com/en/summary/the-infinite-game/36788

**A4. How do I apply the infinite game to my personal life?** Query: "how to apply the infinite game to my personal life" (standard mode, read 2026-11-04)

1. https://sketchyideas.substack.com/p/finite-vs-infinite-games
2. https://cs.grinnell.edu/80655495/wcoverr/ldataa/yariset/The+Infinite+Game.pdf
3. https://cs.grinnell.edu/91393471/qpromptt/ggotoj/yawards/The+Infinite+Game.pdf
4. https://cs.grinnell.edu/46595119/qunitet/lfindm/uthankv/The+Infinite+Game.pdf
5. https://cs.grinnell.edu/48266171/bgetd/fnichep/qillustratei/The+Infinite+Game.pdf

**A5. What does it mean to play the infinite game as a solo creator or one-person business?** Query: "playing the infinite game as a solo creator one-person business" (standard mode, read 2026-11-04)

1. https://creatorscience.com/games/
2. https://www.shortform.com/summary/the-infinite-game-summary-simon-sinek
3. https://leaders.com/articles/business/the-infinite-game/
4. https://www.shortform.com/blog/?p=38435
5. https://www.shortform.com/blog/wp-json/wp/v2/posts/38435

**A6. Is finite and infinite games the same as game theory?** Query: "Is finite and infinite games the same as game theory?" (standard mode, read 2026-11-04)

1. https://wiki.p2pfoundation.net/Finite_vs._Infinite_Games
2. https://sive.rs/book/FiniteInfinite
3. https://obviously.substack.com/p/finite-and-infinite-games-9c7cafd1b2e7
4. https://www.goodreads.com/notes/12902053-finite-and-infinite-games/7066370-dave
5. https://www.goodreads.com/notes/12902053-finite-and-infinite-games/100567449-barry-clark?page=1

**A7. How do I know which parts of my business are finite games?** Query: "how do I know which parts of my business are finite games" (standard mode, read 2026-11-04)

1. https://en.wikipedia.org/wiki/The_Infinite_Game
2. https://www.goodreads.com/author_blog_posts/19140915-how-important-it-is-to-distinguish-between-finite-and-infinite-games
3. https://sketchyideas.substack.com/p/finite-vs-infinite-games
4. https://www.aderant.com/blog/is-your-firm-playing-the-finite-or-infinite-game/
5. https://ellector.com.pa/es/products/libro-juego-infinito-el-mex

**A8. What is an infinite mindset?** Query: "What is an infinite mindset?" (standard mode, read 2026-11-04)

1. https://www.heraldgoa.in/edit/people-edit/infinite-mindset-a-necessity-or-the-need-of-the-hour/280887
2. https://astrocore.pages.dev/concepts/infinite-mindset
3. https://noomii.com/articles/10477-why-the-infinite-mindset-is-key-to-business-life
4. https://www.believeinmind.com/?p=9478
5. https://thaliapenagos.substack.com/p/playing-to-win-with-an-infinite-mindset

**A9. Can finite games be played inside an infinite game?** Query: "Can finite games be played inside an infinite game?" (standard mode, read 2026-11-04)

1. https://www.goodreads.com/notes/12902053-finite-and-infinite-games/100567449-barry-clark?page=1
2. https://www.goodreads.com/notes/12902053-finite-and-infinite-games/16037565-tigran-mamikonian?page=1
3. https://www.goodreads.com/notes/12902053-finite-and-infinite-games/7066370-dave
4. https://www.goodreads.com/notes/12902053-finite-and-infinite-games/22420678-rick-mans
5. https://perlego.com/book/778540/finite-and-infinite-games-pdf

**A10. How do I play my own game in life instead of someone else's?** Query: "how to play your own game in life instead of someone else's" (standard mode, read 2026-11-04)

1. https://everand.com/book/422682398/What-Game-Are-You-Playing-A-Framework-for-Redefining-Success-and-Achieving-What-Matters-Most
2. https://beingdustin.substack.com/p/sabbath-sessions-3/comments
3. https://www2.cbn.com/devotions/play-your-game
4. https://zh.player.fm/1BlAwvL
5. https://da.player.fm/1BlAyxq

**A11. What is the shadow of the future in game theory?** Query: "What is the shadow of the future in game theory?" (standard mode, read 2026-11-04)

1. https://arxiv.org/pdf/2507.02618
2. https://modeldiplomat.com/learn/glossary/shadow-of-the-future
3. https://www.goodreads.com/notes/41034913-alchemy/8557255-doug-lautzenheiser/4843bca2-4d9a-46e0-8800-dbf55f4fc85f
4. https://cowles.yale.edu/sites/default/files/2022-08/d1808.pdf
5. https://www-mit-edu.ezproxy.canberra.edu.au/~rplevy/teaching/2016fall/9.S916/homeworks/hw1.pdf

**A12. What is a positive-sum business model?** Query: "What is a positive-sum business model?" (standard mode, read 2026-11-04)

1. https://www.forrester.com/report/brief-digital-winners-know-that-more-is-more/RES130901
2. https://kartick.substack.com/p/positive-zero-and-negative-sum-companies
3. https://www.oreilly.com/library/view/positive-sum/9781394436729/
4. https://www.porchlightbooks.com/products/positive-sum-roy-swan-9781394436729
5. https://www.wholefoodsmarket.com/tips-and-ideas/archive/win6-concious-capitalism

**A13. (brand) "Infinite Game OS"** Query: "\" (standard mode, read 2026-11-04)

1. https://www.github.com/NathanMcMillan54/infinity-game
2. https://dev.to/max_f2ab6697eb4060d4bc660/infinity-os-the-future-in-your-browser-a-complete-guide-for-beginners-9pj
3. https://sourceforge.net/projects/infinityos/
4. https://en.wikipedia.org/wiki/The_Infinite_Game
5. https://www.microsoft.com/en-us/research/?p=360200

**B1. What is a personal operating system for life?** Query: "What is a personal operating system for life?" (standard mode, read 2026-11-04)

1. https://betterthanyesterdaylife.substack.com/p/how-to-build-a-personal-operating
2. https://coastline-xyz.pages.dev/en/blog/personal-operating-system-life-decisions
3. https://play.google.com/store/apps/details?id=app.playlight
4. https://www.producthunt.com/p/genesislifeos
5. https://contra.com/community/IMIV6nSd-life-os-revolutionize-your-future-with-ai-driven

**B2. How do I design a day around what I actually want?** Query: "How do I design a day around what I actually want?" (standard mode, read 2026-11-04)

1. https://mudwtr.com/blogs/trends-with-benefits/tips-for-designing-your-best-day
2. https://www.schweitzer-online.de/en/ebook/Verma/Clockwork-Solution/9781067081959/A73785232/
3. https://womenwellnesswork.ursuline.edu/9-simple-steps-to-design-the-ultimate-4-2-today
4. https://navid.me/?p=14562
5. https://carlpullein.podbean.com/e/yes-you-can-design-a-perfect-week

**B3. How do I plan my ideal month?** Query: "How do I plan my ideal month?" (standard mode, read 2026-11-04)

1. https://strangecharmed.com/2023/05
2. https://www.wendaful.com/how-to-plan-your-month-for-success/
3. https://strangecharmed.com/2023/3-powerful-questions-to-guide-your-monthly-planning
4. https://balancethroughsimplicity.com/?p=84349
5. https://www.wendaful.com/?p=11737

**B4. What is a practical alternative to "follow your passion"?** Query: "practical alternative to" (standard mode, read 2026-11-04)

1. https://www.remotestaff.ph/?p=16988
2. https://www.remotestaff.ph/blog/reasons-following-passion-bad-advice-what-do-instead/
3. https://www.iwillteachyoutoberich.com/following-your-passion-is-bad-strategy/
4. https://blogs.the-hospitalist.org/index.php/content/follow-your-passion-not-always-good-career-advice
5. https://wp-staging1.remotestaff.ph/?p=16988

**B5. How do I stay consistent without relying on willpower?** Query: "How do I stay consistent without relying on willpower?" (standard mode, read 2026-11-04)

1. https://shubhams-newsletter-5be3ef.beehiiv.com/p/stay-consistent
2. https://www.buzzsprout.com/2118479/episodes/16738175-how-to-stay-consistent-when-motivation-runs-out
3. https://medium.com/work-that-matters/5-ways-to-become-consistent-in-your-life-67e2d7d09a22
4. https://www.pressreader.com/australia/the-chronicle-8992/20190801/282041918741307
5. https://networthlifetime.blogspot.com/2026/03/how-to-stay-consistent-with-goals-when.html

**B6. What is a North Star for personal goal setting?** Query: "What is a North Star for personal goal setting?" (standard mode, read 2026-11-04)

1. https://www.tryondailybulletin.com/?p=6919
2. https://monkhouseandcompany.com/blog/follow-your-north-star-to-reach-those-goals
3. https://themarketdog.substack.com/p/rule-1-set-your-north-star-goals
4. https://justinsharp.substack.com/p/how-to-own-2025
5. https://teachercareercoach.com/?p=3787

**B7. What is the difference between conditioned identity and authentic identity?** Query: "difference between conditioned identity and authentic identity" (standard mode, read 2026-11-04)

1. https://www.skool.com/empower-yourself-empower-life-9945/understanding-the-conditioned-self
2. https://reedsy.com/discovery/book/align-living-and-loving-from-your-true-self-harmony-kwiker
3. https://pure.ecnu.edu.cn/en/publications/sincerity-authenticity-and-profilicity-notes-on-the-problem-a-voc/
4. https://thesocietypages.org/trot/wp-json/wp/v2/posts/3522
5. https://co.linkedin.com/in/eeroma

**B8. What is joyful sovereignty?** Query: "What is joyful sovereignty?" (standard mode, read 2026-11-04)

1. https://desiringgod.org/interviews/finding-joy-when-life-hurts-most
2. https://chms.dwellcc.org/teaching/5259
3. https://biblehub.com/topical/j/joy_in_god's_reign.htm
4. https://www.thegospelcoalition.org/blogs/scotty-smith/jesus-joyful-kingship/
5. https://biblehub.com/topical/r/rejoice_in_god's_sovereignty.htm

**B9. What is sovereign life design / living a sovereign life?** Query: "What is sovereign life design? living a sovereign life" (standard mode, read 2026-11-04)

1. https://tsp-private-intensive.pages.dev/
2. https://en.wikipedia.org/wiki/Sovereign_Services
3. https://www.international-adviser.com/sovereign-launches-guernsey-intl/
4. https://trademark.justia.com/owners/sovereign-life-insurance-company-of-california-337149
5. https://payhip.com/b/RN3uS

**B10. What is the difference between a problem and a puzzle?** Query: "What is the difference between a problem and a puzzle?" (standard mode, read 2026-11-04)

1. https://greggllc.substack.com/p/puzzles
2. https://www.tes.com/news/when-puzzle-not-puzzle
3. https://filmstories.co.uk/?p=83505
4. https://www.zurnalai.vu.lt/LMR/article/view/17743
5. https://www.journals.vu.lt/LMR/article/view/17743

**B11. Where do new ideas come from?** Query: "Where do new ideas come from?" (standard mode, read 2026-11-04)

1. https://ronedmondson.com/2019/10/new-ideas-come-from-doing.html
2. https://ronedmondson.com/?p=11566
3. https://www.artsjournal.com/2014/02/where-do-new-ideas-come-from-heres-how-the-brain-makes-them.html
4. https://blog.ipleaders.in/where-do-ideas-come-from/
5. https://datawrapper.dwcdn.net/qFFAn/3

**B12. Why does every solution create a new need?** Query: "Why does every solution create a new need?" (standard mode, read 2026-11-04)

1. https://www.minid.net/2019/7/30/find-a-problem-and-solve-it
2. https://blogs.sap.com/?p=100399
3. https://www.jumpassociates.com/?p=2435
4. https://www.jumpassociates.com/needs-solutions-innovation/
5. https://dspace.mit.edu/handle/1721.1/134191.2?show=full

**B13. (brand) "Lane Belone"** Query: "Lane Belone" (standard mode, read 2026-11-04)

1. https://kfda.be/en/venues/la-bellone
2. https://fishes-fnam.linnaeus.naturalis.nl/linnaeus_ng/app/views/glossary/term.php?id=35546
3. https://www.fishipedia.fr/fr/poissons/belone-belone
4. https://www.livetheworld.com/activities/belgium/la-bellone
5. https://fishes-fnam.linnaeus.naturalis.nl/linnaeus_ng/app/views/species/name.php?id=36380

**C1. How do I build an AI second brain?** Query: "how to build an AI second brain" (standard mode, read 2026-11-04)

1. https://learnwithhasan.com/guide/ai-second-brain/
2. https://www.mindstudio.ai/blog/build-ai-second-brain-persistent-memory
3. https://pulseline.substack.com/p/the-ai-second-brain
4. https://affine.pro/blog/build-ai-second-brain
5. https://kevinstratvert.com/2026/07/27/how-to-build-an-ai-second-brain-step-by-step-tutorial/

**C2. How do I use Obsidian with Claude (Claude Code) as a second brain?** Query: "how to use Obsidian with Claude Code as a second brain" (standard mode, read 2026-11-04)

1. https://codemeetai.substack.com/p/how-to-build-a-second-brain-with
2. https://www.journaldunet.com/en/1557287-how-to-build-a-second-brain-for-claude-code-using-obsidian/
3. https://secondbrainn.substack.com/p/build-a-second-brain-in-claude-and
4. https://docs.google.com/document/d/1LVElPJ2QZwijApBUUTD8WDF1gTjUHokb/export?format=pdf
5. https://buildtolaunch.substack.com/p/claude-code-obsidian-second-brain

**C3. What is a local-first second brain?** Query: "what is a local-first second brain" (standard mode, read 2026-11-04)

1. https://pypi.org/project/secondbrain-os/
2. https://awesome.ecosyste.ms/api/v1/projects/github.com%2Farkangelai%2Fsecond-brain
3. https://mcpmarket.com/es/server/second-brain-2
4. https://github.com/mi4uu/brain.md
5. https://vucense.pages.dev/ai-intelligence/local-llms/how-to-build-a-second-brain-powered-by-local-ai/

**C4. What is data sovereignty for creators / individuals?** Query: "what is data sovereignty for creators and individuals" (standard mode, read 2026-11-04)

1. https://blog.bake.co.ke/?p=10898
2. https://publish.obsidian.md/dolores/5+-+Publish/Potting+Table/data+sovereignty
3. https://kar.kent.ac.uk/id/document/3435353
4. https://khaby-8qm.pages.dev/blog/biometric-sovereignty-own-your-face-voice
5. https://prnewswire.com/news-releases/crown-sterling-declares-data-bill-of-rights-for-consumers-301316670.html

**C5. Can AI actually know you? (personal AI memory)** Query: "can AI actually know you personal AI memory" (standard mode, read 2026-11-04)

1. https://blog.personal.ai/human-ai-labs-closes-3-2m-seed-round-to-create-an-ai-extension-of-human-memory-8595a9bd925f
2. https://ai.g2.com/marketplace/tools/pickle
3. https://nomie-website.pages.dev/blog/ai-that-remembers-you
4. https://dev.to/reenas_27gb/your-ai-has-the-memory-of-a-goldfish-1638
5. https://teamday.pages.dev/blog/personal-ai-agents-with-memory

**C6. Why does AI make everyone's writing sound the same?** Query: "why does AI make everyone's writing sound the same" (standard mode, read 2026-11-04)

1. https://easycontent.io/resources/why-ai-makes-everyone-sound-the-same/
2. https://www.indiehackers.com/product/noren
3. https://www.omanobserver.om/ampArticle/1196973
4. https://issuu.com/kihumanizerde/docs/kihumanizer.de
5. https://tech.supercarblondie.com/english-professor-says-ai-training-us-to-write-same-way

**C7. Is AI supposed to do the creative work?** Query: "is AI supposed to do the creative work" (standard mode, read 2026-11-04)

1. https://www.omanobserver.om/ampArticle/1155199
2. https://www.theconduit.com/upcoming-events/the-creative-line-ai-assistance-or-artistic-cheating/
3. https://medium.com/moonshotlab/can-ai-be-creative-8ba13361c3ea
4. https://opper.ai/ai-roundtable/questions/should-ai-be-allowed-to-create-art-music-or-literature-d2b21a6b
5. https://opentodebate.org/?p=43811

**C8. How do I keep AI from eroding my sense of self / identity?** Query: "how to keep AI from eroding my sense of self and identity" (standard mode, read 2026-11-04)

1. https://www.goodreads.com/author_blog_posts/19208715-how-to-avoid-losing-our-identity-while-collaborating-with-ai
2. https://researchportal.port.ac.uk/en/publications/explainer-003-ai-and-identity-erosion/
3. https://livescience.com/technology/artificial-intelligence/ai-can-stunt-the-skills-necessary-for-independent-self-creation-relying-on-algorithms-could-reshape-your-entire-identity-without-you-realizing
4. https://addictedtoai-help.pages.dev/ai-addiction/ai-addiction-and-identity
5. https://bbcbreakingnews.pages.dev/worklife/article/20230712-ai-can-threaten-your-personal-identity-but-it-doesnt-have-to

**C9. Is technology natural?** Query: "is technology natural" (standard mode, read 2026-11-04)

1. https://optimisminai.substack.com/p/is-artificial-intelligence-technology
2. https://attentionactivist.substack.com/p/the-nature-of-technology
3. https://singularityhub.com/2015/09/04/is-technology-unnatural-or-is-it-what-makes-us-human
4. https://mountainscholar.org/bitstream/handle/10217/48100/Technol-vs-Nature-Aberdeen.pdf;sequence=1
5. https://wp.nyu.edu/licastro_fall14/?p=639

**C10. Why does technology feel unnatural?** Query: "why does technology feel unnatural" (standard mode, read 2026-11-04)

1. https://map.simonsarris.com/p/careful-technology
2. https://thesocietypages.org/cyborgology/?p=11592
3. https://sammatey.substack.com/p/if-something-new-seems-unnatural
4. https://uxbooth.com/?p=39053
5. https://scholar.lib.vt.edu/ejournals/SPT/v9n2/chapman.html

**C11. How do I fix a fragmented AI workflow with too many AI tools?** Query: "how to fix a fragmented AI workflow with too many AI tools" (standard mode, read 2026-11-04)

1. https://www.walkme.com/blog/ai-workflow-fragmentation/
2. https://www.walkme.com/blog/?p=22070
3. https://www.mangoapps.com/articles/why-fragmented-tools-break-enterprise-ai
4. https://dailysuccesssnacks.beehiiv.com/p/wait-until-you-see-this-new-ai-tool-the-4-words-your-team-secretly-dreads
5. https://ckeditor.com/blog/enterprise-ai-adoption-challenges-tool-sprawl/

**C12. What is a calm capture system for an AI second brain / quick capture inbox?** Query: "calm capture system for an AI second brain quick capture inbox" (standard mode, read 2026-11-04)

1. https://typecast.ai/learn/?p=13952
2. https://brain.178-105-170-5.sslip.io/content/guide.html
3. https://typecast.ai/learn/how-to-build-a-second-brain-system/
4. https://dev.to/techsifted/how-to-build-a-second-brain-with-ai-tools-a-practical-guide-for-2026-o76
5. https://yaranga.net/articles/2025-01-09-yaranga-digital-desk-drawer-for-multitaskers-to-find-calm

**C13. What is the difference between AI-first and AI-complemented work?** Query: "difference between AI-first and AI-complemented work" (standard mode, read 2026-11-04)

1. https://www.groovyweb.co/blog/ai-first-vs-ai-augmented-vs-ai-enabled
2. https://firstlinesoftware.com/blog/ai-native-vs-ai-first-whats-the-difference/
3. https://kingy.ai/?p=15285
4. https://kingy.ai/news/ai-only-companies-are-coming-why-ai-first-is-just-the-transition-phase/
5. https://kingy.ai/ai/ai-only-companies-are-coming-why-ai-first-is-just-the-transition-phase/

**D1. What are Claude Code skills?** Query: "What are Claude Code skills?" (standard mode, read 2026-11-04)

1. https://datanorth.ai/blog/claude-code-skills-what-are-they-and-why-are-they-important
2. https://code.claude.com/docs/en/skills?aff=86jEAz
3. https://www.olostep.com/blog/claude-code-skills
4. https://mintlify.com/npow/claude-skills
5. https://claude.com/blog/lessons-from-building-claude-code-how-we-use-skills

**D2. How do I create a Claude Code skill?** Query: "How do I create a Claude Code skill?" (standard mode, read 2026-11-04)

1. https://codemeetai.substack.com/p/how-to-create-a-claude-code-skill
2. https://www.verdent.ai/guides/how-to-create-skill-claude-code
3. https://www.olostep.com/blog/claude-code-skills
4. https://smithery.ai/skills/T1nker-1220/skill-creation-guide
5. https://tech-insider.org/?p=19668

**D3. What are the best Claude Code skills or plugin marketplaces?** Query: "best Claude Code skills plugin marketplaces" (standard mode, read 2026-11-04)

1. https://claudemarket.ai/blog/best-claude-code-marketplaces
2. https://claudemarket.ai/marketplaces?page=16
3. https://claudemarket.ai/marketplaces?page=20
4. https://claudemarket.ai/marketplaces?page=13
5. https://claudemarket.ai/marketplaces?page=22

**D4. How do I use Claude Code with an Obsidian vault?** Query: "How to use Claude Code with an Obsidian vault" (standard mode, read 2026-11-04)

1. https://github.com/iamvirul/claude-setup
2. https://github.com/rollecode/obsidian-remote-mcp
3. https://dev.to/mibii/claude-code-obsidian-build-a-second-brain-that-actually-thinks-d61
4. https://www.nocodefounders.com/guides/run-your-life-with-claude-code-and-obsidian
5. https://skillselion.com/skills/julianobarbosa/claude-code-skills/vault-setup

**D5. How do I write a good CLAUDE.md file?** Query: "How do I write a good CLAUDE.md file?" (standard mode, read 2026-11-04)

1. https://builder.io/blog/claude-md-guide
2. https://builder-proxy.humanx.co/blog/claude-md-guide
3. https://dev.to/0xmariowu/writing-a-good-claudemd-mck
4. https://dev.to/claudeguide/how-to-write-effective-claudemd-files-with-12-real-examples-35j1
5. https://www.plushcap.com/content/tembo/blog/tembo-how-to-write-a-great-claudemd-best-practices-and-tips

**D6. Is there a Claude Code skill for systematic debugging?** Query: "Claude Code skill for systematic debugging" (standard mode, read 2026-11-04)

1. https://mcpmarket.com/tools/skills/systematic-debugging-1788296675028
2. https://www.turbogeek.co.uk/?p=8657
3. https://mcpmarket.com/tools/skills/systematic-debugging-1768993069354
4. https://claudemarketplaces.com/skills/secondsky/claude-skills/systematic-debugging
5. https://claudemarketplaces.com/skills/davila7/claude-code-templates/systematic-debugging

**D7. Claude Code skill for email triage** Query: "Claude Code skill for email triage" (standard mode, read 2026-11-04)

1. https://glama.ai/mcp/servers/@patrickfreyer/apple-mail-mcp/blob/6f53b5a53c6dc23be6219ce34b337c13dec225d3/skill-email-management/README.md
2. https://glama.ai/mcp/servers/@patrickfreyer/apple-mail-mcp/blob/1bb7c7fde1c26ee513a31e65a6965721d02d4b67/skill-email-management/README.md
3. https://harper.blog/2025/12/03/claude-code-email-productivity-mcp-agents/
4. https://claudemarketplaces.com/skills/casper-studios/casper-marketplace/email-triage
5. https://vibeindex.ai/skills/maroffo/claude-forge/inbox-triage

**D8. Claude Code skill or plugin to build a website** Query: "Claude Code skill or plugin to build a website" (standard mode, read 2026-11-04)

1. https://mcpmarket.com/ko/tools/skills/claude-code-plugin-builder-1
2. https://www.datacamp.com/tutorial/how-to-build-claude-code-plugins
3. https://sharedcontext.ai/plugins/external/mintuz/claude-code-plugins-4
4. https://skills-hub.ai/skills/buildwithclaude-public-plugin-builder
5. https://claudskills.com/skills/plugin-build/

**D9. Claude Code session closeout or handoff skill (end-of-session notes)** Query: "Claude Code session closeout handoff skill end-of-session notes" (standard mode, read 2026-11-04)

1. https://github.com/rb17080/session-handoff
2. https://github.com/anthropics/claude-code/issues/23649
3. https://github.com/thenguyenvn90/claude-session-handoff/releases
4. https://ao92265.github.io/claude-code-playbook/skills/handoff/SKILL/
5. https://openskillindex.com/skills/lsnackerman-raw-clauding-skills-wrap

**D10. Claude Code skill for grant research or grant writing** Query: "Claude Code skill for grant research or grant writing" (standard mode, read 2026-11-04)

1. https://www.aimcp.info/en/skills/2ed3c9b9-8b0f-4dd0-9d0a-847536da2b62
2. https://www.aimcp.info/zh/skills/33e7b7ad-940c-44f0-9b1e-52a47e633d86
3. https://claudemarketplaces.com/skills/davila7/claude-code-templates/research-grants
4. https://www.aimcp.info/en/skills/01c81246-476a-48a2-b606-93a83243f5b6
5. https://claudemarketplaces.com/skills/k-dense-ai/scientific-agent-skills/research-grants

**D11. Claude Code skills bundle for writers** Query: "Claude Code skills bundle for writers" (standard mode, read 2026-11-04)

1. https://future-fiction-academy.teachable.com/l/bundle/751399/advanced-ai-tool-starter-kit
2. https://www.promptlayer.com/glossary/claude-code-skill
3. https://superprofile.bio/vp/Claude-skill-on-demand
4. https://claudskills.com/skills/essay-to-distribution-pack/
5. https://skillmd.pages.dev/category/writing

**D12. How do I run Claude Code autonomously overnight?** Query: "How do I run Claude Code autonomously overnight?" (standard mode, read 2026-11-04)

1. https://dev.to/builtbyzac/running-claude-code-overnight-what-to-set-up-beforehand-3egk
2. https://dev.to/thebasedcapital/why-your-overnight-ai-agent-fails-and-how-episodic-execution-fixes-it-2g50
3. https://sendy-hq.pages.dev/docs/solutions/architecture-patterns/overnight-autonomous-agent
4. https://davidloor.com/blog/how-to-run-claude-code-autonomously-for-hours
5. https://davidloor.com/en/blog/how-to-run-claude-code-autonomously-for-hours

**D13. Claude Code skill to remove AI-sounding writing (anti AI slop edit pass)** Query: "Claude Code skill to remove AI-sounding writing anti AI slop edit pass" (standard mode, read 2026-11-04)

1. https://lobehub.com/skills/alfredolopez80-multi-agent-ralph-loop-stop-slop
2. https://socket.dev/npm/package/avoid-ai-writing-detector
3. https://mcpmarket.com/es/tools/skills/stop-slop
4. https://mcpmarket.com/tools/skills/stop-slop
5. https://digg.com/ai/5ck771yu

**E1. What is Generative Engine Optimization (GEO)?** Query: "What is Generative Engine Optimization (GEO)?" (standard mode, read 2026-11-04)

1. https://conductor.com/academy/generative-engine-optimization/
2. https://waynemcrae.substack.com/p/what-is-generative-engine-optimization
3. https://www.open.edu/openlearncreate/mod/page/view.php?id=235128
4. https://kierangilmurray.substack.com/p/what-is-generative-engine-optimisation
5. https://www.conductor.com/academy/glossary/generative-engine-optimization

**E2. How do I get cited by AI (ChatGPT, Perplexity) as a creator?** Query: "how to get cited by ChatGPT and Perplexity as a creator" (standard mode, read 2026-11-04)

1. https://procloserai.onrender.com/blog/how-to-get-cited-by-ai
2. https://neuronwriter.com/?p=27874
3. https://neuronwriter.com/how-to-rank-in-perplexity-and-get-cited-by-chatgpt-the-ultimate-playbook/
4. https://aiseoguide.duckdns.org/articles/how-to-get-cited-by-chatgpt-perplexity.html
5. https://dev.to/dageno_963435178f0fc9478d/how-to-get-cited-by-ai-earning-citations-from-chatgpt-perplexity-and-google-ai-overviews-3ic3

**E3. How do I make a website readable by AI agents?** Query: "how to make a website readable by AI agents" (standard mode, read 2026-11-04)

1. https://vercel.com/kb/guide/make-your-site-readable-by-ai-agents.md
2. https://vercel.com/kb/guide/make-your-site-readable-by-ai-agents
3. https://vercel.com/kb/guide/agent-readability-spec
4. https://mo.agency/blog/making-your-website-ai-readable
5. https://dev.to/guardlabs_team/how-to-make-your-website-ai-agent-readable-in-2026-llmstxt-mcp-cards-structured-data-m8m

**E4. What is llms.txt and does it work?** Query: "what is llms.txt and does it work" (standard mode, read 2026-11-04)

1. https://ismybrandinai-site.pages.dev/llms-txt
2. https://www.similarweb.com/blog/marketing/geo/llms-txt
3. https://dev.to/lab451/complete-llmstxt-guide-for-2026-57d
4. https://llmtxt-info.pages.dev/does-llms-txt-work/
5. https://screpy.com/?p=6892

**E5. What is the Post Web / agentic web?** Query: "what is the Post Web agentic web" (standard mode, read 2026-11-04)

1. https://outlierventures.io/article/from-smart-contracts-to-smart-agents-the-rise-of-the-agentic-layer/
2. https://outlierventures.io/wp-content/uploads/2025/11/The-Post-Web-PDF-Chapter-3-Update.pdf
3. https://outlierventures.io/postweb
4. https://outlierventures.io/?p=18284
5. https://hotfix.coindesk.com/opinion/2024/11/14/the-post-web-read-write-own-delegate

**E6. What is an AI ambassador (an AI agent that represents you)?** Query: "what is an AI ambassador, an AI agent that represents you" (standard mode, read 2026-11-04)

1. https://mythos.one/me/brianswichkow/e6d56d
2. https://www-heyjamie-ai.pages.dev/feature/branding.html
3. https://heynavii.substack.com/p/everyone-gets-an-agent
4. https://huggingface.co/HEA-World
5. https://luma.com/jzdu389y

**E7. How do I build a creator business off social media?** Query: "how to build a creator business off social media" (standard mode, read 2026-11-04)

1. https://www.behindthescenes.com/blogs/how-creators-build-sustainable-content-business-2026
2. https://payhip.com/b/DGvjA
3. https://www.betterread.com.au/book/the-social-media-money-manifesto-maximizing-profits-as-a-content-creator.do
4. https://pillar.io/blog/strategies-to-build-and-monetize-your-creator-business
5. https://mewayz.com/en/blog/building-a-creator-business-beyond-social-media-followers

**E8. How do I build a creator business without performing constantly?** Query: "how to build a creator business without performing constantly" (standard mode, read 2026-11-04)

1. https://creatorscience.com/machine/
2. https://behindthescenes.com/blogs/6-best-practices-for-building-a-creator-business
3. https://behindthescenes.com/blogs/the-ultimate-guide-to-building-a-creator-business-2026
4. https://convertkit.com/creator-monetization
5. https://caleb-wojcik.squarespace.com/advising

**E9. What is a creator flywheel?** Query: "what is a creator flywheel" (standard mode, read 2026-11-04)

1. https://en.wikipedia.org/wiki/Flywheel_(disambiguation)
2. https://chartable.com/podcasts/first-class-founders/episodes/149856128-building-powerful-flywheels-unlocking-growth-engines-for-entrepreneurs-in-the-digital-age
3. https://www.thesaurus.com/browse/fly
4. https://www.oxfordlearnersdictionaries.com/us/definition/english/flywheel
5. https://www.oxfordlearnersdictionaries.com/definition/english/flywheel

**E10. What is a sovereign ecosystem for creators (owning your platform)?** Query: "sovereign ecosystem for creators owning your platform" (standard mode, read 2026-11-04)

1. https://sites.google.com/view/xaltius/home/blogs/why-creators-are-building-their-own-ecosystems-in-2025
2. https://dev.to/web4/why-you-are-the-media-also-means-youre-a-digital-tenant-2okg
3. https://2hourcreatorstack.substack.com/p/the-rise-of-the-sovereign-creator
4. https://hejon07.substack.com/p/the-sovereign-library
5. https://t.me/s/optiocommunity/268

**E11. Is there a free AI website builder where I own the site?** Query: "free AI website builder where I own the site" (standard mode, read 2026-11-04)

1. https://www.scriptbyai.com/webflows-free-ai-site-builder
2. https://aimadesimple0.substack.com/p/i-tried-30-free-ai-website-builders
3. https://nindohost.ma/en/guides/creation-sites-web/nindobuilder/
4. https://www.datacamp.com/blog/best-free-ai-website-builder
5. https://codeforgeek.com/?p=33230

**E12. What is a human-AI accord or charter for working with AI?** Query: "human-AI accord charter for working with AI" (standard mode, read 2026-11-04)

1. https://exploringchatgpt.substack.com/p/agent-takeover/comments
2. https://humaiaccord.carrd.co/
3. https://philarchive.org/rec/AEGTCA-2
4. https://huggingface.co/datasets/jpamarlphi-byte/Draft_AI_AGI_ASI_Universal_Ethical_Charter/blob/main/README.md
5. https://hackmd.io/@cxqmaggie/asimovaccord

**E13. How do I know if my personal system or workflow actually works?** Query: "how do I know if my personal productivity system or workflow actually works" (standard mode, read 2026-11-04)

1. https://sdp.otoy.com/does-it-work-for-you
2. https://sa.sothebysinstitute.com/does-it-work-for-you
3. https://medium.com/@tejas-sharma/best-personal-productivity-system-af3351f58609
4. https://next-cms.climatetrace.org/does-it-work-for-you
5. https://myshare-cms.siemens.com/does-it-work-for-you

