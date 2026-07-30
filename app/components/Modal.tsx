"use client";

import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { useCentralMotion } from "../hooks/useCentralMotion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
  ariaLabel?: string;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  maxWidth = "max-w-2xl",
  ariaLabel = "Details Dialog",
}: ModalProps) {
  const { lenis } = useCentralMotion();
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    if (typeof document !== "undefined") {
      previousFocusRef.current = document.activeElement as HTMLElement;
    }

    document.body.style.overflow = "hidden";
    if (lenis) {
      try {
        lenis.stop();
      } catch (e) {
        console.warn("[Modal] Lenis stop error:", e);
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";

      if (lenis) {
        try {
          lenis.start();
        } catch (e) {
          console.warn("[Modal] Lenis start error:", e);
        }
      }

      if (previousFocusRef.current && typeof previousFocusRef.current.focus === "function") {
        previousFocusRef.current.focus();
      }
    };
  }, [isOpen, lenis, onClose]);

  if (typeof window === "undefined" || !isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full ${maxWidth} max-h-[85vh] bg-zinc-950 border border-white/15 rounded-3xl shadow-2xl flex flex-col overflow-hidden z-10`}
      >
        <div className="flex-1 overflow-y-auto">{children}</div>
      </motion.div>
    </div>,
    document.body
  );
}
