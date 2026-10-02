"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Linkedin, Github, Phone, Send, MessageSquare, Globe, Loader2, CheckCircle2, Shield, Cpu, RefreshCw, AlertCircle, FileText, Download, ArrowUpRight } from "lucide-react";

const RESUME_URL = "https://drive.google.com/file/d/1bMLgf8vuixWyW-fTRGxj06Ev_FtU1KjF/view?usp=sharing";

const contactLinks = [
  {
    name: "Email",
    label: "Direct Email",
    value: "nikhileshchavdawork@gmail.com",
    icon: Mail,
    color: "#00ffff",
    href: "mailto:nikhileshchavdawork@gmail.com",
    badge: "Send Transmission",
  },
  {
    name: "LinkedIn",
    label: "Professional Profile",
    value: "Nikhilesh Chavda",
    icon: Linkedin,
    color: "#38bdf8",
    href: "https://www.linkedin.com/in/nikhilesh-chavda-2b779533a/",
    badge: "Connect on LinkedIn",
  },
  {
    name: "GitHub",
    label: "Code Repositories",
    value: "github.com/Nik-2208",
    icon: Github,
    color: "#ffffff",
    href: "https://github.com/Nik-2208",
    badge: "Explore Code",
  },
  {
    name: "Phone",
    label: "Voice / WhatsApp",
    value: "+91 8928027482",
    icon: Phone,
    color: "#00ff66",
    href: "tel:+918928027482",
    badge: "Call Directly",
  },
];

const languages = [
  { name: "Gujarati", level: "Mother Tongue", color: "#ff6600" },
  { name: "English", level: "Fluent", color: "#00ffff" },
  { name: "Hindi", level: "Fluent", color: "#00ff66" },
  { name: "Marathi", level: "Conversational", color: "#9933ff" },
];

