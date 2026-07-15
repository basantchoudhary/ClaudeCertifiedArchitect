#!/usr/bin/env python3
"""
Context-bloat techniques — done WITHOUT breaking integrity or reliability.

A growing agent conversation bloats the context window: big tool_result payloads,
long histories, fat tool schemas. This script demonstrates every lever the Claude
API gives you to control that, and — the point of the exercise — the *correct* way
to apply each so you never corrupt the conversation.

Techniques shown (CCA Domain 5):
  1. count_tokens        — MEASURE before you act (never guess/estimate)
  2. prompt caching      — cheap re-sends of a stable prefix (cost, not footprint)
  3. context editing     — PRUNE stale tool_results, keep the dialogue intact
  4. compaction          — SUMMARISE near the window limit (append response.content!)
  5. memory tool         — persist facts ACROSS sessions (out of the window)
  6. safe truncation     — client-side sliding window that never orphans tool pairs
  7. tool-schema slimming — keep tool definitions small (tool search / lean results)

Each function prints what happened and carries an "INTEGRITY" note explaining the
rule that keeps the conversation valid.

Run:
    pip install anthropic
    export ANTHROPIC_API_KEY=sk-ant-...
    python context_bloat_techniques.py --technique all
    python context_bloat_techniques.py --technique compact   # one at a time
"""
from __future__ import annotations

import argparse
import os

import anthropic

MODEL = "claude-opus-4-8"
client = anthropic.Anthropic()  # reads ANTHROPIC_API_KEY


# --------------------------------------------------------------------------- #
# Helpers
# --------------------------------------------------------------------------- #
def big_payload(n_lines: int = 400) -> str:
    """Simulate a large tool_result (e.g. a log dump / file read) that bloats context."""
    return "\n".join(f"2026-01-01T00:{i%60:02d}:00Z  worker[{i}]  processed batch id={i} ok" for i in range(n_lines))


def usage_line(usage) -> str:
    return (
        f"input={getattr(usage, 'input_tokens', 0)} "
        f"output={getattr(usage, 'output_tokens', 0)} "
        f"cache_write={getattr(usage, 'cache_creation_input_tokens', 0)} "
        f"cache_read={getattr(usage, 'cache_read_input_tokens', 0)}"
    )


def block_type(b) -> str:
    """type of a content block whether it's an SDK object or a plain dict."""
    return getattr(b, "type", None) or (b.get("type") if isinstance(b, dict) else None)


# --------------------------------------------------------------------------- #
# 1. count_tokens — measure, don't estimate
# --------------------------------------------------------------------------- #
def demo_count_tokens() -> None:
    print("\n=== 1. count_tokens (measure before you act) ===")
    messages = [
        {"role": "user", "content": "Summarise these logs."},
        {"role": "assistant", "content": "Sure — share them."},
        {"role": "user", "content": big_payload()},
    ]
    ct = client.messages.count_tokens(model=MODEL, messages=messages)
    print(f"This conversation is {ct.input_tokens} input tokens.")
    print("INTEGRITY: this is the accurate, model-specific count. Never use tiktoken or a")
    print("           char/4 rule to decide when to trim — those under-count Claude tokens.")


# --------------------------------------------------------------------------- #
# 2. Prompt caching — cheap re-sends of a stable prefix
# --------------------------------------------------------------------------- #
def demo_prompt_caching() -> None:
    print("\n=== 2. Prompt caching (cut the COST of re-sending a stable prefix) ===")
    stable_system = [{
        "type": "text",
        "text": "You are a precise data assistant.\n\n" + big_payload(600),  # large, stable reference
        "cache_control": {"type": "ephemeral"},   # cache this prefix
    }]
    r1 = client.messages.create(model=MODEL, max_tokens=64, system=stable_system,
                                messages=[{"role": "user", "content": "Reply with the single word: one"}])
    r2 = client.messages.create(model=MODEL, max_tokens=64, system=stable_system,
                                messages=[{"role": "user", "content": "Reply with the single word: two"}])
    print(f"1st call: {usage_line(r1.usage)}   <- pays the cache WRITE (~1.25x)")
    print(f"2nd call: {usage_line(r2.usage)}   <- cache_read>0 means the prefix was reused (~0.1x)")
    print("INTEGRITY: caching does NOT shrink the window — it only makes re-sending cheaper.")
    print("           The prefix must be BYTE-STABLE. A datetime/uuid in the system prompt")
    print("           silently invalidates the cache (cache_read stays 0). Put volatile")
    print("           content AFTER the last cache breakpoint.")


