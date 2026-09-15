"use client";

import { useState } from "react";
import { Volume, VolumeX } from "pixelarticons/react";
import { site } from "@/lib/site";
import { apps, type AppId } from "./apps";
import { IconArt } from "./IconArt";
import { soundFx } from "@/lib/sound";

type TaskbarProps = {
  openApps: AppId[];
  activeApp: AppId | null;
  onOpen: (id: AppId) => void;
  onToggleStart: () => void;
  startOpen: boolean;
  clock: string;
};

export function Taskbar({
  openApps,
  activeApp,
  onOpen,
  onToggleStart,
  startOpen,
  clock,
}: TaskbarProps) {
  const [muted, setMuted] = useState(() => soundFx.isMuted());

  function toggleAudio() {
    const next = soundFx.toggleMute();
    setMuted(next);
    if (!next) {
      soundFx.flap();
    }
  }

  return (
    <div className="absolute inset-x-0 bottom-0 z-[100] border-t border-[#332b23] bg-[#110f0d] px-3 py-1.5 select-none font-mono">
      <div className="mx-auto flex max-w-7xl items-center gap-3">
        {/* Main Departure / Aerodrome Menu Button */}
        <button
          type="button"
          onClick={() => {
            soundFx.flap();
            onToggleStart();
          }}
          className="relative flex h-8 items-center gap-2 px-3 text-xs font-bold tracking-wider transition-all cursor-pointer border"
          style={{
            background: startOpen ? "#ff9e00" : "#181512",
            color: startOpen ? "#111111" : "#ece5d8",
            borderColor: startOpen ? "#ff9e00" : "#3a3228",
            boxShadow: startOpen ? "0 0 10px rgba(255,158,0,0.4)" : "none",
          }}
        >
          <span className="font-bold text-xs">✈</span>
          <span>DISPATCH</span>
        </button>

        <div className="h-4 w-[1px] bg-[#332b23]" />

        {/* Flight Channels & Running Apps Bar */}
        <div className="flex min-w-0 flex-1 items-center gap-1.5 overflow-x-auto py-0.5">
          {apps.map((app) => {
            const isOpen = openApps.includes(app.id);
            const isActive = activeApp === app.id;
            return (
              <button
                key={app.id}
                type="button"
                onClick={() => {
                  soundFx.flap();
                  onOpen(app.id);
                }}
                title={`${app.label} (${app.code}) - ${app.sublabel}`}
                className={`relative flex h-8 items-center gap-2 px-2.5 text-xs font-mono transition-all cursor-pointer border ${
                  isActive
                    ? "border-[#ff9e00] bg-[#1f1a14] font-bold text-[#ff9e00] shadow-[0_0_8px_rgba(255,158,0,0.25)]"
                    : isOpen
                      ? "border-[#4a3e31] bg-[#161310] text-[#ece5d8]"
                      : "border-[#29221b] bg-[#120f0d]/80 text-[#80776d] hover:text-[#ece5d8] hover:border-[#3a3228]"
                }`}
              >
                <IconArt id={app.id} size={14} />
                <span className="hidden sm:inline-block text-[11px] tracking-wide">
                  {app.label}
                </span>
                {isOpen && (
                  <span
                    className={`inline-block h-1.5 w-1.5 rounded-full ${
                      isActive
                        ? "bg-[#ff9e00] beacon-hum"
                        : "bg-[#22c55e]"
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Audio Mute/Unmute Toggle */}
        <button
          type="button"
          onClick={toggleAudio}
          title={muted ? "Unmute flight deck sounds" : "Mute flight deck sounds"}
          className={`flex h-8 w-8 items-center justify-center border transition-colors cursor-pointer ${
            muted
              ? "border-[#29221b] bg-[#14120f] text-[#80776d] hover:text-[#ece5d8]"
              : "border-[#ff9e00]/60 bg-[#1f1a14] text-[#ff9e00]"
          }`}
        >
          {muted ? (
            <VolumeX width={14} height={14} className="pixel-icon" />
          ) : (
            <Volume width={14} height={14} className="pixel-icon" />
          )}
        </button>

        {/* Aerodrome QNH / UTC Clock */}
        <div className="flex items-center gap-2.5 border border-[#332b23] bg-[#14120f] px-2.5 py-1 text-[11px] tabular-nums font-semibold text-[#ece5d8]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e] beacon-hum" />
          <span className="text-[#80776d] text-[10px] hidden sm:inline">IST / UTC+5.5</span>
          <span className="text-[#ff9e00]">{clock || "00:00"}</span>
        </div>
      </div>
    </div>
  );
}

export type { AppId };
