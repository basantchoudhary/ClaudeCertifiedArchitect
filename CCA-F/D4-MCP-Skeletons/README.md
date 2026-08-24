# MCP Skeletons — bare-minimum servers, one per design pattern

Eight runnable MCP servers, ~40–80 lines each, each isolating exactly one design decision.
Reading the spec tells you what is *possible*; these show which possible thing is *right* —
which is what Domain 4 actually tests.

## 👉 Start here

Open **[`index.html`](index.html)** — the reference page. It opens with the conceptual
grounding (host/client/server, the three primitives sorted by who controls them, transports,
lifecycle), then walks the eight patterns, each with the code, what it exposes, and the exam
question shape it answers.

**Live:** https://basantchoudhary.github.io/ClaudeCertifiedArchitect/CCA-F/D4-MCP-Skeletons/index.html

## The eight

| # | Skeleton | The decision it isolates |
|---|----------|--------------------------|
| 1 | [`01_tools_only.py`](skeletons/01_tools_only.py) | The description **is** the selection mechanism — the model sees only name, description, schema |
| 2 | [`02_resources.py`](skeletons/02_resources.py) | Tool vs resource is a question about **who controls**, not what the data is |
| 3 | [`03_structured_errors.py`](skeletons/03_structured_errors.py) | `errorCategory` + `isRetryable` + `nextStep` — telling the agent what to **do** next |
| 4 | [`04_gated_stateful.py`](skeletons/04_gated_stateful.py) | Ordering must be enforced **server-side**; a description is a request, not a control |
| 5 | [`05_heterogeneous_backend.py`](skeletons/05_heterogeneous_backend.py) | Normalise three upstreams in the server, once — not in the model, forever |
| 6 | [`06_paginated.py`](skeletons/06_paginated.py) | Clamp, signal truncation, offer a cursor, prefer aggregates |
| 7 | [`07_env_config.py`](skeletons/07_env_config.py) | `${VAR}` expansion and the three config scopes — no secret ever committed |
| 8 | [`08_namespacing.py`](skeletons/08_namespacing.py) | Clients namespace **names**, not descriptions — and the real fix is fewer servers |

Plus [`mcp.json.example`](skeletons/mcp.json.example) — a project-scoped config showing stdio,
`${VAR}` expansion with defaults, and a remote HTTP server.

## Running them

```bash
cd CCA-F/D4-MCP-Skeletons/skeletons
pip install fastmcp

python test_skeletons.py        # exercises all eight in-process — no network, no API key
python 01_tools_only.py         # or run one as a real stdio server
```

`test_skeletons.py` connects a `Client` straight to each server object, so you see them from the
model's side of the wire: list the tools, call one, read a resource. It asserts the behaviours the
reference page claims — the clamp really clamps, the gate really refuses, the token really does not
leak from `whoami`.

Verified against **fastmcp 3.4.7 / Python 3.13**. Everything the page says about FastMCP's
behaviour was observed by running it, including the finding that a plain `ValueError` has its
message relayed to the model while `ToolError` is the deliberate channel.

## What this does not cover

Sampling, elicitation, roots, and the OAuth 2.1 flow for remote servers — all real, none of them
load-bearing at Foundations level. Server-side auth appears here only as env-var credentials
(skeleton 7).

A **hands-on lab** built on these same servers is the planned follow-on: wire them into a client,
break them deliberately, watch the agent react.
