"use client";

import { useEffect, useState } from "react";
import { soundFx } from "@/lib/sound";

const DEPARTURE_BOARD_STEPS = [
  {
    gate: "GATE 01",
    flight: "UL-101",
    dest: "NEW DELHI / BANGALORE",
    status: "BOARDING",
    remark: "POWERING UP AVIONICS",
  },
  {
    gate: "GATE 02",
    flight: "UL-204",
    dest: "PRODUCTION CLOUD [AWS/VERCEL]",
    status: "CLEARANCE",
    remark: "TRANSPONDER SQUAWK 7042",
  },
  {
    gate: "GATE 03",
    flight: "UL-308",
    dest: "APP STORES / PRODUCTION WEB",
    status: "ON TIME",
    remark: "ILS CAT-III APPROACH READY",
  },
  {
    gate: "GATE 04",
    flight: "UL-412",
    dest: "CLIENT DISPATCH CONSOLE",
    status: "ALL ENGINES RUNNING",
    remark: "CLEARED FOR TAKEOFF",
  },
];

export function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    // Fast bypass if already booted this session
    if (sessionStorage.getItem("udaan-booted")) {
      onComplete();
      return;
    }

    // Play tactile flap sounds at intervals
    soundFx.flapChime();

    const interval = setInterval(() => {
      setStepIndex((prev) => {
        soundFx.flap();
        if (prev < DEPARTURE_BOARD_STEPS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            sessionStorage.setItem("udaan-booted", "true");
            onComplete();
          }, 500);
          return prev;
        }
      });
    }, 450);

    return () => clearInterval(interval);
  }, [onComplete]);

  function handleSkip() {
    soundFx.flap();
    sessionStorage.setItem("udaan-booted", "true");
    onComplete();
  }

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col justify-between bg-[#0e0c0a] p-6 sm:p-10 font-mono text-xs sm:text-sm text-[#ece5d8] select-none bg-crt-scanline">
      <div className="max-w-4xl mx-auto w-full space-y-6 pt-4">
        {/* Terminal Header */}
        <div className="border-b-2 border-[#3a3228] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center bg-[#ff9e00] text-[#111111] font-bold text-xs">
              ✈
            </span>
            <div>
              <div className="text-[#ff9e00] font-bold text-base tracking-wider uppercase">
                Udaan Aerodrome // Departures Initialization
              </div>
              <div className="text-[11px] text-[#80776d]">
                FLIGHT INFORMATION DISPLAY SYSTEM (FIDS) · KERNEL v4.18
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="beacon-hum h-2.5 w-2.5 rounded-full bg-[#ff9e00]" />
            <span className="text-[#ff9e00] font-bold">SOLARI BOARD ACTIVE</span>
          </div>
        </div>

        {/* Departure Split-Flap Board simulation */}
        <div className="border border-[#2a241e] bg-[#14120f] p-4 space-y-2 shadow-2xl">
          <div className="grid grid-cols-12 gap-2 text-[10px] font-bold text-[#80776d] border-b border-[#2a241e] pb-2 uppercase tracking-wider">
            <div className="col-span-2">Gate</div>
            <div className="col-span-2">Flight</div>
            <div className="col-span-4 sm:col-span-5">Destination / Service</div>
            <div className="col-span-4 sm:col-span-3 text-right">Status</div>
          </div>

          {DEPARTURE_BOARD_STEPS.slice(0, stepIndex + 1).map((row, i) => (
            <div
              key={row.flight}
              className="grid grid-cols-12 gap-2 text-xs sm:text-sm font-bold items-center py-1.5 border-b border-[#1f1b17] animate-pulse-short"
            >
              <div className="col-span-2 text-[#80776d] font-mono">{row.gate}</div>
              <div className="col-span-2 text-[#ff9e00]">{row.flight}</div>
              <div className="col-span-4 sm:col-span-5 text-[#f4ede2] truncate">
                {row.dest}
              </div>
              <div className="col-span-4 sm:col-span-3 text-right">
                <span
                  className={`inline-block px-2 py-0.5 text-[10px] sm:text-xs tracking-wider border ${
                    i === stepIndex
                      ? "border-[#ff9e00] bg-[#ff9e00]/15 text-[#ff9e00]"
                      : "border-[#22c55e]/40 bg-[#22c55e]/10 text-[#22c55e]"
                  }`}
                >
                  {row.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center font-mono text-xs text-[#80776d] pt-2">
          Initializing flight deck instruments and digital workbenches...
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full flex items-center justify-between border-t border-[#2a241e] pt-4 text-xs text-[#80776d]">
        <span>Press ESC or click button to bypass gate board</span>
        <button
          type="button"
          onClick={handleSkip}
          className="border border-[#443c33] bg-[#1c1814] px-3 py-1.5 font-mono text-xs text-[#ece5d8] hover:border-[#ff9e00] hover:text-[#ff9e00] transition-colors cursor-pointer"
        >
          [BYPASS TO COCKPIT →]
        </button>
      </div>
    </div>
  );
}
