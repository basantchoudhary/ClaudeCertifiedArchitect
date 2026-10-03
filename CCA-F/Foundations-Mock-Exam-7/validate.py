"""Checks Mock #6 item JSON against the real-exam-style rules in parts/SPEC.md.

Usage: python3 validate.py parts/a.json [parts/b.json ...]
With several files it also checks the combined paper (domain weights, MR count).
"""
import json, re, sys
from collections import Counter

DOMAINS = {
    "D1 · Agentic Architecture", "D2 · Tool Design & MCP", "D3 · Claude Code Configuration",
    "D4 · Prompt Engineering & Structured Output", "D5 · Context Management & Reliability",
}
JUSTIFY = re.compile(r"\b(so that|because|which ensures|which guarantees|guaranteeing|ensuring|to prevent|in order to)\b", re.I)
TELLS = re.compile(r"\b(always|never|guarantees?|ensures?|simply|just|fine-tun\w*|capitals)\b", re.I)
CAPS = re.compile(r"\b[A-Z]{4,}\b")
ALLOWED_CAPS = {"JSON", "HTML", "CLAUDE", "PDF", "HTTP", "UUID", "OAUTH", "SKILL", "TODO", "README", "STDIN", "STDOUT"}


def norm(s):
    s = s.replace("\u2019", "'").replace("\u2018", "'").replace("\u201c", '"').replace("\u201d", '"').replace("`", "")
    return re.sub(r"\s+", " ", s).strip()


GUIDE = ""
try:
    import pathlib
    GUIDE = norm(pathlib.Path(__file__).with_name("..").joinpath("CCAR-F-Exam-Guide.md").resolve().read_text().replace("**", ""))
except Exception:
    pass


def plain(s):
    return re.sub(r"<[^>]+>", "", s).replace("&amp;", "&").replace("&lt;", "<").replace("&gt;", ">")


def words(s):
    return len(plain(s).split())


STOP = set("""about above after again against agent agents allow before being below between both build calls claude change could daily during each every first found further having however instead itself least model needs other often only order their there these those three through under using where which while within without would agent's tool tools""".split())


def content(s):
    w = re.findall(r"[a-z][a-z_'-]{4,}", plain(s).lower())
    return {x for x in w if x not in STOP}


def bigrams(s):
    w = [x for x in re.findall(r"[a-z][a-z_'-]+", plain(s).lower()) if len(x) > 3 and x not in STOP]
    return set(zip(w, w[1:]))


def echo(q, i):
    stem = q["question"]
    t = q["options"][i]["t"]
    return len(content(t) & content(stem)) + 2 * len(bigrams(t) & bigrams(stem))


# Clarity rules (REVISION-2): on for papers that have been through the clarity pass.
CLARITY = "--clarity" in sys.argv
STEM_MIN, STEM_MAX = (45, 90) if CLARITY else (55, 135)
MAX_AVG = 16
for _a in sys.argv:
    if _a.startswith("--avg="):
        MAX_AVG = int(_a.split("=")[1])
    if _a.startswith("--stem="):
        STEM_MIN, STEM_MAX = map(int, _a.split("=")[1].split("-"))


