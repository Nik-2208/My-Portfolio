"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Terminal, Cpu, Sparkles, X, Rocket } from "lucide-react";
import Modal from "../components/Modal";

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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-24 md:py-36 bg-black z-20 overflow-hidden" aria-label="Deployment Archives and Projects">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
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
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              whileHover={{ y: -6, scale: 1.02 }}
              onClick={() => setSelectedProject(project)}
              className="cursor-pointer p-6 md:p-8 rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-950/90 via-zinc-900/50 to-black backdrop-blur-xl transition-all duration-300 group hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(0,255,255,0.15)] relative overflow-hidden"
            >
              {/* Module Header */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10 shadow-lg group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: `${project.color}20`, borderColor: `${project.color}40` }}
                  >
                    <Rocket className="w-6 h-6" style={{ color: project.color }} />
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
              </div>

              <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-sans line-clamp-2">
                {project.description}
              </p>

              {/* Technology Pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-xl text-[11px] font-mono bg-white/5 border border-white/10 text-zinc-300"
                  >
                    {t}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="px-2.5 py-1 rounded-xl text-[11px] font-mono bg-white/5 border border-white/10 text-zinc-500">
                    +{project.tech.length - 3}
                  </span>
                )}
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between font-mono text-xs text-zinc-500">
                <span>Streamlit Live</span>
                <span className="text-cyan-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-bold">
                  View Module &rarr;
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Shared Portal Modal for Project Details */}
      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        maxWidth="max-w-2xl"
        ariaLabel="Project Module Details"
      >
        {selectedProject && (
          <div className="flex flex-col">
            <div
              className="relative p-6 md:p-8 border-b border-white/10 flex items-center justify-between"
              style={{ background: `linear-gradient(to bottom, ${selectedProject.color}15, transparent)` }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center bg-zinc-900 border border-white/10 shadow-lg"
                  style={{ backgroundColor: `${selectedProject.color}25` }}
                >
                  <Rocket className="w-7 h-7" style={{ color: selectedProject.color }} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white uppercase tracking-tight">
                    {selectedProject.name}
                  </h3>
                  <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider">
                    Deployment Module
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-zinc-400 hover:text-white"
                aria-label="Close project module"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 md:p-8 space-y-6">
              <div>
                <h4 className="text-xs font-mono uppercase text-zinc-500 tracking-widest mb-2 font-bold">
                  Architecture Overview
                </h4>
                <p className="text-zinc-300 text-base leading-relaxed font-sans">
                  {selectedProject.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase text-zinc-500 tracking-widest mb-3 font-bold">
                  Technologies & Frameworks
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-mono bg-white/5 border border-white/10 text-zinc-200"
                    >
                      ⚡ {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 text-white font-bold font-mono text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-[0_0_25px_rgba(168,85,247,0.35)] flex items-center gap-2"
                >
                  <span>Launch Live Deployment</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <span className="text-zinc-500 text-xs font-mono hidden sm:inline">
                  Streamlit Cloud Platform
                </span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
