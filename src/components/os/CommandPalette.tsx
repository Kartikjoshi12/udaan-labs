"use client";

import { useEffect, useState } from "react";
import { apps, type AppId } from "./apps";
import { soundManager } from "@/lib/sound";
import { IconArt } from "./IconArt";
import { Search, Close, CornerDownLeft, Sparkles, Terminal } from "pixelarticons/react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectApp: (id: AppId) => void;
  onToggleSound?: () => void;
  soundActive?: boolean;
}

const appDescriptions: Record<AppId, string> = {
  about: "Studio Overview, values, ethos & core team",
  projects: "Selected production apps, client case studies",
  services: "Full-stack development, mobile apps & engineering",
  process: "4-phase delivery system & weekly sprints",
  contact: "Direct contact, email & start a new project",
  wallpaper: "Customize workspace canvas & live backdrops",
  tictactoe: "Interactive 8-bit desktop mini-game",
};

export function CommandPalette({
  isOpen,
  onClose,
  onSelectApp,
  onToggleSound,
  soundActive,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredApps = apps.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase()) ||
    a.code.toLowerCase().includes(query.toLowerCase()) ||
    (appDescriptions[a.id] ?? "").toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (!isOpen) {
        if ((e.metaKey || e.ctrlKey) && e.key === "k") {
          e.preventDefault();
          // parent controls open
        }
        return;
      }

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredApps.length));
        soundManager.playFocus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredApps.length) % Math.max(1, filteredApps.length));
        soundManager.playFocus();
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredApps[selectedIndex]) {
          soundManager.playOpen();
          onSelectApp(filteredApps[selectedIndex].id);
          onClose();
        }
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, filteredApps, selectedIndex, onClose, onSelectApp]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-start justify-center pt-24 px-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-ink/40 backdrop-blur-[2px] transition-opacity"
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-lg border-3 border-ink bg-cream p-0 nb-shadow-lg z-10 animate-in fade-in zoom-in-95 duration-100">
        {/* Header */}
        <div className="flex items-center gap-2 border-b-2 border-ink bg-titlebar px-3 py-2">
          <Terminal width={16} height={16} className="text-ink" />
          <span className="font-mono text-xs font-bold text-ink uppercase tracking-wider">
            Studio Command Palette
          </span>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="border border-ink/40 bg-paper px-1.5 py-0.5 font-mono text-[9px] font-bold text-muted">
              ESC TO CLOSE
            </span>
            <button
              type="button"
              onClick={onClose}
              className="p-1 hover:bg-paper active:translate-y-0.5 text-ink"
            >
              <Close width={14} height={14} />
            </button>
          </div>
        </div>

        {/* Search Input Bar */}
        <div className="flex items-center gap-2 border-b-2 border-ink bg-paper px-3 py-2.5">
          <Search width={18} height={18} className="text-muted shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a tool name or command (e.g. Projects, Contact)..."
            className="w-full bg-transparent font-mono text-xs text-ink placeholder:text-muted/60 focus:outline-none"
          />
        </div>

        {/* Results List */}
        <div className="max-h-72 overflow-y-auto p-2 space-y-1">
          {filteredApps.length === 0 ? (
            <div className="p-4 text-center font-mono text-xs text-muted">
              No matching tools or workspace items found.
            </div>
          ) : (
            filteredApps.map((app, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={app.id}
                  type="button"
                  onClick={() => {
                    soundManager.playOpen();
                    onSelectApp(app.id);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex w-full items-center justify-between border-2 p-2 text-left font-mono text-xs transition-all ${
                    isSelected
                      ? "border-ink bg-yellow font-bold text-ink shadow-[2px_2px_0_0_#111111] translate-x-0.5"
                      : "border-transparent text-ink hover:bg-paper"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="flex h-7 w-7 items-center justify-center border border-ink bg-paper"
                      style={{ backgroundColor: app.fill }}
                    >
                      <IconArt id={app.id} size={16} />
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{app.label}</span>
                        <span className="text-[9px] text-muted uppercase tracking-wider">
                          [{app.code}]
                        </span>
                      </div>
                      <p className="text-[10px] text-muted font-normal truncate max-w-xs">
                        {appDescriptions[app.id] ?? "Studio Application"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {isSelected && (
                      <span className="flex items-center gap-1 text-[9px] bg-paper border border-ink px-1.5 py-0.5">
                        OPEN <CornerDownLeft width={10} height={10} />
                      </span>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="border-t-2 border-ink bg-paper p-2 flex items-center justify-between font-mono text-[10px] text-muted">
          <div className="flex items-center gap-2">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
          </div>
          <span>UDAAN DIGITAL OS</span>
        </div>
      </div>
    </div>
  );
}
