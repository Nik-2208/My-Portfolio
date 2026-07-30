"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Shield, Cpu, Video, Cloud, Mail, FileEdit, ExternalLink, X, Sparkles, TrendingUp } from "lucide-react";
import { useCentralMotion } from "../hooks/useCentralMotion";
import Modal from "../components/Modal";

const IconMap = {
  FileEdit,
  Mail,
  Shield,
  Cloud,
  Video,
  Cpu,
} as const;

type IconKey = keyof typeof IconMap;

interface Experience {
  id: string;
  company: string;
  website?: string;
  role: string;
  period: string;
  color: string;
  glowColor: string;
  icon: IconKey;
  description: string;
  progressionNote?: string;
  responsibilities: string[];
  achievements: string[];
}

const experiences: Experience[] = [
  {
    id: "edujr-content",
    company: "EduJR",
    website: "https://edujr.com/",
    role: "Content Writing Intern",
    period: "28 April 2026 – 25 June 2026",
    color: "#ec4899",
    glowColor: "rgba(236, 72, 153, 0.35)",
    icon: "FileEdit",
    description: "Authored high-impact SEO content and technological articles following top performance in email marketing outreach.",
    progressionNote: "I was initially hired as an Email Marketing Intern and later received the opportunity to work as a Content Writing Intern due to my performance.",
    responsibilities: [
      "Authored more than 40 SEO-friendly blog articles.",
      "Researched educational and technology topics.",
      "Improved website content quality and domain authority.",
      "Worked closely with the marketing team to align strategy."
    ],
    achievements: ["40+ Published Articles", "SEO Optimization", "Content Strategy"]
  },
  {
    id: "edujr-email",
    company: "EduJR",
    website: "https://edujr.com/",
    role: "Email Marketing Intern",
    period: "04 April 2026 – 30 May 2026",
    color: "#f59e0b",
    glowColor: "rgba(245, 158, 11, 0.35)",
    icon: "Mail",
    description: "Executed daily high-volume client outreach and B2B communication campaigns for educational growth.",
    progressionNote: "Demonstrated high outreach consistency leading to internal promotion into Content Writing.",
    responsibilities: [
      "Sent approximately 100 professional outreach emails daily.",
      "Communicated with prospective clients and educational institutions.",
      "Maintained outreach quality, accuracy, and brand consistency.",
      "Assisted in campaign execution and prospective client engagement.",
      "Developed advanced professional communication and sales conversion skills."
    ],
    achievements: ["~100 Daily Outreach Emails", "B2B Communication", "Campaign Management"]
  },
  {
    id: "aicte-cyber",
    company: "AICTE - Edunet Foundation (Vodafone)",
    role: "Cybersecurity Intern",
    period: "2025 – 2026",
    color: "#00ffff",
    glowColor: "rgba(0, 255, 255, 0.35)",
    icon: "Shield",
    description: "Built keylogger-based security projects and integrated AI for threat simulation.",
    responsibilities: [
      "Developed keylogger detection & prevention modules.",
      "Executed network packet analysis and vulnerability assessment.",
      "Integrated AI models for automated threat simulation."
    ],
    achievements: ["Packet analysis", "Threat simulation"]
  },
  {
    id: "aicte-azure",
    company: "AICTE - Edunet Foundation (Microsoft)",
    role: "Azure AI Intern",
    period: "2025",
    color: "#3b82f6",
    glowColor: "rgba(59, 130, 246, 0.35)",
    icon: "Cloud",
    description: "Explored cloud computing architectures and AI services using Microsoft Azure.",
    responsibilities: [
      "Deployed machine learning models on Azure Cognitive Services.",
      "Utilized Azure cloud resources for scalable data processing."
    ],
    achievements: ["Azure Fundamentals", "Cognitive Services"]
  },
  {
    id: "kjsac-lms",
    company: "KJSAC",
    role: "LMS Admin & Content",
    period: "2025",
    color: "#10b981",
    glowColor: "rgba(16, 185, 129, 0.35)",
    icon: "Video",
    description: "Managed LMS platform and created educational content using OBS and Canva.",
    responsibilities: [
      "Produced and optimized 50+ recorded lecture videos.",
      "Administered LMS platform users, roles, and content deployment."
    ],
    achievements: ["50+ lecture videos", "LMS optimization"]
  },
  {
    id: "kjsiti-hardware",
    company: "K. J. Somaiya ITI",
    role: "Hardware Engineer Intern",
    period: "2025",
    color: "#a855f7",
    glowColor: "rgba(168, 85, 247, 0.35)",
    icon: "Cpu",
    description: "Assembled computer systems and diagnosed hardware issues across campus infrastructure.",
    responsibilities: [
      "Assembled and benchmarked PC workstations.",
      "Diagnosed hardware failures and network connectivity bottlenecks."
    ],
    achievements: ["Hardware troubleshooting", "System diagnostics"]
  }
];

