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
import { wallpapers, WALLPAPER_STORAGE_KEY, type WallpaperPreset } from "@/lib/wallpapers";

type WallpaperContextValue = {
  wallpapers: WallpaperPreset[];
  current: string;
  setWallpaper: (id: string) => void;
};

const WallpaperContext = createContext<WallpaperContextValue | null>(null);

function readSaved(): string {
  try {
    const saved = window.localStorage.getItem(WALLPAPER_STORAGE_KEY);
    if (saved && wallpapers.some((w) => w.id === saved)) return saved;
  } catch {
    /* ignore */
  }
  return "blueprint-iso";
}

export function WallpaperProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<string>("blueprint-iso");

  useEffect(() => {
    setCurrent(readSaved());
  }, []);

  const setWallpaper = useCallback((id: string) => {
    setCurrent(id);
    try {
      window.localStorage.setItem(WALLPAPER_STORAGE_KEY, id);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(
    () => ({
      wallpapers,
      current,
      setWallpaper,
    }),
    [current, setWallpaper],
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
