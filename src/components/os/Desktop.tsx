"use client";

import { useEffect, useMemo, useState } from "react";
import { site } from "@/lib/site";
import { type AppId } from "./apps";
import { DesktopIcons } from "./DesktopIcons";
import { MobileApp } from "./MobileApp";
import { MobileHome } from "./MobileHome";
import { Taskbar } from "./Taskbar";
import { WallpaperBg } from "./WallpaperBg";
import { WallpaperProvider } from "./WallpaperContext";
import { Window } from "./Window";
import { WindowContent } from "./WindowContent";

const titles: Record<AppId, string> = {
  about: site.name,
  services: "What we build",
  projects: "Work",
  process: "How we work",
  contact: "Contact",
  wallpaper: "Wallpaper",
  tictactoe: "Tic Tac Toe",
};

/** Where each window opens — spread out so they don't stack */
const startPos: Record<AppId, { x: number; y: number }> = {
  about: { x: 380, y: 72 },
  services: { x: 460, y: 96 },
  projects: { x: 340, y: 110 },
  process: { x: 500, y: 120 },
  contact: { x: 400, y: 140 },
  wallpaper: { x: 520, y: 80 },
  tictactoe: { x: 560, y: 100 },
};

/** Compact default sizes (still resizable) */
const startSize: Record<AppId, { w: number; h: number }> = {
  about: { w: 440, h: 360 },
  services: { w: 420, h: 340 },
  projects: { w: 460, h: 380 },
  process: { w: 400, h: 340 },
  contact: { w: 400, h: 360 },
  wallpaper: { w: 420, h: 340 },
  tictactoe: { w: 360, h: 480 },
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
    <WallpaperProvider>
    <div className="os-wallpaper relative h-[100dvh] w-full overflow-hidden text-ink">
      <WallpaperBg />
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
        <div className="absolute inset-x-0 top-0 z-40 flex h-11 items-center justify-between border-b-[3px] border-ink bg-mustard px-3">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-6 w-6 items-center justify-center border-[2px] border-ink bg-ink text-[9px] text-cream">
              UL
            </span>
            <span className="font-[family-name:var(--font-space-grotesk)] text-sm font-bold tracking-tight">
              {site.name}
            </span>
            <span className="hidden text-xs text-ink/70 sm:inline">
              desktop
            </span>
          </div>
          <div className="border-[2px] border-ink bg-cream px-2 py-0.5 text-xs tabular-nums">
            {clock}
          </div>
        </div>

        <DesktopIcons onOpen={openApp} />

        {openApps.length === 0 && (
          <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center px-6">
            <p className="border-[3px] border-ink bg-cream px-4 py-2 text-center text-sm">
              Double-click an icon to open a window. Drag icons or title bars to move.
            </p>
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
          <div className="absolute bottom-[4.5rem] left-2 z-[110] w-[min(260px,calc(100%-1rem))] border-[3px] border-ink bg-paper nb-shadow-lg">
            <div className="border-b-[3px] border-ink bg-ink px-3 py-2 text-cream">
              <p className="font-[family-name:var(--font-space-grotesk)] text-base font-bold">
                {site.name}
              </p>
              <p className="text-xs text-cream/70">Apps</p>
            </div>
            <ul className="p-0">
              {(
                [
                  ["about", "About"],
                  ["services", "What we build"],
                  ["projects", "Work"],
                  ["process", "How we work"],
                  ["contact", "Contact"],
                  ["wallpaper", "Wallpaper"],
                  ["tictactoe", "Tic Tac Toe"],
                ] as const
              ).map(([id, label], i) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => openApp(id)}
                    className={`flex w-full items-center gap-2 border-b-[3px] border-ink px-3 py-2.5 text-left text-sm last:border-b-0 hover:bg-mustard ${
                      i % 2 === 0 ? "bg-cream" : "bg-paper"
                    }`}
                  >
                    {label}
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
    </WallpaperProvider>
  );
}
