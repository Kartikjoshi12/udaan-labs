"use client";

import { useEffect, useMemo, useState } from "react";
import { site } from "@/lib/site";
import { type AppId } from "./apps";
import { CommandPalette } from "./CommandPalette";
import { DesktopIcons } from "./DesktopIcons";
import { DesktopPet } from "./DesktopPet";
import { DesktopRadarGlow } from "./DesktopRadarGlow";
import { DesktopStickyNote } from "./DesktopStickyNote";
import { DesktopToys } from "./DesktopToys";
import { MobileApp } from "./MobileApp";
import { MobileHome } from "./MobileHome";
import { PixelClickBursts } from "./PixelClickBursts";
import { soundManager } from "@/lib/sound";
import { Taskbar } from "./Taskbar";
import { WallpaperBg } from "./WallpaperBg";
import { Window } from "./Window";
import { WindowContent } from "./WindowContent";

const titles: Record<AppId, string> = {
  about: "Studio Overview",
  services: "What We Build",
  projects: "Selected Work",
  process: "How We Work",
  contact: "Start a Project",
  wallpaper: "Studio Backgrounds",
  tictactoe: "Tic Tac Toe",
};

interface WindowSpec {
  wRatio: number;
  hRatio: number;
  minW?: number;
  maxW?: number;
  minH?: number;
  maxH?: number;
  offsetX?: number;
  offsetY?: number;
}

const windowSpecs: Record<AppId, WindowSpec> = {
  about: { wRatio: 0.62, hRatio: 0.68, minW: 560, maxW: 960, minH: 420, maxH: 640, offsetX: 0, offsetY: 0 },
  projects: { wRatio: 0.66, hRatio: 0.70, minW: 580, maxW: 1040, minH: 440, maxH: 680, offsetX: 24, offsetY: 12 },
  services: { wRatio: 0.62, hRatio: 0.68, minW: 560, maxW: 940, minH: 420, maxH: 620, offsetX: 40, offsetY: 20 },
  process: { wRatio: 0.60, hRatio: 0.66, minW: 540, maxW: 900, minH: 400, maxH: 600, offsetX: 56, offsetY: 28 },
  contact: { wRatio: 0.58, hRatio: 0.66, minW: 520, maxW: 880, minH: 400, maxH: 600, offsetX: 30, offsetY: 16 },
  wallpaper: { wRatio: 0.56, hRatio: 0.62, minW: 500, maxW: 820, minH: 380, maxH: 560, offsetX: 48, offsetY: 24 },
  tictactoe: { wRatio: 0.32, hRatio: 0.62, minW: 360, maxW: 460, minH: 460, maxH: 560, offsetX: 120, offsetY: 30 },
};

/** Gutter reserved on the left for the 2 columns of desktop icons */
const LEFT_ICON_GUTTER = 260;
const TOP_MENU_BAR = 48;
const BOTTOM_TASKBAR = 72;

/** Static fallback positions used on SSR and initial hydration so server matches client */
const fallbackPos: Record<AppId, { x: number; y: number; w: number; h: number }> = {
  about: { x: 270, y: 54, w: 780, h: 520 },
  projects: { x: 300, y: 54, w: 840, h: 540 },
  services: { x: 310, y: 58, w: 780, h: 500 },
  process: { x: 320, y: 62, w: 760, h: 500 },
  contact: { x: 300, y: 54, w: 740, h: 480 },
  wallpaper: { x: 310, y: 58, w: 700, h: 460 },
  tictactoe: { x: 380, y: 64, w: 400, h: 500 },
};

function getResponsiveWindowMetrics(id: AppId, isMounted: boolean) {
  if (!isMounted || typeof window === "undefined") {
    return fallbackPos[id] || { x: 270, y: 54, w: 780, h: 520 };
  }

  const spec = windowSpecs[id] || {
    wRatio: 0.6,
    hRatio: 0.65,
    minW: 500,
    maxW: 900,
    minH: 400,
    maxH: 600,
    offsetX: 0,
    offsetY: 0,
  };

  const availableW = window.innerWidth - LEFT_ICON_GUTTER - 24; // leave margin on right
  const availableH = window.innerHeight - TOP_MENU_BAR - BOTTOM_TASKBAR - 20;

  // Calculate proportional width & height
  let w = Math.round(window.innerWidth * spec.wRatio);
  let h = Math.round(window.innerHeight * spec.hRatio);

  // Apply constraints
  if (spec.maxW) w = Math.min(w, spec.maxW);
  if (spec.minW) w = Math.max(w, spec.minW);
  w = Math.min(w, Math.max(300, availableW));

  if (spec.maxH) h = Math.min(h, spec.maxH);
  if (spec.minH) h = Math.max(h, spec.minH);
  h = Math.min(h, Math.max(240, availableH));

  // Position: start after desktop icons gutter, slightly cascade with offset
  const baseX = LEFT_ICON_GUTTER + (spec.offsetX ?? 0);
  const baseY = TOP_MENU_BAR + 6 + (spec.offsetY ?? 0);

  // Clamp within viewport
  const maxX = Math.max(LEFT_ICON_GUTTER, window.innerWidth - w - 16);
  const maxY = Math.max(TOP_MENU_BAR, window.innerHeight - h - BOTTOM_TASKBAR - 8);

  const x = Math.min(maxX, Math.max(LEFT_ICON_GUTTER, baseX));
  const y = Math.min(maxY, Math.max(TOP_MENU_BAR, baseY));

  return { x, y, w, h };
}

