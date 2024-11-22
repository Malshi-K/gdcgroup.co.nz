"use client"; // Ensure this is treated as a client component

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion"; // Import Framer Motion

const ReviewHeader = () => {
  // Animation Variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
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

  return (
    <motion.section
      className="px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center overflow-hidden" // Add overflow-hidden here
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={fadeIn}
    >
      {/* Image Section */}
      <motion.div
        className="flex justify-center relative overflow-hidden" // Add relative and overflow-hidden here
        variants={slideInLeft}
      >
        <Image
          src="/images/about/review.webp" // Replace with the actual path to your image
          alt="Feedback Illustration"
          width={800} // Adjust width according to your design needs
          height={250}
          className="object-cover"
        />
      </motion.div>

      {/* Text Section */}
      <motion.div
        className="text-center md:text-left relative overflow-hidden" // Add relative and overflow-hidden here
        variants={slideInRight}
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
      </motion.div>
    </motion.section>
  );
};

export default ReviewHeader;
