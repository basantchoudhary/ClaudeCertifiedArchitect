# Revision 1 — the paper is still too easy

Two blind tests were run on the assembled 60 items:
- **Expert solver** (exam guide only, no key): 60/60, confidence 5/5 on 50 items, no ambiguous items. It named
  the intended runner-up as second-best in 45/60 — so the runner-up design works. But items are too readable.
- **Test-wise guesser** told to ignore subject knowledge and use only surface cues: 60/60. Its cues, in order:
  1. **The stem kills the runner-up out loud.** "Prompts already tried", "description was already rewritten",
     "security refuses to pause it", "nothing has been auto-posted yet", "conversations are short". When the
     decider names the thing that failed, no domain knowledge is needed to eliminate it.
  2. **The correct option echoes the stem's wording** ("that order ID", "five types legal wrote down",
     "later effective date supersedes", "between files", "learn which sections exist").
  3. **Manager-smell distractors**: undo a refund after issuing, report a failure as success, load everything,
     raise limits/retry more, an average as headline, self-rated 0.8/0.9 confidence.
  4. **Two-answer items** where the two answers map one-to-one onto two problems listed in the stem.

Target after revision: a strong candidate who knows the exam guide lands around **65–80%** and feels about
60% sure on most items, while every key is still provable from the stem (no AMBIGUOUS).

## Rules for the revision (apply to every item; rewrite whatever is needed)
A. **No echo.** The correct option must use different vocabulary from the stem (paraphrase the mechanism).
   Where an option echoes the stem's symptom words, it should be the runner-up or a distractor.
   `validate.py` now has a stem-echo check: per file, the correct option may be the strongest echo in ≤30%
   of items. Aim for ≤20%.
B. **Quiet deciders.** At most 3 of your 20 items may use "X was already tried / didn't help" as the decider.
   Otherwise the decider is a *property of the situation* that needs domain knowledge to connect to an option:
   a latency/blocking need, who needs it and how they get it (clone vs personal), whether the info exists in
   the source, deterministic vs intermittent failure, frequency/ratio, whether files changed since the
   session, whether the reader has the transcript, etc. The stem must not contain the distinctive noun of the
   runner-up option (if the runner-up is "few-shot examples", the stem doesn't say "examples").
C. **No manager-smell distractors.** Every option must be something a competent engineer would defend in a
   design review. In at least 8 of your 20 items, BOTH non-runner-up distractors must be practices the exam
   guide itself recommends — applied to an adjacent problem, the wrong layer, or the wrong moment — so three
   of the four options read as "textbook" answers.
D. **Misdirection.** In about half your items, the stem's most vivid symptom (numbers, a quote, the
   incident) points toward the runner-up; the decider is a quieter detail in the middle of the stem.
E. **Two-answer items.** The stem should not list exactly two problems that map onto the two answers. Use one
   goal with three good options plus one more, where only two together satisfy a stated constraint.
F. Keep everything else in SPEC.md (length parity, no justification clauses, no tell words, runner-up why
   starts "Runner-up.", decider + explanation updated to match the new stem). Keep the same ids, domains,
   objectives and select counts; you may change the scenario brief.

## Before finishing
Run the validator until OK. Then, for each item, write down (privately) the one stem sentence that decides it
and ask: "could someone who has never heard of Claude Code connect this sentence to the right option?" If yes,
make it quieter. Then ask: "is there still exactly one best answer under the exam guide?" If no, sharpen.
