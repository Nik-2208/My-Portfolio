"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";

export default function NeuralNetwork() {
  return (
    <section id="neural-network" className="relative py-24 md:py-32 bg-black z-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4 md:mb-6">
              <Activity className="w-4 md:w-5 h-4 md:h-5 text-purple-400" />
              <span className="text-purple-400 text-xs font-bold uppercase tracking-[0.3em]">Data Flow</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
              My <span className="text-purple-400">Brain.</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed">
              My mind is a living network—constantly rewiring, filtering experience into thought with precision.
What I focus on shapes my pathways; what I repeat defines who I become.

            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-[300px] md:h-[400px]"
          >
            <svg viewBox="0 0 400 400" className="w-full h-full overflow-visible drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]">
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00ffff" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#9933ff" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              
              <motion.path 
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut" }}
                d="M 50 200 Q 150 50, 250 200" 
                fill="none" 
                stroke="url(#lineGrad)" 
                strokeWidth="2" 
              />
              <motion.path 
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 0.2, ease: "easeInOut" }}
                d="M 50 200 Q 150 350, 250 200" 
                fill="none" 
                stroke="url(#lineGrad)" 
                strokeWidth="2" 
              />
              <motion.path 
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
                d="M 250 200 Q 300 100, 350 200" 
                fill="none" 
                stroke="url(#lineGrad)" 
                strokeWidth="2" 
              />
              <motion.path 
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 1.2, ease: "easeInOut" }}
                d="M 250 200 Q 300 300, 350 200" 
                fill="none" 
                stroke="url(#lineGrad)" 
                strokeWidth="2" 
              />

              <motion.circle 
                initial={{ scale: 0 }} 
                whileInView={{ scale: 1 }} 
                viewport={{ once: true }} 
                cx="50" cy="200" r="8" 
                fill="#00ffff" 
              />
              <motion.circle 
                initial={{ scale: 0 }} 
                whileInView={{ scale: 1 }} 
                viewport={{ once: true }} 
                transition={{ delay: 0.5 }} 
                cx="150" cy="125" r="6" 
                fill="#00ffff" 
              />
              <motion.circle 
                initial={{ scale: 0 }} 
                whileInView={{ scale: 1 }} 
                viewport={{ once: true }} 
                transition={{ delay: 0.7 }} 
                cx="150" cy="275" r="6" 
                fill="#00ffff" 
              />
              <motion.circle 
                initial={{ scale: 0 }} 
                whileInView={{ scale: 1 }} 
                viewport={{ once: true }} 
                transition={{ delay: 1 }} 
                cx="250" cy="200" r="12" 
                fill="#9933ff" 
                className="animate-pulse" 
              />
              <motion.circle 
                initial={{ scale: 0 }} 
                whileInView={{ scale: 1 }} 
                viewport={{ once: true }} 
                transition={{ delay: 1.5 }} 
                cx="350" cy="200" r="8" 
                fill="#ffffff" 
              />
            </svg>
            
            <div className="absolute top-1/2 left-[10%] md:left-[12%] -translate-y-1/2 w-2 h-2 bg-white rounded-full blur-[2px] animate-ping" />
            <div className="absolute top-1/2 right-[10%] md:right-[12%] -translate-y-1/2 w-2 h-2 bg-white rounded-full blur-[2px] animate-ping" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
