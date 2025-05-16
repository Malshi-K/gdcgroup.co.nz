"use client"; // Ensure this is treated as a client component

import React, { useState, useEffect } from "react";
import Image from "next/image";

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
      className="w-full p-10 md:p-16 transition-all duration-500 ease-in-out"
    >
      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-5 md:gap-0 px-4 md:px-8 lg:px-16">
        {/* Left Content Column */}
        <div
          className={`flex flex-col space-y-4 md:space-y-6 text-center md:text-left transition-all duration-600 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          <nav className="text-lg md:text-2xl text-customBlue font-bold flex items-center justify-center md:justify-start space-x-2">
            <h1 className="text-customBlue">Careers</h1>
          </nav>
          <h1
            className={`text-4xl md:text-5xl font-bold text-customYellow leading-tight transition-all duration-600 ease-out ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            Career Opportunities for Graduates and Internships
          </h1>
          <p
            className={`text-base md:text-lg text-gray-600 leading-relaxed transition-all duration-600 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            At GDC, we&apos;re always looking for talented and motivated individuals
            to join our team.
          </p>
        </div>

        {/* Right Image Column */}
        <div
          className={`relative w-full h-64 md:h-auto overflow-hidden transition-all duration-600 ease-out ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          <Image
            src="/images/about/career.webp"
            alt="Our Projects"
            width={700}
            height={500}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
};

export default JoinOurTeam;