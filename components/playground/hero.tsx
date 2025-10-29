"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(() => {
    const heroSplit = new SplitText("#hero-txt", { type: "chars,words" });
    const paragraphSplit = new SplitText("#hero-paragraph", {
      type: "lines",
    });

    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1.2,
      ease: "expo.out",
      stagger: 0.06,
    });
    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      stagger: 0.06,
      delay: 1,
    });

    const startValue = isMobile ? "top 50%" : "center 60%";
    const endValue = isMobile ? "120% top" : "bottom top";

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: "video",
        start: startValue,
        end: endValue,
        scrub: true,
        pin: true,
      },
    });

    const video = videoRef.current;
    if (!video) return;

    video.onloadedmetadata = () => {
      tl.to(video, {
        currentTime: video.duration,
      });
    };
  }, []);

  return (
    <section className="py-20 px-6 bg-gray-200 h-screen flex-center">
      <div className="max-w-4xl mx-auto text-center  space-y-12">
        <h1
          id="hero-txt"
          className=" text-4xl md:text-6xl text-black font-semibold "
        >
          GSAP Playground
        </h1>
        {/* <div className="video absolute inset-0">
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            src="/video.mp4"
          />
        </div> */}
        <p id="hero-paragraph" className="text-black">
          The GSAP Playground is my creative space to experiment with motion
          design and bring static layouts to life. Every scroll, hover, and
          click becomes a story told through smooth transitions and meaningful
          interactions. Using the GreenSock Animation Platform (GSAP) with
          React, I explore timelines, scroll-based effects, and micro-animations
          that make UI feel alive. This playground isn’t just about code—it’s
          where I turn ideas into movement, and movement into experience.
        </p>
      </div>
    </section>
  );
};

export default Hero;
