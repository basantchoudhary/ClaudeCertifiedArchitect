# Plain style: easy question, one clear winner

## Why this exists
The candidate sat the real CCA-F exam and reported (27 Oct 2026):
- The questions are **not cryptic**. You understand them on one read.
- There **is a clear winner** if you know the rule. The hard part is that the wrong options are real, sensible
  practices, so someone who half-knows the topic picks one of them.

Mock 7 got the options right but wrote stems around a planted clue ("This is a retention nudge, not a policy.
Missing it in some chats is acceptable. The change should be light to maintain."). That reads like a riddle.
The official sample questions in `CCAR-F-Exam-Guide.md` section 9 are the style anchor: a short problem, then
"Best fix?", "Where?" or "Most effective first step?".

## Stem rules
- **Tell the whole situation in plain words; don't compress it.** Calibration (28 Oct): the candidate found the
  short 33–40 word rewrites *more* cryptic. The model item is m7p-s2-02: what applies, where things are, what is
  set up today and what goes wrong with it, then the question. Typical length 35–70 words.
- Plain everyday words and short sentences (average ≤ 16 words), at most 2 numbers.
- Shape: **what happens today**, **what goes wrong** (or what is wanted), any **fact the fix depends on**, then the question.
- The deciding fact is a **natural part of the problem**: a consequence ("refunds go to the wrong account"), a
  requirement ("must not reach a customer"), or a fact about the system ("the description is one line").
- **No planted sentences** whose only job is to rule out an option ("The tool results are short.") and no
  what-if phrasing. If an option needs ruling out, its own flaw should rule it out.
- The scenario brief carries the setting, so the stem doesn't repeat it.

## Option rules
- Four options, each a **real practice** a sensible engineer might suggest. No silly options.
- **No clean winner** (calibration, 28 Oct): on the real exam the options are all correct practices that
  would work to some degree. Never include an option that plainly fails (forcing the wrong tool, a hook that
  only logs). The key is the option that fits *this* situation best: it fixes the cause, at the right size,
  as the exam guide recommends.
- Each other option loses for a reason you can **name in a few words**. That name goes in the option's
  `trap` field, and its `why` starts "Works, but" ("Works, but overbuilt. …"). The key's `why` starts "Best.".
  Typical names:
  - **overbuilt**: more machinery than the problem needs (classifier, new agent, new tool, hook for a nicety)
  - **only usually works**: prompt or examples where a rule must hold every time
  - **wrong action**: does something other than what was asked
  - **delays or hides the problem**: raises a limit, retries blindly, logs instead of preventing
  - **different problem**: a good fix for a neighbouring symptom
  - **wrong home**: right content, wrong scope or file
- `runnerUp` = the most tempting wrong option. It no longer has to "win if one fact changed".
- Same length rules as before: within ±22% of the mean, no justification clauses, no tell words.
- Mostly single answer; at most one "pick TWO" item per scenario.

## Teaching layers (unchanged)
`eli5` and `deep` ("Think it through") as in `../../../Foundations-Mock-Exam-6/parts/DEEP.md`. In plain style,
`deep.evidence` may quote the scenario brief as well as the stem, and needs 2–6 entries.

## Check
From `CCA-F/Foundations-Mock-Exam-7/`:
`python3 validate.py --plain --sample --stem=35-70 --avg=16 parts/plain/sample.json`
(`--sample` skips the 10-items-per-scenario count while we calibrate.)
