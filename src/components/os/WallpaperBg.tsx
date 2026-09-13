"use client";

import { useWallpaper } from "./WallpaperContext";

/**
 * Full-quality wallpaper from /public/wallpapers.
 * Light vignette only — no heavy tint/grid that kills clarity.
 */
export function WallpaperBg() {
  const { current } = useWallpaper();

  if (!current) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {/* High-quality cover — no pixelation, no muddy filters */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("${current}")`,
          imageRendering: "auto",
        }}
      />
      {/* Soft edge readabilty for icons/windows only */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/25" />
    </div>
  );
}
