# Wire-Format Reference — what goes to the model, and what comes back

Eleven scenarios, each in the same four parts: **scenario → client code → exact request JSON →
exact response JSON**, annotated field by field. Not exam scenarios — a construct reference for
the layer underneath them.

## 👉 Start here

Open **[`index.html`](index.html)**. It opens with the four facts that explain most of the JSON
(statelessness, the `tools → system → messages` render order, `content` as an array, `stop_reason`
as the router), then walks the eleven entries.

**Live:** https://basantchoudhary.github.io/ClaudeCertifiedArchitect/CCA-F/Wire-Format-Reference/index.html

## The eleven

| # | Entry | The construct it pins down |
|---|-------|----------------------------|
| 1 | Plain single-turn | The baseline shape — every other entry is this plus fields |
| 2 | System prompt + history | Statelessness, and why input tokens climb every turn |
| 3 | Tool definition → `stop_reason: "tool_use"` | The assistant turn that *asks*; nothing has executed |
| 4 | Returning a `tool_result` | Role `user` (not "tool"), and exact `tool_use_id` pairing |
| 5 | Full two-iteration loop | The whole agentic loop as two round trips |
| 6 | Parallel tool calls | Several `tool_use` blocks, one turn — all results in **one** user message |
| 7 | `tool_choice` auto / any / forced | Three responses, same request otherwise — forcing ≠ correctness |
| 8 | Structured output | `output_config.format` vs `strict: true`, and what a violation looks like |
| 9 | `is_error` on a `tool_result` | Tool failure as a conversation event, not an outage |
| 10 | MCP both sides | The same tool in JSON-RPC and in the Messages API — `inputSchema` vs `input_schema` |
| 11 | Message Batches | The envelope, `custom_id`, and why results come back unordered |

## Provenance — and how to upgrade it

The JSON on the page is written from the current Claude API reference: **field names, types and
shapes are documented**; the *values* (message IDs, token counts, exact wording) are illustrative.

[`capture.py`](capture.py) replaces them with real captures from your own account:

```bash
pip install anthropic
export ANTHROPIC_API_KEY=sk-ant-...

python capture.py            # all eight capturable scenarios
python capture.py 03 07a     # or just these
```

It uses `client.messages.with_raw_response.create(...)` — the raw HTTP body, not the parsed SDK
object — and writes `captured/<id>_<name>/request.json` and `response.json`. A few cents in total.
Verified against `anthropic` 1.0.0: it imports, the no-credential guard fires, and
`messages.with_raw_response.create(...)` → `.text` was confirmed to exist on that version. It has
never been run against a live endpoint.

Entries 04, 05 and 09 need a tool to execute between calls, 10 needs a reachable MCP server, and
11 is asynchronous — the script skips those and says so rather than faking them.

## Scope

**Messages API only** (`POST /v1/messages`, plus `/v1/messages/batches`). Agent SDK shapes —
hooks, subagent spawn payloads — are deliberately excluded: they sit a layer above this one, and
mixing them in would blur the exact distinction the page exists to make. This resolves the open
question recorded in `../TODO-next-sections.md`.

Entry 10 is the one place two protocols appear together, and that contrast is its whole purpose.

## Related

- [MCP Skeletons](../D4-MCP-Skeletons/index.html) — what to *put* in the tool list; this page is
  what the wire does with it.
