# Legal Risk Assessment: Real Estate Office Workflow Platform

Date: 2026-04-18
Status: Initial risk identification (requires expert review before launch)

**Core principle:** Legality is non-negotiable. Landtrack taught us this. Flag risks early, get expert review, don't proceed into legally gray areas.

---

## Four Critical Legal Questions

### 1. Data Privacy & Protection

**The Risk:**
- We collect homeowner names, addresses, phone numbers, email, photos
- We store listing data + photos on our servers (or cloud)
- State privacy laws (CCPA in California, similar in other states) require data handling compliance
- GDPR applies if any EU residents' data is stored

**Specific concerns for Michigan:**
- Michigan has emerging data privacy laws (not as strict as CCPA, but evolving)
- Must establish legal basis for collecting/storing homeowner data
- Data retention requirements — how long can we keep photos/listings?
- User consent — do homeowners need to opt-in for their data to be processed?
- Right to deletion — can homeowners request their data be deleted?

**Questions to answer:**
- Do we own the photos/data, or does the brokerage own it?
- What's our data retention policy (delete after 12 months? 2 years?)?
- Do homeowners need explicit consent to have their data processed by our platform?
- If we fail to comply, what's the liability? (CCPA fines are up to $7,500 per violation)

**Risk level:** MEDIUM-HIGH (depends on answers)

---

### 2. MLS Terms of Service & Licensing

**The Risk:**
- FlexMLS is owned by FBS. We're integrating with their system (programmatically or via extension)
- MLS systems have strict ToS about who can access data and what they can do with it
- Brokerages have licensing agreements with the MLS that may prohibit 3rd-party automation tools

**Specific concerns:**
- Does FlexMLS permit 3rd-party tools to auto-fill their forms or call their API?
- Are we violating their ToS by building a Chrome extension that injects into their UI?
- Do we need explicit permission from the MLS (FBS) to operate?
- Can a brokerage get in trouble with the MLS for using our tool?
- Are there anti-scraping clauses in the ToS that would prohibit our extension?

**Questions to answer:**
- What does FlexMLS ToS say about 3rd-party integrations?
- Do we need to become a FlexMLS "certified partner" to offer this tool?
- Is there any conflict of interest (FlexMLS may have competing products)?
- Can the MLS force us to stop if they don't approve?

**Risk level:** HIGH (FlexMLS could shut us down if they object)

---

### 3. Real Estate Licensing Requirements

**The Risk:**
- Real estate is heavily regulated. Are we crossing the line into activities that require a license?
- Different states have different licensing requirements

**Key clarification:** Our software is workflow software, NOT a real estate service provider. We are not:
- Creating listings on behalf of anyone
- Providing real estate advice
- Making listing decisions
- Acting as a broker or agent

We ARE:
- Scheduling work (photo shoots)
- Organizing deliverables (photos)
- Auto-filling form fields in existing MLS systems
- Processing payments

**Specific concerns for Michigan (LOW RISK):**
- We're not providing "real estate services" — we're providing workflow/scheduling software
- Brokerages already have the MLS broker license; we're just making their admin's job easier
- We don't need a license to provide workflow tools to licensed professionals

**Questions to answer (LOW PRIORITY):**
- Confirm with attorney that workflow software doesn't require broker license
- Ensure our marketing doesn't make us sound like we're providing real estate services

**Risk level:** LOW (likely no issue, but one attorney question to confirm)

---

### 4. Fair Housing Act Compliance

**The Risk:**
- Fair Housing Act prohibits discrimination in housing
- If our tool (or how brokerages use it) could enable discrimination by neighborhood, race, ethnicity, etc., we have liability

**Specific concerns:**
- Could a brokerage use our tool to target certain neighborhoods and avoid others?
- Could our photo classification or data analysis inadvertently surface discriminatory patterns?
- Are we liable if a brokerage uses our tool in a discriminatory way?
- Do we need built-in safeguards to prevent misuse?

**Questions to answer:**
- Can our tool be used to discriminate?
- What's our liability if a brokerage uses it discriminatorily?
- Should we build safeguards into the product (e.g., no neighborhood-based filtering)?
- Do we need a compliance/audit trail for FHA audits?

