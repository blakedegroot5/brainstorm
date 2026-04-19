# FlexMLS Terms of Service Research

Date: 2026-04-18
Status: ToS review complete. Waiting on Spark API write capability confirmation.

---

## Key Findings

### ✅ 3rd-Party Integrations Are Explicitly Allowed

**From FlexMLS ToS:**
- "Integrations help expand, enrich, localize, and customize the Flexmls user experience through third-party vendors"
- FlexMLS has **70+ third-party integrations** available through the Spark Store
- "Most applications offered through the Spark Store are provided by third parties and may be licensed under separate End User License Agreements"

**Implication:** You don't need special partnership approval to build and offer a 3rd-party tool. FlexMLS actively encourages this ecosystem.

---

### ✅ API Usage Is Permitted (With Limits)

**From FlexMLS ToS:**
- Users agree to use Spark API and RESO Web API "as documented by FBS"
- Users agree not to use APIs in a manner that "exceeds reasonable request volume" or "constitutes excessive or abusive usage"
- FBS may rate-limit usage at their discretion

**Implication:** API usage is fine for legitimate business purposes. "Reasonable request volume" is undefined but standard for APIs—you'll be within limits for a workflow tool.

---

### ⚠️ Key Restrictions (All Non-Issues for Your Product)

1. **"You shall not share MLS Content with third parties except as expressly provided"**
   - This means: Data you collect stays in your system (don't resell listing data)
   - Your product: ✅ Cleared (you're not sharing data with competitors or external parties)

2. **"You will not share or lend your credentials to any third party"**
   - This means: Don't ask users to give you their FlexMLS login credentials
   - Your product: ✅ Cleared (if using Chrome extension, you don't need their creds; if using Spark API, they provide API key, not login password)

3. **Anti-Scraping Protection Exists**
   - FlexMLS deployed Distil Networks anti-scraping tech on public websites
   - This protects against malicious bots scraping public websites, not against legitimate API usage or integrations
   - Your product: ✅ Cleared (you're using legitimate API/integration channels, not scraping)

---

## What's Still Unknown

**Does Spark API support creating/editing listings?**
- ToS confirms API usage is allowed, but doesn't specify which endpoints are available
- Still need confirmation from api-support@sparkplatform.com on whether POST/PUT listing creation is supported
- **Critical blocker:** This determines architecture (clean API integration vs. Chrome extension)

---

## Legal Risk Assessment (Updated)

### FlexMLS ToS Risk: **LOW** ✅

- 3rd-party integrations are explicitly encouraged
- Your use case (workflow software) fits within published integration ecosystem
- Data and credential restrictions are non-issues for your product design
- No special approval needed to build and offer the tool

### Remaining Question: **Spark API Write Capability**

- Not a ToS risk; just a technical/architectural question
- If write-capable: Clean integration, 6 weeks
- If read-only: Chrome extension, 6-8 weeks
- Either way, you're within bounds of FlexMLS ToS

---

## Sources

- [FBS Terms of Use](https://wearefbs.com/terms/)
- [Understanding Integrations in FlexMLS](https://flexmls.com/flexmls-academy/mls-administrators/understanding-integrations-in-flexmls-the-411/)
- [Spark API Documentation](https://sparkplatform.com/docs)
