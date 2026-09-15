"use client";

import { useEffect, useMemo, useState } from "react";
import { site } from "@/lib/site";
import { type AppId, apps } from "./apps";
import { DesktopIcons } from "./DesktopIcons";
import { MobileApp } from "./MobileApp";
import { MobileHome } from "./MobileHome";
import { Taskbar } from "./Taskbar";
import { WallpaperBg } from "./WallpaperBg";
import { Window } from "./Window";
import { WindowContent } from "./WindowContent";
import { BootSequence } from "./BootSequence";
import { soundFx } from "@/lib/sound";

const titles: Record<AppId, string> = {
  about: "Gate DEL-01 // Studio Overview",
  projects: "Departures // Shipped Software",
  services: "Fleet // Capabilities & Stacks",
  process: "Flight Plan // Development Method",
  contact: "Control Tower // Project Inquiries",
  wallpaper: "Radar Feeds // Ambient Scopes",
  tictactoe: "Runway 09 // Land The Plane",
};

const gateCodes: Record<AppId, string> = {
  about: "GATE-01",
  projects: "DEP-02",
  services: "FLT-03",
  process: "PLN-04",
  contact: "TWR-05",
  wallpaper: "RAD-06",
  tictactoe: "ATC-07",
};

/** Where each window opens — flight deck composition */
const startPos: Record<AppId, { x: number; y: number }> = {
  about: { x: 270, y: 48 },
  projects: { x: 290, y: 52 },
  services: { x: 310, y: 56 },
  process: { x: 330, y: 60 },
  contact: { x: 300, y: 52 },
  wallpaper: { x: 320, y: 58 },
  tictactoe: { x: 380, y: 60 },
};

/** Expansive default sizes with airport board hierarchy */
const startSize: Record<AppId, { w: number; h: number }> = {
  about: { w: 840, h: 540 },
  projects: { w: 890, h: 560 },
  services: { w: 820, h: 520 },
  process: { w: 780, h: 520 },
  contact: { w: 780, h: 520 },
  wallpaper: { w: 720, h: 480 },
  tictactoe: { w: 460, h: 540 },
};

function isPhone() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 767px)").matches
  );
}

export function Desktop() {
  const [booted, setBooted] = useState(false);
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

  // Stacking zIndex computation
  const zMap = useMemo(() => {
    const map: Partial<Record<AppId, number>> = {};
    focusStack.forEach((id, i) => {
      map[id] = 30 + i * 2;
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
    if (activeApp === id) return;
    setFocusStack((prev) => [...prev.filter((x) => x !== id), id]);
  }

  return (
    <>
      {!booted && <BootSequence onComplete={() => setBooted(true)} />}

      <div className="relative h-[100dvh] w-full overflow-hidden text-[#ece5d8] font-mono">
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
          {/* Airport Top Flight Information Display Header */}
          <div className="absolute inset-x-0 top-0 z-40 flex h-8 items-center justify-between border-b border-[#332b23] bg-[#110f0d]/95 backdrop-blur-[4px] px-3 text-[#ece5d8]">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-xs font-bold tracking-tight">
                <span className="inline-flex h-4.5 w-4.5 items-center justify-center bg-[#ff9e00] text-[#111111] font-bold text-[10px]">
                  ✈
                </span>
                <span className="text-[#ff9e00]">{site.name}</span>
              </div>
              <span className="text-[#80776d] text-xs">/</span>
              <span className="text-[10px] text-[#80776d] tracking-widest uppercase">
                AERODROME CONTROL · FLIGHT DECK (VIDP / DEL)
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <div className="hidden lg:flex items-center gap-1.5 border border-[#22c55e]/30 bg-[#22c55e]/10 px-2 py-0.5 text-[10px] text-[#22c55e] font-semibold">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#22c55e] beacon-hum" />
                <span>ALL GATES ON TIME · BOOKING SPRINTS</span>
              </div>
              <div className="border border-[#332b23] bg-[#161310] px-2 py-0.5 text-[11px] tabular-nums font-semibold text-[#ff9e00]">
                {clock} IST
              </div>
            </div>
          </div>

          <WallpaperBg />
          <DesktopIcons onOpen={openApp} />

          {/* Air Traffic Control Radar Watermark */}
          <div className="pointer-events-none absolute right-8 top-12 z-10 hidden xl:block text-[11px] text-[#80776d] select-none">
            <div className="border border-[#332b23] bg-[#14120f]/90 p-3 max-w-[250px] backdrop-blur-[6px] shadow-lg">
              <div className="flex items-center justify-between border-b border-[#29221b] pb-1.5 mb-1.5">
                <span className="font-bold text-[#ff9e00] text-[10px] tracking-wider">
                  UDAAN AERODROME
                </span>
                <span className="text-[9px] text-[#22c55e] font-bold flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e] beacon-hum" /> CAT-III ACTIVE
                </span>
              </div>
              <p className="text-[11px] text-[#c2b8a8] leading-tight">
                Software engineered for takeoff. Handed over ready to fly.
              </p>
            </div>
          </div>

          {openApps.length === 0 && (
            <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center px-6">
              <div className="border border-[#3a3228] bg-[#14120f]/95 backdrop-blur-[4px] px-6 py-4 text-center text-sm shadow-2xl max-w-md">
                <p className="font-bold text-xs uppercase tracking-wider text-[#ff9e00] mb-1">
                  ALL CHANNELS IN HOLDING PATTERN
                </p>
                <p className="text-xs text-[#80776d] leading-relaxed">
                  Select a gate or flight channel from the runway desk or bottom dispatch bar to inspect capabilities and shipped aircraft.
                </p>
              </div>
            </div>
          )}

          {openApps.map((id) => (
            <Window
              key={id}
              id={id}
              title={titles[id]}
              gateCode={gateCodes[id]}
              zIndex={zMap[id] ?? 30}
              isActive={activeApp === id}
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
              <WindowContent id={id} onOpen={openApp} />
            </Window>
          ))}

          {/* Solari Dispatch Menu */}
          {startOpen && (
            <div className="absolute bottom-11 left-3 z-[110] w-[min(340px,calc(100%-1.5rem))] border border-[#ff9e00] bg-[#14120f] window-active-shadow">
              <div className="border-b border-[#29221b] bg-[#181512] p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[#ff9e00] font-bold text-xs">✈</span>
                    <p className="text-sm font-bold tracking-tight text-[#f4ede2] uppercase">
                      {site.name} Control
                    </p>
                  </div>
                  <span className="annotation-tag text-[9px] bg-[#22c55e]/15 border-[#22c55e]/40 text-[#22c55e] font-bold">
                    ON TIME
                  </span>
                </div>
                <p className="mt-1 text-[10px] text-[#80776d]">
                  Flight Information Display System (FIDS)
                </p>
              </div>
              <ul className="p-1 font-mono">
                {apps.map((app) => (
                  <li key={app.id}>
                    <button
                      type="button"
                      onClick={() => {
                        soundFx.flap();
                        openApp(app.id);
                      }}
                      className="flex w-full items-center justify-between border border-transparent px-2.5 py-2 text-left text-xs hover:border-[#ff9e00]/40 hover:bg-[#1c1814] transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[#ff9e00] font-bold text-[11px] group-hover:translate-x-0.5 transition-transform">
                          {app.label}
                        </span>
                        <span className="text-[10px] text-[#80776d]">
                          {app.sublabel}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#80776d] font-bold">
                        [{app.code}]
                      </span>
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
    </>
  );
}
