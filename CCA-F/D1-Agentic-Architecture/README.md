# Domain 1 — Agentic Architecture & Orchestration (27%)

The largest and hardest CCA-F domain. Master it first.

## 👉 Start here

Open **[`index.html`](index.html)** in a browser — it's the full, self-contained study page:
overview, live **Mermaid diagrams**, concept notes, code snippets, interactive **flashcards**
(click to flip), and **practice questions** (click to reveal answers).

> The diagrams render client-side via Mermaid.js (loaded from a CDN, so the first open needs
> internet). Everything is verified against the current Messages API.

## Runnable code (`examples/`)

| File | Needs API key? | What it shows |
|------|----------------|---------------|
| [`examples/01_agentic_loop.py`](examples/01_agentic_loop.py) | ✅ yes | A complete manual agentic loop handling every `stop_reason` |
| [`examples/02_stop_reasons.py`](examples/02_stop_reasons.py) | ❌ no | 🚦 `stop_reason` as a router — runs instantly |
| [`examples/03_tool_result_contract.py`](examples/03_tool_result_contract.py) | ❌ no | 🧩 Why tool-result 400s happen |
| [`examples/04_single_vs_multi.py`](examples/04_single_vs_multi.py) | ❌ no | 🤖 Single vs multi-agent decision helper |

```bash
pip install anthropic
export ANTHROPIC_API_KEY=sk-ant-...      # only needed for 01
python examples/02_stop_reasons.py       # the no-key demos run as-is
```

## What this domain covers

The agentic loop · the six `stop_reason` values (incl. `pause_turn` & `refusal`) · the
tool-result contract · single vs multi-agent · orchestration patterns (hub-and-spoke,
coordinator/sub-agent, sequential pipeline) · failure modes & recovery · model / thinking /
effort knobs. All laid out visually in `index.html`.
