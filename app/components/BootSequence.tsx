"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_SEQUENCES = [
  "Initializing Neural Kernel...",
  "Scanning Memory Nodes...",
  "Authenticating Identity: NIKHILESH CHAVDA",
  "Connecting to Global Data Stream...",
  "Optimizing UI Rendering Engine...",
  "Session Ready."
];

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      if (current < BOOT_SEQUENCES.length) {
        setLogs(prev => [...prev, BOOT_SEQUENCES[current]]);
        setProgress(((current + 1) / BOOT_SEQUENCES.length) * 100);
        current++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 800);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center p-6 font-mono"
    >
      <div className="w-full max-w-md">
        <div className="flex justify-between mb-2 text-cyan-500 text-xs">
          <span>SYSTEM_BOOT_SEQUENCE</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-[2px] bg-white/10 mb-8 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-cyan-500 shadow-[0_0_10px_#00ffff]"
          />
        </div>
        <div className="space-y-2">
          <AnimatePresence>
            {logs.map((log, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-cyan-100/60 text-xs"
              >
                <span className="text-cyan-500 mr-2">{">"}</span>
                {log}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
