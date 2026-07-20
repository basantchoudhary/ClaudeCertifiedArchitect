#!/usr/bin/env python3
"""
Inject "▶ Watch" links next to each subtopic on a domain hub (index.html),
driven by manifest.json. Idempotent: safe to re-run as YouTube URLs are added.

Usage:  python inject_watch_links.py D1-Agentic-Architecture
        python inject_watch_links.py all
"""
import json, re, sys, os

ROOT = "/Users/ishaan/ClaudeCertifiedArchitect"
MANIFEST = os.path.join(ROOT, "course-prototype", "manifest.json")

WATCH   = ('<a class="watch" href="{href}" target="_blank">▶ Watch</a>')
SOON    = ('<span class="watch-soon">▶ soon</span>')

# scoped layout + pill styling (injected into <head> once, idempotent)
STYLE = """<style id="watch-css">
.cluster li{display:flex;align-items:center;flex-wrap:wrap}
.cluster li>a:first-child{flex:1 1 auto}
.watch,.watch-soon{flex:0 0 auto;margin-left:10px;font-size:.78em;padding:2px 11px;
  border-radius:12px;white-space:nowrap;text-decoration:none;display:inline-block}
.watch{color:#fff;background:#c4302b}
.watch:hover{background:#a52621}
.watch-soon{color:#a97a20;background:#fff6e0}
</style>"""

def snippet(lesson):
    # a live "Watch" link only when the lesson has a (YouTube) URL — so the
    # public site never ships a broken link to a not-yet-uploaded video
    body = WATCH.format(href=lesson["youtube"]) if lesson.get("youtube") else SOON
    return "<!--watch-->" + body + "<!--/watch-->"

def inject(domain_dir, lessons):
    path = os.path.join(ROOT, "CCA-F", domain_dir, "index.html")
    html = open(path, encoding="utf-8").read()
    # idempotent: strip any prior injections
    html = re.sub(r"<!--watch-->.*?<!--/watch-->", "", html, flags=re.S)
    if 'id="watch-css"' not in html:
        html = html.replace("</head>", STYLE + "\n</head>", 1)
    by_slug = {l["slug"]: l for l in lessons if l["dir"] == domain_dir}

    def repl(m):
        anchor, slug, close = m.group(1), m.group(2), m.group(3)
        l = by_slug.get(slug)
        return anchor + (snippet(l) if l else "") + close

    html, n = re.subn(r'(<a href="subtopics/([\w-]+)\.html">.*?</a>)(</li>)',
                      repl, html)
    open(path, "w", encoding="utf-8").write(html)
    print(f"{domain_dir}: injected {n} watch links")

if __name__ == "__main__":
    lessons = json.load(open(MANIFEST))["lessons"]
    target = sys.argv[1] if len(sys.argv) > 1 else "all"
    dirs = sorted({l["dir"] for l in lessons}) if target == "all" else [target]
    for d in dirs:
        inject(d, lessons)
