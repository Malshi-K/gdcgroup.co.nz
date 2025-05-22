"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import projectsData from "@/app/data/projectsData.json";

const ProjectsSection = () => {
  const PROJECTS_TO_DISPLAY = 12;
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animationTriggered, setAnimationTriggered] = useState(false);
  const [projects, setProjects] = useState([]);

  // Check if project is the award-winning Waikato Hospital project
  const isAwardWinningProject = (title) => {
    return title.includes("Waikato Hospital Molecular Biology Laboratory");
  };

  // Find all categories that a project belongs to
  const findProjectCategories = useCallback((projectTitle) => {
    const projectCategories = [];

    // Iterate through all categories and check if the project exists in any of them
    projectsData.forEach((categoryData) => {
      const found = categoryData.projects.some(
        (project) => project.title === projectTitle
      );

      if (found) {
        projectCategories.push(categoryData.category);
      }
    });

    return projectCategories;
  }, []);

  // Fisher-Yates (Knuth) shuffle algorithm for randomizing array
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    // Process projects with isFrontPage=true and collect all their categories
    const frontPageProjectsMap = new Map();

    projectsData.forEach((categoryData) => {
      const { category } = categoryData;

      // Filter projects with isFrontPage: true
      categoryData.projects.forEach((project) => {
        if (project.isFrontPage === true) {
          const projectKey = project.title;

          if (!frontPageProjectsMap.has(projectKey)) {
            // Find all categories this project belongs to
            const allCategories = findProjectCategories(project.title);

            // New project, initialize with its data
            frontPageProjectsMap.set(projectKey, {
              ...project,
              category: category, // Original category
              categories: allCategories, // All categories it belongs to
            });
          }
        }
      });
    });

    // Convert map to array
    const allFrontPageProjects = Array.from(frontPageProjectsMap.values());
    
    // Define the specific project that should always be first
    const priorityProjectTitle = "Waikato Hospital Molecular Biology Laboratory, Hamilton, Waikato";
    
    // Find the priority project
    const priorityProject = allFrontPageProjects.find(
      project => project.title === priorityProjectTitle
    );
    
    // Get all other projects (excluding the priority one)
    const otherProjects = allFrontPageProjects.filter(
      project => project.title !== priorityProjectTitle
    );
    
    // Randomly shuffle the other projects
    const shuffledOtherProjects = shuffleArray(otherProjects);
    
    // Create the final array with priority project first
    let selectedProjects = [];
    
    if (priorityProject) {
      // Add priority project as first item
      selectedProjects.push(priorityProject);
      
      // Add up to 11 more projects from the shuffled list
      const remainingSlots = PROJECTS_TO_DISPLAY - 1;
      selectedProjects = selectedProjects.concat(
        shuffledOtherProjects.slice(0, remainingSlots)
      );
    } else {
      // If priority project is not found, fall back to original behavior
      selectedProjects = shuffleArray(allFrontPageProjects).slice(0, PROJECTS_TO_DISPLAY);
    }
    
    setProjects(selectedProjects);
  }, [findProjectCategories]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animationTriggered) {
          setIsVisible(true);
          setAnimationTriggered(true);
        }
      },
      {
        root: null,
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [animationTriggered]);

  // Add CSS for badge positioning
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      /* Badge container styles for ProjectsSection */
      .portfolio-badge-container {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 50;
        overflow: visible !important;
        transform: translate(25%, -25%);
        pointer-events: auto;
      }
      
      /* Ensure badge images are never constrained */
      .portfolio-badge-container img {
        max-width: none !important;
        border-radius: 0 !important;
      }
      
      /* Ensure card and image containers allow overflow */
      .portfolio-project-card {
        overflow: visible !important;
      }
      
      .portfolio-image-container {
        position: relative;
        overflow: visible !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-16 bg-[#F3F5F6] overflow-hidden">
      <div
        className={`text-center mb-12 px-6 md:px-10 xl:px-16 transition-opacity duration-600 ease-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ transform: "translateZ(0)" }} // Force GPU acceleration
      >
        <h2 className="text-4xl text-customYellow uppercase font-bold mt-2">
          Explore Our Portfolio
        </h2>
        <h3 className="text-md text-customBlue tracking-wide max-w-3xl mx-auto">
          Our portfolio showcases the diverse range of successful projects
          we&apos;ve completed across New Zealand. From large-scale commercial
          developments to smaller residential builds.
        </h3>
      </div>

      {/* Show message if no front page projects are found */}
      {projects.length === 0 && (
        <div className="text-center text-gray-500 py-10">
          No featured projects to display. Please check project data
          configuration.
        </div>
      )}

      {/* Projects grid */}
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
        {projects.map((project, index) => (
          <div
            key={`${project.title}-${index}`}
            className={`relative bg-white shadow-md rounded-lg overflow-hidden group transform transition-opacity duration-500 ease-in-out hover:shadow-lg portfolio-project-card ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{
              transitionDelay: `${index * 100}ms`,
              height: "auto",
              transform: "translateZ(0)", // Force GPU acceleration
            }}
          >
            {/* Image container with fixed aspect ratio */}
            <div className="relative w-full pb-[56.25%] portfolio-image-container">
              {/* 16:9 aspect ratio */}
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
                priority={index < 3}
                quality={80}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSAyVC1ELjAsQU5MTlAvRWFGS0VKU0ZPVk9gZGR4Y0tgiXBfcXR4c2z/2wBDARUXFx4aHR4eHWxvQkJsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGz/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />

              {/* Award badge overlaid on the image - only for Waikato Hospital project */}
              {isAwardWinningProject(project.title) && (
                <div className="portfolio-badge-container">
                  <Image
                    src="/images/awards/NZCPA QMs 2025_Gold.png"
                    alt="Gold Award 2025"
                    width={90}
                    height={90}
                    priority
                  />
                </div>
              )}
            </div>

            {/* Project info container */}
            <div className="p-4 h-auto" style={{ minHeight: "120px" }}>
              {/* Display category tags - similar to ProjectsFilterView */}
              <div className="flex flex-wrap gap-2 mb-2">
                {project.categories &&
                  project.categories.map((category, catIndex) => (
                    <span
                      key={`${project.title}-${category}-${catIndex}`}
                      className="text-xs font-semibold px-2 py-1 rounded-full
                              border border-customYellow text-customBlue"
                    >
                      {category}
                    </span>
                  ))}
              </div>

              <h4 className="text-lg text-customBlue font-semibold mt-2">
                {project.title}
              </h4>
              
             
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Link
          href="/portfolio/all-projects"
          className="bg-customYellow text-white font-semibold px-6 py-3 rounded-md hover:bg-customBlue transition duration-300"
        >
          View All Projects
        </Link>
      </div>
    </section>
  );
};

export default ProjectsSection;