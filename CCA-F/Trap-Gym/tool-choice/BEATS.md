# Beat sheet: "Which tool_choice?" (about 8–10 minutes)

Not a script. Glance at the point, then say it in your own words while showing the page.
Record one beat per take, and pause 2 seconds before restarting a sentence; the fillers get cut in editing.

## 1. The hook (30 s)
- Show the title and the lede.
- Say: every option in these questions makes the right tool call more likely. Only one makes it certain, at the right firmness.
- Promise: one question sorts it out. Any tool at all, or one particular tool first?

## 2. The waiter (1 min)
- Scroll to the three boxes.
- "Whatever you like" is auto. "You must order something" is any. "You must start with the soup" is a forced tool.
- Read the paragraph under them: tool_choice sits on the request next to the tools. tool_use versus text, and the stop_reason for each.
- Land it: a prompt line is followed most of the time. The setting is what makes it certain.

## 3. The diagram (1 min)
- One request fans out to four settings. Left to right: looser to firmer.
- Point at "none": real in the API, not in the exam guide. We use it only to show the far end.
- Point at the forced box: "so it runs first".

## 4. The one question (1 min)
- Butter box: three bullets, one per setting.
- Words to listen for: "may answer directly" (auto), "must always return structured output", "one of several schemas" (any), "must run first", "before enrichment" (forced).

## 5. Simulator (3–4 min). The heart of the video
- Invoice pipeline + "auto": 178 fine, 10 text replies dropped, 12 started with enrich_vendor. Verdict "Only usually works". Show the text sample and the enrich_vendor sample.
- Switch to "any": the 10 text replies are gone, now 184 fine and 16 wrong first tool. Verdict "Different problem". Say: any guarantees a tool, not which tool.
- Forced extract_metadata: 200 out of 200. "Best fit (exam answer)". Point at the request JSON: { "type": "tool", "name": "extract_metadata" }. Read the "Next" line: the next request goes back to auto.
- Unlabelled documents + "auto": 15 prose replies the parser drops. Then forced extract_certificate: 125 wrong records. Verdict "Breaks". Say: forcing is only right when you know which tool must run.
- Same request + "any": 200 out of 200, "Best fit (exam answer)". Claude already picks the schema well; it just needed to stop writing prose.
- Support chat + "auto": "Best fit". Then + "any": 143 needless tool calls. Show the sample: "What time do you close on Sunday?" triggers lookup_order with an empty ID. "A guarantee nobody wanted."
- Say once: the rates are illustrative; the shape is what the exam guide says.

## 6. The four traps table (1 min)
- Prompt line: only usually works. Check in code and retry: delays the problem. "any" when one tool must be first: different problem. Strip the other tools, or classify then force: overbuilt.
- Tie each to a run: invoice + auto, invoice + any, documents + forced.

## 7. Practice question 1, live (2 min)
- Read the stem. Point at "Uploads carry no type label" and "When the model does call a tool, it picks the right one".
- Rule out: richer descriptions (different problem), classify then force (overbuilt), resend on end_turn (patches after).
- Click D, open "Think it through".
- Leave questions 2 (force extraction first) and 3 (any versus forced for the tier lookup) for the viewer.

## 8. Close (20 s)
- Rule to remember: any guarantees a tool call; a forced named tool guarantees which one runs first; auto when text is fine.
- Mention the footnote in one sentence: some of the newest models changed this; the exam tests the guide.
- Point back to the Trap gym page for the next trap.
