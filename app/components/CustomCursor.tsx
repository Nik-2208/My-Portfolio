"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const posRef = useRef({ x: -100, y: -100, targetX: -100, targetY: -100 });
  const [isDesktop, setIsDesktop] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const rafIdRef = useRef<number>(0);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop();

    window.addEventListener("resize", checkDesktop, { passive: true });
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const handlePointerMove = (e: PointerEvent | MouseEvent) => {
      posRef.current.targetX = e.clientX;
      posRef.current.targetY = e.clientY;

      const target = e.target as HTMLElement;
      if (target) {
        const isInteractive = Boolean(
          target.matches('a, button, input, textarea, select, [role="button"], [class*="group"], [class*="cursor-interactive"]') ||
          target.closest('a, button, input, textarea, select, [role="button"], .group, .cursor-interactive')
        );
        setIsHovered(isInteractive);
      }
    };

    const updatePosition = () => {
      posRef.current.x += (posRef.current.targetX - posRef.current.x) * 0.4;
      posRef.current.y += (posRef.current.targetY - posRef.current.y) * 0.4;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
      }

      rafIdRef.current = requestAnimationFrame(updatePosition);
    };

    rafIdRef.current = requestAnimationFrame(updatePosition);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("focus", () => {}, { passive: true });
    window.addEventListener("blur", () => {}, { passive: true });

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("mousemove", handlePointerMove);
    };
  }, [isDesktop]);

  if (typeof window === "undefined" || !isDesktop) return null;

  return createPortal(
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-10 h-10 pointer-events-none z-[2147483647] will-change-transform flex items-center justify-center -ml-5 -mt-5 mix-blend-screen"
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    >
      {/* Outer Reticle Ring */}
      <div
        ref={ringRef}
        className={`absolute inset-0 rounded-full border border-cyan-400/50 transition-all duration-150 ease-out pointer-events-none ${
          isHovered
            ? "scale-150 border-cyan-300 shadow-[0_0_20px_rgba(0,255,255,0.7)] bg-cyan-500/10 rotate-45"
            : "scale-100 opacity-60 shadow-[0_0_8px_rgba(0,255,255,0.3)]"
        }`}
        style={{ pointerEvents: "none" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full pointer-events-none" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-cyan-400 rounded-full pointer-events-none" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-cyan-400 rounded-full pointer-events-none" />
      </div>

      {/* Center Precision Laser Point */}
      <div
        ref={dotRef}
        className={`w-1.5 h-1.5 rounded-full bg-cyan-300 transition-all duration-150 pointer-events-none ${
          isHovered ? "scale-150 bg-white shadow-[0_0_12px_#ffffff]" : "scale-100 shadow-[0_0_6px_#00ffff]"
        }`}
        style={{ pointerEvents: "none" }}
      />
    </div>,
    document.body
  );
}
