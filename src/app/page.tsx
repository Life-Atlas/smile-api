import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "S.M.I.L.E. — SMILE as a Service | Turn Any Project into a Digital Twin",
  description:
    "Upload your project plan and get SMILE phase scores, AEST temporal analysis, NUDEDA maturity assessment, and actionable revision suggestions. Impact first. Data last.",
};

const SMILE_PHASES = [
  { code: "RE", name: "Reality Emulation",      color: "#C9A84C", desc: "How well does your project model physical reality in real time?" },
  { code: "CE", name: "Concurrent Engineering",  color: "#e8c96a", desc: "Are design, build, and learn loops running in parallel?" },
  { code: "CI", name: "Collective Intelligence", color: "#10b981", desc: "Does knowledge flow across all actors — human and non-human?" },
  { code: "CX", name: "Contextual Intelligence", color: "#06b6d4", desc: "Is the project spatially, temporally, and contextually aware?" },
  { code: "CN", name: "Continuous Intelligence", color: "#8b5cf6", desc: "Are there feedback loops that improve the project in real time?" },
  { code: "PW", name: "Perpetual Wisdom",        color: "#f59e0b", desc: "Does the project build reusable knowledge beyond its lifetime?" },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Paste your project plan",
    description: "Submit your project brief, proposal, or plan as text, PDF, or structured document. Any domain, any stage.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "SMILE analyzes across all dimensions",
    description: "6 phases, 4 perspectives (People/Systems/Planet/AI), AEST temporal registers, and NUDEDA maturity — scored in seconds.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Get a scored report with a DT transformation roadmap",
    description: "Receive phase scores, prioritised findings, specific suggestions, and a step-by-step plan to make your project a digital twin.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
];

const WHAT_YOU_GET = [
  { title: "SMILE Phase Analysis",        desc: "6-phase radar scoring Reality Emulation through Perpetual Wisdom",          icon: "◉" },
  { title: "AEST Temporal Score",         desc: "Absorb / Emulate / Simulate / Transcend across all four time registers",    icon: "⧗" },
  { title: "NUDEDA Maturity Assessment",  desc: "Where on the Naive→Explicit maturity ladder does your project sit?",        icon: "△" },
  { title: "Four Perspectives Coverage",  desc: "People · Systems · Planet · AI — diamond radar with gap analysis",         icon: "◆" },
  { title: "Actionable Suggestions",      desc: "Phase-by-phase revisions with specific tools and integration patterns",     icon: "→" },
  { title: "Digital Twin Roadmap",        desc: "Concrete 3-step plan to transform any project into a living DT project",   icon: "⬡" },
];

const PRICING = [
  {
    name: "Free",
    price: "0",
    period: "/month",
    description: "Test the methodology on your project",
    features: [
      "1 project analysis per month",
      "Basic SMILE phase scoring",
      "Top 3 findings",
      "Community access",
    ],
    cta: "Start Free",
    href: "/analyze",
    highlight: false,
  },
  {
    name: "Pro",
    price: "49",
    period: "/month",
    description: "Full SMILE analysis for serious projects",
    features: [
      "Unlimited analyses",
      "Full SMILE radar + all 6 phases",
      "AEST + NUDEDA + 4 Perspectives",
      "Complete findings + recommendations",
      "Digital Twin transformation roadmap",
      "PDF report export",
      "Priority email support",
    ],
    cta: "Start Pro",
    href: "/analyze",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "249",
    period: "/month",
    description: "For teams running multiple projects",
    features: [
      "Everything in Pro",
      "API access (batch scoring)",
      "Custom rubrics per domain",
      "Team accounts (up to 10 seats)",
      "Consulting hours included",
      "SLA + dedicated support",
    ],
    cta: "Contact Sales",
    href: "mailto:nicolas@lifeatlas.online",
    highlight: false,
  },
];

