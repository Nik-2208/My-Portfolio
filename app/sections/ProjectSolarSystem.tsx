"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Cpu, Sparkles, X, Rocket, Zap, Swords, Brain, Shield, Layers, Trophy, Compass, Activity } from "lucide-react";
import Modal from "../components/Modal";

interface FlagshipProject {
  id: string;
  number: string;
  name: string;
  tagline: string;
  concept: string;
  description: string;
  highlights: string[];
  pipeline?: string[];
  scientificPositioning?: string;
  gameSystems?: string[];
  engineeringHighlights?: string[];
  tech: string[];
  link?: string;
  github?: string;
  liveDemo: string;
  color: string;
  glowColor: string;
  badge?: string;
}

interface ArchiveProject {
  id: string;
  name: string;
  description: string;
  link: string;
  tech: string[];
  color: string;
  glowColor: string;
}

const flagshipProjects: FlagshipProject[] = [
  {
    id: "antwire",
    number: "01",
    name: "ANTWIRE",
    tagline: "Extensible Computational Ant-Brain & Superorganism Platform",
    concept: "An extensible computational ant-brain and superorganism platform combining spiking neural models, reinforcement learning, pheromone-based communication and emergent colony behavior.",
    description: "AntWire is an extensible computational ant-brain, individual-ant organism, and colony/superorganism simulation platform combining computational neurobiology with multi-agent reinforcement learning. It provides isolated per-ant neural runtimes, Gym-style task environments, 6-channel pheromone stigmergic communication, emergent colony division of labor, reinforcement learning, and real-time neural inspection.",
    highlights: [
      "🧠 Canonical ~55K-neuron computational ant-brain topology",
      "⚡ Isolated per-ant runtime with private synapses, activation states, plasticity & memory",
      "🎯 Gym-style observe → act → reward → next observation → done environment API",
      "👁️ 14-dimensional sensory observation system & motor steering/grasping",
      "🧬 6-channel pheromone diffusion/decay mechanics & stigmergic recruitment",
      "🐜 Emergent colony division of labor (foraging, excavation, nursing, patrolling, living bridges)",
      "🔋 Energy and physiological accounting with metabolic constraints",
      "🔍 Real-time causal tracing: 'Why did the ant do that?' with 3D neuropil atlas & spike raster",
      "⚙️ Offline .antbrain model execution & custom training workflows",
      "✅ 100% passing test suite • MIT licensed open-source research platform",
    ],
    pipeline: [
      "Ant Brain Model",
      "Isolated Ant Runtime",
      "Sensory/Motor System",
      "Task Environment",
      "Learning",
      "Pheromones",
      "Colony Behavior",
      "World",
      "Neural Inspection",
    ],
    scientificPositioning: "Computationally modelled / biologically inspired research platform. Distinctly separates biological facts from computational abstractions and synthetic reinforcement learning benchmarks.",
    engineeringHighlights: [
      "TypeScript & React",
      "Node.js Core Runtime",
      "LIF / Spiking Neural Networks",
      "Gym-style MDP Environments",
      "Pheromone Field Diffusion",
      "Multi-Agent Reinforcement Learning",
      "3D Neuropil Atlas & Raster Plots",
      "Offline .antbrain Packaging",
    ],
    tech: [
      "TypeScript",
      "React",
      "Node.js",
      "Computational Neuroscience",
      "LIF Spiking Neurons",
      "Multi-Agent RL",
      "Pheromone Simulation",
      "Gym MDPs",
    ],
    github: "https://github.com/Nik-2208/AntWire",
    liveDemo: "https://antwire.vercel.app",
    color: "#00f0ff",
    glowColor: "rgba(0, 240, 255, 0.35)",
    badge: "01 — COMPUTATIONAL NEUROBIOLOGY",
  },
  {
    id: "ant-brain-keyboard",
    number: "02",
    name: "ANT BRAIN KEYBOARD",
    tagline: "Biologically Inspired Multi-Agent Learning",
    concept: "A biologically informed ant-brain simulation that trains individual ants and colonies to operate a keyboard. Combines LIF spiking neurons, sensory processing, spatial memory, reward-based learning, pheromone communication, and cooperative multi-agent behavior.",
    description: "ANT BRAIN KEYBOARD is a biologically informed ant-brain simulation that takes a real-life-inspired ant brain model as its computational substrate, trains individual ants or colonies to operate a keyboard, and demonstrates how biologically inspired neural architectures can learn and coordinate control tasks. Each simulated ant utilizes an Ant-6DCT model with sensory channels, LIF spiking neurons, anatomical neuropil circuits, and reward-modulated plasticity to coordinate through pheromones and execute keyboard motor actions (FORWARD, TURN_LEFT, TURN_RIGHT, INTERACT/PRESS).",
    highlights: [
      "🧠 Ant-6DCT biologically informed brain model",
      "⚡ 128 LIF neurons + 256 directed synapses",
      "👁️ 14 sensory channels + 12 neuropil-inspired regions",
      "🐜 Individual & collaborative ant learning (FORWARD, TURN_LEFT, TURN_RIGHT, INTERACT)",
      "🧪 Reward-modulated synaptic plasticity & reinforcement learning",
      "🧭 Spatial path memory + navigation dynamics",
      "🧬 Pheromone-based colony communication & recruitment",
      "⌨️ Keyboard interaction as the learned control task",
      "⚙️ Compact ~38 KiB reproducible model package (.antbrain)",
      "✅ Structurally audited / neural integrity validated",
    ],
    engineeringHighlights: [
      "Ant-6DCT Architecture",
      "LIF Spiking Neurons",
      "Neuropil Circuits",
      "Reward-Modulated Plasticity",
      "Pheromone Communication Grid",
      ".antbrain Binary Package (~38 KiB)",
      "Multi-Agent Coordination",
      "Python / PyTorch / NumPy",
    ],
    tech: ["Python", "Spiking Neural Networks (LIF)", "Multi-Agent RL", "Biologically Inspired AI", "Neuropil Circuits", "Pheromone Dynamics"],
    github: "https://github.com/Nik-2208",
    liveDemo: "https://ant-brain-keyboard.vercel.app",
    color: "#a855f7",
    glowColor: "rgba(168, 85, 247, 0.35)",
    badge: "02 — MULTI-AGENT NEURAL SIMULATION",
  },
  {
    id: "ascendra",
    number: "03",
    name: "ASCENDRA",
    tagline: "Life, turned into an RPG.",
    concept: "A web-based Life RPG that transforms real-world self-improvement into RPG character progression. Real activities like studying, coding, fitness, focus, habits, meditation, brain training, productivity and goal completion contribute to an evolving RPG hero.",
    description: "ASCENDRA bridges the gap between daily self-discipline and epic role-playing progression. Real-world accomplishments are converted into experience points, skill mastery, quest completions, and boss victories across dynamic realms. Engineered with a database-authoritative state machine, event-driven gameplay architecture, and a modern full-stack web stack.",
    highlights: [
      "Real-Life → Game Progression: Effort converts into tangible character attributes",
      "XP & Level Progression Engine with dynamic difficulty scaling",
      "Skills & Hero Attributes (Intelligence, Strength, Focus, Creativity)",
      "Quests & Boss Battles: High-stakes productivity encounters",
      "World & Realms: Village progression unlocked through daily discipline",
      "Brain Lab: Cognitive drills, memory workouts, and focus sprints",
      "Streaks & Resilience System with multi-day momentum multipliers",
      "Inventory, Economy & Relics: Earned gear and consumable buffs",
      "Chronicles: Automatic life timeline and achievement journaling",
      "Ascension / Prestige: High-tier transcendent character evolution",
    ],
    gameSystems: [
      "Centralized XP & Level Engine",
      "Skill Tree & Attribute Scaling",
      "Quest Engine & Boss Encounters",
      "Dynamic World & Realm Progression",
      "Brain Lab & Cognitive Sprints",
      "Streaks, Multipliers & Resilience",
      "Campaigns & Milestone Arcs",
      "Inventory & Virtual Economy",
      "Chronicles & Life Analytics",
      "Ascension / Prestige Mechanics",
    ],
    engineeringHighlights: [
      "Next.js 16 (App Router)",
      "React 19 & Server Components",
      "TypeScript (Strict Type Safety)",
      "Prisma ORM",
      "PostgreSQL (Relational Integrity)",
      "Auth.js (Session Security)",
      "Server Actions",
      "Event-Driven Gameplay Engine",
      "Database-Authoritative State",
    ],
    tech: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL", "Auth.js", "Server Actions", "TailwindCSS"],
    github: "https://github.com/Nik-2208",
    liveDemo: "https://ascendra-game.vercel.app",
    color: "#ec4899",
    glowColor: "rgba(236, 72, 153, 0.4)",
    badge: "03 — MAJOR FLAGSHIP",
  },
];

