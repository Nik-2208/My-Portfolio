"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useCentralMotion } from "../hooks/useCentralMotion";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { mouse, scroll, useRaf, isLowPerformance } = useCentralMotion();
  
  const [mounted, setMounted] = useState(false);
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
  }>>([]);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !mounted || isLowPerformance) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const particleCount = 40;
    particlesRef.current = [];
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.1
      });
    }

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [mounted, isLowPerformance]);

  useEffect(() => {
    mouseRef.current = { x: mouse.smoothX, y: mouse.smoothY };
  }, [mouse.smoothX, mouse.smoothY]);

  useRaf(useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || isLowPerformance || !mounted) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const mouseX = mouseRef.current.x * canvas.width;
    const mouseY = mouseRef.current.y * canvas.height;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    particlesRef.current.forEach(p => {
      const dx = (mouseX - centerX) * 0.02;
      const dy = (mouseY - centerY) * 0.02;

      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x + dx, p.y + dy, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 255, 255, ${p.opacity})`;
      ctx.fill();
    });
  }, [isLowPerformance, mounted]));

  const scrollProgress = mounted ? Math.max(0, Math.min(1, scroll.y / (window.innerHeight || 1000))) : 0;
  const scale = 1 + scrollProgress * 0.5;
  const opacity = Math.max(0, 1 - scrollProgress * 1.2);
  const y = scrollProgress * 300;

  return (
    <section 
      ref={containerRef}
      id="hero" 
      className="relative h-screen w-full bg-black overflow-hidden flex items-center justify-center z-10"
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 opacity-30 pointer-events-none will-change-transform"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.05)_0%,transparent_70%)] pointer-events-none" />
      
      <motion.div 
        style={{ 
          transform: `scale(${scale}) translate3d(0, ${y}px, 0)`, 
          opacity: opacity 
        }}
        className="relative z-10 flex flex-col items-center justify-center will-change-transform"
      >
        <div className="relative w-64 h-64 md:w-96 md:h-96 flex items-center justify-center mb-12">
          <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute inset-8 border border-cyan-500/20 rounded-full animate-[spin_20s_linear_infinite]" />
          <div className="absolute inset-16 border border-purple-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
          
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_30px_rgba(0,255,255,0.3)] will-change-transform">
            <defs>
              <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00ffff" />
                <stop offset="100%" stopColor="#9933ff" />
              </linearGradient>
            </defs>
            <motion.path 
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 3, ease: "easeInOut" }}
              d="M 50 150 L 50 80 Q 100 40 150 80 L 150 150 Z" 
              fill="none" 
              stroke="url(#heroGrad)" 
              strokeWidth="1.5" 
            />
            <motion.circle 
              animate={{ r: [2, 4, 2], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              cx="100" cy="100" r="3" fill="#00ffff" 
            />
          </svg>
        </div>

        <div className="text-center px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-6 uppercase"
          >
            Nikhilesh <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Chavda</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1.5 }}
            className="text-lg md:text-xl text-zinc-500 font-mono tracking-[0.4em] uppercase"
          >
            Bridging Humans & AI
          </motion.p>
        </div>
      </motion.div>

      <div className="absolute inset-0 pointer-events-none z-20">
        <div className="absolute top-10 left-10 w-32 h-32 border-l border-t border-white/10" />
        <div className="absolute top-10 right-10 w-32 h-32 border-r border-t border-white/10" />
        <div className="absolute bottom-10 left-10 w-32 h-32 border-l border-b border-white/10" />
        <div className="absolute bottom-10 right-10 w-32 h-32 border-r border-b border-white/10" />
        
        <div className="absolute top-1/2 left-10 -translate-y-1/2 flex flex-col gap-4 text-[8px] font-mono text-white/20 uppercase tracking-widest">
          <span>Sys_v4.0</span>
          <span>Status: Optimal</span>
          <span>Lat: 19.0760</span>
          <span>Lon: 72.9104</span>
        </div>
      </div>

      <div className="absolute inset-0 scan-lines opacity-5 pointer-events-none z-30" />
    </section>
  );
}
