# Beat sheet: "Too many tools" (about 8–10 minutes)

Not a script. Glance at the point, then say it in your own words while showing the page.
Record one beat per take, and pause 2 seconds before restarting a sentence; the fillers get cut in editing.

## 1. The hook (30 s)
- Show the title and the lede.
- Say: 18 tools, every agent gets all of them, and picks get worse. The tempting answers polish the list. The exam's answer hands out fewer tools.
- Read the "At a glance" box once.

## 2. The chef's counter (1 min)
- Two boxes: a hundred gadgets on every counter, versus five knives per station.
- The cleaver on the pastry counter is the second problem: a tool from someone else's job gets used.
- The small salt pot is the narrow shared tool for a frequent need. Anything bigger goes through the head chef.
- Define AgentDefinition in one line: where a subagent's tool list lives.

## 3. The diagram (1 min)
- Coordinator on top, four subagents below, each with 4 or 5 tools.
- Say the diagram changes with the simulator: you'll see "18 tools" in every box in a moment.

## 4. The one question (1 min)
- "Does this agent really need every tool it has?"
- The four bullets: scope it; remove the off-role tool; one narrow tool for a frequent need; hard questions through the coordinator.
- Word lists: "18 tools", "built from one template", versus "most checks are one-field lookups", "every round trip adds a long wait".

## 5. Simulator (3 min). The heart of the video
- Full review + all 18 to every agent. Point at the grid: every row full, pink outlines on other roles' tools. The diagram says 18 tools in every box.
  Replay: 5 of 9 right, 2 wrong picks, 2 off-role misuses (synthesis searches mid-draft and adds 2 unchecked papers; saves the draft with export_pdf). Reliability 74%. Verdict Breaks.
- Same request + 4 or 5 scoped tools. 9 of 9, reliability 97%. The synthesis agent "notes the gap" because it has no search tool. Verdict "Best fit (exam answer)".
- Same request + one agent with all 18: 5 of 9, 4 wrong picks, 52 min, reliability 70%. The dashed box in the diagram: one agent, all four jobs.
- Switch to the 12-checks draft + scoped tools: every answer right, but 12 round trips through the coordinator and 31 min. Verdict "Too strict".
- Now scoped + verify_fact: 11 lookups through verify_fact, the hard one still goes to the coordinator, 1 round trip, 12 min. Verdict "Best fit (exam answer)". Point at the verify_fact pill under Synthesis.
- Quick contrast: 12 checks + all 18: 9 min, the fastest, and 12 off-role misuses with a wrong answer on the hard check. "Fast and wrong."
- Say once: the reliability figures and minutes are illustrative; the shape is the guide's.

## 6. The four traps table (1 min)
- Match each trap to a click: better descriptions or a "don't use" prompt still leave the tool in hand (only usually works); a router (overbuilt); scoped with no shared tool (too strict, the 31-minute run); give synthesis the whole search set (over-provisioned).

## 7. Practice question 1, live (2 min)
- Read the stem: many back-office tools, wrong core picks spread across all five.
- Rule out B (descriptions: different problem), C (a hook: different problem), D (merging blurs the tools).
- Click A, open "Think it through".
- Leave questions 2 (one template, full tool set) and 3 (one-field lookups) for the viewer.

## 8. Close (20 s)
- Rule to remember: fewer, role-fitted tools beat more tools with better labels.
- One more line: this page is about which tools each agent holds; tool_choice is a different trap with its own page.
