# Beat sheet: "Self-review" (about 8–10 minutes)

Not a script. Glance at the point, then say it in your own words while showing the page.
Record one beat per take, and pause 2 seconds before restarting a sentence; the fillers get cut in editing.

## 1. The hook (30 s)
- Show the title and the lede.
- Say: the same session wrote the code and says it looks right. The wrong answers make that reviewer try harder. The right answer changes who reviews.
- Read the "At a glance" box once.

## 2. Proofreading your own essay (1 min)
- You read what you meant, not what's on the page. Reading again, slower, finds the same nothing.
- A friend with only the page catches it. A long report: page by page, then once across.
- Define three words: session, extended thinking, independent instance (a fresh claude -p run with the diff but none of the history).

## 3. The diagram (1 min)
- Writer session holds its reasoning: "round each line". Arrow to "Reviews itself": it agrees with its own reasoning.
- The change goes to a fresh instance instead. For a big change, split it: per-file passes, then the cross-file pass.

## 4. The one question (1 min)
- "Is the same session that produced the work also being asked to judge it?"
- The bullets: independent instance; large change means multi-pass; per-file already running means add the cross-file pass; standards are a CLAUDE.md problem.
- Word lists: "approves nearly every patch", "extended thinking didn't help" versus "thin in the middle", "contradictory feedback".

## 5. Simulator (3 min). The heart of the video
- Explain the three kinds of seeded bug: plain slips, bugs from the writer's own decision, bugs between files.
- Large + the same session: 2 of 8, only the plain slips. Every file says "checked against its plan". Verdict Breaks.
- Large + extended thinking: 3 of 8. It traced the convert signature it remembered changing, and still trusted its rounding. Verdict "Same blind spot". "More thinking, same assumptions."
- Large + an independent instance: 4 of 8, and it found the two subtle bugs early (rounding, proration). Point at the dashed cards from file 7 on: skimmed. 0 of 3 cross-file bugs and 1 contradiction (read both quotes in "The reviewer reports"). Verdict "Attention diluted".
- Large + multi-pass: 8 of 8, 13 review runs, no contradictions. Verdict "Best fit (exam answer)".
- Small + multi-pass: 3 of 3 in 3 runs, verdict Overbuilt. Then small + an independent instance: 3 of 3 in 1 run, "Best fit (exam answer)". "Split when the change is too big for one pass, not before."
- Say once: which bugs each reviewer catches is illustrative; the shape is the guide's.

## 6. The four traps table (1 min)
- Match each to a click: re-read carefully (same session, 2 of 8); extended thinking (3 of 8); one big prompt (the 4 of 8 with a contradiction); stricter criteria (different problem: the blind spot stays).

## 7. Practice question 1, live (2 min)
- Read the stem: the same session says the billing code looks right; a fresh session with a plain prompt finds two bugs. Same model, same settings.
- Rule out A (criteria: different problem), C (extended thinking: same blind spot), D (/compact: same blind spot).
- Click B, open "Think it through".
- Leave question 2 (70 files, thin in the middle) and question 3 (one call writes tests and then reviews them) for the viewer.

## 8. Close (20 s)
- Rule to remember: the writer doesn't grade its own work. Fresh reviewer, per file first, then across files.
- Point back to the Trap gym page for the next trap.
