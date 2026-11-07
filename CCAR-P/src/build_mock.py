"""Build a CCA-P mock exam from Mock-Exam-<n>/parts/d*.json.

    python3 CCAR-P/src/build_mock.py 1            # check, then write questions.js and index.html
    python3 CCAR-P/src/build_mock.py 1 --check    # check only

Rules: src/MOCK-SPEC.md. The page reuses the CCA-F mock engine, so it has the
same practice/exam modes, timer, "Select TWO" grading and end-of-exam report.
"""

from __future__ import annotations

import json
import random
import re
import sys
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TARGET = {"D1": 11, "D2": 8, "D3": 12, "D4": 10, "D5": 9, "D6": 9, "D7": 4}


def plain(s: str) -> str:
    return re.sub(r"<[^>]+>", "", s)


def check(items: list[dict]) -> list[str]:
    errs, per_dom, multi, longest, singles, keypos = [], Counter(), 0, 0, 0, Counter()
    seen = set()
    for q in items:
        t = q["id"]
        if t in seen:
            errs.append(f"{t}: duplicate id")
        seen.add(t)
        dom = q["domain"].split("·")[0].strip()
        per_dom[dom] += 1
        sel, opts, ans = q.get("select", 1), q["options"], q["answer"]
        if len(ans) != sel:
            errs.append(f"{t}: select={sel}, {len(ans)} answers")
        if len(opts) != (4 if sel == 1 else 5):
            errs.append(f"{t}: {len(opts)} options for select={sel}")
        if q.get("runnerUp") in ans or q.get("runnerUp") is None:
            errs.append(f"{t}: runnerUp must be a wrong option")
        for i, o in enumerate(opts):
            if i in ans and o.get("trap"):
                errs.append(f"{t}: key option {i} has a trap label")
            if i not in ans and not o.get("trap"):
                errs.append(f"{t}: wrong option {i} lacks a trap label")
        if plain(q["decider"]) not in plain(q["question"]):
            errs.append(f"{t}: decider not verbatim in question")
        w = len(plain(q["question"]).split())
        if not 30 <= w <= 80:
            errs.append(f"{t}: question {w} words")
        if sel == 2:
            multi += 1
            if "two" not in q["question"].lower():
                errs.append(f"{t}: choose-two stem must say 'two'")
        else:
            singles += 1
            lens = [len(plain(o["t"])) for o in opts]
            if lens.index(max(lens)) in ans:
                longest += 1
        for k in ans:
            keypos[k] += 1
        if not q.get("eli5") or len(q["eli5"].get("options", [])) != len(opts):
            errs.append(f"{t}: eli5 missing or wrong option count")
        if not 1 <= q.get("fam", 0) <= 9:
            errs.append(f"{t}: fam must be 1-9")
    for d, n in TARGET.items():
        if per_dom[d] != n:
            errs.append(f"{d}: {per_dom[d]} items, want {n}")
    if singles and longest / singles > 0.36:
        errs.append(f"pick-longest wins {longest}/{singles}")
    print(f"  {len(items)} items, {multi} choose-two, per domain {dict(sorted(per_dom.items()))}, "
          f"longest=key {longest}/{singles}, key positions {dict(sorted(keypos.items()))}")
    return errs


PAGE = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CCA-P Mock Exam {n}</title>
<meta name="description" content="A full CCA-P (CCAR-P) mock exam: {count} original questions in 120 minutes, weighted like the real blueprint, with choose-two items and an explanation for every option.">
<link rel="stylesheet" href="../../CCA-F/Foundations-Mock-Exam-7/assets/exam.css">
<link rel="canonical" href="https://cleandataengineering.ai/certifications/claude-certified-architect/CCAR-P/Mock-Exam-{n}/">
</head>
<body>
<header class="page">
  <div class="crumb"><a href="../">CCA-P</a> › Mock Exam {n}</div>
  <h1>CCA-P — Mock Exam {n}</h1>
  <div class="tag">{count} questions · 120-minute timer · weighted like the real exam · {multi} "choose two" items · every option works; one fits best</div>
</header>
<div class="wrap">
  <div id="scorebar" class="scorebar"></div>
  <div class="intro">
    <h2>Like the real exam</h2>
    <ul>
      <li><b>Plain questions, close answers.</b> Each question tells the whole situation in plain words. Every option is a practice that works somewhere; one fact in the question decides which fits best.</li>
      <li><b>Some questions ask for two answers.</b> They say "Which two…?" and are marked "Select TWO". Both must be right to score.</li>
      <li><b>After grading</b> you see why each option wins or loses, the deciding fact, the trap that caught you, and an "Understand" layer in very plain words.</li>
    </ul>
    <p>Original questions written from the official guide (v1.0). None are taken from the real exam or from dump sites. Study first with the <a href="../Guide-Walkthrough/">guide walkthrough</a> and the domain pages.</p>
    <div class="modes">
      <button data-mode="practice">Practice mode — answer shown as soon as you click</button>
      <button data-mode="exam">Exam mode — change answers freely, graded on submit (like the real exam)</button>
    </div>
    <div>
      <span class="pill"><span id="qcount">{count}</span> questions</span>
      <span class="pill">120 minutes</span>
      <span class="pill">Aim for 72% or more (the real pass mark is a scaled 720)</span>
      <span class="pill">D1 17% · D2 13% · D3 19% · D4 16% · D5 14% · D6 14% · D7 7%</span>
    </div>
  </div>
  <div id="exam"></div>
  <div class="actions">
    <button id="submitBtn">Submit &amp; grade</button>
    <button id="resetBtn">Reset &amp; reshuffle</button>
  </div>
  <div id="report"></div>
</div>
<footer>CCA-P · Mock Exam {n} · {count} original items</footer>
<script src="questions.js"></script>
<script src="../../CCA-F/Foundations-Mock-Exam-7/assets/exam.js"></script>
</body>
</html>
"""


def main() -> None:
    n = int(sys.argv[1])
    base = ROOT / f"Mock-Exam-{n}"
    items = []
    for f in sorted((base / "parts").glob("d*.json")):
        items += json.loads(f.read_text())
    errs = check(items)
    for e in errs:
        print("   ✗", e)
    if "--check" in sys.argv:
        sys.exit(1 if errs else 0)
    order = items[:]
    random.Random(n * 7919).shuffle(order)  # fixed mixed order, like the real exam
    for q in order:
        q["sid"] = "s0"
    exam = {"minutes": 120, "passMark": 0.72,
            "scenarios": [{"id": "s0", "title": f"CCA-P Mock Exam {n}", "domains": "All seven domains",
                           "brief": "Standalone questions in a mixed order, as on the real exam. Each one tells its own situation."}],
            "questions": order}
    (base / "questions.js").write_text(
        f"/* CCA-P Mock {n}. GENERATED by src/build_mock.py from parts/*.json. */\nwindow.EXAM = "
        + json.dumps(exam, ensure_ascii=False, indent=1) + ";\n")
    multi = sum(1 for q in items if q.get("select", 1) > 1)
    (base / "index.html").write_text(PAGE.format(n=n, count=len(items), multi=multi))
    print(f"  wrote {base.name}/questions.js and index.html" + ("  (fix the ✗ items)" if errs else ""))


if __name__ == "__main__":
    main()
