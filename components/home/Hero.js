"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import Image from "next/image";

const Hero = () => {
  const router = useRouter();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef(null);
  
  // Your Cloudinary video URL
  const CLOUDINARY_URL = "https://res.cloudinary.com/dt7jcrlid/video/upload/v1/Hero_chfop8.webm";
  
  // Optimized URL with quality and format parameters
  const OPTIMIZED_URL = `${CLOUDINARY_URL.replace('/upload/', '/upload/q_auto,f_auto/')}`;
  
  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Run on initial load
    checkMobile();
    
    // Set up listener for window resize
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
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
        rootMargin: '0px',
        threshold: 0.1
      };
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
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
        <title>GDC Consultants: Your Engineering Partner for Success</title>
        <meta
          name="description"
          content="GDC Consultants Ltd offers expert engineering consulting services, delivering innovative solutions tailored to meet your project's unique needs and challenges."
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
      <section className="relative h-[400px] sm:h-[400px] md:h-[500px] lg:h-[580px] overflow-hidden">
        {/* Content overlay - now with fixed positioning rather than absolute */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-center md:text-left z-10">
          <div className="container mx-auto px-5 sm:px-8 md:px-10 py-8 sm:py-10 md:py-16 lg:py-20 text-white flex flex-col items-center md:items-start">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center md:text-left mb-6 leading-snug max-w-3xl text-white">
              TRUSTED ADVISORS FOR EVERY STAGE OF YOUR PROJECT
            </h1>
            <p className="mb-6 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed">
              Team of chartered professional engineers & architectural designers
              providing innovative solutions and expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={() => router.push("/locations")} 
                className="bg-customYellow text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-300 hover:bg-opacity-90 w-full sm:w-auto"
              >
                GET IN TOUCH
              </button>
              <button 
                onClick={() => router.push("/portfolio/all-projects")} 
                className="bg-white text-customBlue px-6 py-3 rounded-xl font-semibold transition-colors duration-300 hover:bg-opacity-90 w-full sm:w-auto"
              >
                EXPLORE OUR PROJECTS
              </button>
            </div>
          </div>
        </div>
        
        {/* Poster image - always present */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-poster.webp"
            alt="GDC Consultants Hero"
            fill
            priority
            sizes="100vw"
            style={{
              objectFit: 'cover'
            }}
          />
        </div>
        
        {/* Video - only rendered for non-mobile devices */}
        {!isMobile && (
          <div 
            className="absolute inset-0 z-1" 
            style={{ 
              opacity: videoLoaded ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out'
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