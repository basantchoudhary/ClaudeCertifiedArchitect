# Beat sheet: "Few-shot examples" (about 8–10 minutes)

Not a script. Glance at the point, then say it in your own words while showing the page.
Record one beat per take, and pause 2 seconds before restarting a sentence; the fillers get cut in editing.

## 1. The hook (30 s)
- Show the page title.
- Say: the instructions are clear, Claude can even repeat them back, and the output still changes from run to run. The tempting fix is more instructions.
- Promise: the exam wants you to show, not tell: 2 to 4 worked examples of the tricky cases.

## 2. Folding shirts (1 min)
- Scroll to the two boxes.
- Describe the fold on a page, and every helper folds differently; the hooded shirt comes out four ways.
- Fold two in front of them, including the hood, say why, and they all match, even on a style you never showed.
- Define few-shot: input, wanted output, a line on why. "Few" is 2 to 4, and "targeted" means the cases that go wrong.

## 3. The diagram (1 min)
- The prompt holds instructions and examples. Then Claude, then the tool call with a JSON schema, then a validator that can send it back.
- Read the three lines on the left: examples teach judgement and format; a schema fixes structure only; a validator catches drift afterwards.
- Bottom line: only the examples show Claude how to decide a tricky case.

## 4. The one question (1 min)
- Butter box: "Have the instructions already been tried, and the output is still inconsistent, especially on the borderline cases?"
- Point at the neighbours: a vague rule for what to flag is the explicit-criteria page; broken JSON is a schema; a missing value is a nullable field.
- Word lists: "different every run", "borderline cases", "varied layouts" against the trap words.

## 5. Simulator (3 min). The heart of the video
- Pull-request review + Instructions only: 1 of 6 consistent and right, 10 of 12 outputs in the full format, 0 of 3 borderline and new cases right in both runs, 1 invented value. Read row 3 (minor in one run, critical in the other) and row 6 (line 212 in a 180-line file). Verdict "Inconsistent".
- Longer, more detailed instructions: 3 of 6, 700 extra tokens. Row 4, the rethrow, is fixed because a rule names it; rows 3 and 5 still swing. Verdict "Only usually works": every case you can't foresee needs another rule.
- 3 targeted examples, with reasoning: 6 of 6, 12 of 12, 3 of 3, nothing invented, 1,800 extra tokens. Point at row 5: the @EnabledIf annotation no example shows, handled by the same reasoning. Verdict "Best fit (exam answer)". Show the prompt panel.
- 3 examples, easy cases only: 2 of 6, and rows 4 and 5 now wrong in both runs. Verdict "Misses the point": pick examples from the cases that go wrong.
- 20 examples: all right, but 12,000 extra tokens on every call. "Overbuilt".
- Switch to Certificate extraction. JSON schema: formats fixed, 12 of 12, but the sublimit still swings and the new carrier still gets an invented $1,000 deductible. "Different problem". Then the targeted examples: 6 of 6, deductible comes back null.
- Validate and retry: 13 calls, format fixed after the fact, the swings and the invented value untouched. "Delays the problem".
- Say once: the numbers are illustrative; the shape is what the exam guide says.

## 6. The four traps table (1 min)
- Match each row to a run: more instructions, too many examples, fix it afterwards, schema for judgement. Then the extra line: examples of easy cases only.

## 7. Practice question 1, live (2 min)
- Read the stem. Point at "the swings happen where two of the tests seem to apply at once": that's a borderline case, and the definitions are already clear.
- Rule out options by naming their trap: more conditions (more of the same), three runs and a vote (overbuilt), step-by-step reasoning (only usually works).
- Click B, open "Think it through".
- Leave questions 2 ("consider refactoring" fixes) and 3 (examples only from the big carriers) for the viewer: "pause and try them".

## 8. Close (20 s)
- Rule to remember: when instructions alone give inconsistent output, show 2 to 4 examples of the tricky cases.
- Point back to the Trap gym page for the next trap.
