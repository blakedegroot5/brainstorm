# Real Estate Office Workflow Expansion — Vendor Scheduling + MLS Integration

Date: 2026-04-18
Status: Early discovery brainstorm (mid-planning)

---

## Blake's Direct Insight: The Admin Workflow

Blake has been doing drone photography for a realtor for several years. **Critical insight: The realtor owner is NOT Blake's contact. The office admin/secretary is.**

The admin's responsibilities:
- Scheduling photo shoots and vendor coordination (with Blake and other contractors)
- Posting listings to MLS
- Receiving and paying invoices (via Huntington bank bill pay)

**Key implication:** Blake has direct visibility into the office admin's actual workflow. This is not theoretical pain—Blake observes it every time they deliver drone photos.

---

## The Admin's Current Workflow (As Observed)

**Frequency:** ~3 listings/month, more in warmer months

**Current steps:**
1. Admin schedules photo shoot (with Blake)
2. Blake delivers photos to Google Drive
3. Admin downloads photos from Google Drive to local computer
4. Admin uploads photos to local storage/organizes
5. Admin manually enters listing data into MLS (beds, baths, price, description, features, etc.)
6. Admin uploads photos to MLS posting
7. Admin receives invoice from Blake (and other contractors)
8. Admin pays invoices manually via Huntington bank bill pay

**Two core pain points identified:**
1. **PARAMOUNT:** Manual listing data entry (beds, baths, price, description) — tedious, time-consuming, error-prone
2. **SIGNIFICANT:** Vendor scheduling and coordination — annoying and tedious to schedule photographers, track deliverables, manage multiple contractors

---

## Product Hypothesis: Modular Listing System (Core + Optional)

**Core (for all users):** MLS auto-fill + AI summarization
**Optional (for offices/teams):** Vendor scheduling + invoice management

### Two Customer Segments:

**Segment A: Solo Agents / Small Brokers**
- Pain: Manual MLS data entry + writing descriptions
- Solution: Auto-fill + AI summarization (quick, easy)
- Pricing: $30-50/mo
- MVP-friendly: Just the auto-fill + AI, no vendor scheduling

**Segment B: Real Estate Office Admins / Brokerages**
- Pain: All of above PLUS vendor scheduling (photos, contractors)
- Solution: Full workflow (schedule → collect → fill → pay)
- Pricing: $100-200+/mo
- Builds on core product (auto-fill + AI) with added vendor layer

### Core Product (Auto-Fill + Summarization)

1. **Unified Input:** Agent/admin provides property data via:
   - Voice dictation (record property details)
   - Text typing (enter manually)
   - Photo upload (extract property features via vision AI)
   - Document paste (existing listings, property notes)

2. **AI Consolidation:** System consolidates all inputs → extracts structured property data

3. **MLS Auto-Fill:** Chrome extension or Spark API fills FlexMLS form fields automatically

4. **Description Generation:** AI generates compelling listing description (leveraging same model as Writor)

### Optional Layer (Vendor Scheduling) — Office Add-On

1. **Vendor Scheduling:** Schedule photo shoots, inspections, staging
2. **Photo Intake:** Contractors upload deliverables directly
3. **Photo Organization:** Auto-classify by room type
4. **Invoice Management:** Track and pay vendors in-system

### Why This Matters

- **Simpler MVP:** Launch with just core (auto-fill + AI) → faster, easier validation
- **Broader market:** Sell to solo agents first (easier GTM), then expand to offices (higher LTV)
- **Flexible positioning:** "Just need descriptions?" vs. "Need full listing workflow?"
- **Clear upgrade path:** Solo agents can upgrade to office features later

---

## Competitive Landscape: The Fragmentation Opportunity

### What exists (separately):

