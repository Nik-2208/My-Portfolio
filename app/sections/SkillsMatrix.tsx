"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code2, Brain, Cpu, Database, Cloud, Wrench, Palette, Languages, 
  X, Sparkles, Network, ArrowUpRight
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface SkillDomain {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  glowColor: string;
  description: string;
  skills: string[];
}

const DOMAINS: SkillDomain[] = [
  { 
    id: "prog", 
    name: "Programming", 
    icon: Code2, 
    color: "#00ffff", 
    glowColor: "rgba(0, 255, 255, 0.4)", 
    description: "Core algorithms, data structures, and software engineering languages.", 
    skills: ["Python", "Java", "C", "C++", "SQL", "JavaScript", "HTML5", "CSS3", "Dart", "Flutter"] 
  },
  { 
    id: "aiml", 
    name: "Machine Learning", 
    icon: Brain, 
    color: "#a855f7", 
    glowColor: "rgba(168, 85, 247, 0.4)", 
    description: "Predictive modelling, statistical inference, and data science workflows.", 
    skills: ["Scikit-learn", "Pandas", "NumPy", "Matplotlib", "NLP", "TF-IDF", "KNN", "Logistic Regression", "Naive Bayes", "Recommendation Systems"] 
  },
  { 
    id: "ai", 
    name: "AI & Generative AI", 
    icon: Cpu, 
    color: "#ec4899", 
    glowColor: "rgba(236, 72, 153, 0.4)", 
    description: "Large Language Models, prompt engineering, and intelligent agents.", 
    skills: ["Gemini API", "ChatGPT", "Claude", "Prompt Engineering", "LLM Integration", "Azure Cognitive Services"] 
  },
  { 
    id: "databases", 
    name: "Databases", 
    icon: Database, 
    color: "#38bdf8", 
    glowColor: "rgba(56, 189, 248, 0.4)", 
    description: "Relational, real-time, and document storage architectures.", 
    skills: ["MySQL", "Firebase Firestore", "Supabase", "SQL Optimization"] 
  },
  { 
    id: "cloud", 
    name: "Cloud & Infra", 
    icon: Cloud, 
    color: "#3b82f6", 
    glowColor: "rgba(59, 130, 246, 0.4)", 
    description: "Scalable cloud services and infrastructure deployment.", 
    skills: ["Microsoft Azure", "Cloud Computing", "Streamlit Cloud", "Vercel"] 
  },
  { 
    id: "devtools", 
    name: "Developer Tools", 
    icon: Wrench, 
    color: "#f59e0b", 
    glowColor: "rgba(245, 158, 11, 0.4)", 
    description: "Automation workflows, containerization, and IDE ecosystems.", 
    skills: ["Docker", "Git", "GitHub", "n8n Automation", "Cursor", "Windsurf", "OBS Studio"] 
  },
  { 
    id: "design", 
    name: "Design & Creative", 
    icon: Palette, 
    color: "#10b981", 
    glowColor: "rgba(16, 185, 129, 0.4)", 
    description: "UI/UX wireframing, motion graphics, and media production.", 
    skills: ["Figma", "Canva", "Animaker", "Powtoon", "Kdenlive", "Media Design"] 
  },
  { 
    id: "languages", 
    name: "Languages", 
    icon: Languages, 
    color: "#e11d48", 
    glowColor: "rgba(225, 29, 72, 0.4)", 
    description: "Multilingual professional communication.", 
    skills: ["English (Professional)", "Hindi (Native)", "Gujarati (Native)", "Marathi (Fluent)"] 
  }
];

interface HubNode {
  domain: SkillDomain;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  subNodes: Array<{ name: string; angle: number; distance: number; speed: number }>;
}

