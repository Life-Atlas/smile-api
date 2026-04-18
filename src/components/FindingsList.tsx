"use client";

import { useState } from "react";

export type Severity = "critical" | "major" | "minor" | "info";

export interface Finding {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  layer: string;
  recommendation?: string;
  antiPattern?: string;
  pageRef?: string;
}

interface FindingsListProps {
  findings: Finding[];
  groupBy?: "severity" | "layer";
}

const severityConfig: Record<
  Severity,
  { label: string; color: string; bg: string; border: string; icon: string; order: number }
> = {
  critical: { label: "Critical", color: "text-red-400",    bg: "bg-red-500/10",    border: "border-red-500/30",    icon: "✕", order: 0 },
  major:    { label: "Major",    color: "text-amber-400",   bg: "bg-amber-500/10",  border: "border-amber-500/30",  icon: "⚠", order: 1 },
  minor:    { label: "Minor",    color: "text-[#C9A84C]",   bg: "bg-[#C9A84C]/10",  border: "border-[#C9A84C]/30",  icon: "◆", order: 2 },
  info:     { label: "Info",     color: "text-slate-400",   bg: "bg-slate-500/10",  border: "border-slate-500/20",  icon: "i", order: 3 },
};

function FindingItem({ finding }: { finding: Finding }) {
  const [expanded, setExpanded] = useState(false);
  const cfg = severityConfig[finding.severity];

  return (
    <div className={`${cfg.bg} border ${cfg.border} rounded-xl overflow-hidden transition-all duration-200`}>
      <button
        className="w-full text-left p-4 flex items-start gap-3 hover:bg-white/5 transition-colors"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <span className={`shrink-0 w-6 h-6 rounded-full ${cfg.bg} border ${cfg.border} flex items-center justify-center ${cfg.color} text-xs font-bold mt-0.5`}>
          {cfg.icon}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-white font-medium text-sm">{finding.title}</span>
            {finding.antiPattern && (
              <span className="text-xs px-2 py-0.5 rounded bg-slate-700/60 text-slate-300 font-mono">
                {finding.antiPattern}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className={`text-xs font-medium ${cfg.color}`}>{cfg.label}</span>
            <span className="text-slate-600 text-xs">·</span>
            <span className="text-slate-500 text-xs">{finding.layer}</span>
          </div>
        </div>
        <svg
          className={`shrink-0 w-4 h-4 text-slate-500 transition-transform mt-0.5 ${expanded ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {expanded && (
        <div className="px-4 pb-4 ml-9 space-y-3">
          <p className="text-slate-300 text-sm leading-relaxed">{finding.description}</p>
          {finding.recommendation && (
            <div className="bg-[#C9A84C]/10 border border-[#C9A84C]/20 rounded-lg p-3">
              <p className="text-xs font-semibold text-[#C9A84C] mb-1 uppercase tracking-wide">
                Recommendation
              </p>
              <p className="text-slate-300 text-sm leading-relaxed">{finding.recommendation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function groupFindings<K extends string>(
  findings: Finding[],
  keyFn: (f: Finding) => K
): Map<K, Finding[]> {
  const map = new Map<K, Finding[]>();
  for (const f of findings) {
    const k = keyFn(f);
    if (!map.has(k)) map.set(k, []);
    map.get(k)!.push(f);
  }
  return map;
}

export default function FindingsList({ findings, groupBy = "severity" }: FindingsListProps) {
  const [activeFilter, setActiveFilter] = useState<Severity | "all">("all");

  const filtered = activeFilter === "all" ? findings : findings.filter((f) => f.severity === activeFilter);

  const counts = {
    critical: findings.filter((f) => f.severity === "critical").length,
    major:    findings.filter((f) => f.severity === "major").length,
    minor:    findings.filter((f) => f.severity === "minor").length,
    info:     findings.filter((f) => f.severity === "info").length,
  };

  const grouped =
    groupBy === "severity"
      ? groupFindings(filtered, (f) => f.severity)
      : groupFindings(filtered, (f) => f.layer);

  const severityOrder: Severity[] = ["critical", "major", "minor", "info"];
  const sortedKeys =
    groupBy === "severity"
      ? (Array.from(grouped.keys()) as Severity[]).sort(
          (a, b) => severityConfig[a as Severity].order - severityConfig[b as Severity].order
        )
      : Array.from(grouped.keys()).sort();

  return (
    <div>
      <div className="flex items-center gap-2 flex-wrap mb-6">
        <button
          onClick={() => setActiveFilter("all")}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
            activeFilter === "all"
              ? "bg-[#C9A84C] text-[#0a0f1e]"
              : "bg-slate-800 text-slate-400 hover:text-white"
          }`}
        >
          All ({findings.length})
        </button>
        {severityOrder.map((s) =>
          counts[s] > 0 ? (
            <button
              key={s}
              onClick={() => setActiveFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeFilter === s
                  ? `${severityConfig[s].bg} ${severityConfig[s].color} border ${severityConfig[s].border}`
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {severityConfig[s].label} ({counts[s]})
            </button>
          ) : null
        )}
      </div>

      <div className="space-y-8">
        {sortedKeys.map((key) => {
          const items = grouped.get(key as Severity)!;
          const isSevirityGroup = groupBy === "severity";
          const cfg = isSevirityGroup ? severityConfig[key as Severity] : null;

          return (
            <section key={key}>
              <div className="flex items-center gap-3 mb-3">
                {cfg && (
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.color} border ${cfg.border}`}>
                    {cfg.label}
                  </span>
                )}
                {!cfg && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-700 text-slate-300">
                    {key}
                  </span>
                )}
                <span className="text-slate-600 text-xs">
                  {items.length} finding{items.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="space-y-2">
                {items.map((f) => <FindingItem key={f.id} finding={f} />)}
              </div>
            </section>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          <p className="text-4xl mb-3">✓</p>
          <p>No findings in this category.</p>
        </div>
      )}
    </div>
  );
}
