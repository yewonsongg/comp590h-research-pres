# Speaker notes

16 slides · planned delivery 19:30. Advance key stages with → or Space. The main deck displays “Reveal” when more teaching steps remain. Speaking times include pauses and brief interaction, and should be rehearsed with the actual presenter.

## 01. Agentic reasoning

**Introduction · 0:35 · cumulative 0:00–0:35 · 0 progressive reveals**

Today we will follow one question: what changes when a language model can act, remember what happened, and coordinate with other agents? The assigned survey section applies these ideas to web browsing, software interfaces, and autonomous research workflows.

The argument has three verbs: act, learn, collaborate. These are complementary capabilities that a single system can combine. Our two closer looks are Agent Workflow Memory and Agent Laboratory. Both are explicitly cited in Section 6.5.

The diagrams are teaching models. When a number comes from an experiment, I will identify the metric, comparison, and source. Transition: introduce the three capabilities before examining the basic action loop.

## 02. Three capabilities. One growing system.

**Introduction · 0:30 · cumulative 0:35–1:05 · 2 progressive reveals**

The survey uses three lenses rather than three mutually exclusive generations. Foundational reasoning is the ability to plan, use tools, and retrieve information. Self-evolving reasoning adds mechanisms that retain and use experience. Collective reasoning adds division of labor and communication.

Reveal learning, then collaborating. A research assistant can use all three: run an experiment, retain a successful debugging routine, and ask a reviewer agent to check the result. The capability added at each stage will matter more than the names of individual frameworks.

We will spend roughly four minutes on acting, five to six on memory and its evidence, and five on collaboration and research evaluation.

## 03. From responses to real-world tasks.

**01 · Acting · 1:30 · cumulative 1:05–2:35 · 2 progressive reveals**

Section 6.5.1 introduces foundational agentic reasoning: the capabilities that let an LLM-based system carry out tasks in an environment. Traditional language models primarily generate responses from the information they receive. More complex tasks can require multiple steps, external information, and interaction with different environments. The model can remain the reasoning engine within an agent.

Advance once to reveal the flight-search workflow. The task is to find a nonstop Raleigh-to-Boston flight below $300 on a user-chosen date. A traditional LLM can suggest an answer using the information it has, while an agentic system can search that route and date, apply the nonstop filter, inspect current fares and availability, and return suitable options. This is an illustrative task, not a verified travel offer or live booking.

Advance again to reveal all three foundational capabilities. Planning organizes the constraints and search steps. Tool use operates the browser to enter details and apply filters. Search and retrieval locate flights and bring back current fare details. The capabilities work together: a search may use a tool, and its results may change the plan.

The key point is that agents need planning, tool use, and search and retrieval to connect reasoning with task execution. Transition: continue the same flight example to show how new observations can change the plan.

## 04. Reasoning becomes a feedback loop.

**01 · Acting · 1:35 · cumulative 2:35–4:10 · 4 progressive reveals**

Use a familiar travel task: find a nonstop Raleigh-to-Boston flight for less than $300 on a date the user has chosen. Walk through the five nodes using four advances. The goal states the requirements. At Plan, explain the small steps: enter the route and date, filter for nonstop flights, and compare fares.

At Tool action, the agent opens a promising flight’s fare details. Pause at Observation: the selected fare is no longer available. An observation is what the environment actually returns, including information that invalidates a candidate result.

At Updated plan, the agent refreshes the results and checks another nonstop option on the same date, within the same budget. The goal stays the same; the next action changes. The feedback arrow returns to planning because plans must adapt to observations.

This is a conceptual flight search, not a live search, booking, or reported experiment. The route and budget are illustrative requirements, not verified travel offers. It illustrates planning and tool use in §6.5.1. Transition: the same loop applies when an agent browses the web, operates a software interface, or carries out research.

## 05. Same loop. Different environments.

**01 · Acting · 1:10 · cumulative 4:10–5:20 · 2 progressive reveals**

Web agents work with search results, HTML, screenshots, and browser actions. The challenge is finding evidence while pages and available information change. GUI means graphical user interface: the agent must connect an instruction to a visible target before clicking or typing.

Reveal the GUI column. Grounding means identifying the particular on-screen element that corresponds to an intention. A sensible high-level plan can still fail because the agent clicks the wrong button. Hierarchical designs often separate planning from that low-level execution.

