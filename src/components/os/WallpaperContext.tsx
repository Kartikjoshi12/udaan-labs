"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { wallpapers, WALLPAPER_STORAGE_KEY } from "@/lib/wallpapers";

type WallpaperContextValue = {
  wallpapers: string[];
  current: string | null;
  ready: boolean;
  setWallpaper: (path: string) => void;
  cycleNext: () => void;
};

const WallpaperContext = createContext<WallpaperContextValue | null>(null);

function readSaved(): string | null {
  try {
    const saved = window.localStorage.getItem(WALLPAPER_STORAGE_KEY);
    if (saved !== null) return saved;
  } catch {
    /* ignore */
  }
  return "";
}

export function WallpaperProvider({ children }: { children: ReactNode }) {
  // Instant — no network probing of 80 missing files
  const list = useMemo((): string[] => [...wallpapers], []);
  const [current, setCurrent] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const initial = readSaved();
    setCurrent(initial);
    setReady(true);

    // Warm browser cache for all wallpapers in background
    for (const path of list) {
      const img = new window.Image();
      img.decoding = "async";
      img.src = path;
    }
  }, [list]);

  const setWallpaper = useCallback((path: string) => {
    setCurrent(path);
    try {
      window.localStorage.setItem(WALLPAPER_STORAGE_KEY, path);
    } catch {
      /* ignore */
    }
    // Prefetch next paint
    const img = new window.Image();
    img.src = path;
  }, []);

  const cycleNext = useCallback(() => {
    if (list.length === 0) return;
    const idx = current ? list.findIndex((p) => p === current) : -1;
    const next = list[(Math.max(idx, -1) + 1) % list.length]!;
    setWallpaper(next);
  }, [list, current, setWallpaper]);

  const value = useMemo(
    () => ({
      wallpapers: list,
      current,
      ready,
      setWallpaper,
      cycleNext,
    }),
    [list, current, ready, setWallpaper, cycleNext],
  );

  return (
    <WallpaperContext.Provider value={value}>
      {children}
    </WallpaperContext.Provider>
  );
}

export function useWallpaper() {
  const ctx = useContext(WallpaperContext);
  if (!ctx) {
    throw new Error("useWallpaper must be used within WallpaperProvider");
  }
  return ctx;
}
