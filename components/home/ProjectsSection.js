"use client"
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import projectsData from "@/app/data/projectsData.json";

const ProjectsSection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animationTriggered, setAnimationTriggered] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
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

  const animations = {
    title: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
      }
    },
    card: {
      hidden: { opacity: 0, y: 50 },
      visible: (index) => ({
        opacity: 1,
        y: 0,
        transition: { 
          duration: 0.5, 
          ease: "easeOut",
          delay: index * 0.1
        }
      })
    }
  };

  return (
    <section ref={sectionRef} className="py-16 bg-[#F3F5F6] overflow-hidden">
      <motion.div
        className="text-center mb-12 px-6 md:px-10 xl:px-16"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={animations.title}
      >
        <h2 className="text-4xl text-customYellow uppercase font-bold mt-2">
          Explore Our Portfolio
        </h2>
        <h3 className="text-md text-customBlue tracking-wide max-w-3xl mx-auto">
          Our portfolio showcases the diverse range of successful projects we&apos;ve
          completed across New Zealand. From large-scale commercial developments
          to smaller residential builds.
        </h3>
      </motion.div>

      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            className="relative bg-white shadow-md rounded-lg overflow-hidden group transform transition-transform duration-500 ease-in-out hover:shadow-lg"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={animations.card}
            custom={index}
          >
            <div className="relative w-full h-48">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300 rounded-lg"
                loading={index < 3 ? "eager" : "lazy"}
                quality={75}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSAyVC1ELjAsQU5MTlAvRWFGS0VKU0ZPVk9gZGR4Y0tgiXBfcXR4c2z/2wBDARUXFx4aHR4eHWxvQkJsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGz/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-3 bg-white/90 backdrop-blur-sm group-hover:bg-white transition duration-300">
              <span className="text-xs font-semibold uppercase text-customBlue bg-customYellow/30 px-2 py-1 rounded-md">
                {project.category}
              </span>
              <h4 className="text-lg text-customBlue font-semibold mt-2 line-clamp-1">
                {project.title}
              </h4>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Link 
          href="/portfolio/all-projects"
          className="bg-customYellow text-white font-semibold px-6 py-3 rounded-md hover:bg-customBlue transition duration-300 transform hover:scale-105"
        >
          View All Projects
        </Link>
      </div>
    </section>
  );
};

export default ProjectsSection;