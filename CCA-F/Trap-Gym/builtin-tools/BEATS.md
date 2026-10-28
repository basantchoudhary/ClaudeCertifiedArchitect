# Beat sheet: "Which built-in tool?" (about 8–10 minutes)

Not a script. Glance at the point, then say it in your own words while showing the page.
Record one beat per take, and pause 2 seconds before restarting a sentence; the fillers get cut in editing.

## 1. The hook (30 s)
- Show the title and the lede.
- Say: almost any tool can be bent to do the job. Read everything, run a shell command, retry the edit. The exam wants the tool built for the job.

## 2. The cookbook (1 min)
- Index of dish names: Glob. Scanning pages for "saffron": Grep.
- Cross out one typo: Edit. The phrase appears five times: copy the page out fresh, Read then Write.
- Read the six-tool paragraph. Define ** in a glob pattern: any folder, any depth.

## 3. The diagram (1 min)
- Find, Look, Change, left to right. Grep leads into Read, Read into Edit.
- Point at the arrow down from Edit: "not unique" leads to Read + Write.
- Bash sits apart: tests, builds, git. Not the pick for finding or editing.
- Bottom line: to understand code, Grep the entry point, then Read along the imports.

## 4. The one question (1 min)
- Butter box: a file by name, or text inside files? And is the change small enough for one unique match?
- Words to listen for: "every place that calls", "file names don't say" (Grep); "all files named", "*.test.tsx" (Glob); "Edit failed", "appears more than once" (Read + Write).

## 5. Simulator (3–4 min). The heart of the video
- Find where calculateTax is called + Glob: 4 files named after tax, all the real callers missed. "Wrong tool". Then + Grep: 7 matches in 5 files, about 700 tokens. "Best fit (exam answer)".
- Same job + Read: about 1,400,000 tokens, the meter goes pink. "Overbuilt": 1,200 files to find 5.
- Change a line that appears 3 times + Edit: show the error, "Found 3 matches". Then the fallback steps appear: Read shows lines 12, 74 and 136; Write changes only line 74. Verdict "Fails: not unique", with the exam's next move shown.
- Same job + Bash: sed changes dev, staging and prod. "Breaks".
- Same job + Read + Write: "Best fit (exam answer)", about 4,600 tokens.
- Change one line in config + Read + Write: it works but rewrites 240 lines. "Overbuilt". Then + Edit: one line, "Best fit".
- Understand how a request flows + Read everything up front: about 1,400,000 tokens, "Overbuilt". Then + Grep entry points, then Read along imports: one Grep and three Reads, about 9,000 tokens, "Best fit (exam answer)".
- Say once: the repo and token counts are illustrative; the shape is what the exam guide says.

## 6. The four traps table (1 min)
- Glob then Read everything: overbuilt. Bash grep, find or sed: wrong tool. Retrying Edit with more context: only usually works. Read the whole codebase: overbuilt.
- Tie each to a run you just did.

## 7. Practice question 1, live (2 min)
- Read the stem. Point at "The file names don't say which files use the helper".
- Rule out: Glob and Read every file (overbuilt), tests via Bash (only tested code), Explore subagent (overbuilt for one search).
- Click B, open "Think it through", show the mind map.
- Leave question 2 (Glob for generated files) and question 3 (Edit fails on four matches) for the viewer.

## 8. Close (20 s)
- Rule to remember: Grep inside files, Glob by name, Edit needs a unique match, Read + Write when it isn't.
- Point back to the Trap gym page for the next trap.
