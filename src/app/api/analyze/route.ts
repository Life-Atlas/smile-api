import { MOCK_CONSTRUCTION_ANALYSIS, DOMAIN_SCORE_ADJUSTMENTS } from "@/lib/mockAnalysis";
import type { AnalysisResult, SmileScores } from "@/lib/mockAnalysis";

export const runtime = "nodejs";

// ---------------------------------------------------------------------------
// Claude API response types
// ---------------------------------------------------------------------------

interface ClaudeContent {
  type: string;
  text?: string;
}

interface ClaudeResponse {
  content: ClaudeContent[];
}

// ---------------------------------------------------------------------------
// Real analysis via Claude
// ---------------------------------------------------------------------------

async function analyzeWithClaude(
  projectText: string,
  domain: string,
  tier: string,
  apiKey: string,
): Promise<AnalysisResult> {
  const system = `You are the SMILE methodology evaluator. Analyze the following project text and return a JSON object — no markdown, no code fences, just raw JSON — matching this exact TypeScript interface:

{
  score: number;           // 0-100 overall readiness
  smile: {
    RE: number;  // Reality Emulation 0-5
    CE: number;  // Concurrent Engineering 0-5
    CI: number;  // Collective Intelligence 0-5
    CX: number;  // Contextual Intelligence 0-5
    CN: number;  // Continuous Intelligence 0-5
    PW: number;  // Perpetual Wisdom 0-5
  };
  aest: {
    absorb: number;    // 0-5
    emulate: number;   // 0-5
    simulate: number;  // 0-5
    transcend: number; // 0-5
  };
  nudeda: "Naive" | "Unarticulated" | "Dependent" | "Articulated" | "Explicit";
  perspectives: {
    people: number;   // 0-5
    systems: number;  // 0-5
    planet: number;   // 0-5
    ai: number;       // 0-5
  };
  findings: Array<{
    id: string;
    title: string;
    description: string;
    severity: "critical" | "major" | "minor" | "info";
    layer: string;
    recommendation?: string;
    antiPattern?: string;
    pageRef?: string;
  }>;
  suggestions: string[];
  dtTransformation: string;
  domain: string;
  analyzedAt: string;
}

Score each SMILE phase 0-5 where 0=absent, 5=exemplary digital twin implementation. Return exactly 5-8 findings ordered by severity descending. The dtTransformation field must explain concretely how this project could become a digital twin project.`;

  const userMessage = `Domain: ${domain}\nTier: ${tier}\n\nProject text:\n${projectText}`;

  const resp = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      system,
      messages: [{ role: "user", content: userMessage }],
    }),
  });

  if (!resp.ok) {
    throw new Error(`Claude API error: ${resp.status}`);
  }

  const claudeData = (await resp.json()) as ClaudeResponse;
  const rawText = claudeData.content.find((c) => c.type === "text")?.text ?? "";

  // Strip any accidental markdown fences
  const cleaned = rawText.replace(/^```(?:json)?\s*/i, "").replace(/\s*```\s*$/i, "").trim();
  const parsed = JSON.parse(cleaned) as AnalysisResult;

  // Always stamp current time
  parsed.analyzedAt = new Date().toISOString();
  parsed.domain = domain;

  return parsed;
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { text?: string; domain?: string; tier?: string };
    const { text: projectText = "", domain = "Construction", tier = "free" } = body;

    const apiKey = process.env.ANTHROPIC_API_KEY;
    const useRealAI = Boolean(apiKey) && tier !== "free" && projectText.trim().length > 20;

    if (useRealAI) {
      try {
        const result = await analyzeWithClaude(projectText, domain, tier, apiKey!);

        // Free-tier caps still enforced server-side regardless of AI path
        if (tier === "free") {
          result.findings = result.findings.slice(0, 3);
          result.suggestions = result.suggestions.slice(0, 4);
          result.dtTransformation =
            "Upgrade to Pro to see the full Digital Twin transformation roadmap for your project.";
        }

        return Response.json(result);
      } catch (aiErr) {
        // Fall through to mock on any Claude failure
        console.error("Claude analysis failed, falling back to mock:", aiErr);
      }
    }

    // ----- Mock path -----
    await new Promise((resolve) => setTimeout(resolve, 300 + Math.random() * 500));

    const base = { ...MOCK_CONSTRUCTION_ANALYSIS };
    const adjustments = DOMAIN_SCORE_ADJUSTMENTS[domain] ?? {};

    const adjustedSmile: SmileScores = { ...base.smile };
    for (const [key, delta] of Object.entries(adjustments)) {
      const k = key as keyof SmileScores;
      adjustedSmile[k] = Math.min(5, adjustedSmile[k] + delta);
    }

    const result: AnalysisResult = {
      ...base,
      domain,
      smile: adjustedSmile,
      analyzedAt: new Date().toISOString(),
      findings: tier === "free" ? base.findings.slice(0, 3) : base.findings,
      suggestions: tier === "free" ? base.suggestions.slice(0, 4) : base.suggestions,
      dtTransformation:
        tier === "free"
          ? "Upgrade to Pro to see the full Digital Twin transformation roadmap for your project."
          : base.dtTransformation,
    };

    return Response.json(result);
  } catch {
    return Response.json({ error: "Analysis failed. Please try again." }, { status: 500 });
  }
}
