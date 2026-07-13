# D1 — Visual Cheat-Sheet 🖼️

Pictures first. If you can redraw these from memory, you know Domain 1.

---

## 🔁 The Agentic Loop (the whole domain in one picture)

```
          ┌─────────────────────────────────────────────┐
          │                  YOU (harness)              │
          │                                             │
   user ─▶│  messages[] = system + FULL history         │
          │            │                                │
          │            ▼                                │
          │   client.messages.create(...)  ── HTTP ──▶  🤖 Claude
          │            ▲                                │      │
          │            │        response.content        │      │
          │            └────────────◀───────────────────┼──────┘
          │                         │                    │
          │              look at response.stop_reason    │
          └─────────────────────────┬───────────────────┘
                                    │
        ┌──────────────┬────────────┼────────────┬──────────────┐
        ▼              ▼            ▼            ▼              ▼
   "end_turn"     "tool_use"   "pause_turn"  "max_tokens"   "refusal"
     ✅ done      🛠 run tool   ⏸ re-send     ✂ truncated    🚫 declined
   return text   append result  server        raise cap /    surface it;
   to the user   → loop again   resumes        stream         don't retry
                                                               same prompt
```

🧠 **Two things people forget:**

```
  STATELESS                          APPEND THE WHOLE TURN
  ─────────                          ─────────────────────
  Claude remembers                   ┌ assistant turn ┐
  NOTHING between calls.             │  text block    │  ← append ALL of this
  YOU resend the full               │  thinking block │     not just .text
  messages[] every time.            │  tool_use block │  ← losing this breaks
                                     └────────────────┘     the next call
```

---

## 🚦 `stop_reason` traffic-light

```
   ┌────────────────┬──────────────────────────────┬────────────────────────┐
   │  stop_reason   │  what it MEANS               │  what YOU do            │
   ├────────────────┼──────────────────────────────┼────────────────────────┤
   │  end_turn   ✅ │  finished naturally          │  return, stop the loop  │
   │  tool_use   🛠 │  wants a tool                │  run it → tool_result   │
   │  max_tokens ✂ │  OUTPUT hit the cap (cut off) │  raise max_tokens/stream│
   │  stop_seq   🛑 │  hit your stop sequence       │  handle per protocol    │
   │  pause_turn ⏸ │  server-tool loop paused      │  re-send as-is (resumes)│
   │  refusal    🚫 │  safety decline               │  surface; check details │
   └────────────────┴──────────────────────────────┴────────────────────────┘

   ⚠️  max_tokens = OUTPUT was too long, NOT "conversation too long".
   ⚠️  6 values total. The "4-value" list in most guides is INCOMPLETE.
```

---

## 🧩 The tool-result contract (why you get a 400)

```
   ASSISTANT turn                          next USER turn
   ┌────────────────────┐                  ┌───────────────────────────────┐
   │ tool_use           │                  │ tool_result                   │
   │   id: "toolu_A"  ──┼───── must ──────▶│   tool_use_id: "toolu_A"  ✅   │
   │   name: get_weather│      match        │   content: "72°F"             │
   └────────────────────┘                  └───────────────────────────────┘

   Rules:  results go in a USER turn ·  ids must match ·  roles alternate
   Fail any → 400.   Tool errored?  add  "is_error": true
```

---

## 🤖 vs 🤖🤖  Single agent or multi-agent?

```
        Is the task…                              Pick
   ┌─────────────────────────────┐
   │ 1 question / extraction?     │──────────────▶  🤖  single agent + tools
   │ cost/latency sensitive?      │──────────────▶  🤖  single agent + tools
   │ 5+ steps, distinct roles?    │──────────────▶  🤖🤖 multi-agent
   │ truly parallel sub-tasks?    │──────────────▶  🤖🤖 multi-agent
   └─────────────────────────────┘

   Golden rule: pick the SIMPLEST tier that works. The exam punishes over-engineering.
```

---

## 🕸️ Orchestration patterns

```
  HUB & SPOKE                COORDINATOR / SUB-AGENT        SEQUENTIAL PIPELINE
  (start here)               (specialists, parallel)        (each needs the last)

       🤖                          🧭 coordinator            research
     / │ \                        /    │    \                   │
   🛠  🛠  🛠                    🤖    🤖    🤖              outline
   tools                       refund tech  billing              │
                                 \    │    /                   draft
                                   merge ▼                       │
                                  response                     edit
```

🔑 Sub-agents are **context-isolated** — they don't see the coordinator's history.
Pass what they need **explicitly**.

---

## 💥 Failure modes → fixes

```
  cascade 💣        agent1 ✗ → agent2 ✗ → agent3 ✗     →  🔌 circuit breaker
  lost state 🕳     sub-agent has no context           →  📨 pass state explicitly
  timeout chain ⏳  A→B→C latency adds up               →  ⚡ parallelise independents
  truncation ✂     stop_reason == max_tokens           →  ⬆ raise cap / stream
  transient 🌩      429 / 500 / 529                     →  ↩ retry w/ backoff (SDK auto)

  Recovery ladder:   retry ──▶ fallback ──▶ escalate to human
```

---

## 🎛️ The knobs (models · thinking · effort)

```
   MODEL                         THINKING                    EFFORT
   ─────                         ────────                    ──────
   claude-opus-4-8   default     {"type":"adaptive"}         low ─ medium ─ high ─ max
   claude-sonnet-4-6 volume      Claude picks depth &        cheaper◀────────▶thorough
   claude-haiku-4-5  cheap/fast  interleaves automatically   fewer tool calls at low
                                 (budget_tokens is GONE)

   Big max_tokens (≳16K)? →  STREAM  to avoid HTTP timeouts.
```
