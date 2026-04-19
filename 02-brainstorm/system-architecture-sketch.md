# System Architecture: Real Estate Office Workflow Platform

Date: 2026-04-18
Status: Design sketch for feasibility assessment

---

## High-Level System Overview

**Core concept:** Unified platform that sits between office admin, contractors (photographers, etc.), MLS system, and payment processor.

```
┌─────────────┐
│  Admin      │
│ (Office)    │
└──────┬──────┘
       │
       ├─→ Schedule photo shoot
       ├─→ View incoming photos/deliverables
       ├─→ Auto-fill & post to MLS
       └─→ Approve & pay invoices
       │
┌──────▼──────────────────────────────────────┐
│                                              │
│      LISTING WORKFLOW PLATFORM               │
│                                              │
│  ┌─────────────────────────────────────┐    │
│  │ Frontend (Web + Mobile)              │    │
│  │ - Listing manager UI                │    │
│  │ - Vendor scheduler                  │    │
│  │ - Photo reviewer                    │    │
│  │ - Invoice approver                  │    │
│  └────────────┬────────────────────────┘    │
│               │                              │
│  ┌────────────▼────────────────────────┐    │
│  │ Backend API                          │    │
│  │ - Listing management                │    │
│  │ - Vendor scheduling                 │    │
│  │ - Photo intake & storage            │    │
│  │ - MLS auto-fill orchestration       │    │
│  │ - Payment processing                │    │
│  └────────────┬────────────────────────┘    │
│               │                              │
│  ┌────────────▼────────────────────────┐    │
│  │ Database                             │    │
│  │ - Listings, vendors, photos         │    │
│  │ - Invoices, payments                │    │
│  │ - Audit log                         │    │
│  └──────────────────────────────────────┘    │
│                                              │
└──────────┬───────────────┬───────────────────┘
           │               │
           ▼               ▼
      ┌─────────┐    ┌──────────────┐
      │ Spark   │    │ Photographer │
      │ API     │    │ (Mobile App) │
      │ (FlexMLS)    │              │
      └─────────┘    └──────────────┘
           │               │
           │        ┌──────▼──────┐
           │        │ Google Drive │
           │        │ (or S3/etc)  │
           │        └──────────────┘
           │
      ┌────▼────────────────┐
      │ Payment Processor    │
      │ (Stripe/Square)      │
      └─────────────────────┘
```

---

## Core Data Models

### Listing
```
{
  id: UUID
  brokerage_id: UUID
  property_address: string
  listing_status: "scheduled" | "photo_pending" | "ready_to_post" | "posted" | "archived"

  // Property details
  beds: int
  baths: int
  sq_ft: int
  lot_size: string
  price: decimal
  description: string (auto-generated from AI)
  features: [string]

  // Workflow tracking
  photo_shoot_scheduled_date: datetime
  photos_received_date: datetime
  mls_posted_date: datetime

  // Photos
  photo_ids: [UUID] (references Photo objects)

  // Vendor/contractor assignments
  vendor_assignments: [VendorAssignment] (photographer, stager, inspector, etc.)

  // Created/updated timestamps
  created_at: datetime
  updated_at: datetime
}
```

### VendorAssignment
```
{
  id: UUID
  listing_id: UUID
  vendor_id: UUID
  vendor_type: "photographer" | "stager" | "inspector" | "other"
  scheduled_date: datetime
  status: "scheduled" | "completed" | "invoiced" | "paid"

  // Deliverables tracking
  deliverables_expected: [string] (e.g., "10 photos, drone video")
  deliverables_received: [Photo/Video object refs]
  deliverables_received_date: datetime

  // Payment
  invoice_id: UUID (references Invoice)
  amount: decimal

  created_at: datetime
}
```

### Photo
```
{
  id: UUID
  listing_id: UUID
  vendor_assignment_id: UUID

  // File info
  file_url: string (S3 or Google Drive)
  filename: string
  file_size: int (bytes)
  uploaded_at: datetime

  // Auto-classification (via AI/vision)
  room_type: string (detected by Restb.ai or similar) e.g., "master bedroom", "kitchen", "exterior"
  confidence: float (0-1)

  // Status in workflow
  review_status: "pending" | "approved" | "rejected"
  approved_by: UUID (admin user)
  approved_at: datetime

  // MLS metadata
  mls_field_assigned: string (e.g., "bedroom_1_photo", "listing_hero_image")

  created_at: datetime
}
```

