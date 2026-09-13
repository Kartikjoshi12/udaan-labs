import type { ReactNode } from "react";

export function DoodleStar({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden>
      <path
        d="M20 2 L23 15 L37 16 L25 24 L29 38 L20 30 L11 38 L15 24 L3 16 L17 15 Z"
        fill="#ffd60a"
        stroke="#0a0a0a"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DoodleSquiggle({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 36" fill="none" aria-hidden>
      <path
        d="M4 22 C20 4, 36 30, 52 14 S84 4, 116 20"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function DoodleStamp({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 72 72" fill="none" aria-hidden>
      <rect
        x="6"
        y="6"
        width="60"
        height="60"
        stroke="#0a0a0a"
        strokeWidth="3"
        fill="#ff4d2e"
      />
      <text
        x="36"
        y="42"
        textAnchor="middle"
        fontSize="14"
        fontFamily="monospace"
        fontWeight="900"
        fill="#fff8e7"
      >
        OK
      </text>
    </svg>
  );
}

export function DoodleArrow({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 24" fill="none" aria-hidden>
      <path d="M2 12 H50" stroke="currentColor" strokeWidth="3.5" />
      <path
        d="M42 4 L54 12 L42 20"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

/** Hard color blocks instead of soft clouds */
export function CloudDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden" aria-hidden>
      <div className="absolute left-[8%] top-[18%] h-16 w-28 border-[3px] border-ink bg-cream nb-shadow-sm" />
      <div className="absolute right-[12%] top-[14%] h-20 w-36 border-[3px] border-ink bg-mustard nb-shadow-sm" />
      <div className="absolute bottom-[30%] left-[40%] h-12 w-24 border-[3px] border-ink bg-pink nb-shadow-sm" />
      <div className="absolute right-[30%] top-[40%] h-10 w-10 border-[3px] border-ink bg-olive" />
    </div>
  );
}

export function StickyNote({
  children,
  className = "",
  rotate = "0deg",
}: {
  children: ReactNode;
  className?: string;
  rotate?: string;
}) {
  return (
    <div
      className={`border-[3px] border-ink bg-mustard p-3 text-ink nb-shadow ${className}`}
      style={{ transform: `rotate(${rotate})` }}
    >
      {children}
    </div>
  );
}
