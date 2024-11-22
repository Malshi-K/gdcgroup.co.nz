// components/ProjectHeader.js
"use client"; // Ensure this is treated as a client component

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion"; // Import Framer Motion

const ProjectHeader = () => {
  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const zoomIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      className="w-full p-10 md:p-16 transition-all duration-500 ease-in-out"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
    >
      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-5 md:gap-0 px-4 md:px-8 lg:px-16">
        {/* Left Content Column */}
        <motion.div
          className="flex flex-col space-y-4 md:space-y-6 text-center md:text-left" // Added responsive text alignment
          variants={fadeInUp}
        >
          <nav className="text-lg md:text-2xl text-customBlue font-bold flex items-center justify-center md:justify-start space-x-2">
            <h1 className="text-customBlue">Careers</h1>
          </nav>
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-customYellow leading-tight"
            variants={slideInLeft}
          >
            Career Opportunities for Graduates and Internships
          </motion.h1>
          <motion.p
            className="text-base md:text-lg text-gray-600 leading-relaxed"
            variants={fadeInUp}
          >
            At GDC, we’re always looking for talented and motivated individuals
            to join our team.
          </motion.p>
        </motion.div>

        {/* Right Image Column */}
        <motion.div
          className="relative w-full h-64 md:h-auto overflow-hidden"
          variants={zoomIn}
        >
          <Image
            src="/images/about/career.webp"
            alt="Our Projects"
            width={700}
            height={500}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProjectHeader;
