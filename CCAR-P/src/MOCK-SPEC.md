# CCA-P mock exam: writing spec

A full-length mock for the Claude Certified Architect – Professional exam (guide v1.0): **63 questions,
120 minutes**, multiple-choice and multiple-response, weighted like the real blueprint. Built by
`src/build_mock.py` from `Mock-Exam-<n>/parts/d<k>.json` into `Mock-Exam-<n>/questions.js`, rendered by the
CCA-F mock engine (`CCA-F/Foundations-Mock-Exam-7/assets/exam.js`).

Read first: `CCAR-P/CCAR-P-Exam-Guide.md` (official lines and the 3 samples: the target style),
`CCAR-P/src/DOMAIN-SPEC.md` (writing rules: they all apply here too), and the domain data in
`CCAR-P/src/domains/d<k>.json` (what we teach per line, and the 76 practice questions you must **not**
repeat: write different situations, industries and deciding facts).

## Mock 1 item counts per domain

| Domain | Items | of which "choose two" |
|---|---|---|
| D1 Solution Design & Architecture (17%) | 11 | 2 |
| D2 Models, Prompting & Context (13%) | 8 | 2 |
| D3 Integration (19%) | 12 | 3 |
| D4 Evaluation, Testing & Optimization (16%) | 10 | 2 |
| D5 Governance, Safety & Risk (14%) | 9 | 2 |
| D6 Stakeholder Communication & Lifecycle (14%) | 9 | 2 |
| D7 Developer Productivity & Operations (7%) | 4 | 1 |

Spread items across the domain's guide lines (every line at least once; heavier lines may get two or three).

## Item JSON (`parts/d<k>.json` is a list of these)

```json
{
  "id": "p1-d3-01",
  "domain": "D3 · Integration",
  "obj": "3.1 Capability bloat",
  "trap": "Detective control instead of removal",
  "fam": 4,
  "select": 1,
  "question": "35–70 words: the full situation in plain words, then the question.",
  "options": [
    {"t": "option text", "why": "Works, but <trap>. One or two sentences.", "trap": "2–4 word label"},
    {"t": "option text", "why": "Best. Why it wins, naming the deciding fact."},
    {"t": "…", "why": "Works, but …", "trap": "…"},
    {"t": "…", "why": "Works, but …", "trap": "…"}
  ],
  "answer": [1],
  "runnerUp": 0,
  "decider": "The exact sentence (or clause) from the question that decides it, copied verbatim.",
  "explanation": "2–3 sentences at exam level: the principle and why the runner-up loses here.",
  "eli5": {
    "question": "The situation retold in very plain words, ending with 'The clue: …'.",
    "answer": "A short everyday analogy, then <b>Rule: …</b>",
    "options": ["one plain sentence per option, same order as options"]
  }
}
```

- `id`: `p1-d<k>-NN`, numbered from 01 within the domain.
- `fam` (trap family, used for the end-of-exam breakdown), pick the closest:
  1 Prompt where enforcement was required · 2 Disproportionate fix (overbuilt) · 3 Treating the symptom ·
  4 Right idea, wrong layer · 5 More context or reasoning instead of better structure · 6 Unreliable proxy ·
  7 Losing or fabricating information · 8 Wrong scope or wrong home · 9 Non-existent or misunderstood feature.
- `trap` is the label for the item's main trap (the runner-up's), 2–6 words.
- `"choose two"` items: `"select": 2`, **5 options**, two indices in `answer`, the stem says "Which two…?".
  `runnerUp` is the most tempting wrong option. Correct options carry `why` starting "Best." and no `trap`.
- `decider` must appear **verbatim** in `question` (the page highlights it after grading).

## Quality bar (same as the real exam, per the owner who sat CCA-F)

- **Clear stem, hard choice.** Easy to read; the difficulty is two good options. One plain deciding fact,
  at most two meaningful numbers, short sentences, one reasoning step.
- **Every option is a practice that works somewhere.** The runner-up would win if one fact changed.
- **No giveaways:** similar option lengths (the key is the longest in no more than about a third of your
  single-answer items), no justification clause only on the key, no "always/never" only on wrong options,
  the key doesn't echo the stem more than the others.
- **Professional level:** situations involve business constraints (budget, SLA, regulation, stakeholders,
  scale), not API trivia. Vary industries (banking, healthcare, retail, government, education, logistics,
  media, telecom, insurance, manufacturing).
- Facts accurate to Anthropic's documentation; general where unsure; no model version names; never copy
  from ExamTopics or any dump.
- HTML allowed: `<b>`, `<i>`, `<code>`; escape `&` as `&amp;`; no bare `<` or `>`.

Check with `python3 CCAR-P/src/build_mock.py 1 --check`.
