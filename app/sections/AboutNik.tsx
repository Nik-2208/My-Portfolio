"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, MapPin, GraduationCap, Cpu, Network } from "lucide-react";

export default function AboutNik() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-24 md:py-32 bg-black z-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="flex items-center gap-2 mb-6">
              <User className="w-5 h-5 text-cyan-400" />
              <span className="text-cyan-400 text-xs font-bold uppercase tracking-[0.3em]">Identity Profile</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              AI/ML Enthusiast <br />
              {/* <span className="text-zinc-500">()</span> */}
            </h2>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-10">
              My vision is bridging humans and AI. I build predictive models, AI-powered applications, and intelligent systems. I specialize in Python-driven machine learning, NLP, and end-to-end AI project deployment, with a strong focus on building real-world solutions that solve complex problems.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-4 p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 flex-shrink-0">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="min-w-0">
                  <span className="text-zinc-500 text-[10px] uppercase tracking-widest block">Location</span>
                  <span className="text-zinc-300 text-sm font-medium truncate">Mumbai, India</span>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 flex-shrink-0">
                  <GraduationCap className="w-5 h-5 text-purple-400" />
                </div>
                <div className="min-w-0">
                  <span className="text-zinc-500 text-[10px] uppercase tracking-widest block">Education</span>
                  <span className="text-zinc-300 text-sm font-medium truncate">KJ Somaiya Polytechnic</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="order-1 lg:order-2 relative h-[400px] md:h-[500px] flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.1)_0%,transparent_60%)]" />

            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute w-[80%] h-[80%] rounded-full border border-white/5 flex items-center justify-center will-change-transform"
            >
              <Network className="w-32 md:w-48 h-32 md:h-48 text-cyan-500/10" />
            </motion.div>

            <motion.div 
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-[60%] h-[60%] rounded-3xl border border-cyan-500/20 bg-black/40 backdrop-blur-md flex items-center justify-center shadow-[0_0_50px_rgba(0,255,255,0.05)] will-change-transform"
            >
              <Cpu className="w-20 md:w-24 h-20 md:h-24 text-cyan-500/40" />
            </motion.div>

            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-0 md:right-4 bottom-4 md:bottom-10 p-4 md:p-5 rounded-2xl border border-cyan-400/30 bg-black/60 backdrop-blur-lg will-change-transform"
            >
              <div className="flex items-center gap-3 mb-1">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-cyan-400 text-[10px] uppercase tracking-widest font-bold">Status</span>
              </div>
              <div className="text-xl md:text-2xl font-mono text-white">UNIQUELY RARE</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
