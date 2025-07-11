// components/location-sections/FeaturedProjectsSection.js
"use client";
import React from "react";

const FeaturedProjectsSection = ({ featuredProjects }) => {
  if (
    !featuredProjects ||
    !featuredProjects.projects ||
    featuredProjects.projects.length === 0
  ) {
    return null;
  }

  const projects = featuredProjects.projects;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-customBlue text-center mb-4">
          {featuredProjects.title}
        </h2>
        <div className="w-24 h-1 bg-customYellow mx-auto mb-12"></div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Project Image */}
              <div className="relative h-64 bg-gray-200">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <div className="max-w-xs">
                      <img
                        src="/images/coming soon.png"
                        alt="coming soon"
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  </div>
                )}       

              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-customBlue mb-2 flex-1">
                    {project.name}
                  </h3>
                </div>

                <p className="text-gray-600 leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Labels/Tags */}
                {project.labels && project.labels.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.labels.map((label, labelIndex) => (
                      <span
                        key={labelIndex}
                        className="px-3 py-1 bg-customBlue text-white text-sm font-medium rounded-full"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjectsSection;