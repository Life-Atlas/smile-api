import { ApolloServer } from "@apollo/server";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------

const typeDefs = `#graphql
  type Query {
    methodology: SmileMethodology!
    phase(id: String!): SmilePhase
    analyze(text: String!, domain: String): SmileAnalysis!
  }

  type SmileMethodology {
    phases: [SmilePhase!]!
    perspectives: [String!]!
    aest: [String!]!
    version: String!
    paperDoi: String!
  }

  type SmilePhase {
    id: String!
    name: String!
    description: String!
    entryCriteria: [String!]!
    exitCriteria: [String!]!
    spinQuestions: [String!]!
  }

  type SmileAnalysis {
    overallScore: Float!
    smile: SmileScores!
    aest: AestScores!
    nudeda: String!
    perspectives: PerspectiveScores!
    findings: [Finding!]!
    suggestions: [String!]!
  }

  type SmileScores {
    RE: Float!
    CE: Float!
    CI: Float!
    CX: Float!
    CN: Float!
    PW: Float!
  }

  type AestScores {
    absorb: Float!
    emulate: Float!
    simulate: Float!
    transcend: Float!
  }

  type PerspectiveScores {
    people: Float!
    systems: Float!
    planet: Float!
    ai: Float!
  }

  type Finding {
    id: String!
    title: String!
    description: String!
    severity: String!
    layer: String!
    recommendation: String
    antiPattern: String
  }
`;

// ---------------------------------------------------------------------------
// Static methodology data
// ---------------------------------------------------------------------------

const PHASES = [
  {
    id: "RE",
    name: "Reality Emulation",
    description:
      "Continuously capture and represent the physical reality through sensors, IoT, and data feeds to maintain a living digital model.",
    entryCriteria: ["Physical system or process identified", "Data sources enumerated"],
    exitCriteria: ["Live data feed established", "Digital model updates within defined latency"],
    spinQuestions: [
      "What sensors or data sources reflect the current state of reality?",
      "How frequently does the digital model synchronise with the physical?",
      "What aspects of reality are currently invisible to the system?",
    ],
  },
  {
    id: "CE",
    name: "Concurrent Engineering",
    description:
      "Run design, development, and deployment workstreams in parallel, informed by a shared model, eliminating sequential bottlenecks.",
    entryCriteria: ["Shared model accessible to all teams", "Cross-functional ownership defined"],
    exitCriteria: [
      "Zero handoff latency between workstreams",
      "Shared model is the single source of truth",
    ],
    spinQuestions: [
      "Which workstreams are currently sequential that could run in parallel?",
      "Does a single shared model drive all teams' decisions?",
      "How long does a design change take to reach procurement or operations?",
    ],
  },
  {
    id: "CI",
    name: "Collective Intelligence",
    description:
      "Aggregate knowledge from humans, systems, and the environment into a computable shared intelligence layer.",
    entryCriteria: ["Knowledge capture protocols defined", "Taxonomy established"],
    exitCriteria: [
      "Cross-actor knowledge is searchable and queryable",
      "Insights flow automatically between actors",
    ],
    spinQuestions: [
      "Where does institutional knowledge currently die at project end?",
      "How do non-human actants (machines, environment) contribute knowledge?",
      "Is there a computable knowledge graph for this domain?",
    ],
  },
  {
    id: "CX",
    name: "Contextual Intelligence",
    description:
      "Ingest and interpret contextual signals (environmental, social, market) to adapt system behaviour dynamically.",
    entryCriteria: ["External data sources identified", "Context model defined"],
    exitCriteria: [
      "System adapts behaviour based on contextual signals",
      "Context is versioned and queryable",
    ],
    spinQuestions: [
      "What external signals (weather, market, policy) affect system performance?",
      "How does the system currently respond to unexpected context changes?",
      "Is context data captured and stored for retrospective analysis?",
    ],
  },
  {
    id: "CN",
    name: "Continuous Intelligence",
    description:
      "Maintain persistent feedback loops that allow the system to learn, adapt, and improve without human intervention.",
    entryCriteria: ["Feedback loop architecture defined", "Metrics and thresholds established"],
    exitCriteria: [
      "System self-corrects within defined parameters",
      "Performance improves measurably over time",
    ],
    spinQuestions: [
      "What feedback loops currently exist and at what frequency?",
      "Which decisions still require human approval that could be automated?",
      "How does the system learn from anomalies and failures?",
    ],
  },
  {
    id: "PW",
    name: "Perpetual Wisdom",
    description:
      "Encode and transfer institutional knowledge across projects, organisations, and time — making intelligence cumulative rather than ephemeral.",
    entryCriteria: ["Knowledge archiving protocol defined", "Reuse pathways identified"],
    exitCriteria: [
      "Future projects can query this project's knowledge",
      "At least one transferable methodology artefact produced",
    ],
    spinQuestions: [
      "What does the world know after this project that it did not know before?",
      "How is knowledge archived so future projects can query it?",
      "What is the Knowledge Transcendence Package for this project?",
    ],
  },
];

