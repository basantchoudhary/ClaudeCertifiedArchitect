"""Build the CCA-P trap gym from src/traps/*.json (spec: src/TRAP-SPEC.md).

    python3 CCAR-P/src/build_traps.py            # check, then build pages
    python3 CCAR-P/src/build_traps.py --check    # check only
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from build_domains import CSS as DCSS, plain_len, q_html, words  # noqa: E402

ROOT = Path(__file__).resolve().parents[1]
SRC = Path(__file__).resolve().parent / "traps"
OUT = ROOT / "Trap-Gym"

CSS = DCSS + """
.opts { list-style: none; padding: 0; margin: 10px 0; }
.opts li { border: 1.5px solid var(--line); border-radius: 10px; padding: 8px 12px; margin: 8px 0; background: #fff; }
.opts li.win { background: var(--mint-w); border-width: 2.5px; }
.opts li .why { display: block; font-size: .9rem; color: var(--muted); margin-top: 4px; }
.worlds button { margin: 4px 6px 4px 0; }
.fact { background: var(--butter-w); border-radius: 8px; padding: 8px 12px; margin: 8px 0; }
.list td:first-child { white-space: nowrap; }
"""

JS = """<script>
(function () {
  var T = window.TRAP, box = document.getElementById('world'), opts = document.getElementById('opts');
  function show(i) {
    var w = T.worlds[i];
    document.querySelectorAll('.worlds button').forEach(function (b, j) { b.classList.toggle('on', i === j); });
    box.innerHTML = '<b>' + w.name + ':</b> ' + w.fact;
    opts.innerHTML = T.options.map(function (o) {
      var win = o.id === w.winner;
      return '<li class="' + (win ? 'win' : '') + '"><b>' + o.id + (win ? ' ✅ wins' : ' ❌') + '</b> ' + o.t +
        '<span class="why">' + (win ? w.why : (w.losers[o.id] || '')) + '</span></li>';
    }).join('');
  }
  document.querySelectorAll('.worlds button').forEach(function (b, j) { b.onclick = function () { show(j); }; });
  show(0);
})();
</script>"""


def check(t: dict) -> list[str]:
    e = []
    ids = [o["id"] for o in t["options"]]
    if len(t["worlds"]) < 2:
        e.append("needs at least 2 worlds")
    if len({w["winner"] for w in t["worlds"]}) < 2:
        e.append("winner must change across worlds")
    for w in t["worlds"]:
        if w["winner"] not in ids:
            e.append(f"world '{w['name']}': winner {w['winner']} not an option")
        missing = [i for i in ids if i != w["winner"] and i not in w["losers"]]
        if missing:
            e.append(f"world '{w['name']}': no loser reason for {missing}")
    if len(t.get("practice", [])) != 3:
        e.append(f"needs 3 practice questions, has {len(t.get('practice', []))}")
    for qi, q in enumerate(t.get("practice", [])):
        sel = q.get("select", 1)
        if len(q["key"]) != sel or len(q["options"]) != (4 if sel == 1 else 5):
            e.append(f"q{qi + 1}: select/key/options mismatch")
        if len(q["traps"]) != len(q["options"]) or any((x is None) != (i in q["key"]) for i, x in enumerate(q["traps"])):
            e.append(f"q{qi + 1}: traps must be null exactly at keys")
        if not 30 <= words(q["stem"]) <= 80:
            e.append(f"q{qi + 1}: stem {words(q['stem'])} words")
    return e


def page(t: dict, all_t: list[dict]) -> str:
    story = "".join(f"<p>{p}</p>" for p in t["story"])
    btns = "".join(f'<button class="btn">{w["name"]}</button>' for w in t["worlds"])
    signals = "".join(f"<li>{s}</li>" for s in t["signals"])
    qs = "".join(q_html(q, f"{t['n']}.{i + 1}") for i, q in enumerate(t["practice"]))
    lines = ", ".join(t["lines"])
    idx = [x["slug"] for x in all_t].index(t["slug"])
    nxt = all_t[(idx + 1) % len(all_t)]
    data = json.dumps({"options": t["options"], "worlds": t["worlds"]}, ensure_ascii=False)
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>CCA-P Trap: {t['title']}</title>
<meta name="description" content="CCA-P exam trap {t['n']}: {plain_txt(t['glance'])} Change one fact and watch the winning answer move, then practise.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600&family=Patrick+Hand&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../../../CCA-F/Trap-Gym/assets/gym.css">
<style>{CSS}</style>
<link rel="canonical" href="https://cleandataengineering.ai/certifications/claude-certified-architect/CCAR-P/Trap-Gym/{t['slug']}/">
</head>
<body>
<main>
  <div class="crumbs"><a href="../../">CCA-P start here</a> · <a href="../">Trap gym</a> · Trap {t['n']}</div>
  <h1>{t['title']}</h1>
  <p><span class="chip peri">{t['domain']}</span><span class="chip">Guide lines {lines}</span></p>
  <div class="box butter"><b>At a glance:</b> {t['glance']}</div>
  {story}
  <h2>Change one fact</h2>
  <p>{t['situation']}</p>
  <div class="worlds">{btns}</div>
  <div class="fact" id="world"></div>
  <ul class="opts" id="opts"></ul>
  <h2>Words in the stem that signal this trap</h2><ul>{signals}</ul>
  <div class="box butter"><b>Rule to remember:</b> {t['remember']}</div>
  <h2>Practice</h2>{qs}
  <p style="margin-top:2em"><a href="../{nxt['slug']}/">Next trap: {nxt['title']} →</a> · <a href="../">All traps</a></p>
</main>
<script>window.TRAP = {data};</script>
{JS}
</body>
</html>
"""


def plain_txt(s: str) -> str:
    import re
    return re.sub(r"<[^>]+>", "", s).replace('"', "'")


def index(all_t: list[dict]) -> str:
    rows = "".join(
        f'<tr><td>{t["n"]}</td><td><a href="{t["slug"]}/"><b>{t["title"]}</b></a><br>{t["glance"]}</td><td>{t["domain"].split("·")[0].strip()}</td><td>{", ".join(t["lines"])}</td></tr>'
        for t in all_t)
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>CCA-P Trap Gym</title>
<meta name="description" content="The {len(all_t)} traps that decide most CCA-P (CCAR-P) questions. On each page, change one fact and watch the winning answer move, then practise.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600&family=Patrick+Hand&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../../CCA-F/Trap-Gym/assets/gym.css">
<style>{CSS}</style>
<link rel="canonical" href="https://cleandataengineering.ai/certifications/claude-certified-architect/CCAR-P/Trap-Gym/">
</head>
<body>
<main>
  <div class="crumbs"><a href="../">CCA-P start here</a> · Trap gym</div>
  <h1>CCA-P trap gym</h1>
  <p class="lede">On the exam, two options are usually good practices. One fact in the question decides which fits. Each page below shows a situation with four options; change one fact and watch the winning answer move. Then try three practice questions.</p>
  <div class="tablewrap"><table class="list"><tr><th>#</th><th>Trap</th><th>Domain</th><th>Lines</th></tr>{rows}</table></div>
</main>
</body>
</html>
"""


def main() -> None:
    traps = sorted((json.loads(f.read_text()) for f in SRC.glob("*.json")), key=lambda t: t["n"])
    bad = False
    for t in traps:
        errs = check(t)
        print(f"  trap {t['n']} {t['slug']}: {len(t['worlds'])} worlds, {len(t.get('practice', []))} questions" + (" ✗" if errs else " ✓"))
        for e in errs:
            print("     ✗", e)
        bad |= bool(errs)
    if "--check" in sys.argv:
        sys.exit(1 if bad else 0)
    for t in traps:
        out = OUT / t["slug"] / "index.html"
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(page(t, traps))
    OUT.mkdir(exist_ok=True)
    (OUT / "index.html").write_text(index(traps))
    print(f"  wrote {len(traps)} trap pages and the list")


if __name__ == "__main__":
    main()
