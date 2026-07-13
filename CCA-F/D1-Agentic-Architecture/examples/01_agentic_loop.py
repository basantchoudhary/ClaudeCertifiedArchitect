"""
01 — The agentic loop, end to end. 🔁

A tiny but COMPLETE manual agentic loop that handles every stop_reason.
One real tool (get_weather). Read the comments top-to-bottom like a story.

Run:
    pip install anthropic
    export ANTHROPIC_API_KEY=sk-ant-...
    python 01_agentic_loop.py
"""

import anthropic

client = anthropic.Anthropic()  # reads ANTHROPIC_API_KEY from the environment

# 1) Define your tools (name + description + JSON schema). The DESCRIPTION is what
#    Claude reads to decide when to call it — be specific.
TOOLS = [
    {
        "name": "get_weather",
        "description": "Get the current weather for a city. Call this whenever the "
                       "user asks about weather, temperature, or conditions.",
        "input_schema": {
            "type": "object",
            "properties": {
                "city": {"type": "string", "description": "City name, e.g. 'Paris'"},
            },
            "required": ["city"],
        },
    }
]


def run_tool(name, tool_input):
    """Your real code runs here. We fake it so the file is runnable as-is."""
    if name == "get_weather":
        return f"18C and sunny in {tool_input['city']}."
    return "Unknown tool."


def chat(user_input, max_continuations=5):
    # 2) messages[] holds the FULL history. The API is STATELESS — we resend it every call.
    messages = [{"role": "user", "content": user_input}]
    continuations = 0

    while True:
        resp = client.messages.create(
            model="claude-opus-4-8",          # current default model
            max_tokens=16000,
            tools=TOOLS,
            messages=messages,
        )
        print(f"  · stop_reason = {resp.stop_reason}")

        # 3) The whole loop is a switch on stop_reason. ────────────────────────────
        if resp.stop_reason == "end_turn":
            # ✅ Done. Return the final text.
            return next((b.text for b in resp.content if b.type == "text"), "")

        if resp.stop_reason == "refusal":
            # 🚫 Safety decline. content may be empty — DON'T index into it blindly.
            cat = getattr(resp.stop_details, "category", None) if resp.stop_details else None
            return f"[refused: {cat}]"

        if resp.stop_reason == "max_tokens":
            # ✂ OUTPUT truncated (not "conversation too long"). Simplest handling: continue.
            messages.append({"role": "assistant", "content": resp.content})
            messages.append({"role": "user", "content": "Please continue."})
            continue

        if resp.stop_reason == "pause_turn":
            # ⏸ Server-side tool loop paused. Re-send as-is; server resumes. No "Continue." msg.
            continuations += 1
            if continuations > max_continuations:
                return "[gave up: too many pauses]"
            messages.append({"role": "assistant", "content": resp.content})
            continue

        # 4) tool_use: append the WHOLE assistant turn (keeps the tool_use blocks!),
        #    run each tool, then send ALL results back in ONE user turn.
        messages.append({"role": "assistant", "content": resp.content})
        results = []
        for block in resp.content:
            if block.type == "tool_use":
                print(f"    🛠 calling {block.name}({block.input})")
                results.append({
                    "type": "tool_result",
                    "tool_use_id": block.id,   # MUST echo the tool_use id, or 400
                    "content": run_tool(block.name, block.input),
                })
        messages.append({"role": "user", "content": results})
        # loop again → Claude now sees the tool output and answers the user


if __name__ == "__main__":
    print("User: What's the weather in Tokyo?")
    print("Claude:", chat("What's the weather in Tokyo?"))
