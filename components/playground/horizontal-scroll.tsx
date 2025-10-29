"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // const ctx = gsap.context(() => {
    const panels = gsap.utils.toArray<HTMLElement>(".panel");

    const endDistance = panels.length * window.innerHeight;

    console.log("endDistance", endDistance);

    const t1 = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: `+=${endDistance}`,
        scrub: 1,
        pin: true,
      },
    });

    panels.forEach((panel) => {
      const title = panel.querySelector("h1");
      const paragraph = panel.querySelector("p");

      gsap.set([title, paragraph], { autoAlpha: 0, yPercent: 40 });
      gsap.set([title], { scale: 4 });
    });

    panels.forEach((panel) => {
      const title = panel.querySelector("h1");
      const paragraph = panel.querySelector("p");

      t1.to(title, {
        autoAlpha: 1,
        yPercent: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out",
      })
        .to(
          paragraph,
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.3"
        )
        .addPause();
    });
    // }, [container]);
    // return () => ctx.revert();
  }, []);

  return (
    <section
      ref={container}
      className=" flex justify-between items-center h-screen w-full overflow-hidden"
    >
      <div className="container max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Panel 1 */}
        <div className="panel panel-one h-full flex flex-col items-center justify-center  text-center px-6">
          <h1 className="title text-6xl font-bold text-gray-900">WE TAILOR.</h1>
          <p className="text-gray-700 text-lg mt-4 max-w-sm">
            We customize strategies, products, and experiences to fit your
            specific needs, ensuring a perfect fit every time.
          </p>
        </div>

        {/* Panel 2 */}
        <div className="panel panel-two h-full flex flex-col items-center justify-center text-center px-6">
          <h1 className="title text-6xl font-bold text-gray-900">WE DESIGN.</h1>
          <p className="text-gray-700 text-lg mt-4 max-w-sm">
            Our design process blends creativity with logic to deliver
            beautiful, functional outcomes.
          </p>
        </div>

        {/* Panel 3 */}
        <div className="panel panel-three h-full flex flex-col items-center justify-center  text-center px-6">
          <h1 className="title text-6xl font-bold text-gray-900">
            WE DELIVER.
          </h1>
          <p className="text-gray-700 text-lg mt-4 max-w-sm">
            From concept to completion, we bring your vision to life with
            precision and speed.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
