# D1 Practice Questions 📝

Scenario-style, like the real exam. Try to answer before expanding. Each answer explains
*why the others are wrong* — that's where the learning is.

---

**Q1.** Your agent appends `response.content[0].text` to `messages` after each turn. On the
second tool call the API errors. Why?

<details><summary>Answer</summary>

**You must append the entire `response.content`, not just the text.** The assistant turn
contains the `tool_use` block; dropping it means the following `tool_result` references a
`tool_use_id` that isn't in the history → 400. Fix: `messages.append({"role":"assistant",
"content": response.content})`.
</details>

---

**Q2.** A response comes back with `stop_reason == "max_tokens"`. What happened, and what's the
*best* fix?

<details><summary>Answer</summary>

The **output** hit the `max_tokens` cap and is **truncated** (not "the conversation is too
long"). Best fixes: raise `max_tokens`, switch to streaming, or continue the turn. It is **not**
a context-window problem, so summarising history is the wrong lever here.
</details>

---

**Q3.** You call a server-side tool (web search). The response is `stop_reason == "pause_turn"`
with a `server_tool_use` block. What do you send next?

<details><summary>Answer</summary>

**Re-send the assistant turn as-is** (append `response.content` and call again). The server
resumes its own loop where it left off. Adding a `"Continue."` user message is **wrong** — the
API detects the trailing `server_tool_use` block automatically. Cap continuations (e.g. 5) to
avoid infinite loops.
</details>

---

**Q4.** Support system: 10 tools, one clear escalation path, cost-sensitive, needs low latency.
Single agent + tools, or multi-agent coordinator?

<details><summary>Answer</summary>

**Single agent + tools.** No distinct specialised roles or parallel work is described, and the
constraints are cost + latency — both favour the simplest tier. Multi-agent adds tokens and
latency for no benefit here. Watch for "cost-effective" / "least latency" keywords → simplest design.
</details>

---

**Q5.** A coordinator delegates to a `billing` sub-agent, but the sub-agent keeps asking for the
customer ID the coordinator already had. Root cause?

<details><summary>Answer</summary>

**Lost state / prompt isolation.** Sub-agents don't share the coordinator's context. Fix: pass
the required state (customer ID, relevant history) **explicitly** in the delegated message. Don't
assume the sub-agent "knows."
</details>

---

**Q6.** In a 3-agent sequential pipeline, one flaky external tool starts failing intermittently
and every run now fails. Which pattern prevents the whole pipeline collapsing?

<details><summary>Answer</summary>

A **circuit breaker**: once the tool's error rate crosses a threshold, stop calling it and take a
fallback path (skip / alternate / escalate) instead of letting failures cascade. General ladder:
retry → fallback → escalate.
</details>

---

**Q7.** Code reads `response.content[0].text` immediately after `create()`. Occasionally it throws
an index error. Likely cause and fix?

<details><summary>Answer</summary>

The response was a **`refusal`** (or another turn whose first block isn't text) — `content` can be
empty or start with a non-text block. **Branch on `stop_reason` first**; only read `content` for
the expected reasons. For refusals, inspect `stop_details` and surface the decline.
</details>

---

**Q8.** You want a cheaper model for just the "summarise" sub-step inside a long Opus conversation.
What's the recommended approach and why not just switch the model on the next call?

<details><summary>Answer</summary>

**Spawn a sub-agent** running the cheaper model for that step. Switching the main loop's model
mid-conversation **invalidates the prompt cache** (caches are model-scoped), so you'd pay full
price to re-process the whole prefix. Keep the main loop on one model.
</details>

---

**Q9.** True/false: with adaptive thinking you should tune `budget_tokens` to control cost.

<details><summary>Answer</summary>

**False.** `budget_tokens` is deprecated/removed on current models. Use `thinking={"type":
"adaptive"}` (Claude picks depth) and control spend with `output_config={"effort": ...}`.
</details>

---

**Q10.** Rank by cost-effectiveness for a high-volume, simple classification workload:
(a) Opus + max effort, (b) Sonnet + medium effort, (c) Haiku + low effort.

<details><summary>Answer</summary>

**c < b < a** in cost (Haiku cheapest). For *simple, high-volume* classification, **Haiku 4.5 at
low effort** is the cost-effective pick; reserve Opus/max for genuinely hard reasoning. Matching
model + effort to task difficulty is the core D1/D5 judgement call.
</details>
