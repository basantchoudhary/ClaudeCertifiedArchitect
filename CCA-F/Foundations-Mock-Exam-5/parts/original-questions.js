/* CCA-F Mock Exam #5 — exam-grade item bank. All 60 items are NEW: no stem,
   no correct answer and no distractor is reused from Mock Exam #4.

   Same four design rules as Mock #4:
     1. The stem carries real system state and numbers, not a one-line premise.
     2. All four options are things a competent architect might actually do.
     3. The discriminator is in the qualifier — "first step", "guarantees",
        "root cause", "least added complexity" — not in option plausibility.
     4. Every option carries a `why`, so a wrong pick teaches the boundary.

   Deliberate differences from Mock #4:
     · Domain mix tracks the published blueprint more tightly:
       D1 16 (27%) · D2 11 (18%) · D3 12 (20%) · D4 12 (20%) · D5 9 (15%).
     · Six multiple-response items instead of five.
     · The six scenarios are the same official systems, but each brief carries
       DIFFERENT system state, so no item can be answered from memory of Mock #4.
     · Objective coverage is complementary: this bank targets the sub-objectives
       Mock #4 did not reach — loop-termination anti-patterns, tool_choice,
       allowedTools/AgentDefinition, @import, context: fork, the interview
       pattern, --json-schema, semantic-vs-syntactic schema failure, absent-source
       retries, stratified sampling, scratchpads and manifests.
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
        "The same retailer support agent, now eighteen months into production on the <b>Claude Agent SDK</b> and " +
        "handling ~18,000 tickets/week. Tools: <code>get_customer</code>, <code>lookup_order</code>, " +
        "<code>process_refund</code>, <code>escalate_to_human</code>, plus a recently added " +
        "<code>issue_store_credit</code>. Policy is unchanged — refunds up to <b>$500</b> may be issued by the agent, " +
        "above that requires human approval, returns accepted within <b>30 days</b>. First-contact resolution has " +
        "climbed to <b>68%</b> against the 80% target. Two new pressures: the loyalty tier of a customer changes what " +
        "they are entitled to, and about <b>14%</b> of inbound tickets are follow-ups on a case the agent already " +
        "handled once."
    },
    {
      id: "s2",
      title: "Scenario 2 — Code Generation with Claude Code",
      domains: "D3 Claude Code Configuration &amp; Workflows · D5 Context &amp; Reliability · D4 Prompt Engineering",
      brief:
        "The same 40-engineer platform team, one quarter later. The 900-line root <code>CLAUDE.md</code> was split up " +
        "and the monorepo still has <code>services/</code> (Go), <code>web/</code> (React + TypeScript) and " +
        "<code>infra/</code> (Terraform). New facts: the team has adopted <code>.claude/rules/</code> and " +
        "<code>@import</code>, six engineers keep personal <code>~/.claude/</code> setups, and a <b>contractor cohort " +
        "of eight</b> has just joined who must get the team's configuration on clone and nothing else. A generated " +
        "<b>migration codemod</b> is the current large task: it touches ~70 files across two trees."
    },
    {
      id: "s3",
      title: "Scenario 3 — Multi-Agent Research System",
      domains: "D1 Agentic Architecture · D2 Tool Design &amp; MCP · D5 Context &amp; Reliability",
      brief:
        "The same market-intelligence coordinator, now with <b>six</b> subagents: web search, filings analysis, " +
        "document analysis, synthesis, fact-check and report generation. Reports run ~4,000 words with inline " +
        "citations. After tuning, a run costs about <b>$4.10</b> and takes <b>9–16 minutes</b>. Subagents are spawned " +
        "with the <b>Task tool</b> and each runs in its own context. Two live complaints from analysts: consecutive " +
        "runs on the same question return noticeably different reports, and roughly <b>a fifth of runs</b> contain two " +
        "subagents having researched substantially the same ground."
    },
    {
      id: "s4",
      title: "Scenario 4 — Developer Productivity with Claude",
      domains: "D2 Tool Design &amp; MCP · D1 Agentic Architecture · D3 Claude Code Configuration",
      brief:
        "The same engineer, now three months in on the <b>400,000-line</b> Python and TypeScript service. They work in " +
        "<b>Claude Code</b> with the built-in tools plus MCP servers for GitHub, Jira and — newly added — a " +
        "<b>Sentry</b> server exposing production error groups. The repository still contains the <b>Terraform that " +
        "manages production</b>. The engineer now leads onboarding for two more joiners, so whatever they set up has " +
        "to work for someone else on clone. Their current task: trace why a specific production error group spiked " +
        "after Tuesday's deploy."
    },
    {
      id: "s5",
      title: "Scenario 5 — Claude Code for Continuous Integration",
      domains: "D3 Claude Code Configuration &amp; Workflows · D4 Prompt Engineering &amp; Structured Output",
      brief:
        "The same fintech pipeline, after a quarter of remediation. Volume is up to <b>240 pull requests a week</b>. " +
        "The blocking pre-merge review now returns in about three minutes and precision has recovered to roughly " +
        "<b>78%</b> — developers read the comments again. Two workloads remain rough: <b>test generation</b> for " +
        "uncovered branches, which produces tests that pass but assert almost nothing, and the <b>nightly " +
        "technical-debt sweep</b> over ~2,400 files, which the team wants to run more cheaply. A new requirement has " +
        "landed: the security team wants review findings emitted in a fixed schema for their dashboard."
    },
    {
      id: "s6",
      title: "Scenario 6 — Structured Data Extraction",
      domains: "D4 Prompt Engineering &amp; Structured Output · D5 Context &amp; Reliability · D1 Agentic Architecture",
      brief:
        "The same logistics extraction pipeline, now at <b>22,000 documents a month</b> across roughly <b>50 vendor " +
        "formats</b>. Fields: vendor, invoice number, PO number, line items, totals, currency, Incoterm. Since the last " +
        "review the team added a JSON schema with <code>strict: true</code> and a validation-retry loop, and " +
        "<b>syntax errors have gone to zero</b>. What remains is worse to find: <b>1.8%</b> of posted documents reach " +
        "the ERP with a value that is well-formed and wrong. Six vendors are most of the volume; the long tail is " +
        "forty-four. Scanned faxes still arrive through OCR."
    }
  ],

  questions: [

    /* ================= SCENARIO 1 — 10 items ================= */

    {
      id: "s5q-s1-01", sid: "s1", domain: "D1 · Agentic Architecture", obj: "1.1 Loop termination",
      trap: "Non-existent or misunderstood feature", fam: 9, select: 1,
      question:
        "The control loop terminates when either of two conditions is met: the assistant's text contains a closing " +
        "phrase such as <code>\"Is there anything else\"</code>, or fifteen iterations have elapsed. Two failure modes " +
        "are in the incident log. Some tickets end mid-workflow because the model produced a polite closing sentence " +
        "in the same turn as a <code>tool_use</code> block. Others burn all fifteen iterations and get cut off " +
        "mid-refund. <b>What is the root cause?</b>",
      options: [
        { t: "Termination is being inferred from the response body instead of read from stop_reason, which is the field that actually reports whether the turn is complete",
          why: "Correct. stop_reason is the API's own statement about why generation ended — end_turn means finished, tool_use means it is waiting on you. Both observed failures are the same bug: a proxy signal used where an authoritative one exists. Note the first failure proves text and tool_use coexist in one turn." },
        { t: "The iteration cap is set too low for refund workflows; raising it to forty and making it configurable per workflow type would absorb the long-running cases",
          why: "Incorrect. It treats the second symptom and ignores the first entirely. An iteration cap is a runaway backstop, not a termination condition — if the cap is what ends your loop in normal operation, the loop has no correct ending." },
        { t: "The closing-phrase list is too narrow; expanding it to a maintained set of closing patterns and matching case-insensitively would catch the turns being missed",
          why: "Incorrect. It doubles down on parsing natural language for control flow. A larger phrase list makes the first failure mode more frequent, because more legitimate mid-workflow turns will match a closing pattern." },
        { t: "The agent should be instructed in its system prompt to emit a sentinel token such as [[DONE]] as the final line whenever a ticket is fully resolved, and the loop should key on that",
          why: "Incorrect. A sentinel is still a text signal, still probabilistic, and still emitted by the same model that already produces closing phrases at the wrong moment. It replaces one string match with another while stop_reason sits unused." }
      ],
      answer: [0],
      explanation:
        "The agentic loop is a switch over <code>stop_reason</code>: continue on <code>tool_use</code>, stop on " +
        "<code>end_turn</code>. Every listed anti-pattern is present here — parsing natural-language signals, and an " +
        "arbitrary iteration cap as the primary stop. Caps stay, but as a runaway guard only."
    },

    {
      id: "s5q-s1-02", sid: "s1", domain: "D2 · Tool Design & MCP", obj: "2.1 Overlapping tool descriptions",
      trap: "Right idea, wrong layer", fam: 4, select: 1,
      question:
        "<code>issue_store_credit</code> was added six weeks ago, described as \"Compensate a customer for a poor " +
        "experience.\" <code>process_refund</code> is described as \"Refund a customer's order.\" Since the addition, " +
        "<b>31%</b> of legitimate refund requests are being settled as store credit — the customer asked for their " +
        "money back and received a voucher. The system prompt contains the sentence \"always look for a way to make " +
        "the customer feel compensated.\" <b>What is the most direct cause of the misrouting?</b>",
      options: [
        { t: "The two descriptions do not state their boundaries against each other, and the system prompt's \"compensated\" wording keyword-matches the store-credit description",
          why: "Correct. Two overlapping descriptions plus a system-prompt phrase that echoes one of them is exactly how unintended tool associations form. The fix is on both sides: each description states when to use it and explicitly when not to (\"use process_refund when the customer asks for money back\"), and the prompt stops steering with a word that appears in one tool's description." },
        { t: "issue_store_credit should be removed, since process_refund already covers the customer-compensation case and the second tool only creates ambiguity",
          why: "Incorrect. Store credit is a real, distinct business capability with different accounting and different customer entitlement. Deleting a needed tool to fix a description problem loses function to avoid writing two sentences." },
        { t: "The agent needs a routing step: a cheap classifier that reads the ticket and decides refund-versus-credit before the main agent runs, so the choice is made deterministically",
          why: "Incorrect, and disproportionate. An extra model pass is being added to fix two unclear sentences. It also introduces a second place where the routing can be wrong, with no context about the order." },
        { t: "tool_choice should be set to a forced process_refund whenever the ticket text contains the word \"refund\", guaranteeing the correct tool is called",
          why: "Incorrect. Keyword-forcing at the request layer replaces the model's judgement with a regex, and would fire on \"I do not want a refund, just tell me the policy.\" Forcing guarantees a call happens — never that the call is appropriate." }
      ],
      answer: [0],
      explanation:
        "Tool descriptions are the primary selection mechanism, and they are read against each other, not in isolation. " +
        "When two tools are adjacent in purpose, each description must draw the boundary explicitly. Watch system-prompt " +
        "vocabulary too — a word that appears in one tool's description becomes a pull toward it."
    },

    {
      id: "s5q-s1-03", sid: "s1", domain: "D1 · Agentic Architecture", obj: "1.5 Hooks for policy enforcement",
      trap: "Prompt where enforcement was required", fam: 1, select: 1,
      question:
        "The $500 refund ceiling is currently implemented as a system-prompt rule plus three few-shot examples showing " +
        "the agent declining and escalating. Over the last quarter <b>seven refunds between $500 and $1,340</b> were " +
        "issued without human approval. Each was individually defensible — the customer was angry, the order was " +
        "genuinely damaged — and in each case the agent's reasoning explicitly acknowledged the limit before exceeding " +
        "it. <b>Which change guarantees the ceiling holds?</b>",
      options: [
        { t: "A PreToolUse hook on process_refund that inspects the amount argument, blocks the call when it exceeds $500, and returns a result directing the agent to escalate_to_human",
          why: "Correct. The hook is deterministic code between the model's intention and the side effect. The amount is a structured argument, so the check is exact, and the returned message keeps the agent moving toward the right next action rather than just failing." },
        { t: "Strengthen the prompt: state the limit in capitals at both the start and the end of the system prompt, and add four more few-shot examples of high-value declines",
          why: "Incorrect. The evidence in the stem is that the model read the rule, acknowledged it, and exceeded it anyway. Restating a rule that was already understood does not change a probabilistic control into a deterministic one." },
        { t: "Have process_refund itself reject amounts over $500 and return an error, so the ceiling is enforced by the system of record rather than by the agent framework",
          why: "Incorrect — but this is the closest wrong answer, and worth understanding. Server-side validation is genuinely good defence in depth and you should have it. It is weaker here because it enforces at the far end: the call is already made, the failure surfaces as a tool error, and the agent gets no direction about escalation. Best practice is both, with the hook as the primary control." },
        { t: "Run a nightly reconciliation job that flags any refund over $500 lacking an approval record, so violations are caught and reversed within a day",
          why: "Incorrect. Detection after the fact is not prevention. The money has moved, the customer has been told, and reversing it is a second bad customer experience. Use this as monitoring on top of a real control, never instead of one." }
      ],
      answer: [0],
      explanation:
        "\"Every time, without exception\" is the signature of a requirement that needs a hook, a gate or a permission — " +
        "not an instruction. Hooks intercept outgoing tool calls and can block policy-violating actions and redirect " +
        "them; that redirection is what keeps the agent useful rather than merely stopped."
    },

    {
      id: "s5q-s1-04", sid: "s1", domain: "D5 · Context & Reliability", obj: "5.2 Explicit escalation triggers",
      trap: "Unreliable proxy", fam: 6, select: 1,
      question:
        "Escalation is currently triggered by a sentiment score computed over the customer's messages: above a " +
        "frustration threshold, the ticket goes to a human. Review of a labelled sample shows two problems. Customers " +
        "who write calmly — <b>\"Please transfer me to a manager\"</b> — stay with the agent through several more turns " +
        "because their sentiment never crosses the threshold. Meanwhile customers who type in capitals about a " +
        "straightforward delivery date get escalated immediately. <b>Which change most improves escalation " +
        "correctness?</b>",
      options: [
        { t: "Replace the sentiment threshold with categorical triggers — an explicit request for a human, a policy exception or gap, or an inability to make progress — and escalate immediately on the explicit request",
          why: "Correct. It fixes both halves of the observed error at once. An explicit human request is a categorical trigger requiring no inference, and the other two triggers key on the state of the case rather than the tone of the writing. Tone is not a measure of complexity." },
        { t: "Keep sentiment but add an override rule so that any message containing manager, supervisor, human or representative escalates regardless of score",
          why: "Incorrect. It patches the specific missed phrase while leaving the false-positive half untouched — the capital-letters delivery question still escalates. It also keeps an unreliable proxy as the primary mechanism and bolts an exception onto it." },
        { t: "Recalibrate the threshold on a larger labelled sample and re-fit it monthly, so it tracks how this customer base actually expresses frustration",
          why: "Incorrect. Better calibration of the wrong variable. No threshold on sentiment separates \"calmly asks for a manager\" from \"angrily asks a simple question\", because the signal does not carry that information at any cutoff." },
        { t: "Have the agent self-report a confidence score each turn and escalate when it drops below a set level, since the agent knows better than sentiment whether it can resolve the case",
          why: "Incorrect. Self-reported confidence is the other classic unreliable proxy — it is poorly calibrated and is generated by the same process that is already failing. Swapping one soft signal for another does not make escalation deterministic." }
      ],
      answer: [0],
      explanation:
        "Escalation triggers are categorical, not scalar: an explicit request for a human, a policy exception or gap, " +
        "and inability to progress. Sentiment and self-reported confidence are both unreliable stand-ins for case " +
        "complexity — a calm customer can need a human, and an angry one can have a trivial question."
    },

    {
      id: "s5q-s1-05", sid: "s1", domain: "D5 · Context & Reliability", obj: "5.2 Ambiguity resolution",
      trap: "Losing or fabricating information", fam: 7, select: 1,
      question:
        "<code>get_customer</code> is called with a name and returns <b>three</b> matching customer records — the name " +
        "is common and all three have orders in the last month. The tool currently returns the match with the most " +
        "recent order activity and a <code>match_confidence</code> of 0.61. Downstream, the agent proceeds on that " +
        "record. Audit finds this resolves to the wrong person about <b>one time in four</b>, and the errors are only " +
        "discovered when a refund appears on a stranger's card. <b>What should happen when the lookup is " +
        "ambiguous?</b>",
      options: [
        { t: "Return all three matches as an ambiguous result, and have the agent ask the customer for a disambiguating identifier such as order number or postcode before proceeding",
          why: "Correct. Multiple matches is not a low-confidence single answer — it is a genuinely underdetermined state, and the customer holds the missing information. Asking costs one turn; guessing costs a refund to a stranger and a chargeback." },
        { t: "Raise the confidence threshold to 0.85 and fall back to escalate_to_human whenever the top match scores below it, so uncertain identifications reach a person",
          why: "Incorrect, though safer than today. It converts a question the customer could answer in one turn into a human handoff, which works against the 80% first-contact target — and a heuristic score is still picking a winner whenever it happens to clear the bar." },
        { t: "Have the agent ask a clarifying question only when the top two matches are within 0.1 of each other, since a clear leader is usually the right record",
          why: "Incorrect. It preserves heuristic selection and merely narrows when the heuristic is trusted. \"Usually the right record\" is precisely the standard that produces the one-in-four error rate on financial operations." },
        { t: "Have get_customer return the most recent match but include the other candidates in the payload, so the agent can reconsider if the conversation later contradicts the chosen record",
          why: "Incorrect. It commits to a choice first and hopes for contradiction later. By the time the conversation contradicts it, the refund may already be issued — and the agent has been anchored on one record for the whole exchange." }
      ],
      answer: [0],
      explanation:
        "When several customer records match, ask for identifiers — do not select heuristically. Multiple matches means " +
        "the information needed to decide is outside the system and inside the customer's head. A confidence number " +
        "attached to a guess does not make the guess an answer."
    },

    {
      id: "s5q-s1-06", sid: "s1", domain: "D5 · Context & Reliability", obj: "5.1 Case facts across sessions",
      trap: "Losing or fabricating information", fam: 7, select: 2,
      question:
        "About <b>14%</b> of tickets are follow-ups on a case the agent already handled. The agent currently receives " +
        "the prior conversation as a paragraph of prose generated by a summarisation pass: <i>\"Customer contacted us " +
        "about a delayed order and was offered a partial refund, which they were reasonably happy with.\"</i> On " +
        "follow-ups the agent re-asks for the order number, quotes a different refund figure from the one actually " +
        "issued, and re-offers remedies already given. <b>Select TWO changes that together make follow-ups " +
        "reliable.</b>",
      options: [
        { t: "Replace the prose summary with a structured case-facts block carrying the exact values — customer ID, order ID, refund amount issued, date, remedy given, current case state",
          why: "Correct. Transactional facts are exactly what free-text summarisation destroys: \"a partial refund\" and \"$47.99\" are not interchangeable, and the agent cannot recover the number from the prose. A structured block preserves the values verbatim." },
        { t: "Place that case-facts block at the very start of the context, under an explicit heading, rather than appending it after the current ticket text",
          why: "Correct. Models process the beginning and end of a long context most reliably and can skip the middle. Prior-case facts buried mid-context are precisely the material that gets missed — position and an explicit header are what make it actually get used." },
        { t: "Increase the summarisation model's output budget so the summary can carry more detail about what happened on the earlier contact",
          why: "Incorrect. A longer summary is still a summary — it compresses toward the general, and there is no length at which prose reliably preserves an exact currency amount. The problem is the representation, not the budget." },
        { t: "Have the agent call lookup_order at the start of every follow-up to re-derive the case history from the order record",
          why: "Incorrect. It recovers order state but not case state: what the agent said, what remedy was offered, what the customer accepted. Those exist only in the prior conversation, and re-deriving them from an order record is impossible." },
        { t: "Raise the model's reasoning effort on tickets flagged as follow-ups so it reads the prior summary more carefully",
          why: "Incorrect. More reasoning over a summary that no longer contains the refund amount cannot reconstruct it. Effort does not recover information that summarisation already discarded." }
      ],
      answer: [0, 1],
      explanation:
        "Two distinct defects: the facts were destroyed by summarisation, and whatever survived was positioned where " +
        "models read least reliably. Extract transactional facts into a persistent structured block, and place key " +
        "material at the beginning with explicit section headers."
    },

    {
      id: "s5q-s1-07", sid: "s1", domain: "D2 · Tool Design & MCP", obj: "2.3 tool_choice",
      trap: "Non-existent or misunderstood feature", fam: 9, select: 1,
      question:
        "A new requirement: the customer's <b>loyalty tier</b> determines what remedies they are entitled to, and a " +
        "new <code>get_loyalty_tier</code> tool provides it. The team wants a guarantee that this tool runs before any " +
        "remedy tool on every ticket. An engineer proposes setting <code>tool_choice</code> to " +
        "<code>{\"type\": \"any\"}</code> on the first request of each conversation. <b>What does that actually " +
        "guarantee?</b>",
      options: [
        { t: "Only that some tool is called rather than text being returned — the model still chooses which one, so it may call lookup_order first and skip the tier entirely",
          why: "Correct. any constrains the kind of turn, not its content. To guarantee a specific tool runs first you need forced choice — {\"type\": \"tool\", \"name\": \"get_loyalty_tier\"} — on that first request, or a prerequisite gate if the requirement is ordering across the whole conversation." },
        { t: "That get_loyalty_tier runs first, because it is the only tool relevant to a fresh ticket and any forces the model to select the most applicable tool",
          why: "Incorrect. This is the misreading the item is built on. any makes a tool call mandatory; the selection among tools remains the model's, on the usual description-driven basis." },
        { t: "That every tool in the tools array is called at least once before the turn completes, so the tier is necessarily retrieved along with everything else",
          why: "Incorrect. No tool_choice value means \"call them all.\" That is not a behaviour the parameter offers." },
        { t: "That the model calls tools until it has enough information to answer, which for a tier-dependent remedy necessarily includes the loyalty tier",
          why: "Incorrect. It describes the ordinary agentic loop under auto, and assumes the model correctly recognises the tier as necessary — which is exactly the assumption a guarantee is supposed to remove." }
      ],
      answer: [0],
      explanation:
        "The three values differ precisely: <code>auto</code> — the model may answer in text; <code>any</code> — it " +
        "must call something, its pick; forced <code>{\"type\":\"tool\",\"name\":…}</code> — it must call that one. " +
        "Forcing works on a single request; a cross-turn ordering requirement is a gate, not a tool_choice setting."
    },

    {
      id: "s5q-s1-08", sid: "s1", domain: "D1 · Agentic Architecture", obj: "1.4 Multi-step handoff",
      trap: "Wrong scope or wrong home", fam: 8, select: 1,
      question:
        "When the agent escalates, the human receives a structured handoff block: customer ID, root cause, refund " +
        "amount recommended, and the recommended action. Humans report this works well. But for the <b>7%</b> of " +
        "escalations that come back — the human resolves the issue and the customer writes in again a week later — the " +
        "agent has no record of what the human decided, and contradicts it. <b>Which change fixes the return path " +
        "with least added complexity?</b>",
      options: [
        { t: "Make the handoff bidirectional: the human's resolution and reasoning are written back into the same case-facts record the agent reads at the start of a ticket",
          why: "Correct. The mechanism already exists and already works in one direction; the defect is that it is one-way. Closing the loop reuses the structure, the storage and the read path that are already in place." },
        { t: "Have the agent read the human's ticket-system notes directly at the start of any ticket from a customer with a prior escalation",
          why: "Incorrect — plausible, and it does get information back. But free-text agent notes are unstructured and written for other humans, so the agent is now parsing prose for facts, which is the problem the structured handoff block solved going the other way." },
        { t: "Route any customer with a prior escalation straight to a human, on the grounds that the agent cannot know what was decided",
          why: "Incorrect. It converts a data-flow gap into a permanent staffing cost, and works directly against first-contact resolution for a population that is only 7% of escalations." },
        { t: "Extend the conversation retention window so the original escalated conversation is still in the agent's context when the customer returns",
          why: "Incorrect. The transcript ends at the moment of escalation — the human's decision was never in it, at any retention length. It also grows context for every ticket to serve a small minority." }
      ],
      answer: [0],
      explanation:
        "A handoff is a protocol, and protocols have two directions. The structured summary that lets a human act " +
        "without the transcript is the same structure that should carry the human's decision back — otherwise every " +
        "escalation is a one-way information loss."
    },

    {
      id: "s5q-s1-09", sid: "s1", domain: "D1 · Agentic Architecture", obj: "1.1 Model-driven vs decision tree",
      trap: "Disproportionate fix", fam: 2, select: 1,
      question:
        "To make behaviour predictable, an architect proposes replacing the agentic loop with a fixed decision tree: " +
        "classify the ticket into one of <b>fourteen</b> categories, then run a hard-coded tool sequence for that " +
        "category. A pilot on last month's tickets resolves the top six categories slightly <em>better</em> than the " +
        "agent, and the remaining eight — which are <b>38%</b> of volume — noticeably worse, mostly tickets raising " +
        "more than one concern. <b>What does this result indicate?</b>",
      options: [
        { t: "The workload is mixed: high-volume, well-specified categories suit a fixed sequence, while multi-concern and long-tail tickets need model-driven decision-making — so route by category rather than replacing the loop",
          why: "Correct. The pilot data says both approaches win somewhere, and the split follows how specifiable each category is. Deterministic paths for the predictable majority, the agentic loop for the tail, is a design conclusion the evidence actually supports." },
        { t: "The classifier needs more categories — expanding from fourteen to around forty would give the long tail its own specific sequences and close the gap",
          why: "Incorrect. Multi-concern tickets are combinatorial: a ticket raising a delivery issue and a billing issue is not a new category, it is two. Growing the tree chases an explosion, and each new branch is another thing to maintain." },
        { t: "The pilot shows the agentic loop should be kept everywhere, since a 38% regression is disqualifying and the six-category gain is marginal",
          why: "Incorrect — the safer instinct, but it discards a measured improvement on the majority of volume. \"Slightly better\" on high-volume categories is real value; the finding is about where each approach fits, not which one wins outright." },
        { t: "The tree is under-performing because classification is happening before any tool call, so the classifier decides without order data — classify after lookup_order instead",
          why: "Incorrect. It is a reasonable refinement that would help at the margin, but it does not explain the pattern. Multi-concern tickets fail because one sequence cannot serve two concerns, whatever the classifier knew." }
      ],
      answer: [0],
      explanation:
        "Model-driven loops and pre-configured sequences are not rivals to be settled globally. Fixed sequences win " +
        "where the path is knowable in advance; the loop wins where the next step depends on what was just found. " +
        "Multi-concern requests are the canonical case for decomposition rather than classification."
    },

    {
      id: "s5q-s1-10", sid: "s1", domain: "D2 · Tool Design & MCP", obj: "2.1 Tool granularity & contracts",
      trap: "Right idea, wrong layer", fam: 4, select: 1,
      question:
        "<code>lookup_order</code> currently accepts a single free-text <code>query</code> string and internally " +
        "decides whether it is an order ID, an email, a tracking number or a customer name. Its description says " +
        "\"Look up an order by any identifier.\" Failure analysis shows the agent passing whole customer sentences as " +
        "the query — <code>\"the blender I ordered last Tuesday\"</code> — in about <b>9%</b> of calls, which the tool " +
        "then fails to parse. <b>Which change most reliably fixes this?</b>",
      options: [
        { t: "Split it into purpose-specific tools with defined input contracts — get_order_by_id, find_orders_by_email, find_orders_by_tracking — each stating its exact input format with an example",
          why: "Correct. \"Any identifier\" invites anything, including prose. Named tools with typed, exemplified inputs make the required shape explicit at the point of selection, and the agent has to have the identifier before it can pick a tool — which surfaces the missing information early." },
        { t: "Keep the single tool but expand its description with the four accepted formats, an example of each, and an explicit statement that natural-language descriptions are not accepted",
          why: "Incorrect — genuinely worthwhile, and it will reduce the rate. It is the weaker answer because one parameter that accepts four shapes still has to be disambiguated by the caller on every call, and a description cannot make a free-text field stop accepting free text." },
        { t: "Have the tool return a structured validation error when the query does not match a known identifier pattern, so the agent learns to re-query with a real identifier",
          why: "Incorrect. Good error design, wrong layer for this problem — it corrects after a wasted round trip rather than preventing the malformed call. Do it as well, not instead." },
        { t: "Add a preprocessing step that extracts identifiers from the customer's message before the agent runs, so only clean identifiers reach the tool",
          why: "Incorrect. It adds a pipeline stage to compensate for a loose interface, and cannot help when the customer genuinely gave no identifier — the case that produces the prose queries in the first place." }
      ],
      answer: [0],
      explanation:
        "Generic tools with catch-all parameters are the classic source of misuse. Renaming and splitting into " +
        "purpose-specific tools with defined I/O contracts fixes selection and validity together, because the tool " +
        "name now encodes what the caller must already possess."
    },

    /* ================= SCENARIO 2 — 10 items ================= */

    {
      id: "s5q-s2-01", sid: "s2", domain: "D3 · Claude Code Configuration", obj: "3.3 Diagnosing a rule that never loads",
      trap: "Non-existent or misunderstood feature", fam: 9, select: 1,
      question:
        "A rule file <code>.claude/rules/react-testing.md</code> carries the team's React test conventions with " +
        "frontmatter <code>paths: [\"web/**/*.test.tsx\"]</code>. Engineers report it is never applied. Investigation " +
        "shows the React tests in this repository are named <code>*.spec.tsx</code>, and a handful of shared test " +
        "helpers live at <code>shared/testing/*.tsx</code> outside <code>web/</code> entirely. The Go rule file, " +
        "whose glob matches its files, works correctly. <b>What is the fix?</b>",
      options: [
        { t: "Correct the glob to match the repository's actual file naming and locations — the pattern matched nothing, so the rule was never triggered",
          why: "Correct. A path-scoped rule loads when its glob matches the file being edited; a pattern matching zero files is silently inert. That the Go rule works is the control that isolates the cause to this rule's pattern, not to the mechanism." },
        { t: "Move the React conventions into web/CLAUDE.md so they load whenever anything in that tree is edited",
          why: "Incorrect. It would load for the tests under web/, but it cannot cover shared/testing/ — the stem's detail that helpers live outside web/ is precisely why a directory file is the wrong container here. It also loads the conventions for all non-test React work." },
        { t: "Move the React conventions into the root CLAUDE.md so they are always loaded and cannot be missed",
          why: "Incorrect. It guarantees loading by abandoning scoping, putting test conventions into every Go and Terraform session — the always-loaded bloat the team just finished removing." },
        { t: "Add an instruction to the root CLAUDE.md telling Claude to consult .claude/rules/react-testing.md when editing React tests",
          why: "Incorrect. Rules are loaded by the harness on a path match, not fetched by the model on request. Pointing at a rule whose glob still matches nothing changes nothing." }
      ],
      answer: [0],
      explanation:
        "Path-scoped rules fail silently: a glob that matches nothing produces no error, just no rule. When a " +
        "convention is not being applied, verify the pattern against real filenames first — and remember globs are " +
        "chosen precisely because they cross directory boundaries in a way directory files cannot."
    },

    {
      id: "s5q-s2-02", sid: "s2", domain: "D3 · Claude Code Configuration", obj: "3.1 User vs project scope",
      trap: "Wrong scope or wrong home", fam: 8, select: 1,
      question:
        "Eight contractors join on Monday. The requirement: they must receive the team's conventions, commands and MCP " +
        "configuration on clone, with no per-person setup; they must not inherit any of the six permanent engineers' " +
        "personal preferences; and one permanent engineer's habit of adding <code>// TODO(me):</code> markers must stop " +
        "leaking into shared code. That habit currently lives in that engineer's " +
        "<code>~/.claude/CLAUDE.md</code>. <b>Which statement about the current setup is correct?</b>",
      options: [
        { t: "The contractors already get the project configuration on clone and never see personal user-level files — but the TODO habit affects that one engineer's own sessions on the shared repo, so it must be removed from their user file to stop reaching shared code",
          why: "Correct. User-level ~/.claude/CLAUDE.md is not version-controlled and is never distributed, so contractors are unaffected by construction. But it does apply to that engineer's sessions in every project, including this one — which is exactly how the markers reach shared code." },
        { t: "User-level CLAUDE.md files are merged into the repository configuration on clone, so the contractors will inherit all six engineers' personal preferences unless those are removed first",
          why: "Incorrect. This is the central misconception the item tests. User-level memory lives on one machine, outside version control, and is never transmitted by a clone." },
        { t: "The contractors need their own .claude/CLAUDE.md committed to a contractor branch, since project configuration alone does not reach a fresh clone",
          why: "Incorrect. Project-scoped configuration reaching a fresh clone is precisely what committing it achieves. A separate branch would fragment the shared configuration for no benefit." },
        { t: "The TODO habit is harmless because user-level memory has the lowest precedence and project-level conventions override it wherever they conflict",
          why: "Incorrect. Precedence resolves conflicts; it does not suppress additive instructions. No project rule says \"do not add TODO(me) markers\", so there is nothing to override and the instruction simply applies." }
      ],
      answer: [0],
      explanation:
        "User-level memory is per-machine and never shared; project-level memory travels with the repository. " +
        "Precedence only settles direct conflicts — an additive personal instruction with no project counterpart is " +
        "applied, not overridden. <code>/memory</code> shows which files are actually loaded."
    },

    {
      id: "s5q-s2-03", sid: "s2", domain: "D3 · Claude Code Configuration", obj: "3.2 context: fork",
      trap: "Right idea, wrong layer", fam: 4, select: 1,
      question:
        "A <code>/codemod-audit</code> skill scans the repository for call sites needing migration. It reads roughly " +
        "<b>200 files</b> and emits a 30-line report. Engineers find the report useful but complain that after running " +
        "it, the rest of the session degrades — Claude starts referring to unrelated files it saw during the scan and " +
        "loses the thread of the actual task. <b>Which frontmatter change addresses this?</b>",
      options: [
        { t: "Set context: fork so the skill runs in an isolated sub-agent context and only its 30-line report returns to the main conversation",
          why: "Correct. This is exactly what forked context is for: the 200 files are consumed inside the isolated context and discarded, and only the summary crosses back. The main conversation gains the report without the scan debris." },
        { t: "Set allowed-tools to Read and Grep only, so the skill cannot pull in as much unrelated material during its scan",
          why: "Incorrect — a good least-privilege habit, but it does not help here. Reading is the whole job; restricting the tool list does not stop 200 files entering the main context, because the pollution is the volume, not the tool." },
        { t: "Add an argument-hint so engineers scope the scan to one directory, keeping the number of files read small",
          why: "Incorrect. It shrinks the problem by shrinking the task, and the audit's value is that it is repository-wide. Narrowing scope to protect context is the wrong trade when isolation is available." },
        { t: "Move the audit from a skill into a slash command, since commands do not accumulate context the way skills do",
          why: "Incorrect, and based on a distinction that does not exist. Commands are not context-isolated by nature. The isolation property comes from context: fork, not from choosing one authoring format over the other." }
      ],
      answer: [0],
      explanation:
        "<code>context: fork</code> runs a skill in an isolated sub-agent context so verbose intermediate work never " +
        "reaches the main conversation. The pattern generalises: anything that reads a lot and reports a little is a " +
        "candidate for isolation."
    },

    {
      id: "s5q-s2-04", sid: "s2", domain: "D3 · Claude Code Configuration", obj: "3.2 Skill frontmatter & tools",
      trap: "Prompt where enforcement was required", fam: 1, select: 1,
      question:
        "The <code>/codemod-audit</code> skill is read-only by intent. Its <code>SKILL.md</code> body opens with " +
        "\"This skill must never modify files — report findings only.\" Twice in the last month it has edited a file " +
        "it was auditing, both times when the finding looked trivially fixable. <b>Which change makes the read-only " +
        "property hold?</b>",
      options: [
        { t: "Declare allowed-tools in the skill's frontmatter listing only Read, Grep and Glob, so no write-capable tool is available to it at all",
          why: "Correct. allowed-tools is enforced by the harness, not interpreted by the model. A tool that is not in the list cannot be called, which converts an instruction the model may reason around into a capability that does not exist." },
        { t: "Strengthen the instruction to \"You are strictly forbidden from using Edit or Write under any circumstances\" and repeat it at the end of the skill body",
          why: "Incorrect. The skill already carries a clear prohibition and it was overridden twice by plausible local reasoning. Emphasis does not change the class of control." },
        { t: "Add a PreToolUse hook that blocks Edit and Write while the audit skill is running",
          why: "Incorrect — it would work, and hooks are the right tool for cross-cutting policy. It is the weaker answer because it puts the constraint outside the skill that owns it, in a global mechanism that must know about skill state, when the skill's own frontmatter expresses it directly." },
        { t: "Set context: fork so any edits the skill makes happen in an isolated context and do not affect the main session",
          why: "Incorrect, and a misunderstanding worth clearing up. Forked context isolates the conversation, not the filesystem. A write inside a forked skill still writes to the real repository." }
      ],
      answer: [0],
      explanation:
        "Skill frontmatter carries enforcement, not just documentation: <code>allowed-tools</code> restricts " +
        "capability, <code>context: fork</code> isolates context, <code>argument-hint</code> guides invocation. When a " +
        "skill must never do something, remove the tool rather than forbidding its use."
    },

    {
      id: "s5q-s2-05", sid: "s2", domain: "D3 · Claude Code Configuration", obj: "3.5 Interview pattern",
      trap: "More context instead of better structure", fam: 5, select: 1,
      question:
        "The migration codemod touches ~70 files across two trees. The engineer has written a 400-word prose " +
        "specification and re-run it three times; each run makes different assumptions about cases the spec does not " +
        "cover — whether to migrate commented-out call sites, what to do when a call site is inside a test fixture, " +
        "whether to preserve existing import aliases. Each rerun fixes one gap and exposes another. <b>What is the " +
        "most effective next step?</b>",
      options: [
        { t: "Ask Claude to interview them first — to list the ambiguities and edge cases it sees in the spec and ask clarifying questions before writing any code",
          why: "Correct. The failure pattern is a spec with unknown holes, discovered one per expensive run. The interview pattern surfaces the whole set of ambiguities up front, at conversation cost rather than at 70-file-rerun cost, and the answers become the specification." },
        { t: "Expand the specification with a detailed section for every edge case they can now think of, and rerun",
          why: "Incorrect. It is the fourth iteration of the loop that is already failing — and it is limited to edge cases the engineer can imagine, which by definition excludes the ones that keep surprising them." },
        { t: "Provide two or three concrete before-and-after file examples covering the tricky cases, alongside the existing prose",
          why: "Incorrect — and this is the strong distractor, because concrete input/output examples genuinely beat prose. It is second-best here because examples can only demonstrate cases you already know are contentious; the engineer's problem is that they keep discovering new ones." },
        { t: "Run the codemod in plan mode so the plan can be reviewed before any file is changed",
          why: "Incorrect for the root cause. Plan mode is right for this task and should be used — but reviewing a plan built on an ambiguous spec surfaces the same gaps one at a time, just earlier. It reduces the cost of the loop without ending it." }
      ],
      answer: [0],
      explanation:
        "When repeated attempts each fail differently, the specification is incomplete in ways its author cannot " +
        "enumerate. The interview pattern — have Claude ask questions before implementing — extracts the unknown " +
        "unknowns cheaply. Examples and plan mode are complements once the gaps are named."
    },

    {
      id: "s5q-s2-06", sid: "s2", domain: "D3 · Claude Code Configuration", obj: "3.5 Message batching strategy",
      trap: "Right idea, wrong layer", fam: 4, select: 1,
      question:
        "The engineer has four remaining tasks: (a) rename a widely-used type, (b) update the import statements that " +
        "reference it, (c) add a CHANGELOG entry, and (d) bump a version constant in an unrelated file. Tasks (a) and " +
        "(b) are tightly coupled — the correct import edits depend entirely on how the rename is done. <b>How should " +
        "these be sent?</b>",
      options: [
        { t: "Tasks (a) and (b) together in a single message, and (c) and (d) as separate messages",
          why: "Correct. Interacting problems belong in one message so the model can reason about them jointly and keep the decisions consistent; independent problems belong in separate messages so each gets clean, undiluted attention. This split follows the actual dependency structure." },
        { t: "All four in one message, so Claude has complete context about the change set and can sequence the work itself",
          why: "Incorrect. Bundling independent work dilutes attention across unrelated concerns and makes the response harder to review. Complete context is not free — irrelevant context competes with relevant context." },
        { t: "All four as separate messages, so each task is small, individually reviewable and easy to redo if wrong",
          why: "Incorrect. It splits (a) from (b), which is the one pair that must be decided together — the import edits depend on the rename's outcome, so separating them invites an inconsistent result." },
        { t: "Tasks (a), (b) and (c) together since they belong to one logical change, with (d) separate as it touches an unrelated file",
          why: "Incorrect — the most tempting wrong answer, because it groups by narrative rather than by dependency. The CHANGELOG entry is a description of the change, not an input to it; nothing about the rename decision depends on it." }
      ],
      answer: [0],
      explanation:
        "Group by dependency, not by theme. A single message for problems that interact, sequential messages for " +
        "problems that do not. \"They are all part of the same PR\" is a project-management grouping, not a reasoning " +
        "one."
    },

    {
      id: "s5q-s2-07", sid: "s2", domain: "D5 · Context & Reliability", obj: "5.4 Scratchpads & manifests",
      trap: "More context instead of better structure", fam: 5, select: 1,
      question:
        "The codemod runs for over an hour across ~70 files. Twice it has been interrupted — once by a crash, once by " +
        "the engineer needing the machine — and both times the work restarted from nothing because Claude could not " +
        "reliably say which files it had already converted. <b>Which change makes the work resumable with least added " +
        "complexity?</b>",
      options: [
        { t: "Have Claude maintain a manifest file recording each file's conversion status as it goes, and start any resumed run by reading that manifest",
          why: "Correct. Structured state persistence on disk survives crashes, context boundaries and session ends — none of which the conversation does. It is a small file, and reading it is the first step of every run, so recovery is the normal path rather than a special one." },
        { t: "Use --resume to continue the interrupted session, so the prior conversation and its tool results are restored",
          why: "Incorrect. Resumption restores the conversation, not the world — and a crash mid-run leaves the last actions ambiguous even within the restored transcript. It also carries stale tool results describing files that have since changed." },
        { t: "Run /compact periodically so the session stays small enough to complete the whole codemod without hitting a context boundary",
          why: "Incorrect. It addresses context growth, which is a real concern, but not durability — a crash still loses everything, and compaction may itself discard the per-file progress detail." },
        { t: "Split the codemod into seven runs of ten files each, so an interruption loses at most ten files of work",
          why: "Incorrect — it does bound the loss, and manual chunking is a reasonable fallback. It is weaker because it relies on the engineer tracking which chunk was reached, which is the same bookkeeping problem moved into a human's head." }
      ],
      answer: [0],
      explanation:
        "Long mechanical work needs durable external state. A manifest or scratchpad file persists findings and " +
        "progress across context boundaries and crashes; conversation state does not. Resumption restores what was " +
        "said, never what is now true on disk."
    },

    {
      id: "s5q-s2-08", sid: "s2", domain: "D5 · Context & Reliability", obj: "5.4 Context degradation signals",
      trap: "Treating the symptom", fam: 3, select: 1,
      question:
        "Deep into a long session an engineer notices Claude has begun answering with phrases like \"typically in a Go " +
        "service you would…\" instead of citing the specific handlers it read an hour earlier, and it has twice " +
        "contradicted a decision made earlier in the same session. <b>What do these two signals together " +
        "indicate?</b>",
      options: [
        { t: "Context degradation — earlier specific findings are no longer effectively available, so the model is falling back on general patterns; the fix is to persist the key findings and start fresh with them",
          why: "Correct. Generic answers replacing specific ones, plus self-contradiction, are the documented signature of a session whose earlier content is no longer being used well. The remedy is to extract what matters into a durable summary and begin a new session seeded with it." },
        { t: "The model is being asked questions outside what it read, so the fix is to have it re-read the relevant handlers before each question",
          why: "Incorrect. Re-reading pushes more material into an already-degraded context, and the contradiction signal shows the problem is not missing input but ineffective use of what is present." },
        { t: "Reasoning effort is too low for the complexity of the questions being asked at this stage of the session",
          why: "Incorrect. Effort governs how hard the model thinks, not how well it retrieves from a long context. More reasoning over degraded context produces more confident generic answers." },
        { t: "The session has hit its context limit and is silently dropping the oldest messages, so the fix is a model with a larger window",
          why: "Incorrect — it names a plausible mechanism and jumps to the wrong remedy. A larger window postpones the same degradation rather than removing it; the structural fix is to stop relying on a very long conversation to carry findings." }
      ],
      answer: [0],
      explanation:
        "Two named symptoms: answers drifting from specific findings toward typical patterns, and inconsistency with " +
        "earlier statements. Both say the same thing — persist findings to a scratchpad, start a fresh session seeded " +
        "with them, and delegate verbose exploration so it never enters the main context."
    },

    {
      id: "s5q-s2-09", sid: "s2", domain: "D4 · Prompt Engineering", obj: "4.2 Few-shot for ambiguous cases",
      trap: "More context instead of better structure", fam: 5, select: 1,
      question:
        "The codemod handles clear-cut call sites correctly. The disagreement is entirely in the ambiguous middle: a " +
        "call site inside a deprecated module, one behind a feature flag that is off in production, one in a test " +
        "fixture asserting the <em>old</em> behaviour. The engineer has described the desired handling for each in " +
        "prose, twice, and results still vary between runs. <b>What communicates the intended handling most " +
        "reliably?</b>",
      options: [
        { t: "Two to four worked examples covering exactly those ambiguous cases, each showing the input, the chosen action and the one-line reasoning for choosing it",
          why: "Correct. Few-shot examples are the most effective technique for consistency when instructions alone produce variable output, and their power is greatest on ambiguous cases. Including the reasoning is what lets the model generalise to the ambiguous cases nobody has enumerated yet." },
        { t: "A decision table in the prompt listing each ambiguous condition and its required action, so the rules are unambiguous and complete",
          why: "Incorrect — a genuinely good artefact, and better than the current prose. It is second-best because a table states conclusions without the reasoning behind them, so a case that is not in the table has nothing to generalise from — and the stem's whole problem is unenumerated cases." },
        { t: "Raising reasoning effort so the model deliberates more carefully about each ambiguous call site before deciding",
          why: "Incorrect. Careful deliberation without knowing the team's preference produces a well-reasoned answer that may still be the wrong one. The missing input is intent, not thinking time." },
        { t: "Splitting the ambiguous cases into their own run so they receive dedicated attention separate from the mechanical ones",
          why: "Incorrect. Isolating them concentrates the ambiguity without resolving it — the model still does not know what the team wants for a fixture that asserts old behaviour." }
      ],
      answer: [0],
      explanation:
        "Few-shot examples beat instructions for consistency, and their highest-value use is demonstrating " +
        "ambiguous-case handling. Showing the reasoning alongside the chosen action is what enables generalisation to " +
        "novel patterns rather than mere pattern-matching."
    },

    {
      id: "s5q-s2-10", sid: "s2", domain: "D4 · Prompt Engineering", obj: "4.6 Multi-pass review architecture",
      trap: "Right idea, wrong layer", fam: 4, select: 1,
      question:
        "The finished codemod must be reviewed. A single review pass over all ~70 changed files produces a report " +
        "that is thorough about the first eight files, thin about the middle, and misses two <b>cross-file " +
        "inconsistencies</b> entirely — one module was migrated to the new API while its caller was left on the old " +
        "one. <b>Which review architecture best fits this change?</b>",
      options: [
        { t: "A per-file pass for local correctness, followed by a separate integration pass that examines only the cross-file contracts and call-site consistency",
          why: "Correct. It matches the two distinct defect classes to two passes. Per-file review avoids attention dilution across 70 files; a dedicated integration pass looks specifically for the mismatches that are invisible when reading any single file in isolation." },
        { t: "One review pass with the files ordered by risk, so the most consequential files receive the model's strongest attention at the start",
          why: "Incorrect. It concedes that attention degrades and merely chooses who suffers. It also cannot find cross-file inconsistencies at all, since those live in the relationship between files rather than in any one of them." },
        { t: "A single pass with substantially raised reasoning effort, so the model sustains depth across all 70 files",
          why: "Incorrect. Effort does not repair attention dilution across a very large input, and the cross-file misses are a structural blind spot rather than a depth problem." },
        { t: "Seventy independent single-file reviews run in parallel, with the findings concatenated into one report",
          why: "Incorrect — it fixes dilution properly, which makes it tempting. But it is exactly the architecture that cannot catch the module/caller mismatch: no reviewer ever sees both sides. It is the first half of the right answer with the second half missing." }
      ],
      answer: [0],
      explanation:
        "Large multi-file changes carry two defect classes. Local correctness is found per file; contract mismatches " +
        "are found only by a pass whose explicit subject is the relationships between files. One pass over everything " +
        "reliably finds neither."
    },

    /* ================= SCENARIO 3 — 10 items ================= */

    {
      id: "s5q-s3-01", sid: "s3", domain: "D1 · Agentic Architecture", obj: "1.3 Task tool & allowedTools",
      trap: "Non-existent or misunderstood feature", fam: 9, select: 1,
      question:
        "A newly added <code>fact-check</code> subagent never runs. The coordinator's prompt describes when to " +
        "delegate to it, the <code>AgentDefinition</code> is registered with a description and system prompt, and the " +
        "coordinator's own <code>allowedTools</code> lists <code>Read</code>, <code>Grep</code> and " +
        "<code>WebSearch</code>. The coordinator instead does the fact-checking inline and the runs get slower. " +
        "<b>What is the most likely cause?</b>",
      options: [
        { t: "The coordinator's allowedTools does not include \"Task\", so it has no mechanism to spawn any subagent and falls back to doing the work itself",
          why: "Correct. Subagents are spawned via the Task tool, and a coordinator that cannot call Task cannot delegate — no matter how well its prompt describes delegation or how well the subagent is defined. The observed fallback to inline work is exactly what a missing capability looks like from the outside." },
        { t: "The fact-check AgentDefinition's description is not distinctive enough, so the coordinator does not recognise when it applies",
          why: "Incorrect — a real failure mode, but it would produce occasional or misrouted delegation, not zero. \"Never runs\" while five other subagents work points at capability, not selection." },
        { t: "Subagents do not inherit the coordinator's context, so the fact-check agent has nothing to check and returns immediately",
          why: "Incorrect. Context isolation is true and important, but it would show up as a subagent that runs and produces poor output — not one that never appears at all." },
        { t: "The coordinator is spawning it but the result is being discarded because the fact-check subagent has no tools of its own to report with",
          why: "Incorrect. A spawned subagent returns its final message to the coordinator regardless of its tool list; the described slowdown from inline work also contradicts a spawn actually occurring." }
      ],
      answer: [0],
      explanation:
        "Delegation has a hard prerequisite: <code>allowedTools</code> must include <code>\"Task\"</code>. Prompt " +
        "instructions describing when to delegate are inert without it. When a subagent never runs at all, check " +
        "capability before tuning descriptions."
    },

    {
      id: "s5q-s3-02", sid: "s3", domain: "D1 · Agentic Architecture", obj: "1.2 Scope partitioning",
      trap: "Treating the symptom", fam: 3, select: 1,
      question:
        "In about a fifth of runs, two subagents research substantially the same ground — the web-search and " +
        "filings-analysis agents both retrieve and summarise the same investor presentation, and the coordinator " +
        "receives the same material twice with slightly different wording. Cost per run has risen to $4.10. The " +
        "coordinator's delegation prompt says \"research the competitive landscape\" to one and \"analyse company " +
        "disclosures\" to the other. <b>Which change most directly removes the duplication?</b>",
      options: [
        { t: "Partition the scope explicitly in each delegation prompt — assign named source classes and state what each subagent must not cover, so their territories are disjoint by construction",
          why: "Correct. The duplication comes from two overlapping remits stated in general language, and \"investor presentation\" plausibly belongs to both. Explicit, mutually exclusive scope in the delegation prompt is what makes coverage disjoint, and it is the coordinator's job to define it." },
        { t: "Have the coordinator deduplicate the aggregated results, dropping any source that appears in more than one subagent's output",
          why: "Incorrect. It cleans the report while paying for the duplicated work twice — the cost, the latency and the tokens are already spent by aggregation time. It treats the visible symptom and leaves the waste." },
        { t: "Run the subagents sequentially and pass each one the list of sources already covered, so later agents can skip them",
          why: "Incorrect — it does prevent duplication, which makes it plausible. But it serialises work that is naturally parallel, directly worsening the 9–16 minute runtime, and it grows every later subagent's prompt with an accumulating exclusion list." },
        { t: "Merge the web-search and filings-analysis subagents into one, since their remits evidently overlap",
          why: "Incorrect. It removes duplication by removing specialisation, and hands one agent a much larger context and two distinct skill sets. Overlapping instructions are a prompt defect, not evidence that two roles should be one." }
      ],
      answer: [0],
      explanation:
        "Coordinators own decomposition, and decomposition means partitioning scope so subagent territories do not " +
        "overlap. Generic remits produce both duplication and gaps. Deduplicating afterwards pays for the waste and " +
        "keeps it."
    },

    {
      id: "s5q-s3-03", sid: "s3", domain: "D1 · Agentic Architecture", obj: "1.3 Coordinator prompt design",
      trap: "Prompt where enforcement was required", fam: 1, select: 1,
      question:
        "The coordinator's prompt is a 60-step procedure: \"Step 1: call web search with the analyst's question. Step " +
        "2: extract entities. Step 3: for each entity call filings analysis…\". It works for the question shapes it " +
        "was written for. For anything else — a question about a regulatory change with no named companies — the " +
        "coordinator either follows the steps into an empty result or improvises badly. <b>How should the coordinator " +
        "prompt be written instead?</b>",
      options: [
        { t: "As a goal with explicit quality criteria — what a good report contains, what counts as sufficient evidence, when a subagent's output is inadequate — leaving the coordinator to choose the steps",
          why: "Correct. Coordinator prompts should state goals and quality criteria rather than procedures, because the coordinator's actual job is deciding which subagents a given question needs. Criteria transfer to question shapes nobody anticipated; a step list does not." },
        { t: "As the same procedure, but with conditional branches added for the question types that currently fail",
          why: "Incorrect. It extends a procedure to cover the failures observed so far and will fail on the next unanticipated shape. Enumerating branches is the approach the evidence is already refuting." },
        { t: "As a procedure for the common case, with an instruction to depart from it and improvise when the question does not fit",
          why: "Incorrect. \"Improvise when this does not fit\" is exactly the behaviour the stem reports as failing badly — because the prompt supplies no criteria to improvise against." },
        { t: "As a short goal statement only, letting the coordinator determine both the approach and what constitutes a good report",
          why: "Incorrect — and this is the near-miss. Goals over procedures is right, but dropping the quality criteria removes the standard the coordinator evaluates against, which is what the gap-evaluation and re-delegation loop depends on. Goals plus criteria, not goals alone." }
      ],
      answer: [0],
      explanation:
        "Write coordinator prompts as goals and quality criteria, not step-by-step procedures. The criteria are what " +
        "let the coordinator judge whether a synthesis has gaps and re-delegate — a procedural prompt has no notion of " +
        "\"good enough\"."
    },

    {
      id: "s5q-s3-04", sid: "s3", domain: "D1 · Agentic Architecture", obj: "1.2 Iterative refinement loop",
      trap: "Disproportionate fix", fam: 2, select: 1,
      question:
        "The coordinator aggregates subagent output into a report and returns it. It has no step that assesses whether " +
        "the aggregate actually answers the analyst's question. Analysts report that roughly <b>one report in six</b> " +
        "is internally fine but leaves an obvious part of the question untouched — a question about three regions " +
        "comes back covering two. <b>Which addition fixes this most economically?</b>",
      options: [
        { t: "An evaluation step where the coordinator checks the draft synthesis against the original question for gaps and re-delegates targeted subtasks for whatever is missing, then re-synthesises",
          why: "Correct. This is the iterative refinement loop, and it is the coordinator's own responsibility. It is economical because it re-delegates only the gap — the missing region — rather than repeating the whole pipeline, and it uses information the coordinator already has." },
        { t: "A dedicated quality-assurance subagent that reviews every finished report against the question and returns a pass or fail verdict",
          why: "Incorrect — plausible, but it adds a seventh subagent and a full extra context to perform a check the coordinator is best placed to make, since only the coordinator holds both the original question and the decomposition it chose." },
        { t: "Have each subagent self-assess whether it fully covered its assigned subtask and report a coverage score",
          why: "Incorrect. It asks the wrong question at the wrong level. Every subagent can correctly cover its assigned subtask while the decomposition omitted a region entirely — the gap is in what was assigned, which no subagent can see." },
        { t: "Have the coordinator generate a more granular decomposition up front, producing more subtasks so fewer aspects can be missed",
          why: "Incorrect. More subtasks reduce the probability of a gap without detecting one, and drive up cost and runtime on every run to mitigate a one-in-six failure. It also risks the opposite problem — over-narrow decomposition losing the broad view." }
      ],
      answer: [0],
      explanation:
        "The coordinator's loop is decompose → delegate → aggregate → <b>evaluate for gaps</b> → re-delegate → " +
        "re-synthesise. Skipping the evaluation step is what lets a well-executed pipeline return a confidently " +
        "incomplete answer."
    },

    {
      id: "s5q-s3-05", sid: "s3", domain: "D5 · Context & Reliability", obj: "5.6 Structured claim-source mapping",
      trap: "Losing or fabricating information", fam: 7, select: 2,
      question:
        "Citations are attached at the end of the pipeline: the report-generation subagent receives the synthesis " +
        "subagent's prose and a flat list of every URL gathered during the run, then matches claims to URLs by " +
        "topical similarity. Spot-checking finds citations that point at a plausible source which does not contain " +
        "the claim. The synthesis subagent receives its inputs as prose paragraphs with source names mentioned inline. " +
        "<b>Select TWO changes that together fix attribution.</b>",
      options: [
        { t: "Carry structured claim-to-source mappings through synthesis, so each claim keeps its originating source identifier as data rather than as prose",
          why: "Correct. Attribution is lost the moment summarisation compresses text that mentioned its source. Keeping the mapping as a structured field means synthesis can rewrite the prose freely without severing the link." },
        { t: "Have research subagents return content and metadata in separate structured fields — claim text, source URL, document title, page or section — instead of prose with source names woven in",
          why: "Correct. This is the upstream half. If metadata arrives already separated from content, it survives every downstream transformation; if it is embedded in sentences, the first rewrite destroys it." },
        { t: "Have the report-generation subagent verify each citation by re-fetching the source and confirming the claim appears in it",
          why: "Incorrect — it would catch errors, and verification has value. But it is an expensive check bolted onto a broken pipeline: it re-fetches every source on every run to detect a linkage that should never have been lost, and cannot repair a claim whose true source is now unknown." },
        { t: "Instruct the synthesis subagent to preserve source attributions carefully when rewriting, with examples of correctly attributed paragraphs",
          why: "Incorrect. It asks the model to maintain a data relationship by hand through a rewriting task. Structured fields make the mapping impossible to lose; an instruction makes it merely likely to survive." },
        { t: "Reduce the number of sources per report so there are fewer candidate URLs for the matching step to confuse",
          why: "Incorrect. It lowers the collision rate of a guessing procedure while keeping the guessing, and degrades the research to do so." }
      ],
      answer: [0, 1],
      explanation:
        "Attribution must be preserved as structured data from the point of collection, through synthesis, to " +
        "rendering. Matching claims to sources after the fact is inference, not citation — and inference is exactly " +
        "what a citation is supposed to remove."
    },

    {
      id: "s5q-s3-06", sid: "s3", domain: "D2 · Tool Design & MCP", obj: "2.3 Restricting a subagent's tools",
      trap: "Prompt where enforcement was required", fam: 1, select: 1,
      question:
        "The synthesis subagent is supposed to write only from the evidence the coordinator hands it. Its " +
        "<code>AgentDefinition</code> grants it the same tool set as the research subagents, including " +
        "<code>WebSearch</code>. Audit finds that in about <b>12%</b> of runs it performs its own searches mid-draft " +
        "when it feels a gap, and the material it pulls in arrives with no claim-source mapping — which is where a " +
        "disproportionate share of the bad citations originate. Its system prompt already says to use only the " +
        "supplied evidence. <b>Which change is most effective?</b>",
      options: [
        { t: "Remove the research tools from the synthesis subagent's AgentDefinition, so it can only synthesise from what it was given",
          why: "Correct. Per-subagent tool restriction is what AgentDefinition is for, and it converts a standing instruction the model overrides 12% of the time into a capability it does not have. It also removes the untracked-evidence path at its source." },
        { t: "Strengthen the synthesis subagent's system prompt with an explicit prohibition on searching and examples of working only from supplied evidence",
          why: "Incorrect. The prohibition already exists and is being overridden in exactly the situation — a perceived evidence gap — that examples would depict. This is prompt-based compliance where enforcement is available." },
        { t: "Keep the tools but require the synthesis subagent to attach a claim-source mapping to anything it retrieves itself, so provenance survives",
          why: "Incorrect — it addresses the citation symptom, and would help. But it leaves synthesis silently expanding the evidence base outside the coordinator's decomposition, so scope partitioning and gap evaluation are both operating on an incomplete picture of what was researched." },
        { t: "Have the coordinator detect gaps before delegating to synthesis, so no gap remains for the synthesis subagent to want to fill",
          why: "Incorrect. Gap evaluation belongs after synthesis, on the draft — that is the point of the refinement loop. And no amount of upstream diligence removes the capability, so the behaviour remains available on any run." }
      ],
      answer: [0],
      explanation:
        "<code>AgentDefinition</code> carries per-subagent tool restrictions, and scoping tools to a subagent's " +
        "specialisation is the enforcement mechanism for \"this agent should not do that\". Agents holding tools " +
        "outside their specialisation misuse them."
    },

    {
      id: "s5q-s3-07", sid: "s3", domain: "D5 · Context & Reliability", obj: "5.6 Temporal & conflicting sources",
      trap: "Losing or fabricating information", fam: 7, select: 1,
      question:
        "The synthesis subagent has flagged a contradiction: one source says the market grew 12% and another says it " +
        "contracted 3%. Both are reputable. On inspection the first covers calendar 2024 and the second the twelve " +
        "months to June 2026 — the sources are not in conflict at all, they cover different periods, and neither " +
        "subagent captured a date. <b>Which change prevents this class of error?</b>",
      options: [
        { t: "Require publication and data-collection dates as structured fields on every retrieved source, and have synthesis compare periods before treating figures as contradictory",
          why: "Correct. The apparent contradiction is an artefact of missing temporal metadata. Capturing dates as required fields makes period differences visible, and turns a false conflict into two compatible facts about different windows." },
        { t: "Have synthesis annotate both figures with their sources and present them side by side as a genuine disagreement for the analyst to resolve",
          why: "Incorrect — and this is the strong distractor, because annotating real conflicts with attribution rather than silently picking one is exactly right when a conflict is real. Here it is not: the pipeline would hand the analyst a manufactured disagreement it had the means to resolve." },
        { t: "Instruct the synthesis subagent to prefer the most recent source whenever two statistics conflict",
          why: "Incorrect. It picks a winner between two figures that are both correct, discarding the 2024 datapoint. Recency is a reasonable tiebreak between competing estimates of the same period — not between different periods." },
        { t: "Have the fact-check subagent verify both figures against their sources and drop whichever cannot be confirmed",
          why: "Incorrect. Both figures verify perfectly against their sources, because both are accurate. Verification cannot detect a mismatch of time ranges when neither range was recorded." }
      ],
      answer: [0],
      explanation:
        "Require dates so temporal differences are not misread as contradictions. Genuine conflicts get annotated with " +
        "source attribution rather than arbitrarily resolved — but first establish that the conflict is real."
    },

    {
      id: "s5q-s3-08", sid: "s3", domain: "D1 · Agentic Architecture", obj: "1.2 Dynamic subagent selection",
      trap: "Disproportionate fix", fam: 2, select: 1,
      question:
        "An analyst asks: <i>\"What was Acme's stated gross margin in their most recent annual filing?\"</i> The " +
        "coordinator runs the full six-subagent pipeline: web search, filings analysis, document analysis, synthesis, " +
        "fact-check and report generation. The run costs $4.10 and takes eleven minutes to answer a question with a " +
        "single number as its answer. <b>What is the correct response to this?</b>",
      options: [
        { t: "Have the coordinator select subagents by query complexity, routing a single-fact lookup to filings analysis alone and reserving the full pipeline for genuinely broad questions",
          why: "Correct. Dynamic subagent selection is a core coordinator responsibility. Complexity-proportionate routing keeps the pipeline available for questions that need it, without charging every question for the maximum." },
        { t: "Add a cheap pre-classifier that labels each query simple or complex before the coordinator runs, and gate the pipeline on its verdict",
          why: "Incorrect — and it would work. It is disproportionate because it adds a component to do what the coordinator is already positioned to do: the coordinator reads the question and owns decomposition, so the judgement belongs there rather than in a new gate." },
        { t: "Keep the fixed pipeline for consistency and cache results, so repeated single-fact questions are answered cheaply after the first run",
          why: "Incorrect. Caching helps repeats and does nothing for the first instance of each new question, which is most of them. It also preserves a design where cost is unrelated to question difficulty." },
        { t: "Let the analyst choose between a quick-lookup mode and a full-research mode when submitting the question",
          why: "Incorrect — reasonable product design, and it may be worth offering. As the primary fix it pushes an architectural judgement onto the user, who will sometimes pick wrong in both directions, and it leaves the coordinator's routing logic as unconditional as before." }
      ],
      answer: [0],
      explanation:
        "Coordinators should dynamically select which subagents a query needs rather than always routing the full " +
        "pipeline. Always-maximal decomposition is as much a design defect as decomposition that is too narrow — it " +
        "just fails on cost and latency instead of coverage."
    },

    {
      id: "s5q-s3-09", sid: "s3", domain: "D1 · Agentic Architecture", obj: "1.2 Hub-and-spoke communication",
      trap: "Disproportionate fix", fam: 2, select: 1,
      question:
        "The fact-check subagent frequently needs a source re-fetched. Today it reports the need to the coordinator, " +
        "which re-delegates to web search — two extra hops. An engineer proposes letting fact-check call the " +
        "web-search subagent directly, and more generally letting any subagent invoke any other, arguing this removes " +
        "coordinator round trips and cuts a minute or two from each run. <b>What is the strongest objection?</b>",
      options: [
        { t: "It abandons hub-and-spoke: the coordinator would no longer see all inter-agent traffic, so error handling, routing, scope partitioning and cost control lose the single place they are enforced",
          why: "Correct. In hub-and-spoke the coordinator manages inter-subagent communication precisely so that failures, duplication and spend have one accountable point. Peer-to-peer delegation moves those concerns into every subagent and makes a run's actual behaviour unobservable from the centre." },
        { t: "Subagents run in isolated contexts, so one cannot pass useful context to another and any direct call would be uninformed",
          why: "Incorrect. Context isolation means nothing is inherited automatically, not that a caller cannot supply context explicitly — a direct call could pass it in the prompt, exactly as the coordinator does." },
        { t: "It risks infinite delegation loops, with two subagents able to call each other indefinitely",
          why: "Incorrect — a real hazard worth bounding, but a secondary and solvable one (depth limits). It is not the structural objection, and citing it concedes the architecture while patching a side effect." },
        { t: "The latency saving is illusory because the coordinator's re-delegation is not the dominant cost in a 9–16 minute run",
          why: "Incorrect as the strongest objection, though the arithmetic is fair. It disputes the benefit rather than naming the architectural cost — and would stop applying the moment someone found a case where the saving was material." }
      ],
      answer: [0],
      explanation:
        "Hub-and-spoke exists so one component owns inter-subagent communication, error handling and routing. " +
        "Frequent coordinator round trips are a signal to reconsider the decomposition — perhaps fact-check should " +
        "hold a narrow retrieval capability of its own — not to let every agent talk to every other."
    },

    {
      id: "s5q-s3-10", sid: "s3", domain: "D2 · Tool Design & MCP", obj: "2.4 MCP tool descriptions vs built-ins",
      trap: "Right idea, wrong layer", fam: 4, select: 1,
      question:
        "The firm exposes an MCP server over its internal research library with a <code>search_library</code> tool " +
        "that does semantic search across fifteen years of analyst notes, ranked by relevance and returning document " +
        "metadata. Its description reads \"Search the research library.\" Subagents overwhelmingly reach for " +
        "<code>Grep</code> against the library's exported text files instead, and miss anything not matching a literal " +
        "keyword. <b>Which change most reliably redirects them?</b>",
      options: [
        { t: "Rewrite the MCP tool's description to state what it does that Grep cannot — semantic matching, relevance ranking, metadata — with example queries and the cases where it is the right choice",
          why: "Correct. The description is the selection mechanism, and \"Search the research library\" reads as a weaker restatement of what Grep already does. Naming the differentiating capability and showing example queries is what shifts selection." },
        { t: "Remove Grep from the research subagents' allowedTools so the MCP tool is the only search available",
          why: "Incorrect — it would force the outcome, which is why it is tempting. But Grep is legitimately the right tool for exact-string work such as locating a known document ID, and removing a capability to compensate for a weak description is a blunt trade." },
        { t: "Add a line to each subagent's system prompt instructing them to prefer search_library over Grep for research questions",
          why: "Incorrect. It works around the description instead of fixing it, must be repeated in every subagent prompt, and leaves the misleading description in place for anyone who adds a seventh subagent later." },
        { t: "Expose the library as an MCP resource catalogue so subagents can browse the document hierarchy instead of searching it",
          why: "Incorrect. Resources are excellent for reducing exploratory listing calls, but browsing a hierarchy is not a substitute for semantic search over fifteen years of notes — this answers a different need." }
      ],
      answer: [0],
      explanation:
        "When an agent prefers a built-in over a more capable MCP tool, the description is usually the cause. State " +
        "the differentiating capability, the input format and example queries — the model chooses on the description, " +
        "not on the implementation."
    },

    /* ================= SCENARIO 4 — 10 items ================= */

    {
      id: "s5q-s4-01", sid: "s4", domain: "D2 · Tool Design & MCP", obj: "2.5 Incremental tracing",
      trap: "More context instead of better structure", fam: 5, select: 1,
      question:
        "The Sentry error group names a single frame: <code>orders/pricing.py:212</code>. The engineer needs to know " +
        "which call paths reach that line and which of them changed on Tuesday. They ask Claude to read the whole " +
        "<code>orders/</code> package — 90 files, ~28,000 lines — so it \"has the full picture\" before answering. " +
        "<b>What is the more effective approach?</b>",
      options: [
        { t: "Grep for references to the failing function to find its call sites, then Read only those files, following imports outward one hop at a time until the paths are established",
          why: "Correct. Understanding is built incrementally: search to find entry points, read selectively to trace flows. The material that reaches context is then the material on the actual call paths, which is a small fraction of the package and the part that matters." },
        { t: "Read the whole package but ask Claude to summarise each file to a few lines as it goes, so the full picture is retained compactly",
          why: "Incorrect. Every file still passes through context to be summarised, so the token cost is paid in full — and summarising code discards exactly the call-site detail the trace depends on." },
        { t: "Read pricing.py in full first, then ask Claude which other files it needs and read those",
          why: "Incorrect — much better than reading everything, which makes it the strong distractor. It is still weaker because pricing.py shows what it calls, not what calls it; inbound call sites are found by searching the repository, not by reading the callee." },
        { t: "Use Glob to list every file under orders/ matching *.py and have Claude decide from the filenames which to read",
          why: "Incorrect. Glob returns paths, not content, so the decision is made from filenames alone — which say nothing about which files reference the failing function." }
      ],
      answer: [0],
      explanation:
        "Grep finds content; Read follows it. Building understanding incrementally — search for entry points, read to " +
        "trace flows — beats reading everything up front, which fills context with material that is mostly irrelevant " +
        "to the question."
    },

    {
      id: "s5q-s4-02", sid: "s4", domain: "D2 · Tool Design & MCP", obj: "2.4 MCP config & secrets",
      trap: "Wrong scope or wrong home", fam: 8, select: 1,
      question:
        "The Sentry MCP server needs an auth token. The engineer must set it up so the two new joiners get a working " +
        "server on clone, no secret reaches version control, and each person authenticates as themselves. They are " +
        "considering four options for the repository's <code>.mcp.json</code>. <b>Which meets all three " +
        "requirements?</b>",
      options: [
        { t: "Commit .mcp.json with the server definition and \"SENTRY_TOKEN\": \"${SENTRY_TOKEN}\", and have each person export their own token in their shell",
          why: "Correct. The committed file carries the wiring — which server, which command, which variables it needs — and none of the values. Everyone gets a working configuration on clone and supplies their own credential, so all three requirements hold simultaneously." },
        { t: "Have each person add the Sentry server to their own ~/.claude.json with their token inline, keeping it out of the repository entirely",
          why: "Incorrect — it does protect the secret and does authenticate individually, which is why it is tempting. It fails the first requirement: nothing arrives on clone, so every joiner sets the server up by hand from instructions that will drift." },
        { t: "Commit .mcp.json with a shared read-only service-account token so the configuration works immediately for everyone with no per-person setup",
          why: "Incorrect. A committed token is a leaked token the moment it lands in history, and rotating it later does not undo that. It also destroys per-person attribution — every query looks like the service account." },
        { t: "Commit .mcp.json without the env block and document in CLAUDE.md that each person must add their token to the file locally after cloning",
          why: "Incorrect. It invites everyone to edit a tracked file with a secret, which is precisely how tokens get committed by accident — and a modified tracked file shows up in every diff thereafter." }
      ],
      answer: [0],
      explanation:
        "Project-scoped <code>.mcp.json</code> is shared and committed, so it must contain wiring and never values. " +
        "<code>${VAR}</code> expansion is the mechanism that reconciles \"works on clone\" with \"no committed " +
        "secrets\". User-level configuration is for personal or experimental servers."
    },

    {
      id: "s5q-s4-03", sid: "s4", domain: "D2 · Tool Design & MCP", obj: "2.4 Connection-time discovery",
      trap: "Non-existent or misunderstood feature", fam: 9, select: 1,
      question:
        "Mid-session, the engineer adds the Sentry server to <code>.mcp.json</code> and asks Claude to fetch the error " +
        "group. Claude replies that it has no tool for Sentry and offers to fetch the data with <code>Bash</code> and " +
        "<code>curl</code> instead. The JSON is valid and the token is exported correctly. <b>What is " +
        "happening?</b>",
      options: [
        { t: "MCP servers are discovered when the client connects, so a server added mid-session is not present until the session reconnects — the configuration is correct but not yet loaded",
          why: "Correct. Tool discovery happens at connection time: the client connects to each configured server, calls its listing methods, and the resulting tools are fixed for that session. Editing configuration mid-session changes the file, not the running session." },
        { t: "The server definition is missing a required field, so it failed validation and was skipped silently at startup",
          why: "Incorrect. The stem states the JSON is valid — and this explanation would not change after a restart, whereas the actual behaviour does." },
        { t: "The token is exported in the engineer's interactive shell but not in the environment Claude Code inherited, so the server failed to authenticate and exposed no tools",
          why: "Incorrect for this stem — though it is a real and common failure worth recognising. The stem specifies the token is exported correctly; and an auth failure typically surfaces as a connection error rather than the server being absent." },
        { t: "Claude prefers built-in tools over MCP tools when both could accomplish the task, so it chose Bash over the Sentry tools",
          why: "Incorrect. Preference between available tools is a description-quality issue and would still list the MCP tools as available. Claude stated it has no Sentry tool at all, which is absence, not preference." }
      ],
      answer: [0],
      explanation:
        "All configured MCP servers are discovered at connection time and their tools are available simultaneously " +
        "thereafter. Configuration edits require a reconnect. \"I do not have that tool\" means not loaded; \"I used a " +
        "different tool\" means a description problem."
    },

    {
      id: "s5q-s4-04", sid: "s4", domain: "D2 · Tool Design & MCP", obj: "2.5 Edit vs Write",
      trap: "Right idea, wrong layer", fam: 4, select: 1,
      question:
        "The fix requires adding a guard clause at the top of a 40-line function in <code>pricing.py</code>. The file " +
        "is 900 lines and contains three other functions whose opening lines are textually identical to the target's. " +
        "An engineer proposes reading the file and writing it back in full with the change applied, to avoid " +
        "ambiguity. <b>What is the better approach, and why?</b>",
      options: [
        { t: "Use Edit with a match string extended to include enough surrounding context — the function signature plus its first lines — to be unique, reserving Read-plus-Write for cases where no unique anchor exists",
          why: "Correct. Edit's requirement is a unique match, not a short one; widening the anchor to include the signature resolves the collision directly. Targeted edits also leave the other 860 lines untouched, so nothing else can be accidentally altered." },
        { t: "Read the whole file and Write it back with the change, since that is unambiguous and guaranteed to apply exactly the intended content",
          why: "Incorrect — this is the correct fallback when Edit genuinely cannot find a unique anchor, which is why it is plausible. Here a unique anchor plainly exists. Rewriting 900 lines to change three puts the whole file at risk of incidental reformatting and produces an unreviewable diff." },
        { t: "Split pricing.py into smaller modules first so that future edits have less ambiguity to contend with",
          why: "Incorrect. A refactor of production code to make a tooling interaction easier, in the middle of investigating a live incident. The ordering alone disqualifies it." },
        { t: "Use Edit with the short ambiguous string and let it apply to the first match, since the target function appears first in the file",
          why: "Incorrect. Edit errors on a non-unique match rather than guessing, and relying on file ordering would be fragile even if it did not — any reordering silently changes which function gets the guard." }
      ],
      answer: [0],
      explanation:
        "Edit makes a targeted change identified by a unique text match; the fix for a non-unique match is a larger " +
        "anchor. Read-plus-Write is the fallback for when uniqueness is genuinely unobtainable, not the default for " +
        "large files."
    },

    {
      id: "s5q-s4-05", sid: "s4", domain: "D1 · Agentic Architecture", obj: "1.6 Adaptive investigation",
      trap: "Treating the symptom", fam: 3, select: 1,
      question:
        "The engineer writes a fixed five-step investigation plan: read the stack trace, read the failing function, " +
        "read its callers, check the Tuesday diff, propose a fix. At step three it emerges that the failing function " +
        "is fine and the bad input originates in a serialiser two layers up that Tuesday's diff never touched — the " +
        "real change was a schema migration in a different service. The plan has no step for that. <b>What does this " +
        "reveal?</b>",
      options: [
        { t: "Debugging is a case for adaptive decomposition — subsequent steps should be generated from what each step discovers, rather than fixed before any evidence exists",
          why: "Correct. An investigation plan written before the first finding encodes a hypothesis. When the evidence contradicts it, a fixed plan has nowhere to go; adaptive decomposition generates the next subtask from what was actually found." },
        { t: "The plan needed more steps — adding cross-service schema checks and dependency review would have covered this case",
          why: "Incorrect. It patches the plan for the bug just found. The next incident will originate somewhere else, and no fixed list anticipates every origin — that is what makes debugging adaptive rather than procedural." },
        { t: "The plan was right but executed in the wrong order; checking the Tuesday diff before reading the function would have surfaced the mismatch sooner",
          why: "Incorrect. Reordering does not help, because the Tuesday diff never contained the cause. The plan's defect is that it presumes the cause is inside the changes it enumerated." },
        { t: "The investigation should have been delegated to a subagent, which would have explored more broadly than a fixed plan allows",
          why: "Incorrect. Delegation isolates verbose exploration from the main context — a real benefit — but a subagent handed the same five fixed steps hits the same wall. The problem is the plan's rigidity, not where it runs." }
      ],
      answer: [0],
      explanation:
        "Fixed sequential pipelines suit work whose shape is known in advance. Investigation is the opposite: each " +
        "finding determines what is worth doing next, so the decomposition must be generated as evidence arrives."
    },

    {
      id: "s5q-s4-06", sid: "s4", domain: "D1 · Agentic Architecture", obj: "1.3 Explicit subagent context",
      trap: "Non-existent or misunderstood feature", fam: 9, select: 2,
      question:
        "The engineer spawns an Explore subagent to map the serialiser's call paths. Their prompt is: " +
        "<i>\"Investigate the issue we've been discussing and report the call paths involved.\"</i> The subagent " +
        "returns a competent but generic survey of the serialisation layer that never mentions the error group, the " +
        "failing frame or Tuesday's deploy. <b>Select TWO changes that fix this.</b>",
      options: [
        { t: "Include the concrete findings in the subagent's prompt — the error group ID, the failing frame, the suspected serialiser and the schema migration found so far",
          why: "Correct. Subagents do not inherit the parent conversation; \"the issue we've been discussing\" refers to context the subagent has never seen. Everything it needs must be stated in its prompt." },
        { t: "State the deliverable and its quality criteria explicitly — which call paths, in what structure, and what makes the report complete",
          why: "Correct. \"Report the call paths involved\" leaves the subagent to guess scope and format. Naming the deliverable and the standard is what turns a generic survey into a usable answer, and it is the same goals-plus-criteria discipline coordinators need." },
        { t: "Grant the subagent the same allowedTools as the parent session so it can access everything the parent could",
          why: "Incorrect. Tool access was never the constraint — the subagent explored successfully and returned real content. It lacked information, not capability." },
        { t: "Run the subagent with a larger context window so it can hold more of the conversation history",
          why: "Incorrect, and based on a misunderstanding. The parent history is not transmitted at any window size — there is nothing for a larger window to hold." },
        { t: "Have the subagent ask the parent session clarifying questions before beginning its investigation",
          why: "Incorrect. Subagents report back on completion rather than conducting a dialogue with the parent mid-task. The information should be in the prompt, which is available and free." }
      ],
      answer: [0, 1],
      explanation:
        "Two defects in one prompt: no context, and no specification. Subagent context must be provided explicitly — " +
        "there is no automatic inheritance or shared memory — and the prompt should state the goal and the quality bar " +
        "rather than gesturing at a shared understanding that does not exist."
    },

    {
      id: "s5q-s4-07", sid: "s4", domain: "D1 · Agentic Architecture", obj: "1.1 Tool results in history",
      trap: "Non-existent or misunderstood feature", fam: 9, select: 1,
      question:
        "An engineer is surprised that after Claude reads three files, it can reason about all three together — they " +
        "expected each tool call to be independent. They ask whether tool results are \"remembered\" by the model or " +
        "re-fetched each turn. <b>Which description is accurate?</b>",
      options: [
        { t: "Each tool result is appended to the conversation history and resent with every subsequent request, so the model reasons over all of them — and they consume context for the rest of the session",
          why: "Correct, and it carries the practical consequence. The API is stateless: the accumulated results are available because they are resent every turn, which is also why verbose tool output is a context-management problem rather than a one-off cost." },
        { t: "The model retains tool results in an internal working memory scoped to the session, separate from the message history",
          why: "Incorrect. There is no server-side session memory. Everything the model can see on a given turn is in the request that was just sent." },
        { t: "Results are re-fetched automatically when relevant, so the model always reasons over current file contents rather than a stale snapshot",
          why: "Incorrect, and a dangerous belief. Nothing re-fetches; a file read an hour ago is present as it was then, which is exactly why resuming a session after a colleague's merge produces confident answers about code that no longer exists." },
        { t: "Only the most recent tool result is available, and earlier ones must be re-read if needed again",
          why: "Incorrect. It contradicts the behaviour the engineer just observed — all three files were reasoned about together." }
      ],
      answer: [0],
      explanation:
        "Tool results are appended to conversation history so the model reasons about the next action with everything " +
        "gathered so far. Two consequences follow: accumulated results are a growing context cost, and they are " +
        "snapshots that never refresh themselves."
    },

    {
      id: "s5q-s4-08", sid: "s4", domain: "D2 · Tool Design & MCP", obj: "2.3 Scoped tool access",
      trap: "Wrong scope or wrong home", fam: 8, select: 1,
      question:
        "The Sentry MCP server exposes read tools (list error groups, fetch events, show stack traces) and also " +
        "mutation tools (<code>resolve_issue</code>, <code>assign_issue</code>, <code>delete_issue</code>). All of " +
        "them arrived when the server was connected. The team's rule is that production Sentry state is changed only " +
        "through Sentry's own UI, never from Claude. Last week an agent resolved an issue it judged fixed. <b>Which " +
        "response fits the requirement?</b>",
      options: [
        { t: "Restrict which of the server's tools are permitted, so only the read tools are available and the mutation tools cannot be invoked at all",
          why: "Correct. Connecting a server exposes everything it offers; scoping is your responsibility, not the server's. Denying the mutation tools makes the rule structural — the capability is absent rather than discouraged." },
        { t: "Add a line to CLAUDE.md stating that Sentry issues must never be resolved, assigned or deleted from Claude",
          why: "Incorrect. It is documentation for a prohibition, and the incident already demonstrates an agent acting on a confident local judgement. \"Never\" requires a control, not a note." },
        { t: "Disconnect the Sentry MCP server and have the engineer paste stack traces into the conversation manually",
          why: "Incorrect. It enforces the rule by discarding the capability that made the server worth adding, and reintroduces manual copying for every investigation." },
        { t: "Keep all tools available but add a PreToolUse hook that prompts the engineer for confirmation before any Sentry mutation",
          why: "Incorrect — and it is the closest wrong answer, since a gate is genuinely the right shape for many controls. It is weaker here because the rule is absolute: these actions belong in Sentry's UI, always. A confirmation prompt implies a legitimate yes, and offers one on every occasion." }
      ],
      answer: [0],
      explanation:
        "All of a connected MCP server's tools are discovered and available simultaneously — including ones you did " +
        "not want. Scope access to the subset a role actually needs. A confirmation gate is for actions that are " +
        "sometimes permitted; an unconditional prohibition should remove the capability."
    },

    {
      id: "s5q-s4-09", sid: "s4", domain: "D3 · Claude Code Configuration", obj: "3.4 Direct execution",
      trap: "Disproportionate fix", fam: 2, select: 1,
      question:
        "The fix is settled: add a two-line guard clause to one function in <code>pricing.py</code> and a unit test " +
        "beside it. The approach is not in doubt, the blast radius is one function, and the incident is live. The " +
        "engineer's habit since the codemod work is to open every task in plan mode. <b>What is appropriate " +
        "here?</b>",
      options: [
        { t: "Direct execution — the change is small, well-scoped and has one obvious approach, so a planning round adds latency without adding information",
          why: "Correct. Plan mode earns its cost when there are multiple valid approaches, architectural consequences, or a wide blast radius. None applies: one function, one approach, already decided. Applying it reflexively is process for its own sake during an incident." },
        { t: "Plan mode, because any change to production pricing code warrants a reviewable plan before execution regardless of size",
          why: "Incorrect. It substitutes a proxy — the code is important — for the actual criterion, which is whether the approach is uncertain. The safeguard for a two-line change is the test and the review, not a plan." },
        { t: "Plan mode, because the guard clause may interact with the three textually similar functions elsewhere in the file",
          why: "Incorrect. That is a question about where the edit lands, answered by a unique Edit anchor and the test — not by a planning round." },
        { t: "Direct execution for the guard clause and plan mode for the test, since test design has several valid approaches",
          why: "Incorrect. Splitting one small coupled change across two modes adds ceremony to the half that needs it least; a unit test for a two-line guard is not an architectural decision." }
      ],
      answer: [0],
      explanation:
        "Plan mode is for large-scale changes, multiple valid approaches, architectural decisions and multi-file " +
        "modifications. Simple well-scoped changes go direct. The question is always whether planning would change " +
        "what you do."
    },

    {
      id: "s5q-s4-10", sid: "s4", domain: "D3 · Claude Code Configuration", obj: "3.2 Command arguments",
      trap: "Wrong scope or wrong home", fam: 8, select: 1,
      question:
        "The engineer wants a <code>/triage</code> command that takes a Sentry error group ID and runs the team's " +
        "standard first-response procedure. Requirements: everyone who clones gets it; invoking it should make clear " +
        "that an error group ID is expected; and it must be able to read code and query Sentry but never edit files. " +
        "<b>Which setup satisfies all three?</b>",
      options: [
        { t: "A file in .claude/commands/ committed to the repository, with argument-hint declaring the expected error group ID and allowed-tools limited to read and query tools",
          why: "Correct. Project scope satisfies distribution, argument-hint satisfies discoverability at the invocation site, and allowed-tools satisfies the prohibition by enforcement rather than instruction. Each requirement maps to one frontmatter field." },
        { t: "A file in ~/.claude/commands/ with argument-hint and allowed-tools, shared with the joiners by sending them the file",
          why: "Incorrect. User scope is per-machine and not version-controlled, so \"everyone who clones gets it\" fails — and a file distributed by hand drifts the moment it is edited." },
        { t: "A project command with argument-hint, and a line in its body instructing Claude not to edit any files during triage",
          why: "Incorrect on the third requirement only, which is what makes it close. A body instruction is guidance; allowed-tools removes the capability. \"Never edit\" should not depend on the model's compliance." },
        { t: "A project skill with context: fork, so triage runs in an isolated context and cannot affect the main session or the repository",
          why: "Incorrect. Forked context isolates the conversation, not the filesystem — a forked skill can still write files. It also does not address the argument hint, and an explicitly invoked procedure with an argument is the shape of a command." }
      ],
      answer: [0],
      explanation:
        "Three requirements, three mechanisms: <code>.claude/commands/</code> for shared distribution, " +
        "<code>argument-hint</code> for invocation guidance, <code>allowed-tools</code> for enforced restriction. " +
        "Forked context isolates conversation, never the filesystem."
    },

    /* ================= SCENARIO 5 — 10 items ================= */

    {
      id: "s5q-s5-01", sid: "s5", domain: "D4 · Prompt Engineering", obj: "4.1 Criteria for test quality",
      trap: "Treating the symptom", fam: 3, select: 1,
      question:
        "Generated tests for uncovered branches compile, run green, and raise line coverage from 64% to 89%. Review " +
        "finds many of them assert almost nothing — calling the function inside a <code>try</code> and asserting no " +
        "exception was raised, or asserting a returned object is not null. The generation prompt says \"write " +
        "thorough unit tests for the uncovered branches.\" <b>Which change most improves test quality?</b>",
      options: [
        { t: "Replace \"thorough\" with categorical criteria — each test must assert a specific expected value for a named input, must fail if the branch's logic is inverted, and must not assert only non-nullity",
          why: "Correct. \"Thorough\" is unmeasurable, and coverage rewards execution rather than assertion — so the prompt and the metric together produced exactly what was asked for. Categorical criteria, including the explicit negative, define what a real assertion is." },
        { t: "Add a mutation-testing gate so tests that pass under an inverted branch are rejected automatically",
          why: "Incorrect as the primary fix, though it is an excellent verification layer and the strongest distractor here. It detects weak tests after generating them; it does not cause better ones to be written, and every rejection is a wasted generation cycle." },
        { t: "Raise the coverage target from 89% to 95% so more branches are exercised and weak tests are diluted by stronger ones",
          why: "Incorrect. It intensifies the metric that produced the behaviour. Assertion-free tests raise coverage very efficiently, so a higher target rewards them more." },
        { t: "Instruct the model to be more rigorous and to avoid writing trivial or low-value tests",
          why: "Incorrect. \"Be rigorous\" and \"avoid trivial\" are the same class of vague instruction as \"thorough\" — they do not tell the model what a sufficient assertion looks like." }
      ],
      answer: [0],
      explanation:
        "Explicit categorical criteria beat vague quality adjectives. \"Be thorough\", \"be conservative\", \"only " +
        "high-confidence\" do not move precision the way concrete rules do — and be alert when a metric can be " +
        "satisfied without achieving the goal it stands for."
    },

    {
      id: "s5q-s5-02", sid: "s5", domain: "D4 · Prompt Engineering", obj: "4.2 Few-shot examples",
      trap: "More context instead of better structure", fam: 5, select: 1,
      question:
        "After the criteria rewrite, assertions improve but the tests' <em>shape</em> is inconsistent: some use the " +
        "repository's table-driven convention, others write one function per case, fixture setup is duplicated in " +
        "some and shared in others. The criteria say what to assert but nothing about structure, and prose " +
        "descriptions of the house style have not held. <b>What communicates the expected structure most " +
        "reliably?</b>",
      options: [
        { t: "Two or three complete example tests from the repository showing the table-driven convention, shared fixture use, and naming — as concrete code rather than description",
          why: "Correct. Concrete examples communicate a transformation far better than prose, and structure is exactly the kind of tacit convention that is easy to show and hard to describe. Real repository tests also stay accurate as the convention evolves." },
        { t: "A detailed prose style guide in CLAUDE.md covering the table-driven pattern, fixture rules and naming conventions",
          why: "Incorrect — worth having as documentation, but the stem already reports that prose descriptions have not held. Adding more prose to a channel that is failing is not a change of approach." },
        { t: "A post-generation formatting pass that rewrites generated tests into the house structure",
          why: "Incorrect. Mechanical formatting cannot convert one-function-per-case into a table-driven test — that is a design transformation, not a formatting one." },
        { t: "Raising reasoning effort so the model infers the convention from the surrounding test files it reads",
          why: "Incorrect. Inference from surroundings is unreliable when the surroundings are themselves inconsistent, which the stem describes. Effort does not substitute for a stated standard." }
      ],
      answer: [0],
      explanation:
        "Few-shot examples are the most effective technique for consistent output when instructions alone produce " +
        "variation, and they carry structural conventions that prose cannot. Two to four targeted examples, not a " +
        "gallery."
    },

    {
      id: "s5q-s5-03", sid: "s5", domain: "D3 · Claude Code Configuration", obj: "3.6 --json-schema",
      trap: "Right idea, wrong layer", fam: 4, select: 1,
      question:
        "The security team's dashboard ingests review findings and requires a fixed shape: <code>severity</code> from " +
        "a four-value enum, <code>cwe_id</code> nullable, <code>file</code>, <code>line</code>, " +
        "<code>description</code>. The pipeline currently uses <code>--output-format json</code> and a post-processing " +
        "script that maps whatever fields come back onto the dashboard's shape. The mapping breaks roughly monthly " +
        "when field names drift. <b>Which change removes the drift?</b>",
      options: [
        { t: "Supply the dashboard's schema with --json-schema so the output is constrained to that shape at generation time, and delete the mapping layer",
          why: "Correct. The drift exists because the output shape is unconstrained and reconciled afterwards. Constraining generation to the consumer's schema removes the translation step entirely — there is nothing left to drift." },
        { t: "Pin the mapping script to a versioned field contract and add a schema-validation test that fails the build when the output shape changes",
          why: "Incorrect — genuinely good engineering, and it converts silent breakage into a loud failure. It is the weaker answer because it detects drift rather than preventing it: the build still breaks monthly, just more informatively." },
        { t: "Describe the required JSON shape in detail in the review prompt, including field names and the severity enum values",
          why: "Incorrect. Prompt-described shapes are a strong tendency, not a guarantee — which is exactly the gap --json-schema closes. Monthly drift is what a strong tendency looks like at 240 pull requests a week." },
        { t: "Have the review write findings to a database directly, so the dashboard reads from a schema-controlled table instead of parsing output",
          why: "Incorrect. It relocates the boundary without constraining what arrives at it — the same unshaped output now has to be mapped into columns, and a mismatched field breaks the insert instead of the dashboard." }
      ],
      answer: [0],
      explanation:
        "<code>--output-format json</code> guarantees valid JSON; <code>--json-schema</code> guarantees <em>your</em> " +
        "JSON. When a downstream consumer has a fixed contract, push it up to generation rather than reconciling " +
        "afterwards."
    },

    {
      id: "s5q-s5-04", sid: "s5", domain: "D3 · Claude Code Configuration", obj: "3.6 Headless permissions",
      trap: "Non-existent or misunderstood feature", fam: 9, select: 1,
      question:
        "A new CI step runs the debt sweep with <code>--print</code>. It completes in seconds and produces an empty " +
        "findings array on every run, though the same prompt run locally produces dozens of findings. The step's logs " +
        "show the analysis beginning and then stopping without error. The sweep needs to run a repository-wide search " +
        "command. <b>What is the most likely cause?</b>",
      options: [
        { t: "The tool the sweep needs is not permitted in the CI environment, so the call is denied and the run completes having done no analysis",
          why: "Correct. Non-interactive mode cannot prompt for approval, so a tool that is not pre-permitted is simply unavailable. The signature fits precisely: fast completion, no error, empty results — the run did nothing because it could do nothing." },
        { t: "--print truncates output to a fixed length, so the findings array is being cut off before any entries are written",
          why: "Incorrect. --print selects non-interactive mode; it does not impose a findings limit, and truncation would produce malformed output rather than a well-formed empty array." },
        { t: "The CI checkout is shallow, so the analysis has no files to examine",
          why: "Incorrect — a real class of CI bug worth checking, but a shallow clone still contains the working tree. The files are present." },
        { t: "The sweep is hitting the same session-isolation problem as the review step and needs its own invocation",
          why: "Incorrect. Session isolation concerns a session reviewing its own generated output; this step runs alone and generated nothing." }
      ],
      answer: [0],
      explanation:
        "Headless runs cannot ask. Every tool a CI workload needs must be permitted up front, or the run silently " +
        "accomplishes nothing. Fast, error-free, empty output is the classic signature — distinct from the hang that " +
        "comes from omitting non-interactive mode altogether."
    },

    {
      id: "s5q-s5-05", sid: "s5", domain: "D4 · Prompt Engineering", obj: "4.4 Dismissal pattern tracking",
      trap: "Treating the symptom", fam: 3, select: 2,
      question:
        "Precision sits at 78%. Developers dismiss roughly a fifth of findings, but the team has no visibility into " +
        "<em>which</em> findings get dismissed — dismissals are a click that records nothing. Each quarter someone " +
        "reads a sample by hand and guesses at the dominant false-positive categories. <b>Select TWO changes that " +
        "turn this into a measurable loop.</b>",
      options: [
        { t: "Have each finding carry a detected_pattern field naming the rule or heuristic that produced it, so dismissals can be aggregated by pattern",
          why: "Correct. Without a pattern label every dismissal is an anecdote. Tagging findings at generation time is what makes \"which categories are wrong\" a query rather than a quarterly reading exercise." },
        { t: "Record the dismissal against the finding's ID and pattern, so the dismissal rate per pattern can be computed continuously",
          why: "Correct. The tag is only useful if the outcome is captured. Together the two give a per-pattern precision figure that updates by itself and identifies which criteria to rewrite." },
        { t: "Add a free-text box asking developers to explain why they dismissed the finding",
          why: "Incorrect. Optional free text is sparsely filled and inconsistently worded, so it produces another corpus needing manual reading — the problem being solved. Useful as an extra, not as the measurement." },
        { t: "Automatically suppress any finding category whose dismissal rate exceeds 50% over the previous month",
          why: "Incorrect, and premature. Without pattern tagging there is no category to suppress — and automatic suppression hides a failing rule instead of fixing it, including the true positives it does find." },
        { t: "Increase the sampled review from quarterly to monthly so false-positive categories are identified sooner",
          why: "Incorrect. It runs the manual process three times as often. More frequent guessing is not measurement." }
      ],
      answer: [0, 1],
      explanation:
        "To improve precision you need to know which rule produced each finding and what happened to it. Tracking a " +
        "<code>detected_pattern</code> field and capturing dismissals against it turns developer behaviour into a " +
        "per-pattern signal that tells you exactly which criteria to rewrite."
    },

    {
      id: "s5q-s5-06", sid: "s5", domain: "D4 · Prompt Engineering", obj: "4.5 Batch API & custom_id",
      trap: "Non-existent or misunderstood feature", fam: 9, select: 1,
      question:
        "The nightly sweep moved to the Message Batches API for the 50% saving: one request per file, 2,400 requests. " +
        "This morning 2,361 succeeded and 39 errored. The engineer's script pairs results with files by <b>list " +
        "position</b> and reruns the whole batch when any request fails. <b>Which two things are wrong?</b>",
      options: [
        { t: "Results are not returned in submission order, so positional pairing mislabels findings; and failed requests should be resubmitted individually by custom_id rather than rerunning all 2,400",
          why: "Correct. Both are core batch semantics. Ordering is not guaranteed, which is precisely why custom_id exists — and positional pairing fails silently, attaching one file's findings to another. Resubmitting only the 39 failures costs 1.6% of a full rerun." },
        { t: "Nothing is wrong with the pairing, since a single batch preserves order; only the wholesale rerun is wasteful",
          why: "Incorrect. Order preservation is exactly the assumption the Batches API does not make, and this is the most consequential half of the bug — a wasteful rerun costs money, mislabelled findings corrupt the output." },
        { t: "The batch should not have been split per file — one request covering all 2,400 files would avoid correlation entirely",
          why: "Incorrect. That is a single enormous request, well beyond any sensible context, and it converts 39 isolated failures into one total failure. Per-file requests are the right granularity." },
        { t: "The sweep is unsuitable for the Batches API because per-file analysis requires multi-turn tool calling",
          why: "Incorrect for this workload. A single-pass analysis of one file needs no tool round trips. The multi-turn limitation is real but applies to workloads that iterate, not to one-shot per-file analysis." }
      ],
      answer: [0],
      explanation:
        "<code>custom_id</code> exists because results arrive in any order; correlate by it, never by position. And " +
        "resubmit only the failures by their <code>custom_id</code> — rerunning a whole batch to recover a handful of " +
        "errors discards the saving the batch was for."
    },

    {
      id: "s5q-s5-07", sid: "s5", domain: "D3 · Claude Code Configuration", obj: "3.2 Skills for shared procedures",
      trap: "Wrong scope or wrong home", fam: 8, select: 1,
      question:
        "The review procedure — the criteria, the severity definitions, the output schema, the exclusions — is " +
        "currently a 300-line prompt string pasted into three places: the GitHub Actions workflow, a local " +
        "pre-push script, and a developer-facing document. The three have drifted; the workflow and the local script " +
        "now disagree about two severity thresholds. <b>Where should this procedure live?</b>",
      options: [
        { t: "In a project skill under .claude/skills/, invoked by name from CI and locally, so all callers execute the same versioned definition",
          why: "Correct. A skill is an on-demand task workflow with one definition in version control. Both call sites invoke it by name, so drift becomes impossible and changes are reviewed like code." },
        { t: "In CLAUDE.md, so the criteria are loaded automatically in every session and CI run without needing to be invoked",
          why: "Incorrect. CLAUDE.md is for always-loaded universal standards; a 300-line review procedure would be carried by every unrelated session. On-demand workflows belong in skills." },
        { t: "In a shared file that both the workflow and the local script read at runtime, keeping one copy without introducing a new mechanism",
          why: "Incorrect — it does remove the duplication, which makes it the closest wrong answer. It reinvents skill invocation with a file read, and the developer-facing document still drifts as a third hand-maintained copy." },
        { t: "In the workflow file as the single source, with the local script invoking the workflow so both paths share it",
          why: "Incorrect. It couples local pre-push review to CI infrastructure, and a workflow file is a poor home for a procedure that must also be readable as documentation." }
      ],
      answer: [0],
      explanation:
        "Skills hold on-demand task workflows; CLAUDE.md holds always-loaded universal standards. When the same " +
        "procedure runs from several entry points, one versioned skill invoked by name is what stops the copies " +
        "diverging."
    },

    {
      id: "s5q-s5-08", sid: "s5", domain: "D3 · Claude Code Configuration", obj: "3.6 Workload-appropriate config",
      trap: "Disproportionate fix", fam: 2, select: 1,
      question:
        "Three workloads share one configuration: the blocking pre-merge review (must return in five minutes), test " +
        "generation (runs on demand, tolerates minutes), and the nightly sweep (runs for hours, cost-sensitive). All " +
        "three currently use identical settings. The team proposes tuning the shared configuration until it suits all " +
        "three. <b>What is the better approach?</b>",
      options: [
        { t: "Configure each workload separately according to its own latency, cost and depth requirements, since the three have genuinely different constraints",
          why: "Correct. A blocking five-minute check and an overnight sweep have opposing requirements; any single configuration is a compromise that serves neither well. The workloads are already separate invocations, so configuring them separately costs nothing." },
        { t: "Tune the shared configuration for the strictest constraint — the blocking review — so no workload can ever breach its limit",
          why: "Incorrect. It imposes the pre-merge latency budget on a sweep that has all night, forcing shallow analysis where depth was affordable. Optimising for the tightest constraint penalises everything that does not share it." },
        { t: "Tune for the nightly sweep, since it processes by far the most files and dominates total cost",
          why: "Incorrect. Volume-weighted tuning would give the blocking review the sweep's latency profile and back the merge queue up — the exact failure the team spent a quarter fixing." },
        { t: "Keep one configuration and add a timeout on the pre-merge review so it cannot exceed five minutes regardless of settings",
          why: "Incorrect. A timeout bounds the damage by truncating the review mid-analysis, producing a partial result on a blocking check. It enforces the limit without meeting the requirement." }
      ],
      answer: [0],
      explanation:
        "Latency-bound, on-demand and cost-bound workloads have different optimal settings. Sharing one configuration " +
        "across them means every workload runs at the wrong point on the trade-off curve."
    },

    {
      id: "s5q-s5-09", sid: "s5", domain: "D4 · Prompt Engineering", obj: "4.3 tool_choice for structured output",
      trap: "Non-existent or misunderstood feature", fam: 9, select: 1,
      question:
        "The review must always produce a findings object, including when it finds nothing — the dashboard needs an " +
        "explicit empty result. Currently, on clean pull requests, the model sometimes returns a sentence " +
        "(<i>\"No issues found in this diff.\"</i>) instead of calling the reporting tool, and the parser fails on " +
        "roughly 4% of runs. <b>Which change guarantees a tool call?</b>",
      options: [
        { t: "Set tool_choice to force the reporting tool, so the model must call it and returns an empty findings array rather than prose",
          why: "Correct. Forcing the named tool guarantees the turn is a call to it. The empty case is then expressed inside the schema — an empty array — which is what the consumer needs, rather than a sentence that has to be recognised as meaning zero." },
        { t: "Add an instruction that the tool must be called on every review, including when there are no findings",
          why: "Incorrect. The instruction is already implicit in the task and is being violated 4% of the time. An instruction cannot make a turn shape mandatory." },
        { t: "Set tool_choice to \"any\", since that prevents the model from returning a text-only response",
          why: "Incorrect on this configuration — and it is the closest near-miss. \"any\" does guarantee a tool call rather than text, so it would work if the reporting tool were the only tool available. With several tools present the model may satisfy it by calling a different one." },
        { t: "Have the parser treat an unparseable response as an empty findings set, since prose is only produced when nothing was found",
          why: "Incorrect, and unsafe. It infers a clean review from a parse failure, so a genuine malformed response carrying real findings would be silently recorded as zero issues." }
      ],
      answer: [0],
      explanation:
        "<code>auto</code> permits text; <code>any</code> requires some tool call; forced requires that tool. When " +
        "output must always conform to one schema, force the tool and represent the empty case inside the schema."
    },

    {
      id: "s5q-s5-10", sid: "s5", domain: "D5 · Context & Reliability", obj: "5.5 Stratified sampling",
      trap: "Unreliable proxy", fam: 6, select: 1,
      question:
        "Precision is measured by sampling <b>50 findings uniformly at random</b> each week from all findings posted. " +
        "The measured figure is 78%. The security team wants to auto-create tickets from <code>critical</code> " +
        "findings, which are about <b>4%</b> of volume — so a uniform sample of 50 contains around two of them. " +
        "<b>What should be measured before automating?</b>",
      options: [
        { t: "Precision within the critical stratum specifically, using a stratified sample that draws enough critical findings to estimate their error rate directly",
          why: "Correct. The decision is about one stratum, so that stratum's precision is the quantity that matters. An aggregate over a population where criticals are 4% tells you almost nothing about them — two sampled items cannot support the estimate." },
        { t: "The same uniform sample but larger — 400 findings a week would contain around sixteen criticals and give a usable estimate",
          why: "Incorrect — it does eventually work, which makes it plausible, but it is the inefficient route. It requires reviewing 400 findings to obtain sixteen relevant ones; stratifying gets a better estimate of the critical rate from far less review effort." },
        { t: "Overall precision trended over several weeks, so that a stable 78% gives confidence that the critical subset is also stable",
          why: "Incorrect. Stability of an aggregate says nothing about a 4% subset — the aggregate could hold steady while critical precision moved sharply, and the aggregate is dominated by the other 96%." },
        { t: "The developer dismissal rate for critical findings, since dismissals indicate which findings practitioners consider wrong",
          why: "Incorrect. Dismissal is a useful operational signal but a proxy for correctness, not a measure of it — developers dismiss accurate findings they consider low priority, and a dismissal rate is not a precision estimate." }
      ],
      answer: [0],
      explanation:
        "Aggregate accuracy hides subgroup performance. When automation applies to one stratum, measure that stratum: " +
        "stratified sampling produces per-category error rates, which is what a decision about that category requires."
    },

    /* ================= SCENARIO 6 — 10 items ================= */

    {
      id: "s5q-s6-01", sid: "s6", domain: "D4 · Prompt Engineering", obj: "4.3 Syntactic vs semantic validity",
      trap: "Non-existent or misunderstood feature", fam: 9, select: 1,
      question:
        "Since adopting a JSON schema with <code>strict: true</code>, syntax errors have gone to zero. But " +
        "<b>1.8%</b> of documents still reach the ERP with a wrong value: an invoice number taken from the vendor's " +
        "internal reference line, a currency of <code>USD</code> on a document denominated in Canadian dollars, a " +
        "total that is the subtotal. Every one of these validates against the schema. Management asks why the schema " +
        "did not catch them. <b>What is the correct explanation?</b>",
      options: [
        { t: "A strict schema guarantees structural conformance — the right fields, the right types, the right enums — but says nothing about whether a well-typed value is the correct value from the document",
          why: "Correct. \"CAD\" and \"USD\" are equally valid enum members; a subtotal and a total are both numbers. Schema validity is a statement about shape, and every listed error is shape-correct and semantically wrong." },
        { t: "The schema is under-specified — adding format constraints and stricter patterns for invoice numbers and totals would catch these cases",
          why: "Incorrect as a general claim, though tighter patterns help at the margin. No pattern distinguishes a real invoice number from a vendor's internal reference when both are alphanumeric strings, and none tells a subtotal from a total." },
        { t: "strict: true was not applied to nested objects, so line-item fields were validated less rigorously than top-level fields",
          why: "Incorrect. It invents a mechanism gap. The reported errors are in top-level fields, and all of them validated." },
        { t: "The validation-retry loop is passing these on the first attempt, so the schema never gets a chance to reject them on retry",
          why: "Incorrect, and circular. Retries are triggered by validation failure; these outputs pass validation, so there is nothing to trigger. That is the point of the question." }
      ],
      answer: [0],
      explanation:
        "Structured output eliminates syntax errors, not semantic ones. Once the shape is guaranteed, the remaining " +
        "failures are harder to see precisely because they look correct — which is why self-checking fields and " +
        "field-level accuracy measurement matter more after schema adoption, not less."
    },

    {
      id: "s5q-s6-02", sid: "s6", domain: "D4 · Prompt Engineering", obj: "4.4 Retries and absent information",
      trap: "Treating the symptom", fam: 3, select: 1,
      question:
        "The validation-retry loop retries with specific error feedback. Analysis of retry outcomes shows two " +
        "populations. Documents failing because a total did not match the line-item sum are usually corrected on the " +
        "second attempt. Documents failing because a <b>required tax registration number is not printed anywhere on " +
        "the document</b> exhaust all retries — and about <b>1 in 5</b> of those eventually return a plausible-looking " +
        "number that appears nowhere in the source. <b>What should change?</b>",
      options: [
        { t: "Detect absence as a distinct outcome — make the field nullable, return an explicit not_present result, and route the document for human entry instead of retrying",
          why: "Correct. Retries fix format and structural errors, where the information exists and was mis-extracted. When the information is absent from the source, retrying applies escalating pressure to produce something — which is how the fabrications arise. Absence is an answer, not a failure." },
        { t: "Increase the retry limit for documents failing on tax registration, since the field is genuinely hard to locate on some vendor layouts",
          why: "Incorrect, and it makes the fabrication worse: more attempts under the same pressure to produce a value increases the chance one of them invents a plausible number." },
        { t: "Add a validation rule rejecting any tax registration number that does not match the expected national format",
          why: "Incorrect — a useful guard, and it would catch some fabrications. But a plausible-looking fabrication typically matches the format, so it filters the crudest cases while leaving the dangerous ones, and still does not handle genuine absence." },
        { t: "Add few-shot examples showing tax registration numbers being located on the vendor layouts that currently fail",
          why: "Incorrect. Examples teach where to look when the value is present. They cannot help on documents that do not contain the number, which is the population being described." }
      ],
      answer: [0],
      explanation:
        "Retry-with-feedback is effective for format and structural errors and ineffective when the information is " +
        "absent from the source. Distinguish the two, make genuinely optional fields nullable, and route absence to a " +
        "human — pressure to produce a required value is what manufactures one."
    },

    {
      id: "s5q-s6-03", sid: "s6", domain: "D4 · Prompt Engineering", obj: "4.1 Criteria for uncertainty",
      trap: "Losing or fabricating information", fam: 7, select: 1,
      question:
        "On OCR-degraded faxes the model must often decide between a smudged <code>8</code> and <code>3</code> in an " +
        "invoice number. It currently always commits to a reading. The prompt says \"extract the invoice number " +
        "accurately.\" Downstream, a wrong invoice number causes a duplicate-payment investigation costing about " +
        "<b>40 minutes</b> of finance time; a flagged-for-review document costs about <b>90 seconds</b>. <b>Which " +
        "change best fits the economics?</b>",
      options: [
        { t: "Add explicit criteria for when to mark a field uncertain — illegible or ambiguous characters in an identifier — plus a per-field confidence flag that routes the document to the 90-second review queue",
          why: "Correct. The costs are asymmetric by a factor of about twenty-five, so the system should prefer flagging to guessing on identifiers. Categorical criteria for what counts as uncertain give the model a defined action other than committing, which is the option it currently lacks." },
        { t: "Instruct the model to be conservative and only report values it is highly confident about",
          why: "Incorrect. \"Be conservative\" and \"only high-confidence\" are the vague-instruction pattern that does not move precision — and without a defined alternative action, a cautious model still has to output something." },
        { t: "Route every OCR-sourced document to human review, since OCR quality is the root cause of the ambiguity",
          why: "Incorrect. It pays the review cost for every fax including the many that are perfectly legible, discarding most of the automation's value to address a subset." },
        { t: "Improve the OCR stage with a higher-quality engine so fewer characters are ambiguous",
          why: "Incorrect as the answer here — worth doing, and it shrinks the population. But some faxes are genuinely illegible at any OCR quality, and the system still needs a defined behaviour for that case." }
      ],
      answer: [0],
      explanation:
        "Give the model a way to say \"unclear\" and explicit criteria for when to use it — otherwise every ambiguous " +
        "case is forced into a confident guess. Where the cost of a wrong value greatly exceeds the cost of a review, " +
        "the routing threshold should reflect that."
    },

    {
      id: "s5q-s6-04", sid: "s6", domain: "D1 · Agentic Architecture", obj: "1.5 Hooks for normalization",
      trap: "More context or reasoning instead of structure", fam: 5, select: 2,
      question:
        "Totals arrive with vendor-specific conventions: European decimal commas (<code>1.234,56</code>), " +
        "parenthesised negatives (<code>(450.00)</code>), and trailing credit markers (<code>450.00 CR</code>). The " +
        "model currently interprets these inline while extracting, and gets the sign wrong on parenthesised and CR " +
        "amounts about <b>1 time in 12</b>. Currency conversion to USD is also done inline using rates the model " +
        "recalls. <b>Select TWO changes that make totals reliable.</b>",
      options: [
        { t: "Normalize the numeric representations in a PostToolUse hook before the values reach the model, so it only ever sees one canonical signed decimal format",
          why: "Correct. Parsing three fixed notations is deterministic string work with an exactly right answer. Doing it at the boundary means the model never encounters the ambiguity, and the fix applies to every vendor that uses those conventions." },
        { t: "Perform currency conversion in a tool against a dated rate source, returning both the original amount with its currency and the converted USD value",
          why: "Correct. Recalled exchange rates are neither current nor auditable, and a converted figure without its original is unverifiable. A tool with a dated rate source makes the conversion correct and reconstructable." },
        { t: "Add few-shot examples showing each notation with its correctly signed interpretation",
          why: "Incorrect. It teaches approximation of something that can be computed exactly, and 1-in-12 is what learned parsing of edge notation looks like." },
        { t: "Add a validation rule rejecting any document whose total is negative unless the document type is a credit note",
          why: "Incorrect — a reasonable business check worth having, but it catches a subset of sign errors after the fact and does nothing about decimal-comma misreads." },
        { t: "Raise reasoning effort so the model attends more carefully to numeric formatting during extraction",
          why: "Incorrect. Effort does not resolve notational ambiguity, and spending inference on deterministic parsing is the wrong layer." }
      ],
      answer: [0, 1],
      explanation:
        "Two deterministic jobs were left to inference: notation parsing and currency conversion. Hooks normalise " +
        "representation at the boundary; tools compute values against real sources. Anything a program can decide " +
        "exactly should not be delegated to the model."
    },

    {
      id: "s5q-s6-05", sid: "s6", domain: "D2 · Tool Design & MCP", obj: "2.3 Forcing a first tool",
      trap: "Non-existent or misunderstood feature", fam: 9, select: 1,
      question:
        "Enrichment tools look up vendor tax status and contract terms, and both require the vendor ID that " +
        "<code>extract_metadata</code> produces. In about <b>6%</b> of documents the agent calls an enrichment tool " +
        "first, gets a null-vendor error, then calls <code>extract_metadata</code> and retries — costing an extra " +
        "round trip. The team wants metadata extraction to happen first on the initial request. <b>Which mechanism " +
        "does that?</b>",
      options: [
        { t: "Set tool_choice to the forced form naming extract_metadata on the first request of each document, so that specific tool is called before anything else",
          why: "Correct. Forced {\"type\": \"tool\", \"name\": \"extract_metadata\"} guarantees which tool runs on that request. This is the documented use — forcing a metadata step to run before enrichment." },
        { t: "Set tool_choice to \"any\" on the first request, since that forces a tool call and extract_metadata is the only one that can succeed without a vendor ID",
          why: "Incorrect. \"any\" guarantees a call, not which call — and the stem describes the model already choosing an enrichment tool first 6% of the time. Being doomed to fail does not stop a tool from being selected." },
        { t: "Reorder the tools array so extract_metadata appears first, since the model considers tools in the order supplied",
          why: "Incorrect. Array order is not a selection guarantee; there is no documented ordering semantics to rely on." },
        { t: "Add to each enrichment tool's description that extract_metadata must be called first",
          why: "Incorrect — good documentation, and it will reduce the rate. But it is guidance at the description layer for something the request layer can guarantee outright." }
      ],
      answer: [0],
      explanation:
        "Forced <code>tool_choice</code> is how you guarantee a specific tool runs on a specific request — the " +
        "canonical case being a metadata extraction that later tools depend on. <code>any</code> only guarantees that " +
        "some tool is called."
    },

    {
      id: "s5q-s6-06", sid: "s6", domain: "D1 · Agentic Architecture", obj: "1.6 Routing by document type",
      trap: "Disproportionate fix", fam: 2, select: 1,
      question:
        "All 22,000 monthly documents run through one pipeline with a single prompt carrying instructions for both " +
        "invoices and bills of lading, plus the quirks of the six major vendors and guidance for the long tail. The " +
        "prompt is now about 3,000 tokens and grows with every onboarding. Accuracy on the six majors has begun to " +
        "<em>decline</em> as long-tail guidance accumulates. <b>Which restructuring best addresses this?</b>",
      options: [
        { t: "Classify the document first, then route to a prompt specific to its type and vendor class, so each extraction carries only the instructions relevant to it",
          why: "Correct. The decline is instruction dilution: bill-of-lading quirks are noise on an invoice. Classifying first and routing to a focused prompt keeps each extraction's context relevant, and onboarding a vendor stops degrading everything else." },
        { t: "Split the single prompt into clearly headed sections by document type and vendor, so the model can locate the relevant part",
          why: "Incorrect — better organised, and it may help slightly. But every section is still in context and still competing for attention; headings improve navigation, not relevance." },
        { t: "Fine-tune a separate model for each of the six major vendors, leaving the general prompt for the long tail",
          why: "Incorrect, and disproportionate. Six models to train, evaluate and maintain — plus a routing layer — when the routing layer alone captures most of the benefit." },
        { t: "Move the vendor-specific quirks into a retrieval step that fetches only the relevant vendor's notes at extraction time",
          why: "Incorrect — the strongest distractor, since it does deliver relevance and scales well with vendor count. It is second-best because it addresses only the vendor axis; the invoice-versus-bill-of-lading distinction is a different task shape, not a lookup, and routing handles both axes at once." }
      ],
      answer: [0],
      explanation:
        "One prompt serving several document types accumulates instructions that are noise to most of its inputs. " +
        "Classify, then route to focused prompts — a form of prompt chaining where the first step decides what the " +
        "second step should be."
    },

    {
      id: "s5q-s6-07", sid: "s6", domain: "D1 · Agentic Architecture", obj: "1.4 Gate before side effects",
      trap: "Prompt where enforcement was required", fam: 1, select: 1,
      question:
        "Extraction results post automatically to the ERP. Policy: any document whose extracted total exceeds " +
        "<b>$50,000</b> must be reviewed by a person before posting. This is implemented as a prompt instruction to " +
        "the agent that runs the posting step. Last month <b>three</b> documents over the threshold posted without " +
        "review — in each case the extraction was confident and the agent judged review unnecessary. <b>Which change " +
        "guarantees the policy?</b>",
      options: [
        { t: "A gate on the posting tool that inspects the total and blocks the call above $50,000, routing the document to the review queue",
          why: "Correct. The threshold is a numeric comparison on a structured field — exactly the kind of check that should be deterministic code sitting between the agent's decision and the side effect. The agent's confidence in the extraction is irrelevant to whether the policy applies." },
        { t: "Add few-shot examples showing high-value documents being routed to review, including cases where extraction confidence was high",
          why: "Incorrect. Examples shape tendencies; the policy says \"must\". The failures already occurred in exactly the situation the examples would depict." },
        { t: "Have the extraction step set a requires_review boolean when the total exceeds the threshold, and instruct the posting agent to honour it",
          why: "Incorrect — closer, because the computation moves into deterministic code, which is right. But the enforcement still depends on the agent honouring a flag, which is the same class of failure one step removed." },
        { t: "Post everything and run a daily reconciliation that flags any posted document over $50,000 lacking a review record",
          why: "Incorrect. Detection after posting is not review before posting — the entry is already in the ERP, and the policy exists to prevent that." }
      ],
      answer: [0],
      explanation:
        "Prompt-based compliance has a non-zero failure rate, which is unacceptable for a financial control. Block the " +
        "downstream call until the prerequisite is satisfied. Computing a flag correctly does not help if honouring it " +
        "is still discretionary."
    },

    {
      id: "s5q-s6-08", sid: "s6", domain: "D5 · Context & Reliability", obj: "5.1 Position in long documents",
      trap: "More context or reasoning instead of structure", fam: 5, select: 1,
      question:
        "Bills of lading run to nine or ten pages. Accuracy on fields appearing on the <b>first and last pages</b> is " +
        "about 97%; on fields that appear only in the <b>middle pages</b> — container counts, per-lot weights — it is " +
        "about <b>81%</b>. The whole document is passed in one request as OCR text with no structure. <b>Which change " +
        "most directly addresses the middle-page gap?</b>",
      options: [
        { t: "Segment the document and extract per section, so no single request depends on the model attending to the middle of a long undifferentiated input",
          why: "Correct. The accuracy profile — strong at both ends, weak in the middle — is the textbook \"lost in the middle\" signature. Segmenting means every field is near the start or end of its own request, which removes the positional disadvantage rather than compensating for it." },
        { t: "Add explicit section headers to the OCR text so the middle content is clearly delimited and easier to locate",
          why: "Incorrect as the primary fix, though it is a genuine improvement and pairs well with the right answer. Headers aid navigation within a long context but do not remove the positional weakness itself." },
        { t: "Instruct the model to pay particular attention to the middle pages, where container and weight details are located",
          why: "Incorrect. Attention is not directable by instruction in this way, and the model is not skipping the middle deliberately." },
        { t: "Use a model with a larger context window so the full document fits more comfortably",
          why: "Incorrect, and a common misdiagnosis. The document already fits — the issue is position within the input, not capacity, and a larger window does nothing for it." }
      ],
      answer: [0],
      explanation:
        "Models process the beginning and end of a long input most reliably and may under-use the middle. High " +
        "accuracy at both ends with a dip in between is the diagnostic. Restructure so critical content is not " +
        "positioned mid-context — segmentation, and headers as reinforcement."
    },

    {
      id: "s5q-s6-09", sid: "s6", domain: "D4 · Prompt Engineering", obj: "4.4 Self-checking fields",
      trap: "Unreliable proxy", fam: 6, select: 2,
      question:
        "The team wants to catch the 1.8% of well-formed-but-wrong values before they reach the ERP, without human " +
        "review of every document. An engineer proposes asking the model to return an " +
        "<code>extraction_confidence</code> score per document and auto-posting anything above 0.9. <b>Select TWO " +
        "changes that would actually catch these errors.</b>",
      options: [
        { t: "Calibrate per-field confidence against a labelled set and route by field-level thresholds, so only the doubtful fields on a document go to review",
          why: "Correct. Errors are field-specific — an invoice number read from the wrong line says nothing about the currency field — so a single document score cannot route correctly. Calibration against labelled data is what makes the number mean something rather than express a mood." },
        { t: "Cross-check extracted values against independent records the business already holds — vendor master data for currency and tax identity, purchase orders for totals where one exists",
          why: "Correct. These errors are well-formed, so the only way to detect them is comparison with an outside source of truth. A vendor whose master record is denominated in CAD contradicts a USD extraction immediately, and that check needs no human." },
        { t: "Auto-post anything the model scores above 0.9, since a high self-reported score indicates the extraction was straightforward",
          why: "Incorrect. Uncalibrated self-reported confidence is an unreliable proxy — and a confidently misread field scores high precisely because the model is unaware it erred, which is the failure mode being hunted." },
        { t: "Run each document through extraction twice and post only when the two runs agree",
          why: "Incorrect. Cross-run agreement is another unreliable proxy: a systematically misread layout produces the same wrong answer both times, so agreement is highest exactly where the error is most consistent." },
        { t: "Raise the strictness of the JSON schema so fewer malformed values can pass validation",
          why: "Incorrect, and it misreads the problem. Every one of these values already validates — the schema is doing its job. Tightening a structural check cannot detect a correctly-typed value taken from the wrong place." }
      ],
      answer: [0, 1],
      explanation:
        "Self-reported confidence and cross-run agreement are proxies for correctness, not measures of it. " +
        "Well-formed-but-wrong values are caught by comparison against something outside the extraction — calibrated " +
        "per-field confidence for routing, and independent business records for verification."
    },

    {
      id: "s5q-s6-10", sid: "s6", domain: "D4 · Prompt Engineering", obj: "4.2 Few-shot for the long tail",
      trap: "Disproportionate fix", fam: 2, select: 1,
      question:
        "A new vendor is onboarded roughly every ten days, each with a layout nobody has seen. Current practice is to " +
        "collect twenty sample documents, hand-write extraction notes, and add a vendor-specific section to the " +
        "prompt — about <b>three days</b> of work per vendor, and the accumulating sections are themselves degrading " +
        "the shared prompt. <b>Which approach scales?</b>",
      options: [
        { t: "Build a small set of few-shot examples chosen to span structurally different layouts — multi-column, line-item-heavy, header-light — so the model generalises to unseen layouts rather than memorising known ones",
          why: "Correct. Few-shot examples enable generalisation to novel patterns when they are chosen for structural diversity rather than vendor identity. It replaces per-vendor work with a one-time example set, and stops the prompt growing with every onboarding." },
        { t: "Keep the per-vendor sections but move them into a retrieval step so only the relevant vendor's notes load at extraction time",
          why: "Incorrect — it does solve the prompt-bloat half, which makes it tempting. But it preserves three days of manual work per vendor, and by construction a brand-new vendor has no notes to retrieve on its first documents." },
        { t: "Require new vendors to submit documents in a standard template before onboarding",
          why: "Incorrect. It solves an internal problem by imposing on suppliers who have no obligation to comply, and does nothing for the forty-four vendors already in the tail." },
        { t: "Fine-tune the extraction model on the accumulated corpus of all fifty vendor formats and retrain as new vendors are added",
          why: "Incorrect, and disproportionate. It is a much heavier machine for the same goal, with a retraining cycle every ten days — and it still generalises from the same examples that a few-shot set would carry directly." }
      ],
      answer: [0],
      explanation:
        "Few-shot examples chosen for structural diversity generalise to layouts the system has never seen — the " +
        "requirement when the long tail keeps growing. Per-vendor prompt sections scale linearly with vendors and " +
        "degrade the shared prompt as they accumulate."
    }

  ]
};
