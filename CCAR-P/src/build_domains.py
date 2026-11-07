"""Build the CCA-P domain study pages from src/domains/d<n>.json.

    python3 CCAR-P/src/build_domains.py            # build every domain file found
    python3 CCAR-P/src/build_domains.py --check    # validate only, build nothing

One page per domain at CCAR-P/D<n>-<Slug>/index.html, one section per guide
line. Rules live in src/DOMAIN-SPEC.md; the checks below enforce the
mechanical ones (shape, stem length, key spread, option-length giveaways).
"""

from __future__ import annotations

import json
import re
import sys
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = Path(__file__).resolve().parent / "domains"
LETTERS = "ABCDE"

CSS = """
.sec { border-top: 2px dashed #d9dce3; margin-top: 2.4em; padding-top: .6em; }
.sec h2 { margin-top: .3em; }
.sec .guide { font-style: italic; color: var(--muted); margin: 0 0 .6em; }
.one { font-size: 1.08rem; }
.flow { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin: 12px 0; }
.flow span.b { border: 1.5px solid var(--line); border-radius: 10px; padding: 6px 10px; background: var(--mint-w); font-size: .92rem; }
.flow span.a { font-size: 1.1rem; color: var(--muted); }
ul.know li { margin: .25em 0; }
.ex p { margin: .35em 0; }
.pq { border: 1.5px solid var(--line); border-radius: var(--r); padding: 14px 16px; margin: 14px 0; }
.pq .meta { font-size: .82rem; color: var(--muted); }
.pq ol { margin: .4em 0; padding-left: 1.5em; }
.pq details { margin-top: .5em; }
.pq summary { cursor: pointer; font-weight: 600; }
.pq .ans li { margin: .3em 0; }
.pq .ans li.k { background: var(--mint-w); border-radius: 6px; padding: 2px 6px; }
nav.toc a { margin-right: 10px; white-space: nowrap; }
"""


def words(s: str) -> int:
    return len(re.sub(r"<[^>]+>", "", s).split())


def plain_len(s: str) -> int:
    return len(re.sub(r"<[^>]+>", "", s))


def check(d: dict) -> list[str]:
    errs, longest_is_key, n_q, keypos, multi = [], 0, 0, Counter(), 0
    for s in d["sections"]:
        for f in ("id", "guide", "oneliner", "explain", "know", "compare", "example", "rule", "questions"):
            if f not in s:
                errs.append(f"{s.get('id')}: missing {f}")
        if len(s.get("questions", [])) != 2:
            errs.append(f"{s['id']}: needs 2 questions, has {len(s.get('questions', []))}")
        for qi, q in enumerate(s.get("questions", [])):
            tag = f"{s['id']} q{qi + 1}"
            n_q += 1
            opts, key, sel = q["options"], q["key"], q.get("select", 1)
            if len(key) != sel:
                errs.append(f"{tag}: select={sel} but {len(key)} keys")
            if len(opts) != (4 if sel == 1 else 5):
                errs.append(f"{tag}: {len(opts)} options for select={sel}")
            if len(q["traps"]) != len(opts) or any((t is None) != (i in key) for i, t in enumerate(q["traps"])):
                errs.append(f"{tag}: traps must be null exactly at keys")
            if sel == 2:
                multi += 1
                if "two" not in q["stem"].lower():
                    errs.append(f"{tag}: multi-response stem must say 'two'")
            w = words(q["stem"])
            if not 30 <= w <= 80:
                errs.append(f"{tag}: stem {w} words (want 35-70)")
            lens = [plain_len(o) for o in opts]
            if lens.index(max(lens)) in key and sel == 1:
                longest_is_key += 1
            for k in key:
                keypos[LETTERS[k]] += 1
            if re.search(r"\b(which ensures|this ensures|guarantees that)\b", " ".join(opts[k] for k in key), re.I):
                errs.append(f"{tag}: justification clause in key")
    singles = n_q - multi
    if singles and longest_is_key / singles > 0.36:
        errs.append(f"pick-longest wins {longest_is_key}/{singles} single-answer items (max ~35%)")
    print(f"  D{d['n']}: {len(d['sections'])} sections, {n_q} questions ({multi} select-2), "
          f"key letters {dict(sorted(keypos.items()))}, longest=key {longest_is_key}/{singles}")
    return errs


def q_html(q: dict, num: str) -> str:
    sel = q.get("select", 1)
    opts = "".join(f"<li>{o}</li>" for o in q["options"])
    ans = []
    for i, o in enumerate(q["options"]):
        if i in q["key"]:
            ans.append(f'<li class="k"><b>{LETTERS[i]} ✅</b> {o}</li>')
        else:
            ans.append(f"<li><b>{LETTERS[i]} ❌</b> {q['traps'][i]}</li>")
    keys = " and ".join(LETTERS[k] for k in q["key"])
    pick = "Choose one." if sel == 1 else "Choose two."
    return f"""<div class="pq"><div class="meta">Practice {num} · {pick}</div>
<p>{q['stem']}</p><ol type="A">{opts}</ol>
<details><summary>Show answer</summary><p><b>Answer: {keys}.</b> {q['why']}</p>
<ul class="ans">{''.join(ans)}</ul></details></div>"""


