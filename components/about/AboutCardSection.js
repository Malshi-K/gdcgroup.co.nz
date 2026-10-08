"use client"; // Ensure this is treated as a client component

import React, { useEffect, useState } from "react";
import Image from "next/image"; // Import Image from Next.js
import {
  StarIcon,
  GlobeAltIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { Eyebrow, BlueprintGrid, Crosshair } from "@/components/home/homeTheme";

const AboutCardSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set visible after component mounts to trigger animations
    setIsVisible(true);

    // Optional: Set up intersection observer for scroll-based animation
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 },
    );

    const section = document.getElementById("about-section");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const teamMembers = [
    {
      id: 1,
      title: "We Are Industry Leaders",
      description:
        "GDC Group is a nationwide provider of innovative solutions in all areas of the engineering process chains. Our unique success story is predicated on our core values of innovation, competency, and strict coordination on client needs.",
    },
    {
      id: 2,
      title: "We Provide Sustainable Solutions",
      description:
        "We understand the vital necessity of sustainability in everything we do. Our corporate practice is founded on ethical behavior, innovation, and ensuring the sustainability of our community and environment.",
    },
    {
      id: 3,
      title: "Who We Are",
      description:
        "Through our expertise, competency, and continuous client support, we have earned the trust of our clients. By developing long lasting partnerships and consistently providing the best possible solutions and services, we are considered industry leaders. \nAt GDC Group, we believe in having strong values and priorities in everything we do. We take responsibility for the way our work affects society and the environment, and we are constantly aiming to give back to our community.",
    },
  ];

  const cardIcons = [StarIcon, GlobeAltIcon, UserGroupIcon];
  const cardAnim = [
    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12",
    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
    isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12",
  ];

  return (
    <>
      {/* Hero */}
      <section
        id="about-section"
        className="relative z-10 overflow-hidden bg-primary-navy [clip-path:polygon(0_0,100%_0,100%_calc(100%-20px),0_100%)] md:[clip-path:polygon(0_0,100%_0,100%_calc(100%-56px),0_100%)]"
      >
        <BlueprintGrid className="z-[1]" />
        <div className="relative">
          <div className="site-x relative z-10 flex flex-col justify-center pb-24 pt-36 md:min-h-[560px] md:pb-40 md:pt-44">
            <div
              className={`max-w-xl text-center md:text-left transition-all duration-700 ease-out transform motion-reduce:transition-none ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <Eyebrow tone="dark">About Us</Eyebrow>
              <h1 className="mb-4 mt-2 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                GDC Group
              </h1>
              <h3 className="text-xl text-light-blue">
                Chartered Professional Engineers
              </h3>
            </div>
          </div>
          <div className="hero-fade relative h-64 md:absolute md:inset-y-0 md:right-0 md:h-auto md:w-[58%]">
            <Image
              src="/images/about/who-we-are.jfif"
              alt="GDC Group engineering and architectural design"
              fill
              priority
              sizes="(min-width: 768px) 58vw, 100vw"
              className="object-cover opacity-80"
            />
          </div>
        </div>
      </section>

      {/* Cards (overlap the hero edge) */}
      <section className="relative -mt-5 bg-off-white pb-14 pt-12 md:-mt-14 md:pb-20 md:pt-20">
        <Crosshair className="absolute left-6 top-8 hidden opacity-40 md:block" />
        <Crosshair className="absolute right-6 top-8 hidden opacity-40 md:block" />
        <div className="site-x flex flex-col items-stretch justify-center gap-6 md:flex-row">
          {teamMembers.map((member, i) => {
            const Icon = cardIcons[i];
            return (
              <div
                key={member.id}
                className={`flex md:w-1/3 transform flex-col transition-all duration-700 ease-out motion-reduce:transition-none ${cardAnim[i]}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="h-full rounded-2xl border border-light bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary-blue hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                  <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-blue to-primary-navy">
                    <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </span>
                  <h3 className="mb-2 text-lg font-bold text-primary-navy">
                    {member.title}
                  </h3>
                  {i === 0 && (
                    <p className="mb-2 text-secondary">
                      &ldquo;Your vision. Our expertise.&rdquo;
                    </p>
                  )}
                  <p className="text-secondary">{member.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default AboutCardSection;
