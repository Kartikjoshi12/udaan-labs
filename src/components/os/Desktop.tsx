"use client";

import { useEffect, useMemo, useState } from "react";
import { site } from "@/lib/site";
import { type AppId } from "./apps";
import { DesktopIcons } from "./DesktopIcons";
import { MobileApp } from "./MobileApp";
import { MobileHome } from "./MobileHome";
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

/** Where each window opens — offset editorial composition with room on the left for icons */
const startPos: Record<AppId, { x: number; y: number }> = {
  about: { x: 270, y: 52 },
  projects: { x: 300, y: 52 },
  services: { x: 320, y: 56 },
  process: { x: 340, y: 60 },
  contact: { x: 310, y: 52 },
  wallpaper: { x: 330, y: 58 },
  tictactoe: { x: 420, y: 64 },
};

/** Expansive default sizes — much wider with editorial breathing room */
const startSize: Record<AppId, { w: number; h: number }> = {
  about: { w: 820, h: 540 },
  projects: { w: 880, h: 560 },
  services: { w: 820, h: 520 },
  process: { w: 780, h: 520 },
  contact: { w: 780, h: 520 },
  wallpaper: { w: 720, h: 480 },
  tictactoe: { w: 420, h: 520 },
};

function isPhone() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 767px)").matches
  );
}

export function Desktop() {
  const [mobileApp, setMobileApp] = useState<AppId | null>(null);
  const [openApps, setOpenApps] = useState<AppId[]>(["about"]);
  const [focusStack, setFocusStack] = useState<AppId[]>(["about"]);
  const [maximized, setMaximized] = useState<Partial<Record<AppId, boolean>>>(
    {},
  );
  const [startOpen, setStartOpen] = useState(false);
  const [clock, setClock] = useState("");

  useEffect(() => {
    const tick = () =>
      setClock(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  const activeApp = focusStack[focusStack.length - 1] ?? null;

  const zMap = useMemo(() => {
    const map: Partial<Record<AppId, number>> = {};
    focusStack.forEach((id, i) => {
      map[id] = 20 + i;
    });
    return map;
  }, [focusStack]);

  function openApp(id: AppId) {
    if (isPhone()) {
      setMobileApp(id);
      return;
    }
    setOpenApps((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setFocusStack((prev) => [...prev.filter((x) => x !== id), id]);
    setStartOpen(false);
  }

  function closeApp(id: AppId) {
    setOpenApps((prev) => prev.filter((x) => x !== id));
    setFocusStack((prev) => prev.filter((x) => x !== id));
    setMaximized((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }

  function focusApp(id: AppId) {
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
            <WindowContent id={mobileApp} />
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

          <div className="flex items-center gap-3 font-mono text-xs">
            <div className="hidden lg:flex items-center gap-2 border border-ink bg-cream px-2 py-0.5 text-[10px] text-muted">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-green" />
              <span>AVAILABLE FOR NEW WORK</span>
            </div>
            <div className="border border-ink bg-cream px-2 py-0.5 text-[11px] tabular-nums font-mono font-medium shadow-[1px_1px_0_0_#111111]">
              {clock}
            </div>
          </div>
        </div>

        <WallpaperBg />
        <DesktopIcons onOpen={openApp} />

        {/* Studio Drafting Desk Watermark / Backdrop Marks */}
        <div className="pointer-events-none absolute right-8 top-16 z-10 hidden xl:block font-mono text-[11px] text-muted/60 select-none">
          <div className="border border-ink/20 bg-cream/70 p-4 nb-shadow-sm max-w-[280px] backdrop-blur-[2px]">
            <div className="flex items-center justify-between border-b border-ink/20 pb-1.5 mb-2">
              <span className="font-bold text-ink text-[10px] tracking-wider">UDAAN LAB STATUS</span>
              <span className="text-[9px] text-green font-bold flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-green" /> ACTIVE
              </span>
            </div>
            <div className="space-y-1 text-[10px] text-muted">
              <p>PROD_CYCLE: 2026</p>
              <p>DISPATCH: FAST-TRACK</p>
              <p className="text-faint">DIGITAL WORKSHOP × EDITORIAL UI</p>
            </div>
          </div>
        </div>

        {openApps.length === 0 && (
          <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center px-6">
            <div className="border-2 border-ink bg-cream px-6 py-4 text-center text-sm nb-shadow max-w-md">
              <p className="font-mono font-bold text-xs uppercase tracking-wider text-orange mb-1">
                UDAAN LABS // WORKSPACE READY
              </p>
              <p className="text-xs text-muted leading-relaxed">
                Click any desktop tool on the left or use the launcher in the bottom taskbar to explore studio artifacts.
              </p>
            </div>
          </div>
        )}

        {openApps.map((id) => (
          <Window
            key={id}
            id={id}
            title={titles[id]}
            zIndex={zMap[id] ?? 20}
            maximized={Boolean(maximized[id])}
            initialX={startPos[id].x}
            initialY={startPos[id].y}
            initialW={startSize[id].w}
            initialH={startSize[id].h}
            onClose={() => closeApp(id)}
            onFocus={() => focusApp(id)}
            onToggleMaximize={() =>
              setMaximized((prev) => ({ ...prev, [id]: !prev[id] }))
            }
          >
            <WindowContent id={id} />
          </Window>
        ))}

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
