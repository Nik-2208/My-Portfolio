"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Activity, Zap, Cpu, Sparkles } from "lucide-react";

export default function NeuralNetworkZoom() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Phases progress through the 300vh sticky scroll range
  // Phase 2: Synaptic ignition (0.0 - 0.25)
  // Phase 3: Digital replacing biological (0.25 - 0.55)
  // Phase 4: Full AI Architecture (0.55 - 0.8)
  // Phase 5: Entering the Neural Universe (0.8 - 1.0)

  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1.2, 1.8, 4.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.95, 1], [0, 1, 1, 0]);

  // Phase text indicators
  const phase1Text = useTransform(scrollYProgress, [0, 0.2, 0.25], [1, 1, 0]);
  const phase2Text = useTransform(scrollYProgress, [0.25, 0.35, 0.5, 0.55], [0, 1, 1, 0]);
  const phase3Text = useTransform(scrollYProgress, [0.55, 0.65, 0.75, 0.8], [0, 1, 1, 0]);
  const phase4Text = useTransform(scrollYProgress, [0.8, 0.88, 1], [0, 1, 0]);

  // Synaptic density & glow opacity
  const bioOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6], [1, 0.5, 0]);
  const aiOpacity = useTransform(scrollYProgress, [0.3, 0.6, 1], [0, 0.8, 1]);

  return (
    <section
      ref={containerRef}
      id="brain-zoom"
      className="relative h-[300vh] w-full bg-black z-20"
      aria-label="Human to AI Brain Evolution"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Ambient Neural Lighting */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.06)_0%,transparent_70%)] pointer-events-none" />

        {/* Central Graphic Container */}
        <motion.div
          style={{ scale, opacity }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none will-change-transform"
        >
          <svg viewBox="0 0 800 800" className="w-full h-full max-w-[900px] max-h-[900px] overflow-visible">
            <defs>
              <linearGradient id="bioGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00ffff" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
              <linearGradient id="aiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00ffff" />
                <stop offset="50%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
              <radialGradient id="neuralPulse" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#00ffff" stopOpacity="1" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Biological Synapses Layer */}
            <motion.g style={{ opacity: bioOpacity }} stroke="url(#bioGrad)" strokeWidth="1.5" fill="none">
              <path d="M 400 220 Q 520 180 620 320 T 660 520 Q 560 700 400 660 Q 240 700 140 520 T 180 320 Q 280 180 400 220 Z" />
              <path d="M 400 220 L 400 660" strokeDasharray="6,6" opacity="0.4" />
              <path d="M 320 400 Q 400 320 480 400 Q 400 480 320 400 Z" />
              <circle cx="400" cy="220" r="10" fill="url(#neuralPulse)" className="animate-ping" />
              <circle cx="400" cy="660" r="12" fill="url(#neuralPulse)" />
            </motion.g>

            {/* Digital AI Neural Architecture Layer */}
            <motion.g style={{ opacity: aiOpacity }} stroke="url(#aiGrad)" strokeWidth="2" fill="none">
              {/* Outer Matrix Polygon */}
              <polygon points="400,160 580,260 580,480 400,580 220,480 220,260" strokeWidth="1.5" opacity="0.6" />
              <polygon points="400,200 540,280 540,440 400,520 260,440 260,280" strokeWidth="2" />

              {/* Neural Bus Lines */}
              <line x1="400" y1="200" x2="400" y2="520" strokeDasharray="4,4" />
              <line x1="260" y1="360" x2="540" y2="360" strokeDasharray="4,4" />
              <line x1="260" y1="280" x2="540" y2="440" />
              <line x1="260" y1="440" x2="540" y2="280" />

              {/* Core Singularity Gateway Node */}
              <circle cx="400" cy="360" r="35" fill="none" stroke="#00ffff" strokeWidth="3" className="animate-[spin_10s_linear_infinite]" />
              <circle cx="400" cy="360" r="18" fill="url(#neuralPulse)" className="animate-pulse" />
              <circle cx="400" cy="360" r="6" fill="#ffffff" />
            </motion.g>

            {/* Active Nodes */}
            <circle cx="260" cy="280" r="8" fill="#00ffff" />
            <circle cx="540" cy="280" r="8" fill="#a855f7" />
            <circle cx="260" cy="440" r="8" fill="#ec4899" />
            <circle cx="540" cy="440" r="8" fill="#00ffff" />
          </svg>
        </motion.div>

        {/* Phase Narrative Overlay Cards (Apple Keynote Style) */}
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto pointer-events-none">
          {/* Phase 2 */}
          <motion.div style={{ opacity: phase1Text }} className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-mono uppercase tracking-widest">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Section 02: Synaptic Ignition</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tighter uppercase">
              Neural Activity <span className="text-cyan-400">Accelerates</span>
            </h2>
            <p className="text-zinc-400 font-mono text-sm sm:text-base">
              Relentless curiosity ignites rapid pattern recognition and continuous learning pathways.
            </p>
          </motion.div>

          {/* Phase 3 */}
          <motion.div style={{ opacity: phase2Text }} className="space-y-4 absolute inset-0 m-auto h-fit">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-mono uppercase tracking-widest">
              <Activity className="w-3.5 h-3.5 text-purple-400" />
              <span>Section 03: Digital Transition</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tighter uppercase">
              Synapses <span className="text-purple-400">Transform</span>
            </h2>
            <p className="text-zinc-400 font-mono text-sm sm:text-base">
              Disciplined logic structures biological thought into high-throughput digital neural nodes.
            </p>
          </motion.div>

          {/* Phase 4 */}
          <motion.div style={{ opacity: phase3Text }} className="space-y-4 absolute inset-0 m-auto h-fit">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-300 text-xs font-mono uppercase tracking-widest">
              <Cpu className="w-3.5 h-3.5 text-pink-400" />
              <span>Section 04: AI Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tighter uppercase">
              Neural Network <span className="text-pink-400">Complete</span>
            </h2>
            <p className="text-zinc-400 font-mono text-sm sm:text-base">
              A disciplined machine mindset engineered for solving complex problems and deploying AI solutions.
            </p>
          </motion.div>

          {/* Phase 5 */}
          <motion.div style={{ opacity: phase4Text }} className="space-y-4 absolute inset-0 m-auto h-fit">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/40 bg-cyan-400/10 text-cyan-300 text-xs font-mono uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>Section 05: The Neural Universe</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tighter uppercase">
              Entering <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">Inside The Brain</span>
            </h2>
            <p className="text-zinc-400 font-mono text-sm sm:text-base">
              Welcome to the interactive knowledge matrix. Explore skills, projects, and career milestones.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
