#!/usr/bin/env bash
# The Writer Bundle. Install script.
#
# Avatar-specific layer for newsletter operators, essayists, ghostwriters,
# indie authors and threadwriters. Assumes the Foundational Creator Bundle
# (https://www.infinitegameos.io/bundles/foundational-creator) is already
# installed. This script does not bring those skills again.
#
# Idempotent. Re-runs are safe.
#
# What this installs:
#   - $CONFIG_DIR/skills/voice-ghostwriter/  (cloned from BayramAnnakov/founder-voice-ghostwriter)
#       - Voice calibration plus interview-driven extraction and drafting
#   - $CONFIG_DIR/skills/humanizer/SKILL.md  (single file fetched from Aboudjem/humanizer-skill)
#       - 37-pattern AI-writing detector and rewriter, five voice profiles
#
# Companion (not installed by this script, see end of script for the link):
#   - github.com/WomenDefiningAI/claudecode-writer
#       - Workspace template repository. Use the GitHub "Use this template"
#         flow or git clone to set up a writing project. Cannot be installed
#         as a portable skill because the slash commands depend on the
#         workspace folder structure.
#
# Source: https://www.infinitegameos.io/bundles/the-writer
# Licenses: MIT (Voice Ghostwriter, Humanizer, claudecode-writer);
#           CC BY 4.0 (this script)

set -euo pipefail

BUNDLE_VERSION="1.0"
BUNDLE_NAME="The Writer Bundle"
BUNDLE_URL="https://www.infinitegameos.io/bundles/the-writer"

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

Two avatar-specific Claude Code skills for text-first creators in 2026:
Voice Ghostwriter (voice calibration plus interview-driven drafting) and
Humanizer (37-pattern AI-writing detector and rewriter). Plus a companion
workspace template (Multi-Format Content Writer) linked at the end.

Assumes the Foundational Creator Bundle is already installed. If not, run
${C_DIM}https://www.infinitegameos.io/bundles/foundational-creator${C_RESET} first.

EOF

# 1. Locate Claude Code config directory.
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

# 2. Verify git (required for the Voice Ghostwriter clone).
if ! command -v git >/dev/null 2>&1; then
  err "git is required but not installed."
  echo
  echo "Install git, then re-run this script:"
  echo "  macOS:    xcode-select --install   (or brew install git)"
  echo "  Ubuntu:   sudo apt install git"
  echo "  Windows:  winget install Git.Git   (or use Git Bash)"
  exit 1
fi

# 3. Verify curl (required for the Humanizer SKILL.md fetch).
if ! command -v curl >/dev/null 2>&1; then
  err "curl is required but not installed."
  echo
  echo "Install curl, then re-run this script:"
  echo "  macOS:    brew install curl"
  echo "  Ubuntu:   sudo apt install curl"
  echo "  Windows:  winget install curl.curl   (or use Git Bash with curl present)"
  exit 1
fi

# 4. Install Voice Ghostwriter via git clone.
VOICE_DIR="$SKILLS_DIR/voice-ghostwriter"
step "Installing Voice Ghostwriter to $VOICE_DIR"

if [ -d "$VOICE_DIR/.git" ]; then
  if (cd "$VOICE_DIR" && git pull --ff-only --quiet); then
    ok "Voice Ghostwriter repository updated"
  else
    warn "Voice Ghostwriter pull failed. Existing checkout retained."
  fi
else
  if [ -e "$VOICE_DIR" ]; then
    BACKUP_VOICE="${VOICE_DIR}.the-writer-bundle.bak.$(date +%Y%m%d-%H%M%S)"
    mv "$VOICE_DIR" "$BACKUP_VOICE"
    ok "Existing $VOICE_DIR moved to $BACKUP_VOICE"
  fi
  if git clone --single-branch --depth 1 --quiet \
      https://github.com/BayramAnnakov/founder-voice-ghostwriter.git "$VOICE_DIR"; then
    ok "Voice Ghostwriter repository cloned"
  else
    err "Voice Ghostwriter clone failed. Check network and re-run."
    exit 1
  fi
fi

# 5. Install Humanizer SKILL.md via curl.
HUMANIZER_DIR="$SKILLS_DIR/humanizer"
HUMANIZER_FILE="$HUMANIZER_DIR/SKILL.md"
HUMANIZER_URL="https://raw.githubusercontent.com/Aboudjem/humanizer-skill/main/skills/humanizer/SKILL.md"

step "Installing Humanizer to $HUMANIZER_FILE"

if [ ! -d "$HUMANIZER_DIR" ]; then
  mkdir -p "$HUMANIZER_DIR"
  ok "Created $HUMANIZER_DIR"
fi

if [ -f "$HUMANIZER_FILE" ]; then
  BACKUP_HUMANIZER="${HUMANIZER_FILE}.the-writer-bundle.bak.$(date +%Y%m%d-%H%M%S)"
  cp "$HUMANIZER_FILE" "$BACKUP_HUMANIZER"
  ok "Backup written: $BACKUP_HUMANIZER"
fi

if curl -fsSL "$HUMANIZER_URL" -o "$HUMANIZER_FILE"; then
  ok "Humanizer SKILL.md fetched"
else
  err "Humanizer fetch failed. Check network and re-run."
  exit 1
fi

# 6. Closing notes plus companion-template pointer.
cat <<EOF

${C_BOLD}Done.${C_RESET}

${C_BOLD}Next step:${C_RESET} restart Claude Code to load the new skills.
  - CLI: exit and re-launch \`claude\`.
  - VS Code / JetBrains: reload the editor window.

${C_BOLD}Verify:${C_RESET} Voice Ghostwriter activates when the work calls for voice
calibration, interview extraction or drafting in a calibrated voice.
Humanizer activates with the /humanizer command or naturally when AI-writing
patterns appear in a draft.

${C_BOLD}Companion template (not installed by this script):${C_RESET}
The Multi-Format Content Writer is a workspace template, not a portable
skill. To set up a writing workspace with /extract-themes, /research and
/write commands plus the rawnotes/context/drafts folder pattern:

  Use the "Use this template" button on GitHub:
  ${C_DIM}https://github.com/WomenDefiningAI/claudecode-writer${C_RESET}

Or clone it manually as your writing project:
  ${C_DIM}git clone https://github.com/WomenDefiningAI/claudecode-writer.git my-writing-workspace${C_RESET}

Add 2-3 examples of your own writing to context/writing-examples.md to
teach Claude your voice. Drop unstructured ideas into rawnotes/. Run /write
to produce a long-form draft and let the platform-specialist agents adapt
it for LinkedIn, newsletter, Twitter and podcast surfaces.

${C_BOLD}Rollback:${C_RESET}
  - Voice Ghostwriter: rm -rf "$VOICE_DIR"
  - Humanizer:         rm -rf "$HUMANIZER_DIR"

${C_BOLD}Read more:${C_RESET} ${BUNDLE_URL}

EOF
