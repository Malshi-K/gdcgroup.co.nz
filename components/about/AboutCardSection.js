"use client"; // Ensure this is treated as a client component

import React from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import Image from "next/image"; // Import Image from Next.js

const AboutCardSection = () => {
  const teamMembers = [
    {
      id: 1,
      title: "We Are Industry Leaders",
      description:
        "GDC Consultants are a nationwide provider of innovative solutions in all areas of the engineering and architecture process chains. Our unique success story is predicated on our core values of innovation, competency, and strict coordination on client needs.",
    },
    {
      id: 2,
      title: "Who We Are",
      description:
        "Through our expertise, competency, and continuous client support, we have earned the trust of our clients. By developing long lasting partnerships and consistently providing the best possible solutions and services, we are considered industry leaders. \nAt GDC Consultants, we believe in having strong values and priorities in everything we do. We take responsibility for the way our work affects society and the environment, and we are constantly aiming to give back to our community.",
    },
    {
      id: 3,
      title: "We Provide Sustainable Solutions",
      description:
        "We understand the vital necessity of sustainability in everything we do. Our corporate practice is founded on ethical behavior, innovation, and ensuring the sustainability of our community and environment.",
    },
  ];

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
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

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.4 },
    },
  };

  return (
    <motion.section
      className="px-6 py-12 bg-white text-center overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={fadeInUp}
    >
      <motion.h1 className="text-lg uppercase font-semibold text-gray-500">
        About Us
      </motion.h1>
      <motion.h1
        className="text-4xl text-customBlue font-bold mt-2 mb-4"
        variants={fadeInUp}
      >
        GDC Consultants LTD
      </motion.h1>
      <motion.p className="text-xl text-gray-700 mb-8" variants={fadeInUp}>
        Chartered Professional Engineers & Architectural Designers
      </motion.p>

      <div className="w-full rounded-lg overflow-hidden">
        <Image
          src="/images/about/who-we-are.webp" // Ensure this path is correct for your image
          alt="who we are"
          layout="responsive" // Ensures the image is responsive
          width={800} // Adjust to your image's aspect ratio
          height={450} // Adjust to your image's aspect ratio
          objectFit="contain" // Maintains the 'object-contain' effect
          className="transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Card Container */}
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 mt-8 md:mt-12 overflow-hidden">
        {/* First Card */}
        <motion.div
          className="overflow-hidden md:w-1/3 flex flex-col relative"
          variants={slideInLeft}
        >
          <div className="p-4 bg-white rounded-lg shadow-md h-full">
            <h3 className="text-lg text-customBlue font-bold mb-2">
              {teamMembers[0].title}
            </h3>
            <p className="text-gray-600 mb-2">“Your vision. Our expertise.”</p>
            <p className="text-gray-600">{teamMembers[0].description}</p>
          </div>
        </motion.div>
        {/* Middle Card */}
        <motion.div
          className="overflow-hidden md:w-1/3 flex flex-col relative"
          variants={fadeInUp}
        >
          <div className="p-4 bg-white rounded-lg shadow-md h-full">
            <h3 className="text-lg text-customBlue font-bold mb-2">
              {teamMembers[1].title}
            </h3>
            <p className="text-gray-600">{teamMembers[1].description}</p>
          </div>
        </motion.div>
        {/* Third Card */}
        <motion.div
          className="overflow-hidden md:w-1/3 flex flex-col relative"
          variants={slideInRight}
        >
          <div className="p-4 bg-white rounded-lg shadow-md h-full">
            <h3 className="text-lg text-customBlue font-bold mb-2">
              {teamMembers[2].title}
            </h3>
            <p className="text-gray-600">{teamMembers[2].description}</p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutCardSection;
