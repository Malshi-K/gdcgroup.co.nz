"use client";
import React, { useRef, useEffect } from "react";
import Image from "next/image";

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
    <div className="w-full max-w-6xl mx-auto py-16">
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Left side - Award image */}
        <div className="w-full md:w-2/5 flex justify-center">
          {/* Video with autoplay and loop */}
          <div className="relative mb-6">
            <video
              ref={videoRef}
              className="w-full rounded-lg"
              playsInline
              muted
              loop
              autoPlay
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* Right side - Content */}
        <div className="w-full md:w-3/5">
          {/* Title */}
          <h1 className="text-3xl font-bold text-customBlue mb-4">
            {awardTitle} for {projectName}
          </h1>

          {/* Divider line */}
          <div className="border-t border-gray-300 my-6"></div>

          {/* Description text */}
          <p className="text-xl text-[#727D73]">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default AwardAnnouncement;
