/* CCA-F Mock Exam #4 — exam-grade item bank.
   Design rules every item obeys:
     1. The stem carries real system state and numbers, not a one-line premise.
     2. All four options are things a competent architect might actually do.
     3. The discriminator is in the qualifier — "first step", "guarantees",
        "root cause", "least added complexity" — not in option plausibility.
     4. Every option carries a `why`, so a wrong pick teaches the boundary.
*/
window.EXAM = {
  minutes: 120,
  passMark: 0.72,

  scenarios: [
    {
      id: "s1",
      title: "Scenario 1 — Customer Support Resolution Agent",
      domains: "D1 Agentic Architecture · D2 Tool Design &amp; MCP · D5 Context &amp; Reliability",
      brief:
        "A retailer runs a tier-1 support agent on the <b>Claude Agent SDK</b>, handling ~12,000 tickets/week. " +
        "It is wired to four custom MCP tools: <code>get_customer</code>, <code>lookup_order</code>, " +
        "<code>process_refund</code>, <code>escalate_to_human</code>. Policy: refunds up to <b>$500</b> may be " +
        "issued by the agent; anything above requires human approval. Returns are accepted within <b>30 days</b> " +
        "of the order date. The programme target is <b>80% first-contact resolution</b>; it currently sits at " +
        "<b>61%</b>. Orders come from three backend systems with different data formats, and roughly 9% of orders " +
        "are guest checkouts with no customer account."
    },
    {
      id: "s2",
      title: "Scenario 2 — Code Generation with Claude Code",
      domains: "D3 Claude Code Configuration &amp; Workflows · D5 Context &amp; Reliability · D4 Prompt Engineering",
      brief:
        "A 40-engineer platform team uses <b>Claude Code</b> across a monorepo with three trees: " +
        "<code>services/</code> (Go), <code>web/</code> (React + TypeScript) and <code>infra/</code> (Terraform). " +
        "Each tree has its own conventions, and test files sit beside their sources throughout — " +
        "<code>*_test.go</code> and <code>*.test.tsx</code> alike. The root <code>CLAUDE.md</code> has grown to " +
        "roughly 900 lines. Engineers use Claude Code for generation, refactoring, debugging and codebase " +
        "exploration, and a handful maintain personal setups alongside the shared configuration."
    },
    {
      id: "s3",
      title: "Scenario 3 — Multi-Agent Research System",
      domains: "D1 Agentic Architecture · D2 Tool Design &amp; MCP · D5 Context &amp; Reliability",
      brief:
        "A market-intelligence firm runs a <b>coordinator agent</b> that delegates to four specialised subagents — " +
        "web search, document analysis, synthesis, and report generation — to produce cited research reports for " +
        "analysts. A typical report runs to ~4,000 words with inline citations and takes <b>8–14 minutes</b> and " +
        "roughly <b>$3</b> per run. The coordinator decomposes the analyst's question into subtasks, delegates, and " +
        "aggregates the results. Subagents are spawned with the <b>Task tool</b> and each runs in its own context."
    },
    {
      id: "s4",
      title: "Scenario 4 — Developer Productivity with Claude",
      domains: "D2 Tool Design &amp; MCP · D1 Agentic Architecture · D3 Claude Code Configuration",
      brief:
        "An engineer has joined a team owning a <b>400,000-line</b> Python and TypeScript service. They work in " +
        "<b>Claude Code</b> with the built-in tools (<code>Read</code>, <code>Write</code>, <code>Edit</code>, " +
        "<code>Bash</code>, <code>Grep</code>, <code>Glob</code>) plus MCP servers for GitHub and Jira. The same " +
        "repository also contains the <b>Terraform that manages production</b>, so tool permissions matter. The team " +
        "wants shared configuration to arrive with a clone, while leaving room for personal setups."
    },
    {
      id: "s5",
      title: "Scenario 5 — Claude Code for Continuous Integration",
      domains: "D3 Claude Code Configuration &amp; Workflows · D4 Prompt Engineering &amp; Structured Output",
      brief:
        "A fintech runs <b>Claude Code in GitHub Actions</b> across roughly <b>180 pull requests a week</b>. Three " +
        "workloads: an automated review that posts <b>inline comments at specific file and line</b>, test generation for " +
        "uncovered branches, and a <b>nightly technical-debt sweep</b> over about 2,000 files. The pre-merge review is " +
        "<b>blocking</b> — it must return within five minutes or the merge queue backs up. After a spike in " +
        "false positives, developers largely stopped reading the review comments, including the accurate ones."
    },
    {
      id: "s6",
      title: "Scenario 6 — Structured Data Extraction",
      domains: "D4 Prompt Engineering &amp; Structured Output · D5 Context &amp; Reliability · D1 Agentic Architecture",
      brief:
        "A logistics company extracts structured fields from commercial invoices and bills of lading — vendor, invoice " +
        "number, PO number, line items, totals, currency, Incoterm — and posts them to an ERP. Volume is about " +
        "<b>15,000 documents a month</b> across roughly <b>40 vendor formats</b>, including scanned faxes that arrive " +
        "via OCR. Six vendors account for most of the volume; the remaining thirty-four are a long tail. Extraction is " +
        "constrained by a <b>JSON schema</b> and passes through a validation-and-retry loop before posting."
    }
  ],

  questions: [

    /* ================= SCENARIO 1 ================= */

    {
      id: "s1-01", sid: "s1", domain: "D1 · Agentic Architecture", obj: "1.4 Enforcement & gates",
      trap: "Loosening a control instead of completing it", fam: 1, select: 1,
      question:
        "A <code>PreToolUse</code> gate already blocks <code>process_refund</code> until <code>get_customer</code> " +
        "has returned a verified customer ID — this eliminated the misidentified-account incidents it was built for. " +
        "But guest-checkout orders have no customer record, so <code>get_customer</code> returns <code>not_found</code> " +
        "and the gate never opens. All ~9% of guest-order refunds now escalate, and they are the single largest " +
        "contributor to the 19-point first-contact-resolution shortfall. Human agents resolve them by confirming the " +
        "order email plus the last four digits of the payment card. <b>Which change best restores resolution without " +
        "weakening the control?</b>",
      options: [
        { t: "Extend the gate's predicate to accept a second verification path — order email plus payment card last-four — which sets the same verified flag that opens process_refund",
          why: "Correct. The gate's job is 'refunds only after identity is established.' Guest orders can establish identity, just by a different route. Widening the predicate to cover a legitimate second path keeps the guarantee deterministic while removing the false block." },
        { t: "Add a second hook that sets the verified flag automatically when get_customer returns not_found, since a not_found result means there is no account to misidentify",
          why: "Incorrect, and the most dangerous option. It converts 'identity verified' into 'identity check skipped' for exactly the population where a wrong refund is hardest to trace. The gate would still appear green in logs while performing no verification at all." },
        { t: "Remove the gate and instead instruct the agent in the system prompt to verify identity by whichever method the order type allows, reinforced with few-shot examples of both paths",
          why: "Incorrect. This is the fix the gate was introduced to replace. Prompt instructions have a non-zero failure rate under load, and the earlier misidentification incidents are evidence that this specific instruction already failed in production." },
        { t: "Keep the gate as-is and classify guest-order refunds as a permanent escalation category, staffing the queue to absorb the volume",
          why: "Incorrect. It accepts the resolution shortfall as permanent rather than fixing it, and shifts a solvable engineering problem onto headcount. The stated goal is 80% first-contact resolution." }
      ],
      answer: [0],
      explanation:
        "When a deterministic gate blocks legitimate work, the question is whether the <em>guarantee</em> is wrong or the " +
        "<em>predicate</em> is incomplete. Here the guarantee is right and the predicate is too narrow. Widen the predicate; " +
        "never bypass the gate, and never regress to prompt-based compliance for business-critical ordering."
    },

    {
      id: "s1-02", sid: "s1", domain: "D2 · Tool Design & MCP", obj: "2.2 Structured error responses",
      trap: "Good practice applied to the wrong problem", fam: 4, select: 1,
      question:
        "<code>lookup_order</code> fails in two distinct ways: the order genuinely does not exist, or the order-database " +
        "read replica times out under load. Both currently return <code>isError: true</code> with the body " +
        "<code>\"Operation failed\"</code>. In ~4% of tickets the agent tells a customer their order does not exist when " +
        "in fact the lookup timed out — customers then dispute the charge with their bank. <b>Which change most directly " +
        "prevents the agent from making that false statement?</b>",
      options: [
        { t: "Return distinct structured errors carrying errorCategory (not_found vs transient), isRetryable, and a customer-safe description, so the agent can retry a timeout and only assert non-existence on a genuine not_found",
          why: "Correct. The agent's wrong statement comes from being unable to tell the two failures apart. Structured error metadata restores that distinction and tells the agent which recovery is legitimate — retry the transient, report the definite." },
        { t: "Have lookup_order retry internally with exponential backoff and return isError only after three failed attempts, so transient timeouts rarely surface to the agent",
          why: "Incorrect — genuinely good practice, but aimed at the wrong problem. It reduces how often the ambiguity arises without removing it: after three failures the agent still receives an undifferentiated 'Operation failed' and can still say 'your order does not exist.' It narrows the bug rather than fixing it." },
        { t: "Add a system-prompt rule: if lookup_order fails, never tell the customer the order does not exist — say the system is temporarily unavailable and offer to escalate",
          why: "Incorrect. It suppresses the false statement probabilistically, but it also destroys correct behaviour: real not_found cases now get an escalation instead of an accurate, resolvable answer. Fixing an information problem with an instruction discards the information." },
        { t: "Return isError: false with an empty order array on timeout, so the agent treats it as a normal empty result and moves on",
          why: "Incorrect. This is the documented anti-pattern of conflating an access failure with a valid empty result. It makes the failure invisible to the agent, to the coordinator, and to monitoring." }
      ],
      answer: [0],
      explanation:
        "The MCP <code>isError</code> flag says <em>that</em> something failed; only structured metadata says <em>what kind</em>. " +
        "Distinguish transient / validation / business / permission failures, and always distinguish an access failure from a " +
        "valid empty result — the recovery actions are opposite."
    },

    {
      id: "s1-03", sid: "s1", domain: "D1 · Agentic Architecture", obj: "1.5 Hooks & normalization",
      trap: "Making the model do deterministic work", fam: 5, select: 2,
      question:
        "Order dates arrive in three shapes depending on the backend: Unix epoch seconds (<code>1743638400</code>), " +
        "ISO 8601 with offset (<code>2026-04-03T00:00:00-07:00</code>), and a legacy integer " +
        "(<code>20260403</code>). The agent must decide whether an order falls inside the 30-day return window. " +
        "Audit shows eligibility is decided correctly for the first two systems and wrong about 1 time in 9 for the " +
        "legacy one — usually near month boundaries. <b>Select TWO changes that together make this determination " +
        "reliable.</b>",
      options: [
        { t: "Add a PostToolUse hook that normalizes all three date representations to a single canonical format before the tool result enters the model's context",
          why: "Correct. PostToolUse hooks exist to transform tool results before the model sees them. Normalizing at the boundary means the model never encounters format heterogeneity, and the fix holds for every future caller." },
        { t: "Have lookup_order return derived fields alongside the raw date — days_since_order and within_return_window — computed by the tool",
          why: "Correct. Date arithmetic is deterministic work with a right answer; computing it in the tool removes it from the model's judgement entirely. Combined with normalization, neither parsing nor arithmetic remains a source of error." },
        { t: "Add a system-prompt section documenting all three formats with worked conversion examples for each",
          why: "Incorrect. It teaches the model to do reliably-computable work approximately. It also costs tokens on every turn, and the observed failure mode — month boundaries — is exactly where instructed arithmetic degrades." },
        { t: "Add a convert_date MCP tool and instruct the agent to call it before evaluating any return-window question",
          why: "Incorrect. It is deterministic, but it depends on the model remembering to call it, adds a round-trip to every eligibility check, and leaves the raw ambiguous value in context alongside the converted one." },
        { t: "Raise the model's reasoning effort so it reasons more carefully about the date arithmetic before answering",
          why: "Incorrect. More reasoning does not resolve an ambiguous input: 20260403 is not self-describing. Spending inference on a data-representation problem is the wrong layer." }
      ],
      answer: [0, 1],
      explanation:
        "Two separate defects hide in one symptom — heterogeneous representation and model-performed arithmetic. Hooks fix " +
        "the first deterministically at the boundary; tool-computed derived fields fix the second by removing the computation " +
        "from the model. Anything a program can decide exactly should not be delegated to inference."
    },

    {
      id: "s1-04", sid: "s1", domain: "D1 · Agentic Architecture", obj: "1.4 Multi-concern decomposition",
      trap: "Over-engineering a single-turn problem", fam: 2, select: 1,
      question:
        "Review of escalated tickets finds that 30% are not policy problems at all — the customer raised several concerns " +
        "in one message (\"the blender arrived cracked, also I put the wrong address on my other order that ships Friday, " +
        "and when does my filter subscription renew?\") and the agent resolved only the first before ending the turn. The " +
        "customer replies asking about the rest, and that second contact is what breaks first-contact resolution. " +
        "<b>Which change most directly addresses this?</b>",
      options: [
        { t: "Have the agent decompose the opening message into an explicit list of distinct concerns, work each to a resolution or an escalation, and end the turn only when every item on the list is accounted for",
          why: "Correct. The failure is incomplete coverage of a multi-part request. Making the concern list explicit turns an implicit memory problem into a checkable one, and the completion condition becomes 'all items addressed' rather than 'one item addressed'." },
        { t: "Instruct the agent to close every response by asking whether there is anything else it can help with",
          why: "Incorrect. It relies on the customer to re-raise something they already raised, and the follow-up round-trip is precisely the second contact being measured. It also reads badly to a customer who just listed three things." },
        { t: "Spawn a subagent per concern via the Task tool and have a coordinator merge their replies into one response",
          why: "Incorrect — the classic over-engineering trap. It is a real pattern for genuinely parallel, context-heavy investigation, but here three tier-1 lookups are being answered by one agent in one turn. It adds orchestration, latency and context-passing burden to solve a scoping problem." },
        { t: "Raise max_tokens so responses have room to cover every concern the customer raised",
          why: "Incorrect. Nothing is being truncated — the agent is stopping because it believes it is done, not because it ran out of room. max_tokens has no bearing on which concerns the agent chose to address." }
      ],
      answer: [0],
      explanation:
        "Multi-concern requests fail on coverage, not capability. Decompose the request, track each concern to a terminal " +
        "state, and make the turn's completion condition depend on the list. Reach for subagents when isolation or parallel " +
        "investigation actually buys something — not for a three-item checklist."
    },

    {
      id: "s1-05", sid: "s1", domain: "D5 · Context & Reliability", obj: "5.2 Escalation calibration",
      trap: "Unreliable proxy for complexity", fam: 6, select: 1,
      question:
        "First-contact resolution sits at 61% against a target of 80%. Analysis of a labelled sample shows two error modes: " +
        "the agent escalates 22% of tickets that a human then resolved with no policy exception at all, and it attempts " +
        "6% of tickets that genuinely required a policy exception, sometimes promising remedies the company does not offer. " +
        "An engineer proposes having the model emit a self-assessed confidence score each turn and routing anything below " +
        "0.7 to a human. <b>Which is the most accurate evaluation of that proposal?</b>",
      options: [
        { t: "It will not reliably fix either error mode, because self-reported confidence is poorly calibrated against actual task complexity; explicit categorical escalation criteria plus few-shot examples contrasting escalate-versus-resolve address both directions",
          why: "Correct. Both error modes come from an unclear decision boundary, so the fix is to define the boundary categorically — explicit triggers (customer asks for a human, policy gap, cannot progress) with examples of near-miss cases on each side. Self-reported confidence is a documented unreliable proxy." },
        { t: "It will fix over-escalation but not under-escalation, so it should be paired with a sentiment check that escalates when the customer is angry",
          why: "Incorrect on both halves. It will not dependably fix over-escalation either, and sentiment is the other documented unreliable proxy — an angry customer may have a trivially resolvable problem, and a polite one may be describing a policy gap." },
        { t: "The approach is sound; the 0.7 threshold simply needs tuning against the historical ticket set until both error rates fall",
          why: "Incorrect. Tuning a threshold on a signal that does not track the underlying property moves the errors around rather than reducing them — you trade over-escalation for under-escalation along a curve that never reaches the target." },
        { t: "The approach is sound in principle but should be replaced by a dedicated classifier trained on the historical escalation labels, which would outperform a self-reported score",
          why: "Incorrect, and disproportionate. It introduces a model to train, serve, monitor and retrain in order to make a decision the agent can make correctly once the criteria are written down. Reach for it only after explicit criteria have been tried and measured." }
      ],
      answer: [0],
      explanation:
        "Escalation is a boundary problem. Both self-reported confidence and customer sentiment are proxies that do not " +
        "track complexity. Name the triggers categorically and demonstrate the ambiguous cases with few-shot examples — " +
        "that is what moves both error rates at once."
    },

    {
      id: "s1-06", sid: "s1", domain: "D5 · Context & Reliability", obj: "5.1 Preserving critical facts",
      trap: "Bigger context instead of fact preservation", fam: 5, select: 2,
      question:
        "In conversations past roughly twenty turns, the agent starts restating the refund amount incorrectly (quoting " +
        "$47.00 when the tool returned $47.99), asks for an order number the customer supplied fifteen turns earlier, and " +
        "refers to \"our usual returns policy\" instead of the specific window it looked up. <code>get_customer</code> " +
        "returns 40+ fields per call, of which the workflow uses five. <b>Select TWO changes that best preserve " +
        "resolution-critical facts.</b>",
      options: [
        { t: "Maintain a structured case-facts block — verified customer ID, order ID, exact refund amount, return-window expiry, commitments already made — and re-emit it at the top of context each turn",
          why: "Correct. It gives the exact values a durable home that survives the middle of the conversation, and placing it at the top uses the position models process most reliably. Exact figures and commitments are what a support transcript cannot afford to blur." },
        { t: "Trim each tool result to the fields the workflow actually consumes before it enters context",
          why: "Correct. Forty-plus fields per call, accumulated over twenty turns, is the bulk of the context pressure — and none of the discarded fields are load-bearing. Reducing the noise is what keeps the signal reachable." },
        { t: "Summarize the conversation into a short paragraph every ten turns and drop the turns it replaces",
          why: "Incorrect, and it causes the reported symptom. Progressive summarization is exactly what turns '$47.99' into 'a refund' and a specific 30-day window into 'our usual policy'. Precise figures are the first casualty of compression." },
        { t: "Move to a larger-context model so no history has to be dropped",
          why: "Incorrect. Nothing is being dropped — the facts are still in the window, just buried mid-context where recall degrades. More room to bury them does not make them easier to find." },
        { t: "Invoke /compact once context usage passes 70% to reclaim room",
          why: "Incorrect on two counts: /compact is a Claude Code command, not an Agent SDK mechanism for this deployment, and compaction is a form of the same lossy summarization that produces the symptom." }
      ],
      answer: [0, 1],
      explanation:
        "Two forces degrade long conversations: verbose tool output crowding the window, and the middle of a long context " +
        "being processed less reliably than its ends. Trimming addresses the first; a re-emitted facts block pinned to the " +
        "top addresses the second. Summarization treats the symptom by destroying the very values that must survive."
    },

    {
      id: "s1-07", sid: "s1", domain: "D2 · Tool Design & MCP", obj: "2.3 Tool distribution",
      trap: "Fixing breadth with better descriptions", fam: 4, select: 1,
      question:
        "Over eighteen months the tier-1 agent has accumulated 19 tools. Alongside the four core ones sit back-office " +
        "capabilities — <code>issue_credit_memo</code>, <code>adjust_inventory</code>, <code>reprocess_payment</code>, " +
        "<code>override_price</code> and others — each used in well under 1% of tickets but occasionally reached for " +
        "inappropriately. Selection accuracy on the four core tools has measurably declined since the count passed " +
        "roughly a dozen. <b>Which restructuring most directly addresses the decline?</b>",
      options: [
        { t: "Keep the small set of high-frequency tools on the tier-1 agent and move the rare back-office tools onto a specialist agent that tier-1 hands off to when they are genuinely needed",
          why: "Correct. Selection reliability degrades with the size of the candidate set — this is the 18-versus-4 effect directly. Scoping each agent to the tools its role actually needs restores a small choice space, and specialization also stops off-role tools being misused." },
        { t: "Keep all 19 tools but rewrite every description to be longer and more sharply differentiated from its neighbours",
          why: "Incorrect — the strongest distractor. Better descriptions genuinely help when two similar tools are confused, and are the right first move for that problem. They do not undo the degradation that comes from the sheer size of the candidate set, and 19 long descriptions add substantial per-turn token cost." },
        { t: "Consolidate the 19 tools into four generic tools that take an action parameter selecting the specific operation",
          why: "Incorrect. It reduces the tool count on paper while moving the same ambiguity into a parameter the model must now choose correctly — with no per-operation input schema, no per-operation description, and weaker validation than distinct tools provide." },
        { t: "Set tool_choice to \"any\" so the agent is required to call a tool rather than answering from memory",
          why: "Incorrect. tool_choice governs whether a tool is called, not which one. Forcing a call when the candidate set is already too large makes wrong selections more likely, not less." }
      ],
      answer: [0],
      explanation:
        "Two different tool-selection failures have two different fixes. Confusion between a few similar tools is a " +
        "<em>description</em> problem. Degradation as the catalogue grows is a <em>distribution</em> problem — solved by " +
        "scoping tools to roles and handing off, with limited cross-role exceptions for genuinely high-frequency needs."
    },

    {
      id: "s1-08", sid: "s1", domain: "D2 · Tool Design & MCP", obj: "2.1 Tool descriptions",
      trap: "Enforcement at the wrong layer", fam: 4, select: 1,
      question:
        "<code>escalate_to_human</code> is described as: <em>\"Escalate the conversation to a human manager or " +
        "supervisor.\"</em> Logs show the agent invokes it whenever the customer's message contains the word " +
        "\"manager\" — including \"my account manager set this up for me\" and \"I manage the office supplies budget\" — " +
        "producing a large share of the unnecessary escalations. <b>What is the most effective first step?</b>",
      options: [
        { t: "Rewrite the description around the behavioural conditions that should trigger it — the customer explicitly asks for a human, the request falls in a policy gap, or the agent cannot make progress — and name the conditions that should not trigger it",
          why: "Correct. The description is the primary mechanism the model uses for tool selection, and this one describes the recipient rather than the trigger. Its only distinctive keyword is 'manager', so the model has learned an association with the word rather than the situation. Rewriting it is low-effort and hits the root cause." },
        { t: "Add a PreToolUse hook that blocks escalate_to_human unless the customer's message matches a request-for-a-human pattern",
          why: "Incorrect. It is deterministic, but it enforces at the wrong layer and over-constrains: two of the three legitimate triggers — a policy gap and an inability to progress — have nothing to do with the customer's wording, and this hook would block both." },
        { t: "Add six few-shot examples in the system prompt showing conversations where the word 'manager' appears but escalation is not warranted",
          why: "Incorrect as a first step. Few-shot examples do help, and would be a reasonable second move, but they add per-turn tokens to compensate for a description that still misdescribes the tool. Fix the description first, then measure whether examples are still needed." },
        { t: "Remove the words 'manager' and 'supervisor' from the tool description so the keyword association cannot form",
          why: "Incorrect. It suppresses one symptom and leaves the description with almost no selection signal at all, which trades over-triggering for unreliable triggering. The problem is that the description never stated the conditions." }
      ],
      answer: [0],
      explanation:
        "Tool descriptions drive selection, and keyword-sensitive wording creates unintended associations. Describe " +
        "<em>when to call the tool</em> — trigger conditions, boundaries, and explicit non-triggers — not who is on the " +
        "other end of it."
    },

    {
      id: "s1-09", sid: "s1", domain: "D1 · Agentic Architecture", obj: "1.1 The agentic loop",
      trap: "Symptom mistaken for cause", fam: 3, select: 1,
      question:
        "The control loop is implemented as: send the request; if <code>stop_reason</code> is <code>\"tool_use\"</code>, " +
        "execute the requested tool, then send a fresh user message containing the tool's output rendered as readable " +
        "prose — the assistant turn that requested the tool is not appended to the history. Symptoms: the agent " +
        "re-requests <code>lookup_order</code> for an order it just looked up, and has twice told a customer a refund " +
        "was issued when no <code>process_refund</code> call was ever made. <b>What is the root cause?</b>",
      options: [
        { t: "Dropping the assistant turn and reformatting results as prose breaks the tool_use / tool_result pairing, so the conversation contains no record that a specific call was made and executed",
          why: "Correct. The loop's contract is that the assistant turn is appended verbatim and answered by a user turn containing a tool_result for every tool_use id. Discarding the assistant turn erases the request; prose erases the linkage. The model sees narrative text with no evidence of its own actions — hence repeat calls and imagined completions." },
        { t: "max_tokens is too low, truncating the assistant turn mid-tool_use so the call is malformed",
          why: "Incorrect. Truncation would surface as a max_tokens stop reason and visibly broken calls, not as clean repeated calls. It also cannot explain the agent claiming a refund it never requested." },
        { t: "The loop lacks an iteration cap, so it runs on until the model produces something that looks like a conclusion",
          why: "Incorrect. Repetition is the symptom, not the cause, and an iteration cap as the primary termination mechanism is itself an anti-pattern — terminate on stop_reason \"end_turn\"." },
        { t: "Temperature is too high, making tool selection non-deterministic across otherwise identical states",
          why: "Incorrect. The states are not identical — history is being rewritten between iterations. Sampling variance does not cause an agent to assert a refund that no call performed." }
      ],
      answer: [0],
      explanation:
        "The loop is a strict contract: inspect <code>stop_reason</code>, append the assistant turn verbatim, and reply " +
        "with a <code>tool_result</code> for every <code>tool_use</code> id. Results are appended so the model can reason " +
        "over what it actually did. Paraphrasing results into prose destroys that record."
    },

    {
      id: "s1-10", sid: "s1", domain: "D1 · Agentic Architecture", obj: "1.4 Handoff patterns",
      trap: "Completeness confused with usefulness", fam: 7, select: 1,
      question:
        "When the agent escalates, it currently attaches the entire conversation transcript. Human agents report that " +
        "picking up an escalation now takes longer than handling the ticket from scratch: they read twenty-plus turns to " +
        "extract four facts, and the verified customer ID is often buried mid-transcript. <b>Which handoff design best " +
        "serves the receiving human?</b>",
      options: [
        { t: "Compile a structured handoff summary — verified customer ID, order ID, root cause, refund amount attempted, the specific policy blocker, and a recommended action — with the full transcript attached but secondary",
          why: "Correct. A handoff exists so someone who was not present can act. Structured fields put the decision-relevant values where they can be read at a glance, and keeping the transcript available means nothing is lost for the cases that need it." },
        { t: "Continue attaching the full transcript, since any summarization risks omitting a detail the human would have needed",
          why: "Incorrect. It optimises for completeness over usability, and the measured cost is real: handoffs now take longer than fresh tickets. Completeness is preserved by attaching the transcript, not by making it the primary artefact." },
        { t: "Replace the transcript with a single reason code drawn from a fixed enum of escalation categories",
          why: "Incorrect — the opposite error. A category tells the human why the agent gave up but none of what it established: no customer ID, no amount, no root cause. They restart the investigation." },
        { t: "Attach only the last five turns, on the basis that the resolution-relevant context is almost always recent",
          why: "Incorrect. An arbitrary window is not a summary. The verified customer ID is typically established early, so a recency window is likely to cut exactly the fact the human needs first." }
      ],
      answer: [0],
      explanation:
        "Design handoffs for the reader's decision, not for the sender's convenience. Structured facts — identity, root " +
        "cause, amounts, the blocking policy, a recommended action — let a human act immediately; the transcript stays " +
        "attached as evidence for the minority of cases that need it."
    },

    /* ================= SCENARIO 2 ================= */

    {
      id: "s2-01", sid: "s2", domain: "D3 · Claude Code Config", obj: "3.1/3.3 Memory hierarchy & path rules",
      trap: "Modular-looking but still always loaded", fam: 8, select: 1,
      question:
        "The root <code>CLAUDE.md</code> has grown to about 900 lines covering Go service conventions, React/TypeScript " +
        "conventions, Terraform standards, the security checklist and the release process. Two complaints recur: Claude " +
        "cites React conventions while editing Go files, and the whole file is loaded on every turn of every session. " +
        "Complicating matters, the test-file conventions apply to <code>*_test.go</code> and <code>*.test.tsx</code> " +
        "alike, and those files sit beside their sources throughout all three trees. <b>Which restructuring best fixes " +
        "both complaints?</b>",
      options: [
        { t: "Keep only the genuinely universal standards in the root CLAUDE.md and move area-specific and test-file conventions into .claude/rules/ files carrying YAML paths globs, so each set loads only when a matching file is being edited",
          why: "Correct. Glob-scoped rules solve both problems at once: irrelevant conventions are not in context to be mis-cited, and they cost no tokens when they do not apply. Crucially, globs like **/*.test.tsx follow the file pattern regardless of which directory the file lives in — which is what the scattered test files require." },
        { t: "Split the file into three CLAUDE.md files placed at services/, web/ and infra/, leaving the root file with only the release process",
          why: "Incorrect — close, and right for the three language trees, but it cannot express the test-file conventions. Directory-level CLAUDE.md is bound to a directory subtree; a convention that applies to every *.test.tsx across three trees has no single directory to live in." },
        { t: "Break the content into four modular files and reference them from the root CLAUDE.md using @import syntax",
          why: "Incorrect — the strongest distractor, because @import is real and the result genuinely is modular. But imported files are pulled in unconditionally, so the loaded context is the same 900 lines. It improves how the team maintains the file and does nothing for either reported complaint." },
        { t: "Convert each convention set into a skill under .claude/skills/ so engineers load the relevant one when they need it",
          why: "Incorrect. Skills are on-demand task workflows requiring invocation; conventions must apply automatically whenever a matching file is touched. Nobody will remember to invoke the Go conventions before editing Go." }
      ],
      answer: [0],
      explanation:
        "CLAUDE.md is for standards that are always true. <code>.claude/rules/</code> with <code>paths:</code> globs is for " +
        "conventions that are conditionally true — and it is the only mechanism that scopes by file pattern rather than by " +
        "directory. <code>@import</code> aids maintainability, not context economy."
    },

    {
      id: "s2-02", sid: "s2", domain: "D3 · Claude Code Config", obj: "3.2 Skills vs commands vs memory",
      trap: "Always-loaded home for on-demand work", fam: 8, select: 1,
      question:
        "A 200-line <code>migrate-endpoint</code> procedure — read the OpenAPI spec, scan the existing handler tree for " +
        "the closest analogue, generate handler and tests, update the router, run the suite — currently lives pasted into " +
        "the root <code>CLAUDE.md</code>. Six engineers run it perhaps twice a week. Its scanning step emits a large volume " +
        "of output the rest of the session has no use for, and the team wants it restricted so it can never touch " +
        "<code>infra/</code>. <b>Where does this procedure belong?</b>",
      options: [
        { t: "A skill under .claude/skills/ with SKILL.md frontmatter declaring allowed-tools and context: fork, so it runs on demand in an isolated context and its scan output never enters the main conversation",
          why: "Correct. Every stated requirement maps to a skill's frontmatter: on-demand invocation for twice-weekly use, allowed-tools for the infra/ restriction, and context: fork to keep the noisy scan in a sub-agent context. Committed under .claude/skills/, it is shared with the team." },
        { t: "Leave it in CLAUDE.md, where it is always available and nobody has to remember to invoke it",
          why: "Incorrect. It charges 200 lines of procedure to every turn of every session, including the vast majority that will never migrate an endpoint — and CLAUDE.md offers no tool restriction and no context isolation." },
        { t: "A project slash command in .claude/commands/migrate-endpoint.md, committed to the repo",
          why: "Incorrect — the closest miss. Commands are shared and on-demand, which satisfies two requirements, but a command is a prompt template: it has no frontmatter for tool restriction and no context: fork, so the infra/ boundary and the output isolation are both unmet." },
        { t: "Define it as a subagent with its own system prompt and tool allowlist, invoked via the Task tool",
          why: "Incorrect. It would achieve isolation and tool scoping, but at the cost of building agent orchestration for a procedure a skill expresses declaratively. Reach for a subagent when you need delegation and aggregation, not to run a checklist." }
      ],
      answer: [0],
      explanation:
        "Match the mechanism to the shape of the work. CLAUDE.md = always-loaded universal standards. Slash command = " +
        "shared prompt shortcut. Skill = on-demand workflow that can declare <code>allowed-tools</code>, " +
        "<code>argument-hint</code> and <code>context: fork</code>. Only the skill carries tool restriction plus context isolation."
    },

    {
      id: "s2-03", sid: "s2", domain: "D3 · Claude Code Config", obj: "3.4 Plan mode vs direct execution",
      trap: "Assuming the decision away", fam: 3, select: 1,
      question:
        "A task lands: add soft-delete to the orders domain. That means a <code>deleted_at</code> column, plus filtering " +
        "at roughly 60 query sites across <code>services/orders</code> and two dependent services. Three approaches are " +
        "all defensible — filter in the base repository, add an explicit predicate at each call site, or expose a " +
        "filtered database view — and they differ sharply in how they behave for the reporting service that deliberately " +
        "needs deleted rows. <b>Which working mode fits, and why?</b>",
      options: [
        { t: "Plan mode — the change spans many files and several services, multiple approaches are genuinely viable, and the choice has architectural consequences that are expensive to reverse once 60 sites are edited",
          why: "Correct. This is the canonical plan-mode profile: large scope, multiple valid approaches, an architectural decision, and a dependency (the reporting service) that the wrong choice silently breaks. Exploring and deciding before editing is what prevents 60 sites of rework." },
        { t: "Direct execution — once you settle on base-repository filtering the remaining work is mechanical, so pick that approach and proceed",
          why: "Incorrect. It assumes away the actual difficulty. Base-repository filtering is precisely the approach that would hide deleted rows from the reporting service that needs them, and deciding by assertion is what plan mode exists to prevent." },
        { t: "Direct execution with a single comprehensive instruction that enumerates all 60 call sites and the intended change at each",
          why: "Incorrect. It presumes you already know all 60 sites and how each behaves — knowledge that comes from the exploration you are skipping. It also still contains an unexamined approach decision." },
        { t: "Start in direct execution and switch to plan mode if the change turns out to be more entangled than expected",
          why: "Incorrect. The entanglement is stated in the brief, not discovered later. Deferring the decision means discovering it after edits are already in the working tree." }
      ],
      answer: [0],
      explanation:
        "Plan mode is for large-scale changes, multi-file modifications, architectural decisions and situations with " +
        "several valid approaches. Direct execution is for well-scoped changes with one obvious implementation. The tell " +
        "here is that a stakeholder — the reporting service — is affected differently by each candidate approach."
    },

    {
      id: "s2-04", sid: "s2", domain: "D3 · Claude Code Config", obj: "3.5 Iterative refinement",
      trap: "More prose for an ambiguity problem", fam: 5, select: 2,
      question:
        "An engineer has rewritten the same prose spec for a log-redaction transform four times. Each run Claude " +
        "implements it differently: sometimes it replaces the whole object containing a sensitive key, sometimes only " +
        "that key's value; nested arrays of objects are handled differently every time; and it is inconsistent about " +
        "whether an already-redacted value should be re-redacted. <b>Select TWO changes that most effectively pin down " +
        "the intended behaviour.</b>",
      options: [
        { t: "Supply two or three concrete input/output pairs, chosen so that they include a nested array of objects and an already-redacted value",
          why: "Correct. Concrete input/output examples communicate a transformation far more precisely than prose, and choosing the examples to cover the exact cases that vary between runs removes the ambiguity where it actually lives." },
        { t: "Write failing tests for the disputed cases first, share the failures, and iterate until they pass",
          why: "Correct. Test-driven iteration turns the specification into an executable contract and gives a concrete failure signal to refine against, rather than another round of interpretation." },
        { t: "Expand the prose specification with more detail and precise terminology for each case",
          why: "Incorrect. Four rewrites of the prose have already failed. Adding more of the thing that is not working is the least likely fix, and longer specs introduce fresh ambiguities of their own." },
        { t: "Add an explicit list of behaviours to avoid, so the model is steered away from the wrong interpretations",
          why: "Incorrect. Negative constraints define a boundary without defining the target — the model can obey every prohibition and still pick a fourth wrong reading. Show the intended output instead." },
        { t: "Reduce sampling temperature so the same prompt produces the same implementation each time",
          why: "Incorrect. It would make the output consistent without making it correct — the model would simply produce the same wrong interpretation reliably. Consistency is not the goal; the goal is the right transform." }
      ],
      answer: [0, 1],
      explanation:
        "When prose has failed repeatedly, stop writing prose. Concrete input/output examples and test-driven iteration " +
        "both replace description with demonstration — and they compose: the examples define intent, the tests verify it."
    },

    {
      id: "s2-05", sid: "s2", domain: "D3 · Claude Code Config", obj: "3.2 Command scoping",
      trap: "Personal scope for shared assets", fam: 8, select: 1,
      question:
        "The team wants an <code>/rfc</code> command that scaffolds an architecture-decision record. Three requirements: " +
        "every engineer must have it immediately on clone with no manual setup; the same command is needed in a second " +
        "repository the team owns; and eight of the forty engineers want a personal variant that also opens a draft " +
        "Slack message. <b>Which arrangement satisfies all three?</b>",
      options: [
        { t: "Commit the canonical command to .claude/commands/ in each repository, and let the eight engineers keep their variant under a different name in their own ~/.claude/commands/",
          why: "Correct. Project-scoped commands are version-controlled, so they arrive with the clone in both repos with no setup. User-scoped commands are personal and unshared, which is exactly the right home for a variant eight people want and the other thirty-two do not." },
        { t: "Maintain one canonical copy in ~/.claude/commands/ and have engineers sync it from a shared location during onboarding",
          why: "Incorrect. User-level commands are not distributed by version control, so this fails the no-manual-setup requirement outright and guarantees the forty copies drift apart." },
        { t: "Document the RFC prompt as a section of the root CLAUDE.md in both repositories so it is always in context",
          why: "Incorrect. CLAUDE.md supplies context, not invocable commands — there would be no /rfc to run. It also loads the scaffold text into every unrelated session." },
        { t: "Create the command in one repository's .claude/commands/ and symlink to it from the second repository",
          why: "Incorrect. The link resolves only for engineers who have both repos checked out in the expected relative layout, so it breaks on a fresh clone of the second repo — and it says nothing about the personal variant." }
      ],
      answer: [0],
      explanation:
        "The scoping question is always the same: who must have it, and does it belong to the project or the person? " +
        "Shared and required → <code>.claude/commands/</code>, committed. Personal or experimental → " +
        "<code>~/.claude/commands/</code>, which version control deliberately does not distribute."
    },

    {
      id: "s2-06", sid: "s2", domain: "D3 · Claude Code Config", obj: "3.1 Memory precedence & /memory",
      trap: "Changing shared config to diagnose a local issue", fam: 2, select: 1,
      question:
        "An engineer reports that Claude keeps ignoring a naming convention they added. They put it in their own " +
        "<code>~/.claude/CLAUDE.md</code>. The project root <code>CLAUDE.md</code> states a conflicting convention, and " +
        "a <code>.claude/rules/</code> file scoped to <code>paths: [\"web/**/*.tsx\"]</code> states a third. They are " +
        "editing <code>web/src/Button.tsx</code>. <b>What is the most useful first diagnostic step?</b>",
      options: [
        { t: "Run /memory to see exactly which memory files are loaded in this session and directory, then reason about precedence from what is actually in context",
          why: "Correct. Three sources plausibly apply and the engineer is guessing which one wins. /memory exists precisely to make the loaded set observable — a thirty-second check that turns speculation into fact before anyone edits shared configuration." },
        { t: "Remove the conflicting entry from the project CLAUDE.md so the user-level convention is the only one that applies",
          why: "Incorrect. It changes the convention for all forty engineers to resolve one person's complaint, and it does so before establishing that the project file is even the source of the conflict — the path-scoped rule is at least as likely." },
        { t: "Move the engineer's personal convention into the project CLAUDE.md so it sits at the same level as the rule it conflicts with",
          why: "Incorrect for the same reason, and worse: it promotes an individual preference to a team standard as a debugging step, and still leaves the path-scoped rule unexamined." },
        { t: "Restart Claude Code so the memory files are re-read from disk",
          why: "Incorrect. Nothing suggests a stale-cache problem; the symptom is a genuine three-way conflict. Restarting reloads the same conflict and yields no information about which file won." }
      ],
      answer: [0],
      explanation:
        "Memory is hierarchical — user level, project level, directory level, plus path-scoped rules — and conflicts are " +
        "resolved by what is actually loaded. <code>/memory</code> makes that observable. Diagnose before editing shared " +
        "configuration."
    },

    {
      id: "s2-07", sid: "s2", domain: "D5 · Context & Reliability", obj: "5.4 Large-codebase exploration",
      trap: "Refreshing a degraded context by adding to it", fam: 5, select: 1,
      question:
        "Three hours into exploring an unfamiliar 400,000-line service, an engineer notices the answers have changed " +
        "character. Claude now gives inconsistent accounts of where request authentication happens, and describes " +
        "\"typical middleware patterns\" rather than the specific interceptor file it identified by name two hours " +
        "earlier. No error has occurred and the session is still responding normally. <b>What is happening, and what is " +
        "the best response?</b>",
      options: [
        { t: "Context degradation — persist the findings established so far into a scratchpad file, and delegate further verbose exploration to a subagent that returns summaries rather than raw output",
          why: "Correct. Generic-pattern answers replacing specific earlier findings, plus inconsistency across repeats, are the textbook signals. The remedy has two halves: externalise what has been learned so it survives any context boundary, and stop the next phase of exploration from consuming the window the same way." },
        { t: "The model lacks familiarity with this framework; supply its documentation so it can reason from the real middleware model",
          why: "Incorrect. It correctly identified the specific interceptor two hours ago, which establishes that the knowledge was available. Something changed in the session, not in the model. Adding documentation consumes more of the resource already under pressure." },
        { t: "Raise max_tokens so responses have room to include the specific findings rather than generalities",
          why: "Incorrect. The answers are vague, not truncated. max_tokens bounds the response, not what the model can still reliably recall from a long context." },
        { t: "Ask Claude to re-read the authentication package end to end so the details are fresh in context",
          why: "Incorrect, and counterproductive — the most tempting wrong answer. It responds to an overloaded context by adding a large volume of new content to it, pushing the earlier findings further into the region that is already being recalled unreliably." }
      ],
      answer: [0],
      explanation:
        "Learn the signature: inconsistent answers, and appeals to typical patterns in place of specific findings the " +
        "session previously made. Scratchpad files persist findings across boundaries; subagent delegation keeps verbose " +
        "discovery out of the main context in the first place."
    },

    {
      id: "s2-08", sid: "s2", domain: "D5 · Context & Reliability", obj: "5.4 Subagent isolation",
      trap: "Same volume, different doorway", fam: 3, select: 1,
      question:
        "An engineer needs every place the codebase constructs a database connection outside the shared pool. A content " +
        "search returns roughly 4,000 matching lines, the overwhelming majority from vendored dependencies and generated " +
        "clients. After that output lands in the conversation, the session can no longer hold the refactor plan they were " +
        "building — Claude starts losing track of which call sites had already been triaged. <b>What is the best way to " +
        "run this discovery?</b>",
      options: [
        { t: "Delegate the discovery to an Explore subagent that performs the search in its own context and returns only the qualifying call sites with file and line references",
          why: "Correct. This is exactly what subagent isolation is for: the 4,000 lines are consumed and triaged inside the subagent's context, and the main conversation receives a short, structured list. The refactor plan stays intact because the raw output never enters its window." },
        { t: "Run the search in Bash redirecting output to a file, then have Claude read the file when it needs the results",
          why: "Incorrect — the most tempting wrong answer, because it looks like it defers the cost. It only moves where the volume enters: reading the file loads the same 4,000 lines into the same conversation. Writing to disk helps only if something filters before the read." },
        { t: "Narrow the search with exclusion patterns for vendored and generated directories, accepting that some legitimate call sites may be missed",
          why: "Incorrect. Narrowing is sensible hygiene and worth doing, but here it is offered as a trade against completeness on a task whose entire purpose is finding every site — and it still returns raw output into the main context." },
        { t: "Run the search as-is and then invoke /compact to reclaim the context it consumed",
          why: "Incorrect. Compaction runs after the damage, and it is lossy: it may well compress away the triage state — which is precisely what is already being lost." }
      ],
      answer: [0],
      explanation:
        "Verbose discovery should be isolated, not merely relocated. A subagent reads the noise in its own context and " +
        "returns the signal; a file redirect changes nothing once the file is read, and <code>/compact</code> is a recovery " +
        "measure, not a containment strategy."
    },

    {
      id: "s2-09", sid: "s2", domain: "D4 · Prompt Engineering", obj: "4.1 Explicit criteria",
      trap: "Hedging language instead of categorical criteria", fam: 3, select: 1,
      question:
        "Engineers run a pre-push self-review with the prompt \"review this diff for anything questionable\". A typical " +
        "run returns about 40 comments, most of them naming preferences the repository has no position on — variable " +
        "naming, whether a helper should be extracted, an import order the linter does not enforce. The two or three " +
        "genuinely useful findings are buried, and engineers have started skipping the step. <b>Which change most " +
        "improves precision?</b>",
      options: [
        { t: "Replace the vague instruction with categorical criteria that define what qualifies as a finding — for example, flag a comment only when the behaviour it claims contradicts the code beneath it — and state explicitly which categories to ignore",
          why: "Correct. \"Anything questionable\" has no boundary, so everything qualifies. Explicit categorical criteria, expressed as testable conditions rather than adjectives, give the model a decision rule — and naming the ignore categories removes the stylistic bulk directly." },
        { t: "Append \"be conservative and only report high-confidence issues\" to the existing prompt",
          why: "Incorrect. Hedging adjectives do not improve precision the way categorical criteria do: the model has no shared definition of high-confidence, and its confidence in a style opinion may be perfectly high. This is a documented non-fix." },
        { t: "Cap the output at the five most important findings",
          why: "Incorrect. It shortens the list without changing what the model considers a finding, so a run dominated by style opinions returns the five most important style opinions — and can now push out a real defect that previously at least appeared." },
        { t: "Run the review three times and keep only findings that appear in at least two runs",
          why: "Incorrect. It triples cost, and it filters on repeatability rather than validity — consistent style opinions survive while a subtle real bug caught in only one run is discarded. Suppressing intermittently-detected real defects is the wrong trade." }
      ],
      answer: [0],
      explanation:
        "Precision comes from categorical criteria, not from adjectives, caps or voting. Say what counts as a finding in " +
        "terms that can be checked against the code, and say what to ignore — high-false-positive categories erode trust " +
        "in the accurate ones."
    },

    {
      id: "s2-10", sid: "s2", domain: "D4 · Prompt Engineering", obj: "4.6 Independent review instances",
      trap: "Treating a structural bias as a prompt-quality problem", fam: 4, select: 1,
      question:
        "After a session generates a 600-line billing module, the engineer asks that same session to review it for " +
        "correctness. It reports the implementation looks correct. A colleague then opens a fresh session, pastes the " +
        "file with the plain prompt \"review this for correctness bugs\", and finds two real defects — an off-by-one in " +
        "a proration boundary and a currency rounding error. <b>What best explains the difference, and what should the " +
        "team change?</b>",
      options: [
        { t: "The generating session carries the reasoning that produced the code and is unlikely to question its own assumptions; route reviews to an independent instance with no generation history",
          why: "Correct. The variable that changed was session context, not prompt quality — the colleague used a plainer prompt and still found the defects. A session that decided the proration boundary is the least likely reader to re-examine it, because to that session it is a settled decision rather than a claim." },
        { t: "The review prompt was too vague; adding explicit criteria for boundary conditions and monetary rounding would have surfaced both defects",
          why: "Incorrect — the strongest distractor, because explicit criteria really are the right fix for a different problem. Here they are ruled out by the evidence: the successful review used a vaguer prompt. Criteria would help both instances; they do not explain why one failed." },
        { t: "The review pass should have run with extended thinking enabled so the model reasoned more deeply before concluding",
          why: "Incorrect. More reasoning inside the same session reasons from the same assumptions. Depth does not overcome the bias of reviewing your own decisions; independence does." },
        { t: "The context was too full by review time; compacting the session and re-reviewing would have recovered the necessary detail",
          why: "Incorrect. Compaction would retain the summarised conclusions of the generation phase — the very assumptions that need challenging — while discarding detail. It also does not explain a fresh session succeeding with less information." }
      ],
      answer: [0],
      explanation:
        "Self-review has a structural limit: a session retains its generation reasoning and treats its own decisions as " +
        "settled. Independent instances catch subtler issues than self-review or extended thinking, which is why " +
        "CI review should not run inside the session that produced the change."
    },

    /* ================= SCENARIO 3 ================= */

    {
      id: "s3-01", sid: "s3", domain: "D1 · Agentic Architecture", obj: "1.2 Decomposition coverage",
      trap: "Validating against the plan instead of the request", fam: 3, select: 1,
      question:
        "An analyst asks for a report on how AI is reshaping the creative industries. Every subagent completes without " +
        "error, and the coordinator's gap-evaluation step — which reviews the synthesis for missing material and can " +
        "re-delegate — reports full coverage. The delivered report nevertheless discusses only visual arts. Inspection " +
        "shows the coordinator decomposed the question into four subtasks: digital art, graphic design, photography and " +
        "illustration. Music, writing and film are absent throughout. <b>What is the root cause?</b>",
      options: [
        { t: "The gap-evaluation step measures the synthesis against the coordinator's own subtask list rather than against the analyst's original question, so a decomposition that omitted whole domains certifies itself as complete",
          why: "Correct. The decomposition is the first defect, but the reason it went undetected is that the safety net is anchored to the wrong reference. Any check that validates output against the plan can only catch execution failures, never planning failures — and this was a planning failure." },
        { t: "The web-search subagent's queries lacked the recall to surface music, writing and film sources",
          why: "Incorrect. The search subagent was never asked about them: its scope came from the four visual-arts subtasks it was given, and within that scope it performed correctly. Search recall cannot compensate for a topic that was never assigned." },
        { t: "The document-analysis subagent discarded non-visual sources as off-topic relative to the brief it was given",
          why: "Incorrect for the same reason, and it describes correct behaviour. A subagent that filters to its assigned scope is doing its job; the fault is upstream in how that scope was drawn." },
        { t: "The synthesis subagent dropped claims that lacked strong citation support, which disproportionately affected the newer creative domains",
          why: "Incorrect. Nothing indicates material about music, writing or film ever reached synthesis. You cannot drop what was never gathered." }
      ],
      answer: [0],
      explanation:
        "Overly narrow decomposition produces incomplete coverage of broad topics, and subagents completing successfully " +
        "is no evidence against it — they succeed within whatever scope they were handed. A gap check is only useful if it " +
        "evaluates against the original request."
    },

    {
      id: "s3-02", sid: "s3", domain: "D1 · Agentic Architecture", obj: "1.3 Subagent context passing",
      trap: "Assuming inherited context", fam: 9, select: 1,
      question:
        "The coordinator retrieves and summarises three regulatory PDFs, then spawns a document-analysis subagent with " +
        "the prompt \"analyse the three documents we discussed and extract the compliance deadlines\". The subagent's " +
        "report re-derives conclusions the coordinator had already reached, contradicts one of them, and cites a fourth " +
        "document nobody asked about. The engineer who wrote the prompt expected the subagent to have the coordinator's " +
        "conversation available. <b>What is the correct understanding and fix?</b>",
      options: [
        { t: "Subagents run in isolated context and inherit nothing from the coordinator; the three documents, the prior summaries and the specific extraction target must all be included explicitly and completely in the spawn prompt",
          why: "Correct. \"The three documents we discussed\" refers to a conversation the subagent has never seen, so it has no referent — which is why it went looking for its own documents. Complete prior-agent findings belong in the spawn prompt itself." },
        { t: "The subagent's context window is too small to hold the inherited conversation alongside the three documents",
          why: "Incorrect. Nothing was inherited to overflow. A window-size explanation presumes the content arrived and was truncated; here it never arrived." },
        { t: "The coordinator and subagent should share one session, using --resume so the subagent continues the same conversation",
          why: "Incorrect, and it defeats the purpose. Delegation exists partly so verbose subagent work does not consume the coordinator's context; collapsing them into one conversation removes the isolation that makes subagents worth using." },
        { t: "Shared memory between coordinator and subagents needs to be enabled so context propagates automatically",
          why: "Incorrect — there is no such automatic inheritance to enable. Context passing to subagents is explicit by design, and expecting an implicit channel is exactly the misconception that produced this bug." }
      ],
      answer: [0],
      explanation:
        "Subagent context is explicit, always. Include complete prior findings in the prompt, and use structured formats " +
        "that separate content from metadata — URLs, document names, page numbers — so attribution survives the handoff."
    },

    {
      id: "s3-03", sid: "s3", domain: "D1 · Agentic Architecture", obj: "1.3 Parallel subagent spawning",
      trap: "Serialising independent work", fam: 4, select: 1,
      question:
        "For a typical report the coordinator needs four independent searches — competitor filings, academic literature, " +
        "news coverage and regulatory notices. None depends on another's output. The current implementation emits one " +
        "<code>Task</code> call per assistant response, waits for its result, then emits the next. Wall-clock time per " +
        "report is 11–14 minutes, and roughly 70% of that is spent in the search phase. <b>Which change most reduces " +
        "wall-clock time without reducing coverage?</b>",
      options: [
        { t: "Have the coordinator emit all four Task calls in a single response, so the four subagents execute concurrently and the search phase costs roughly the slowest search rather than the sum of all four",
          why: "Correct. Multiple Task calls in one response is how parallel subagent execution is expressed. Because the four searches are genuinely independent, nothing is lost by overlapping them and the phase collapses to the duration of the slowest one." },
        { t: "Consolidate the four searches into a single subagent with a longer prompt covering all four areas",
          why: "Incorrect. One subagent works through four areas sequentially inside its own context, so the same total work is still serialised — now with the added problem of four topics competing for attention in one context window." },
        { t: "Reduce the search phase to the two highest-value areas and accept narrower coverage",
          why: "Incorrect. The question asks for lower latency without losing coverage, and this trades exactly that away — and narrow decomposition is the failure mode this system is already prone to." },
        { t: "Raise the coordinator's reasoning effort so it plans the search phase more efficiently",
          why: "Incorrect. The coordinator's plan is already correct — four independent searches is the right decomposition. The cost is in how the plan is executed, not how it was formed." }
      ],
      answer: [0],
      explanation:
        "Independent subtasks should overlap. Spawn parallel subagents by emitting multiple <code>Task</code> calls in a " +
        "single response; reserve sequential delegation for genuine dependencies, where one subagent's findings shape the " +
        "next one's assignment."
    },

    {
      id: "s3-04", sid: "s3", domain: "D2 · Tool Design & MCP", obj: "2.3 Tool distribution & least privilege",
      trap: "Over-provisioning to remove a bottleneck", fam: 2, select: 1,
      question:
        "The synthesis subagent frequently needs a fact confirmed mid-draft. Instrumentation shows 85% of these are " +
        "single-value lookups — a founding date, a headline revenue figure — while 15% require reconciling several " +
        "sources. Every one currently returns to the coordinator, which dispatches a search subagent and routes the " +
        "answer back; the round-trips add about 40% to total report latency. <b>Which change best reduces latency while " +
        "preserving coordination where it matters?</b>",
      options: [
        { t: "Give the synthesis subagent a narrowly-scoped verify_fact tool for single-value lookups, and keep multi-source reconciliation routed through the coordinator",
          why: "Correct. It removes the round-trip for the 85% case with the minimum privilege that case requires, while the 15% that genuinely needs cross-source judgement and aggregation still goes through the component designed for it. This is the limited cross-role tool for a high-frequency need." },
        { t: "Give the synthesis subagent the full web-search toolset so it can resolve any verification itself",
          why: "Incorrect. It over-provisions for the common case and invites the documented failure of agents misusing tools outside their specialisation — a synthesis agent handed general search will start doing research mid-draft, which is the coordinator's job." },
        { t: "Have synthesis mark each uncertain claim inline and batch every verification into a single pass after the draft is complete",
          why: "Incorrect. It creates a blocking dependency at the end of the run and forces a full revision pass once verifications land — and a claim that fails verification may invalidate the paragraph built around it." },
        { t: "Have the coordinator pre-fetch likely verification targets during the search phase and pass them into synthesis",
          why: "Incorrect. It is speculative: the coordinator cannot know which facts synthesis will question before the draft exists, so it either over-fetches and inflates context or under-fetches and leaves the round-trips in place." }
      ],
      answer: [0],
      explanation:
        "Scope tool access to the role, then make deliberate exceptions for high-frequency needs. The discriminator is the " +
        "85/15 split: give the common case a narrow tool, and leave the case that genuinely needs coordination coordinated."
    },

    {
      id: "s3-05", sid: "s3", domain: "D5 · Context & Reliability", obj: "5.6 Provenance through synthesis",
      trap: "Reconstructing what should have been carried", fam: 7, select: 1,
      question:
        "Reports carry inline citations, but a spot check finds roughly one claim in twelve attributed to a source that " +
        "does not contain it. The pipeline works like this: document analysis produces per-source summaries; synthesis " +
        "reads those summaries and writes flowing prose; the report generator then attaches citations by matching each " +
        "sentence of that prose back to the source summaries by textual similarity. <b>What is the root cause, and the " +
        "right fix?</b>",
      options: [
        { t: "Attribution is being reconstructed after the fact rather than carried; synthesis should emit structured claim-to-source mappings alongside its prose so every claim retains the origin it was actually derived from",
          why: "Correct. Provenance is lost at the synthesis step, where summaries are compressed into prose without claim-source mappings. Similarity matching afterwards can only guess, and guesses fail exactly where two sources discuss the same topic. Carrying the mapping through synthesis means nothing has to be re-inferred." },
        { t: "The similarity threshold used by the report generator is too permissive; raising it would reject weak matches",
          why: "Incorrect. It tunes the guessing rather than removing the need to guess. A stricter threshold trades false attributions for missing citations, and still cannot distinguish two sources that make near-identical statements." },
        { t: "Instruct the synthesis subagent to name its sources inline in the prose so the report generator has explicit anchors",
          why: "Incorrect — closest to right, and still short. Prose mentions are unstructured and lossy: they blur when a sentence draws on two sources, and the generator is still parsing rather than reading a mapping. Emit the mapping as data, not as narrative." },
        { t: "Have the report generator re-read every original source and verify each claim before citing it",
          why: "Incorrect. It adds an expensive verification pass over the whole corpus to recover information that was available for free upstream — and re-reading every source in the generator's context is precisely the volume subagent delegation exists to avoid." }
      ],
      answer: [0],
      explanation:
        "Source attribution is lost when summarisation compresses content without preserving claim-source mappings. " +
        "Preserve the mapping structurally through every stage; do not rebuild it downstream by inference."
    },

    {
      id: "s3-06", sid: "s3", domain: "D5 · Context & Reliability", obj: "5.6 Conflicting & temporal sources",
      trap: "Silently resolving a disagreement", fam: 7, select: 2,
      question:
        "Two reputable sources put the same market at $4.2B and $7.1B, and the synthesis subagent currently picks one " +
        "and reports it without comment. Separately, an analyst flagged a report that described two adoption figures as " +
        "contradictory when in fact one was collected in 2023 and the other in 2025 — the dates appeared in neither " +
        "summary. <b>Select TWO changes that best address how the system handles disagreeing figures.</b>",
      options: [
        { t: "Present both figures with their source attribution and note the disagreement explicitly, rather than resolving it silently in favour of one",
          why: "Correct. A genuine disagreement between credible sources is a finding the analyst needs, not noise to be cleaned up. Silently choosing one hides the uncertainty and gives the report a confidence the evidence does not support." },
        { t: "Require every extracted statistic to carry its publication or collection date through the pipeline",
          why: "Correct. Without dates, a change over time is indistinguishable from a contradiction. Carrying the date makes the second failure impossible and gives the analyst what they need to interpret the first." },
        { t: "Instruct the synthesis subagent to prefer the more recent of two conflicting sources",
          why: "Incorrect on both counts: it is still a silent resolution, and without dates propagated through the pipeline the subagent has no reliable way to tell which source is more recent." },
        { t: "Rank sources by domain authority and report the figure from the highest-ranked source",
          why: "Incorrect. It replaces one silent resolution rule with another, and authority is a poor tiebreaker when two credible sources measure differently-defined markets — which is usually why the figures differ." },
        { t: "Omit any statistic that conflicts with another statistic in the corpus",
          why: "Incorrect. It discards the most analytically interesting material in the report and leaves the analyst unaware that a disagreement exists at all." }
      ],
      answer: [0, 1],
      explanation:
        "Annotate conflicting statistics with source attribution instead of arbitrarily picking one, and require dates so " +
        "temporal differences are not misread as contradictions. Both preserve information the analyst needs to judge for " +
        "themselves."
    },

    {
      id: "s3-07", sid: "s3", domain: "D2 · Tool Design & MCP", obj: "2.2 Error propagation to a coordinator",
      trap: "Local recovery that discards the context", fam: 7, select: 1,
      question:
        "The web-search subagent retrieves six of ten planned sources, then its search provider begins timing out. It " +
        "currently catches the exception, retries three times with backoff, and — when those fail — returns the single " +
        "string \"search unavailable\" as its entire report, discarding the six sources it already had. The coordinator " +
        "then abandons the run. <b>What should the subagent return instead?</b>",
      options: [
        { t: "Structured error context — the failure type, the query that failed, the six results already retrieved, and any alternative approach available — so the coordinator can choose between retrying later, re-scoping, or proceeding with partial coverage and saying so",
          why: "Correct. Local recovery in the subagent is right, but when recovery fails only the unresolved part should propagate — together with the partial results and enough context to decide. Returning six real sources plus a described failure lets the coordinator make an informed choice instead of abandoning the run." },
        { t: "Keep the internal retry with backoff and return the generic \"search unavailable\" only after all attempts fail, which is already what happens",
          why: "Incorrect — the retry half is right and is worth keeping, which is what makes this tempting. The defect is what happens afterwards: a generic status strips the failure type, the attempted query and six retrieved sources, leaving the coordinator nothing to recover with." },
        { t: "Return the six sources it did retrieve with a success status, since partial results are better than none",
          why: "Incorrect. Silently suppressing the error makes partial coverage indistinguishable from complete coverage — the report would present six sources as the full picture, and no downstream stage would know to qualify it." },
        { t: "Let the exception propagate to a top-level handler that fails the run cleanly and alerts an operator",
          why: "Incorrect. Terminating the whole workflow on a single subagent failure discards every other subagent's completed work, and it removes the coordinator's ability to route around a partial failure — which is one of the main reasons to have a coordinator." }
      ],
      answer: [0],
      explanation:
        "Recover locally where you can; propagate only what you could not resolve, with partial results attached. Generic " +
        "statuses hide context, silent suppression hides failure, and terminating on one failure throws away the rest of " +
        "the run — all three are anti-patterns."
    },

    {
      id: "s3-08", sid: "s3", domain: "D1 · Agentic Architecture", obj: "1.6 Adaptive decomposition",
      trap: "One pipeline for every query shape", fam: 4, select: 1,
      question:
        "The coordinator runs the same fixed pipeline for every request: search, then document analysis, then synthesis, " +
        "then report generation. For a broad landscape question this is appropriate. For \"what is the current " +
        "enforcement deadline under the EU AI Act?\" it still spends eleven minutes and about $3 to produce a " +
        "four-thousand-word report around a single date. Roughly a third of incoming questions are of the second kind. " +
        "<b>Which change best addresses this?</b>",
      options: [
        { t: "Have the coordinator select which subagents to invoke based on the complexity of the query, so a narrow factual question runs a short path and a broad question still runs the full pipeline",
          why: "Correct. Dynamic subagent selection is the coordinator's job — it decomposes and decides what the query actually requires. A third of the volume needs a fraction of the pipeline, and the broad questions are unaffected." },
        { t: "Cache completed runs so that repeated questions return without re-executing the pipeline",
          why: "Incorrect. Caching helps only on repeats; a novel narrow question — which is most of the third — still pays the full eleven minutes. It addresses redundancy, not misfit." },
        { t: "Run every stage on a cheaper, faster model to bring the per-run cost down across the board",
          why: "Incorrect. It degrades the broad, reasoning-heavy reports that justify the system's existence in order to make the misfit cases cheaper, rather than not running those stages at all." },
        { t: "Impose a maximum runtime after which the pipeline returns whatever it has",
          why: "Incorrect. A time cap truncates work arbitrarily and mid-stage, producing an incomplete report rather than a correctly-scoped short one — and it would sometimes cut off the broad reports that legitimately need the time." }
      ],
      answer: [0],
      explanation:
        "Fixed sequential pipelines suit tasks whose shape is known in advance. When the incoming work varies in " +
        "complexity, the coordinator should choose subagents dynamically rather than routing everything through the full " +
        "chain."
    },

    {
      id: "s3-09", sid: "s3", domain: "D2 · Tool Design & MCP", obj: "2.4 MCP resources",
      trap: "A tool call for something that should be readable", fam: 8, select: 1,
      question:
        "The document-analysis subagent opens every run with twelve to eighteen exploratory tool calls against the firm's " +
        "internal research library — listing folders, sampling documents to learn what each collection contains, and " +
        "re-deriving the same taxonomy and field schemas it derived on the previous run. Only then does it begin the " +
        "analysis it was spawned for. <b>Which MCP capability best removes this overhead?</b>",
      options: [
        { t: "Expose the library's catalogue — collection summaries, document hierarchy and field schemas — as MCP resources the agent can read directly, so it can target the right documents without an exploratory phase",
          why: "Correct. Resources exist to expose content catalogues so an agent can orient without probing. The repeated work here is orientation, not retrieval, and a readable catalogue replaces the whole discovery phase rather than compressing it." },
        { t: "Add a list_documents tool that returns the full document index in a single call",
          why: "Incorrect — the closest miss. It collapses eighteen calls into one, which is a real improvement, but it still models a catalogue as an action the agent must decide to invoke, and it returns a flat list rather than the hierarchy and schemas the subagent is actually reconstructing." },
        { t: "Cache the results of a one-off exploration run and paste the resulting taxonomy into the subagent's system prompt",
          why: "Incorrect. It goes stale the moment the library changes, it grows with the corpus, and it charges every run for a taxonomy most runs only partly need." },
        { t: "Raise the subagent's tool-call budget so the exploratory phase completes without constraining the analysis",
          why: "Incorrect. Nothing is failing for lack of budget — the calls all succeed. Permitting the waste is not the same as removing it." }
      ],
      answer: [0],
      explanation:
        "MCP <b>tools</b> perform actions; MCP <b>resources</b> expose content the agent can read. Issue summaries, " +
        "document hierarchies and schemas belong in resources precisely because they reduce exploratory tool calls."
    },

    {
      id: "s3-10", sid: "s3", domain: "D1 · Agentic Architecture", obj: "1.7 Session forking",
      trap: "Linear resumption for divergent branches", fam: 9, select: 1,
      question:
        "Analysts want two readings of the same research — one weighting the bull case, one the bear case — grounded in " +
        "exactly the same gathered evidence, so that any difference between them is attributable to framing rather than " +
        "to different sources. The gathering phase takes about eleven minutes and must not run twice. <b>Which session " +
        "strategy fits?</b>",
      options: [
        { t: "Fork the session from the post-gathering baseline into two independent branches, and continue each branch with its own framing",
          why: "Correct. Forking is exactly the mechanism for divergent approaches from a shared baseline: both branches inherit the identical evidence state and then diverge, so the framing is the only variable — which is the analysts' stated requirement." },
        { t: "Resume the same session twice, first asking for the bull framing and then for the bear framing",
          why: "Incorrect. Resumption continues one linear conversation, so the second request is written in the presence of the first framing and its conclusions. The two readings would not be independent." },
        { t: "Run the full pipeline twice with different system prompts, one optimistic and one sceptical",
          why: "Incorrect. It pays the eleven-minute gathering phase twice, and worse, the two runs may gather different sources — destroying the guarantee that framing is the only difference." },
        { t: "Ask for both framings in a single response so they are produced from one shared context",
          why: "Incorrect. Written together, each framing is composed in the presence of the other and they converge toward a hedged middle — which is the opposite of two committed readings." }
      ],
      answer: [0],
      explanation:
        "<code>--resume</code> continues a conversation linearly; <code>fork_session</code> creates independent branches " +
        "from a shared baseline. When you need several divergent continuations of the same established state, fork."
    },

    /* ================= SCENARIO 4 ================= */

    {
      id: "s4-01", sid: "s4", domain: "D2 · Tool Design & MCP", obj: "2.5 Built-in tool selection",
      trap: "One tool for two different questions", fam: 8, select: 1,
      question:
        "The engineer needs two things before a schema review: every file whose path matches " +
        "<code>**/migrations/*.py</code>, and every place in the repository where the string " +
        "<code>ALTER TABLE</code> appears regardless of file location. Their first attempt used a single tool for both " +
        "and returned an incomplete answer to one of them. <b>Which approach is correct?</b>",
      options: [
        { t: "Glob for the migration-file question and Grep for the ALTER TABLE question — Glob matches file paths and never inspects contents, while Grep searches contents and is not a path-pattern matcher",
          why: "Correct. These are two different questions — \"which files are named like this\" and \"which files contain this text\" — and each built-in tool answers exactly one of them. Using the right tool for each returns a complete answer to both." },
        { t: "Use Grep for both, supplying a path-shaped regular expression for the migrations question",
          why: "Incorrect. Grep is answering \"what is inside files\"; asking it to enumerate files by path means it can only report paths that happen to contain a match, so migration files with no matching content are invisible. That is precisely the incomplete answer already observed." },
        { t: "Run both queries through Bash using find and grep, for one consistent interface and full shell expressiveness",
          why: "Incorrect. It works, but it discards the structured results the built-in tools return and routes read-only discovery through the one tool that permissions must most tightly constrain — in a repository that also holds production Terraform." },
        { t: "Read the repository tree in full and let the model identify both sets from what it has seen",
          why: "Incorrect. It consumes an enormous amount of context to answer two questions that are exactly matching problems, and recall over a very large loaded context is less reliable than a direct search." }
      ],
      answer: [0],
      explanation:
        "<b>Glob</b> = file path patterns. <b>Grep</b> = content search. <b>Read/Write</b> = whole-file operations. " +
        "<b>Edit</b> = targeted change via a unique text match. Matching the tool to the shape of the question is the " +
        "whole skill."
    },

    {
      id: "s4-02", sid: "s4", domain: "D2 · Tool Design & MCP", obj: "2.5 Edit failure fallback",
      trap: "Forcing the wrong tool to fit", fam: 8, select: 1,
      question:
        "A 900-line generated configuration file contains four byte-identical stanzas, one per environment, distinguished " +
        "only by their order in the file. Each contains <code>timeout = 30</code>. Only the third stanza's value must " +
        "become <code>60</code>. An <code>Edit</code> fails because the match string is not unique, and expanding the " +
        "match outward does not help — the surrounding forty lines in each direction are identical across all four " +
        "stanzas. <b>What is the correct way to make this change?</b>",
      options: [
        { t: "Read the file, apply the change at the known position, and Write the file back",
          why: "Correct. This is the documented fallback for exactly this situation. Edit depends on a unique text match; when the file offers no unique anchor, whole-file Read-then-Write is the tool that can express \"the third occurrence\" reliably and leaves the result verifiable." },
        { t: "Keep extending the Edit match string outward until it becomes unique",
          why: "Incorrect. The stem rules this out: the surrounding context is identical in all four directions for forty lines. Repeating a strategy the file's structure has already defeated cannot converge." },
        { t: "Use Edit with replace-all, then follow up with three further edits restoring the other stanzas to 30",
          why: "Incorrect. It deliberately introduces three wrong values and depends on a corrective pass to undo them — leaving the file broken if anything interrupts between the two steps." },
        { t: "Run an in-place sed against the specific line number via Bash",
          why: "Incorrect. It bypasses the file tooling, silently breaks if the line number has drifted by even one, and edits by position without ever confirming the content at that position is what was expected." }
      ],
      answer: [0],
      explanation:
        "<code>Edit</code> makes a targeted change identified by a unique text match. When no unique match exists, fall " +
        "back to <code>Read</code> plus <code>Write</code> — do not coerce Edit into a job its matching model cannot " +
        "express."
    },

    {
      id: "s4-03", sid: "s4", domain: "D2 · Tool Design & MCP", obj: "2.4 MCP configuration scoping",
      trap: "Right file, wrong secret handling", fam: 8, select: 1,
      question:
        "Three requirements for MCP configuration on this repository: the GitHub MCP server must be available to everyone " +
        "who clones it, with no per-person setup beyond having a token; each developer supplies their own token and no " +
        "token may ever be committed; and one engineer is trialling an experimental MCP server that nobody else should " +
        "receive. <b>Which configuration satisfies all three?</b>",
      options: [
        { t: "Define the GitHub server in the project's .mcp.json, referencing the token through environment-variable expansion such as ${GITHUB_TOKEN}; the engineer adds the experimental server to their user-level configuration",
          why: "Correct. Project-level .mcp.json is committed and therefore arrives with the clone; env-var expansion means the file references a token without containing one; and user-level configuration is personal and unshared, which is the correct home for an experiment." },
        { t: "Define both servers in the project .mcp.json and add that file to .gitignore so no secrets are committed",
          why: "Incorrect. Ignoring the file defeats the first requirement outright — an ignored .mcp.json does not arrive with a clone, so nobody else gets the GitHub server at all." },
        { t: "Define the GitHub server in the project .mcp.json with the token written in, relying on the repository's access controls to limit who can read it",
          why: "Incorrect. A committed token is a committed secret regardless of repository visibility: it lands in history, in every clone, in CI caches and in backups, and it is one person's credential shared with the whole team." },
        { t: "Have every developer define both servers in their own user-level configuration, documented in the onboarding guide",
          why: "Incorrect. It fails the no-setup requirement, and it guarantees forty hand-maintained copies of a configuration that should have one source of truth." }
      ],
      answer: [0],
      explanation:
        "Project-level <code>.mcp.json</code> for what the team shares; user-level configuration for personal or " +
        "experimental servers. Environment-variable expansion is how a shared, committed config references a per-developer " +
        "secret without containing it."
    },

    {
      id: "s4-04", sid: "s4", domain: "D2 · Tool Design & MCP", obj: "2.4 MCP tools vs built-ins",
      trap: "Removing the competitor instead of describing the tool", fam: 3, select: 1,
      question:
        "The team added an MCP server backed by the language-server index. It resolves symbol definitions and references " +
        "across the whole monorepo, including generated clients and vendored code that a text search cannot correctly " +
        "attribute. Its tool description reads, in full: <em>\"Search code.\"</em> In practice Claude reaches for the " +
        "built-in <code>Grep</code> almost every time and consequently misses definitions in generated code. <b>What is " +
        "the most effective fix?</b>",
      options: [
        { t: "Rewrite the MCP tool's description to state what it does that a text search cannot — symbol-level resolution across generated and vendored code — along with example queries and when it should be preferred",
          why: "Correct. Descriptions are the primary mechanism for tool selection, and \"Search code\" gives the model no reason to prefer this tool over a built-in that also searches code. Naming the capability difference is what makes the choice decidable." },
        { t: "Remove Grep from the allowed tool set so the MCP tool becomes the only search available",
          why: "Incorrect. It forces the right choice by eliminating the alternative, and the alternative is genuinely better for many tasks — finding a log string, a TODO, a config key. It trades one wrong default for another." },
        { t: "Add a line to CLAUDE.md instructing Claude to always use the MCP search tool rather than Grep",
          why: "Incorrect on two counts: it is a probabilistic instruction standing in for a description fix, and \"always\" is the wrong rule — plain text search remains correct for non-symbol lookups." },
        { t: "Rename the MCP tool to something that signals superiority, such as search_code_advanced",
          why: "Incorrect. A name is a small part of the selection signal and this one still does not say what the tool resolves or when it wins. The description is where the boundary belongs." }
      ],
      answer: [0],
      explanation:
        "When an agent prefers a built-in over a more capable MCP tool, the usual cause is a description that fails to " +
        "distinguish them. State the input formats, example queries, edge cases and boundaries — especially the ones the " +
        "built-in cannot handle."
    },

    {
      id: "s4-05", sid: "s4", domain: "D1 · Agentic Architecture", obj: "1.6 Incremental exploration",
      trap: "Load everything first", fam: 5, select: 1,
      question:
        "To get oriented, the engineer asks Claude to read the entire <code>payments/</code> package — 120 files, about " +
        "40,000 lines — before they begin asking questions, reasoning that a complete picture will produce better " +
        "answers. The reads consume most of the context window, and the answers that follow are noticeably more generic " +
        "than the ones they were getting from smaller, targeted sessions. <b>What is the better strategy?</b>",
      options: [
        { t: "Build understanding incrementally — search for the entry points relevant to the current question, then read selectively to follow imports and trace that specific flow",
          why: "Correct. Understanding is built by tracing the path that matters, not by loading the territory. Targeted search-then-follow keeps the context small and the relevant material near the surface, which is why the smaller sessions were producing sharper answers." },
        { t: "Perform the same complete read using a model with a larger context window so nothing has to be omitted",
          why: "Incorrect. More room does not improve attention quality across what is loaded; forty thousand lines of mostly-irrelevant code still buries the parts that matter." },
        { t: "Read each file and summarise it, keeping the 120 summaries and discarding the file contents",
          why: "Incorrect. It pays the full reading cost anyway, and the summaries strip exactly the implementation detail needed to answer specific questions — leaving generic answers, which is the symptom already being reported." },
        { t: "Read only the ten largest files, on the assumption that they carry most of the package's logic",
          why: "Incorrect. File size does not track relevance, and the choice is arbitrary with respect to whatever question is actually being asked." }
      ],
      answer: [0],
      explanation:
        "Grep to find entry points, then Read to follow imports and trace flows. Reading everything up front is the " +
        "documented anti-pattern: it spends the context budget before the question is even known."
    },

    {
      id: "s4-06", sid: "s4", domain: "D1 · Agentic Architecture", obj: "1.7 Resumption with stale state",
      trap: "Resuming onto changed ground", fam: 9, select: 1,
      question:
        "The engineer resumes yesterday's session with <code>--resume</code> to continue a half-finished change. " +
        "Overnight a colleague merged a refactor that renamed the module they had been working in and moved two of its " +
        "functions. The resumed session proceeds confidently using the old names, referring to file contents from its " +
        "cached tool results, and produces an edit that does not apply. <b>What is the correct practice?</b>",
      options: [
        { t: "Tell the agent explicitly what changed on disk since the session paused — or, given how much moved, start a fresh session seeded with a structured summary of where the work had got to",
          why: "Correct. A resumed session carries tool results captured before the change, and it has no way to know they are stale. Either inform it of the changes, or — when the ground has moved substantially — a new session seeded with a structured summary is the more reliable option than resuming onto invalidated state." },
        { t: "Resume as normal and let the agent discover the refactor when an edit fails and it re-reads the file",
          why: "Incorrect. Discovery-by-failure wastes a cycle and only surfaces the changes that happen to break something — the moved functions might not fail loudly, leaving a subtly wrong change in the working tree." },
        { t: "Stop using --resume entirely and always begin a new session each day",
          why: "Incorrect. It over-corrects: resumption is genuinely useful when nothing external has changed. The rule is about stale state, not about resumption itself." },
        { t: "Re-issue the original task prompt inside the resumed session so the agent re-plans from scratch",
          why: "Incorrect. Re-planning does not invalidate the cached tool results already in context; the agent would plan afresh against stale file contents and old module names." }
      ],
      answer: [0],
      explanation:
        "Resumption restores a conversation, not the world. Inform the agent about file changes when resuming after " +
        "modifications — and when a lot has moved, a new session started from a structured summary beats resuming with " +
        "stale tool results."
    },

    {
      id: "s4-07", sid: "s4", domain: "D1 · Agentic Architecture", obj: "1.3 When not to delegate",
      trap: "A true statement that answers a different question", fam: 4, select: 1,
      question:
        "After reading about context isolation, the engineer proposes spawning a subagent for every individual file edit " +
        "— six or seven per task — \"so each edit gets a clean context\". The edits are small, sequential, each depends " +
        "on the previous one's result, and the engineer reviews every diff in the main session before moving on. " +
        "<b>What is the best assessment of this proposal?</b>",
      options: [
        { t: "It will not help here: delegation buys isolation of verbose output and parallelism across independent work, and these edits are small, sequential and reviewed in the main session — so it pays context-passing overhead for benefits this task cannot realise",
          why: "Correct. Delegation is a trade, not a default. Its two payoffs are keeping high-volume discovery out of the main context and overlapping independent work; small dependent edits offer neither, while each spawn must be handed its context explicitly and hand its results back." },
        { t: "It is sound — isolating each edit in its own context always reduces main-context consumption",
          why: "Incorrect. The main session still receives every diff for review, so the content lands there regardless — and now each subagent must additionally be briefed with the state it needs." },
        { t: "It is sound provided each subagent is given the project CLAUDE.md and the results of the preceding edit",
          why: "Incorrect. It concedes the problem while calling it a condition: reconstructing the chain of dependent state for every edit is the overhead that makes this a bad trade." },
        { t: "It works only if the Task tool is present in the coordinator's allowedTools, which must be configured first",
          why: "Incorrect — and a trap worth recognising. The statement is perfectly true and completely beside the point: it answers whether delegation is mechanically possible, not whether it is the right design here." }
      ],
      answer: [0],
      explanation:
        "Know when <em>not</em> to delegate. Subagents earn their overhead when verbose output needs isolating or " +
        "independent work can run in parallel. Small, sequential, reviewed edits have neither property."
    },

    {
      id: "s4-08", sid: "s4", domain: "D3 · Claude Code Config", obj: "3.x Tool permissions",
      trap: "A working mode used as a security control", fam: 1, select: 1,
      question:
        "The repository holds both application code and the Terraform that manages production. The team's requirement: " +
        "Claude may read anything in the repository, may edit application code freely, must never write anything under " +
        "<code>infra/</code>, and must never be able to run a Terraform apply. <b>Which approach enforces this?</b>",
      options: [
        { t: "Configure tool permissions — allow the read-only tools broadly, scope Edit and Write so they cannot target infra/, and deny the relevant Bash invocations",
          why: "Correct. Each requirement maps to a permission rule, and permissions are enforced by the harness rather than followed by the model. This is the mechanism designed for exactly this boundary." },
        { t: "Keep the session permanently in plan mode, so nothing is ever executed without review",
          why: "Incorrect. Plan mode is a working mode for deciding an approach before acting, not an access-control mechanism — and it also blocks the application-code edits the team explicitly wants to allow." },
        { t: "Add a prominent CLAUDE.md rule stating that infra/ is off-limits and Terraform must never be run",
          why: "Incorrect. CLAUDE.md provides context, and context is followed probabilistically. A production boundary needs an enforced control, not a documented one." },
        { t: "Exclude infra/ from the working checkout so the files are simply not present",
          why: "Incorrect. It defeats the requirement that Claude be able to read everything, and it breaks any workflow or test that expects the full repository on disk." }
      ],
      answer: [0],
      explanation:
        "Distinguish enforced boundaries from guidance. Permissions allow and deny tools; CLAUDE.md supplies context; " +
        "plan mode governs how work proceeds. Only the first is a control."
    },

    {
      id: "s4-09", sid: "s4", domain: "D3 · Claude Code Config", obj: "3.4 Plan mode + Explore delegation",
      trap: "Picking one mechanism when two compose", fam: 4, select: 1,
      question:
        "The engineer is asked to understand how the legacy billing flow works end to end and then propose a refactor. " +
        "The flow spans about thirty files across four packages, several plausible refactor shapes exist, and simply " +
        "locating the relevant code means searching a great deal of material that will not end up mattering. <b>Which " +
        "approach fits best?</b>",
      options: [
        { t: "Work in plan mode, and within it delegate the verbose discovery to an Explore subagent that returns summaries — so the plan is formed from findings while the raw search output stays out of the main context",
          why: "Correct. The task has both properties at once: an architectural decision with several viable shapes, which is plan mode's profile, and a discovery phase whose bulk should not fill the context that will hold the plan. The two mechanisms compose rather than competing." },
        { t: "Work in plan mode, reading and searching directly in the main session so every finding is visible while planning",
          why: "Incorrect — the closest miss. Plan mode is the right working mode, but doing the discovery inline spends the context the plan needs on material that mostly will not matter. The finding summaries are what planning requires, not the raw output." },
        { t: "Use direct execution with an Explore subagent handling the discovery, then start refactoring from what it reports",
          why: "Incorrect. It isolates the discovery correctly but skips the decision: several refactor shapes are viable, and direct execution commits to one before it has been weighed." },
        { t: "Run the Explore subagent first, read its report, then begin the refactor directly",
          why: "Incorrect for the same reason — a report is not a plan. It gathers the inputs to an architectural decision and then makes that decision implicitly, by starting to type." }
      ],
      answer: [0],
      explanation:
        "Plan mode enables safe exploration and design before committing; the Explore subagent isolates verbose discovery " +
        "and returns summaries. Tasks that are both architecturally open and discovery-heavy want both."
    },

    {
      id: "s4-10", sid: "s4", domain: "D2 · Tool Design & MCP", obj: "2.4 Sourcing MCP servers",
      trap: "Building what already exists", fam: 2, select: 1,
      question:
        "The team wants Claude to read Jira issues, post comments and transition issue status. An engineer proposes " +
        "building a custom MCP server for it, arguing that only the team understands its own Jira workflow. The team " +
        "separately maintains a proprietary internal deployment system with no public equivalent. <b>What is the best " +
        "recommendation?</b>",
      options: [
        { t: "Use an existing community MCP server for Jira, which is a standard integration, and reserve custom server development for the proprietary deployment system where no equivalent exists",
          why: "Correct. Standard integrations are where community servers are strongest — the API surface is public, the semantics are shared, and maintenance is carried by others. Custom effort belongs where nothing else can serve: the proprietary system." },
        { t: "Build the custom Jira server, since the team's specific workflow and issue conventions cannot be captured by a general-purpose integration",
          why: "Incorrect. Workflow specifics live in the tool descriptions and in how the team uses the tools, not in the transport to Jira's API. That is a configuration question, not a reason to own and maintain a server." },
        { t: "Skip MCP for Jira and let Claude call the Jira REST API through Bash and curl",
          why: "Incorrect. It forfeits everything MCP provides — described tools with input schemas the model can select against, structured error responses, and per-tool permissioning — and routes issue transitions through the least constrainable tool available." },
        { t: "Expose Jira through MCP resources rather than tools, so issues are readable content rather than actions",
          why: "Incorrect. Resources would serve the read half well, but posting a comment and transitioning an issue are actions with side effects. Those are tools; resources are read-only content." }
      ],
      answer: [0],
      explanation:
        "Prefer community MCP servers for standard integrations, and build custom ones for systems that have no " +
        "equivalent. And keep the primitive distinction straight: readable content is a resource, an action with a side " +
        "effect is a tool."
    },

    /* ================= SCENARIO 5 ================= */

    {
      id: "s5-01", sid: "s5", domain: "D3 · Claude Code Config", obj: "3.6 Non-interactive CI invocation",
      trap: "Silencing a prompt instead of not prompting", fam: 9, select: 1,
      question:
        "The workflow step invokes <code>claude \"Review this diff for security issues\"</code> and the runner hangs " +
        "until the six-hour job limit. An engineer tried redirecting standard input from <code>/dev/null</code>; the job " +
        "then completed in seconds but produced no review output at all. <b>What is the correct invocation?</b>",
      options: [
        { t: "Invoke it with the print flag — claude -p \"Review this diff for security issues\" — which runs non-interactively and writes the result to stdout",
          why: "Correct. The hang is Claude Code waiting for interactive input because nothing told it this is a non-interactive context. The -p / --print flag is the supported way to say so, and it returns the result on stdout where the workflow can consume it." },
        { t: "Keep the /dev/null redirect and add an explicit step timeout so the job fails fast rather than hanging",
          why: "Incorrect. It treats the observed empty output as acceptable. Closing stdin ends the session immediately — which is why nothing was produced — and a timeout only bounds the failure instead of removing it." },
        { t: "Set an environment variable such as CLAUDE_HEADLESS=true in the workflow before invoking the CLI",
          why: "Incorrect. There is no such environment variable; the flag is the mechanism. Plausible-sounding configuration that does not exist is a recurring distractor shape." },
        { t: "Pass a --batch flag so the CLI processes the request without an interactive session",
          why: "Incorrect for the same reason — no such flag — and it also confuses CLI invocation mode with the Message Batches API, which is a different thing entirely." }
      ],
      answer: [0],
      explanation:
        "<code>-p</code> / <code>--print</code> is non-interactive mode. Workarounds that merely prevent a prompt from " +
        "being answered — closing stdin, capping the timeout — end the session rather than running it headlessly."
    },

    {
      id: "s5-02", sid: "s5", domain: "D3 · Claude Code Config", obj: "3.6 Machine-parseable output",
      trap: "Better parsing of unstructured prose", fam: 3, select: 1,
      question:
        "The review must post inline comments anchored to a specific file and line. The workflow currently runs the " +
        "review, then applies regular expressions to the markdown prose to pull out file paths, line numbers and " +
        "messages. About 7% of comments land on the wrong line, and roughly 2% of runs post nothing because the prose " +
        "came back in an unanticipated shape. <b>What is the right fix?</b>",
      options: [
        { t: "Request structured output — --output-format json together with a --json-schema describing file, line, severity and message — and post comments from the parsed objects",
          why: "Correct. The problem is that a machine-consumed interface is being expressed as prose. Declaring the schema makes the output a contract rather than something to be re-derived by pattern matching, and the anchoring fields arrive as typed values." },
        { t: "Harden the regular expressions and add a test suite covering the output shapes seen so far",
          why: "Incorrect. It hardens the parser against the shapes already observed while leaving it exposed to every shape not yet seen — which is exactly the 2% failure mode. Parsing free text remains a guess, however well tested." },
        { t: "Instruct the model to emit findings as a markdown table with fixed columns, which is far easier to parse reliably",
          why: "Incorrect — the closest miss, and a real improvement over free prose. But it is still an unenforced formatting convention parsed after the fact: nothing guarantees the column count, and a message containing a pipe character breaks the row." },
        { t: "Stop posting inline comments and publish the whole review as a single summary comment on the pull request",
          why: "Incorrect. It removes the anchoring problem by removing the feature — and inline anchoring is what makes review comments actionable where the code is." }
      ],
      answer: [0],
      explanation:
        "When output is consumed by a program, declare its schema. <code>--output-format json</code> with " +
        "<code>--json-schema</code> turns findings into typed objects; regex over prose and fixed markdown layouts are " +
        "both conventions no one enforces."
    },

    {
      id: "s5-03", sid: "s5", domain: "D3 · Claude Code Config", obj: "3.6 Project context in CI",
      trap: "Per-workflow context that drifts", fam: 8, select: 1,
      question:
        "Two recurring complaints about the CI reviewer: it flags missing test coverage on generated protobuf files that " +
        "the repository deliberately excludes from coverage, and it recommends a mock-factory fixture pattern the team " +
        "abandoned eighteen months ago in favour of builders. Both the exclusions and the fixture conventions are " +
        "documented in the repository. <b>What is the most maintainable fix?</b>",
      options: [
        { t: "Supply the project's context through CLAUDE.md — testing standards, the fixture conventions actually in use, coverage exclusions and review criteria — so every CI run reviews against this repository's real standards",
          why: "Correct. Both complaints are the reviewer applying generic defaults because it was never told the local standards. CLAUDE.md is the mechanism for exactly that, it lives in the repository beside the conventions it describes, and it serves every workflow that runs there." },
        { t: "Append the exclusion list and the fixture conventions to the review prompt in the workflow file",
          why: "Incorrect — the closest miss, since it does convey the right information. But it buries project standards in CI configuration, duplicates them for the test-generation and nightly workflows, and guarantees drift: nobody updating the fixture conventions will think to edit a GitHub Actions file." },
        { t: "Post-process the findings and drop any that reference an excluded path",
          why: "Incorrect. It filters one symptom and leaves the other untouched — the reviewer still recommends the abandoned fixture pattern — and it spends model time producing findings only to discard them." },
        { t: "Raise the severity threshold so that low-value findings such as these fall below the reporting bar",
          why: "Incorrect. Severity does not correlate with the defect here: a wrong recommendation about fixtures may well be reported as significant, while a real low-severity issue gets filtered out with it." }
      ],
      answer: [0],
      explanation:
        "CLAUDE.md is how a CI run learns the project's testing standards, fixtures and review criteria. Context that " +
        "belongs to the repository should live in the repository — not in a workflow file, and not compensated for by " +
        "post-filtering."
    },

    {
      id: "s5-04", sid: "s5", domain: "D3 · Claude Code Config", obj: "3.6 Session context isolation",
      trap: "Role-play instead of independence", fam: 4, select: 1,
      question:
        "To save a runner start-up, the pipeline uses one Claude Code invocation to generate tests for uncovered branches " +
        "and then, in the same session, to review the pull request — generated tests included. Over three months the " +
        "review has never once flagged an issue in a test it generated, while human reviewers have raised eleven, " +
        "including two tests that assert on the wrong branch. <b>What should change?</b>",
      options: [
        { t: "Split generation and review into separate independent invocations, because the session that produced the code carries its generation reasoning and is markedly less effective at reviewing its own changes",
          why: "Correct. To the generating session, the choice of which branch a test asserts on is a settled decision rather than a claim to be checked. An independent instance arrives with no such priors — which is why the human reviewers, who also had none, found the defects." },
        { t: "Keep the single session but add explicit review criteria covering test quality and assertion correctness",
          why: "Incorrect. Explicit criteria are worth having and would improve both instances, but they do not dislodge the assumptions the session already holds about code it wrote. The structural bias survives the better prompt." },
        { t: "Keep the single session and instruct it to review the generated tests critically, as though someone else had written them",
          why: "Incorrect. The generation reasoning is in the context regardless of the framing asked for; instructing a session to forget what it decided does not remove it from the conversation." },
        { t: "Restrict the review stage to files a human wrote, since generated tests are covered by the generation stage's own checks",
          why: "Incorrect. It exempts from review precisely the code with no independent scrutiny, and the eleven human-found issues show that stage's self-checks are not sufficient." }
      ],
      answer: [0],
      explanation:
        "Session context isolation matters in CI: a session is a poor reviewer of its own output. Independent instances " +
        "with no generation history catch subtle issues that self-review and extended thinking both miss."
    },

    {
      id: "s5-05", sid: "s5", domain: "D4 · Prompt Engineering", obj: "4.1 Explicit criteria & precision",
      trap: "Deleting a category instead of defining it", fam: 3, select: 1,
      question:
        "The reviewer emits 30–40 findings per pull request; developers sampled them and found 22% actionable. The " +
        "largest single category is \"this comment may be out of date\", which the prompt asks for as " +
        "<em>\"check that comments are accurate\"</em>. Nearly all of these are wrong, and their volume is the main " +
        "reason developers stopped reading the review at all. <b>What most improves precision?</b>",
      options: [
        { t: "Restate the category as a testable condition — flag a comment only where the behaviour it claims contradicts the code beneath it — and remove any category that cannot be expressed as a check",
          why: "Correct. \"Accurate\" is a judgement with no boundary, so almost anything qualifies; \"claims behaviour X, code does Y\" is a condition that can be evaluated against the diff. Categorical criteria are what move precision, and the discipline generalises to every other category." },
        { t: "Remove the comment-accuracy category from the prompt entirely, since almost all of its findings are wrong",
          why: "Incorrect — tempting, because it would immediately cut the noise. But a comment that contradicts its code is a genuine defect worth catching, and deleting the category forfeits it permanently while teaching the team nothing about why the other vague categories misfire." },
        { t: "Add an instruction to be conservative and report only high-confidence findings",
          why: "Incorrect. This is the documented non-fix: hedging language does not improve precision the way categorical criteria do, and the model's confidence in a wrong comment-staleness finding may be entirely high." },
        { t: "Add a second pass in which another instance scores each finding from 1 to 5 and posts only those scoring 4 or above",
          why: "Incorrect. It doubles the cost to filter findings a clear criterion would have prevented, and it ranks on the same undefined notion of importance that produced the noise." }
      ],
      answer: [0],
      explanation:
        "Vague instructions produce vague findings. Replace adjectives with conditions that can be checked against the " +
        "code — and note the second-order cost the stem describes: a high-false-positive category erodes trust in the " +
        "accurate ones."
    },

    {
      id: "s5-06", sid: "s5", domain: "D4 · Prompt Engineering", obj: "4.2 Few-shot for consistency",
      trap: "More definition for an inconsistency problem", fam: 5, select: 1,
      question:
        "Severity assignment is unstable. The same class of finding — a potential null dereference on a path guarded " +
        "elsewhere — has been posted as <em>critical</em> on one pull request and <em>minor</em> on another in the same " +
        "week. The prompt already defines all four severity levels in careful prose, and the definitions are not wrong; " +
        "the difficulty is that this case sits near the boundary between two of them. <b>What most improves " +
        "consistency?</b>",
      options: [
        { t: "Add two to four few-shot examples that show the reasoning behind the severity chosen, deliberately including a case that sits on the boundary between two levels",
          why: "Correct. Few-shot examples are the most effective technique when instructions alone produce inconsistent output, and demonstrating the ambiguous case is the point — that is where the prose definitions run out and where the model currently varies." },
        { t: "Expand the prose definitions with more precise language and additional qualifying conditions",
          why: "Incorrect. The definitions are already careful and are not the problem; the boundary case is under-determined by any prose definition. More text has more surface for the model to weigh differently between runs." },
        { t: "Replace the four severity categories with a numeric risk score from 0 to 100",
          why: "Incorrect. It converts a coarse inconsistency into a fine-grained one — the same finding would now score 31 and 78 — and a self-assigned number invites the same false precision as a self-reported confidence." },
        { t: "Post every finding at medium severity and let developers assign their own priority",
          why: "Incorrect. It removes the inconsistency by removing the signal, and shifts the triage burden onto the developers whose trust in the review has already lapsed." }
      ],
      answer: [0],
      explanation:
        "Few-shot examples beat further instruction when output is inconsistent rather than wrong. Choose examples that " +
        "demonstrate the ambiguous cases and show the reasoning for the choice — that is what generalises to novel " +
        "findings."
    },

    {
      id: "s5-07", sid: "s5", domain: "D4 · Structured Output", obj: "4.5 Batch processing suitability",
      trap: "Applying a cost saving to a blocking path", fam: 9, select: 1,
      question:
        "Finance has asked the team to move all Claude usage onto the Message Batches API for the 50% saving. Two " +
        "workloads are in scope: the pre-merge review, which blocks the merge queue and must return within five " +
        "minutes, and the nightly technical-debt sweep over about 2,000 files, whose report is read the following " +
        "morning. <b>What is the correct assessment?</b>",
      options: [
        { t: "Move the nightly sweep to Batches and keep the pre-merge review on real-time requests, because Batches offers a processing window of up to 24 hours with no latency guarantee",
          why: "Correct. Batch suits non-blocking, latency-tolerant work — an overnight sweep read the next morning is the archetype. A five-minute blocking gate cannot be served by an interface that offers no latency SLA, and half the saving on the workload that fits is the real, available saving." },
        { t: "Move both workloads, polling for the pre-merge results and holding the merge queue until they arrive",
          why: "Incorrect. Polling does not create a latency guarantee — it just watches for a result that may take hours, while the merge queue is held open. The blocking requirement is incompatible with the interface, not with the polling strategy." },
        { t: "Keep both on real-time requests, since batch responses cannot be reliably matched back to the requests that produced them",
          why: "Incorrect — this rests on a misconception. Each batch request carries a custom_id that correlates its response, which is also how you resubmit only the failed items. There is no correlation obstacle." },
        { t: "Move both to Batches with a real-time fallback that fires if the batch result has not arrived within five minutes",
          why: "Incorrect. In the blocking case the fallback would fire nearly every time, so the team pays for both the batch and the real-time call while maintaining two code paths — a net loss dressed as a hedge." }
      ],
      answer: [0],
      explanation:
        "Match the interface to the deadline. Message Batches: 50% cheaper, up to 24 hours, no latency SLA, " +
        "<code>custom_id</code> for correlation — right for overnight reports and weekly audits, wrong for anything that " +
        "blocks."
    },

    {
      id: "s5-08", sid: "s5", domain: "D4 · Structured Output", obj: "4.5 Batch API limitations",
      trap: "Assuming a batch request behaves like a session", fam: 9, select: 1,
      question:
        "The nightly sweep was moved onto the Batches API and immediately stopped producing useful output. The analysis " +
        "needs, for each file, the output of a <code>get_git_blame</code> tool and then reasoning over what that returns " +
        "— who last touched the code and when — before classifying the debt. Every request now comes back after the " +
        "model's first tool request, with no analysis. <b>What is the correct understanding and the fix?</b>",
      options: [
        { t: "The Batches API does not support multi-turn tool calling within a single request; resolve the blame data before submission and include it in each request's content, or run that stage as real-time requests",
          why: "Correct. A batch request is a single non-interactive turn — there is no loop to return a tool result into. Since git blame is available to the workflow without the model, gathering it beforehand and embedding it keeps the whole sweep on the cheaper interface." },
        { t: "Raise the batch request timeout so each request has room to complete its tool calls before the window closes",
          why: "Incorrect. Nothing timed out; the requests returned promptly. The interface has no mechanism to feed a tool result back, so more time changes nothing." },
        { t: "Set tool_choice to \"any\" so the model is guaranteed to call the tool rather than answering without it",
          why: "Incorrect. The model is already calling the tool — that is where each request stops. Forcing a call addresses a problem that is not occurring." },
        { t: "Enable multi-turn mode on the batch request so the tool result can be returned within the same submission",
          why: "Incorrect — there is no such mode to enable. The single-turn constraint is a property of the interface, not a default that can be switched off." }
      ],
      answer: [0],
      explanation:
        "Know the Batch API's boundaries as well as its economics: 50% cheaper, up to 24 hours, <code>custom_id</code> " +
        "correlation — and <b>no multi-turn tool calling in a single request</b>. Pre-resolve the tool data, or keep that " +
        "stage real-time."
    },

    {
      id: "s5-09", sid: "s5", domain: "D4 · Structured Output", obj: "4.3 Schema-compliant output",
      trap: "Syntax guarantees mistaken for semantic ones", fam: 9, select: 1,
      question:
        "The comment-posting step consumes the review as JSON. About 3% of runs fail because the model emitted a " +
        "trailing comma, an unescaped quotation mark inside a message, or a stray sentence before the opening brace. " +
        "Separately — and less often — a run parses cleanly but names a line number beyond the end of the file it " +
        "refers to. <b>Which change addresses the 3%, and what does it leave untouched?</b>",
      options: [
        { t: "Produce the findings through tool use with a JSON schema, which eliminates the syntax failures entirely — but leaves the out-of-range line number, because a schema constrains structure and types, not whether a value is true of the world",
          why: "Correct on both halves. Schema-constrained tool use removes the class of malformed-JSON failures. It cannot know how many lines the file has, so semantic errors — an out-of-range line, a total that does not sum — need validation against the actual artefact." },
        { t: "Add an instruction to respond only with valid JSON, plus a repair step that strips prose and trailing commas before parsing",
          why: "Incorrect. It patches known failure shapes probabilistically, and repair heuristics are themselves a source of corruption — stripping a trailing comma inside a message string silently changes the finding." },
        { t: "Switch the output format to YAML, which is more tolerant of the formatting slips being observed",
          why: "Incorrect. Tolerance is not correctness: YAML's whitespace sensitivity and implicit typing introduce their own failure modes, and it forfeits schema-constrained generation." },
        { t: "Retry the request up to three times on a parse failure, since the same prompt rarely fails twice",
          why: "Incorrect. It hides a preventable class of failure behind extra cost and latency — on a blocking path — and does nothing for the run that parses cleanly but carries a wrong line number." }
      ],
      answer: [0],
      explanation:
        "Tool use with a JSON schema is the most reliable route to schema-compliant output and eliminates syntax errors. " +
        "It does not eliminate <em>semantic</em> errors — values that are well-typed but untrue — which is why validation " +
        "against the source artefact is still required."
    },

    {
      id: "s5-10", sid: "s5", domain: "D5 · Context & Reliability", obj: "5.5 Confidence calibration",
      trap: "Aggregate accuracy hiding a weak stratum", fam: 6, select: 1,
      question:
        "After the criteria rewrite, precision across a 400-finding sample measures 94%. The team proposes that any " +
        "finding should now automatically block a merge. A quick look at the sample shows it is dominated by two " +
        "categories — null-safety and unhandled promise rejections — while concurrency and floating-point findings, " +
        "which are rarer but the ones that reach production, appear only a handful of times each. <b>What is the best " +
        "assessment?</b>",
      options: [
        { t: "An aggregate figure can mask poor performance on specific categories; measure precision per category using stratified sampling, and let a category block merges only once it has been validated at that level",
          why: "Correct. 94% overall is a weighted average dominated by two well-represented categories. The categories that matter most in production have too few samples to support any claim about them — stratified sampling is what produces a per-category precision estimate you can act on." },
        { t: "94% precision is comfortably high; enabling the block is justified and the residual 6% can be handled by an override",
          why: "Incorrect. It generalises from a sample dominated by two easy categories to every category, and puts a merge gate behind an estimate that was never measured for the findings the gate most needs to be right about." },
        { t: "Block merges only on findings the model itself marks as high confidence, which keeps the gate on its strongest ground",
          why: "Incorrect. Self-reported confidence is a documented unreliable proxy and has not been calibrated against these outcomes. It substitutes an unvalidated signal for the per-category measurement that is actually needed." },
        { t: "Block merges only on findings that two independent review runs both produce, since agreement indicates reliability",
          why: "Incorrect. Agreement measures reproducibility, not validity: a systematically wrong finding reproduces reliably, while a subtle real defect caught in one run is discarded. It also doubles the cost of a blocking path." }
      ],
      answer: [0],
      explanation:
        "Validate accuracy <em>by category</em> before automating on it. High aggregate accuracy routinely conceals weak " +
        "performance on specific types — and stratified sampling is the technique that surfaces it."
    },

    /* ================= SCENARIO 6 ================= */

    {
      id: "s6-01", sid: "s6", domain: "D4 · Structured Output", obj: "4.3 Optional & nullable fields",
      trap: "A required field for information that may not exist", fam: 7, select: 1,
      question:
        "Around 11% of incoming invoices carry no purchase-order number at all — the vendor simply does not print one. " +
        "The extraction schema marks <code>po_number</code> as required with a string type. For those documents the " +
        "model returns plausible-looking values: sometimes the invoice number reformatted, sometimes a string built from " +
        "the vendor code and the date. These pass validation and post to the ERP. <b>What is the correct fix?</b>",
      options: [
        { t: "Make po_number optional or explicitly nullable, so that \"this document has no PO number\" is a representable output rather than a schema violation",
          why: "Correct. A required field is an instruction that a value must be produced, so when none exists the model produces one. Making absence representable removes the pressure to fabricate and turns a silent corruption into an accurate, actionable result." },
        { t: "Keep the field required and add a prompt instruction never to guess a PO number that does not appear in the document",
          why: "Incorrect. It sets the instruction against the schema: the schema demands a value while the prompt forbids inventing one, and the model has no third option. Contradictory constraints resolve unpredictably." },
        { t: "Keep the field required and validate every extracted PO number against the ERP after extraction, discarding any that does not exist",
          why: "Incorrect. It catches some fabrications after the fact and misses the worst case entirely — a fabricated value that happens to match a real PO, which now silently posts against someone else's order." },
        { t: "Keep the field required and retry extraction until a well-formed PO number is returned",
          why: "Incorrect, and it makes things worse: retrying a document that contains no PO number guarantees fabrication, because the only way to satisfy the loop is to invent something." }
      ],
      answer: [0],
      explanation:
        "Optional and nullable fields prevent fabrication. If a value may legitimately be absent from the source, the " +
        "schema must be able to say so — otherwise \"required\" is read as \"produce something\"."
    },

    {
      id: "s6-02", sid: "s6", domain: "D4 · Structured Output", obj: "4.3 Extensible enums",
      trap: "A closed vocabulary for an open world", fam: 7, select: 1,
      question:
        "The <code>incoterm</code> field is an enum of the eleven Incoterms 2020 codes. About 3% of documents carry " +
        "something else: a superseded 2010 code such as DAT, or a vendor's own house term like " +
        "\"delivered-yard-prepaid\". The model currently maps each of these to the nearest valid enum member without " +
        "comment — DAT most often becomes DAP — and the substitution is invisible downstream. <b>What is the best " +
        "schema change?</b>",
      options: [
        { t: "Add an \"other\" member to the enum together with a free-text detail field capturing the literal term found, so out-of-vocabulary values are recorded rather than coerced",
          why: "Correct. It keeps the closed vocabulary and its validation for the 97% that fit, while giving the 3% an honest landing place. The literal term is preserved for a human or a downstream rule to interpret, and the substitution stops being invisible." },
        { t: "Extend the enum to include the superseded Incoterms 2010 codes alongside the current ones",
          why: "Incorrect. It handles the codes you have already seen and nothing else — the house terms remain uncovered, and every new vendor convention means another schema change. The category is open-ended; enumerating it is not a strategy." },
        { t: "Keep the enum as it is and have the model emit a low confidence score whenever it had to map a term",
          why: "Incorrect. The wrong value still posts, now accompanied by a self-assessed number that is not calibrated against anything. It labels the corruption instead of preventing it." },
        { t: "Change incoterm to free text so that whatever appears on the document is captured verbatim",
          why: "Incorrect. It solves the 3% by giving up validation on the 97%, admitting spelling variants and casing differences the ERP will then have to normalise." }
      ],
      answer: [0],
      explanation:
        "For categories that are mostly closed but occasionally open, use an enum plus an <code>\"other\"</code> member " +
        "with a detail field. You keep validation where it works and stop the model silently coercing values into the " +
        "nearest available slot."
    },

    {
      id: "s6-03", sid: "s6", domain: "D4 · Structured Output", obj: "4.4 Self-checking extraction",
      trap: "Reconciling a discrepancy instead of reporting it", fam: 7, select: 1,
      question:
        "On roughly 6% of invoices the extracted line items do not sum to the extracted invoice total. Investigation " +
        "shows two distinct causes in about equal measure: a misread digit in one line item, and a discount or freight " +
        "line the extraction skipped entirely. Today the model quietly adjusts one figure so the document is internally " +
        "consistent before returning it, and the discrepancy never reaches anyone. <b>Which change best surfaces these " +
        "for correction?</b>",
      options: [
        { t: "Have the extraction emit the stated total, a calculated total derived from the line items, and a conflict_detected boolean — so the mismatch is reported as data rather than resolved inside the model",
          why: "Correct. It makes the model's own arithmetic checkable instead of asking it to be right, and the two figures together tell you which cause you are looking at: a small delta points at a misread digit, a delta equal to a missing line points at an omitted row. That distinction is what enables a targeted correction." },
        { t: "Compute the sum downstream and route any document whose line items do not match the stated total to manual entry",
          why: "Incorrect — the closest miss, and it does at least detect the problem. But it re-keys 900 documents a month by hand while discarding what the extraction already knew, and it cannot distinguish a misread digit from a missing line, so every case costs the same full manual pass." },
        { t: "Instruct the model to double-check its arithmetic before returning the result",
          why: "Incorrect. Self-checking inside the same pass reasons from the same reading of the document, and it produces no artefact anyone can inspect — you would not know whether the check ran or what it concluded." },
        { t: "Treat the stated total as authoritative whenever the two disagree, and discard the conflicting line items",
          why: "Incorrect. It resolves the conflict by destroying the more detailed data, and the ERP needs the line items. It also hides the extraction defect that caused the mismatch." }
      ],
      answer: [0],
      explanation:
        "Build self-correction into the output shape: extract <code>calculated_total</code> alongside " +
        "<code>stated_total</code>, and add explicit <code>conflict_detected</code> flags. Discrepancies should be " +
        "reported as data, never reconciled silently inside the model."
    },

    {
      id: "s6-04", sid: "s6", domain: "D4 · Structured Output", obj: "4.4 Validation & retry loops",
      trap: "Retrying for information that is not there", fam: 3, select: 1,
      question:
        "The validation-retry loop retries any document whose output fails validation, up to five times, with the message " +
        "\"your previous output failed validation, please try again\". Two populations dominate the failures: documents " +
        "where a required field <em>is</em> printed but was missed or mis-formatted, and documents where the field is " +
        "genuinely not present anywhere. The second population consumes five attempts each and then fails, at about a " +
        "fifth of total extraction spend. <b>What is the right restructuring?</b>",
      options: [
        { t: "Append the specific validation errors to the retry so the model knows exactly what failed, and stop retrying the second population altogether — represent absence in the schema and route those documents down a different path",
          why: "Correct. Both halves matter. Specific error feedback is what makes a retry more likely to succeed than the attempt before it. And retries cannot recover information that is absent from the source — no number of attempts will find a field the document does not contain, so that case needs a schema that can express absence, not another attempt." },
        { t: "Raise the retry limit to ten so that borderline documents have more opportunity to succeed",
          why: "Incorrect. It doubles the spend on the population that can never succeed, and the population that could succeed is not being told what went wrong — so extra attempts are extra rolls of the same dice." },
        { t: "Keep the generic retry message but add the original document again on each attempt to ensure it is fully available",
          why: "Incorrect. The document was already available; what is missing is the diagnosis. Re-sending the source inflates every retry without narrowing anything." },
        { t: "Remove the retry loop and send every validation failure to manual review",
          why: "Incorrect. It discards the genuine value of retries on the recoverable population — a mis-formatted date given the specific error usually corrects on the next attempt — and converts a solvable cost into headcount." }
      ],
      answer: [0],
      explanation:
        "Retry-with-error-feedback works because the retry carries information the first attempt lacked. It is " +
        "ineffective when the information is absent from the source rather than mis-formatted in the output — know which " +
        "population you are in before spending attempts on it."
    },

    {
      id: "s6-05", sid: "s6", domain: "D4 · Prompt Engineering", obj: "4.2 Few-shot across varied structures",
      trap: "Examples drawn from the easy majority", fam: 3, select: 1,
      question:
        "Field-level accuracy is 96% across the six highest-volume vendors and 71% across the thirty-four in the long " +
        "tail — and a new vendor is onboarded roughly every month. The prompt contains eight few-shot examples, all " +
        "drawn from the top six vendors because those were the documents to hand when the prompt was written. The long " +
        "tail uses noticeably more varied layouts: multi-page line-item tables, totals printed above the items, and " +
        "two vendors who label the invoice number simply \"Ref\". <b>What most improves long-tail accuracy?</b>",
      options: [
        { t: "Rebalance the examples so they demonstrate the structural variety of the long tail — a totals-above-items layout, a multi-page table, an ambiguously labelled field — rather than eight variations of the formats that already work",
          why: "Correct. Few-shot examples earn their place by teaching generalisation, and eight examples of the six formats already at 96% teach nothing new. Demonstrating how to handle the ambiguous and structurally different cases is what transfers to the thirty-four — and to the vendor onboarding next month." },
        { t: "Add roughly thirty more examples so that every current vendor format is represented at least once",
          why: "Incorrect. It charges a large token cost to every extraction, and it teaches memorisation rather than generalisation — which is why it does nothing for the vendor onboarded next month." },
        { t: "Build a per-vendor prompt with its own examples, selected automatically from the sender address",
          why: "Incorrect — the strongest distractor, since per-vendor prompts really would lift accuracy on known vendors. But it is forty prompts to maintain, it needs a new one before each onboarding, and it has no answer at all for the first documents from an unrecognised sender." },
        { t: "Route long-tail vendors to manual entry until each has enough volume to justify its own tuning",
          why: "Incorrect. Thirty-four vendors is a substantial permanent manual workload, and by that rule most vendors never accumulate the volume to graduate out of it." }
      ],
      answer: [0],
      explanation:
        "Few-shot examples should demonstrate ambiguous-case handling and enable generalisation to novel patterns — " +
        "which means choosing them from where the model is failing, not from where it already succeeds. Two to four " +
        "well-chosen examples beat thirty redundant ones."
    },

    {
      id: "s6-06", sid: "s6", domain: "D5 · Context & Reliability", obj: "5.5 Field-level calibration",
      trap: "Aggregate accuracy as an automation gate", fam: 6, select: 1,
      question:
        "Overall field-level accuracy measures 97% on a sample of recent extractions, and the team proposes posting " +
        "straight to the ERP with no human review. Two details sit behind the headline figure: the sample was drawn " +
        "proportionally, so scanned faxes — about 8% of volume — contribute few documents; and the fields differ sharply " +
        "in difficulty, with vendor name near-perfect and multi-line item tables much weaker. <b>What is the right " +
        "approach?</b>",
      options: [
        { t: "Measure accuracy by document type and by field rather than in aggregate, calibrate field-level confidence against a labelled set, and auto-post only the type-and-field combinations that have been validated at that level",
          why: "Correct. A 97% average over a proportional sample says little about the strata that matter: scanned faxes are under-represented, and the hardest field is averaged against the easiest. Per-type and per-field measurement, with confidence calibrated on labelled data, is what lets you automate the parts that have earned it and review the rest." },
        { t: "Auto-post everything at 97%, and reconcile the residual errors through the existing month-end ERP audit",
          why: "Incorrect. It generalises a proportional-sample average to strata it barely measured, and defers discovery of financial errors to month-end — after payment runs have already gone out." },
        { t: "Auto-post any document where the model's self-reported extraction confidence exceeds 0.9, and review the remainder",
          why: "Incorrect. Self-reported confidence has not been calibrated against these outcomes and is a documented unreliable proxy. Calibrating field-level confidence on a labelled set is a different thing from trusting a number the model volunteers." },
        { t: "Auto-post everything but route a random 3% of documents to human review as an ongoing quality check",
          why: "Incorrect — closer, because sampling is the right instinct. But a proportional random sample reproduces the same blind spot: it will contain very few faxes. Stratified sampling is what measures the weak strata, and this design reviews after posting rather than routing before it." }
      ],
      answer: [0],
      explanation:
        "Aggregate accuracy can mask poor performance on specific document types and fields. Validate by type and by " +
        "field before automating, use stratified sampling so weak strata are actually measured, and route review by " +
        "calibrated field-level confidence."
    },

    {
      id: "s6-07", sid: "s6", domain: "D5 · Context & Reliability", obj: "5.1 Tool-result bloat & lost-in-the-middle",
      trap: "Attention asked for rather than engineered", fam: 5, select: 2,
      question:
        "Scanned bills of lading pass through OCR that returns, for every page, more than forty fields per text block — " +
        "including per-character bounding boxes and per-character confidence values. For a twelve-page document this " +
        "output dominates the context. Extraction uses exactly two of those fields: the text and the block's page " +
        "number. Error analysis shows misses are concentrated in the middle pages of long documents, while the first and " +
        "last pages extract reliably. <b>Select TWO changes that best address this.</b>",
      options: [
        { t: "Trim each OCR result to the two fields extraction actually consumes before it enters the model's context",
          why: "Correct. Tool results accumulate and consume tokens disproportionately — forty-plus fields where two are relevant is the textbook case. Removing the bounding boxes and per-character confidences shrinks the context by an order of magnitude with no loss of anything the task uses." },
        { t: "Process the document in page-range sections and combine the per-section results, so no single pass has to attend across all twelve pages at once",
          why: "Correct. Concentrating misses in the middle is the signature of a single pass attending across too much material at once. Sectioning gives every page a position near the edge of some pass, and a combining step reconciles the sections." },
        { t: "Move to a model with a larger context window so the full OCR output fits comfortably",
          why: "Incorrect. It already fits — the problem is where material sits within the context, not whether it is admitted. A larger window enlarges the middle rather than removing it." },
        { t: "Add an instruction telling the model to pay particular attention to the middle pages of long documents",
            why: "Incorrect. Positional recall is not a matter of effort the model can be asked to apply, and the instruction itself sits in the same context whose reliability is in question." },
        { t: "Raise max_tokens so the extraction has room to enumerate every page in its output",
          why: "Incorrect. The output is not being truncated — pages are being missed during reading, not dropped while writing." }
      ],
      answer: [0, 1],
      explanation:
        "Two forces are at work: verbose tool results consuming the window disproportionately, and the middle of a long " +
        "context being processed less reliably than its ends. Trim the results, and structure the work so nothing " +
        "important has to live in the middle of a very long pass."
    },

    {
      id: "s6-08", sid: "s6", domain: "D2 · Tool Design & MCP", obj: "2.2 Empty results vs access failures",
      trap: "Absence and unavailability sharing a return value", fam: 7, select: 1,
      question:
        "An MCP tool fetches a document's supporting attachments from the document store. It returns an empty array in " +
        "two situations: the document genuinely has no attachments, and the attachment service is unreachable. The " +
        "extraction records \"no supporting documents\" in both cases. Over the last quarter, 1.2% of invoices posted to " +
        "the ERP without a customs declaration that did in fact exist, and customs clearance was delayed on each. " +
        "<b>What is the correct fix?</b>",
      options: [
        { t: "Have the tool distinguish the two: a valid empty result when the document genuinely has no attachments, and a structured error marked transient and retryable when the service could not be reached",
          why: "Correct. An access failure and a valid empty result are opposite facts that happen to share a shape, and conflating them is a documented anti-pattern. Once they are distinguishable, the transient case retries and the genuine case proceeds — each with the correct behaviour." },
        { t: "Retry any empty result once before accepting it, on the basis that a transient failure is unlikely to repeat",
          why: "Incorrect. It doubles the calls for the large majority of documents that genuinely have no attachments, and after the retry the two cases are still indistinguishable — a service down for a minute returns empty twice." },
        { t: "Treat every empty result as an error and hold the document for review until attachments are confirmed",
          why: "Incorrect. It blocks every legitimately attachment-free invoice — the common case — to catch a rare failure, converting a 1.2% problem into a queue that dwarfs it." },
        { t: "Reconcile attachment counts against the ERP after posting and raise an exception where they disagree",
          why: "Incorrect. It detects the problem after the invoice has posted and the clearance delay has begun, and it depends on the ERP already knowing a count the extraction was supposed to supply." }
      ],
      answer: [0],
      explanation:
        "Distinguish access failures from valid empty results — always. They call for opposite recoveries, and a shared " +
        "return value makes it impossible for any caller to choose correctly."
    },

    {
      id: "s6-09", sid: "s6", domain: "D1 · Agentic Architecture", obj: "1.6 Prompt chaining",
      trap: "One prompt carrying four jobs", fam: 4, select: 1,
      question:
        "A single prompt currently performs four jobs in one pass: classify the document type, extract the fields, " +
        "normalise currencies to USD, and validate the result against business rules. Accuracy fell noticeably when the " +
        "validation job was added to the prompt, and the team has found that when the classification is wrong — a " +
        "packing list read as an invoice — everything downstream is confidently wrong in ways that pass validation. " +
        "<b>What is the best restructuring?</b>",
      options: [
        { t: "Chain the steps as separate calls — classify, then extract using the schema for that document type, then normalise, then validate — so each step has a single job and a misclassification is visible before extraction begins",
          why: "Correct. This is prompt chaining: a known, fixed sequence of dependent steps, each consuming the previous step's output. It explains both symptoms — adding a fourth job diluted attention across the pass, and folding classification into the same pass meant nothing ever inspected it before the work that depends on it." },
        { t: "Keep the single prompt but organise it with explicit section headers for each of the four jobs",
          why: "Incorrect. Headers improve legibility within one pass; they do not give the classification an output anyone can check before extraction proceeds, and all four jobs still compete for attention in a single call." },
        { t: "Keep the single prompt and raise reasoning effort so the model handles all four jobs more carefully",
          why: "Incorrect. More reasoning within one pass does not create the checkpoint the pipeline is missing — a wrong classification would simply be reasoned about more thoroughly and still propagate." },
        { t: "Run the single prompt three times and accept the result that two or more runs agree on",
          why: "Incorrect. It triples the cost, and a systematic misclassification — a packing list that genuinely looks like an invoice — reproduces across all three runs. Voting measures reproducibility, not correctness." }
      ],
      answer: [0],
      explanation:
        "Prompt chaining suits fixed sequences of dependent steps, and it has a second benefit beyond attention: each " +
        "intermediate output becomes inspectable. A classification folded inside the pass that consumes it can never be " +
        "checked before it does damage."
    },

    {
      id: "s6-10", sid: "s6", domain: "D1 · Agentic Architecture", obj: "1.4 Prerequisite ordering",
      trap: "Reacting to bad ordering instead of preventing it", fam: 1, select: 1,
      question:
        "Extraction is followed by enrichment tools that look up vendor tax registration and contract terms. Those " +
        "lookups require the document's vendor identity and type, which <code>extract_metadata</code> establishes. In " +
        "roughly 8% of runs the model calls an enrichment tool first, using a vendor guessed from the filename, and the " +
        "enrichment returns data for the wrong vendor. The requirement is that <code>extract_metadata</code> runs first " +
        "on <b>every</b> request. <b>Which mechanism guarantees that?</b>",
      options: [
        { t: "Force the first call with tool_choice set to that specific tool — {\"type\": \"tool\", \"name\": \"extract_metadata\"} — so metadata extraction is guaranteed to be the first tool invoked on every request",
          why: "Correct. Forcing a named tool is the mechanism that expresses \"this specific tool runs now\", and it makes the required ordering a property of the request rather than something the model has to choose correctly. Subsequent turns can return to auto." },
        { t: "Set tool_choice to \"any\" so the model is obliged to call a tool rather than reasoning from the filename",
          why: "Incorrect. \"any\" guarantees that some tool is called, not which one — the model could still open with an enrichment lookup, which is precisely the failure being reported." },
        { t: "Add a hook that returns an error when an enrichment tool is called before extract_metadata, letting the model recover and call it in the right order",
          why: "Incorrect — the closest miss, since it does prevent the wrong data being used. But it is reactive: it spends a turn on a rejected call and then relies on the model recovering correctly, where forcing the first call means the wrong ordering never occurs." },
        { t: "State in the system prompt that extract_metadata must always be called before any enrichment tool",
          why: "Incorrect. The requirement is every request, and a prompt instruction has a non-zero failure rate — the 8% already observed is that rate for an instruction of this kind." }
      ],
      answer: [0],
      explanation:
        "<code>tool_choice</code> has three settings and they answer different questions: <code>\"auto\"</code> lets the " +
        "model decide whether to call anything, <code>\"any\"</code> requires that something is called, and a forced " +
        "<code>{\"type\":\"tool\",\"name\":...}</code> requires that a <em>specific</em> tool is called. Only the third " +
        "expresses a mandatory first step."
    }

  ]
};
