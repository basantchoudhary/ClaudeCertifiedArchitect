# Beat sheet: "Who escalates?" (about 8–10 minutes)

Not a script. Glance at the point, then say it in your own words while showing the page.
Record one beat per take, and pause 2 seconds before restarting a sentence; the fillers get cut in editing.

## 1. The hook (30 s)
- Show the page title.
- Say: a support agent hands the wrong cases to people. Angry customers with easy problems go up; calm customers with hard ones stay.
- Promise: one question that rules out three of the four answers: is this a trigger, or a feeling?

## 2. The new shop assistant (1 min)
- Scroll to the two boxes.
- Tell the story: "call the manager when you need to" → calls for a raised voice over $5, says yes to a calm customer asking for something the shop never gives.
- The fix: three written triggers, then four real cases walked through together.
- Mention the handoff: "someone needs help" is not enough for the manager.

## 3. Where each rule acts (1 min)
- Point at the diagram. Criteria and examples live in the system prompt, guiding Claude.
- The proxies sit off to the side: sentiment reads the mood of the message, the classifier reads it too, self-rated confidence is Claude marking its own homework.
- Bottom right: escalate_to_human carries a structured summary to a person.

## 4. The one question (1 min)
- Show the butter box: "Is this a trigger, or a feeling?"
- Triggers: asked for a person (at once), policy exception or gap, can't make progress.
- Not triggers: upset but simple. Two accounts match: ask for an identifier, don't guess and don't escalate.
- Show the two word lists. Say: sentiment, confidence score and classifier are the usual distractors.

## 5. Simulator (3 min). This is the heart of the video
- Angry but simple + Sentiment score: "14 of 15 sent to a person for no reason."
- Calm but complex + Sentiment score: "0 of 8 escalated." Same rule, failing both ways. Day line: 54% resolution, 21 cases kept that needed a person.
- Policy exception + Self-rated confidence: "4 of 12 escalated. The agent felt sure it could help."
- Policy exception + Separate classifier: "10 of 12. It works, but look at the build cost: three dots, labelled history, retraining." Day: 63%.
- Asks for a person + Criteria + examples: "10 of 10, every time." Day line: 68% against a best possible of 70%, only 2 wrong each way.
- Scroll to "What the person receives": thin handoff vs the structured card (customer, cause, amount, next step).
- Say once: the numbers are illustrative; the shape is what the exam guide says.

## 6. The three traps table (1 min)
- Read the trap names only: unreliable proxy, overbuilt fix, losing the handoff.
- One example each: sentiment at 0 of 8, the classifier's three dots, "Customer needs help" plus a link.

## 7. Practice question 1, live (2 min)
- Read the stem out loud. Point at "Calm customers who ask for something policy does not cover are usually handled by the agent alone."
- Rule out options by naming their trap: confidence (unreliable proxy), classifier (overbuilt), sentiment (wrong signal).
- Click the answer, open "Think it through", show the mind map of signals.
- Leave questions 2 and 3 for the viewer. Hint for 3: "two accounts match: is that a reason to escalate?"

## 8. Close (20 s)
- Rule to remember: escalate on triggers, not feelings; write the criteria, show examples, hand over a structured summary.
- Point to the Trap gym page for the next trap.
