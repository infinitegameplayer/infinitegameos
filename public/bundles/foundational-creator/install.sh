#!/usr/bin/env bash
# The Foundational Creator Bundle. Install script.
#
# Adds two Claude Code marketplaces and enables six plugins by editing
# ~/.claude/settings.json (or $CLAUDE_CONFIG_DIR/settings.json) in place.
# Idempotent. Re-runs are safe.
#
# What this installs:
#   - igos-library marketplace (https://www.infinitegameos.io/marketplace.json)
#       - researcher@igos-library
#       - plan-challenger@igos-library
#       - source-harvest@igos-library
#       - skill-creator@igos-library
#       - systematic-debugging@igos-library
#   - marketingskills marketplace (github.com/coreyhaines31/marketingskills)
#       - marketing-skills@marketingskills (40 marketing skills, including
#         Content Strategy and AI SEO)
#
# Source: https://www.infinitegameos.io/bundles/foundational-creator
# License: CC BY 4.0 (this script and the IGOS skills); MIT (marketing-skills)

set -euo pipefail

BUNDLE_VERSION="1.0"
BUNDLE_NAME="The Foundational Creator Bundle"
BUNDLE_URL="https://www.infinitegameos.io/bundles/foundational-creator"

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

Seven Claude Code skills that form the universal substrate for any creator
working with AI agents in 2026. Five IGOS-native plus the marketing-skills
plugin from Corey Haines.

EOF

# 1. Locate settings.json target.
CONFIG_DIR="${CLAUDE_CONFIG_DIR:-$HOME/.claude}"
SETTINGS_FILE="$CONFIG_DIR/settings.json"

step "Settings target: $SETTINGS_FILE"

if [ ! -d "$CONFIG_DIR" ]; then
  mkdir -p "$CONFIG_DIR"
  ok "Created $CONFIG_DIR"
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
    "igos-library": {
      "source": { "source": "url", "url": "https://www.infinitegameos.io/marketplace.json" }
    },
    "marketingskills": {
      "source": { "source": "github", "repo": "coreyhaines31/marketingskills" }
    }
  },
  "enabledPlugins": {
    "researcher@igos-library": true,
    "plan-challenger@igos-library": true,
    "source-harvest@igos-library": true,
    "skill-creator@igos-library": true,
    "systematic-debugging@igos-library": true,
    "marketing-skills@marketingskills": true
  }
}
SNIPPET
  exit 1
fi

# 3. Validate existing settings.json is valid JSON.
if ! jq empty "$SETTINGS_FILE" >/dev/null 2>&1; then
  err "$SETTINGS_FILE is not valid JSON. Aborting to avoid data loss."
  echo "Fix the file, then re-run."
  exit 1
fi

# 4. Backup before edit.
BACKUP_FILE="${SETTINGS_FILE}.foundational-creator-bundle.bak.$(date +%Y%m%d-%H%M%S)"
cp "$SETTINGS_FILE" "$BACKUP_FILE"
ok "Backup written: $BACKUP_FILE"

# 5. Merge marketplaces and plugin enablement.
step "Registering marketplaces and enabling plugins"

MERGED="$(jq '
  .extraKnownMarketplaces = (.extraKnownMarketplaces // {})
    | .extraKnownMarketplaces["igos-library"] = {
        source: { source: "url", url: "https://www.infinitegameos.io/marketplace.json" }
      }
    | .extraKnownMarketplaces["marketingskills"] = {
        source: { source: "github", repo: "coreyhaines31/marketingskills" }
      }
    | .enabledPlugins = (.enabledPlugins // {})
    | .enabledPlugins["researcher@igos-library"] = true
    | .enabledPlugins["plan-challenger@igos-library"] = true
    | .enabledPlugins["source-harvest@igos-library"] = true
    | .enabledPlugins["skill-creator@igos-library"] = true
    | .enabledPlugins["systematic-debugging@igos-library"] = true
    | .enabledPlugins["marketing-skills@marketingskills"] = true
' "$SETTINGS_FILE")"

printf '%s\n' "$MERGED" > "$SETTINGS_FILE"

ok "igos-library marketplace registered"
ok "marketingskills marketplace registered"
ok "researcher@igos-library enabled"
ok "plan-challenger@igos-library enabled"
ok "source-harvest@igos-library enabled"
ok "skill-creator@igos-library enabled"
ok "systematic-debugging@igos-library enabled"
ok "marketing-skills@marketingskills enabled (40 marketing skills, including Content Strategy and AI SEO)"

cat <<EOF

${C_BOLD}Done.${C_RESET}

${C_BOLD}Next step:${C_RESET} restart Claude Code to load the new plugins.
  - CLI: exit and re-launch \`claude\`.
  - VS Code / JetBrains: reload the editor window.

${C_BOLD}Verify:${C_RESET} from inside Claude Code, run \`/plugin\` to see the enabled list.

${C_BOLD}Rollback:${C_RESET} restore from backup if needed:
  cp "$BACKUP_FILE" "$SETTINGS_FILE"

${C_BOLD}Read more:${C_RESET} ${BUNDLE_URL}

EOF
