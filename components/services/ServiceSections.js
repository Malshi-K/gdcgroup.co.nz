"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaMinus, FaRegCircle } from "react-icons/fa";

const ServiceSections = ({ sections }) => {
  // State to keep track of the selected section, initialized conditionally
  const [activeSection, setActiveSection] = useState(
    sections && sections.length > 0 ? sections[0].id : null
  );

  useEffect(() => {
    // Update the active section if the sections prop changes
    if (sections && sections.length > 0) {
      setActiveSection(sections[0].id);
    }
  }, [sections]);

  // Function to handle section change
  const handleSectionClick = (id) => {
    setActiveSection(id);
  };

  // Find the currently active section content
  const activeContent = sections?.find(
    (section) => section.id === activeSection
  );

  // Check if there are no sections available
  if (!sections || sections.length === 0) {
    return <p>No sections available.</p>;
  }

  return (
    <div className="flex flex-col lg:flex-row px-4 lg:px-20 py-6">
      {/* Left side: list of section titles */}
      <div className="lg:w-1/4 p-4 overflow-auto max-h-[500px]">
        <ul className="space-y-4">
          {sections.map((section) => (
            <li
              key={section.id}
              className={`cursor-pointer p-2 text-sm lg:text-md rounded-md flex items-center text-customBlue transition-all duration-300 ${
                activeSection === section.id ? "font-semibold" : ""
              } hover:text-customYellow hover:scale-105`}
              onClick={() => handleSectionClick(section.id)}
            >
              <FaMinus className="mr-2 text-customBlue" />
              {section.title || "Untitled Section"}
            </li>
          ))}
        </ul>
      </div>

      {/* Right side: section content */}
      <div className="lg:w-3/4 relative bg-white overflow-hidden mt-6 lg:mt-0">
        {activeContent && (
          <div className="flex flex-col items-center">
            {/* Image container with relative positioning */}
            {activeContent.image && (
              <div className="relative w-full h-48 sm:h-64 lg:h-96 mb-6">
                {/* Image component */}
                <div className="relative w-full h-full">
                  <Image
                    src={activeContent.image}
                    alt={activeContent.title || "Section image"}
                    layout="fill"
                    objectFit="contain"
                    className="object-contain"
                  />
                  
                  {/* Photo credit - positioned inside the image at the bottom */}
                  {activeContent.photoCredit && (
                    <div className="absolute bottom-4 right-4 bg-gray-800 text-white px-2 py-1 text-xs">
                      {activeContent.photoCredit}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Content Row */}
            <div className="w-full px-4 lg:px-6 flex flex-col">
              <h3 className="text-xl lg:text-2xl font-semibold mb-4 text-customBlue text-center">
                {activeContent.title || "Untitled Section"}
              </h3>
              {activeContent.description && (
                <p className="text-gray-700 mb-4 text-justify">
                  {activeContent.description}
                </p>
              )}
              {activeContent.points && activeContent.points.length > 0 && (
                <ul className="mb-4">
                  {activeContent.points.map((point, idx) => (
                    <li
                      key={idx}
                      className="text-gray-700 mb-2 flex items-start"
                    >
                      <FaRegCircle className="text-gray-600 mr-2 mt-1" />
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceSections;