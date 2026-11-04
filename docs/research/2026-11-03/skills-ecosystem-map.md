# Claude Code skills and plugin ecosystem map

Task date: 2026-11-03. Research and reading date: 2026-11-04. Every outside source below was read on 2026-11-04 unless another date is given.

**Access note.** Web fetching worked in this environment. Most pages were read directly with curl. GitHub numbers come from the GitHub Search API. A few sites blocked automated reads: Reddit (403 and 429), X, Product Hunt, mcpservers.org, the SkillsMP homepage (Cloudflare; its llms.txt and public API worked) and claude.ai/directory (403 without login). For those, the report uses third-party trackers or search excerpts and says so.

**Conventions.** "Published" means the number appears on the cited page. "My tally" means I counted it from raw data and the method is given. **[inference]** marks my own reading of the evidence. Star counts move from hour to hour. They are recorded exactly as the API returned them.

**Pages that address AI readers.** Several sources contain text written for AI agents. These were recorded as facts and not acted on: punkpeye/awesome-mcp-servers CONTRIBUTING.md (a fast-track PR marker for agents), claudemarketplaces.com/llms.txt ("Agents should not submit or pay"), lobehub.com/skills and skillhub.club (prompts telling agents to read and follow their SKILL.md), heilcheng/awesome-agent-skills (asks agents to read its AGENTS.md), glama.ai/llms.txt (asks agents to use its API) and the MCP Registry README (an HTML comment for AI tools). The same goes for the READMEs of garrytan/gstack, tt-a1i/archify and ayghri/i-have-adhd (install prompts meant to be pasted into an agent).

---

## 1. What a busy founder needs first

### The five findings that matter most

