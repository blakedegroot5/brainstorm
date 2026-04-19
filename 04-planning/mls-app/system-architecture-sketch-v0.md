# Network AI Agent Architecture — Brainstorm

> **Concept:** Lightweight AI agents running on-box (Cisco IOx first, multi-vendor future) that communicate back to a central server with AI capabilities and network intelligence — providing telemetry, anomaly detection, and operator-facing troubleshooting assistance.

---

## The Core Idea

Most vendor "AI" solutions today — Cisco Catalyst Center, Juniper Mist, Selector, Kentik — are **AI in the cloud analyzing data collected from boxes**. The intelligence lives entirely off-device. The device itself remains dumb; just a telemetry source.

This concept is different: **an agent residing on the device**, with local awareness and reasoning capability — not just local data collection.

### Why On-Box Agency Matters

- React **before telemetry leaves the box** — no round-trip to the cloud for first-pass triage
- Access **data that never gets streamed** — internal buffers, microbursts, transient states that exist for milliseconds and disappear before any polling cycle catches them
- Stay **functional when connectivity to the central server is degraded** — exactly when you most need troubleshooting capability
- Perform **local correlation** between data plane and control plane in real time, not retrospectively

### What This Is NOT

The on-box agent is **not** a reasoning engine. Running meaningful LLM inference on IOx-constrained hardware is not realistic. The agent is better described as a **sophisticated, context-aware telemetry agent** — smarter than a collector, but not the brain.

The **AI reasoning lives centrally**. The agent is what makes the data meaningful.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                  CENTRAL SERVER                      │
│                                                     │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────┐ │
│  │  AI/LLM     │  │  Network     │  │  Agent     │ │
│  │  Engine     │  │  Intelligence│  │  Manager   │ │
│  └─────────────┘  └──────────────┘  └────────────┘ │
│                                                     │
│  ┌─────────────┐  ┌──────────────┐                 │
│  │  Time Series│  │  Topology    │                 │
│  │  DB         │  │  Graph       │                 │
│  └─────────────┘  └──────────────┘                 │
└─────────────────────────────────────────────────────┘
           ▲  mTLS/gRPC  │
           │             ▼
┌──────────────────────────────┐
│         IOx CONTAINER        │
│                              │
│  ┌────────────┐  ┌────────┐  │
│  │  Telemetry │  │ Local  │  │
│  │  Collector │  │ Anomaly│  │
│  └────────────┘  │ Engine │  │
│  ┌────────────┐  └────────┘  │
│  │  Command   │  ┌────────┐  │
│  │  Executor  │  │ Agent  │  │
│  └────────────┘  │ Core   │  │
│                  └────────┘  │
└──────────────────────────────┘
           │
    Native IOS-XE APIs
    gNMI / NETCONF / CLI
