# ClaudeCertifiedArchitect

Study material for Anthropic's **Claude Certified Architect** exams — CCA-F (Foundations) and
CCAR-P (Professional). Interactive HTML pages with diagrams, runnable code, flashcards, and
practice questions.

## 🌐 View the live site (rendered)

> GitHub shows `.html` files as source. To see them **rendered** (styling + Mermaid diagrams),
> use the GitHub Pages links below — not the file view.

**➡️ https://basantchoudhary.github.io/ClaudeCertifiedArchitect/**

| Section | Live link |
|---------|-----------|
| **CCA-F · Domain 1 — Agentic Architecture** (curriculum hub) | [open ›](https://basantchoudhary.github.io/ClaudeCertifiedArchitect/CCA-F/D1-Agentic-Architecture/index.html) |
| CCA-F · Domain 1 — visual overview & flashcards | [open ›](https://basantchoudhary.github.io/ClaudeCertifiedArchitect/CCA-F/D1-Agentic-Architecture/overview.html) |
| CCA-F full study guide | [open ›](https://basantchoudhary.github.io/ClaudeCertifiedArchitect/CCA-F/CCA-F_Study_Guide.html) |
| CCAR-P full study guide | [open ›](https://basantchoudhary.github.io/ClaudeCertifiedArchitect/CCAR-P/CCAR-P_Study_Guide.html) |
| Production Projects roadmap | [open ›](https://basantchoudhary.github.io/ClaudeCertifiedArchitect/Production-Projects/Production_Projects.html) |

## Repository layout

```
CCA-F/                          Claude Certified Architect — Foundations
  CCA-F_Study_Guide.html        full study guide
  D1-Agentic-Architecture/      Domain 1 deep-dive (27% of exam)
    index.html                  curriculum hub — 44 subtopics, 7 clusters
    overview.html               one-page visual overview + flashcards
    subtopics/                  architect-level page per subtopic
    examples/                   runnable Python demos
    assets/style.css            shared styling
  D2-Claude-Code/               (planned)
  D3-Prompt-Engineering/        (planned)
  D4-Tool-Design-MCP/           (planned)
  D5-Context-Management/        (planned)
CCAR-P/                         Claude Certified Architect — Professional
Production-Projects/            hands-on build roadmap
```

## Notes

- Pages render via **GitHub Pages** (served from `main`); changes appear ~1 min after a push.
- Diagrams use **Mermaid.js** (loaded from a CDN — needs internet on first load).
- Links between pages are relative, so everything works locally *and* on the live site.
