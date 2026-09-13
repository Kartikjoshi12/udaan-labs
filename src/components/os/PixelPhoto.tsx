"use client";

type PixelPhotoProps = {
  src: string;
  alt: string;
  /** Kept for API compat — canvas pixelation removed (was too slow). */
  pixelSize?: number;
  className?: string;
};

/**
 * Fast photo display. Uses native img (no heavy canvas posterize).
 */
export function PixelPhoto({ src, alt, className = "" }: PixelPhotoProps) {
  return (
    <div
      className={`relative overflow-hidden bg-paper-2 ${className}`}
      role="img"
      aria-label={alt}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          // light retro punch without blocking the main thread
          filter: "contrast(1.06) saturate(1.08)",
        }}
      />
    </div>
  );
}
