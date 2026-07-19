# Claude Certified Architect – Foundations · Exam Guide

**Version 1.0 · Effective July 2026 · Exam code: CCAR-F**
*Authoritative reference for candidates. Transcribed from the official Anthropic Exam Guide (public).*

---

## 1. About This Certification

The Claude Certified Architect – Foundations certification validates that practitioners can make informed decisions about **tradeoffs** when implementing real-world solutions with Claude. It tests foundational knowledge across **Claude Code, the Claude Agent SDK, the Claude API, and Model Context Protocol (MCP)** — the core technologies used to build production-grade applications with Claude.

Questions are grounded in realistic scenarios drawn from actual customer use cases: agentic systems for customer support, multi-agent research pipelines, Claude Code in CI/CD, developer productivity tools, and structured data extraction. Candidates must demonstrate **practical judgment** about architecture, configuration, and tradeoffs — not just conceptual recall.

## 2. Intended Audience

A solution architect with hands-on experience in:
- Building agentic applications with the **Claude Agent SDK** (multi-agent orchestration, subagent delegation, tool integration, lifecycle hooks)
- Configuring **Claude Code** for team workflows (CLAUDE.md, Agent Skills, MCP servers, plan mode)
- Designing **MCP** tool and resource interfaces for backend integration
- Engineering prompts for reliable **structured output** (JSON schemas, few-shot examples, extraction)
- Managing **context windows** across long documents, multi-turn conversations, and multi-agent handoffs
- Integrating Claude into **CI/CD** (automated code review, test generation, PR feedback)
- Sound **escalation and reliability** decisions (error handling, human-in-the-loop, self-evaluation)

Typically **6+ months** practical experience with Claude APIs, Agent SDK, Claude Code, and MCP.

## 3. Exam Details at a Glance

| | |
|---|---|
| Credential | Claude Certified Architect – Foundations |
| Exam code | **CCAR-F** |
| Number of items | **60** |
| Item format | Multiple-choice and multiple-response (each item states how many to select) |
| Exam structure | **4 scenarios** drawn from a bank of **6** |
| Time limit | **120 minutes** |
| Delivery | Proctored: online and/or test center |
| Passing score | Scaled score of **720** on a scale of 100–1,000 |
| Exam fee | $125 USD |
| Validity | 12 months |
| Result reporting | Pass/fail + scaled score, plus **percent-correct by domain** |

## 4. Exam Content Outline (Blueprint)

| Domain | Content Domain | Weight |
|---|---|---|
| 1 | **Agentic Architecture & Orchestration** | **27%** |
| 2 | **Tool Design & MCP Integration** | **18%** |
| 3 | **Claude Code Configuration & Workflows** | **20%** |
| 4 | **Prompt Engineering & Structured Output** | **20%** |
| 5 | **Context Management & Reliability** | **15%** |

## 5. Exam Scenarios (bank of 6; 4 presented)

1. **Customer Support Resolution Agent** — Agent SDK; custom MCP tools (`get_customer`, `lookup_order`, `process_refund`, `escalate_to_human`); target 80%+ first-contact resolution with escalation. *(D1, D2, D5)*
2. **Code Generation with Claude Code** — custom slash commands, CLAUDE.md, plan mode vs direct execution. *(D3, D5)*
3. **Multi-Agent Research System** — coordinator delegates to search/analysis/synthesis/report subagents; cited reports. *(D1, D2, D5)*
4. **Developer Productivity with Claude** — explore codebases, built-in tools (Read/Write/Bash/Grep/Glob), MCP servers. *(D2, D3, D1)*
5. **Claude Code for Continuous Integration** — automated reviews, test generation, PR feedback, minimize false positives. *(D3, D4)*
6. **Structured Data Extraction** — extract from unstructured docs, validate via JSON schemas, handle edge cases. *(D4, D5)*

---

## 6. Detailed Objectives by Domain

### Domain 1: Agentic Architecture & Orchestration

