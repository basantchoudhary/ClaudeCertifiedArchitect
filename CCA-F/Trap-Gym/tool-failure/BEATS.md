# Beat sheet: "When a tool fails" (about 8–10 minutes)

Not a script. Glance at the point, then say it in your own words while showing the page.
Record one beat per take, and pause 2 seconds before restarting a sentence; the fillers get cut in editing.

## 1. The hook (30 s)
- Show the title.
- Say: every option in these questions handles the failure somehow. The wrong ones lose information, or invent it.
- Promise: one question that picks the right handling every time.

## 2. The assistant and the phone call (1 min)
- Scroll to the three boxes. Five assistants, one dropped call after three prices.
- Useful: “here are three, the line dropped, I can ring back at ten.”
- Vague, patient (retries, then forgets the three prices), inventor (“they don't sell those”), quitter (bins the folder).
- Land it: the error result is all the next decision-maker sees.

## 3. Where a failure travels (1 min)
- Point at the diagram left to right: tool → subagent → coordinator → user.
- Tool: isError, errorCategory, isRetryable, reason, partial results.
- Subagent: retry a short blip, then pass up only what's unresolved, with what it has.
- Coordinator: wait, other source, go on with a stated gap, escalate. Not: end the run.

## 4. The one question (1 min)
- Butter box: “Does the next decision-maker know what happened, what was tried and what is still usable?”
- Three categories: transient (retry), business (don't retry, give the reason), validation (fix the input).
- Show the word lists: “times out” → transient; “policy”, “cut-off” → business.

## 5. Simulator (3 min). The heart of the video
- Search times out + Empty result marked success: committee told “no trials in patients over 80”. There are five. “That's inventing.”
- + Retry with backoff: the official sample's trap. 45 s of retries, then “search unavailable”; the 14 papers already found are lost.
- + Exception: run lost, every finished result thrown away.
- + Generic: it recovers blindly, 12 minutes late, refetching the 14 papers.
- + Structured error: 19 papers, about 5 minutes late, nothing lost, nothing invented.
- Payments API down + Empty: “Done! $60 is on its way”, and the money goes out twice.
- Business-rule refusal + Generic: the customer is told “the system is down”. It isn't.
- Business-rule refusal + Structured: “I can pause from 11 Nov. Shall I?”
- Say once: delays are illustrative; the shape is what the exam guide says.

## 6. The traps table (1 min)
- Four names: inventing, losing, over-terminating, retrying the unretryable. One simulator example each.

## 7. Practice question 2, live (2 min)
- Read the verify_carrier stem. Point at “the same text it returns for a carrier with no licence”.
- Point at “an hour or more”: retries inside the tool can't wait that out.
- Rule out options by trap name: hides the problem, treats the symptom, different problem.
- Click the answer, open “Think it through”, show the mind map. Leave questions 1 and 3 for the viewer.

## 8. Close (20 s)
- Rule: say what failed, whether to retry, what was tried and what you already have. Never dress a failure up as an empty success; never end the whole run over one.
- Back to the Trap gym page for the next trap.
