import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SMILE Methodology — 6 Phases, 4 Perspectives, AEST",
  description:
    "The complete S.M.I.L.E. framework: 6 phases from Reality Emulation to Perpetual Wisdom, Four Perspectives (People/Systems/Planet/AI), AEST temporal model, NUDEDA maturity levels, and SPIN questioning framework.",
};

const PHASES = [
  {
    code: "RE",
    name: "Reality Emulation",
    color: "#C9A84C",
    order: "01",
    description:
      "The foundation of every SMILE project. Reality Emulation asks: is there a continuously updated digital representation of the physical reality you are working with? This is not a one-time 3D model or a static CAD file — it is a living, breathing mirror of physical state. Sensors, IoT feeds, GIS data, BIM-as-built updates, and observation data all contribute to the Reality Emulation layer.",
    indicators: [
      "Real-time sensor or IoT integration",
      "BIM or GIS model updated at project cadence",
      "Physical actants (non-human) are first-class participants",
      "Data provenance is traceable to physical events",
    ],
    antipatterns: [
      "Static 3D models treated as ground truth",
      "Periodic surveys as the only data source",
      "No sensor or observation strategy",
    ],
  },
  {
    code: "CE",
    name: "Concurrent Engineering",
    color: "#e8c96a",
    order: "02",
    description:
      "Concurrent Engineering moves beyond sequential waterfall delivery. SMILE requires that design, build, and learn loops run in parallel — not one after another. This phase checks whether the project has cross-disciplinary collaboration infrastructure, whether design decisions are informed by live build data, and whether learning from one workstream immediately influences others.",
    indicators: [
      "Cross-disciplinary teams with shared data access",
      "Design changes reflected in procurement in near-real-time",
      "Feedback loops between field observations and design iterations",
      "5D BIM or equivalent model linking geometry, schedule, and cost",
    ],
    antipatterns: [
      "Sequential handoffs between design, engineering, and build",
      "Separate data systems with no integration",
      "Design freeze before field learning begins",
    ],
  },
  {
    code: "CI",
    name: "Collective Intelligence",
    color: "#10b981",
    order: "03",
    description:
      "Collective Intelligence is the capacity of the project to learn from all its actors — human and non-human. This phase scores how well knowledge flows across stakeholders, subcontractors, algorithms, and the physical environment itself. Actor-Network Theory (ANT) is the theoretical backbone: every actant that influences the project outcome should be able to contribute to the shared knowledge base.",
    indicators: [
      "Shared knowledge platform accessible to all project actors",
      "Lessons-learned protocol with defined taxonomy",
      "Non-human actants (sensors, standards, algorithms) acknowledged as contributors",
      "Knowledge graph or structured log of project decisions",
    ],
    antipatterns: [
      "Siloed subcontractor reporting",
      "Lessons learned only at project end",
      "No taxonomy for classifying project knowledge",
    ],
  },
  {
    code: "CX",
    name: "Contextual Intelligence",
    color: "#06b6d4",
    order: "04",
    description:
      "Contextual Intelligence is about situational awareness. Does the project understand its environment — spatial, temporal, social, regulatory, and ecological? This phase checks whether the project ingests contextual feeds (weather, market data, regulatory changes, spatial data) and whether decisions adapt based on changing context rather than a fixed plan written at the start.",
    indicators: [
      "Live contextual feeds integrated (weather, market, regulatory)",
      "Spatial data (GIS, BIM, satellite) informing decisions",
      "Scenario planning updated as context evolves",
      "Project schedule adapts to real-world conditions",
    ],
    antipatterns: [
      "Static project plan with no contextual triggers",
      "Context only assessed at project initiation",
      "No spatial data integration",
    ],
  },
  {
    code: "CN",
    name: "Continuous Intelligence",
    color: "#8b5cf6",
    order: "05",
    description:
      "Continuous Intelligence is the operational heartbeat of a SMILE project. Where Contextual Intelligence is about awareness, Continuous Intelligence is about response. This phase measures whether the project has automated or semi-automated feedback loops — dashboards, alerts, anomaly detection, and adaptive scheduling — that improve outcomes in real time rather than relying on periodic reviews.",
    indicators: [
      "Real-time dashboard with KPI monitoring",
      "Anomaly detection or alert systems",
      "Adaptive scheduling triggered by live data",
      "AI or rule-based agents supporting decisions",
    ],
    antipatterns: [
      "Monthly milestone reviews as the only monitoring mechanism",
      "No dashboard or operational visibility",
      "Decisions made from memory rather than data",
    ],
  },
  {
    code: "PW",
    name: "Perpetual Wisdom",
    color: "#f59e0b",
    order: "06",
    description:
      "Perpetual Wisdom is the capstone phase. It asks: what does the world know after this project that it did not know before? And critically: is that knowledge in a form that can be reused, extended, and built upon? SMILE projects are designed to leave behind computable knowledge artefacts — not just PDFs or final reports — that can seed the next generation of digital twin projects.",
    indicators: [
      "Structured knowledge archive (not just documents)",
      "Post-occupancy monitoring and data collection plan",
      "Methodology paper or case study published",
      "Digital artefacts (models, datasets) preserved and accessible",
    ],
    antipatterns: [
      "Final report as the only knowledge output",
      "No plan for post-project data use",
      "Lessons learned locked in internal systems",
    ],
  },
];

