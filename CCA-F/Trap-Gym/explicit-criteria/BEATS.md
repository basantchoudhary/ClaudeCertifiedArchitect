# Beat sheet: "Explicit criteria" (about 8–10 minutes)

Not a script. Glance at the point, then say it in your own words while showing the page.
Record one beat per take, and pause 2 seconds before restarting a sentence; the fillers get cut in editing.

## 1. The hook (30 s)
- Show the page title.
- Say: a review bot flags too much, developers stop reading it. Every wrong answer asks Claude to be more careful.
- Promise: one question separates the right answer from three careful-sounding ones: does the fix say what counts, or only how cautious to feel?

## 2. The guard at the door (1 min)
- Scroll to the two boxes.
- "Be careful who you let in": the courier and the cleaner get stopped, the confident stranger walks in.
- "Blue badge in, no badge stopped": now every case has an answer.
- Define the two words on the page: a false positive is a finding that isn't a real problem; precision is the share of posted findings that are real.
- Land the second point: developers don't read one category at a time. Noise in one costs trust in all.

## 3. The diagram (1 min)
- The review prompt holds one rule per category. Security and performance are already explicit; the doc-comment rule is the one we'll change.
- Example findings sit in the prompt too. The second pass sits after Claude.
- Bottom: the developer has one trust for the whole review.

## 4. The one question (1 min)
- Butter box: "Does the fix tell Claude exactly what counts, or only how cautious to feel?"
- Read the four bullets. Point at the last one: if the rule is clear but the format varies, that's the few-shot page.
- Then the word lists: "too many false positives", "developers ignore" against "be conservative", "only high-confidence".

## 5. Simulator (3 min). The heart of the video
- "Check that comments are accurate": 29 findings posted, 13 real, 16 false positives. Precision 45%. Trust meter at 12. Developers act on about 0 of 4 security findings. Verdict "Breaks trust".
- Click a pink square: a typo flagged as an inaccurate comment. Click the second square (dashed outline): the cents-vs-dollars bug posted as minor.
- "+ Be conservative": 13 false positives, precision 50%, trust 27. Verdict "Barely helps". "It still doesn't say what counts."
- "+ Only report high-confidence findings": 12 false positives, precision 50%, trust 32, and 1 real problem missed. Click the yellow square: the thread-safety contradiction. "Claude is very confident a typo is a typo." Verdict "Only usually works".
- "Explicit criteria": 15 posted, 2 false positives, precision 87%, trust 82. Verdict "Also works": point at the 2 dashed squares, wrong severity.
- "Explicit criteria + severity by example": same 87%, no wrong severities, trust 90, all 4 security findings acted on. Verdict "Best fit (exam answer)". Show the prompt panel: critical, major, minor, each with a code example.
- Quick tour of the workarounds: three example findings, 10 false positives, "Different problem". Second pass, 30 model calls and still 11 false positives, "Overbuilt". Drop the category, trust 95 but 6 real problems missed, "Delays the problem".
- Say once: the numbers are illustrative; the shape is what the exam guide says.

## 6. The four traps table (1 min)
- Match each row to a run you just did: confidence wording, drop the category, second pass, examples for a vague rule.

## 7. Practice question 1, live (2 min)
- Read the stem. Point at "keep code documentation trustworthy" and "skim past the whole review, including its accurate security findings".
- Rule out options by naming their trap: examples too early, a second scorer overbuilt, folding the comments away hides the problem.
- Click C, open "Think it through".
- Leave questions 2 (confidence wording already tried) and 3 ("be conservative" plus linter noise) for the viewer: "pause and try them".

## 8. Close (20 s)
- Rule to remember: tell Claude exactly what to flag; telling it to be careful doesn't cut false positives.
- Point back to the Trap gym page; the next trap, few-shot examples, is the one this page kept pointing at.