**1.1 Design and implement agentic loops for autonomous task execution**
- The agentic loop lifecycle: send request → inspect `stop_reason` (`tool_use` vs `end_turn`) → execute tool → return result for next iteration.
- Tool results are appended to conversation history so the model reasons about the next action.
- Model-driven decision-making vs pre-configured decision trees / tool sequences.
- Continue the loop when `stop_reason == "tool_use"`; terminate when `"end_turn"`.
- **Anti-patterns:** parsing natural-language signals to determine termination; arbitrary iteration caps as the primary stop; checking assistant text content as a completion indicator.

**1.2 Orchestrate multi-agent systems with coordinator-subagent patterns**
- Hub-and-spoke: coordinator manages all inter-subagent communication, error handling, routing.
- Subagents have **isolated context** — they do not inherit the coordinator's history automatically.
- Coordinator handles task decomposition, delegation, aggregation, and selecting which subagents to invoke by query complexity.
- Risk: overly narrow decomposition → incomplete coverage of broad topics.
- Dynamically select subagents rather than always routing the full pipeline; partition scope to minimize duplication; iterative refinement loops (evaluate synthesis for gaps → re-delegate → re-synthesize).

**1.3 Configure subagent invocation, context passing, and spawning**
- **Task tool** spawns subagents; `allowedTools` must include `"Task"`.
- Subagent context must be provided **explicitly** in the prompt (no automatic inheritance / shared memory).
- `AgentDefinition`: descriptions, system prompts, tool restrictions per subagent.
- Fork-based session management for divergent approaches from a shared baseline.
- Include complete prior-agent findings in the subagent prompt; use structured formats to separate content from metadata (URLs, doc names, page numbers) for attribution; spawn parallel subagents by emitting **multiple Task calls in one response**; write coordinator prompts as goals + quality criteria, not step-by-step procedures.

**1.4 Implement multi-step workflows with enforcement and handoff patterns**
- Programmatic enforcement (hooks, prerequisite gates) vs prompt-based guidance.
- When deterministic compliance is required (e.g., identity verification before financial ops), prompt instructions have a non-zero failure rate.
- Block downstream tool calls until prerequisites complete (e.g., block `process_refund` until `get_customer` returns a verified ID).
- Decompose multi-concern requests; investigate in parallel with shared context; compile structured handoff summaries (customer ID, root cause, refund amount, recommended action) for humans without the transcript.

**1.5 Apply Agent SDK hooks for tool call interception and data normalization**
- `PostToolUse` hooks intercept results for transformation before the model sees them.
- Hooks intercept outgoing tool calls to enforce compliance (e.g., block refunds above a threshold).
- Hooks give deterministic guarantees vs prompt-based probabilistic compliance.
- Normalize heterogeneous formats (Unix ts, ISO 8601, numeric codes); block policy-violating actions (e.g., refunds > $500) and redirect to escalation.

**1.6 Design task decomposition strategies for complex workflows**
- Fixed sequential pipelines (prompt chaining) vs dynamic adaptive decomposition based on intermediate findings.
- Prompt chaining: analyze each file individually, then a cross-file integration pass.
- Adaptive investigation plans generate subtasks from what's discovered.

**1.7 Manage session state, resumption, and forking**
- `--resume <session-name>` continues a specific prior conversation.
- `fork_session` creates independent branches from a shared baseline.
- Inform the agent about file changes when resuming after modifications.
- Starting a new session with a structured summary is more reliable than resuming with stale tool results.

### Domain 2: Tool Design & MCP Integration

**2.1 Design effective tool interfaces with clear descriptions and boundaries**
- Tool descriptions are the **primary mechanism** LLMs use for selection; minimal descriptions → unreliable selection among similar tools.
- Include input formats, example queries, edge cases, boundaries.
- Ambiguous/overlapping descriptions cause misrouting; keyword-sensitive system-prompt wording creates unintended tool associations.
- Rename/split generic tools into purpose-specific tools with defined I/O contracts.

**2.2 Implement structured error responses for MCP tools**
- MCP `isError` flag communicates failures back to the agent.
- Distinguish transient (timeouts), validation (bad input), business (policy), permission errors.
- Uniform "Operation failed" prevents good recovery decisions.
- Return structured metadata: `errorCategory`, `isRetryable`, human-readable description; `retriable: false` + customer-friendly explanation for business violations; local recovery in subagents, propagate only unresolved errors with partial results; distinguish access failures from valid empty results.

