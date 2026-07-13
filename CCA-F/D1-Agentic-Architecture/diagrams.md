# D1 — Visual Cheat-Sheet 🖼️

> These are **Mermaid** diagrams. GitHub renders them as real graphics automatically —
> just view this file on github.com. In VS Code, install the *Markdown Preview Mermaid Support*
> extension (or the built-in preview) to see them locally.

---

## 🔁 The Agentic Loop (the whole domain in one picture)

```mermaid
flowchart TD
    U([User request]) --> B["Build messages array<br/>system + FULL history<br/><i>API is stateless — resend every call</i>"]
    B --> C["client.messages.create(model, tools, messages)"]
    C --> D{"response.stop_reason ?"}

    D -->|"end_turn ✅"| E([Return text to user · DONE])
    D -->|"tool_use 🛠"| F["Append WHOLE response.content<br/>then run tool → tool_result"]
    F --> B
    D -->|"pause_turn ⏸"| G["Re-send assistant turn as-is<br/>server resumes · no 'Continue' msg"]
    G --> C
    D -->|"max_tokens ✂"| H["Output truncated<br/>raise max_tokens / stream / continue"]
    H --> B
    D -->|"refusal 🚫"| I([Surface the decline<br/>don't retry same prompt])

    classDef done fill:#d4edda,stroke:#28a745,color:#155724;
    classDef warn fill:#fff3cd,stroke:#ffc107,color:#856404;
    classDef stop fill:#f8d7da,stroke:#dc3545,color:#721c24;
    class E done;
    class H,G warn;
    class I stop;
```

🧠 **Two things people forget:** the API is **stateless** (you resend the full history every
call), and you must append the **whole** `response.content` (with its `tool_use` block), not
just the `.text`.

---

## 🚦 `stop_reason` — router + loop control

```mermaid
flowchart LR
    S{{stop_reason}} --> ET["end_turn ✅<br/>finished naturally"]
    S --> TU["tool_use 🛠<br/>wants a tool"]
    S --> MT["max_tokens ✂<br/>OUTPUT truncated"]
    S --> SS["stop_sequence 🛑<br/>hit your stop seq"]
    S --> PT["pause_turn ⏸<br/>server-tool paused"]
    S --> RF["refusal 🚫<br/>safety decline"]

    ET --> X([■ exit loop])
    SS --> X
    RF --> X
    TU --> L([↻ keep looping])
    MT --> L
    PT --> L

    classDef exit fill:#f8d7da,stroke:#dc3545,color:#721c24;
    classDef loop fill:#d1ecf1,stroke:#17a2b8,color:#0c5460;
    class X exit;
    class L loop;
```

⚠️ Six values total — the "4-value" list in most guides is **incomplete**.
`max_tokens` = the **output** was cut off, **not** "conversation too long."

---

## 🧩 The tool-result contract (why you get a 400)

```mermaid
sequenceDiagram
    participant H as Your harness
    participant C as Claude (Messages API)

    H->>C: user turn — "weather in Paris?"
    C-->>H: assistant turn — tool_use (id = toolu_A)
    Note over H: run get_weather("Paris") → "18C sunny"
    H->>C: user turn — tool_result (tool_use_id = toolu_A) ✅ ids match
    C-->>H: assistant turn — "It's 18C and sunny." (end_turn)

    Note over H,C: Rules: results go in a USER turn · ids MUST match · roles alternate<br/>Break any → HTTP 400. Tool errored? add is_error = true
```

---

## 🤖 vs 🤖🤖 — single or multi-agent?

```mermaid
flowchart TD
    Q(["What is the task?"]) --> P{"Independent<br/>parallel sub-tasks?"}
    P -->|Yes| M["🤖🤖 Multi-agent<br/>parallelise to cut wall-clock"]
    P -->|No| CL{"Cost / latency<br/>sensitive?"}
    CL -->|Yes| S1["🤖 Single agent + tools<br/>simplest tier wins"]
    CL -->|No| ST{"5+ steps OR<br/>distinct specialised roles?"}
    ST -->|Yes| M
    ST -->|No| S2["🤖 Single agent + tools<br/>don't over-engineer"]

    classDef single fill:#d4edda,stroke:#28a745,color:#155724;
    classDef multi fill:#e2d4f0,stroke:#764ba2,color:#3d1a5b;
    class S1,S2 single;
    class M multi;
```

Golden rule: **pick the simplest tier that works.** The exam punishes over-engineering.

---

## 🕸️ Orchestration patterns

```mermaid
flowchart TD
    subgraph HS["Hub & Spoke — start here"]
        A1["🤖 agent"] --> T1["🛠 tool"]
        A1 --> T2["🛠 tool"]
        A1 --> T3["🛠 tool"]
    end

    subgraph CO["Coordinator / Sub-agent"]
        K["🧭 coordinator"] --> R1["🤖 refund"]
        K --> R2["🤖 technical"]
        K --> R3["🤖 billing"]
        R1 --> MG(["merge → response"])
        R2 --> MG
        R3 --> MG
    end

    subgraph SP["Sequential pipeline"]
        P1["research"] --> P2["outline"] --> P3["draft"] --> P4["edit"]
    end
```

🔑 Sub-agents are **context-isolated** — they don't see the coordinator's history.
Pass what they need **explicitly**.

---

## 💥 Failure modes → fixes

```mermaid
flowchart LR
    F1["💣 Cascade<br/>a1 ✗ → a2 ✗ → a3 ✗"] --> S1["🔌 Circuit breaker"]
    F2["🕳 Lost state<br/>sub-agent has no context"] --> S2["📨 Pass state explicitly"]
    F3["⏳ Timeout chain<br/>A→B→C latency adds up"] --> S3["⚡ Parallelise independents"]
    F4["✂ Truncation<br/>stop_reason = max_tokens"] --> S4["⬆ Raise cap / stream"]
    F5["🌩 Transient<br/>429 / 500 / 529"] --> S5["↩ Retry w/ backoff (SDK auto)"]

    classDef fail fill:#f8d7da,stroke:#dc3545,color:#721c24;
    classDef fix fill:#d4edda,stroke:#28a745,color:#155724;
    class F1,F2,F3,F4,F5 fail;
    class S1,S2,S3,S4,S5 fix;
```

Recovery ladder: **retry** (transient) → **fallback** (alt / skip) → **escalate** (human).

---

## 🎛️ The knobs (model · thinking · effort)

```mermaid
flowchart LR
    subgraph MODEL
        O["claude-opus-4-8<br/>default · agentic"]
        SN["claude-sonnet-4-6<br/>speed / volume"]
        HA["claude-haiku-4-5<br/>cheap · fast · sub-tasks"]
    end
    subgraph THINKING
        TH["type: adaptive<br/>Claude picks depth &<br/>interleaves automatically<br/><i>budget_tokens is GONE</i>"]
    end
    subgraph EFFORT
        EF["low ─ medium ─ high ─ max<br/>cheaper ◀──▶ more thorough"]
    end
    MODEL --> THINKING --> EFFORT
```

Big `max_tokens` (≳16K)? → **stream** to avoid HTTP timeouts.
