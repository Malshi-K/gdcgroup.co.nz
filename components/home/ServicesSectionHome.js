"use client";

// Homepage-only services section (technical / blueprint style experiment).
// The shared ServicesSection is left untouched because /services also uses it.
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { services } from "./ServicesSection";
import { Eyebrow, Crosshair, TrussArt, BuildingFrameArt } from "./homeTheme";

const ServicesSectionHome = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { root: null, threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative overflow-hidden bg-off-white py-16 md:py-24"
    >
      <Crosshair className="absolute left-6 top-6 hidden opacity-40 md:block" />
      <Crosshair className="absolute right-6 top-6 hidden opacity-40 md:block" />
      <Crosshair className="absolute bottom-6 left-6 hidden opacity-40 md:block" />

      <div className="site-x relative">
        <div
          className={`relative mx-auto mb-12 max-w-3xl text-center transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none ${
            isVisible ? "opacity-100 transform-none" : "opacity-0 translate-y-5"
          }`}
        >
          <TrussArt className="pointer-events-none absolute -left-72 top-2 hidden w-64 opacity-60 xl:block" />
          <BuildingFrameArt className="pointer-events-none absolute -right-60 -top-6 hidden w-40 opacity-50 xl:block" />
          <Eyebrow center>What We Do</Eyebrow>
          <h1 className="mt-2 text-3xl font-bold uppercase text-primary-blue">
            Our Expertise and Services
          </h1>
          <h2 className="text-md mt-3 tracking-wide text-primary-navy">
            At GDC Group, we provide a comprehensive range of specialist
            engineering services to support the successful delivery of building,
            infrastructure and development projects across New Zealand. Explore
            our services to find the right expertise for your project.
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                prefetch={true}
                className={`group relative flex flex-col rounded-xl border border-light bg-white p-5 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-primary-blue hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0 md:p-6 ${
                  isVisible ? "opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 40}ms` : "0ms",
                }}
              >
                <IconComponent
                  className="h-9 w-9 text-primary-blue"
                  aria-hidden="true"
                />
                <h4 className="mt-4 text-base font-semibold text-primary-navy">
                  {service.title}
                </h4>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-blue">
                  View More
                  <ArrowRightIcon
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSectionHome;
