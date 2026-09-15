"use client";

import type { ReactNode } from "react";
import { apps, type AppId } from "./apps";
import { soundFx } from "@/lib/sound";

type MobileAppProps = {
  id: AppId;
  clock: string;
  onClose: () => void;
  children: ReactNode;
};

export function MobileApp({ id, clock, onClose, children }: MobileAppProps) {
  const app = apps.find((a) => a.id === id);

  return (
    <div className="os-app-enter absolute inset-0 z-50 flex flex-col bg-[#110f0d] text-[#ece5d8] font-mono">
      <div className="flex items-center justify-between border-b border-[#332b23] bg-[#14120f] px-4 pb-1 pt-[max(0.65rem,env(safe-area-inset-top))] text-xs font-bold">
        <span className="tabular-nums text-[#ff9e00]">{clock || "09:41"} IST</span>
        <span className="text-[10px] uppercase tracking-wider text-[#80776d]">
          CHANNEL // {app?.code ?? "APP"}
        </span>
        <span className="flex items-center gap-1 text-[10px] text-[#22c55e]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e] beacon-hum" /> ACTIVE
        </span>
      </div>

      <div className="flex items-center gap-2 border-b border-[#332b23] bg-[#181512] px-2 py-1.5">
        <button
          type="button"
          onClick={() => {
            soundFx.windowClose();
            onClose();
          }}
          className="btn-base btn-secondary min-h-7 px-2.5 text-xs"
          aria-label="Back to concourse"
        >
          ← CONCOURSE
        </button>
        <p className="min-w-0 flex-1 truncate text-center text-xs font-bold uppercase tracking-wider text-[#f4ede2]">
          {app?.label ?? "Channel"}
        </p>
        <span className="w-14" aria-hidden />
      </div>

      <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        {children}
      </div>
    </div>
  );
}