Reveal research agents. These systems combine search, code, data preparation, execution, and reporting. The scope of the goal is broader, but the need to verify actions remains. The three columns overlap: a research agent might use both a browser and a GUI.

The survey also covers learned policies, including reinforcement learning from interaction outcomes. These examples illustrate the application families; the presentation is not claiming that one listed framework is universally strongest. Transition: look more closely at WebVoyager, a concrete web agent cited in the assigned section.

## 06. WebVoyager: knowing is not executing.

**01 · Acting · 1:50 · cumulative 5:20–7:10 · 2 progressive reveals**

To explore a foundational agent in more detail, introduce WebVoyager: Building an End-to-End Web Agent with Large Multimodal Models, by He and colleagues, published at ACL in 2024. The survey cites it in §6.5.1 under tool use, reference [638]. The research question is whether a multimodal model can complete tasks end-to-end on real websites.

Walk through the diagram. Given a task, WebVoyager observes a screenshot with numbered interactive elements, auxiliary element text, and interaction history. It reasons about the next action, then uses a Selenium browser environment to click, type, scroll, or perform another available action. The updated page becomes the next observation. The process ends when it issues a terminating action or reaches the experimental limit of 15 steps. The flight-page graphic is our illustration, not a screenshot from the study.

Connect the method to the survey’s three capabilities. Planning appears in choosing the next steps; tool use executes browser actions; search and retrieval locate the content needed for the task. These are overlapping roles of the same interaction process, not three separately isolated experimental modules.

Advance for the result: 59.1% whole-task success on 643 tasks across 15 websites, using the GPT-4V-based agent and human expert labels in Table 1. Cite arXiv v4, June 2024, which matches the ACL headline. The initial January v1 used 300 tasks and reported different results; the 59.1% figure is not a result from that earlier version. It is an absolute success rate, not a relative improvement, and should not be directly ranked against AWM’s different metrics and settings.

Advance for the main insight. The paper documents navigation failures and visual-grounding errors, including confusing adjacent elements and calendar numbers with element labels. Knowing what should happen is different from carrying it out successfully. This is a conceptual lesson from the error analysis, not evidence that every failed task had a correct plan. Transition: use our flight-search example to see how an apparently sensible action can fail at the interface.

## 07. A plan must survive contact with the page.

**01 · Acting · 1:05 · cumulative 7:10–8:15 · 3 progressive reveals**

Continue the flight-search example. The agent finds a promising nonstop option, but a cookie dialog covers the View fare button. Its click does not open the fare details. If it assumes success, later decisions will be based on an imagined page state. Longer trajectories create more opportunities for this kind of error accumulation.

Advance through detection, repair, and preservation. Detection compares expected and actual outcomes. Repair re-plans locally rather than blindly repeating the same action. Keeping a useful lesson introduces the next topic: persistent experience.

Several mechanisms in Section 6.5 target these issues: compressed observations reduce irrelevant context; retrieval supplies prior trajectories; reflection modules inspect failures. These mechanisms are not guarantees. A model can misread feedback or store a bad lesson.

The key distinction for the next section is between recovering during this attempt and changing what the agent can reuse in a future attempt. The latter is the self-evolving dimension.

## 08. Experience should change the next attempt.

**02 · Learning · 1:25 · cumulative 8:15–9:40 · 4 progressive reveals**

Self-evolving is broader than retraining the model. Here the mechanism is an external memory that changes what the agent receives in context. Other systems in the section update policies through training. We are focusing on the persistent-memory case.

Advance through the loop. Feedback supplies an outcome signal. Reflection interprets it. After a successful flight search, memory retains the procedure: enter the route and date, apply filters, inspect fares, and check availability. A later trip can reuse those steps with a different route and date.

At the memory stage, toggle No memory, then Workflow memory. Without persistent memory, the later task lacks the stored procedure. With it, the agent has a starting strategy. Reuse the search steps, not a stale price or availability claim: fares must be checked again. There is no measured time saving or guaranteed success in this illustration.

Reflection and memory are distinct: writing a critique does not make it available tomorrow. A useful memory must be retained, relevant, and accurate. In the next slide, AWM gives this general idea a concrete architecture.

## 09. Remember a procedure, not a whole episode.

