"""Adds the 'plain style' banner to an original mock page and marks it ready on the Start-here page. Idempotent.
Usage (from CCA-F/): python3 link_plain.py 4 [5 6]"""
import pathlib, sys
here = pathlib.Path(__file__).parent
for n in sys.argv[1:]:
    p = here / f"Foundations-Mock-Exam-{n}" / "index.html"
    s = p.read_text()
    if 'href="plain/"' not in s:
        banner = (f'  <div class="intro" style="border-color:var(--acc2)">\n    <b>New: <a href="plain/">Mock #{n}, plain style</a>.</b> '
                  'The same topics rewritten in the style of the real exam: the whole situation in plain words, and four '
                  'options that all work, with one fitting best.\n  </div>\n\n')
        i = s.index('  <div class="intro">')
        p.write_text(s[:i] + banner + s[i:])
    h = here / "index.html"
    s = h.read_text()
    s = s.replace(f'<a href="Foundations-Mock-Exam-{n}/">#{n}</a>', f'<a href="Foundations-Mock-Exam-{n}/plain/">#{n} plain</a> (<a href="Foundations-Mock-Exam-{n}/">original</a>)')
    h.write_text(s)
    print("linked", n)
