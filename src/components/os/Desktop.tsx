"use client";

import { useEffect, useMemo, useState } from "react";
import { site } from "@/lib/site";
import { type AppId } from "./apps";
import {
  CloudDecor,
  DoodleSquiggle,
  DoodleStamp,
  DoodleStar,
  StickyNote,
} from "./Doodles";
import { DesktopIcons } from "./DesktopIcons";
import { MobileApp } from "./MobileApp";
import { MobileHome } from "./MobileHome";
import { PixelPhoto } from "./PixelPhoto";
import { Taskbar } from "./Taskbar";
import { WallpaperBg } from "./WallpaperBg";
import { WallpaperProvider } from "./WallpaperContext";
import { Window } from "./Window";
import { WindowContent } from "./WindowContent";

const titles: Record<AppId, string> = {
  about: `${site.name}`,
  services: "Services",
  projects: "Projects",
  process: "Process",
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
        <CloudDecor />

        <div className="absolute inset-x-0 top-0 z-40 flex h-12 items-center justify-between border-b-[3px] border-ink bg-mustard px-3 text-[11px] font-black uppercase tracking-[0.14em]">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-7 w-7 items-center justify-center border-[3px] border-ink bg-ink text-cream text-[10px]">
              ◆
            </span>
            <span className="font-[family-name:var(--font-space-grotesk)] text-sm normal-case tracking-tight">
              {site.name}
            </span>
            <span className="hidden border-[3px] border-ink bg-cream px-2 py-0.5 sm:inline">
              BRUTAL OS
            </span>
          </div>
          <div className="border-[3px] border-ink bg-cream px-2 py-1 tabular-nums">
            {clock}
          </div>
        </div>

        <DoodleStar className="pointer-events-none absolute right-[26%] top-28 z-[3] h-10 w-10" />
        <DoodleSquiggle className="pointer-events-none absolute right-[8%] top-48 z-[3] h-8 w-36 text-ink" />
        <DoodleStamp className="pointer-events-none absolute bottom-40 left-[44%] z-[3] h-16 w-16 rotate-6" />

        <StickyNote className="absolute right-6 top-[4.5rem] z-[15] hidden w-48 lg:block" rotate="2deg">
          <p className="text-[10px] font-black uppercase tracking-wide">Note</p>
          <p className="mt-1 text-xs font-bold leading-snug">
            Thick borders. Loud color. Zero soft UI.
          </p>
          <p className="mt-2 text-[10px] font-black">— {site.name}</p>
        </StickyNote>

        <div className="absolute bottom-36 right-6 z-[12] hidden w-44 xl:block">
          <div className="relative w-40 border-[3px] border-ink bg-cream p-2 nb-shadow-lg">
            <div className="relative h-28 w-full overflow-hidden border-[3px] border-ink bg-blue">
              <PixelPhoto
                src="/refs/1.png"
                alt="Reference moodboard"
                pixelSize={3}
                className="absolute inset-0 h-full w-full"
              />
            </div>
            <p className="mt-2 text-center text-[10px] font-black uppercase tracking-wide">
              REF_01
            </p>
          </div>
        </div>

        <div className="absolute bottom-44 left-[34%] z-[11] hidden w-36 border-[3px] border-ink bg-cream p-2 nb-shadow 2xl:block">
          <div className="relative h-24 w-full overflow-hidden border-[3px] border-ink">
            <PixelPhoto
              src="/refs/2.png"
              alt="Studio reference"
              pixelSize={3}
              className="absolute inset-0 h-full w-full"
            />
          </div>
          <p className="mt-1 text-center text-[9px] font-black uppercase">REF_02</p>
        </div>

        <DesktopIcons onOpen={openApp} />

        {openApps.length === 0 && (
          <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center px-6">
            <p className="border-[3px] border-ink bg-rust px-5 py-3 text-center text-xs font-black uppercase tracking-wide text-cream nb-shadow-lg">
              Click icon · drag · open window
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
          <div className="absolute bottom-[4.5rem] left-2 z-[110] w-[min(280px,calc(100%-1rem))] border-[3px] border-ink bg-paper nb-shadow-lg">
            <div className="border-b-[3px] border-ink bg-rust px-3 py-2 text-cream">
              <p className="font-[family-name:var(--font-space-grotesk)] text-base font-black">
                {site.name}
              </p>
              <p className="text-[10px] font-bold uppercase tracking-wide opacity-90">
                Start // apps
              </p>
            </div>
            <ul className="p-0">
              {(
                [
                  ["about", "About"],
                  ["services", "Services"],
                  ["projects", "Projects"],
                  ["process", "Process"],
                  ["contact", "Contact"],
                  ["wallpaper", "Wallpaper"],
                  ["tictactoe", "Tic Tac Toe"],
                ] as const
              ).map(([id, label], i) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => openApp(id)}
                    className={`flex w-full items-center gap-2 border-b-[3px] border-ink px-3 py-3 text-left text-xs font-black uppercase tracking-wide last:border-b-0 hover:bg-mustard ${
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