**02 · Learning · 1:30 · cumulative 9:40–11:10 · 3 progressive reveals**

The research problem is procedural reuse. A whole successful browsing episode contains details that may be irrelevant to the next task. AWM instead induces reusable subroutines, replacing concrete values with variables. A workflow includes a description plus steps containing state descriptions, reasoning, and actions.

Advance through induction and use. The language model extracts a routine, and that routine is integrated into text-based memory used in the action-generation prompt. This is inference-time guidance; the central method does not require changing the backbone model weights. Do not describe it as always executing a rigid script.

The offline version constructs memory from training examples. The online version streams test tasks, uses a model-based success evaluator, and induces workflows from attempts predicted successful. A mistaken evaluator can therefore admit a faulty workflow.

Reveal the variable-based flight example, which is our teaching adaptation of AWM’s abstraction mechanism. A particular Raleigh-to-Boston search becomes a workflow with route and date variables. This is not a reported flight experiment. The paper’s own composition case study extends a place-finding routine to obtain a postal code. It illustrates how a reusable prefix can be extended rather than copying an entire earlier answer. Transition: how much did AWM help in the actual experiments?

## 10. Memory helps. Read the denominator.

**02 · Learning · 1:25 · cumulative 11:10–12:35 · 2 progressive reveals**

The bars show the abstract headline numbers, verified against the original tables. Mind2Web animates on first entry; use Replay to restart it manually. In the GPT-4 cross-task experiment, offline AWM improves step success from 36.2 percent to 45.1 percent compared with MindAct. That is 8.9 percentage points, or approximately 24.6 percent relative improvement.

Advance for WebArena. Online AWM reaches 35.5 percent task success versus 23.5 percent for the published BrowserGym baseline. That difference is 12 percentage points and approximately 51.1 percent relative improvement. These are rounded reported rates. Hover or focus a bar to see the calculation.

Mind2Web scores a step as successful only when both the selected element and action are correct. WebArena checks whole-task functional success. The bars therefore do not measure the same outcome. Also, Table 1 reports a separate accessibility-tree-only BrowserGym control at 15.0 percent: it is not the denominator behind the 51.1 percent headline.

The WebArena result still leaves most tasks unsolved, and the paper does not provide uncertainty intervals with these headline comparisons. This is promising evidence in specific settings, not a universal performance multiplier. Transition: decomposing a metric reveals a more interesting story.

## 11. Better targeting can hide weaker actions.

**02 · Learning · 1:05 · cumulative 12:35–13:40 · 2 progressive reveals**

Here is the deeper insight from AWM. The overall improvement is not uniform across skills. In Table 3 with GPT-4, element accuracy rises by nine points, from 41.6 to 50.6. But action F1 falls from 60.6 to 57.3. F1 combines precision and recall of the predicted action; it is a different measure from element accuracy.

Reveal the lower metric. The authors suggest that a workflow can help the agent identify a relevant element while biasing it toward an action that is inappropriate for the present state. Treat that explanation as their interpretation, not a separately isolated causal experiment.

Reveal the design lesson. A useful agent must learn when to depart from remembered guidance. The online version has another risk: an LLM evaluator may judge an unsuccessful attempt successful, allowing an incorrect workflow into memory. Finally, whole-task success on this Mind2Web split remains only 4.8 percent for AWM versus 2.0 percent for MindAct.

Transition: memory changes what one agent brings to a task. Collaboration changes how the work itself is distributed.

## 12. Give each agent a job—and an interface.

**03 · Collaborating · 1:05 · cumulative 13:40–14:45 · 4 progressive reveals**

This network is a conceptual coordinator–specialist design, not a reproduction of one named system. Each advance assigns a role and animates information moving out and back. A role can be implemented by a separate model invocation with its own instructions and context; it does not necessarily mean a different underlying model.

The section provides concrete examples of division of labor. INFOGENT uses Navigator, Extractor, and Aggregator roles with feedback to navigation. GUI systems divide planning, perception, operation, reflection, and note taking. Research teams exchange code, evidence, and manuscripts.

The interface matters as much as the role label. What exactly must a researcher return? A source and its supporting passage are more useful than an unsupported conclusion. What can a reviewer reject? A measurable completion condition makes the check meaningful.

