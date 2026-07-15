# D5 examples — context-bloat techniques

Runnable Claude-API script showing every way to control a bloating context window
**without breaking integrity or reliability** (Domain 5, clusters 2 & 3):

| # | Technique | What it does | The integrity rule |
|---|-----------|--------------|--------------------|
| 1 | `count_tokens` | Measure before you act | Accurate, model-specific — never estimate with tiktoken |
| 2 | Prompt caching | Cheap re-sends of a stable prefix | Prefix must be byte-stable (no datetime/uuid) — it does *not* shrink the window |
| 3 | Context editing | Prune stale `tool_result`s | Keeps the dialogue &amp; message roles intact — it prunes, doesn't summarise |
| 4 | Compaction | Summarise a too-big whole conversation | **Append `response.content` (not `.text`)** or you lose the compaction state |
| 5 | Memory tool | Persist facts across sessions | Lives on disk, outside the window; path-guarded; never store secrets |
| 6 | Safe truncation | Client-side sliding window | Cut only at plain user turns → never orphan a `tool_use`/`tool_result` pair (and it invalidates the cache) |
| 7 | Tool-schema slimming | Smaller tool defs &amp; results | Tool search / lean results / programmatic tool calling — no role changes |

```bash
pip install anthropic
export ANTHROPIC_API_KEY=sk-ant-...
python context_bloat_techniques.py --technique all
python context_bloat_techniques.py --technique compact   # or: count | cache | edit | memory | truncate | tools
```

Some techniques use beta features (context editing, compaction) and print a note if
the beta isn't enabled on your account — the code still shows the correct API shape.
