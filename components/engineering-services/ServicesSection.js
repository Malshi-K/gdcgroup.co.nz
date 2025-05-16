"use client"; // Ensures this is treated as a client-side component

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic"; // Dynamic import for optimized loading
import Link from "next/link";

// Dynamically import icons to improve initial load performance
const icons = {
  BuildingOfficeIcon: dynamic(
    () =>
      import("@heroicons/react/24/solid").then((mod) => mod.BuildingOfficeIcon),
    { ssr: false }
  ),
  ScaleIcon: dynamic(
    () => import("@heroicons/react/24/solid").then((mod) => mod.ScaleIcon),
    { ssr: false }
  ),
  WrenchScrewdriverIcon: dynamic(
    () =>
      import("@heroicons/react/24/solid").then(
        (mod) => mod.WrenchScrewdriverIcon
      ),
    { ssr: false }
  ),
};

// Updated services with external URLs
const services = [
  {
    title: "Structural Engineering",
    description:
      "At GDC Consultants, we match every structure with a redesign that is innovative and responsive to changing demands. From large corporate structures to distinctive home designs – we create a masterpiece every time.",
    icon: icons.BuildingOfficeIcon,
    url: "https://gdcgroup.co.nz/services/structural-engineering"
  },
  {
    title: "Geotechnical Engineering",
    description:
      "We strive to design safe and effective retention systems and foundations, employing our extensive expertise and experience and a pragmatic approach.",
    icon: icons.ScaleIcon,
    url: "https://gdcgroup.co.nz/services/geotechnical-engineering"
  },
  {
    title: "Seismic Engineering",
    description:
      "At GDC Consultants, our commitment to Seismic engineering excellence in New Zealand sets us apart. With a wealth of expertise, we specialize in crafting robust designs for buildings and structures, ensuring their resilience to seismic activity.",
    icon: icons.WrenchScrewdriverIcon,
    url: "https://gdcgroup.co.nz/services/seismic-engineering"
  },
];

const ServicesSection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animationTriggered, setAnimationTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animationTriggered) {
          setIsVisible(true);
          setAnimationTriggered(true); // Ensures animations are triggered only once
        }
      },
      { root: null, threshold: 0.2 }
    );

    const currentSection = sectionRef.current;
    if (currentSection) observer.observe(currentSection);

    return () => {
      if (currentSection) observer.unobserve(currentSection);
    };
  }, [animationTriggered]);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="px-20 py-8 bg-gray-50 overflow-hidden"
    >
      <div
        className={`text-center mb-8 px-4 md:px-8 xl:px-12 transition-all duration-600 ease-out ${
          isVisible ? "opacity-100 transform-none" : "opacity-0 translate-y-5"
        }`}
      >
        <h1 className="text-3xl text-customYellow uppercase font-bold mt-2">
          Our Expertise and Services
        </h1>
        <h2 className="text-md text-customBlue tracking-wide">
          At GDC Consultants, we offer a wide range of specialised consulting
          services to help our clients successfully complete their construction
          projects. Explore our services to see how we can help you reach your
          goals.
        </h2>
      </div>

      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 md:px-6 xl:px-10">
        {services.map((service, index) => {
          const IconComponent = service.icon; // Use dynamically imported icon component
          return (
            <a
              key={index}
              href={service.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none h-full"
            >
              <div
                className={`relative bg-white shadow-md overflow-hidden transition duration-300 group flex flex-col items-center border-b-4 border-customBlue transform cursor-pointer h-full ${
                  isVisible
                    ? "opacity-100 transform-none"
                    : "opacity-0 translate-y-12"
                } hover:shadow-lg`}
                style={{
                  transitionProperty: "all",
                  transitionDuration: "500ms",
                  transitionTimingFunction: "ease-out",
                  transitionDelay: `${index * 30}ms`,
                }}
              >
                {/* Sliding background effect */}
                <div className="absolute inset-0 bg-white"></div>
                <div className="flex flex-col items-center p-4 z-10 relative group-hover:text-white h-full w-full flex-grow">
                  <div className="bg-white rounded-full p-3 shadow-lg transition duration-300 group-hover:bg-customYellow group-hover:text-white animate-fade-in">
                    <IconComponent className="w-12 h-12 text-customBlue group-hover:text-white animate-scale-up" />
                  </div>
                  <h4 className="text-lg font-bold mt-3 text-center text-customBlue group-hover:text-customYellow animate-fade-in">
                    {service.title}
                  </h4>
                  <p className="font-semibold mt-3 text-center text-customBlue group-hover:text-customYellow animate-fade-in flex-grow">
                    {service.description}
                  </p>
                </div>
              </div>
            </a>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <a
          href="https://gdcgroup.co.nz/services"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-customBlue hover:bg-customYellow text-white py-3 px-8 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-lg font-medium"
        >
          Check for other services
        </a>
      </div>
    </section>
  );
};

export default ServicesSection;