"use client";

import { useWallpaper } from "./WallpaperContext";
import { soundFx } from "@/lib/sound";

export function WallpaperWindow() {
  const { wallpapers, current, setWallpaper } = useWallpaper();

  return (
    <div className="space-y-5 font-mono">
      <div className="border-b border-[#332b23] pb-3 mb-4 flex items-baseline justify-between">
        <div className="flex items-baseline gap-2">
          <span className="text-xs font-bold text-[#ff9e00]">[06_RADAR]</span>
          <h2 className="text-2xl font-bold tracking-tight text-[#f4ede2] uppercase">
            Radar & Display Canvases
          </h2>
        </div>
        <span className="text-[10px] text-[#80776d] uppercase tracking-wider">
          AERODROME SCOPE FEEDS
        </span>
      </div>

      <p className="text-xs sm:text-sm text-[#c2b8a8] leading-relaxed">
        Select an ambient aerodrome radar or departure display feed for the cockpit background. Each canvas renders real-time procedural vectors, scanlines, and flight telemetry grids.
      </p>

      {/* Preset options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {wallpapers.map((wp) => {
          const isSelected = current === wp.id;
          return (
            <button
              key={wp.id}
              type="button"
              onClick={() => {
                soundFx.flap();
                setWallpaper(wp.id);
              }}
              className={`group flex flex-col text-left p-3 transition-all cursor-pointer border ${
                isSelected
                  ? "border-[#ff9e00] bg-[#1a1713] window-active-shadow"
                  : "border-[#332b23] bg-[#14120f] hover:border-[#ff9e00]/40 hover:bg-[#181512]"
              }`}
            >
              <div className="relative h-28 w-full border border-[#2a241e] overflow-hidden flex items-center justify-center bg-[#0c0a08]">
                {wp.id === "departure-board" && (
                  <div className="h-full w-full bg-[#110f0d] flex items-center justify-center p-3">
                    <span className="text-[9px] text-[#ff9e00] opacity-80 text-center font-bold">
                      ✈ SOLARI SPLIT-FLAP<br />MAIN CONCOURSE FIDS
                    </span>
                  </div>
                )}
                {wp.id === "radar-scope" && (
                  <div className="h-full w-full bg-[#0a0f0d] flex items-center justify-center p-3">
                    <span className="text-[9px] text-[#22c55e] text-center font-bold">
                      ◎ PRIMARY RADAR 360°<br />APPROACH DEL / BLR
                    </span>
                  </div>
                )}
                {wp.id === "runway-lighting" && (
                  <div className="h-full w-full bg-[#0d0d0c] flex items-center justify-center p-3">
                    <span className="text-[9px] text-[#ff9e00] text-center font-bold">
                      || RUNWAY 09/27 CAT-III<br />THRESHOLD LIGHTS
                    </span>
                  </div>
                )}
                {wp.id === "flight-strip" && (
                  <div className="h-full w-full bg-[#f4ede2] flex items-center justify-center p-3">
                    <span className="text-[9px] text-[#111111] text-center font-bold">
                      [≡] FLIGHT PROGRESS BAY<br />MANILA TOWER STRIPS
                    </span>
                  </div>
                )}

                {isSelected && (
                  <span className="absolute top-2 right-2 bg-[#ff9e00] text-[#111111] px-1.5 py-0.5 text-[9px] font-bold tracking-wider">
                    LOCKED
                  </span>
                )}
              </div>

              <div className="mt-2.5 flex items-center justify-between text-xs">
                <span className="font-bold text-[#f4ede2]">{wp.name}</span>
                <span className="text-[10px] text-[#80776d]">[{wp.category}]</span>
              </div>
              <p className="mt-1 text-[11px] text-[#80776d] line-clamp-2 leading-normal">
                {wp.description}
              </p>
            </button>
          );
        })}
      </div>

      <div className="border border-[#2a241e] bg-[#14120f] p-3 text-[11px] text-[#80776d] flex items-center justify-between">
        <span>Active display mode: <strong className="text-[#ff9e00]">{wallpapers.find((w) => w.id === current)?.name}</strong></span>
        <span className="text-[10px] text-[#80776d]">PERSISTED IN LOCALSTORAGE</span>
      </div>
    </div>
  );
}
