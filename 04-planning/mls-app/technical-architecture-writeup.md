# MLS App Technical Architecture (Michigan FlexMLS v1)

Date: 2026-04-19
Status: Implementation-oriented architecture write-up (pre-build)

## 1) Scope and assumptions

### Product scope (v1)
- Geography: Michigan only.
- MLS focus: FlexMLS ecosystem.
- Primary user: agent/admin creating listings.
- Core value: reduce MLS prep/entry time and errors.

### In-scope capabilities (v1)
- Listing workspace (property details + media + generated copy).
- AI-assisted data consolidation (text/voice/docs/photos).
- FlexMLS sidecar autofill workflow with human final review.
- Basic collaboration handoff (agent/admin + optional photographer upload link).

### Out of scope (v1)
- Full transaction management.
- Deep accounting suite.
- Multi-MLS support.

### Critical unresolved dependency
- Spark API write capability is still unconfirmed.
- Architecture supports two execution modes:
  - Mode A: API-assisted write (preferred if available).
  - Mode B: browser-side staged autofill (fallback).

## 2) System overview

### Client surfaces
- Web App (React/Next.js):
  - listing intake/editing
  - media review/ordering
  - AI suggestions + correction UI
  - workflow status
- Browser Extension Sidecar (Chrome first):
  - maps normalized listing data to FlexMLS form fields
  - staged fill actions (never silent submit)
  - per-field confidence indicators and required-field checks

### Backend services
- API service (TypeScript/Node):
  - auth/session
  - listing CRUD
  - media metadata + upload orchestration
  - AI orchestration
  - field mapping service
  - audit/event logging
- Worker service (async jobs):
  - transcription
  - document parse/OCR
  - image classification/ordering suggestions
  - description generation/re-generation

### Data and storage
- Postgres: core relational data.
- Object storage (S3-compatible): media/files.
- Redis (optional): queue/cache/session acceleration.

### External integrations
- FlexMLS/Spark API (if write endpoints supported for required actions).
- LLM + speech/vision APIs.
- Optional payments (deferred unless validated in discovery).

## 3) Logical architecture and boundaries

1. UI Layer
- Web app and extension sidecar are separate clients.
- Sidecar receives only normalized listing payload + field map + auth token.

2. Domain/API Layer
- Listing domain: property core data + lifecycle status.
- Media domain: assets, ordering, compliance tags.
- MLS mapping domain: normalized schema -> FlexMLS field schema.

3. Integration Layer
- Spark adapter (Mode A).
- DOM automation adapter (Mode B).
- AI adapter abstraction so providers can be swapped.

4. Data Layer
- Strong audit trail for any generated or auto-filled value.
- Versioned listing snapshots before each fill action.

## 4) Core data model (v1)

### Entities
- User
- Organization (team/brokerage)
- Listing
- ListingVersion
- MediaAsset
- WorkflowStep
- FieldMapping
- FillAttempt
- AuditEvent

### Minimal listing states
- draft
- media_ready
- ready_to_fill
- filled_pending_review
- submitted (user confirmed)

### Key tables (practical minimum)
- listings(id, org_id, address, status, source_data_json, normalized_data_json, created_at, updated_at)
- listing_versions(id, listing_id, version_no, normalized_data_json, created_by, created_at)
- media_assets(id, listing_id, storage_url, media_type, metadata_json, sort_order, created_at)
- field_mappings(id, mls_system, listing_field_key, mls_field_selector_or_id, transform_rule_json, active)
- fill_attempts(id, listing_id, mode, result, errors_json, started_at, finished_at)
- audit_events(id, actor_id, listing_id, event_type, payload_json, created_at)

## 5) Main request flows

### Flow A: Build listing package
1. User creates listing in web app.
2. User adds inputs (typed notes, voice note, docs, photos).
3. Worker jobs extract/normalize data.
4. API returns a reviewable normalized listing package.
5. User edits and approves package.

### Flow B: Stage MLS autofill
1. User opens FlexMLS listing screen + sidecar.
2. Sidecar requests latest approved listing package.
3. Sidecar runs required-field and confidence checks.
4. User triggers staged fill by section (never all-at-once blind submit).
5. System logs each fill action and unresolved fields.
6. User reviews in FlexMLS and submits manually.

### Flow C: Refill after edits
1. User updates listing package in web app.
2. New listing version is created.
3. Sidecar re-fills only changed fields.

## 6) Mode A vs Mode B execution

### Mode A (Spark write available)
- API writes supported listing fields through Spark.
- Sidecar remains useful for visibility, field diffs, and validation checks.
- Fallback to UI-fill for unsupported fields.

### Mode B (Spark write unavailable/limited)
- Sidecar performs deterministic field fill in FlexMLS UI.
- Robust selector strategy + mapping versioning required.
- More monitoring needed for UI drift/breakage.

## 7) Security, compliance, and trust controls

- OAuth/session-based auth; no credential sharing between users.
- Encrypt data at rest and in transit.
- Least-privilege API keys for external providers.
- Redact sensitive data in logs by default.
- Full audit trail for generated text and fill operations.
- Human-in-the-loop final submission to reduce compliance risk.

## 8) Reliability and observability

### Operational telemetry
- Fill success rate by form section.
- Unmapped/failed field counts.
- Median time from draft -> ready_to_fill.
- AI extraction confidence distribution.

### Alerts
- Spike in fill failures after FlexMLS UI change.
- Job queue backlog thresholds.
- External API latency/error thresholds.

## 9) Suggested implementation stack

- Frontend: Next.js + TypeScript + React Query.
- Extension: Manifest V3 + TypeScript.
- Backend: Node.js (NestJS or Fastify).
- DB: Postgres.
- Queue: BullMQ (Redis).
- Storage: S3-compatible bucket.
- Hosting: single cloud provider with managed Postgres + object storage.

## 10) Phased build plan (technical)

### Phase 0: De-risk blockers (3-5 days)
- Confirm Spark write capability with test account.
- Build first-pass FlexMLS field map for top 30-50 fields.
- Define minimum confidence and review rules.

### Phase 1: Core listing package + sidecar (2-3 weeks)
- Listing CRUD + versioning.
- Input ingestion + AI normalization.
- Sidecar staged fill for top sections.
- Audit logging and error reporting.

### Phase 2: Hardening (1-2 weeks)
- Mapping maintenance tooling.
- Retry and resilience paths.
- Metrics dashboard + alerting.

### Phase 3: Optional workflow expansion (post-validation)
- Photographer upload workflow improvements.
- Payment/invoice integration only if validated in discovery.

## 11) Open technical decisions

1. Spark write support breadth (field-level, media-level).
2. Exact sidecar auth/session sync model.
3. Provider choices for speech/vision/LLM under cost targets.
4. Mapping maintenance ownership and update cadence.

## 12) Definition of done for MVP architecture

- Top 30-50 FlexMLS fields mapped and fillable.
- Staged autofill with human review working on real listings.
- End-to-end audit log for every autofill action.
- Failure handling and basic monitoring in place.
- Documented fallback behavior for unmapped/failed fields.
