#!/usr/bin/env bash
# The Strategist Bundle. Install script.
#
# Avatar-specific layer for independent management consultants, fractional
# executives (CMO, COO, CFO, CTO), frameworks writers, growth strategists,
# decision-systems authors and applied operators. Assumes the Foundational
# Creator Bundle (https://www.infinitegameos.io/bundles/foundational-creator)
# is already installed. This script does not bring those skills again.
#
# Idempotent. Re-runs are safe.
#
# What this installs:
#   - $CONFIG_DIR/skills/management-consulting/  (cloned from
#         gcamilo/management-consulting)
#       - 42 consulting frameworks across strategy, problem-solving,
#         decision-making, financial, operations and innovation. Three
#         output modes (Quick Structure, Full Case, Client Deliverable).
#   - decision-toolkit@glebis-skills marketplace (registered in settings.json)
#       - Structured decision frameworks plus cognitive bias checkers as a
#         dedicated layer.
#   - $CONFIG_DIR/skills/mbb-consultant/  (copied from
#         charlie989898/-mbb-management-consultant-claude-skill)
#       - Pyramid Principle executive communication, market sizing,
#         profitability trees and sector-specific strategy across nine
#         industries.
#
# Source: https://www.infinitegameos.io/bundles/the-strategist
# Licenses: MIT (management-consulting, claude-skills, mbb-management-consultant);
#           CC BY 4.0 (this script)

set -euo pipefail

BUNDLE_VERSION="1.0"
BUNDLE_NAME="The Strategist Bundle"
BUNDLE_URL="https://www.infinitegameos.io/bundles/the-strategist"

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

Three avatar-specific Claude Code skills for structured-thinking creators:
Management Consulting (42 frameworks, three output modes), Decision Toolkit
(decision rigor and bias checkers) and MBB Management Consultant (executive
communication and sector-specific strategy across nine industries).

Assumes the Foundational Creator Bundle is already installed. If not, run
${C_DIM}https://www.infinitegameos.io/bundles/foundational-creator${C_RESET} first.

EOF

# 1. Locate Claude Code config and skills target.
CONFIG_DIR="${CLAUDE_CONFIG_DIR:-$HOME/.claude}"
SETTINGS_FILE="$CONFIG_DIR/settings.json"
SKILLS_DIR="$CONFIG_DIR/skills"

step "Settings target: $SETTINGS_FILE"
step "Skills target:   $SKILLS_DIR"

if [ ! -d "$CONFIG_DIR" ]; then
  mkdir -p "$CONFIG_DIR"
  ok "Created $CONFIG_DIR"
fi

if [ ! -d "$SKILLS_DIR" ]; then
  mkdir -p "$SKILLS_DIR"
  ok "Created $SKILLS_DIR"
fi

if [ ! -f "$SETTINGS_FILE" ]; then
  echo "{}" > "$SETTINGS_FILE"
  ok "Created empty settings.json"
fi

# 2. Verify jq (required for safe JSON merge).
if ! command -v jq >/dev/null 2>&1; then
  err "jq is required but not installed."
  echo
  echo "Install jq, then re-run this script:"
  echo "  macOS:    brew install jq"
  echo "  Ubuntu:   sudo apt install jq"
  echo "  Windows:  winget install jqlang.jq    (or use WSL / Git Bash with jq present)"
  echo
  echo "Alternative manual install: paste the JSON snippet below into $SETTINGS_FILE"
  echo
  cat <<'SNIPPET'
{
  "extraKnownMarketplaces": {
    "glebis-skills": {
      "source": { "source": "github", "repo": "glebis/claude-skills" }
    }
  },
  "enabledPlugins": {
    "decision-toolkit@glebis-skills": true
  }
}
SNIPPET
  echo
  echo "Then clone the two skill repositories manually:"
  echo "  TMP=\$(mktemp -d)"
  echo "  git clone --depth 1 https://github.com/gcamilo/management-consulting.git \\"
  echo "    \"\$HOME/.claude/skills/management-consulting\""
  echo "  git clone --depth 1 https://github.com/charlie989898/-mbb-management-consultant-claude-skill.git \"\$TMP/mbb\""
  echo "  mkdir -p \"\$HOME/.claude/skills/mbb-consultant\""
  echo "  cp -R \"\$TMP/mbb/skill/.\" \"\$HOME/.claude/skills/mbb-consultant/\""
  echo "  rm -rf \"\$TMP\""
  exit 1
fi

# 3. Verify git (required for the clones).
if ! command -v git >/dev/null 2>&1; then
  err "git is required but not installed."
  echo
  echo "Install git, then re-run this script:"
  echo "  macOS:    xcode-select --install   (or brew install git)"
  echo "  Ubuntu:   sudo apt install git"
  echo "  Windows:  winget install Git.Git   (or use Git Bash)"
  exit 1
