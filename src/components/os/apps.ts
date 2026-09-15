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
  sublabel: string;
  fill: string;
  accent: string;
}[] = [
  {
    id: "about",
    label: "Gate Info",
    code: "G-01",
    sublabel: "Studio Brief",
    fill: "#171411",
    accent: "#ff9e00",
  },
  {
    id: "projects",
    label: "Departures",
    code: "DEP-02",
    sublabel: "Shipped Work",
    fill: "#171411",
    accent: "#ff9e00",
  },
  {
    id: "services",
    label: "Fleet",
    code: "FLT-03",
    sublabel: "Capabilities",
    fill: "#171411",
    accent: "#22c55e",
  },
  {
    id: "process",
    label: "Flight Plan",
    code: "PLN-04",
    sublabel: "How We Ship",
    fill: "#171411",
    accent: "#ff9e00",
  },
  {
    id: "contact",
    label: "Control Tower",
    code: "TWR-05",
    sublabel: "Inquiries",
    fill: "#171411",
    accent: "#f97316",
  },
  {
    id: "wallpaper",
    label: "Radar Displays",
    code: "RAD-06",
    sublabel: "Canvases",
    fill: "#171411",
    accent: "#0ea5e9",
  },
  {
    id: "tictactoe",
    label: "Runway 09",
    code: "ATC-07",
    sublabel: "Land The Plane",
    fill: "#171411",
    accent: "#eab308",
  },
];

export const dockApps: AppId[] = [
  "about",
  "projects",
  "services",
  "process",
  "contact",
  "wallpaper",
  "tictactoe",
];
