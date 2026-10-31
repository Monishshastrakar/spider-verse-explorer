"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface WebCanvasProps {
  className?: string;
}

export function WebCanvas({ className }: WebCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect() || canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      setDimensions({ width, height });
    };

    window.addEventListener("resize", resize);
    resize();

    // Nodes for the web
    const nodeCount = Math.min(25, Math.floor((width * height) / 15000));
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;
    const mouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", mouseMove);

    // Track scroll for parallax
    let scrollY = 0;
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    function animate(time: number) {
      const context = ctx!;
      if (reducedMotion) {
        context.clearRect(0, 0, width, height);
        return;
      }

      context.clearRect(0, 0, width, height);

      // Draw web lines
      context.beginPath();
      context.strokeStyle = "rgba(236, 64, 122, 0.15)";
      context.lineWidth = 1;

      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        // Move nodes
        n1.x += n1.vx;
        n1.y += n1.vy + Math.sin(time * 0.001 + i) * 0.3;

        // Bounce off edges
        if (n1.x < 0 || n1.x > width) n1.vx *= -1;
        if (n1.y < 0 || n1.y > height) n1.vy *= -1;

        // Repel from mouse
        const dx = n1.x - mouseX;
        const dy = n1.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const force = Math.max(0, 100 - dist) / 100;
        n1.x += (dx / dist) * force * 1;
        n1.y += (dy / dist) * force * 1;

        // Draw connections between close nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const ddx = n1.x - n2.x;
          const ddy = n1.y - n2.y;
          const ddist = Math.sqrt(ddx * ddx + ddy * ddy);
          if (ddist < 150) {
            context.moveTo(n1.x, n1.y);
            context.lineTo(n2.x, n2.y);
          }
        }

        // Draw node
        context.beginPath();
        context.arc(n1.x, n1.y, n1.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(236, 64, 122, ${n1.opacity})`;
        context.fill();
      }

      context.strokeStyle = "rgba(0, 188, 212, 0.1)";
      context.stroke();

      // Draw central web glow
      const gradient = context.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height)
      );
      gradient.addColorStop(0, "rgba(236, 64, 122, 0.05)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);

      animationId = requestAnimationFrame(animate);
    }

    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animationId);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}
    />
  );
}