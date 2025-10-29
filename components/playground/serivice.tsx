"use client";

import { useGSAP } from "@gsap/react";
import { File, Search, Settings } from "lucide-react";

import { OrbitingCircles } from "@/components/ui/orbiting-circles";

export default function ServicesSection() {
  useGSAP(() => {}, []);

  return (
    <div className="relative">
      <div className="relative h-[500px] w-full overflow-hidden">
        <OrbitingCircles>
          <File />
          <Settings />
          <File />
        </OrbitingCircles>
        <OrbitingCircles radius={100} reverse>
          <File />
          <Settings />
          <File />
          <Search />
        </OrbitingCircles>
      </div>
    </div>
  );
}
