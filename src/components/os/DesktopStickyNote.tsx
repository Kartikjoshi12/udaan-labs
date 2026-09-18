"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Zap, Heart, Check } from "pixelarticons/react";

export function DesktopStickyNote() {
  const [pos, setPos] = useState({ x: 1050, y: 56 });
  const [tasks, setTasks] = useState([
    { text: "Launch MVP on time", done: true },
    { text: "Direct engineer contact", done: true },
    { text: "Zero agency overhead", done: true },
    { text: "Build exceptional UI", done: false },
  ]);
  const [folded, setFolded] = useState(false);

  // Align to top-right on initial mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      setPos({
        x: Math.max(300, window.innerWidth - 240),
        y: 56,
      });
    }
  }, []);

  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
    dragging: boolean;
  } | null>(null);

  const toggleTask = (index: number) => {
    setTasks((prev) =>
      prev.map((t, i) => (i === index ? { ...t, done: !t.done } : t)),
    );
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    if ((e.target as HTMLElement).closest("button") || (e.target as HTMLElement).closest("input")) return;
    e.preventDefault();

    dragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      originX: pos.x,
      originY: pos.y,
      dragging: false,
    };
    document.body.style.userSelect = "none";
  };

  useEffect(() => {
    function onMove(e: PointerEvent) {
      const d = dragRef.current;
      if (!d || d.pointerId !== e.pointerId) return;
      const dx = e.clientX - d.startX;
      const dy = e.clientY - d.startY;
      d.dragging = true;

      const nextX = Math.max(12, Math.min(window.innerWidth - 220, d.originX + dx));
      const nextY = Math.max(48, Math.min(window.innerHeight - 220, d.originY + dy));
      setPos({ x: nextX, y: nextY });
    }

    function onUp(e: PointerEvent) {
      const d = dragRef.current;
      if (!d || d.pointerId !== e.pointerId) return;
      dragRef.current = null;
      document.body.style.userSelect = "";
    }

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <div
      style={{ left: pos.x, top: pos.y }}
      onPointerDown={onPointerDown}
      className="absolute z-20 w-[185px] cursor-grab active:cursor-grabbing select-none border-2 border-ink bg-[#fef3c7] p-2.5 shadow-[3px_3px_0_0_#111111] transition-transform hover:-translate-y-0.5"
    >
      {/* Tape strip at top */}
      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 h-3.5 w-14 border border-ink/40 bg-cream/90 backdrop-blur-[1px] rotate-[-2deg]" />

      <div className="flex items-center justify-between border-b border-ink/20 pb-1 mb-1.5 font-mono text-[10px] font-bold text-ink">
        <span className="flex items-center gap-1">
          <Zap width={12} height={12} className="text-orange" />
          STUDIO_NOTES.TXT
        </span>
        <button
          type="button"
          onClick={() => setFolded((f) => !f)}
          className="text-muted hover:text-ink font-bold px-1"
          title="Toggle note"
        >
          {folded ? "+" : "−"}
        </button>
      </div>

      {!folded && (
        <div className="space-y-1 font-mono text-[10px]">
          {tasks.map((t, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => toggleTask(idx)}
              className="flex w-full items-start gap-1.5 text-left transition-colors hover:text-ink"
            >
              <span
                className={`mt-0.5 flex h-3 w-3 shrink-0 items-center justify-center border border-ink ${
                  t.done ? "bg-green text-cream" : "bg-cream"
                }`}
              >
                {t.done && <Check width={10} height={10} />}
              </span>
              <span
                className={`${
                  t.done ? "line-through text-muted/70 font-normal" : "text-ink font-semibold"
                }`}
              >
                {t.text}
              </span>
            </button>
          ))}
          <div className="mt-2 pt-1 border-t border-ink/10 flex items-center justify-between text-[9px] text-muted font-mono">
            <span>DRAG ME ANYWHERE</span>
            <Heart width={10} height={10} className="text-orange animate-pulse" />
          </div>
        </div>
      )}
    </div>
  );
}
