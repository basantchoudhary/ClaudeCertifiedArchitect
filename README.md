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

## 📊 CCA-F exam blueprint — domains & weight

| # | Domain | Weight | Key focus areas |
|---|--------|:------:|-----------------|
| **D1** | Agentic Architecture & Orchestration | **27%** | Agentic loops, `stop_reason`, multi-agent patterns, orchestration |
| **D2** | Claude Code Configuration & Workflows | **20%** | `CLAUDE.md`, skills, commands, hooks, subagents |
| **D3** | Prompt Engineering & Structured Outputs | **20%** | System prompts, JSON output, few-shot examples |
| **D4** | Tool Design & MCP Integration | **18%** | Tool definitions, MCP primitives, error handling |
| **D5** | Context Management & Reliability | **15%** | Token budgeting, prompt caching, reliability |
| | **Total** | **100%** | |

> **Key insight:** Domain 1 (Agentic Architecture) is the largest and hardest slice at 27% — master it first and you've effectively passed a quarter of the exam.

## 🗂️ Domain subtopics

### D1 · Agentic Architecture & Orchestration (27%)

| Cluster | Subtopic |
|:-------:|----------|
| 1 | Foundations of the Agentic Loop |
| 2 | Stop Reasons & Turn Control |
| 3 | Tool Use within Orchestration |
| 4 | Multi-Agent Orchestration |
| 5 | Autonomy & Guardrails |
| 6 | Reliability, Failure & Recovery |
| 7 | Performance, State & Cost Levers |

*(7 clusters · 44 subtopics — see the [Domain 1 curriculum hub](https://basantchoudhary.github.io/ClaudeCertifiedArchitect/CCA-F/D1-Agentic-Architecture/index.html))*

### D2 · Claude Code Configuration & Workflows (20%)

| Subtopic | Focus |
|----------|-------|
| `CLAUDE.md` hierarchy | Path-scoping, frontmatter syntax, team configuration |
| Skills | Reusable markdown instructions (`.claude/skills/`) |
| Commands | Custom slash commands (`/review`, `/test`, …) |
| Hooks | Lifecycle events (`before_command`, `after_command`, `on_error`) |
| Subagents | Isolated agents with restricted tools |

### D3 · Prompt Engineering & Structured Outputs (20%)

| Subtopic | Focus |
|----------|-------|
| System prompt design | Specific, role-based, constrained prompts |
| Structured output (JSON) | Constraining Claude to valid JSON schemas |
| Few-shot examples | 2–5 input → output examples for consistency |

### D4 · Tool Design & MCP Integration (18%)

| Subtopic | Focus |
|----------|-------|
| Tool definition quality | Clear descriptions > clever names; usage/anti-usage guidance |
| MCP primitives | Tools, Resources, Prompts, Sampling |
| Error handling | Graceful tool failures and result contracts |

### D5 · Context Management & Reliability (15%)

| Subtopic | Focus |
|----------|-------|
| Token budgeting | Pruning and summarizing conversation history |
| Prompt caching | Caching system prompt + reference docs (~90% cheaper cached tokens) |
| "Lost in the middle" | Placing key info at start/end of long prompts |
| Error recovery | Retry with backoff, fallback, escalation |

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
