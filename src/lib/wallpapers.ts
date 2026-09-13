/**
 * Desktop wallpaper candidates under /public/wallpapers/
 * Paste images there as 1.png, 2.jpg, wallpaper.png, etc.
 */
const EXTS = ["png", "jpg", "jpeg", "webp", "gif", "jfif"] as const;

function numbered(max = 10): string[] {
  const paths: string[] = [];
  for (let i = 1; i <= max; i++) {
    for (const ext of EXTS) {
      paths.push(`/wallpapers/${i}.${ext}`);
    }
  }
  return paths;
}

const named = [
  ...EXTS.flatMap((ext) => [
    `/wallpapers/wallpaper.${ext}`,
    `/wallpapers/bg.${ext}`,
    `/wallpapers/desktop.${ext}`,
  ]),
  // Files already pasted with custom names
  "/wallpapers/VibrantFlower.jfif",
  "/wallpapers/GrassMedow.jfif",
  "/wallpapers/Space.jfif",
];

/** Tried in order until ones that load are collected */
export const wallpaperCandidates = [...numbered(10), ...named];

export const WALLPAPER_STORAGE_KEY = "udaan-labs-wallpaper";

export function probeWallpaper(path: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = path;
  });
}

export async function discoverWallpapers(): Promise<string[]> {
  const found: string[] = [];
  for (const path of wallpaperCandidates) {
    if (await probeWallpaper(path)) found.push(path);
  }
  return found;
}