### Invoice
```
{
  id: UUID
  vendor_id: UUID
  listing_id: UUID
  vendor_assignment_id: UUID

  amount: decimal
  description: string (e.g., "Drone photography for 123 Main St")

  status: "pending" | "approved" | "paid" | "failed"
  approved_by: UUID (admin)
  approved_at: datetime

  payment_method: "stripe" | "ach" | "bank_transfer"
  payment_id: string (reference to Stripe/payment processor)
  paid_at: datetime

  created_at: datetime
  sent_to_vendor_at: datetime (when invoice notification was sent)
}
```

---

## User Flows

### Flow 1: Admin Schedules Photo Shoot

```
Admin (Dashboard) → "Create New Listing"
  ↓
Enter property details:
  - Address (auto-lookup via Spark API for tax data/baseline info)
  - Beds, baths, sq ft, price (can be manual or auto-populated)
  - Notes
  ↓
"Schedule Photo Shoot" button
  ↓
Select photographer from vendor list (or create new)
  ↓
Pick date/time
  ↓
Send notification to photographer (email + in-app)
  ↓
System creates VendorAssignment record
  ↓
Status → "scheduled"
```

### Flow 2: Photographer Uploads Deliverables

```
Photographer (Mobile App or Web) → "View My Jobs"
  ↓
Sees scheduled shoot for "123 Main St"
  ↓
On shoot day: take photos with phone/drone
  ↓
"Upload Deliverables" button
  ↓
Select photos (from phone camera roll or cloud)
  ↓
Upload to platform (API stores in S3 or Google Drive)
  ↓
AI vision analysis runs automatically:
  - Detects room types (kitchen, bedroom, exterior, etc.)
  - Extracts property features from images (pool, fireplace, etc.)
  ↓
Photos appear in admin dashboard as "Pending Review"
  ↓
VendorAssignment status → "completed"
  ↓
Invoice auto-generated and sent to photographer for approval
```

### Flow 3: Admin Reviews & Auto-Fills MLS

```
Admin (Dashboard) → "Listings" → Sees "123 Main St - Photos Ready"
  ↓
Click listing → Photo Review Panel
  ↓
Approve photos one-by-one
  ↓
System auto-classifies photos:
  - Kitchen photo → "kitchen"
  - Master bedroom → "master_bed"
  - Exterior → "hero_image"
  ↓
Click "Auto-Fill MLS"
  ↓
Backend calls Spark API:
  - Property data (beds, baths, price, description) → Spark API POST
  - Photos → upload in correct order
  - AI-generated description → listing summary
  ↓
Spark API returns listing_id + preview
  ↓
Admin reviews preview in platform
  ↓
Click "Publish to MLS"
  ↓
Spark API finalizes posting
  ↓
MLS listing goes live
  ↓
Listing status → "posted"
```

### Flow 4: Admin Approves & Pays Invoice

```
Admin (Dashboard) → "Invoices"
  ↓
Sees: "Photography - 123 Main St - $500" (auto-generated from VendorAssignment)
  ↓
Review invoice details (date, amount, work completed)
  ↓
Click "Approve"
  ↓
Invoice status → "approved"
  ↓
Click "Pay Now"
  ↓
System prompts: "Pay via Stripe or ACH?"
  ↓
(If Stripe) → Redirects to Stripe checkout (card or bank)
  ↓
(If ACH) → Platform initiates ACH transfer
  ↓
Payment processor returns confirmation
  ↓
Invoice status → "paid"
  ↓
Notification sent to photographer: "Payment received"
  ↓
Listing workflow complete
```

---

## Integration Points

### 1. Spark API (FlexMLS)
**What:** Create/edit MLS listings programmatically

**Endpoints needed:**
- `POST /listings` — Create new listing
- `PUT /listings/{id}` — Update listing with photos/data
- `GET /listings/{id}` — Verify listing posted

**Data flow:**
- Admin enters property details in platform
- Platform calls Spark API with: address, beds, baths, price, description, photos
- Spark API returns listing_id + confirmation

**Status:** ❓ UNKNOWN — Does Spark API support write operations? (Waiting on api-support@sparkplatform.com)

### 2. Photo Storage (S3 or Google Drive API)
**What:** Store photos from contractors

**Flow:**
- Photographer uploads photos to platform (web/mobile)
- Platform stores in S3 bucket or Google Drive
- Photos accessible to admin for review
- Photos passed to Spark API when posting to MLS

**Why not just Google Drive?** Direct S3 gives us control + faster retrieval + easier integration with Spark API

**Status:** ✅ Known good (S3 + Google Drive API both standard)

### 3. Photo Analysis (Vision API)
**What:** Auto-classify photos by room type + extract features

