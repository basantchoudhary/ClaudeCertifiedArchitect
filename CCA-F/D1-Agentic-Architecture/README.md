# Domain 1 — Agentic Architecture & Orchestration (27%)

> The single largest and hardest domain on CCA-F. Master this first — get it right and
> you've effectively banked a quarter of the exam. Everything here is verified against the
> current Claude API (Messages API, `POST /v1/messages`), not just the study-guide summary.

**Contents**
- [1. The Agentic Loop](#1-the-agentic-loop)
- [2. `stop_reason` — the exam's favourite topic](#2-stop_reason--the-exams-favourite-topic)
- [3. Message structure & the tool-result contract](#3-message-structure--the-tool-result-contract)
- [4. Single agent vs. multi-agent](#4-single-agent-vs-multi-agent)
- [5. Multi-agent orchestration patterns](#5-multi-agent-orchestration-patterns)
- [6. Failure modes & recovery](#6-failure-modes--recovery)
- [7. Models & the thinking/effort knobs](#7-models--the-thinkingeffort-knobs)
- [8. Exam traps & quick answers](#8-exam-traps--quick-answers)
- [Files in this folder](#files-in-this-folder)

---

## 1. The Agentic Loop

An **agent** is a loop around a single stateless endpoint (`POST /v1/messages`). You send the
full conversation each turn; the model replies; if it asked to use a tool, you run the tool,
append the result, and call again. Repeat until it stops.

```
user request
    │
    ▼
build messages[] (system + full history)
    │
    ▼
client.messages.create(model, tools, messages)   ← stateless: send everything every time
    │
    ▼
inspect response.stop_reason
    ├── "end_turn"    → done, return text to user
    ├── "tool_use"    → execute tool(s), append tool_result, loop
    ├── "pause_turn"  → re-send response as-is, server resumes (server-side tools)
    ├── "max_tokens"  → output truncated: raise max_tokens / stream / continue
    └── "refusal"     → safety decline; surface it, don't blindly retry same prompt
```

Two invariants that the exam probes and that beginners get wrong:

1. **The API is stateless.** There is no server-side "conversation". You resend `system` +
   the entire `messages[]` array on every call. "Memory" = you keeping and replaying history.
2. **Append the *whole* `response.content`, not just the text.** The assistant turn contains
   `tool_use` blocks (and `thinking` blocks). If you append only the text string, the next
   request loses the tool-call context and the loop breaks.

Minimal manual loop (Python, current SDK):

```python
import anthropic
client = anthropic.Anthropic()

messages = [{"role": "user", "content": user_input}]
while True:
    resp = client.messages.create(
        model="claude-opus-4-8",
        max_tokens=16000,
        tools=tools,
        messages=messages,
    )
    if resp.stop_reason == "end_turn":
        break
    if resp.stop_reason == "pause_turn":          # server-side tool hit its iteration cap
        messages.append({"role": "assistant", "content": resp.content})
        continue                                  # re-send; server picks up where it left off
    # tool_use: append the assistant turn (INCLUDING tool_use blocks), then run the tools
    messages.append({"role": "assistant", "content": resp.content})
    results = []
    for block in resp.content:
        if block.type == "tool_use":
            results.append({
                "type": "tool_result",
                "tool_use_id": block.id,          # MUST echo the tool_use block's id
                "content": run_tool(block.name, block.input),
            })
    messages.append({"role": "user", "content": results})   # tool results go in a USER turn
```

> **Tool Runner vs. manual loop.** The SDK's beta *tool runner* (`client.beta.messages.tool_runner`)
> runs this loop for you — you just supply decorated tool functions. Use the **manual loop** when
> you need human-in-the-loop approval, custom logging, or conditional execution. Know both for the exam.

---

## 2. `stop_reason` — the exam's favourite topic

Memorise all six. The 4-value version in most study guides is **incomplete** — `pause_turn`
and `refusal` are real and testable.

| `stop_reason`    | Meaning | What you do |
|------------------|---------|-------------|
| `end_turn`       | Claude finished naturally | Return the response; loop is done |
| `tool_use`       | Claude wants a tool | Execute it, append `tool_result`, call again |
| `max_tokens`     | Hit the `max_tokens` cap — output is **truncated** | Raise `max_tokens`, stream, or continue |
| `stop_sequence`  | Hit a custom stop sequence | Handle per your protocol (rare) |
| `pause_turn`     | Server-side tool loop paused (≈10 server iterations) | Re-send the assistant turn as-is; server resumes. **Do not** add a "Continue" user message |
| `refusal`        | Safety classifier / model declined | Inspect `stop_details.category`; surface it. Don't retry the identical prompt |

Notes that trip people up:
- `max_tokens` is about the **output cap you set**, not the context window. It means "response
  incomplete", not "conversation too long."
- On a `refusal`, the `content` may be empty (pre-output) or partial (mid-stream) — always
  branch on `stop_reason` **before** reading `response.content[0]`, or you'll hit an index error.
- For server-side tools (web search, code execution), `pause_turn` is normal on long runs.
  Cap your continuations (e.g. 5) so a stuck loop can't run forever.

---

## 3. Message structure & the tool-result contract

- `messages[]` alternates `user` / `assistant`. First message must be `user`.
  (Consecutive same-role messages are merged; they don't error.)
- A `tool_result` is **user-role content**, and its `tool_use_id` must exactly match the id of
  the `tool_use` block it answers. Mismatch → 400.
- Return **all** tool results from one assistant turn in a **single** following user message.
- Signal a failed tool with `"is_error": true` on the `tool_result` — Claude reads that and adapts.

```python
{"type": "tool_result",
 "tool_use_id": "toolu_01A…",
 "content": "Error: city 'xyz' not found.",
 "is_error": True}
```

---

## 4. Single agent vs. multi-agent

Reach for the **simplest tier that works**. The exam rewards *not* over-engineering.

| Situation | Choose |
|-----------|--------|
| Single support ticket, Q&A, extraction | **Single agent + tools** |
| Cost- or latency-sensitive | **Single agent + tools** |
| 5+ step workflow, distinct specialised roles | **Multi-agent** |
| Genuinely parallel sub-tasks (research + draft at once) | **Multi-agent** |

"Should I build an agent at all?" — only if the task is **complex** (multi-step, hard to fully
specify), the **value** justifies the cost/latency, Claude is **capable** at it, and errors are
**recoverable** (tests, review, rollback). Any "no" → drop to a single call or a code-orchestrated
workflow.

---

## 5. Multi-agent orchestration patterns

| Pattern | Shape | Use when |
|---------|-------|----------|
| **Hub-and-spoke** | One agent, many tools | Simplest; default before true multi-agent |
| **Coordinator / sub-agent** | Coordinator routes to specialists, merges results | Distinct expertise or parallelism |
| **Sequential pipeline** | research → outline → draft → edit | Stages depend on the previous one's output |

Design rules the exam leans on:
- **Prompt isolation** — sub-agents don't share the coordinator's context. Pass the state a
  sub-agent needs **explicitly**; don't assume it "knows."
- **Parallel vs. serial latency** — sequential agents add latency; parallelise independent
  agents to cut wall-clock.
- **State management** — pass the minimum state each agent needs; avoid context explosion.
- **Cache/model discipline** — switching models or editing tools mid-conversation invalidates
  the prompt cache; keep the main loop on one model and spawn a sub-agent (possibly a cheaper
  model) for a sub-task instead.

---

## 6. Failure modes & recovery

| Failure | Symptom | Mitigation |
|---------|---------|------------|
| **Cascade failure** | Agent 1 fails → 2 and 3 fail downstream | **Circuit breaker**: stop calling a failing tool/agent once error rate crosses a threshold |
| **Lost state** | Sub-agent doesn't have the context it needs | Pass full required state explicitly in the delegated message |
| **Timeout chain** | Sequential agents accumulate latency | Parallelise independent work; set per-step timeouts |
| **Truncation** | `stop_reason == "max_tokens"` | Raise `max_tokens`, stream, or continue the turn |
| **Refusal** | `stop_reason == "refusal"` | Surface to user; re-prompt only if genuinely a false positive |
| **Transient API error** | 429 / 5xx / 529 | Retry with exponential backoff — the SDK does this automatically (`max_retries`, default 2) |

Recovery ladder: **retry** (transient) → **fallback** (alt tool / skip) → **escalate** (human).

---

## 7. Models & the thinking/effort knobs

Default to the most capable current model unless told otherwise.

| Model | ID | Note |
|-------|----|----|
| Opus 4.8 | `claude-opus-4-8` | Default for agentic/architectural work |
| Sonnet 4.6 | `claude-sonnet-4-6` | Best speed/intelligence balance for high volume |
| Haiku 4.5 | `claude-haiku-4-5` | Fast, cheap, simple/parallel sub-tasks |

- **Adaptive thinking** — `thinking={"type": "adaptive"}`. Claude decides depth per turn and
  interleaves thinking between tool calls automatically. The old fixed `budget_tokens` is
  deprecated/removed on current models — don't use it.
- **Effort** — `output_config={"effort": "low"|"medium"|"high"|"max"}` trades thoroughness vs.
  cost. Lower effort = fewer, more-consolidated tool calls.
- **Stream** any request with a large `max_tokens` (≳16K) to dodge HTTP timeouts.

*(These are D1-adjacent — models/thinking are also examined in D3 and D5. Keep the IDs exact;
constructed or date-suffixed IDs 404.)*

---

## 8. Exam traps & quick answers

- **"How does the agent remember earlier turns?"** → You resend the full `messages[]`; the API
  is stateless. Not a server session.
- **"Loop appended the reply but the next tool call failed."** → It appended only `.text`; must
  append the whole `response.content` (with `tool_use` blocks).
- **"Server-side tool returned `pause_turn`."** → Re-send the assistant turn unchanged; the
  server resumes. Adding "Continue." is wrong.
- **"`max_tokens` stop reason — is the conversation too long?"** → No. The *output* hit its cap.
- **"Which stop_reasons exist?"** → `end_turn`, `tool_use`, `max_tokens`, `stop_sequence`,
  `pause_turn`, `refusal`.
- **"tool_result 400 error."** → `tool_use_id` doesn't match, or results weren't sent in a user
  turn, or roles didn't alternate.
- **"Cheaper model for one sub-step mid-conversation?"** → Don't switch the main loop's model
  (kills the cache) — spawn a sub-agent for that step.
- **"Best-practice / robust"** → favour explicit state, retries, circuit breakers.
  **"Cost-effective"** → single agent + tools, Sonnet, lower effort. **"Least latency"** →
  parallelise, don't add agents.

---

## Files in this folder

| File | Purpose |
|------|---------|
| `README.md` | These study notes |
| [`diagrams.md`](diagrams.md) | 🖼️ Pictorial cheat-sheet — start here if you like pictures |
| [`flashcards.md`](flashcards.md) | One-line Q→A recall drills |
| [`practice-questions.md`](practice-questions.md) | Scenario MCQs with explained answers |
| [`examples/01_agentic_loop.py`](examples/01_agentic_loop.py) | Full manual agentic loop handling every `stop_reason` (needs API key) |
| [`examples/02_stop_reasons.py`](examples/02_stop_reasons.py) | 🚦 `stop_reason` router demo (no API key) |
| [`examples/03_tool_result_contract.py`](examples/03_tool_result_contract.py) | 🧩 Why tool-result 400s happen (no API key) |
| [`examples/04_single_vs_multi.py`](examples/04_single_vs_multi.py) | 🤖 Single vs multi-agent decision helper (no API key) |