```

---

## The On-Box Agent (IOx Container)

### Runtime

Docker container packaged as a `.tar` for IOx. Python is the realistic choice for network engineers. Key libraries:

| Library | Purpose |
|---|---|
| `pygnmi` / `cisco-gnmi` | Streaming telemetry subscriptions |
| `ncclient` | NETCONF for config and state |
| `grpcio` | Bidirectional channel to central server |
| `pydantic` | Structured event modeling |
| `statistics` / `numpy` | Local anomaly detection math |

### Three Functional Components

#### 1. Telemetry Collector
Subscribes to gNMI paths on the local device — interfaces, BGP neighbors, OSPF adjacencies, CPU/memory, QoS queues. Always running at baseline frequency, streaming to the central server.

Example gNMI paths to subscribe to:
```
/interfaces/interface/state/counters
/network-instances/network-instance/protocols/protocol/bgp/neighbors
/system/memory/state
/system/cpus/cpu/state
/qos/interfaces/interface/output/queues
```

#### 2. Local Anomaly Engine
The component that makes this an *agent* rather than just a collector. Uses simple statistical logic — rolling averages, threshold breach detection, rate-of-change alerting — to determine when something looks wrong.

When an anomaly is detected:
- Shifts into **high-frequency collection mode** on relevant counters
- Begins assembling a **context bundle** — event + surrounding telemetry + device state snapshot
- Flags the bundle for escalation to the central server

This is the agent knowing *when to pay attention* — the critical capability that remote polling lacks.

#### 3. Command Executor
Receives tasking instructions back from the central server and executes them locally. Examples:

- Increase collection frequency on a specific interface
- Run `show ip bgp neighbor x.x.x.x` and return output
- Capture specific YANG paths for a defined time window
- Subscribe to additional gNMI paths temporarily

**The executor does not make configuration changes** — it gathers and responds. Autonomy is limited to data collection, not remediation.

---

## The Central Server

All AI reasoning lives here. The server maintains network-wide context that no individual device can have.

### Recommended Stack

| Component | Technology | Notes |
|---|---|---|
| Agent communication | gRPC server (Python or Go) | Bidirectional streaming |
| Time series storage | InfluxDB or TimescaleDB | Telemetry retention and querying |
| Topology graph | Neo4j or NetworkX | Adjacency, dependency, blast radius |
| AI/LLM engine | OpenAI API or local Ollama | Diagnosis and recommendation generation |
| Task queue | Celery + Redis | Async agent tasking |
| API layer | FastAPI | Agent registration, operator interface |
| Frontend | React (simple) | Alert dashboard, recommendation display |

### What the Server Does

1. **Receives** telemetry streams and anomaly bundles from all registered agents
2. **Maintains** a live topology graph — knows adjacencies, dependencies, what depends on what
3. **Correlates** anomaly events across devices — did anything else change at the same time on neighboring devices?
4. **Enriches** the event bundle with topology context and historical baselines
5. **Prompts** the LLM with the full correlated context to generate diagnosis and suggested investigation steps
6. **Returns** actionable output to the operator
7. **Tasks** agents to collect additional specific data if needed

### Topology Graph Value

The topology graph is what elevates this beyond simple per-device alerting. Examples of cross-device correlation:

- BGP peer flap on device A + interface error spike on device B (the upstream) = likely physical layer issue, not BGP misconfiguration
- CPU spike on a route reflector + reconvergence events across 20 devices = the RR is the problem, not the 20 devices reporting events
- OSPF adjacency drop + simultaneous interface flap on the same logical path = single root cause, not two separate incidents

---

## The Feedback Loop — What Makes It an Agent

This bidirectional flow is the key differentiator from streaming telemetry into a cloud analytics platform:

```
1.  Agent detects anomaly locally
      └─ BGP flap, interface error spike, CPU threshold breach, etc.

2.  Agent bundles context
      └─ Event + 60s surrounding telemetry + current device state snapshot

3.  Bundle sent to central server via gRPC

4.  Server correlates against other devices, topology, and history
      └─ What else changed? What's downstream? What does baseline look like?

5.  Enriched context sent to LLM
      └─ Structured prompt with event, telemetry, topology, history

6.  LLM generates diagnosis + recommended investigation steps

7.  Server optionally tasks agent to collect additional specific data
      └─ "Capture queue drops on Gi0/0/1 every 5 seconds for 2 minutes"

8.  Operator receives actionable alert with full correlated context
```

Step 7 is what separates an agent from a collector — the server can dynamically re-task the on-box agent based on what the AI determines it needs to know.

---

## Agent–Server Communication Design

### Transport
- **Protocol:** gRPC with bidirectional streaming
- **Security:** mTLS — both agent and server present certificates
- **Behavior when server unreachable:** Agent continues local collection and anomaly detection, buffers event bundles, replays when connectivity restores

### Message Types

| Direction | Message | Purpose |
|---|---|---|
| Agent → Server | `TelemetryStream` | Continuous baseline metric stream |
| Agent → Server | `AnomalyBundle` | Triggered event with context payload |
| Agent → Server | `Heartbeat` | Agent health and connectivity signal |
| Server → Agent | `TaskRequest` | Instruction to collect specific data |
| Server → Agent | `SubscriptionUpdate` | Modify gNMI paths or polling frequency |
| Server → Agent | `Acknowledge` | Confirm bundle received and processing |

### Agent Registration
On first contact, agents register with the server:
- Device hostname, platform, IOS-XE version
- Available gNMI paths (capability exchange)
- Resource constraints (CPU/memory ceiling for agent operations)
- Current neighbor/adjacency state (initial topology seed)

---

## Operator-Facing Output

The LLM output needs to be structured, not free-form. A suggested format:

```
ALERT: BGP Peer Down — 10.0.0.1 on router CORE-01

DIAGNOSIS:
BGP session to peer 10.0.0.1 dropped at 14:23:07. Correlated with interface
Gi0/0/2 error counter increase starting 14:22:51 (16 seconds prior). Upstream
device DIST-02 shows matching interface flap on its Gi0/1/0 at 14:22:49.
Pattern suggests physical layer or transceiver issue between CORE-01 and DIST-02,
not a BGP configuration or policy problem.

