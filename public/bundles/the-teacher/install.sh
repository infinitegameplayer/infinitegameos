#!/usr/bin/env bash
# The Teacher Bundle. Install script.
#
# Avatar-specific layer for course creators, cohort leaders, YouTube
# educators, tutorial channel operators, workshop facilitators and
# knowledge product builders. The smallest avatar bundle by design.
#
# The Foundational Creator Bundle already carries the Teacher's working
# stack: Researcher (curriculum source research), Plan Challenger
# (curriculum review), Source Harvest (pattern extraction), Skill Creator
# (custom course-design assistants), Systematic Debugging (pipeline root
# cause), Content Strategy (publishing rhythm) and AI SEO (discoverability).
#
# This script does NOT install new skills natively. It does two things:
#   1. Verifies the Foundational substrate is present (looks for the
#      marketing-skills@marketingskills entry in your settings.json).
#   2. Prints the manual git clone command for the GarethManning
#      claude-education-skills library plus the CC BY-SA 4.0 license
#      context, so Teachers who want the deep pedagogy layer can install
#      it directly from the source repository at the location of their
#      choice.
#
# Why no native bundle of the GarethManning library: the repository
# carries a CC BY-SA 4.0 share-alike license. Bundling those skills
# natively into the Kingdom install pipeline could propagate the share-
# alike license downstream. The conservative path is direct-from-source
# install at the Teacher's discretion.
#
# Source: https://www.infinitegameos.io/bundles/the-teacher
# Licenses: CC BY-SA 4.0 (claude-education-skills); CC BY 4.0 (this script)

set -euo pipefail

BUNDLE_VERSION="1.0"
BUNDLE_NAME="The Teacher Bundle"
BUNDLE_URL="https://www.infinitegameos.io/bundles/the-teacher"

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

The smallest avatar bundle by design. The Foundational Creator Bundle
already carries the Teacher's working stack. This script verifies the
substrate is present and prints the optional GarethManning companion
install for Teachers who want a deep pedagogy library.

EOF

# 1. Locate Claude Code config.
CONFIG_DIR="${CLAUDE_CONFIG_DIR:-$HOME/.claude}"
SETTINGS_FILE="$CONFIG_DIR/settings.json"

step "Settings target: $SETTINGS_FILE"

# 2. Verify the Foundational substrate.
step "Verifying Foundational Creator Bundle is installed"

if [ ! -f "$SETTINGS_FILE" ]; then
  warn "$SETTINGS_FILE does not exist."
  warn "Looks like the Foundational Creator Bundle has not been installed yet."
  echo
  echo "Install the Foundational Bundle first:"
  echo "  curl -sSL https://www.infinitegameos.io/bundles/foundational-creator/install.sh | bash"
  echo
  echo "Then re-run this script."
  exit 1
fi

if command -v jq >/dev/null 2>&1; then
  if jq -e '.enabledPlugins["marketing-skills@marketingskills"] == true' "$SETTINGS_FILE" >/dev/null 2>&1; then
    ok "Foundational substrate detected (marketing-skills@marketingskills enabled)"
  else
    warn "marketing-skills@marketingskills is not enabled in $SETTINGS_FILE."
    warn "The Foundational Creator Bundle may not be installed."
    echo
    echo "Install it first for the full Teacher stack:"
    echo "  curl -sSL https://www.infinitegameos.io/bundles/foundational-creator/install.sh | bash"
    echo
  fi
else
  warn "jq is not installed; skipping Foundational substrate verification."
  warn "Manually confirm the Foundational Bundle is installed before continuing."
fi

# 3. Print what the Foundational substrate already gives the Teacher.
cat <<EOF

${C_BOLD}What the Foundational substrate already gives you as a Teacher:${C_RESET}

  ${C_OK}✓${C_RESET} ${C_BOLD}Researcher${C_RESET}            Curriculum source-sweep engine. Multi-angle parallel research.
  ${C_OK}✓${C_RESET} ${C_BOLD}Plan Challenger${C_RESET}       Curriculum review before any module gets recorded.
  ${C_OK}✓${C_RESET} ${C_BOLD}Source Harvest${C_RESET}        Pattern extraction from reference syllabi and learning products.
  ${C_OK}✓${C_RESET} ${C_BOLD}Skill Creator${C_RESET}         Build custom course-design assistants and cohort-Q&A responders.
  ${C_OK}✓${C_RESET} ${C_BOLD}Systematic Debugging${C_RESET}  Root-cause discipline when the multi-tool pipeline breaks.
  ${C_OK}✓${C_RESET} ${C_BOLD}Content Strategy${C_RESET}      Publishing cadence and cross-platform calendar.
  ${C_OK}✓${C_RESET} ${C_BOLD}AI SEO${C_RESET}                Discoverability inside Google AI Overviews and AI answer surfaces.

For most Teachers, this is enough. The skills above cover curriculum
research, curriculum review, pattern extraction, custom-tool authoring,
root-cause debugging, publishing strategy and discoverability.

EOF

# 4. Print the optional GarethManning companion install.
cat <<EOF
${C_BOLD}Optional companion: deep pedagogy layer${C_RESET}

For Teachers who want a research-grounded pedagogy library, the
${C_BOLD}claude-education-skills${C_RESET} library by Gareth Manning is the strongest
public option. 111 skills across 15 domains:

  • Curriculum Design and Assessment (15 skills)
  • Memory Science
  • Self-Regulated Learning
  • Curriculum Alignment
  • AI Learning Science (14 skills, particularly strong)
  • Plus 10 more pedagogy domains

Built by an educator with twenty years of international school experience.
Every pedagogical judgment is encoded in the skill output structure.

${C_BOLD}License notice:${C_RESET} the library is ${C_BOLD}CC BY-SA 4.0${C_RESET} (Creative Commons
Attribution-ShareAlike 4.0). Forks and derivative works inherit the same
share-alike license. The Teacher Bundle does NOT redistribute these
skills natively, to keep the Kingdom bundle infrastructure free of
share-alike inheritance. You install directly from Gareth's repository.

${C_BOLD}Install yourself if you want the deep pedagogy layer:${C_RESET}

  ${C_DIM}# Full library (all 111 skills) into ~/.claude/skills/education${C_RESET}
  git clone --depth 1 https://github.com/GarethManning/claude-education-skills.git \\
    "\$HOME/.claude/skills/education"

  ${C_DIM}# Or cherry-pick the curriculum-design domain (15 skills) by browsing${C_RESET}
  ${C_DIM}# https://github.com/GarethManning/claude-education-skills/tree/main/skills${C_RESET}
  ${C_DIM}# and copying individual SKILL.md files to ~/.claude/skills/<name>/SKILL.md${C_RESET}

After cloning, restart Claude Code. The Gareth Manning skills are
available alongside the Foundational stack.

${C_BOLD}Read more:${C_RESET}
  https://github.com/GarethManning/claude-education-skills
  ${BUNDLE_URL}

EOF

ok "Done. The Teacher Bundle is the substrate plus optional pedagogy depth."
