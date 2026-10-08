"use client"; // Ensure this is treated as a client component

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Eyebrow, BlueprintGrid } from "@/components/home/homeTheme";

const ReviewHeader = () => {
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
    
    const section = document.getElementById('review-header-section');
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
      id="review-header-section"
      className={`relative z-10 overflow-hidden bg-primary-navy transition-opacity duration-600 ease-out motion-reduce:transition-none [clip-path:polygon(0_0,100%_0,100%_calc(100%-20px),0_100%)] md:[clip-path:polygon(0_0,100%_0,100%_calc(100%-56px),0_100%)] ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <BlueprintGrid className="z-[1]" />
      <div className="relative">
        {/* Text Section */}
        <div className="site-x relative z-10 flex flex-col justify-center pb-24 pt-36 md:min-h-[520px] md:pb-40 md:pt-44">
          <div
            className={`max-w-xl text-center transition-all duration-600 ease-out motion-reduce:transition-none md:text-left ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            <Eyebrow tone="dark">Leave us a Review</Eyebrow>
            <h1 className="mb-4 mt-2 text-4xl font-bold text-white md:text-5xl">
              Share Your Experience With Us
            </h1>
            <p className="text-xl text-light-blue">
              Please provide your feedback for any job you have previously
              completed with us, and kindly include the job number for easy
              reference.
            </p>
          </div>
        </div>

        {/* Background image, blended into the text */}
        <div className="hero-fade relative h-64 md:absolute md:inset-y-0 md:right-0 md:h-auto md:w-[58%]">
          <Image
            src="/images/about/review.jfif"
            alt="Feedback Illustration"
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

export default ReviewHeader;
