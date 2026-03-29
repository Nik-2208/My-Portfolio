"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, TerminalSquare, Rocket, X } from "lucide-react";

interface Project {
  name: string;
  description: string;
  link: string;
  tech: string[];
  color: string;
}

const projects: Project[] = [
  { name: "Personalized Learning Dashboard", description: "Predicts student performance and provides personalized learning insights.", link: "https://personalized-learner.streamlit.app/", tech: ["Python", "Streamlit", "ML", "Data Science"], color: "#ff6b6b" },
  { name: "AI Event Planner", description: "Intelligent AI-based system for planning and managing events.", link: "https://aieventplanner.streamlit.app/", tech: ["Python", "NLP", "Streamlit"], color: "#4ecdc4" },
  { name: "SmartHire AI", description: "AI-powered hiring assistant for recruitment and candidate screening.", link: "https://hire-smart-ai.streamlit.app/", tech: ["Python", "NLP", "Machine Learning"], color: "#45b7d1" },
  { name: "Creativity Predictor", description: "Predicts creativity levels through text analysis and machine learning.", link: "https://creativity-predictor.streamlit.app/", tech: ["Python", "NLP", "ML"], color: "#96ceb4" },
  { name: "Digit Identifier", description: "Handwritten digit recognition system using neural networks.", link: "https://digit-identifier.streamlit.app/", tech: ["Python", "Image Processing"], color: "#ffeaa7" },
  { name: "AI Energy Predictor", description: "Predicts home energy consumption based on historical data.", link: "https://ai-energy-predictor.streamlit.app/", tech: ["Python", "ML", "Regression"], color: "#ffcc00" },
  { name: "NetSec AI", description: "Cybersecurity AI project for Network Intrusion Detection using machine learning to detect malicious activity.", link: "https://netsec-ai.streamlit.app/", tech: ["Python", "Cybersecurity", "ML", "Network Analysis"], color: "#00ff66" },
  { name: "Recipe Predictor", description: "Predicts recipes based on available ingredients using TF-IDF and ML models.", link: "https://recipro.streamlit.app/", tech: ["Python", "NLP", "Streamlit", "TF-IDF"], color: "#ff9966" },
  { name: "Sleep Insight Engine", description: "Analyzes sleep patterns to provide personalized wellness recommendations.", link: "https://sleep-insight-engine.streamlit.app/", tech: ["Python", "Data Science", "Matplotlib"], color: "#cc99ff" },
  { name: "Smart AQI Predictor", description: "Predicts Air Quality Index (AQI) using environmental data and machine learning.", link: "https://smart-aqi-predictor.streamlit.app/", tech: ["Python", "ML", "Pandas", "Numpy", "Streamlit"], color: "#00ccff" }
];

export default function ProjectSolarSystem() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-24 md:py-32 bg-black z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <TerminalSquare className="w-6 md:w-8 h-6 md:h-8 text-purple-400" />
            <span className="text-purple-400 text-xs md:text-sm tracking-[0.3em] uppercase font-bold">Deployments</span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
            Project <span className="text-purple-400">Archives</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div 
              key={project.name} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="h-full p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/10 relative overflow-hidden">
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  style={{ background: `radial-gradient(circle at top right, ${project.color}, transparent 70%)` }}
                />

                <div 
                  className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-4 md:mb-6 relative z-10"
                  style={{ backgroundColor: `${project.color}20` }}
                >
                  <Rocket className="w-5 h-5 md:w-6 md:h-6" style={{ color: project.color }} />
                </div>
                
                <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 group-hover:text-purple-400 transition-colors relative z-10 line-clamp-1">{project.name}</h3>
                <p className="text-gray-400 text-sm mb-4 md:mb-6 line-clamp-2 relative z-10">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 relative z-10">
                  {project.tech.slice(0, 3).map(t => (
                    <span key={t} className="text-[10px] py-1 px-2 rounded-md bg-white/5 border border-white/10 text-gray-400 uppercase font-mono">{t}</span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="text-[10px] py-1 px-2 rounded-md bg-white/5 border border-white/10 text-gray-500">+{project.tech.length - 3}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-zinc-950/95 border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="relative p-6 md:p-8 border-b border-white/10">
                <button 
                  onClick={() => setSelectedProject(null)} 
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-zinc-400" />
                </button>
                
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${selectedProject.color}20` }}
                >
                  <Rocket className="w-6 h-6" style={{ color: selectedProject.color }} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 pr-8">{selectedProject.name}</h3>
              </div>

              <div className="p-6 md:p-8">
                <p className="text-gray-400 text-base leading-relaxed mb-6">{selectedProject.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedProject.tech.map(t => (
                    <span key={t} className="text-xs px-3 py-1 bg-white/5 rounded-full text-zinc-400 border border-white/10">{t}</span>
                  ))}
                </div>
                
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-500 transition-all uppercase tracking-wider text-sm"
                >
                  Launch <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
