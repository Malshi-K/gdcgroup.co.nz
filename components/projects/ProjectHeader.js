// components/ProjectHeader.js
import React from "react";
import Image from "next/image";
import { Eyebrow, BlueprintGrid } from "@/components/home/homeTheme";

const ProjectHeader = () => {
  return (
    <section className="relative z-10 w-full overflow-hidden bg-primary-navy [clip-path:polygon(0_0,100%_0,100%_calc(100%-20px),0_100%)] md:[clip-path:polygon(0_0,100%_0,100%_calc(100%-56px),0_100%)]">
      <BlueprintGrid className="z-[1]" />
      <div className="relative">
        {/* Content */}
        <div className="site-x relative z-10 flex flex-col justify-center pb-24 pt-36 md:min-h-[600px] md:pb-40 md:pt-44">
          <div className="flex max-w-2xl flex-col space-y-3 text-center animate-fade-in-up md:space-y-4 md:text-left">
            <Eyebrow tone="dark">Our Portfolio</Eyebrow>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight animate-slide-in-left">
              Our Projects
            </h1>
            <h2 className="text-xl md:text-2xl text-light-blue font-semibold animate-slide-in-right">
              Experience That Delivers
            </h2>
            <div className="space-y-3 text-sm md:text-base text-light-blue leading-relaxed animate-fade-in-up">
              <p>Our project portfolio reflects the depth of experience, technical expertise and commitment our team brings to every project.</p>
              <p>Across engineering, architecture and the built environment, our team has contributed to a diverse range of projects throughout New Zealand. From commercial and residential developments to infrastructure and community projects, our experience spans a wide range of sectors, scales and challenges.</p>
              <p>The projects showcased here represent the collective experience of our team, including work delivered through previous business entities and throughout our professional history.</p>
              <p>We bring this established knowledge and experience into every new project — combining practical expertise, innovative thinking and a strong focus on delivering outcomes that make a lasting difference for our clients and communities.</p>
            </div>
          </div>
        </div>

        {/* Background image, blended into the content */}
        <div className="hero-fade relative h-64 md:absolute md:inset-y-0 md:right-0 md:h-auto md:w-[58%]">
          <Image
            src="/images/projects/website-home-page-edit.webp"
            alt="Our Projects"
            fill
            priority
            sizes="(min-width: 768px) 58vw, 100vw"
            className="object-cover opacity-80"
          />
        </div>
      </div>
    </section>
  );
};

export default ProjectHeader;
