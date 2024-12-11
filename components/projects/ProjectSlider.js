"use client"
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import "@/app/globals.css";
import projectsData from "@/app/data/projectsData.json";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const ProjectSlider = () => {
  const [currentProject, setCurrentProject] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All Projects");
  const [selectedSector, setSelectedSector] = useState(null);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [userInactiveTimeout, setUserInactiveTimeout] = useState(null);
  const sliderRef = useRef(null);

  const sectorCategories = [
    "Heritage",
    "Accommodation",
    "Educational",
    "Cultural",
    "Medical",
    "Council",
  ];

  const categories = [
    "All Projects",
    ...projectsData.map((item) => item.category),
  ];

  const filterProjects = (category, sector) => {
    let filtered = projectsData.flatMap((item) => item.projects);

    if (category !== "All Projects") {
      filtered = filtered.filter((project) =>
        projectsData
          .find((cat) => cat.category === category)
          ?.projects.includes(project)
      );
    }

    if (sector) {
      filtered = filtered.filter((project) => project.sector === sector);
    }

    setFilteredProjects(filtered);
    setCurrentProject(filtered[0] || null);
    setActiveIndex(0);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    filterProjects(category, selectedSector);
  };

  useEffect(() => {
    let interval;
    if (isAutoScrolling && filteredProjects.length > 1) {
      interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % filteredProjects.length);
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [isAutoScrolling, filteredProjects.length]);

  useEffect(() => {
    setCurrentProject(filteredProjects[activeIndex]);
  }, [activeIndex, filteredProjects]);

  const scrollToActiveImage = () => {
    if (!sliderRef.current) return;
    const slider = sliderRef.current;
    const images = slider.getElementsByClassName("carousel-image");

    const activeImage = images[activeIndex];
    const offsetLeft =
      activeImage.offsetLeft -
      slider.clientWidth / 2 +
      activeImage.clientWidth / 2;
    slider.scrollTo({ left: offsetLeft, behavior: "smooth" });
  };

  useEffect(() => {
    scrollToActiveImage();
  }, [activeIndex]);

  useEffect(() => {
    filterProjects("All Projects", null);
  }, []);

  const handleUserInteraction = () => {
    // Stop auto-scrolling and clear any existing timeout
    setIsAutoScrolling(false);
    if (userInactiveTimeout) {
      clearTimeout(userInactiveTimeout);
    }

    // Set a timeout to reactivate auto-scrolling after 5 seconds of inactivity
    const timeout = setTimeout(() => {
      setIsAutoScrolling(true);
    }, 4000);

    setUserInactiveTimeout(timeout);
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % filteredProjects.length);
    handleUserInteraction(); // Handle user interaction
  };

  const handlePrev = () => {
    setActiveIndex(
      (prevIndex) =>
        (prevIndex - 1 + filteredProjects.length) % filteredProjects.length
    );
    handleUserInteraction(); // Handle user interaction
  };

  return (
    <>
      <div className="flex flex-wrap justify-center pt-6 m-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`px-4 py-2 rounded-full m-1 md:m-2 transition duration-300 ease-in-out transform hover:scale-105 ${
              selectedCategory === category
                ? sectorCategories.includes(category)
                  ? "bg-customYellow text-white shadow-lg"
                  : "bg-customBlue text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-customBlue hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <section className="pb-10">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 xl:px-16">
          {filteredProjects.length > 0 ? (
            <>
              <div
                className={`relative flex items-center ${
                  filteredProjects.length === 1 ? "justify-center" : ""
                }`}
              >
                {filteredProjects.length > 1 && (
                  <button
                    className="absolute left-0 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-200"
                    onClick={handlePrev}
                  >
                    <ChevronLeftIcon className="h-6 w-6 text-customBlue" />
                  </button>
                )}

                <div
                  ref={sliderRef}
                  className={`relative flex gap-8 overflow-x-auto scrollbar-hide py-6 ${
                    filteredProjects.length === 1 ? "justify-center" : "mx-10"
                  }`}
                  style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                  }}
                >
                  {filteredProjects.map((project, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setActiveIndex(index);
                        setCurrentProject(project);
                        handleUserInteraction(); // Stop auto-scrolling on manual click
                      }}
                      className={`carousel-image relative flex-shrink-0 w-[500px] h-[350px] transition-transform duration-500 cursor-pointer ${
                        index === activeIndex ? "scale-110" : "scale-100"
                      }`}
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        layout="fill"
                        objectFit="cover"
                        className="object-cover w-full h-full"
                        priority={index === activeIndex}
                      />
                    </div>
                  ))}
                </div>

                {filteredProjects.length > 1 && (
                  <button
                    className="absolute right-0 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-200"
                    onClick={handleNext}
                  >
                    <ChevronRightIcon className="h-6 w-6 text-customBlue" />
                  </button>
                )}
              </div>

              <div className="mt-8 text-center">
                <h3 className="text-2xl font-semibold text-customBlue mb-2">
                  {currentProject?.title}
                </h3>
                <p className="text-sm max-w-xl mx-auto text-customBlue text-center mb-2">
                  {currentProject?.jobDescription}
                </p>
                <p className="text-sm max-w-xl mx-auto text-customBlue text-center">
                  {currentProject?.description}
                </p>
              </div>
            </>
          ) : (
            <p className="text-center text-lg text-gray-600 py-20">
              Projects coming soon.
            </p>
          )}
        </div>
      </section>     
    </>
  );
};

export default ProjectSlider;
