"use client";

import { site } from "@/lib/site";
import { apps, dockApps, type AppId } from "./apps";
import { IconArt } from "./IconArt";
import { WallpaperBg } from "./WallpaperBg";
import { DesktopPet } from "./DesktopPet";

type MobileHomeProps = {
  clock: string;
  onOpen: (id: AppId) => void;
};

export function MobileHome({
  clock,
  onOpen,
  onOpenSearch,
}: MobileHomeProps & { onOpenSearch?: () => void }) {
  const dock = apps.filter((a) => dockApps.includes(a.id));

  return (
    <div className="relative z-[1] flex h-[100dvh] max-h-[100dvh] flex-col text-ink bg-transparent overflow-hidden">
      <WallpaperBg />

      {/* Top Mobile Status Header */}
      <div className="relative z-10 shrink-0 flex items-center justify-between border-b-2 border-ink bg-paper px-4 pb-2 pt-[max(0.75rem,env(safe-area-inset-top))] font-mono text-xs shadow-sm">
        <span className="tabular-nums font-semibold">{clock || "09:41"}</span>
        <span className="font-bold tracking-tight">{site.name}</span>
        <div className="flex items-center gap-2">
          {onOpenSearch && (
            <button
              type="button"
              onClick={onOpenSearch}
              className="border border-ink bg-cream px-1.5 py-0.5 text-[9px] font-bold text-ink shadow-[1px_1px_0_0_#111111] active:scale-95 transition-transform"
            >
              🔍 SEARCH
            </button>
          )}
          <span className="text-[10px] text-green font-bold flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-green" /> ONLINE
          </span>
        </div>
      </div>

      {/* Scrollable Center Mobile Home Body */}
      <div className="relative z-[2] flex-1 overflow-y-auto overscroll-contain flex flex-col justify-between pb-3">
        <div>
          <div className="px-5 pt-4">
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
              Independent software studio · Custom web, mobile, and digital solutions.
            </p>
          </div>

          <div className="mx-auto mt-5 grid w-full max-w-sm grid-cols-4 gap-x-3 gap-y-4 px-4">
            {apps.map((app) => (
              <button
                key={app.id}
                type="button"
                onClick={() => onOpen(app.id)}
                className="flex flex-col items-center gap-1.5 group active:scale-95 transition-transform"
              >
                <div className="relative">
                  <span
                    className="icon-tile flex h-14 w-14 items-center justify-center border-2 border-ink shadow-[2px_2px_0_0_#111111]"
                    style={{ backgroundColor: app.fill }}
                  >
                    <IconArt id={app.id} size={28} />
                  </span>
                  <span className="absolute -top-1 -right-1 px-1 text-[7px] font-mono font-bold bg-cream border border-ink">
                    {app.code.split("_")[0]}
                  </span>
                </div>
                <span className="max-w-[4.8rem] truncate border border-ink bg-cream px-1.5 py-0.5 font-mono text-[9.5px] font-bold shadow-[1px_1px_0_0_#111111]">
                  {app.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <DesktopPet isMobile />
      </div>

      {/* Fixed Bottom Dock Navbar (Flushed cleanly to absolute bottom) */}
      <div className="relative z-20 shrink-0 border-t-2 border-ink bg-paper px-4 py-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-2px_6px_rgba(0,0,0,0.06)]">
        <div className="mx-auto flex max-w-sm items-center justify-around gap-2">
          {dock.map((app) => (
            <button
              key={app.id}
              type="button"
              onClick={() => onOpen(app.id)}
              aria-label={app.label}
              className="nb-btn flex h-12 w-12 items-center justify-center border-2 border-ink shadow-[2px_2px_0_0_#111111] active:translate-y-0.5 transition-transform"
              style={{ backgroundColor: app.fill }}
            >
              <IconArt id={app.id} size={26} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
