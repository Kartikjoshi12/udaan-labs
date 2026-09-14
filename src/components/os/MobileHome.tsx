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
    <div className="relative z-[1] flex h-full flex-col text-ink">
      <div className="flex items-center justify-between border-b-[3px] border-ink bg-mustard px-4 pb-2 pt-[max(0.75rem,env(safe-area-inset-top))] text-[12px]">
        <span className="tabular-nums">{clock || "09:41"}</span>
        <span className="font-semibold">{site.name}</span>
        <span className="text-[10px] text-ink/60">▮▮▮</span>
      </div>

      <div className="relative z-[2] px-5 pt-6">
        <p className="text-xs text-muted">{site.hero.eyebrow}</p>
        <h1 className="mt-1 font-[family-name:var(--font-space-grotesk)] text-2xl font-bold leading-tight">
          {site.tagline}
        </h1>
      </div>

      <div className="relative z-[2] mx-auto mt-8 grid w-full max-w-sm grid-cols-4 gap-x-2 gap-y-5 px-4">
        {apps.map((app) => (
          <button
            key={app.id}
            type="button"
            onClick={() => onOpen(app.id)}
            className="flex flex-col items-center gap-1.5"
          >
            <span
              className="icon-tile flex h-14 w-14 items-center justify-center"
              style={{ backgroundColor: app.fill }}
            >
              <IconArt id={app.id} size={32} />
            </span>
            <span className="max-w-[4.5rem] truncate border-2 border-ink bg-cream px-1 text-[10px]">
              {app.label}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-auto" />

      <div className="relative z-[2] border-t-[3px] border-ink bg-paper px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="mx-auto flex max-w-sm items-center justify-around gap-2">
          {dock.map((app) => (
            <button
              key={app.id}
              type="button"
              onClick={() => onOpen(app.id)}
              aria-label={app.label}
              className="flex h-14 w-14 items-center justify-center border-[3px] border-ink nb-shadow-sm"
              style={{ backgroundColor: app.fill }}
            >
              <IconArt id={app.id} size={32} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
