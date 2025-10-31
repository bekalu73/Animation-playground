"use client";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function StackedSections() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);

  const setSectionRef = (el: HTMLElement | null, i: number) => {
    if (el) sectionsRef.current[i] = el;
  };

  useLayoutEffect(() => {
    const sections = sectionsRef.current;
    if (!sections.length) return;

    // Cleanup previous triggers
    ScrollTrigger.getAll().forEach((st) => st.kill());

    // Stack all sections on top of each other
    sections.forEach((section) => {
      section.style.position = "absolute";
      section.style.top = "0";
      section.style.left = "0";
      section.style.width = "100%";
      section.style.height = "80vh";
    });

    // Timeline to animate each section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${sections.length * window.innerHeight}`,
        scrub: true,
        pin: true,
      },
    });

    sections.forEach((section, i) => {
      if (i === 0) return; // first section already visible
      tl.fromTo(
        section,
        { yPercent: 100 },
        { yPercent: 0, duration: 1, ease: "none" },
        i - 0.5 // overlap slightly for smooth scroll
      );
    });
  }, []);

  const titles = ["Home", "About", "Services", "Contact"];

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center"
    >
      {titles.map((title, i) => (
        <section
          key={i}
          ref={(el: HTMLElement | null) => setSectionRef(el, i)}
          className="flex items-center justify-center text-6xl font-bold text-white w-48 h-48"
          style={{
            backgroundColor: `hsl(${i * 80}, 70%, 50%)`,
          }}
        >
          {title} Section
        </section>
      ))}
    </div>
  );
}
