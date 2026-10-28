# Beat sheet: "Extraction honesty" (about 8–10 minutes)

Not a script. Glance at the point, then say it in your own words while showing the page.
Record one beat per take, and pause 2 seconds before restarting a sentence; the fillers get cut in editing.

## 1. The hook (30 s)
- Show the title and the lede.
- Say: the most expensive extraction bug is a value that looks real but was never on the page.
- Promise: one question, "is it on the page?", sorts every option in this family.

## 2. The temp and the form screen (1 min)
- The screen won't save until every box is filled, so the temp types 0 for the missing fax number.
- The fix: a "not given" box, and "Other: ____" in the drop-downs.
- Supervisor feedback: "you swapped the dates" vs "wrong, redo it". A torn-off date never comes back with "try again".

## 3. Where each choice acts (1 min)
- Diagram left to right: prompt and examples on Claude, the schema on the tool call, the validator in code.
- The two exits: retry with the specific error (on the page), a person (not on the page).
- Read the bottom line: a schema removes syntax errors; it can't stop a wrong or invented value.

## 4. The one question (1 min)
- "Is the value actually on the page?" Walk the four bullets.
- Show the two word lists.

## 5. Simulator (3 min). The heart of the video
- The page opens on No deductible printed, Required: the record posts $2,500 marked "invented". Read the strip: 1 posted correctly, 3 posted with invented or wrong values, 1 sent to a person, 7 model calls.
- Switch to Sentinel: deductible 0, "Fake zero posted". Then Optional / nullable: null, "Honest record".
- New line: cyber, Fixed list of five: posts as general liability, "Wrong value posted". Switch to List + "other" + detail.
- Policy number cut off, with Nullable and Retry with the specific error: the retry produces NG-448126, "Invented value posted". Say: the retry was the good kind, and it still made things worse, because the number isn't there.
- Switch to "Specific error; nulls go to a person": "Honest: sent to a person", no retries.
- Carrier's own schedule with "try again": the swap repeats and it ends with a person. With the specific error: "Fixed on retry". With worked examples: "Right first time".
- Flip "Ask for JSON in the reply" on the schedule: one wasted call for broken JSON.
- End on the exam's design (last choice in every row): 4 posted correctly, 0 invented, 1 to a person, 5 calls, chip "This is the exam's design".
- Say once: behaviours are illustrative; every run is the same so you can replay it.

## 6. The three traps table (1 min)
- Forcing a value, retrying the impossible, fixing the wrong layer. One example each from the runs.

## 7. Practice question 3, live (2 min)
- Read the stem. Point at "the pipeline retries with the specific error" (already the good retry) and "cut off at the page edge" (not on the page).
- Rule out: more retries press for the impossible, a format check passes a neat fake, examples solve a different problem.
- Click the answer, open "Think it through", show the mind map.
- Leave questions 1 and 2 for the viewer.

## 8. Close (20 s)
- Rule: give the model an honest way to say "not here"; retry with the specific error only when the value is on the page.
- Back to the Trap gym page for the next trap.
