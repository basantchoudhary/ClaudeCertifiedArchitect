# "Think it through" layer — writing guide

The candidate asked for *exactly* the explanation they got for m6-s1-05, for every question. That
explanation worked because it did four things in order. Every item gets a `deep` object that does the same:

```json
"deep": {
  "premise":  "The wrong assumption that makes this question confusing, corrected. 2–4 sentences.",
  "diagram":  "OPTIONAL plain-text box diagram (≤ 6 lines, ≤ 58 chars wide). Omit the key if a diagram adds nothing.",
  "mapTitle": "One-line title for the mind map, phrased as the question you ask yourself.",
  "map": { "head": ["What you observe", "Where the fault is", "Fix"],
           "rows": [["…","…","…"], …] },
  "evidence": [ { "quote": "exact sentence from the stem", "means": "what it proves and which option it rules out" }, … ],
  "rule": "One or two sentences to remember.",
  "guide": { "obj": "2.1 Design effective tool interfaces", "quote": "exact text from CCAR-F-Exam-Guide.md" }
}
```

The gold example is `parts/deep-example.json` (also on m6-s1-05 in `parts/a.json`). Match its depth and tone.

## The four parts

1. **premise:** name the misconception a smart candidate brings to *this* question and correct it. Usually
   "you'd think X decides this, but actually Y also matters" or "you'd think the vivid symptom is the problem,
   but it is a symptom of Z". It must be specific to the item, not a generic lecture.
2. **map:** a decision table for the *concept family* this question belongs to. 4–6 rows. Each row is a
   situation, its cause, and the right mechanism. The table must contain the row that matches this question
   **and** the row that would make the runner-up correct, so the reader sees the boundary between them. Other
   rows cover neighbouring cases from the exam guide. Headers can be adapted (e.g. "Situation / Right mechanism /
   Why") but keep three columns.
3. **evidence:** walk the stem like evidence in a case, 3–6 entries, in stem order. `quote` is copied
   **verbatim** from the stem (the checker verifies this; drop HTML tags, you may trim the start or end of a
   sentence but not change words). `means` says what that sentence proves and which option(s) it rules in or
   out. The last entry usually handles the qualifier ("first step", "best fits", "guarantees").
4. **rule + guide:** one memorable rule, and the exam-guide line it comes from. `guide.quote` must be copied
   verbatim from `../../CCAR-F-Exam-Guide.md` (the checker verifies this too). Never invent a guide quote.

## Referring to options
The page **shuffles** option order. Never write "A", "B", "option C". Write `[[0]]`, `[[1]]`, `[[2]]`, `[[3]]`
(the index in `options[]`); the page replaces each with the letter the reader actually sees. Typically wrap it:
`<b>[[2]]</b>`. For a `select: 2` item, name both answers.

## Style
Plain, warm, direct. Short sentences. Bold the key idea in each part. Define jargon on first use. HTML allowed:
`<b> <i> <code>`. Don't change any other field. Load the JSON, add `deep`, save with
`ensure_ascii=False, indent=1`; do **not** re-run old builder scripts (files contain hand edits).

Validate: `python3 Foundations-Mock-Exam-6/validate.py Foundations-Mock-Exam-6/parts/<file>.json` from `CCA-F/`.
