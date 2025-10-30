"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function SingleLogoHover() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      if (!container) return;

      const logo = container.querySelector<HTMLDivElement>(".logo");
      const text = container.querySelector<HTMLDivElement>(".logo-text");
      if (!logo || !text) return;

      console.log("text", text);

      // Initial state
      gsap.set(text, { x: 20, autoAlpha: 0 });

      // Hover in
      logo.addEventListener("mouseenter", () => {
        gsap.to(logo, { x: -10, duration: 0.4, ease: "power3.out" });
        gsap.to(text, {
          x: 0,
          autoAlpha: 1,
          duration: 0.4,
          ease: "power3.out",
        });
      });

      // Hover out
      logo.addEventListener("mouseleave", () => {
        gsap.to(logo, { x: 0, duration: 0.4, ease: "power3.out" });
        gsap.to(text, {
          x: 20,
          autoAlpha: 0,
          duration: 0.4,
          ease: "power3.out",
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex items-center justify-center ">
      <div
        className="relative flex items-center gap-4 cursor-pointer p-10 "
        ref={containerRef}
      >
        <div className="logo w-16 h-16 ">
          <img
            src="/me.jpg"
            alt="Me"
            className="w-16 h-16 object-cover rounded-full border-2 border-white"
          />
        </div>
        <div className="logo-text text-lg font-semibold">
          <div className="flex items-center justify-center bg-red-100 ">
            <h2>Bekalu Sisay</h2>
            {/* <p>Frontend Dev</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}
