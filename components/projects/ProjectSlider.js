"use client"
import React, { useState, useEffect, useRef, useCallback } from "react";
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
  const [displayProjects, setDisplayProjects] = useState([]);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const autoScrollTimeoutRef = useRef(null);
  const sliderRef = useRef(null);
  const initialScrollSetRef = useRef(false);

  // Extract unique categories
  const categories = ["All Projects", ...new Set(projectsData.map(item => item.category))];

  // Extract unique sectors
  const sectorCategories = [
    "Heritage",
    "Accommodation",
    "Educational",
    "Cultural",
    "Medical",
    "Council",
  ];

  // Memoize the filter function to prevent unnecessary re-renders
  const filterProjects = useCallback((category, sector) => {
    let filtered = projectsData.flatMap(item => item.projects);

    if (category !== "All Projects") {
      filtered = filtered.filter(project =>
        projectsData
          .find(cat => cat.category === category)
          ?.projects.includes(project)
      );
    }

    if (sector) {
      filtered = filtered.filter(project => project.sector === sector);
    }

    setFilteredProjects(filtered);
    
    // Create display projects array with duplicates for infinite scroll
    if (filtered.length > 0) {
      // Add copies of the first few items at the end and last few items at the beginning
      // This creates the illusion of an infinite loop
      const numberOfDuplicates = Math.min(3, filtered.length);
      const beginningDuplicates = filtered.slice(-numberOfDuplicates).map((item, i) => ({
        ...item,
        _isDuplicate: true,
        _originalIndex: filtered.length - numberOfDuplicates + i
      }));
      
      const endDuplicates = filtered.slice(0, numberOfDuplicates).map((item, i) => ({
        ...item,
        _isDuplicate: true,
        _originalIndex: i
      }));
      
      const display = [
        ...beginningDuplicates,
        ...filtered.map((item, i) => ({ ...item, _isDuplicate: false, _originalIndex: i })),
        ...endDuplicates
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

  // Handle category selection
  const handleCategoryClick = useCallback((category) => {
    setSelectedCategory(category);
    filterProjects(category, selectedSector);
    initialScrollSetRef.current = false;
  }, [filterProjects, selectedSector]);

  // Auto-scrolling effect with infinite loop handling
  useEffect(() => {
    let interval;
    if (isAutoScrolling && filteredProjects.length > 1) {
      interval = setInterval(() => {
        setActiveIndex(prevIndex => {
          const nextIndex = prevIndex + 1;
          
          // If we're on the last real item, don't increment beyond duplicates
          if (prevIndex === displayProjects.length - 4) {
            // Reset scroll position to create illusion of continuity
            if (sliderRef.current) {
              const firstRealItemIndex = 3;
              const firstRealItem = sliderRef.current.children[firstRealItemIndex];
              
              if (firstRealItem) {
                const newScrollPosition = firstRealItem.offsetLeft - 
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
    if (sliderRef.current && displayProjects.length > 0 && !initialScrollSetRef.current) {
      // Get the first non-duplicate item (should be at index 3 if we added 3 duplicates at the start)
      const targetIndex = Math.min(3, displayProjects.length - 1);
      const targetItem = sliderRef.current.children[targetIndex];
      
      if (targetItem) {
        const offsetLeft = targetItem.offsetLeft - 
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
    
    const offsetLeft = activeItem.offsetLeft - 
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
          behavior: "smooth" 
        });
        
        // Then wait for animation to complete and immediately jump to original item
        setTimeout(() => {
          setActiveIndex(correspondingDisplayIndex);
          
          // Find the real item and its position
          const realItem = slider.children[correspondingDisplayIndex];
          if (realItem) {
            const realOffsetLeft = realItem.offsetLeft - 
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
          behavior: "smooth" 
        });
        
        // Then wait for animation to complete and immediately jump to original item
        setTimeout(() => {
          setActiveIndex(correspondingDisplayIndex);
          
          // Find the real item and its position
          const realItem = slider.children[correspondingDisplayIndex];
          if (realItem) {
            const realOffsetLeft = realItem.offsetLeft - 
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
        behavior: "smooth" 
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
    setActiveIndex(prevIndex => (prevIndex + 1) % displayProjects.length);
    handleUserInteraction();
  }, [displayProjects.length, handleUserInteraction]);

  const handlePrev = useCallback(() => {
    setActiveIndex(prevIndex =>
      (prevIndex - 1 + displayProjects.length) % displayProjects.length
    );
    handleUserInteraction();
  }, [displayProjects.length, handleUserInteraction]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
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
            aria-pressed={selectedCategory === category}
          >
            {category}
          </button>
        ))}
      </div>

      <section className="pb-10" aria-label="Project Showcase">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 xl:px-16">
          {filteredProjects.length > 0 ? (
            <>
              <div
                className={`relative flex items-center ${
                  filteredProjects.length === 1 ? "justify-center" : ""
                }`}
                role="region"
                aria-roledescription="carousel"
                aria-label="Project images"
              >
                {filteredProjects.length > 1 && (
                  <button
                    className="absolute left-0 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-200"
                    onClick={handlePrev}
                    aria-label="Previous project"
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
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch'
                  }}
                >
                  {displayProjects.map((project, index) => (
                    <div
                      key={`project-${index}-${project._isDuplicate ? 'dup' : 'orig'}`}
                      onClick={() => {
                        setActiveIndex(index);
                        handleUserInteraction();
                      }}
                      className={`carousel-image relative flex-shrink-0 w-[500px] h-[350px] transition-transform duration-500 cursor-pointer ${
                        index === activeIndex ? "scale-110" : "scale-100"
                      }`}
                      role="group"
                      aria-label={`Project ${project._originalIndex + 1} of ${filteredProjects.length}: ${project.title}`}
                      aria-current={index === activeIndex}
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
                    aria-label="Next project"
                  >
                    <ChevronRightIcon className="h-6 w-6 text-customBlue" />
                  </button>
                )}
              </div>

              <div className="mt-8 text-center" aria-live="polite">
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