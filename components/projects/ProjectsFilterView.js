"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import "@/app/globals.css";
import projectsData from "@/app/data/projectsData.json";

const ProjectsFilterView = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Projects");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [groupedProjects, setGroupedProjects] = useState([]);
  const [displayedProjects, setDisplayedProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const scrollContainerRef = useRef(null);
  const modalRef = useRef(null);

  // Current year for Google attribution
  const currentYear = new Date().getFullYear();

  // Number of projects to show per page
  const PROJECTS_PER_PAGE = 10;

  // Specific category options as requested
  const categories = [
    "All Projects",
    "Structural",
    "Architectural",
    "Geotechnical",
    "Planning",
    "Environmental",
    "Traffic",
    "Three Waters",
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

  // Remove duplicates for All Projects view
  const removeDuplicateProjects = useCallback((projects) => {
    const uniqueProjects = new Map();

    projects.forEach((project) => {
      const projectKey = project.title; // Use title as the unique identifier

      if (!uniqueProjects.has(projectKey)) {
        uniqueProjects.set(projectKey, project);
      }
    });

    return Array.from(uniqueProjects.values());
  }, []);

  // Group projects by title within a specific category
  const groupProjectsByTitle = useCallback(
    (projects, category) => {
      // If it's "All Projects", we need to be careful not to group across categories and remove duplicates
      if (category === "All Projects") {
        // First remove duplicates based on title
        const uniqueProjects = removeDuplicateProjects(projects);

        // Then proceed with grouping
        return groupProjectsInSingleCategory(uniqueProjects);
      } else {
        // For a specific category, just group within that category
        return groupProjectsInSingleCategory(projects);
      }
    },
    [removeDuplicateProjects]
  );

  // Helper function to group projects within a single category
  const groupProjectsInSingleCategory = (projects) => {
    // Use composite key of title + description to ensure true grouping
    const projectMap = new Map();

    // Group projects by title AND description
    projects.forEach((project) => {
      // Create a unique key using both title and description
      const projectKey = `${project.title}|${project.description || ""}`;

      if (!projectMap.has(projectKey)) {
        // Create a new group with this project as the main one
        projectMap.set(projectKey, {
          ...project,
          relatedImages: project.image ? [project.image] : [],
          mainImage: project.image || "",
        });
      } else {
        // Only add this project's image if it belongs to the same project
        // and isn't already included and the image exists
        const existingProject = projectMap.get(projectKey);
        if (
          project.image &&
          !existingProject.relatedImages.includes(project.image)
        ) {
          existingProject.relatedImages.push(project.image);
        }
      }
    });

    // Convert map to array
    return Array.from(projectMap.values());
  };

  // Memoize the filter function to prevent unnecessary re-renders
  const filterProjects = useCallback(
    (category) => {
      let filtered = [];

      if (category === "All Projects") {
        filtered = projectsData.flatMap((item) => item.projects);
      } else {
        // Find the specific category and get its projects
        const categoryData = projectsData.find(
          (cat) => cat.category === category
        );
        filtered = categoryData ? categoryData.projects : [];
      }

      setFilteredProjects(filtered);

      // Group the filtered projects by title within the selected category
      const grouped = groupProjectsByTitle(filtered, category);
      setGroupedProjects(grouped);

      // Display first page of grouped projects
      setDisplayedProjects(grouped.slice(0, PROJECTS_PER_PAGE));
      setCurrentPage(1);
    },
    [groupProjectsByTitle]
  );

  // Handle filter selections
  const handleCategoryClick = useCallback(
    (category) => {
      setSelectedCategory(category);
      filterProjects(category);

      // Scroll back to top when changing category
      window.scrollTo(0, 0);
    },
    [filterProjects]
  );

  // Handle "Show More" button click
  const handleShowMoreClick = useCallback(() => {
    // Increment current page
    setCurrentPage((prevPage) => {
      const nextPage = prevPage + 1;

      // Calculate new projects to display
      const endIndex = nextPage * PROJECTS_PER_PAGE;
      setDisplayedProjects(groupedProjects.slice(0, endIndex));

      // Smooth scroll to where the new projects will appear
      setTimeout(() => {
        const lastVisibleProjectIndex = prevPage * PROJECTS_PER_PAGE - 1;
        const lastVisibleProject = document.getElementById(
          `project-${lastVisibleProjectIndex}`
        );
        if (lastVisibleProject) {
          lastVisibleProject.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }
      }, 100);

      return nextPage;
    });
  }, [groupedProjects]);

  // Handle project click to open modal
  const handleProjectClick = useCallback((project) => {
    setSelectedProject(project);
    setShowProjectModal(true);

    // Add no-scroll class to body when modal is open
    document.body.classList.add("overflow-hidden");
  }, []);

  // Handle closing the modal
  const handleCloseModal = useCallback(() => {
    setShowProjectModal(false);
    setSelectedProject(null);

    // Remove no-scroll class from body when modal is closed
    document.body.classList.remove("overflow-hidden");
  }, []);

  // Handle clicking outside the modal to close it
  const handleOutsideClick = useCallback(
    (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleCloseModal();
      }
    },
    [handleCloseModal]
  );

  // Format job description to display "(Heritage Bricks)" on a new line
  const formatJobDescription = (description) => {
    if (!description) return null;

    if (description.includes("(Heritage Bricks)")) {
      // Split the description at "(Heritage Bricks)" and add line break
      return (
        <>
          {description.replace("(Heritage Bricks)", "")}
          <span className="block font-medium text-customYellow mt-1">
            (Heritage Bricks)
          </span>
        </>
      );
    } else if (description.includes("(Heritage early age concrete)")) {
      // Split the description at "(Heritage early age concrete)" and add line break
      return (
        <>
          {description.replace("(Heritage early age concrete)")}
          <span className="block font-medium text-customYellow mt-1">
            (Heritage early age concrete)
          </span>
        </>
      );
    }
    return description;
  };

  // Calculate remaining projects count
  const remainingProjects =
    groupedProjects.length - currentPage * PROJECTS_PER_PAGE;

  // Initial load
  useEffect(() => {
    filterProjects("All Projects");
  }, [filterProjects]);

  return (
    <div className="flex flex-col md:flex-row max-w-screen-xl mx-auto px-4 py-8">
      {/* Left Side - Filter Options */}
      <div className="w-full md:w-1/4 p-4 md:sticky md:top-4 md:self-start">
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <h2 className="text-xl font-semibold text-customBlue mb-4">
            Filter projects
          </h2>

          {/* Categories Filter - Now with max height and hidden scrollbar */}
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
            <div className="pl-2 max-h-[350px] overflow-y-auto pr-2 hide-scrollbar">
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
      <div ref={scrollContainerRef} className="w-full md:w-3/4 p-4">
        {groupedProjects.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {displayedProjects.map((project, index) => (
                <div
                  id={`project-${index}`}
                  key={`project-${index}`}
                  className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer ${
                    index >= (currentPage - 1) * PROJECTS_PER_PAGE
                      ? "animate-fadeIn"
                      : ""
                  }`}
                  onClick={() => handleProjectClick(project)}
                >
                  {/* Only show image div if project has an image */}
                  {project.mainImage && (
                    <div className="relative h-64 group">
                      <Image
                        src={project.mainImage}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        quality={90}
                        priority={index < 4}
                        className="object-cover w-full h-full"
                      />
                      {/* Image count badge - only show if there are multiple images */}
                      {project.relatedImages.length > 1 && (
                        <div className="absolute top-2 right-2 bg-customBlue text-white rounded-full p-2 text-xs font-bold flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14"
                            ></path>
                          </svg>
                          {project.relatedImages.length}
                        </div>
                      )}

                      {/* Google Street View Attribution - only show on hover if googleStreetView is true */}
                      {project.googleStreetView && (
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          Image data ©{currentYear} Google
                        </div>
                      )}
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-customBlue mb-2">
                      {project.title}
                    </h3>
                    {project.jobDescription && (
                      <p className="text-sm text-gray-600 mb-2">
                        {formatJobDescription(project.jobDescription)}
                      </p>
                    )}
                    {project.description && project.description !== "" && (
                      <p className="text-sm text-gray-800 mb-2">
                        {project.description}
                      </p>
                    )}

                    {/* Display points as a bullet list if they exist */}
                    {project.points && project.points.length > 0 && (
                      <ul className="list-disc list-inside text-sm text-gray-700 mb-3 pl-1 mt-2">
                        {project.points.map((point, pointIndex) => (
                          <li key={`point-${pointIndex}`} className="mb-1">
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="flex flex-wrap gap-2 mt-3">
                      {project.sector && (
                        <span className="px-2 py-1 bg-customYellow text-white text-xs rounded-full">
                          {project.sector}
                        </span>
                      )}
                    </div>

                    {/* View more indicator - only show if there are multiple images */}
                    {project.relatedImages.length > 1 && (
                      <div className="mt-3 text-customBlue flex items-center">
                        <span className="text-sm">
                          View all {project.relatedImages.length} images
                        </span>
                        <svg
                          className="w-4 h-4 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          ></path>
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Show More Button - Only show if there are more projects to load */}
            {remainingProjects > 0 && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleShowMoreClick}
                  className="px-6 py-3 bg-customBlue text-white rounded-lg hover:bg-customYellow transition-colors flex items-center"
                >
                  <span>
                    Show More Projects ({remainingProjects} remaining of{" "}
                    {groupedProjects.length} total)
                  </span>
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    ></path>
                  </svg>
                </button>
              </div>
            )}

            {/* Projects count indicator */}
            <div className="text-center mt-4 text-sm text-gray-600">
              Showing{" "}
              {Math.min(
                currentPage * PROJECTS_PER_PAGE,
                groupedProjects.length
              )}{" "}
              of {groupedProjects.length} projects
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-10 text-center">
            <p className="text-center text-lg text-gray-600 py-10">
              Projects coming soon.
            </p>
          </div>
        )}
      </div>

      {/* Project Modal */}
      {showProjectModal && selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={handleOutsideClick}
        >
          <div
            ref={modalRef}
            className="bg-white rounded-lg max-w-5xl w-full mx-4 max-h-[90vh] overflow-y-auto hide-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-customBlue">
                  {selectedProject.title}
                </h2>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={handleCloseModal}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>

              {selectedProject.jobDescription && (
                <p className="text-gray-600 mb-4">
                  {formatJobDescription(selectedProject.jobDescription)}
                </p>
              )}

              {selectedProject.description &&
                selectedProject.description !== "" && (
                  <p className="text-gray-800 mb-6">
                    {selectedProject.description}
                  </p>
                )}

              {/* Display points as a bullet list in modal if they exist */}
              {selectedProject.points && selectedProject.points.length > 0 && (
                <div className="mb-6">
                  <ul className="list-disc list-inside text-gray-700 pl-2">
                    {selectedProject.points.map((point, pointIndex) => (
                      <li key={`modal-point-${pointIndex}`} className="mb-2">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Only show the grid of images if there are images available */}
              {selectedProject.relatedImages &&
                selectedProject.relatedImages.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedProject.relatedImages.map((image, index) => (
                      <div
                        key={`modal-image-${index}`}
                        className="relative h-64 md:h-80 group"
                      >
                        <Image
                          src={image}
                          alt={`${selectedProject.title} - Image ${index + 1}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover rounded-lg"
                        />

                        {/* Show Google Street View attribution in modal images too */}
                        {selectedProject.googleStreetView && (
                          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            Image data ©{currentYear} Google
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsFilterView;