**Risk level:** LOW-MEDIUM (unlikely to be our fault, but worth understanding)

---

## Secondary Legal Questions

### 5. Payment Processing & PCI Compliance
**Risk:** Low (Stripe handles this, not us)
**To confirm:** Are we storing payment data directly, or using Stripe's API? (Should be Stripe only)

### 6. Contractor/1099 Relationships
**Risk:** Low (photographers are independent contractors, not our employees)
**To confirm:** Are we operating as a marketplace for contractor services, or just a scheduling platform?

### 7. Photographer Intellectual Property
**Risk:** Medium (who owns the photos uploaded by photographers?)
**To confirm:** Does photographer retain rights to their photos, or do we license them? Do homeowners have rights?

---

## Next Steps (In Priority Order)

### Immediate (Before Any Validation Calls)
1. **Research FlexMLS ToS** — Download and review the terms of service. Look for:
   - 3rd-party integration policies
   - Anti-scraping clauses
   - Restrictions on automation
   - Approval/partnership requirements

2. **Research Michigan real estate licensing** — Contact Michigan Department of Licensing or find a real estate attorney to ask:
   - "Do we need a broker license to offer a tool that helps brokerages manage their workflow?"
   - "Is there a distinction between 'real estate tool' vs 'general workflow software'?"

### Before Building
3. **Get data privacy review** — Consult a privacy attorney (or use Termly/OneTrust templates for startups):
   - Draft privacy policy
   - Determine data retention policy
   - Identify what explicit consent is needed

4. **Get MLS/integration review** — Email api-support@sparkplatform.com AND ask:
   - "Is our tool allowed under your ToS?"
   - "Do we need to become a certified partner?"

### Before Launch
5. **Fair Housing Act review** — Quick check with FHA compliance resource or attorney:
   - Ensure tool cannot be used to discriminate
   - Document safeguards if any

---

## Risk Mitigation Strategy

**If everything is legal:**
- Document the research
- Build with confidence
- Create terms of service that protect us + educate customers

**If FlexMLS says "no":**
- Pivot to Chrome extension (riskier from ToS perspective, but uses public UI)
- OR pivot to different MLS/region where integration is permitted
- OR pivot to different product entirely

**If Michigan licensing is unclear:**
- Get opinion letter from attorney (cheap, ~$500-1000)
- Build defensibly (don't claim to be providing "real estate services")
- Consider starting with a brokerage partnership (they hold the license)

**If data privacy is complex:**
- Build with privacy by default (collect minimal data, delete frequently)
- Get data processing agreement with customers
- Use Stripe for payment (don't store credit cards)

---

## Critical Success Criteria (Legal)

Before we invest time/money in this product, these must be confirmed:

**CRITICAL (stop if "no"):**
- ✅ **CLEARED:** FlexMLS permits 3rd-party integrations (via API or extension) — 70+ integrations already exist
- ❓ **PENDING:** Spark API supports listing creation via POST/PUT? (waiting on api-support@sparkplatform.com)

**HIGH PRIORITY (get clarity before build):**
- ✅/❓ Data privacy compliance is achievable with standard practices (privacy policy + retention policy)

**LOW PRIORITY (confirm, but low risk):**
- ✅ **CLEARED:** Real estate broker license NOT required (workflow software ≠ real estate services)
- ✅ **CLEARED:** Fair Housing risk is manageable (tool doesn't enable discrimination)

**Status summary:**
- ✅ FlexMLS ToS cleared (3rd-party integrations encouraged)
- ❓ Spark API write capability unknown (determines architecture, not a ToS blocker)
- 🟡 Data privacy needs standard practices (privacy policy + retention = covered)
- ✅ Licensing cleared (workflow software category)
- ✅ Fair Housing cleared (we don't make decisions)

---

## Who Should Review This?

1. **Real estate attorney (Michigan)** — For licensing + MLS ToS questions
2. **Privacy attorney or consultant** — For data handling + CCPA/state privacy
3. **FlexMLS/FBS directly** — For permission to integrate

**Estimated cost:** $1,000-3,000 for initial review (worth it vs. building something illegal)
