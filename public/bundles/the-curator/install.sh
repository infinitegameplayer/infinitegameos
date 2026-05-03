#!/usr/bin/env bash
# The Curator Bundle. Install script.
#
# Avatar-specific layer for newsletter curators, industry digest writers,
# taste-forward newsletter authors, link aggregators and AI-assisted research
# digest curators. Assumes the Foundational Creator Bundle
# (https://www.infinitegameos.io/bundles/foundational-creator) is already
# installed. This script does not bring those skills again.
#
# Idempotent. Re-runs are safe.
#
# What this installs:
#   - $CONFIG_DIR/skills/tech-digest/  (copied from camilleroux/tech-digest)
#       - RSS aggregation, scoring, dedup. /digest 7 for weekly recap or
#         /digest 3 for tighter window. YAML feed list is fully swappable.
#   - $CONFIG_DIR/skills/newsletter-creation-curation/  (copied from
#         BrianRWagner/ai-marketing-claude-code-skills/newsletter-creation-curation)
#       - Editorial production layer. Industry-adaptive newsletter framing,
#         subject lines and synthesis paragraphs.
#
# Note on Content Research Writer (ComposioHQ): omitted from v1 pending
# license confirmation on the upstream repo. Queued for a Kingdom-native
# rebuild in v1.1. The Foundational substrate's Researcher covers the
# deeper analytical context in the meantime.
#
# Source: https://www.infinitegameos.io/bundles/the-curator
# Licenses: MIT (tech-digest, ai-marketing-claude-code-skills); CC BY 4.0 (this script)

set -euo pipefail

BUNDLE_VERSION="1.0"
BUNDLE_NAME="The Curator Bundle"
BUNDLE_URL="https://www.infinitegameos.io/bundles/the-curator"

# Color helpers (no-op if NO_COLOR set or terminal unavailable)
if [ -t 1 ] && [ -z "${NO_COLOR:-}" ]; then
  C_BOLD="$(printf '\033[1m')"
  C_DIM="$(printf '\033[2m')"
  C_OK="$(printf '\033[32m')"
  C_WARN="$(printf '\033[33m')"
  C_ERR="$(printf '\033[31m')"
  C_RESET="$(printf '\033[0m')"
else
  C_BOLD=""; C_DIM=""; C_OK=""; C_WARN=""; C_ERR=""; C_RESET=""
fi

step() { printf "%s==>%s %s\n" "$C_BOLD" "$C_RESET" "$1"; }
ok()   { printf "  %s✓%s %s\n" "$C_OK" "$C_RESET" "$1"; }
warn() { printf "  %s!%s %s\n" "$C_WARN" "$C_RESET" "$1"; }
err()  { printf "  %s✗%s %s\n" "$C_ERR" "$C_RESET" "$1" >&2; }

cat <<EOF

${C_BOLD}${BUNDLE_NAME}${C_RESET} (v${BUNDLE_VERSION})
${C_DIM}${BUNDLE_URL}${C_RESET}

Two avatar-specific Claude Code skills for selection-first creators:
Tech Digest (RSS aggregation, scoring, dedup, structured shortlist) and
Newsletter Creation and Curation (editorial production, framing and
synthesis).

Assumes the Foundational Creator Bundle is already installed. If not, run
${C_DIM}https://www.infinitegameos.io/bundles/foundational-creator${C_RESET} first.

EOF

# 1. Locate Claude Code config and skills target.
CONFIG_DIR="${CLAUDE_CONFIG_DIR:-$HOME/.claude}"
SKILLS_DIR="$CONFIG_DIR/skills"

step "Skills target: $SKILLS_DIR"

if [ ! -d "$CONFIG_DIR" ]; then
  mkdir -p "$CONFIG_DIR"
  ok "Created $CONFIG_DIR"
fi

if [ ! -d "$SKILLS_DIR" ]; then
  mkdir -p "$SKILLS_DIR"
  ok "Created $SKILLS_DIR"
fi

# 2. Verify git (required for both clones).
if ! command -v git >/dev/null 2>&1; then
  err "git is required but not installed."
  echo
  echo "Install git, then re-run this script:"
  echo "  macOS:    xcode-select --install   (or brew install git)"
  echo "  Ubuntu:   sudo apt install git"
  echo "  Windows:  winget install Git.Git   (or use Git Bash)"
  exit 1
fi

# 3. Set up shared temp dir with cleanup trap.
TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