const archiveProjects: ArchiveProject[] = [
  { id: "p1", name: "SmartHire AI", description: "AI-powered hiring assistant for resume parsing, candidate scoring, and automated screening.", link: "https://hire-smart-ai.streamlit.app/", tech: ["Python", "NLP", "Machine Learning", "Streamlit"], color: "#00ffff", glowColor: "rgba(0, 255, 255, 0.3)" },
  { id: "p2", name: "NetSec AI", description: "ML-powered Network Intrusion Detection System classifying malicious packet anomalies.", link: "https://netsec-ai.streamlit.app/", tech: ["Python", "Cybersecurity", "ML", "Wireshark"], color: "#00ff66", glowColor: "rgba(0, 255, 102, 0.3)" },
  { id: "p3", name: "Personalized Learning Dashboard", description: "Predictive student performance analytics with gamified recommendation metrics.", link: "https://personalized-learner.streamlit.app/", tech: ["Python", "Streamlit", "ML", "Scikit-Learn"], color: "#ff6b6b", glowColor: "rgba(255, 107, 107, 0.3)" },
  { id: "p4", name: "AI Event Planner", description: "Intelligent NLP system for automated event scheduling, budget allocation, and agenda generation.", link: "https://aieventplanner.streamlit.app/", tech: ["Python", "NLP", "Streamlit"], color: "#4ecdc4", glowColor: "rgba(78, 205, 196, 0.3)" },
  { id: "p5", name: "Smart AQI Predictor", description: "Forecasts Air Quality Index using environmental telemetry data and regression modeling.", link: "https://smart-aqi-predictor.streamlit.app/", tech: ["Python", "ML", "Pandas", "Streamlit"], color: "#00ccff", glowColor: "rgba(0, 204, 255, 0.3)" },
  { id: "p6", name: "Recipe Predictor", description: "Gourmet recipe recommendation engine based on kitchen ingredients using TF-IDF.", link: "https://recipro.streamlit.app/", tech: ["Python", "NLP", "Streamlit", "TF-IDF"], color: "#ff9966", glowColor: "rgba(255, 153, 102, 0.3)" },
  { id: "p7", name: "Digit Identifier", description: "Real-time handwritten digit recognition canvas powered by neural networks.", link: "https://digit-identifier.streamlit.app/", tech: ["Python", "OpenCV", "Neural Nets"], color: "#ffeaa7", glowColor: "rgba(255, 234, 167, 0.3)" },
  { id: "p8", name: "Creativity Predictor", description: "Evaluates creative writing and semantic sentiment through NLP text analytics.", link: "https://creativity-predictor.streamlit.app/", tech: ["Python", "NLP", "ML"], color: "#96ceb4", glowColor: "rgba(150, 206, 180, 0.3)" },
  { id: "p9", name: "AI Energy Predictor", description: "Forecasts household energy consumption from weather feeds and historical load patterns.", link: "https://ai-energy-predictor.streamlit.app/", tech: ["Python", "ML", "Regression"], color: "#ffcc00", glowColor: "rgba(255, 204, 0, 0.3)" },
  { id: "p10", name: "Sleep Insight Engine", description: "Analyzes sleep patterns to deliver personalized circadian wellness insights.", link: "https://sleep-insight-engine.streamlit.app/", tech: ["Python", "Data Science", "Matplotlib"], color: "#cc99ff", glowColor: "rgba(204, 153, 255, 0.3)" },
];

