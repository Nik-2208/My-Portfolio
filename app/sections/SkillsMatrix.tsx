"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Brain, Code2, Cpu, Cloud, Workflow, 
  Palette, Shield, Sparkles, X, Wifi
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface SkillDomain {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  description: string;
  skills: string[];
}

const DOMAINS: SkillDomain[] = [
  { id: "prog", name: "Programming", icon: Code2, color: "#00ffff", description: "Core logic and architectural languages.", skills: ["Python", "Java", "C", "C++", "SQL", "HTML", "CSS", "JavaScript", "Flutter"] },
  { id: "aiml", name: "AI / ML", icon: Brain, color: "#9933ff", description: "Neural computations and data science.", skills: ["Scikit-learn", "Pandas", "NumPy", "Matplotlib", "NLP", "TF-IDF", "KNN", "Logistic Regression", "Naive Bayes", "Recommendation Systems"] },
  { id: "frameworks", name: "Frameworks", icon: Cpu, color: "#00ff66", description: "Modern application building blocks.", skills: ["Django", "Streamlit", "Moodle", "Dart"] },
  { id: "cloud", name: "Cloud & DB", icon: Cloud, color: "#3399ff", description: "Scalable storage and cloud infra.", skills: ["MySQL", "Firebase", "Supabase"] },
  { id: "devops", name: "DevOps", icon: Workflow, color: "#ff3366", description: "Automation and version control.", skills: ["Docker", "Git", "GitHub", "n8n"] },
  { id: "design", name: "Design", icon: Palette, color: "#ffcc00", description: "Visual identity and creative output.", skills: ["Figma", "Canva", "Animaker", "Powtoon", "OBS Studio", "Kdenlive"] },
  { id: "cybersecurity", name: "Cybersecurity", icon: Shield, color: "#ff6600", description: "Infrastructure integrity and protocols.", skills: ["Wireshark", "Network Analysis", "Hardware Troubleshooting"] },
  { id: "llm", name: "LLM", icon: Sparkles, color: "#ffffff", description: "Generative AI and prompt engineering.", skills: ["Gemini", "ChatGPT", "Claude", "Cursor", "Windsurf", "Perplexity", "Gamma"] }
];

interface Node {
  domain: SkillDomain;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulse: number;
  connections: number[];
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

export default function SkillsMatrix() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const hoveredNodeRef = useRef<string | null>(null);
  const animationFrameRef = useRef<number>(0);
  
  const [activeDomain, setActiveDomain] = useState<SkillDomain | null>(null);
  const [hoveredDomain, setHoveredDomain] = useState<string | null>(null);

