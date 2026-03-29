"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { GraduationCap, School } from "lucide-react";

const IconMap = {
  GraduationCap: GraduationCap,
  School: School,
} as const;

type IconKey = keyof typeof IconMap;

interface EducationData {
  institution: string;
  degree: string;
  period: string;
  score: string;
  color: string;
  icon: IconKey;
}
import { useCentralMotion } from "../hooks/useCentralMotion";

const educationData: EducationData[] = [
  { institution: "K. J. Somaiya Polytechnic", degree: "Diploma in Computer Engineering", period: "TY, 5th Sem", score: "95.5%", color: "#00ffff", icon: "GraduationCap" as IconKey },
  { institution: "P. G. Garodia School", degree: "Secondary Education", period: "Completed", score: "93.4%", color: "#9933ff", icon: "School" as IconKey }
];

export default function EducationSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const { useRaf, isLowPerformance } = useCentralMotion();

  useRaf(() => {
    if (!containerRef.current || !pathRef.current || isLowPerformance) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const windowH = window.innerHeight;
    
    const start = windowH;
    const end = -rect.height;
    
    const rawP = (start - rect.top) / (start - end);
    const p = Math.max(0, Math.min(1, rawP));

    const length = 2500;
    pathRef.current.style.strokeDasharray = `${length}`;
    pathRef.current.style.strokeDashoffset = `${length * (1 - p)}`;
  });

  if (isLowPerformance) {
    return (
      <section id="education" className="py-24 bg-black px-4 sm:px-6 z-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-white uppercase tracking-tighter italic">Academic_Archives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {educationData.map(edu => (
              <div key={edu.institution} className="p-8 rounded-3xl border border-zinc-800 bg-zinc-900/50">
                <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">{edu.institution}</h3>
                <p className="text-zinc-500 mb-4 uppercase text-xs tracking-widest">{edu.degree}</p>
                <div className="text-cyan-400 font-mono font-bold text-lg uppercase">Metric: {edu.score}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} id="education" className="relative py-24 md:py-32 bg-black overflow-hidden z-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tighter uppercase">
            Academic <span className="text-zinc-700">Foundation</span>
          </h2>
        </motion.div>

        <div className="relative">
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 overflow-visible" style={{ minHeight: '400px' }}>
            <defs>
              <linearGradient id="eduGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00ffff" />
                <stop offset="100%" stopColor="#9933ff" />
              </linearGradient>
            </defs>
            <path 
              ref={pathRef}
              d="M 100 50 L 100 200 L 300 200 L 300 350 M 500 50 L 500 150 L 700 150 L 700 350" 
              fill="none" 
              stroke="url(#eduGrad)" 
              strokeWidth="2" 
              strokeLinecap="round"
            />
          </svg>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 relative z-10">
            {educationData.map((edu, index) => (
              <motion.div
                key={edu.institution}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-8 md:p-10 rounded-3xl border border-white/5 bg-zinc-950/80 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/30"
              >
                <div className="flex items-start gap-5 mb-8">
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center bg-zinc-900 border border-white/10 flex-shrink-0"
                  >
                    {React.createElement(IconMap[edu.icon], { className: "w-7 h-7", style: { color: edu.color } })}

                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg md:text-xl font-bold text-white uppercase tracking-tight leading-tight mb-1">{edu.institution}</h3>
                    <p className="text-zinc-500 font-mono text-xs uppercase tracking-wider">{edu.degree}</p>
                  </div>
                </div>
                
                <div className="p-6 bg-black/50 rounded-2xl border border-white/5">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <span className="block text-zinc-600 text-[10px] uppercase tracking-[0.3em] font-bold mb-1">Performance</span>
                      <span className="text-3xl md:text-4xl font-bold text-white font-mono tracking-tight">{edu.score}</span>
                    </div>
                    <span className="text-zinc-600 text-xs uppercase tracking-widest font-mono whitespace-nowrap">{edu.period}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
