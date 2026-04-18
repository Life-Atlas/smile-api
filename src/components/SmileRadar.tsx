"use client";

import { useEffect, useRef, useState } from "react";

interface SmileData {
  RE: number;
  CE: number;
  CI: number;
  CX: number;
  CN: number;
  PW: number;
}

interface SmileRadarProps {
  data: SmileData;
  size?: number;
}

const SMILE_LABELS: { key: keyof SmileData; label: string; full: string; color: string }[] = [
  { key: "RE", label: "RE", full: "Reality Emulation",      color: "#C9A84C" },
  { key: "CE", label: "CE", full: "Concurrent Engineering",  color: "#e8c96a" },
  { key: "CI", label: "CI", full: "Collective Intelligence", color: "#10b981" },
  { key: "CX", label: "CX", full: "Contextual Intelligence", color: "#06b6d4" },
  { key: "CN", label: "CN", full: "Continuous Intelligence", color: "#8b5cf6" },
  { key: "PW", label: "PW", full: "Perpetual Wisdom",        color: "#f59e0b" },
];

function polarToCart(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export default function SmileRadar({ data, size = 300 }: SmileRadarProps) {
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

  const cx = size / 2;
  const cy = size / 2;
  const maxR = size * 0.38;
  const numAxes = 6;
  const numRings = 5;
  const angles = Array.from({ length: numAxes }, (_, i) => (360 / numAxes) * i);

  const rings = Array.from({ length: numRings }, (_, i) => {
    const r = (maxR * (i + 1)) / numRings;
    const points = angles
      .map((a) => { const p = polarToCart(cx, cy, r, a); return `${p.x},${p.y}`; })
      .join(" ");
    return { r, points };
  });

  const dataValues = SMILE_LABELS.map(({ key }) => Math.min(Math.max(data[key] ?? 3, 0), 5));

  const dataPoints = angles.map((a, i) => {
    const r = animated ? (dataValues[i] / 5) * maxR : 0;
    return polarToCart(cx, cy, r, a);
  });

  const dataPath =
    dataPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ") + " Z";

  const labelPositions = angles.map((a) => polarToCart(cx, cy, maxR + 24, a));

  return (
    <div ref={ref} className="glass rounded-2xl p-6 border border-[#C9A84C]/20">
      <h3 className="text-white font-semibold text-lg mb-1">S.M.I.L.E. Radar</h3>
      <p className="text-slate-400 text-sm mb-6">
        Sustainable Methodology for Impact Lifecycle Enablement — 6 phases
      </p>

      <div className="flex items-center justify-center">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="overflow-visible"
          aria-label="SMILE methodology radar chart"
          role="img"
        >
          {rings.map(({ points }, i) => (
            <polygon key={i} points={points} fill="none" stroke="rgba(201,168,76,0.15)" strokeWidth="1" />
          ))}
          {rings.map(({ r }, i) => (
            <text key={i} x={cx + 3} y={cy - r + 4} fill="rgba(148,163,184,0.5)" fontSize="9">{i + 1}</text>
          ))}
          {angles.map((a, i) => {
            const end = polarToCart(cx, cy, maxR, a);
            return <line key={i} x1={cx} y1={cy} x2={end.x} y2={end.y} stroke="rgba(201,168,76,0.2)" strokeWidth="1" />;
          })}
          <path
            d={dataPath}
            fill="rgba(201,168,76,0.15)"
            stroke="rgba(201,168,76,0.7)"
            strokeWidth="2"
            style={{ transition: "all 1s ease-out" }}
          />
          {dataPoints.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={4}
              fill={SMILE_LABELS[i].color}
              stroke="white"
              strokeWidth="1.5"
              style={{ transition: "all 1s ease-out" }}
            />
          ))}
          {labelPositions.map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r={14} fill={`${SMILE_LABELS[i].color}22`} />
              <text x={p.x} y={p.y} textAnchor="middle" dominantBaseline="central" fill={SMILE_LABELS[i].color} fontSize="12" fontWeight="700">
                {SMILE_LABELS[i].label}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4">
        {SMILE_LABELS.map(({ key, full, color }) => {
          const val = data[key] ?? 3;
          return (
            <div key={key} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
              <span className="text-slate-400 text-xs truncate">{full}</span>
              <span className="text-white text-xs font-semibold ml-auto">{val}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