export default function ContactPortal() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setStatus("error");
      setErrorMessage("Please fill in all required transmission fields.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        setFormState({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 6000);
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Unable to send transmission. Please try again.");
      }
    } catch (error) {
      console.error("[Contact Form] Transmission error:", error);
      setStatus("error");
      setErrorMessage("Network error encountered. Please verify connectivity and try again.");
    }
  };

  return (
    <section id="contact-portal" className="relative py-24 md:py-36 bg-black z-20 overflow-hidden" aria-label="Contact and Communications Portal">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center justify-center gap-2.5 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-md mb-4">
            <MessageSquare className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 text-xs font-mono tracking-[0.25em] uppercase font-bold">Communicate & Connect</span>
          </div>

          <h2 className="text-4xl md:text-7xl font-bold text-white uppercase tracking-tighter">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">Portal</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-sm md:text-base max-w-xl mx-auto font-mono">
            Initialize a direct neural link to communicate with Nik for engineering opportunities and collaboration.
          </p>
        </motion.div>

        {/* PRIMARY PROFILE ACTIONS BAR (Resume, GitHub, LinkedIn, Email) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="p-6 md:p-8 rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-zinc-950/95 via-cyan-950/20 to-black backdrop-blur-xl mb-12 shadow-[0_0_40px_rgba(0,255,255,0.08)]"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest font-bold block mb-1">
                Direct Candidate Credentials
              </span>
              <h3 className="text-2xl font-bold text-white uppercase tracking-tight">
                Engineering Dossier & Links
              </h3>
            </div>

            {/* Action Buttons Grid */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-initial px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_25px_rgba(0,255,255,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group"
                aria-label="Download Official Resume PDF"
              >
                <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                <span>DOWNLOAD RESUME</span>
              </a>

              <a
                href="https://github.com/Nik-2208"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-2xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-mono text-xs uppercase tracking-wider hover:border-cyan-400/60 transition-all duration-300 flex items-center gap-2"
                aria-label="Visit GitHub Profile"
              >
                <Github className="w-4 h-4 text-cyan-400" />
                <span>GitHub</span>
              </a>

              <a
                href="https://www.linkedin.com/in/nikhilesh-chavda-2b779533a/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-2xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-mono text-xs uppercase tracking-wider hover:border-blue-400/60 transition-all duration-300 flex items-center gap-2"
                aria-label="Visit LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4 text-blue-400" />
                <span>LinkedIn</span>
              </a>

              <a
                href="mailto:nikhileshchavdawork@gmail.com"
                className="px-5 py-3.5 rounded-2xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-mono text-xs uppercase tracking-wider hover:border-purple-400/60 transition-all duration-300 flex items-center gap-2"
                aria-label="Send Email to Nik"
              >
                <Mail className="w-4 h-4 text-purple-400" />
                <span>Email</span>
              </a>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 md:gap-16">
          {/* Direct Link Protocols Column */}
          <div className="space-y-4 md:space-y-5">
            <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tight mb-4 flex items-center gap-2">
              <span>Direct Link Protocols</span>
            </h3>

            {contactLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                target={link.name !== "Email" && link.name !== "Phone" ? "_blank" : undefined}
                rel={link.name !== "Email" && link.name !== "Phone" ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ scale: 1.01, x: 4 }}
                className="group flex items-center gap-4 md:gap-6 p-4 md:p-5 rounded-2xl border border-white/10 bg-gradient-to-r from-zinc-950/90 to-zinc-900/40 hover:border-cyan-500/50 hover:bg-cyan-950/20 transition-all duration-300 relative overflow-hidden"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 relative z-10 transition-all duration-300 border border-white/10"
                  style={{
                    backgroundColor: `${link.color}20`,
                    borderColor: `${link.color}40`,
                    boxShadow: `0 0 20px ${link.color}25`,
                  }}
                >
                  <link.icon className="w-6 h-6" style={{ color: link.color }} />
                </div>

                <div className="flex-1 min-w-0 relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-500 uppercase font-mono tracking-widest">{link.label}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-cyan-300 border border-white/10">
                      {link.badge}
                    </span>
                  </div>
                  <div className="text-white font-medium group-hover:text-cyan-400 transition-colors truncate font-mono text-sm mt-0.5">
                    {link.value}
                  </div>
                </div>

                <ArrowUpRight className="w-5 h-5 text-zinc-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0 relative z-10" />
              </motion.a>
            ))}

            {/* Communication Nodes / Languages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-5 md:p-6 rounded-2xl border border-white/10 bg-white/5 relative overflow-hidden mt-6"
            >
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <Globe className="w-5 h-5 text-cyan-400" />
                <span className="text-white font-medium tracking-widest uppercase text-xs font-mono">
                  Natural Language Protocols
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 relative z-10">
                {languages.map((lang) => (
                  <div key={lang.name} className="flex items-center gap-2.5 p-3 rounded-xl bg-black/40 border border-white/5">
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: lang.color, boxShadow: `0 0 8px ${lang.color}` }}
                    />
                    <div className="min-w-0 font-mono">
                      <div className="text-white text-xs font-bold truncate">{lang.name}</div>
                      <div className="text-zinc-500 text-[10px] uppercase tracking-tighter">{lang.level}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Interactive Console Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-purple-500/30 rounded-3xl blur opacity-20" />

            <div className="relative p-6 md:p-8 lg:p-10 rounded-3xl border border-cyan-500/30 overflow-hidden bg-black/70 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8 border-b border-white/10 pb-4 md:pb-6">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <div className="h-4 w-px bg-white/20 mx-1" />
                <h3 className="text-xs md:text-sm font-mono text-cyan-400 tracking-[0.2em] uppercase font-bold">
                  Message.Console.v2.0
                </h3>
              </div>

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center py-12 md:py-16 text-center"
                  >
                    <CheckCircle2 className="w-16 md:w-20 h-16 md:h-20 text-green-400 mb-4 md:mb-6" />
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 font-mono">Transmission Received</h3>
                    <p className="text-zinc-400 text-sm font-mono max-w-sm">
                      Thank you! Your payload has been safely delivered to Nik. Expect a response soon.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                    {status === "error" && errorMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                          <span>{errorMessage}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleSubmit()}
                          className="px-3 py-1 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-200 transition-colors flex items-center gap-1 uppercase tracking-wider font-bold"
                        >
                          <RefreshCw className="w-3 h-3" /> Retry
                        </button>
                      </motion.div>
                    )}

                    <div className="space-y-2">
                      <label className="text-[11px] text-cyan-400 uppercase tracking-[0.25em] font-mono font-bold flex items-center gap-2">
                        <Shield className="w-3.5 h-3.5" /> Subject_Identity
                      </label>
                      <input
                        type="text"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        disabled={status === "loading"}
                        className="w-full px-4 md:px-5 py-3 md:py-3.5 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl text-white placeholder-zinc-600 focus:border-cyan-400/80 focus:bg-white/10 focus:outline-none transition-all duration-300 font-mono text-sm disabled:opacity-50"
                        placeholder="ENTER_YOUR_NAME"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] text-cyan-400 uppercase tracking-[0.25em] font-mono font-bold flex items-center gap-2">
                        <Cpu className="w-3.5 h-3.5" /> Email_Address
                      </label>
                      <input
                        type="email"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        disabled={status === "loading"}
                        className="w-full px-4 md:px-5 py-3 md:py-3.5 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl text-white placeholder-zinc-600 focus:border-cyan-400/80 focus:bg-white/10 focus:outline-none transition-all duration-300 font-mono text-sm disabled:opacity-50"
                        placeholder="ENTER_YOUR_EMAIL"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] text-cyan-400 uppercase tracking-[0.25em] font-mono font-bold flex items-center gap-2">
                        <MessageSquare className="w-3.5 h-3.5" /> Data_Payload
                      </label>
                      <textarea
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        disabled={status === "loading"}
                        rows={4}
                        className="w-full px-4 md:px-5 py-3 md:py-3.5 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl text-white placeholder-zinc-600 focus:border-cyan-400/80 focus:bg-white/10 focus:outline-none transition-all duration-300 font-mono text-sm resize-none disabled:opacity-50"
                        placeholder="TRANSMIT_YOUR_MESSAGE_HERE..."
                        required
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={status === "loading"}
                      whileHover={status !== "loading" ? { scale: 1.01 } : undefined}
                      whileTap={status !== "loading" ? { scale: 0.99 } : undefined}
                      className="w-full py-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-mono font-bold rounded-xl md:rounded-2xl hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-[0.25em] text-xs md:text-sm shadow-[0_0_25px_rgba(0,255,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                          <span>Transmitting Payload...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Execute Transmission</span>
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-24 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 md:w-20 bg-white/10" />
            <Shield className="w-4 h-4 text-cyan-500" />
            <div className="h-px w-12 md:w-20 bg-white/10" />
          </div>
          <p className="text-zinc-500 text-[10px] md:text-xs font-mono uppercase tracking-[0.35em]">
            © 2026 <span className="text-cyan-400 font-bold">NIKHILESH_H_CHAVDA</span> • SPIT MUMBAI
          </p>
        </motion.div>
      </div>
    </section>
  );
}
