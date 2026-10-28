# Beat sheet: "Hook to clean up data" (about 8–10 minutes)

Not a script. Glance at the point, then say it in your own words while showing the page.
Record one beat per take, and pause 2 seconds before restarting a sentence; the fillers get cut in editing.

## 1. The hook (30 s)
- Show the title and the lede.
- Say: three tools, three date formats, a status that's just a number. Every option "helps Claude read them".
- Promise: the exam answer is to stop Claude having to read them at all.

## 2. The post room (1 min)
- Scroll to "Start here". Three suppliers, three date habits, an accountant who guesses.
- Butter box: a note on the desk works mostly. Green box: the post room stamps every invoice in one format.
- Define: tool result, hook, PostToolUse (after the tool, before Claude), PreToolUse (before the tool runs). Read the example: 1775037600 becomes 2026-04-01T10:00:00Z, status 3 becomes "paid_out".

## 3. The diagram (1 min)
- Left: the three tools and their raw shapes.
- Top path: Claude's call goes out through the PreToolUse hook. "It sees the call only."
- Bottom path: results come back through the PostToolUse hook. "This is the post room."
- The system prompt sits above Claude: it can only ask. The pink box: a subagent could sit in the hook's spot, but it's a model call.

## 4. The one question (1 min)
- Butter box: is the problem in what the tool returns, and could plain code fix it the same way every time?
- Word lists: "Unix timestamps", "the team cannot change their responses" versus "must block an action", "calls the wrong tool".

## 5. Simulator (3 min). The heart of the video
- Asha + Do nothing. Raw results in step 1, the same in step 2. Claude says the weekly box comes "21 March" and the refund is "still being processed". Truth: the pantry box first, refund paid out. Both chips wrong. Meter: 612 in 1,000. Verdict Breaks.
- Asha + System-prompt instruction: both right, 958 in 1,000. "Looks solved."
- Chen + System-prompt instruction: Claude converts the timestamp to 10 April and says the pantry box comes first. Truth: the weekly box, 8 April. Verdict Only usually works. "Claude still does the arithmetic."
- Chen + PostToolUse hook: step 2 now shows ISO dates and "status": "requested". Answer right, 1,000 in 1,000. Verdict Best fit (exam answer). Point at the green box lighting up in the diagram.
- Ben + PreToolUse hook: same raw results reach Claude; it says the refund is "paid" when it's only approved. Verdict Wrong hook.
- A normalising subagent: right answers, 991 in 1,000, but read the cost line: an extra model call on every result. Verdict Overbuilt.
- Ask each tool's owner: "Tickets filed, no release date." 612 today. Verdict Slow and out of your hands.
- Say once: customers, values and rates are made up; the shape is what the exam guide says.

## 6. The traps table (1 min)
- Read the four labels, each matched to a run you just did: Chen + prompt, the owners' tickets, PreToolUse, the subagent.

## 7. Practice question 1, live (2 min)
- Read the stem. Point at "The vendors run these servers, and the team cannot change their responses".
- Rule out by trap: a proxy server (overbuilt), few-shot examples (only usually works), showing dates beside claims (different problem).
- Click A, open "Think it through", show the mind map.
- Leave question 2 (carrier dates) and question 3 (warehouse dates, pick two) for the viewer: "pause and try them".

## 8. Close (20 s)
- Rule to remember: fix messy tool results in code on the way back, before Claude reads them.
- Point back to the Trap gym page for the next trap.