export default function HomePage() {
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
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#what-smile-does" className="text-slate-400 hover:text-white text-sm transition-colors">What it Does</Link>
            <Link href="/methodology" className="text-slate-400 hover:text-white text-sm transition-colors">Methodology</Link>
            <Link href="/#pricing" className="text-slate-400 hover:text-white text-sm transition-colors">Pricing</Link>
            <Link href="/#consulting" className="text-slate-400 hover:text-white text-sm transition-colors">Consulting</Link>
          </div>
          <Link
            href="/analyze"
            className="px-4 py-2 rounded-lg bg-[#C9A84C] text-[#0a0f1e] font-semibold text-sm hover:bg-[#e8c96a] transition-colors"
          >
            Analyze Project
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden pt-24 pb-32 px-6">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#C9A84C]/5 blur-[120px]" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/20 text-[#C9A84C] text-sm font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
            SMILE as a Service — The Core Methodology
          </div>

          <h1
            className="text-6xl md:text-8xl font-light tracking-tight mb-6 text-white"
            style={{ fontFamily: "var(--font-cormorant), serif" }}
          >
            <span className="gradient-text-gold font-semibold">S.M.I.L.E.</span>
          </h1>

          <p
            className="text-xl md:text-2xl text-slate-300 mb-4 font-light tracking-wide"
            style={{ fontFamily: "var(--font-cormorant), serif" }}
          >
            Sustainable Methodology for Impact Lifecycle Enablement
          </p>

          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
            Turn any project into a continuously learning digital twin.{" "}
            <span className="text-[#C9A84C]">Impact first.</span> Data last.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/analyze"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#C9A84C] text-[#0a0f1e] font-bold text-lg hover:bg-[#e8c96a] transition-all hover:shadow-lg hover:shadow-[#C9A84C]/30 animate-pulse-glow"
            >
              Analyze Your Project
            </Link>
            <Link
              href="/methodology"
              className="w-full sm:w-auto px-8 py-4 rounded-xl border border-[#C9A84C]/40 text-[#C9A84C] font-semibold text-lg hover:bg-[#C9A84C]/10 transition-all"
            >
              Learn the Methodology
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT SMILE DOES */}
      <section id="what-smile-does" className="py-24 px-6 bg-[#0d1428]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-light text-white mb-4"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Feed SMILE a project plan.{" "}
              <span className="gradient-text-gold">Get back:</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Every analysis produces six interconnected outputs — each one actionable, none of them generic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHAT_YOU_GET.map((item, i) => (
              <div
                key={i}
                className="glass rounded-2xl p-6 border border-[#C9A84C]/15 hover:border-[#C9A84C]/30 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center text-[#C9A84C] text-lg font-mono mb-4 group-hover:bg-[#C9A84C]/20 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-light text-white mb-4"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              How it Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map(({ step, title, description, icon }, i) => (
              <div key={i} className="relative">
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-[#C9A84C]/30 to-transparent z-10" />
                )}
                <div className="glass rounded-2xl p-8 border border-[#C9A84C]/15 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/15 border border-[#C9A84C]/25 flex items-center justify-center text-[#C9A84C]">
                      {icon}
                    </div>
                    <span className="text-[#C9A84C]/50 font-mono text-sm font-bold">{step}</span>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-3">{title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SMILE PHASES */}
      <section className="py-24 px-6 bg-[#0d1428]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-light text-white mb-4"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              The Six Phases
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Every project is scored across six dimensions that define whether it is a living, learning system — or a static deliverable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SMILE_PHASES.map(({ code, name, color, desc }, i) => (
              <div
                key={i}
                className="glass rounded-2xl p-6 border transition-all hover:shadow-lg group"
                style={{ borderColor: `${color}25` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm"
                    style={{ backgroundColor: `${color}20`, color }}
                  >
                    {code}
                  </div>
                  <h3 className="text-white font-semibold">{name}</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                <div className="mt-4 h-1 rounded-full bg-slate-800">
                  <div className="h-full rounded-full w-0 group-hover:w-3/4 transition-all duration-700" style={{ backgroundColor: color }} />
                </div>
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
              className="text-4xl md:text-5xl font-light text-white mb-6"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              <span className="gradient-text-gold">Absorb</span> the past.{" "}
              <span className="text-[#e8c96a]">Emulate</span> the present.{" "}
              <span className="text-cyan-400">Simulate</span> the future.{" "}
              <span className="text-violet-400">Transcend</span> the now.
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              AEST is the temporal backbone of SMILE. Projects that only operate in the present are leaving 75% of their potential impact on the table.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Absorb",    time: "Past",    color: "#C9A84C", desc: "Prior art, historical data, lessons learned" },
              { label: "Emulate",   time: "Present", color: "#e8c96a", desc: "Living model of current physical reality" },
              { label: "Simulate",  time: "Future",  color: "#06b6d4", desc: "Virtual testing before real-world commitment" },
              { label: "Transcend", time: "Beyond",  color: "#8b5cf6", desc: "Knowledge that outlives the project itself" },
            ].map(({ label, time, color, desc }, i) => (
              <div
                key={i}
                className="glass rounded-2xl p-6 border text-center"
                style={{ borderColor: `${color}25` }}
              >
                <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: `${color}20`, border: `1px solid ${color}40` }}>
                  <span className="font-bold text-sm" style={{ color }}>{i + 1}</span>
                </div>
                <div className="font-semibold text-white mb-1">{label}</div>
                <div className="text-xs font-medium mb-3 px-2 py-0.5 rounded-full inline-block" style={{ backgroundColor: `${color}15`, color }}>
                  {time}
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 px-6 bg-[#0d1428]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-light text-white mb-4"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Pricing
            </h2>
            <p className="text-slate-400 text-lg">Start free. Scale when you need depth.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRICING.map(({ name, price, period, description, features, cta, href, highlight }) => (
              <div
                key={name}
                className={`rounded-2xl p-8 border flex flex-col ${
                  highlight
                    ? "bg-[#C9A84C]/10 border-[#C9A84C]/40 shadow-lg shadow-[#C9A84C]/10 relative"
                    : "glass border-[#C9A84C]/15"
                }`}
              >
                {highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#C9A84C] text-[#0a0f1e] text-xs font-bold">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-white font-bold text-xl mb-1">{name}</h3>
                  <p className="text-slate-400 text-sm mb-4">{description}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-[#C9A84C]">EUR {price}</span>
                    <span className="text-slate-500 text-sm">{period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <span className="text-[#C9A84C] mt-0.5 shrink-0">✓</span>
                      <span className="text-slate-300">{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={href}
                  className={`w-full py-3 rounded-xl font-semibold text-center transition-all ${
                    highlight
                      ? "bg-[#C9A84C] text-[#0a0f1e] hover:bg-[#e8c96a]"
                      : "border border-[#C9A84C]/40 text-[#C9A84C] hover:bg-[#C9A84C]/10"
                  }`}
                >
                  {cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONSULTING */}
      <section id="consulting" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-3xl p-10 md:p-16 border border-[#C9A84C]/30 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#C9A84C]/5 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-[#C9A84C]/15 border border-[#C9A84C]/30 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#C9A84C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2
                className="text-3xl md:text-4xl font-light text-white mb-4"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                Work Directly with Nicolas Waern + SMILE AI Agent
              </h2>
              <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-4 leading-relaxed">
                One session. Your project transformed. Nicolas brings 10+ years of digital twin methodology and 40+ peer-reviewed publications grounded in SMILE.
              </p>
              <p className="text-[#C9A84C] font-bold text-2xl mb-8">EUR 500 / session</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://calendly.com/futurecreation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-xl bg-[#C9A84C] text-[#0a0f1e] font-bold text-lg hover:bg-[#e8c96a] transition-all hover:shadow-lg hover:shadow-[#C9A84C]/30"
                >
                  Book a Session
                </a>
                <Link
                  href="/analyze"
                  className="px-8 py-4 rounded-xl border border-[#C9A84C]/40 text-[#C9A84C] font-semibold hover:bg-[#C9A84C]/10 transition-all"
                >
                  Try Free Analysis First
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SMILE */}
      <section className="py-24 px-6 bg-[#0d1428]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2
                className="text-3xl md:text-4xl font-light text-white mb-6"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                About the Methodology
              </h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                SMILE (Sustainable Methodology for Impact Lifecycle Enablement) is a field-tested framework for transforming projects from static deliverables into continuously learning systems — digital twins grounded in physical reality.
              </p>
              <p className="text-slate-400 leading-relaxed mb-8">
                Built on 40+ peer-reviewed articles, SMILE spans six phases (Reality Emulation through Perpetual Wisdom), four perspectives (People, Systems, Planet, AI), and the AEST temporal model. It has been applied across healthcare, construction, manufacturing, genomics, and smart cities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://doi.org/10.5281/zenodo.19646374"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-lg border border-[#C9A84C]/40 text-[#C9A84C] text-sm font-medium hover:bg-[#C9A84C]/10 transition-all inline-flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Read Full Methodology Paper
                </a>
                <Link
                  href="/methodology"
                  className="px-5 py-2.5 rounded-lg bg-slate-800 text-slate-300 text-sm font-medium hover:bg-slate-700 transition-all"
                >
                  Explore the Framework
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { label: "40+",  desc: "peer-reviewed articles grounded in SMILE" },
                { label: "6",    desc: "phases from Reality Emulation to Perpetual Wisdom" },
                { label: "4",    desc: "perspectives: People, Systems, Planet, AI" },
                { label: "8+",   desc: "domains: healthcare, construction, genomics, and more" },
              ].map(({ label, desc }, i) => (
                <div key={i} className="glass rounded-xl p-5 border border-[#C9A84C]/15 flex items-center gap-4">
                  <div className="text-3xl font-bold gradient-text-gold shrink-0 w-16 text-right">{label}</div>
                  <div className="w-px h-8 bg-[#C9A84C]/20" />
                  <p className="text-slate-400 text-sm">{desc}</p>
                </div>
              ))}
              <a
                href="https://lifeatlas.online"
                target="_blank"
                rel="noopener noreferrer"
                className="block glass rounded-xl p-5 border border-[#C9A84C]/15 hover:border-[#C9A84C]/30 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#C9A84C]/15 flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#C9A84C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium group-hover:text-[#C9A84C] transition-colors">Life Atlas Platform</div>
                    <div className="text-slate-500 text-xs">SMILE powers the Life Atlas Life OS — lifeatlas.online</div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#C9A84C]/10 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* SMILE Ecosystem strip */}
          <div className="mb-10 glass rounded-2xl p-6 border border-[#C9A84C]/15">
            <p className="text-[#C9A84C] font-semibold text-xs uppercase tracking-widest mb-4">
              SMILE Powers Everything
            </p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mb-5">
              <a
                href="https://github.com/Life-Atlas/crucible-app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-[#C9A84C] text-sm font-medium transition-colors"
              >
                CRUCIBLE — Proposal Analyzer
              </a>
              <a
                href="https://github.com/Life-Atlas/anvil-app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-[#C9A84C] text-sm font-medium transition-colors"
              >
                ANVIL — Paper Scorer
              </a>
              <a
                href="https://lifeatlas.github.io/the-sentinel-seed/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-[#C9A84C] text-sm font-medium transition-colors"
              >
                Research Library
              </a>
              <a
                href="https://lifeatlas.online"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-[#C9A84C] text-sm font-medium transition-colors"
              >
                lifeatlas.online
              </a>
              <a
                href="https://doi.org/10.5281/zenodo.19646374"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-[#C9A84C] text-sm font-medium transition-colors"
              >
                SMILE Paper — DOI 10.5281/zenodo.19646374
              </a>
            </div>
            <a
              href="https://calendly.com/futurecreation"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#C9A84C]/15 border border-[#C9A84C]/25 text-[#C9A84C] text-sm font-semibold hover:bg-[#C9A84C]/25 transition-all"
            >
              Book a consulting session — Nicolas Waern / WINNIIO AB
            </a>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <div className="text-white font-semibold mb-1" style={{ fontFamily: "var(--font-cormorant), serif" }}>
                S.M.I.L.E. — Sustainable Methodology for Impact Lifecycle Enablement
              </div>
              <div className="text-slate-500 text-sm">Nicolas Waern / WINNIIO AB · Gothenburg, Sweden</div>
              <div className="text-slate-600 text-xs mt-1">Powered by the SMILE methodology</div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <a href="https://lifeatlas.online" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#C9A84C] transition-colors">
                Life Atlas
              </a>
              <a href="https://crucible.winniio.io" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#C9A84C] transition-colors">
                Crucible
              </a>
              <Link href="/methodology" className="text-slate-400 hover:text-[#C9A84C] transition-colors">
                Methodology
              </Link>
              <a href="https://linkedin.com/in/nicolaswaern" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#C9A84C] transition-colors">
                LinkedIn
              </a>
              <a href="https://orcid.org/0009-0001-4011-8201" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#C9A84C] transition-colors">
                ORCID
              </a>
              <a href="https://doi.org/10.5281/zenodo.19646374" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#C9A84C] transition-colors">
                Paper
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
