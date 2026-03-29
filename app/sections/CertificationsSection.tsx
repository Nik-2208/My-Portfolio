"use client";

import React, { useRef, useEffect, useState } from "react";
import { Award, CheckCircle, ShieldCheck, Cpu, Database, Cloud } from "lucide-react";

const IconMap = {
  Cpu: Cpu,
  Cloud: Cloud,
  Database: Database,
  ShieldCheck: ShieldCheck,
  CheckCircle: CheckCircle,
  Award: Award,
} as const;

type IconKey = keyof typeof IconMap;
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const certifications = [
{ name: "Machine Learning with Python", issuer: "IBM", icon: "Cpu" as IconKey, color: "#00ffff" },
  { name: "Azure AI-900", issuer: "Microsoft", icon: "Cloud" as IconKey, color: "#0066ff" },
  { name: "Python for Data Analysis", issuer: "Coursera", icon: "Database" as IconKey, color: "#33cc33" },
  { name: "Django Web Apps", issuer: "Skillsoft", icon: "ShieldCheck" as IconKey, color: "#9933ff" },
  { name: "DSA in Python", issuer: "Skillsoft", icon: "CheckCircle" as IconKey, color: "#ff3366" },
  { name: "AI & ML Fundamentals", issuer: "Skillsoft", icon: "Cpu" as IconKey, color: "#ffcc00" },
  { name: "Generative AI App Dev", issuer: "Tata", icon: "Award" as IconKey, color: "#00ff66" },
  { name: "Tata GenAI Simulation", issuer: "Tata / Forage", icon: "Award" as IconKey, color: "#ffffff" },
  { name: "Deloitte Data Analytics", issuer: "Deloitte", icon: "Database" as IconKey, color: "#86BC25" },
  { name: "BCG GenAI Simulation", issuer: "BCG", icon: "Award" as IconKey, color: "#004529" },
];

export default function CertificationsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isInView]);

  useEffect(() => {
    if (!isInView || !containerRef.current) return;

    gsap.fromTo(itemsRef.current,
      { opacity: 0, scale: 0.9, y: 20 },
      { 
        opacity: 1, 
        scale: 1,
        y: 0, 
        duration: 0.4, 
        stagger: 0.05,
        ease: "power2.out"
      }
    );
  }, [isInView]);

  return (
    <section ref={containerRef} id="certifications" className="relative py-24 md:py-32 bg-black z-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Award className="w-6 md:w-8 h-6 md:h-8 text-blue-400" />
            <span className="text-blue-400 text-xs md:text-sm tracking-[0.3em] uppercase font-bold">Verified Credentials</span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
            Certification <span className="text-blue-400">Ledger</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {certifications.map((cert, index) => (
            <div
              key={cert.name}
              ref={el => { itemsRef.current[index] = el; }}
              className="group p-4 md:p-6 rounded-xl md:rounded-2xl border border-white/5 bg-zinc-900/40 hover:bg-zinc-800/60 hover:border-blue-500/30 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden"
            >
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                style={{ background: `radial-gradient(circle at center, ${cert.color}, transparent 70%)` }}
              />
              
              <div 
                className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center mb-3 md:mb-4 transition-transform duration-300 group-hover:rotate-6 relative z-10"
                style={{ backgroundColor: `${cert.color}15` }}
              >
                {React.createElement(IconMap[cert.icon], { className: "w-5 md:w-6 h-5 md:h-6", style: { color: cert.color } })}

              </div>
              
              <h3 className="text-[10px] md:text-xs font-bold text-white mb-1 group-hover:text-blue-400 transition-colors uppercase tracking-tight relative z-10 line-clamp-2">{cert.name}</h3>
              <p className="text-[9px] md:text-[10px] text-gray-500 uppercase font-mono tracking-wider relative z-10">{cert.issuer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
