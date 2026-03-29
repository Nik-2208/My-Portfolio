"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function NeuralNetworkZoom() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1.2, 2]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0, 1, 0]);

  return (
    <section 
      ref={containerRef} 
      id="brain-zoom" 
      className="relative h-[150vh] w-full bg-black z-20"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ scale, opacity }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <svg viewBox="0 0 800 800" className="w-full h-full max-w-[1000px] max-h-[1000px] opacity-40">
            <defs>
              <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#9933ff" stopOpacity="1" />
                <stop offset="100%" stopColor="#9933ff" stopOpacity="0" />
              </radialGradient>
            </defs>
            <g stroke="#9933ff" strokeWidth="1" fill="none" opacity="0.5">
              <path d="M400,200 Q500,150 600,300 T650,500 Q550,700 400,650 Q250,700 150,500 T200,300 Q300,150 400,200 Z" />
              <path d="M400,200 L400,650" strokeDasharray="5,5" />
              <path d="M400,300 L500,400 L450,500 L400,450 L350,500 L300,400 Z" />
              <path d="M300,400 L200,450 M500,400 L600,450 M450,500 L550,600 M350,500 L250,600" />
            </g>
            <circle cx="400" cy="200" r="10" fill="url(#nodeGlow)" className="animate-pulse" />
            <circle cx="400" cy="650" r="15" fill="url(#nodeGlow)" />
            <circle cx="500" cy="400" r="8" fill="#00ffff" />
            <circle cx="300" cy="400" r="8" fill="#00ffff" />
            <circle cx="450" cy="500" r="12" fill="#00ffff" className="animate-pulse" />
            <circle cx="350" cy="500" r="12" fill="#00ffff" className="animate-pulse" />
            <circle cx="400" cy="450" r="20" fill="url(#nodeGlow)" className="animate-[pulse_3s_infinite]" />
          </svg>
        </motion.div>

        <motion.div 
          style={{ opacity: textOpacity }}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter mb-6">
            Breaking into  <span className="text-purple-400">Nik</span>
          </h2>
          <p className="text-lg md:text-2xl text-gray-400 font-light tracking-wide">
            Decoding a mind where intuition meets logic.          </p>
        </motion.div>
      </div>
    </section>
  );
}
