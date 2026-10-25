---
title: 'Scaling AI in Practice: When to Own the Stack vs Leverage the Ecosystem'
description: 'A panel discussion at AI Infra Summit on navigating build vs. buy in enterprise AI—balancing customization, operational tax, and long-term control across compute, models, gateways, and agent systems.'
date: 2026-09-17
venue: 'AI Infra Summit'
type: 'panel'
url: 'https://www.ai-infra-summit.com/2026-agenda/owning-the-stack-vs-leveraging-the-ecosystem'
topics:
  - 'AI Infrastructure'
  - 'Build vs Buy'
  - 'ML Platforms'
  - 'LLM Gateways'
  - 'Model Serving'
  - 'Enterprise AI'
audience: 'Engineering leaders, AI/ML platform architects, and infrastructure teams evaluating where to build proprietary control vs leverage ecosystem tooling.'
isFeatured: true
image: '/speaking-ai-infra-summit-panel.jpg'
imageAlt: 'Nathan Frank speaking on the Scaling AI in Practice panel at the AI Infra Summit'
seo:
  title: 'Nathan Frank - AI Infra Summit: Scaling AI in Practice Panel'
  description: 'Nathan Frank discusses build vs. buy in enterprise AI infrastructure, LLM gateway abstractions, and navigating operational tax at AI Infra Summit 2026.'
  image:
    src: '/speaking-ai-infra-summit-panel.jpg'
    alt: 'Nathan Frank speaking on panel at AI Infra Summit 2026'
---

### Panel Overview

At the AI Infra Summit 2026 in San Jose, I joined engineering leaders from Oracle, Bitdeer AI, and BetterWorks on the Data & Models track to address one of the most critical decisions facing enterprise AI teams: **when to build proprietary control into your stack, and when to leverage commercial or open-source ecosystems.**

The discussion moved past simplistic build-versus-buy dichotomies to explore the operational realities of scaling ML and GenAI platforms in established enterprises.

**_Key themes & takeaways_**

- **The Decision Framework: Customization, Operational Tax, and Control**:
  Building custom infrastructure makes sense only when deep customization is required, the ongoing operational tax remains low, and owning the component yields strategic control. Where customization needs are low—such as raw GPU hardware—relying entirely on cloud ecosystems eliminates massive maintenance burdens with zero loss in business differentiation.
- **Renting Isn't a Silver Bullet**:
  While moving brittle experimentation tooling (like self-hosted Kubeflow clusters) to managed options eliminated cluster outages, offloading components like workflow orchestration to managed vendors introduced steep cost ramps and underwhelming feature velocity that still required developer effort.
- **Strategic Leverage in Serving & Gateways**:
  Investing early in an in-house LLM Gateway delivered outsized leverage: low maintenance overhead combined with enterprise-grade capabilities like multi-region DNS failover, model federation, and standardized guardrails.
- **Insulating Against Provider Price Shocks & Platform Shifts**:
  Owning gateway abstractions and open-source serving layers allows organizations to reroute traffic between commercial API providers and self-hosted open-weights without refactoring upstream applications. Upstream changes become evaluation exercises rather than architectural rewrites.
- **What the Industry Is Overbuilding**:
  Standalone "agent infrastructure" is largely overhyped. While agent workflows introduce real challenges around non-deterministic execution and tool guardrails, they are best solved by adapting proven distributed systems patterns rather than adopting premature, over-specialized vendor stacks.
