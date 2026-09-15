export type WallpaperPreset = {
  id: string;
  name: string;
  category: string;
  description: string;
};

export const wallpapers: WallpaperPreset[] = [
  {
    id: "departure-board",
    name: "Split-Flap Solari Board",
    category: "Main Concourse",
    description: "Deep matte black terminal backdrop with mechanical flap letter modules, amber status registers, and gate grid seams.",
  },
  {
    id: "radar-scope",
    name: "ATC Primary Radar (DEL/BLR)",
    category: "Control Tower",
    description: "Phosphor-green & amber 360-degree radar range rings, approach fixes, beacon vectors, and sector boundaries.",
  },
  {
    id: "runway-lighting",
    name: "Runway 09/27 CAT-III",
    category: "Aerodrome",
    description: "Night approach perspective with amber threshold lights, centerline strobe guides, and taxiway holding positions.",
  },
  {
    id: "flight-strip",
    name: "Tower Flight Progress Strips",
    category: "Operations",
    description: "Tactile Manila paper air-traffic control strips with printed route waypoints, squawk codes, and clearance stamps.",
  },
];

export const WALLPAPER_STORAGE_KEY = "udaan-labs-wallpaper-v3";
