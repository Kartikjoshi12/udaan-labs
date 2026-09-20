export type AppId =
  | "about"
  | "services"
  | "projects"
  | "process"
  | "terminal"
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
  { id: "about", label: "About Us", code: "01_ABOUT", fill: "#f7c948", dotColor: "#2d8a4e" },
  { id: "projects", label: "Projects", code: "02_WORK", fill: "#e45826", dotColor: "#e45826" },
  { id: "services", label: "Services", code: "03_SERV", fill: "#eedec4", dotColor: "#2563eb" },
  { id: "process", label: "Process", code: "04_PROC", fill: "#e3f3e8", dotColor: "#2d8a4e" },
  { id: "terminal", label: "Terminal", code: "05_CLI", fill: "#e3f3e8", dotColor: "#2d8a4e" },
  { id: "contact", label: "Contact", code: "06_MAIL", fill: "#f4ede2", dotColor: "#e45826" },
  { id: "wallpaper", label: "Wallpaper", code: "07_WALL", fill: "#eaf0fc", dotColor: "#2563eb" },
  { id: "tictactoe", label: "Tic Tac Toe", code: "08_GAME", fill: "#fef8e7", dotColor: "#7d756b" },
];

export const dockApps: AppId[] = [
  "about",
  "projects",
  "services",
  "terminal",
  "contact",
  "wallpaper",
];
