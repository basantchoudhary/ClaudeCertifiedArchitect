# Beat sheet: "The tool picker" (about 8–10 minutes)

Not a script. Glance at the point, then say it in your own words while showing the page.
Record one beat per take, and pause 2 seconds before restarting a sentence; the fillers get cut in editing.

## 1. The hook (30 s)
- Show the page title.
- Say: Claude keeps calling the wrong tool. Three of the four answers build something. One edits some text.
- Promise: by the end you'll know why the text edit wins, and when it doesn't.

## 2. The labelled drawers (1 min)
- Scroll to the two boxes.
- Tell the story: three drawers labelled "Utensils", "Tools", "Kitchen things"; the helper guesses.
- The three expensive fixes: a person at the drawers (routing layer), one big drawer (merged tool), a fourth drawer (new tool).
- Land it: Claude picks a tool from its description, the way the helper picks from the label.

## 3. Where each fix acts (1 min)
- Point at the diagram, top row: what Claude reads (system prompt, tool descriptions, tool_choice). Descriptions are the main signal.
- Middle row: the routing layer runs before Claude and decides what Claude is even offered.
- Bottom row: merging changes the tools themselves.

## 4. The one question (1 min)
- Show the butter box: "Does Claude have what it needs, in the descriptions, to tell these tools apart?"
- No → rewrite the descriptions (formats, examples, edge cases, boundaries). Yes but inconsistent → examples, later.
- Too many tools → scope the set. Text instead of a call → tool_choice "any". Must run first → forced.
- Show the two word lists. Say: "minimal description" and "first step" are the giveaways.

## 5. Simulator (3 min). This is the heart of the video
- "Is box 20931 arriving today?" + One-line descriptions: point at the pink. "52 right, 40 went to lookup_order. A coin toss."
- Same request + input formats and examples: "70. Better, but both tools take a box ID, so formats can't separate them."
- Same request + edge cases and boundaries: "96." Read the "Not for a box on its way" line in the description box. Point at the table: 384 of 400, same build cost as a one-liner.
- "I'm customer 48213, change my address" + Keyword routing layer: "0 right." The word "delivery" in "delivery address" matched the box rule, so get_customer was never offered. Table: 148 of 400, the worst score, and the biggest build.
- Same request + Merge into one lookup tool: "60. The choice just moved into a parameter called kind."
- "Last Tuesday's box" + Few-shot examples: "62. No example named a box by a date." Then tool_choice "any": "30 right, 70 wrong. It forced a call, not the right call."
- Say once: the numbers are illustrative; the shape is what the exam guide says.

## 6. The three traps table (1 min)
- Read the trap names only: build instead of describe, examples before descriptions, right lever for the wrong problem.
- One example each from the simulator you just ran: router at 0, examples at 62, "any" at 30.

## 7. Practice question 1, live (2 min)
- Read the stem out loud. Point at "Both descriptions read 'Searches for studies on a drug.'"
- Rule out options by naming their trap: routing step (overbuilt), merged tool (more than a first step), five examples (misses the cause).
- Click the answer, open "Think it through", show the mind map.
- Leave questions 2 and 3 for the viewer. Hint for 3: "the descriptions are already detailed, so what else is wrong?"

## 8. Close (20 s)
- Rule to remember: wrong tool picked → fix the descriptions first; build nothing until they're clear.
- Point to the Trap gym page: the next trap is "Who escalates?".
