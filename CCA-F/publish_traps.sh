#!/bin/zsh
# Marks finished Trap gym pages ready, rebuilds data and practice pages, commits and publishes them.
# Usage (from CCA-F/): ./publish_traps.sh slug [slug ...]
set -e
cd "$(dirname "$0")"
for s in "$@"; do
  python3 - "$s" <<'PY'
import re, sys
s = sys.argv[1]; p = 'Trap-Gym/index.html'; t = open(p).read()
m = re.search(r'\[null, ("[^"]+")[^\]]*\]', t)
rows = re.findall(r'\[(null|"[a-z-]+/"), "([^"]+)"', t)
title = {"tool-picker":"The tool picker","who-escalates":"Who escalates?","instruction-home":"Where does this instruction live?","mcp-where-what":"MCP: where and what","coordinator-split":"The coordinator's split","tool-failure":"When a tool fails","context-meter":"The context meter","extraction-honesty":"Extraction honesty","plan-or-do":"Plan or just do it?","batch-or-now":"Batch or now?"}[s]
t = t.replace(f'[null, "{title}"', f'["{s}/", "{title}"')
open(p, 'w').write(t)
PY
done
python3 Practice/build.py >/dev/null
(cd Trap-Gym && python3 build.py >/dev/null)
cd ..
paths=(CCA-F/Trap-Gym/index.html CCA-F/Trap-Gym/assets/plain-data.js CCA-F/Practice CCA-F/D1-Agentic-Architecture/index.html CCA-F/D2-Tool-Design-MCP/index.html CCA-F/D3-Claude-Code/index.html CCA-F/D4-Prompt-Engineering/index.html CCA-F/D5-Context-Management/index.html)
for s in "$@"; do paths+=(CCA-F/Trap-Gym/$s CCA-F/Foundations-Mock-Exam-7/parts/plain/trap-$s.json); done
git add $paths
git commit -q -m "CCA-F Trap gym: $* ready

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
git push -q
cd ~/cleandataengineering-site
python3 _certifications/sync.py >/dev/null 2>&1 || true
python3 _site/seo.py >/dev/null 2>&1 || true
B=certifications/claude-certified-architect/CCA-F
site=($B/Trap-Gym/index.html $B/Trap-Gym/assets $B/Practice $B/D1-Agentic-Architecture/index.html $B/D2-Tool-Design-MCP/index.html $B/D3-Claude-Code/index.html $B/D4-Prompt-Engineering/index.html $B/D5-Context-Management/index.html sitemap.xml)
for s in "$@"; do site+=($B/Trap-Gym/$s); done
git add $site
git commit -q -m "Certifications: CCA-F Trap gym: $*

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
git push -q
echo "published: $*"