export default function ProjectSolarSystem() {
  const [selectedFlagship, setSelectedFlagship] = useState<FlagshipProject | null>(null);
  const [selectedArchive, setSelectedArchive] = useState<ArchiveProject | null>(null);

  return (
    <section id="projects" className="relative py-24 md:py-36 bg-black z-20 overflow-hidden" aria-label="Major Flagship Projects and Archive">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 right-1/4 w-[650px] h-[650px] bg-cyan-500/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[650px] h-[650px] bg-purple-500/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-md mb-4 text-xs font-mono text-cyan-400 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Flagship Sequence & Engineering Archives</span>
          </div>

          <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tighter uppercase">
            Major <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500">Projects</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-sm md:text-base max-w-2xl mx-auto font-mono leading-relaxed">
            An intentional sequence of increasingly ambitious technology — from distributed P2P protocols and neural input engines to life-gamification RPG platforms.
          </p>
        </motion.div>

        {/* 1. THREE MAJOR FLAGSHIP PROJECTS (01 ANTWIRE, 02 ANT BRAIN, 03 ASCENDRA) */}
        <div className="space-y-10 md:space-y-12 mb-24">
          {flagshipProjects.map((project, index) => {
            const isAscendra = project.id === "ascendra";

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedFlagship(project)}
                className={`cursor-pointer rounded-3xl p-8 md:p-12 border transition-all duration-500 relative overflow-hidden backdrop-blur-xl group ${
                  isAscendra
                    ? "border-pink-500/40 bg-gradient-to-b from-zinc-950/95 via-pink-950/20 to-black hover:border-pink-400/80 shadow-[0_0_50px_rgba(236,72,153,0.15)]"
                    : "border-white/10 bg-gradient-to-b from-zinc-950/90 via-zinc-900/60 to-black hover:border-cyan-400/60 shadow-[0_0_40px_rgba(0,255,255,0.08)]"
                }`}
              >
                {/* Subtle top indicator bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{
                    background: `linear-gradient(to right, transparent, ${project.color}, transparent)`,
                  }}
                />

                <div className="grid lg:grid-cols-12 gap-8 items-start relative z-10">
                  {/* Left Column: Number, Title, Concept */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-3xl md:text-4xl font-mono font-black tracking-tighter" style={{ color: project.color }}>
                        {project.number}
                      </span>
                      <span
                        className="px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-widest border"
                        style={{
                          color: project.color,
                          backgroundColor: `${project.color}15`,
                          borderColor: `${project.color}35`,
                        }}
                      >
                        {project.badge}
                      </span>
                      {isAscendra && (
                        <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-widest bg-amber-500/15 border border-amber-400/40 text-amber-300 animate-pulse">
                          ⚔️ LIFE RPG PLATFORM
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight group-hover:text-cyan-300 transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-lg md:text-xl font-mono italic mt-1" style={{ color: project.color }}>
                        &ldquo;{project.tagline}&rdquo;
                      </p>
                    </div>

                    <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-sans">
                      {project.concept}
                    </p>

                    {/* Highlights chips */}
                    <div className="pt-2">
                      <h4 className="text-[11px] font-mono uppercase text-zinc-500 tracking-widest mb-2 font-bold">
                        Key Architecture Highlights
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {project.highlights.slice(0, 4).map((h, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-zinc-400 font-mono">
                            <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: project.color }} />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Tech stack & Action Panel */}
                  <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6 lg:border-l lg:border-white/10 lg:pl-8">
                    <div>
                      <h4 className="text-xs font-mono uppercase text-zinc-400 tracking-widest mb-3 font-bold flex items-center gap-2">
                        <Layers className="w-4 h-4" style={{ color: project.color }} />
                        <span>Technology Stack</span>
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="px-3 py-1.5 rounded-xl text-xs font-mono bg-white/5 border border-white/10 text-zinc-200"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
                      <div className="flex items-center gap-3">
                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="px-4 py-2 rounded-xl bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 font-bold font-mono text-xs uppercase tracking-wider hover:bg-cyan-500/30 hover:brightness-110 transition-all shadow-[0_0_15px_rgba(0,255,255,0.15)] flex items-center gap-2 z-20 group/btn"
                          aria-label={`Open live demo of ${project.name} in a new tab`}
                        >
                          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                          <span>LIVE DEMO</span>
                          <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                        </a>
                      </div>

                      <span className="font-bold inline-flex items-center gap-1.5 transition-transform group-hover:translate-x-1" style={{ color: project.color }}>
                        Explore Architecture Dossier &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 2. SPATIAL AI & ML ARCHIVES */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 backdrop-blur-md mb-3 text-xs font-mono text-purple-400 uppercase tracking-widest">
            <Cpu className="w-3.5 h-3.5" />
            <span>Spatial Machine Learning & NLP Deployments</span>
          </div>
          <h3 className="text-2xl md:text-4xl font-bold text-white uppercase tracking-tight">
            Spatial AI Module <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">Archives</span>
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start">
          {archiveProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.04 }}
              whileHover={{ y: -6, scale: 1.02 }}
              onClick={() => setSelectedArchive(project)}
              className="cursor-pointer p-6 md:p-8 rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-950/90 via-zinc-900/50 to-black backdrop-blur-xl transition-all duration-300 group hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(0,255,255,0.12)] relative overflow-hidden"
            >
              <div className="flex items-center justify-between gap-4 mb-5">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10 shadow-lg group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: `${project.color}20`, borderColor: `${project.color}40` }}
                  >
                    <Rocket className="w-6 h-6" style={{ color: project.color }} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">
                      AI Module {index + 1}
                    </span>
                    <h4 className="text-lg font-bold text-white uppercase tracking-tight group-hover:text-cyan-300 transition-colors">
                      {project.name}
                    </h4>
                  </div>
                </div>
              </div>

              <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-sans line-clamp-2">
                {project.description}
              </p>

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

      {/* 1. Flagship Project Modal */}
      <Modal
        isOpen={!!selectedFlagship}
        onClose={() => setSelectedFlagship(null)}
        maxWidth="max-w-3xl"
        ariaLabel="Major Flagship Project Dossier"
      >
        {selectedFlagship && (
          <div className="flex flex-col">
            <div
              className="relative p-6 md:p-8 border-b border-white/10 flex items-start justify-between"
              style={{ background: `linear-gradient(to bottom, ${selectedFlagship.color}20, transparent)` }}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest px-3 py-0.5 rounded-full border" style={{ color: selectedFlagship.color, borderColor: `${selectedFlagship.color}40`, backgroundColor: `${selectedFlagship.color}15` }}>
                    {selectedFlagship.badge}
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
                  {selectedFlagship.name}
                </h3>
                <p className="text-base font-mono italic" style={{ color: selectedFlagship.color }}>
                  &ldquo;{selectedFlagship.tagline}&rdquo;
                </p>
              </div>

              <button
                onClick={() => setSelectedFlagship(null)}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-zinc-400 hover:text-white flex-shrink-0"
                aria-label="Close project dossier"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 md:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              <div>
                <h4 className="text-xs font-mono uppercase text-zinc-500 tracking-widest mb-2 font-bold">
                  System Architecture Overview
                </h4>
                <p className="text-zinc-200 text-sm md:text-base leading-relaxed font-sans">
                  {selectedFlagship.description}
                </p>
              </div>

              {selectedFlagship.gameSystems && (
                <div>
                  <h4 className="text-xs font-mono uppercase text-zinc-500 tracking-widest mb-3 font-bold flex items-center gap-1.5">
                    <Swords className="w-4 h-4 text-pink-400" />
                    <span>RPG Game Systems & Dynamics</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedFlagship.gameSystems.map((sys, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5 text-xs font-mono text-zinc-200">
                        <span className="w-2 h-2 rounded-full bg-pink-400 flex-shrink-0" />
                        <span>{sys}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-xs font-mono uppercase text-zinc-500 tracking-widest mb-3 font-bold flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span>Engineering & Technical Stack</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedFlagship.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-mono bg-white/5 border border-white/10 text-zinc-200"
                    >
                      ⚡ {t}
                    </span>
                  ))}
                </div>
              </div>

              {selectedFlagship.pipeline && (
                <div>
                  <h4 className="text-xs font-mono uppercase text-zinc-500 tracking-widest mb-3 font-bold flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-cyan-400" />
                    <span>Computational Architecture Pipeline</span>
                  </h4>
                  <div className="flex flex-wrap items-center gap-1.5 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono">
                    {selectedFlagship.pipeline.map((step, idx) => (
                      <span key={idx} className="flex items-center gap-1.5">
                        <span className="px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 font-bold">
                          {step}
                        </span>
                        {idx < selectedFlagship.pipeline!.length - 1 && (
                          <span className="text-zinc-600 font-bold">→</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedFlagship.scientificPositioning && (
                <div className="p-4 rounded-2xl bg-blue-950/20 border border-blue-500/30 text-xs font-mono flex items-start gap-3">
                  <Shield className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-bold uppercase tracking-wider text-cyan-300 block">Scientific & Empirical Positioning</span>
                    <p className="text-zinc-300 font-sans leading-relaxed">{selectedFlagship.scientificPositioning}</p>
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-xs font-mono uppercase text-zinc-500 tracking-widest mb-3 font-bold">
                  Core Architectural Capabilities
                </h4>
                <div className="space-y-2">
                  {selectedFlagship.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-zinc-300">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: selectedFlagship.color }} />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={selectedFlagship.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-2xl bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 font-bold font-mono text-xs uppercase tracking-wider hover:bg-cyan-500/30 hover:brightness-110 transition-all shadow-[0_0_20px_rgba(0,255,255,0.25)] flex items-center gap-2"
                    aria-label={`Open live demo of ${selectedFlagship.name} in a new tab`}
                  >
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span>LIVE DEMO</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <a
                    href={selectedFlagship.github || "https://github.com/Nik-2208"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 text-white font-bold font-mono text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-[0_0_25px_rgba(0,255,255,0.3)] flex items-center gap-2"
                    aria-label={`Open GitHub repository for ${selectedFlagship.name} in a new tab`}
                  >
                    <span>View GitHub Repository</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <span className="text-zinc-500 text-xs font-mono">
                  {selectedFlagship.name} • {selectedFlagship.badge}
                </span>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* 2. Archive Module Modal */}
      <Modal
        isOpen={!!selectedArchive}
        onClose={() => setSelectedArchive(null)}
        maxWidth="max-w-2xl"
        ariaLabel="Archive Module Details"
      >
        {selectedArchive && (
          <div className="flex flex-col">
            <div
              className="relative p-6 md:p-8 border-b border-white/10 flex items-center justify-between"
              style={{ background: `linear-gradient(to bottom, ${selectedArchive.color}15, transparent)` }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center bg-zinc-900 border border-white/10 shadow-lg"
                  style={{ backgroundColor: `${selectedArchive.color}25` }}
                >
                  <Rocket className="w-7 h-7" style={{ color: selectedArchive.color }} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white uppercase tracking-tight">
                    {selectedArchive.name}
                  </h3>
                  <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider">
                    Spatial AI Module
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedArchive(null)}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-zinc-400 hover:text-white"
                aria-label="Close project module"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 md:p-8 space-y-6">
              <div>
                <h4 className="text-xs font-mono uppercase text-zinc-500 tracking-widest mb-2 font-bold">
                  Overview & Purpose
                </h4>
                <p className="text-zinc-300 text-base leading-relaxed font-sans">
                  {selectedArchive.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase text-zinc-500 tracking-widest mb-3 font-bold">
                  Technologies & Frameworks
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedArchive.tech.map((t) => (
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
                  href={selectedArchive.link}
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