  const initNodes = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || canvas.width === 0 || canvas.height === 0) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) * 0.3;

    nodesRef.current = DOMAINS.map((domain, idx) => {
      const angle = (idx / DOMAINS.length) * Math.PI * 2 - Math.PI / 2;
      return {
        domain,
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        vx: 0,
        vy: 0,
        radius: 45,
        pulse: Math.random() * Math.PI * 2,
        connections: []
      };
    });

    nodesRef.current.forEach((node, i) => {
      nodesRef.current.forEach((other, j) => {
        if (i !== j) {
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < radius * 1.8) {
            node.connections.push(j);
          }
        }
      });
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = Math.min(rect.height, 700);
      initNodes();
    };
    resize();
    
    const handleResize = () => resize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleClick = () => {
      const hovered = hoveredNodeRef.current;
      if (hovered) {
        const domain = DOMAINS.find(d => d.id === hovered);
        if (domain) {
          setActiveDomain(domain);
          for (let i = 0; i < 30; i++) {
            const node = nodesRef.current.find(n => n.domain.id === hovered);
            if (node) {
              particlesRef.current.push({
                x: node.x,
                y: node.y,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8,
                life: 1,
                maxLife: 60 + Math.random() * 30,
                color: node.domain.color,
                size: Math.random() * 4 + 2
              });
            }
          }
        }
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("click", handleClick);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;
      let newHovered: string | null = null;

      nodesRef.current.forEach((node) => {
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < node.radius + 20) {
          node.vx -= dx * 0.0008;
          node.vy -= dy * 0.0008;
          newHovered = node.domain.id;
        }

        const targetX = node.x;
        const targetY = node.y;
        node.vx += (targetX - node.x) * 0.01;
        node.vy += (targetY - node.y) * 0.01;
        node.vx *= 0.92;
        node.vy *= 0.92;
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += 0.03;
      });

      hoveredNodeRef.current = newHovered;
      setHoveredDomain(newHovered);

      nodesRef.current.forEach((node) => {
        node.connections.forEach(j => {
          const other = nodesRef.current[j];
          
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(other.x, other.y);
          
          const isActive = hoveredDomain === node.domain.id || hoveredDomain === other.domain.id;
          const gradient = ctx.createLinearGradient(node.x, node.y, other.x, other.y);
          gradient.addColorStop(0, isActive ? node.domain.color + "60" : "rgba(255,255,255,0.05)");
          gradient.addColorStop(1, isActive ? other.domain.color + "60" : "rgba(255,255,255,0.05)");
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = isActive ? 2 : 1;
          ctx.stroke();
        });
      });

      nodesRef.current.forEach(node => {
        const isHovered = hoveredDomain === node.domain.id;
        const isSelected = activeDomain?.id === node.domain.id;
        const pulseSize = Math.sin(node.pulse) * 5;
        const glowSize = isHovered ? 30 : (isSelected ? 40 : 15);
        
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius + glowSize + pulseSize
        );
        gradient.addColorStop(0, node.domain.color + "40");
        gradient.addColorStop(0.5, node.domain.color + "10");
        gradient.addColorStop(1, "transparent");
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + glowSize + pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(10, 10, 10, 0.9)";
        ctx.fill();
        ctx.strokeStyle = node.domain.color;
        ctx.lineWidth = isHovered ? 3 : 2;
        ctx.stroke();

        ctx.fillStyle = node.domain.color;
        ctx.font = "bold 18px system-ui";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("●", node.x, node.y);
      });

      particlesRef.current = particlesRef.current.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.life -= 1 / p.maxLife;

        if (p.life > 0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
          ctx.fillStyle = p.color + Math.floor(p.life * 255).toString(16).padStart(2, "0");
          ctx.fill();
          return true;
        }
        return false;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [initNodes, hoveredDomain, activeDomain]);

  return (
    <section id="skills" className="relative bg-black z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-24 pb-12 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <Wifi className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-400 text-xs tracking-[0.5em] uppercase font-bold">Neural Network</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white tracking-tighter uppercase"
          >
            Skill <span className="text-zinc-700">Set Store</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-500 mt-4 text-sm"
          >
            Hover to explore • Click to dive deeper
          </motion.p>
        </div>

        <div 
          ref={containerRef}
          className="relative w-full min-h-[500px] md:min-h-[700px] cursor-crosshair"
        >
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
          
          <AnimatePresence>
            {hoveredDomain && !activeDomain && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20"
              >
                {DOMAINS.filter(d => d.id === hoveredDomain).map(domain => (
                  <motion.div
                    key={domain.id}
                    className="glass p-6 rounded-2xl border border-white/10 bg-black/80 backdrop-blur-xl max-w-xs"
                  >
                    <h3 className="text-2xl font-bold text-white mb-2">{domain.name}</h3>
                    <p className="text-zinc-400 text-sm">{domain.description}</p>
                    <p className="text-cyan-400 text-xs mt-2 font-mono">{domain.skills.length} skills</p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="pb-12 pt-4">
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {DOMAINS.map(domain => (
              <motion.button
                key={domain.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveDomain(domain)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                  activeDomain?.id === domain.id 
                    ? "border-white/30 bg-white/10" 
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                <domain.icon className="w-4 h-4" style={{ color: domain.color }} />
                <span className="text-white/80 text-sm">{domain.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeDomain && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setActiveDomain(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-auto bg-zinc-950/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl"
            >
              <div className="sticky top-0 z-10 flex items-center justify-between p-6 md:p-8 border-b border-white/10 bg-zinc-950/95">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10"
                    style={{ backgroundColor: activeDomain.color + "15" }}
                  >
                    <activeDomain.icon className="w-6 h-6" style={{ color: activeDomain.color }} />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{activeDomain.name}</h3>
                    <p className="text-zinc-500 text-xs font-mono">{activeDomain.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveDomain(null)}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-zinc-400" />
                </button>
              </div>

              <div className="p-6 md:p-8">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {activeDomain.skills.map((skill, idx) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      className="p-4 rounded-xl bg-white/5 border border-white/5"
                    >
                      <div 
                        className="w-2 h-2 rounded-full mb-2" 
                        style={{ backgroundColor: activeDomain.color, boxShadow: `0 0 8px ${activeDomain.color}` }} 
                      />
                      <span className="text-sm text-zinc-300">{skill}</span>
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
