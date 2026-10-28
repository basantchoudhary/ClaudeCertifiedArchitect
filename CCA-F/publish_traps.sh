#!/bin/zsh
# Rebuilds the Trap gym (master list, question bundle) and the practice pages, then commits and publishes them.
# A trap page goes live once its folder Trap-Gym/<slug>/ has an index.html; the master list comes from Trap-Gym/data/.
# Usage (from CCA-F/): ./publish_traps.sh "commit message"
set -e
cd "$(dirname "$0")"
msg=${1:-"CCA-F Trap gym update"}
(cd Trap-Gym && python3 build.py >/dev/null && python3 build_index.py)
python3 Practice/build.py >/dev/null
cd ..
git add CCA-F/Trap-Gym CCA-F/Practice CCA-F/publish_traps.sh \
  CCA-F/D1-Agentic-Architecture/index.html CCA-F/D2-Tool-Design-MCP/index.html CCA-F/D3-Claude-Code/index.html \
  CCA-F/D4-Prompt-Engineering/index.html CCA-F/D5-Context-Management/index.html
git commit -q -m "$msg

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
git push -q
cd ~/cleandataengineering-site
python3 _certifications/sync.py
python3 _site/seo.py >/dev/null
B=certifications/claude-certified-architect/CCA-F
git add $B/Trap-Gym $B/Practice $B/D1-Agentic-Architecture/index.html $B/D2-Tool-Design-MCP/index.html \
  $B/D3-Claude-Code/index.html $B/D4-Prompt-Engineering/index.html $B/D5-Context-Management/index.html sitemap.xml
git commit -q -m "Certifications: $msg

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
git push -q
echo "published: $msg"
