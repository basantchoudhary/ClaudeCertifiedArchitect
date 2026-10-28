# Beat sheet: "Stop reason" (about 8–10 minutes)

Not a script. Glance at the point, then say it in your own words while showing the page.
Record one beat per take, and pause 2 seconds before restarting a sentence; the fillers get cut in editing.

## 1. The hook (30 s)
- Show the page title.
- Say: every agent is a loop. Ask Claude, run the tool, ask again. The exam doesn't ask how to start the loop; it asks how it stops.
- Every wrong option stops on something that looks like a signal: some text, a polite line, a count. Only one stops on the field built for it.
- Promise: stop_reason has six values, and today you get to change it and watch what each loop does.

## 2. The waiter (1 min)
- Read the At a glance box, then scroll to the waiter story.
- The waiter keeps going while the customer is ordering, and stops when the menu closes.
- Not when the customer says "great" halfway. Not after exactly three trips.
- Land it: "tool_use" means "I'm still ordering"; "end_turn" means "menu closed".

## 3. The diagram (1 min)
- Trace it: your code sends, Claude replies, the response carries content plus stop_reason.
- The loop reads stop_reason: tool_use goes up, runs the tool, appends the tool_result, and goes back round. end_turn shows the answer.
- Point at the three pink boxes: any text block, the wording, a turn counter. These are the three anti-patterns the exam guide names.
- Say: the simulator thickens whichever box your loop reads.

## 4. The one question (1 min)
- Butter box: what does the code look at to decide whether to run another step?
- Read the four bullets fast. Then the word lists: "loop ends too early", "after each response" versus "checks the reply for 'done'", "stops after 10 iterations".

## 5. Simulator (3–4 min). The heart of the video
- Set the scene: "Where is my order 4471?" Turn 1 is tool_use with the text "Let me check that order." Turn 2 is tool_use, no text. Turn 3 is yours.
- end_turn + (b): 3 calls, 2 tools, the customer gets "...should arrive on Thursday 30 October." Verdict: Best fit (exam answer). Point at the green box in the diagram.
- tool_use + (b): 4 calls, 3 tools, now with "between 9 am and 1 pm". "The loop didn't need to know how many tools; Claude told it."
- Switch to (c), stop when the reply has text. Click through end_turn, then refusal: every time, the customer sees "Let me check that order." 1 call, 0 tools. "Your pick never even happened. Turn 1 had text and a tool call together."
- (d), stop when it sounds finished, with end_turn: it works, verdict Only usually works. "Right answer for the wrong reason: Claude happened to write 'Anything else'." Then stop_sequence + (d): 10 calls, verdict Runs on. "The answer was ready at turn 3."
- (e), stop after 3 turns, with end_turn: Only usually works, "this job happened to take 3 calls". Then tool_use + (e): the customer sees nothing. Verdict Breaks: "Claude asked for one more tool and the loop walked away."
- Now the extra four. max_tokens + (b): the customer gets "should arr". Verdict Gap: shows a cut-off reply. Switch to (a): 4 calls, the loop doubled max_tokens and resent. Handled right.
- pause_turn + (b): customer sees "Checking for delays at the Leeds depot." Switch to (a): the response goes back as-is, and the answer adds "DHL reports no delays there".
- refusal + (a): no resend; "I've passed it to a colleague". Say: the category, if any, is in stop_details.
- Show the code box once for (b) and once for (a): the exam answer is five lines; production adds four branches.

## 6. The six-values table (1 min)
- Two rows say "Yes (guide 1.1)". Four say "Beyond the exam guide".
- Say: on the exam, the answer is continue on tool_use, terminate on end_turn. Knowing the other four just stops you being surprised by them at work.

## 7. The traps table (30 s)
- Match each row to a run you just did: text as a stop sign is (c), parsing the wording is (d), cap as the main stop is (e).
- Fourth row, a fixed sequence of tool calls: it answers a design question, not a stopping one.

## 8. Practice question 1, live (2 min)
- Read the stem: the loop ends the turn whenever Claude's response contains a text block; the lookup never runs.
- Say: that is exactly (c) from the simulator.
- Rule out options by naming their trap. Click the answer, open "Think it through", show the mind map.
- Leave questions 2 ("EXTRACTION COMPLETE" phrase) and 3 (closing line plus a fifteen-step cap) for the viewer: "pause and try them".

## 9. Close (20 s)
- Rule to remember: the loop's stop sign is stop_reason. Keep going on tool_use, stop on end_turn.
- Not the text, not the wording, not a counter. Point back to the Trap gym page for the next trap.
