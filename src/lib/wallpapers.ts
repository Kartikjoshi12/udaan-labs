/**
 * Wallpapers in /public/wallpapers/
 * Add new filenames here after pasting (no slow probing).
 */
export const wallpapers = [
  "/wallpapers/VibrantFlower.jfif",
  "/wallpapers/GrassMedow.jfif",
  "/wallpapers/Space.jfif",
] as const;

export type WallpaperPath = (typeof wallpapers)[number] | string;

export const WALLPAPER_STORAGE_KEY = "udaan-labs-wallpaper";

/** @deprecated use `wallpapers` — kept so old imports don't break */
export const wallpaperCandidates = wallpapers;

export async function discoverWallpapers(): Promise<string[]> {
  return [...wallpapers];
}
