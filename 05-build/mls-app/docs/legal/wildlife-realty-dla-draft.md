# Data License Agreement (DLA) - Draft for Wildlife Realty

**Effective Date:** April 19, 2026
**Between:**
1. **Wildlife Realty** ("Broker of Record")
2. **Landtrack / MLS App Project** ("Vendor")
3. **FlexMLS / Spark Platform** ("MLS Provider") - *Referenced*

---

## 1. Purpose
This agreement authorizes **Vendor** to access and process listing data on behalf of **Broker of Record** for the purpose of automating listing creation, media management, and data normalization within the FlexMLS ecosystem.

## 2. Scope of Access
- **API Access:** Broker of Record authorizes Vendor to use Broker's private API credentials (via Spark Platform) to perform the following actions:
    - Create "Incomplete" listings.
    - Update existing listing data (POST/PUT).
    - Upload and organize media assets (photos).
    - Retrieve tax and property records for auto-fill.
- **Data Usage:** Vendor shall only use the data for the benefit of Broker of Record and its affiliated agents.

## 3. Responsibilities
- **Broker of Record:**
    - Provides necessary authorization signatures for Spark Platform "Private Role" access.
    - Maintains active membership in good standing with the local MLS.
    - Reviews and approves all "Incomplete" listings before they are set to "Active" status.
- **Vendor:**
    - Maintains secure handling of API credentials.
    - Ensures all automated data entry complies with MLS Rules and Regulations.
    - Provides an audit trail for all programmatically created or modified records.

## 4. Compliance & Security
- **MLS Rules:** Both parties agree to abide by the FlexMLS/Spark Platform Terms of Service and local MLS Rules.
- **Data Privacy:** Vendor will encrypt all sensitive data at rest and in transit. No data will be shared with third parties without explicit consent.
- **Audit:** All "Write" operations performed via the API will be logged with the timestamp and the identity of the initiating agent.

## 5. Term and Termination
This agreement remains in effect as long as Vendor provides services to Broker of Record. Either party may terminate with 30 days' written notice.

---

**Signatures:**

**For Wildlife Realty (Broker of Record):**
Name: __________________________
Title: Broker of Record
Date: ___________________________

**For Vendor:**
Name: __________________________
Title: Lead Developer / Project Lead
Date: ___________________________
