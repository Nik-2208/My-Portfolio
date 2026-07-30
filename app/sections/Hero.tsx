"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Sparkles, Brain, Cpu } from "lucide-react";
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
    pulse: number;
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

    const particleCount = 50;
    particlesRef.current = [];
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.6 + 0.1,
        pulse: Math.random() * Math.PI * 2,
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

    particlesRef.current.forEach((p) => {
      const dx = (mouseX - centerX) * 0.02;
      const dy = (mouseY - centerY) * 0.02;

      p.x += p.speedX;
      p.y += p.speedY;
      p.pulse += 0.02;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      const currentOpacity = p.opacity + Math.sin(p.pulse) * 0.15;

      ctx.beginPath();
      ctx.arc(p.x + dx, p.y + dy, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 255, 255, ${Math.max(0.05, currentOpacity)})`;
      ctx.fill();
    });
  }, [isLowPerformance, mounted]));

  const scrollProgress = mounted ? Math.max(0, Math.min(1, scroll.y / (window.innerHeight || 1000))) : 0;
  const scale = 1 + scrollProgress * 0.4;
  const opacity = Math.max(0, 1 - scrollProgress * 1.3);
  const y = scrollProgress * 220;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen w-full bg-black overflow-hidden flex flex-col items-center justify-center z-10 px-4 sm:px-6"
      aria-label="Human Mind Opening Cinematic"
    >
      {/* Background Canvas Particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 opacity-40 pointer-events-none will-change-transform"
        aria-hidden="true"
      />

      {/* Ambient Neural Core Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Cinematic Visual & Text */}
      <motion.div
        style={{
          transform: `scale(${scale}) translate3d(0, ${y}px, 0)`,
          opacity: opacity,
        }}
        className="relative z-10 flex flex-col items-center justify-center text-center max-w-5xl mx-auto py-12 will-change-transform"
      >
        {/* Phase Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-xl mb-8 text-xs font-mono text-cyan-300 uppercase tracking-[0.2em] shadow-[0_0_25px_rgba(0,255,255,0.15)]"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <Brain className="w-3.5 h-3.5 text-cyan-300" />
          <span>Section 01: Biological Mind</span>
        </motion.div>

        {/* Human Silhouette & Biological Neural Brain Graphic */}
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center mb-8">
          <div className="absolute inset-0 bg-cyan-500/15 rounded-full blur-[100px] animate-pulse pointer-events-none" />
          
          {/* Rotating Synaptic Rings */}
          <div className="absolute inset-4 border border-cyan-500/20 rounded-full animate-[spin_25s_linear_infinite]" />
          <div className="absolute inset-12 border border-purple-500/20 rounded-full animate-[spin_18s_linear_infinite_reverse]" />

          <svg viewBox="0 0 240 240" className="w-full h-full drop-shadow-[0_0_40px_rgba(0,255,255,0.35)]">
            <defs>
              <linearGradient id="humanBrainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00ffff" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
              <radialGradient id="thoughtPulse" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#00ffff" stopOpacity="1" />
                <stop offset="100%" stopColor="#00ffff" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Human Silhouette Contour */}
            <path
              d="M120 30 C 90 30, 70 55, 70 90 C 70 120, 85 140, 95 160 C 100 170, 95 200, 70 220 L 170 220 C 145 200, 140 170, 145 160 C 155 140, 170 120, 170 90 C 170 55, 150 30, 120 30 Z"
              fill="none"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />

            {/* Biological Neural Brain Mesh */}
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 3, ease: "easeInOut" }}
              d="M 90 85 Q 120 45, 150 85 Q 165 110, 135 125 Q 120 135, 105 125 Q 75 110, 90 85 Z"
              fill="none"
              stroke="url(#humanBrainGrad)"
              strokeWidth="2"
            />

            {/* Internal Synaptic Nodes & Light Pulses */}
            <g>
              <line x1="105" y1="75" x2="135" y2="75" stroke="#00ffff" strokeWidth="1" opacity="0.6" />
              <line x1="120" y1="60" x2="120" y2="105" stroke="#a855f7" strokeWidth="1" opacity="0.6" />
              <line x1="100" y1="95" x2="140" y2="95" stroke="#00ffff" strokeWidth="1" opacity="0.6" />

              <motion.circle
                animate={{ r: [3, 7, 3], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                cx="120"
                cy="75"
                r="4"
                fill="url(#thoughtPulse)"
              />
              <circle cx="105" cy="75" r="3" fill="#00ffff" />
              <circle cx="135" cy="75" r="3" fill="#a855f7" />
              <circle cx="120" cy="100" r="3" fill="#ec4899" />
            </g>
          </svg>
        </div>

        {/* Hero Title & Identity Narrative */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter text-white mb-4 uppercase"
        >
          Nikhilesh{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500">
            Chavda
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-base sm:text-lg md:text-xl text-zinc-300 font-mono tracking-[0.2em] uppercase max-w-2xl mb-4"
        >
          A Human Mind Thinking Like an Intelligent Machine
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-xs sm:text-sm text-zinc-500 font-mono tracking-widest max-w-lg mb-8"
        >
          Relentless Curiosity • Disciplined Thinking • Building AI That Creates Impact
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex items-center justify-center gap-4 z-20"
        >
          <button
            onClick={() => scrollToSection("brain-zoom")}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-black font-bold font-mono text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-[0_0_30px_rgba(0,255,255,0.35)] hover:scale-105 flex items-center gap-2.5"
          >
            <Cpu className="w-4 h-4" />
            <span>Begin Neural Journey</span>
          </button>
        </motion.div>
      </motion.div>

      {/* Corner HUD Telemetry */}
      <div className="absolute inset-0 pointer-events-none z-20 hidden md:block">
        <div className="absolute top-10 left-10 w-24 h-24 border-l border-t border-white/15" />
        <div className="absolute top-10 right-10 w-24 h-24 border-r border-t border-white/15" />
        <div className="absolute bottom-10 left-10 w-24 h-24 border-l border-b border-white/15" />
        <div className="absolute bottom-10 right-10 w-24 h-24 border-r border-b border-white/15" />

        <div className="absolute top-1/2 left-8 -translate-y-1/2 flex flex-col gap-3 text-[9px] font-mono text-white/30 uppercase tracking-widest">
          <span>Sys_v5.0</span>
          <span>State: Biological Mind</span>
          <span>Location: Mumbai, IN</span>
          <span>Diploma: 97.03%</span>
        </div>
      </div>

      {/* Scroll Down Guide */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        onClick={() => scrollToSection("brain-zoom")}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer group"
      >
        <span className="text-[10px] font-mono text-zinc-500 tracking-[0.3em] uppercase group-hover:text-cyan-400 transition-colors">
          Scroll to Transform Brain
        </span>
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center p-1 group-hover:border-cyan-400 transition-colors">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-2.5 rounded-full bg-cyan-400"
          />
        </div>
      </motion.div>
    </section>
  );
}
