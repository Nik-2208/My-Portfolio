"use client";

import { motion } from "framer-motion";
import { Network, Sparkles, Brain, Cpu } from "lucide-react";

export default function NeuralNetwork() {
  return (
    <section id="neural-network" className="relative py-24 md:py-36 bg-black z-20 overflow-hidden" aria-label="Neural Universe Gateway">
      {/* Subtle Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-6 text-xs font-mono text-cyan-400 uppercase tracking-widest">
              <Network className="w-3.5 h-3.5" />
              <span>Neural Universe • Gateway</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight uppercase tracking-tight">
              Inside The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500">Neural Mind</span>
            </h2>

            <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-6 font-sans">
              As a fast learner, disciplined thinker, and detail-oriented engineer, my mind operates as an intelligent neural matrix. I process complex technical problems, refine algorithms, and deploy AI solutions with precision and persistence.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <span className="text-zinc-500 uppercase tracking-wider block mb-1">Architecture</span>
                <span className="text-cyan-300 font-bold">Synchronized Parallelism</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <span className="text-zinc-500 uppercase tracking-wider block mb-1">Methodology</span>
                <span className="text-purple-300 font-bold">Continuous Iteration</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[320px] sm:h-[400px] flex items-center justify-center"
          >
            <svg viewBox="0 0 400 400" className="w-full h-full overflow-visible drop-shadow-[0_0_30px_rgba(0,255,255,0.4)]">
              <defs>
                <linearGradient id="netLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00ffff" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#a855f7" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#ec4899" stopOpacity="0.9" />
                </linearGradient>
              </defs>

              <motion.path
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2.2, ease: "easeInOut" }}
                d="M 50 200 Q 150 50, 250 200"
                fill="none"
                stroke="url(#netLineGrad)"
                strokeWidth="2.5"
              />
              <motion.path
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2.2, delay: 0.2, ease: "easeInOut" }}
                d="M 50 200 Q 150 350, 250 200"
                fill="none"
                stroke="url(#netLineGrad)"
                strokeWidth="2.5"
              />
              <motion.path
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, delay: 0.8, ease: "easeInOut" }}
                d="M 250 200 Q 300 100, 350 200"
                fill="none"
                stroke="url(#netLineGrad)"
                strokeWidth="2.5"
              />
              <motion.path
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, delay: 1, ease: "easeInOut" }}
                d="M 250 200 Q 300 300, 350 200"
                fill="none"
                stroke="url(#netLineGrad)"
                strokeWidth="2.5"
              />

              <motion.circle initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} cx="50" cy="200" r="9" fill="#00ffff" />
              <motion.circle initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} cx="150" cy="125" r="7" fill="#00ffff" />
              <motion.circle initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }} cx="150" cy="275" r="7" fill="#00ffff" />
              <motion.circle initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.9 }} cx="250" cy="200" r="14" fill="#a855f7" className="animate-pulse" />
              <motion.circle initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 1.3 }} cx="350" cy="200" r="9" fill="#ec4899" />
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
