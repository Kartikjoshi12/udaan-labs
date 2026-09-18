"use client";

import { useEffect, useState } from "react";
import { Zap, Moon, Sun, Check } from "pixelarticons/react";

const SPEECHES = [
  "Building fast MVPs!",
  "Zero agency bloat.",
  "Direct dev access!",
  "Click my belly!",
  "Pixel perfect UI ✨",
  "Ship software fast 🚀",
];

export function DesktopPet() {
  const [x, setX] = useState(300);
  const [dir, setDir] = useState<1 | -1>(1);
  const [speech, setSpeech] = useState<string | null>(null);
  const [mood, setMood] = useState<"happy" | "sleepy" | "curious">("happy");
  const [clicks, setClicks] = useState(0);

  // Wander along the bottom of the screen above taskbar
  useEffect(() => {
    const interval = window.setInterval(() => {
      if (Math.random() > 0.4) {
        setX((prev) => {
          const max = window.innerWidth - 140;
          const min = 40;
          let next = prev + dir * (15 + Math.random() * 25);
          if (next >= max) {
            setDir(-1);
            next = max;
          } else if (next <= min) {
            setDir(1);
            next = min;
          }
          return next;
        });
      }

      // Random mood or change direction
      if (Math.random() > 0.8) {
        setDir((prev) => (prev === 1 ? -1 : 1));
      }
    }, 2500);

    return () => window.clearInterval(interval);
  }, [dir]);

  const interact = () => {
    setClicks((c) => c + 1);
    const quote = SPEECHES[clicks % SPEECHES.length];
    setSpeech(quote);
    setMood("happy");

    setTimeout(() => {
      setSpeech(null);
    }, 3000);
  };

  return (
    <div
      style={{ left: x }}
      className="absolute bottom-12 z-30 transition-all duration-1000 ease-out select-none pointer-events-auto"
    >
      {/* Speech bubble */}
      {speech && (
        <div className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap border-2 border-ink bg-paper px-2 py-0.5 font-mono text-[10px] font-bold text-ink shadow-[2px_2px_0_0_#111111] animate-bounce">
          {speech}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-0 w-0 border-x-4 border-x-transparent border-t-4 border-t-ink" />
        </div>
      )}

      {/* 8-bit Robot Pet sprite */}
      <button
        type="button"
        onClick={interact}
        title="Udaan Bot (Click me!)"
        className="group relative flex flex-col items-center cursor-pointer focus:outline-none"
      >
        <div className="relative flex h-8 w-8 items-center justify-center border-2 border-ink bg-yellow shadow-[2px_2px_0_0_#111111] transition-transform group-hover:scale-110 group-active:scale-95">
          {/* Antenna */}
          <span className="absolute -top-2 left-1/2 -translate-x-1/2 h-1.5 w-0.5 bg-ink">
            <span className="absolute -top-1 -left-0.5 h-1.5 w-1.5 rounded-full bg-orange animate-pulse" />
          </span>

          {/* Eyes */}
          <div className="flex gap-1">
            <span className="h-1.5 w-1.5 bg-ink" />
            <span className="h-1.5 w-1.5 bg-ink" />
          </div>

          {/* Smile / Mouth */}
          <span className="absolute bottom-1 h-0.5 w-3 bg-ink" />
        </div>

        <span className="mt-0.5 border border-ink/50 bg-cream/90 px-1 font-mono text-[8px] font-bold text-muted shadow-[1px_1px_0_0_#111111]">
          BOT v1.0
        </span>
      </button>
    </div>
  );
}
