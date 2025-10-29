"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const sections = gsap.utils.toArray<HTMLElement>(".about-section");

    sections.forEach((section) => {
      const title = section.querySelector(".title");
      const paragraph = section.querySelector("p");

      // Create a timeline for each section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "top 30%",
          scrub: true,
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        title,
        {
          scale: 10,
          opacity: 0,
          y: 100,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        }
      ).fromTo(
        paragraph,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "+=0.3" // delay after title animates
      );
    });
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: () => "+=" + container.current!.offsetWidth,
      },
    });

    sections.forEach((section) => {
      const title = section.querySelector(".title");
      const paragraph = section.querySelector("p");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          containerAnimation: gsap.getById("scrollTween"), // optional if using timeline
          start: "center center",
          end: "center center",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        title,
        { scale: 3, opacity: 0, y: 100 },
        { scale: 1, opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      ).fromTo(
        paragraph,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "+=0.3"
      );
    });
  }, []);

  return (
    <div
      ref={container}
      className="flex flex-col justify-center items-center min-h-[300vh] gap-[100vh] px-12 py-24 bg-neutral-50"
    >
      <div className="about-section text-center">
        <h1 className="title text-6xl font-bold text-gray-900">WE TAILOR.</h1>
        <p className="text-gray-700 text-lg mt-4 max-w-md mx-auto">
          We customize strategies, products, and experiences to fit your
          specific needs, ensuring a perfect fit every time.
        </p>
      </div>

      <div className="about-section text-center">
        <h1 className="title text-6xl font-bold text-gray-900">WE DESIGN.</h1>
        <p className="text-gray-700 text-lg mt-4 max-w-md mx-auto">
          Our design process blends creativity with logic to deliver beautiful,
          functional outcomes.
        </p>
      </div>

      <div className="about-section text-center">
        <h1 className="title text-6xl font-bold text-gray-900">WE DELIVER.</h1>
        <p className="text-gray-700 text-lg mt-4 max-w-md mx-auto">
          From concept to completion, we bring your vision to life with
          precision and speed.
        </p>
      </div>
    </div>
  );
};

export default About;
