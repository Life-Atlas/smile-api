import { MOCK_CONSTRUCTION_ANALYSIS, DOMAIN_SCORE_ADJUSTMENTS } from "@/lib/mockAnalysis";
import type { AnalysisResult, SmileScores } from "@/lib/mockAnalysis";

export async function POST(request: Request) {
  try {
    const body = await request.json() as { text?: string; domain?: string; tier?: string };

    const { domain = "Construction", tier = "free" } = body;

    // Simulate analysis delay (300-800ms)
    await new Promise((resolve) => setTimeout(resolve, 300 + Math.random() * 500));

    const base = { ...MOCK_CONSTRUCTION_ANALYSIS };
    const adjustments = DOMAIN_SCORE_ADJUSTMENTS[domain] ?? {};

    // Apply domain-specific adjustments to smile scores
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
      // Free tier gets partial results
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
