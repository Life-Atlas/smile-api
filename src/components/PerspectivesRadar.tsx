"use client";

import { useEffect, useRef, useState } from "react";

interface PerspectivesData {
  people: number;
  systems: number;
  planet: number;
  ai: number;
}

interface PerspectivesRadarProps {
  data: PerspectivesData;
  size?: number;
}

const AXES = [
  { key: "people"  as const, label: "People",  color: "#10b981", desc: "Stakeholders, co-design, human-in-the-loop" },
  { key: "systems" as const, label: "Systems", color: "#8b5cf6", desc: "Standards, interoperability, architecture" },
  { key: "planet"  as const, label: "Planet",  color: "#3b82f6", desc: "Environment, GIS/BIM, spatial awareness" },
  { key: "ai"      as const, label: "AI",      color: "#C9A84C", desc: "Agent autonomy, explainability, LPI compliance" },
];

function polarToCart(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export default function PerspectivesRadar({ data, size = 280 }: PerspectivesRadarProps) {
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
  const maxR = size * 0.36;
  const numRings = 5;
  const angles = Array.from({ length: AXES.length }, (_, i) => (360 / AXES.length) * i);

  const rings = Array.from({ length: numRings }, (_, i) => {
    const r = (maxR * (i + 1)) / numRings;
    const points = angles
      .map((a) => { const p = polarToCart(cx, cy, r, a); return `${p.x.toFixed(2)},${p.y.toFixed(2)}`; })
      .join(" ");
    return { r, points };
  });

  const dataValues = AXES.map(({ key }) => Math.min(Math.max(data[key] ?? 3, 0), 5));
  const dataPoints = angles.map((a, i) => {
    const r = animated ? (dataValues[i] / 5) * maxR : 0;
    return polarToCart(cx, cy, r, a);
  });
  const dataPath =
    dataPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ") + " Z";
  const labelPositions = angles.map((a) => polarToCart(cx, cy, maxR + 26, a));

  return (
    <div ref={ref} className="glass rounded-2xl p-6 border border-[#C9A84C]/20">
      <h3 className="text-white font-semibold text-lg mb-1">Four Perspectives</h3>
      <p className="text-slate-400 text-sm mb-6">People · Systems · Planet · AI</p>

      <div className="flex items-center justify-center">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="overflow-visible"
          aria-label="Four Perspectives radar — People, Systems, Planet, AI"
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
            return <line key={i} x1={cx} y1={cy} x2={end.x.toFixed(2)} y2={end.y.toFixed(2)} stroke="rgba(201,168,76,0.2)" strokeWidth="1" />;
          })}
          <path d={dataPath} fill="rgba(201,168,76,0.12)" stroke="rgba(201,168,76,0.7)" strokeWidth="2" style={{ transition: "all 1s ease-out" }} />
          {dataPoints.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={4} fill={AXES[i].color} stroke="white" strokeWidth="1.5" style={{ transition: "all 1s ease-out" }} />
          ))}
          {labelPositions.map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r={16} fill={`${AXES[i].color}22`} />
              <text x={p.x} y={p.y} textAnchor="middle" dominantBaseline="central" fill={AXES[i].color} fontSize="10" fontWeight="700">
                {AXES[i].label}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="space-y-2 mt-4">
        {AXES.map(({ key, label, color, desc }) => {
          const val = data[key] ?? 3;
          return (
            <div key={key} className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
              <span className="text-white text-xs font-semibold w-14 shrink-0">{label}</span>
              <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ width: animated ? `${(val / 5) * 100}%` : "0%", backgroundColor: color }}
                />
              </div>
              <span className="text-slate-400 text-xs w-6 text-right shrink-0">{val}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
