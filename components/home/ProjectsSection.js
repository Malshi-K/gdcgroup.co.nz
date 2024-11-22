"use client"
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import projectsData from "@/data/projectsData.json";

const ProjectsSection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animationTriggered, setAnimationTriggered] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const uniqueTitles = new Set();
    const uniqueProjects = [];

    projectsData.forEach((category) => {
      const availableProjects = category.projects.filter(
        (project) => !uniqueTitles.has(project.title)
      );

      if (availableProjects.length > 0) {
        const selectedProject = availableProjects[0];
        uniqueTitles.add(selectedProject.title);
        uniqueProjects.push({
          ...selectedProject,
          category: category.category,
        });
      }
    });

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
      { root: null, threshold: 0.1 }
    );

    const currentSection = sectionRef.current;
    if (currentSection) observer.observe(currentSection);

    return () => {
      if (currentSection) observer.unobserve(currentSection);
    };
  }, [animationTriggered]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section ref={sectionRef} className="py-16 bg-[#F3F5F6] overflow-hidden">
      <motion.div
        className="text-center mb-12 px-6 md:px-10 xl:px-16"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={titleVariants}
      >
        <h2 className="text-4xl text-customYellow uppercase font-bold mt-2">
          Explore Our Portfolio
        </h2>
        <h3 className="text-md text-customBlue tracking-wide">
          Our portfolio showcases the diverse range of successful projects we’ve
          completed across New Zealand. From large-scale commercial developments
          to smaller residential builds.
        </h3>
      </motion.div>

      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="relative bg-white shadow-md rounded-lg overflow-hidden group transform transition-transform duration-500 ease-in-out"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={cardVariants}
          >
            <div className="relative w-full h-48">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300 rounded-lg"
                loading={index < 3 ? "eager" : "lazy"} // Load the first row eagerly, rest lazily                              
              />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-3 bg-white bg-opacity-80 group-hover:bg-opacity-100 transition duration-300">
              <span className="text-xs font-semibold uppercase text-customBlue bg-customYellow/30 px-2 py-1 rounded-md">
                {project.category}
              </span>
              <h4 className="text-lg text-customBlue font-semibold mt-2">
                {project.title}
              </h4>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Link href="/portfolio/all-projects" passHref legacyBehavior>
          <motion.a
            className="bg-customYellow text-white font-semibold px-6 py-3 rounded-md hover:bg-customBlue transition duration-300"
            whileHover={{ scale: 1.05 }}
          >
            View All Projects
          </motion.a>
        </Link>
      </div>
    </section>
  );
};

export default ProjectsSection;
