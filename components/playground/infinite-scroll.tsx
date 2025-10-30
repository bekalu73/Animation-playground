"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

const logos = [
  {
    name: "Google",
    url: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/google.svg",
  },
  {
    name: "Apple",
    url: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/apple.svg",
  },
  {
    name: "Microsoft",
    url: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/microsoft.svg",
  },
  {
    name: "Amazon",
    url: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/amazon.svg",
  },
  {
    name: "Facebook",
    url: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg",
  },
];

export default function InfiniteLogoScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<string | null>(null);
  let timelineRef = useRef<GSAPTween | null>(null);

  useEffect(() => {
    const wrapper = scrollRef.current;
    if (!wrapper) return;

    const totalWidth = wrapper.scrollWidth / 3;

    const t1 = gsap.to(wrapper, {
      x: `-=${totalWidth}`,
      duration: 20,
      ease: "linear",
      repeat: -1,
      jojo: true,
      modifiers: {
        x: (x) => {
          // wrap value to 0..-totalWidth
          let val = parseFloat(x);
          if (val <= -totalWidth) val += totalWidth;
          return `${val}px`;
        },
      },
    });

    timelineRef.current = t1;
    // return () => t1.kill();
  }, []);

  return (
    <div className="w-full overflow-hidden py-8">
      <div ref={scrollRef} className="flex gap-8 whitespace-nowrap">
        {[...logos, ...logos, ...logos].map((logo, idx) => {
          const logoId = `${logo.name}-${idx}`;
          return (
            <div
              key={logoId}
              className="relative shrink-0 w-32 h-16 flex items-center justify-center cursor-pointer"
              onMouseEnter={() => {
                timelineRef.current?.pause();
                setTooltip(logoId);
              }}
              onMouseLeave={() => {
                timelineRef.current?.play();
                setTooltip(null);
              }}
            >
              <img
                src={logo.url}
                alt={logo.name}
                className="max-h-full object-contain"
              />
              {tooltip === logoId && (
                <div className="absolute bottom-full mb-2 px-2 py-1 bg-black text-white text-xs rounded">
                  {logo.name}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
