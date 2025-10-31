"use client";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Item {
  name: string;
  description: string;
}

const items: Item[] = [
  {
    name: "Fin-Tech",
    description:
      "Financial technology innovations revolutionizing banking, payments, and investment services.",
  },
  {
    name: "Entertainment",
    description:
      "Digital media, streaming platforms, and interactive entertainment experiences.",
  },
  {
    name: "E-Commerce",
    description:
      "Online retail, marketplaces, and digital platforms transforming commerce.",
  },
  {
    name: "Agri-Culture",
    description:
      "Technology-driven farming solutions and sustainable agricultural practices.",
  },
  {
    name: "Hospitality",
    description:
      "Hotel, travel, and service industry innovations enhancing guest experiences.",
  },
  {
    name: "Education",
    description:
      "EdTech solutions and digital learning platforms shaping future education.",
  },
  {
    name: "Health Care",
    description:
      "Medical technology, telehealth, and healthcare digital transformation.",
  },
];

export default function ScrollListAnimation() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);

  // Industry-specific images from Unsplash
  useEffect(() => {
    const industryImages = [
      "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", // FinTech
      "https://images.unsplash.com/photo-1489599809505-fb40eb6c6e94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", // Entertainment
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", // E-Commerce
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2052&q=80", // Agriculture
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", // Hospitality
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", // Education
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", // Healthcare
    ];
    setImages(industryImages);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const listItems = listRef.current?.querySelectorAll(".list-item");

    if (!container || !listItems) return;

    // Calculate the total height needed for the scroll animation
    const totalHeight = listItems.length * 100; // Approximate height per item in vh

    // Create the main ScrollTrigger that pins the container
    ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: `+=${totalHeight}%`,
      pin: true,
      pinSpacing: false,
      anticipatePin: 1,
      scrub: true,
      markers: false, // Set to true for debugging
    });

    // Create triggers for each list item
    listItems.forEach((item, index) => {
      ScrollTrigger.create({
        trigger: item,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveIndex(index),
        onEnterBack: () => setActiveIndex(index),
        // containerAnimation: true,
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Industries</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Exploring diverse sectors where innovation meets opportunity
          </p>
        </div>

        <div
          ref={containerRef}
          className="flex flex-col lg:flex-row gap-12 min-h-[80vh]"
        >
          {/* Left list */}
          <div className="lg:w-2/5">
            <div className="bg-white rounded-2xl shadow-xl p-8" ref={listRef}>
              <h2 className="text-2xl font-bold text-gray-800 mb-8 pb-4 border-b border-gray-200">
                Our Focus Areas
              </h2>
              <div className="space-y-4">
                {items.map((item, i) => (
                  <div
                    key={i}
                    className={`list-item p-6 rounded-xl cursor-pointer transition-all duration-500 border-2 ${
                      activeIndex === i
                        ? "bg-blue-50 border-blue-500 shadow-lg transform scale-105"
                        : "bg-white border-gray-100 hover:border-gray-300 hover:shadow-md"
                    }`}
                  >
                    <h3
                      className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
                        activeIndex === i ? "text-blue-700" : "text-gray-800"
                      }`}
                    >
                      {item.name}
                    </h3>
                    <p
                      className={`text-sm transition-colors duration-300 ${
                        activeIndex === i ? "text-blue-600" : "text-gray-600"
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right image */}
          <div className="lg:w-3/5 h-screen flex items-center justify-center ">
            <div className="w-full max-w-2xl">
              {images.length > 0 && (
                <div className="relative group">
                  {/* <div className="absolute -inset-4 bg-linear-to-r  rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div> */}
                  <img
                    src={images[activeIndex]}
                    alt={items[activeIndex].name}
                    className="relative w-full h-96 object-cover rounded-xl shadow-2xl transition-all duration-700 "
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-6 rounded-b-xl">
                    <h3 className="text-white text-2xl font-bold mb-2">
                      {items[activeIndex].name}
                    </h3>
                    <p className="text-gray-200 text-sm">
                      Industry insights and innovations
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
