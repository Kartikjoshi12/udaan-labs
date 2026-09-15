"use client";

import { site } from "@/lib/site";
import { apps, dockApps, type AppId } from "./apps";
import { IconArt } from "./IconArt";
import { soundFx } from "@/lib/sound";

type MobileHomeProps = {
  clock: string;
  onOpen: (id: AppId) => void;
};

export function MobileHome({ clock, onOpen }: MobileHomeProps) {
  const dock = apps.filter((a) => dockApps.includes(a.id));

  function handleOpen(id: AppId) {
    soundFx.windowOpen();
    onOpen(id);
  }

  return (
    <div className="relative z-[1] flex h-full flex-col text-[#ece5d8] bg-[#0f0d0b] font-mono bg-crt-scanline">
      {/* Top Mobile Status Header */}
      <div className="flex items-center justify-between border-b border-[#332b23] bg-[#14120f] px-4 pb-2 pt-[max(0.75rem,env(safe-area-inset-top))] text-xs">
        <span className="tabular-nums font-semibold text-[#ff9e00]">{clock || "09:41"} IST</span>
        <span className="font-bold tracking-tight text-[#f4ede2]">{site.name}</span>
        <span className="text-[10px] text-[#22c55e] font-bold flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e] beacon-hum" /> ON TIME
        </span>
      </div>

      <div className="relative z-[2] px-5 pt-5">
        <div className="flex items-center justify-between gap-2 mb-2 text-[10px]">
          <span className="annotation-tag bg-[#ff9e00]/10 border-[#ff9e00]/40 text-[#ff9e00] font-bold">
            GATE DEL-01 // FIDS
          </span>
          <span className="text-[#22c55e] font-semibold flex items-center gap-1 border border-[#22c55e]/30 bg-[#22c55e]/10 px-2 py-0.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e] beacon-hum" />
            CLEARANCE GRANTED
          </span>
        </div>
        <h1 className="text-2xl font-bold leading-tight tracking-tight uppercase text-[#f4ede2]">
          {site.tagline}
        </h1>
        <p className="mt-2 text-xs text-[#80776d] leading-relaxed">
          Independent digital flight deck. Tap any channel below to inspect aircraft fleet, past departures, and flight plans.
        </p>
      </div>

      <div className="relative z-[2] mx-auto mt-6 grid w-full max-w-sm grid-cols-4 gap-x-3 gap-y-5 px-4">
        {apps.map((app) => (
          <button
            key={app.id}
            type="button"
            onClick={() => handleOpen(app.id)}
            className="flex flex-col items-center gap-1.5 group active:scale-95 transition-transform cursor-pointer"
          >
            <div className="relative">
              <span
                className="icon-tile flex h-14 w-14 items-center justify-center border border-[#3a3228] bg-[#161310] split-flap-module"
                style={{ backgroundColor: app.fill }}
              >
                <IconArt id={app.id} size={26} className="text-[#ece5d8] group-hover:text-[#ff9e00]" />
              </span>
              <span
                className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full beacon-hum"
                style={{ backgroundColor: app.accent }}
              />
            </div>
            <span className="max-w-[4.8rem] truncate border border-[#332b23] bg-[#14120f]/90 px-1.5 py-0.5 font-mono text-[10px] text-[#ece5d8]">
              {app.label}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-auto" />

      {/* Dock Bar */}
      <div className="relative z-[2] border-t border-[#332b23] bg-[#110f0d] px-3 py-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="mx-auto flex max-w-sm items-center justify-around gap-2">
          {dock.map((app) => (
            <button
              key={app.id}
              type="button"
              onClick={() => handleOpen(app.id)}
              aria-label={app.label}
              className="flex h-11 w-11 items-center justify-center border border-[#3a3228] bg-[#161310] active:translate-y-0.5 cursor-pointer split-flap-module"
            >
              <IconArt id={app.id} size={22} className="text-[#ece5d8]" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
