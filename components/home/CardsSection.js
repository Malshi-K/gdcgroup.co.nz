"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Eyebrow, BlueprintGrid } from "./homeTheme";
import {
  BriefcaseIcon,
  MapPinIcon,
  Cog6ToothIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";

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

  // Improved counter animation function with easing
  const animateCount = (key, finalValue, duration = 2000) => {
    const startTime = Date.now();
    
    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      
      if (elapsed < duration) {
        // Easing function for smooth animation
        const progress = elapsed / duration;
        const easedProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease-out
        
        const currentValue = Math.floor(finalValue * easedProgress);
        setCounts(prev => ({ ...prev, [key]: currentValue }));
        requestAnimationFrame(animate);
      } else {
        setCounts(prev => ({ ...prev, [key]: finalValue }));
      }
    };
    
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible && !animationTriggered) {
      setAnimationTriggered(true);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setCounts({ projects: 10000, locations: 14, services: 10, experience: 10 });
        return;
      }
      animateCount('projects', 10000, 2500); // Increased duration for smoother animation
      animateCount('locations', 14, 1500);
      animateCount('services', 10, 1500);
      animateCount('experience', 10, 1500);
    }
  }, [isVisible, animationTriggered]);

  const cardData = [
    {
      Icon: BriefcaseIcon,
      count: `${counts.projects.toLocaleString()}+`,
      label: "Projects Delivered",
    },
    {
      Icon: MapPinIcon,
      count: counts.locations.toLocaleString(),
      label: "Locations Served",
    },
    {
      Icon: Cog6ToothIcon,
      count: `${counts.services.toLocaleString()}+`,
      label: "Engineering & Design Disciplines",
      link: "/services",
    },
    {
      Icon: CalendarIcon,
      count: `${counts.experience.toLocaleString()}+`,
      label: "Years in Operation",
    },
  ];

  const Stat = ({ Icon, count, label, link, index }) => {
    const Content = (
      <div
        className={`border-l border-white/20 pl-5 lg:pl-8 transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionDelay: isVisible ? `${index * 120}ms` : "0ms" }}
      >
        <Icon className="mb-4 h-9 w-9 text-light-blue md:h-11 md:w-11 lg:h-12 lg:w-12" aria-hidden="true" />
        <p className="text-4xl font-bold leading-none text-white md:text-5xl lg:text-6xl">
          {count}
        </p>
        <p className="mt-3 text-sm font-semibold uppercase tracking-wider text-light-blue md:text-base">
          {label}
        </p>
      </div>
    );

    return link ? (
      <Link href={link} className="block hover:opacity-90">
        {Content}
      </Link>
    ) : (
      Content
    );
  };

  return (
    <section ref={sectionRef} className="relative -mt-5 bg-primary-navy md:-mt-14">
      <div className="relative overflow-hidden bg-primary-navy pb-14 pt-16 md:pb-20 md:pt-28">
        <BlueprintGrid />
        <div className="site-x relative">
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-x-0">
            {cardData.map((card, index) => (
              <Stat key={card.label} index={index} {...card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardsSection;
