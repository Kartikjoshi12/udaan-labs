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
      <div className="flex items-center justify-between border-b-2 border-ink bg-paper px-4 pb-1 pt-[max(0.65rem,env(safe-area-inset-top))] font-mono text-xs font-bold">
        <span className="tabular-nums">{clock || "09:41"}</span>
        <span className="text-[10px] uppercase tracking-wider text-muted">
          WORKSPACE // {app?.code ?? "APP"}
        </span>
        <span className="flex items-center gap-1 text-[10px] text-green">
          <span className="h-1.5 w-1.5 rounded-full bg-green" /> ON
        </span>
      </div>

      <div className="flex items-center gap-2 border-b-2 border-ink bg-titlebar px-2 py-1.5">
        <button
          type="button"
          onClick={onClose}
          className="nb-btn min-h-8 px-2.5 font-mono text-xs"
          aria-label="Back to home"
        >
          ← HOME
        </button>
        <p className="min-w-0 flex-1 truncate text-center font-mono text-xs font-bold uppercase tracking-wider">
          {app?.label ?? "App"}
        </p>
        <span className="w-14" aria-hidden />
      </div>

      <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        {children}
      </div>
    </div>
  );
}
