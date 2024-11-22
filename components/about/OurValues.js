// components/OurValues.js

"use client"; // Ensure this is treated as a client component

import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion"; // Import Framer Motion

// Correct Heroicons imports for v2
import {
  BeakerIcon,
  LightBulbIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

const OurValues = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect(); // Stop observing once the animation is triggered
          }
        });
      },
      { threshold: 0.2 } // Adjust the threshold as needed
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Slider settings for the right side columns
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const visions = [
    {
      icon: <BeakerIcon className="w-16 h-16 text-customBlue" />,
      title: "Competence",
      description:
        "We believe that competence is essential to achieving excellency. We always apply our technical, creative, and social competency to innovate, build, and assure long-term success.",
    },
    {
      icon: <LightBulbIcon className="w-16 h-16 text-customBlue" />,
      title: "Innovation",
      description:
        "We pride ourselves on our ability to innovate. You provide us with a vision, and we will provide the ideas and designs to make it a reality.",
    },
    {
      icon: <Cog6ToothIcon className="w-16 h-16 text-customBlue" />,
      title: "Commitment",
      description:
        "We believe in the power of teamwork, and we always strive to create synergies to enhance our performance. We have a strong sense of responsibility for every project we undertake, no matter how big or small.",
    },
    {
      icon: <LightBulbIcon className="w-16 h-16 text-customBlue" />,
      title: "Work Ethics and Compliance",
      description:
        "We believe that our actions speak for our ethics. We always show strong moral responsibility and respect for applicable laws, standards, and rules.",
    },
    {
      icon: <Cog6ToothIcon className="w-16 h-16 text-customBlue" />,
      title: "Competence",
      description:
        "We constantly liaise with our clients to ensure that all of their individual needs, requirements, and concerns are met. We aim to enhance the competitiveness and value of assets for all of our clients.",
    },
  ];

  const missions = [
    {
      icon: <BeakerIcon className="w-16 h-16 text-customBlue" />,
      title: "Empowered by Advanced Technology",
      description:
        "Our ultimate objective is to be the New Zealand’s most competent provider of multidisciplinary civil engineering and architecture services – especially at solving persistent and complex engineering problems.",
    },
    {
      icon: <LightBulbIcon className="w-16 h-16 text-customBlue" />,
      title: "Futuristic Approach",
      description:
        "We use our extensive knowledge and experience to create development solutions which far exceed current market requirements. We aim not just to meet our client’s current needs, but also to predict and meet their future needs too.",
    },
    {
      icon: <Cog6ToothIcon className="w-16 h-16 text-customBlue" />,
      title: "Guaranteed Quality",
      description:
        "By using the latest and best diagnostic technology and solutions, we guarantee optimal quality outcomes for all of our projects.",
    },
  ];

  // Animation Variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
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
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const slideUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section ref={sectionRef} className="overflow-hidden">
      <motion.div
        className="px-10 py-6"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={fadeIn}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Static Introductory Column */}
          <motion.div
            className="flex flex-col items-center justify-center text-center p-6 bg-white"
            variants={slideInLeft}
          >
            <h2 className="text-3xl text-customBlue font-bold mb-4">Our Vision</h2>
            <p className="text-gray-600 max-w-md">
              Our vision is to provide unmatched quality, competitive solutions,
              and customized approaches.
            </p>
          </motion.div>

          {/* Slider Columns */}
          <Slider {...sliderSettings} className="col-span-2">
            {visions.map((vision, index) => (
              <motion.div
                key={index}
                className="p-6 text-center"
                variants={slideUp}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                style={{ height: "250px" }} // Adjust height as needed
              >
                <div className="flex justify-center mb-4">{vision.icon}</div>
                <h3 className="text-lg font-bold">{vision.title}</h3>
                <p className="text-gray-600 mt-2">{vision.description}</p>
              </motion.div>
            ))}
          </Slider>
        </div>
      </motion.div>

      <motion.div
        className="px-10 py-6"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={fadeIn}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Slider Columns */}
          <Slider {...sliderSettings} className="col-span-2">
            {missions.map((mission, index) => (
              <motion.div
                key={index}
                className="p-6 text-center"
                variants={slideUp}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                style={{ height: "250px" }} // Adjust height as needed
              >
                <div className="flex justify-center mb-4">{mission.icon}</div>
                <h3 className="text-lg font-bold">{mission.title}</h3>
                <p className="text-gray-600 mt-2">{mission.description}</p>
              </motion.div>
            ))}
          </Slider>

          {/* Static Introductory Column */}
          <motion.div
            className="flex flex-col items-center justify-center text-center p-6 bg-white"
            variants={slideInRight}
          >
            <h2 className="text-3xl text-customBlue font-bold mb-4">Our Mission</h2>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default OurValues;
