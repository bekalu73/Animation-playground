"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import React from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Text = () => {
  useGSAP(() => {
    const split = new SplitText(".text_section", {
      type: "lines",
    });

    // Optional: Apply perspective to the parent for a 3D effect
    gsap.set(".text_section", {
      perspective: 1000,
    });

    split.lines.forEach((line) => {
      gsap.fromTo(
        line,
        {
          opacity: 0,
          rotateX: -120,
          transformOrigin: "top center",
        },
        {
          opacity: 1,
          rotateX: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: line,
            start: "top 90%",
            end: "top 50%",
            scrub: true,
          },
        }
      );
    });
  }, []);

  return (
    <section className="bg-black text-center element text-9xl font-bold text-white mt-10 text_section overflow-x-hidden">
      I'M BEKALU SISAY ITICHA. A FRONTEND DEVELOPER WITH STRONG INTEREST IN
      FRONTEND DEVELOPMENT AND ANIMATIONS. !!!
    </section>
  );
};

export default Text;