const PERSPECTIVES = [
  {
    label: "People",
    color: "#10b981",
    icon: "P",
    desc: "Stakeholder mapping, co-design processes, human-in-the-loop architecture, org change management, and community engagement. SMILE People perspective scores whether the humans most affected by the project are genuine co-creators, not just notification recipients.",
  },
  {
    label: "Systems",
    color: "#8b5cf6",
    icon: "S",
    desc: "Technical standards compliance, interoperability architecture, MIMs (Minimal Interoperability Mechanisms), integration patterns, and data exchange protocols. A project that cannot talk to adjacent systems is a silo, not a platform.",
  },
  {
    label: "Planet",
    color: "#3b82f6",
    icon: "P",
    desc: "Environmental awareness, GIS/BIM/CIM spatial integration, carbon tracking, ecological impact monitoring, and planetary boundary alignment. SMILE projects treat the physical environment as a first-class participant — not a passive backdrop.",
  },
  {
    label: "AI",
    color: "#C9A84C",
    icon: "AI",
    desc: "Agent autonomy, explainability requirements, LPI (Life Programmable Interface) compliance, trust architecture, and AI governance. The AI perspective scores whether the project's AI layer is sovereign, explainable, and non-hallucination-friendly.",
  },
];

const NUDEDA = [
  { level: "Naive",         score: "0-1", color: "#ef4444", desc: "No awareness of digital twin potential. Project is entirely analogue or document-driven." },
  { level: "Unarticulated", score: "1-2", color: "#f97316", desc: "DT potential exists but is unrecognised or undiscussed. Individual team members may use digital tools in isolation." },
  { level: "Dependent",     score: "2-3", color: "#f59e0b", desc: "Relies on external tools (BIM software, GIS platforms) without integration strategy. Data silos present." },
  { level: "Articulated",   score: "3-4", color: "#C9A84C", desc: "Clear DT vision articulated. Some integration between systems. SMILE phases beginning to connect." },
  { level: "Explicit",      score: "4-5", color: "#10b981", desc: "Full SMILE lifecycle embedded. Living, learning digital twin with feedback loops, knowledge capture, and post-project reuse strategy." },
];

const SPIN = [
  {
    letter: "S",
    word: "Situation",
    color: "#C9A84C",
    desc: "What is the current state of the project, organisation, or physical system? SMILE projects must first deeply understand reality before attempting to change it.",
    questions: [
      "What data currently exists about this system?",
      "Who are all the actors (human and non-human)?",
      "What is the current physical state?",
    ],
  },
  {
    letter: "P",
    word: "Problem",
    color: "#e8c96a",
    desc: "What is not working? What gaps, inefficiencies, or risks exist in the current state? SMILE projects are problem-first, not technology-first.",
    questions: [
      "Where are the decision bottlenecks?",
      "What knowledge is lost between workstreams?",
      "Where does the absence of real-time data cost time or money?",
    ],
  },
  {
    letter: "I",
    word: "Implication",
    color: "#10b981",
    desc: "What happens if the problem is not solved? What are the downstream consequences of the current state persisting? SMILE forces explicit articulation of consequence chains.",
    questions: [
      "What does it cost annually to operate without continuous intelligence?",
      "What safety risks persist without real-time monitoring?",
      "What innovation is foreclosed by knowledge silos?",
    ],
  },
  {
    letter: "N",
    word: "Need-Payoff",
    color: "#06b6d4",
    desc: "What would the ideal state look like? What is the value of solving the problem? SMILE projects must articulate the payoff clearly — not just in financial terms but in impact terms.",
    questions: [
      "What would a 10% improvement in Continuous Intelligence be worth?",
      "What would post-project knowledge reuse unlock?",
      "What partners, grants, or clients would a SMILE-aligned project attract?",
    ],
  },
];

