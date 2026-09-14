export type AppId =
  | "about"
  | "services"
  | "projects"
  | "process"
  | "contact"
  | "wallpaper"
  | "tictactoe";

export const apps: {
  id: AppId;
  label: string;
  code: string;
  fill: string;
  dotColor: string;
}[] = [
  { id: "about", label: "Studio", code: "01_SYS", fill: "#f7c948", dotColor: "#2d8a4e" },
  { id: "projects", label: "Artifacts", code: "02_WRK", fill: "#e45826", dotColor: "#e45826" },
  { id: "services", label: "Capabilities", code: "03_CAP", fill: "#eedec4", dotColor: "#2563eb" },
  { id: "process", label: "Method", code: "04_MTD", fill: "#e3f3e8", dotColor: "#2d8a4e" },
  { id: "contact", label: "Dispatch", code: "05_DSP", fill: "#f4ede2", dotColor: "#e45826" },
  { id: "wallpaper", label: "Walls.png", code: "06_WAL", fill: "#eaf0fc", dotColor: "#2563eb" },
  { id: "tictactoe", label: "TicTac.exe", code: "07_TOY", fill: "#fef8e7", dotColor: "#7d756b" },
];

export const dockApps: AppId[] = [
  "about",
  "projects",
  "services",
  "contact",
  "wallpaper",
  "tictactoe",
];
