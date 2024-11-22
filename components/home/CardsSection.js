"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  BriefcaseIcon,
  MapPinIcon,
  Cog6ToothIcon,
  CalendarIcon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";

// Dynamic imports for icons if they're used conditionally
const DynamicBriefcaseIcon = dynamic(
  () => import("@heroicons/react/24/solid").then((mod) => mod.BriefcaseIcon),
  { ssr: false }
);
const DynamicMapPinIcon = dynamic(
  () => import("@heroicons/react/24/solid").then((mod) => mod.MapPinIcon),
  { ssr: false }
);
const DynamicCog6ToothIcon = dynamic(
  () => import("@heroicons/react/24/solid").then((mod) => mod.Cog6ToothIcon),
  { ssr: false }
);
const DynamicCalendarIcon = dynamic(
  () => import("@heroicons/react/24/solid").then((mod) => mod.CalendarIcon),
  { ssr: false }
);

const CardsSection = () => {
  const [counts, setCounts] = useState({
    projects: 0,
    locations: 0,
    services: 0,
    experience: 0,
  });
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animationTriggered, setAnimationTriggered] = useState(false);

  const animateCount = (setCount, maxCount) => {
    let count = 0;
    const interval = setInterval(() => {
      count += 1;
      setCount(count);
      if (count === maxCount) {
        clearInterval(interval);
      }
    }, 10); // Adjusted interval for smoother animation
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      {
        root: null,
        threshold: 0.3,
      }
    );

    const currentSection = sectionRef.current;
    if (currentSection) observer.observe(currentSection);

    return () => {
      if (currentSection) observer.unobserve(currentSection);
    };
  }, []);

  useEffect(() => {
    if (isVisible && !animationTriggered) {
      setAnimationTriggered(true);
      animateCount(
        (count) => setCounts((prev) => ({ ...prev, projects: count })),
        10000
      );
      animateCount(
        (count) => setCounts((prev) => ({ ...prev, locations: count })),
        13
      );
      animateCount(
        (count) => setCounts((prev) => ({ ...prev, services: count })),
        10
      );
      animateCount(
        (count) => setCounts((prev) => ({ ...prev, experience: count })),
        16
      );
    }
  }, [isVisible, animationTriggered]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  // Lazy load card data (e.g., large icons) for improved performance
  const cardData = [
    {
      color: "bg-customBlue",
      gradient: "from-black to-customBlue",
      icon: (
        <DynamicBriefcaseIcon className="w-10 h-10 md:w-12 md:h-12 text-customBlue hover:scale-110" />
      ),
      count: `${counts.projects.toLocaleString()}+`,
      label: "Projects Completed",
    },
    {
      color: "bg-customYellow",
      gradient: "from-yellow-500 to-yellow-300",
      icon: (
        <DynamicMapPinIcon className="w-10 h-10 md:w-12 md:h-12 text-customBlue hover:scale-110" />
      ),
      count: counts.locations.toLocaleString(),
      label: "Locations Serviced",
    },
    {
      color: "bg-customBlue",
      gradient: "from-black to-customBlue",
      icon: (
        <DynamicCog6ToothIcon className="w-10 h-10 md:w-12 md:h-12 text-customBlue hover:scale-110" />
      ),
      count: `${counts.services.toLocaleString()}+`,
      label: "Services Provided",
      link: "/services",
    },
    {
      color: "bg-customYellow",
      gradient: "from-yellow-500 to-yellow-300",
      icon: (
        <DynamicCalendarIcon className="w-10 h-10 md:w-12 md:h-12 text-customBlue hover:scale-110" />
      ),
      count: `${counts.experience.toLocaleString()}+`,
      label: "Years in Operation",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative z-10 mt-4 md:mt-8 lg:mt-[-100px] xl:mt-[-150px] px-4 sm:px-6 lg:px-0 py-10 overflow-hidden"
    >
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 gap-4">
        {cardData.map((card, index) =>
          card.link ? (
            <Link key={index} href={card.link}>
              <Card {...card} variants={cardVariants} />
            </Link>
          ) : (
            <Card key={index} {...card} variants={cardVariants} />
          )
        )}
      </div>
    </section>
  );
};

const Card = ({ color, gradient, icon, count, label, variants }) => (
  <motion.div
    className={`relative ${color} text-white shadow-lg p-6 flex flex-col items-center justify-center space-y-2 h-56 md:h-64 overflow-hidden transform rounded-xl`}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: false, amount: 0.3 }}
    variants={variants}
    whileHover={{ scale: 1.05, zIndex: 10 }}
  >
    <div
      className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-60 clip-path-custom`}
    ></div>
    <div className="relative z-10 bg-customYellow rounded-full p-3 flex items-center justify-center transition-transform duration-500 ease-in-out hover:scale-110">
      {icon}
    </div>
    <div className="relative z-10 text-center">
      <p className="text-3xl md:text-4xl font-extrabold">{count}</p>
      <p className="text-base md:text-lg font-semibold uppercase tracking-wide">
        {label}
      </p>
    </div>
  </motion.div>
);

export default CardsSection;
