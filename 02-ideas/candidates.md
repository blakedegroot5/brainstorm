# Business Idea Candidates

## Active Exploration (Currently Validating)

### Real Estate MLS Auto-Fill + AI Summarization (Michigan FlexMLS Focus)
- **Status:** Modular product design. Core + optional layers. Spark API research in progress. Legal research complete (mostly cleared).
- **Two Customer Segments (Same Core Product):**
  - **Segment A (Simpler MVP):** Solo agents/small brokers who just want auto-fill + description generation
  - **Segment B (Expansion):** Real estate office admins who want full workflow (scheduling + auto-fill + payment)
- **Core Product (All Users):**
  - Unified input (dictation + typing + photos + documents)
  - AI consolidation + description generation
  - MLS auto-fill (Spark API or Chrome extension)
- **Optional Layer (Offices Only):**
  - Vendor scheduling (photographers, contractors)
  - Invoice/payment integration
- **V1 Focus:** Launch with core (auto-fill + AI) → Test with solo agent → Expand to offices
- **Hard constraints:**
  - SOFTWARE not service (office uses tool, we don't do the work)
  - Michigan-only v1 (FlexMLS region only)
  - Buildable in 4-6 weeks (UNKNOWN — depends on payment integration complexity)
- **Competitive landscape:**
  - Photo scheduling tools exist (HDPhotoHub, Tonomo, Rela, Aryeo) but DON'T integrate with MLS
  - MLS tools exist (Rechat, Cotality, Writor) but DON'T handle vendor scheduling
  - **GAP: Nobody integrates vendor scheduling + MLS posting + payment** ← This is the wedge
- **Validation signals:**
  - Blake observes admin's workflow firsthand (does drone photography for this realtor for several years)
  - Admin handles ~3 listings/month (enough pain to matter)
  - Admin does: schedule photo → download → upload → manual data entry → pay invoices (multiple tools, multiple steps)
- **Feasibility unknowns:**
  - Does Spark API support listing creation? (CRITICAL)
  - Can we build payment integration (Stripe/bank API) in 4-6 weeks?
  - Is vendor scheduling + MLS auto-fill technically feasible to integrate?
- **Validation signals:**
  - Blake observes admin's workflow firsthand (does drone photography for this realtor for several years)
  - Admin handles ~3 listings/month (enough pain to matter)
  - Admin does: schedule photo → download → upload → manual data entry → pay invoices (multiple tools, multiple steps)
- **CRITICAL SUCCESS FACTORS:**
  - Competition: Gap confirmed (no one integrates vendor scheduling + MLS + payment). If someone is already building this, idea is less defensible.
  - **Legality:** Most legal concerns are LOW RISK because software is workflow tool, NOT real estate service provider.
    - ✅ **CLEARED:** FlexMLS permits 3rd-party integrations (70+ already exist via Spark Store)
    - ❓ **PENDING:** Spark API supports listing creation via POST/PUT? (waiting on api-support@sparkplatform.com)
    - 🟡 **HIGH:** Data privacy compliance achievable with standard practices (privacy policy + retention)
    - ✅ **CLEARED:** Real estate broker license NOT required (workflow software ≠ real estate services)
    - ✅ **CLEARED:** Fair Housing risk manageable (we don't make listing decisions)
- **Docs:**
  - [real-estate-office-workflow-expansion.md](../04-planning/mls-listing-automation/real-estate-office-workflow-expansion.md) (FULL PRODUCT HYPOTHESIS)
  - [real-estate-mls-listing-automation.md](../04-planning/mls-listing-automation/real-estate-mls-listing-automation.md) (original MLS auto-fill hypothesis)
  - [flexmls-api-research.md](../04-planning/mls-listing-automation/flexmls-api-research.md) (technical feasibility)
  - [real-estate-competitor-analysis.md](../04-planning/mls-listing-automation/real-estate-competitor-analysis.md) (MLS tool competitive landscape)

### Funeral Home AI Operations (Vertical SaaS)
- **Status:** Backburner / Exploratory.
- **Hypothesis:** AI-driven "ServiceTitan for Funeral Homes."
- **Wedge:** AI Obituary Assistant + Document/Permit Automation.
- **Landtrack Check:** Clear. Focus is on *internal* home workflow, not external scraping.
- **Docs:**
  - [initial-analysis.md](./funeral-tech/initial-analysis.md)

## Shelved / Rejected

### Residential Concrete Contractor Lead Generation
- **Status:** Killed 2026-04-18
- **Why:** Lead sourcing mechanism unclear. Running Google Ads = capital-heavy + slow. "Improving contractor intake" felt like support service, not core business. Did not meet "feasibility first" bar.
- **Learning:** Real real estate agents have money and defined workflows. Contractors are lower-intent buyers.

### Choreo (Couples Shared Life Management App)
- **Status:** Shelved as moonshot 2026-04-18
- **Why:** Beautiful product but built without customer demand validation. B2C couples app market is crowded (Tiimo, Pair, OurHome). High CAC, slow path to MRR. Revisit only after another business lands + generates revenue.
- **Learning:** "Product-first, customer-second" doesn't work. Validation before execution.
