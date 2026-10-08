"use client"; // Ensures this is treated as a client-side component

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link"; // Import Link from Next.js
import dynamic from "next/dynamic"; // Dynamic import for optimized loading

// Dynamically import icons to improve initial load performance
const icons = {
  GlobeAltIcon: dynamic(
    () => import("@heroicons/react/24/solid").then((mod) => mod.GlobeAltIcon),
    { ssr: false }
  ),
  Cog6ToothIcon: dynamic(
    () => import("@heroicons/react/24/solid").then((mod) => mod.Cog6ToothIcon),
    { ssr: false }
  ),
  ClipboardDocumentListIcon: dynamic(
    () =>
      import("@heroicons/react/24/solid").then(
        (mod) => mod.ClipboardDocumentListIcon
      ),
    { ssr: false }
  ),
  ScaleIcon: dynamic(
    () => import("@heroicons/react/24/solid").then((mod) => mod.ScaleIcon),
    { ssr: false }
  ),
  BriefcaseIcon: dynamic(
    () => import("@heroicons/react/24/solid").then((mod) => mod.BriefcaseIcon),
    { ssr: false }
  ),
  AcademicCapIcon: dynamic(
    () =>
      import("@heroicons/react/24/solid").then((mod) => mod.AcademicCapIcon),
    { ssr: false }
  ),
  TruckIcon: dynamic(
    () => import("@heroicons/react/24/solid").then((mod) => mod.TruckIcon),
    { ssr: false }
  ),
  WrenchScrewdriverIcon: dynamic(
    () =>
      import("@heroicons/react/24/solid").then(
        (mod) => mod.WrenchScrewdriverIcon
      ),
    { ssr: false }
  ),
  BuildingOfficeIcon: dynamic(
    () =>
      import("@heroicons/react/24/solid").then((mod) => mod.BuildingOfficeIcon),
    { ssr: false }
  ),
  PresentationChartLineIcon: dynamic(
    () =>
      import("@heroicons/react/24/solid").then(
        (mod) => mod.PresentationChartLineIcon
      ),
    { ssr: false }
  ),
  MagnifyingGlassIcon: dynamic(
    () =>
      import("@heroicons/react/24/solid").then(
        (mod) => mod.MagnifyingGlassIcon
      ),
    { ssr: false }
  ),
  FireIcon: dynamic(
    () => import("@heroicons/react/24/solid").then((mod) => mod.FireIcon),
    { ssr: false }
  ),
  BookOpenIcon: dynamic(
    () => import("@heroicons/react/24/solid").then((mod) => mod.BookOpenIcon),
    { ssr: false }
  ),
};

// Define services with dynamically imported icons
export const services = [
  {
    title: "3 Waters & Contamination",
    slug: "3-waters",
    icon: icons.GlobeAltIcon,
  },
  {
    title: "Electrical Engineering",
    slug: "electrical-engineering",
    icon: icons.Cog6ToothIcon,
  },
  {
    title: "Construction Management",
    slug: "construction-management",
    icon: icons.ClipboardDocumentListIcon,
  },
  { title: "Fire Engineering", slug: "fire-engineering", icon: icons.FireIcon },
  {
    title: "Geotechnical Engineering",
    slug: "geotechnical-engineering",
    icon: icons.ScaleIcon,
  },
  {
    title: "Infrastructure & Subdivision Engineering",
    slug: "infrastructure",
    icon: icons.BriefcaseIcon,
  },
  { title: "Transport Engineering", slug: "transport-engineering", icon: icons.TruckIcon },
  {
    title: "Seismic Engineering",
    slug: "seismic-engineering",
    icon: icons.WrenchScrewdriverIcon,
  },
  {
    title: "Structural Engineering",
    slug: "structural-engineering",
    icon: icons.BuildingOfficeIcon,
  },
  {
    title: "Resource & Building Consents",
    slug: "planning",
    icon: icons.PresentationChartLineIcon,
  },
  { title: "Surveying", slug: "surveying", icon: icons.MagnifyingGlassIcon },
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
      className="py-8 bg-off-white overflow-hidden"
    >
      <div
        className={`text-center mb-8 site-x transition-all duration-600 ease-out ${
          isVisible ? "opacity-100 transform-none" : "opacity-0 translate-y-5"
        }`}
      >
        <h1 className="text-3xl text-primary-blue uppercase font-bold mt-2">
          Our Expertise and Services
        </h1>
        <h2 className="text-md text-primary-navy tracking-wide">
          At GDC Group, we offer a wide range of specialised consulting
          services to help our clients successfully complete their construction
          projects. Explore our services to see how we can help you reach your
          goals.
        </h2>
      </div>

      <div className="site-x grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {services.map((service, index) => {
          const IconComponent = service.icon; // Use dynamically imported icon component
          return (
            <div
              key={index}
              className={`relative bg-white shadow-md overflow-hidden transition duration-300 group flex flex-col items-center border-b-4 border-primary-navy transform ${
                isVisible ? "opacity-100 transform-none" : "opacity-0 translate-y-12"
              }`}
              style={{ 
                transitionProperty: 'all',
                transitionDuration: '500ms',
                transitionTimingFunction: 'ease-out',
                transitionDelay: `${index * 30}ms` 
              }}
            >
              {/* Sliding background effect */}
              <div className="absolute inset-0 bg-primary-navy transition-transform duration-300 transform translate-y-full group-hover:translate-y-0"></div>
              <div className="flex flex-col items-center p-4 z-10 relative group-hover:text-white">
                <div className="bg-white rounded-full p-3 shadow-lg transition duration-300 group-hover:bg-primary-blue group-hover:text-white animate-fade-in">
                  <IconComponent className="w-12 h-12 text-primary-navy group-hover:text-white animate-scale-up" />
                </div>
                <h4 className="text-base font-semibold mt-3 text-center text-primary-navy group-hover:text-white animate-fade-in">
                  {service.title}
                </h4>
                <Link
                  href={`/services/${service.slug}`}
                  className="mt-2 bg-transparent text-white px-3 py-1 rounded-md text-xs font-semibold transition duration-300 group-hover:bg-primary-blue group-hover:text-white opacity-0 group-hover:opacity-100"
                  prefetch={true}
                >
                  View More
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ServicesSection;