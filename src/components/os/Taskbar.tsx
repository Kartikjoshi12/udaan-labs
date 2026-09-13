"use client";

import Image from "next/image";
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
    <div className="absolute inset-x-0 bottom-0 z-[100] border-t-[3px] border-ink bg-paper px-2 py-2">
      <div className="mx-auto flex max-w-6xl items-center gap-2">
        <button
          type="button"
          onClick={onToggleStart}
          className="relative flex h-11 items-center gap-2 overflow-hidden border-[3px] border-ink px-3 text-xs font-black uppercase tracking-wide nb-shadow-sm"
          style={{
            background: startOpen ? "#ffd60a" : "#0a0a0a",
            color: startOpen ? "#0a0a0a" : "#fff8e7",
          }}
        >
          <Menu width={20} height={20} className="pixel-icon" />
          <span>{site.name.split(" ")[0]}</span>
        </button>

        <div className="h-10 w-[3px] bg-ink" />

        <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto">
          {apps.map((app) => {
            const isOpen = openApps.includes(app.id);
            const isActive = activeApp === app.id;
            return (
              <button
                key={app.id}
                type="button"
                onClick={() => onOpen(app.id)}
                title={app.label}
                className={`relative flex h-11 min-w-11 items-center justify-center border-[3px] border-ink ${
                  isActive ? "nb-shadow-sm" : ""
                }`}
                style={{
                  backgroundColor: isActive ? "#ffd60a" : app.fill,
                }}
              >
                {/* Kenney CC0 panel texture */}
                <Image
                  src={`/pixel/kenney/9-Slice/Colored/${
                    isActive
                      ? "yellow"
                      : app.id === "about"
                        ? "yellow"
                        : app.id === "services"
                          ? "blue"
                          : app.id === "projects"
                            ? "red"
                            : app.id === "process"
                              ? "green"
                              : app.id === "tictactoe"
                                ? "green"
                                : app.id === "wallpaper"
                                  ? "grey"
                                  : "grey"
                  }.png`}
                  alt=""
                  fill
                  className="pixel-panel object-fill opacity-35"
                  sizes="44px"
                />
                <span className="relative z-[1]">
                  <IconArt id={app.id} size={24} />
                </span>
              </button>
            );
          })}
        </div>

        <div className="border-[3px] border-ink bg-mustard px-3 py-2 text-[11px] font-black tabular-nums nb-shadow-sm">
          {clock || "--:--"}
        </div>
      </div>
    </div>
  );
}

export type { AppId };
