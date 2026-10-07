"use client"; // Ensure this is treated as a client component

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Eyebrow, BlueprintGrid } from "@/components/home/homeTheme";

const JoinOurTeam = () => {
  // State to control animation
  const [isVisible, setIsVisible] = useState(false);
  
  // Use IntersectionObserver to trigger animations when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          // Reset for re-animation when scrolling back (since viewport once was false)
          setIsVisible(false);
        }
      },
      { threshold: 0.2 }
    );
    
    const section = document.getElementById('project-header-section');
    if (section) {
      observer.observe(section);
    }
    
    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);
  
  return (
    <section
      id="project-header-section"
      className="relative z-10 w-full overflow-hidden bg-primary-navy [clip-path:polygon(0_0,100%_0,100%_calc(100%-20px),0_100%)] md:[clip-path:polygon(0_0,100%_0,100%_calc(100%-56px),0_100%)]"
    >
      <BlueprintGrid className="z-[1]" />
      <div className="relative">
        <div className="site-x relative z-10 flex flex-col justify-center pb-24 pt-36 md:min-h-[560px] md:pb-40 md:pt-44">
          {/* Left Content Column */}
          <div
            className={`flex max-w-xl flex-col space-y-4 text-center transition-all duration-600 ease-out motion-reduce:transition-none md:space-y-6 md:text-left ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            <Eyebrow tone="dark">Careers</Eyebrow>
            <h1
              className={`text-4xl font-bold leading-tight text-white transition-all duration-600 ease-out motion-reduce:transition-none md:text-5xl ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              Career Opportunities for Graduates and Internships
            </h1>
            <p
              className={`text-base leading-relaxed text-light-blue transition-all duration-600 ease-out motion-reduce:transition-none md:text-lg ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              At GDC, we&apos;re always looking for talented and motivated individuals
              to join our team.
            </p>
          </div>
        </div>

        {/* Background image, blended into the left content */}
        <div className="hero-fade relative h-64 md:absolute md:inset-y-0 md:right-0 md:h-auto md:w-[58%]">
          <Image
            src="/images/about/career.jfif"
            alt="Careers at GDC Group"
            fill
            priority
            sizes="(min-width: 768px) 58vw, 100vw"
            className="object-cover opacity-80"
          />
        </div>
      </div>
    </section>
  );
};

export default JoinOurTeam;
