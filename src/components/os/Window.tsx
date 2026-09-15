"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { Checkbox, Close, Minus } from "pixelarticons/react";
import { soundFx } from "@/lib/sound";

type WindowProps = {
  id: string;
  title: string;
  gateCode?: string;
  zIndex: number;
  isActive?: boolean;
  maximized?: boolean;
  initialX?: number;
  initialY?: number;
  initialW?: number;
  initialH?: number;
  onClose: () => void;
  onFocus: () => void;
  onToggleMaximize: () => void;
  children: ReactNode;
};

type Edge = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

const DRAG_THRESHOLD = 4;
const MIN_W = 320;
const MIN_H = 240;
const MENU = 40;
const TASK = 60;

export function Window({
  title,
  gateCode = "FIDS",
  zIndex,
  isActive = true,
  maximized = false,
  initialX = 120,
  initialY = 80,
  initialW = 420,
  initialH = 340,
  onClose,
  onFocus,
  onToggleMaximize,
  children,
}: WindowProps) {
  const [pos, setPos] = useState({ x: initialX, y: initialY });
  const [size, setSize] = useState({ w: initialW, h: initialH });
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const frame = useRef<HTMLDivElement>(null);
  const posRef = useRef(pos);
  const sizeRef = useRef(size);
  posRef.current = pos;
  sizeRef.current = size;

  const moveSession = useRef<{
    pointerId: number;
    startMouseX: number;
    startMouseY: number;
    originX: number;
    originY: number;
    active: boolean;
  } | null>(null);

  const resizeSession = useRef<{
    pointerId: number;
    edge: Edge;
    startMouseX: number;
    startMouseY: number;
    originX: number;
    originY: number;
    originW: number;
    originH: number;
  } | null>(null);

  const clampPos = useCallback((x: number, y: number, w: number, h: number) => {
    const maxX = Math.max(0, window.innerWidth - w);
    const maxY = Math.max(MENU, window.innerHeight - h - TASK);
    return {
      x: Math.min(maxX, Math.max(0, x)),
      y: Math.min(maxY, Math.max(MENU, y)),
    };
  }, []);

  const applyResize = useCallback(
    (
      edge: Edge,
      dx: number,
      dy: number,
      o: { x: number; y: number; w: number; h: number },
    ) => {
      let { x, y, w, h } = o;

      if (edge.includes("e")) w = o.w + dx;
      if (edge.includes("s")) h = o.h + dy;
      if (edge.includes("w")) {
        w = o.w - dx;
        x = o.x + dx;
      }
      if (edge.includes("n")) {
        h = o.h - dy;
        y = o.y + dy;
      }

      if (w < MIN_W) {
        if (edge.includes("w")) x = o.x + o.w - MIN_W;
        w = MIN_W;
      }
      if (h < MIN_H) {
        if (edge.includes("n")) y = o.y + o.h - MIN_H;
        h = MIN_H;
      }

      const maxW = window.innerWidth - 8;
      const maxH = window.innerHeight - MENU - TASK;
      w = Math.min(w, maxW);
      h = Math.min(h, maxH);

      const clamped = clampPos(x, y, w, h);
      return { x: clamped.x, y: clamped.y, w, h };
    },
    [clampPos],
  );

  useEffect(() => {
    function onMove(e: PointerEvent) {
      const move = moveSession.current;
      if (move && move.pointerId === e.pointerId) {
        const dx = e.clientX - move.startMouseX;
        const dy = e.clientY - move.startMouseY;
        if (!move.active) {
          if (Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
          move.active = true;
          setDragging(true);
        }
        e.preventDefault();
        setPos(
          clampPos(
            move.originX + dx,
            move.originY + dy,
            sizeRef.current.w,
            sizeRef.current.h,
          ),
        );
        return;
      }

      const resize = resizeSession.current;
      if (resize && resize.pointerId === e.pointerId) {
        e.preventDefault();
        const dx = e.clientX - resize.startMouseX;
        const dy = e.clientY - resize.startMouseY;
        const next = applyResize(resize.edge, dx, dy, {
          x: resize.originX,
          y: resize.originY,
          w: resize.originW,
          h: resize.originH,
        });
        setPos({ x: next.x, y: next.y });
        setSize({ w: next.w, h: next.h });
      }
    }

    function onUp(e: PointerEvent) {
      if (moveSession.current?.pointerId === e.pointerId) {
        moveSession.current = null;
        setDragging(false);
        document.body.style.userSelect = "";
      }
      if (resizeSession.current?.pointerId === e.pointerId) {
        resizeSession.current = null;
        setResizing(false);
        document.body.style.userSelect = "";
        document.body.style.cursor = "";
      }
    }

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [applyResize, clampPos]);

  useEffect(() => {
    function onResize() {
      setPos((prev) =>
        clampPos(prev.x, prev.y, sizeRef.current.w, sizeRef.current.h),
      );
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [clampPos]);

  const onTitlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    if ((e.target as HTMLElement).closest("button")) return;
    e.preventDefault();
    onFocus();
    soundFx.flap();
    moveSession.current = {
      pointerId: e.pointerId,
      startMouseX: e.clientX,
      startMouseY: e.clientY,
      originX: posRef.current.x,
      originY: posRef.current.y,
      active: false,
    };
    document.body.style.userSelect = "none";
  };

  const onResizePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const edge = e.currentTarget.getAttribute("data-edge") as Edge | null;
    if (!edge) return;
    e.preventDefault();
    e.stopPropagation();
    onFocus();
    resizeSession.current = {
      pointerId: e.pointerId,
      edge,
      startMouseX: e.clientX,
      startMouseY: e.clientY,
      originX: posRef.current.x,
      originY: posRef.current.y,
      originW: sizeRef.current.w,
      originH: sizeRef.current.h,
    };
    setResizing(true);
    document.body.style.userSelect = "none";
    const cursors: Record<Edge, string> = {
      n: "ns-resize",
      s: "ns-resize",
      e: "ew-resize",
      w: "ew-resize",
      ne: "nesw-resize",
      nw: "nwse-resize",
      se: "nwse-resize",
      sw: "nesw-resize",
    };
    document.body.style.cursor = cursors[edge];
  };

  const handleClass = "absolute z-20 bg-transparent touch-none";

  return (
    <div
      ref={frame}
      role="dialog"
      aria-label={title}
      onMouseDown={() => {
        onFocus();
      }}
      style={
        maximized
          ? {
              zIndex: Math.max(zIndex, 50),
              top: "2.5rem",
              left: "0.5rem",
              right: "0.5rem",
              bottom: "3.75rem",
              width: "auto",
              height: "auto",
            }
          : {
              zIndex,
              left: pos.x,
              top: pos.y,
              width: size.w,
              height: size.h,
            }
      }
      className={`absolute overflow-hidden bg-[#14120f] transition-all border ${
        isActive
          ? "border-[#ff9e00] window-active-shadow"
          : "border-[#332b23] window-inactive-shadow opacity-90"
      } ${dragging || resizing ? "" : "os-window-enter"}`}
    >
      {/* Airport Departure / ATC Instrument Window Title Bar */}
      <div
        data-window-titlebar
        onPointerDown={onTitlePointerDown}
        onDoubleClick={() => {
          soundFx.flap();
          onToggleMaximize();
        }}
        className={`flex h-8 shrink-0 items-center justify-between border-b select-none px-2.5 transition-colors font-mono ${
          isActive
            ? "border-[#ff9e00]/50 bg-[#1c1814] text-[#ff9e00]"
            : "border-[#332b23] bg-[#14120f] text-[#80776d]"
        } ${
          maximized
            ? "cursor-default"
            : dragging
              ? "cursor-grabbing"
              : "cursor-grab"
        }`}
      >
        <div className="flex items-center gap-2">
          {/* Action buttons: Abort (Close), Standby (Min), Flare (Max) */}
          <div
            className="flex items-center gap-1.5"
            onPointerDown={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={(e) => {
                e.stopPropagation();
                soundFx.windowClose();
                onClose();
              }}
              className="btn-destructive flex h-4.5 w-4.5 items-center justify-center border border-[#3a3228] text-[#80776d] hover:bg-[#f97316] hover:text-white transition-colors cursor-pointer"
              title="Close window (Abort)"
            >
              <Close width={10} height={10} className="pixel-icon" />
            </button>
            <button
              type="button"
              aria-label="Minimize"
              onClick={(e) => {
                e.stopPropagation();
                soundFx.flap();
                onClose();
              }}
              className="btn-secondary flex h-4.5 w-4.5 items-center justify-center border border-[#3a3228] text-[#80776d] hover:bg-[#ff9e00] hover:text-[#111111] transition-colors cursor-pointer"
              title="Minimize window"
            >
              <Minus width={10} height={10} className="pixel-icon" />
            </button>
            <button
              type="button"
              aria-label="Maximize"
              onClick={(e) => {
                e.stopPropagation();
                soundFx.flap();
                onToggleMaximize();
              }}
              className="btn-secondary flex h-4.5 w-4.5 items-center justify-center border border-[#3a3228] text-[#80776d] hover:bg-[#22c55e] hover:text-[#111111] transition-colors cursor-pointer"
              title="Toggle maximize"
            >
              <Checkbox width={10} height={10} className="pixel-icon" />
            </button>
          </div>
        </div>

        {/* Title: Solari departure board display type */}
        <div className="flex items-center gap-2 overflow-hidden px-2">
          <span className="text-[10px] text-[#80776d] font-bold">[{gateCode}]</span>
          <p className="truncate text-xs font-bold tracking-wider uppercase text-[#ece5d8]">
            {title}
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-right font-mono text-[9px] uppercase tracking-wider">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isActive ? "bg-[#ff9e00] beacon-hum" : "bg-[#80776d]"
            }`}
          />
          <span className={isActive ? "text-[#ff9e00] font-bold" : "text-[#80776d]"}>
            {isActive ? "ACTIVE" : "STANDBY"}
          </span>
        </div>
      </div>

      {/* Window Content Canvas */}
      <div className="h-[calc(100%-2rem)] overflow-y-auto overscroll-contain bg-[#110f0d] p-4 sm:p-6 text-[#ece5d8]">
        {children}
      </div>

      {!maximized && (
        <>
          <div
            data-resize
            data-edge="n"
            onPointerDown={onResizePointerDown}
            className={`${handleClass} left-3 right-3 top-0 h-2 cursor-ns-resize`}
          />
          <div
            data-resize
            data-edge="s"
            onPointerDown={onResizePointerDown}
            className={`${handleClass} bottom-0 left-3 right-3 h-2 cursor-ns-resize`}
          />
          <div
            data-resize
            data-edge="e"
            onPointerDown={onResizePointerDown}
            className={`${handleClass} right-0 top-3 bottom-3 w-2 cursor-ew-resize`}
          />
          <div
            data-resize
            data-edge="w"
            onPointerDown={onResizePointerDown}
            className={`${handleClass} left-0 top-3 bottom-3 w-2 cursor-ew-resize`}
          />
          <div
            data-resize
            data-edge="ne"
            onPointerDown={onResizePointerDown}
            className={`${handleClass} right-0 top-0 h-4 w-4 cursor-nesw-resize`}
          />
          <div
            data-resize
            data-edge="nw"
            onPointerDown={onResizePointerDown}
            className={`${handleClass} left-0 top-0 h-4 w-4 cursor-nwse-resize`}
          />
          <div
            data-resize
            data-edge="sw"
            onPointerDown={onResizePointerDown}
            className={`${handleClass} bottom-0 left-0 h-4 w-4 cursor-nesw-resize`}
          />
          <div
            data-resize
            data-edge="se"
            onPointerDown={onResizePointerDown}
            className="absolute bottom-0 right-0 z-30 flex h-4 w-4 cursor-nwse-resize items-end justify-end border-l border-t border-[#3a3228] bg-[#1c1814] touch-none"
            title="Drag to resize"
            aria-label="Resize window"
          >
            <svg
              width="8"
              height="8"
              viewBox="0 0 8 8"
              aria-hidden
              className="m-0.5"
            >
              <path
                d="M2 7 H7 M4 7 V4 M7 7 V2"
                stroke="#ff9e00"
                strokeWidth="1.25"
                fill="none"
              />
            </svg>
          </div>
        </>
      )}
    </div>
  );
}
