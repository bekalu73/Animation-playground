import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Hero from "./hero";
import ServicesSection from "./serivice";
import About from "./aboutVertical";
import AboutHorizontal from "./horizontal-scroll";
import Inertia from "./inertia";
import PillNav from "./pillNav";
import InfiniteScroll from "./infinite-scroll";
import CustomCursor from "./cursor";
import LogoHoverAnimation from "./logo-hover";
import StackedScrollSections from "./stack-scroll";
import Scroll from "./scroll";
import ScrollListAnimation from "./ScrollListAnimation";
import Text from "./text";

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
      <InfiniteScroll />
      <CustomCursor />
      <div className="h-dvh"></div>
      <LogoHoverAnimation />
      {/* <StackedScrollSections /> */}
      <Scroll />
      <ScrollListAnimation />
      <Text />
    </>
  );
};

export default Playground;
