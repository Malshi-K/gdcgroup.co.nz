"use client"; // Ensure this is treated as a client component

import React, { useState, useEffect } from "react";
import Image from "next/image";

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
      className={`px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center overflow-hidden transition-opacity duration-600 ease-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Image Section */}
      <div
        className={`flex justify-center relative overflow-hidden transition-all duration-600 ease-out ${
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
        }`}
      >
        <Image
          src="/images/about/review.webp" // Replace with the actual path to your image
          alt="Feedback Illustration"
          width={800} // Adjust width according to your design needs
          height={250}
          className="object-cover"
        />
      </div>

      {/* Text Section */}
      <div
        className={`text-center md:text-left relative overflow-hidden transition-all duration-600 ease-out ${
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
        }`}
        style={{ transitionDelay: "150ms" }}
      >
        <h1 className="text-lg uppercase font-semibold text-gray-500">
          Leave us a Review
        </h1>
        <h2 className="text-4xl text-customBlue font-bold mt-2 mb-4">
          Share Your Experience With Us
        </h2>
        <p className="text-xl text-gray-700 mb-8">
          Please provide your feedback for any job you have previously completed
          with us, and kindly include the job number for easy reference.
        </p>
      </div>
    </section>
  );
};

export default ReviewHeader;