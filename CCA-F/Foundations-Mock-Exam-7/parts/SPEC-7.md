# Mock Exam #7 — "examtopics level": easy to read, no clear winner

## Who this is for and why
The candidate failed the real CCA-F exam, then worked through Mocks #4–#6. Their feedback:
- On the real exam, **the questions were easy to understand; the answers were the hard part** — two options
  looked right.
- Mock #6, even after its clarity pass, is **harder than the real exam**. They want a paper at the level of
  community real-exam-style questions (examtopics): plain question, close options.
- The **teaching layers** of Mock #6 were good and must be kept: "Explain this question simply" (`eli5`) and
  "Think it through" (`deep`).

## Read first (paths relative to `CCA-F/`)
1. `Foundations-Mock-Exam-6/parts/SPEC.md` — base item rules: runner-up, decider, option rules 1–7, JSON format,
   trap families, answer-position spread.
2. `Foundations-Mock-Exam-6/parts/REVISION-1.md` — **only** rules A (no echo), C (no manager-smell
   distractors) and E (two-answer items). Rules B and D (quiet deciders, misdirection) are **cancelled**.
3. `Foundations-Mock-Exam-6/parts/REVISION-2-CLARITY.md` — clear stems.
4. `Foundations-Mock-Exam-6/parts/ELI5.md` and `DEEP.md` + `deep-example.json` — the two teaching layers.
5. `CCAR-F-Exam-Guide.md` — source of truth for every key.
6. Skim Mocks #4, #5 and #6 (`Foundations-Mock-Exam-{4,5,6}/parts/*.json`) so you do **not** reuse their
   situations or their correct-answer surfaces. Same objectives are fine; same incident is not.

## What makes Mock #7 easier than #6 (the stem)
- **40–80 words.** System, problem, the deciding fact, the question. Nothing else.
- **The decider is stated plainly and close to the question** — usually the sentence right before it.
- **One step of reasoning.** The decider connects to the answer through a single fact from the exam guide
  ("must happen every time → code, not prompt"; "blocks the merge → no batch"; "shared on clone → project
  scope"). No multi-hop chains.
- **Mainstream objectives.** Prefer the guide's most central bullets: stop_reason loop, hooks vs prompts,
  coordinator/subagent context passing, tool descriptions, structured errors, tool_choice, .mcp.json scope,
  CLAUDE.md hierarchy, rules with paths, commands vs skills, plan mode, -p and --output-format json, explicit
  criteria, few-shot, tool_use + schema, nullable/enum other, retry-with-feedback limits, Batches API fit,
  independent review, case-facts / trimming, escalation triggers, error propagation, stratified sampling,
  provenance. Avoid edge features unless central.
- Average ≤ 15 words per sentence, no sentence > 28, ≤ 2 numbers, no planted misdirection.

## What stays as hard as #6 (the options)
- **No clear winner:** the runner-up is a practice the guide recommends, and it would be right if the decider
  were different. A candidate who half-knows the topic should be torn between the key and the runner-up.
- The other two distractors are real practices too (wrong layer / adjacent problem); in at least 8 of your 20
  items both are guide-recommended practices. No manager-smell options. At most 2 invented features in your
  20, and they must look real.
- Option rules from SPEC.md: length parity ±22%, 70–160 characters, actions only, no justification clauses,
  no tell words, parallel grammar, no echo either way.

## Volume, ids, domains
Scenario briefs: 40–70 words, new system state (not the Mock #4–#6 states). One `select: 2` item per scenario.

| Part | Scenarios | D1 | D2 | D3 | D4 | D5 | ids |
|---|---|---|---|---|---|---|---|
| a | s1 Customer Support · s2 Code Generation with Claude Code | 4 | 3 | 6 | 2 | 5 | m7-s1-01…10, m7-s2-01…10 |
| b | s3 Multi-Agent Research · s4 Developer Productivity | 9 | 6 | 3 | – | 2 | m7-s3-…, m7-s4-… |
| c | s5 Claude Code for CI · s6 Structured Data Extraction | 3 | 2 | 3 | 10 | 2 | m7-s5-…, m7-s6-… |

(Totals 16 · 11 · 12 · 12 · 9 — the published blueprint.)
Per scenario: s1 D1×4 D2×3 D5×3 · s2 D3×6 D4×2 D5×2 · s3 D1×6 D2×2 D5×2 · s4 D1×3 D2×4 D3×3 ·
s5 D2×2 D3×3 D4×5 · s6 D1×3 D4×5 D5×2.

## Every item carries
`id, sid, domain, obj, trap, fam, select, question, options[{t, why}], answer, runnerUp, decider,
explanation, eli5{question, answer, options[]}, deep{premise, diagram?, mapTitle, map, evidence, rule, guide}`.
`deep.evidence` quotes verbatim from the stem; `deep.guide.quote` verbatim from the exam guide; option
references in `deep` as `[[i]]`.

## Checks (run from `CCA-F/Foundations-Mock-Exam-7/`)
- `python3 validate.py --clarity --stem=40-80 --avg=15 parts/<x>.json` → must print OK.
- `python3 baselines.py parts/<x>.json` → pick-longest and pick-most-echo ≤ 30%, the other two ≤ 35%.
- Self-review each item twice:
  1. *Reader:* would someone who knows the topic understand the question on one read? If not, simplify the stem.
  2. *Examiner:* is it still a close call between the key and the runner-up for someone who half-knows the
     topic, and still provable from the stem for someone who knows the guide? If the answer is obvious,
     strengthen the runner-up option, not the stem.

Do not copy or paraphrase any examtopics or real-exam question. Everything must be original.