def check(qs, errors, warns):
    echo_top = echo_bottom = 0
    longest = shortest = 0
    pos = Counter()
    for q in qs:
        qid = q.get("id", "?")
        e = lambda m: errors.append(f"{qid}: {m}")
        dp = q.get("deep")
        if not dp:
            e("missing deep")
        else:
            for k in ("premise", "mapTitle", "map", "evidence", "rule", "guide"):
                if not dp.get(k):
                    e(f"deep.{k} missing")
            m = dp.get("map") or {}
            if len(m.get("head", [])) != 3 or len(m.get("rows", [])) < 4 or any(len(r) != 3 for r in m.get("rows", [])):
                e("deep.map needs 3 headers and >=4 rows of 3 cells")
            ev = dp.get("evidence") or []
            if not 3 <= len(ev) <= 6:
                e(f"deep.evidence has {len(ev)} entries (want 3–6)")
            stem = norm(plain(q.get("question", ""))).lower()
            for j, x in enumerate(ev):
                qt = norm(plain(x.get("quote", ""))).rstrip(".;:?! ").lower()
                if not qt or qt not in stem:
                    e(f"deep.evidence[{j}] quote not verbatim in stem: {x.get('quote','')[:60]!r}")
            g = dp.get("guide") or {}
            if norm(plain(g.get("quote", ""))).rstrip(".;: ") not in GUIDE:
                e(f"deep.guide.quote not verbatim in exam guide: {g.get('quote','')[:60]!r}")
            blob = json.dumps(dp, ensure_ascii=False)
            if re.search(r"<b>[A-D]</b>|\b[Oo]ption [A-D]\b|\([A-D]\)", blob):
                e("deep refers to a fixed option letter; use [[i]]")
            for n in re.findall(r"\[\[(\d)\]\]", blob):
                if int(n) >= len(q.get("options", [])):
                    e(f"deep placeholder [[{n}]] out of range")
            if dp.get("diagram") and any(len(l) > 60 for l in dp["diagram"].split("\n")):
                e("deep.diagram line wider than 60 chars")
        el = q.get("eli5")
        if not el or not el.get("question") or not el.get("answer") or len(el.get("options", [])) != len(q.get("options", [])):
            e("missing or incomplete eli5 (question, answer, one options entry per option)")
        for k in ("id", "sid", "domain", "obj", "trap", "fam", "select", "question", "options", "answer", "runnerUp", "decider", "explanation"):
            if k not in q:
                e(f"missing field {k}")
        if q.get("domain") not in DOMAINS:
            e(f"bad domain {q.get('domain')!r}")
        opts = q.get("options", [])
        if len(opts) < 4:
            e("needs at least 4 options")
            continue
        ans = q.get("answer", [])
        if len(ans) != q.get("select"):
            e("answer count != select")
        if q.get("runnerUp") in ans:
            e("runnerUp is an answer")
        ru = q.get("runnerUp")
        if isinstance(ru, int) and not opts[ru]["why"].startswith("Runner-up."):
            e("runner-up why must start with 'Runner-up.'")
        w = words(q.get("question", ""))
        if not STEM_MIN <= w <= STEM_MAX:
            e(f"stem {w} words (want {STEM_MIN}–{STEM_MAX})")
        if CLARITY:
            stem_txt = plain(q.get("question", ""))
            sents = [x for x in re.split(r"(?<=[.?!])\s+", stem_txt) if x.strip()]
            avg = sum(len(x.split()) for x in sents) / max(len(sents), 1)
            if avg > MAX_AVG:
                e(f"stem averages {avg:.1f} words per sentence (max {MAX_AVG})")
            longest_s = max(len(x.split()) for x in sents)
            if longest_s > 28:
                e(f"stem has a {longest_s}-word sentence (max 28)")
            nums = re.findall(r"\$?\d[\d,.]*%?", stem_txt)
            if len(nums) > 2:
                e(f"stem has {len(nums)} numbers {nums} (max 2)")
        if "<b>" in q["question"]:
            last = q["question"].rsplit(".", 1)[-1] if q["question"].count("<b>") == 1 else ""
            if q["question"].count("<b>") > 1 or "<b>" not in last:
                warns.append(f"{qid}: bold should only mark the final qualifier")
        L = [len(plain(o["t"])) for o in opts]
        mean = sum(L) / len(L)
        for i, l in enumerate(L):
            if abs(l - mean) > 0.22 * mean:
                e(f"option {i} length {l} outside ±22% of mean {mean:.0f}")
        for i, o in enumerate(opts):
            t = plain(o["t"])
            if JUSTIFY.search(t):
                e(f"option {i} has justification clause: {JUSTIFY.search(t).group(0)!r}")
            if TELLS.search(t):
                e(f"option {i} has tell word: {TELLS.search(t).group(0)!r}")
            for c in CAPS.findall(t):
                if c not in ALLOWED_CAPS and not c.startswith("CLAUDE_"):
                    warns.append(f"{qid}: option {i} has caps word {c}")
            if not o.get("why"):
                e(f"option {i} missing why")
        mx, mn = max(L), min(L)
        if any(L[a] == mx for a in ans):
            longest += 1
        if any(L[a] == mn for a in ans):
            shortest += 1
        for a in ans:
            pos[a] += 1
        E = [echo(q, i) for i in range(len(opts))]
        others = [E[i] for i in range(len(opts)) if i not in ans]
        if min(E[a] for a in ans) > max(others):
            echo_top += 1
            warns.append(f"{qid}: correct option echoes the stem most (echo {E})")
        if max(E[a] for a in ans) < min(others):
            echo_bottom += 1
            warns.append(f"{qid}: correct option echoes the stem least (echo {E})")
    n = len(qs)
    if n and echo_top / n > 0.30:
        errors.append(f"SET: correct option is the strongest stem-echo in {echo_top}/{n} items (max 30%)")
    if n and echo_bottom / n > 0.30:
        errors.append(f"SET: correct option is the weakest stem-echo in {echo_bottom}/{n} items (max 30%)")
    if n:
        if longest / n > 0.25:
            errors.append(f"SET: correct answer is longest in {longest}/{n} items (max 25%)")
        if shortest / n < 0.20:
            errors.append(f"SET: correct answer is shortest in only {shortest}/{n} items (min 20%)")
    print(f"stem-echo: correct option strictly highest in {echo_top}/{n}, strictly lowest in {echo_bottom}/{n}")
    return longest, shortest, pos


def main(paths):
    errors, warns, allq, scen = [], [], [], []
    for p in paths:
        d = json.load(open(p))
        scen += d["scenarios"]
        allq += d["questions"]
        for s in d["scenarios"]:
            bw = words(s["brief"])
            if not 35 <= bw <= 90:
                warns.append(f"{s['id']}: brief {bw} words (want 40–80)")
        sids = Counter(q["sid"] for q in d["questions"])
        for sid, c in sids.items():
            mr = sum(1 for q in d["questions"] if q["sid"] == sid and q["select"] == 2)
            if mr > 2:
                errors.append(f"{sid}: {mr} multiple-response items (max 2)")
            if c != 10:
                errors.append(f"{sid}: {c} items (want 10)")
    ids = Counter(q["id"] for q in allq)
    for k, v in ids.items():
        if v > 1:
            errors.append(f"duplicate id {k}")
    longest, shortest, pos = check(allq, errors, warns)
    dom = Counter(q["domain"][:2] for q in allq)
    print(f"{len(allq)} items · correct=longest {longest} · correct=shortest {shortest} · positions {dict(sorted(pos.items()))}")
    print("domains", dict(sorted(dom.items())), "· traps", dict(sorted(Counter(q['fam'] for q in allq).items())))
    for w in warns:
        print("WARN ", w)
    for e in errors:
        print("ERROR", e)
    print("OK" if not errors else f"{len(errors)} errors")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main([a for a in sys.argv[1:] if not a.startswith("--")]))
