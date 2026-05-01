#!/usr/bin/env bash
# The Builder Bundle. Install script.
#
# Avatar-specific layer for solo SaaS founders, indie hackers, AI agent
# builders, plugin authors and hardware makers. Assumes the Foundational
# Creator Bundle (https://www.infinitegameos.io/bundles/foundational-creator)
# is already installed. This script does not bring those skills again.
#
# Idempotent. Re-runs are safe.
#
# What this installs:
#   - context7-marketplace marketplace (github.com/upstash/context7)
#       - context7-plugin@context7-marketplace (live documentation injection)
#   - impeccable marketplace (github.com/pbakaus/impeccable)
#       - impeccable@impeccable (1 skill, 23 design-steering commands)
#   - garrytan/gstack repository cloned to $CONFIG_DIR/skills/gstack
#       - /ship, /land-and-deploy, /canary plus 30+ companion commands
#         (CEO review, eng review, QA, retro and more)
#
# Source: https://www.infinitegameos.io/bundles/the-builder
# Licenses: MIT (gstack, Context7); Apache-2.0 (Impeccable);
#           CC BY 4.0 (this script)

set -euo pipefail

BUNDLE_VERSION="1.0"
BUNDLE_NAME="The Builder Bundle"
BUNDLE_URL="https://www.infinitegameos.io/bundles/the-builder"

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

Three avatar-specific Claude Code skills for functional-output creators in
2026: gstack (the deploy ritual plus a wider engineering-team toolkit),
Context7 (live documentation injection) and Impeccable (design steering).

Assumes the Foundational Creator Bundle is already installed. If not, run
${C_DIM}https://www.infinitegameos.io/bundles/foundational-creator${C_RESET} first.

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
    "context7-marketplace": {
      "source": { "source": "github", "repo": "upstash/context7" }
    },
    "impeccable": {
      "source": { "source": "github", "repo": "pbakaus/impeccable" }
    }
  },
  "enabledPlugins": {
    "context7-plugin@context7-marketplace": true,
    "impeccable@impeccable": true
  }
}
SNIPPET
  echo
  echo "Then clone gstack manually:"
  echo "  git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git \"\$HOME/.claude/skills/gstack\""
  echo "  cd \"\$HOME/.claude/skills/gstack\" && ./setup"
  exit 1
fi

# 3. Verify git (required for the gstack clone).
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
BACKUP_FILE="${SETTINGS_FILE}.the-builder-bundle.bak.$(date +%Y%m%d-%H%M%S)"
cp "$SETTINGS_FILE" "$BACKUP_FILE"
ok "Backup written: $BACKUP_FILE"

# 6. Merge marketplaces and plugin enablement.
step "Registering marketplaces and enabling plugins"

MERGED="$(jq '
  .extraKnownMarketplaces = (.extraKnownMarketplaces // {})
    | .extraKnownMarketplaces["context7-marketplace"] = {
        source: { source: "github", repo: "upstash/context7" }
      }
    | .extraKnownMarketplaces["impeccable"] = {
        source: { source: "github", repo: "pbakaus/impeccable" }
      }
    | .enabledPlugins = (.enabledPlugins // {})
    | .enabledPlugins["context7-plugin@context7-marketplace"] = true
    | .enabledPlugins["impeccable@impeccable"] = true
' "$SETTINGS_FILE")"

printf '%s\n' "$MERGED" > "$SETTINGS_FILE"

ok "context7-marketplace registered"
ok "impeccable marketplace registered"
ok "context7-plugin@context7-marketplace enabled"
ok "impeccable@impeccable enabled"

# 7. Install gstack via clone + setup.
GSTACK_DIR="$CONFIG_DIR/skills/gstack"
step "Installing gstack to $GSTACK_DIR"

if [ -d "$GSTACK_DIR/.git" ]; then
  if (cd "$GSTACK_DIR" && git pull --ff-only --quiet); then
    ok "gstack repository updated"
  else
    warn "gstack pull failed. Existing checkout retained."
  fi
else
  if [ -e "$GSTACK_DIR" ]; then
    err "$GSTACK_DIR exists but is not a git checkout. Aborting gstack install."
    echo "Remove or rename $GSTACK_DIR, then re-run this script."
    exit 1
  fi
  mkdir -p "$(dirname "$GSTACK_DIR")"
  if git clone --single-branch --depth 1 --quiet \
      https://github.com/garrytan/gstack.git "$GSTACK_DIR"; then
    ok "gstack repository cloned"
  else
    err "gstack clone failed. Check network and re-run."
    exit 1
  fi
fi

if [ -x "$GSTACK_DIR/setup" ]; then
  step "Running gstack setup"
  if (cd "$GSTACK_DIR" && ./setup); then
    ok "gstack setup completed"
  else
    err "gstack setup returned a non-zero exit code."
    echo "Re-run \`$GSTACK_DIR/setup\` manually to inspect."
    exit 1
  fi
else
  warn "gstack setup script not found or not executable at $GSTACK_DIR/setup."
  warn "Run it manually: cd \"$GSTACK_DIR\" && ./setup"
fi

cat <<EOF

${C_BOLD}Done.${C_RESET}

${C_BOLD}Next step:${C_RESET} restart Claude Code to load the new plugins and gstack commands.
  - CLI: exit and re-launch \`claude\`.
  - VS Code / JetBrains: reload the editor window.

${C_BOLD}Verify:${C_RESET} from inside Claude Code, run \`/plugin\` to see context7-plugin
and impeccable enabled. Try \`/office-hours\` to confirm gstack is loaded.

${C_BOLD}Rollback:${C_RESET}
  - Plugins: cp "$BACKUP_FILE" "$SETTINGS_FILE"
  - gstack:  rm -rf "$GSTACK_DIR"

${C_BOLD}Read more:${C_RESET} ${BUNDLE_URL}

EOF
