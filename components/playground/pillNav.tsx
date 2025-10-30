"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const navItems = ["Home", "Projects", "About", "Contact"];

export default function PillNav() {
  const navRef = useRef<HTMLUListElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".nav-item");

      items.forEach((item) => {
        const bg = item.querySelector<HTMLElement>(".bg-overlay");
        if (!bg) return;

        const tl = gsap.timeline({ paused: true });
        tl.to(bg, {
          scaleY: 1,
          duration: 0.1,
          transformOrigin: "bottom",
          ease: "power2.easeOut",
        });
        tl.to(
          item,
          {
            color: "white",
            duration: 0.2,
          },
          "<"
        );

        item.onmouseenter = () => tl.play();
        item.onmouseleave = () => tl.reverse();
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full h-screen py-6">
      <div className="flex items-center justify-end">
        <ul ref={navRef} className="bg-black/80 rounded-3xl p-2 flex gap-2">
          {navItems.map((item) => (
            <li
              key={item}
              className="nav-item relative inline-block bg-white rounded-2xl border border-black px-6 py-3 text-black cursor-pointer font-medium select-none overflow-hidden"
            >
              {/* background overlay */}
              <span className="bg-overlay absolute inset-0 bg-black scale-y-0 origin-bottom z-0"></span>
              <span className="relative z-10">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
