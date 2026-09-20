"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import { soundManager } from "@/lib/sound";
import { Check, Zap, Calculator, ArrowRight, CornerDownLeft } from "pixelarticons/react";

interface ProjectOption {
  id: string;
  name: string;
  desc: string;
  days: number;
  baseCost: number;
}

const PROJECT_TYPES: ProjectOption[] = [
  { id: "web_mvp", name: "Web App / MVP", desc: "Interactive Next.js product with auth, database & payments", days: 14, baseCost: 1500 },
  { id: "mobile_app", name: "Mobile App (iOS & Android)", desc: "React Native / Expo cross-platform native app", days: 21, baseCost: 2200 },
  { id: "ai_tool", name: "AI Tool / LLM Workflow", desc: "Custom AI agents, RAG pipeline, OpenAI/Claude integration", days: 12, baseCost: 1800 },
  { id: "editorial_site", name: "Bespoke Brand / Marketing Site", desc: "Ultra-fast custom creative website with micro-interactions", days: 7, baseCost: 1000 },
];

const ADDONS = [
  { id: "auth_db", name: "Database & Auth Architecture", cost: 300, days: 2 },
  { id: "payments", name: "Stripe / LemonSqueezy Integration", cost: 250, days: 2 },
  { id: "cms", name: "Headless CMS Setup", cost: 200, days: 1 },
  { id: "speed_rush", name: "⚡ Express Rush Delivery (7-Day Sprint)", cost: 400, days: -3 },
];

export function ScopeEstimatorWindow() {
  const [selectedType, setSelectedType] = useState<string>("web_mvp");
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["auth_db", "payments"]);
  const [timelineSpeed, setTimelineSpeed] = useState<"standard" | "urgent">("standard");

  const toggleAddon = (id: string) => {
    soundManager.playClick();
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const projectType = PROJECT_TYPES.find((p) => p.id === selectedType) || PROJECT_TYPES[0];
  const addonCost = selectedAddons.reduce((sum, id) => {
    const item = ADDONS.find((a) => a.id === id);
    return sum + (item ? item.cost : 0);
  }, 0);

  const addonDays = selectedAddons.reduce((sum, id) => {
    const item = ADDONS.find((a) => a.id === id);
    return sum + (item ? item.days : 0);
  }, 0);

  const totalEstimate = projectType.baseCost + addonCost;
  const totalDays = Math.max(5, projectType.days + addonDays);

  const handleStartProject = () => {
    soundManager.playOpen();
    const addonNames = selectedAddons.map((id) => ADDONS.find((a) => a.id === id)?.name).filter(Boolean).join(", ");
    const subject = encodeURIComponent(`Project Inquiry: ${projectType.name} Scope`);
    const body = encodeURIComponent(
      `Hi Udaan Labs Team,\n\nI built a project scope using your Studio Estimator tool:\n\n- Scope: ${projectType.name}\n- Add-ons: ${addonNames || "None"}\n- Estimated Timeline: ~${totalDays} Days\n- Approximate Budget: $${totalEstimate}\n\nLet's discuss details and next steps.\n\nBest regards,`
    );
    window.location.href = `mailto:${site.contact.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="space-y-5 p-1">
      <div className="flex items-baseline justify-between border-b-2 border-ink pb-3 mb-2">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-xs font-bold text-orange">[08]</span>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold tracking-tight text-ink">
            Project Scope & Cost Estimator
          </h2>
        </div>
        <span className="font-mono text-[10px] text-muted uppercase tracking-wider">
          LIVE SCOPE CALCULATOR
        </span>
      </div>

      <p className="text-xs sm:text-sm text-muted font-mono">
        Configure your product requirements to calculate estimated build turnaround and studio pricing.
      </p>

      {/* 1. Project Type Selector */}
      <div className="space-y-2">
        <label className="font-mono text-xs font-bold uppercase tracking-wider text-ink block">
          1. Select Primary Product Scope
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {PROJECT_TYPES.map((pt) => {
            const isSelected = selectedType === pt.id;
            return (
              <button
                key={pt.id}
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setSelectedType(pt.id);
                }}
                className={`flex flex-col text-left border-2 p-2.5 transition-all ${
                  isSelected
                    ? "border-ink bg-yellow nb-shadow text-ink font-bold"
                    : "border-ink/50 bg-paper text-ink hover:bg-cream"
                }`}
              >
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-bold">{pt.name}</span>
                  <span className="text-[10px] text-muted font-semibold">From ${pt.baseCost}</span>
                </div>
                <p className="mt-1 font-mono text-[10px] text-muted font-normal leading-relaxed">
                  {pt.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Features & Architecture Addons */}
      <div className="space-y-2 pt-2">
        <label className="font-mono text-xs font-bold uppercase tracking-wider text-ink block">
          2. Architectural Modules & Speed
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {ADDONS.map((addon) => {
            const isChecked = selectedAddons.includes(addon.id);
            return (
              <button
                key={addon.id}
                type="button"
                onClick={() => toggleAddon(addon.id)}
                className={`flex items-center justify-between border-2 p-2 font-mono text-xs text-left transition-all ${
                  isChecked
                    ? "border-ink bg-cream font-bold text-ink shadow-[2px_2px_0_0_#111111]"
                    : "border-ink/40 bg-paper/70 text-muted hover:bg-paper"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`flex h-4 w-4 items-center justify-center border border-ink ${
                      isChecked ? "bg-green text-cream" : "bg-paper"
                    }`}
                  >
                    {isChecked && <Check width={12} height={12} />}
                  </span>
                  <span className="text-[11px]">{addon.name}</span>
                </div>
                <span className="text-[10px] font-mono text-ink">
                  {addon.cost > 0 ? `+$${addon.cost}` : `-$${Math.abs(addon.cost)}`}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Summary Receipt Box */}
      <div className="border-2 border-ink bg-paper p-3.5 nb-shadow mt-4 font-mono space-y-3">
        <div className="flex items-center justify-between border-b border-ink/20 pb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-ink">
            ESTIMATED SCOPE RECEIPT
          </span>
          <span className="text-[10px] text-green font-bold flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-green" /> DIRECT ENGINEER ACCESS
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-[10px] text-muted block">ESTIMATED TURNAROUND</span>
            <span className="text-lg font-bold text-ink tracking-tight">
              ~{totalDays} Working Days
            </span>
          </div>
          <div>
            <span className="text-[10px] text-muted block">APPROXIMATE COST</span>
            <span className="text-lg font-bold text-orange tracking-tight">
              ${totalEstimate.toLocaleString()} USD
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleStartProject}
          className="nb-btn nb-btn-primary flex w-full items-center justify-center gap-2 py-2.5 text-xs font-bold font-mono tracking-wider transition-all"
        >
          <span>SEND THIS SCOPE TO BUILD</span>
          <ArrowRight width={14} height={14} />
        </button>
      </div>
    </div>
  );
}
