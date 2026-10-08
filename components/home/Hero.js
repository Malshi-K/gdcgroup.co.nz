"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import Image from "next/image";
import { Eyebrow, BlueprintGrid, Crosshair } from "./homeTheme";

const Hero = () => {
  const router = useRouter();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef(null);

  // Your Cloudinary video URL
  const CLOUDINARY_URL =
    "https://res.cloudinary.com/dt7jcrlid/video/upload/v1/Hero_chfop8.webm";

  // Optimized URL with quality and format parameters
  const OPTIMIZED_URL = `${CLOUDINARY_URL.replace("/upload/", "/upload/q_auto,f_auto/")}`;

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Run on initial load
    checkMobile();

    // Set up listener for window resize
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    router.prefetch("/locations");
    router.prefetch("/portfolio/all-projects");

    // Only set up video loading if not on mobile
    if (!isMobile) {
      // Implement lazy loading with Intersection Observer
      const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoRef.current) {
            // Only start loading the video when it's in viewport
            videoRef.current.src = OPTIMIZED_URL;
            videoRef.current.load();
            observer.unobserve(entry.target);
          }
        });
      }, options);

      if (videoRef.current) {
        observer.observe(videoRef.current);
      }

      return () => {
        if (videoRef.current) {
          observer.unobserve(videoRef.current);
        }
      };
    }
  }, [router, isMobile, OPTIMIZED_URL]);

  return (
    <>
      <Head>
        <title>GDC Group: Your Engineering Partner for Success</title>
        <meta
          name="description"
          content="GDC Group offers expert engineering consulting services, delivering innovative solutions tailored to meet your project's unique needs and challenges."
        />
        {/* Explicitly preload critical assets */}
        <link rel="preload" href="/images/hero-poster.webp" as="image" />

        {/* Add preconnect to Cloudinary for faster video loading (only if not mobile) */}
        {!isMobile && (
          <>
            <link rel="preconnect" href="https://res.cloudinary.com" />
            <link rel="dns-prefetch" href="https://res.cloudinary.com" />
          </>
        )}

        {/* Font preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </Head>

      {/* Fixed height container to prevent layout shift */}
      <section className="relative z-10 h-[440px] sm:h-[440px] md:h-[480px] lg:h-[540px] overflow-hidden bg-primary-navy [clip-path:polygon(0_0,100%_0,100%_calc(100%-20px),0_100%)] md:[clip-path:polygon(0_0,100%_0,100%_calc(100%-56px),0_100%)]">
        {/* Content overlay - now with fixed positioning rather than absolute */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-navy/90 via-primary-navy/75 to-primary-navy/55 flex items-center justify-center text-center md:text-left z-10">
          <BlueprintGrid />
          <Crosshair
            tone="dark"
            className="absolute right-6 top-24 hidden opacity-50 md:block"
          />
          <div className="relative w-full site-x pt-24 pb-12 sm:pt-24 sm:pb-12 md:pt-36 md:pb-12 lg:pt-40 lg:pb-0 text-white flex flex-col items-center md:items-start">
            <Eyebrow tone="dark">
              Infrastructure - Engineering Consultants
            </Eyebrow>
            <h1 className="uppercase text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center md:text-left mb-6 leading-snug max-w-3xl text-white">
              We deliver together
            </h1>
            {/* <p className="mb-6 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed">
              A New Zealand-based multidisciplinary team of Chartered
              Professional Engineers and technical specialists delivering
              innovative, practical and cost-effective engineering solutions
              from concept and design through to construction and completion.
            </p> */}
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => router.push("/locations")}
                className="btn-primary w-full sm:w-auto"
              >
                GET IN TOUCH
              </button>
              {/* <button
                onClick={() => router.push("/portfolio/all-projects")}
                className="btn-outline-light w-full sm:w-auto"
              >
                EXPLORE OUR PROJECTS
              </button> */}
            </div>
          </div>
        </div>

        {/* Poster image - always present */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-poster.webp"
            alt="GDC Group Hero"
            fill
            priority
            sizes="100vw"
            style={{
              objectFit: "cover",
            }}
          />
        </div>

        {/* Video - only rendered for non-mobile devices */}
        {!isMobile && (
          <div
            className="absolute inset-0 z-1"
            style={{
              opacity: videoLoaded ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
            }}
          >
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              poster="/images/hero-poster.webp"
              loading="lazy"
              onLoadedData={() => setVideoLoaded(true)}
            />
          </div>
        )}
      </section>
    </>
  );
};

export default Hero;
