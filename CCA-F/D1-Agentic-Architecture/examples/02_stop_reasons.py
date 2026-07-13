"""
02 — stop_reason as a router. 🚦  (no API key needed — pure logic demo)

The heart of Domain 1 is a switch statement on stop_reason. This tiny program
lets you SEE the routing without any network calls. Run it and read the output.

    python 02_stop_reasons.py
"""

# What each stop_reason means and the correct action. Memorise all SIX.
PLAYBOOK = {
    "end_turn":     ("✅ finished naturally",        "return text, stop the loop"),
    "tool_use":     ("🛠 wants a tool",              "run tool → append tool_result → loop"),
    "max_tokens":   ("✂ OUTPUT truncated",           "raise max_tokens / stream / continue"),
    "stop_sequence":("🛑 hit a stop sequence",       "handle per your protocol"),
    "pause_turn":   ("⏸ server-tool loop paused",    "re-send assistant turn as-is (resumes)"),
    "refusal":      ("🚫 safety decline",            "check stop_details, surface it, don't retry"),
}


def decide(stop_reason):
    """Return the action your harness should take. This is the exam in a nutshell."""
    meaning, action = PLAYBOOK.get(stop_reason, ("❓ unknown", "log and stop"))
    return meaning, action


if __name__ == "__main__":
    # Simulate a loop receiving different stop_reasons.
    for sr in ["tool_use", "tool_use", "max_tokens", "pause_turn", "refusal", "end_turn"]:
        meaning, action = decide(sr)
        keep_looping = sr in ("tool_use", "max_tokens", "pause_turn")
        arrow = "↻ keep looping" if keep_looping else "■ exit loop"
        print(f"{sr:<14} {meaning:<26} → {action:<42} [{arrow}]")

    # ⚠️ Gotcha: max_tokens is about OUTPUT length, NOT the context window.
    #    Don't 'fix' it by summarising history — raise the cap or stream.
