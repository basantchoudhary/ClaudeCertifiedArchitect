# Mock Exam #6 — Real-Exam Style · item-writing spec

## Why this paper exists
The candidate scored highly on Mocks #4 and #5 and then failed the real CCA-F exam. Their report:
"in the real test the answers were confusing — there was no clear winning answer." An audit of Mock #5
confirms why the mocks were easier than the real thing:

- The correct option was the **longest option in 52 of 60 items** (correct avg 161 chars vs distractors 120).
- Correct options **carried their own justification** inside the option text ("…which is the field that
  actually reports…"); distractors did not.
- Distractors had **surface tells**: "state the limit in capitals", "nightly reconciliation", "remove the tool",
  "fine-tune", "require vendors to…". A test-wise reader eliminates them without knowing the material.

Community-voted real-exam-style questions (examtopics CCA-F) look different: 60–120-word scenario stems;
options 15–45 words; the correct option is the longest only ~30% of the time; and **in every item two options
are both architecturally sound**, differing in *which constraint they serve* (e.g. structured metadata vs inline
citations; coordinator mediation vs shared memory; gap-detection loop vs broader initial queries; structured
uncertainty sections vs numeric confidence calibration). The community itself disagrees on some of them.

Use examtopics for STYLE only. Do **not** reproduce or paraphrase any real exam question (NDA/copyright).
Every item must be original.

## The core rule: every item has a runner-up
Each item has exactly one best answer and one **runner-up**: an option that is a genuinely recommended
practice from the exam guide and that **would be the correct answer if one fact in the stem were different**.
The stem must contain that fact — the **decider** — stated plainly, once, without highlighting. Do not bold it.
Do not put it in the final question sentence. Bury it in the middle of the stem, the way the real exam does.

Good deciders: a latency requirement ("the check blocks merge"), a scope fact ("must be available to the
contractors on clone"), a frequency/ratio ("85% of the checks are single lookups"), a guarantee vs
improvement word in the question ("must never" vs "reduce"), what was already tried, who reads the output,
whether the information exists in the source document, whether the failure is deterministic or intermittent,
whether the request is a first step or a full design.

The other two options must also be plausible to a competent engineer: real practices applied at the wrong
layer, at the wrong time, or solving an adjacent problem. **No option may be eliminable by someone who does not
know the material.** At most ~6 items in your whole set may contain a non-existent feature/flag as a
distractor, and when you use one it must look exactly as real as the real ones (real exam does this:
e.g. an env var that sounds right).

## Option-writing rules (the checker enforces 1–4)
1. **Length parity.** In each item, every option's length is within ±22% of that item's mean option length.
   Aim for 90–200 characters per option.
2. **The correct answer is NOT systematically the longest.** Across your set: correct answer is the longest
   option in at most 25% of items, and the shortest option in at least 20% of items.
3. **Options are actions or claims only — no justification clauses.** No "so that…", "because…", "which
   ensures…", "guaranteeing…", "to prevent…" in option text. Reasons go in `why`, never in `t`.
4. **No tell words** in option text: always, never, guarantee(s), ensure(s), all caps words, "simply",
   "just", "fine-tune", "capitals". (Stem may use "guarantee" in the question sentence when that IS the
   discriminator.)
5. **Grammatical parallelism.** All four options start the same way (all imperatives, or all "The X…"
   claims) and are similar in specificity. If the right answer names a concrete mechanism (PreToolUse hook,
   `.claude/rules/` with `paths:`), the distractors also name concrete mechanisms.
6. No "all of the above", no combos ("both A and C"), no option that is a strict superset of another.
7. Correct answer must be what the official exam guide (`../../CCAR-F-Exam-Guide.md`) would endorse. When the
   exam guide's preference and general engineering taste differ, the exam guide wins — and that's often
   exactly where the runner-up lives.

## Stems
- 55–130 words. Concrete state: numbers, what was tried, what was observed. No bold anywhere in the stem
  except you may bold the final qualifier phrase (e.g. **most effective first step**), as the real exam does.
- Vary qualifiers: most effective, first step, root cause, best fits the constraint, least operational change,
  most likely explanation, which TWO.
- Some stems should mislead slightly: mention a symptom that invites the runner-up (the real exam does this).

## Scenario briefs
Short — like the official ones (40–80 words). Name the system and stack; put the item-specific state into the
items, not the brief. Use NEW system state that differs from Mocks #4 and #5.

## Coverage
Read the `obj` lists of Mock #4 and #5 (`../../Foundations-Mock-Exam-4/assets/questions.js`, `-5/…`). Covering
the same objectives is fine and expected; reusing their surfaces (same incident, same numbers, same option
ideas as the correct answer) is not. Prefer objectives that test **a choice between two good mechanisms**:
hook vs server-side validation, `any` vs forced tool_choice, resume vs fresh session with summary, fork vs new
session, `.mcp.json` vs `~/.claude.json`, rules-with-paths vs directory CLAUDE.md, skill vs command vs
CLAUDE.md, `context: fork` vs Explore subagent, plan mode vs direct, batch vs real-time, per-file + integration
pass vs independent reviewer, few-shot vs explicit criteria, nullable vs "unclear" enum, retry-with-feedback vs
flag-for-human, stratified sampling vs field-level confidence, scratchpad vs /compact, structured error vs
local retry, scoped cross-role tool vs routing via coordinator, MCP resource vs tool, Grep vs Glob, Edit vs
Read+Write, case-facts block vs trimming tool output, etc.

## Multiple response
Exactly ONE item per scenario is `select: 2` ("Which TWO…"). Its runner-up is a third option that is good but
not among the two best. Wrong pick of either = item wrong.

## Answer position
`answer` indices must be spread: across your 20 items, the correct index should hit each of 0,1,2,3 at least
4 times. (The page shuffles, but the source should not encode habits.)

## Output format — JSON file `parts/<letter>.json`
```json
{
  "scenarios": [ { "id": "s1", "title": "Scenario 1 — Customer Support Resolution Agent",
                   "domains": "D1 Agentic Architecture · D2 Tool Design &amp; MCP · D5 Context &amp; Reliability",
                   "brief": "HTML string, 40–80 words" } ],
  "questions": [ {
     "id": "m6-s1-01", "sid": "s1",
     "domain": "D1 · Agentic Architecture",          // exactly one of the five labels below
     "obj": "1.4 Prerequisite gates",
     "trap": "Right idea, wrong layer",               // name of the family below
     "fam": 4,                                        // 1–9
     "select": 1,
     "question": "HTML stem",
     "options": [ { "t": "option text, plain, may use <code>", "why": "Correct./Incorrect. … reason" }, ... 4 ],
     "answer": [2],
     "runnerUp": 0,                                   // index of the runner-up option (for select:2, the best non-answer)
     "decider": "One sentence: the exact fact in the stem that makes the answer beat the runner-up, and what would flip it.",
     "explanation": "2–3 sentences: the principle."
  } ]
}
```
Domain labels (use exactly): `D1 · Agentic Architecture`, `D2 · Tool Design & MCP`, `D3 · Claude Code Configuration`,
`D4 · Prompt Engineering & Structured Output`, `D5 · Context Management & Reliability`.

Trap families (fam: name): 1 Prompt where enforcement was required · 2 Disproportionate fix · 3 Treating the
symptom · 4 Right idea, wrong layer · 5 More context or reasoning instead of structure · 6 Unreliable proxy ·
7 Losing or fabricating information · 8 Wrong scope or wrong home · 9 Non-existent or misunderstood feature.
The `trap` is the family the **runner-up** belongs to. Expect families 4 and 8 to dominate.

The runner-up's `why` must start with "Runner-up." and say what would have to be true for it to win.

## Domain allocation (per scenario, 10 items each)
| Scenario | D1 | D2 | D3 | D4 | D5 |
|---|---|---|---|---|---|
| s1 Customer Support | 4 | 3 | – | – | 3 |
| s2 Code Generation with Claude Code | – | – | 6 | 2 | 2 |
| s3 Multi-Agent Research | 6 | 2 | – | – | 2 |
| s4 Developer Productivity | 3 | 4 | 3 | – | – |
| s5 Claude Code for CI | – | 2 | 3 | 5 | – |
| s6 Structured Data Extraction | 3 | – | – | 5 | 2 |

## Before you finish
Run `python3 ../validate.py parts/<letter>.json` from the `Foundations-Mock-Exam-6` dir... (actual path:
`python3 Foundations-Mock-Exam-6/validate.py Foundations-Mock-Exam-6/parts/<letter>.json` from `CCA-F/`)
and fix every error. Then do a self-review pass as a **test-wise candidate who has NOT studied**: for each item,
could you pick the answer by length, tone, specificity, a justification clause, or by eliminating silly options?
If yes, rewrite it. Then do a pass as an **expert**: is the answer defensibly best per the exam guide, and is the
runner-up genuinely tempting? If two options are equally best, sharpen the decider in the stem.

---

## Calibration log (how this paper was tested)

| Round | Expert solver (exam guide open, no key) | Test-wise guesser (told to ignore subject knowledge) | Mechanical baselines (single-answer items) |
|---|---|---|---|
| Draft | 60/60 · confidence 5 on 50 items · 0 ambiguous | 60/60 — cues: stem names what failed; correct option echoes stem; manager-smell distractors | — |
| Revision 1 | 60/60 · confidence 5 on 30, 4 on 29, 3 on 1 · 0 ambiguous | 58/60 — but its cues now need subject knowledge ("90-minute train rules out batch"), so an LLM guesser is no longer a clean no-knowledge test | pick-longest 13% · pick-shortest 26% · pick-most-echo 6% · pick-least-echo 43% (overshoot → fixed in revision 2) |
| Revision 2 (final) | 60/60 · confidence 5 on 39, 4 on 20, 3 on 1 · 2 flagged near-ambiguous (s3-01, s4-08) → deciders sharpened | not re-run (see note) | pick-longest 15% · pick-shortest 24% · pick-most-echo 7% · pick-least-echo 17% |
| Mock #5 for comparison | — | — | pick-longest **87%** · pick-most-echo 28% |

What these numbers mean:
- **Expert 60/60 is the intended result.** The expert solver has the guide open and unlimited time; a perfect
  score there means every key is provable from the stem. Difficulty for a human comes from the drop in
  certainty (50 → 30 items at full confidence) and from runner-ups that are real recommended practices.
- **Mechanical baselines are the true no-knowledge test.** Each must stay near chance (25%). Mock #5 failed
  this badly: always picking the longest option scored 87%.
- An LLM "guesser" cannot unlearn the subject, so after revision 1 its score stopped being informative.
