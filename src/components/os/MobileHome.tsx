"use client";

import { site } from "@/lib/site";
import { apps, dockApps, type AppId } from "./apps";
import { IconArt } from "./IconArt";

type MobileHomeProps = {
  clock: string;
  onOpen: (id: AppId) => void;
};

export function MobileHome({ clock, onOpen }: MobileHomeProps) {
  const dock = apps.filter((a) => dockApps.includes(a.id));

  return (
    <div className="relative z-[1] flex h-full flex-col text-ink bg-[#f7f4ed]">
      <div className="flex items-center justify-between border-b-2 border-ink bg-paper px-4 pb-2 pt-[max(0.75rem,env(safe-area-inset-top))] font-mono text-xs">
        <span className="tabular-nums font-semibold">{clock || "09:41"}</span>
        <span className="font-bold tracking-tight">{site.name}</span>
        <span className="text-[10px] text-green font-bold flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-green" /> ONLINE
        </span>
      </div>

      <div className="relative z-[2] px-5 pt-5">
        <div className="flex items-center justify-between gap-2 mb-2 font-mono text-[10px]">
          <span className="annotation-tag bg-yellow text-[9px] font-bold">UL_ // STUDIO</span>
          <span className="text-green font-bold flex items-center gap-1 border border-ink bg-cream px-2 py-0.5 shadow-[1px_1px_0_0_#111111]">
            <span className="h-1.5 w-1.5 rounded-full bg-green" />
            AVAILABLE FOR WORK
          </span>
        </div>
        <h1 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold leading-tight tracking-tight uppercase text-ink">
          {site.tagline}
        </h1>
        <p className="mt-2 font-mono text-[11px] text-muted">
          Independent digital workshop · Tap any tool below to inspect work.
        </p>
      </div>

      <div className="relative z-[2] mx-auto mt-6 grid w-full max-w-sm grid-cols-4 gap-x-3 gap-y-5 px-4">
        {apps.map((app) => (
          <button
            key={app.id}
            type="button"
            onClick={() => onOpen(app.id)}
            className="flex flex-col items-center gap-1.5 group active:scale-95 transition-transform"
          >
            <div className="relative">
              <span
                className="icon-tile flex h-14 w-14 items-center justify-center border-2 border-ink"
                style={{ backgroundColor: app.fill }}
              >
                <IconArt id={app.id} size={28} />
              </span>
              <span className="absolute -top-1 -right-1 px-1 text-[7px] font-mono font-bold bg-cream border border-ink">
                {app.code.split("_")[0]}
              </span>
            </div>
            <span className="max-w-[4.5rem] truncate border border-ink bg-cream px-1.5 py-0.2 font-mono text-[10px] shadow-[1px_1px_0_0_#111111]">
              {app.label}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-auto" />

      <div className="relative z-[2] border-t-2 border-ink bg-paper px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="mx-auto flex max-w-sm items-center justify-around gap-2">
          {dock.map((app) => (
            <button
              key={app.id}
              type="button"
              onClick={() => onOpen(app.id)}
              aria-label={app.label}
              className="nb-btn flex h-13 w-13 items-center justify-center border-2 border-ink shadow-[2px_2px_0_0_#111111]"
              style={{ backgroundColor: app.fill }}
            >
              <IconArt id={app.id} size={28} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
