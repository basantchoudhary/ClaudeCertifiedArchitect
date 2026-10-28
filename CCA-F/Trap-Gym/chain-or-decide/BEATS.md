# Beat sheet: "Fixed chain or Claude decides?" (about 8–10 minutes)

Not a script. Glance at the point, then say it in your own words while showing the page.
Record one beat per take, and pause 2 seconds before restarting a sentence; the fillers get cut in editing.

## 1. The hook (30 s)
- Show the page title.
- Say: this trap runs both ways. An open investigation gets a rigid script, or a known checklist gets handed to an agent to improvise. And a third wrong answer puts everything into one big prompt.
- Promise: one question sorts it. Can you write the steps down before you start?

## 2. Recipe and detective (1 min)
- Scroll to the two boxes. Baking a cake: a recipe, the same steps every time. Finding out why it sank: what you check next depends on what you just found.
- Land it: recipe = prompt chaining (each file on its own, then one integration pass). Detective = adaptive decomposition (Claude creates each next subtask from what it found).
- Define attention dilution once: a prompt that grows too big spreads the model's attention thin.

## 3. The diagram (1 min)
- Top lane: file 1, file 2, up to file 14, each alone, then the integration pass. "Written down before you start."
- Middle lane: goal and evidence, check one thing, a finding, and the arrow back: the next step is chosen from it.
- Bottom: one big prompt (fine when small), and the decision tree, "a fixed chain with branches: only the causes you foresaw".

## 4. The one question (1 min)
- Butter box: "Can you write down every step before you start, or does the next step depend on what you discover?"
- The two word lists: "every file", "known stages", "must be replayed" versus "unknown cause", "follow the leads".

## 5. Simulator (3 min). The heart of the video
- Pull request + one big prompt: 2 of 5 bugs found. Point at the pink lines: file 9 and file 11 skimmed, and checkout.ts "called fine in one comment, flagged in another". Verdict Breaks. "A bigger context window does not fix attention."
- Pull request + fixed chain: 15 steps, 5 of 5, same 15 steps every time. Point at the last line: only the integration pass finds the getPrice rename. Best fit (exam answer).
- Pull request + Claude decides: 12 steps, 4 of 5, 3 wasted planning steps, and it skipped emails.ts. Verdict Overbuilt: "it mostly works, at a cost, and it changes run to run."
- Pull request + decision tree: 4 of 5, Only half. "No branch looks across files. The integration pass is half of the pattern."
- Nightly job + fixed chain: 7 steps, 0 of 1, all 7 wasted. "The cause is in the data. No step on the list was ever going to look at row counts."
- Nightly job + Claude decides: read the yellow and green lines aloud as a story: started Monday, the join stage went from 10 to 85 minutes, orders input 3 times bigger, duplicate order_ids, another team's retry. Best fit (exam answer). "Nobody could have written this list on Monday morning."
- Nightly job + decision tree: Too rigid, ends at "escalate to on-call".
- Config file + one big prompt: 1 step, 1 of 1, Right fit. "One small file can't dilute attention." Then config file + Claude decides: 6 steps, 4 wasted, Overbuilt.
- Say once: the jobs and findings are illustrative; the shape is what the exam guide says.

## 6. The four traps table (1 min)
- Read the trap names and match each to a run you just did: overbuilt (pull request + Claude decides), too rigid (nightly job + tree), attention dilution (pull request + big prompt), chain without the join (pull request + tree).

## 7. Practice question 1, live (2 min)
- Read the stem. Point at "no section depends on what another finds" and "Auditors must be able to replay each run step by step".
- Rule out options by naming their trap: B "hard to audit", C "different problem", D "only helps varied requests".
- Click A, open "Think it through", show the mind map.
- Leave question 2 (25 API clients, later rows thin: per-item passes plus a comparison pass) and question 3 (the fixed plan that missed the upstream cause) for the viewer: "pause and try them".

## 8. Close (20 s)
- Rule to remember: known steps get a recipe; unknown steps get a detective.
- Point back to the Trap gym page for the next trap.
