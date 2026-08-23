"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, Mail, FileText, ArrowDown, Cpu, MapPin, GraduationCap, Trophy } from "lucide-react";
import { useCentralMotion } from "../hooks/useCentralMotion";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { mouse, useRaf, isLowPerformance } = useCentralMotion();
  const [mounted, setMounted] = useState(false);

  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    size: number;
    opacity: number;
    pulse: number;
    isBrain?: boolean;
    isProfile?: boolean;
  }>>([]);

  // Bi-directional Scroll Motion Values
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 550], [1, 0.25]);
  const heroScale = useTransform(scrollY, [0, 550], [1, 1.2]);
  const heroY = useTransform(scrollY, [0, 550], [0, 120]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize Procedural Human Profile & Jarvis-style Robotic Brain Network
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

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height * 0.32;

    const list: typeof particlesRef.current = [];

    // 1. Human Side Profile Silhouette (Forehead, Nose, Lips, Chin, Neck)
    const profilePoints = [
      { x: 0, y: -50 }, { x: 15, y: -45 }, { x: 28, y: -30 }, { x: 35, y: -10 },
      { x: 30, y: 0 }, { x: 42, y: 10 }, { x: 32, y: 20 }, { x: 34, y: 30 },
      { x: 25, y: 45 }, { x: 10, y: 55 }, { x: -10, y: 60 }, { x: -30, y: 50 },
      { x: -45, y: 30 }, { x: -50, y: 0 }, { x: -45, y: -30 }, { x: -30, y: -50 }
    ];

    profilePoints.forEach((pt) => {
      list.push({
        x: centerX + pt.x,
        y: centerY + pt.y,
        baseX: centerX + pt.x,
        baseY: centerY + pt.y,
        size: 1.8,
        opacity: 0.75,
        pulse: Math.random() * Math.PI * 2,
        isProfile: true,
      });
    });

    // 2. Robotic Brain Nodes & Jarvis Holographic Circuits
    for (let i = 0; i < 28; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * 26;
      const bx = centerX - 5 + Math.cos(angle) * r;
      const by = centerY - 12 + Math.sin(angle) * (r * 0.75);
      list.push({
        x: bx,
        y: by,
        baseX: bx,
        baseY: by,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        pulse: Math.random() * Math.PI * 2,
        isBrain: true,
      });
    }

    // 3. Ambient Neural Dust Particles
    for (let i = 0; i < 55; i++) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      list.push({
        x: rx,
        y: ry,
        baseX: rx,
        baseY: ry,
        size: Math.random() * 1.5 + 0.6,
        opacity: Math.random() * 0.4 + 0.1,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    particlesRef.current = list;

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [mounted, isLowPerformance]);

  useEffect(() => {
    mouseRef.current = { x: mouse.smoothX, y: mouse.smoothY };
  }, [mouse.smoothX, mouse.smoothY]);

  // 120 FPS Procedural Render Loop
  useRaf(useCallback((time: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || isLowPerformance || !mounted) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const mouseX = mouseRef.current.x * canvas.width;
    const mouseY = mouseRef.current.y * canvas.height;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const breath = Math.sin(time * 0.002) * 2;
    const tiltX = (mouseRef.current.x - 0.5) * 10;
    const tiltY = (mouseRef.current.y - 0.5) * 10;

    const nodes = particlesRef.current;

    // Draw Dynamic Neural Circuits
    ctx.lineWidth = 0.5;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 48) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(0, 255, 255, ${0.2 * (1 - dist / 48)})`;
          ctx.stroke();
        }
      }
    }

    // Render Procedural Nodes
    nodes.forEach((p) => {
      p.pulse += 0.03;
      const currentOpacity = p.opacity + Math.sin(p.pulse) * 0.15;

      const drawX = p.baseX + tiltX;
      let drawY = p.baseY + tiltY;

      if (p.isBrain || p.isProfile) {
        drawY += breath;
      }

      p.x = drawX;
      p.y = drawY;

      ctx.beginPath();
      ctx.arc(drawX, drawY, p.size, 0, Math.PI * 2);

      if (p.isBrain) {
        ctx.fillStyle = `rgba(168, 85, 247, ${Math.max(0.4, currentOpacity)})`;
      } else if (p.isProfile) {
        ctx.fillStyle = `rgba(0, 255, 255, ${Math.max(0.3, currentOpacity)})`;
      } else {
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.05, currentOpacity)})`;
      }

      ctx.fill();
    });
  }, [isLowPerformance, mounted]));

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
      className="relative min-h-screen w-full bg-[#050608] overflow-hidden flex flex-col items-center justify-between z-10 px-4 sm:px-6 py-10 select-none"
      aria-label="Nikhilesh H. Chavda AI Portfolio"
    >
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-40" />

      {/* Ambient Radial Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-cyan-500/10 via-blue-600/10 to-violet-600/10 rounded-full blur-[200px] pointer-events-none" />

      {/* Procedural Hologram Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 opacity-80 pointer-events-none will-change-transform"
        aria-hidden="true"
      />

      {/* Rotating Holographic Brain Rings Overlay */}
      <div className="absolute top-[32%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 pointer-events-none opacity-30 z-0">
        <svg viewBox="0 0 400 400" className="w-full h-full overflow-visible">
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "200px 200px" }}
          >
            <circle cx="200" cy="200" r="110" fill="none" stroke="#00ffff" strokeWidth="1" strokeDasharray="6 6" />
            <circle cx="200" cy="200" r="140" fill="none" stroke="#a855f7" strokeWidth="1" strokeDasharray="12 6" />
          </motion.g>
        </svg>
      </div>

      {/* TOP CENTER: Rounded HUD Pill */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-xl text-xs font-mono text-cyan-300 uppercase tracking-[0.25em] shadow-[0_0_25px_rgba(0,255,255,0.2)] mt-2"
      >
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span>SECTION 01 : HUMAN × AI</span>
      </motion.div>

      {/* CENTER TEXT: Welcome Label, Main Heading & Single Tagline */}
      <motion.div
        style={{
          scale: heroScale,
          y: heroY,
          opacity: heroOpacity,
        }}
        className="relative z-20 flex flex-col items-center justify-center text-center max-w-4xl mx-auto my-auto py-4 will-change-transform"
      >
        {/* Small Label */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[11px] font-mono tracking-[0.3em] uppercase text-cyan-400 mb-3"
        >
          WELCOME TO MY PORTFOLIO
        </motion.span>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight uppercase leading-none mb-4">
          <span className="text-white block font-sans">NIKHILESH</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 via-violet-400 to-pink-500 block font-mono mt-1 drop-shadow-[0_0_35px_rgba(0,255,255,0.25)]">
            CHAVDA
          </span>
        </h1>

        {/* Single Tagline */}
        <p className="text-xs sm:text-sm md:text-base font-mono uppercase tracking-[0.25em] text-zinc-400 mb-8">
          AI Engineer • Machine Learning • Full Stack Developer
        </p>

        {/* Single CTA Button: BEGIN JOURNEY */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group"
        >
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 blur opacity-40 group-hover:opacity-100 transition duration-300 pointer-events-none" />
          <button
            onClick={() => scrollToSection("brain-zoom")}
            className="relative px-9 py-4 rounded-2xl bg-[#050608] border border-cyan-500/40 text-white font-mono text-xs sm:text-sm tracking-[0.2em] uppercase shadow-2xl transition-all duration-300 flex items-center justify-center gap-3"
          >
            <span>BEGIN JOURNEY</span>
            <ArrowDown className="w-4 h-4 text-cyan-400 group-hover:translate-y-1 transition-transform" />
          </button>
        </motion.div>
      </motion.div>

      {/* LEFT SIDE PANEL: Small HUD Information */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="hidden lg:flex flex-col gap-3 absolute left-8 top-1/2 -translate-y-1/2 z-20 font-mono text-[11px] text-zinc-400"
      >
        <div className="p-4 rounded-2xl border border-white/10 bg-[#050608]/80 backdrop-blur-xl space-y-3 w-48 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-cyan-400 font-bold flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5" /> SYS_V6</span>
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">ONLINE</span>
          </div>

          <div>
            <span className="text-zinc-500 text-[9px] uppercase tracking-wider block">LOCATION</span>
            <span className="text-white flex items-center gap-1 text-xs font-sans font-medium mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" /> Mumbai, India
            </span>
          </div>

          <div>
            <span className="text-zinc-500 text-[9px] uppercase tracking-wider block">DIPLOMA SCORE</span>
            <span className="text-cyan-300 font-bold text-xs flex items-center gap-1 mt-0.5">
              <GraduationCap className="w-3.5 h-3.5" /> 97.03%
            </span>
          </div>

          <div>
            <span className="text-zinc-500 text-[9px] uppercase tracking-wider block">MERIT RANK</span>
            <span className="text-purple-300 font-bold text-xs flex items-center gap-1 mt-0.5">
              <Trophy className="w-3.5 h-3.5 text-purple-400" /> MH Rank 132 / 70,000+
            </span>
          </div>
        </div>
      </motion.div>

      {/* RIGHT SIDE PANEL: Vertical Icon Rail */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="hidden lg:flex flex-col gap-3 absolute right-8 top-1/2 -translate-y-1/2 z-20"
      >
        <a
          href="https://github.com/Nik-2208"
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 rounded-2xl border border-white/10 bg-[#050608]/80 backdrop-blur-xl flex items-center justify-center text-zinc-400 hover:text-cyan-400 hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all duration-300 group"
          title="GitHub"
        >
          <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
        </a>

        <a
          href="https://www.linkedin.com/in/nikhilesh-chavda-2b779533a/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 rounded-2xl border border-white/10 bg-[#050608]/80 backdrop-blur-xl flex items-center justify-center text-zinc-400 hover:text-blue-400 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(0,102,255,0.3)] transition-all duration-300 group"
          title="LinkedIn"
        >
          <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
        </a>

        <a
          href="mailto:nikhileshchavdawork@gmail.com"
          className="w-11 h-11 rounded-2xl border border-white/10 bg-[#050608]/80 backdrop-blur-xl flex items-center justify-center text-zinc-400 hover:text-purple-400 hover:border-purple-400/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-300 group"
          title="Email"
        >
          <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
        </a>

        <a
          href="https://drive.google.com/file/d/14mrW7Ko9qG4-dXNkLRTiPhnWn9bEgllK/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 rounded-2xl border border-white/10 bg-[#050608]/80 backdrop-blur-xl flex items-center justify-center text-zinc-400 hover:text-pink-400 hover:border-pink-400/50 hover:shadow-[0_0_15px_rgba(236,72,153,0.3)] transition-all duration-300 group"
          title="Resume"
        >
          <FileText className="w-4 h-4 group-hover:scale-110 transition-transform" />
        </a>
      </motion.div>

      {/* SCROLL INDICATOR: Bottom Center */}
      <div className="relative z-20 flex flex-col items-center gap-2 pointer-events-none opacity-70 mb-2">
        <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-cyan-400">SCROLL TO DISSOLVE</span>
        <div className="w-5 h-8 rounded-full border-2 border-cyan-500/40 p-1 flex justify-center">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-cyan-400"
          />
        </div>
      </div>
    </section>
  );
}