# --------------------------------------------------------------------------- #
# 3. Context editing — prune stale tool_results, KEEP the dialogue
# --------------------------------------------------------------------------- #
def demo_context_editing() -> None:
    print("\n=== 3. Context editing (PRUNE stale tool_results, dialogue stays intact) ===")
    # A conversation whose old tool_result payloads dominate the window.
    messages = [
        {"role": "user", "content": "Investigate the failing job."},
        {"role": "assistant", "content": [
            {"type": "text", "text": "Fetching logs."},
            {"type": "tool_use", "id": "t1", "name": "fetch_logs", "input": {"job": "etl-42"}},
        ]},
        {"role": "user", "content": [{"type": "tool_result", "tool_use_id": "t1", "content": big_payload(500)}]},
        {"role": "assistant", "content": "The failure is a null key on line 3. Want the fix?"},
        {"role": "user", "content": "Yes, propose the fix."},
    ]
    try:
        resp = client.beta.messages.create(
            model=MODEL, max_tokens=512,
            betas=["context-management-2025-06-27"],
            context_management={"edits": [{"type": "clear_tool_uses_20250919"}]},  # + "clear_tool_inputs": True
            tools=[{"name": "fetch_logs", "description": "Fetch job logs.",
                    "input_schema": {"type": "object", "properties": {"job": {"type": "string"}}, "required": ["job"]}}],
            messages=messages,
        )
        print(f"call: {usage_line(resp.usage)}")
        print("The big fetch_logs result was cleared server-side before the model saw it,")
        print("but the running dialogue (the investigation + the 'propose the fix' turn) is intact.")
    except Exception as e:
        print(f"[beta not enabled here: {e}]")
    print("INTEGRITY: context editing PRUNES old tool results only — message roles and the")
    print("           conversation stay valid. It is NOT summarisation. It won't touch the")
    print("           dialogue, and you keep the full history client-side; the API reports")
    print("           what it cleared. (Tune with keep-N / exclude_tools / clear_tool_inputs.)")


# --------------------------------------------------------------------------- #
# 4. Compaction — summarise near the window limit (STATE must round-trip)
# --------------------------------------------------------------------------- #
def demo_compaction() -> None:
    print("\n=== 4. Compaction (SUMMARISE when the whole history nears the window limit) ===")
    messages = [
        {"role": "user", "content": "Help me build a web scraper."},
        {"role": "assistant", "content": "Here's a plan..."},
        {"role": "user", "content": "Add JS rendering, then rate limiting, then retries."},
    ]
    try:
        resp = client.beta.messages.create(
            model=MODEL, max_tokens=512,
            betas=["compact-2026-01-12"],
            context_management={"edits": [{"type": "compact_20260112"}]},
            messages=messages,
        )
        print(f"call: {usage_line(resp.usage)}")
        # *** THE INTEGRITY RULE FOR COMPACTION ***
        messages.append({"role": "assistant", "content": resp.content})   # full content, NOT just .text
        print("Appended the FULL response.content (may include a compaction block).")
    except Exception as e:
        print(f"[beta not enabled here: {e}]")
    print("INTEGRITY: you MUST append `response.content` (not the extracted text) back to")
    print("           messages every turn. The compaction block carries the summarised state;")
    print("           extracting only the text silently LOSES it and corrupts the next request.")
    print("           Use compaction for a too-big *whole conversation*; use context editing")
    print("           (#3) when the problem is specifically bloated tool_results.")


# --------------------------------------------------------------------------- #
# 5. Memory tool — persist facts ACROSS sessions (out of the window)
# --------------------------------------------------------------------------- #
class FileMemory:
    """Minimal, path-safe backend for the client-executed memory tool."""
    def __init__(self, root: str = "./memories"):
        self.root = os.path.abspath(root)
        os.makedirs(self.root, exist_ok=True)

    def _safe(self, path: str) -> str:
        # path-traversal guard = integrity: the model cannot escape ./memories
        full = os.path.abspath(os.path.join(self.root, path.lstrip("/").removeprefix("memories/")))
        if not full.startswith(self.root):
            raise ValueError("path escapes the memory root")
        return full

    def handle(self, cmd: dict) -> str:
        c = cmd.get("command")
        if c == "create":
            p = self._safe(cmd["path"])
            os.makedirs(os.path.dirname(p), exist_ok=True)
            open(p, "w").write(cmd.get("file_text", ""))
            return f"created {cmd['path']}"
        if c == "view":
            p = self._safe(cmd["path"])
            return open(p).read() if os.path.isfile(p) else "\n".join(os.listdir(self.root))
        if c == "str_replace":
            p = self._safe(cmd["path"])
            txt = open(p).read().replace(cmd["old_str"], cmd["new_str"])
            open(p, "w").write(txt)
            return "ok"
        return f"unsupported command: {c}"


def demo_memory() -> None:
    print("\n=== 5. Memory tool (persist facts ACROSS sessions — outside the window) ===")
    mem = FileMemory()
    tools = [{"type": "memory_20250818", "name": "memory"}]
    messages = [{"role": "user", "content": "Remember that our default warehouse is 'analytics_wh'. Save it to memory."}]
    for _ in range(4):  # small manual loop: run memory tool calls, feed results back
        resp = client.messages.create(model=MODEL, max_tokens=1024, tools=tools, messages=messages)
        if resp.stop_reason != "tool_use":
            print("assistant:", next((b.text for b in resp.content if b.type == "text"), ""))
            break
        messages.append({"role": "assistant", "content": resp.content})   # append whole turn
        results = []
        for b in resp.content:
            if b.type == "tool_use" and b.name == "memory":
                try:
                    out = mem.handle(dict(b.input))
                    results.append({"type": "tool_result", "tool_use_id": b.id, "content": out})
                except Exception as e:
                    results.append({"type": "tool_result", "tool_use_id": b.id, "content": str(e), "is_error": True})
        messages.append({"role": "user", "content": results})
    print("INTEGRITY: memory lives on disk (./memories), NOT in the context window, so it")
    print("           survives across sessions without bloating any single conversation.")
    print("           The path guard prevents the model from writing outside the memory root.")
    print("           Rule: never store secrets/PII in memory (it replays into every session).")


# --------------------------------------------------------------------------- #
# 6. Safe truncation — a sliding window that never orphans tool pairs
# --------------------------------------------------------------------------- #
def safe_sliding_window(messages: list[dict], max_recent: int = 6) -> list[dict]:
    """Keep the first user turn (task/instructions) + the most recent WHOLE turns.

    A cut is only allowed at a *plain* user message (one with no tool_result blocks),
    so a kept assistant `tool_use` always keeps its matching `tool_result`, and we
    never start the window on a dangling `tool_result`. That preserves the API's
    tool_use/tool_result pairing invariant.
    """
    if len(messages) <= max_recent + 1:
        return messages

    def is_plain_user(m: dict) -> bool:
        if m["role"] != "user":
            return False
        c = m["content"]
        if isinstance(c, str):
            return True
        return not any(block_type(b) == "tool_result" for b in c)

    head, tail = messages[:1], messages[1:]
    starts = [i for i, m in enumerate(tail) if is_plain_user(m)]
    cut = 0
    for i in starts:
        if len(tail) - i <= max_recent:
            cut = i
            break
    return head + tail[cut:]


def demo_safe_truncation() -> None:
    print("\n=== 6. Safe truncation (client-side sliding window, no orphaned tool pairs) ===")
    messages = [
        {"role": "user", "content": "TASK: keep the ledger balanced."},               # keep (instructions)
        {"role": "assistant", "content": [{"type": "tool_use", "id": "a", "name": "read", "input": {}}]},
        {"role": "user", "content": [{"type": "tool_result", "tool_use_id": "a", "content": big_payload(200)}]},
        {"role": "assistant", "content": "read done."},
        {"role": "user", "content": "Now compute Q1 totals."},                         # plain user -> safe cut point
        {"role": "assistant", "content": [{"type": "tool_use", "id": "b", "name": "sum", "input": {}}]},
        {"role": "user", "content": [{"type": "tool_result", "tool_use_id": "b", "content": "42"}]},
    ]
    trimmed = safe_sliding_window(messages, max_recent=3)
    print(f"before: {len(messages)} messages   after: {len(trimmed)} messages")
    print("kept:", [ (m['role'], block_type(m['content'][0]) if isinstance(m['content'], list) else 'text') for m in trimmed])
    print("INTEGRITY: the first user turn is always kept; the window starts at a PLAIN user")
    print("           turn so no tool_result is orphaned. RELIABILITY caveat: any truncation")
    print("           changes the prefix, so it INVALIDATES prompt caching — prefer context")
    print("           editing (#3) when you only need to drop tool results.")


# --------------------------------------------------------------------------- #
# 7. Tool-schema slimming — keep tool definitions small
# --------------------------------------------------------------------------- #
def demo_tool_slimming() -> None:
    print("\n=== 7. Tool-schema slimming (fat tool sets & fat results bloat context too) ===")
    print("Levers (no single API call to 'run' here — these are design choices):")
    print("  - Tool search + defer_loading: expose many tools but load only relevant schemas")
    print("    on demand (schemas are APPENDED, so the prompt cache is preserved).")
    print("  - Return LEAN tool_results: summarise/truncate large payloads before returning them")
    print("    (send shape, not the whole 50k-row dump).")
    print("  - Programmatic tool calling: chain tool calls in code so only the FINAL result")
    print("    re-enters the context, not every intermediate payload.")
    print("INTEGRITY: none of these change message roles or pairing — they just keep each")
    print("           turn's footprint small, which is the cheapest bloat fix of all.")


# --------------------------------------------------------------------------- #
DEMOS = {
    "count": demo_count_tokens,
    "cache": demo_prompt_caching,
    "edit": demo_context_editing,
    "compact": demo_compaction,
    "memory": demo_memory,
    "truncate": demo_safe_truncation,
    "tools": demo_tool_slimming,
}


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--technique", choices=list(DEMOS) + ["all"], default="all")
    args = ap.parse_args()
    picks = list(DEMOS.values()) if args.technique == "all" else [DEMOS[args.technique]]
    for fn in picks:
        try:
            fn()
        except Exception as e:
            print(f"[{fn.__name__} failed: {e}]")
    print("\nDone. See the theory: CCA-F/D5-Context-Management/ (clusters 2 & 3).")


if __name__ == "__main__":
    main()
