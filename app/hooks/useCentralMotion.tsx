"use client";

import { createContext, useContext, useRef, useEffect, ReactNode, useState, useCallback } from 'react';
import Lenis from 'lenis';

interface MotionState {
  mouse: {
    x: number;
    y: number;
    smoothX: number;
    smoothY: number;
  };
  scroll: {
    y: number;
    smoothY: number;
  };
  scrollProgress: number;
  isLowPerformance: boolean;
  useRaf: (cb: (time: number) => void) => () => void;
  lenis: Lenis | null;
}

const SAFE_DEFAULTS: MotionState = {
  mouse: { x: 0.5, y: 0.5, smoothX: 0.5, smoothY: 0.5 },
  scroll: { y: 0, smoothY: 0 },
  scrollProgress: 0,
  isLowPerformance: false,
  useRaf: () => () => {},
  lenis: null,
};

const MotionContext = createContext<MotionState | null>(null);

export function MotionProvider({ children }: { children: ReactNode }) {
  const stateRef = useRef<MotionState>({
    mouse: { x: 0.5, y: 0.5, smoothX: 0.5, smoothY: 0.5 },
    scroll: { y: 0, smoothY: 0 },
    scrollProgress: 0,
    isLowPerformance: false,
    useRaf: () => () => {},
    lenis: null,
  });

  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);
  const rafCallbacks = useRef<Set<(time: number) => void>>(new Set());
  const rafIdRef = useRef<number>(0);
  const fpsRef = useRef<{ frames: number; lastTime: number }>({ frames: 0, lastTime: 0 });

  const useRaf = useCallback((cb: (time: number) => void) => {
    rafCallbacks.current.add(cb);
    return () => {
      rafCallbacks.current.delete(cb);
    };
  }, []);

  const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

  useEffect(() => {
    if (typeof window === "undefined") return;

    // --- Performance Aware Scroll System ---
    try {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.5,
      });

      lenisRef.current = lenis;

      const handleScroll = () => {
        stateRef.current.scrollProgress = lenis.progress;
        stateRef.current.scroll.y = window.scrollY;
      };

      const handleMouseMove = (e: MouseEvent) => {
        stateRef.current.mouse.x = e.clientX / window.innerWidth;
        stateRef.current.mouse.y = e.clientY / window.innerHeight;
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      lenis.on('scroll', handleScroll);

      // --- Central Recovery Loop ---
      const loop = (time: number) => {
        // FPS Detection
        if (fpsRef.current.lastTime === 0) fpsRef.current.lastTime = time;
        fpsRef.current.frames++;
        
        if (time - fpsRef.current.lastTime > 1000) {
          const fps = fpsRef.current.frames;
          if (fps < 35 && !isLowPerformance) setIsLowPerformance(true);
          else if (fps > 50 && isLowPerformance) setIsLowPerformance(false);
          fpsRef.current.frames = 0;
          fpsRef.current.lastTime = time;
        }

        // Apply smoothing physics
        stateRef.current.scroll.smoothY = lerp(stateRef.current.scroll.smoothY, stateRef.current.scroll.y, 0.08);
        stateRef.current.mouse.smoothX = lerp(stateRef.current.mouse.smoothX, stateRef.current.mouse.x, 0.08);
        stateRef.current.mouse.smoothY = lerp(stateRef.current.mouse.smoothY, stateRef.current.mouse.y, 0.08);

        // System Processing
        if (lenis) lenis.raf(time);
        
        rafCallbacks.current.forEach((cb) => {
          try {
            cb(time);
          } catch (e) {
            console.error("Safe Engine: Error in logic callback", e);
          }
        });

        rafIdRef.current = requestAnimationFrame(loop);
      };

      rafIdRef.current = requestAnimationFrame(loop);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        if (lenis) {
          lenis.off('scroll', handleScroll);
          lenis.destroy();
        }
        cancelAnimationFrame(rafIdRef.current);
      };
    } catch (error) {
      console.error("Safe Engine: Initialization failed. Falling back to native.", error);
    }
  }, [isLowPerformance]);

  return (
    <MotionContext.Provider value={{
      get mouse() { return stateRef.current.mouse; },
      get scroll() { return stateRef.current.scroll; },
      get scrollProgress() { return stateRef.current.scrollProgress; },
      useRaf,
      lenis: lenisRef.current,
      isLowPerformance
    }}>
      {children}
    </MotionContext.Provider>
  );
}

export const useCentralMotion = () => {
  const context = useContext(MotionContext);
  return context || SAFE_DEFAULTS;
};
