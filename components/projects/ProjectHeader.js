// components/ProjectHeader.js
import React from "react";
import Image from "next/image";

const ProjectHeader = () => {
  return (
    <section className="bg-off-white w-full py-10 md:py-16 transition-all duration-500 ease-in-out">
      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-10 site-x">
        {/* Left Content Column */}
        <div className="flex flex-col space-y-3 md:space-y-4 animate-fade-in-up text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-blue leading-tight animate-slide-in-left">
            Our Projects
          </h1>
          <h2 className="text-xl md:text-2xl text-primary-navy font-semibold animate-slide-in-right">
            Experience That Delivers
          </h2>
          <div className="space-y-3 text-sm md:text-base text-secondary leading-relaxed animate-fade-in-up">
            <p>Our project portfolio reflects the depth of experience, technical expertise and commitment our team brings to every project.</p>
            <p>Across engineering, architecture and the built environment, our team has contributed to a diverse range of projects throughout New Zealand. From commercial and residential developments to infrastructure and community projects, our experience spans a wide range of sectors, scales and challenges.</p>
            <p>The projects showcased here represent the collective experience of our team, including work delivered through previous business entities and throughout our professional history.</p>
            <p>We bring this established knowledge and experience into every new project — combining practical expertise, innovative thinking and a strong focus on delivering outcomes that make a lasting difference for our clients and communities.</p>
          </div>
        </div>

        {/* Right Image Column */}
        <div className="relative w-full h-64 md:h-auto overflow-hidden rounded-lg shadow-lg animate-zoom-in">
          <Image
            src="/images/projects/website-home-page-edit.webp" // Replace with your actual image path
            alt="Our Projects"
            width={700} // Set the desired width of the image
            height={500} // Set the desired height of the image
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" // Adding scale on hover for effect
          />
        </div>
      </div>
    </section>
  );
};

export default ProjectHeader;
