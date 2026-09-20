import {
  Briefcase,
  Gamepad,
  Home,
  Image as ImageIcon,
  Laptop,
  Mail,
  Reload,
  Terminal,
} from "pixelarticons/react";
import type { AppId } from "./apps";

const icons = {
  about: Home,
  services: Briefcase,
  projects: Laptop,
  process: Reload,
  contact: Mail,
  wallpaper: ImageIcon,
  tictactoe: Gamepad,
  terminal: Terminal,
} as const;

/** Pixelarticons (MIT) — crisp 24-grid pixel icons */
export function IconArt({
  id,
  size = 48,
  className = "",
}: {
  id: AppId;
  size?: number;
  className?: string;
}) {
  if (id === "terminal") {
    return (
      <span
        style={{ width: size, height: size, fontSize: Math.round(size * 0.52) }}
        className={`flex items-center justify-center font-mono font-black text-ink select-none tracking-tighter ${className}`}
        aria-hidden
      >
        &gt;<span className="text-green font-extrabold animate-pulse">_</span>
      </span>
    );
  }

  const Icon = icons[id];
  return (
    <Icon
      width={size}
      height={size}
      className={`pixel-icon text-ink ${className}`}
      aria-hidden
    />
  );
}
