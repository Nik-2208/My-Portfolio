"use client";

import { useEffect, useRef, useState } from "react";
import { useCentralMotion } from "../hooks/useCentralMotion";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const reticleRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const pos = useRef({ x: -100, y: -100, targetX: -100, targetY: -100 });
  const [isDesktop, setIsDesktop] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { mouse, useRaf, isLowPerformance } = useCentralMotion();

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop || isLowPerformance) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const interactive =
        target.matches('a, button, [role="button"], [class*="group"], [class*="cursor-interactive"]') ||
        target.closest('a, button, [role="button"], .group, .cursor-interactive');

      if (interactive) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mouseover", handleMouseOver);
    return () => window.removeEventListener("mouseover", handleMouseOver);
  }, [isDesktop, isLowPerformance]);

  useRaf(() => {
    if (!isDesktop || isLowPerformance) return;

    const targetX = mouse.smoothX * window.innerWidth;
    const targetY = mouse.smoothY * window.innerHeight;

    pos.current.x += (targetX - pos.current.x) * 0.2;
    pos.current.y += (targetY - pos.current.y) * 0.2;

    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
    }
  });

  if (!isDesktop || isLowPerformance) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-10 h-10 pointer-events-none z-[9999] will-change-transform flex items-center justify-center -ml-5 -mt-5 mix-blend-screen"
      aria-hidden="true"
    >
      {/* Outer Scanner Reticle */}
      <div
        ref={ringRef}
        className={`absolute inset-0 rounded-full border border-cyan-400/40 transition-all duration-300 ease-out ${
          isHovered
            ? "scale-150 border-cyan-300 shadow-[0_0_20px_rgba(0,255,255,0.6)] bg-cyan-500/10 rotate-45"
            : "scale-100 opacity-40 shadow-[0_0_8px_rgba(0,255,255,0.2)]"
        }`}
      >
        {/* Corner Reticle Indicators */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-cyan-400 rounded-full" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-cyan-400 rounded-full" />
      </div>

      {/* Center Laser Pulse Dot */}
      <div
        ref={dotRef}
        className={`w-1.5 h-1.5 rounded-full bg-cyan-300 transition-all duration-300 ${
          isHovered ? "scale-150 bg-white shadow-[0_0_12px_#ffffff]" : "scale-100 shadow-[0_0_6px_#00ffff]"
        }`}
      />
    </div>
  );
}
