# Bibliography and verification ledger

The original deep dives were verified against primary sources on **November 9, 2026**; the WebVoyager case study was added and verified on **November 10, 2026**. Versioned links keep the cited results stable. The application needs no network connection; following an external paper link does.

## Original papers

1. **Wei, Tianxin, et al. (2026).** *Agentic Reasoning for Large Language Models: Foundations · Evolution · Collaboration.* arXiv:2601.12538v2. [Original PDF](https://arxiv.org/pdf/2601.12538v2). Assigned scope: **§6.5, pages 57–64**, ending before §7 on page 64. The verified PDF identifies v2, September 20, 2026. The deck uses the section structure and page boundaries in this PDF.
2. **Wang, Zora Zhiruo; Mao, Jiayuan; Fried, Daniel; and Neubig, Graham (2024).** *Agent Workflow Memory.* arXiv:2409.07429v1, September 11, 2024. [Original HTML](https://arxiv.org/html/2409.07429v1) · [Original PDF](https://arxiv.org/pdf/2409.07429v1) · [Authors’ implementation](https://github.com/zorazrw/agent-workflow-memory). The survey cites AWM as reference **[298]** in §6.5.2, page 61.
3. **Schmidgall, Samuel; Su, Yusheng; Wang, Ze; Sun, Ximeng; Wu, Jialian; Yu, Xiaodong; Liu, Jiang; Moor, Michael; Liu, Zicheng; and Barsoum, Emad (2025).** *Agent Laboratory: Using LLM Agents as Research Assistants.* arXiv:2501.04227v2, June 17, 2025. [Original HTML](https://arxiv.org/html/2501.04227v2) · [Original PDF](https://arxiv.org/pdf/2501.04227v2) · [Authors’ project](https://agentlaboratory.github.io/). The survey cites it as **[634]** in §6.5.1 (pages 58–60) and §6.5.2 (page 62). Its primary paper supplies the role architecture used in the collaboration deep dive.

4. **He, Hongliang; Yao, Wenlin; Ma, Kaixin; Yu, Wenhao; Dai, Yong; Zhang, Hongming; Lan, Zhenzhong; and Yu, Dong (2024).** *WebVoyager: Building an End-to-End Web Agent with Large Multimodal Models.* ACL 2024, pp. 6864–6890. [Published paper and citation](https://aclanthology.org/2024.acl-long.371/) · [Original HTML, arXiv:2401.13919v4](https://arxiv.org/html/2401.13919v4). The survey cites it as **[638]** in §6.5.1, printed page 59. Slide 6 uses the later June 2024 version, which agrees with the ACL abstract’s 59.1% headline. Initial arXiv v1 used a smaller benchmark and different results.

## Quantitative claims shown in the deck

| Slide | Claim | Exact original context | Interpretation |
| --- | --- | --- | --- |
| 6 | WebVoyager 59.1% success on 643 tasks across 15 websites | WebVoyager v4 §4, §5.1–5.2, Table 1: GPT-4V-based agent, human expert labels | **Absolute whole-task success**, not a relative gain or step accuracy. The 57.1% automatic-evaluation row is a different result. The 15-step experimental limit appears in §5 experimental details. |
| 10 | Mind2Web +24.6% relative | AWM abstract; §3.2.1, Table 3: MindAct GPT-4 **36.2** → AWM offline GPT-4 **45.1**, cross-task **step success rate (%)** | `(45.1−36.2)/36.2×100 = 24.5856…%`; rounded to 24.6%. Absolute change: **8.9 percentage points**. |
| 10 | WebArena +51.1% relative | AWM §3.1.1, Table 1: published BrowserGym **23.5** → online AWM **35.5**, **task success rate (%)**, GPT-4 setting | `(35.5−23.5)/23.5×100 = 51.0638…%`; rounded to 51.1%. Absolute change: **12.0 percentage points**. |
| 10 notes | A different BrowserGym control scores 15.0% | AWM Table 1: BrowserGym ax-tree-only **15.0%** | This is a separate matched-observation comparison, not the baseline used in the 51.1% headline. The published 23.5% baseline uses a different observation configuration. |
| 11 | Element accuracy 41.6 → 50.6; action F₁ 60.6 → 57.3 | AWM Table 3, GPT-4, Mind2Web cross-task, MindAct → offline AWM | Component metrics move differently. §3.2.1 suggests that workflow guidance sometimes biases actions that should diverge from the remembered routine. That explanation is an interpretation, not an isolated causal test. |
| 11 notes | Mind2Web whole-task success remains low | AWM Table 3: MindAct GPT-4 **2.0%** → AWM GPT-4 **4.8%** | Step success is not whole-task success. Do not present 45.1% as task completion. |
| 15 | 15 autonomous papers; 10 PhD reviewers, 3 papers each | Agent Laboratory §4.1: **5** questions × **3** backends; volunteers review randomly assigned papers | This is a small, task-specific human evaluation; review assignments are not 30 independent generated papers. |
| 15 | Automated overall score 6.1/10; human 3.8/10 | Agent Laboratory §4.1.1, “Automated Reviews versus Human Reviews,” Figure 6 | Reported study means. Gap: **2.3 score points**. These are paper-review scores, not success rates or acceptance probabilities. No error bars are invented. |
| 15 | Co-pilot external score 4.38/10 versus autonomous 3.8/10 | Agent Laboratory §4.2.2, external evaluation and comparison with autonomous mode | Difference **0.58**. Distinct conditions; not a randomized isolation of the effect of adding human feedback. |
| 15 notes | Co-pilot significance −0.05; contribution +0.03 | Agent Laboratory §4.2.2, comparison with autonomous mode | Helps qualify the overall-score improvement: scientific contribution did not improve to the same degree as presentation-related quality. |

## Method and interpretation checks

- **WebVoyager’s inputs include both vision and text.** §3 describes screenshots with numbered interactive elements, auxiliary element text, task instructions, and history; actions execute in a Selenium browser environment. A new screenshot follows an action. The model stops via a terminating action or reaches the step limit. Its planning, tool use, and retrieval roles are a conceptual mapping to the survey, not three isolated ablation results. The flight graphic is an editable teaching diagram, not a reproduced trajectory or live search.
- **WebVoyager’s error analysis motivates the execution lesson.** §5.4 discusses getting stuck, confusing nearby elements, and mistaking calendar numbers for interactive-element labels. The deck’s claim that a sensible action can fail in execution is a teaching interpretation. It does not imply all failures stem from grounding or that failed tasks always had correct plans.

- **AWM is prompt-based procedural memory.** §2.2–2.3 describes workflow descriptions and trajectories, variable abstraction, induction, and integration into the action-generation prompt. The main method is not weight updating or automatic execution of an entire stored script. §5 separately explores action-space expansion; the deck does not conflate that extension with the core method.
- **Offline and online mean different data regimes.** Offline workflows are induced from training examples. Online workflows are induced during a stream of test tasks after a model evaluator predicts success. The evaluator is not an infallible ground-truth oracle. See AWM §2.3 and §3.2.2.
- **Abstraction and composition are distinguished.** The deck uses an illustrative flight-search workflow with route and date variables to explain AWM’s abstraction mechanism (§2.2–2.3). This is a teaching adaptation, not a reported flight experiment. AWM’s own composition case study (§3.1.3) extends a place-finding workflow to obtain a postal code; the notes and script identify that original example separately.
- **Agent Laboratory spans all three themes.** Its primary paper §3 describes specialized roles, code execution/reflection, persistent artifacts, and human feedback. The survey places it in planning, execution, and memory within §6.5. It is not falsely attributed to a claim that §6.5.3 discusses Agent Laboratory by name.
- **Evaluation has limits.** Agent Laboratory §5 reports hallucinated experiment details, rigid workflow limitations, execution failures, and difficulty aligning behavior with a researcher’s intent. Its observed human–automated scoring gap motivates the deck’s synthesis about independent verification.
- **Coordination costs and shared errors** are presentation-level design implications. The deck does not attach an invented experimental effect size to them.
- **Capabilities are complementary.** Slide 16 depicts one cumulative design. A collective system need not also have persistent memory, and a self-evolving system need not have several agents.

## Source boundaries

The main narrative comes exclusively from §6.5. Original-paper evaluations provide specific evidence for the assigned section’s cited WebVoyager, AWM, and Agent Laboratory examples. The deck does not extend into the survey’s §7 benchmark taxonomy. The 16 slides prioritize concepts over the section’s long framework lists.

The browser mockup, reasoning sequence, memory toggle, coordinator network, and worked experiment handoffs are **conceptual teaching illustrations**. They contain no fabricated experimental measurements and make no live API calls.

Slide 3 introduces planning, tool use, and search and retrieval through an illustrative flight-search workflow. The flight-search examples on slides 3, 4, 7, 8, and 9 use a hypothetical Raleigh-to-Boston request on a user-chosen date, with a nonstop requirement and a budget below $300. The budget is a task constraint, not a verified airfare. Flight availability and interface events are illustrative. The memory example reuses search procedures, while checking fares and availability again.
