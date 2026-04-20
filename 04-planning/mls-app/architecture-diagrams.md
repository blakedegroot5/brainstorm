# MLS App Architecture Diagrams

Date: 2026-04-19
Scope: Michigan + FlexMLS v1

## 1) Tech Stack (Layered)

```mermaid
flowchart TB
  subgraph Client[Client Layer]
    WEB["Web App<br/>Next.js + TypeScript"]
    EXT["Browser Sidecar Extension<br/>Manifest V3 + TypeScript"]
  end

  subgraph AppLayer[Application Layer]
    BFF["API Service<br/>Node.js Fastify or NestJS"]
    AUTH["Auth + Org Access"]
    LISTING["Listing + Versioning"]
    MAP["Field Mapping Service"]
    AUDIT["Audit and Event Service"]
  end

  subgraph Async[Async Processing]
    QUEUE["BullMQ and Redis Queue"]
    WORKER["Worker Service<br/>Transcription, OCR, Vision, LLM Normalize"]
  end

  subgraph Data[Data Layer]
    PG["Postgres"]
    S3["S3-Compatible Object Storage"]
    REDIS["Redis Cache and Queue"]
  end

  subgraph External[External Integrations]
    FLEX["FlexMLS or Spark API"]
    LLM["LLM + Speech + Vision APIs"]
    PAY["Payments (Optional Post-Validation)"]
  end

  WEB --> BFF
  EXT --> BFF

  BFF --> AUTH
  BFF --> LISTING
  BFF --> MAP
  BFF --> AUDIT

  BFF --> PG
  BFF --> S3
  BFF --> REDIS

  BFF --> QUEUE
  QUEUE --> WORKER
  WORKER --> LLM
  WORKER --> PG
  WORKER --> S3

  BFF --> FLEX
  BFF --> PAY
```

## 2) System Architecture (Runtime)

```mermaid
flowchart LR
  U["Agent and Admin User"] --> WEB["Web App: Listing Workspace"]
  U --> EXT["Sidecar in FlexMLS"]

  WEB --> API["Backend API"]
  EXT --> API

  API --> DB["Postgres"]
  API --> OBJ["Object Storage"]
  API --> Q["Queue"]
  Q --> W["AI Workers"]
  W --> AI["Speech, OCR, Vision, LLM APIs"]

  API --> MAP["Field Mapping Rules"]
  MAP --> EXT

  API -. "Mode A" .-> SPARK["Spark API Writes (if supported)"]
  EXT -. "Mode B" .-> FLEXUI["FlexMLS UI Field Fill (fallback)"]

  SPARK --> FLEX["FlexMLS"]
  FLEXUI --> FLEX

  API --> LOG["Audit + Fill Attempts"]
  EXT --> LOG
```

## 3) Listing-to-MLS Flow

```mermaid
flowchart TB
  subgraph Phase1["Phase 1: Create and Normalize Listing"]
    A1["1) Agent creates draft in Web App<br/>and uploads notes/photos/docs"]
    A2["2) Web App saves draft via API"]
    A3["3) API queues AI extraction job"]
    A4["4) Worker returns normalized listing package"]
    A5["5) Agent reviews, edits, and approves package"]
    A1 --> A2 --> A3 --> A4 --> A5
  end

  subgraph Phase2["Phase 2: Open MLS and Load Fill Plan"]
    B1["6) Agent opens Sidecar on FlexMLS form"]
    B2["7) Sidecar fetches approved package + field map from API"]
    B1 --> B2
  end

  subgraph Phase3["Phase 3: Fill Strategy Decision"]
    C1{"8) Spark API write supported?"}
    C2["Mode A: API writes supported fields via Spark"]
    C3["Mode B: Sidecar fills fields in FlexMLS UI"]
    C4["Sidecar fills any remaining unsupported UI fields"]
    C1 -->|Yes| C2
    C2 --> C4
    C1 -->|No| C3
  end

  subgraph Phase4["Phase 4: Human Final Check + Audit"]
    D1["9) Agent does final review in FlexMLS and submits"]
    D2["10) Sidecar sends fill results to API"]
    D3["11) API stores audit log + quality metrics"]
    D1 --> D2 --> D3
  end

  A5 --> B1
  B2 --> C1
  C3 --> D1
  C4 --> D1
```