**2.3 Distribute tools across agents and configure tool choice**
- Too many tools (18 vs 4-5) degrades selection reliability.
- Agents with off-specialization tools misuse them.
- Scoped access; limited cross-role tools for high-frequency needs.
- `tool_choice`: `"auto"`, `"any"`, forced `{"type":"tool","name":"..."}`.
- Force a tool to run first (e.g., `extract_metadata` before enrichment); `"any"` guarantees a tool call rather than text.

**2.4 Integrate MCP servers into Claude Code and agent workflows**
- Scoping: project-level `.mcp.json` (shared) vs user-level `~/.claude.json` (personal/experimental).
- Env var expansion in `.mcp.json` (e.g., `${GITHUB_TOKEN}`) — no committed secrets.
- All configured MCP servers' tools discovered at connection time, available simultaneously.
- MCP **resources** expose content catalogs (issue summaries, doc hierarchies, schemas) to reduce exploratory tool calls.
- Enhance MCP tool descriptions so the agent doesn't prefer built-ins (Grep) over more capable MCP tools; prefer community MCP servers for standard integrations (Jira).

**2.5 Select and apply built-in tools (Read, Write, Edit, Bash, Grep, Glob)**
- **Grep** = content search; **Glob** = file path patterns; **Read/Write** = full file ops; **Edit** = targeted change via unique text match.
- When Edit fails on non-unique match → Read + Write fallback.
- Build understanding incrementally: Grep entry points → Read to follow imports/trace flows (not read-all-upfront).

### Domain 3: Claude Code Configuration & Workflows

**3.1 CLAUDE.md hierarchy, scoping, modular organization**
- Hierarchy: user-level `~/.claude/CLAUDE.md`, project-level (`.claude/CLAUDE.md` or root `CLAUDE.md`), directory-level (subdir CLAUDE.md).
- User-level is **not shared** via version control.
- `@import` syntax for modular references; `.claude/rules/` for topic-specific rule files.
- `/memory` command verifies which memory files are loaded.

**3.2 Custom slash commands and skills**
- Project commands in `.claude/commands/` (shared) vs user `~/.claude/commands/` (personal).
- Skills in `.claude/skills/` with `SKILL.md` frontmatter: `context: fork`, `allowed-tools`, `argument-hint`.
- `context: fork` runs a skill in an isolated sub-agent context (no pollution of main conversation).
- Skills = on-demand task workflows; CLAUDE.md = always-loaded universal standards.

**3.3 Path-specific rules for conditional convention loading**
- `.claude/rules/` files with YAML `paths:` glob patterns → load only when editing matching files (reduces context/tokens).
- Glob-pattern rules beat directory CLAUDE.md for conventions spanning directories (e.g., `**/*.test.tsx`).

**3.4 Plan mode vs direct execution**
- Plan mode: large-scale changes, multiple valid approaches, architectural decisions, multi-file mods.
- Direct execution: simple well-scoped changes (single validation check).
- Plan mode enables safe exploration/design before committing → prevents rework.
- **Explore subagent** isolates verbose discovery output, returns summaries.

**3.5 Iterative refinement techniques**
- Concrete input/output examples communicate transformations better than prose.
- Test-driven iteration (write tests first, share failures); the **interview pattern** (Claude asks questions first); single message for interacting problems, sequential for independent ones.

**3.6 Integrate Claude Code into CI/CD**
- `-p` / `--print` = non-interactive mode (no input hang).
- `--output-format json` + `--json-schema` for machine-parseable findings → inline PR comments.
- CLAUDE.md provides project context (testing standards, fixtures, review criteria).
- **Session context isolation:** the session that generated code is less effective at reviewing its own changes than an independent instance.

### Domain 4: Prompt Engineering & Structured Output