# 4. Install Tech Digest via clone-to-temp + copy.
TECH_DIGEST_DIR="$SKILLS_DIR/tech-digest"
step "Installing Tech Digest to $TECH_DIGEST_DIR"

if [ -e "$TECH_DIGEST_DIR" ]; then
  BACKUP_TECH="${TECH_DIGEST_DIR}.the-curator-bundle.bak.$(date +%Y%m%d-%H%M%S)"
  mv "$TECH_DIGEST_DIR" "$BACKUP_TECH"
  ok "Existing $TECH_DIGEST_DIR moved to $BACKUP_TECH"
fi

mkdir -p "$TECH_DIGEST_DIR"

if git clone --single-branch --depth 1 --quiet \
    https://github.com/camilleroux/tech-digest.git "$TMP_DIR/tech-digest"; then
  ok "tech-digest repository fetched"
else
  err "tech-digest clone failed. Check network and re-run."
  exit 1
fi

if [ -d "$TMP_DIR/tech-digest/skills/digest" ]; then
  cp -R "$TMP_DIR/tech-digest/skills/digest/." "$TECH_DIGEST_DIR/"
  ok "Tech Digest installed"
else
  err "Expected skills/digest directory not found in upstream repo."
  echo "Repository layout may have changed. Inspect:"
  echo "  $TMP_DIR/tech-digest"
  exit 1
fi

# 5. Install Newsletter Creation and Curation via clone-to-temp + copy.
NEWSLETTER_DIR="$SKILLS_DIR/newsletter-creation-curation"
step "Installing Newsletter Creation and Curation to $NEWSLETTER_DIR"

if [ -e "$NEWSLETTER_DIR" ]; then
  BACKUP_NEWS="${NEWSLETTER_DIR}.the-curator-bundle.bak.$(date +%Y%m%d-%H%M%S)"
  mv "$NEWSLETTER_DIR" "$BACKUP_NEWS"
  ok "Existing $NEWSLETTER_DIR moved to $BACKUP_NEWS"
fi

mkdir -p "$NEWSLETTER_DIR"

if git clone --single-branch --depth 1 --quiet \
    https://github.com/BrianRWagner/ai-marketing-claude-code-skills.git \
    "$TMP_DIR/ai-marketing"; then
  ok "ai-marketing-claude-code-skills repository fetched"
else
  err "ai-marketing-claude-code-skills clone failed. Check network and re-run."
  exit 1
fi

if [ -d "$TMP_DIR/ai-marketing/newsletter-creation-curation" ]; then
  cp -R "$TMP_DIR/ai-marketing/newsletter-creation-curation/." "$NEWSLETTER_DIR/"
  ok "Newsletter Creation and Curation installed"
else
  err "Expected newsletter-creation-curation directory not found in upstream repo."
  echo "Repository layout may have changed. Inspect:"
  echo "  $TMP_DIR/ai-marketing"
  exit 1
fi

cat <<EOF

${C_BOLD}Done.${C_RESET}

${C_BOLD}Next step:${C_RESET} restart Claude Code to load the new skills.
  - CLI: exit and re-launch \`claude\`.
  - VS Code / JetBrains: reload the editor window.

${C_BOLD}Verify:${C_RESET}
  Try \`/digest 7\` to confirm Tech Digest is loaded.
  Ask Claude to draft an editorial frame for a curated link to confirm
  Newsletter Creation and Curation is wired up.

${C_BOLD}First-run configuration:${C_RESET}
  Tech Digest ships with developer-niche feed defaults (Hacker News,
  Lobste.rs). Edit the feed list YAML inside ${TECH_DIGEST_DIR} to point
  at your niche sources. The skill is feed-list-driven, not topic-locked.

${C_BOLD}On the deferred third skill:${C_RESET}
  The Curator avatar research names a third skill, Content Research Writer
  from ComposioHQ, for deeper analytical synthesis. The upstream repo does
  not specify a license, so v1 omits it pending confirmation. The eight-
  capability research-to-draft model is queued for a Kingdom-native rebuild.
  Until then, the Foundational substrate's Researcher covers deeper context.

${C_BOLD}Rollback:${C_RESET}
  - Tech Digest: rm -rf "$TECH_DIGEST_DIR"
  - Newsletter Creation and Curation: rm -rf "$NEWSLETTER_DIR"

${C_BOLD}Read more:${C_RESET} ${BUNDLE_URL}

EOF