export default function SkillsMatrix() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<HubNode[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const hoveredHubRef = useRef<string | null>(null);
  const animFrameRef = useRef<number>(0);

  const [activeDomain, setActiveDomain] = useState<SkillDomain | null>(null);
  const [hoveredDomain, setHoveredDomain] = useState<string | null>(null);

  const initGraph = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || canvas.width === 0 || canvas.height === 0) return;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const mainRadius = Math.min(canvas.width, canvas.height) * 0.32;

    nodesRef.current = DOMAINS.map((domain, i) => {
      const angle = (i / DOMAINS.length) * Math.PI * 2 - Math.PI / 2;
      const subNodes = domain.skills.map((skill) => ({
        name: skill,
        angle: Math.random() * Math.PI * 2,
        distance: 55 + Math.random() * 25,
        speed: (Math.random() - 0.5) * 0.015,
      }));

      return {
        domain,
        x: cx + Math.cos(angle) * mainRadius,
        y: cy + Math.sin(angle) * mainRadius,
        vx: 0,
        vy: 0,
        radius: 36,
        subNodes,
      };
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = Math.min(rect.height, 650);
      initGraph();
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleClick = () => {
      if (hoveredHubRef.current) {
        const found = DOMAINS.find((d) => d.id === hoveredHubRef.current);
        if (found) setActiveDomain(found);
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("click", handleClick);

    const render = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const m = mouseRef.current;
      let currentHovered: string | null = null;

      // Update Hub positions and check hover
      nodesRef.current.forEach((hub) => {
        const dx = m.x - hub.x;
        const dy = m.y - hub.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < hub.radius + 15) {
          currentHovered = hub.domain.id;
        }

        // Orbit subNodes
        hub.subNodes.forEach((sub) => {
          sub.angle += sub.speed;
        });
      });

      hoveredHubRef.current = currentHovered;
      setHoveredDomain(currentHovered);

      // Render Inter-Hub Synaptic Connections
      nodesRef.current.forEach((hub, i) => {
        nodesRef.current.forEach((other, j) => {
          if (i < j) {
            const isConnectedHover =
              hoveredDomain === hub.domain.id || hoveredDomain === other.domain.id;

            ctx.beginPath();
            ctx.moveTo(hub.x, hub.y);
            ctx.lineTo(other.x, other.y);

            const grad = ctx.createLinearGradient(hub.x, hub.y, other.x, other.y);
            grad.addColorStop(
              0,
              isConnectedHover ? hub.domain.color + "70" : "rgba(255, 255, 255, 0.05)"
            );
            grad.addColorStop(
              1,
              isConnectedHover ? other.domain.color + "70" : "rgba(255, 255, 255, 0.05)"
            );

            ctx.strokeStyle = grad;
            ctx.lineWidth = isConnectedHover ? 2 : 1;
            ctx.stroke();
          }
        });
      });

      // Render Hub Nodes & Orbiting Sub-Skills
      nodesRef.current.forEach((hub) => {
        const isHovered = hoveredDomain === hub.domain.id;

        // Render Sub-nodes connections
        hub.subNodes.forEach((sub) => {
          const sx = hub.x + Math.cos(sub.angle) * sub.distance;
          const sy = hub.y + Math.sin(sub.angle) * sub.distance;

          ctx.beginPath();
          ctx.moveTo(hub.x, hub.y);
          ctx.lineTo(sx, sy);
          ctx.strokeStyle = isHovered ? hub.domain.color + "80" : "rgba(255, 255, 255, 0.08)";
          ctx.lineWidth = isHovered ? 1.5 : 0.8;
          ctx.stroke();

          // Render Sub-node circle
          ctx.beginPath();
          ctx.arc(sx, sy, isHovered ? 4 : 2.5, 0, Math.PI * 2);
          ctx.fillStyle = hub.domain.color;
          ctx.fill();
        });

        // Hub Ambient Glow
        const glow = ctx.createRadialGradient(
          hub.x,
          hub.y,
          0,
          hub.x,
          hub.y,
          hub.radius + (isHovered ? 25 : 12)
        );
        glow.addColorStop(0, hub.domain.color + (isHovered ? "60" : "20"));
        glow.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.arc(hub.x, hub.y, hub.radius + (isHovered ? 25 : 12), 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Hub Core Circle
        ctx.beginPath();
        ctx.arc(hub.x, hub.y, hub.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#09090b";
        ctx.fill();
        ctx.strokeStyle = hub.domain.color;
        ctx.lineWidth = isHovered ? 3 : 2;
        ctx.stroke();

        // Hub Text Label inside canvas
        ctx.fillStyle = isHovered ? "#ffffff" : hub.domain.color;
        ctx.font = `${isHovered ? "bold 13px" : "11px"} monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(hub.domain.name.split(" ")[0], hub.x, hub.y);
      });

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("click", handleClick);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [initGraph, hoveredDomain]);

  return (
    <section id="skills" className="relative py-24 md:py-36 bg-black z-20 overflow-hidden" aria-label="Interactive Skills Matrix">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-500/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-md mb-4 text-xs font-mono text-cyan-400 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Synaptic Matrix</span>
          </div>

          <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tighter uppercase">
            Skill <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500">Neural Network</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-sm md:text-base max-w-xl mx-auto font-mono">
            Hover domain hubs to illuminate synaptic connections • Click to zoom inside domain skills
          </p>
        </motion.div>

        {/* Canvas Neural Graph Container */}
        <div ref={containerRef} className="relative w-full min-h-[480px] md:min-h-[620px] cursor-crosshair">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        </div>

        {/* Domain Selection Pill Grid for Quick Access */}
        <div className="pt-6 pb-12">
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {DOMAINS.map((domain) => {
              const IconComp = domain.icon;
              return (
                <button
                  key={domain.id}
                  onClick={() => setActiveDomain(domain)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-mono text-xs transition-all duration-300 ${
                    activeDomain?.id === domain.id
                      ? "border-cyan-400 bg-cyan-500/15 text-white shadow-[0_0_15px_rgba(0,255,255,0.3)]"
                      : "border-white/10 bg-white/5 text-zinc-400 hover:border-white/30 hover:text-white"
                  }`}
                >
                  <IconComp className="w-4 h-4" style={{ color: domain.color }} />
                  <span>{domain.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Non-Overflowing Glassmorphic Skill Detail Panel */}
      <AnimatePresence>
        {activeDomain && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl"
            onClick={() => setActiveDomain(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-zinc-950 border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
            >
              {/* Panel Header */}
              <div
                className="relative p-6 md:p-8 border-b border-white/10 flex items-center justify-between"
                style={{ background: `linear-gradient(to bottom, ${activeDomain.color}15, transparent)` }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center bg-zinc-900 border border-white/10 shadow-lg"
                    style={{ backgroundColor: `${activeDomain.color}20` }}
                  >
                    {React.createElement(activeDomain.icon, {
                      className: "w-7 h-7",
                      style: { color: activeDomain.color },
                    })}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white uppercase tracking-tight">
                      {activeDomain.name}
                    </h3>
                    <p className="text-zinc-400 text-xs font-mono mt-0.5">{activeDomain.description}</p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveDomain(null)}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-zinc-400 hover:text-white"
                  aria-label="Close skills panel"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Panel Content Skills Grid */}
              <div className="p-6 md:p-8 overflow-y-auto">
                <h4 className="text-xs font-mono uppercase text-zinc-500 tracking-widest mb-4 font-bold">
                  Illuminated Skill Neurons ({activeDomain.skills.length})
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {activeDomain.skills.map((skill, idx) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3 hover:border-cyan-400/40 transition-colors"
                    >
                      <div
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor: activeDomain.color,
                          boxShadow: `0 0 10px ${activeDomain.color}`,
                        }}
                      />
                      <span className="text-sm text-zinc-200 font-mono font-medium">{skill}</span>
                    </motion.div>
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
