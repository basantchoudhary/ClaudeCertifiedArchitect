# Beat sheet: "MCP: where and what" (about 8–10 minutes)

Not a script. Glance at the point, then say it in your own words while showing the page.
Record one beat per take, and pause 2 seconds before restarting a sentence; the fillers get cut in editing.

## 1. The hook (30 s)
- Show the page title.
- Say: every MCP question hides two choices, where the server is configured and what it offers. Wrong answers get one of them wrong.

## 2. The office phone list (1 min)
- Scroll to the four boxes.
- Shared phone list with "ask for your own code" = `.mcp.json` with `${TOKEN}`. Your own contacts = `~/.claude.json`.
- Catalogue vs phone call = resource vs tool. Buy the kettle = community server.

## 3. The map (1 min)
- Walk the diagram top to bottom: where is it configured, which server, what it offers, and Claude choosing.
- Point at the small Grep box: "built-ins compete with your MCP tools. The description decides who wins."

## 4. The one question (1 min)
- Show the butter box: "Who needs this server, and does Claude need to do something or know what exists?"
- Show the two word lists. Underline "CI", "must not be committed", "to learn which … exist", "still uses Grep", "ordinary Jira tasks".

## 5. Simulator (3 min). The heart of the video
- Code search + User `~/.claude.json` + one-line description: teammate gets nothing, CI gets nothing, and your own session uses Grep. 9 of 12 callers. Fails here.
- Switch to Project `${VAR}` + full description: teammate sets `CODESEARCH_TOKEN` once, git holds the variable, 1 call, 12 of 12. Right fit.
- Same, but "key pasted in": the In git box shows the key in plain text. Fails here: leaks a secret.
- Schema + tool, one-line description: 12 calls, 11 wasted. Full description: 4 calls, 3 wasted, still guessing. Resource: 2 calls, 0 wasted.
- Jira + resource: reads the ticket, then stuck: a resource can't add a comment. Then community server: 2 calls, nothing to maintain.
- Notes + project `${VAR}`: the trap in reverse, your experiment pushed on the team. Then User config: right fit.
- Say once: call counts are illustrative; who gets the server follows the exam guide.

## 6. The three traps table (1 min)
- Read the names: wrong home, wrong primitive, build or bypass. One simulator example each.

## 7. Practice question 1, live (2 min)
- Read the stem. Point at "so does a new CI job" and "No key may be committed to the repository".
- Rule out by trap name: each person's own config is personal, the Bash script loses the tools, the CI copy covers only CI.
- Click the answer, open "Think it through", show the mind map.
- Leave questions 2 and 3: "pause the video and try them".

## 8. Close (20 s)
- Rule to remember: team → `.mcp.json` with `${VARS}`; only me → `~/.claude.json`. Act → tool; know what exists → resource; standard service → community server.
- Point to the Trap gym page and the next trap.