function isPhone() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 767px)").matches
  );
}

export function Desktop() {
  const [mounted, setMounted] = useState(false);
  const [mobileApp, setMobileApp] = useState<AppId | null>(null);
  const [openApps, setOpenApps] = useState<AppId[]>(["about"]);
  const [focusStack, setFocusStack] = useState<AppId[]>(["about"]);
  const [maximized, setMaximized] = useState<Partial<Record<AppId, boolean>>>(
    {},
  );
  const [startOpen, setStartOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [clock, setClock] = useState("");

  useEffect(() => {
    setMounted(true);
    setSoundOn(soundManager.initFromStorage());

    const tick = () =>
      setClock(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    tick();
    const id = window.setInterval(tick, 30_000);

    const onGlobalKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", onGlobalKey);
    return () => {
      window.clearInterval(id);
      window.removeEventListener("keydown", onGlobalKey);
    };
  }, []);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    soundManager.setEnabled(next);
    if (next) soundManager.playOpen();
  };

  const activeApp = focusStack[focusStack.length - 1] ?? null;

  const zMap = useMemo(() => {
    const map: Partial<Record<AppId, number>> = {};
    focusStack.forEach((id, i) => {
      map[id] = 20 + i;
    });
    return map;
  }, [focusStack]);

  function openApp(id: AppId) {
    soundManager.playOpen();
    if (isPhone()) {
      setMobileApp(id);
      return;
    }
    setOpenApps((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setFocusStack((prev) => [...prev.filter((x) => x !== id), id]);
    setStartOpen(false);
  }

  function closeApp(id: AppId) {
    soundManager.playClose();
    setOpenApps((prev) => prev.filter((x) => x !== id));
    setFocusStack((prev) => prev.filter((x) => x !== id));
    setMaximized((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }

  function focusApp(id: AppId) {
    soundManager.playFocus();
    setFocusStack((prev) => [...prev.filter((x) => x !== id), id]);
  }

  return (
    <div className="os-wallpaper relative h-[100dvh] w-full overflow-hidden text-ink">
      <div className="absolute inset-0 z-[1] md:hidden">
        <MobileHome clock={clock} onOpen={openApp} />
        {mobileApp && (
          <MobileApp
            id={mobileApp}
            clock={clock}
            onClose={() => setMobileApp(null)}
          >
            <WindowContent id={mobileApp} onOpen={openApp} />
          </MobileApp>
        )}
      </div>

      <div className="absolute inset-0 z-[1] hidden md:block">
        {/* Editorial Top System Bar */}
        <div className="absolute inset-x-0 top-0 z-40 flex h-9 items-center justify-between border-b-2 border-ink bg-paper px-3 text-ink">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 font-mono text-xs font-bold tracking-tight">
              <span className="inline-flex h-5 w-5 items-center justify-center border border-ink bg-ink text-[10px] text-cream font-mono">
                UL
              </span>
              <span>{site.name}</span>
            </div>
            <span className="text-faint text-xs">/</span>
            <span className="font-mono text-[11px] text-muted tracking-wider">
              INDEPENDENT SOFTWARE STUDIO
            </span>
          </div>

          <div className="flex items-center gap-2.5 font-mono text-xs">
            {/* Cmd+K Quick Launcher Button */}
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setCmdOpen(true);
              }}
              className="flex items-center gap-1.5 border border-ink bg-cream px-2 py-0.5 text-[10px] font-bold text-ink hover:bg-yellow transition-colors shadow-[1px_1px_0_0_#111111]"
              title="Open Command Palette (Ctrl+K / Cmd+K)"
            >
              <span>SEARCH</span>
              <kbd className="bg-paper border border-ink px-1 text-[9px]">⌘K</kbd>
            </button>

            {/* Sound Effects Toggle */}
            <button
              type="button"
              onClick={toggleSound}
              className={`flex items-center gap-1 border border-ink px-2 py-0.5 text-[10px] font-bold transition-colors shadow-[1px_1px_0_0_#111111] ${
                soundOn ? "bg-green text-cream" : "bg-cream text-muted hover:text-ink"
              }`}
              title="Toggle tactile sound effects"
            >
              <span>{soundOn ? "SFX: ON" : "SFX: OFF"}</span>
            </button>

            {/* Live Studio Status */}
            <div className="hidden lg:flex items-center gap-2 border border-ink bg-cream px-2 py-0.5 text-[10px] text-muted">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-green" />
              <span>AVAILABLE FOR NEW WORK</span>
            </div>

            <div className="border border-ink bg-cream px-2 py-0.5 text-[11px] tabular-nums font-mono font-medium shadow-[1px_1px_0_0_#111111]">
              {clock}
            </div>
          </div>
        </div>

        {/* Command Palette Modal */}
        <CommandPalette
          isOpen={cmdOpen}
          onClose={() => setCmdOpen(false)}
          onSelectApp={openApp}
          onToggleSound={toggleSound}
          soundActive={soundOn}
        />

        <WallpaperBg />
        {mounted && <DesktopRadarGlow />}
        <DesktopIcons onOpen={openApp} />
        {mounted && <DesktopToys />}
        {mounted && <DesktopStickyNote />}
        {mounted && <DesktopPet />}
        {mounted && <PixelClickBursts />}

        {/* Studio Desk Watermark */}
        <div className="pointer-events-none absolute right-8 bottom-16 z-10 hidden xl:block font-mono text-[11px] text-muted/60 select-none">
          <div className="border border-ink/20 bg-cream/70 p-3 nb-shadow-sm max-w-[240px] backdrop-blur-[2px]">
            <div className="flex items-center justify-between border-b border-ink/20 pb-1.5 mb-1.5">
              <span className="font-bold text-ink text-[10px] tracking-wider">UDAAN LABS</span>
              <span className="text-[9px] text-green font-bold flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-green" /> AVAILABLE
              </span>
            </div>
            <p className="text-[10px] text-muted">Apps & websites built directly.</p>
          </div>
        </div>

        {openApps.length === 0 && (
          <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center px-6">
            <div className="border-2 border-ink bg-cream px-6 py-4 text-center text-sm nb-shadow max-w-md">
              <p className="font-mono font-bold text-xs uppercase tracking-wider text-orange mb-1">
                WORKSPACE
              </p>
              <p className="text-xs text-muted leading-relaxed">
                Open any desktop tool or use the taskbar to explore work.
              </p>
            </div>
          </div>
        )}

        {openApps.map((id) => {
          const metrics = getResponsiveWindowMetrics(id, mounted);
          return (
            <Window
              key={id}
              id={id}
              title={titles[id]}
              zIndex={zMap[id] ?? 20}
              maximized={Boolean(maximized[id])}
              initialX={metrics.x}
              initialY={metrics.y}
              initialW={metrics.w}
              initialH={metrics.h}
              onClose={() => closeApp(id)}
              onFocus={() => focusApp(id)}
              onToggleMaximize={() =>
                setMaximized((prev) => ({ ...prev, [id]: !prev[id] }))
              }
            >
              <WindowContent id={id} onOpen={openApp} />
            </Window>
          );
        })}

        {startOpen && (
          <div className="absolute bottom-14 left-3 z-[110] w-[min(300px,calc(100%-1.5rem))] border-2 border-ink bg-cream nb-shadow-lg">
            <div className="border-b-2 border-ink bg-paper p-3">
              <div className="flex items-center justify-between">
                <p className="font-[family-name:var(--font-space-grotesk)] text-sm font-bold tracking-tight">
                  {site.name}
                </p>
                <span className="annotation-tag text-[9px] bg-yellow">ONLINE</span>
              </div>
              <p className="mt-1 font-mono text-[11px] text-faint">
                Independent Digital Engineering Studio
              </p>
            </div>
            <ul className="p-1">
              {(
                [
                  ["about", "Studio Overview", "01"],
                  ["projects", "Selected Work", "02"],
                  ["services", "Capabilities", "03"],
                  ["process", "Development Method", "04"],
                  ["contact", "Contact & Dispatch", "05"],
                  ["wallpaper", "Studio Backgrounds", "06"],
                  ["tictactoe", "Workshop Mini-Game", "07"],
                ] as const
              ).map(([id, label, num]) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => openApp(id)}
                    className="flex w-full items-center justify-between border border-transparent px-2.5 py-2 text-left font-mono text-xs hover:border-ink hover:bg-paper transition-all"
                  >
                    <span className="font-medium text-ink">{label}</span>
                    <span className="text-[10px] text-faint">[{num}]</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <Taskbar
          openApps={openApps}
          activeApp={activeApp}
          onOpen={openApp}
          onToggleStart={() => setStartOpen((v) => !v)}
          startOpen={startOpen}
          clock={clock}
        />
      </div>
    </div>
  );
}
