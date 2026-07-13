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

| Cluster | Subtopics (click to open) |
|:-------:|---------------------------|
| **1 · Foundations of the Agentic Loop** | [1.1 Agent vs Workflow vs Single Call](CCA-F/D1-Agentic-Architecture/subtopics/1-1-agent-vs-workflow-vs-call.html) · [1.2 The Messages API as Substrate](CCA-F/D1-Agentic-Architecture/subtopics/1-2-messages-api-substrate.html) · [1.3 The Loop Mechanics](CCA-F/D1-Agentic-Architecture/subtopics/1-3-loop-mechanics.html) · [1.4 Statelessness & Conversation State](CCA-F/D1-Agentic-Architecture/subtopics/1-4-statelessness-conversation-state.html) · [1.5 Message Structure & Content Blocks](CCA-F/D1-Agentic-Architecture/subtopics/1-5-message-structure-blocks.html) · [1.6 Appending the Whole Assistant Turn](CCA-F/D1-Agentic-Architecture/subtopics/1-6-appending-whole-turn.html) |
| **2 · Stop Reasons & Turn Control** | [2.1 The Six stop_reason Values](CCA-F/D1-Agentic-Architecture/subtopics/2-1-stop-reason-overview.html) · [2.2 Handling tool_use](CCA-F/D1-Agentic-Architecture/subtopics/2-2-tool-use-handling.html) · [2.3 max_tokens vs. Context-Window-Exceeded](CCA-F/D1-Agentic-Architecture/subtopics/2-3-max-tokens-vs-context-window.html) · [2.4 pause_turn & Server-Side Tool Loops](CCA-F/D1-Agentic-Architecture/subtopics/2-4-pause-turn-server-tools.html) · [2.5 refusal & stop_details](CCA-F/D1-Agentic-Architecture/subtopics/2-5-refusal-handling.html) · [2.6 stop_sequence & Custom Protocols](CCA-F/D1-Agentic-Architecture/subtopics/2-6-stop-sequence.html) |
| **3 · Tool Use within Orchestration** | [3.1 The Tool Request/Result Cycle](CCA-F/D1-Agentic-Architecture/subtopics/3-1-tool-request-result-cycle.html) · [3.2 The tool_result Contract](CCA-F/D1-Agentic-Architecture/subtopics/3-2-tool-result-contract.html) · [3.3 Parallel Tool Calls](CCA-F/D1-Agentic-Architecture/subtopics/3-3-parallel-tool-calls.html) · [3.4 tool_choice as a Control Lever](CCA-F/D1-Agentic-Architecture/subtopics/3-4-tool-choice-control.html) · [3.5 Tool Runner vs. Manual Loop](CCA-F/D1-Agentic-Architecture/subtopics/3-5-tool-runner-vs-manual-loop.html) · [3.6 Human-in-the-Loop / Approval Gates](CCA-F/D1-Agentic-Architecture/subtopics/3-6-human-in-the-loop-gates.html) |
| **4 · Multi-Agent Orchestration** | [4.1 Single-Agent-+-Tools vs Multi-Agent](CCA-F/D1-Agentic-Architecture/subtopics/4-1-single-vs-multi-agent.html) · [4.2 Orchestration Patterns](CCA-F/D1-Agentic-Architecture/subtopics/4-2-orchestration-patterns.html) · [4.3 Coordinator / Orchestrator Design](CCA-F/D1-Agentic-Architecture/subtopics/4-3-coordinator-design.html) · [4.4 Sub-Agent Design & Context Isolation](CCA-F/D1-Agentic-Architecture/subtopics/4-4-subagent-context-isolation.html) · [4.5 Explicit State Passing](CCA-F/D1-Agentic-Architecture/subtopics/4-5-state-passing.html) · [4.6 Parallel vs Sequential Execution](CCA-F/D1-Agentic-Architecture/subtopics/4-6-parallel-vs-sequential.html) · [4.7 Result Merging / Aggregation](CCA-F/D1-Agentic-Architecture/subtopics/4-7-result-merging.html) · [4.8 Sub-Agents as a Cost/Cache Tactic](CCA-F/D1-Agentic-Architecture/subtopics/4-8-subagents-cost-cache.html) · [4.9 Managed Agents vs Self-Orchestrated](CCA-F/D1-Agentic-Architecture/subtopics/4-9-managed-agents-awareness.html) |
| **5 · Autonomy & Guardrails** | [5.1 Autonomy Levels](CCA-F/D1-Agentic-Architecture/subtopics/5-1-autonomy-levels.html) · [5.2 Permission Policies & Confirmation Gates](CCA-F/D1-Agentic-Architecture/subtopics/5-2-permission-policies-gates.html) · [5.3 Loop Termination Conditions](CCA-F/D1-Agentic-Architecture/subtopics/5-3-loop-termination.html) · [5.4 Reversibility as a Design Axis](CCA-F/D1-Agentic-Architecture/subtopics/5-4-reversibility.html) |
| **6 · Reliability, Failure & Recovery** | [6.1 Failure Modes](CCA-F/D1-Agentic-Architecture/subtopics/6-1-failure-modes.html) · [6.2 Circuit Breakers](CCA-F/D1-Agentic-Architecture/subtopics/6-2-circuit-breakers.html) · [6.3 Retry with Backoff & Error Codes](CCA-F/D1-Agentic-Architecture/subtopics/6-3-retry-backoff-errors.html) · [6.4 Fallback Strategies](CCA-F/D1-Agentic-Architecture/subtopics/6-4-fallback-strategies.html) · [6.5 Escalation to Human](CCA-F/D1-Agentic-Architecture/subtopics/6-5-escalation.html) · [6.6 Idempotency & Side-Effect Safety](CCA-F/D1-Agentic-Architecture/subtopics/6-6-idempotency-side-effects.html) · [6.7 Timeouts (Per-Step & Chain)](CCA-F/D1-Agentic-Architecture/subtopics/6-7-timeouts.html) |
| **7 · Performance, State & Cost Levers** | [7.1 Model Selection per Role](CCA-F/D1-Agentic-Architecture/subtopics/7-1-model-selection.html) · [7.2 Adaptive Thinking & Effort](CCA-F/D1-Agentic-Architecture/subtopics/7-2-thinking-effort.html) · [7.3 Prompt Caching in Agent Loops](CCA-F/D1-Agentic-Architecture/subtopics/7-3-prompt-caching-loops.html) · [7.4 Streaming in Long Agentic Runs](CCA-F/D1-Agentic-Architecture/subtopics/7-4-streaming.html) · [7.5 Conversation-State Management](CCA-F/D1-Agentic-Architecture/subtopics/7-5-conversation-state-mgmt.html) · [7.6 Observability & Agent Metrics](CCA-F/D1-Agentic-Architecture/subtopics/7-6-observability-metrics.html) |

*(7 clusters · 44 subtopics — or open the [Domain 1 curriculum hub](CCA-F/D1-Agentic-Architecture/index.html) for the full deep-dive)*

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
