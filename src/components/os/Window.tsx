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

type WindowProps = {
  id: string;
  title: string;
  zIndex: number;
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
const MIN_W = 280;
const MIN_H = 200;
const MENU = 48;
const TASK = 72;

export function Window({
  title,
  zIndex,
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
      }
      if (resizeSession.current?.pointerId === e.pointerId) {
        resizeSession.current = null;
        setResizing(false);
        document.body.style.cursor = "";
      }
      document.body.style.userSelect = "";
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
    function onViewportResize() {
      setPos((p) => clampPos(p.x, p.y, sizeRef.current.w, sizeRef.current.h));
      setSize((s) => ({
        w: Math.min(s.w, window.innerWidth - 8),
        h: Math.min(s.h, window.innerHeight - MENU - TASK),
      }));
    }
    window.addEventListener("resize", onViewportResize);
    return () => window.removeEventListener("resize", onViewportResize);
  }, [clampPos]);

  useEffect(() => {
    setSize({
      w: Math.min(initialW, Math.max(MIN_W, window.innerWidth - 48)),
      h: Math.min(initialH, Math.max(MIN_H, window.innerHeight - MENU - TASK - 24)),
    });
    setPos(clampPos(initialX, initialY, initialW, initialH));
  }, [clampPos, initialH, initialW, initialX, initialY]);

  const onTitlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    if (maximized) return;
    if ((e.target as HTMLElement).closest("button")) return;
    onFocus();
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

  const onResizePointerDown =
    (edge: Edge) => (e: ReactPointerEvent<HTMLDivElement>) => {
      if (e.button !== 0) return;
      if (maximized) return;
      e.stopPropagation();
      e.preventDefault();
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
      onMouseDown={(e) => {
        if ((e.target as HTMLElement).closest("[data-window-titlebar]")) return;
        if ((e.target as HTMLElement).closest("[data-resize]")) return;
        onFocus();
      }}
      style={
        maximized
          ? {
              zIndex: Math.max(zIndex, 50),
              top: "3rem",
              left: "0.5rem",
              right: "0.5rem",
              bottom: "5.5rem",
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
      className={`absolute overflow-hidden border-2 border-ink bg-cream nb-shadow-lg ${
        dragging || resizing ? "" : "os-window-enter"
      }`}
    >
      <div
        data-window-titlebar
        onPointerDown={onTitlePointerDown}
        onDoubleClick={onToggleMaximize}
        className={`flex h-9 shrink-0 items-center justify-between border-b-2 border-ink bg-titlebar px-2 select-none ${
          maximized
            ? "cursor-default"
            : dragging
              ? "cursor-grabbing"
              : "cursor-grab"
        }`}
      >
        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-1.5"
            onPointerDown={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="flex h-5 w-5 items-center justify-center border border-ink bg-cream hover:bg-orange hover:text-cream active:translate-x-0.5 active:translate-y-0.5 transition-colors"
            >
              <Close width={12} height={12} className="pixel-icon" />
            </button>
            <button
              type="button"
              aria-label="Minimize"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="flex h-5 w-5 items-center justify-center border border-ink bg-cream hover:bg-yellow active:translate-x-0.5 active:translate-y-0.5 transition-colors"
            >
              <Minus width={12} height={12} className="pixel-icon" />
            </button>
            <button
              type="button"
              aria-label="Maximize"
              onClick={(e) => {
                e.stopPropagation();
                onToggleMaximize();
              }}
              className="flex h-5 w-5 items-center justify-center border border-ink bg-cream hover:bg-green-soft active:translate-x-0.5 active:translate-y-0.5 transition-colors"
            >
              <Checkbox width={12} height={12} className="pixel-icon" />
            </button>
          </div>
        </div>

        <p className="pointer-events-none mx-2 flex-1 truncate text-center font-[family-name:var(--font-space-grotesk)] text-xs font-bold text-ink">
          {title}
        </p>

        <div className="w-12 text-right">
          <span className="font-mono text-[9px] text-faint uppercase tracking-wider">
            [UL]
          </span>
        </div>
      </div>

      <div className="h-[calc(100%-2.25rem)] overflow-y-auto overscroll-contain bg-cream p-4 md:p-5">
        {children}
      </div>

      {!maximized && (
        <>
          <div
            data-resize
            onPointerDown={onResizePointerDown("n")}
            className={`${handleClass} left-3 right-3 top-0 h-2 cursor-ns-resize`}
          />
          <div
            data-resize
            onPointerDown={onResizePointerDown("s")}
            className={`${handleClass} bottom-0 left-3 right-3 h-2 cursor-ns-resize`}
          />
          <div
            data-resize
            onPointerDown={onResizePointerDown("e")}
            className={`${handleClass} right-0 top-3 bottom-3 w-2 cursor-ew-resize`}
          />
          <div
            data-resize
            onPointerDown={onResizePointerDown("w")}
            className={`${handleClass} left-0 top-3 bottom-3 w-2 cursor-ew-resize`}
          />
          <div
            data-resize
            onPointerDown={onResizePointerDown("ne")}
            className={`${handleClass} right-0 top-0 h-4 w-4 cursor-nesw-resize`}
          />
          <div
            data-resize
            onPointerDown={onResizePointerDown("nw")}
            className={`${handleClass} left-0 top-0 h-4 w-4 cursor-nwse-resize`}
          />
          <div
            data-resize
            onPointerDown={onResizePointerDown("sw")}
            className={`${handleClass} bottom-0 left-0 h-4 w-4 cursor-nesw-resize`}
          />
          <div
            data-resize
            onPointerDown={onResizePointerDown("se")}
            className="absolute bottom-0 right-0 z-30 flex h-4 w-4 cursor-nwse-resize items-end justify-end border-l-2 border-t-2 border-ink bg-titlebar touch-none"
            title="Drag to resize"
            aria-label="Resize window"
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              aria-hidden
              className="m-0.5"
            >
              <path
                d="M2 9 H9 M5 9 V5 M9 9 V2"
                stroke="#111111"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          </div>
        </>
      )}
    </div>
  );
}
