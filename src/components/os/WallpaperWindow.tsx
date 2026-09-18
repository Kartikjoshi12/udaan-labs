"use client";

import { useWallpaper } from "./WallpaperContext";
import { Check } from "pixelarticons/react";

export function WallpaperWindow() {
  const { wallpapers, current, setWallpaper } = useWallpaper();

  return (
    <div className="space-y-5">
      <div className="border-b-2 border-ink pb-3 mb-4 flex items-baseline justify-between">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-xs font-bold text-orange">[06]</span>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold tracking-tight text-ink">
            Studio Backgrounds
          </h2>
        </div>
        <span className="font-mono text-[10px] text-muted uppercase tracking-wider">
          TACTILE WORKSPACE CANVAS
        </span>
      </div>

      <p className="text-xs sm:text-sm text-muted">
        Choose an ambient backdrop for the Udaan digital workshop. Selected wallpaper is preserved locally.
      </p>

      {/* Preset options */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {/* Interactive Live Matrix Canvas */}
        <button
          type="button"
          onClick={() => setWallpaper("")}
          className={`group flex flex-col text-left border-2 border-ink p-2.5 transition-all ${
            !current || current === "live-canvas" ? "bg-yellow nb-shadow" : "bg-paper hover:bg-cream"
          }`}
        >
          <div className="relative h-28 w-full border-2 border-ink bg-[#f7f4ed] overflow-hidden flex flex-col items-center justify-center p-2 text-center">
            <span className="h-2 w-2 rounded-full bg-green animate-ping mb-1" />
            <div className="text-[10px] font-mono text-ink font-bold tracking-widest uppercase">
              LIVE MATRIX
            </div>
            <div className="text-[9px] font-mono text-muted">
              Interactive Waves + Particles
            </div>
            {(!current || current === "live-canvas") && (
              <span className="absolute top-1.5 right-1.5 bg-ink text-cream p-0.5">
                <Check width={12} height={12} className="pixel-icon" />
              </span>
            )}
          </div>
          <div className="mt-2 flex items-center justify-between font-mono text-xs">
            <span className="font-bold text-ink">Live Interactive Canvas</span>
            <span className="text-[9px] bg-green text-cream px-1 border border-ink">LIVE</span>
          </div>
        </button>

        {wallpapers.map((wp, idx) => {
          const isSelected = current === wp;
          const name = wp.split("/").pop()?.replace(/\.[^/.]+$/, "") ?? `Wall ${idx + 1}`;
          return (
            <button
              key={wp}
              type="button"
              onClick={() => setWallpaper(wp)}
              className={`group flex flex-col text-left border-2 border-ink p-2.5 transition-all ${
                isSelected ? "bg-yellow nb-shadow" : "bg-paper hover:bg-cream"
              }`}
            >
              <div className="relative h-28 w-full border-2 border-ink bg-paper-2 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={wp}
                  alt={name}
                  className="h-full w-full object-cover"
                />
                {isSelected && (
                  <span className="absolute top-1.5 right-1.5 bg-ink text-cream p-0.5">
                    <Check width={12} height={12} className="pixel-icon" />
                  </span>
                )}
              </div>
              <div className="mt-2 flex items-center justify-between font-mono text-xs">
                <span className="font-bold text-ink truncate">{name}</span>
                <span className="text-[10px] text-faint">IMG_{idx + 1}</span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="border border-ink/20 bg-cream p-3 font-mono text-[11px] text-muted flex items-center justify-between">
        <span>Active display mode: {current ? "Custom Wallpaper" : "Warm Paper Dot-Matrix"}</span>
        <span className="text-[10px] text-faint">PERSISTED IN LOCALSTORAGE</span>
      </div>
    </div>
  );
}
