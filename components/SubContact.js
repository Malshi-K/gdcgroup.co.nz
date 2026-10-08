// components/SubContact.js
"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { BlueprintGrid } from "@/components/home/homeTheme";

const SubContact = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect(); // Stop observing once the animation is triggered
          }
        });
      },
      { threshold: 0.2 } // Adjust the threshold as needed
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`bg-off-white py-12 md:py-16 ${isVisible ? "animate-fade-in" : ""}`}
    >
      <div className="site-x">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Complete Professional Package Section */}
          <div
            className={`relative overflow-hidden bg-primary-navy rounded-2xl text-center p-6 md:p-8 h-[300px] md:h-[350px] flex flex-col justify-center ${
              isVisible ? "animate-slide-in-left" : ""
            }`}
          >
            <BlueprintGrid />
            <h2 className="relative text-2xl md:text-3xl font-bold text-white mb-4">
              Complete Professional Package
            </h2>
            <p className="relative text-md md:text-lg text-light-blue mb-4 md:mb-6">
              Have a look at our services that we provide
            </p>
            <div className="relative flex justify-center">
              <Link
                href="/services"
                className="btn-primary btn-sm"
              >
                View Services
              </Link>
            </div>
          </div>

          {/* Worked With Us Lately Section */}
          <div
            className={`bg-primary-blue rounded-2xl p-6 md:p-8 h-[300px] md:h-[350px] text-center flex flex-col justify-center ${
              isVisible ? "animate-slide-in-right" : ""
            }`}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Worked With Us Lately?
            </h2>
            <p className="text-md md:text-lg text-white">
              GDC would love to hear from you and your experience with GDC
              Group. All feedback is appreciated and used to help GDC
              Group to provide the best services to you in the future.
              Feel free to send us a message or contact us on{" "}
              <a href="tel:078380090" className="underline">
                07 838 0090
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubContact;