export default function MethodologyPage() {
  return (
    <main className="min-h-screen bg-[#0a0f1e]">
      {/* NAV */}
      <nav className="sticky top-0 z-50 border-b border-[#C9A84C]/10 bg-[#0a0f1e]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#C9A84C]/20 border border-[#C9A84C]/30 flex items-center justify-center">
              <span className="text-[#C9A84C] font-bold text-xs">S</span>
            </div>
            <span className="text-white font-semibold text-sm tracking-wide">S.M.I.L.E.</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/analyze" className="px-4 py-2 rounded-lg bg-[#C9A84C] text-[#0a0f1e] font-semibold text-sm hover:bg-[#e8c96a] transition-colors">
              Try it on Your Project
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="py-20 px-6 text-center border-b border-[#C9A84C]/10">
        <div className="max-w-3xl mx-auto">
          <h1
            className="text-5xl md:text-6xl font-light text-white mb-6"
            style={{ fontFamily: "var(--font-cormorant), serif" }}
          >
            The <span className="gradient-text-gold">SMILE</span> Methodology
          </h1>
          <p className="text-slate-300 text-xl leading-relaxed mb-8">
            Sustainable Methodology for Impact Lifecycle Enablement — a field-tested framework for transforming projects from static deliverables into continuously learning digital twins.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://doi.org/10.5281/zenodo.19646374"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-[#C9A84C] text-[#0a0f1e] font-semibold hover:bg-[#e8c96a] transition-all inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Read the Full Paper (Zenodo)
            </a>
            <Link
              href="/analyze"
              className="px-6 py-3 rounded-xl border border-[#C9A84C]/40 text-[#C9A84C] font-semibold hover:bg-[#C9A84C]/10 transition-all"
            >
              Analyze Your Project
            </Link>
          </div>
        </div>
      </section>

      {/* SIX PHASES */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-light text-white mb-4"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Six Phases
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Every project is scored across these six phases. Together they define whether a project is a static deliverable or a living, learning system.
            </p>
          </div>

          <div className="space-y-8">
            {PHASES.map(({ code, name, color, order, description, indicators, antipatterns }) => (
              <div
                key={code}
                className="glass rounded-2xl p-8 border"
                style={{ borderColor: `${color}25` }}
              >
                <div className="flex items-start gap-6 flex-wrap md:flex-nowrap">
                  <div className="shrink-0">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-lg"
                      style={{ backgroundColor: `${color}20`, color, border: `1px solid ${color}40` }}
                    >
                      {code}
                    </div>
                    <div className="text-slate-600 text-xs text-center mt-2 font-mono">{order}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white text-xl font-semibold mb-3">{name}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-6">{description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wide mb-3">Positive Indicators</p>
                        <ul className="space-y-2">
                          {indicators.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-slate-400 text-sm">
                              <span className="text-emerald-500 mt-0.5 shrink-0">✓</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-red-400 uppercase tracking-wide mb-3">Anti-Patterns</p>
                        <ul className="space-y-2">
                          {antipatterns.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-slate-400 text-sm">
                              <span className="text-red-500 mt-0.5 shrink-0">✕</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUR PERSPECTIVES */}
      <section className="py-24 px-6 bg-[#0d1428]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-light text-white mb-4"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Four Perspectives
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Every SMILE project is evaluated across four orthogonal dimensions that ensure no critical dimension of impact is overlooked.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PERSPECTIVES.map(({ label, color, icon, desc }) => (
              <div
                key={label}
                className="glass rounded-2xl p-8 border"
                style={{ borderColor: `${color}25` }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm"
                    style={{ backgroundColor: `${color}20`, color, border: `1px solid ${color}40` }}
                  >
                    {icon}
                  </div>
                  <h3 className="text-white text-xl font-semibold">{label}</h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AEST */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-light text-white mb-4"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              AEST Temporal Model
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              AEST defines the four temporal registers a fully mature SMILE project must operate across. Most projects only operate in the present.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                letter: "A", word: "Absorb",    time: "Past",    color: "#C9A84C",
                desc: "The project draws on historical data, prior art, and past failures. It does not start from scratch — it inherits accumulated knowledge.",
                examples: ["Historical site surveys", "Prior project post-mortems", "Academic literature integration", "Legacy data ingestion"],
              },
              {
                letter: "E", word: "Emulate",   time: "Present", color: "#e8c96a",
                desc: "The project maintains a continuously updated model of current physical reality. The digital representation mirrors the physical state in near-real-time.",
                examples: ["Live IoT sensor feeds", "BIM-as-built updates", "Real-time GIS overlays", "Active monitoring dashboards"],
              },
              {
                letter: "S", word: "Simulate",  time: "Future",  color: "#06b6d4",
                desc: "The project uses its live model to test interventions virtually before committing resources. Decisions are simulation-informed, not intuition-driven.",
                examples: ["What-if scenario planning", "Virtual commissioning", "Supply chain disruption modelling", "Weather-impact simulation"],
              },
              {
                letter: "T", word: "Transcend", time: "Beyond",  color: "#8b5cf6",
                desc: "The project generates knowledge that outlives it. Digital artefacts, methodology papers, and structured archives that can seed the next generation of projects.",
                examples: ["Published case studies", "Open datasets", "Methodology documentation", "Transferable simulation models"],
              },
            ].map(({ letter, word, time, color, desc, examples }) => (
              <div
                key={letter}
                className="glass rounded-2xl p-6 border flex flex-col"
                style={{ borderColor: `${color}25` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold"
                    style={{ backgroundColor: `${color}20`, color, border: `1px solid ${color}40` }}
                  >
                    {letter}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{word}</div>
                    <div className="text-xs" style={{ color }}>{time}</div>
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">{desc}</p>
                <div className="space-y-1.5">
                  {examples.map((ex, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-xs mt-0.5" style={{ color }}>→</span>
                      <span className="text-slate-500 text-xs">{ex}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NUDEDA */}
      <section className="py-24 px-6 bg-[#0d1428]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-light text-white mb-4"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              NUDEDA Maturity Model
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Where does your project sit on the digital twin maturity ladder? NUDEDA gives every project a clear developmental position and a path forward.
            </p>
          </div>

          <div className="space-y-4">
            {NUDEDA.map(({ level, score, color, desc }, i) => (
              <div
                key={level}
                className="glass rounded-2xl p-6 border flex items-start gap-6"
                style={{ borderColor: `${color}25` }}
              >
                <div className="shrink-0 text-center">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center font-bold"
                    style={{ backgroundColor: `${color}20`, color, border: `1px solid ${color}40` }}
                  >
                    {i + 1}
                  </div>
                  <div className="text-xs text-slate-600 mt-1 font-mono">{score}</div>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-2" style={{ color }}>{level}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPIN */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-light text-white mb-4"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              SPIN Questioning Framework
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              SMILE uses the SPIN framework (adapted from consultative selling methodology) to structure the discovery phase of every project transformation engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SPIN.map(({ letter, word, color, desc, questions }) => (
              <div
                key={letter}
                className="glass rounded-2xl p-8 border"
                style={{ borderColor: `${color}25` }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl"
                    style={{ backgroundColor: `${color}20`, color, border: `1px solid ${color}40` }}
                  >
                    {letter}
                  </div>
                  <h3 className="text-white text-xl font-semibold">{word}</h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">{desc}</p>
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color }}>Example Questions</p>
                  {questions.map((q, i) => (
                    <div key={i} className="flex items-start gap-2 text-slate-400 text-sm">
                      <span style={{ color }} className="mt-0.5 shrink-0">◆</span>
                      {q}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-[#0d1428]">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-4xl font-light text-white mb-4"
            style={{ fontFamily: "var(--font-cormorant), serif" }}
          >
            Try it on Your Project
          </h2>
          <p className="text-slate-400 text-lg mb-8">
            Paste your project plan and see your SMILE scores in seconds. Free tier available — no account required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/analyze"
              className="px-8 py-4 rounded-xl bg-[#C9A84C] text-[#0a0f1e] font-bold text-lg hover:bg-[#e8c96a] transition-all hover:shadow-lg hover:shadow-[#C9A84C]/30"
            >
              Analyze Your Project
            </Link>
            <a
              href="https://calendly.com/futurecreation"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl border border-[#C9A84C]/40 text-[#C9A84C] font-semibold hover:bg-[#C9A84C]/10 transition-all"
            >
              Book a Consulting Session
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#C9A84C]/10 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <div className="text-white font-semibold mb-1" style={{ fontFamily: "var(--font-cormorant), serif" }}>
              S.M.I.L.E.
            </div>
            <div className="text-slate-500 text-sm">WINNIIO AB · Gothenburg, Sweden</div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <Link href="/" className="text-slate-400 hover:text-[#C9A84C] transition-colors">Home</Link>
            <Link href="/analyze" className="text-slate-400 hover:text-[#C9A84C] transition-colors">Analyze</Link>
            <a href="https://lifeatlas.online" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#C9A84C] transition-colors">Life Atlas</a>
            <a href="https://doi.org/10.5281/zenodo.19646374" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#C9A84C] transition-colors">Paper</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
