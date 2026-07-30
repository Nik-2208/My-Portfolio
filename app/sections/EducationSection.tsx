"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, School, Trophy, Award, Sparkles, CheckCircle2, TrendingUp, BookOpen, Layers } from "lucide-react";
import { useCentralMotion } from "../hooks/useCentralMotion";

const IconMap = {
  GraduationCap,
  School,
  Trophy,
  Award,
} as const;

type IconKey = keyof typeof IconMap;

interface EducationData {
  id: string;
  institution: string;
  location?: string;
  degree: string;
  period: string;
  score: string;
  scoreLabel: string;
  highlight?: string;
  rankBadge?: string;
  stats?: { label: string; value: string }[];
  color: string;
  glowColor: string;
  icon: IconKey;
}

const educationData: EducationData[] = [
  {
    id: "diploma",
    institution: "K. J. Somaiya Polytechnic",
    location: "Mumbai",
    degree: "Diploma in Computer Engineering",
    period: "Completed: 2026",
    score: "97.03%",
    scoreLabel: "Final Diploma Percentage",
    highlight: "🏆 Ranked 134th in the Maharashtra Diploma Merit List among approximately 68,800 candidates.",
    rankBadge: "State Rank 134 / 68.8k",
    stats: [
      { label: "Final Percentage", value: "97.03%" },
      { label: "Maharashtra Rank", value: "#134" },
      { label: "Candidate Pool", value: "~68,800" },
      { label: "Merit Percentile", value: "Top 0.2%" },
    ],
    color: "#00ffff",
    glowColor: "rgba(0, 255, 255, 0.25)",
    icon: "GraduationCap",
  },
  {
    id: "school",
    institution: "P. G. Garodia School",
    location: "ICSE",
    degree: "Secondary Education (ICSE Board)",
    period: "Completed",
    score: "93.4%",
    scoreLabel: "Final Board Percentage",
    color: "#a855f7",
    glowColor: "rgba(168, 85, 247, 0.25)",
    icon: "School",
  },
];

// Lightweight Confetti Particle Canvas for first reveal
function ConfettiCanvas({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.parentElement?.clientWidth || 600;
    canvas.height = canvas.parentElement?.clientHeight || 400;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      rotation: number;
      vRot: number;
      alpha: number;
    }> = [];

    const colors = ["#00ffff", "#a855f7", "#ffd700", "#38bdf8", "#ec4899"];

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 150,
        y: canvas.height * 0.4 + (Math.random() - 0.5) * 50,
        vx: (Math.random() - 0.5) * 5,
        vy: -Math.random() * 4 - 2,
        size: Math.random() * 5 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.15,
        alpha: 1,
      });
    }

    let animationFrameId: number;
    let startTime = performance.now();

    const render = (time: number) => {
      const elapsed = time - startTime;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1;
        p.rotation += p.vRot;
        if (elapsed > 1400) {
          p.alpha = Math.max(0, p.alpha - 0.02);
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });

      if (elapsed < 2800) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [active]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-30" aria-hidden="true" />;
}

