# Revision 2 — clear questions, hard choices

The candidate has now sat the real exam and Mock #6. Their verdict: **the real questions were easy to
understand; only the choice between answers was hard. Mock #6 is hard to *read*.** That means Revision 1
over-applied two rules — burying the decider and planting misdirection. The real exam's difficulty lives in
the options, not in the stem.

Measured reading load (Mock #6 now): median 81 words, ~17 words per sentence, **4.8 digits per stem**, deciders
deliberately buried, a vivid detail pointing at the runner-up in about half the items.

## New stem rules (override REVISION-1 B and D)
1. **One problem per stem.** State the system, what goes wrong, and what is required. 45–90 words.
2. **The decider is stated plainly**, in its own sentence if needed. No burying, no misdirection, no
   planted vivid detail that points at the runner-up. Difficulty must come from *knowing what the fact
   implies*, e.g. "The review must finish before the PR can merge" — plain to read, but you must know the
   Batches API has no latency guarantee to use it.
3. **Only numbers that matter.** At most 2 numbers per stem (a $ limit, a ratio, a time), and each must be used
   by the reasoning. Drop incidental counts, team sizes, dates, IDs and percentages that decorate.
4. **Short sentences.** Average ≤ 16 words per sentence; none over 28.
5. **Plain question line.** Ask exactly what is wanted ("Which change best prevents this?", "Where should the
   command be defined?"). Keep the qualifier (first step / best / guarantees) — it is fair and the real exam
   uses it — and keep it in **bold**.
6. Still true: the decider must not name the runner-up's mechanism (so the stem doesn't hand over the answer),
   and the correct option must not echo the stem more than the others.

## Options — keep them hard, make them readable
- Keep every option rule from SPEC.md (length parity ±22%, no justification clauses, no tell words,
  runner-up is a guide-recommended practice, other distractors real practices at the wrong layer).
- Make options **plain** too: 70–160 characters, one action each, no stacked qualifiers.
- Keep the same `answer` index, `runnerUp` index and tested concept. You may reword option text.

## Keep the teaching layers in sync
- `decider`: rewrite to match the new stem.
- `eli5.question`: no longer talk about "the vivid part" or "the bait" unless the stem still has one (it
  shouldn't). Point at the clue sentence.
- `deep.evidence`: quotes must be verbatim from the **new** stem (the checker verifies). Drop entries about
  removed misdirection. `deep.premise` stays about the concept's common misconception.
- Keep `faq` where present (m6-s1-08) and check it still matches.

## Checks
`validate.py` now enforces: stem 45–90 words, avg sentence ≤ 16 words, no sentence > 28 words, ≤ 2 numbers per stem.
Then run `baselines.py` on your part — pick-longest / pick-most-echo must stay ≤ 30%, the others ≤ 35%.
Final self-check per item: *could a candidate who knows the topic understand the question on one read?*
If not, simplify the stem. *Is the right answer still not obvious without knowing the topic?* If it is,
strengthen the runner-up option, not the stem.
