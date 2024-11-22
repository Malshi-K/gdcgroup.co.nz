"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import "@/app/globals.css";
import { motion } from "framer-motion";
import SubContact from "@/components/SubContact";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// Define the teamMembers array
const teamMembers = [
  {
    image: "/images/team/Clement-Fernando-1.webp",
    name: "Clement Fernando",
    position: "Managing Director",
    qualifications: "MSc (Eng), CPEng, IntPE(NZ), CMEngNZ, APEC Engineer",
  },
  {
    image: "/images/team/Alin-Poanta-1.webp",
    name: "Alin Poanta",
    position: "Senior Associate - Lead Structural Engineer",
    qualifications: "BE(Civil) CPEng, CMEngNZ, IntPE(NZ)",
  },
  {
    image: "/images/team/Yi-Su-1.webp",
    name: "Yi Su",
    position: "Senior Associate - Principal Structural Engineer",
    qualifications:
      "BE(Hons), MEngSt(Hons), CPEng, CMEngNZ, IntPE(NZ)/APEC Engineer",
  },
  {
    image: "/images/team/Janine-Barrett.webp",
    name: "Janine Barrett",
    position: "Group Manager: Finance & Administration (Hamilton)",
    qualifications:
      "Bachelor of Communications, Post Grad diploma in Management Studies",
  },
];

// Define the subTeamMembers array
const subTeamMembers = [
  {
    image: "/images/team/Tom-Fox.webp",
    name: "Tom Fox",
    position: "Architectural Manager",
    qualifications: "NDIP (Architectural), NDIP (Building Control Surveying)",
  },
  {
    image: "/images/team/Joel-Bishop.webp",
    name: "Joel Bishop",
    position: "Planning Manager",
    qualifications:
      "Bachelor of Environmental Planning (University of Waikato)",
  },
  {
    image: "/images/team/Maurice-Bellantoni.webp",
    name: "Maurice Bellantoni",
    position: "Senior Architectural Designer",
    qualifications:
      "Bachelor & PhD in Architecture, Master in Urban Planning, Residential Design & Project Management",
  },
  {
    image: "/images/team/John-Kim-1.webp",
    name: "John Kim",
    position: "Geotechnical Manager",
    qualifications: "MEngNZ, MEngSt (University of Canterbury)",
  },
  {
    image: "/images/team/Danyon-Fernando.webp",
    name: "Danyon Fernando",
    position: "Director of Operations",
    qualifications:
      "Bachelor of Arts with Honours (Criminology) - Victoria University of Wellington",
  },
  {
    image: "/images/team/Vazin-Shareef.webp",
    name: "Vazin Shareef",
    position: "Chief Information Officer",
    qualifications:
      "Bachelor of Commerce (BCom) - Victoria University of Wellington",
  },
  {
    image: "/images/team/Bethany-Rutter.webp",
    name: "Bethany Rutter",
    position: "Marketing Executive",
    qualifications: "Bachelor of Applied Management (BAM)",
  },
  {
    image: "/images/team/Kasia-Irvine.webp",
    name: "Kasia Irvine",
    position: "Office Manager (Thames & Whitianga)",
    qualifications: "",
  },
  {
    image: "/images/team/Dion Herniman.webp",
    name: "Dion Herniman",
    position: "Rotorua Branch Manager",
    qualifications: "University of Waikato ,BE Civil(Hons)",
  },
];

