"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Linkedin, Github, Phone, Send, MessageSquare, Globe, Loader2, CheckCircle2, Shield, Cpu } from "lucide-react";
import { saveContactMessage, isFirebaseAvailable } from "../lib/firebase";

const contactLinks = [
  {
    name: "Email",
    value: "nikhileshchavdawork@gmail.com",
    icon: Mail,
    color: "#00ffff",
    href: "mailto:nikhileshchavdawork@gmail.com",
  },
  {
    name: "LinkedIn",
    value: "Nikhilesh Chavda",
    icon: Linkedin,
    color: "#0077b5",
    href: "https://www.linkedin.com/in/nikhilesh-chavda-2b779533a/",
  },
  {
    name: "GitHub",
    value: "@Nik-2208",
    icon: Github,
    color: "#ffffff",
    href: "https://github.com/Nik-2208",
  },
  {
    name: "Phone",
    value: "+91 8928027482",
    icon: Phone,
    color: "#00ff66",
    href: "tel:+918928027482",
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
  const firebaseReady = isFirebaseAvailable();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      if (!firebaseReady) {
        console.log('[Contact] Firebase unavailable - logged locally:', formState);
        setStatus("success");
      } else {
        const result = await saveContactMessage(formState);
        if (result) {
          setStatus("success");
        } else {
          throw new Error('Save failed');
        }
      }
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error('[Contact] Submit error:', error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section id="contact-portal" className="relative py-24 md:py-32 bg-black z-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <MessageSquare className="w-6 md:w-8 h-6 md:h-8 text-cyan-400" />
            <span className="text-cyan-400 text-xs md:text-sm tracking-[0.3em] uppercase"> Communicate </span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Contact Portal
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Initialize a direct neural link to communicate with Nik
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 md:gap-16">
          <div className="space-y-5 md:space-y-6">
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-6 md:mb-8">
              Direct Link Protocols
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
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.01, x: 5 }}
                className="group flex items-center gap-4 md:gap-6 p-4 md:p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-cyan-500/30 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div
                  className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center flex-shrink-0 relative z-10 transition-all duration-300"
                  style={{
                    backgroundColor: `${link.color}20`,
                    boxShadow: `0 0 20px ${link.color}30`,
                  }}
                >
                  <link.icon className="w-6 md:w-7 h-6 md:h-7" style={{ color: link.color }} />
                </div>

                <div className="flex-1 min-w-0 relative z-10">
                  <div className="text-xs text-gray-500 mb-0.5 uppercase tracking-widest">{link.name}</div>
                  <div className="text-white font-medium group-hover:text-cyan-400 transition-colors truncate">{link.value}</div>
                </div>

                <Send className="w-4 md:w-5 h-4 md:h-5 text-gray-600 group-hover:text-cyan-400 transition-all flex-shrink-0 relative z-10" />
              </motion.a>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="p-5 md:p-6 rounded-2xl border border-white/10 bg-white/5 relative overflow-hidden mt-6 md:mt-8"
            >
              <div className="absolute top-0 right-0 p-3 md:p-4 opacity-10">
                <Globe className="w-16 md:w-20 h-16 md:h-20 text-cyan-400" />
              </div>
              <div className="flex items-center gap-3 mb-4 md:mb-5 relative z-10">
                <Globe className="w-4 md:w-5 h-4 md:h-5 text-cyan-400" />
                <span className="text-white font-medium tracking-widest uppercase text-sm">Communication Nodes</span>
              </div>

              <div className="grid grid-cols-2 gap-3 md:gap-4 relative z-10">
                {languages.map((lang) => (
                  <div key={lang.name} className="flex items-center gap-2 md:gap-3 p-3 md:p-4 rounded-xl bg-white/5 border border-white/5">
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: lang.color, boxShadow: `0 0 8px ${lang.color}` }}
                    />
                    <div className="min-w-0">
                      <div className="text-white text-sm font-semibold truncate">{lang.name}</div>
                      <div className="text-gray-500 text-[10px] md:text-xs uppercase tracking-tighter">{lang.level}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-purple-500/30 rounded-3xl blur opacity-20" />
            
            <div className="relative p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl border border-cyan-500/20 overflow-hidden bg-black/40 backdrop-blur-xl">
              <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
                <div className="w-full h-1 bg-cyan-500/30 absolute top-0 left-0 animate-scan" />
              </div>

              <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8 border-b border-white/10 pb-4 md:pb-6">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                <div className="h-4 w-px bg-white/20 mx-1 md:mx-2" />
                <h3 className="text-xs md:text-sm font-mono text-cyan-400 tracking-[0.15em] md:tracking-[0.2em] uppercase">Message.Console.v1.0</h3>
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
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Transmission Received</h3>
                    <p className="text-gray-400">Message received. Nik will respond soon.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6 relative z-10">
                    <div className="space-y-2">
                      <label className="text-[10px] md:text-xs text-cyan-400 uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold flex items-center gap-2">
                        <Shield className="w-3 md:w-4 h-3 md:h-4" /> Subject_Identity
                      </label>
                      <input
                        type="text"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-4 md:px-6 py-3 md:py-4 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl text-white placeholder-white/20 focus:border-cyan-500/50 focus:bg-white/10 focus:outline-none transition-all duration-300 font-mono text-sm"
                        placeholder="ENTER_NAME"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] md:text-xs text-cyan-400 uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold flex items-center gap-2">
                        <Cpu className="w-3 md:w-4 h-3 md:h-4" /> Email_Address
                      </label>
                      <input
                        type="email"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-4 md:px-6 py-3 md:py-4 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl text-white placeholder-white/20 focus:border-cyan-500/50 focus:bg-white/10 focus:outline-none transition-all duration-300 font-mono text-sm"
                        placeholder="ENTER_EMAIL"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] md:text-xs text-cyan-400 uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold flex items-center gap-2">
                        <MessageSquare className="w-3 md:w-4 h-3 md:h-4" /> Data_Payload
                      </label>
                      <textarea
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        rows={4}
                        className="w-full px-4 md:px-6 py-3 md:py-4 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl text-white placeholder-white/20 focus:border-cyan-500/50 focus:bg-white/10 focus:outline-none transition-all duration-300 font-mono text-sm resize-none"
                        placeholder="ENTER_MESSAGE_BUFFER..."
                        required
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={status === "loading"}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="w-full py-3 md:py-4 bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 font-bold rounded-xl md:rounded-2xl hover:bg-cyan-500 hover:text-white transition-all duration-500 flex items-center justify-center gap-2 md:gap-3 uppercase tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-sm overflow-hidden relative"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="w-4 md:w-5 h-4 md:h-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 md:w-5 h-4 md:h-5" />
                          {firebaseReady ? 'Execute Send' : 'Log Locally'}
                        
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
          className="mt-16 md:mt-20 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 md:w-20 bg-white/10" />
            <Shield className="w-4 h-4 text-cyan-900" />
            <div className="h-px w-12 md:w-20 bg-white/10" />
          </div>
          <p className="text-gray-600 text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.5em]">
            © 2026 <span className="text-cyan-600">NIKHILESH_CHAVDA</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
