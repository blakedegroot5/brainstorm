# Real Estate MLS Listing Automation Candidate

Date: 2026-04-18
Status: Early exploration, pending friend validation call

## The Core Pain Point

Real estate agents (and brokerages with listing teams) spend significant time manually entering property data into MLS (Multiple Listing Service) systems. The process includes:
- Searching and verifying property address
- Filling in required fields (price, beds, baths, sq ft, lot size, features)
- Writing listing descriptions
- Organizing and uploading photos
- Managing compliance/accuracy

**Two customer segments with the same pain:**
1. **Solo agents** (primary v1 target): Do the data entry themselves (no staff to delegate to). Tedious, time-consuming, takes away from client-facing work.
2. **Real estate brokerages** (expansion target): Office staff/assistants spend 10+ hours/week on manual listing entry. Opportunity to automate staff work = free up salary.

**Friend's validated signal:** Manual data entry is slow and tedious.

## Current FlexMLS Workflow

1. Agent clicks "Add Listing" → Select property type
2. Search property address → Verify location on map
3. Select autofill options (pulls tax data, previous listing data if available)
4. Manually fill in required fields (marked in red until complete)
5. Add additional details (features, amenities, descriptions)
6. Submit or save incomplete for later

**Key insight:** Even with autofill, significant manual work remains. Autofill is optional and not always complete/accurate.

## Validated Pain Points (From Agent Research)

- **Error-prone:** Manual entry causes typos (prices, addresses), wrong dropdown selections
- **Duplicate entry:** Agents often manually post to MLS, their website, syndication sites
- **Clunky UX:** Many MLS systems have poor interface design
- **Time suck:** Takes agents away from client relationships and business development
- **Complexity:** Many required fields; hard to get all details right

## Existing Competitive Solutions

Market is **NOT empty**. Several established players with different focuses:

1. **Rechat** — Full AI operating system for real estate (CRM + marketing + transactions). Enterprise-focused, expensive, overkill for solo agents.
2. **Cotality (MLS-Touch)** — Native MLS app with AI (CoreAI for listings, CorePlan for floor plans). Used by 1M+ agents. Built into the tool they already use.
3. **Writor** — AI tool for listing descriptions only. 3-step process, $30-50/mo estimate. Real estate-trained AI (not generic). Requires copy/paste into MLS.
4. **Restb.ai** — Computer vision analyzes photos, auto-fills 700+ MLS data points, generates descriptions. Enterprise/white-label (not consumer-facing). Expensive.
5. **IDX Broker** — MLS search tools, automation, AI features.

**Key insight:** No single solution owns the "simple, integrated, solo-agent focused" wedge. Rechat is overkill. Cotality is MLS-regional. Writor is description-only. Restb.ai is enterprise-only.

**Implication:** Pain is validated (solutions exist), but wedge must be **cheaper, simpler, integrated, or bundled for solo agents**.

See [real-estate-competitor-analysis.md](./real-estate-competitor-analysis.md) for detailed breakdown.

## Product Hypothesis: Unified Input + MLS Auto-Fill via Browser Extension

**The Core Idea:**
Agent inputs property data via any method (voice dictation, typing, photo upload, pasting existing docs/listings) → AI consolidates into unified understanding → Browser extension auto-fills MLS form fields in FlexMLS.

**Scope Constraints:**
- **Buildable software, not service.** This is a tool that agents use, not a service where we create listings for them.
- **Michigan only (v1).** Focus on FlexMLS (Michigan's primary MLS). No national rollout. No multi-MLS support.
- **Build target: 4-6 weeks.** Extension + AI pipeline + basic Chrome injection.

**Why this beats competitors:**
- **Flexible input:** Accepts dictation, text, photos, documents (competitors specialize in one)
- **Direct MLS integration:** Extension auto-fills form vs. copy/paste (Writor) or separate uploads (Restb.ai)
- **Unified workflow:** One tool vs. fragmented tools
- **Price undercut:** $30-50/mo for solo agents vs. Rechat ($100-300/mo), Restb.ai (enterprise)
- **Regional depth:** Focused on Michigan agents, not trying to be national day one

**Possible wedges within this:**
1. Voice dictation → auto-fill (vs. Writor's text-only)
2. Photo upload → auto-fill (vs. Restb.ai's separate ecosystem)
3. Existing doc paste → unified listing (vs. Cotality's regional limits)
4. Combination of all three (unique to this product)

**V1 Service Alternative:**
Instead of building extension immediately, start with manual service:
- Agent sends: voice notes + photos + docs
- You: consolidate, generate listing, deliver polished form
- Agent: pastes into MLS
- Test WTP before building automation

**Critical feasibility questions:**
- Can you auto-fill FlexMLS form fields via Spark API, or must you use DOM manipulation?
- How do you consolidate dictation + photo analysis + document extraction into one AI pipeline? (KNOWN GOOD)
- How do you handle agent credentials/API access securely?
- Which MLS systems do you support? (Michigan only = FlexMLS only for v1 ✅)
- Can you build this in 4-6 weeks? (YES, if Spark API supports writes ✅)

**Feasibility Research:**
See [flexmls-api-research.md](./flexmls-api-research.md) for detailed breakdown. Key unknowns:
- **Does Spark API support creating/editing listings?** (Must contact api-support@sparkplatform.com to confirm)
- If yes: clean, scalable integration (6 weeks)
- If no: must use Chrome extension DOM injection (still doable, 5-6 weeks, more fragile)

## Next Steps Before Coding

**Friend validation call (this week):**
- How long does posting a listing take start-to-finish?
- Which part is slowest? (photos, descriptions, data entry, organizing?)
- Have they tried Rechat, Cotality, Writor, or similar tools?
- If so, what's missing or frustrating?
- What would it be worth to save 50% of that time? (Monthly or per-listing pricing?)

**Research questions:**
- What's the API/automation surface for FlexMLS? (Can we programmatically fill fields?)
- What's Cotality's pricing? (Understand competitive pricing)
- Is there a specific sub-problem (e.g., just descriptions, just photos) that isn't well-solved?

## Key Unknowns

- **Willingness to pay:** Do agents actually pay for this? (Rechat/Cotality exist, but they might not capture all segments)
- **Real pain intensity:** Is it annoying enough to switch tools, or just a minor friction?
- **Wedge clarity:** What's the specific advantage over existing solutions?
- **Technical feasibility:** Can we actually automate MLS posting, or is the interface too restrictive?
- **Market segment:** Is this for solo agents, teams, brokers, or a specific region/property type?

## Operating Principle Applied

This idea is being explored via **"feasibility first, validation second"**. Before discovery calls, we validate:
1. That friend's pain is real and quantified
2. What existing solutions miss or do poorly
3. What a v1 service/product could realistically do in 2-4 weeks

Only if those are clear do we move to broader market discovery.
