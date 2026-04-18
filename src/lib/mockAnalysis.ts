import type { Finding } from "@/components/FindingsList";

export interface SmileScores {
  RE: number; // Reality Emulation
  CE: number; // Concurrent Engineering
  CI: number; // Collective Intelligence
  CX: number; // Contextual Intelligence
  CN: number; // Continuous Intelligence
  PW: number; // Perpetual Wisdom
}

export interface AestScores {
  absorb: number;
  emulate: number;
  simulate: number;
  transcend: number;
}

export interface PerspectivesScores {
  people: number;
  systems: number;
  planet: number;
  ai: number;
}

export type NudeLevel =
  | "Naive"
  | "Unarticulated"
  | "Dependent"
  | "Articulated"
  | "Explicit";

export interface AnalysisResult {
  score: number;
  smile: SmileScores;
  aest: AestScores;
  nudeda: NudeLevel;
  perspectives: PerspectivesScores;
  findings: Finding[];
  suggestions: string[];
  dtTransformation: string;
  domain: string;
  analyzedAt: string;
}

// A construction project that scores 45/100 — needs major SMILE alignment
export const MOCK_CONSTRUCTION_ANALYSIS: AnalysisResult = {
  score: 45,
  domain: "Construction",
  analyzedAt: new Date().toISOString(),
  smile: {
    RE: 1.8, // Reality Emulation — no sensor/IoT integration, no live data feeds
    CE: 2.4, // Concurrent Engineering — some parallel workstreams but siloed
    CI: 1.5, // Collective Intelligence — no cross-discipline knowledge sharing
    CX: 2.8, // Contextual Intelligence — GIS data referenced but not integrated
    CN: 1.2, // Continuous Intelligence — no feedback loops, static milestones
    PW: 1.6, // Perpetual Wisdom — no knowledge capture or reuse plan
  },
  aest: {
    absorb: 3.2,    // Past — historical site data referenced
    emulate: 1.8,   // Present — no living model of current state
    simulate: 1.4,  // Future — no scenario testing before build
    transcend: 0.9, // Beyond — no knowledge transfer plan post-completion
  },
  nudeda: "Dependent",
  perspectives: {
    people: 2.1,   // Stakeholder engagement is compliance-driven only
    systems: 2.8,  // BIM mentioned but not integrated with other systems
    planet: 3.4,   // Environmental impact assessment exists (regulatory)
    ai: 0.8,       // No AI or agent-based monitoring planned
  },
  findings: [
    {
      id: "f1",
      title: "No live data integration (Reality Emulation gap)",
      description:
        "The project plan describes a construction workflow that operates entirely on static documents and periodic site surveys. There is no mechanism to ingest real-time sensor data, IoT feeds, or BIM-as-built updates. This violates Phase 1 of SMILE — Reality Emulation requires a continuously updated model of physical reality.",
      severity: "critical",
      layer: "SMILE Phase 1 — Reality Emulation",
      recommendation:
        "Define a sensor strategy for the construction site: temperature, structural stress, material tracking via RFID, and weather feeds. Connect these to a BIM model that updates at least daily. Even a simple IoT+BIM integration elevates RE from 1.8 to 3.5.",
      antiPattern: "Static-Plan Fallacy",
    },
    {
      id: "f2",
      title: "No simulation layer before build decisions",
      description:
        "Critical design decisions (foundation type, material sequencing, crane placement) are made without virtual simulation. SMILE Phase 3 (Continuous Intelligence) and AEST Simulate require that you test interventions in a virtual environment before committing resources. The plan moves directly from design to procurement.",
      severity: "critical",
      layer: "AEST — Simulate",
      recommendation:
        "Introduce a digital pre-construction simulation step: run at least 3 'what-if' scenarios per major decision point (e.g., foundation options, weather delays, supply chain disruptions) using the BIM model as a simulation engine. Tools like Autodesk Construction Cloud or Bentley iTwin support this.",
      antiPattern: "Commit-Before-Simulate",
    },
    {
      id: "f3",
      title: "Collective Intelligence siloed across subcontractors",
      description:
        "The project plan lists 7 subcontractors with separate reporting chains and no shared knowledge platform. Each captures lessons learned independently. SMILE Phase 4 (Collective Intelligence) requires that insights flow across all participating actors — including non-human actants like the building itself.",
      severity: "major",
      layer: "SMILE Phase 4 — Collective Intelligence",
      recommendation:
        "Establish a project-wide knowledge commons (even a shared Notion or Confluence space with defined taxonomy) where each subcontractor logs decisions, failures, and adaptations weekly. Map these to the SMILE phases so the project accumulates a computable knowledge graph.",
    },
    {
      id: "f4",
      title: "AI perspective entirely absent",
      description:
        "The Four Perspectives analysis reveals a critical gap: the AI dimension scores 0.8/5. There is no plan for AI-assisted monitoring, predictive maintenance scheduling, anomaly detection, or autonomous reporting. For a project of this scale, the absence of any AI layer is a competitive and operational risk.",
      severity: "major",
      layer: "Four Perspectives — AI",
      recommendation:
        "At minimum, introduce AI-assisted schedule risk prediction (tools like Alice Technologies or built-in ML in Primavera) and computer-vision safety monitoring on site cameras. This alone raises the AI perspective score from 0.8 to 2.5+.",
    },
    {
      id: "f5",
      title: "No knowledge transfer plan beyond project completion",
      description:
        "AEST Transcend asks: what does the world know after this project that it did not know before? The plan has no post-occupancy knowledge capture, no methodology documentation, and no plan to reuse the digital artefacts (BIM models, site data) in future projects. Perpetual Wisdom (SMILE Phase 6) scores 1.6 as a result.",
      severity: "major",
      layer: "SMILE Phase 6 — Perpetual Wisdom",
      recommendation:
        "Define a Knowledge Transcendence Package (KTP): a structured archive of decisions, simulations, and outcomes that can be ingested by the next comparable project. Commit to publishing at least one methodology paper or case study within 12 months of completion.",
    },
    {
      id: "f6",
      title: "Stakeholder engagement is compliance-driven, not design-driven",
      description:
        "Community consultations are listed as regulatory checkboxes rather than genuine co-design opportunities. SMILE People perspective requires that affected communities are co-creators, not just notification recipients. Current approach risks low adoption and delayed approvals.",
      severity: "minor",
      layer: "Four Perspectives — People",
      recommendation:
        "Replace one 'community notification meeting' with a co-design workshop where residents contribute spatial preferences and constraints. Use the outputs to refine at least one design parameter. This transforms compliance into genuine Collective Intelligence.",
    },
    {
      id: "f7",
      title: "BIM not connected to project management or procurement",
      description:
        "BIM is used for design visualisation but is not integrated with the schedule, cost model, or procurement system. This is a missed opportunity for Concurrent Engineering (SMILE Phase 2) — where design, procurement, and construction happen in parallel informed by a shared model.",
      severity: "minor",
      layer: "SMILE Phase 2 — Concurrent Engineering",
      recommendation:
        "Implement a 5D BIM workflow (3D geometry + schedule + cost). This is achievable with existing tools and eliminates the current 3-4 week lag between design changes and procurement updates.",
    },
    {
      id: "f8",
      title: "Environmental data is one-time assessment, not continuous monitoring",
      description:
        "The environmental impact assessment was completed at project initiation. SMILE requires continuous environmental sensing (Planet perspective) — carbon footprint of materials, noise pollution during construction, soil disturbance, water runoff — updated throughout the project lifecycle.",
      severity: "info",
      layer: "Four Perspectives — Planet",
      recommendation:
        "Deploy 4-6 environmental sensors on site (noise, dust, soil moisture, CO2). Feed readings into a simple dashboard. This costs ~EUR 2,000 and provides continuous Planet perspective data that raises your SMILE Planet score from 3.4 to 4.2.",
    },
  ],
  suggestions: [
    "Phase 1 (RE): Add IoT sensor plan — even 5 sensors transforms this from a static to a living project",
    "Phase 2 (CE): Connect BIM to procurement system to enable true concurrent engineering",
    "Phase 3 (CI): Define weekly knowledge-logging protocol across all 7 subcontractors",
    "Phase 4 (CX): Ingest live weather, material pricing, and traffic feeds into project scheduling",
    "Phase 5 (CN): Replace periodic milestone reviews with continuous dashboard monitoring",
    "Phase 6 (PW): Commit to post-occupancy knowledge capture and one published case study",
    "AEST Simulate: Run 3 virtual scenarios before each major procurement decision",
    "AEST Transcend: Define Knowledge Transcendence Package deliverable",
    "People: Replace one notification meeting with a co-design workshop",
    "AI: Pilot computer-vision safety monitoring on 2 site cameras",
  ],
  dtTransformation:
    "This construction project is 2-3 steps away from becoming a genuine digital twin project. The physical assets (building, site, infrastructure) already exist as the persistent reality layer — the missing ingredient is a continuously updated virtual representation that enables real-time decision support. Specifically: (1) Wire 10-15 IoT sensors to a BIM model that updates daily — this creates the 'Emulate' layer. (2) Use that live model as a simulation engine to test schedule and design options before committing — this creates the 'Simulate' layer. (3) Build a post-project knowledge archive that can be queried by future projects — this creates the 'Transcend' layer. These three steps would raise your SMILE readiness score from 45 to approximately 72 and would make this project a referenceable digital twin pilot — opening doors to grants, partnerships, and premium client positioning.",
};

// Domain-specific score variations
export const DOMAIN_SCORE_ADJUSTMENTS: Record<string, Partial<SmileScores>> = {
  Healthcare: { RE: 0.4, CN: 0.3, PW: 0.5 },
  Manufacturing: { CE: 0.5, CX: 0.3 },
  Construction: {},
  "Smart Cities": { CI: 0.4, CX: 0.6, CN: 0.3 },
  Agriculture: { RE: 0.2, PW: 0.3 },
  Defence: { CX: 0.3, CN: 0.5 },
  Education: { CI: 0.6, PW: 0.8 },
  Genomics: { RE: 0.6, CN: 0.4, PW: 0.6 },
};
