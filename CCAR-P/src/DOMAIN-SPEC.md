# CCA-P domain study pages: writing spec

Audience: the site owner (23 years in data platforms, passed CCA-F on 7 Nov 2026), studying for the
Claude Certified Architect – Professional exam (guide v1.0), and the public readers of cleandataengineering.ai.
Each domain becomes one page: `CCAR-P/D<n>-<Slug>/index.html`, built by `src/build_domains.py` from
`src/domains/d<n>.json`. One **section per guide line**.

Read first: `CCAR-P/CCAR-P-Exam-Guide.md` (the official lines, verbatim) and
`CCAR-P/src/build_walkthrough.py` (the DOMAINS list: our one-paragraph take on each line,
the stem/answer/trap for each). The domain page goes deeper than the walkthrough and must agree with it.

## Writing rules (non-negotiable)

- Plain words, short sentences. Teach from zero: assume the reader knows CCA-F but not this topic.
- Define every term the first time it appears ("least privilege means…").
- Full sentences. No arrow chains (`A → B → C`) in prose, no cryptic symbols, no unexplained number lists.
  An arrow is fine inside `flow` steps (that's what the picture is for).
- Facts must be true for Claude and its platform as documented by Anthropic. If unsure of a specific number,
  feature name or limit, leave it out or say it generally. Do not name specific model versions; say
  "a smaller, faster model" / "the most capable model".
- Never copy questions from ExamTopics or any dump site. Write every question fresh.
- HTML allowed in strings: `<b>`, `<i>`, `<code>`. Escape `&` as `&amp;`, and never use a bare `<` or `>` in text.
- British or American spelling is fine; be consistent within a file.

## JSON shape (`src/domains/d<n>.json`)

```json
{
  "n": 3,
  "slug": "D3-Integration",
  "name": "Integration",
  "weight": "19%",
  "intro": "2–3 sentences: what this domain is about and what kind of decision its questions ask for.",
  "sections": [
    {
      "id": "3.1",
      "guide": "Evaluate tool/agent configuration for capability bloat",
      "oneliner": "One sentence a beginner understands: the whole idea.",
      "explain": ["paragraph 1 (3–5 sentences)", "paragraph 2", "optional paragraph 3"],
      "flow": ["optional picture: 3–6 short box labels", "shown left to right", "as a simple flow"],
      "know": ["4–7 must-know facts, one sentence each"],
      "compare": {
        "head": ["When the stem says…", "Pick", "Why"],
        "rows": [["…", "…", "…"], ["…", "…", "…"], ["…", "…", "…"]]
      },
      "example": {
        "situation": "A concrete 2–3 sentence business situation.",
        "decision": "What the architect decides.",
        "why": "Why, including why the most tempting alternative loses."
      },
      "questions": [
        {
          "stem": "35–70 words. The full situation in plain words, then the question.",
          "select": 1,
          "options": ["A", "B", "C", "D"],
          "key": [1],
          "why": "Why the key wins, naming the deciding fact in the stem.",
          "traps": [
            "Works, but <trap>.",
            null,
            "Works, but <trap>.",
            "Works, but <trap>."
          ]
        }
      ]
    }
  ]
}
```

- `compare` is the mind map: 3–5 rows; **include the row where the runner-up would win**.
- `flow` is optional; use it when the idea is a pipeline or sequence. Omit the key otherwise.
- `traps[i]` is `null` for each key option; every wrong option gets "Works, but …" (or "Wrong: …"
  only if the option is plainly unsafe).

## Questions: the real-exam style

- **2 questions per section.** Across the domain, about 1 in 5 is multiple-response: `"select": 2`,
  5 options, `"key"` has two indices, `traps` has 3 entries plus 2 `null`s. The stem must say
  "Which two…?".
- Clear stem, hard choice. The deciding fact is stated plainly in the stem. One reasoning step.
- **Every option is a practice that works somewhere.** The key is the best fit for *this* stem; at least
  one wrong option is a genuine runner-up that would win if one fact changed.
- **No giveaways.** Options roughly equal in length (the key must not be the longest in more than about a
  third of questions; vary it). No justification clause only on the key ("…which ensures…"). No "always",
  "never" or "only" just on wrong options. The key should not repeat the stem's wording more than the others do.
- Spread the key positions: across a domain, each letter is the key a similar number of times.
- Stems are situations ("A retailer's support assistant…"), not definitions ("What is RAG?").

## Model section (3.1), to match in depth and tone

```json
{
  "id": "3.1",
  "guide": "Evaluate tool/agent configuration for capability bloat",
  "oneliner": "Give an agent only the tools and permissions its job needs, because every extra one is a risk and a distraction.",
  "explain": [
    "<b>Capability bloat</b> means an agent has been given more tools, permissions or data access than its role uses. It usually happens by accident: a team connects a whole MCP server or reuses an admin account because it is quicker.",
    "Each extra capability is <b>attack surface</b>: something a prompt injection, a confused model or a misuse could trigger. It also makes the model's job harder, because more tools means more chances to pick the wrong one.",
    "The fix is <b>least privilege</b>: list what the role actually does, and remove everything else. Removing a capability eliminates the risk; logging it or asking for confirmation only reduces or reveals it."
  ],
  "flow": ["List the role's tasks", "Map tasks to tools", "Remove the rest", "Scope permissions per tool", "Review when the role changes"],
  "know": [
    "Least privilege: an agent gets the minimum tools and permissions its role needs.",
    "Removing a capability is a preventive control; logging and confirmation prompts are detective or compensating controls.",
    "Read-only and write tools should be separate, so a read-only role never holds write access.",
    "Fewer, well-described tools also improve tool selection.",
    "A bigger or better model does not change what the agent is authorised to do."
  ],
  "compare": {
    "head": ["When the stem says…", "Pick", "Why"],
    "rows": [
      ["The role never uses a tool the agent has", "Remove the tool", "Eliminates the risk entirely"],
      ["The role needs the tool, but rarely, and the action is high-impact", "Keep it behind human approval", "Removing it would block real work"],
      ["The role needs a tool, but only part of it", "Replace with a narrower tool", "Keeps the job possible with less power"],
      ["Auditors need a record of what happened", "Add logging as well", "Logging supports, it never replaces, least privilege"]
    ]
  },
  "example": {
    "situation": "An internal HR assistant was connected to the full HR MCP server, which can read, edit and delete employee records. Staff only ask it policy questions and look up their own leave balance.",
    "decision": "Give it a read-only policy search tool and a leave-balance tool scoped to the signed-in employee. Remove edit and delete entirely.",
    "why": "Nothing in the role needs write access, so removing it closes the risk. Approval prompts on edits would still leave the capability one injected instruction away."
  },
  "questions": [
    {
      "stem": "A finance team's reporting agent reads ledger data and drafts monthly summaries. It was set up with the same service account as the payments system, which can also create and approve payments. The agent has never needed to move money. What should the architect change first?",
      "select": 1,
      "options": [
        "Add an alert that notifies finance whenever the agent creates a payment.",
        "Give the agent its own read-only account limited to ledger data.",
        "Require a human to confirm any payment the agent tries to approve.",
        "Add a system-prompt rule that the agent must never create payments."
      ],
      "key": [1],
      "why": "The deciding fact: the agent has never needed to move money. Least privilege removes the payment capability by giving it a read-only identity.",
      "traps": [
        "Works, but it only detects misuse after the payment exists.",
        null,
        "Works, but it keeps a capability the role never uses; it would fit if the role sometimes needed payments.",
        "Works, but a prompt rule is probabilistic and the permission is still there."
      ]
    }
  ]
}
```
