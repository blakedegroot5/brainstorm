# Kent + Ottawa Lead Engine Draft (Working Assumptions)

Date: 2026-04-17
Status: Draft, exploratory only (not locked)

## Purpose

Capture current thinking on how a service-first lead offer for residential concrete contractors could work in Kent and Ottawa counties before final validation.

## Draft process (v0)

1. Capture local homeowner demand.
- Primary channel hypothesis: Google Search ads to a focused local landing page.
- Secondary channel hypothesis: Meta lead ads after initial signal.
- Messaging angle hypothesis: fast quote matching for driveway/patio/slab projects.

2. Intake and qualify leads.
- Collect lead through form/call.
- Validate minimum fields: homeowner contact, project type, location, rough timeline.
- Mark lead as billable vs non-billable based on quality rules.

3. Route qualified leads to contractors.
- Send qualified leads via SMS/email in a consistent format.
- Track receipt and response status.
- Maintain single source of truth in a shared tracker (Airtable/Sheet/CRM).

4. Close the loop weekly.
- Review lead quality and conversion feedback.
- Refine targeting, qualification rules, and routing.
- Apply replacement policy for clear bad-fit leads.

## Lead intelligence model (draft)

Use a two-lane model:

1. Intent lane (primary, faster signal)
- Homeowner actions with active buying intent: form fill, call, quote request.
- Main capture: local search ads + local landing page + call tracking.
- Why primary: strongest near-term intent and fastest path to paid validation.

2. Opportunity lane (secondary, proactive signal)
- Public data and local triggers that suggest upcoming concrete work.
- Candidate sources: permit feeds, municipal contractor/public works lists, local project notices, partner referrals.
- Why secondary: useful enrichment and targeting, but usually weaker/lagging intent signal than direct homeowner inquiry.

## Qualification framework (draft)

Each lead must pass minimum quality gates before delivery:

1. Fit gate
- In Kent/Ottawa coverage area.
- Residential project type we serve (driveway, patio, sidewalk, slab, related flatwork).

2. Contact gate
- Valid homeowner phone/email.
- Owner or authorized decision-maker.

3. Timing gate
- Rough timeline captured and within practical window for contractors (for example, <= 90 days preferred).

4. Commercial gate
- Basic budget readiness signal (stated range or willingness to receive estimate at prevailing market rates).
- Optional rough size/scope signal (photo, dimensions, or simple project-size tier).

5. Integrity gate
- Not duplicate, spam, or clearly non-actionable.

Scoring output (internal):
- A: strong fit + near-term + contactable + budget-ready.
- B: fit + contactable, but missing one strong signal (timing or budget clarity).
- C: weak fit/low confidence (do not bill by default).

## What we are actually doing to find opportunities (draft)

- Primary engine: capture existing homeowner demand and improve qualification/routing.
- Secondary engine: use public/local data to prioritize targeting and outreach, not as sole lead source.
- Core value proposition: fewer junk leads, faster first contact, clearer source/outcome tracking.

## Plain-language call flow (who calls who)

Default recommendation for early testing:

1. Homeowner contacts the concrete company directly.
- They call the contractor's number or submit the contractor's quote form.

2. We improve intake and follow-up behind the scenes.
- Add a simple intake script/form to capture location, project type, timeline, and real contact info.
- Add a same-day follow-up checklist so fewer inquiries get dropped.

3. Contractor quotes and closes as usual.
- We monitor speed and quality metrics from first response through quote outcome.

Alternative model (possible later):
- Homeowner contacts a shared number/form first and we route screened leads.
- This is deferred for now because it adds middleman complexity.

How we help in the default model:
- We improve lead quality at intake.
- We reduce missed opportunities with faster, structured follow-up.
- We track source and outcome so the contractor can see what is actually working.

## Operating assumptions to validate

- Contractors value speed and consistency over full appointment-setting at day one.
- A simple qualification standard is enough to create perceived quality for a first paid offer.
- Semi-local positioning (Kent + Ottawa) can increase trust and response rates.
- Manual operations are acceptable during validation if outcomes are measurable.

## Open questions

- Which channels appear most used already by concrete contractors in Kent/Ottawa?
- Where are competitors underperforming (speed, qualification, consistency, transparency)?
- Which lead handoff format is easiest for contractor owners to act on immediately?
