# DIY Home Project Decision Tool (DIY vs Hire Contractor)

Date: 2026-04-19
Status: Documented, not prioritized

## Idea

A homeowner-facing tool that helps users decide whether to:
- do a project DIY,
- hire a contractor,
- or use a hybrid approach.

The tool would estimate cost, time, risk, and likely rework exposure rather than only showing a generic price range.

## What exists today

Current tools mostly provide:
- broad project cost guides,
- contractor quote discovery,
- basic calculators.

Examples reviewed:
- Angi True Cost
- HomeAdvisor Cost Guide
- Thumbtack Prices
- Bluebook estimator (includes DIY vs pro framing)
- additional newer AI-style estimator entrants

## Gap hypothesis

There appears to be a gap in **decision-quality tooling**, especially:
1. Permit/code-aware recommendations by city.
2. Quote normalization and scope-gap detection.
3. Time-risk scoring (not just dollar estimates).
4. Clear recommendation between DIY / hybrid / pro based on user context.

## Strategic fit assessment (Blake constraints)

### Broad consumer app (generic)
- Verdict: Likely no-go.
- Why: crowded category, high CAC risk, weak moat, difficult distribution for solo founder.

### Narrow wedge (possible)
- Verdict: Conditional maybe.
- Required for viability:
  - single project category focus (not all DIY),
  - one reachable channel,
  - clear data/decision moat (permit + quote + risk model),
  - monetization path beyond ad traffic.

## 6-check filter (current read)

1. Human paid $15-50/hr now: **Yes** (contractor estimating/admin labor exists).
2. Software can do ~80%: **Partial** (cost estimation yes, full risk/context harder).
3. Reachable niche/channel: **Weak currently** (consumer distribution challenge).
4. MVP in 6 weeks: **Yes technically**, uncertain GTM.
5. Incumbent feature risk: **High** for generic version.
6. 2-year founder interest: **Unknown**.

## Current recommendation

Do not pursue this as a broad consumer app right now.

Only revisit if we can define a narrow, distribution-first wedge with a stronger moat than "another estimator."
