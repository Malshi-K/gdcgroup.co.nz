"use client"
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import projectsData from "@/app/data/projectsData.json";

const ProjectsSection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animationTriggered, setAnimationTriggered] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Pre-load projects immediately to prevent layout shifts
    const uniqueProjects = projectsData.reduce((acc, category) => {
      const firstUniqueProject = category.projects.find(
        project => !acc.some(p => p.title === project.title)
      );
      
      if (firstUniqueProject) {
        acc.push({
          ...firstUniqueProject,
          category: category.category,
        });
      }
      return acc;
    }, []);

    setProjects(uniqueProjects);
  }, []);

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
        rootMargin: '50px'
      }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [animationTriggered]);

  return (
    <section ref={sectionRef} className="py-16 bg-[#F3F5F6] overflow-hidden">
      <div
        className={`text-center mb-12 px-6 md:px-10 xl:px-16 transition-opacity duration-600 ease-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ transform: 'translateZ(0)' }} // Force GPU acceleration
      >
        <h2 className="text-4xl text-customYellow uppercase font-bold mt-2">
          Explore Our Portfolio
        </h2>
        <h3 className="text-md text-customBlue tracking-wide max-w-3xl mx-auto">
          Our portfolio showcases the diverse range of successful projects we&apos;ve
          completed across New Zealand. From large-scale commercial developments
          to smaller residential builds.
        </h3>
      </div>

      {/* Pre-allocate grid space even if content is not yet visible */}
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
        {projects.map((project, index) => (
          <div
            key={project.title}
            className={`relative bg-white shadow-md rounded-lg overflow-hidden group transform transition-opacity duration-500 ease-in-out hover:shadow-lg ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{ 
              transitionDelay: `${index * 100}ms`,
              height: 'auto',      // Ensure consistent height
              transform: 'translateZ(0)' // Force GPU acceleration
            }}
          >
            {/* Image container with fixed aspect ratio to prevent layout shifts */}
            <div className="relative w-full pb-[56.25%]"> {/* 16:9 aspect ratio */}
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
                priority={index < 3} // Better than "eager" loading for first 3 images
                quality={80} // Slightly reduce quality for better performance
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSAyVC1ELjAsQU5MTlAvRWFGS0VKU0ZPVk9gZGR4Y0tgiXBfcXR4c2z/2wBDARUXFx4aHR4eHWxvQkJsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGz/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
            </div>

            {/* Project info container with fixed heights */}
            <div className="p-4 h-auto" style={{ minHeight: '120px' }}>
              <span className="text-xs font-semibold uppercase text-customBlue bg-customYellow/30 px-2 py-1 rounded-md">
                {project.category}
              </span>
              <h4 className="text-lg text-customBlue font-semibold mt-2">
                {project.title}
              </h4>
              {project.description && (
                <p className="text-sm text-gray-600 mt-2 line-clamp-2 h-10"> {/* Fixed height for description */}
                  {project.description}
                </p>
              )}              
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