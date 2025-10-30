"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const techLogos = [
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
];

const TechCircle: React.FC = () => {
  const circleRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    (context) => {
      const circle = circleRef.current;
      if (!circle) return;

      const radius = 150; // radius of orbit
      const images = Array.from(
        circle.querySelectorAll<HTMLImageElement>(".orbit-logo")
      );
      const angleIncrement = (Math.PI * 2) / images.length;

      // Position logos around the circle
      images.forEach((img, i) => {
        const angle = angleIncrement * i;
        gsap.set(img, {
          position: "absolute",
          top: "50%",
          left: "50%",
          xPercent: -50,
          yPercent: -50,
          x: radius * Math.cos(angle),
          y: radius * Math.sin(angle),
        });
      });

      // Infinite rotation
      gsap.to(circle, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "linear",
      });

      context.add(() =>
        gsap.to(circle, {
          rotation: 360,
          duration: 20,
          repeat: -1,
          ease: "linear",
        })
      );
    },
    { scope: circleRef }
  );

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen px-6 md:px-20">
      {/* Left content */}
      <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
        <h2 className="text-4xl font-bold mb-4">Our Tech Stack</h2>
        <p className="text-gray-600 text-lg">
          We use modern web technologies to build fast, scalable, and beautiful
          applications.
        </p>
      </div>

      <div className="md:w-1/2 relative w-80 h-80">
        {/* Center image */}
        <img
          src="/me.jpg"
          alt="center-logo"
          className="absolute top-1/2 left-1/2 w-20 h-20 rounded-full object-cover z-10 -translate-x-1/2 -translate-y-1/2"
        />
        <div ref={circleRef} className="relative w-full h-full">
          {/* Orbiting logos */}
          {techLogos.map((logo, idx) => (
            <img
              key={idx}
              src={logo}
              alt={`logo-${idx}`}
              className="orbit-logo w-12 h-12 grayscale hover:grayscale-0 transition-all duration-300"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechCircle;
