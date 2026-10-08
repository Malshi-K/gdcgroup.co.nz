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
      title: "Engineering Better Outcomes",
      tagline: "Your vision. Our expertise.",
      paragraphs: [
        "GDC Group is a New Zealand engineering consultancy delivering practical, innovative and technically robust solutions for building, infrastructure and development projects.",
        "We combine specialist engineering knowledge with a collaborative, client-focused approach to solve complex challenges, manage risk and deliver outcomes that stand the test of time.",
        "Our success is built on three principles: **technical excellence, practical thinking and trusted relationships.**",
      ],
    },
    {
      id: 2,
      title: "Engineering with Purpose",
      paragraphs: [
        "We believe good engineering goes beyond meeting technical requirements. It is about creating solutions that are safe, efficient, resilient and responsible — delivering long-term value for our clients and the communities we serve.",
        "Sustainability, considered design and responsible decision-making are embedded in the way we approach our projects, from early planning and design through to construction and delivery.",
      ],
    },
    {
      id: 3,
      title: "Who We Are",
      paragraphs: [
        "GDC Group brings together experienced engineering professionals with a shared commitment to quality, integrity and service.",
        "We work closely with clients, architects, contractors, developers and project teams to understand the challenges behind every project and provide clear, practical engineering advice.",
        "Our relationships are built on trust, communication and accountability. We take pride in delivering work that meets the highest professional standards while providing solutions that are practical to build, efficient to deliver and designed for the future.",
      ],
      closing:
        "At GDC Group, we don't just engineer projects — we help shape better outcomes for New Zealand.",
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
                  {member.tagline && (
                    <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-blue">
                      {member.tagline}
                    </p>
                  )}
                  <div className="space-y-3 text-secondary">
                    {member.paragraphs.map((text) => (
                      <p key={text}>
                        {text.split("**").map((part, n) =>
                          n % 2 ? (
                            <strong key={n} className="font-semibold text-primary-navy">
                              {part}
                            </strong>
                          ) : (
                            part
                          ),
                        )}
                      </p>
                    ))}
                  </div>
                  {member.closing && (
                    <p className="mt-4 border-t border-light pt-4 font-semibold text-primary-navy">
                      {member.closing}
                    </p>
                  )}
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
