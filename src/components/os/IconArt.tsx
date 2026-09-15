import type { AppId } from "./apps";

/**
 * Bespoke Airport / Air Traffic Control & Flight Iconography for Udaan Labs:
 * - about: Gate terminal / Boarding pass with gate number
 * - projects: Airplane ascending above runway threshold (Departures)
 * - services: Jet aircraft fleet / Twin-turbofan profile
 * - process: Flight navigation waypoint route / holding pattern
 * - contact: Air traffic control tower with radiating beacon radar
 * - wallpaper: Sweeping 360-degree radar scope display
 * - tictactoe: Approach glide-slope & runway threshold alignment
 */

export function IconArt({
  id,
  size = 24,
  className = "",
}: {
  id: AppId;
  size?: number;
  className?: string;
}) {
  const s = size;
  const stroke = "currentColor";

  switch (id) {
    case "about":
      // Gate Info / Boarding Pass & Terminal Board
      return (
        <svg
          width={s}
          height={s}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`shrink-0 ${className}`}
        >
          <rect
            x="3"
            y="4"
            width="18"
            height="16"
            rx="1.5"
            stroke={stroke}
            strokeWidth="1.75"
          />
          <line x1="3" y1="9" x2="21" y2="9" stroke={stroke} strokeWidth="1.5" />
          {/* Perforated tear notch */}
          <path d="M15 4V9" stroke={stroke} strokeWidth="1.5" strokeDasharray="1.5 1.5" />
          <path d="M15 13V20" stroke={stroke} strokeWidth="1.5" strokeDasharray="1.5 1.5" />
          {/* Gate glyph text lines */}
          <line x1="6" y1="13" x2="11" y2="13" stroke={stroke} strokeWidth="1.75" strokeLinecap="round" />
          <line x1="6" y1="16.5" x2="9.5" y2="16.5" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
          {/* Flight barcode bars */}
          <line x1="17.5" y1="12" x2="17.5" y2="17" stroke={stroke} strokeWidth="1.5" />
          <line x1="19.5" y1="12" x2="19.5" y2="17" stroke={stroke} strokeWidth="1" />
        </svg>
      );

    case "projects":
      // Departures: Airplane climbing steep on takeoff angle
      return (
        <svg
          width={s}
          height={s}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`shrink-0 ${className}`}
        >
          {/* Takeoff angle fuselage and swept wings */}
          <path
            d="M4 19H20"
            stroke={stroke}
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          {/* Ascending aircraft */}
          <path
            d="M3.5 14L8 12.5L12 3L14.5 3.5L12.5 11L18.5 9L20.5 6.5L22 7L20 12L7.5 16.5L5 18L3.5 14Z"
            stroke={stroke}
            strokeWidth="1.75"
            strokeLinejoin="round"
            fill="currentColor"
            fillOpacity="0.15"
          />
          {/* Jet trail vector */}
          <line x1="3" y1="17" x2="6" y2="16" stroke={stroke} strokeWidth="1.25" strokeLinecap="round" />
        </svg>
      );

    case "services":
      // Fleet / Aircraft engineering profile
      return (
        <svg
          width={s}
          height={s}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`shrink-0 ${className}`}
        >
          {/* Top-down aircraft blueprint */}
          <path
            d="M12 2C11.2 2 10.5 4 10.5 7V11L2 14.5V17L10.5 15V19.5L8 21.5V23L12 22L16 23V21.5L13.5 19.5V15L22 17V14.5L13.5 11V7C13.5 4 12.8 2 12 2Z"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinejoin="round"
            fill="currentColor"
            fillOpacity="0.12"
          />
          <circle cx="12" cy="8" r="1" fill={stroke} />
        </svg>
      );

    case "process":
      // Flight Plan: Waypoints, holding pattern, and approach vector
      return (
        <svg
          width={s}
          height={s}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`shrink-0 ${className}`}
        >
          {/* Waypoint nodes */}
          <circle cx="5" cy="18" r="2" stroke={stroke} strokeWidth="1.5" />
          <circle cx="12" cy="7" r="2" stroke={stroke} strokeWidth="1.5" />
          <circle cx="19" cy="15" r="2" stroke={stroke} strokeWidth="1.5" />
          {/* Route path with vector ticks */}
          <path
            d="M6.5 16.5L10.5 8.5M13.5 8.5L17.5 13.5"
            stroke={stroke}
            strokeWidth="1.75"
            strokeDasharray="2 2"
          />
          {/* Approach arrow into final fix */}
          <path
            d="M18.5 19L21.5 19M21.5 19L19.5 17M21.5 19L19.5 21"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "contact":
      // Control Tower: ATC tower with radiating 360 VHF beacon waves
      return (
        <svg
          width={s}
          height={s}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`shrink-0 ${className}`}
        >
          {/* Tower cab */}
          <path
            d="M8 8L6 4H18L16 8H8Z"
            stroke={stroke}
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          {/* Observation glass band */}
          <line x1="7.5" y1="6" x2="16.5" y2="6" stroke={stroke} strokeWidth="1.5" />
          {/* Tower shaft & base */}
          <path
            d="M9.5 8V21M14.5 8V21M5 21H19"
            stroke={stroke}
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          {/* Beacon transmission antenna */}
          <line x1="12" y1="4" x2="12" y2="1.5" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="12" cy="1.5" r="1" fill={stroke} />
          {/* Radio waves */}
          <path d="M3 5C2 7 2 9 3 11" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M21 5C22 7 22 9 21 11" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case "wallpaper":
      // Radar Scope: Primary sweep display with range rings and target blip
      return (
        <svg
          width={s}
          height={s}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`shrink-0 ${className}`}
        >
          {/* Outer radar bezel */}
          <circle cx="12" cy="12" r="9.5" stroke={stroke} strokeWidth="1.75" />
          {/* Inner range ring */}
          <circle cx="12" cy="12" r="5" stroke={stroke} strokeWidth="1" strokeDasharray="2 2" />
          {/* Crosshair azimuth */}
          <line x1="12" y1="2.5" x2="12" y2="21.5" stroke={stroke} strokeWidth="1" opacity="0.6" />
          <line x1="2.5" y1="12" x2="21.5" y2="12" stroke={stroke} strokeWidth="1" opacity="0.6" />
          {/* Rotating sweep sector line */}
          <line x1="12" y1="12" x2="19" y2="6" stroke={stroke} strokeWidth="1.75" strokeLinecap="round" />
          {/* Aircraft radar target blip */}
          <circle cx="15.5" cy="8.5" r="1.5" fill={stroke} />
        </svg>
      );

    case "tictactoe":
      // Runway 09 / Approach Alignment Threshold
      return (
        <svg
          width={s}
          height={s}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`shrink-0 ${className}`}
        >
          {/* Runway strip with perspective */}
          <path
            d="M8 21L10 3H14L16 21H8Z"
            stroke={stroke}
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          {/* Centerline markings */}
          <line x1="12" y1="6" x2="12" y2="9" stroke={stroke} strokeWidth="1.75" strokeLinecap="square" />
          <line x1="12" y1="12" x2="12" y2="15" stroke={stroke} strokeWidth="1.75" strokeLinecap="square" />
          <line x1="12" y1="18" x2="12" y2="20" stroke={stroke} strokeWidth="1.75" strokeLinecap="square" />
          {/* Threshold piano keys */}
          <line x1="9" y1="19.5" x2="15" y2="19.5" stroke={stroke} strokeWidth="1.5" strokeDasharray="1 1" />
          {/* Glide slope angle indicator */}
          <circle cx="5" cy="7" r="1.5" fill={stroke} />
          <circle cx="19" cy="7" r="1.5" fill={stroke} />
        </svg>
      );
  }
}
