# Beat sheet: "Where does this instruction live?" (about 8–10 minutes)

Not a script. Glance at the point, then say it in your own words while showing the page.
Record one beat per take, and pause 2 seconds before restarting a sentence; the fillers get cut in editing.

## 1. The hook (30 s)
- Show the page title.
- Say: every option in these questions holds the same words. The only difference is the file they sit in.
- Promise: two questions, who and when, pick the home every time.

## 2. Notes in an office (1 min)
- Scroll to the four boxes: your notebook, the noticeboard, the cupboard note, the binder on the shelf.
- Map each one: notebook = `~/.claude/`, noticeboard = root `CLAUDE.md`, cupboard = folder `CLAUDE.md` or a `paths:` rule, binder = skill or command.

## 3. The map (1 min)
- Point at the diagram, top box first: your laptop only, not in git. Then the big box: the repo, which reaches every teammate and CI.
- Colours: butter is always loaded, pink loads for matching files, white loads only when someone asks.
- One line to repeat: "Who decides the box. When decides the colour."

## 4. The one question (1 min)
- Show the butter box: "Who must get this instruction, and when?" Read the five bullets quickly.
- Show the two word lists. Say: underline "every engineer", "CI", "only me", "files named", "once a month".

## 5. Simulator (3 min). The heart of the video
- Screen conventions + Folder CLAUDE.md: the note sits on `mobile/`, the screen is in `packages/shared/ui/`. "Needed in 1, got it in 0." Chip: Misses files.
- Same instruction + `.claude/rules/ + paths:`: got it in 1, nothing extra loaded. "This is sample question 6."
- Same instruction + Root CLAUDE.md: got it, but loaded in 4 sessions where it wasn't needed, about 2,000 tokens.
- Review criteria + `~/.claude/CLAUDE.md`: point at the teammate and CI rows: "Missed". Got it in 2 of 5. Then Root CLAUDE.md: 5 of 5.
- Runbook + Root CLAUDE.md: works, but about 10,000 tokens spent where nobody asked. Then Project skill: got it in 1, zero waste.
- My /standup + `.claude/commands/`: "Clutter" in two teammate rows. Then `~/.claude/commands/`: right fit.
- Say once: the token numbers are illustrative; which file loads where follows the exam guide.

## 6. The three traps table (1 min)
- Read the trap names: wrong reach, wrong timing, folder where a pattern was needed. One simulator example each.

## 7. Practice question 1, live (2 min)
- Read the stem. Point at "Teammates' own sessions have started explaining everything too", then "in all of their own sessions".
- Rule out by trap name: the rules file is still committed, the skill waits to be invoked, the CI prompt fixes one symptom.
- Click the answer, open "Think it through", show the mind map.
- Leave questions 2 and 3: "pause the video and try them".

## 8. Close (20 s)
- Rule to remember: who decides repo or home folder; when decides always, file pattern, or on request.
- Point to the Trap gym page and the next trap.
