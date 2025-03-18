"use client"; // This directive ensures the component is treated as a client component

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; // Removed Pagination module
import "swiper/css";

const testimonials = [
  {
    message:
      "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.",
    author: "Jeff Freshman",
    role: "Guest",
    image: "/images/testimonials/1.webp",
  },
  {
    message:
      "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.",
    author: "Jeff Freshman",
    role: "Guest",
    image: "/images/testimonials/1.webp",
  },
];

const TestimonialsSection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false); // Reset animation when section leaves viewport
        }
      },
      {
        root: null,
        threshold: 0.2,
      }
    );

    const currentSection = sectionRef.current;

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="overflow-hidden grid grid-cols-1 md:grid-cols-2 h-full transform transition-transform duration-500 ease-in-out"
    >
      {/* Left Side - Title and Content */}
      <div
        className={`bg-customYellow text-white px-6 py-6 md:px-10 lg:px-16 flex flex-col justify-center items-center md:items-start text-center md:text-left transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
        }`}
      >
        <h2 className="text-xs md:text-sm uppercase tracking-widest font-semibold mb-2 md:mb-4">
          Read Testimonials
        </h2>
        <p className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-snug md:leading-tight">
          It&apos;s always a joy to hear that the work we do has positive
          reviews
        </p>
      </div>

      {/* Right Side - Testimonial Carousel */}
      <div
        className={`bg-customBlue text-white p-4 md:p-6 lg:p-8 flex items-center justify-center transition-all duration-600 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionDelay: "150ms" }}
      >
        <Swiper
          modules={[Autoplay]} // Removed Pagination module
          spaceBetween={20}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="w-full max-w-lg"
          onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide
              key={index}
              className="p-4 md:p-6 lg:p-8 bg-transparent text-center flex flex-col gap-4"
            >
              <div
                className={`flex flex-col items-center transition-all duration-600 ease-out ${
                  isVisible && index === activeSlide 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-5"
                }`}
                style={{ transitionDelay: "300ms" }}
              >
                <p className="mb-4 text-white text-base md:text-lg leading-relaxed">
                  {testimonial.message}
                </p>
                <div
                  className={`mt-2 md:mt-4 flex flex-col items-center transition-all duration-700 ease-out ${
                    isVisible && index === activeSlide 
                      ? "opacity-100 translate-x-0" 
                      : "opacity-0 -translate-x-8"
                  }`}
                  style={{ transitionDelay: "450ms" }}
                >
                  <Image
                    src={testimonial.image}
                    alt={testimonial.author}
                    width={80}
                    height={80}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full mx-auto object-cover"
                  />
                  <h4 className="font-semibold text-white text-base md:text-lg mt-2">
                    {testimonial.author}
                  </h4>
                  <p className="text-xs md:text-sm text-customYellow uppercase tracking-widest">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TestimonialsSection;