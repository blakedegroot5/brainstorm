# MLS App MVP Build Ticket Plan (Week-by-Week)

Date: 2026-04-19
Scope: Michigan + FlexMLS v1
Goal: Ship a testable MVP that stages and autofills top FlexMLS listing fields with human review.

## Delivery rules
- No coding on optional expansion until core autofill loop works.
- Human final review required before MLS submit.
- Every completed ticket must include a short demo note + test evidence.

## Week 0: De-risk blockers (3-5 days)

### T0-1 Dual-Path Setup
- Outcome: Confirmed path for both "API-Official" (Wildlife Realty) and "Extension-Universal" (Fallback).
- Tasks:
  - Register for Spark dev credentials (sandbox).
  - Draft the "Wildlife Realty" DLA for signature.
  - Setup Manifest V3 scaffold for the universal injector.
- Acceptance:
  - Spark sandbox access active.
  - Extension scaffold rendering on FlexMLS domain.

### T0-2 FlexMLS field inventory (top 30-50)
- Outcome: prioritized field map for MVP.
- Tasks:
  - capture real FlexMLS create-listing form fields.
  - categorize fields: API-writable vs. UI-only.
- Acceptance:
  - field map file checked in with "Write Method" column (API vs DOM).

### T0-3 Cost & Token Guardrails
- Outcome: Strict budget controls for LLM/Vision APIs.
- Tasks:
  - Define "One-Pass" AI extraction strategy (minimize repeat calls).
  - Implement image thumbnailing *before* sending to Vision API (save tokens).
  - Set hard monthly spend alerts on OpenAI/Anthropic.
- Acceptance:
  - Budget monitoring dashboard defined.
  - Token-efficient prompt templates drafted.

## Week 1: Core backend + data model

### T1-1 Project skeleton + environments
- Outcome: runnable app + API + DB migrations.
- Acceptance:
  - local/dev environment documented
  - baseline CI checks run

### T1-2 Core schema + migrations
- Outcome: listings, versions, media, field mappings, fill attempts, audit events.
- Acceptance:
  - migrations applied successfully
  - seed data for one sample listing

### T1-3 Auth + org model (minimal)
- Outcome: secure user/org boundaries.
- Acceptance:
  - protected API routes
  - org-scoped listing access

### T1-4 Listing CRUD + versioning API
- Outcome: create/edit listing package with immutable versions.
- Acceptance:
  - CRUD endpoints tested
  - version increment on approved changes

## Week 2: Intake and AI normalization pipeline

### T2-1 Input ingestion endpoints
- Outcome: accept text, docs, photos, optional voice files.
- Acceptance:
  - upload + metadata persistence works

### T2-2 Worker queue + async jobs
- Outcome: background processing for extraction/normalization.
- Acceptance:
  - queue retries + dead-letter behavior defined

### T2-3 Normalized listing package builder
- Outcome: unified property object with confidence flags.
- Acceptance:
  - package produced from mixed inputs
  - confidence + source attribution present

### T2-4 Web review UI for normalized package
- Outcome: user can review/edit before fill.
- Acceptance:
  - edits persist and create new listing version

## Week 3: Sidecar and fill engine (The Hybrid Engine)

### T3-1 Extension Sidecar (The "Universal" UI)
- Outcome: Authenticated sidecar that works for EVERY agent.
- Tasks:
  - Implement Sidecar UI (React/Side Panel API).
  - Display listing data ready for injection.
- Acceptance:
  - Sidecar loads listing package for active agent regardless of brokerage.

### T3-2 DOM Injection Fallback (The "No-Red-Tape" Path)
- Outcome: Ability to fill forms without API permissions.
- Tasks:
  - Build robust CSS/Xpath selectors for top 30 fields.
  - Implement "Auto-Fill" button that maps local DOM to listing package.
- Acceptance:
  - Extension successfully fills form fields on a standard FlexMLS page.

### T3-3 API Integration (The "Stable" Path)
- Outcome: Official API write-back for authorized brokerages.
- Tasks:
  - Implement Spark API `POST /listings` for authorized users.
  - Handle "Incomplete" listing state creation.
- Acceptance:
  - Listing created in FlexMLS backend via API.

### T3-4 Unified Fill Orchestrator
- Outcome: Logic to decide between API vs Extension fill.
- Acceptance:
  - System attempts API fill for authorized listings; falls back to Extension UI-fill for others.

## Week 4: Reliability, QA, and security hardening

### T4-1 Mapping resilience checks
- Outcome: guardrails for selector drift / field mismatch.
- Acceptance:
  - mapping validation test suite for top fields

### T4-2 Audit trail completeness
- Outcome: traceability for generated/fill operations.
- Acceptance:
  - every fill action tied to listing version + actor + timestamp

### T4-3 Security hardening pass
- Outcome: basic production-safe controls.
- Tasks:
  - secret handling
  - PII log redaction
  - access boundary tests
- Acceptance:
  - security checklist complete

### T4-4 Basic observability
- Outcome: operational visibility.
- Acceptance:
  - dashboard for fill success rate, unmapped rate, job failures
  - alert thresholds documented

## Week 5: Pilot readiness (Wildlife Realty Focus)

### T5-1 Pilot onboarding (Blake's Workflow)
- Outcome: Seamless "Incomplete" listing staging for Wildlife Realty.
- Acceptance:
  - App successfully creates/fills "Incomplete" listing in Blake's account.

### T5-2 UAT with JPEG Media Loop
- Outcome: Verify resizing/ordering for high-res JPEGs.
- Acceptance:
  - 50+ JPEGs processed and synced to FlexMLS in < 60 seconds.

### T5-3 Go/No-Go gate
- Outcome: explicit decision to pilot or extend hardening.
- Acceptance:
  - go/no-go logged with rationale

## Post-MVP Backlog (Phase 2+)
- **Stripe Connect Payouts:** Deferred until user volume justifies KYC complexity.
- **Advanced Payment Splitting:** Vendor-to-Broker automated invoices.
- **RAW Photo Processing:** Only if demanded; stick to JPEG-optimized for now.

## Definition of MVP done
- Top 30-50 FlexMLS fields mapped and usable.
- End-to-end listing package -> staged sidecar fill works.
- "Incomplete" (Draft) status is the target for all automated fills.
- Fill success KPI meets threshold on pilot scenarios.
- Audit logs and error handling are operational.
