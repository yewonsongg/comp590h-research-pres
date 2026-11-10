# Assigned reading summary

**Scope:** Wei et al., *Agentic Reasoning for Large Language Models: Foundations · Evolution · Collaboration*, [arXiv:2601.12538v2](https://arxiv.org/pdf/2601.12538v2), Section 6.5, printed pages 57–64. Start at “Autonomous Web Exploration & Research Agents”; stop immediately before Section 7 on page 64. Checked November 9, 2026.

Section 6.5 applies three complementary reasoning dimensions to web, GUI, and autonomous research agents. Web agents gather online evidence; GUI agents operate software interfaces; research agents organize broader scientific workflows. These families overlap.

**Foundational reasoning (§6.5.1)** connects planning, tool use, and retrieval. Agents decompose goals, act through browsers or software, inspect observations, and adjust their plans. Research workflows extend this pattern to experiments, interpretation, and reports. The section includes inference-time designs and policies improved through supervised learning or reinforcement learning.

**Self-evolving reasoning (§6.5.2)** uses memory, feedback, and reflection to retain context and refine behavior. Experience can become reusable workflows, tips, skills, or experiment artifacts. Adaptation may occur through external memory or training; reflection alone does not guarantee durable improvement.

**Collective reasoning (§6.5.3)** distributes work across specialized roles. Planning, navigation, extraction, execution, review, and synthesis communicate through intermediate artifacts and feedback.

The presentation’s synthesis is that acting, learning, and collaborating can coexist. Their practical value depends on reliable observations, applicable memories, and credible evaluation. The section describes many systems, but does not establish a universal ranking or performance guarantee. The case study and two deeper studies below supply more specific evidence.

## Foundational case study: WebVoyager

[WebVoyager](https://arxiv.org/html/2401.13919v4), cited in the survey’s §6.5.1, combines annotated screenshots, element text, and interaction history to select browser actions in a repeated observe–reason–act process. Table 1 reports **59.1% human-judged whole-task success** for the GPT-4V-based agent on **643 tasks from 15 websites**. This is an absolute success rate from the later 2024 version, not an AWM-style relative improvement or the result from the smaller initial January version. Its error analysis documents getting stuck and misidentifying targets. The presentation draws the lesson that understanding an intended action does not ensure reliable execution.

## Two closer looks

[Agent Workflow Memory](https://arxiv.org/html/2409.07429v1) abstracts reusable subroutines from trajectories and supplies them as prompt memory. Its headline gains compare different metrics: Mind2Web GPT-4 cross-task **step success** rises from 36.2% to 45.1% (+24.6% relative); WebArena GPT-4 **task success** rises from 23.5% to 35.5% (+51.1% relative). These are not percentage-point gains. A less obvious result is that element selection improves while action F₁ declines, suggesting a need to depart from remembered guidance when the current state differs. Model-based success evaluation can also admit faulty memories. See Tables 1 and 3, §3.2.1–3.2.2.

[Agent Laboratory](https://arxiv.org/html/2501.04227v2) integrates literature review, experimentation, and report writing with specialized roles and optional human feedback at subtask boundaries. In a small autonomous study, model reviewers scored papers 6.1/10 on average, versus 3.8/10 from humans. Co-pilot reports received 4.38/10 from external reviewers, with smaller gains in significance and contribution than in quality and presentation. These comparisons support careful human evaluation; they do not isolate a universal causal benefit. See §3 and §4.1–4.2.

The complete quantitative claim ledger is in [bibliography.md](bibliography.md). All UI demonstrations are illustrative; none runs a live agent or reports simulated performance as an experiment.
