"use client";

import { useEffect, useRef } from "react";

const MARKS = ["·", ".", ":", "+", "*", "°", "○", "◦", "/", "|"] as const;

type Particle = {
  x: number;
  y: number;
  mark: string;
  baseAlpha: number;
  size: number;
};

type LiveReconstructionProps = {
  className?: string;
};

/**
 * Digital Antiquity Live Reconstruction — hero only.
 * Laws: surface-bound, sparse, limited marks, slow/scroll-linked, hero-weighted.
 */
export function LiveReconstruction({ className }: LiveReconstructionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const scrollRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = mq.matches;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed(w, h);
    };

    const seed = (w: number, h: number) => {
      // Sparse: ~0.8 marks per 10k px², denser on column bands (sides) and lower stone
      const area = w * h;
      const count = Math.max(40, Math.min(180, Math.floor(area / 12000)));
      const next: Particle[] = [];
      for (let i = 0; i < count; i++) {
        const sideBias = Math.random();
        let x: number;
        if (sideBias < 0.35) {
          x = Math.random() * w * 0.22;
        } else if (sideBias < 0.7) {
          x = w * 0.78 + Math.random() * w * 0.22;
        } else {
          x = w * 0.25 + Math.random() * w * 0.5;
        }
        // Prefer lower/mid stone; dissolve toward top fog
        const y = h * (0.25 + Math.random() * 0.7);
        const edgeDist = Math.min(x / w, 1 - x / w);
        const shadowBoost = edgeDist < 0.2 ? 1.4 : 0.55;
        next.push({
          x,
          y,
          mark: MARKS[Math.floor(Math.random() * MARKS.length)]!,
          baseAlpha: (0.08 + Math.random() * 0.22) * shadowBoost,
          size: 9 + Math.random() * 7,
        });
      }
      particlesRef.current = next;
    };

    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };

    const draw = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      ctx.clearRect(0, 0, w, h);

      const t = reduced ? 0 : scrollRef.current * 0.015;
      const drift = reduced ? 0 : Math.sin(performance.now() * 0.00015) * 2;

      ctx.font = "11px var(--font-mono), ui-monospace, monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (const p of particlesRef.current) {
        // Dissolve toward upper fog band
        const fogFade = Math.min(1, Math.max(0, (p.y / h - 0.15) / 0.35));
        const alpha = p.baseAlpha * fogFade * (0.85 + 0.15 * Math.sin(t + p.x * 0.01));
        if (alpha < 0.02) continue;

        const y = p.y + drift + Math.sin(t + p.x * 0.02) * (reduced ? 0 : 1.5);
        ctx.fillStyle = `rgba(232, 240, 242, ${alpha})`;
        ctx.font = `${p.size}px var(--font-mono), ui-monospace, monospace`;
        ctx.fillText(p.mark, p.x, y);
      }

      if (!reduced) {
        rafRef.current = requestAnimationFrame(draw);
      }
    };

    const onMq = () => {
      reduced = mq.matches;
      cancelAnimationFrame(rafRef.current);
      draw();
      if (!reduced) rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    onScroll();
    draw();
    if (!reduced) rafRef.current = requestAnimationFrame(draw);

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    mq.addEventListener("change", onMq);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      mq.removeEventListener("change", onMq);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{ pointerEvents: "none" }}
    />
  );
}
