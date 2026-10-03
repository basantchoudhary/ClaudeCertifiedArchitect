# "Explain like I'm 5" layer — writing guide

The candidate finds Mock #6 too hard to learn from as a test. They want every question to teach.
For every item add an `eli5` object:

```json
"eli5": {
  "question": "What is this question really asking? 2–4 short sentences.",
  "answer":   "The right answer in plain words and WHY it is right. 3–5 short sentences.",
  "options":  ["one entry per option, same order as options[]: 1–3 short sentences each"]
}
```
For the correct option(s), the `options` entry says why it's right in one line; for the runner-up, say what
would have to be different for it to win; for the others, why it doesn't fix *this* problem.

## Style
- **Everyday picture first, real term second.** Start from something anyone knows (a shop, a kitchen,
  a school, a library, a parcel delivery, sticky notes, a recipe card), then name the real thing in
  brackets so the vocabulary sticks: "a guard at the door who checks every refund before it goes out
  (a **PreToolUse hook**)".
- One analogy per explanation, and keep it consistent through that item. Don't stretch it until it breaks;
  if the analogy stops fitting, drop it and say it plainly.
- Short sentences. No sentence over ~25 words. No jargon without a plain-word gloss the first time it
  appears in that item.
- Accurate. Simplify, never falsify. If the analogy hides an important limit, say the limit.
- `question` must point at **the one sentence in the stem that decides it** ("The clue is: …") — that is
  the reading skill the candidate is missing. Say in plain words what the question is *not* about,
  if the stem has a vivid distraction.
- `answer` ends with a one-line **rule to remember** in bold, e.g. "**Rule: if it must happen every
  time, use code, not a request.**"
- Warm and direct, not childish. No "imagine you are 5", no "buddy", no emoji.
- Plain text plus `<b>` and `<code>` only.

## Check before finishing
Run `python3 Foundations-Mock-Exam-6/validate.py Foundations-Mock-Exam-6/parts/<file>.json` from `CCA-F/`
— it now checks that every item has `eli5.question`, `eli5.answer`, and one `eli5.options` entry per option.
Don't change stems, options, keys or deciders.
