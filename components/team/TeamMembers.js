"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import "@/app/globals.css";
import SubContact from "@/components/SubContact";
import { teamMembers } from "@/app/data/teamMembers";

const TeamMembers = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Trigger animations after component mounts
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <header className="pt-8 pb-16 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-10">
          <h1 className="text-6xl font-bold text-center text-customBlue">
            Our Core Team
          </h1>
        </div>
      </header>
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-600 ease-out ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className={`flex flex-col items-center group transition-all duration-600 ease-out ${
                  isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative mb-4 w-full h-[450px] overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-all duration-300 group-hover:grayscale-[50%]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Overlay with qualification */}
                  <div className="absolute inset-0 bg-customYellow bg-opacity-70 flex flex-col items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h2 className="text-white text-base text-center">
                      {member.qualifications}
                    </h2>
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-customBlue mb-2">
                  {member.name}
                </h3>
                <p className="text-gray-600 text-base text-center max-w-[280px]">
                  {member.position}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SubContact />
    </div>
  );
};

export default TeamMembers;