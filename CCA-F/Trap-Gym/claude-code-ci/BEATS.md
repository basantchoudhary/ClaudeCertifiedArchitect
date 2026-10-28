# Beat sheet: "Claude Code in CI" (about 8–10 minutes)

Not a script. Glance at the point, then say it in your own words while showing the page.
Record one beat per take, and pause 2 seconds before restarting a sentence; the fillers get cut in editing.

## 1. The hook (30 s)
- Show the page title.
- Say: a pipeline runs Claude Code on every pull request. The wrong answers all sort of work: pipe "yes" into it, regex the JSON out of prose, paste the standards into the command.
- The trap: a workaround where the CLI already has the setting. Two questions: who is there to answer, and who reads the output?

## 2. The overnight cleaning crew (1 min)
- Four boxes. They can't ring you at 3 a.m. (that's -p). They fill a checklist, not a note (JSON with a schema). The house rules are on the wall (CLAUDE.md). Someone else inspects (an independent reviewer).
- Define CI in one line: the robot that runs checks on every pull request.

## 3. The diagram (1 min)
- Trace it: pull request, then claude -p, which loads CLAUDE.md, then JSON that fits the schema, then a script that posts inline comments back on the pull request.
- Point at "who reviews?": the session that wrote the code holds its own reasoning; an independent instance has fresh eyes.

## 4. The one question (1 min)
- Butter box: "Will anyone be there to answer, and does a program or a person read the output?"
- Word lists: "the job hangs" means -p; "post inline PR comments" means JSON plus schema; "review ignores our standards" means CLAUDE.md; "one call writes and reviews" means an independent instance.

## 5. Simulator (3 min). The heart of the video
- Everything off: the log says the job exceeded its time limit and was cancelled. Verdict "Breaks: hangs". Flip the other toggles on and off: still hangs. "Nothing else matters until -p is on."
- Turn on -p only: it runs, but the log shows prose and a JSONDecodeError, 0 comments posted. Verdict "Breaks: unparseable". Point at the meter: "2 of 6, but none posted".
- Add JSON: runs 3 and 5 fail (a key named "location"; a sentence after the block). Verdict "Only usually works": 3 of 5 runs posted.
- Add schema: every run posts. Verdict "Weak review": 2 of 6. Point at the missed list and its reasons.
- Turn on CLAUDE.md: 4 of 6, "Self-review blind spot". The builder and generated-client comments appear.
- Switch to the independent instance: 6 of 6, "Best fit (exam answer)". Show the log now has two steps: generate, then a fresh review.
- Optional: CLAUDE.md absent, independent on: "Misses team standards", 4 of 6. Two different gaps, same count.
- Say once: the log and counts are illustrative; the shape is what the exam guide says.

## 6. The four traps table (1 min)
- Read the four wrong options: pipe "yes", regex the JSON, standards in the CI command, a person runs it locally. Each one works a bit; each one is a workaround for a built-in.

## 7. Practice question 1, live (2 min)
- Read the stem. Point at "sits idle until the job's time limit cancels it".
- Rule out options by naming their trap: workaround (expect script), hides the problem (shorter time limit), overbuilt (rewrite against the Messages API).
- Click C, open "Think it through", show the mind map.
- Leave question 2 (--json-schema) and question 3 (an independent review) for the viewer: "pause and try them".

## 8. Close (20 s)
- Rule to remember: in CI, -p so it never waits, JSON with a schema so code can read it, CLAUDE.md for the standards, and a fresh instance to review.
- Point back to the Trap gym page for the next trap.