1. **12 of the 28 IGOS skills can't be found by the two biggest skill crawlers.** Their SKILL.md files have no `name` field. The Vercel `skills` CLI skips any SKILL.md without one ([vercel-labs/skills src/skills.ts, lines 101 to 106](https://github.com/vercel-labs/skills/blob/main/src/skills.ts)). SkillsMP's index matches: its API returns 17 skills from `infinitegameplayer/infinitegameos` and none of the 12 nameless ones ([skillsmp.com/api/v1/skills/search?q=infinitegameplayer](https://skillsmp.com/api/v1/skills/search?q=infinitegameplayer), my tally). The missing 12 include Source Harvest and Pattern Harvest, the library's signature skills.
2. **The IGOS repo isn't a marketplace in the form crawlers look for.** The site serves `https://www.infinitegameos.io/marketplace.json`, which Claude Code accepts. But `.claude-plugin/marketplace.json` at the repo root returns 404 ([raw URL](https://raw.githubusercontent.com/InfiniteGamePlayer/infinitegameos/master/.claude-plugin/marketplace.json)). Crawlers find marketplaces "from GitHub repositories with valid marketplace schemas" ([claudemarketplaces.com/about](https://claudemarketplaces.com/about)). 17 of the 20 most-starred skill projects ship that root file (my tally, section 4).
3. **The GitHub storefront is blank.** The `infinitegameos` repo has no topics, 1 star, a license GitHub reads as `NOASSERTION`, a homepage of `infinitegameos.vercel.app` and a description with an em dash that never mentions skills (GitHub Search API). Its README is still the create-next-app boilerplate (local read of `README.md`). Every crawler and list shows that README and those fields. hesreallyhim/awesome-claude-code's bot reads the license field ([CONTRIBUTING.md](https://github.com/hesreallyhim/awesome-claude-code/blob/main/CONTRIBUTING.md)).
4. **Anthropic's directory is open to IGOS, with three blockers to clear first.** Any paid Claude plan can submit at [claude.ai/directory/manage](https://claude.ai/directory/manage) ([claude.com/docs/directory/publish](https://claude.com/docs/directory/publish)). Approved plugins also mirror into the `claude-community` marketplace, which lists 2,283 plugins (my tally of [its marketplace.json](https://github.com/anthropics/claude-plugins-community)). The first blocker: each plugin folder needs a README of at least 40 words, and none of the 28 has one. The second: each plugin goes in its own submission. The third: a name another organization already uses is blocked. `skill-creator` and `playwright` are taken in `claude-plugins-official`, and `email-triage` is taken in `claude-community` (my tally against both marketplace.json files). See the [pre-submission checklist](https://claude.com/docs/plugins/pre-submission-checklist).
5. **The vault-template niche is open at the top.** No Obsidian or vault template comes near the top 20. The largest Obsidian plus Claude Code vault repo has 16,131 stars (AgriciDaniel/claude-obsidian). The `personal-operating-system` topic holds 18 repos and `obsidian-template` holds 127 (GitHub Search API, my tally). **[inference]** Sovereign Ecosystem can reach the first screen of these topic pages with a modest star count.

### The 10 moves, ranked

Ranked by reach per hour of work. Moves 1 to 4 are repo changes, not submissions. They come first because every listing after them reads the files they fix. This report changes no files. It recommends.

| # | Move | Why it matters | Exact path |
|---|---|---|---|
| 1 | Add `name:` to the 12 SKILL.md files missing it, matching each folder name | Makes those 12 visible to `npx skills`, skills.sh and SkillsMP. Required by the [Agent Skills spec](https://agentskills.io/specification) | Edit frontmatter in `plugins/<slug>/skills/<slug>/SKILL.md` for: customer-follow-up, daily-admin-orchestrator, email-triage, grant-manager, grant-researcher, invoice-payment-tracker, pattern-harvest, quote-builder, social-batch-drafting, social-batch-queue, source-harvest, website-builder. Run `claude plugin validate` after |
| 2 | Commit `.claude-plugin/marketplace.json` at the repo root, mirroring `public/marketplace.json` | `/plugin marketplace add InfiniteGamePlayer/infinitegameos` starts working. Crawlers then list IGOS as a marketplace ([Claude Code docs](https://code.claude.com/docs/en/plugin-marketplaces)) | New file in InfiniteGamePlayer/infinitegameos. Keep `name: igos-library`. Validate with `claude plugin validate .` |
| 3 | Replace the boilerplate README with a library README | Crawlers, awesome-list reviewers and GitHub visitors all land here first. Top projects put the install command in the first screen (section 4) | `README.md` in the repo. Lead with one factual sentence, then `/plugin marketplace add InfiniteGamePlayer/infinitegameos` and `npx skills add InfiniteGamePlayer/infinitegameos`, then a one-line table of the 28 skills |
| 4 | Fill in the repo's About panel on both repos | Topics feed GitHub topic pages and topic-scanning lists. The homepage field links crawlers back to the canonical site | GitHub repo page > About (gear icon). infinitegameos topics: `claude-code`, `claude-code-plugin`, `agent-skills`, `claude-skills`, `claude-code-marketplace`, `claude-code-skills`. Homepage: `https://www.infinitegameos.io`. Description without em dash. Sovereign Ecosystem: add `personal-operating-system`, `obsidian-template`, `claude-code-plugin` and the homepage `https://www.infinitegameos.io/sovereign-ecosystem` |
| 5 | Submit three distinctive plugins to Anthropic's directory | The only route into Claude's own Discover surfaces and the `claude-community` marketplace | Add a README (40+ words) to `plugins/source-harvest/`, `plugins/plan-challenger/` and `plugins/pattern-harvest/`. Run `claude plugin validate ./plugins/<slug> --strict`. Then [claude.ai/directory/manage](https://claude.ai/directory/manage) > Submit new > Plugin bundle > repo `InfiniteGamePlayer/infinitegameos`, path `plugins/<slug>`. One plugin per submission. Needs a paid plan |
| 6 | Put the `npx skills add` command and the skills.sh badge on each skill page and in the README | skills.sh ranks only by CLI install telemetry ([skills.sh/docs/faq](https://skills.sh/docs/faq)). It shows IGOS today as "1 skill, 1 total installs" ([skills.sh/infinitegameplayer/infinitegameos](https://skills.sh/infinitegameplayer/infinitegameos)) | No submission. Badge markup: `[![skills.sh](https://skills.sh/b/InfiniteGamePlayer/infinitegameos)](https://skills.sh/InfiniteGamePlayer/infinitegameos)` |
| 7 | Recommend Sovereign Ecosystem to awesome-claude-code's Obsidian subcategory | 57,199 stars. It already has an Obsidian subcategory. Sovereign Ecosystem qualifies under the "14 days old AND active development" rule (created 2026-03-09, pushed 2026-11-04) | Web issue form only, written by a human: [github.com/hesreallyhim/awesome-claude-code/issues/new?template=recommend-resource.yml](https://github.com/hesreallyhim/awesome-claude-code/issues/new?template=recommend-resource.yml). One resource at a time. One line, no emojis, a description and not a pitch. Submit IGOS later, as a separate recommendation |
| 8 | Submit the marketplace to claudemarketplaces.com and claim the ClaudePluginHub listing | claudemarketplaces reports "~380,000 unique monthly visitors" (its llms.txt) and runs the "This week in Claude" newsletter. ClaudePluginHub gives a verified-owner badge | Free submit after GitHub sign-in: `https://claudemarketplaces.com/submit?repo=https://github.com/InfiniteGamePlayer/infinitegameos&type=marketplace`. ClaudePluginHub: sign in with GitHub to claim repos you own ([claudepluginhub.com](https://www.claudepluginhub.com)). Skip the $4 priority option |
| 9 | Post Sovereign Ecosystem in the Obsidian forum's Workflows & templates subcategory | The best-fit free venue for a vault template. Obsidian's community directory takes plugins and themes only, so templates have no other official shelf | [forum.obsidian.md/c/share-showcase/9](https://forum.obsidian.md/c/share-showcase/9) > Workflows & templates (1,904 topics). The Code of Conduct expects members to "engage meaningfully before promoting their work" |
| 10 | Write one substantive post for r/ClaudeCode with the "Built with Claude Code" flair, then pitch Latent Space | r/ClaudeCode allows standalone posts for "a project with enough substance for a proper write-up" (pinned Weekly Showcase, 2026-11-02). Latent Space is the only newsletter found with a public tips address | Reddit: post with the flair, or a comment in the Weekly Showcase thread. Include what was built, how Claude Code was used, a link and lessons learned. No affiliate links. Newsletter: tips@latent.space ([latent.space/about](https://www.latent.space/about)). Both are for Lane to send by hand |

**Moves to hold until the star floors are met.** travisvn/awesome-claude-skills closes PRs from repos under 10 stars. heilcheng/awesome-agent-skills needs 20 stars and 14 days. VoltAgent/awesome-agent-skills wants "real community usage". All three are in section 3.

**Moves to skip.** mcpmarket.com sells its "Official badge" for $29. mcp.so charges $39 for "Publish immediately without review". ClaudePluginHub sells a "Sparks" boost. **[inference]** None of these fits a library whose authority rests on substance, and a reader who knows the market reads those badges as paid.

**One licensing decision for Lane.** IGOS skills are CC-BY-4.0. aitmpl/claude-code-templates licenses contributions as MIT, and Docker's MCP catalog prefers MIT or Apache. A PR to those catalogs means relicensing the copy you contribute. Anthropic's directory, skills.sh, SkillsMP and the awesome-lists accept CC-BY-4.0 as long as the license is declared.

---

## 2. Where people find, share and rate skills and plugins

### 2.1 Official (Anthropic and the open standard)

| Venue | Link | Size signal | What it takes to be listed | How listings are ranked or featured |
|---|---|---|---|---|
| Anthropic directory and Claude Marketplace site | [claude.com/marketplace/plugins](https://claude.com/marketplace/plugins), portal [claude.ai/directory/manage](https://claude.ai/directory/manage) | "Claude Code 528 plugins" (published, filter label) | Paid plan (Pro, Max, Ultra, Team, Enterprise). Public GitHub repo. Plugin bundle only: "Skills aren't a submission type on their own. Put them in a bundle." LICENSE or `license` in plugin.json. README of 40+ words. Unique name. Automated scan plus human review of each new listing. 10 submissions per org per 24 hours ([publish docs](https://claude.com/docs/directory/publish), [checklist](https://claude.com/docs/plugins/pre-submission-checklist)) | Install counts shown. "Anthropic verified" label and placement are decided by Anthropic during review. "There's no separate application for the Verified label" |
| claude-plugins-official | [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) | 46,010 stars. 315 plugins (my tally of marketplace.json) | "Doesn't take submissions through the directory portal. If you work with an Anthropic partner contact, ask them" ([code.claude.com publish docs](https://code.claude.com/docs/en/plugins/publish)) | Added to every Claude Code install by default. Shown in `/plugin` > Discover |
| claude-community | [anthropics/claude-plugins-community](https://github.com/anthropics/claude-plugins-community) | 4,823 stars. 2,283 plugins (my tally) | Read-only mirror of approved portal submissions, synced nightly. "Pull requests opened directly against this repo are closed automatically" | None in the repo |
| anthropics/skills | [github.com/anthropics/skills](https://github.com/anthropics/skills) | 187,152 stars | No submission path. "As we see awesome example skills from partners, we may highlight some of them here" | Editorial |
| Agent Skills spec | [agentskills.io](https://agentskills.io) | agentskills/agentskills 26,921 stars | A spec, not a registry. Requires `name` (max 64, lowercase, hyphens, must match folder) and `description` (max 1024) | n/a |

### 2.2 Community registries and directories

| Venue | Link | Size signal (published unless noted) | What it takes to be listed | Ranking or featuring |
|---|---|---|---|---|
| skills.sh (Vercel) | [skills.sh](https://skills.sh) | Top skill 4.2M installs. "All Time (1,241,680)" header, unlabelled | Automatic. "Skills appear on the leaderboard automatically through anonymous telemetry when users run npx skills add" | All Time, Trending (24h), Hot by install telemetry. "Official" creator list. Security audits from Gen, Socket and Snyk |
| SkillsMP | [skillsmp.com](https://skillsmp.com) (read via [llms.txt](https://skillsmp.com/llms.txt) and API) | "3,000,000+ Agent Skills" | Automatic crawl of public GitHub. No submit path found | Sort by stars (default) or recent |
| claude-plugins.dev | [claude-plugins.dev](https://claude-plugins.dev) | "11,989 Claude Code plugins and 63,065 agent skills" ([README](https://github.com/Kamalnrf/claude-plugins)) | Automatic index of public GitHub | Relevance, Most Downloads, Most Stars |
| claudemarketplaces.com | [claudemarketplaces.com](https://claudemarketplaces.com) | 23,379 skills, 12,743 servers, 3,126 marketplaces (homepage) | Crawl plus [/submit](https://claudemarketplaces.com/submit) after GitHub sign-in. Free, or $4 priority review | "Ranked by real installs". Editor picks. Sponsored slots labelled |
| ClaudePluginHub | [claudepluginhub.com](https://www.claudepluginhub.com) | "110,384 plugins indexed, 722,301 skill files" | Auto-discovery plus [/tools/submit-plugin](https://www.claudepluginhub.com/tools/submit-plugin). Claim via GitHub | By copies (7-day, all-time, per stack). Verified owner badge. Paid "Sparks" boost |
| Skills Directory | [skillsdirectory.com](https://www.skillsdirectory.com) | "679,472 indexed skills" from "14,070 authors" | Auto plus [app.skillsdirectory.com/submit](https://app.skillsdirectory.com/submit) | A to F security grade. "Sponsors can never buy grades" |
| MCP Market (skills) | [mcpmarket.com/tools/skills](https://mcpmarket.com/tools/skills) | "378,916 Skills" | [/submit](https://mcpmarket.com/submit): free queue "Avg. 4-6 week" or $29 with "Official badge". Paid skill sales at /sell | Top 100, Official, Featured. The badge is bought |
| LobeHub Skills | [lobehub.com/skills](https://lobehub.com/skills) | "334,471 Skills" on page, "361632+" in llms.txt | Publish SKILL.md bundles via its market CLI (steps need JS, not read) | Most Installed, Featured, star ratings |
| SkillHub | [skillhub.club](https://www.skillhub.club) | "155.6K Published skills" | Syncs from openclaw/skills and ClawHub | AI quality grades |
| ClawHub (OpenClaw) | [clawhub.ai](https://clawhub.ai) | openclaw/clawhub 9,544 stars | CLI: `clawhub login`, `clawhub skill publish ./my-skill`. Hidden until security checks pass | Featured, Trending, Official, New |
| aitmpl / claude-code-templates | [aitmpl.com](https://www.aitmpl.com) | 908 skills, 1,939 components ([version.json](https://www.aitmpl.com/api/v1/version.json)). "1,340,064 Downloads" | PR to [davila7/claude-code-templates](https://github.com/davila7/claude-code-templates) under `cli-tool/components/skills/{category}/{name}/`. MIT | Downloads, trending |
| Build with Claude | [buildwithclaude.com](https://buildwithclaude.com) | "30,500+ plugins, 8,800+ skills, 7,800+ MCP servers" indexed | PR to [davepoon/buildwithclaude](https://github.com/davepoon/buildwithclaude) at `plugins/all-skills/skills/<name>/SKILL.md` | Curated picks |
| Tessl Registry | [tessl.io/registry](https://tessl.io/registry) | Not published | Submit at tessl.io/registry/skills/submit (login) | Quality, Impact and Security (Snyk) scores |
| github/awesome-copilot | [awesome-copilot.github.com](https://awesome-copilot.github.com/skills) | 40,774 stars. 455 skills (my tally of its llms.txt) | PR per CONTRIBUTING "Adding Skills". External plugins use a review workflow | Curated |
| Cursor Marketplace | [cursor.com/marketplace](https://cursor.com/marketplace) | Not published | "Manually reviewed". "A small group of trusted partners" | Featured, Recently added |
| openai/skills | [github.com/openai/skills](https://github.com/openai/skills) | 28,502 stars | No external path | Curated |

### 2.3 Subagent collections

| Venue | Link | Size signal | Listing | Ranking |
|---|---|---|---|---|
| wshobson/agents | [github.com/wshobson/agents](https://github.com/wshobson/agents) | 42,165 stars. "94 plugins... 202 agents, 185 skills" | Single author | Catalog groups |
| VoltAgent/awesome-claude-code-subagents | [link](https://github.com/VoltAgent/awesome-claude-code-subagents) | 26,319 stars. "161+" subagents | PR with agent file, README rows and version bumps. Self-promotional PRs rejected. Paid sponsor slots | Categories |
| subagents.cc | [subagents.cc](https://subagents.cc) | Top agent "2929 downloads". Footer "© 2025" | Sign in, "Submit an Agent" | Downloads |
| 0xfurai/claude-code-subagents | [link](https://github.com/0xfurai/claude-code-subagents) | 1,022 stars. Last push 2025-10-15 | Add an .md to `agents/` | None |

### 2.4 MCP server venues

IGOS ships no MCP server today. These matter only if one ships.

| Venue | Link | Size signal | Listing | Ranking |
|---|---|---|---|---|
| Official MCP Registry | [registry.modelcontextprotocol.io](https://registry.modelcontextprotocol.io) | 56,221 servers (my tally, full pagination of `/v0.1/servers?version=latest`) | `mcp-publisher init`, `login`, `publish` with a `server.json`. Namespace `io.github.<user>/...`. No PRs. "Preview" | None by design. Aggregators add ratings |
| Glama | [glama.ai/mcp/servers](https://glama.ai/mcp/servers) | "115,381 servers" | GitHub OAuth "Add Server", or auto from GitHub and the Registry. Optional `glama.json` | A to F license, quality and maintenance grades. Usage, downloads, stars |
| punkpeye/awesome-mcp-servers | [link](https://github.com/punkpeye/awesome-mcp-servers) | 97,267 stars. 4,632 entry lines (my tally) | PR, one line, alphabetical in category | Alphabetical, Glama score badge |
| Docker MCP Catalog | [hub.docker.com/mcp](https://hub.docker.com/mcp) | 329 servers (my tally of [docker/mcp-registry](https://github.com/docker/mcp-registry)) | PR with `server.yaml`. Docker review. "MIT or Apache 2 are great, GPL is not" | Curated |
| mcp.so | [mcp.so](https://mcp.so) | "Unique visitors (12 mo) 2.2M" | $39 paid submission, "without review" | Search demand, stars, quality checks. Paid featuring |
| PulseMCP | [pulsemcp.com/servers](https://www.pulsemcp.com/servers) | "21,602 servers" | "New server submissions... still paused" | Recommended, popularity |
| Smithery | [smithery.ai](https://smithery.ai) | "214 servers" | No public path. Proxy shut down Oct 31, 2026. Now part of Arcade | Curated |
| Anthropic connectors | [claude.com/docs/connectors/directory](https://claude.com/docs/connectors/directory.md) | Not published | Portal submission. Remote HTTPS, OAuth where needed. "The directory no longer accepts local servers packaged as MCP Bundles (MCPB)" | "Usage-based". Community or Verified |

### 2.5 Obsidian and vault-template venues

| Venue | Link | Size signal | Listing | Ranking |
|---|---|---|---|---|
| Obsidian community directory | [community.obsidian.md](https://community.obsidian.md) | "9,888 plugins and 975 themes". AI category 1,172 | Plugins and themes only. No template category. Submit at community.obsidian.md with README, LICENSE and manifest.json. Automatic review | Popular, New, Updated. Downloads |
| Obsidian forum, Share & showcase | [forum.obsidian.md/c/share-showcase/9](https://forum.obsidian.md/c/share-showcase/9) | 3,610 topics all time. Workflows & templates 1,904. Forum 102,770 users | Any account. Code of Conduct applies | Likes, views |
| Obsidian Hub | [publish.obsidian.md/hub](https://publish.obsidian.md/hub) | Vaults section holds 11 notes (my tally). Last commit 2026-06-02 | PR using the `T - Templates` template | None. Low activity |
| Gumroad | [gumroad.com/discover](https://gumroad.com/discover) | 50 results for "obsidian claude code", 113 for "obsidian template" (API `total`) | Seller account | Ratings count and average |
| GitHub topics | [github.com/topics](https://github.com/topics) | See 3.2 | Add topics in the repo About panel | Stars or recent update |

---

## 3. GitHub: awesome-lists and topics

### 3.1 Awesome-lists

| List | Stars | Last push | How to get listed | Ordering |
|---|---|---|---|---|
| [punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) | 97,267 | 2026-11-02 | PR, one line | Alphabetical in category, emoji legend |
| [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) | 78,687 | 2026-09-18 | PR adding `skill-name/SKILL.md` plus a README line. Skill is hosted in the list repo | Alphabetical in category, no emojis |
| [hesreallyhim/awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) | 57,199 | 2026-11-04 | Issue form only. "Do not open a PR." 14 days old with active development, or 100 stars. "Created by human beings." Not possible via `gh` | Categories incl. an Obsidian subcategory. "Start Here" and "Recently Added" panels |
| [sickn33/agentic-awesome-skills](https://github.com/sickn33/agentic-awesome-skills) | 49,112 | 2026-11-03 | PR with three evidence sections and CI preflight | Hosted in repo |
| [VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills) | 36,819 | 2026-11-02 | PR, one line, "10 words or fewer", "real community usage". Title `Add skill: author/skill-name` | Appended to category end |
| [travisvn/awesome-claude-skills](https://github.com/travisvn/awesome-claude-skills) | 15,694 | 2026-04-28 | PR. Under 10 stars "closed automatically". No AI-assisted PRs. No SaaS wrappers | Tables |
| [BehiSecc/awesome-claude-skills](https://github.com/BehiSecc/awesome-claude-skills) | 10,347 | 2026-11-02 | Fork and PR | Informal |
| [heilcheng/awesome-agent-skills](https://github.com/heilcheng/awesome-agent-skills) | 6,340 | 2026-11-02 | PR. 20 stars and 14 days. Must contain SKILL.md | End of category |
| [composio-community/awesome-claude-plugins](https://github.com/composio-community/awesome-claude-plugins) | 1,978 | 2026-07-26 | PR adding the plugin folder | n/a |
| [quemsah/awesome-claude-plugins](https://github.com/quemsah/awesome-claude-plugins) | 1,534 | 2026-11-03 | No submission. Automated top 100 from "54226 total repositories indexed" | Stars |
| [karanb192/awesome-claude-code-mods](https://github.com/karanb192/awesome-claude-code-mods) | 857 | 2026-11-04 | Automatic scan of the `claude-code-mod` topic, validated with `claude plugin validate`. Featured slot via issue form | Featured |
| [jqueryscript/awesome-claude-code](https://github.com/jqueryscript/awesome-claude-code) | 544 | 2026-10-29 | "Under Construction". Maintainer adds weekly batches | Static star counts |

### 3.2 GitHub topic counts

My tally from `gh api search/repositories -f q='topic:X'`, `total_count`, 2026-11-04.

| Topic | Repos | Topic | Repos |
|---|---|---|---|
| claude-code | 109,485 | claude-code-skills | 2,457 |
| mcp-server | 40,666 | subagents | 1,788 |
| agent-skills | 38,970 | claude-code-plugins | 942 |
| skills | 16,044 | claude-code-mod | 879 |
| claude-skills | 14,191 | obsidian-vault | 799 |
| claude-code-plugin | 13,626 | claude-code-marketplace | 610 |
| agent-skill | 6,333 | obsidian-template | 127 |
| claude-plugin | 3,188 | claude-code-subagents | 111 |
| second-brain | 2,628 | personal-operating-system | 18 |

The singular `claude-code-plugin` has about 14 times the repos of the plural. `agent-skills` has about 6 times the singular. **[inference]** Those two spellings are the ones people search and browse.

---

## 4. The 20 most-starred skill and template projects

**Inclusion rule.** The repo's main deliverable installs into Claude Code: SKILL.md skills, plugins, marketplaces, subagent packs, CLAUDE.md templates or vault templates. Link-only lists, agent frameworks, standalone CLIs or MCP servers, end-user apps, guides and archived repos are excluded. The candidate pool came from GitHub Search API sweeps across the topics in 3.2 plus keyword sweeps, all on 2026-11-04. A high-star repo with none of those topics or keywords could be missed. "Mkt" means `.claude-plugin/marketplace.json` returned HTTP 200 on main. "Install line" is the line of the first install command in the raw README.

| # | Repo | Stars | License | What it is | Mkt | Install line |
|---|---|---|---|---|---|---|
| 1 | [obra/superpowers](https://github.com/obra/superpowers) | 311,932 | MIT | Skills methodology | yes | 58 |
| 2 | [mattpocock/skills](https://github.com/mattpocock/skills) | 311,615 | MIT | Personal skills collection | yes | 35 |
| 3 | [affaan-m/ECC](https://github.com/affaan-m/ECC) | 296,609 | MIT | Harness optimization skills | yes | 176 |
| 4 | [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) | 229,152 | none detected | Single CLAUDE.md template | yes | 105 |
| 5 | [anthropics/skills](https://github.com/anthropics/skills) | 187,152 | none detected | Official example skills | yes | 36 |
| 6 | [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) | 183,837 | MIT | Single behavior skill | yes | 153 |
| 7 | [msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents) | 166,348 | MIT | Subagent pack | no | ~757 |
| 8 | [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | 144,824 | MIT | Design skill | yes | 259 |
| 9 | [garrytan/gstack](https://github.com/garrytan/gstack) | 138,894 | MIT | Role-based skill pack | no | 31 |
| 10 | [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) | 117,258 | Apache-2.0 | Token-reduction skill | yes | 66 |
| 11 | [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) | 113,072 | MIT | 25 engineering skills | yes | 51 |
| 12 | [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | 112,051 | Apache-2.0 | Memory plugin (borderline) | yes | 136 |
| 13 | [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) | 109,567 | MIT | Design-taste skills | yes | 81 |
| 14 | [pbakaus/impeccable](https://github.com/pbakaus/impeccable) | 101,657 | Apache-2.0 | Design vocabulary skill | yes | 8 |
| 15 | [tt-a1i/archify](https://github.com/tt-a1i/archify) | 93,171 | Apache-2.0 | Diagram skill | no | agent prompt at top |
| 16 | [Egonex-AI/Understand-Anything](https://github.com/Egonex-AI/Understand-Anything) | 90,314 | MIT | Knowledge-graph plugin | yes | 110 |
| 17 | [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill) | 66,507 | MIT | Research skill | yes | 29 |
| 18 | [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) | 64,724 | MIT | Diagram skill | yes | 24 |
| 19 | [blader/humanizer](https://github.com/blader/humanizer) | 64,463 | MIT | Writing skill | yes | 39 |
| 20 | [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) | 59,966 | MIT | Output-style skill | yes | agent prompt at top |

Just outside: coreyhaines31/marketingskills 58,335, kepano/obsidian-skills 50,706, wshobson/agents 42,165, davila7/claude-code-templates 33,109.

**Top vault and second-brain templates** (none reach the top 20): [AgriciDaniel/claude-obsidian](https://github.com/AgriciDaniel/claude-obsidian) 16,131, [breferrari/obsidian-mind](https://github.com/breferrari/obsidian-mind) 5,485, [eugeniughelbur/obsidian-second-brain](https://github.com/eugeniughelbur/obsidian-second-brain) 5,139, [kepano/kepano-obsidian](https://github.com/kepano/kepano-obsidian) 4,729, [Ar9av/obsidian-wiki](https://github.com/Ar9av/obsidian-wiki) 3,677, [SamurAIGPT/llm-wiki-agent](https://github.com/SamurAIGPT/llm-wiki-agent) 3,671, [agenticnotetaking/arscontexta](https://github.com/agenticnotetaking/arscontexta) 3,518, [ballred/obsidian-claude-pkm](https://github.com/ballred/obsidian-claude-pkm) 1,888, [huytieu/COG-second-brain](https://github.com/huytieu/COG-second-brain) 1,339, [undefined-ui/second-brain-os](https://github.com/undefined-ui/second-brain-os) 1,205. All MIT. For comparison, [InfiniteGamePlayer/sovereign-ecosystem](https://github.com/InfiniteGamePlayer/sovereign-ecosystem) has 2 stars and MIT.

### What their READMEs and landing pages do well

My tallies across the 20 READMEs, grep on 2026-11-04.

1. **The repo is its own marketplace.** 17 of 20 ship a root `.claude-plugin/marketplace.json`, usually one plugin named after the repo (`caveman@caveman`, `humanizer@humanizer`).
2. **The native install command is the default path.** 16 of 20 show `/plugin marketplace add`. superpowers and mattpocock/skills lead with `@claude-plugins-official`.
3. **Install sits in the first screen.** impeccable puts it on line 8, diagram-design on 24, last30days on 29, gstack on 31 and mattpocock on 35.
4. **They reach every harness.** 17 of 20 mention Codex and 14 mention Cursor. At least 8 offer `npx skills add`. 7 show a skills.sh badge.
5. **Proof comes before adjectives.** 12 of 20 show a before and after, or a with and without. caveman, humanizer and ui-ux-pro-max put a number in the first screen. humanizer cites "16 times out of 16 (#229)" and names a non-goal.
6. **Names are short and shaped like a persona or a command.** `caveman`, `ponytail`, `humanizer`, `/last30days`, `impeccable`. The skill name equals the plugin name.
7. **Collections give one line per skill.** addyosmani puts the description in the install command itself: `--skill code-review-and-quality  # five-axis review before merge`.
8. **They borrow a known idea.** andrej-karpathy-skills quotes Karpathy. claude-obsidian, obsidian-second-brain and obsidian-wiki build on Karpathy's "LLM Wiki" pattern. humanizer grounds itself in Wikipedia's "Signs of AI writing".
9. **Vault templates show the folder tree and the counts.** "15 skills and 3 agents" (claude-obsidian). "35 AI skills, 10 agents" (COG). File-tree code blocks or a Mermaid diagram of the vault.
10. **A few write for machines too.** claude-obsidian opens with an HTML comment that summarizes the project for crawlers. gstack, archify and i-have-adhd lead with a prompt to paste into the agent.

What is rare: tables of contents (only superpowers) and demo GIFs (6 of 26 READMEs fetched).

---

## 5. Naming, metadata and packaging conventions that help discovery

| Layer | Convention | Source | IGOS today |
|---|---|---|---|
| SKILL.md `name` | Required. Lowercase, hyphens, max 64, must match the folder | [agentskills.io/specification](https://agentskills.io/specification) | Missing in 12 of 28 |
| SKILL.md `description` | Required, max 1024. Say what it does and when to use it, with keywords an agent can match. VoltAgent asks for third person and top-level metadata under about 100 tokens | Spec, [VoltAgent README](https://github.com/VoltAgent/awesome-agent-skills) | Present. Most start "Use when", which fits |
| SKILL.md `license`, `compatibility`, `metadata` | Optional fields crawlers can display | Spec | Not used |
| Plugin `name` | Distinctive, not generic, not already used by another organization | [Pre-submission checklist](https://claude.com/docs/plugins/pre-submission-checklist) | `skill-creator`, `playwright` and `email-triage` collide. `researcher`, `systematic-debugging` and `pr-code-review` are generic **[inference: likely held for review]** |
| Plugin README | 40+ words in the plugin folder, prose outside code blocks | Checklist | None of 28 |
| Plugin license | LICENSE file or `license` in plugin.json | Checklist | `CC-BY-4.0` in all 28 plugin.json files |
| Plugin `description`, `author`, `version` | Missing ones raise warnings | Checklist | Present |
| Marketplace file | `.claude-plugin/marketplace.json` at repo root, with `name`, `owner` and `plugins` | [Claude Code docs](https://code.claude.com/docs/en/plugin-marketplaces) | Only at the site URL. 404 in the repo |
| Marketplace `category` | The official marketplace uses functional categories: development 123, productivity 69, database 39 (my tally) | claude-plugins-official marketplace.json | `skill` (27) and `protocol` (1), which describe format rather than use |
| Repo topics | `claude-code`, `claude-code-plugin` (singular), `agent-skills` (plural), plus niche topics | Section 3.2 | None on infinitegameos. 14 on sovereign-ecosystem |
| Repo license detection | A standard LICENSE GitHub can detect. List bots read it | hesreallyhim CONTRIBUTING.md | `NOASSERTION`, because the LICENSE file mixes three sets of terms |
| Pinned launchers | Pin any `npx` or `uvx` package to an exact version | Checklist | Not applicable today |
| skills.sh badge | `https://skills.sh/b/<owner>/<repo>` | [skills.sh](https://skills.sh) | Not used |

**[inference]** On the license, one option keeps the terms and fixes detection: keep the mixed-terms LICENSE at the root, and add a standard CC-BY-4.0 `LICENSE` file inside each plugin folder. The directory checks the plugin folder, and list bots then find a clean file wherever they look.

---

## 6. Community and media spaces

### 6.1 Discord

Member counts come from Discord's public invite lookup, which needs no join.

| Server | Link | Members (online) | Sharing |
|---|---|---|---|
| Claude (official) | [discord.com/invite/6PPFFzqPDZ](https://discord.com/invite/6PPFFzqPDZ) | 136,445 (22,040) | Linked from [claude.com/community](https://claude.com/community) for "project sharing". Channel rules not readable without joining |
| Obsidian Members Group (official) | [discord.gg/obsidianmd](https://discord.gg/obsidianmd) | 194,880 (22,239) | `#updates` needs the developer role ([Obsidian docs](https://docs.obsidian.md/Plugins/Releasing/Submit+your+plugin)) |
| Model Context Protocol (community) | [discord.com/invite/TFE8FmjCdS](https://discord.com/invite/TFE8FmjCdS) | 14,651 (1,825) | Pinned by r/mcp |
| MCP Contributors (official) | [discord.gg/6CSzBmMkjX](https://discord.gg/6CSzBmMkjX) | 5,159 (541) | Contributors only. Not for showcasing |
| ClaudeCode (community) | [discord.com/servers/rclaudecode-1530578814713856011](https://discord.com/servers/rclaudecode-1530578814713856011) | 4,418 | "Share projects, swap workflows" |

### 6.2 Reddit

Reddit blocked direct reads. Sizes come from two third-party trackers that disagree: S is [reddit.sentinel-team.org](https://reddit.sentinel-team.org) (updated 2026-02-17) and G is gummysearch.com (date unclear). Rules come from the safereddit.com mirror of live Reddit, read 2026-11-04.

| Subreddit | Size (S / G) | Sharing rules |
|---|---|---|
| [r/ClaudeAI](https://www.reddit.com/r/ClaudeAI/) | 504,061 / 1.2M | Weekly "Show us what you've created" thread and a showcase megathread. Feed posts need 50 karma. Rule 7: show you built it, how Claude helped, minimal marketing, no affiliate links |
| [r/ClaudeCode](https://www.reddit.com/r/ClaudeCode/) | n/a / 471k | Weekly Showcase thread. Standalone posts with "Built with Claude Code" flair for substantive write-ups |
| [r/ObsidianMD](https://www.reddit.com/r/ObsidianMD/) | 286,361 / 375k | "If your first and only post is to promote your project... you will be immediately banned". Showcase flair |
| [r/ChatGPTCoding](https://www.reddit.com/r/ChatGPTCoding/) | 356,761 / 408k | Weekly self-promotion thread. Disclose affiliation. Comparisons welcome |
| [r/mcp](https://www.reddit.com/r/mcp/) | 91,460 / 127k | Showcase and server flairs |
| [r/PKMS](https://www.reddit.com/r/PKMS/) | 63,688 / 80k | Monthly self-promotion thread. "No AI Slop" rule enforced with bans |

Ranking on Reddit is by upvotes. The r/ClaudeAI mods report that posters under 50 karma "very rarely get any traction".

### 6.3 Forums and launch sites

- **Hacker News Show HN** ([rules](https://news.ycombinator.com/showhn.html)). "For something you've made that other people can play with." "Don't post quickly-generated one-offs." The [guidelines](https://news.ycombinator.com/newsguidelines.html) ban generated or AI-edited text. My tally via the HN Algolia API since 2026-01-01: 3,765 Show HN hits for "claude code", 936 for "claude code skill" and 60 for "obsidian claude". The top skill post reached 337 points ([item 47400868](https://news.ycombinator.com/item?id=47400868)).
- **Anthropic community surfaces.** [claude.com/community](https://claude.com/community) runs ambassador events and a monthly email of "featured projects". No submission form was found. [claude.dev's mods guide](https://claude.dev/blog/getting-started-with-claude-code-mods/) asks builders to share on X or LinkedIn with a GIF.
- **Product Hunt.** Pages blocked. Help-center excerpts say the homepage "is curated by our team".
- **dev.to** has `#claude`, `#claudecode`, `#mcp` and `#agentskills` tags. No counts exposed.

### 6.4 Newsletters

| Newsletter | Size (as published) | Way in |
|---|---|---|
| [The Rundown AI](https://www.therundown.ai/) | "3,500,000+ readers" | None found |
| [TLDR AI](https://tldr.tech/ai) | "1,100,000 readers" | Paid placements only found |
| [The Pragmatic Engineer](https://newsletter.pragmaticengineer.com/about) | "Over 1,100,000 subscribers" | None found |
| [Ben's Bites](https://www.bensbites.com/) | "Over 118,000 subscribers" | None found. Covers "tools worth trying" |
| [Glama MCP newsletter](https://glama.ai/newsletter) | "60,000+ developers" | "Contribute" option (search excerpt) |
| [Why Try AI](https://www.whytryai.com/about) | "Over 17,000 subscribers" | Has covered Obsidian plus Claude Code |
| [Latent Space](https://www.latent.space/about) | Not published | tips@latent.space |
| [Claude Marketplaces, "This week in Claude"](https://claudemarketplaces.com/) | Not published | Listings come from its submit form |
| [Claude Community monthly email](https://claude.com/community) | Not published | No form found |

### 6.5 YouTube

Subscriber counts from channel headers. None of these channels publishes a way to submit tools.

| Channel | Subscribers | Fit |
|---|---|---|
| [Tech With Tim](https://www.youtube.com/@TechWithTim) | 2.11M | Claude Code tutorials |
| [Nate Herk](https://www.youtube.com/@NateHerk) | 1.11M | Claude Code courses |
| [Anthropic](https://www.youtube.com/@anthropic-ai) | 832K | Official |
| [Claude](https://www.youtube.com/@claude) | 698K | Official |
| [Tiago Forte](https://www.youtube.com/@TiagoForte) | 389K | PKM |
| [Linking Your Thinking (Nick Milo)](https://www.youtube.com/@linkingyourthinking) | 379K | "How I Use Obsidian + Claude Cowork to Run My Life". Closest fit for Sovereign Ecosystem **[inference]** |
| [Riley Brown](https://www.youtube.com/@rileybrownai) | 309K | Claude Code workflows |
| [AI Jason](https://www.youtube.com/@AIJasonZ) | 235K | Claude Code mods |
| [Cole Medin](https://www.youtube.com/@ColeMedin) | 231K | "Build Your Own AI Second Brain with Claude Code" |
| [All About AI](https://www.youtube.com/@AllAboutAI) | 227K | Agent and skills content |
| [Chase AI](https://www.youtube.com/@Chase-H-AI) | 182K | Plugin roundups |
| [IndyDevDan](https://www.youtube.com/@indydevdan) | 153K | Agent skills breakdowns |
| [The AI Automators](https://www.youtube.com/@TheAIAutomators) | 67.2K | Single-skill explainers |
| [Zsolt's Visual PKM](https://www.youtube.com/@VisualPKM) | 56.3K | Obsidian plus AI |

X follower counts couldn't be observed (JS walls and 451 errors).

### 6.6 Norms that repeat across spaces

1. Promotion goes in designated threads.
2. Take part before you promote.
3. No affiliate or referral links.
4. Disclose affiliation.
5. Low-effort AI-generated posts are banned more and more (HN, r/PKMS, travisvn, hesreallyhim).

**[inference]** That last norm favors IGOS. The library's voice is distinctive and hand-shaped. Every post and recommendation that goes out under Lane's name works best written by Lane.

---

## 7. Where IGOS stands today

All checks on 2026-11-04.

| Signal | Value | Source |
|---|---|---|
| infinitegameos repo | 1 star, 0 forks, no topics, license `NOASSERTION`, homepage `infinitegameos.vercel.app` | GitHub Search API |
| sovereign-ecosystem repo | 2 stars, 1 fork, 14 topics, MIT, created 2026-03-09 | GitHub Search API |
| your-ais-charter repo | 0 stars, 6 topics | GitHub Search API |
| skills.sh | infinitegameos: "1 skill, 1 total installs" (plan-challenger). sovereign-ecosystem: 1 skill | [skills.sh/infinitegameplayer/infinitegameos](https://skills.sh/infinitegameplayer/infinitegameos) |
| SkillsMP | 38 skills by author `infinitegameplayer`: 21 from sovereign-ecosystem, 17 from infinitegameos, none of the 12 nameless ones (my tally from one search call, limit 50). One indexed entry, `daniel-reyes`, isn't in the current tree **[inference: a stale index]** | [SkillsMP API](https://skillsmp.com/api/v1/skills/search?q=infinitegameplayer&limit=50) |
| Source Harvest copies | SkillsMP also lists `source-harvest` skills by yoelgal (2 repos) and fppfurtado. **[inference]** Either other people adopted the skill, or the name collides. Either way, the name is no longer unique | [SkillsMP API](https://skillsmp.com/api/v1/skills/search?q=source-harvest) |
| Plugins | 28. None has a README. All declare CC-BY-4.0 | Local read of `plugins/` |
| Hosted marketplace | `https://www.infinitegameos.io/marketplace.json` returns 200 | curl |
| Repo marketplace | `.claude-plugin/marketplace.json` returns 404 | curl |

**[inference]** IGOS already has the hardest part: a coherent library, a hosted marketplace and agent-readable pages. The gap is plumbing. Moves 1 to 4 close it in an afternoon, and every listing after that inherits the fix.

---

## Method

- Four parallel research passes covered four areas. One: official and community registries. Two: MCP and Obsidian venues. Three: GitHub lists and top projects. Four: community and media spaces. I checked the IGOS-specific findings myself against the local repo and live endpoints.
- GitHub: `gh api -X GET search/repositories` for stars, licenses, topics and push dates. Raw READMEs and CONTRIBUTING files came from raw.githubusercontent.com.
- Claude Code docs were read as Markdown from code.claude.com and claude.com/docs.
- No forms were submitted. No accounts were created. Nothing was posted or starred. Nobody was contacted.
