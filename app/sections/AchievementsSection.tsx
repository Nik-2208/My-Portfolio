"use client";

import React, { useRef, useEffect, useState } from "react";
import { Trophy, Award, Target, Zap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const IconMap = {
  Trophy: Trophy,
  Award: Award,
  Target: Target,
  Zap: Zap,
} as const;

type IconKey = keyof typeof IconMap;

const achievements = [
  {
    title: "1st Place – AICons Competition",
    event: "TechXpression 2025, KJSIT",
    description: "Secured top position in the AI-focused chatbot bot making competition demonstrating innovative AI solutions.",
    icon: "Trophy" as IconKey,
    color: "#ffcc00"
  },
  {
    title: "1st Place – Tech Trivia & Tech Stake",
    event: "Renaissance 2024, KJSIT",
    description: "Winner of the tech trivia and tech stake knowledge competition.",
    icon: "Award" as IconKey,
    color: "#00ffff"
  },
  {
    title: "Top 45 – GDG Figma Hackathon",
    event: "PixelVerse 2026, SIES GST",
    description: "Recognized among the top designers in a national level GDG hosted UI/UX hackathon.",
    icon: "Target" as IconKey,
    color: "#ff3366"
  }
];

const events = [
  { name: "Automate with n8n Hackathon", org: "KJSCE", year: "2026" },
  { name: "AlgNite Codethon", org: "KJSI", year: "2024" },
  { name: "Tech Quest", org: "KJSCE", year: "2025" }
];

export default function AchievementsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
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

    gsap.fromTo(cardsRef.current,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.15,
        ease: "power2.out"
      }
    );
  }, [isInView]);

  return (
    <section ref={containerRef} id="achievements" className="relative py-24 md:py-32 bg-black z-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-6 md:w-8 h-6 md:h-8 text-yellow-400" />
            <span className="text-yellow-400 text-xs md:text-sm tracking-[0.3em] uppercase font-bold">Hall of Fame</span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
            Milestone <span className="text-yellow-400">Archives</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 md:mb-16">
          {achievements.map((item, index) => (
            <div
              key={item.title}
              ref={el => { cardsRef.current[index] = el; }}
              className="group p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md hover:border-yellow-500/50 transition-all duration-300 relative overflow-hidden"
            >
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                style={{ background: `radial-gradient(circle at top right, ${item.color}, transparent 70%)` }}
              />
              
              <div 
                className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10"
                style={{ backgroundColor: `${item.color}20` }}
              >
                {React.createElement(IconMap[item.icon], { className: "w-6 md:w-7 h-6 md:h-7", style: { color: item.color } })}



              </div>
              
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 relative z-10">{item.title}</h3>
              <p className="text-yellow-500/80 text-xs font-mono mb-3 uppercase tracking-widest relative z-10">{item.event}</p>
              <p className="text-gray-400 text-sm leading-relaxed relative z-10">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="p-8 md:p-10 rounded-3xl border border-white/5 bg-zinc-900/30 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <Zap className="w-5 md:w-6 h-5 md:h-6 text-cyan-400" />
            <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tighter">Events Participated</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {events.map((e) => (
              <div key={e.name} className="p-4 md:p-6 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                <span className="text-cyan-400 text-[10px] md:text-xs font-mono mb-2 uppercase tracking-widest block">{e.org} | {e.year}</span>
                <span className="text-white font-medium text-sm md:text-base">{e.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
