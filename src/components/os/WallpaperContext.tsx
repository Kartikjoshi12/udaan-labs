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
import {
  discoverWallpapers,
  WALLPAPER_STORAGE_KEY,
} from "@/lib/wallpapers";

type WallpaperContextValue = {
  wallpapers: string[];
  current: string | null;
  ready: boolean;
  setWallpaper: (path: string) => void;
  cycleNext: () => void;
};

const WallpaperContext = createContext<WallpaperContextValue | null>(null);

export function WallpaperProvider({ children }: { children: ReactNode }) {
  const [wallpapers, setWallpapers] = useState<string[]>([]);
  const [current, setCurrent] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const found = await discoverWallpapers();
      if (cancelled) return;
      setWallpapers(found);

      const saved =
        typeof window !== "undefined"
          ? window.localStorage.getItem(WALLPAPER_STORAGE_KEY)
          : null;

      if (saved && found.includes(saved)) {
        setCurrent(saved);
      } else if (found.length > 0) {
        setCurrent(found[0]);
      } else {
        setCurrent(null);
      }
      setReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const setWallpaper = useCallback((path: string) => {
    setCurrent(path);
    try {
      window.localStorage.setItem(WALLPAPER_STORAGE_KEY, path);
    } catch {
      /* ignore */
    }
  }, []);

  const cycleNext = useCallback(() => {
    if (wallpapers.length === 0) return;
    const idx = current ? wallpapers.indexOf(current) : -1;
    const next = wallpapers[(idx + 1) % wallpapers.length];
    setWallpaper(next);
  }, [wallpapers, current, setWallpaper]);

  const value = useMemo(
    () => ({ wallpapers, current, ready, setWallpaper, cycleNext }),
    [wallpapers, current, ready, setWallpaper, cycleNext],
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
