# FlexMLS API Research — Can We Build It?

Date: 2026-04-18
Purpose: Determine technical feasibility of browser extension + MLS auto-fill integration for Michigan (FlexMLS region)

---

## What We Know About Spark API (FlexMLS's API)

**Official Documentation:**
- Spark API docs available at [sparkplatform.com/docs](https://sparkplatform.com/docs)
- Listings endpoint exists: [sparkplatform.com/docs/api_services/listings](https://sparkplatform.com/docs/api_services/listings)
- Developer registration is free; demo credentials available within 3 business days
- OAuth 2.0 + OpenID Connect authentication supported

**What Spark API Actually Does:**
- **Read operations:** Query MLS listings data, search, retrieve listing details
- **Unclear on write operations:** Documentation suggests Spark API may be primarily read-focused for listing data
- Quote from research: "data provided from this service is not fully supported by Spark API" — implies limitations on write/create operations

---

## Critical Unknown: Can Spark API Create/Edit Listings?

**What we need to know:**
- Does Spark API support POST/PUT to create or edit a listing in FlexMLS?
- If yes: what fields can be set programmatically?
- If no: we must fall back to browser extension DOM injection (fragile, more complex)

**How to find out:**
1. Contact api-support@sparkplatform.com directly
2. Register for developer account, get demo credentials, test endpoints
3. Check if `/listings` endpoint supports write operations (POST/PUT)

**Impact on product roadmap:**
- **If API supports write:** Clean integration, reliable, scalable. Build the extension to call Spark API directly.
- **If API is read-only:** Must use Chrome extension to inject into FlexMLS web form (DOM manipulation). More fragile, but still doable.

---

## Chrome Extension Feasibility (Known Good)

**Can we build a Chrome extension that auto-fills MLS forms?**

YES — multiple existing extensions prove this works:
- [QuickForm](https://www.getmagical.com/blog/best-autofill-chrome-extensions) handles complex web apps (React, Angular, Vue)
- [MockFill](https://www.mockfill.com/) works on localhost, staging, and production
- [Form Filler](https://chromewebstore.google.com/detail/form-filler/mgnbpcjhmedeihkkjgdahegokmpbggdn) detects AJAX/dynamic fields

**Scope of work:**
1. Parse agent input (dictation + photos + documents)
2. Extract structured data via AI
3. Inject values into FlexMLS form fields via JavaScript
4. Handle dynamic form behavior (field dependencies, validation)

**Timeline estimate:** 2-3 weeks for a solid extension

---

## AI Pipeline Feasibility (Known Good)

**Can we consolidate dictation + photos + documents into one unified listing?**

YES — this is becoming standard:

1. **Dictation → Text:** Speech-to-text APIs (OpenAI Whisper, Google Cloud Speech-to-Text)
2. **Photos → Structured Data:** Vision APIs (OpenAI Vision, Google Vision, or Restb.ai's computer vision)
3. **Document extraction:** OCR + text extraction (Pytesseract, or LLM-based)
4. **Consolidation:** LLM (Claude, GPT-4) to deduplicate, resolve conflicts, generate unified listing

**Scope of work:**
1. Build API endpoint that accepts: voice files + photos + documents
2. Process each input type
3. Consolidate into structured property object
4. Generate optimized listing copy
5. Return ready-to-fill data

**Timeline estimate:** 2-3 weeks for a basic pipeline

---

## Overall Feasibility Assessment

**Can this be built in 4-6 weeks?**

**Scenario A (API supports writes):**
- Spark API integration: 1 week
- Chrome extension: 2 weeks
- AI pipeline: 2 weeks
- Testing + polish: 1 week
- **Total: 6 weeks ✅ (feasible)**

**Scenario B (API is read-only, must use DOM injection):**
- Chrome extension with DOM injection: 2-3 weeks
- AI pipeline: 2 weeks
- Testing + polish: 1 week
- **Total: 5-6 weeks ✅ (feasible)**

**Key risks:**
- Spark API write operation support is unknown (must validate before committing)
- FlexMLS form structure may change (extension would need updates)
- Credential handling / agent login flow needs security audit

---

## Next Steps (Before Friend Call)

**High priority:**
1. Email api-support@sparkplatform.com: "Can Spark API create/edit listings via POST? What fields are supported?"
2. Register for developer account and get demo credentials
3. Read full Listings API documentation at sparkplatform.com

**This determines:**
- Whether we build Scenario A (API integration) or Scenario B (DOM injection)
- Which determines v1 complexity and timeline

**Timeline:**
- API research: 1-2 days (email response + light testing)
- Then proceed with friend discovery call

---

## Summary

| Factor | Status |
|--------|--------|
| Chrome extension feasibility | ✅ Known good (2-3 weeks) |
| AI consolidation feasibility | ✅ Known good (2-3 weeks) |
| Spark API write capability | ❓ Unknown (must research) |
| Build timeline (best case) | ✅ 4-6 weeks |
| Michigan-only scope | ✅ Simplifies (FlexMLS only) |

**Recommendation:** Research Spark API capabilities BEFORE friend call. If API supports writes, the product is clean and buildable. If not, we fall back to DOM injection (still buildable, but more fragile).
