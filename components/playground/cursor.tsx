"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cursor = cursorRef.current;
      const container = containerRef.current;

      // Guard against null
      if (!cursor || !container) return;

      const moveCursor = (e: MouseEvent) => {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.2,
          ease: "power3.out",
        });
      };

      container.addEventListener("mousemove", moveCursor);

      return () => {
        container.removeEventListener("mousemove", moveCursor);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen bg-gray-900 overflow-hidden"
    >
      <div
        ref={cursorRef}
        className="absolute w-6 h-6 bg-white rounded-full pointer-events-none"
      />
      <h1 className="text-white text-3xl absolute top-20 left-20">
        Hover around me!
      </h1>
    </div>
  );
}