fi

# 4. Validate existing settings.json is valid JSON.
if ! jq empty "$SETTINGS_FILE" >/dev/null 2>&1; then
  err "$SETTINGS_FILE is not valid JSON. Aborting to avoid data loss."
  echo "Fix the file, then re-run."
  exit 1
fi

# 5. Backup before edit.
BACKUP_FILE="${SETTINGS_FILE}.the-strategist-bundle.bak.$(date +%Y%m%d-%H%M%S)"
cp "$SETTINGS_FILE" "$BACKUP_FILE"
ok "Backup written: $BACKUP_FILE"

# 6. Set up shared temp dir with cleanup trap.
TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

# 7. Install Management Consulting via clone-to-skills-dir.
MC_DIR="$SKILLS_DIR/management-consulting"
step "Installing Management Consulting to $MC_DIR"

if [ -e "$MC_DIR" ]; then
  BACKUP_MC="${MC_DIR}.the-strategist-bundle.bak.$(date +%Y%m%d-%H%M%S)"
  mv "$MC_DIR" "$BACKUP_MC"
  ok "Existing $MC_DIR moved to $BACKUP_MC"
fi

if git clone --single-branch --depth 1 --quiet \
    https://github.com/gcamilo/management-consulting.git "$MC_DIR"; then
  ok "Management Consulting installed"
else
  err "management-consulting clone failed. Check network and re-run."
  exit 1
fi

# 8. Register glebis-skills marketplace and enable decision-toolkit plugin.
step "Registering glebis-skills marketplace and enabling decision-toolkit"

MERGED="$(jq '
  .extraKnownMarketplaces = (.extraKnownMarketplaces // {})
    | .extraKnownMarketplaces["glebis-skills"] = {
        source: { source: "github", repo: "glebis/claude-skills" }
      }
    | .enabledPlugins = (.enabledPlugins // {})
    | .enabledPlugins["decision-toolkit@glebis-skills"] = true
' "$SETTINGS_FILE")"

printf '%s\n' "$MERGED" > "$SETTINGS_FILE"

ok "glebis-skills marketplace registered"
ok "decision-toolkit@glebis-skills enabled"

# 9. Install MBB Management Consultant via clone-to-temp + copy.
MBB_DIR="$SKILLS_DIR/mbb-consultant"
step "Installing MBB Management Consultant to $MBB_DIR"

if [ -e "$MBB_DIR" ]; then
  BACKUP_MBB="${MBB_DIR}.the-strategist-bundle.bak.$(date +%Y%m%d-%H%M%S)"
  mv "$MBB_DIR" "$BACKUP_MBB"
  ok "Existing $MBB_DIR moved to $BACKUP_MBB"
fi

mkdir -p "$MBB_DIR"

if git clone --single-branch --depth 1 --quiet \
    https://github.com/charlie989898/-mbb-management-consultant-claude-skill.git \
    "$TMP_DIR/mbb"; then
  ok "mbb-management-consultant repository fetched"
else
  err "mbb-management-consultant clone failed. Check network and re-run."
  exit 1
fi

if [ -d "$TMP_DIR/mbb/skill" ]; then
  cp -R "$TMP_DIR/mbb/skill/." "$MBB_DIR/"
  ok "MBB Management Consultant installed"
else
  err "Expected skill directory not found in upstream repo."
  echo "Repository layout may have changed. Inspect:"
  echo "  $TMP_DIR/mbb"
  exit 1
fi

cat <<EOF

${C_BOLD}Done.${C_RESET}

${C_BOLD}Next step:${C_RESET} restart Claude Code to load the new plugin and skills.
  - CLI: exit and re-launch \`claude\`.
  - VS Code / JetBrains: reload the editor window.

${C_BOLD}Verify:${C_RESET}
  From inside Claude Code, run \`/plugin\` to see decision-toolkit enabled.
  Try a strategy question and watch Management Consulting offer a framework.
  Ask for an executive summary structured by Pyramid Principle to confirm
  MBB Management Consultant is wired up.

${C_BOLD}Three modes for Management Consulting:${C_RESET}
  Quick Structure for an inline framework hit during a working session.
  Full Case for a complete diagnostic across an engagement.
  Client Deliverable for a polished output ready to present.

${C_BOLD}Rollback:${C_RESET}
  - decision-toolkit plugin: cp "$BACKUP_FILE" "$SETTINGS_FILE"
  - Management Consulting: rm -rf "$MC_DIR"
  - MBB Management Consultant: rm -rf "$MBB_DIR"

${C_BOLD}Read more:${C_RESET} ${BUNDLE_URL}

EOF
