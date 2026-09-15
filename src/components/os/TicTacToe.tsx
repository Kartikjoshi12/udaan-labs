"use client";

import { useState, useEffect, useRef } from "react";
import { soundFx } from "@/lib/sound";

export function TicTacToe() {
  // Runway 09 - "Land The Plane" Air Traffic Control Approach Mini-Game
  const [altitude, setAltitude] = useState(1000); // 1000 ft to 0 ft
  const [speed, setSpeed] = useState(140); // target: 120-135 knots
  const [alignment, setAlignment] = useState(0); // -100 (left of localizer) to +100 (right)
  const [wind, setWind] = useState(8); // crosswind knots
  const [flaps, setFlaps] = useState(1); // 1, 2, Full (3)
  const [gearDown, setGearDown] = useState(false);
  const [gameState, setGameState] = useState<"holding" | "approach" | "landed" | "go-around">("holding");
  const [report, setReport] = useState("");
  const [flightLog, setFlightLog] = useState<{ landings: number; goArounds: number }>({
    landings: 0,
    goArounds: 0,
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  function startApproach() {
    soundFx.flap();
    setAltitude(1000);
    setSpeed(140);
    setAlignment(Math.floor((Math.random() - 0.5) * 40));
    setWind(Math.floor((Math.random() - 0.5) * 16));
    setFlaps(1);
    setGearDown(false);
    setGameState("approach");
    setReport("Cleared ILS Approach Runway 09. Maintain glide slope.");
  }

  function adjustPitch(delta: number) {
    soundFx.click();
    setSpeed((s) => Math.max(90, Math.min(170, s + delta)));
  }

  function adjustRudder(delta: number) {
    soundFx.click();
    setAlignment((a) => Math.max(-60, Math.min(60, a + delta)));
  }

  function toggleGear() {
    soundFx.flap();
    setGearDown((g) => !g);
  }

  function cycleFlaps() {
    soundFx.flap();
    setFlaps((f) => (f % 3) + 1);
  }

  // Simulation physics tick
  useEffect(() => {
    if (gameState !== "approach") return;

    timerRef.current = setInterval(() => {
      // Altitude decreases based on speed
      setAltitude((alt) => {
        const descentRate = 45 + (speed - 120) * 0.5;
        const nextAlt = alt - descentRate;

        // Crosswind pushes localizer alignment
        setAlignment((a) => a + (wind * 0.15));

        // Touchdown point check
        if (nextAlt <= 0) {
          clearInterval(timerRef.current!);
          // Verify landing parameters
          const speedOk = speed >= 115 && speed <= 138;
          const alignOk = Math.abs(alignment) <= 15;
          const configOk = gearDown && flaps >= 2;

          if (speedOk && alignOk && configOk) {
            soundFx.landingSuccess();
            setGameState("landed");
            setReport(`TOUCHDOWN CONFIRMED on Centerline! Speed: ${Math.round(speed)}kt, Crosswind: ${wind}kt. Welcome to Udaan Aerodrome.`);
            setFlightLog((prev) => ({ ...prev, landings: prev.landings + 1 }));
          } else {
            soundFx.alertTone();
            setGameState("go-around");
            const reasons: string[] = [];
            if (!gearDown) reasons.push("Landing Gear Not Deployed");
            if (flaps < 2) reasons.push("Insufficient Flaps");
            if (!speedOk) reasons.push(speed < 115 ? "Stall Speed (Too Slow)" : "Excessive Touchdown Speed");
            if (!alignOk) reasons.push("Off-Runway Localizer Deviation");
            setReport(`GO-AROUND INITIATED! Tower ordered missed approach: ${reasons.join(", ")}.`);
            setFlightLog((prev) => ({ ...prev, goArounds: prev.goArounds + 1 }));
          }
          return 0;
        }
        return nextAlt;
      });
    }, 400);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState, speed, alignment, wind, gearDown, flaps]);

  return (
    <div className="space-y-4 font-mono text-xs text-[#f4ede2]">
      {/* Header */}
      <div className="border-b border-[#3a3228] pb-3 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[#ff9e00] font-bold text-sm">ATC INSTRUMENT TRAINER</span>
            <span className="border border-[#ff9e00]/40 bg-[#ff9e00]/10 text-[#ff9e00] text-[9px] px-1.5 py-0.5">
              RWY 09
            </span>
          </div>
          <p className="text-[11px] text-[#80776d] mt-0.5">
            Guide Udaan flight UL-101 down the CAT-III instrument glide slope to touchdown.
          </p>
        </div>
        <div className="text-right text-[10px] text-[#80776d]">
          <div>LANDINGS: <span className="text-[#22c55e] font-bold">{flightLog.landings}</span></div>
          <div>GO-AROUNDS: <span className="text-[#f97316] font-bold">{flightLog.goArounds}</span></div>
        </div>
      </div>

      {/* Primary Flight Display / Runway HUD */}
      <div className="relative border-2 border-[#3a3228] bg-[#0c0a08] p-4 h-48 overflow-hidden flex flex-col justify-between select-none">
        {/* Sky / Ground artificial horizon guide */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="h-1/2 bg-gradient-to-b from-[#0e2a3a] to-transparent" />
          <div className="h-1/2 bg-gradient-to-t from-[#2a1a0e] to-transparent border-t border-[#ff9e00]/40" />
        </div>

        {/* Localizer Runway Perspective */}
        <div className="relative z-10 flex-1 flex items-center justify-center">
          <div
            className="transition-transform duration-200"
            style={{
              transform: `translateX(${alignment * 2}px) scale(${Math.max(0.4, (1000 - altitude) / 600)})`,
            }}
          >
            {/* Runway centerline & threshold lights */}
            <div className="w-16 h-28 border-x-2 border-dashed border-[#ff9e00] flex flex-col items-center justify-between bg-black/40">
              <div className="text-[8px] text-[#ff9e00] font-bold">09</div>
              <div className="w-1 h-12 bg-white/60" />
              <div className="text-[7px] text-[#22c55e] font-bold">THRESHOLD</div>
            </div>
          </div>

          {/* Aircraft Crosshair / Flight Director */}
          <div className="absolute pointer-events-none flex items-center justify-center">
            <div className="h-6 w-6 border border-[#22c55e] rounded-full flex items-center justify-center">
              <div className="h-1.5 w-1.5 bg-[#22c55e] rounded-full" />
            </div>
            <div className="w-16 h-[1px] bg-[#22c55e]/60 absolute" />
          </div>
        </div>

        {/* Real-time telemetry readouts */}
        <div className="relative z-10 flex items-center justify-between text-[11px] font-bold border-t border-[#2a241e] pt-1.5">
          <div className="text-[#ff9e00]">
            ALT: <span className="text-white">{Math.round(altitude)} FT</span>
          </div>
          <div className={speed >= 115 && speed <= 138 ? "text-[#22c55e]" : "text-[#f97316]"}>
            IAS: <span className="text-white">{Math.round(speed)} KT</span> (TGT: 125)
          </div>
          <div className={Math.abs(alignment) <= 15 ? "text-[#22c55e]" : "text-[#f97316]"}>
            LOC: <span className="text-white">{alignment > 0 ? `R${Math.round(alignment)}` : `L${Math.round(Math.abs(alignment))}`}</span>
          </div>
          <div className="text-[#80776d]">
            WIND: <span className="text-[#ff9e00]">{wind} KT</span>
          </div>
        </div>
      </div>

      {/* Control Cockpit Board */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          type="button"
          onClick={() => adjustPitch(4)}
          disabled={gameState !== "approach"}
          className="btn-base btn-secondary py-2 text-[10px] disabled:opacity-40"
        >
          ▲ PITCH DOWN (+SPD)
        </button>
        <button
          type="button"
          onClick={() => adjustPitch(-4)}
          disabled={gameState !== "approach"}
          className="btn-base btn-secondary py-2 text-[10px] disabled:opacity-40"
        >
          ▼ PITCH UP (-SPD)
        </button>
        <button
          type="button"
          onClick={() => adjustRudder(-6)}
          disabled={gameState !== "approach"}
          className="btn-base btn-secondary py-2 text-[10px] disabled:opacity-40"
        >
          ◄ RUDDER LEFT
        </button>
        <button
          type="button"
          onClick={() => adjustRudder(6)}
          disabled={gameState !== "approach"}
          className="btn-base btn-secondary py-2 text-[10px] disabled:opacity-40"
        >
          ► RUDDER RIGHT
        </button>
      </div>

      {/* Aircraft Configuration Panel */}
      <div className="flex flex-wrap items-center justify-between gap-2 border border-[#3a3228] bg-[#14120f] p-2.5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleGear}
            disabled={gameState !== "approach"}
            className={`px-2.5 py-1 text-[10px] font-bold border transition-colors ${
              gearDown
                ? "border-[#22c55e] bg-[#22c55e]/20 text-[#22c55e]"
                : "border-[#f97316] bg-[#f97316]/10 text-[#f97316]"
            } disabled:opacity-40`}
          >
            GEAR: {gearDown ? "DOWN & LOCKED" : "UP (STOWED)"}
          </button>

          <button
            type="button"
            onClick={cycleFlaps}
            disabled={gameState !== "approach"}
            className={`px-2.5 py-1 text-[10px] font-bold border transition-colors ${
              flaps >= 2
                ? "border-[#22c55e] bg-[#22c55e]/20 text-[#22c55e]"
                : "border-[#ff9e00] bg-[#ff9e00]/10 text-[#ff9e00]"
            } disabled:opacity-40`}
          >
            FLAPS: {flaps === 1 ? "STAGE 1" : flaps === 2 ? "STAGE 2 (APP)" : "FULL (LDG)"}
          </button>
        </div>

        {gameState !== "approach" ? (
          <button
            type="button"
            onClick={startApproach}
            className="btn-base btn-primary px-3 py-1.5 text-xs tracking-wider"
          >
            ✈ START ILS APPROACH
          </button>
        ) : (
          <div className="text-[10px] text-[#ff9e00] flex items-center gap-1.5 font-bold">
            <span className="beacon-hum h-2 w-2 rounded-full bg-[#ff9e00]" />
            <span>APPROACH IN PROGRESS</span>
          </div>
        )}
      </div>

      {/* Tower Dispatch Report Banner */}
      {report && (
        <div
          className={`border p-2.5 text-xs font-mono leading-relaxed ${
            gameState === "landed"
              ? "border-[#22c55e] bg-[#22c55e]/10 text-[#22c55e]"
              : gameState === "go-around"
              ? "border-[#f97316] bg-[#f97316]/10 text-[#f97316]"
              : "border-[#3a3228] bg-[#14120f] text-[#f4ede2]"
          }`}
        >
          <div className="text-[9px] uppercase tracking-wider text-[#80776d] font-bold mb-0.5">
            TOWER DISPATCH // RWY 09 LOCALIZER
          </div>
          {report}
        </div>
      )}
    </div>
  );
}
