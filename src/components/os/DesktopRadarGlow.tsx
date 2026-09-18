"use client";

import { useEffect, useState } from "react";

export function DesktopRadarGlow() {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      setPos({ x: e.clientX, y: e.clientY });
    }

    function onLeave() {
      setPos(null);
    }

    window.addEventListener("pointermove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  if (!pos) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[2] overflow-hidden transition-opacity duration-300"
      aria-hidden
    >
      <div
        style={{
          left: pos.x,
          top: pos.y,
          transform: "translate(-50%, -50%)",
        }}
        className="absolute h-64 w-64 rounded-full bg-radial from-yellow/12 via-orange/5 to-transparent blur-xl transition-transform duration-75 ease-out"
      />
    </div>
  );
}
