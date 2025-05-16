"use client"; // Ensure this is treated as a client component

import React, { useEffect, useState } from "react";

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Set visible after component mounts to trigger animations
    setIsVisible(true);
    
    // Optional: Set up intersection observer for scroll-based animation
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    
    const section = document.getElementById('about-section');
    if (section) observer.observe(section);
    
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const teamMembers = [
    {
      id: 1,
      title: "We Are Industry Leaders",
      description:
        "GDC Consultants are a nationwide provider of innovative solutions in all areas of the engineering and architecture process chains. Our unique success story is predicated on our core values of innovation, competency, and strict coordination on client needs.",
    },
    {
      id: 2,
      title: "We Provide Sustainable Solutions",
      description:
        "We understand the vital necessity of sustainability in everything we do. Our corporate practice is founded on ethical behavior, innovation, and ensuring the sustainability of our community and environment.",
    },
    {
      id: 3,
      title: "Who We Are",
      description:
        "Through our expertise, competency, and continuous client support, we have earned the trust of our clients. By developing long lasting partnerships and consistently providing the best possible solutions and services, we are considered industry leaders. \nAt GDC Consultants, we believe in having strong values and priorities in everything we do. We take responsibility for the way our work affects society and the environment, and we are constantly aiming to give back to our community.",
    },
  ];

  return (
    <section
      id="about-section"
      className="px-20 py-12 bg-white text-center overflow-hidden"
    >
      <div className={`transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <h1 className="text-lg uppercase font-semibold text-gray-500">
          About Us
        </h1>
        <h2
          className="text-4xl text-customYellow font-bold mt-2 mb-4 transition-all duration-700 ease-out delay-100"
        >
          GDC Consultants LTD
        </h2>
        <h3 className="text-xl text-gray-700 mb-8 transition-all duration-700 ease-out delay-200">
          Chartered Professional Engineers & Architectural Designers
        </h3>
      </div>

      {/* Card Container */}
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 mt-8 md:mt-12 overflow-hidden">
        {/* First Card */}
        <div
          className={`overflow-hidden md:w-1/3 flex flex-col relative transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
        >
          <div className="p-4 bg-white rounded-lg shadow-md h-full hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-lg text-customBlue font-bold mb-2">
              {teamMembers[0].title}
            </h3>
            <p className="text-gray-600 mb-2">&ldquo;Your vision. Our expertise.&rdquo;</p>
            <p className="text-gray-600">{teamMembers[0].description}</p>
          </div>
        </div>
        
        {/* Middle Card */}
        <div
          className={`overflow-hidden md:w-1/3 flex flex-col relative transition-all duration-700 ease-out transform delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <div className="p-4 bg-white rounded-lg shadow-md h-full hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-lg text-customBlue font-bold mb-2">
              {teamMembers[1].title}
            </h3>
            <p className="text-gray-600">{teamMembers[1].description}</p>
          </div>
        </div>
        
        {/* Third Card */}
        <div
          className={`overflow-hidden md:w-1/3 flex flex-col relative transition-all duration-700 ease-out transform delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
        >
          <div className="p-4 bg-white rounded-lg shadow-md h-full hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-lg text-customBlue font-bold mb-2">
              {teamMembers[2].title}
            </h3>
            <p className="text-gray-600">{teamMembers[2].description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;