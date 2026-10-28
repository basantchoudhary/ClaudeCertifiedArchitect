# Beat sheet: "Subagent context" (about 8–10 minutes)

Not a script. Glance at the point, then say it in your own words while showing the page.
Record one beat per take, and pause 2 seconds before restarting a sentence; the fillers get cut in editing.

## 1. The hook (30 s)
- Show the title and the lede.
- Say: a subagent ignores the user, redoes research, or loses the sources. The options offer shared memory, a stricter system prompt, a shorter summary.
- Promise: one question settles it. Was the fact in its Task prompt?

## 2. The contractor (1 min)
- Scroll to "Start here". The contractor missed the meetings, so they paint the room grey.
- "Use the paint we agreed" doesn't help: they weren't there.
- Green box: a good brief has the decision and where it came from. Butter box: three independent rooms, three briefs on the same morning.
- Define the words once: coordinator, subagent, Task tool, Task prompt, isolated context, allowedTools.

## 3. The diagram (1 min)
- Left: the coordinator's history: the chair's rule, the research findings.
- Point at the dashed line with the cross: "history, not inherited".
- The Task prompt in the middle is the only channel. Three writers on the right, each "starts empty".
- Bottom-left: allowedTools must include "Task". Bottom-right: several Task calls in one response.

## 4. The one question (1 min)
- Butter box: was the fact actually in its Task prompt? Read the four bullets.
- Word lists: "ignores what the user said", "the issue we've been discussing" versus "independent searches", "takes too long".

## 5. Simulator (3 min). The heart of the video
- Set the story: a committee, a made-up drug, a chair's rule (no trials under 200 patients), three trials with sources.
- Nothing: "use what we found above" + parallel. The subagent answers "I don't have any earlier findings in my context." 20 s, chip "Not done". Verdict Breaks. "There is no 'above'."
- Just the task. It searches again: 1 min 56 s, butter bars. It reports 1.6 to 3.0 days and leans on CEDAR, the trial the chair excluded. Verdict Breaks.
- Task + findings as prose: 56 s. Right figures, rule kept, but citations read "a journal trial", "a registry trial". Verdict Only partly works. "The facts survived; the sources didn't."
- Task + structured findings and sources: scroll the prompt slowly, point at claim / trial / source / url on separate lines. Output cites "ARC-1 final report, p. 14". 54 s. Verdict Best fit (exam answer).
- Now switch to one Task call per turn: 2 min 6 s, against 54 s in parallel. Verdict "Right content, too slow". Point at the staircase in the timeline.
- Last, allowedTools: ["Read"]. "The call is refused. No subagent starts." Verdict Breaks, whatever the prompt says.
- Say once: the drug, trials and times are made up; the shape is what the exam guide says.

## 6. The traps table (1 min)
- Read the five labels and match three to runs you just did: "doesn't exist" is the "use what we found above" run; "loses information" is the prose run; "waiting in a queue" is the sequential run.
- "Wrong home": the system prompt is for rules that never change, not this chair's rule.

## 7. Practice question 1, live (2 min)
- Read the stem. Point at "Its Task prompt names only the drug and the outcome".
- Rule out by trap: system prompt by committee (wrong home), a check after analysis (too late), a file to read (overbuilt).
- Click D, open "Think it through", show the mind map.
- Leave question 2 (the Explore subagent late in a long session) and question 3 (parallel Task calls) for the viewer: "pause and try them".

## 8. Close (20 s)
- Rule to remember: if it isn't in the Task prompt, the subagent doesn't know it.
- Point back to the Trap gym page for the next trap.
