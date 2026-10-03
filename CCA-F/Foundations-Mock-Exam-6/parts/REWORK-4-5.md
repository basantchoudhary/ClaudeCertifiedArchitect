# Reworking Mocks #4 and #5 to the Mock #6 standard

The candidate failed the real CCA-F exam after scoring high on Mocks #4 and #5. Audit of those papers:

| Paper | pick-longest | pick-most-echo | option-length violations |
|---|---|---|---|
| Mock #4 | **96%** | 60% | 121 |
| Mock #5 | **87%** | 28% | 62 |
| Mock #6 (target standard) | 15% | 7% | 0 |

The candidate wants Mocks #4 and #5 rebuilt so that no answer is an obvious winner, and with the same teaching
layers as Mock #6 (plain-language "explain like I'm 5" + "Think it through").

## Read first (all in `CCA-F/Foundations-Mock-Exam-6/parts/`)
1. `SPEC.md` — the item rules (runner-up, decider, option rules 1–7, stems, JSON format, trap families).
2. `REVISION-1.md` — the lessons from testing Mock #6: quiet deciders, no echo (either direction), no
   manager-smell distractors, misdirection, two-answer items not mapping 1:1 onto two listed problems.
3. `ELI5.md` — the `eli5` object.
4. `DEEP.md` + `deep-example.json` — the `deep` object ("Think it through"). Match the example's depth.
5. `../../CCAR-F-Exam-Guide.md` — the source of truth for keys.
Also skim one finished Mock #6 item end to end in `Foundations-Mock-Exam-6/parts/a.json` (e.g. `m6-s1-05`).

## What to keep, what to change
- **Keep:** `id`, `sid`, `domain` (already normalised), `obj`, `select`, and the *concept the item tests* —
  the correct answer must still be the same idea (you may reword it). Keep the scenario's systems.
- **Rewrite freely:** the stem (55–130 words, quiet decider in the middle, vivid detail pointing at the
  runner-up in about half the items), all four option texts, every `why`, `explanation`, `trap`/`fam`
  (the runner-up's family). Scenario briefs: shorten to 40–80 words, item-specific state moves into stems.
- **Add:** `runnerUp`, `decider`, `eli5`, `deep`.
- The original paper is in `parts/original-questions.js` for reference; your part file `parts/<x>.json`
  starts as a straight copy of the originals. Overwrite it in place.

## Work in two passes
1. **Rewrite pass.** Make every item real-exam style. Then do the two self-reviews from SPEC.md
   (test-wise guesser; expert). Run the validator — fix everything except the missing `eli5`/`deep` errors.
   Also run `python3 Foundations-Mock-Exam-N/baselines.py Foundations-Mock-Exam-N/parts/<x>.json`: on your
   ~18 single-answer items, pick-longest and pick-most-echo should each be ≤ 30%, and pick-shortest and
   pick-least-echo ≤ 35%.
2. **Teaching pass.** Add `eli5` and `deep` to every item, written against the *rewritten* stem (evidence
   quotes must be verbatim from the new stem). Option references in `deep` use `[[i]]` placeholders.

Use a builder script with a unique name in the scratchpad (e.g. `rework_m4_a.py`) that loads the part file and
writes it back with `ensure_ascii=False, indent=1`. Don't touch other part files.

Commands (from `CCA-F/`):
`python3 Foundations-Mock-Exam-N/validate.py Foundations-Mock-Exam-N/parts/<x>.json` — must print OK.
`python3 Foundations-Mock-Exam-N/baselines.py Foundations-Mock-Exam-N/parts/<x>.json`

Final reply (short): validator summary line, baselines line, and the 2–3 items you are least sure have exactly
one defensible answer, with why.
