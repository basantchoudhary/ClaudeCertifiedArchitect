"""Tell search engines that cleandataengineering.ai is the original copy of these pages.

The same pages are served twice: here on GitHub Pages and on cleandataengineering.ai
(copied by that site's _certifications/sync.py). Without a canonical tag Google picks
one copy on its own, usually the older one here. This stamps every page in the folders
the site copies with a canonical link to its cleandataengineering.ai address.

    python3 add_canonical.py    # run after any rebuild, before syncing the site

Pages that already have a canonical (the "moved" stubs) are left alone. Re-running is a no-op.
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SITE = "https://cleandataengineering.ai/certifications/claude-certified-architect/"
FOLDERS = ["CCA-F", "CCAR-P"]  # the folders the site copies


def url_of(rel: str) -> str:
    return SITE + (rel[: -len("index.html")] if rel.endswith("index.html") else rel)


def main() -> None:
    n = 0
    for folder in FOLDERS:
        for p in sorted((ROOT / folder).rglob("*.html")):
            if any(part.startswith(".") or part in ("parts", "src", "node_modules") for part in p.parts):
                continue
            s = p.read_text(errors="ignore")
            if 'rel="canonical"' in s or "</head>" not in s:
                continue
            tag = f'<link rel="canonical" href="{url_of(p.relative_to(ROOT).as_posix())}">'
            p.write_text(s.replace("</head>", tag + "\n</head>", 1))
            n += 1
    print(f"canonical added to {n} pages")


if __name__ == "__main__":
    main()
