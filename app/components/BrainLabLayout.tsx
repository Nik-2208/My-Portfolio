"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function BrainLabLayout({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Simple background fade on scroll
    gsap.fromTo(containerRef.current,
      { backgroundColor: "rgba(0,0,0,1)" },
      {
        backgroundColor: "rgba(10,10,10,1)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "top top",
          scrub: true,
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-black z-20">
      {/* Light background texture instead of heavy blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.05)_0%,transparent_70%)]" />
      </div>

      {/* Content rendered on top */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}
