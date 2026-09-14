import Link from "next/link";
import { WarningDiamond, ArrowLeft, Home } from "pixelarticons/react";

export default function NotFound() {
  return (
    <div className="os-wallpaper min-h-[100dvh] flex flex-col items-center justify-center p-6 text-ink">
      <div className="border-3 border-ink bg-cream p-7 max-w-md w-full nb-shadow-lg text-center">
        <div className="flex items-center justify-center gap-2 border-b-2 border-ink pb-3 mb-4 font-mono text-xs font-bold text-orange">
          <WarningDiamond width={16} height={16} className="pixel-icon" />
          <span>SYS_ERROR // 404_PAGE_NOT_FOUND</span>
        </div>

        <div className="my-6 space-y-2">
          <p className="font-[family-name:var(--font-space-grotesk)] text-4xl font-bold tracking-tight text-ink">
            SECTOR MISSING
          </p>
          <p className="font-mono text-xs text-muted leading-relaxed">
            The studio workstation path you requested does not exist or has been relocated to another directory.
          </p>
        </div>

        <div className="border-2 border-ink bg-paper p-3 mb-6 font-mono text-xs text-left space-y-1 text-muted">
          <div><span className="text-faint">ERROR_CODE:</span> 404_NOT_FOUND</div>
          <div><span className="text-faint">LOCATION:</span> /workspace/root</div>
          <div><span className="text-faint">RECOVERY:</span> Return to studio desktop</div>
        </div>

        <Link
          href="/"
          className="nb-btn nb-btn-primary w-full py-2.5 text-xs font-mono font-bold flex items-center justify-center gap-2"
        >
          <Home width={14} height={14} className="pixel-icon" />
          <span>RETURN TO STUDIO WORKSPACE</span>
        </Link>
      </div>
    </div>
  );
}