export default function EducationSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const { useRaf, isLowPerformance } = useCentralMotion();
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [hasRevealed, setHasRevealed] = useState(false);

  useEffect(() => {
    if (isInView && !hasRevealed) {
      setHasRevealed(true);
    }
  }, [isInView, hasRevealed]);

  useRaf(() => {
    if (!containerRef.current || !pathRef.current || isLowPerformance) return;

    const rect = containerRef.current.getBoundingClientRect();
    const windowH = window.innerHeight;

    const start = windowH;
    const end = -rect.height;

    const rawP = (start - rect.top) / (start - end);
    const p = Math.max(0, Math.min(1, rawP));

    const length = 1800;
    pathRef.current.style.strokeDasharray = `${length}`;
    pathRef.current.style.strokeDashoffset = `${length * (1 - p)}`;
  });

  return (
    <section
      ref={containerRef}
      id="education"
      className="relative py-24 md:py-36 bg-black overflow-hidden z-20"
      aria-label="Academic Knowledge Archive"
    >
      {/* Ambient background lighting */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-md mb-4 text-xs font-mono text-cyan-400 uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5" />
            <span>AI Knowledge Archive & Excellence</span>
          </div>

          <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tighter uppercase">
            Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500">Archive</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-sm md:text-base max-w-xl mx-auto font-mono">
            Computer engineering foundation grounded in technical mastery and state-level competitive rank.
          </p>
        </motion.div>

        {/* Animated Circuit Node Background */}
        <div className="relative">
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-25 overflow-visible hidden md:block"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="eduGradCircuit" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#00ffff" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
            <path
              ref={pathRef}
              d="M 120 40 L 120 220 C 120 280 320 280 320 340 L 320 520 M 600 40 L 600 180 L 800 180 L 800 450"
              fill="none"
              stroke="url(#eduGradCircuit)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 items-start">
            {/* Main Diploma Feature Card (7 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 relative group"
            >
              <ConfettiCanvas active={hasRevealed && !isLowPerformance} />

              <div className="relative p-8 md:p-10 rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-zinc-950/90 via-zinc-900/60 to-black backdrop-blur-xl transition-all duration-500 hover:border-cyan-400/60 hover:shadow-[0_0_50px_rgba(0,255,255,0.15)] overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-[0_0_20px_rgba(0,255,255,0.2)]">
                      <GraduationCap className="w-8 h-8" />
                    </div>
                    <div>
                      <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest font-bold">
                        {educationData[0].period}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tight">
                        {educationData[0].institution}
                      </h3>
                      <p className="text-zinc-400 text-xs font-mono">{educationData[0].location}</p>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-yellow-500/15 to-cyan-500/20 border border-amber-400/40 text-amber-300 font-mono text-xs font-bold shadow-[0_0_15px_rgba(245,158,11,0.2)] animate-pulse">
                    <Trophy className="w-4 h-4 text-yellow-400" />
                    <span>{educationData[0].rankBadge}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400">
                    {educationData[0].degree}
                  </h4>
                </div>

                {/* Premium Glowing Merit Card */}
                {educationData[0].highlight && (
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-yellow-900/20 to-zinc-900/80 border border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.1)] relative overflow-hidden"
                  >
                    <div className="relative z-10 flex items-start gap-4">
                      <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-400/40 text-yellow-300 flex-shrink-0">
                        <Award className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-amber-400 text-xs font-mono font-bold uppercase tracking-widest mb-1 flex items-center gap-1.5">
                          <TrendingUp className="w-3.5 h-3.5" />
                          State Level Distinction
                        </div>
                        <p className="text-amber-100 text-sm md:text-base font-semibold leading-relaxed">
                          {educationData[0].highlight}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Statistics Grid */}
                {educationData[0].stats && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-black/60 rounded-2xl border border-white/10">
                    {educationData[0].stats.map((st) => (
                      <div key={st.label} className="text-center p-3 rounded-xl bg-white/5 border border-white/5">
                        <span className="block text-zinc-400 text-[10px] uppercase font-mono tracking-wider mb-1">
                          {st.label}
                        </span>
                        <span className="text-lg md:text-xl font-bold font-mono text-cyan-400">{st.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* School Card (5 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="lg:col-span-5 relative"
            >
              <div className="h-full p-8 md:p-10 rounded-3xl border border-purple-500/20 bg-gradient-to-b from-zinc-950/90 via-zinc-900/50 to-black backdrop-blur-xl transition-all duration-500 hover:border-purple-400/50 hover:shadow-[0_0_40px_rgba(168,85,247,0.15)] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-purple-500/10 border border-purple-500/30 text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                      <School className="w-8 h-8" />
                    </div>
                    <span className="text-purple-400 font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
                      ICSE Distinction
                    </span>
                  </div>

                  <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest block mb-1">
                    {educationData[1].period}
                  </span>
                  <h3 className="text-2xl font-bold text-white uppercase tracking-tight mb-2">
                    {educationData[1].institution}
                  </h3>
                  <p className="text-purple-300 font-mono text-sm uppercase tracking-wide mb-6">
                    {educationData[1].degree}
                  </p>
                </div>

                <div className="p-6 bg-black/60 rounded-2xl border border-purple-500/20 flex items-center justify-between">
                  <div>
                    <span className="block text-zinc-400 text-[10px] font-mono uppercase tracking-widest mb-1">
                      {educationData[1].scoreLabel}
                    </span>
                    <span className="text-4xl font-bold font-mono tracking-tight text-purple-400">
                      {educationData[1].score}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