def section_html(s: dict) -> str:
    explain = "".join(f"<p>{p}</p>" for p in s["explain"])
    flow = ""
    if s.get("flow"):
        parts = '<span class="a">→</span>'.join(f'<span class="b">{b}</span>' for b in s["flow"])
        flow = f'<div class="flow">{parts}</div>'
    know = "".join(f"<li>{k}</li>" for k in s["know"])
    c = s["compare"]
    rows = "".join("<tr>" + "".join(f"<td>{x}</td>" for x in r) + "</tr>" for r in c["rows"])
    head = "".join(f"<th>{h}</th>" for h in c["head"])
    e = s["example"]
    qs = "".join(q_html(q, f"{s['id']}.{i + 1}") for i, q in enumerate(s["questions"]))
    return f"""<section class="sec" id="s{s['id']}">
<h2>{s['id']} · {s['guide']}</h2>
<p class="guide">Guide line: “{s['guide']}”</p>
<div class="box peri one"><b>In one sentence:</b> {s['oneliner']}</div>
{explain}
{flow}
<h3>Know this</h3><ul class="know">{know}</ul>
<h3>Mind map</h3><div class="tablewrap"><table><tr>{head}</tr>{rows}</table></div>
<h3>Worked example</h3><div class="box ex"><p><b>Situation:</b> {e['situation']}</p><p><b>Decision:</b> {e['decision']}</p><p><b>Why:</b> {e['why']}</p></div>
<div class="box butter"><b>Rule to remember:</b> {s.get('rule', '')}</div>
<h3>Practice</h3>{qs}
</section>"""


def page(d: dict, all_domains: list[dict]) -> str:
    toc = " ".join(f'<a href="#s{s["id"]}">{s["id"]}</a>' for s in d["sections"])
    others = " · ".join(
        f'<a href="../{o["slug"]}/">D{o["n"]}</a>' if o["n"] != d["n"] else f"<b>D{o['n']}</b>"
        for o in all_domains)
    n_q = sum(len(s["questions"]) for s in d["sections"])
    body = "\n".join(section_html(s) for s in d["sections"])
    plain_name = re.sub(r"&amp;", "&", d["name"])
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>CCA-P D{d['n']} {plain_name}</title>
<meta name="description" content="CCA-P (CCAR-P) Domain {d['n']}, {plain_name} ({d['weight']}): every guide line taught from zero, with a mind map, a worked example and {n_q} exam-style practice questions.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600&family=Patrick+Hand&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../../CCA-F/Trap-Gym/assets/gym.css">
<style>{CSS}</style>
<link rel="canonical" href="https://cleandataengineering.ai/certifications/claude-certified-architect/CCAR-P/{d['slug']}/">
</head>
<body>
<main>
  <div class="crumbs"><a href="../">CCA-P start here</a> · <a href="../Guide-Walkthrough/#d{d['n']}">Guide walkthrough</a> · Domain {d['n']}</div>
  <h1>Domain {d['n']}: {d['name']}</h1>
  <p class="lede">{d['intro']}</p>
  <p><span class="chip butter">{d['weight']} of the exam</span><span class="chip peri">{len(d['sections'])} guide lines · {n_q} practice questions</span><span class="chip mint">Guide v1.0</span></p>
  <div class="box butter"><b>How each section works:</b> the guide line, the idea in one sentence, the explanation, what to know, a mind map (including when the runner-up wins), a worked example, then two exam-style questions. Try each question before opening the answer.</div>
  <nav class="toc"><b>Sections:</b> {toc}</nav>
  <p><b>Other domains:</b> {others}</p>
{body}
  <p style="margin-top:3em">Source of the guide lines: <i>Claude Certified Architect – Professional Exam Guide</i>, v1.0 (Anthropic). Explanations and questions are ours, written fresh. · <a href="../">CCA-P start here</a></p>
</main>
</body>
</html>
"""


def main() -> None:
    files = sorted(SRC.glob("d*.json"))
    domains = [json.loads(f.read_text()) for f in files]
    bad = False
    for d in domains:
        errs = check(d)
        for e in errs:
            print("   ✗", e)
        bad |= bool(errs)
    if "--check" in sys.argv:
        sys.exit(1 if bad else 0)
    for d in domains:
        out = ROOT / d["slug"] / "index.html"
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(page(d, domains))
        print("  wrote", out.relative_to(ROOT.parent))
    if bad:
        print("built, but fix the ✗ items above")


if __name__ == "__main__":
    main()
