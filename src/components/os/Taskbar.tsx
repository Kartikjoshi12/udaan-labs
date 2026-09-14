"use client";

import { Menu } from "pixelarticons/react";
import { site } from "@/lib/site";
import { apps, type AppId } from "./apps";
import { IconArt } from "./IconArt";

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
  return (
    <div className="absolute inset-x-0 bottom-0 z-[100] border-t-2 border-ink bg-paper px-3 py-2 select-none">
      <div className="mx-auto flex max-w-6xl items-center gap-3">
        {/* Launcher button */}
        <button
          type="button"
          onClick={onToggleStart}
          className="nb-btn relative flex h-9 items-center gap-2 border-2 border-ink px-3 text-xs font-mono font-bold tracking-tight"
          style={{
            background: startOpen ? "#f7c948" : "#111111",
            color: startOpen ? "#111111" : "#fbf8f2",
          }}
        >
          <Menu width={16} height={16} className="pixel-icon" />
          <span>LAUNCHER</span>
        </button>

        <div className="h-6 w-[2px] bg-ink/30" />

        {/* Running & Available Apps Dock */}
        <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto py-0.5">
          {apps.map((app) => {
            const isOpen = openApps.includes(app.id);
            const isActive = activeApp === app.id;
            return (
              <button
                key={app.id}
                type="button"
                onClick={() => onOpen(app.id)}
                title={`${app.label} (${app.code})`}
                className={`nb-btn relative flex h-9 items-center gap-2 border-2 border-ink px-2.5 text-xs font-mono transition-all ${
                  isActive
                    ? "bg-yellow font-bold text-ink shadow-[1px_1px_0_0_#111111] translate-x-[1px] translate-y-[1px]"
                    : isOpen
                      ? "bg-cream text-ink"
                      : "bg-paper-2/80 text-muted opacity-85 hover:opacity-100"
                }`}
              >
                <IconArt id={app.id} size={16} />
                <span className="hidden sm:inline-block text-[11px] font-semibold">{app.label}</span>
                {isOpen && (
                  <span
                    className={`inline-block h-1.5 w-1.5 rounded-full border border-ink ${
                      isActive ? "bg-green" : "bg-ink/40"
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Workshop status & clock */}
        <div className="flex items-center gap-2 border-2 border-ink bg-cream px-2.5 py-1 text-[11px] font-mono font-semibold tabular-nums shadow-[2px_2px_0_0_#111111]">
          <span className="inline-block h-2 w-2 rounded-full bg-green" />
          <span>{clock || "00:00"}</span>
        </div>
      </div>
    </div>
  );
}

export type { AppId };
