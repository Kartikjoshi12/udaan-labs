"use client";

import { useEffect, useRef } from "react";

type PixelPhotoProps = {
  src: string;
  alt: string;
  /** Bigger = chunkier blocks. Keep ~3–4 for subtle pixel look. */
  pixelSize?: number;
  className?: string;
};

/**
 * Downscale → upscale with smoothing off = soft 8-bit pixel look.
 */
export function PixelPhoto({
  src,
  alt,
  pixelSize = 3,
  className = "",
}: PixelPhotoProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const img = new window.Image();
    img.decoding = "async";
    // same-origin public assets
    img.src = src;

    let cancelled = false;

    function paint() {
      if (cancelled || !wrap || !canvas) return;
      const w = Math.max(1, Math.floor(wrap.clientWidth));
      const h = Math.max(1, Math.floor(wrap.clientHeight));
      if (w < 2 || h < 2) return;

      canvas.width = w;
      canvas.height = h;

      const sw = Math.max(32, Math.floor(w / pixelSize));
      const sh = Math.max(24, Math.floor(h / pixelSize));

      const tmp = document.createElement("canvas");
      tmp.width = sw;
      tmp.height = sh;
      const tctx = tmp.getContext("2d");
      const ctx = canvas.getContext("2d");
      if (!tctx || !ctx) return;

      tctx.imageSmoothingEnabled = false;
      // cover-fit into tiny canvas
      const ir = img.naturalWidth / img.naturalHeight;
      const tr = sw / sh;
      let dw = sw;
      let dh = sh;
      let dx = 0;
      let dy = 0;
      if (ir > tr) {
        dw = sh * ir;
        dx = -(dw - sw) / 2;
      } else {
        dh = sw / ir;
        dy = -(dh - sh) / 2;
      }
      tctx.drawImage(img, dx, dy, dw, dh);

      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(tmp, 0, 0, w, h);

      // light posterize / contrast for more "8-bit game" vibe
      try {
        const data = ctx.getImageData(0, 0, w, h);
        const d = data.data;
        const steps = 12; // milder posterize — less muddy/blocky color
        const q = 255 / (steps - 1);
        for (let i = 0; i < d.length; i += 4) {
          d[i] = Math.round(d[i] / q) * q;
          d[i + 1] = Math.round(d[i + 1] / q) * q;
          d[i + 2] = Math.round(d[i + 2] / q) * q;
        }
        ctx.putImageData(data, 0, 0);
      } catch {
        /* ignore security errors */
      }
    }

    function onLoad() {
      paint();
    }

    if (img.complete && img.naturalWidth) paint();
    else img.addEventListener("load", onLoad);

    const ro = new ResizeObserver(() => {
      if (img.complete && img.naturalWidth) paint();
    });
    ro.observe(wrap);

    return () => {
      cancelled = true;
      img.removeEventListener("load", onLoad);
      ro.disconnect();
    };
  }, [src, pixelSize]);

  return (
    <div
      ref={wrapRef}
      className={`relative overflow-hidden bg-paper-2 ${className}`}
      role="img"
      aria-label={alt}
    >
      <canvas
        ref={canvasRef}
        className="pixel-icon absolute inset-0 h-full w-full"
      />
    </div>
  );
}
