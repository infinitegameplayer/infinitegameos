#!/usr/bin/env bash
# The Performer Bundle. Install script.
#
# Avatar-specific layer for YouTubers, podcasters, livestreamers and
# short-form video creators. Assumes the Foundational Creator Bundle
# (https://www.infinitegameos.io/bundles/foundational-creator) is already
# installed. This script does not bring those skills again, and the Content
# Repurposing layer rides the marketing-skills plugin from the Foundational
# install.
#
# Idempotent. Re-runs are safe.
#
# What this installs:
#   - claude-video marketplace (github.com/bradautomates/claude-video)
#       - watch@claude-video (give Claude the ability to watch a video)
#   - $CONFIG_DIR/skills/youtube/  (copied from AgriciDaniel/claude-youtube)
#       - YouTube Channel Manager: audits, video SEO, retention scripts,
#         hook architecture, thumbnails, Shorts optimization, analytics,
#         monetization, competitor research, cross-platform repurposing
#
# Already in your Foundational substrate (no install needed):
#   - marketing-skills@marketingskills includes a video production chapter
#     covering AI video generation, programmatic video, AI avatars and
#     platform-specific cut design.
#
# Source: https://www.infinitegameos.io/bundles/the-performer
# Licenses: MIT (claude-video, claude-youtube); CC BY 4.0 (this script)

set -euo pipefail

BUNDLE_VERSION="1.0"
BUNDLE_NAME="The Performer Bundle"
BUNDLE_URL="https://www.infinitegameos.io/bundles/the-performer"

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

Two avatar-specific Claude Code skills for recorded-media creators in 2026:
YouTube Channel Manager (audits, SEO, retention scripts, thumbnails, Shorts
and more) and Video Watcher (give Claude the ability to actually watch a
video, extract frames and transcribe audio).

Content Repurposing rides the marketing-skills plugin already installed via
the Foundational Creator Bundle, so it is not re-installed here.

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
    "claude-video": {
      "source": { "source": "github", "repo": "bradautomates/claude-video" }
    }
  },
  "enabledPlugins": {
    "watch@claude-video": true
  }
}
SNIPPET
  echo
  echo "Then clone the YouTube Channel Manager skill manually:"
  echo "  TMP=\$(mktemp -d)"
  echo "  git clone --depth 1 https://github.com/AgriciDaniel/claude-youtube.git \"\$TMP/claude-youtube\""
  echo "  mkdir -p \"\$HOME/.claude/skills/youtube\""
  echo "  cp -R \"\$TMP/claude-youtube/skills/claude-youtube/.\" \"\$HOME/.claude/skills/youtube/\""
  echo "  rm -rf \"\$TMP\""
  exit 1
fi

# 3. Verify git (required for the YouTube Channel Manager clone).
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
BACKUP_FILE="${SETTINGS_FILE}.the-performer-bundle.bak.$(date +%Y%m%d-%H%M%S)"
cp "$SETTINGS_FILE" "$BACKUP_FILE"
ok "Backup written: $BACKUP_FILE"

# 6. Merge claude-video marketplace and enable watch@claude-video.
step "Registering claude-video marketplace and enabling watch@claude-video"

MERGED="$(jq '
  .extraKnownMarketplaces = (.extraKnownMarketplaces // {})
    | .extraKnownMarketplaces["claude-video"] = {
        source: { source: "github", repo: "bradautomates/claude-video" }
      }
    | .enabledPlugins = (.enabledPlugins // {})
    | .enabledPlugins["watch@claude-video"] = true
' "$SETTINGS_FILE")"

printf '%s\n' "$MERGED" > "$SETTINGS_FILE"

ok "claude-video marketplace registered"
ok "watch@claude-video enabled"

# 7. Install YouTube Channel Manager via clone-to-temp + copy.
YOUTUBE_DIR="$SKILLS_DIR/youtube"
step "Installing YouTube Channel Manager to $YOUTUBE_DIR"

if [ -e "$YOUTUBE_DIR" ]; then
  BACKUP_YOUTUBE="${YOUTUBE_DIR}.the-performer-bundle.bak.$(date +%Y%m%d-%H%M%S)"
  mv "$YOUTUBE_DIR" "$BACKUP_YOUTUBE"
  ok "Existing $YOUTUBE_DIR moved to $BACKUP_YOUTUBE"
fi

mkdir -p "$YOUTUBE_DIR"

TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

if git clone --single-branch --depth 1 --quiet \
    https://github.com/AgriciDaniel/claude-youtube.git "$TMP_DIR/claude-youtube"; then
  ok "claude-youtube repository fetched"
else
  err "claude-youtube clone failed. Check network and re-run."
  exit 1
fi

if [ -d "$TMP_DIR/claude-youtube/skills/claude-youtube" ]; then
  cp -R "$TMP_DIR/claude-youtube/skills/claude-youtube/." "$YOUTUBE_DIR/"
  ok "YouTube Channel Manager installed"
else
  err "Expected skills/claude-youtube directory not found in upstream repo."
  echo "Repository layout may have changed. Inspect:"
  echo "  $TMP_DIR/claude-youtube"
  exit 1
fi

cat <<EOF

${C_BOLD}Done.${C_RESET}

${C_BOLD}Next step:${C_RESET} restart Claude Code to load the new plugin and skill.
  - CLI: exit and re-launch \`claude\`.
  - VS Code / JetBrains: reload the editor window.

${C_BOLD}Verify:${C_RESET} from inside Claude Code, run \`/plugin\` to see watch enabled.
Try \`/youtube audit\` to confirm the YouTube Channel Manager is loaded.
Try \`/watch <video-url-or-path>\` to confirm Video Watcher is wired up.

${C_BOLD}Already in your Foundational substrate:${C_RESET}
The marketing-skills plugin you installed with the Foundational Creator
Bundle includes a video production chapter. Ask Claude to plan a video,
build a repurposing pipeline or design a multi-platform cut from one
recording. The skill activates without any additional setup.

${C_BOLD}Rollback:${C_RESET}
  - watch plugin: cp "$BACKUP_FILE" "$SETTINGS_FILE"
  - YouTube Channel Manager: rm -rf "$YOUTUBE_DIR"

${C_BOLD}Read more:${C_RESET} ${BUNDLE_URL}

EOF
