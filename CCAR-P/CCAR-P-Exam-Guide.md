# Claude Certified Architect – Professional (CCAR-P): Exam Guide

Version 1.0, effective July 2026. Source: `source/CCAR-P-Exam-Guide-v1.0.pdf` (Anthropic Partner Academy).
The guide's own wording is kept below. Policy sections (registration, conduct, appeals) are shortened.

## Exam details at a glance

| | |
|---|---|
| Items | 63, multiple-choice and multiple-response (each item says how many to select) |
| Time | 120 minutes |
| Passing score | 720 on a 100–1,000 scale (criterion-referenced) |
| Fee | $175 USD |
| Delivery | Pearson VUE, online proctored or test centre |
| Validity | 12 months; free non-proctored renewal on Partner Academy if renewed on time |
| Prerequisites | None. Recommended: 3+ yrs systems architecture, 6+ months Claude/LLM in production |
| Retakes | Wait 14 / 30 / 90 days after 1st / 2nd / 3rd fail; max 4 attempts per rolling 12 months |

## Blueprint

| # | Domain | Weight |
|---|---|---|
| 1 | Solution Design & Architecture | 17% |
| 2 | Claude Models, Prompting & Context Engineering | 13% |
| 3 | Integration | 19% |
| 4 | Evaluation, Testing & Optimization | 16% |
| 5 | Governance, Safety & Risk Management | 14% |
| 6 | Stakeholder Communication & Lifecycle Management | 14% |
| 7 | Developer Productivity & Operational Enablement | 7% |

## Detailed objectives by domain

"Each domain below lists the tasks a candidate is expected to perform. Exam items are written against these objectives."

### Domain 1: Solution Design & Architecture (17%)
- 1.1 Translate business problems into Claude-based AI solutions
- 1.2 Design end-to-end architectures (input → processing → output → feedback loops)
- 1.3 Select appropriate architectural patterns (workflow, agentic, augmented LLM)
- 1.4 Design multi-agent systems and orchestration strategies
- 1.5 Apply decomposition techniques for complex problem solving
- 1.6 Align solutions to business value pillars (efficiency, transformation, productivity, cost, performance SLAs)

### Domain 2: Claude Models, Prompting & Context Engineering (13%)
- 2.1 Select appropriate Claude models based on trade-offs
- 2.2 Design system prompts, templates, and guardrails
- 2.3 Apply prompt engineering techniques (zero-shot, few-shot, chain-of-thought)
- 2.4 Optimize context windows and manage token usage
- 2.5 Implement prompt reuse strategies (caching, modular prompts, Skills)

### Domain 3: Integration (19%)
- 3.1 Evaluate tool/agent configuration for capability bloat
- 3.2 Analyze authentication and authorization requirements to identify security gaps
- 3.3 Evaluate accuracy-latency trade-offs and justify configuration decisions
- 3.4 Analyze observability challenges and select monitoring strategies at scale
- 3.5 Design a RAG pipeline with appropriate chunking and indexing strategies
- 3.6 Apply retrieval strategies matched to data shape and query pattern
- 3.7 Evaluate connection protocols and select the appropriate integration mechanism (MCP, API/CLI, agent-to-agent)
- 3.8 Evaluate progressive discovery vs. monolithic context strategy

### Domain 4: Evaluation, Testing & Optimization (16%)
- 4.1 Define evaluation metrics (accuracy, latency, cost, safety, security)
- 4.2 Design evaluation datasets and test frameworks using mixed methodologies
- 4.3 Conduct A/B testing and iterative improvements
- 4.4 Diagnose system issues (prompt failure, hallucinations, model mismatch)
- 4.5 Optimize token usage, latency, and cost-performance trade-offs
- 4.6 Monitor system performance using logging and observability tools

### Domain 5: Governance, Safety & Risk Management (14%)
- 5.1 Implement guardrails and safety controls
- 5.2 Identify risks, limitations, and failure modes of LLM systems
- 5.3 Apply human-in-the-loop validation strategies
- 5.4 Ensure compliance with regulations (e.g., GDPR, HIPAA, FedRAMP)
- 5.5 Address ethical AI considerations (bias, fairness, transparency)

### Domain 6: Stakeholder Communication & Lifecycle Management (14%)
- 6.1 Conduct structured discovery and requirement gathering
- 6.2 Communicate architectural decisions and trade-offs
- 6.3 Manage stakeholder feedback loops and expectation alignment (including SLAs)
- 6.4 Document architectures and provide implementation guidance
- 6.5 Support lifecycle phases (discovery, design, handoff, monitoring, iteration)

### Domain 7: Developer Productivity & Operational Enablement (7%)
- 7.1 Configure Claude tools and environments for teams (e.g., Claude Code)
- 7.2 Improve developer workflows using AI-assisted tooling
- 7.3 Support debugging and operational issue resolution

(Numbers 1.1–7.3 are ours for reference; the guide uses plain bullets.)

## How to prepare (guide §7)
- Study the blueprint and self-assess against each objective
- Review official Anthropic docs for the Claude API, models, prompt engineering, MCP, and Skills
- Build and operate at least one end-to-end Claude solution, including RAG, evaluation, and observability
- Practice architectural decision-making: model selection, integration protocols, and security trade-offs
- Complete the sample questions

## Sample questions (official)

**Sample 1 · Domain 3, Integration.** A team exposes a customer-support agent that can read tickets, draft replies, issue refunds, and delete user accounts. Support staff only ever need to read tickets and draft replies. Applying least-privilege principles, which change best reduces risk?
A. Add logging to the refund and delete tools so misuse can be audited later.
B. Remove the refund and delete tools from the agent's configuration entirely.
C. Keep all tools but add a confirmation prompt before refunds and deletions.
D. Replace the agent with a larger model that follows instructions more reliably.

**Sample 2 · Domain 2, Models, Prompting & Context.** An application sends the same 8,000-token system prompt and policy document on every request, followed by a short, varying user message. Latency and cost are both concerns. Which optimization most directly addresses both?
A. Truncate the policy document to the first 1,000 tokens.
B. Switch to the smallest available model regardless of task fit.
C. Place the static system prompt and policy before the dynamic content and enable prompt caching.
D. Move the policy document into a few-shot example block.

**Sample 3 · Domain 4, Evaluation & Optimization.** A RAG system suddenly returns confident but incorrect answers after a document refresh, while latency and model version are unchanged. What is the most likely first place to investigate?
A. The model weights have silently changed.
B. The retrieval/indexing step is returning irrelevant or stale chunks.
C. The temperature setting is too low.
D. The context window has shrunk.

**Answers.** 1: B, because least privilege removes capabilities the role doesn't need; logging and confirmations are detective or compensating controls. 2: C, because a stable prefix first plus prompt caching cuts time-to-first-token and cost without losing context. 3: B, because confident-but-wrong answers right after a refresh, with model and latency unchanged, point to retrieval (broken re-index, mismatched embeddings).