**4.1 Explicit criteria to improve precision / reduce false positives**
- Explicit criteria beat vague instructions ("flag comments only when claimed behavior contradicts actual code" vs "check comments are accurate").
- "Be conservative" / "only high-confidence" don't improve precision like categorical criteria.
- High false-positive categories erode developer trust in accurate ones; define explicit severity criteria with concrete code examples.

**4.2 Few-shot prompting for consistency and quality**
- Few-shot is the most effective technique for consistent, actionable output when instructions alone are inconsistent.
- Demonstrate ambiguous-case handling; enable generalization to novel patterns; reduce extraction hallucination.
- 2-4 targeted examples showing reasoning for the chosen action; demonstrate desired output format (location, issue, severity, fix); handle varied doc structures.

**4.3 Structured output via tool use and JSON schemas**
- `tool_use` with JSON schemas = most reliable schema-compliant output (eliminates JSON syntax errors).
- `tool_choice`: `"auto"` (may return text), `"any"` (must call a tool), forced (specific named tool).
- Strict schemas eliminate **syntax** errors but not **semantic** errors (line items not summing, wrong fields).
- Optional/nullable fields prevent fabrication; enum `"unclear"`/`"other"` + detail for extensible categories.

**4.4 Validation, retry, and feedback loops for extraction quality**
- Retry-with-error-feedback: append specific validation errors on retry.
- Retries are ineffective when info is **absent from the source** (vs format/structural errors).
- Track `detected_pattern` fields to analyze dismissal/false-positive patterns.
- Self-correction: extract `calculated_total` alongside `stated_total`; `conflict_detected` booleans.

**4.5 Efficient batch processing strategies**
- Message Batches API: **50% cost savings**, up to **24-hour** window, no latency SLA.
- Good for non-blocking/latency-tolerant (overnight reports, weekly audits); bad for blocking (pre-merge).
- Batch API does **not** support multi-turn tool calling in a single request.
- `custom_id` correlates request/response; resubmit only failed docs by `custom_id`.

**4.6 Multi-instance and multi-pass review architectures**
- Self-review is limited: a model retains generation reasoning and won't question itself in-session.
- Independent review instances (no prior reasoning) catch subtle issues better than self-review/extended thinking.
- Multi-pass: per-file local analysis + cross-file integration passes (avoid attention dilution, contradictions).

### Domain 5: Context Management & Reliability

**5.1 Preserve critical information across long interactions**
- Progressive summarization risks condensing numbers, %, dates, customer expectations into vague summaries.
- **"Lost in the middle":** models reliably process beginning/end but may omit middle sections.
- Tool results accumulate and consume tokens disproportionately (40+ fields when 5 are relevant).
- Extract transactional facts into a persistent "case facts" block; trim verbose tool outputs to relevant fields; place key summaries at the beginning + explicit section headers.

**5.2 Escalation and ambiguity resolution patterns**
- Triggers: customer requests a human; policy exceptions/gaps; inability to progress.
- Escalate immediately on explicit demand; offer resolution when straightforward.
- Sentiment-based escalation and self-reported confidence are **unreliable** proxies for complexity.
- Multiple customer matches → ask for identifiers (not heuristic selection).

**5.3 Error propagation across multi-agent systems**
- Structured error context (failure type, attempted query, partial results, alternatives) enables coordinator recovery.
- Distinguish access failures (retry) from valid empty results.
- Generic statuses hide context; silently suppressing errors or terminating on single failure are both anti-patterns.

**5.4 Manage context in large codebase exploration**
- Context degradation: inconsistent answers, referencing "typical patterns" vs specific earlier findings.
- Scratchpad files persist key findings across boundaries; subagent delegation isolates verbose output.
- Structured state persistence (manifests) for crash recovery; `/compact` to reduce context usage.

**5.5 Human review workflows and confidence calibration**
- Aggregate accuracy (97%) can mask poor performance on specific doc types/fields.
- Stratified random sampling measures high-confidence error rates; field-level confidence calibrated on labeled sets routes review.
- Validate accuracy by document type and field before automating.

