"use client";
import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const AwardAnnouncement = ({
  awardTitle,
  projectName,
  description,
  awardImageSrc,
  videoSrc,
}) => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Set up the video to autoplay and loop when component mounts
    if (videoRef.current) {
      videoRef.current.autoplay = true;
      videoRef.current.loop = true;
      videoRef.current.muted = true; // Most browsers require muted for autoplay
      videoRef.current.play().catch((error) => {
        console.log("Autoplay prevented:", error);
      });
    }
  }, []);

  return (
    <section className="px-4 sm:px-6 lg:px-0 py-20">
      <div className="max-w-screen-xl mx-auto">
        <div className="bg-white">
          <div className="flex flex-col md:flex-row items-center">
            {/* Left side - Award image */}
            <div className="w-full md:w-2/5 flex justify-left">
              <div className="relative">
                <Image
                  src={awardImageSrc}
                  alt="Award Badge"
                  width={300}
                  height={300}
                  className="object-contain"
                />
              </div>
            </div>

            {/* Right side - Content */}
            <div className="w-full text-center md:text-left">
              {/* Title */}
              <Link href="https://www.commercialprojectawards.co.nz/CPA/Entries%20and%20Results/2025_Entries/Health/CPA/Results/Entries_2025/Health.aspx?hkey=67b987f8-f081-4728-9ef5-60be40c5c7df">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-customBlue mb-4 leading-tight tracking-wide">
                  {awardTitle} for {projectName}
                </h1>
              </Link>

              {/* Divider line */}
              <div className="border-t border-gray-300 my-6 max-w-md mx-auto md:mx-0"></div>

              {/* Description text */}
              <p className="text-lg md:text-2xl text-[#727D73] leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwardAnnouncement;
