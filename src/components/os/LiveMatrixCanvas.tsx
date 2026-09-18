"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  angle: number;
}

const COLORS = ["#f7c948", "#e45826", "#2d8a4e", "#2563eb", "#111111"];

export function LiveMatrixCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", handleMouseMove);

    // Initialize floating nodes (geometric pixels & connectors)
    const nodeCount = Math.min(48, Math.floor((width * height) / 28000));
    const nodes: Node[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        size: Math.random() > 0.4 ? 4 : 6,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        angle: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw undulating retro terrain/matrix grid waves
      ctx.strokeStyle = "rgba(17, 17, 17, 0.04)";
      ctx.lineWidth = 1;
      const step = 40;
      const cols = Math.ceil(width / step);
      const rows = Math.ceil(height / step);

      for (let x = 0; x <= width; x += step) {
        ctx.beginPath();
        for (let y = 0; y <= height; y += 20) {
          const wave = Math.sin(y * 0.01 + time + x * 0.005) * 4;
          if (y === 0) ctx.moveTo(x + wave, y);
          else ctx.lineTo(x + wave, y);
        }
        ctx.stroke();
      }

      for (let y = 0; y <= height; y += step) {
        ctx.beginPath();
        for (let x = 0; x <= width; x += 20) {
          const wave = Math.cos(x * 0.01 + time + y * 0.005) * 4;
          if (x === 0) ctx.moveTo(x, y + wave);
          else ctx.lineTo(x, y + wave);
        }
        ctx.stroke();
      }

      // 2. Update & Draw floating pixel nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        // Move
        n.x += n.vx;
        n.y += n.vy;

        // Bounce boundaries
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        // Mouse avoidance / deflection
        const dx = mouseRef.current.x - n.x;
        const dy = mouseRef.current.y - n.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120 && dist > 0) {
          const angle = Math.atan2(dy, dx);
          const force = (120 - dist) / 120;
          n.x -= Math.cos(angle) * force * 1.5;
          n.y -= Math.sin(angle) * force * 1.5;
        }

        // Connect nearby nodes with subtle drafting lines
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const d = Math.hypot(n.x - n2.x, n.y - n2.y);
          if (d < 110) {
            ctx.strokeStyle = `rgba(17, 17, 17, ${0.12 * (1 - d / 110)})`;
            ctx.lineWidth = 1;
            ctx.setLineDash([2, 2]);
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        }

        // Draw pixel box
        ctx.fillStyle = n.color;
        ctx.strokeStyle = "#111111";
        ctx.lineWidth = 1;
        ctx.fillRect(n.x - n.size / 2, n.y - n.size / 2, n.size, n.size);
        ctx.strokeRect(n.x - n.size / 2, n.y - n.size / 2, n.size, n.size);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-85"
      aria-hidden
    />
  );
}