**Options:**
- OpenAI Vision API (gpt-4-vision)
- Google Cloud Vision
- Restb.ai (already used by MLSs for this)

**Flow:**
- Photo uploaded → Vision API analyzes
- Returns: room_type, features detected, confidence score
- Platform stores classification in Photo record
- Admin can override if wrong

**Status:** ✅ Known good (all services available)

### 4. Payment Processing (Stripe)
**What:** Accept payment from admin, pay photographer

**Flow:**
- Invoice created in platform
- Admin clicks "Pay Now"
- Platform initiates Stripe charge (platform receives funds)
- Platform pays photographer via Stripe Connect or ACH transfer

**Status:** ✅ Known good (Stripe has all APIs needed)

### 5. Authentication & Authorization
**What:** Admin login, photographer login, brokerage management

**Tech:** OAuth 2.0 (Google/Microsoft) or email/password + 2FA

**Status:** ✅ Standard (Firebase, Auth0, or custom)

---

## Backend Tech Stack (Proposed)

| Layer | Tech | Rationale |
|-------|------|-----------|
| **Frontend** | React (web) + React Native (mobile) | Standard, fast iteration |
| **API** | Node.js + Express (or Python/FastAPI) | Fast prototyping, handles async uploads |
| **Database** | PostgreSQL | Relational data (listings, vendors, invoices) |
| **Photo Storage** | AWS S3 | Scalable, integrates with everything |
| **Vision/AI** | OpenAI Vision API | Simple integration, good accuracy |
| **Payment** | Stripe | Industry standard, PCI compliant |
| **MLS Integration** | Spark API (FlexMLS) | Direct MLS posting |
| **Auth** | Firebase or Auth0 | Don't reinvent wheel |
| **Hosting** | AWS (EC2/RDS) or Heroku | Managed, scalable |

---

## Critical Feasibility Assumptions

### Can we build this in 4-6 weeks?

**Optimistic path (6 weeks):**
1. **Week 1-2:** Backend API scaffolding + DB schema + auth
2. **Week 2-3:** Photo upload + storage + vision integration
3. **Week 3-4:** Vendor scheduling + listing management
4. **Week 4-5:** Spark API integration (assuming it supports writes)
5. **Week 5-6:** Payment integration + admin dashboard UI
6. **Week 6:** Testing, edge cases, launch prep

**Blockers:**
- **Spark API write capability** (CRITICAL) — If read-only, must use Chrome extension instead (different architecture, more complex)
- **Payment integration complexity** — If we need ACH + multiple payment methods, adds 1 week
- **Photo classification accuracy** — If vision API misclassifies, adds QA time

**Realistic assessment:** 6-8 weeks if everything aligns, 10-12 weeks if Spark API is read-only or payment integration is complex.

---

## Proposed MVP Scope (To Hit 4-6 Weeks)

**Core Product (Works for Both Solo Agents + Offices):**
- ✅ Unified input (dictation + typing + photos + documents)
- ✅ AI consolidation (extract property data from all inputs)
- ✅ MLS auto-fill via Spark API (if write-capable) OR Chrome extension (if read-only)
- ✅ AI description generation (leverage Writor-style model)
- ✅ Admin/agent dashboard to review + edit before posting

**Optional Layer (Offices Only) — Phase 1.5:**
- ✅ Vendor scheduling (photographer only, initially)
- ✅ Photo upload from photographer
- ✅ Auto-classification of photos
- ✅ Invoice generation + payment via Stripe

**What's NOT included (post-MVP):**
- ❌ Multiple vendor types (stager, inspector, etc.) — phase 2
- ❌ ACH payments — start with Stripe only
- ❌ Advanced analytics/reporting — phase 2
- ❌ Mobile app for photographers — start with web upload
- ❌ Google Calendar sync — phase 2
- ❌ Multi-brokerage support — phase 2

**Recommended Launch Strategy:**
1. **Week 1-3:** Build core (auto-fill + AI summarization) — works for solo agents
2. **Week 3-4:** Test with friend (solo agent) — validate core product
3. **Week 4-5:** Add vendor scheduling layer (for offices) — optional add-on
4. **Week 5-6:** Testing, polish, launch with both customer paths

