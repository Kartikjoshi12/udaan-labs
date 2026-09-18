"use client";

import { useEffect } from "react";
import { useWallpaper } from "./WallpaperContext";
import { LiveMatrixCanvas } from "./LiveMatrixCanvas";

/**
 * Full-quality wallpaper — instant from known list, or interactive live canvas.
 */
export function WallpaperBg() {
  const { current } = useWallpaper();

  useEffect(() => {
    if (!current || current === "live-canvas") return;
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = current;
    document.head.appendChild(link);
    return () => {
      link.remove();
    };
  }, [current]);

  if (!current || current === "live-canvas") {
    return <LiveMatrixCanvas />;
  }

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={current}
        alt=""
        decoding="async"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/25" />
    </div>
  );
}
