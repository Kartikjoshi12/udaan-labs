"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { apps, type AppId } from "./apps";
import { IconArt } from "./IconArt";

type DesktopIconsProps = {
  onOpen: (id: AppId) => void;
};

type Pos = { x: number; y: number };

/** Left column of desktop — keep above the taskbar */
const defaultPositions: Record<AppId, Pos> = {
  about: { x: 28, y: 64 },
  services: { x: 28, y: 168 },
  projects: { x: 28, y: 272 },
  process: { x: 140, y: 64 },
  contact: { x: 140, y: 168 },
  wallpaper: { x: 140, y: 272 },
  tictactoe: { x: 140, y: 376 },
};

const DRAG_THRESHOLD = 6;

export function DesktopIcons({ onOpen }: DesktopIconsProps) {
  const [positions, setPositions] = useState(defaultPositions);
  const [draggingId, setDraggingId] = useState<AppId | null>(null);
  const positionsRef = useRef(positions);
  positionsRef.current = positions;

  const session = useRef<{
    id: AppId;
    pointerId: number;
    startMouseX: number;
    startMouseY: number;
    originX: number;
    originY: number;
    dragging: boolean;
  } | null>(null);

  useEffect(() => {
    function onMove(e: PointerEvent) {
      const s = session.current;
      if (!s || s.pointerId !== e.pointerId) return;
      const dx = e.clientX - s.startMouseX;
      const dy = e.clientY - s.startMouseY;
      if (!s.dragging) {
        if (Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
        s.dragging = true;
        setDraggingId(s.id);
      }
      const nextX = Math.max(8, Math.min(window.innerWidth - 120, s.originX + dx));
      const nextY = Math.max(56, Math.min(window.innerHeight - 150, s.originY + dy));
      setPositions((prev) => ({ ...prev, [s.id]: { x: nextX, y: nextY } }));
    }

    function onUp(e: PointerEvent) {
      const s = session.current;
      if (!s || s.pointerId !== e.pointerId) return;
      const wasDrag = s.dragging;
      const id = s.id;
      session.current = null;
      setDraggingId(null);
      document.body.style.userSelect = "";
      if (!wasDrag) onOpen(id);
    }

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [onOpen]);

  const onPointerDown = useCallback(
    (id: AppId, e: ReactPointerEvent<HTMLButtonElement>) => {
      if (e.button !== 0) return;
      e.preventDefault();
      e.stopPropagation();
      const p = positionsRef.current[id];
      session.current = {
        id,
        pointerId: e.pointerId,
        startMouseX: e.clientX,
        startMouseY: e.clientY,
        originX: p.x,
        originY: p.y,
        dragging: false,
      };
      document.body.style.userSelect = "none";
    },
    [],
  );

  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      {apps.map((app) => {
        const p = positions[app.id];
        const isDragging = draggingId === app.id;
        return (
          <button
            key={app.id}
            type="button"
            style={{ left: p.x, top: p.y, zIndex: isDragging ? 70 : 20 }}
            onPointerDown={(e) => onPointerDown(app.id, e)}
            className={`pointer-events-auto absolute flex w-[90px] flex-col items-center gap-1.5 p-1 text-center focus:outline-none group ${
              isDragging ? "cursor-grabbing opacity-90 scale-105" : "cursor-grab"
            }`}
            title="Drag to move · click to open"
          >
            <span
              className="pointer-events-none icon-tile flex h-14 w-14 items-center justify-center bg-paper relative group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"
              style={{ backgroundColor: app.fill }}
            >
              <IconArt id={app.id} size={30} />
            </span>
            <span className="pointer-events-none max-w-[88px] truncate border border-ink bg-cream px-1.5 py-0.5 font-mono text-[11px] font-semibold text-ink shadow-[2px_2px_0_0_#111111]">
              {app.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
