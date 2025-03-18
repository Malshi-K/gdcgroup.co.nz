"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import "@/app/globals.css";
import projectsData from "@/app/data/projectsData.json";

const ProjectsFilterView = () => {
  const [currentProject, setCurrentProject] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All Projects");
  const [selectedSector, setSelectedSector] = useState(null);
  // Only using category filters as per requirements
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [displayProjects, setDisplayProjects] = useState([]);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const autoScrollTimeoutRef = useRef(null);
  const sliderRef = useRef(null);
  const initialScrollSetRef = useRef(false);

  // Specific category options as requested
  const categories = [
    "All Projects",
    "Structural",
    "Architectural",
    "Geotech",
    "Environmental + Planning",
    "Roading",
    "Residential",
    "Commercial",
    "Seismic",
    "Heritage",
    "Accommodation",
    "Educational",
    "Cultural",
    "Medical",
    "Council",
  ];

  // We're not using additional filter options as per requirements

  // Memoize the filter function to prevent unnecessary re-renders
  const filterProjects = useCallback((category, sector) => {
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

    // Create display projects array with duplicates for infinite scroll
    if (filtered.length > 0) {
      // Add copies of the first few items at the end and last few items at the beginning
      // This creates the illusion of an infinite loop
      const numberOfDuplicates = Math.min(3, filtered.length);
      const beginningDuplicates = filtered
        .slice(-numberOfDuplicates)
        .map((item, i) => ({
          ...item,
          _isDuplicate: true,
          _originalIndex: filtered.length - numberOfDuplicates + i,
        }));

      const endDuplicates = filtered
        .slice(0, numberOfDuplicates)
        .map((item, i) => ({
          ...item,
          _isDuplicate: true,
          _originalIndex: i,
        }));

      const display = [
        ...beginningDuplicates,
        ...filtered.map((item, i) => ({
          ...item,
          _isDuplicate: false,
          _originalIndex: i,
        })),
        ...endDuplicates,
      ];

      setDisplayProjects(display);

      // Set active index to first real item (after duplicates)
      setActiveIndex(numberOfDuplicates);
      setCurrentProject(filtered[0] || null);
    } else {
      setDisplayProjects([]);
      setCurrentProject(null);
    }
  }, []);

  // Handle filter selections
  const handleCategoryClick = useCallback(
    (category) => {
      setSelectedCategory(category);
      filterProjects(category, selectedSector);
      initialScrollSetRef.current = false;
    },
    [filterProjects, selectedSector]
  );

  const handleSectorClick = useCallback(
    (sector) => {
      const newSector = selectedSector === sector ? null : sector;
      setSelectedSector(newSector);
      filterProjects(selectedCategory, newSector);
      initialScrollSetRef.current = false;
    },
    [filterProjects, selectedCategory, selectedSector]
  );

  // Auto-scrolling effect with infinite loop handling
  useEffect(() => {
    let interval;
    if (isAutoScrolling && filteredProjects.length > 1) {
      interval = setInterval(() => {
        setActiveIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;

          // If we're on the last real item, don't increment beyond duplicates
          if (prevIndex === displayProjects.length - 4) {
            // Reset scroll position to create illusion of continuity
            if (sliderRef.current) {
              const firstRealItemIndex = 3;
              const firstRealItem =
                sliderRef.current.children[firstRealItemIndex];

              if (firstRealItem) {
                const newScrollPosition =
                  firstRealItem.offsetLeft -
                  sliderRef.current.clientWidth / 2 +
                  firstRealItem.clientWidth / 2;

                // Immediately jump to the beginning duplicate without animation
                sliderRef.current.scrollLeft = newScrollPosition;
                return firstRealItemIndex;
              }
            }
            return 3; // Return to first real item index
          }

          return nextIndex;
        });
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [isAutoScrolling, filteredProjects.length, displayProjects.length]);

  // Set up initial scroll position
  useEffect(() => {
    if (
      sliderRef.current &&
      displayProjects.length > 0 &&
      !initialScrollSetRef.current
    ) {
      // Get the first non-duplicate item (should be at index 3 if we added 3 duplicates at the start)
      const targetIndex = Math.min(3, displayProjects.length - 1);
      const targetItem = sliderRef.current.children[targetIndex];

      if (targetItem) {
        const offsetLeft =
          targetItem.offsetLeft -
          sliderRef.current.clientWidth / 2 +
          targetItem.clientWidth / 2;

        sliderRef.current.scrollLeft = offsetLeft;
        initialScrollSetRef.current = true;
      }
    }
  }, [displayProjects]);

  // Update current project when activeIndex changes
  useEffect(() => {
    if (displayProjects[activeIndex]) {
      const originalIndex = displayProjects[activeIndex]._originalIndex;
      setCurrentProject(filteredProjects[originalIndex]);
    }
  }, [activeIndex, displayProjects, filteredProjects]);

  // Scroll to active image
  const scrollToActiveImage = useCallback(() => {
    if (!sliderRef.current || displayProjects.length === 0) return;

    const slider = sliderRef.current;
    const activeItem = slider.children[activeIndex];

    if (!activeItem) return;

    const offsetLeft =
      activeItem.offsetLeft -
      slider.clientWidth / 2 +
      activeItem.clientWidth / 2;

    // Handle loop transition for beginning/end
    if (displayProjects[activeIndex]._isDuplicate) {
      // Find the corresponding original item
      const originalIndex = displayProjects[activeIndex]._originalIndex;
      const correspondingDisplayIndex = originalIndex + 3; // Adjust based on your duplicate count

      // If we're at a beginning duplicate
      if (activeIndex < 3) {
        // Smoothly scroll to the duplicate
        slider.scrollTo({
          left: offsetLeft,
          behavior: "smooth",
        });

        // Then wait for animation to complete and immediately jump to original item
        setTimeout(() => {
          setActiveIndex(correspondingDisplayIndex);

          // Find the real item and its position
          const realItem = slider.children[correspondingDisplayIndex];
          if (realItem) {
            const realOffsetLeft =
              realItem.offsetLeft -
              slider.clientWidth / 2 +
              realItem.clientWidth / 2;

            // Immediately jump without animation
            slider.scrollLeft = realOffsetLeft;
          }
        }, 500);
      }
      // If we're at an end duplicate
      else if (activeIndex >= displayProjects.length - 3) {
        // Smoothly scroll to the duplicate
        slider.scrollTo({
          left: offsetLeft,
          behavior: "smooth",
        });

        // Then wait for animation to complete and immediately jump to original item
        setTimeout(() => {
          setActiveIndex(correspondingDisplayIndex);

          // Find the real item and its position
          const realItem = slider.children[correspondingDisplayIndex];
          if (realItem) {
            const realOffsetLeft =
              realItem.offsetLeft -
              slider.clientWidth / 2 +
              realItem.clientWidth / 2;

            // Immediately jump without animation
            slider.scrollLeft = realOffsetLeft;
          }
        }, 500);
      }
    } else {
      // Normal smooth scrolling for non-duplicate items
      slider.scrollTo({
        left: offsetLeft,
        behavior: "smooth",
      });
    }
  }, [activeIndex, displayProjects]);

  // Scroll when activeIndex changes
  useEffect(() => {
    scrollToActiveImage();
  }, [activeIndex, scrollToActiveImage]);

  // Initial load
  useEffect(() => {
    filterProjects("All Projects", null);
  }, [filterProjects]);

  // Handle user interaction
  const handleUserInteraction = useCallback(() => {
    // Stop auto-scrolling and clear any existing timeout
    setIsAutoScrolling(false);

    if (autoScrollTimeoutRef.current) {
      clearTimeout(autoScrollTimeoutRef.current);
    }

    // Set a timeout to reactivate auto-scrolling after 4 seconds of inactivity
    autoScrollTimeoutRef.current = setTimeout(() => {
      setIsAutoScrolling(true);
    }, 4000);
  }, []);

  // Navigation handlers
  const handleNext = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % displayProjects.length);
    handleUserInteraction();
  }, [displayProjects.length, handleUserInteraction]);

  const handlePrev = useCallback(() => {
    setActiveIndex(
      (prevIndex) =>
        (prevIndex - 1 + displayProjects.length) % displayProjects.length
    );
    handleUserInteraction();
  }, [displayProjects.length, handleUserInteraction]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleNext, handlePrev]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (autoScrollTimeoutRef.current) {
        clearTimeout(autoScrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row max-w-screen-xl mx-auto px-4 py-8 h-full">
      {/* Left Side - Filter Options */}
      <div className="w-full md:w-1/4 p-4 md:sticky md:top-4 md:h-fit">
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <h2 className="text-xl font-semibold text-customBlue mb-4">
            Filter projects
          </h2>

          {/* Categories Filter */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-customBlue">
                Filter By Category
              </h3>
              <svg
                className="w-4 h-4 text-customBlue"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
            <div className="pl-2">
              {categories.map((category) => (
                <div key={category} className="mb-2">
                  <button
                    onClick={() => handleCategoryClick(category)}
                    className={`text-left w-full py-1 px-2 rounded ${
                      selectedCategory === category
                        ? "bg-customBlue text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {category}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Projects Display */}
      <div className="w-full md:w-3/4 p-4">
        {filteredProjects.length > 0 ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto max-h-[calc(100vh-150px)] pr-2"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <style jsx global>{`
              ::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {filteredProjects.map((project, index) => (
              <div
                key={`grid-project-${index}`}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => {
                  // Find the corresponding index in displayProjects
                  const displayIndex = displayProjects.findIndex(
                    (p) => !p._isDuplicate && p._originalIndex === index
                  );
                  if (displayIndex !== -1) {
                    setActiveIndex(displayIndex);
                    handleUserInteraction();
                  }
                }}
              >
                <div className="relative h-64">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={90}
                    priority={index < 4}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-customBlue mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {project.jobDescription}
                  </p>
                  <p className="text-sm text-gray-800 mb-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.sector && (
                      <span className="px-2 py-1 bg-customYellow text-white text-xs rounded-full">
                        {project.sector}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-10 text-center">
            <p className="text-center text-lg text-gray-600 py-10">
              Projects coming soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsFilterView;
