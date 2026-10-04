# Mock #7 simulator — authoring spec

`sim.html` replays, for any question, what the system does after each option is applied. It is scripted and
deterministic: no model calls, the same trace every time. Learners use it to see **why the runner-up loses**, then
flip one fact and watch the runner-up win.

## Files
- `assets/sims.js` — helper library `window.SIMLIB` (`S, req, res, T, U, R, E, X, add`) plus the three reference
  sims (m7-s1-01, m7-s1-04, m7-s1-05). **These three are the quality bar.**
- `assets/sims-*.js` — one file per author, each calling `SIMLIB.add(sim)` per question. Plain ES5, ASCII with
  `\uXXXX` escapes.
- `check_sims.js` — validator; `node check_sims.js` must print `ok`.
- `sim.html` / `index.html` load every `sims-*.js` by an explicit `<script>` tag.

## A sim
```js
{ id: 'm7-s2-01', who: 'Engineer',              // label of the person lane
  labels: { loop: 'Claude Code' },              // optional lane renames (any lane)
  worlds: [ { id: 'A', label: 'As written',      desc: 'One sentence, deciding fact in <b>bold</b>.' },
            { id: 'B', label: 'Decider changed', desc: '…' } ],
  runs: { A: [run0, run1, run2, run3], B: [ … ] } }   // one run per option, in option order
run = { steps: [ … 3–9 steps … ], outcome: { ok, warn?, text }, rate }
```
- **World A** is the question as written. **World B** changes the fact named in the question's `decider` field so
  that the runner-up wins cleanly.
- **Steps**: `S(lane, title, note, payload, mark)`. Lanes: `cust` person, `loop` the developer's code (or Claude
  Code itself, renamed via `labels`), `api` Messages API request/response (`req`/`res`), `hook`, `tool`, `sub`
  subagent, `block` a constraint that makes the option impossible, `file` a config file (CLAUDE.md, rules,
  `.mcp.json`, skills, commands, settings), `ctx` the context window. Marks: `ok`, `bad`, `warn`, `''`, put on the
  step where the decisive thing happens.
- **Extras**: `X(step, { meter: { total, parts: [{ label, tokens, kind }] } })` draws a context bar (kinds `sys`
  system/always-loaded, `keep` useful, `tool` tool output, `drop` wasted/lost, `new` just added).
  `X(step, { table: { head: [...], rows: [[...]] } })` draws a small table (cost, latency, accuracy by stratum).
- **Outcome**: one or two plain sentences saying why, tied to the decider. `warn: true` = works, with a cost or
  heavier than needed.
- **Rate**: share of 20 runs meeting the requirement. Deterministic mechanisms (code, hooks, API settings, config
  that is loaded or not) = 1 when they work; model-compliance fixes < 1 (0.85–0.97); impossible = 0.

## Validator rules
World A: every keyed answer passes cleanly (ok, no warn); no other option passes cleanly. World B: the runner-up
passes cleanly. A failing run shows its failure in a step (bad/warn mark or a block step); a failing run has
rate < 1; a clean pass has rate ≥ 0.9. Meters may not exceed their total; table rows match the head.

## Faithfulness
Traces must agree with each option's `why`, the question's `deep` layer and real Claude API / Agent SDK / Claude
Code behaviour (CLAUDE.md hierarchy and `@imports`, `.claude/rules/` with `paths:` globs, skills loaded on demand vs
memory always loaded, project vs user scope, `claude -p --output-format json`, Batches API 50% cost and up-to-24h
window with no multi-turn tool use, `/compact`, plan mode). Never contradict the keyed reasoning. Keep invented
data consistent with the scenario brief.

## Voice
Short sentences, plain words, define a term the first time. The learner should finish a runner-up trace in World A
able to say the one fact that made it lose.
