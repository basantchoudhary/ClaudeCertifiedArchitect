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
| 🧪 **CCA-F · Domain 1 — Mock Exam Bank** (7 sets + full mock, 118 questions, instant scoring) | [open ›](https://basantchoudhary.github.io/ClaudeCertifiedArchitect/CCA-F/D1-Agentic-Architecture/quizzes/index.html) |
| **CCA-F · Domain 2 — Claude Code** (curriculum hub · 8 clusters, 41 subtopics) | [open ›](https://basantchoudhary.github.io/ClaudeCertifiedArchitect/CCA-F/D2-Claude-Code/index.html) |
| 🧪 **CCA-F · Domain 2 — Mock Exam Bank** (8 sets + full mock, 121 questions, instant scoring) | [open ›](https://basantchoudhary.github.io/ClaudeCertifiedArchitect/CCA-F/D2-Claude-Code/quizzes/index.html) |
| **CCA-F · Domain 3 — Prompt Engineering** (curriculum hub · 8 clusters, 40 subtopics) | [open ›](https://basantchoudhary.github.io/ClaudeCertifiedArchitect/CCA-F/D3-Prompt-Engineering/index.html) |
| 🧪 **CCA-F · Domain 3 — Mock Exam Bank** (8 sets + full mock, 120 questions, instant scoring) | [open ›](https://basantchoudhary.github.io/ClaudeCertifiedArchitect/CCA-F/D3-Prompt-Engineering/quizzes/index.html) |
| CCA-F full study guide | [open ›](https://basantchoudhary.github.io/ClaudeCertifiedArchitect/CCA-F/CCA-F_Study_Guide.html) |
| CCAR-P full study guide | [open ›](https://basantchoudhary.github.io/ClaudeCertifiedArchitect/CCAR-P/CCAR-P_Study_Guide.html) |
| Production Projects roadmap | [open ›](https://basantchoudhary.github.io/ClaudeCertifiedArchitect/Production-Projects/Production_Projects.html) |

## 📊 CCA-F exam blueprint — domains & weight

| # | Domain | Weight | Key focus areas | Mock exam |
|---|--------|:------:|-----------------|-----------|
| **D1** | Agentic Architecture & Orchestration | **27%** | Agentic loops, `stop_reason`, multi-agent patterns, orchestration | [Take quiz ›](CCA-F/D1-Agentic-Architecture/quizzes/index.html) |
| **D2** | Claude Code Configuration & Workflows | **20%** | `CLAUDE.md`, skills, commands, hooks, subagents | [Take quiz ›](CCA-F/D2-Claude-Code/quizzes/index.html) |
| **D3** | Prompt Engineering & Structured Outputs | **20%** | System prompts, JSON output, few-shot examples | [Take quiz ›](CCA-F/D3-Prompt-Engineering/quizzes/index.html) |
| **D4** | Tool Design & MCP Integration | **18%** | Tool definitions, MCP primitives, error handling | _coming soon_ |
| **D5** | Context Management & Reliability | **15%** | Token budgeting, prompt caching, reliability | _coming soon_ |
| | **Total** | **100%** | | |

> **Key insight:** Domain 1 (Agentic Architecture) is the largest and hardest slice at 27% — master it first and you've effectively passed a quarter of the exam.

## 🗂️ Domain subtopics

### D1 · Agentic Architecture & Orchestration (27%)

**Cluster 1 · Foundations of the Agentic Loop**

| # | Subtopic |
|:-:|----------|
| 1.1 | [Agent vs Workflow vs Single Call](CCA-F/D1-Agentic-Architecture/subtopics/1-1-agent-vs-workflow-vs-call.html) |
| 1.2 | [The Messages API as Substrate](CCA-F/D1-Agentic-Architecture/subtopics/1-2-messages-api-substrate.html) |
| 1.3 | [The Loop Mechanics](CCA-F/D1-Agentic-Architecture/subtopics/1-3-loop-mechanics.html) |
| 1.4 | [Statelessness & Conversation State](CCA-F/D1-Agentic-Architecture/subtopics/1-4-statelessness-conversation-state.html) |
| 1.5 | [Message Structure & Content Blocks](CCA-F/D1-Agentic-Architecture/subtopics/1-5-message-structure-blocks.html) |
| 1.6 | [Appending the Whole Assistant Turn](CCA-F/D1-Agentic-Architecture/subtopics/1-6-appending-whole-turn.html) |

**Cluster 2 · Stop Reasons & Turn Control**

| # | Subtopic |
|:-:|----------|
| 2.1 | [The Six stop_reason Values](CCA-F/D1-Agentic-Architecture/subtopics/2-1-stop-reason-overview.html) |
| 2.2 | [Handling tool_use](CCA-F/D1-Agentic-Architecture/subtopics/2-2-tool-use-handling.html) |
| 2.3 | [max_tokens vs. Context-Window-Exceeded](CCA-F/D1-Agentic-Architecture/subtopics/2-3-max-tokens-vs-context-window.html) |
| 2.4 | [pause_turn & Server-Side Tool Loops](CCA-F/D1-Agentic-Architecture/subtopics/2-4-pause-turn-server-tools.html) |
| 2.5 | [refusal & stop_details](CCA-F/D1-Agentic-Architecture/subtopics/2-5-refusal-handling.html) |
| 2.6 | [stop_sequence & Custom Protocols](CCA-F/D1-Agentic-Architecture/subtopics/2-6-stop-sequence.html) |

**Cluster 3 · Tool Use within Orchestration**

| # | Subtopic |
|:-:|----------|
| 3.1 | [The Tool Request/Result Cycle](CCA-F/D1-Agentic-Architecture/subtopics/3-1-tool-request-result-cycle.html) |
| 3.2 | [The tool_result Contract](CCA-F/D1-Agentic-Architecture/subtopics/3-2-tool-result-contract.html) |
| 3.3 | [Parallel Tool Calls](CCA-F/D1-Agentic-Architecture/subtopics/3-3-parallel-tool-calls.html) |
| 3.4 | [tool_choice as a Control Lever](CCA-F/D1-Agentic-Architecture/subtopics/3-4-tool-choice-control.html) |
| 3.5 | [Tool Runner vs. Manual Loop](CCA-F/D1-Agentic-Architecture/subtopics/3-5-tool-runner-vs-manual-loop.html) |
| 3.6 | [Human-in-the-Loop / Approval Gates](CCA-F/D1-Agentic-Architecture/subtopics/3-6-human-in-the-loop-gates.html) |

**Cluster 4 · Multi-Agent Orchestration**

| # | Subtopic |
|:-:|----------|
| 4.1 | [Single-Agent-+-Tools vs Multi-Agent](CCA-F/D1-Agentic-Architecture/subtopics/4-1-single-vs-multi-agent.html) |
| 4.2 | [Orchestration Patterns](CCA-F/D1-Agentic-Architecture/subtopics/4-2-orchestration-patterns.html) |
| 4.3 | [Coordinator / Orchestrator Design](CCA-F/D1-Agentic-Architecture/subtopics/4-3-coordinator-design.html) |
| 4.4 | [Sub-Agent Design & Context Isolation](CCA-F/D1-Agentic-Architecture/subtopics/4-4-subagent-context-isolation.html) |
| 4.5 | [Explicit State Passing](CCA-F/D1-Agentic-Architecture/subtopics/4-5-state-passing.html) |
| 4.6 | [Parallel vs Sequential Execution](CCA-F/D1-Agentic-Architecture/subtopics/4-6-parallel-vs-sequential.html) |
| 4.7 | [Result Merging / Aggregation](CCA-F/D1-Agentic-Architecture/subtopics/4-7-result-merging.html) |
| 4.8 | [Sub-Agents as a Cost/Cache Tactic](CCA-F/D1-Agentic-Architecture/subtopics/4-8-subagents-cost-cache.html) |
| 4.9 | [Managed Agents vs Self-Orchestrated](CCA-F/D1-Agentic-Architecture/subtopics/4-9-managed-agents-awareness.html) |

**Cluster 5 · Autonomy & Guardrails**

| # | Subtopic |
|:-:|----------|
| 5.1 | [Autonomy Levels](CCA-F/D1-Agentic-Architecture/subtopics/5-1-autonomy-levels.html) |
| 5.2 | [Permission Policies & Confirmation Gates](CCA-F/D1-Agentic-Architecture/subtopics/5-2-permission-policies-gates.html) |
| 5.3 | [Loop Termination Conditions](CCA-F/D1-Agentic-Architecture/subtopics/5-3-loop-termination.html) |
| 5.4 | [Reversibility as a Design Axis](CCA-F/D1-Agentic-Architecture/subtopics/5-4-reversibility.html) |

**Cluster 6 · Reliability, Failure & Recovery**

| # | Subtopic |
|:-:|----------|
| 6.1 | [Failure Modes](CCA-F/D1-Agentic-Architecture/subtopics/6-1-failure-modes.html) |
| 6.2 | [Circuit Breakers](CCA-F/D1-Agentic-Architecture/subtopics/6-2-circuit-breakers.html) |
| 6.3 | [Retry with Backoff & Error Codes](CCA-F/D1-Agentic-Architecture/subtopics/6-3-retry-backoff-errors.html) |
| 6.4 | [Fallback Strategies](CCA-F/D1-Agentic-Architecture/subtopics/6-4-fallback-strategies.html) |
| 6.5 | [Escalation to Human](CCA-F/D1-Agentic-Architecture/subtopics/6-5-escalation.html) |
| 6.6 | [Idempotency & Side-Effect Safety](CCA-F/D1-Agentic-Architecture/subtopics/6-6-idempotency-side-effects.html) |
| 6.7 | [Timeouts (Per-Step & Chain)](CCA-F/D1-Agentic-Architecture/subtopics/6-7-timeouts.html) |

**Cluster 7 · Performance, State & Cost Levers**

| # | Subtopic |
|:-:|----------|
| 7.1 | [Model Selection per Role](CCA-F/D1-Agentic-Architecture/subtopics/7-1-model-selection.html) |
| 7.2 | [Adaptive Thinking & Effort](CCA-F/D1-Agentic-Architecture/subtopics/7-2-thinking-effort.html) |
| 7.3 | [Prompt Caching in Agent Loops](CCA-F/D1-Agentic-Architecture/subtopics/7-3-prompt-caching-loops.html) |
| 7.4 | [Streaming in Long Agentic Runs](CCA-F/D1-Agentic-Architecture/subtopics/7-4-streaming.html) |
| 7.5 | [Conversation-State Management](CCA-F/D1-Agentic-Architecture/subtopics/7-5-conversation-state-mgmt.html) |
| 7.6 | [Observability & Agent Metrics](CCA-F/D1-Agentic-Architecture/subtopics/7-6-observability-metrics.html) |

*(7 clusters · 44 subtopics — or open the [Domain 1 curriculum hub](CCA-F/D1-Agentic-Architecture/index.html) for the full deep-dive)*

### D2 · Claude Code Configuration & Workflows (20%)

8 clusters · 41 subtopics · every flag/setting/hook-event verified against the official Claude Code docs. Full deep-dive: [Domain 2 curriculum hub](CCA-F/D2-Claude-Code/index.html).

**Cluster 1 · Memory & CLAUDE.md**

| # | Subtopic |
|:-:|----------|
| 1.1 | [What CLAUDE.md Is & When It Loads](CCA-F/D2-Claude-Code/subtopics/1-1-claude-md-what-and-when.html) |
| 1.2 | [The Memory Hierarchy](CCA-F/D2-Claude-Code/subtopics/1-2-memory-hierarchy.html) |
| 1.3 | [Imports (@path) & Tree Lookup](CCA-F/D2-Claude-Code/subtopics/1-3-imports-and-recursion.html) |
| 1.4 | [Writing an Effective CLAUDE.md](CCA-F/D2-Claude-Code/subtopics/1-4-writing-effective-claude-md.html) |
| 1.5 | [Quick-Add (#) & the /memory Command](CCA-F/D2-Claude-Code/subtopics/1-5-quick-add-and-memory-command.html) |
| 1.6 | [Nested / Sub-directory CLAUDE.md](CCA-F/D2-Claude-Code/subtopics/1-6-nested-scoping.html) |

**Cluster 2 · Settings & Configuration**

| # | Subtopic |
|:-:|----------|
| 2.1 | [settings.json & Its Precedence](CCA-F/D2-Claude-Code/subtopics/2-1-settings-json-hierarchy.html) |
| 2.2 | [Key Settings You Must Know](CCA-F/D2-Claude-Code/subtopics/2-2-key-settings.html) |
| 2.3 | [Environment Variables](CCA-F/D2-Claude-Code/subtopics/2-3-env-vars.html) |
| 2.4 | [The .claude Directory & /config](CCA-F/D2-Claude-Code/subtopics/2-4-claude-dir-layout.html) |

**Cluster 3 · Permissions & Safety**

| # | Subtopic |
|:-:|----------|
| 3.1 | [Permission Modes](CCA-F/D2-Claude-Code/subtopics/3-1-permission-modes.html) |
| 3.2 | [Allow / Deny / Ask Rules](CCA-F/D2-Claude-Code/subtopics/3-2-allow-deny-ask-rules.html) |
| 3.3 | [Directory Access & Working Dirs](CCA-F/D2-Claude-Code/subtopics/3-3-directory-access.html) |
| 3.4 | [Sandboxing & Bypassing Prompts](CCA-F/D2-Claude-Code/subtopics/3-4-sandboxing.html) |
| 3.5 | [Enterprise Managed Policy](CCA-F/D2-Claude-Code/subtopics/3-5-managed-policy.html) |

**Cluster 4 · Slash Commands**

| # | Subtopic |
|:-:|----------|
| 4.1 | [Built-in Slash Commands](CCA-F/D2-Claude-Code/subtopics/4-1-builtin-commands.html) |
| 4.2 | [Custom Slash Commands](CCA-F/D2-Claude-Code/subtopics/4-2-custom-commands.html) |
| 4.3 | [Command Frontmatter](CCA-F/D2-Claude-Code/subtopics/4-3-command-frontmatter.html) |
| 4.4 | [Arguments & Injection](CCA-F/D2-Claude-Code/subtopics/4-4-arguments-injection.html) |
| 4.5 | [Command Scopes](CCA-F/D2-Claude-Code/subtopics/4-5-command-scopes.html) |

**Cluster 5 · Skills**

| # | Subtopic |
|:-:|----------|
| 5.1 | [What Agent Skills Are](CCA-F/D2-Claude-Code/subtopics/5-1-what-are-skills.html) |
| 5.2 | [Progressive Disclosure & Invocation](CCA-F/D2-Claude-Code/subtopics/5-2-progressive-disclosure.html) |
| 5.3 | [Skill Structure & Bundled Resources](CCA-F/D2-Claude-Code/subtopics/5-3-skill-structure.html) |
| 5.4 | [Skills vs Commands vs Subagents vs MCP](CCA-F/D2-Claude-Code/subtopics/5-4-skills-vs-others.html) |
| 5.5 | [Distributing Skills (Plugins)](CCA-F/D2-Claude-Code/subtopics/5-5-distributing-skills.html) |

**Cluster 6 · Hooks**

| # | Subtopic |
|:-:|----------|
| 6.1 | [Hook Events Overview](CCA-F/D2-Claude-Code/subtopics/6-1-hook-events.html) |
| 6.2 | [Hook Configuration & Matchers](CCA-F/D2-Claude-Code/subtopics/6-2-hook-configuration.html) |
| 6.3 | [Hook Input & Output](CCA-F/D2-Claude-Code/subtopics/6-3-hook-io.html) |
| 6.4 | [Blocking & Decision Control](CCA-F/D2-Claude-Code/subtopics/6-4-blocking-decisions.html) |
| 6.5 | [Hook Use Cases](CCA-F/D2-Claude-Code/subtopics/6-5-hook-use-cases.html) |
| 6.6 | [Hook Security](CCA-F/D2-Claude-Code/subtopics/6-6-hook-security.html) |

**Cluster 7 · Subagents**

| # | Subtopic |
|:-:|----------|
| 7.1 | [What Subagents Are](CCA-F/D2-Claude-Code/subtopics/7-1-what-are-subagents.html) |
| 7.2 | [Subagent Configuration](CCA-F/D2-Claude-Code/subtopics/7-2-subagent-config.html) |
| 7.3 | [Context Isolation & Delegation](CCA-F/D2-Claude-Code/subtopics/7-3-context-isolation.html) |
| 7.4 | [Invoking Subagents](CCA-F/D2-Claude-Code/subtopics/7-4-invoking-subagents.html) |
| 7.5 | [Subagents vs Skills vs Commands](CCA-F/D2-Claude-Code/subtopics/7-5-subagents-vs-others.html) |

**Cluster 8 · Automation, MCP & Integrations**

| # | Subtopic |
|:-:|----------|
| 8.1 | [Headless Mode & Scripting](CCA-F/D2-Claude-Code/subtopics/8-1-headless-mode.html) |
| 8.2 | [Adding MCP Servers](CCA-F/D2-Claude-Code/subtopics/8-2-mcp-in-claude-code.html) |
| 8.3 | [Using MCP in Claude Code](CCA-F/D2-Claude-Code/subtopics/8-3-mcp-usage.html) |
| 8.4 | [CI & GitHub Actions](CCA-F/D2-Claude-Code/subtopics/8-4-ci-github-actions.html) |
| 8.5 | [IDE Integrations & the SDK](CCA-F/D2-Claude-Code/subtopics/8-5-ide-integrations.html) |

### D3 · Prompt Engineering & Structured Outputs (20%)

8 clusters · 40 subtopics · every technique & API parameter verified against the official prompt-engineering docs and the Messages API. Full deep-dive: [Domain 3 curriculum hub](CCA-F/D3-Prompt-Engineering/index.html).

**Cluster 1 · Foundations & Being Clear**

| # | Subtopic |
|:-:|----------|
| 1.1 | [What Prompt Engineering Is & When to Use It](CCA-F/D3-Prompt-Engineering/subtopics/1-1-what-is-prompt-engineering.html) |
| 1.2 | [The Empirical, Iterative Loop](CCA-F/D3-Prompt-Engineering/subtopics/1-2-empirical-iterative-loop.html) |
| 1.3 | [Be Clear and Direct](CCA-F/D3-Prompt-Engineering/subtopics/1-3-be-clear-and-direct.html) |
| 1.4 | [Sequential Steps & Numbered Instructions](CCA-F/D3-Prompt-Engineering/subtopics/1-4-sequential-steps.html) |
| 1.5 | [The Prompt Anatomy (Element Order)](CCA-F/D3-Prompt-Engineering/subtopics/1-5-prompt-anatomy.html) |

**Cluster 2 · Roles & System Prompts**

| # | Subtopic |
|:-:|----------|
| 2.1 | [The System Parameter vs the User Turn](CCA-F/D3-Prompt-Engineering/subtopics/2-1-system-parameter.html) |
| 2.2 | [Giving Claude a Role (Persona)](CCA-F/D3-Prompt-Engineering/subtopics/2-2-role-prompting.html) |
| 2.3 | [What Belongs in System vs User](CCA-F/D3-Prompt-Engineering/subtopics/2-3-system-vs-user.html) |
| 2.4 | [Tone, Character & Staying in Character](CCA-F/D3-Prompt-Engineering/subtopics/2-4-tone-and-character.html) |
| 2.5 | [Prompt Templates & Variables](CCA-F/D3-Prompt-Engineering/subtopics/2-5-prompt-templates-variables.html) |

**Cluster 3 · Examples (Multishot)**

| # | Subtopic |
|:-:|----------|
| 3.1 | [Why Examples Work (Multishot)](CCA-F/D3-Prompt-Engineering/subtopics/3-1-why-examples-work.html) |
| 3.2 | [How Many Examples & Choosing Them](CCA-F/D3-Prompt-Engineering/subtopics/3-2-how-many-examples.html) |
| 3.3 | [Formatting & Wrapping Examples](CCA-F/D3-Prompt-Engineering/subtopics/3-3-formatting-examples.html) |
| 3.4 | [Covering Edge Cases with Examples](CCA-F/D3-Prompt-Engineering/subtopics/3-4-edge-cases-examples.html) |
| 3.5 | [Example Pitfalls (Leakage, Over-fit)](CCA-F/D3-Prompt-Engineering/subtopics/3-5-example-pitfalls.html) |

**Cluster 4 · Structure with XML Tags**

| # | Subtopic |
|:-:|----------|
| 4.1 | [Why XML Tags Reduce Ambiguity](CCA-F/D3-Prompt-Engineering/subtopics/4-1-why-xml-tags.html) |
| 4.2 | [Common Tag Patterns](CCA-F/D3-Prompt-Engineering/subtopics/4-2-common-tag-patterns.html) |
| 4.3 | [Separating Data from Instructions](CCA-F/D3-Prompt-Engineering/subtopics/4-3-separating-data-instructions.html) |
| 4.4 | [Nesting & Referencing Tags](CCA-F/D3-Prompt-Engineering/subtopics/4-4-nesting-referencing-tags.html) |
| 4.5 | [Long-Context Structuring](CCA-F/D3-Prompt-Engineering/subtopics/4-5-long-context-structuring.html) |

**Cluster 5 · Chain of Thought & Extended Thinking**

| # | Subtopic |
|:-:|----------|
| 5.1 | [Let Claude Think (CoT) — When It Helps](CCA-F/D3-Prompt-Engineering/subtopics/5-1-let-claude-think.html) |
| 5.2 | [Structured Thinking with Tags](CCA-F/D3-Prompt-Engineering/subtopics/5-2-structured-thinking-tags.html) |
| 5.3 | [Extended Thinking vs Prompted CoT](CCA-F/D3-Prompt-Engineering/subtopics/5-3-extended-thinking.html) |
| 5.4 | [Thinking with Tool Use](CCA-F/D3-Prompt-Engineering/subtopics/5-4-thinking-with-tools.html) |
| 5.5 | [CoT Trade-offs & When Not to Use](CCA-F/D3-Prompt-Engineering/subtopics/5-5-cot-tradeoffs.html) |

**Cluster 6 · Prefill & Output Control**

| # | Subtopic |
|:-:|----------|
| 6.1 | [Prefilling the Assistant Turn](CCA-F/D3-Prompt-Engineering/subtopics/6-1-prefilling-basics.html) |
| 6.2 | [Prefill to Control Format](CCA-F/D3-Prompt-Engineering/subtopics/6-2-prefill-format-control.html) |
| 6.3 | [Prefill to Steer & Stay in Character](CCA-F/D3-Prompt-Engineering/subtopics/6-3-prefill-character-steering.html) |
| 6.4 | [Stop Sequences as Output Control](CCA-F/D3-Prompt-Engineering/subtopics/6-4-stop-sequences.html) |
| 6.5 | [Prefill Constraints & Gotchas](CCA-F/D3-Prompt-Engineering/subtopics/6-5-prefill-constraints.html) |

**Cluster 7 · Structured Outputs & JSON**

| # | Subtopic |
|:-:|----------|
| 7.1 | [Increasing Output Consistency](CCA-F/D3-Prompt-Engineering/subtopics/7-1-output-consistency.html) |
| 7.2 | [JSON via Prefill + Stop Sequence](CCA-F/D3-Prompt-Engineering/subtopics/7-2-json-prefill-stop.html) |
| 7.3 | [Tool Use to Force a Schema](CCA-F/D3-Prompt-Engineering/subtopics/7-3-tool-use-for-json.html) |
| 7.4 | [The Structured Outputs Feature](CCA-F/D3-Prompt-Engineering/subtopics/7-4-structured-outputs-feature.html) |
| 7.5 | [Streaming & Parsing Structured Output](CCA-F/D3-Prompt-Engineering/subtopics/7-5-streaming-parsing-json.html) |

**Cluster 8 · Reliability, Hallucination & Iteration**

| # | Subtopic |
|:-:|----------|
| 8.1 | [Reducing Hallucinations](CCA-F/D3-Prompt-Engineering/subtopics/8-1-reduce-hallucinations.html) |
| 8.2 | [Grounding in Documents & Citations](CCA-F/D3-Prompt-Engineering/subtopics/8-2-grounding-citations.html) |
| 8.3 | [Chaining Complex Prompts](CCA-F/D3-Prompt-Engineering/subtopics/8-3-chaining-prompts.html) |
| 8.4 | [Evaluating & Iterating (Success Criteria)](CCA-F/D3-Prompt-Engineering/subtopics/8-4-evaluating-iterating.html) |
| 8.5 | [The Prompt Improver & Templates](CCA-F/D3-Prompt-Engineering/subtopics/8-5-prompt-improver-templates.html) |

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
  D2-Claude-Code/               Domain 2 deep-dive (20% of exam)
    index.html                  curriculum hub — 41 subtopics, 8 clusters
    subtopics/                  architect-level page per subtopic
    quizzes/                    interactive mock exam bank (121 questions)
    assets/style.css            shared styling
  D3-Prompt-Engineering/        Domain 3 deep-dive (20% of exam)
    index.html                  curriculum hub — 40 subtopics, 8 clusters
    subtopics/                  architect-level page per subtopic
    quizzes/                    interactive mock exam bank (120 questions)
    assets/style.css            shared styling
  D4-Tool-Design-MCP/           (planned)
  D5-Context-Management/        (planned)
CCAR-P/                         Claude Certified Architect — Professional
Production-Projects/            hands-on build roadmap
```

## Notes

- Pages render via **GitHub Pages** (served from `main`); changes appear ~1 min after a push.
- Diagrams use **Mermaid.js** (loaded from a CDN — needs internet on first load).
- Links between pages are relative, so everything works locally *and* on the live site.
