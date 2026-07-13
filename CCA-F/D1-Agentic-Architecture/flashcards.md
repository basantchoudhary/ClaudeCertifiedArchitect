# D1 Flashcards 🃏

Cover the right column. Say the answer out loud. Flip.

| # | Q (front) | A (back) |
|---|-----------|----------|
| 1 | What is an "agentic loop" in one line? | Send messages → check `stop_reason` → run tool → append result → repeat until `end_turn`. |
| 2 | Is the Messages API stateful or stateless? | **Stateless.** You resend `system` + full `messages[]` every call. |
| 3 | When you get `tool_use`, what do you append and where? | The **whole** `response.content` (assistant turn), then the `tool_result` in a **user** turn. |
| 4 | List all six `stop_reason` values. | `end_turn`, `tool_use`, `max_tokens`, `stop_sequence`, `pause_turn`, `refusal`. |
| 5 | `max_tokens` stop reason means…? | The **output** hit its cap and is truncated — *not* "conversation too long." |
| 6 | What do you do on `pause_turn`? | Re-send the assistant turn as-is; the server-side tool loop resumes. Don't add "Continue." |
| 7 | What do you do on `refusal`? | Check `stop_details.category`, surface it. Don't blindly retry the identical prompt. |
| 8 | Why might a `tool_result` return a 400? | `tool_use_id` mismatch, wrong role (must be user turn), or non-alternating roles. |
| 9 | How do you signal a failed tool call to Claude? | `"is_error": true` on the `tool_result`. |
| 10 | Single agent vs multi-agent — default? | Simplest tier that works → **single agent + tools**. Multi-agent only for 5+ steps / distinct roles / true parallelism. |
| 11 | Name the three orchestration patterns. | Hub-and-spoke, coordinator/sub-agent, sequential pipeline. |
| 12 | Key gotcha with sub-agents? | They're **context-isolated** — pass required state explicitly. |
| 13 | Fix for cascade failure? | **Circuit breaker** — stop calling a failing tool/agent past an error threshold. |
| 14 | Fix for additive latency in sequential agents? | **Parallelise** independent agents. |
| 15 | Recovery ladder order? | Retry (transient) → fallback (alt/skip) → escalate (human). |
| 16 | Which errors auto-retry, and does the SDK help? | 429 / 5xx / 529 — yes, SDK retries with exponential backoff (`max_retries`, default 2). |
| 17 | Default model for agentic work? | `claude-opus-4-8`. |
| 18 | How do you enable thinking now? | `thinking={"type": "adaptive"}` — Claude picks depth. `budget_tokens` is removed on current models. |
| 19 | What does `effort` control? | Thoroughness vs. cost: `low`→`max`. Lower = fewer, consolidated tool calls. |
| 20 | When must you stream? | Large `max_tokens` (≳16K) — avoids HTTP timeouts. |
| 21 | Tool Runner vs manual loop — when manual? | When you need human-in-the-loop approval, custom logging, or conditional tool execution. |
| 22 | "Should I build an agent?" 4 checks. | Complexity, Value, Viability (Claude capable?), Cost-of-error (recoverable?). Any "no" → simpler tier. |
