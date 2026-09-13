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
  fill: string;
}[] = [
  { id: "about", label: "About", fill: "#ffd60a" },
  { id: "services", label: "Services", fill: "#2d6cdf" },
  { id: "projects", label: "Projects", fill: "#ff4d2e" },
  { id: "process", label: "Process", fill: "#7cb518" },
  { id: "contact", label: "Contact", fill: "#ff6b9d" },
  { id: "wallpaper", label: "Wallpaper", fill: "#b388ff" },
  { id: "tictactoe", label: "TicTacToe", fill: "#00c2a8" },
];

export const dockApps: AppId[] = [
  "about",
  "projects",
  "tictactoe",
  "wallpaper",
];
