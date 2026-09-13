# Wallpapers

Paste your desktop wallpaper images **in this folder**.

## Easy names (auto-detected)

Name files like:

- `1.png` / `1.jpg`
- `2.png` / `2.jpg`
- `3.webp`
- … up to `10`

Or:

- `wallpaper.png`
- `wallpaper.jpg`
- `bg.png`
- `bg.jpg`

Supported: `.png` `.jpg` `.jpeg` `.webp` `.gif` `.jfif`

## Tip for best quality

Use **larger photos** when you can (e.g. 1920×1080 or bigger, JPG/PNG).  
Very small files look blurry when stretched to full screen.

## After pasting

1. Add the filename to `src/lib/wallpapers.ts` (fast load — no scanning)
2. Refresh (`Ctrl + Shift + R`)
3. Open the **Wallpaper** app to switch

Example in `wallpapers.ts`:

```ts
export const wallpapers = [
  "/wallpapers/VibrantFlower.jfif",
  "/wallpapers/GrassMedow.jfif",
  "/wallpapers/Space.jfif",
  "/wallpapers/your-new-file.jpg", // add here
];
```
