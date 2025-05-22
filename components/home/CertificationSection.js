"use client"; // Ensure this is treated as a client component in Next.js

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

const CertificationSection = () => {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when intersection status changes
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.2 } // Match the original 'amount' parameter
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`relative flex items-center justify-center py-16 px-4 sm:px-6 md:px-8 lg:px-16 bg-white overflow-hidden transition-opacity duration-500 ease-out ${
        isInView ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center max-w-6xl mx-auto">
        {/* Left Side with Image */}
        <div
          className={`flex justify-center items-center max-h-[400px] w-full md:w-auto transition-all duration-700 ease-out ${
            isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
          }`}
        >
          <Image
            src="/images/logos/1.webp"
            alt="Sample Image"
            width={500}
            height={850}
            className="object-contain max-h-[350px] w-auto"
          />
        </div>

        {/* Content Section */}
        <div
          className={`relative text-justify bg-white p-6 flex flex-col justify-center items-center h-full transition-all duration-700 ease-out ${
            isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
          }`}
          style={{ transitionDelay: "150ms" }}
        >
          <h3 className="text-2xl text-center sm:text-3xl md:text-3xl lg:text-4xl text-customYellow uppercase font-bold mt-2 mb-4">
            ISO 9001 Certified Firm
          </h3>
          <h4 className="text-sm text-justify sm:text-base md:text-lg lg:text-lg text-customBlue leading-relaxed">
            As an ISO 9001:2015 Certified firm, GDC Consultants Ltd works
            closely with local and central Government Agencies in New Zealand.
            This is important to ensure our policies and guidelines are always
            up to date with the national and regional standards.
          </h4>
        </div>
      </div>
    </div>
  );
};

export default CertificationSection;