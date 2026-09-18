"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Coffee, Shield, Zap, Heart, Check, Flag } from "pixelarticons/react";

interface DeskToyItem {
  id: string;
  type: "mug" | "sticker-ship" | "sticker-badge" | "clock-widget";
  x: number;
  y: number;
  rotation: number;
}

export function DesktopToys() {
  const [items, setItems] = useState<DeskToyItem[]>([
    { id: "mug-1", type: "mug", x: 1040, y: 380, rotation: -3 },
    { id: "sticker-1", type: "sticker-ship", x: 920, y: 390, rotation: 6 },
    { id: "sticker-2", type: "sticker-badge", x: 970, y: 470, rotation: -8 },
  ]);

  const [sipCount, setSipCount] = useState(0);
  const [steam, setSteam] = useState(true);

  // Position properly on right area
  useEffect(() => {
    if (typeof window !== "undefined") {
      setItems([
        { id: "mug-1", type: "mug", x: Math.max(320, window.innerWidth - 180), y: 340, rotation: -4 },
        { id: "sticker-1", type: "sticker-ship", x: Math.max(280, window.innerWidth - 300), y: 350, rotation: 6 },
        { id: "sticker-2", type: "sticker-badge", x: Math.max(300, window.innerWidth - 240), y: 430, rotation: -8 },
      ]);
    }
  }, []);

  const dragSession = useRef<{
    id: string;
    pointerId: number;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);

  const onPointerDown = (id: string, e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    e.stopPropagation();
    const item = items.find((i) => i.id === id);
    if (!item) return;

    dragSession.current = {
      id,
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      originX: item.x,
      originY: item.y,
    };
    document.body.style.userSelect = "none";
  };

  useEffect(() => {
    function onMove(e: PointerEvent) {
      const s = dragSession.current;
      if (!s || s.pointerId !== e.pointerId) return;
      const dx = e.clientX - s.startX;
      const dy = e.clientY - s.startY;

      const nextX = Math.max(8, Math.min(window.innerWidth - 100, s.originX + dx));
      const nextY = Math.max(48, Math.min(window.innerHeight - 100, s.originY + dy));

      setItems((prev) =>
        prev.map((it) => (it.id === s.id ? { ...it, x: nextX, y: nextY } : it)),
      );
    }

    function onUp(e: PointerEvent) {
      const s = dragSession.current;
      if (!s || s.pointerId !== e.pointerId) return;
      dragSession.current = null;
      document.body.style.userSelect = "";
    }

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  const sipCoffee = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSipCount((c) => c + 1);
    setSteam(false);
    setTimeout(() => setSteam(true), 400);
  };

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {items.map((item) => {
        if (item.type === "mug") {
          return (
            <div
              key={item.id}
              style={{
                left: item.x,
                top: item.y,
                transform: `rotate(${item.rotation}deg)`,
              }}
              onPointerDown={(e) => onPointerDown(item.id, e)}
              onClick={sipCoffee}
              title="Studio Coffee Mug (Click to take a sip · Drag anywhere)"
              className="pointer-events-auto absolute flex cursor-grab active:cursor-grabbing flex-col items-center select-none group"
            >
              {/* Steam animation */}
              <div className="flex gap-1 h-3 mb-0.5">
                <span className={`h-2.5 w-0.5 bg-muted/40 rounded-full ${steam ? "animate-bounce" : "opacity-0"}`} />
                <span className={`h-3 w-0.5 bg-muted/40 rounded-full delay-100 ${steam ? "animate-bounce" : "opacity-0"}`} />
                <span className={`h-2 w-0.5 bg-muted/40 rounded-full delay-200 ${steam ? "animate-bounce" : "opacity-0"}`} />
              </div>

              {/* Mug Body */}
              <div className="relative flex h-11 w-11 items-center justify-center border-2 border-ink bg-orange text-cream shadow-[3px_3px_0_0_#111111] transition-transform group-hover:scale-105 group-active:scale-95">
                <Coffee width={22} height={22} className="pixel-icon text-cream" />
                {/* Mug Handle */}
                <span className="absolute -right-2 top-2 h-5 w-2 border-2 border-l-0 border-ink bg-orange rounded-r-md" />
              </div>

              <span className="mt-1 border border-ink/40 bg-cream/90 px-1 font-mono text-[8px] font-bold text-ink shadow-[1px_1px_0_0_#111111]">
                COFFEE ({sipCount})
              </span>
            </div>
          );
        }

        if (item.type === "sticker-ship") {
          return (
            <div
              key={item.id}
              style={{
                left: item.x,
                top: item.y,
                transform: `rotate(${item.rotation}deg)`,
              }}
              onPointerDown={(e) => onPointerDown(item.id, e)}
              title="Draggable Studio Sticker"
              className="pointer-events-auto absolute flex cursor-grab active:cursor-grabbing items-center gap-1.5 border-2 border-ink bg-green px-2.5 py-1 text-cream font-mono text-[10px] font-bold shadow-[3px_3px_0_0_#111111] transition-transform group hover:scale-105 select-none"
            >
              <Zap width={14} height={14} className="text-yellow" />
              <span>SHIP FAST</span>
            </div>
          );
        }

        if (item.type === "sticker-badge") {
          return (
            <div
              key={item.id}
              style={{
                left: item.x,
                top: item.y,
                transform: `rotate(${item.rotation}deg)`,
              }}
              onPointerDown={(e) => onPointerDown(item.id, e)}
              title="Draggable Studio Sticker"
              className="pointer-events-auto absolute flex cursor-grab active:cursor-grabbing items-center gap-1 border-2 border-ink bg-yellow px-2 py-0.5 text-ink font-mono text-[9px] font-extrabold shadow-[2px_2px_0_0_#111111] transition-transform hover:scale-105 select-none"
            >
              <Shield width={12} height={12} className="text-ink" />
              <span>100% INDIE</span>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