export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);
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

  return (
    <section ref={containerRef} id="experience" className="relative py-24 md:py-36 bg-black z-20 overflow-hidden" aria-label="Cinematic Work Experience Timeline">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 md:mb-28"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-md mb-4 text-xs font-mono text-cyan-400 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Memory Capsules & Industry Experience</span>
          </div>

          <h2 className="text-4xl md:text-7xl font-bold text-white uppercase tracking-tighter italic">
            Experience <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500">Timeline</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-sm md:text-base max-w-xl mx-auto font-mono">
            A progressive journey of technical execution, outreach mastery, and engineering impact.
          </p>
        </motion.div>

        {/* Timeline Memory Capsule Grid */}
        <div className="relative">
          {/* Static Central Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 md:-translate-x-1/2" aria-hidden="true" />

          {/* Scroll Animated Growing Timeline Line */}
          <div
            ref={progressRef}
            className="absolute left-4 md:left-1/2 top-0 w-[2px] h-full bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500 md:-translate-x-1/2 will-change-transform origin-top z-10 shadow-[0_0_15px_rgba(0,255,255,0.6)]"
            aria-hidden="true"
          />

          <div className="space-y-12 md:space-y-16">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              const IconComp = IconMap[exp.icon];

              return (
                <div
                  key={exp.id}
                  className="relative pl-10 md:pl-0 md:grid md:grid-cols-2 md:gap-12 items-center"
                >
                  <div className={`${isEven ? "md:text-right" : "md:col-start-2"}`}>
                    <motion.div
                      initial={{
                        opacity: 0,
                        x: isEven ? -50 : 50,
                        rotate: isEven ? -2 : 2,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                        rotate: 0,
                      }}
                      viewport={{ once: false, margin: "-80px" }}
                      transition={{
                        duration: 0.7,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      whileHover={{
                        y: -8,
                        scale: 1.02,
                        boxShadow: `0 20px 40px ${exp.glowColor}`,
                      }}
                      onClick={() => setSelectedExp(exp)}
                      className="cursor-pointer p-6 md:p-8 rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-950/90 via-zinc-900/60 to-black backdrop-blur-xl transition-all duration-300 group hover:border-cyan-400/50 relative overflow-hidden"
                    >
                      {/* Ambient card glow */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none"
                        style={{ background: `radial-gradient(circle at top right, ${exp.color}, transparent 70%)` }}
                      />

                      {/* Progression Header Badge */}
                      {exp.progressionNote && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-mono mb-4">
                          <TrendingUp className="w-3.5 h-3.5" />
                          <span>Career Progression</span>
                        </div>
                      )}

                      <div className={`flex items-start gap-4 mb-4 ${isEven ? "md:flex-row-reverse" : ""}`}>
                        <div
                          className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/10 shadow-lg group-hover:scale-110 transition-transform duration-300"
                          style={{ backgroundColor: `${exp.color}20`, borderColor: `${exp.color}40` }}
                        >
                          <IconComp className="w-6 md:w-7 h-6 md:h-7" style={{ color: exp.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tight group-hover:text-cyan-300 transition-colors">
                            {exp.role}
                          </h3>
                          <div className={`flex items-center gap-2 mt-1 ${isEven ? "md:justify-end" : ""}`}>
                            <span className="font-mono text-xs font-bold uppercase tracking-wider" style={{ color: exp.color }}>
                              {exp.company}
                            </span>
                            {exp.website && (
                              <a
                                href={exp.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-zinc-400 hover:text-white transition-colors"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>

                      <p className="text-zinc-400 text-sm leading-relaxed mb-4 line-clamp-2 font-sans">
                        {exp.description}
                      </p>

                      <div className={`flex items-center justify-between pt-4 border-t border-white/5 font-mono text-xs text-zinc-500 ${isEven ? "md:flex-row-reverse" : ""}`}>
                        <span>{exp.period}</span>
                        <span className="text-cyan-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-bold">
                          Inspect Memory Capsule &rarr;
                        </span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Node Marker */}
                  <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2 z-20">
                    <div
                      className="w-6 h-6 rounded-full bg-black border-2 flex items-center justify-center shadow-[0_0_15px_rgba(0,255,255,0.4)]"
                      style={{ borderColor: exp.color }}
                    >
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: exp.color }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Memory Capsule Detail Portal Dialog */}
      <Modal
        isOpen={!!selectedExp}
        onClose={() => setSelectedExp(null)}
        maxWidth="max-w-2xl"
        ariaLabel="Experience Details"
      >
        {selectedExp && (
          <div className="flex flex-col">
            <div
              className="relative p-6 md:p-8 border-b border-white/10"
              style={{ background: `linear-gradient(to bottom, ${selectedExp.color}15, transparent)` }}
            >
              <button
                onClick={() => setSelectedExp(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-zinc-400 hover:text-white"
                aria-label="Close memory capsule"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center bg-zinc-900 border border-white/10 shadow-lg"
                  style={{ backgroundColor: `${selectedExp.color}25` }}
                >
                  {React.createElement(IconMap[selectedExp.icon], {
                    className: "w-7 h-7",
                    style: { color: selectedExp.color },
                  })}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white uppercase tracking-tight">{selectedExp.role}</h3>
                  <div className="flex items-center gap-3 mt-1 font-mono text-xs">
                    <span className="font-bold uppercase" style={{ color: selectedExp.color }}>
                      {selectedExp.company}
                    </span>
                    {selectedExp.website && (
                      <a
                        href={selectedExp.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-cyan-400 hover:underline"
                      >
                        {selectedExp.website.replace("https://", "")} <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-6">
              {selectedExp.progressionNote && (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-sm font-sans flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-amber-400 font-mono text-xs uppercase mb-1">Career Progression</strong>
                    <p className="leading-relaxed">{selectedExp.progressionNote}</p>
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-xs font-mono uppercase text-zinc-500 tracking-widest mb-3 font-bold">Core Responsibilities</h4>
                <ul className="space-y-2.5">
                  {selectedExp.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-3 text-zinc-300 text-sm leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: selectedExp.color }} />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase text-zinc-500 tracking-widest mb-3 font-bold">Key Highlights & Impact</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedExp.achievements.map((ach) => (
                    <span key={ach} className="px-3 py-1.5 rounded-xl text-xs font-mono bg-white/5 border border-white/10 text-zinc-300">
                      ⚡ {ach}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
