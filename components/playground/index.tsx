import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Hero from "./hero";
import ServicesSection from "./serivice";
import About from "./aboutVertical";
import AboutHorizontal from "./horizontal-scroll";
import Inertia from "./inertia";
import PillNav from "./pillNav";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Playground = () => {
  return (
    <>
      <Hero />
      {/* <ServicesSection /> */}

      {/* <About /> */}
      <AboutHorizontal />
      <Inertia />
      <PillNav />
    </>
  );
};

export default Playground;