---

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Spark API is read-only | HIGH | Use Chrome extension instead (different architecture, but still feasible) |
| Payment processing takes longer | MEDIUM | Use Stripe v1, add ACH later |
| Photo classification is inaccurate | MEDIUM | Admin can manually override; improve model after launch |
| Photographer adoption slow | MEDIUM | Start with one photographer (Blake), refine UX, expand |
| MLS data sync errors | HIGH | Comprehensive error handling + admin override + audit log |
| **LEGAL: Data privacy compliance** | **HIGH** | Must verify before launch (CCPA, state privacy laws, data retention) |
| **LEGAL: MLS ToS/licensing** | **HIGH** | Must verify FlexMLS permits 3rd-party integration + automation |
| **LEGAL: Real estate licensing** | **MEDIUM** | Determine if tool requires broker/agent license to operate |
| **LEGAL: Fair Housing compliance** | **MEDIUM** | Ensure tool cannot inadvertently enable discrimination |

---

## Next Validation Steps

1. **Spark API write capability** (2 days) — Critical blocker, determines architecture
2. **Admin workflow interview** (1 week) — Validate this solves the pain
3. **Payment integration research** (3 days) — Confirm Stripe is sufficient for v1
4. **Competitive verification** (3 days) — Confirm no one is solving this end-to-end

If all four validate positively, we have a buildable, defensible product.

---

## Why This Works

1. **Solves the admin's full workflow** — Schedule → Receive → Post → Pay (all in one place)
2. **Fragments the competition** — Photo tools, MLS tools, payment tools exist separately. We integrate.
3. **Defensible moat** — Direct MLS integration (via Spark API) is hard to copy quickly
4. **Clear ROI for admin** — Saves 20-30 minutes per listing × 3 listings/month = ~1.5 hours/month = clear value
5. **Clear monetization** — $100-200/mo per brokerage office (or $50/mo per solo agent)
6. **Buildable in 4-6 weeks** — If Spark API supports writes and we stay focused on MVP scope

---

## 4. UI/UX Strategy: The "Sidecar" Interface

To ensure maximum stability and agent control, the primary interface for MLS data entry will be a **Chrome Extension Sidecar**.

### **Primary: Chrome Side Panel API (The "Pinned Gutter")**
*   **The Experience:** A dedicated, native-feeling panel that slides out from the right side of the Chrome window.
*   **Why it wins:** 
    *   **Native Feel:** It resizes the FlexMLS website instead of covering it up, ensuring no buttons are hidden.
    *   **Persistence:** The panel stays open and "pinned" even as the agent navigates between different tabs or pages within FlexMLS (e.g., from "General Data" to "Media Upload").
    *   **Reliability:** It doesn't rely on complex CSS injection into the host page, making it much more resilient to FlexMLS UI updates.
*   **Key Feature:** "Progress Gamification"—A 0-100% completion bar that fills up as the agent clicks "Fill" buttons for each field.

### **Secondary Fallback: Injected "Floating Drawer"**
*   **The Experience:** A draggable, minimizable UI overlay that hovers over the FlexMLS page.
*   **Usage:** Only used if the agent's browser version doesn't support the Side Panel API or if a specific workflow requires an "overlay" style (e.g., a "magnifying glass" over a specific photo).
*   **Risk:** Can occasionally "cover up" legacy FlexMLS elements or require re-injection on page navigation.

### **The "Fill" Mechanism (Stability Priority)**
1.  **Gold Standard (API):** If Spark API supports writes, the Sidecar sends data directly to the server. The FlexMLS page just "refreshes" with the new data.
2.  **Silver Standard (One-Click Fill):** The Sidecar identifies the target field (e.g., `input#price`) and injects the value when the user clicks a "Fill" button in the Sidecar.
3.  **Bronze Standard (Smart Clipboard):** If the field is too complex for injection, the "Fill" button becomes a "Copy" button, and we auto-highlight the target field in FlexMLS so the user can just hit `Cmd+V`.

---

## 5. Media Pipeline: The "Wow" Factor

Market research confirms that **media management** (resizing, renaming, re-ordering) is the #1 source of "actual rage" for FlexMLS users.

### **Automated Processing Workflow**
*   **Ingestion:** RAW high-res files from the photographer (via the Collaboration Hook).
*   **AI Vision Layer:** Detects room types (Kitchen, Master, Exterior) and automatically assigns tags.
*   **Auto-Sequencing:** Orders photos in the "Marketing Sequence" (Exterior → Entry → Main Living → Kitchen → Master → Yard).
*   **MLS-Ready Export:** Auto-resizes all images to 3000x2000px / <15MB to meet FlexMLS limits, stripping unnecessary metadata and ensuring perfect landscape orientation.
*   **The "Magic" Button:** A single "Sync Media" button in the Sidecar that pushes the entire processed gallery into the FlexMLS "Photos" tab.