**Photo/Vendor Scheduling Tools:**
- [HDPhotoHub](https://hdphotohub.com/) — Schedule shoots, accept payments (Stripe/Square)
- [Tonomo](https://www.tonomo.io/) — Photographer booking + project management
- [Rela](https://www.relahq.com/photographers/storefront) — Booking calendar + media delivery
- [Aryeo](https://www.aryeo.com/) — Custom booking + pre-shoot info + media delivery
- [Spiro](https://spiro.media/) — Payment workflows for photos

**MLS/Listing Tools:**
- [Rechat](https://rechat.ai/) — Full OS (CRM + marketing + transactions). NO vendor scheduling.
- [Cotality/MLS-Touch](https://www.cotality.com/products/mls-touch) — MLS posting + AI. Separate "Contractor Workspace" product (not integrated).
- [Writor](https://writor.ai/) — Description generation only.

### The Gap: NOBODY integrates vendor scheduling + MLS posting + payment

**Current reality for admins:**
- Use Tonomo (or similar) to schedule photographers
- Export photos from Tonomo
- Log into MLS separately
- Manually upload photos + type data
- Receive invoice from Tonomo/photographer
- Pay separately via bank/Stripe

**Our opportunity:**
- One system handles entire workflow: schedule → receive → post → pay
- No context-switching between tools
- Reduces time per listing by ~40-50% (estimate: from ~45 min to ~20 min for admin)

---

## Critical Success Factors

### 1. Feasibility
- Can we build vendor scheduling + MLS integration in 4-6 weeks? (UNKNOWN — requires more research)
- Can we integrate with Spark API for MLS auto-fill? (Pending: api-support@sparkplatform.com response)
- Payment integration (Stripe/Square/bank API)? (Likely doable)

### 2. Validation
- Does the admin actually want this integrated, or does she prefer separate tools?
- What's her WTP? ($50-100/mo? $200+/mo for full team?)
- Will the realtor owner (who pays) approve the cost?

### 3. Competition
**CRITICAL:** This is not just about feasibility + validation. We must verify:
- No existing vendor scheduling tool integrates with MLS
- No existing MLS tool integrates with vendor scheduling
- No startup is solving this full workflow

**If this gap exists (and it appears to), we have a real wedge. If someone is already building this, we pivot.**

---

## Next Steps

### 1. Technical Feasibility & MVP Stop-Gaps
- [ ] **Stripe Connect Research:** Investigate "Stripe Connect Express" or "Standard" for Platform-to-Vendor payments. Focus on KYC friction for photographers and ease of 1099 tracking.
- [ ] **AI Vision POC:** Test GPT-4o-vision/Restb.ai on a sample set of property photos to verify room detection and auto-sequencing accuracy (Exterior → Kitchen → Master).
- [ ] **FlexMLS Field Mapping:** Map the top 30-50 most common residential listing fields in FlexMLS to prioritize Sidecar "Fill" buttons.

### 2. Discovery & Validation
- [ ] **Solo Agent Call:** Run discovery with friend using the updated [Friend Discovery Call Guide](../../03-discovery/mls-app/friend-discovery-call-guide.md).
- [x] **Admin Interview Guide:** Use [admin-discovery-call-guide.md](../../03-discovery/mls-app/admin-discovery-call-guide.md) for office-admin workflow discovery (vendor scheduling, payments, and handoff bottlenecks).
- [ ] **Spark API Confirmation:** Await response from api-support@sparkplatform.com regarding write capabilities.

### 3. Architecture & Security
- [ ] **Auth Strategy:** Design the session-syncing mechanism between the Web App (Stripe subscription) and the Chrome Sidecar to ensure only paying users have "Fill" capabilities.

---

## Key Documents Referenced

- [flexmls-api-research.md](./flexmls-api-research.md) — FlexMLS API write capability research
- [technical-architecture-writeup.md](./technical-architecture-writeup.md) — implementation-oriented architecture spec
- [real-estate-mls-app.md](./real-estate-mls-app.md) — Original MLS auto-fill hypothesis
- [real-estate-competitor-analysis.md](./real-estate-competitor-analysis.md) — MLS tool competitive landscape
- [agent-analysis-and-feedback.md](./agent-analysis-and-feedback.md) — SWOT and strategic refinements
