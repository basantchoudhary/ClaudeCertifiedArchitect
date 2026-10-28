# Beat sheet: "Large codebase exploration" (about 8–10 minutes)

Not a script. Glance at the point, then say it in your own words while showing the page.
Record one beat per take, and pause 2 seconds before restarting a sentence; the fillers get cut in editing.

## 1. The hook (30 s)
- Show the title and the At a glance box.
- Say: a long session in a big codebase starts to blur what it found in the morning. The tempting answers keep everything in the session. The exam wants the findings written down somewhere the context can't blur.

## 2. The detective's board (1 min)
- Two boxes: trusting memory turns "9:40" into "some time in the evening". The board keeps it exact.
- Name the two signs from the guide: inconsistent answers, and "typical patterns" instead of the file found earlier.
- The four habits, one line each: scratchpad file is the board, subagent is the junior, /compact clears the desk, manifest is the case file that survives a crash.

## 3. The diagram (1 min)
- Middle: the main context, with morning findings at the top, search output in the middle, recent turns at the bottom.
- Left: the subagent takes the search and sends back a summary. Right: the file on disk, written and read back. Below: /compact.
- Point at "survives /compact and crashes".

## 4. The one question (1 min)
- Butter box: "Is the session starting to forget or blur what it found earlier, and where should those findings live instead?"
- Read the two word lists: "typical patterns", "session crashed" against "thousands of lines", "context nearly full".

## 5. Simulator (3 min). The heart of the video
- Long day + just keep going. Watch the meter turn amber past 70% and auto-compact at turn 39 (196k down to 36k). Read the three answers: turn 20 names session_guard.ts line 41; turns 40 and 60 say "Typically an Express app authenticates in a middleware". 1 of 6 findings exact. Verdict "Breaks".
- + Ask Claude to keep findings in mind: 3 of 6 exact, same drift at turn 40. "Only usually works": an instruction isn't storage.
- + Subagents: no compaction, peak 150k. Turns 20 and 40 are specific, turn 60 drifts. 2 of 6 exact. "Helps, not enough".
- + /compact: two /compact chips (turn 27 and 51), 4 of 6 exact. "Helps, not enough": nothing written down.
- + Scratchpad + subagents + /compact: one /compact at turn 55, peak 141k, all three answers specific, 6 of 6. "Best fit (exam answer)".
- Switch to the crash. /compact: crash at turn 45, turn 60 answer "I haven't seen the authentication code in this session." 1 of 6, about 44 turns to redo. "Loses findings".
- Scratchpad: 6 of 6, but 8 turns re-checking finished modules. "Also works". Manifest: 6 of 6, nothing redone. "Best fit (exam answer)".
- Say once: token sizes and blur rates are illustrative; each finding gets the same dice under every strategy.

## 6. The four traps table (1 min)
- Fills context, loses findings, delays the problem, only usually works. Match "only usually works" to the reminder run, and "loses findings" to the crash runs.

## 7. Practice question 1, live (2 min)
- Read the stem. Point at "typical middleware patterns", "continue over several more sessions" and "two other engineers".
- Rule out: /compact stays in one session; re-reading is more of the same; --resume carries the fog over.
- Click D, open "Think it through", show the mind map.
- Leave question 2 (codemod crash, progress file) and question 3 (/compact while answers are still accurate) for the viewer.

## 8. Close (20 s)
- Rule to remember: write findings down, delegate the noisy searching, and compact the rest.
- Point back to the Trap gym page for the next trap.
