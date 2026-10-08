"use client";

import { FormEvent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/lib/site";
import { soundManager } from "@/lib/sound";
import type { AppId } from "./apps";
import { PixelPhoto } from "./PixelPhoto";
import { StudioTerminalWindow } from "./StudioTerminalWindow";
import { TicTacToe } from "./TicTacToe";
import { WallpaperWindow } from "./WallpaperWindow";
import { Check, ArrowRight, Laptop, Smartphone, Server, Zap } from "pixelarticons/react";

export function WindowContent({
  id,
  onOpen,
}: {
  id: AppId;
  onOpen?: (id: AppId) => void;
}) {
  switch (id) {
    case "about":
      return <AboutWindow onOpen={onOpen} />;
    case "services":
      return <ServicesWindow onOpen={onOpen} />;
    case "projects":
      return <ProjectsWindow onOpen={onOpen} />;
    case "process":
      return <ProcessWindow onOpen={onOpen} />;
    case "terminal":
      return <StudioTerminalWindow onOpen={onOpen} />;
    case "contact":
      return <ContactWindow />;
    case "wallpaper":
      return <WallpaperWindow />;
    case "tictactoe":
      return <TicTacToe />;
  }
}

function FrameImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden border-2 border-ink bg-paper-2 ${className}`}
    >
      <PixelPhoto
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}

function WindowHeader({
  code,
  title,
  subtitle,
}: {
  code: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="border-b-2 border-ink pb-3 mb-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-xs font-bold text-orange">{code}</span>
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl md:text-3xl font-bold tracking-tight text-ink">
          {title}
        </h2>
      </div>
      <p className="font-mono text-xs text-muted max-w-sm sm:text-right">
        {subtitle}
      </p>
    </div>
  );
}

function AboutWindow({ onOpen }: { onOpen?: (id: AppId) => void }) {
  const [activeTab, setActiveTab] = useState<"overview" | "stack" | "metrics">("overview");
  const [systemPing, setSystemPing] = useState(14);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  // Ping jitter for lively studio telemetry feeling
  useEffect(() => {
    const timer = setInterval(() => {
      setSystemPing(12 + Math.floor(Math.random() * 6));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playClick();
    navigator.clipboard.writeText("hello@udaanlabs.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <div className="space-y-6">
      {/* Studio Header bar with Live Status Telemetry */}
      <div className="border-b-2 border-ink pb-3 mb-2 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
        <div className="flex items-center gap-3">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl md:text-3xl font-bold tracking-tight text-ink">
            Udaan Labs
          </h2>
          <span className="border border-ink bg-green-soft px-2 py-0.5 font-mono text-[9px] font-bold text-green flex items-center gap-1.5 shadow-[1px_1px_0_0_#111111]">
            <span className="h-1.5 w-1.5 rounded-full bg-green animate-ping" />
            ● SOFTWARE STUDIO
          </span>
        </div>
        <div className="flex items-center gap-3 font-mono text-xs text-muted">
          <span className="border border-ink/40 bg-cream px-1.5 py-0.5 text-[10px] tabular-nums">
            LATENCY: {systemPing}ms
          </span>
          <p className="hidden sm:block text-[11px] text-muted sm:text-right">
            {site.hero.eyebrow}
          </p>
        </div>
      </div>

      {/* DISTINCTIVE EDITORIAL HERO BLOCK WITH INTERACTIVE SYSTEM TABS */}
      <div className="border-2 border-ink bg-paper p-5 sm:p-7 nb-shadow relative overflow-hidden">
        {/* Clean top line with clickable interactive mode chips */}
        <div className="flex flex-wrap items-center justify-between border-b border-ink/20 pb-3 mb-5 font-mono text-xs gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-ink">UL_</span>
            <span className="text-faint">/</span>
            <span className="text-[11px]">STUDIO WORKSPACE</span>
          </div>

          {/* Interactive Workspace View Switcher */}
          <div className="flex items-center gap-1">
            {(["overview", "stack", "metrics"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  soundManager.playFocus();
                  setActiveTab(tab);
                }}
                className={`relative px-2 py-0.5 text-[10px] font-bold uppercase border border-ink ${
                  activeTab === tab ? "text-cream" : "bg-cream text-muted hover:text-ink hover:bg-yellow-soft"
                }`}
              >
                {activeTab === tab && (
                  <motion.span
                    layoutId="about-tab"
                    className="absolute inset-0 bg-ink"
                    transition={{ type: "spring", bounce: 0.18, visualDuration: 0.28 }}
                  />
                )}
                <span className="relative">
                  {tab === "overview" ? "Overview" : tab === "stack" ? "Stack" : "Telemetry"}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-12 items-center">
          {/* Main Editorial Statement / Dynamic Tab Content */}
          <div className="lg:col-span-7 space-y-4">
            <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.08] tracking-tight text-ink uppercase">
                  {site.hero.h1}
                </h2>

                <p className="text-sm sm:text-base leading-relaxed text-muted max-w-xl">
                  {site.hero.subtitle}
                </p>

                <div className="border-l-2 border-orange pl-3 py-1 font-mono text-xs text-ink/90 font-medium">
                  {site.hero.positioning}
                </div>
              </motion.div>
            )}

            {activeTab === "stack" && (
              <motion.div
                key="stack"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="space-y-3 font-mono text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="border border-ink bg-yellow px-2 py-0.5 text-[10px] font-bold">
                    ENGINEERING CAPABILITIES
                  </span>
                  <span className="text-muted text-[11px]">Bespoke, battle-tested stack</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                  <div className="border border-ink bg-cream p-2.5">
                    <span className="text-[9px] text-faint block uppercase">FRONTEND & WEB</span>
                    <span className="font-bold text-ink">Next.js 16 · React · Tailwind · WASM</span>
                  </div>
                  <div className="border border-ink bg-cream p-2.5">
                    <span className="text-[9px] text-faint block uppercase">MOBILE APPS</span>
                    <span className="font-bold text-ink">Flutter · React Native · Swift/Kotlin</span>
                  </div>
                  <div className="border border-ink bg-cream p-2.5">
                    <span className="text-[9px] text-faint block uppercase">BACKEND & OPS</span>
                    <span className="font-bold text-ink">Node · Python · PostgreSQL · Redis</span>
                  </div>
                  <div className="border border-ink bg-cream p-2.5">
                    <span className="text-[9px] text-faint block uppercase">INFRASTRUCTURE</span>
                    <span className="font-bold text-ink">AWS · Cloudflare · Docker · Supabase</span>
                  </div>
                </div>
                <p className="text-[11px] text-muted leading-relaxed pt-1">
                  We pick technologies that reduce maintenance debt and deliver sub-second performance.
                </p>
              </motion.div>
            )}

            {activeTab === "metrics" && (
              <motion.div
                key="metrics"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="space-y-3 font-mono text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="border border-ink bg-green px-2 py-0.5 text-[10px] font-bold text-cream">
                    STUDIO BENCHMARKS
                  </span>
                  <span className="text-muted text-[11px]">Real delivery metrics</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center pt-1">
                  <div className="border border-ink bg-cream p-3 shadow-[1px_1px_0_0_#111111]">
                    <div className="text-xl sm:text-2xl font-black text-ink font-[family-name:var(--font-space-grotesk)]">
                      100%
                    </div>
                    <div className="text-[9px] text-muted uppercase mt-0.5">Code Handoff</div>
                  </div>
                  <div className="border border-ink bg-cream p-3 shadow-[1px_1px_0_0_#111111]">
                    <div className="text-xl sm:text-2xl font-black text-ink font-[family-name:var(--font-space-grotesk)]">
                      &lt; 48hr
                    </div>
                    <div className="text-[9px] text-muted uppercase mt-0.5">Kick-off Speed</div>
                  </div>
                  <div className="border border-ink bg-cream p-3 shadow-[1px_1px_0_0_#111111]">
                    <div className="text-xl sm:text-2xl font-black text-ink font-[family-name:var(--font-space-grotesk)]">
                      0
                    </div>
                    <div className="text-[9px] text-muted uppercase mt-0.5">Middlemen Layers</div>
                  </div>
                </div>
                <div className="border border-ink/30 bg-paper p-2 text-[10px] text-muted flex items-center gap-2">
                  <Zap width={12} height={12} className="pixel-icon text-orange shrink-0" />
                  <span>Working builds deployed every Friday for client review & interactive sign-off.</span>
                </div>
              </motion.div>
            )}
            </AnimatePresence>

            <div className="pt-2 flex flex-wrap items-center gap-3 font-mono text-xs">
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onOpen?.("contact");
                }}
                className="nb-btn nb-btn-primary px-4 py-2 text-xs flex items-center gap-2 active:scale-95 transition-transform"
              >
                <span>START A PROJECT</span>
                <ArrowRight width={14} height={14} className="pixel-icon" />
              </button>
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onOpen?.("projects");
                }}
                className="nb-btn px-3.5 py-2 text-xs hover:bg-yellow transition-colors active:scale-95"
              >
                <span>SEE OUR WORK</span>
              </button>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="nb-btn px-3 py-2 text-xs bg-paper hover:bg-cream border border-ink text-muted hover:text-ink font-mono text-[10px]"
                title="Copy direct email to clipboard"
              >
                <span>{copiedEmail ? "✓ COPIED HELLO@UDAANLABS.COM" : "📋 COPY EMAIL"}</span>
              </button>
            </div>
          </div>

          {/* UDAAN.EXE Interactive Lab Status Card */}
          <div className="lg:col-span-5">
            <div className="border-2 border-ink bg-cream p-4 nb-shadow relative group hover:border-orange transition-colors">
              <div className="flex items-center justify-between border-b-2 border-ink pb-2 mb-3">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-ink">
                  <Laptop width={16} height={16} className="pixel-icon text-orange animate-bounce" />
                  <span>UDAAN.EXE</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playFocus();
                    onOpen?.("terminal");
                  }}
                  className="inline-flex items-center gap-1 font-mono text-[10px] text-green font-bold hover:underline cursor-pointer"
                  title="Open terminal window"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-green animate-pulse" />
                  ONLINE [OPEN CLI &gt;]
                </button>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="border border-ink/30 bg-paper p-2.5 hover:border-ink transition-colors">
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="text-faint uppercase text-[9px]">CAPACITY</span>
                    <span className="font-bold text-green flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-green" /> ACCEPTING PROJECTS
                    </span>
                  </div>
                  <p className="text-[11px] text-muted leading-snug">
                    Custom software development for businesses, startups and founders.
                  </p>
                </div>

                <div className="border border-ink/30 bg-paper p-2.5 space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] text-faint uppercase font-bold tracking-wider">
                      WHAT WE BUILD
                    </span>
                    <span className="text-[8px] text-orange uppercase font-bold">CLICK TO EXPLORE</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                    {[
                      { name: "Web Applications", app: "services" as const },
                      { name: "Mobile Apps", app: "services" as const },
                      { name: "Internal Tools", app: "services" as const },
                      { name: "MVPs & Prototypes", app: "services" as const },
                    ].map((item, idx) => (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => {
                          soundManager.playClick();
                          onOpen?.(item.app);
                        }}
                        className="text-left px-1.5 py-1 border border-ink/20 hover:border-ink hover:bg-yellow transition-colors font-medium truncate"
                      >
                        • {item.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-ink/15 text-[11px]">
                  <div className="border border-ink/30 bg-paper p-2">
                    <span className="text-[9px] text-faint block uppercase">TIMELINE</span>
                    <span className="text-xs font-bold text-ink">2 – 6+ WEEKS*</span>
                  </div>
                  <div className="border border-ink/30 bg-paper p-2">
                    <span className="text-[9px] text-faint block uppercase">LOCATION</span>
                    <span className="text-xs font-bold text-ink">INDIA / REMOTE</span>
                  </div>
                </div>

                <div className="border border-ink/20 bg-yellow-soft p-2 text-[9px] text-muted flex items-center gap-2">
                  <Zap width={12} height={12} className="pixel-icon text-orange shrink-0" />
                  <span>*Timeline depends on scope and product complexity.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WHAT WE BUILD (Interactive Hover Grid with Quick Launch) */}
      <div className="border-2 border-ink bg-paper p-5 nb-shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-ink/20 pb-2">
          <div className="flex items-center gap-2">
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-ink uppercase tracking-tight">
              What We Build
            </h3>
            <span className="border border-ink/30 bg-cream px-1.5 py-0.5 font-mono text-[9px] text-muted">
              4 TRACKS
            </span>
          </div>
          <span className="font-mono text-[10px] text-orange font-bold uppercase">
            HOVER CARDS · CLICK TO OPEN FULL SCOPE
          </span>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {site.facts.map((fact, i) => (
            <div
              key={fact.label}
              onMouseEnter={() => {
                setHoveredFeature(i);
                soundManager.playFocus();
              }}
              onMouseLeave={() => setHoveredFeature(null)}
              onClick={() => {
                soundManager.playClick();
                onOpen?.("services");
              }}
              className={`border-2 p-3.5 transition-all duration-150 cursor-pointer ${
                hoveredFeature === i
                  ? "border-orange bg-yellow-soft shadow-[3px_3px_0_0_#ff4d00] -translate-y-0.5"
                  : "border-ink bg-cream shadow-[1px_1px_0_0_#111111]"
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="font-[family-name:var(--font-space-grotesk)] text-sm font-bold text-ink">
                  {fact.label}
                </p>
                <ArrowRight
                  width={12}
                  height={12}
                  className={`pixel-icon text-orange transition-transform ${
                    hoveredFeature === i ? "translate-x-1" : "opacity-40"
                  }`}
                />
              </div>
              <p className="mt-1 text-xs text-muted leading-relaxed">
                {fact.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* WHY UDAAN / DIFFERENTIATION & PHOTO */}
      <div className="grid gap-5 md:grid-cols-12 items-stretch">
        <div className="md:col-span-7 flex flex-col justify-between border-2 border-ink bg-cream p-5">
          <div className="space-y-3">
            <div className="inline-block border border-ink bg-paper px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-orange">
              WHY UDAAN LABS
            </div>
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl sm:text-2xl font-bold text-ink leading-snug">
              {site.whyUs.headline}
            </h3>
            <p className="font-mono text-xs font-semibold text-ink">
              {site.whyUs.subhead}
            </p>
            <p className="text-xs sm:text-sm leading-relaxed text-muted">
              {site.whyUs.body}
            </p>
          </div>

          <div className="mt-5 border-t border-ink/20 pt-4">
            <p className="text-xs leading-relaxed text-ink/80 font-mono">
              {site.whyUs.philosophy}
            </p>
          </div>
        </div>

        <div className="md:col-span-5 flex flex-col justify-between border-2 border-ink bg-paper p-3 group">
          <FrameImage
            src={site.images.aboutHero}
            alt="Udaan Labs software development studio workspace"
            className="w-full h-48 md:h-full min-h-[160px] transition-transform duration-300 group-hover:scale-[1.01]"
          />
          <div className="mt-2.5 flex items-center justify-between font-mono text-[10px] text-faint px-1">
            <span className="text-green font-bold flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-green animate-pulse" />
              LIVE WORKBENCH
            </span>
            <span>INDIA / REMOTE</span>
          </div>
        </div>
      </div>

      {/* HOW WE TURN PROBLEMS INTO SOFTWARE (Progression Timeline with Interactive Steps) */}
      <div className="border-2 border-ink bg-paper p-5 sm:p-6 nb-shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-ink/20 pb-3">
          <div>
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl sm:text-2xl font-bold text-ink uppercase tracking-tight">
              How We Turn Problems Into Software
            </h3>
            <p className="font-mono text-xs text-muted mt-0.5">
              A simple process from messy idea to working product.
            </p>
          </div>
          <span className="font-mono text-[10px] text-orange font-bold uppercase tracking-wider self-start sm:self-auto border border-ink bg-cream px-2 py-0.5">
            FROM PROBLEM TO PRODUCTION
          </span>
        </div>

        {/* 4-Step Progressive Grid with Timeline Anchors */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {site.process.map((step, idx) => (
            <div
              key={step.step}
              onClick={() => {
                soundManager.playClick();
                onOpen?.("process");
              }}
              className="border-2 border-ink bg-cream p-4 flex flex-col justify-between relative group hover:border-orange hover:bg-paper cursor-pointer transition-all duration-150 shadow-[2px_2px_0_0_#111111] hover:shadow-[3px_3px_0_0_#ff4d00] hover:-translate-y-0.5"
            >
              <div>
                {/* Visual Anchor: Large Step Number */}
                <div className="flex items-baseline justify-between border-b border-ink/15 pb-2 mb-3">
                  <span className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-extrabold text-ink/90 group-hover:text-orange transition-colors">
                    {step.step}
                  </span>
                  {idx < 3 && (
                    <span className="hidden lg:inline-block font-mono text-xs text-muted font-bold group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  )}
                </div>

                <h4 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-ink tracking-tight uppercase">
                  {step.title}
                </h4>

                <p className="mt-2 text-xs leading-relaxed text-muted">
                  {step.body}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-ink/15 space-y-1.5 font-mono">
                <div className="text-[9px] font-bold tracking-wider text-orange">
                  {step.sublabel}
                </div>
                <div className="text-[9px] text-faint flex items-center justify-between">
                  <span className="bg-paper border border-ink/30 px-1.5 py-0.5 text-[8px] text-ink font-bold group-hover:bg-yellow transition-colors">
                    {step.status}
                  </span>
                  <span className="text-[8px] text-muted opacity-0 group-hover:opacity-100 transition-opacity">
                    EXPAND ➔
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Studio Philosophy Banner with Interactive Action */}
      <div className="border-2 border-ink bg-yellow p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-[2px_2px_0_0_#111111]">
        <div>
          <p className="font-[family-name:var(--font-space-grotesk)] text-sm sm:text-base font-bold text-ink">
            FROM PROBLEM → WORKING SOFTWARE
          </p>
          <span className="font-mono text-[10px] text-ink/80 block mt-0.5">
            UNDERSTAND ➔ SCOPE ➔ BUILD ➔ LAUNCH
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            onOpen?.("contact");
          }}
          className="nb-btn px-3 py-1.5 text-xs font-mono font-bold bg-paper hover:bg-cream border-2 border-ink shadow-[1px_1px_0_0_#111111] shrink-0"
        >
          START A BUILD SPRINT ➔
        </button>
      </div>
    </div>
  );
}

function ServicesWindow({ onOpen }: { onOpen?: (id: AppId) => void }) {
  return (
    <div className="space-y-6">
      <WindowHeader
        code="[02]"
        title="What We Build"
        subtitle="Software & digital product engineering built for real business workflows."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {site.services.map((service, index) => (
          <div
            key={service.title}
            className="border-2 border-ink bg-cream p-5 nb-shadow-sm flex flex-col justify-between relative"
          >
            <div>
              {/* Header */}
              <div className="flex items-baseline justify-between gap-2 border-b border-ink/20 pb-2 mb-3">
                <span className="font-mono text-xs font-bold text-orange">
                  0{index + 1}
                </span>
                <span className="font-mono text-[10px] text-muted uppercase">
                  Production Track
                </span>
              </div>

              <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-ink">
                {service.title}
              </h3>

              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted">
                {service.body}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-ink/15 flex flex-wrap gap-1.5 font-mono text-[10px]">
              {service.tags.map((tag) => (
                <span key={tag} className="border border-ink/30 bg-paper px-2 py-0.5 text-ink">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="border-2 border-ink bg-paper p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="font-mono text-xs text-muted">
          Need a bespoke architecture or internal workflow tool?
        </span>
        <button
          type="button"
          onClick={() => onOpen?.("contact")}
          className="nb-btn nb-btn-primary px-3.5 py-1.5 text-xs flex items-center gap-2"
        >
          <span>TELL US ABOUT YOUR PROJECT</span>
          <ArrowRight width={12} height={12} className="pixel-icon" />
        </button>
      </div>
    </div>
  );
}

function ProjectsWindow({ onOpen }: { onOpen?: (id: AppId) => void }) {
  return (
    <div className="space-y-6">
      <WindowHeader
        code="[03]"
        title="Selected Work"
        subtitle="Real production software engineered for high utility, reliability, and speed."
      />

      <div className="space-y-7">
        {site.projects.map((project, idx) => {
          const isAlt = idx % 2 === 1;
          return (
            <article
              key={project.title}
              className="border-2 border-ink bg-paper p-5 sm:p-6 nb-shadow transition-transform hover:-translate-y-0.5"
            >
              {/* Project Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-ink pb-3 mb-4 font-mono text-xs">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 border border-ink bg-ink text-cream px-2 py-0.5 font-bold tracking-wider text-[11px]">
                    {project.type.includes("Mobile") ? (
                      <Smartphone width={12} height={12} className="pixel-icon text-yellow" />
                    ) : project.type.includes("Ops") || project.type.includes("Custom") ? (
                      <Server width={12} height={12} className="pixel-icon text-yellow" />
                    ) : (
                      <Laptop width={12} height={12} className="pixel-icon text-yellow" />
                    )}
                    {project.id}
                  </span>
                  <span className="text-faint">/</span>
                  <span className="font-bold text-ink uppercase tracking-wide">
                    {project.type}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="border border-ink bg-cream px-2 py-0.5 font-mono text-[10px] text-muted">
                    {project.year}
                  </span>
                  <span className="border border-ink bg-yellow px-2 py-0.5 font-mono text-[10px] font-bold text-ink flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-green" />
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Asymmetric Artifact Layout */}
              <div className={`grid gap-6 items-stretch md:grid-cols-12 ${isAlt ? "md:flex-row-reverse" : ""}`}>
                <div className={`${isAlt ? "md:order-2" : "md:order-1"} md:col-span-7 flex flex-col justify-between`}>
                  <div>
                    <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl sm:text-3xl font-bold tracking-tight text-ink uppercase">
                      {project.title}
                    </h3>
                    
                    <div className="mt-1.5 inline-block border border-ink/40 bg-cream px-2 py-0.5 font-mono text-xs font-semibold text-orange">
                      {project.stack}
                    </div>

                    <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted">
                      {project.blurb}
                    </p>
                  </div>

                  <div className="mt-5 space-y-3">
                    <div className="border-2 border-ink bg-cream p-3 font-mono text-xs text-ink flex items-center gap-2.5 shadow-[2px_2px_0_0_#111111]">
                      <span className="h-2 w-2 bg-green rounded-full shrink-0" />
                      <span className="font-medium">{project.metrics}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="border border-ink bg-paper px-2 py-0.5 font-mono text-[10px] text-muted"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={`${isAlt ? "md:order-1" : "md:order-2"} md:col-span-5 flex flex-col justify-between`}>
                  <div className="border-2 border-ink bg-paper-2 p-1.5">
                    <FrameImage
                      src={project.image}
                      alt={`${project.title} software development case study`}
                      className="h-52 md:h-full min-h-[190px] w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Footer action bar */}
              <div className="mt-5 pt-3 border-t-2 border-ink/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
                <span className="text-faint text-[10px] flex items-center gap-1.5">
                  <Check width={12} height={12} className="pixel-icon text-green" />
                  Delivered & verified live
                </span>
                <button
                  type="button"
                  onClick={() => onOpen?.("contact")}
                  className="nb-btn inline-flex items-center justify-center gap-2 px-3.5 py-1.5 text-xs hover:bg-yellow transition-colors cursor-pointer"
                >
                  <span>BUILD SIMILAR PROJECT</span>
                  <ArrowRight width={12} height={12} className="pixel-icon" />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function ProcessWindow({ onOpen }: { onOpen?: (id: AppId) => void }) {
  return (
    <div className="space-y-6">
      <WindowHeader
        code="[04]"
        title="How We Work"
        subtitle="Talk directly with engineers. Short feedback loops, zero layers, and working software."
      />

      {/* Philosophy banner */}
      <div className="border-2 border-ink bg-paper p-5 nb-shadow-sm space-y-2">
        <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-ink">
          Talk directly to the people building your product.
        </h3>
        <p className="text-xs sm:text-sm text-muted leading-relaxed">
          No unnecessary layers between you and the engineering team. We define the problem, scope the work, build in short iterations, share working builds, and improve based on real feedback. Less presentation. More working software.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {site.process.map((step) => (
          <div
            key={step.step}
            className="border-2 border-ink bg-cream p-5 nb-shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-baseline justify-between border-b border-ink/15 pb-2 mb-3">
                <span className="font-[family-name:var(--font-space-grotesk)] text-3xl font-extrabold text-ink/90">
                  {step.step}
                </span>
                <span className="font-mono text-[10px] text-orange font-bold uppercase">
                  {step.sublabel}
                </span>
              </div>
              <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-ink uppercase tracking-tight">
                {step.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted">
                {step.body}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-ink/15 flex items-center justify-between font-mono text-[10px]">
              <span className="border border-ink/30 bg-paper px-2 py-0.5 text-ink font-bold text-[9px]">
                {step.status}
              </span>
              <span className="text-green font-bold flex items-center gap-1">
                <Check width={12} height={12} className="pixel-icon text-green" />
                Verified Phase
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="border-2 border-ink bg-yellow-soft p-4 text-xs text-muted flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green shrink-0" />
          <span>Average project handoff timeline: 2 to 6+ weeks from kick-off to production.</span>
        </div>
        <button
          type="button"
          onClick={() => onOpen?.("contact")}
          className="nb-btn px-3 py-1 text-xs font-bold font-mono bg-paper hover:bg-yellow"
        >
          START A SPRINT ➔
        </button>
      </div>
    </div>
  );
}

function ContactWindow() {
  const { contact } = site;
  const [hint, setHint] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const subject = encodeURIComponent(
      `[Project Inquiry] From ${name || "Website Visitor"}`,
    );
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nProject Scope & Problem:\n${message}`,
    );
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    setHint(true);
  }

  return (
    <div className="space-y-6">
      <WindowHeader
        code="[05]"
        title="Start a Project"
        subtitle="Have a problem worth solving? Talk directly with the engineering team."
      />

      <div className="grid gap-6 md:grid-cols-12 items-start">
        <div className="md:col-span-5 space-y-4">
          <div className="border-2 border-ink bg-paper p-5 nb-shadow-sm">
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-ink">
              {contact.heading}
            </h3>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted">
              {contact.body}
            </p>
          </div>

          <div className="border-2 border-ink bg-cream p-4 space-y-3 font-mono text-xs">
            <div>
              <span className="text-[10px] text-faint block uppercase">DIRECT INBOX</span>
              <a
                className="font-bold text-ink hover:text-orange underline"
                href={`mailto:${contact.email}`}
              >
                {contact.email}
              </a>
            </div>
            <div className="border-t border-ink/20 pt-2">
              <span className="text-[10px] text-faint block uppercase">LOCATION</span>
              <span className="text-ink">{contact.location}</span>
            </div>
            <div className="border-t border-ink/20 pt-2">
              <span className="text-[10px] text-faint block uppercase">TYPICAL RESPONSE</span>
              <span className="text-green font-semibold">Same or next business day</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-7">
          <form
            onSubmit={onSubmit}
            className="border-2 border-ink bg-paper p-5 nb-shadow space-y-4"
          >
            <div className="space-y-1">
              <label className="font-mono text-[10px] uppercase tracking-wider text-muted font-bold">
                Your Name / Team
              </label>
              <input
                name="name"
                required
                placeholder="e.g. Alex Morgan"
                className="min-h-10 w-full border-2 border-ink bg-cream px-3 font-mono text-xs outline-none focus:bg-cream focus:border-orange transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-[10px] uppercase tracking-wider text-muted font-bold">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="alex@company.com"
                className="min-h-10 w-full border-2 border-ink bg-cream px-3 font-mono text-xs outline-none focus:bg-cream focus:border-orange transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-[10px] uppercase tracking-wider text-muted font-bold">
                What problem are you trying to solve?
              </label>
              <textarea
                name="message"
                required
                rows={4}
                placeholder="Tell us what you're trying to build, what isn't working today, and what success looks like."
                className="w-full border-2 border-ink bg-cream px-3 py-2 font-mono text-xs outline-none focus:bg-cream focus:border-orange transition-colors"
              />
            </div>

            <button
              type="submit"
              className="nb-btn nb-btn-primary min-h-11 w-full text-xs font-mono font-bold tracking-wider flex items-center justify-center gap-2"
            >
              <span>{contact.cta.toUpperCase()} ➔</span>
            </button>

            {hint && (
              <p className="font-mono text-[11px] text-muted text-center">
                If your email client didn’t launch, write directly to {contact.email}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
