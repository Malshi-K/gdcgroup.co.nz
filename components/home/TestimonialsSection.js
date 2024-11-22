"use client"; // This directive ensures the component is treated as a client component

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; // Removed Pagination module
import { motion } from "framer-motion"; // Import Framer Motion
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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

  // Define animation variants
  const fadeInVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const slideUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      ref={sectionRef}
      className="overflow-hidden grid grid-cols-1 md:grid-cols-2 h-full transform transition-transform duration-500 ease-in-out"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
    >
      {/* Left Side - Title and Content */}
      <motion.div
        className="bg-customYellow text-white px-6 py-6 md:px-10 lg:px-16 flex flex-col justify-center items-center md:items-start text-center md:text-left"
        variants={fadeInVariants}
      >
        <h2 className="text-xs md:text-sm uppercase tracking-widest font-semibold mb-2 md:mb-4">
          Read Testimonials
        </h2>
        <p className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-snug md:leading-tight">
          It&apos;s always a joy to hear that the work we do has positive
          reviews
        </p>
      </motion.div>

      {/* Right Side - Testimonial Carousel */}
      <motion.div
        className="bg-customBlue text-white p-4 md:p-6 lg:p-8 flex items-center justify-center"
        variants={slideUpVariants}
      >
        <Swiper
          modules={[Autoplay]} // Removed Pagination module
          spaceBetween={20}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="w-full max-w-lg"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide
              key={index}
              className="p-4 md:p-6 lg:p-8 bg-transparent text-center flex flex-col gap-4"
            >
              <motion.div
                className="flex flex-col items-center"
                variants={slideUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
              >
                <p className="mb-4 text-white text-base md:text-lg leading-relaxed">
                  {testimonial.message}
                </p>
                <motion.div
                  className="mt-2 md:mt-4 flex flex-col items-center"
                  variants={fadeInVariants}
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
                </motion.div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </motion.div>
  );
};

export default TestimonialsSection;
