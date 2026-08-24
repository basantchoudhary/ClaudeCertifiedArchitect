"""
Capture REAL request/response JSON for every scenario in the Wire-Format Reference.

The reference page ships with shapes taken from the current API documentation. Run this
with a live API key and it overwrites them with actual captures from your account —
real message IDs, real token counts, real content blocks.

    pip install anthropic
    export ANTHROPIC_API_KEY=sk-ant-...
    python capture.py                 # all scenarios
    python capture.py 01 03 06        # only these

Writes captured/<id>_<name>/request.json and response.json.

Costs real money — a few cents in total at the max_tokens set below. The batch and MCP
scenarios are deliberately not captured here; see the notes at the bottom of this file.
"""

import json
import os
import pathlib
import sys

import anthropic

OUT = pathlib.Path(__file__).parent / "captured"

WEATHER_TOOL = {
    "name": "get_weather",
    "description": "Get the current weather for a location. Call this whenever the user "
                   "asks about current conditions, temperature, or whether to bring a coat.",
    "input_schema": {
        "type": "object",
        "properties": {
            "location": {"type": "string", "description": "City and country, e.g. Paris, France"},
            "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]},
        },
        "required": ["location"],
    },
}

# Each scenario is exactly the request body that goes on the wire.
SCENARIOS: dict[str, tuple[str, dict]] = {
    "01": ("single_turn", {
        "model": "claude-opus-5",
        "max_tokens": 1024,
        "messages": [{"role": "user", "content": "What is the capital of France?"}],
    }),

    "02": ("system_and_history", {
        "model": "claude-opus-5",
        "max_tokens": 1024,
        "system": "You are a terse geography tutor. Answer in one sentence.",
        "messages": [
            {"role": "user", "content": "What is the capital of France?"},
            {"role": "assistant", "content": "Paris is the capital of France."},
            {"role": "user", "content": "And its population?"},
        ],
    }),

    "03": ("tool_use_request", {
        "model": "claude-opus-5",
        "max_tokens": 1024,
        "tools": [WEATHER_TOOL],
        "messages": [{"role": "user", "content": "What is the weather in Paris?"}],
    }),

    "06": ("parallel_tool_calls", {
        "model": "claude-opus-5",
        "max_tokens": 1024,
        "tools": [WEATHER_TOOL],
        "messages": [{"role": "user",
                      "content": "Compare the weather in Paris, Tokyo and Cairo right now."}],
    }),

    "07a": ("tool_choice_auto", {
        "model": "claude-opus-5",
        "max_tokens": 1024,
        "tools": [WEATHER_TOOL],
        "tool_choice": {"type": "auto"},
        "messages": [{"role": "user", "content": "Hello! How are you today?"}],
    }),
    "07b": ("tool_choice_any", {
        "model": "claude-opus-5",
        "max_tokens": 1024,
        "tools": [WEATHER_TOOL],
        "tool_choice": {"type": "any"},
        "messages": [{"role": "user", "content": "Hello! How are you today?"}],
    }),
    "07c": ("tool_choice_forced", {
        "model": "claude-opus-5",
        "max_tokens": 1024,
        "tools": [WEATHER_TOOL],
        "tool_choice": {"type": "tool", "name": "get_weather"},
        "messages": [{"role": "user", "content": "Hello! How are you today?"}],
    }),

    "08": ("structured_output", {
        "model": "claude-opus-5",
        "max_tokens": 1024,
        "output_config": {"format": {"type": "json_schema", "schema": {
            "type": "object",
            "properties": {
                "name": {"type": "string"},
                "email": {"type": "string"},
                "plan": {"type": "string"},
                "demo_requested": {"type": "boolean"},
            },
            "required": ["name", "email", "plan", "demo_requested"],
            "additionalProperties": False,
        }}},
        "messages": [{"role": "user", "content":
                      "Extract: Jane Doe (jane@co.com) wants Enterprise and asked for a demo."}],
    }),
}


def capture(key: str) -> None:
    name, body = SCENARIOS[key]
    client = anthropic.Anthropic()

    # with_raw_response gives the actual HTTP response body, not just the parsed object.
    raw = client.messages.with_raw_response.create(**body)
    response_json = json.loads(raw.text)

    folder = OUT / f"{key}_{name}"
    folder.mkdir(parents=True, exist_ok=True)
    (folder / "request.json").write_text(json.dumps(body, indent=2) + "\n")
    (folder / "response.json").write_text(json.dumps(response_json, indent=2) + "\n")

    stop = response_json.get("stop_reason")
    usage = response_json.get("usage", {})
    print(f"  ✓ {key} {name:24} stop_reason={stop:12} "
          f"in={usage.get('input_tokens')} out={usage.get('output_tokens')}")


def main() -> None:
    if not (os.environ.get("ANTHROPIC_API_KEY") or os.environ.get("ANTHROPIC_AUTH_TOKEN")):
        sys.exit("No credentials. Set ANTHROPIC_API_KEY (or run `ant auth login`).")

    keys = sys.argv[1:] or list(SCENARIOS)
    unknown = [k for k in keys if k not in SCENARIOS]
    if unknown:
        sys.exit(f"Unknown scenario(s): {unknown}. Available: {list(SCENARIOS)}")

    print(f"Capturing {len(keys)} scenario(s) → {OUT}\n")
    for key in keys:
        capture(key)
    print(f"\nDone. Paste the captured JSON into index.html to replace the documented shapes.")


# -----------------------------------------------------------------------------
# WHAT IS NOT CAPTURED HERE, AND WHY
#
# 04, 05, 09  (tool_result, the two-iteration loop, is_error) need a tool to actually
#             run between calls. They are the same POST as 03 with more history — extend
#             this script with your own execute_tool() if you want them live.
# 10          (MCP) needs a reachable remote MCP server URL for the connector half; the
#             JSON-RPC half is the server's own wire format, captured by running one of
#             the D4-MCP-Skeletons servers with a protocol-level client.
# 11          (Batches) is asynchronous — create, poll, then fetch results. Worth doing
#             by hand once rather than scripting; it also takes up to an hour to settle.
# -----------------------------------------------------------------------------

if __name__ == "__main__":
    main()
