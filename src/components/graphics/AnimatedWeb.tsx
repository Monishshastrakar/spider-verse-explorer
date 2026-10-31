"use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface AnimatedWebProps {
  className?: string;
  particleColor?: string;
  lineColor?: string;
  interactive?: boolean;
}

interface WebNode {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  radius: number;
  pulseOffset: number;
}

export function AnimatedWeb({
  className = "",
  particleColor = "#ff1361",
  lineColor = "#00e5ff",
  interactive = true,
}: AnimatedWebProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let isVisible = true;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Pointer state stored in ref-like variables (zero React re-renders)
    const pointer = {
      x: -9999,
      y: -9999,
      active: false,
      isTouch: false,
    };

    let nodes: WebNode[] = [];

    const initNodes = (w: number, h: number) => {
      // Scale node count by canvas area for optimal performance
      const count = Math.min(38, Math.max(16, Math.floor((w * h) / 22000)));
      nodes = [];

      for (let i = 0; i < count; i++) {
        // Distribute in concentric Spider-Verse web rings + spokes
        const angle = (i / count) * Math.PI * 2 + Math.random() * 0.4;
        const ring = (i % 4) + 1;
        const dist = (ring / 4.2) * (Math.min(w, h) * 0.45) + Math.random() * 20;

        const ox = w / 2 + Math.cos(angle) * dist;
        const oy = h / 2 + Math.sin(angle) * dist;

        nodes.push({
          x: ox,
          y: oy,
          originX: ox,
          originY: oy,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 1.8 + 1.2,
          pulseOffset: Math.random() * Math.PI * 2,
        });
      }
    };

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      width = Math.max(rect.width, 100);
      height = Math.max(rect.height, 100);
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      initNodes(width, height);
    };

    handleResize();

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    // Pointer event listeners
    const onPointerMove = (e: PointerEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
      pointer.isTouch = e.pointerType === "touch";
    };

    const onPointerLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });

    // IntersectionObserver to pause when offscreen
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(canvas);

    // Visibility change handler (e.g. background tab)
    const onVisibilityChange = () => {
      if (document.hidden) {
        isVisible = false;
      } else {
        isVisible = true;
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    // Static render for reduced motion
    if (reducedMotion) {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 0.8;
      ctx.globalAlpha = 0.2;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          if (dx * dx + dy * dy < 14000) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      return () => {
        resizeObserver.disconnect();
        intersectionObserver.disconnect();
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerleave", onPointerLeave);
        document.removeEventListener("visibilitychange", onVisibilityChange);
      };
    }

    // Animation Loop
    let lastTime = performance.now();

    const animate = (time: number) => {
      animId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Draw subtle comic radial energy glow in the background
      const grad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        20,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.5
      );
      grad.addColorStop(0, "rgba(236, 64, 122, 0.06)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Autonomous gentle wave time
      const wave = Math.sin(time * 0.0015);

      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        // Elastic return toward origin
        const spring = 0.04;
        const damping = 0.92;
        const fx = (n.originX - n.x) * spring;
        const fy = (n.originY - n.y) * spring;

        n.vx = (n.vx + fx) * damping;
        n.vy = (n.vy + fy) * damping;

        // Autonomous breathing float
        n.x += n.vx + Math.sin(time * 0.001 + n.pulseOffset) * 0.25;
        n.y += n.vy + Math.cos(time * 0.0012 + n.pulseOffset) * 0.25;

        // Pointer reaction: Subtle repulsion
        if (pointer.active) {
          const pdx = n.x - pointer.x;
          const pdy = n.y - pointer.y;
          const distSq = pdx * pdx + pdy * pdy;
          const maxDist = pointer.isTouch ? 110 : 160;

          if (distSq < maxDist * maxDist && distSq > 0.01) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / maxDist) * 3.5;
            n.vx += (pdx / dist) * force;
            n.vy += (pdy / dist) * force;
          }
        }
      }

      // Draw spider-web connections
      const maxConnectDistSq = 16000;
      ctx.lineWidth = 1;

      for (let i = 0; i < nodes.length; i++) {
        const ni = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const nj = nodes[j];
          const dx = ni.x - nj.x;
          const dy = ni.y - nj.y;
          const dSq = dx * dx + dy * dy;

          if (dSq < maxConnectDistSq) {
            const alpha = (1 - dSq / maxConnectDistSq) * 0.32;
            ctx.strokeStyle = i % 2 === 0 ? lineColor : particleColor;
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.moveTo(ni.x, ni.y);
            ctx.lineTo(nj.x, nj.y);
            ctx.stroke();
          }
        }

        // Draw node points
        const pulse = 0.8 + 0.3 * Math.sin(time * 0.003 + ni.pulseOffset);
        ctx.beginPath();
        ctx.arc(ni.x, ni.y, ni.radius * pulse, 0, Math.PI * 2);
        ctx.fillStyle = i % 3 === 0 ? particleColor : lineColor;
        ctx.globalAlpha = 0.8;
        ctx.fill();
      }

      ctx.globalAlpha = 1.0;
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [reducedMotion, interactive, lineColor, particleColor]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
    </div>
  );
}
