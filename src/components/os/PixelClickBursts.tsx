"use client";

import { useEffect, useState } from "react";

interface Spark {
  id: number;
  x: number;
  y: number;
  color: string;
  angle: number;
  dist: number;
  size: number;
}

const PALETTE = ["#f7c948", "#e45826", "#2d8a4e", "#2563eb", "#111111"];

export function PixelClickBursts() {
  const [sparks, setSparks] = useState<Spark[]>([]);

  useEffect(() => {
    let nextId = 0;

    function handleClick(e: MouseEvent) {
      // Don't fire if clicking inputs or text areas
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;

      const clickX = e.clientX;
      const clickY = e.clientY;
      const count = 6;
      const newSparks: Spark[] = [];

      for (let i = 0; i < count; i++) {
        newSparks.push({
          id: ++nextId,
          x: clickX,
          y: clickY,
          color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
          angle: (i / count) * 2 * Math.PI + (Math.random() * 0.4 - 0.2),
          dist: 18 + Math.random() * 26,
          size: Math.random() > 0.5 ? 5 : 4,
        });
      }

      setSparks((prev) => [...prev.slice(-24), ...newSparks]);

      // Remove after animation completes
      setTimeout(() => {
        setSparks((prev) => prev.filter((s) => !newSparks.some((ns) => ns.id === s.id)));
      }, 450);
    }

    window.addEventListener("pointerdown", handleClick);
    return () => window.removeEventListener("pointerdown", handleClick);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {sparks.map((spark) => (
        <span
          key={spark.id}
          style={{
            left: spark.x,
            top: spark.y,
            width: `${spark.size}px`,
            height: `${spark.size}px`,
            backgroundColor: spark.color,
            boxShadow: "1px 1px 0 0 #111111",
            transform: `translate(${Math.cos(spark.angle) * spark.dist}px, ${Math.sin(spark.angle) * spark.dist}px) scale(0)`,
            transition: "transform 400ms cubic-bezier(0.15, 0.85, 0.35, 1.2), opacity 400ms ease-out",
          }}
          className="absolute block animate-ping-spark border border-ink/40"
        />
      ))}
    </div>
  );
}