SUGGESTED INVESTIGATION:
1. Check transceiver health on CORE-01 Gi0/0/2 and DIST-02 Gi0/1/0
   → show interfaces Gi0/0/2 transceiver
2. Review interface error counters for CRC or input errors
   → show interfaces Gi0/0/2
3. Check for recent changes to the physical path between these devices

CONFIDENCE: High — physical correlation with upstream device supports single
root cause hypothesis.

ADDITIONAL DATA BEING COLLECTED: Queue drops and optical levels on affected
interfaces for the next 120 seconds.
```

---

## Build Phases

### Phase 1 — Prove the Agent Works
Get a basic IOx container running on a lab device, subscribing to a handful of gNMI paths, streaming to a simple server that stores and displays data. This will expose IOx constraints and gNMI reliability issues early.

**Deliverable:** Agent container deploys, connects, streams interface and BGP state.

### Phase 2 — Local Anomaly Detection
Build the statistical anomaly engine on-box. Define what "something changed" looks like for interfaces, BGP, CPU. Implement high-frequency burst collection. Test event bundle assembly.

**Deliverable:** Agent self-triggers on threshold breach, assembles and sends structured bundle.

### Phase 3 — Central Intelligence
Wire in the LLM. Build the topology graph. Implement correlation logic. Start with simple prompts against event bundles and iterate on prompt structure.

**Deliverable:** Operator receives plain-language diagnosis on a real lab event.

### Phase 4 — Close the Loop
Build server-to-agent tasking. Implement `TaskRequest` handling in the agent. Test the full bidirectional flow end to end.

**Deliverable:** Server dynamically re-tasks agent mid-incident. Full agent loop functional.

### Phase 5 — Multi-Device Correlation
Add more lab devices. Build out topology graph population from agent registrations and LLDP/CDP data. Test cross-device correlation on real lab fault scenarios.

**Deliverable:** Single root cause identified across a multi-hop lab topology.

---

## Known Challenges

### IOx Packaging
The IOx toolchain (`ioxclient`, Docker cross-compilation for target platform architecture) is not smooth. Platform CPU architecture matters — some ISR/ASR platforms are not x86. Budget significant time here before writing a line of agent logic.

### gNMI Path Availability
Not every counter you want will be available via gNMI on every IOS-XE version. Some data will require NETCONF fallback. Some will require CLI scraping (less ideal but sometimes unavoidable). Build an abstraction layer in the collector early so the anomaly engine doesn't care how the data was retrieved.

### LLM Prompt Engineering
How you structure the context sent to the LLM determines whether you get useful diagnosis or confident-sounding nonsense. This requires significant iteration. Start with smaller, focused prompts (single event type) before attempting complex multi-device correlation prompts.

### Telemetry Volume
If every agent streams everything, the central server drowns. Design the agent to be selective — baseline telemetry should be coarse, high-frequency collection should be exception-triggered only.

### Agent–Server Connectivity
The server being unreachable is a valid network condition — often correlated with the very faults you're trying to detect. The agent must degrade gracefully: continue local collection, buffer events, and replay on reconnect. Design for this from day one.

---

## Future Considerations (Out of Scope for Now)

- **Multi-vendor support** — Junos Jet, EOS extensions, Nokia SR Linux all have different container runtimes and API surfaces. A vendor abstraction layer would be required.
- **Autonomous remediation** — agents executing changes rather than just suggesting them. Requires robust guardrails, change control integration, and blast radius awareness.
- **Federated server topology** — regional servers aggregating to a global server for large-scale deployments.
- **Custom model fine-tuning** — training a network-domain-specific model on historical telemetry and incident data rather than relying on a general-purpose LLM.
- **Integration with ITSM** — automatic ticket creation in ServiceNow/Jira with the diagnosis bundle attached.

---

## Open Questions

- What gNMI paths are actually available and reliable across target IOS-XE versions?
- What resource ceiling should the agent respect on-box (CPU%, memory MB)?
- How long should the agent buffer events when the server is unreachable?
- What is the right topology graph seed strategy — LLDP/CDP scrape on registration, or manual topology input?
- How do we validate LLM diagnosis quality — what does "correct" look like and how do we measure it?
- What's the operator workflow for receiving and acting on recommendations — dedicated UI, integration into existing NOC tooling, or something else?

---

*This document is a living brainstorm. Architecture decisions should be validated against lab testing at each phase before committing to implementation details.*
