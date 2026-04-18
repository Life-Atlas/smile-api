"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import UploadZone from "@/components/UploadZone";
import ScoreCard from "@/components/ScoreCard";
import SmileRadar from "@/components/SmileRadar";
import PerspectivesRadar from "@/components/PerspectivesRadar";
import AestBar from "@/components/AestBar";
import FindingsList from "@/components/FindingsList";
import type { AnalysisResult } from "@/lib/mockAnalysis";

type Step = "idle" | "analyzing" | "done" | "error";

const DOMAINS = [
  "Healthcare",
  "Manufacturing",
  "Construction",
  "Smart Cities",
  "Agriculture",
  "Defence",
  "Education",
  "Genomics",
  "Other",
];

const NUDEDA_CONFIG: Record<string, { color: string; bg: string; border: string; desc: string }> = {
  Naive:         { color: "text-red-400",    bg: "bg-red-500/10",     border: "border-red-500/30",    desc: "No awareness of digital twin potential" },
  Unarticulated: { color: "text-orange-400", bg: "bg-orange-500/10",  border: "border-orange-500/30", desc: "Potential exists but is unrecognised" },
  Dependent:     { color: "text-amber-400",  bg: "bg-amber-500/10",   border: "border-amber-500/30",  desc: "Relies on external tools without integration strategy" },
  Articulated:   { color: "text-[#C9A84C]",  bg: "bg-[#C9A84C]/10",  border: "border-[#C9A84C]/30",  desc: "Clear DT vision with partial implementation" },
  Explicit:      { color: "text-emerald-400",bg: "bg-emerald-500/10", border: "border-emerald-500/30",desc: "Full DT lifecycle — living, learning system" },
};

const ANALYSIS_STEPS = [
  { id: "ingest",      label: "Ingesting project plan",                icon: "↑" },
  { id: "re",          label: "Phase 1: Reality Emulation scan",        icon: "◉" },
  { id: "ce",          label: "Phase 2: Concurrent Engineering scan",   icon: "⟷" },
  { id: "ci",          label: "Phase 3: Collective Intelligence scan",  icon: "⬡" },
  { id: "cx",          label: "Phase 4: Contextual Intelligence scan",  icon: "◆" },
  { id: "cn",          label: "Phase 5: Continuous Intelligence scan",  icon: "⧗" },
  { id: "pw",          label: "Phase 6: Perpetual Wisdom scan",         icon: "★" },
  { id: "aest",        label: "AEST temporal analysis",                 icon: "⊕" },
  { id: "perspectives",label: "Four Perspectives diamond",              icon: "△" },
  { id: "nudeda",      label: "NUDEDA maturity assessment",             icon: "≡" },
  { id: "report",      label: "Generating transformation roadmap",      icon: "⟳" },
];

