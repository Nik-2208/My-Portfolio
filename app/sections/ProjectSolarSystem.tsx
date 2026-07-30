"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Terminal, Cpu, Sparkles, ChevronRight, X } from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string;
  link: string;
  tech: string[];
  color: string;
  glowColor: string;
}

const projects: Project[] = [
  { id: "p1", name: "Personalized Learning Dashboard", description: "Predicts student performance and provides personalized learning insights.", link: "https://personalized-learner.streamlit.app/", tech: ["Python", "Streamlit", "ML", "Data Science"], color: "#ff6b6b", glowColor: "rgba(255, 107, 107, 0.3)" },
  { id: "p2", name: "AI Event Planner", description: "Intelligent AI-based system for planning and managing events seamlessly.", link: "https://aieventplanner.streamlit.app/", tech: ["Python", "NLP", "Streamlit"], color: "#4ecdc4", glowColor: "rgba(78, 205, 196, 0.3)" },
  { id: "p3", name: "SmartHire AI", description: "AI-powered hiring assistant for recruitment and candidate screening.", link: "https://hire-smart-ai.streamlit.app/", tech: ["Python", "NLP", "Machine Learning"], color: "#45b7d1", glowColor: "rgba(69, 183, 209, 0.3)" },
  { id: "p4", name: "Creativity Predictor", description: "Predicts creativity levels through text analysis and machine learning.", link: "https://creativity-predictor.streamlit.app/", tech: ["Python", "NLP", "ML"], color: "#96ceb4", glowColor: "rgba(150, 206, 180, 0.3)" },
  { id: "p5", name: "Digit Identifier", description: "Handwritten digit recognition system using neural networks.", link: "https://digit-identifier.streamlit.app/", tech: ["Python", "Image Processing", "Neural Nets"], color: "#ffeaa7", glowColor: "rgba(255, 234, 167, 0.3)" },
  { id: "p6", name: "AI Energy Predictor", description: "Predicts home energy consumption based on historical data and weather patterns.", link: "https://ai-energy-predictor.streamlit.app/", tech: ["Python", "ML", "Regression"], color: "#ffcc00", glowColor: "rgba(255, 204, 0, 0.3)" },
  { id: "p7", name: "NetSec AI", description: "Cybersecurity AI project for Network Intrusion Detection using machine learning to detect malicious activity.", link: "https://netsec-ai.streamlit.app/", tech: ["Python", "Cybersecurity", "ML", "Network Analysis"], color: "#00ff66", glowColor: "rgba(0, 255, 102, 0.3)" },
  { id: "p8", name: "Recipe Predictor", description: "Predicts recipes based on available ingredients using TF-IDF and ML models.", link: "https://recipro.streamlit.app/", tech: ["Python", "NLP", "Streamlit", "TF-IDF"], color: "#ff9966", glowColor: "rgba(255, 153, 102, 0.3)" },
  { id: "p9", name: "Sleep Insight Engine", description: "Analyzes sleep patterns to provide personalized wellness recommendations.", link: "https://sleep-insight-engine.streamlit.app/", tech: ["Python", "Data Science", "Matplotlib"], color: "#cc99ff", glowColor: "rgba(204, 153, 255, 0.3)" },
  { id: "p10", name: "Smart AQI Predictor", description: "Predicts Air Quality Index (AQI) using environmental data and machine learning.", link: "https://smart-aqi-predictor.streamlit.app/", tech: ["Python", "ML", "Pandas", "Numpy", "Streamlit"], color: "#00ccff", glowColor: "rgba(0, 204, 255, 0.3)" }
];

export default function ProjectSolarSystem() {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  return (
    <section id="projects" className="relative py-24 md:py-36 bg-black z-20 overflow-hidden" aria-label="Deployment Archives and Projects">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 backdrop-blur-md mb-4 text-xs font-mono text-purple-400 uppercase tracking-widest">
            <Cpu className="w-3.5 h-3.5" />
            <span>Deployed Neural Systems</span>
          </div>

          <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tighter uppercase">
            Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">Archives</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-sm md:text-base max-w-xl mx-auto font-mono">
            Spatial AI modules executing live machine learning models, NLP pipelines, and data insights.
          </p>
        </motion.div>

        {/* Spatial Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start">
          {projects.map((project, index) => {
            const isExpanded = activeProjectId === project.id;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className={`relative group ${isExpanded ? "md:col-span-2 lg:col-span-3 z-30" : "z-10"}`}
              >
                <div
                  onClick={() => setActiveProjectId(isExpanded ? null : project.id)}
                  className={`cursor-pointer p-6 md:p-8 rounded-3xl border transition-all duration-500 backdrop-blur-xl relative overflow-hidden ${
                    isExpanded
                      ? "border-cyan-400 bg-gradient-to-b from-zinc-950 via-zinc-900 to-black shadow-[0_0_50px_rgba(0,255,255,0.2)]"
                      : "border-white/10 bg-gradient-to-b from-zinc-950/90 via-zinc-900/50 to-black hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(0,255,255,0.1)]"
                  }`}
                >
                  {/* Holographic Beam Header */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10 shadow-lg group-hover:scale-110 transition-transform duration-300"
                        style={{ backgroundColor: `${project.color}20`, borderColor: `${project.color}40` }}
                      >
                        <Cpu className="w-6 h-6" style={{ color: project.color }} />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">
                          Module {index + 1}
                        </span>
                        <h3 className="text-lg md:text-xl font-bold text-white uppercase tracking-tight group-hover:text-cyan-300 transition-colors">
                          {project.name}
                        </h3>
                      </div>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-cyan-400 transition-colors">
                      {isExpanded ? <X className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </div>
                  </div>

                  <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-sans">
                    {project.description}
                  </p>

                  {/* Technology Pills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-xl text-[11px] font-mono bg-white/5 border border-white/10 text-zinc-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Inline Expanded Holographic Interface */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4 }}
                        className="pt-6 border-t border-white/10 space-y-6 overflow-hidden"
                      >
                        <div className="p-4 rounded-2xl bg-black/60 border border-cyan-500/20 font-mono text-xs text-cyan-300 flex items-center justify-between">
                          <span>Status: Deployed & Active</span>
                          <span>Stack: Streamlit / Python</span>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-bold font-mono text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-[0_0_20px_rgba(0,255,255,0.3)] flex items-center gap-2"
                          >
                            <span>Launch Live Application</span>
                            <ExternalLink className="w-4 h-4" />
                          </a>

                          <span className="text-zinc-500 text-xs font-mono">
                            Click module again to collapse
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
