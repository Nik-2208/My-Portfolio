"use client";

import { useEffect, useState, useCallback } from "react";
import { toast, Toaster } from "react-hot-toast";

export default function EasterEggs() {
  const [keys, setKeys] = useState<string[]>([]);
  const [activeEffect, setActiveEffect] = useState<string | null>(null);
  void keys;

  const activateEffect = useCallback((effect: string, message: string) => {
    setActiveEffect(effect);
    
    // Defer toast to avoid render violation
    requestAnimationFrame(() => {
      toast(message, {
        icon: '🚀',
        style: {
          borderRadius: '10px',
          background: '#111',
          color: '#fff',
          border: '1px solid rgba(0,255,255,0.3)',
        },
      });
    });
    
    setTimeout(() => {
      setActiveEffect(null);
    }, 3000);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      const key = e.key.toLowerCase();
      
      setKeys((prev) => {
        const newKeys = [...prev, key].slice(-3);
        
        if (newKeys.join("") === "nik") {
          activateEffect("neural-storm", "Neural Storm Activated: Welcome Creator.");
          return [];
        }
        
        if (key === "a") {
          activateEffect("ai-scan", "AI Scan Mode Engaged: Highlighting ML Nodes.");
        }
        
        if (key === "c") {
          activateEffect("cyber-sec", "Cybersecurity Protocol: Terminal Overridden.");
        }
        
        return newKeys;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activateEffect]);

  return (
    <>
      {activeEffect === "neural-storm" && (
        <div className="fixed inset-0 z-50 pointer-events-none bg-[radial-gradient(circle,rgba(0,255,255,0.2),transparent)] animate-pulse mix-blend-screen" />
      )}
      {activeEffect === "ai-scan" && (
        <div className="fixed inset-0 z-50 pointer-events-none bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:100%_4px] animate-[scan_2s_linear_infinite]" />
      )}
      {activeEffect === "cyber-sec" && (
        <div className="fixed inset-0 z-50 pointer-events-none bg-green-900/10 backdrop-contrast-150 backdrop-saturate-200 border-8 border-green-500/50 mix-blend-overlay" />
      )}
      <Toaster position="bottom-right" />
    </>
  );
}
