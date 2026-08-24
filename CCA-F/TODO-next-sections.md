# CCA-F — next sections to build

Registered 2026-08-23. Exam date: **28 Aug 2026**.

## 1. LLM Wire-Format Reference (request/response JSON walkthroughs) ✅ BUILT (2026-08-23)

**Shipped as** `Wire-Format-Reference/` — reference page + `capture.py`. All 11 candidate
entries built, none dropped. The four-part shape (scenario → client code → request JSON →
response JSON) was followed exactly.

**Open question resolved:** kept **strictly to the Messages API wire format**; Agent SDK
shapes (hooks, subagent spawn payloads) excluded — they sit a layer above and would blur the
distinction the page exists to make. Entry 10 (MCP both sides) is the one deliberate
two-protocol comparison.

**Honest limitation:** no API key was available on this machine, so the JSON is written from
the current API reference — field names/types/shapes are documented, values are illustrative.
`capture.py` replaces eight of the eleven with real captures once a key is present; it is
verified against `anthropic` 1.0.0 but has never been run against a live endpoint. Doing that
once is the obvious next step.

<details><summary>Original plan</summary>


**Why:** the exam is scenario-driven, but the underlying constructs — what exactly goes
*into* the Messages API and what comes *back* — are the confusing part. Not exam scenarios;
a construct reference.

**Shape:** each entry is one page/section with four parts, in this order:
1. **Scenario** — one paragraph, the situation in plain language.
2. **Client code** — the minimal Python/TS that produces the call.
3. **Exact request JSON** — the full body sent to the model, annotated field by field.
4. **Exact response JSON** — what comes back, annotated, including `stop_reason`.

**Candidate entry list (expected to be small and closed):**
- Plain single-turn message — the baseline shape.
- System prompt + multi-turn history — how turns accumulate.
- Tool definition + `stop_reason: "tool_use"` — the assistant turn that requests a call.
- Returning a `tool_result` — the user turn that answers it, and id pairing.
- A full two-iteration agentic loop end to end (`tool_use` → `tool_result` → `end_turn`).
- Parallel tool calls — several `tool_use` blocks in one assistant turn.
- `tool_choice`: `auto` vs `any` vs forced `{"type":"tool","name":...}` — three responses, same request otherwise.
- Structured output via a tool + JSON schema — including what a schema violation looks like.
- Error result: `is_error` on a `tool_result`, and what the model does next.
- MCP tool as seen by the model vs the MCP server's own wire format (the two are different — worth one entry).
- Message Batches API — request envelope, `custom_id`, result retrieval shape.

**Open questions to discuss:** whether to include Agent SDK-level shapes (hooks,
subagent spawn payloads) or keep it strictly to the Messages API wire format.
</details>

## 2. MCP Skeletons — bare-minimum servers, one per design pattern ✅ BUILT (2026-08-23)

**Shipped as** `D4-MCP-Skeletons/` — reference page + 8 runnable servers + smoke tests.
Decisions taken on the two open questions below: **Python/FastMCP throughout**, and
**runnable + tested** (all eight exercised in-process by `skeletons/test_skeletons.py`
against fastmcp 3.4.7). All 8 candidate skeletons were built, none dropped.

The page leads with conceptual grounding (host/client/server, primitives by control,
transports, lifecycle) before the patterns — concepts first was the explicit ask.

**Still open:** a hands-on lab layered on the same servers (wire them into a client, break
them deliberately, watch the agent react). That is the agreed follow-on to this page.

<details><summary>Original plan</summary>


**Why:** MCP is the weakest area. Reading a spec is not the same as seeing the smallest
thing that works, and the design decisions only become visible when several skeletons
sit side by side.

**Shape:** each skeleton is a runnable minimal server (~40–80 lines), plus a short note on
the design pattern it demonstrates and the specific challenge it exposes.

**Candidate skeletons (pick to maximise pattern coverage, not count):**
- **Tools-only server** — the baseline. Tool description as the selection mechanism.
- **Resources server** — a content catalogue; shows tool-vs-resource boundary.
- **Structured-error server** — `isError` plus `errorCategory` / `isRetryable`;
  transient vs validation vs business vs permission.
- **Gated/stateful server** — a prerequisite that must be satisfied before a
  side-effecting tool will run (the `get_customer` → `process_refund` pattern).
- **Heterogeneous-backend server** — normalises three upstream formats into one contract.
- **Paginated / large-result server** — how to avoid flooding agent context.
- **Env-var-config server** — `.mcp.json` with `${TOKEN}` expansion, no committed secrets.
- **Namespacing / collision** — two servers exposing similar tool names; what breaks.

**Open questions to discuss:** Python (FastMCP) or TypeScript, or one of each for the
first two? Runnable-and-tested, or read-only skeletons?
</details>
