"""
04 — Single agent or multi-agent? 🤖 vs 🤖🤖  (decision helper — no API key needed)

Encodes the exam's decision rule so you can play with scenarios. The whole point:
pick the SIMPLEST tier that works. Over-engineering loses points.

    python 04_single_vs_multi.py
"""


def recommend(steps, distinct_roles, parallel_work, cost_or_latency_sensitive):
    """
    steps                     : int  — how many sequential steps the task needs
    distinct_roles            : bool — does it need separate specialised expertise?
    parallel_work             : bool — are there independent sub-tasks to run at once?
    cost_or_latency_sensitive : bool — is cheap/fast a hard constraint?
    """
    # Cost/latency pressure pushes hard toward the simplest tier.
    if cost_or_latency_sensitive and not parallel_work:
        return "🤖  single agent + tools", "cost/latency favour the simplest tier"

    if parallel_work:
        return "🤖🤖 multi-agent", "independent sub-tasks → parallelise to cut wall-clock"

    if steps >= 5 or distinct_roles:
        return "🤖🤖 multi-agent", "many steps / distinct specialised roles"

    return "🤖  single agent + tools", "simple enough — don't over-engineer"


SCENARIOS = [
    # (label, steps, distinct_roles, parallel_work, cost/latency)
    ("Answer one support ticket",                 2, False, False, True),
    ("Blog: research + outline + draft + edit",   4, True,  False, False),
    ("Research 5 competitors simultaneously",     3, True,  True,  False),
    ("Cheap high-volume classification",          1, False, False, True),
]

if __name__ == "__main__":
    for label, s, r, p, c in SCENARIOS:
        pick, why = recommend(s, r, p, c)
        print(f"{label:<44} → {pick:<22} ({why})")

    print("\n🧭 Reminder — 'Should I build an agent at all?' Check 4 things:")
    print("   Complexity · Value · Viability (is Claude capable?) · Cost-of-error (recoverable?)")
    print("   Any 'no' → drop to a single call or a code-orchestrated workflow.")
