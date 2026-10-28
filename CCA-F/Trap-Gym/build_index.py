"""Builds the Trap gym master list (index.html): all 30 exam traps, one line each, grouped by domain.

Source of truth: data/part-*.json (one entry per trap: slug, title, domain, guide, gym, mindmap, ...).
A trap links to its simulator page Trap-Gym/<gym or slug>/ once that folder has an index.html; until then it shows "coming".
Usage (from CCA-F/Trap-Gym/): python3 build_index.py
"""
import html, json, pathlib

here = pathlib.Path(__file__).resolve().parent
DOMAINS = {
    "D1": "Agentic Architecture & Orchestration",
    "D2": "Tool Design & MCP Integration",
    "D3": "Claude Code Configuration & Workflows",
    "D4": "Prompt Engineering & Structured Output",
    "D5": "Context Management & Reliability",
}


def load():
    traps = []
    for f in sorted((here / "data").glob("part-*.json")):
        traps += json.loads(f.read_text())
    traps.sort(key=lambda t: t["n"])
    for t in traps:
        t["page"] = t.get("gym") or t["slug"]
        t["ready"] = (here / t["page"] / "index.html").exists()
    return traps


def main():
    traps = load()
    e = html.escape
    ready = sum(t["ready"] for t in traps)
    pages = len({t["page"] for t in traps if t["ready"]})
    sections = []
    for dom, name in DOMAINS.items():
        rows = []
        for t in (t for t in traps if t["domain"] == dom):
            title = f'<a href="{t["page"]}/">{e(t["title"])}</a>' if t["ready"] else e(t["title"])
            chip = '<span class="chip mint">simulator</span>' if t["ready"] else '<span class="chip">coming</span>'
            guide = " and ".join(t["guide"])
            rows.append(f"""    <div class="box trap{' mint' if t['ready'] else ''}">
      <div class="n">{t['n']}</div>
      <div>
        <b>{title}</b> {chip}<span class="chip">Guide {guide}</span>
        <p>{e(t['mindmap'])}</p>
      </div>
    </div>""")
        sections.append(f'  <h2 id="{dom.lower()}">{dom} {e(name)}</h2>\n' + "\n".join(rows))

    page = f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>CCA-F Trap Gym</title>
<meta name="description" content="All {len(traps)} traps the Claude Certified Architect Foundations exam sets, each with a one-line rule and a simulator where you change the setting and watch the effect, then exam-style practice.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600&family=Patrick+Hand&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/gym.css">
<style>
  .trap {{ display: grid; grid-template-columns: 2.2em 1fr; gap: 4px 10px; padding: 12px 16px; margin: 10px 0; }}
  .trap .n {{ font-family: "Patrick Hand", cursive; font-size: 1.6rem; line-height: 1; }}
  .trap p {{ margin: .3em 0 0; }}
  .jump a {{ margin-right: 10px; }}
</style>
</head>
<body>
<main>
  <div class="crumbs"><a href="../">CCA-F start here</a> · Trap gym</div>
  <h1>Trap gym: all {len(traps)} exam traps</h1>
  <p class="lede">The exam's questions are easy to read. The hard part is the answers: every wrong option is a sensible practice that is wrong <i>here</i>. Below is every trap the exam guide sets up, each with the one-line rule that beats it. Open a trap to change the setting yourself in a simulator, watch what happens, then try exam-style questions.</p>
  <div class="box peri">Most traps come down to one of three mistakes: <b>the right idea at the wrong layer</b>, <b>fixing the symptom instead of the cause</b>, or <b>the right content in the wrong home</b>. Learn to spot them and you can rule out two options on most questions.</div>
  <p class="jump">Jump to: {" ".join(f'<a href="#{d.lower()}">{d}</a>' for d in DOMAINS)} · {pages} simulator pages cover {ready} of {len(traps)} traps.</p>
{chr(10).join(sections)}
</main>
</body>
</html>
"""
    (here / "index.html").write_text(page)
    print(f"index: {len(traps)} traps, {ready} linked to {pages} simulator pages")


if __name__ == "__main__":
    main()