function AnalysisProgress({ currentStep }: { currentStep: number }) {
  return (
    <div className="glass rounded-2xl p-8 border border-[#C9A84C]/20 max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-8 h-8 rounded-full border-2 border-[#C9A84C] border-t-transparent animate-spin" aria-hidden="true" />
        <h2 className="text-white font-bold text-xl">Analyzing your project...</h2>
      </div>

      <div className="space-y-4" role="list" aria-label="Analysis progress">
        {ANALYSIS_STEPS.map((step, i) => {
          const isDone    = i < currentStep;
          const isActive  = i === currentStep;
          const isPending = i > currentStep;

          return (
            <div
              key={step.id}
              className={`flex items-center gap-3 transition-all duration-500 ${isPending ? "opacity-40" : ""}`}
              role="listitem"
              aria-label={`${step.label}: ${isDone ? "complete" : isActive ? "in progress" : "pending"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 transition-all duration-300 ${
                  isDone
                    ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-400"
                    : isActive
                    ? "bg-[#C9A84C]/20 border border-[#C9A84C]/40 text-[#C9A84C]"
                    : "bg-slate-800 border border-slate-700 text-slate-600"
                }`}
                aria-hidden="true"
              >
                {isDone ? "✓" : isActive ? <span className="animate-pulse">{step.icon}</span> : step.icon}
              </div>
              <span className={`text-sm font-medium ${isDone ? "text-emerald-400" : isActive ? "text-white" : "text-slate-500"}`}>
                {step.label}
              </span>
              {isActive && (
                <span className="ml-auto flex gap-1" aria-hidden="true">
                  {[0, 1, 2].map((d) => (
                    <span key={d} className="w-1 h-1 rounded-full bg-[#C9A84C] animate-bounce" style={{ animationDelay: `${d * 0.15}s` }} />
                  ))}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#a07830] via-[#C9A84C] to-[#e8c96a] rounded-full transition-all duration-700"
          style={{ width: `${Math.round((currentStep / (ANALYSIS_STEPS.length - 1)) * 100)}%` }}
          role="progressbar"
          aria-valuenow={Math.round((currentStep / (ANALYSIS_STEPS.length - 1)) * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}

function ScoreGauge({ score }: { score: number }) {
  const color = score >= 75 ? "#10b981" : score >= 55 ? "#C9A84C" : score >= 35 ? "#f59e0b" : "#ef4444";
  const label = score >= 75 ? "SMILE-Ready" : score >= 55 ? "Developing" : score >= 35 ? "Emerging" : "Needs Alignment";
  const circumference = 2 * Math.PI * 54;
  const dashOffset = circumference - (score / 100) * circumference;

  return (
    <div className="glass rounded-2xl p-8 border border-[#C9A84C]/20 flex flex-col items-center">
      <h3 className="text-white font-semibold text-lg mb-6">Overall SMILE Readiness</h3>
      <div className="relative w-36 h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(201,168,76,0.1)" strokeWidth="8" />
          <circle
            cx="60" cy="60" r="54"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            style={{ transition: "stroke-dashoffset 1.5s ease-out" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold" style={{ color }}>{score}</span>
          <span className="text-slate-500 text-xs">/100</span>
        </div>
      </div>
      <div className="mt-4 px-4 py-1.5 rounded-full text-sm font-semibold" style={{ backgroundColor: `${color}20`, color }}>
        {label}
      </div>
    </div>
  );
}

export default function AnalyzePage() {
  const [projectText, setProjectText]   = useState("");
  const [domain, setDomain]             = useState("Construction");
  const [step, setStep]                 = useState<Step>("idle");
  const [analysisStep, setAnalysisStep] = useState(0);
  const [result, setResult]             = useState<AnalysisResult | null>(null);
  const [error, setError]               = useState<string | null>(null);

  const handleFileSelect = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setProjectText(text.slice(0, 4000));
    };
    reader.readAsText(file);
  }, []);

  const handleAnalyze = useCallback(async () => {
    if (!projectText.trim()) {
      setError("Please paste your project plan or upload a file.");
      return;
    }
    setError(null);
    setStep("analyzing");
    setAnalysisStep(0);

    // Simulate step-by-step progress
    for (let i = 0; i < ANALYSIS_STEPS.length - 1; i++) {
      await new Promise((r) => setTimeout(r, 280 + Math.random() * 200));
      setAnalysisStep(i + 1);
    }

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: projectText, domain, tier: "free" }),
      });

      if (!res.ok) throw new Error("Analysis request failed");

      const data = await res.json() as AnalysisResult;
      setResult(data);
      setStep("done");
    } catch {
      setStep("error");
      setError("Analysis failed. Please try again.");
    }
  }, [projectText, domain]);

  const reset = () => {
    setStep("idle");
    setResult(null);
    setError(null);
    setProjectText("");
    setAnalysisStep(0);
  };

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
            <Link href="/methodology" className="text-slate-400 hover:text-white text-sm transition-colors hidden md:block">
              Methodology
            </Link>
            <Link href="/#pricing" className="text-slate-400 hover:text-white text-sm transition-colors hidden md:block">
              Pricing
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* HEADER */}
        <div className="text-center mb-12">
          <h1
            className="text-4xl md:text-5xl font-light text-white mb-4"
            style={{ fontFamily: "var(--font-cormorant), serif" }}
          >
            Analyze Your <span className="gradient-text-gold">Project</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Paste your project plan below. SMILE will score it across 6 phases, 4 perspectives, and the AEST temporal model — and show you how to transform it into a digital twin.
          </p>
        </div>

        {/* INPUT FORM */}
        {step === "idle" && (
          <div className="space-y-6">
            {/* Text area */}
            <div className="glass rounded-2xl p-6 border border-[#C9A84C]/20">
              <label htmlFor="project-text" className="block text-white font-semibold mb-3">
                Project Plan
                <span className="text-slate-500 font-normal text-sm ml-2">(paste text or upload a file below)</span>
              </label>
              <textarea
                id="project-text"
                value={projectText}
                onChange={(e) => setProjectText(e.target.value)}
                rows={10}
                placeholder="Paste your project plan, proposal, brief, or description here...&#10;&#10;Example: 'This project aims to build a new community healthcare centre in... The main objectives are... The stakeholders include... The timeline spans...'&#10;&#10;The more detail you provide, the more accurate the SMILE analysis."
                className="w-full bg-transparent text-slate-200 placeholder-slate-600 text-sm leading-relaxed resize-none outline-none border-none"
              />
              <div className="mt-3 flex items-center justify-between text-xs text-slate-600">
                <span>{projectText.length} characters</span>
                <span>Recommended: 200+ characters for accurate scoring</span>
              </div>
            </div>

            {/* File upload */}
            <UploadZone
              onFileSelect={handleFileSelect}
              acceptTypes=".pdf,.txt,.doc,.docx,.md"
              acceptLabel="PDF, TXT, DOC, DOCX, MD"
            />

            {/* Domain selector */}
            <div className="glass rounded-2xl p-6 border border-[#C9A84C]/20">
              <label className="block text-white font-semibold mb-4">
                Industry / Domain
                <span className="text-slate-500 font-normal text-sm ml-2">(improves scoring precision)</span>
              </label>
              <div className="flex flex-wrap gap-3">
                {DOMAINS.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDomain(d)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      domain === d
                        ? "bg-[#C9A84C] text-[#0a0f1e]"
                        : "bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl p-4" role="alert">
                <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}

            <button
              onClick={handleAnalyze}
              disabled={!projectText.trim()}
              className="w-full py-4 rounded-xl bg-[#C9A84C] text-[#0a0f1e] font-bold text-lg hover:bg-[#e8c96a] transition-all hover:shadow-lg hover:shadow-[#C9A84C]/30 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Analyze with SMILE
            </button>

            <p className="text-center text-slate-600 text-xs">
              Free tier: 3 findings shown. Upgrade to Pro for full report + DT transformation roadmap.
            </p>
          </div>
        )}

        {/* PROGRESS */}
        {step === "analyzing" && (
          <div className="flex items-center justify-center py-12">
            <AnalysisProgress currentStep={analysisStep} />
          </div>
        )}

        {/* ERROR */}
        {step === "error" && (
          <div className="text-center py-16">
            <div className="text-red-400 text-5xl mb-4" aria-hidden="true">✕</div>
            <h2 className="text-white text-xl font-semibold mb-2">Analysis Failed</h2>
            <p className="text-slate-400 mb-8">{error}</p>
            <button onClick={reset} className="px-6 py-3 rounded-xl bg-[#C9A84C] text-[#0a0f1e] font-semibold hover:bg-[#e8c96a] transition-all">
              Try Again
            </button>
          </div>
        )}

        {/* RESULTS */}
        {step === "done" && result && (
          <div className="space-y-8 animate-fade-in">
            {/* Top actions */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2
                  className="text-2xl font-light text-white"
                  style={{ fontFamily: "var(--font-cormorant), serif" }}
                >
                  SMILE Analysis — <span className="gradient-text-gold">{result.domain}</span>
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  Analyzed {new Date(result.analyzedAt).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={reset}
                  className="px-4 py-2 rounded-lg border border-[#C9A84C]/30 text-[#C9A84C] text-sm font-medium hover:bg-[#C9A84C]/10 transition-all"
                >
                  New Analysis
                </button>
                <a
                  href="https://calendly.com/futurecreation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-[#C9A84C] text-[#0a0f1e] text-sm font-semibold hover:bg-[#e8c96a] transition-all"
                >
                  Book Consulting
                </a>
              </div>
            </div>

            {/* Gauge + NUDEDA */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ScoreGauge score={result.score} />

              <div className="glass rounded-2xl p-8 border border-[#C9A84C]/20 flex flex-col justify-center">
                <h3 className="text-white font-semibold text-lg mb-2">NUDEDA Maturity</h3>
                <p className="text-slate-400 text-sm mb-6">Where does this project sit on the digital twin maturity ladder?</p>
                <div className="space-y-2">
                  {["Naive", "Unarticulated", "Dependent", "Articulated", "Explicit"].map((level, i) => {
                    const cfg = NUDEDA_CONFIG[level];
                    const isActive = level === result.nudeda;
                    return (
                      <div
                        key={level}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all ${
                          isActive ? `${cfg.bg} ${cfg.border}` : "border-transparent opacity-40"
                        }`}
                      >
                        <div className={`w-2 h-2 rounded-full shrink-0 ${isActive ? cfg.color.replace("text-", "bg-") : "bg-slate-600"}`} />
                        <span className={`text-sm font-semibold ${isActive ? cfg.color : "text-slate-500"}`}>{level}</span>
                        {isActive && <span className="text-slate-400 text-xs ml-2">{cfg.desc}</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* SMILE Radar + Perspectives */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SmileRadar data={result.smile} />
              <PerspectivesRadar data={result.perspectives} />
            </div>

            {/* AEST */}
            <AestBar data={result.aest} />

            {/* Phase scores */}
            <div>
              <h3
                className="text-xl font-light text-white mb-6"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                Phase-by-Phase Scores
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { key: "RE" as const, label: "Reality Emulation",      desc: "Live modeling of physical reality",     delay: 0 },
                  { key: "CE" as const, label: "Concurrent Engineering",  desc: "Parallel design-build-learn loops",     delay: 100 },
                  { key: "CI" as const, label: "Collective Intelligence", desc: "Cross-actor knowledge sharing",         delay: 200 },
                  { key: "CX" as const, label: "Contextual Intelligence", desc: "Spatial, temporal, domain awareness",   delay: 300 },
                  { key: "CN" as const, label: "Continuous Intelligence", desc: "Real-time feedback and adaptation",     delay: 400 },
                  { key: "PW" as const, label: "Perpetual Wisdom",        desc: "Post-project knowledge reuse",          delay: 500 },
                ].map(({ key, label, desc, delay }) => (
                  <ScoreCard
                    key={key}
                    label={label}
                    score={result.smile[key]}
                    maxScore={5}
                    description={desc}
                    color={result.smile[key] >= 3.5 ? "green" : result.smile[key] >= 2.5 ? "gold" : "red"}
                    delay={delay}
                  />
                ))}
              </div>
            </div>

            {/* Findings */}
            <div>
              <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                <h3
                  className="text-xl font-light text-white"
                  style={{ fontFamily: "var(--font-cormorant), serif" }}
                >
                  Findings
                </h3>
                {result.findings.length < 8 && (
                  <div className="text-slate-500 text-sm bg-slate-800 px-3 py-1.5 rounded-lg">
                    Free tier — showing {result.findings.length} of 8 findings.{" "}
                    <Link href="/#pricing" className="text-[#C9A84C] hover:underline">Upgrade for full report</Link>
                  </div>
                )}
              </div>
              <FindingsList findings={result.findings} />
            </div>

            {/* Suggestions */}
            <div className="glass rounded-2xl p-8 border border-[#C9A84C]/20">
              <h3
                className="text-xl font-light text-white mb-6"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                Revision Suggestions
              </h3>
              <div className="space-y-3">
                {result.suggestions.map((suggestion, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-[#C9A84C]/5 border border-[#C9A84C]/15 rounded-xl">
                    <div className="w-6 h-6 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/30 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-[#C9A84C] text-xs font-bold">{i + 1}</span>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">{suggestion}</p>
                  </div>
                ))}
                {result.suggestions.length < 10 && (
                  <div className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl text-center">
                    <p className="text-slate-500 text-sm">
                      {10 - result.suggestions.length} more suggestions available in Pro.{" "}
                      <Link href="/#pricing" className="text-[#C9A84C] hover:underline">Upgrade</Link>
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* DT Transformation */}
            <div className="glass rounded-2xl p-8 border border-[#C9A84C]/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#C9A84C]/5 to-transparent pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#C9A84C]/15 border border-[#C9A84C]/30 flex items-center justify-center shrink-0">
                    <span className="text-[#C9A84C] text-xl">⬡</span>
                  </div>
                  <div>
                    <h3
                      className="text-xl font-light text-white"
                      style={{ fontFamily: "var(--font-cormorant), serif" }}
                    >
                      How to Make This a Digital Twin Project
                    </h3>
                    <p className="text-slate-400 text-sm mt-1">Your personalized DT transformation roadmap</p>
                  </div>
                </div>
                <p className="text-slate-300 leading-relaxed">{result.dtTransformation}</p>

                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://calendly.com/futurecreation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl bg-[#C9A84C] text-[#0a0f1e] font-bold text-sm hover:bg-[#e8c96a] transition-all hover:shadow-lg hover:shadow-[#C9A84C]/30"
                  >
                    Book Consulting Session — EUR 500
                  </a>
                  <Link
                    href="/#pricing"
                    className="px-6 py-3 rounded-xl border border-[#C9A84C]/30 text-[#C9A84C] text-sm font-semibold hover:bg-[#C9A84C]/10 transition-all"
                  >
                    Get Full Report with Pro
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
