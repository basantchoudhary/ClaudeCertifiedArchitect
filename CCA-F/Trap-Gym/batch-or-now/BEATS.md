# Beat sheet: "Batch or now?" (about 8–10 minutes)

Not a script. Glance at the point, then say it in your own words while showing the page.
Record one beat per take, and pause 2 seconds before restarting a sentence; the fillers get cut in editing.

## 1. The hook (30 s)
- Show the page title.
- Say: "half price" is the bait. The exam puts it next to a job someone is waiting on. And the reverse: full price for a report nobody reads until Monday.
- Promise: one question settles it: is anyone waiting?

## 2. The dry cleaner (1 min)
- Express, while you wait, full price. Bulk, within a day, half price, and they won't phone you halfway.
- Land it: synchronous call = express; Message Batches API = bulk; custom_id = the ticket.
- "They won't phone you halfway" = no tool loop inside a batch request.
- One more: don't send the whole wardrobe when one shirt is dirty. Trimming saves on both.

## 3. The diagram (1 min)
- Top lane: your code ↔ Claude in seconds, and the tool loop going back and forth.
- Bottom lane: many requests with custom_ids → batch queue, no promise how fast → results matched by custom_id.
- Point at the last line: one reply per request, no tool loop inside a batch.

## 4. The one question (1 min)
- Butter box: "Is anyone waiting on this result?"
- Yes → synchronous. No → batch. Needs tools mid-task → not a batch as it is. Either way → trim.
- Show the two word lists: "must pass before merge", "developers wait" vs "overnight", "read on Monday", "due next week".

## 5. Simulator (3 min). The heart of the video
- PR review + batch: $18.00, half of $36.00, but results in 9 h 20 min against "within about 10 minutes". Verdict Blocks the team.
- PR review + synchronous: $36.00, seconds, Right API. Switch on trim: $10.80, Best fit. "The saving came from trimming, not from batch."
- Weekly report + synchronous: $72.00, Pays double. Batch: $36.00, back in 10 h 50 min, long before Monday. Trim: $2.40, Best fit.
- 40,000 documents: synchronous $720 vs batch $360, back in 13 h 00 min, due next week. Trim changes nothing: each request is already just the document.
- Support agent + batch: "$420 for nothing", never finished, Doesn't work. "A batch request returns one reply; it stops at the first tool call." Synchronous: $840, Right fit.
- Say once: prices and times are illustrative; real batches promise only "within 24 hours".

## 6. The three traps table (1 min)
- Read the trap names and point to the run that showed each: PR + batch, weekly + synchronous, agent + batch.
- Then the line under the table: trimming is the saving wrong answers miss.

## 7. Practice question 1, live (2 min)
- Read the stem. Point at "must pass before a branch can merge, and developers wait for its comments", then at "every file in the changed modules, though comments go only on changed lines".
- Rule out: batch + polling (blocks the merge), batch + fallback (overbuilt), skip small PRs (drops coverage).
- Click B, open "Think it through", show the mind map.
- Leave question 2 (nightly tagging batch) and question 3 (fetch in code, then batch) for the viewer.

## 8. Close (20 s)
- Rule to remember: someone waiting → now; nobody waiting, one call each → batch; tool loop → not in a batch; trim either way.
- Point back to the Trap gym page for the next trap.
