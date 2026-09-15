"use client";

import { useWallpaper } from "./WallpaperContext";

export function WallpaperBg() {
  const { current } = useWallpaper();

  switch (current) {
    case "radar-scope":
      // Air Traffic Control Radar scope: green/amber phosphor sweeping display
      return (
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#0a0f0d] bg-crt-scanline">
          {/* Radar sweep glow */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[90vmin] w-[90vmin] rounded-full border border-[#22c55e]/25"
            style={{
              backgroundImage:
                "repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent 48px, rgba(34, 197, 94, 0.15) 49px, transparent 50px)",
            }}
          />
          {/* 360 degree azimuth bearing ticks */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[90vmin] w-[90vmin] rounded-full border border-dashed border-[#22c55e]/30" />
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#22c55e]/15 -translate-x-1/2" />
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#22c55e]/15 -translate-y-1/2" />

          {/* Simulated radar blips and flight tags */}
          <div className="absolute left-[28%] top-[34%] font-mono text-[10px] text-[#22c55e] opacity-75 hidden md:block">
            <span className="inline-block h-2 w-2 rounded-full bg-[#22c55e] animate-ping mr-1.5" />
            <span>UL-001 ✈ FL320 480KT</span>
            <div className="text-[8px] text-[#22c55e]/60 ml-3.5">DEL → BLR // ON COURSE</div>
          </div>

          <div className="absolute right-[32%] bottom-[28%] font-mono text-[10px] text-[#ff9e00] opacity-80 hidden md:block">
            <span className="inline-block h-2 w-2 rounded-full bg-[#ff9e00] mr-1.5" />
            <span>UL-002 ✈ FL180 290KT</span>
            <div className="text-[8px] text-[#ff9e00]/60 ml-3.5">APPROACH RWY 09</div>
          </div>

          {/* Corner Radar Station Metadata */}
          <div className="absolute right-6 top-12 font-mono text-[10px] text-[#22c55e]/40 leading-relaxed text-right select-none hidden lg:block">
            <div>PRIMARY SURVEILLANCE RADAR // SEC-4</div>
            <div>FREQ: 124.850 MHz · SQUAWK RANGE: 7000-7077</div>
            <div>QNH: 1013 hPa · WIND: 090/08KT</div>
          </div>
        </div>
      );

    case "runway-lighting":
      // Aerodrome night runway approach: amber threshold beacons & centerline guidance
      return (
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#0d0d0c] bg-crt-scanline">
          {/* Subtle runway threshold perspective lines */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, rgba(255, 158, 0, 0.25) 1px, transparent 1px), linear-gradient(to right, rgba(255, 158, 0, 0.08) 1px, transparent 1px)",
              backgroundSize: "100% 32px, 80px 100%",
            }}
          />
          {/* Centerline optical guide */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 opacity-30 bg-gradient-to-b from-transparent via-[#ff9e00] to-transparent" />
          
          <div className="absolute left-8 bottom-16 select-none font-mono text-[10px] text-[#ff9e00]/40 leading-relaxed hidden md:block">
            <p>AERODROME: VIDP / DEL // CAT-III ILS ACTIVE</p>
            <p>TDZ ELEVATION: 777 FT // ALS INTENSITY: 100%</p>
            <p>SURFACE: DRY // RVR: &gt; 2000M</p>
          </div>
        </div>
      );

    case "flight-strip":
      // Air Traffic Control Flight Progress Strip board (warm Manila paper with ink stamps)
      return (
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#f4ede2]">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `
                linear-gradient(to bottom, rgba(23, 20, 17, 0.15) 1px, transparent 1px),
                linear-gradient(to right, rgba(23, 20, 17, 0.08) 1px, transparent 1px)
              `,
              backgroundSize: "100% 48px, 120px 100%",
            }}
          />
          <div className="absolute inset-0 bg-radial from-white/40 via-transparent to-black/10" />
          <div className="absolute right-8 top-12 select-none font-mono text-[10px] text-[#171411]/30 leading-tight text-right hidden xl:block">
            <div>PROGRESS STRIP BAY // TOWER EN-ROUTE</div>
            <div>AIRWAY W-122 // FLIGHT PROGRESS REGISTRY</div>
          </div>
        </div>
      );

    case "departure-board":
    default:
      // Solari Split-Flap departure board: deep black textured board with amber modules & flap seam lines
      return (
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#110f0d] bg-crt-scanline">
          {/* Split-flap horizontal and vertical module grid seams */}
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: `
                linear-gradient(to bottom, rgba(255, 158, 0, 0.15) 1px, transparent 1px),
                linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
              `,
              backgroundSize: "100% 28px, 20px 100%",
            }}
          />
          {/* Ambient concourse flood lighting gradient */}
          <div className="absolute inset-0 bg-radial from-[#ff9e00]/8 via-transparent to-black/40" />
          
          {/* Subtle Departure Concourse header watermark */}
          <div className="absolute left-8 top-12 select-none font-mono text-[10px] text-[#ff9e00]/30 tracking-widest hidden md:block">
            <span>UDAAN LABS // MAIN TERMINAL CONCOURSE // FLIGHT INFORMATION DISPLAY SYSTEM</span>
          </div>
        </div>
      );
  }
}
