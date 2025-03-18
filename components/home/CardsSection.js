"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  BriefcaseIcon,
  MapPinIcon,
  Cog6ToothIcon,
  CalendarIcon,
} from "@heroicons/react/24/solid";

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

  const cardBaseStyle = "h-[224px] md:h-[256px]";
  const iconBaseStyle = "w-10 h-10 md:w-12 md:h-12";
  const textBaseStyle = "min-h-[3rem] md:min-h-[3.5rem]";

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
      animateCount('projects', 10000, 2500); // Increased duration for smoother animation
      animateCount('locations', 13, 1500);
      animateCount('services', 10, 1500);
      animateCount('experience', 16, 1500);
    }
  }, [isVisible, animationTriggered]);

  const cardData = [
    {
      color: "bg-customBlue",
      gradient: "from-black to-customBlue",
      Icon: BriefcaseIcon,
      count: `${counts.projects.toLocaleString()}+`,
      label: "Projects Completed",
    },
    {
      color: "bg-customYellow",
      gradient: "from-yellow-500 to-yellow-300",
      Icon: MapPinIcon,
      count: counts.locations.toLocaleString(),
      label: "Locations Serviced",
    },
    {
      color: "bg-customBlue",
      gradient: "from-black to-customBlue",
      Icon: Cog6ToothIcon,
      count: `${counts.services.toLocaleString()}+`,
      label: "Services Provided",
      link: "/services",
    },
    {
      color: "bg-customYellow",
      gradient: "from-yellow-500 to-yellow-300",
      Icon: CalendarIcon,
      count: `${counts.experience.toLocaleString()}+`,
      label: "Years in Operation",
    },
  ];

  const CardComponent = ({ color, gradient, Icon, count, label, link }) => {
    const Content = (
      <div
        className={`relative ${color} ${cardBaseStyle} text-white shadow-lg p-6 flex flex-col items-center justify-center space-y-2 overflow-hidden transform rounded-xl
          transition-all duration-700 ease-out opacity-0 translate-y-12
          ${isVisible ? 'opacity-100 translate-y-0 hover:scale-105 hover:z-10' : ''}
        `}
        style={{
          transitionDelay: isVisible ? '100ms' : '0ms',
          transitionProperty: 'opacity, transform'
        }}
      >
        <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-60`} />
        <div className="relative z-10 bg-customYellow rounded-full p-3 flex items-center justify-center">
          <Icon className={`${iconBaseStyle} text-customBlue transition-transform duration-500 ease-in-out hover:scale-110`} />
        </div>
        <div className={`relative z-10 text-center ${textBaseStyle}`}>
          <p className="text-3xl md:text-4xl font-extrabold leading-tight">{count}</p>
          <p className="text-base md:text-lg font-semibold uppercase tracking-wide">{label}</p>
        </div>
      </div>
    );

    return link ? <Link href={link}>{Content}</Link> : Content;
  };

  return (
    <section
      ref={sectionRef}
      className="relative z-10 mt-4 md:mt-8 lg:mt-[-100px] xl:mt-[-150px] px-4 sm:px-6 lg:px-0 py-10"
    >
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0">
        {cardData.map((card, index) => {
          // Add sequential delay to each card
          const delay = index * 150;
          return (
            <div key={index} style={{ transitionDelay: `${delay}ms` }} className="transition-all duration-700">
              <CardComponent {...card} />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CardsSection;