// ---------------------------------------------------------------------------
// Resolvers
// ---------------------------------------------------------------------------

interface AnalyzeArgs { text: string; domain?: string }
interface PhaseArgs { id: string }

interface ClaudeApiResponse {
  content: Array<{ type: string; text?: string }>;
}

async function runClaudeAnalysis(text: string, domain: string) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey || text.trim().length <= 20) return null;

  try {
    const resp = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 2048,
        system:
          "Return only raw JSON (no markdown fences) with keys: overallScore (0-100), smile {RE,CE,CI,CX,CN,PW each 0-5}, aest {absorb,emulate,simulate,transcend each 0-5}, nudeda (Naive|Unarticulated|Dependent|Articulated|Explicit), perspectives {people,systems,planet,ai each 0-5}, findings [{id,title,description,severity,layer,recommendation,antiPattern}], suggestions [].",
        messages: [{ role: "user", content: `Domain: ${domain}\n\n${text}` }],
      }),
    });
    if (!resp.ok) return null;
    const data = (await resp.json()) as ClaudeApiResponse;
    const raw = data.content.find((c) => c.type === "text")?.text ?? "";
    const cleaned = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```\s*$/i, "").trim();
    return JSON.parse(cleaned);
  } catch {
    return null;
  }
}

const resolvers = {
  Query: {
    methodology: () => ({
      phases: PHASES,
      perspectives: ["People", "Systems", "Planet", "AI"],
      aest: ["Absorb", "Emulate", "Simulate", "Transcend"],
      version: "2.1",
      paperDoi: "10.1007/978-3-031-46452-2_13",
    }),

    phase: (_: unknown, { id }: PhaseArgs) =>
      PHASES.find((p) => p.id === id) ?? null,

    analyze: async (_: unknown, { text, domain }: AnalyzeArgs) => {
      const resolvedDomain = domain ?? "General";
      const aiResult = await runClaudeAnalysis(text, resolvedDomain);
      if (aiResult) return aiResult;

      // Fallback mock
      return {
        overallScore: 45,
        smile: { RE: 1.8, CE: 2.4, CI: 1.5, CX: 2.8, CN: 1.2, PW: 1.6 },
        aest: { absorb: 3.2, emulate: 1.8, simulate: 1.4, transcend: 0.9 },
        nudeda: "Dependent",
        perspectives: { people: 2.1, systems: 2.8, planet: 3.4, ai: 0.8 },
        findings: [
          {
            id: "f1",
            title: "No live data integration",
            description: "The project operates on static documents with no real-time data feed.",
            severity: "critical",
            layer: "SMILE Phase 1 — Reality Emulation",
            recommendation: "Introduce IoT sensors and a live BIM model.",
            antiPattern: "Static-Plan Fallacy",
          },
        ],
        suggestions: [
          "Add IoT sensor plan",
          "Connect BIM to procurement",
          "Define weekly knowledge-logging",
          "Run pre-build simulation scenarios",
        ],
      };
    },
  },
};

// ---------------------------------------------------------------------------
// Apollo server — lazy singleton
// ---------------------------------------------------------------------------

let server: ApolloServer | null = null;

function getServer(): ApolloServer {
  if (!server) {
    server = new ApolloServer({ typeDefs, resolvers });
  }
  return server;
}

// ---------------------------------------------------------------------------
// Next.js route handlers
// ---------------------------------------------------------------------------

async function handleGraphQL(request: NextRequest): Promise<NextResponse> {
  const srv = getServer();

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ errors: [{ message: "Invalid JSON body" }] }, { status: 400 });
  }

  const { query, variables, operationName } = body as {
    query?: string;
    variables?: Record<string, unknown>;
    operationName?: string;
  };

  if (!query) {
    return NextResponse.json({ errors: [{ message: "Missing 'query' field" }] }, { status: 400 });
  }

  const result = await srv.executeOperation({
    query,
    variables: variables ?? {},
    operationName,
  });

  return NextResponse.json(result.body);
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  // Introspection / playground info via GET with ?query=...
  const { searchParams } = request.nextUrl;
  const query = searchParams.get("query");
  if (!query) {
    return NextResponse.json({
      endpoint: "/api/graphql",
      method: "POST",
      contentType: "application/json",
      body: { query: "string (required)", variables: "object (optional)", operationName: "string (optional)" },
      exampleQueries: {
        methodology: "{ methodology { version paperDoi perspectives aest phases { id name } } }",
        phase: '{ phase(id: "RE") { name description spinQuestions } }',
        analyze: '{ analyze(text: "...", domain: "Construction") { overallScore smile { RE CE CI CX CN PW } } }',
      },
    });
  }

  // Forward GET introspection queries to execute
  const syntheticReq = new NextRequest(request.url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query }),
  });
  return handleGraphQL(syntheticReq);
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  return handleGraphQL(request);
}
