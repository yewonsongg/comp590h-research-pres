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

## 08. AWM turns one web task into guidance for the next.

**02 · Learning · 1:25 · cumulative 8:15–9:40 · 4 progressive reveals**

Section 6.5.2 asks what changes after a web agent finishes one task. AWM is the concrete example: it keeps an external, text-based workflow memory rather than relying only on the current prompt. This differs from retraining the model.

Advance through the loop. The agent attempts a task, sees an outcome, reflects on what mattered, and stores a reusable procedure. The flight search is illustrative: a successful attempt records how to enter the route and date, apply filters, inspect fares, and confirm availability.

At the memory stage, toggle No memory, then Workflow memory. Without memory, the later task rebuilds its plan. With memory, it begins with a relevant workflow. It reuses the search procedure, not an old fare: the agent must still inspect the live page.

This is the distinction to remember: reflection identifies a lesson during one attempt; memory makes that lesson available later. The next slide shows how AWM converts a particular trajectory into a general procedure.

## 09. A reusable workflow keeps the steps, not the old answer.

**02 · Learning · 1:30 · cumulative 9:40–11:10 · 3 progressive reveals**

AWM addresses procedural reuse. A full browsing episode includes details that the next task does not need. Its workflow preserves the useful pattern while replacing task-specific values with variables.

Advance through induction and use. AWM extracts a routine from a trajectory, then inserts that text into the prompt that produces later actions. The memory guides the model at inference time. It does not force the agent to replay an old script or require a weight update.

The online variant adds memory from attempts that a model evaluator predicts were successful. That is useful, but it creates a practical risk: an incorrect evaluator can store a bad workflow.

Reveal the flight workflow. This is a teaching adaptation, not an AWM experiment. The paper’s own composition case extends a place-finding workflow to retrieve a postal code. Both illustrate the same idea: use a remembered routine as a starting point, then adapt it to the current task. Transition: how much did this help in the reported experiments?

## 10. AWM gains appear in two different kinds of task.

**02 · Learning · 1:25 · cumulative 11:10–12:35 · 2 progressive reveals**

The first result answers a step-level question. In the GPT-4 cross-task Mind2Web experiment, offline AWM improves step success from 36.2 percent to 45.1 percent compared with MindAct. That is 8.9 percentage points, or about 24.6 percent relative improvement.

Advance for the end-to-end result. On WebArena, online AWM reaches 35.5 percent task success versus 23.5 percent for the published BrowserGym baseline. That is 12 percentage points, or about 51.1 percent relative improvement.

Do not compare bar height as if both results measure the same thing. Mind2Web checks whether the agent completed a step, including the element and action. WebArena checks whether it completed the whole task. The 15 percent accessibility-tree-only BrowserGym control is a separate comparison, not the denominator here.

The practical message is modest: workflow memory helped in these settings, but even the stronger end-to-end result leaves most tasks unsolved. Next, look at the other forms of self-improvement that the survey groups with memory.

## 11. Self-evolving agents improve in more than one way.

**02 · Learning · 1:05 · cumulative 12:35–13:40 · 3 progressive reveals**

AWM is the detailed memory example, but Section 6.5.2 is broader. The survey also treats reflections, validation signals, GUI repair, and research execution outcomes as ways to make later behavior better.

ReAP stores and retrieves a reflection from a prior web-navigation task. It turns a lesson such as a successful or failed navigation strategy into prompt guidance for another task.

For GUI agents, Mobile-Agent-E has an Action Reflector and a Notetaker. They evaluate executed steps and add practical Tips and Shortcuts to persistent memory. For research agents, Dolphin runs generated code, then uses exceptions and benchmark outcomes to revise its next idea or implementation.

The common rule is simple: an agent has not evolved merely because it produced a critique. An earlier outcome must leave a trace that changes a later decision. Transition: collective reasoning changes who performs the work within one task.

## 12. INFOGENT assigns three jobs to one web question.

**03 · Collaborating · 1:05 · cumulative 13:40–14:45 · 4 progressive reveals**

Section 6.5.3 shifts the question from learning across attempts to dividing work inside one attempt. INFOGENT is the clearest web example: it assigns navigation, evidence extraction, and aggregation to distinct roles.

Advance through the roles. The Navigator finds pages, the Extractor returns passages, and the Aggregator writes an answer from that evidence. This division matters because a fluent summary without supporting passages is not a useful research artifact.

The last stage is the important feedback path. When the Aggregator identifies an information gap, it sends the task back to navigation. The system therefore does not simply pass a document down a fixed assembly line.

Other systems use different role boundaries: WebPilot separates global planning from local MCTS executors, while GUI agents often separate planning, perception, action, reflection, and note taking. More agents also add coordination cost and can repeat the same error. Transition: trace the specific artifacts in an INFOGENT-style handoff.

## 13. A web-research team passes evidence, not just conclusions.

**03 · Collaborating · 1:00 · cumulative 14:45–15:45 · 4 progressive reveals**

This is an illustrative walkthrough, not a reported INFOGENT trajectory. It applies the role structure to the question we just discussed: which self-evolving systems reuse prior experience?

Advance through the handoffs. The Navigator produces a search set. The Extractor supplies the particular source passages. The Aggregator can then distinguish workflow memory, retrieved reflections, GUI tips, and execution feedback without treating them as one mechanism.

The final handoff is a gap report, not a vote. If the source does not support a claim, the right next action is to retrieve better evidence, not to ask another agent to restate the conclusion.

This is why interfaces matter in collective reasoning: the output of one role becomes a checkable input for the next. Transition: Agent Laboratory applies the same principle to literature, experiments, and writing.

## 14. A research assistant, organized as a lab.

**03 · Collaborating · 1:30 · cumulative 15:45–17:15 · 3 progressive reveals**

Agent Laboratory addresses the integration problem: a promising idea requires literature, executable experiments, interpretation, and a report. It takes a human-provided idea and notes, then runs three main phases. The academic role labels name prompted agent responsibilities, not human-equivalent qualifications.

Reveal experimentation. Planning and data preparation precede execution. The mle-solver proposes or edits programs, executes them, scores outcomes, reflects on errors or improvements, and retains strong candidate programs. Its score is a search signal; it is not itself proof of scientific validity.

Reveal report writing. The paper-solver turns the accumulated research into a report and iteratively refines it. Code, results, and interpretation persist across phases, which is why the survey names this system under memory in Section 6.5.2. Its specialized roles make it a useful supporting example for collaboration, even though the survey does not name it in Section 6.5.3.

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
