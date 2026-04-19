# MLS App MVP Build Ticket Plan (Week-by-Week)

Date: 2026-04-19
Scope: Michigan + FlexMLS v1
Goal: Ship a testable MVP that stages and autofills top FlexMLS listing fields with human review.

## Delivery rules
- No coding on optional expansion until core autofill loop works.
- Human final review required before MLS submit.
- Every completed ticket must include a short demo note + test evidence.

## Week 0: De-risk blockers (3-5 days)

### T0-1 Spark write capability test
- Outcome: confirmed mode (Mode A API-write vs Mode B UI-fill fallback).
- Tasks:
  - verify Spark dev credentials
  - test listing create/edit capabilities for required fields
  - document field-level write support matrix
- Acceptance:
  - decision logged with evidence and endpoint results
  - architecture mode locked for MVP

### T0-2 FlexMLS field inventory (top 30-50)
- Outcome: prioritized field map for MVP.
- Tasks:
  - capture real FlexMLS create-listing form fields
  - categorize fields: required, common, edge-case
  - define normalized schema keys
- Acceptance:
  - field map file checked in
  - top 30-50 fields approved for v1

### T0-3 Success metrics + failure thresholds
- Outcome: measurable MVP goals.
- Tasks:
  - define fill success KPI (for mapped fields)
  - define acceptable failure/unmapped thresholds
  - define time-to-fill target
- Acceptance:
  - KPI table added to planning docs

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

## Week 3: Sidecar and fill engine

### T3-1 Extension scaffold (Manifest V3)
- Outcome: authenticated sidecar connected to API.
- Acceptance:
  - sidecar loads listing package for active user

### T3-2 Field mapping engine
- Outcome: normalized keys -> FlexMLS targets.
- Acceptance:
  - mapped fields rendered with status (ready/missing/unmapped)

### T3-3 Staged fill actions by section
- Outcome: user-triggered fills for grouped sections.
- Acceptance:
  - fill actions logged
  - no silent full-submit behavior

### T3-4 Fill attempt logging + error surfacing
- Outcome: deterministic debug and support path.
- Acceptance:
  - failed fields surfaced with reason + retry path

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

## Week 5: Pilot readiness

### T5-1 Pilot onboarding flow (internal)
- Outcome: quick setup for first test users.
- Acceptance:
  - onboarding checklist and support playbook created

### T5-2 UAT with 2-3 real listing scenarios
- Outcome: validate end-to-end flow on realistic data.
- Acceptance:
  - pass criteria met on agreed KPI thresholds
  - defects triaged and patched

### T5-3 Go/No-Go gate
- Outcome: explicit decision to pilot or extend hardening.
- Acceptance:
  - go/no-go logged with rationale

## Optional post-MVP backlog (only after pilot signal)
- Photographer upload flow enhancements.
- Invoice/payment integration.
- Broader browser support hardening.
- Expanded field coverage beyond top 50.

## Definition of MVP done
- Top 30-50 FlexMLS fields mapped and usable.
- End-to-end listing package -> staged sidecar fill works.
- Human final review before submit is enforced.
- Fill success KPI meets threshold on pilot scenarios.
- Audit logs and error handling are operational.
