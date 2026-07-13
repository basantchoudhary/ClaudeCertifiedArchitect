"""
03 — The tool_result contract. 🧩  (pure logic demo — no API key needed)

The #1 source of 400 errors in tool use. Three rules:
  (1) tool_result.tool_use_id  MUST match the tool_use.id it answers
  (2) tool_result goes in a USER-role turn
  (3) roles must alternate (user / assistant / user / ...)

This program shows a VALID exchange and then three BROKEN ones, and explains each.

    python 03_tool_result_contract.py
"""


def validate(messages):
    """A miniature version of what the API checks. Returns [] if OK, else a list of errors."""
    errors = []

    # rule 3: first message must be user; roles alternate
    if messages and messages[0]["role"] != "user":
        errors.append("first message must be role=user")

    # collect tool_use ids from assistant turns, and tool_result ids from user turns
    open_ids = set()
    for msg in messages:
        for block in (msg["content"] if isinstance(msg["content"], list) else []):
            if block.get("type") == "tool_use":
                open_ids.add(block["id"])
            if block.get("type") == "tool_result":
                if msg["role"] != "user":                       # rule 2
                    errors.append(f"tool_result must be in a user turn (was {msg['role']})")
                if block["tool_use_id"] not in open_ids:        # rule 1
                    errors.append(f"tool_result.tool_use_id '{block['tool_use_id']}' "
                                  f"matches no tool_use.id")
    return errors


# ✅ VALID: id matches, result in a user turn, roles alternate
valid = [
    {"role": "user", "content": "weather in Paris?"},
    {"role": "assistant", "content": [{"type": "tool_use", "id": "toolu_A",
                                       "name": "get_weather", "input": {"city": "Paris"}}]},
    {"role": "user", "content": [{"type": "tool_result", "tool_use_id": "toolu_A",
                                  "content": "18C sunny"}]},
]

# ❌ BROKEN 1: id mismatch (typo)
mismatch = [
    valid[0], valid[1],
    {"role": "user", "content": [{"type": "tool_result", "tool_use_id": "toolu_B",
                                  "content": "18C sunny"}]},
]

# ❌ BROKEN 2: tool_result placed in an assistant turn
wrong_role = [
    valid[0], valid[1],
    {"role": "assistant", "content": [{"type": "tool_result", "tool_use_id": "toolu_A",
                                       "content": "18C sunny"}]},
]

if __name__ == "__main__":
    for label, convo in [("VALID ✅", valid),
                         ("id mismatch ❌", mismatch),
                         ("wrong role ❌", wrong_role)]:
        errs = validate(convo)
        print(f"{label:<18} → {'OK' if not errs else '; '.join(errs)}")

    print("\n💡 A failed tool? Don't crash — send the result with is_error=True:")
    print('   {"type":"tool_result","tool_use_id":"toolu_A",'
          '"content":"Error: city not found","is_error":true}')
