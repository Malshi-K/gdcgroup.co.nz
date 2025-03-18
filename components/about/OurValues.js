// components/OurValues.js

"use client"; // Ensure this is treated as a client component

import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
        "Our ultimate objective is to be the New Zealand's most competent provider of multidisciplinary civil engineering and architecture services – especially at solving persistent and complex engineering problems.",
    },
    {
      icon: <LightBulbIcon className="w-16 h-16 text-customBlue" />,
      title: "Futuristic Approach",
      description:
        "We use our extensive knowledge and experience to create development solutions which far exceed current market requirements. We aim not just to meet our client's current needs, but also to predict and meet their future needs too.",
    },
    {
      icon: <Cog6ToothIcon className="w-16 h-16 text-customBlue" />,
      title: "Guaranteed Quality",
      description:
        "By using the latest and best diagnostic technology and solutions, we guarantee optimal quality outcomes for all of our projects.",
    },
  ];

  return (
    <section ref={sectionRef} className="overflow-hidden">
      <div 
        className={`px-10 py-6 transition-opacity duration-600 ease-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Static Introductory Column */}
          <div
            className={`flex flex-col items-center justify-center text-center p-6 bg-white transition-all duration-600 ease-out ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            <h2 className="text-3xl text-customBlue font-bold mb-4">Our Vision</h2>
            <p className="text-gray-600 max-w-md">
              Our vision is to provide unmatched quality, competitive solutions,
              and customized approaches.
            </p>
          </div>

          {/* Slider Columns */}
          <Slider {...sliderSettings} className="col-span-2">
            {visions.map((vision, index) => (
              <div
                key={index}
                className={`p-6 text-center transition-all duration-600 ease-out ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                }`}
                style={{ 
                  height: "250px",
                  transitionDelay: `${100 + (index * 75)}ms` 
                }}
              >
                <div className="flex justify-center mb-4">{vision.icon}</div>
                <h3 className="text-lg font-bold">{vision.title}</h3>
                <p className="text-gray-600 mt-2">{vision.description}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div 
        className={`px-10 py-6 transition-opacity duration-600 ease-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "300ms" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Slider Columns */}
          <Slider {...sliderSettings} className="col-span-2">
            {missions.map((mission, index) => (
              <div
                key={index}
                className={`p-6 text-center transition-all duration-600 ease-out ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                }`}
                style={{ 
                  height: "250px",
                  transitionDelay: `${400 + (index * 75)}ms` 
                }}
              >
                <div className="flex justify-center mb-4">{mission.icon}</div>
                <h3 className="text-lg font-bold">{mission.title}</h3>
                <p className="text-gray-600 mt-2">{mission.description}</p>
              </div>
            ))}
          </Slider>

          {/* Static Introductory Column */}
          <div
            className={`flex flex-col items-center justify-center text-center p-6 bg-white transition-all duration-600 ease-out ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <h2 className="text-3xl text-customBlue font-bold mb-4">Our Mission</h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurValues;