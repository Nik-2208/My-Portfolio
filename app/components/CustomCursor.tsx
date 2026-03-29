"use client";

import { useEffect, useRef, useState } from "react";
import { useCentralMotion } from "../hooks/useCentralMotion";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  
  const pos = useRef({ x: -100, y: -100 });
  const [isDesktop, setIsDesktop] = useState(false);
  const { mouse, useRaf, isLowPerformance } = useCentralMotion();
  const mouseRef = useRef(mouse);
  
  useEffect(() => {
    mouseRef.current = mouse;
  }, [mouse]);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop || isLowPerformance) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const interactive = target.matches('a, button, [class*="group"], [class*="cursor-interactive"]') || 
                          target.closest('.group, .cursor-interactive');
      
      if (ringRef.current && dotRef.current) {
        if (interactive) {
          ringRef.current.style.transform = "scale(0.5)";
          ringRef.current.style.opacity = "1";
          dotRef.current.style.transform = "scale(0)";
          dotRef.current.style.opacity = "0";
        } else {
          ringRef.current.style.transform = "scale(1)";
          ringRef.current.style.opacity = "0.3";
          dotRef.current.style.transform = "scale(1)";
          dotRef.current.style.opacity = "1";
        }
      }
    };

    window.addEventListener("mouseover", handleMouseOver);
    return () => window.removeEventListener("mouseover", handleMouseOver);
  }, [isDesktop, isLowPerformance]);

  useEffect(() => {
    if (!isDesktop || isLowPerformance) return;
    
    // eslint-disable-next-line react-hooks/rules-of-hooks -- useRaf is a custom hook that returns cleanup
    const cleanup = useRaf(() => {
      const lerp = 0.18;
      const targetX = mouseRef.current.x * window.innerWidth;
      const targetY = mouseRef.current.y * window.innerHeight;
      
      pos.current.x += (targetX - pos.current.x) * lerp;
      pos.current.y += (targetY - pos.current.y) * lerp;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
    });
    
    return cleanup;
  }, [isDesktop, isLowPerformance, useRaf]);

  if (!isDesktop || isLowPerformance) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] will-change-transform flex items-center justify-center mix-blend-screen -ml-4 -mt-4"
    >
      <div 
        ref={ringRef}
        className="absolute inset-0 border-[1.5px] border-cyan-400 rounded-full opacity-30 shadow-[0_0_10px_#00ffff] transition-all duration-300 ease-out" 
      />
      <div 
        ref={dotRef}
        className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_5px_#00ffff] transition-all duration-300 ease-out" 
      />
    </div>
  );
}
