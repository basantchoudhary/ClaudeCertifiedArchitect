"""Build CCAR-P/Mind-Maps/index.html: every guide line's "which answer wins when" table on one printable page.

    python3 CCAR-P/src/build_mindmaps.py

Reads the same data as the domain pages (src/domains/d*.json): each line's mind map and rule.
"""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = Path(__file__).resolve().parent / "domains"
OUT = ROOT / "Mind-Maps" / "index.html"

CSS = """
.map { border: 1.5px solid var(--line); border-radius: var(--r); padding: 10px 14px; margin: 12px 0; break-inside: avoid; page-break-inside: avoid; }
.map h3 { margin: .1em 0 .3em; font-size: 1.2rem; }
.map .rule { background: var(--butter-w); border-radius: 8px; padding: 5px 9px; margin: 6px 0; font-size: .92rem; }
.map table { font-size: .86rem; }
h2.dom { break-before: auto; }
nav.toc a { margin-right: 10px; white-space: nowrap; }
.noprint button { margin-top: 6px; }
@media print {
  body { font-size: 11px; } main { max-width: none; padding: 0 6mm; }
  .noprint, .crumbs { display: none; }
  h1 { font-size: 1.6rem; } h2 { font-size: 1.3rem; margin: .8em 0 .2em; }
  .map { padding: 6px 8px; margin: 6px 0; } th, td { padding: 3px 5px; }
}
"""


def main():
    domains = [json.loads(f.read_text()) for f in sorted(SRC.glob("d*.json"))]
    toc = " ".join(f'<a href="#d{d["n"]}">D{d["n"]}</a>' for d in domains)
    parts = []
    for d in domains:
        parts.append(f'<h2 class="dom" id="d{d["n"]}">Domain {d["n"]}: {d["name"]} <span class="chip butter">{d["weight"]}</span></h2>')
        for s in d["sections"]:
            c = s["compare"]
            head = "".join(f"<th>{h}</th>" for h in c["head"])
            rows = "".join("<tr>" + "".join(f"<td>{x}</td>" for x in r) + "</tr>" for r in c["rows"])
            parts.append(f"""<div class="map" id="m{s['id']}"><h3>{s['id']} · {s['guide']}</h3>
<div class="rule"><b>Rule:</b> {s['rule']}</div>
<div class="tablewrap"><table><tr>{head}</tr>{rows}</table></div>
<p class="noprint" style="margin:.4em 0 0;font-size:.85rem"><a href="../{d['slug']}/#s{s['id']}">Study and practise {s['id']} →</a></p></div>""")
    n = sum(len(d["sections"]) for d in domains)
    html = f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>CCA-P Mind Maps</title>
<meta name="description" content="All {n} CCA-P (CCAR-P) guide lines as printable mind maps: for each, which answer wins when, including when the runner-up wins, plus the rule to remember.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600&family=Patrick+Hand&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../../CCA-F/Trap-Gym/assets/gym.css">
<style>{CSS}</style>
<link rel="canonical" href="https://cleandataengineering.ai/certifications/claude-certified-architect/CCAR-P/Mind-Maps/">
</head>
<body>
<main>
  <div class="crumbs"><a href="../">CCA-P start here</a> · Mind maps</div>
  <h1>CCA-P mind maps</h1>
  <p class="lede">All {n} guide lines on one page. Each map says, for the situations the exam likes, which answer wins, including the row where the runner-up wins. Read these the week before the exam.</p>
  <div class="noprint"><nav class="toc"><b>Domains:</b> {toc}</nav><button class="btn go" onclick="window.print()">Print or save as PDF</button></div>
  {''.join(parts)}
  <p class="noprint" style="margin-top:2em"><a href="../">CCA-P start here</a> · <a href="../Guide-Walkthrough/">Guide walkthrough</a> · <a href="../Trap-Gym/">Trap gym</a></p>
</main>
</body>
</html>
"""
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(html)
    print(f"wrote {OUT.relative_to(ROOT.parent)} ({n} maps)")


if __name__ == "__main__":
    main()
