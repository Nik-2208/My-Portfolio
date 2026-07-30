"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"particles" | "brain" | "core" | "text">("particles");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    // Check session storage for returning visitors to show fast 0.8s version
    const isReturning = typeof window !== "undefined" && sessionStorage.getItem("nik_portfolio_booted");
    const targetDuration = isReturning ? 800 : 2500;
    const startTime = performance.now();

    // Safety fallback timer (max 4.5s)
    const fallbackTimer = setTimeout(() => {
      onComplete();
    }, 4500);

    const updateProgress = (time: number) => {
      const elapsed = time - startTime;
      const rawP = Math.min(1, elapsed / targetDuration);
      const easeP = 1 - Math.pow(1 - rawP, 3); // Cubic easeOut

      setProgress(Math.round(easeP * 100));

      if (rawP < 0.25) setPhase("particles");
      else if (rawP < 0.55) setPhase("brain");
      else if (rawP < 0.78) setPhase("core");
      else setPhase("text");

      if (rawP < 1) {
        animRef.current = requestAnimationFrame(updateProgress);
      } else {
        try {
          sessionStorage.setItem("nik_portfolio_booted", "true");
        } catch {}
        setTimeout(onComplete, 250);
      }
    };

    animRef.current = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animRef.current);
      clearTimeout(fallbackTimer);
    };
  }, [onComplete]);

  // Particle Canvas for ambient neural emergence
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{ x: number; y: number; size: number; vx: number; vy: number; alpha: number }> = [];
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    let pAnimId: number;
    const renderParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 255, ${p.alpha})`;
        ctx.fill();
      });
      pAnimId = requestAnimationFrame(renderParticles);
    };

    pAnimId = requestAnimationFrame(renderParticles);

    return () => cancelAnimationFrame(pAnimId);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(20px)", scale: 1.03 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[999999] bg-black flex flex-col items-center justify-center p-6 select-none overflow-hidden"
    >
      {/* Background Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-30 pointer-events-none" />

      {/* Volumetric Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Central Visual Stage */}
      <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center mb-8">
        <svg viewBox="0 0 400 400" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="loaderOrganic" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00ffff" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            <linearGradient id="loaderTech" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
            <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00ffff" stopOpacity="1" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Brain Outline & Convergence Lines */}
          <AnimatePresence>
            {(phase === "brain" || phase === "core") && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Left Half Organic Synapses */}
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.1, ease: "easeInOut" }}
                  d="M 200 100 Q 120 100, 110 180 Q 100 240, 150 280 Q 180 300, 200 320"
                  fill="none"
                  stroke="url(#loaderOrganic)"
                  strokeWidth="2.5"
                />
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.3, ease: "easeInOut", delay: 0.15 }}
                  d="M 200 140 Q 140 160, 150 220 Q 160 260, 200 280"
                  fill="none"
                  stroke="url(#loaderOrganic)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />

                {/* Right Half Geometric Circuitry */}
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.1, ease: "easeInOut" }}
                  d="M 200 100 L 280 100 L 290 180 L 300 240 L 250 280 L 200 320"
                  fill="none"
                  stroke="url(#loaderTech)"
                  strokeWidth="2.5"
                />
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.3, ease: "easeInOut", delay: 0.15 }}
                  d="M 200 140 L 260 140 L 260 220 L 200 280"
                  fill="none"
                  stroke="url(#loaderTech)"
                  strokeWidth="1.5"
                />

                {/* Circuit Nodes */}
                <circle cx="280" cy="100" r="4" fill="#ec4899" />
                <circle cx="290" cy="180" r="4" fill="#a855f7" />
                <circle cx="250" cy="280" r="4" fill="#00ffff" />
              </motion.g>
            )}
          </AnimatePresence>

          {/* Central Neural Core Pulse */}
          <AnimatePresence>
            {phase === "core" && (
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.4, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <circle cx="200" cy="200" r="30" fill="url(#coreGlow)" className="animate-pulse" />
                <circle cx="200" cy="200" r="12" fill="#ffffff" />
              </motion.g>
            )}
          </AnimatePresence>
        </svg>

        {/* Phase 4 Title: NIK */}
        <AnimatePresence>
          {(phase === "text" || progress >= 78) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.88, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center"
            >
              <h1 className="text-6xl sm:text-7xl font-bold tracking-tighter text-white font-mono uppercase bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-purple-300 drop-shadow-[0_0_35px_rgba(0,255,255,0.4)]">
                NIK
              </h1>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Subtitle & Progress Line */}
      <div className="w-full max-w-sm flex flex-col items-center space-y-4 relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: progress > 30 ? 1 : 0, y: progress > 30 ? 0 : 10 }}
          transition={{ duration: 0.6 }}
          className="text-[11px] font-mono tracking-[0.25em] text-zinc-400 uppercase text-center"
        >
          Human Intelligence <span className="text-cyan-400 font-bold">×</span> Artificial Intelligence
        </motion.p>

        {/* Minimal Progress Line */}
        <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden relative">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 shadow-[0_0_12px_#00ffff]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between w-full text-[10px] font-mono text-zinc-500">
          <span>ACTIVATING NEURAL CORE</span>
          <span>{progress}%</span>
        </div>
      </div>
    </motion.div>
  );
}