More agents add coordination work and may share the same model errors. Independent-looking opinions are not independent evidence. Transition: follow one concrete scientific question through these handoffs.

## 13. A collaboration is a sequence of handoffs.

**03 · Collaborating · 1:00 · cumulative 14:45–15:45 · 4 progressive reveals**

This is an illustrative experiment, not a claim about new experimental results. We ask whether two model families respond differently to image noise. The planner proposes controls: identical test data and perturbations, a defined performance metric, and repeated seeds where appropriate.

Advance through the handoffs. The researcher supplies related work and assumptions that might affect the comparison. The executor returns runnable code and raw measurements. The reviewer checks whether the experiment actually followed the plan and whether the written claim matches those measurements.

If the reviewer identifies different preprocessing across models, another discussion round is less useful than checking and correcting the preprocessing. The coordinator routes that concrete issue back to the executor.

This example illustrates why explicit artifacts matter. Natural-language agreement can conceal a shared mistake. Transition: Agent Laboratory operationalizes several of these roles in an end-to-end research-assistance workflow, including points where a human can intervene.

## 14. A research assistant, organized as a lab.

**03 · Collaborating · 1:30 · cumulative 15:45–17:15 · 3 progressive reveals**

Agent Laboratory addresses the integration problem: a promising idea requires literature, executable experiments, interpretation, and a report. It takes a human-provided idea and notes, then runs three main phases. The academic role labels name prompted agent responsibilities, not human-equivalent qualifications.

Reveal experimentation. Planning and data preparation precede execution. The mle-solver proposes or edits programs, executes them, scores outcomes, reflects on errors or improvements, and retains strong candidate programs. Its score is a search signal; it is not itself proof of scientific validity.

Reveal report writing. The paper-solver turns the accumulated research into a report and iteratively refines it. Code, results, and interpretation persist across phases, which is why the survey also discusses this system under memory. The primary paper makes its specialized roles explicit, connecting it to our collaboration theme.

Reveal human guidance. In co-pilot mode, a researcher can provide feedback at the end of each subtask. The paper studies different model backends and human evaluations rather than demonstrating unrestricted autonomous science. The output is a research-assistance artifact that needs inspection. Transition: the most revealing experiment asks who is judging the result.

## 15. A convincing report can fool its reviewer.

**03 · Collaborating · 1:20 · cumulative 17:15–18:35 · 2 progressive reveals**

The autonomous evaluation generated fifteen papers: five questions using three model backends. Ten volunteer PhD students each reviewed three randomly assigned papers. These are a small set of machine-learning research tasks, so we should not generalize the scores to all science.

Advance for the chart. Automated reviewers gave an average overall score of 6.1 out of ten, while human reviewers gave 3.8. A reviewer agent is therefore not automatically an independent quality guarantee. This is the main deeper insight from the paper: automating the evaluation loop can reward outputs that look better to models than to people.

Advance for co-pilot results. External evaluation gave co-pilot reports 4.38 versus 3.8 for autonomous reports. The paper reports improvements concentrated in quality, soundness, clarity, and presentation; significance slightly declined and contribution barely changed. The study is not a randomized isolation of the effect of human feedback, and backend and task differences matter.

The paper also documents hallucinated experiment details and failures in execution. Its cost reductions concern particular reported inference configurations, not the total cost of doing research. We have intentionally centered scientific quality rather than treating cheap report generation as discovery. Transition: combine the useful capabilities while retaining an evidence check at every layer.

## 16. Add capabilities. Keep the evidence loop.

**Synthesis · 0:55 · cumulative 18:35–19:30 · 2 progressive reveals**

This matrix depicts a cumulative system design, not a claim that every multi-agent system must have persistent memory. The survey dimensions can overlap. A collective system could coordinate specialists without evolving over time, and a single agent could learn reusable workflows.

Advance through the additions. Tool use expands what an agent can do. Persistent adaptation changes what it can carry into the next task. Coordination changes how specialized work is distributed. The foundational loop remains useful throughout.

Three takeaways follow from the evidence we examined. First, outcomes should be checked against the environment. Second, memory is only helpful when its procedures are applicable and trustworthy. Third, a reviewer must be evaluated too; agreement and fluent reports are insufficient evidence.

Close by returning to the central lesson: acting, learning, and collaborating can be combined, but each depends on evidence that the system actually achieved its goal.
