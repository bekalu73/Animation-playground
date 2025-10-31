"use client";
import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    title: "Welcome",
    desc: "The first full-screen card sits at the top.",
    colors: "from-blue-500 to-indigo-600",
  },
  {
    title: "About",
    desc: "Second section stacked directly above the first.",
    colors: "from-purple-500 to-pink-600",
  },
  {
    title: "Services",
    desc: "Third full-screen card perfectly on top.",
    colors: "from-green-500 to-emerald-600",
  },
  {
    title: "Projects",
    desc: "Fourth card layered seamlessly.",
    colors: "from-orange-500 to-red-600",
  },
  {
    title: "Contact",
    desc: "Fifth and topmost card — all stacked together beautifully.",
    colors: "from-sky-500 to-cyan-600",
  },
];

export default function Scroll() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // const randomY = gsap.utils.random(
    //   [window.innerHeight, -window.innerHeight, 0],
    //   true
    // );
    // const randomX = gsap.utils.random(
    //   [window.innerWidth, -window.innerWidth],
    //   true
    // );
    const scaleMax = gsap.utils.mapRange(
      1,
      document.querySelectorAll(".card").length - 1,
      0.8,
      1
    );
    const time = 2;

    gsap.set(".card", {
      y: (index) => 30 * index,
      transformStyle: "preserve-3d",
      transformPerspective: 1000,
      transformOrigin: "center top",
    });

    const t1 = gsap.timeline({
      defaults: {
        ease: "none",
      },
      scrollTrigger: {
        trigger: ".section",
        start: "top top",
        end: `${window.innerHeight * 5} top`,
        scrub: true,
        pin: true,
        // markers: true,
      },
    });
    t1.from(".card", {
      // // y: () => randomY(),
      // // x: () => randomX(),
      // x: () => window.innerWidth,

      // stagger: 2,
      // duration: 1,
      // ease: "power2.out",
      y: () => window.innerHeight,
      duration: time / 2,
      stagger: time,
    });

    t1.to(
      ".card:not(:last-child)",
      {
        rotationX: -20,
        scale: (index) => scaleMax(index),
        stagger: {
          each: time,
        },
      },
      time
    );
  }, []);

  return (
    <section
      ref={containerRef}
      className="section relative min-h-[120vh] w-full overflow-hidden bg-gray-950 text-white flex items-center justify-center"
    >
      {sections.map((sec, i) => (
        <section
          key={i}
          className={`absolute card w-[70%] h-[70vh] inset-0 mx-auto my-10 flex items-center justify-center 
          bg-linear-to-br ${sec.colors} rounded-3xl shadow-2xl border border-white/20`}
        >
          <div className="max-w-4xl bg-white/10 backdrop-blur-md p-16 rounded-3xl shadow-2xl border border-white/20 text-center">
            <h1 className="text-6xl font-bold mb-6">{sec.title}</h1>
            <p className="text-lg text-gray-100">{sec.desc}</p>
          </div>
        </section>
      ))}
    </section>
  );
}
