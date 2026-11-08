# CCA-P trap gym: writing spec

The CCA-P exam is decided by traps: two options are good practices, and one fact in the stem decides.
Each trap page lets the reader **change that one fact and watch the winning answer move**. Built by
`src/build_traps.py` from `src/traps/<slug>.json` into `Trap-Gym/<slug>/index.html` and the list page
`Trap-Gym/index.html`.

Read first: `src/DOMAIN-SPEC.md` (writing rules and question rules all apply), `CCAR-P-Exam-Guide.md`,
and the domain data in `src/domains/d*.json` (the mind maps there are the raw material for worlds).
Practice questions must not repeat the domain pages' practice questions or `Mock-Exam-1/parts/*.json`.

## The trap list (slug, title, guide lines)

| # | slug | Trap (the wrong instinct) | Lines |
|---|---|---|---|
| 1 | remove-not-watch | Logging or confirming a capability the role never needs, instead of removing it | 3.1, 5.1 |
| 2 | prompt-vs-code | A prompt rule where the requirement must hold every time | 2.2, 5.1, 7.1 |
| 3 | bigger-is-not-better | A bigger model or bigger context window as the fix | 2.1, 2.4, 3.8 |
| 4 | inputs-before-model | Blaming the model before checking inputs and retrieval | 4.4, 3.5 |
| 5 | least-autonomy | Agents or multi-agent where a workflow or single call works | 1.3, 1.4 |
| 6 | retrieval-fit | Vector search for exact codes, numbers or filters | 3.6, 3.5 |
| 7 | whose-permissions | A shared service account instead of the user's own access | 3.2 |
| 8 | proxy-metrics | Self-reported confidence, thumbs-up or an average as the measure | 4.1, 5.3, 5.5 |
| 9 | evidence-before-ship | Shipping on a few examples, or changing two things at once | 4.3, 6.5 |
| 10 | cache-not-cut | Truncating or downsizing when a stable prefix could be cached | 2.5, 4.5 |
| 11 | measurable-expectations | Promising 100% or accepting a vague "fast and accurate" | 6.3, 1.6 |
| 12 | speak-to-the-listener | A technical answer to a business audience, or no recommendation | 6.2, 6.4 |
| 13 | lightest-protocol | An MCP server for one fixed call, or custom glue for a shared tool | 3.7 |
| 14 | load-on-demand | Loading everything up front vs progressive discovery | 3.8, 2.4 |
| 15 | review-by-risk | Human review of everything, or of nothing | 5.3 |
| 16 | measure-fairness | Prompting for fairness instead of measuring outcomes | 5.5 |

## JSON shape (`src/traps/<slug>.json`)

```json
{
  "n": 1,
  "slug": "remove-not-watch",
  "title": "Remove it, don't watch it",
  "domain": "D3 · Integration",
  "lines": ["3.1", "5.1"],
  "glance": "One sentence: the trap and the rule.",
  "story": ["2–3 short paragraphs teaching the idea from zero, plain words"],
  "situation": "The base situation, 40–70 words, in plain words. Ends with the decision to make.",
  "options": [
    {"id": "A", "t": "option text"},
    {"id": "B", "t": "…"},
    {"id": "C", "t": "…"},
    {"id": "D", "t": "…"}
  ],
  "worlds": [
    {"name": "As written", "fact": "The deciding fact as the situation states it.",
     "winner": "B", "why": "Why B wins in this world.",
     "losers": {"A": "Why A loses here.", "C": "…", "D": "…"}},
    {"name": "One fact changed", "fact": "A different fact.", "winner": "C", "why": "…",
     "losers": {"A": "…", "B": "…", "D": "…"}},
    {"name": "Another fact changed", "fact": "…", "winner": "A", "why": "…", "losers": {"…": "…"}}
  ],
  "signals": ["4–6 phrases in a stem that point to this trap"],
  "remember": "The rule in one or two plain sentences.",
  "practice": [ "3 questions in the DOMAIN-SPEC question format (stem, select, options, key, why, traps)" ]
}
```

- **3 worlds** (2 is the minimum): each world changes one fact, and the winner must differ in at least two of
  them. Every world explains every losing option. The four options stay the same across worlds: that is
  the point.
- Practice: 3 questions per trap, at least one where the runner-up wins (a "lookalike" situation). Same
  quality and anti-giveaway rules as the domain pages; key positions spread.

Check with `python3 CCAR-P/src/build_traps.py --check`.