const TeamMembers = () => {
  // State definitions
  const [activeCoreIndex, setActiveCoreIndex] = useState(null);
  const [activeSubIndex, setActiveSubIndex] = useState(null);
  const subTeamSliderRef = useRef(null);
  const autoScrollIntervalRef = useRef(null);

  // Function to scroll the sub-team slider
  const scrollSubTeamSlider = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    subTeamSliderRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
    pauseAutoScroll();
  };

  // Function to auto-scroll the sub-team slider every few seconds
  const autoScrollSubTeamSlider = () => {
    autoScrollIntervalRef.current = setInterval(() => {
      if (!subTeamSliderRef.current) return;

      const maxScrollLeft =
        subTeamSliderRef.current.scrollWidth -
        subTeamSliderRef.current.clientWidth;

      if (subTeamSliderRef.current.scrollLeft >= maxScrollLeft) {
        subTeamSliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        subTeamSliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
      }
    }, 5000); // Scroll every 3 seconds
  };

  const pauseAutoScroll = () => {
    clearInterval(autoScrollIntervalRef.current);
    setTimeout(() => {
      autoScrollSubTeamSlider();
    }, 5000); // Restart auto-scroll after 5 seconds of inactivity
  };

  useEffect(() => {
    autoScrollSubTeamSlider();
    return () => {
      clearInterval(autoScrollIntervalRef.current);
    };
  }, []);

  // Prevent double-tap behavior and default action on touch
  useEffect(() => {
    const handleTouchStart = (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    document.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);

  const toggleOverlay = (index) => {
    setActiveCoreIndex(activeCoreIndex === index ? null : index);
  };

  const handleTouchEvent = (e, index) => {
    // Prevent the default behavior and stop the event propagation
    e.preventDefault();
    e.stopPropagation();

    // Toggle the overlay when touched
    toggleOverlay(index);
  };

  return (
    <div className="min-h-screen">
      <header className="pt-8 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-10">
          <h1 className="text-3xl font-bold text-center text-customBlue">
            Our Core Team
          </h1>
        </div>
      </header>

      {/* Core Team Section */}
      <section className="py-8 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="relative group overflow-hidden shadow-md cursor-pointer rounded-lg "
              onMouseEnter={() => toggleOverlay(index)} // For desktop hover
              onMouseLeave={() => toggleOverlay(null)} // For desktop hover leave
              onTouchStart={(e) => handleTouchEvent(e, index)} // For touch devices
            >
              <Image
                src={member.image}
                alt={member.name}
                width={550} // Increased from 500 to 550
                height={550} // Increased from 500 to 550
                className="object-cover w-full h-full transition-transform duration-500"
              />
              {/* Text container with overlay, hide on hover */}
              <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 py-4 px-4 z-10 group-hover:opacity-0 transition-opacity duration-300 h-24 flex flex-col justify-center">
                <h4 className="text-white text-xl font-semibold">
                  {member.name}
                </h4>
                <p className="text-customYellow text-base font-medium">
                  {member.position}
                </p>
              </div>
              {/* Full overlay on hover */}
              <motion.div
                className={`absolute inset-0 bg-customYellow bg-opacity-80 flex items-center justify-center rounded-lg transition-opacity duration-300 ${
                  activeCoreIndex === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="text-white text-center px-4">
                  <h3 className="text-2xl font-bold">{member.name}</h3>
                  <h5 className="text-lg">{member.position}</h5>
                  <p className="text-sm mt-2">{member.qualifications}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Sub Team Section */}
      <section className="relative py-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-screen-lg mx-auto px-4 md:px-6 lg:px-10"
        >
          <div className="relative">
            {/* Left Arrow */}
            <button
              onClick={() => scrollSubTeamSlider("left")}
              className="absolute -left-10 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2"
            >
              <FiChevronLeft className="h-6 w-6 text-customGray" />
            </button>

            {/* Right Arrow */}
            <button
              onClick={() => scrollSubTeamSlider("right")}
              className="absolute -right-10 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2"
            >
              <FiChevronRight className="h-6 w-6 text-customGray" />
            </button>

            <div
              ref={subTeamSliderRef}
              className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide py-4"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                scrollSnapType: "x mandatory",
              }}
            >
              {subTeamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  onMouseEnter={() => toggleOverlay(index)} // For desktop hover
                  onMouseLeave={() => toggleOverlay(null)} // For desktop hover leave
                  onTouchStart={(e) => handleTouchEvent(e, index)} // For touch devices
                  whileHover={{ scale: 1.05 }}
                  className="relative group overflow-hidden cursor-pointer w-full md:w-[260px] flex-shrink-0"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <div className="w-full h-auto aspect-w-4 aspect-h-3 overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={320} // Slightly larger width for the image
                      height={320}
                      className="object-cover w-full h-full rounded-lg transition-transform duration-500"
                    />
                  </div>
                  <div
                    className={`absolute bottom-0 left-0 right-0 w-full bg-customBlue bg-opacity-70 p-2 flex flex-col justify-center items-center h-20 md:h-24 transition-opacity duration-300 ${
                      activeSubIndex === index
                        ? "opacity-100"
                        : "opacity-100 group-hover:opacity-0"
                    }`}
                  >
                    <h4 className="text-white text-center text-md md:text-lg font-bold">
                      {member.name}
                    </h4>
                    <p className="text-customYellow text-center text-xs md:text-sm">
                      {member.position}
                    </p>
                  </div>
                  <motion.div
                    className={`absolute inset-0 bg-customYellow bg-opacity-70 flex items-center justify-center rounded-lg transition-opacity duration-300 ${
                      activeSubIndex === index
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    <div className="text-white text-center px-4 w-full">
                      <h4 className="text-lg md:text-xl font-bold">
                        {member.name}
                      </h4>
                      <p className="text-sm md:text-md">{member.position}</p>
                      <p className="text-xs md:text-sm mt-2">
                        {member.qualifications}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <SubContact />
    </div>
  );
};

export default TeamMembers;
