import {
  Briefcase,
  Gamepad,
  Home,
  Image as ImageIcon,
  Laptop,
  Mail,
  Reload,
} from "pixelarticons/react";
import type { AppId } from "./apps";

const icons = {
  about: Home,
  services: Briefcase,
  projects: Laptop,
  process: Reload,
  contact: Mail,
  tictactoe: Gamepad,
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
