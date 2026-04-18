"use client";

import { useEffect, useRef, useState } from "react";

interface AestData {
  absorb: number;
  emulate: number;
  simulate: number;
  transcend: number;
}

interface AestBarProps {
  data: AestData;
}

const BARS = [
  { key: "absorb"    as const, label: "Absorb",    time: "Past",    color: "#C9A84C", bg: "bg-[#C9A84C]/10", border: "border-[#C9A84C]/20", textColor: "text-[#C9A84C]" },
  { key: "emulate"   as const, label: "Emulate",   time: "Present", color: "#e8c96a", bg: "bg-[#e8c96a]/10", border: "border-[#e8c96a]/20", textColor: "text-[#e8c96a]" },
  { key: "simulate"  as const, label: "Simulate",  time: "Future",  color: "#06b6d4", bg: "bg-cyan-500/10",  border: "border-cyan-500/20",  textColor: "text-cyan-400"  },
  { key: "transcend" as const, label: "Transcend", time: "Beyond",  color: "#8b5cf6", bg: "bg-violet-500/10",border: "border-violet-500/20",textColor: "text-violet-400"},
];

function getScoreLabel(val: number): string {
  if (val >= 4) return "Strong";
  if (val >= 3) return "Acceptable";
  if (val >= 2) return "Weak";
  return "Critical Gap";
}

export default function AestBar({ data }: AestBarProps) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setAnimated(true), 200);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="glass rounded-2xl p-6 border border-[#C9A84C]/20">
      <h3 className="text-white font-semibold text-lg mb-1">AEST Temporal Analysis</h3>
      <p className="text-slate-400 text-sm mb-6">
        Does the project operate across all four temporal registers?
      </p>

      <div className="space-y-5">
        {BARS.map(({ key, label, time, color, bg, border, textColor }, i) => {
          const val = Math.min(Math.max(data[key] ?? 3, 0), 5);
          const pct = (val / 5) * 100;
          const scoreLabel = getScoreLabel(val);

          return (
            <div key={key}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
                  <span className="text-white text-sm font-semibold">{label}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${bg} ${border} ${textColor}`}>
                    {time}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 text-xs">{scoreLabel}</span>
                  <span className={`text-sm font-bold ${textColor}`}>{val}/5</span>
                </div>
              </div>
              <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: animated ? `${pct}%` : "0%",
                    backgroundColor: color,
                    transitionDelay: `${i * 120}ms`,
                  }}
                  role="progressbar"
                  aria-valuenow={val}
                  aria-valuemin={0}
                  aria-valuemax={5}
                  aria-label={`${label}: ${val} out of 5`}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-slate-600 text-xs">Past</span>
        <div className="flex-1 mx-3 h-px bg-gradient-to-r from-[#C9A84C]/30 via-[#e8c96a]/30 via-cyan-500/30 to-violet-500/30" />
        <span className="text-slate-600 text-xs">Beyond</span>
      </div>
    </div>
  );
}
