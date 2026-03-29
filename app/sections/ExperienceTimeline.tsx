"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Cpu, Video, Cloud, X } from "lucide-react";

const IconMap = {
  Shield: Shield,
  Cloud: Cloud,
  Video: Video,
  Cpu: Cpu,
} as const;

type IconKey = keyof typeof IconMap;

interface Experience {
  company: string;
  role: string;
  period: string;
  color: string;
  icon: IconKey;
  description: string;
  achievements: string[];
}
import { useCentralMotion } from "../hooks/useCentralMotion";

const experiences: Experience[] = [
  { company: "AICTE - Edunet Foundation (Vodafone)", role: "Cybersecurity Intern", period: "2025 – 2026", color: "#00ffff", icon: "Shield" as IconKey, description: "Built keylogger-based security projects and integrated AI for threat simulation.", achievements: ["Packet analysis", "Threat simulation"] },
  { company: "AICTE - Edunet Foundation (Microsoft)", role: "Azure AI Intern", period: "Recent", color: "#0066ff", icon: "Cloud" as IconKey, description: "Explored cloud computing and AI services using Microsoft Azure.", achievements: ["Azure Fundamentals", "Cognitive Services"] },
  { company: "KJSAC", role: "LMS Admin & Content ", period: "2025", color: "#00ff66", icon: "Video" as IconKey, description: "Managed LMS platform and created educational content using OBS and Canva.", achievements: ["50+ lecture videos", "LMS optimization"] },
  { company: "K. J. Somaiya ITI", role: "Hardware Engineer Intern", period: "2025", color: "#9933ff", icon: "Cpu" as IconKey, description: "Assembled computer systems and diagnosed hardware issues across infrastructure.", achievements: ["Hardware troubleshooting", "System diagnostics"] },
];

export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [selectedExp, setSelectedExp] = useState<typeof experiences[0] | null>(null);
  const { useRaf, isLowPerformance } = useCentralMotion();

  useRaf(() => {
    if (!containerRef.current || !progressRef.current || isLowPerformance) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const windowH = window.innerHeight;
    
    const start = windowH * 0.8;
    const end = -rect.height * 0.5;
    
    const rawP = (start - rect.top) / (start - end);
    const p = Math.max(0, Math.min(1, rawP));

    progressRef.current.style.transform = `scaleY(${p})`;
  });

  if (isLowPerformance) {
    return (
      <section id="experience" className="py-24 bg-black px-4 sm:px-6 z-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-white uppercase tracking-tighter italic">Experience Log</h2>
          <div className="space-y-6">
            {experiences.map(exp => (
              <div key={exp.company} className="p-8 rounded-3xl border border-zinc-800 bg-zinc-900/50">
                <h3 className="text-xl font-bold text-white uppercase">{exp.role}</h3>
                <p className="text-cyan-500 font-mono text-xs uppercase mb-4">{exp.company} | {exp.period}</p>
                <p className="text-zinc-400 text-sm">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} id="experience" className="relative py-24 md:py-32 bg-black z-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tighter italic">Experience Log</h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 md:-translate-x-1/2" />
          <div 
            ref={progressRef}
            className="absolute left-4 md:left-1/2 top-0 w-[2px] h-full bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500 md:-translate-x-1/2 will-change-transform origin-top"
          />

          <div className="space-y-12 md:space-y-0">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              return (
                <div 
                  key={exp.company} 
                  className="relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-8"
                >
                  <div className={`mb-8 md:mb-0 ${isEven ? 'md:text-right md:pr-12' : 'md:col-start-2 md:pl-12'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedExp(exp)}
                      className="cursor-pointer p-6 md:p-8 rounded-3xl border border-white/5 bg-zinc-950 hover:bg-zinc-900 transition-all duration-300 hover:border-cyan-500/30"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${exp.color}20` }}
                        >
                          {React.createElement(IconMap[exp.icon], { className: "w-6 h-6", style: { color: exp.color } })}

                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg md:text-xl font-bold text-white uppercase tracking-tight truncate">{exp.role}</h3>
                          <p className="text-cyan-500 font-mono text-xs uppercase tracking-wider">{exp.company}</p>
                        </div>
                      </div>
                      <p className="text-zinc-500 text-sm line-clamp-2">{exp.description}</p>
                      <p className="text-zinc-600 text-xs mt-3 font-mono">{exp.period}</p>
                    </motion.div>
                  </div>

                  <div className="hidden md:flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-black border-2 border-cyan-500 z-10">
                      <div className="w-2 h-2 m-auto mt-0.5 rounded-full bg-cyan-500" />
                    </div>
                  </div>

                  <div className="md:hidden absolute left-4 top-6 -translate-x-1/2">
                    <div className="w-4 h-4 rounded-full bg-black border-2 border-cyan-500">
                      <div className="w-2 h-2 m-auto mt-0.5 rounded-full bg-cyan-500" />
                    </div>
                  </div>

                  <div className={`md:col-start-2 ${isEven ? '' : 'md:text-right md:pr-12'}`}>
                    <div className="h-12 md:h-24" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedExp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedExp(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-zinc-950/95 border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="relative p-6 md:p-8 border-b border-white/10" style={{ background: `linear-gradient(to bottom, ${selectedExp.color}10, transparent)` }}>
                <button 
                  onClick={() => setSelectedExp(null)} 
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-zinc-400" />
                </button>
                
                <div className="flex items-center gap-4 mb-4">
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center bg-zinc-900 border border-white/10"
                  >
                    {React.createElement(IconMap[selectedExp.icon], { className: "w-7 h-7", style: { color: selectedExp.color } })}

                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white uppercase tracking-tight">{selectedExp.role}</h3>
                    <p className="text-cyan-500 uppercase tracking-wider text-xs font-bold">{selectedExp.company}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <p className="text-zinc-300 text-sm leading-relaxed mb-6 border-l-2 border-cyan-500/50 pl-4">
                  {selectedExp.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedExp.achievements.map(a => (
                    <div key={a} className="p-4 bg-zinc-900 rounded-xl border border-white/5 flex items-center gap-3">
                      <div 
                        className="w-2 h-2 rounded-full flex-shrink-0" 
                        style={{ backgroundColor: selectedExp.color }} 
                      />
                      <span className="text-zinc-400 text-sm">{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
