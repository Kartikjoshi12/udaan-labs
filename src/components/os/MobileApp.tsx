"use client";

import type { ReactNode } from "react";
import { apps, type AppId } from "./apps";

type MobileAppProps = {
  id: AppId;
  clock: string;
  onClose: () => void;
  children: ReactNode;
};

export function MobileApp({ id, clock, onClose, children }: MobileAppProps) {
  const app = apps.find((a) => a.id === id);

  return (
    <div className="os-app-enter absolute inset-0 z-50 flex flex-col bg-cream text-ink">
      <div className="flex items-center justify-between border-b-[3px] border-ink bg-mustard px-4 pb-1 pt-[max(0.65rem,env(safe-area-inset-top))] text-[12px] font-black">
        <span className="tabular-nums">{clock || "09:41"}</span>
        <span className="text-[10px] uppercase">App</span>
        <span className="text-[10px]">▮▮▮</span>
      </div>

      <div className="flex items-center gap-1 border-b-[3px] border-ink bg-titlebar px-2 py-1.5">
        <button
          type="button"
          onClick={onClose}
          className="nb-btn min-h-10 px-3 text-xs"
          aria-label="Back to home"
        >
          ← Back
        </button>
        <p className="min-w-0 flex-1 truncate text-center text-xs font-black uppercase tracking-wider">
          {app?.label ?? "App"}
        </p>
        <span className="w-16" aria-hidden />
      </div>

      <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        {children}
      </div>
    </div>
  );
}