**5.6 Information provenance and uncertainty in multi-source synthesis**
- Source attribution is lost when summarization compresses without claim-source mappings.
- Preserve structured claim-source mappings through synthesis; annotate conflicting statistics with source attribution (don't arbitrarily pick one).
- Require publication/collection dates so temporal differences aren't misread as contradictions; render content types appropriately (financial as tables, news as prose).

---

## 9. Sample Questions (official, with answers)

> **Scenario: Customer Support Resolution Agent**

**Q1.** In 12% of cases the agent skips `get_customer` and calls `lookup_order` using only the stated name → misidentified accounts and incorrect refunds. Best fix?
A. **Programmatic prerequisite blocking `lookup_order`/`process_refund` until `get_customer` returns a verified ID** · B. system prompt says verification is mandatory · C. few-shot always calling `get_customer` first · D. routing classifier enabling a tool subset
**✅ A** — critical business logic needs deterministic programmatic enforcement; B/C rely on probabilistic compliance; D addresses tool availability, not ordering.

**Q2.** Agent calls `get_customer` for order queries; both tools have minimal descriptions and similar identifier formats. Most effective **first step**?
A. add 5-8 few-shot examples · B. **expand each tool's description (input formats, example queries, edge cases, boundaries)** · C. routing layer parsing keywords · D. consolidate into one `lookup_entity`
**✅ B** — descriptions are the primary selection mechanism; low-effort high-leverage; A adds tokens without fixing root cause; C over-engineered; D more effort than a "first step".

**Q3.** 55% first-contact resolution (target 80%); agent escalates straightforward cases, attempts complex policy-exception cases. Improve escalation calibration?
A. **explicit escalation criteria + few-shot (escalate vs resolve)** · B. self-reported confidence score routing · C. separate classifier on historical tickets · D. sentiment-based escalation
**✅ A** — addresses unclear decision boundaries proportionately; B fails (self-confidence poorly calibrated); C over-engineered; D sentiment ≠ complexity.

> **Scenario: Code Generation with Claude Code**

**Q4.** A `/review` slash command must be available to every developer on clone/pull. Where?
A. **`.claude/commands/` in the project repo** · B. `~/.claude/commands/` per developer · C. `CLAUDE.md` at root · D. `.claude/config.json` commands array
**✅ A** — project-scoped commands are version-controlled and shared; B is personal; C is for context; D doesn't exist.

**Q5.** Restructure a monolith into microservices (dozens of files, service-boundary decisions). Approach?
A. **Enter plan mode to explore, understand dependencies, design before changes** · B. direct execution incrementally · C. direct execution with comprehensive upfront instructions · D. start direct, switch to plan on complexity
**✅ A** — plan mode is for large-scale/architectural/multi-approach work; B risks rework; C assumes known structure; D ignores stated complexity.

**Q6.** Distinct conventions per area; test files spread throughout (`Button.test.tsx` next to `Button.tsx`); all tests should follow the same conventions regardless of location. Most maintainable?
A. **`.claude/rules/` with YAML frontmatter glob patterns** · B. consolidate in root CLAUDE.md under headers · C. skills per code type · D. CLAUDE.md per subdirectory
**✅ A** — glob patterns (e.g., `**/*.test.tsx`) apply by path regardless of directory; B relies on inference; C needs manual invocation; D is directory-bound.

> **Scenario: Multi-Agent Research System**

**Q7.** All subagents complete correctly, but reports cover only visual arts (music/writing/film missing); coordinator decomposed into "digital art / graphic design / photography". Root cause?
A. synthesis lacks gap-identification · B. **coordinator's task decomposition is too narrow** · C. web search queries not comprehensive · D. doc analysis filtering non-visual sources
**✅ B** — the coordinator's decomposition omitted whole domains; subagents worked correctly within assigned scope.

**Q8.** Web search subagent times out. Best error-propagation approach for intelligent recovery?
A. **Return structured error context (failure type, attempted query, partial results, alternatives)** · B. internal retry+backoff → generic "search unavailable" · C. return empty result marked successful · D. propagate exception to a top-level handler that terminates the workflow
**✅ A** — structured context enables informed recovery; B hides context; C suppresses the error; D over-terminates.

**Q9.** Synthesis agent needs frequent verification (85% simple fact-checks, 15% deeper); current round-trips add 40% latency. Best approach?
A. **Give synthesis a scoped `verify_fact` tool for simple lookups; complex verifications still route via coordinator** · B. batch verifications at end · C. give synthesis all web search tools · D. proactively cache extra context
**✅ A** — least privilege for the common case, preserving coordination for complex cases; B creates blocking dependencies; C over-provisions; D speculative.

> **Scenario: Claude Code for Continuous Integration**

**Q10.** `claude "Analyze this PR..."` hangs waiting for interactive input. Correct approach?
A. **`claude -p "Analyze this pull request for security issues"`** · B. `CLAUDE_HEADLESS=true` · C. redirect stdin from `/dev/null` · D. `--batch` flag
**✅ A** — `-p`/`--print` = non-interactive mode; others are non-existent features or workarounds.

**Q11.** Two workflows: (1) blocking pre-merge check, (2) overnight technical-debt report. Manager wants both on Message Batches API for 50% savings. Evaluate?
A. **Batch for the overnight report only; keep real-time for pre-merge** · B. switch both with polling · C. keep both real-time · D. switch both with timeout fallback
**✅ A** — batch has up to 24h processing / no SLA (unsuitable for blocking pre-merge, ideal for overnight); C misconception (results correlate via `custom_id`); D unnecessary complexity.

**Q12.** A 14-file PR reviewed in one pass yields inconsistent depth, missed bugs, contradictory feedback. Restructure?
A. **Split into focused passes: per-file local analysis + separate cross-file integration pass** · B. require developers to split PRs · C. higher-tier model with larger context · D. three runs, flag issues appearing in ≥2
**✅ A** — addresses attention dilution; B shifts burden; C larger context ≠ better attention quality; D suppresses intermittently-caught real bugs.

---

## 10. Scoring
Criterion-referenced. Passing score **720** (scale 100–1,000), set via standard-setting study. Result = pass/fail + scaled score + **percent-correct by domain** (domain percentages are informational, not used for pass/fail).

## 17. Appendix — Technologies & Concepts

**Claude Agent SDK** — agent definitions, agentic loops, `stop_reason` handling, hooks (`PostToolUse`, tool-call interception), subagent spawning via **Task tool**, `allowedTools`.
**MCP** — servers, tools, resources, `isError` flag, tool descriptions, tool distribution, `.mcp.json`, env var expansion.
**Claude Code** — CLAUDE.md hierarchy (user/project/directory), `.claude/rules/` YAML path-scoping, `.claude/commands/`, `.claude/skills/` (`context: fork`, `allowed-tools`, `argument-hint`), plan mode, direct execution, `/memory`, `/compact`, `--resume`, `fork_session`, Explore subagent.
**Claude Code CLI** — `-p`/`--print`, `--output-format json`, `--json-schema`.
**Claude API** — `tool_use` + JSON schemas, `tool_choice` (`auto`/`any`/forced), `stop_reason` (`tool_use`/`end_turn`), `max_tokens`, system prompts.
**Message Batches API** — 50% savings, ≤24h, `custom_id`, polling, no multi-turn tool calling.
**JSON Schema / Pydantic** — required vs optional, enum, nullable, `"other"`+detail, strict mode; semantic validation errors, validation-retry loops.
**Built-in tools** — Read, Write, Edit, Bash, Grep, Glob.
**Few-shot / prompt chaining / context-window management / session management / confidence scoring.**

### Out-of-Scope (will NOT appear)
Fine-tuning/training · API auth/billing/account mgmt · language/framework implementation details · deploying/hosting MCP servers · Claude's internal architecture/training/weights · Constitutional AI/RLHF · embeddings/vector DBs · computer use · vision/image analysis · streaming API/SSE · rate limits/quotas/pricing · OAuth/key rotation · cloud provider configs · benchmarking · prompt-caching implementation details (beyond knowing it exists) · tokenization specifics.

---

*Transcribed from the official Anthropic "Claude Certified Architect – Foundations" Exam Guide, v1.0 (July 2026), for study reference within this repo.*
