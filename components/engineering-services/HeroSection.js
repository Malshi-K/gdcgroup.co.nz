"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import PricingCard from "./PricingCard";

const HeroSection = ({ RightSideComponent }) => {
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [screenSize, setScreenSize] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  // Content for the banner - without the pipe symbol
  const content = [
    { highlighted: "Seismic Experts" },
    { highlighted: "Structural" }, 
    { highlighted: "Geotechnical" },
  ];

  const marqueeContainerRef = useRef(null);

  useEffect(() => {
    // Function to update screen size state
    const updateScreenSize = (width) => {
      setScreenSize({
        isMobile: width < 640,
        isTablet: width >= 640 && width < 1024,
        isDesktop: width >= 1024,
      });
    };

    // Initial size detection
    updateScreenSize(window.innerWidth);

    // Set up resize observer for responsive adjustments
    const resizeObserver = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? window.innerWidth;
      updateScreenSize(width);
    });

    resizeObserver.observe(document.body);

    // Function to determine which word is most visible
    const checkVisibleWord = () => {
      if (!marqueeContainerRef.current) return;

      const containerRect = marqueeContainerRef.current.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;

      const words = document.querySelectorAll(".scroll-word-container");
      let closestWord = null;
      let closestDistance = Infinity;

      words.forEach((word, index) => {
        const wordRect = word.getBoundingClientRect();
        const wordCenter = wordRect.left + wordRect.width / 2;
        const distance = Math.abs(containerCenter - wordCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestWord = word;
        }
      });

      if (closestWord) {
        const newIndex = parseInt(closestWord.dataset.index, 10);
        if (!isNaN(newIndex) && newIndex !== visibleIndex) {
          setVisibleIndex(newIndex);
        }
      }
    };

    // Set up interval to check visible word
    const visibilityInterval = setInterval(checkVisibleWord, 100);

    return () => {
      resizeObserver.disconnect();
      clearInterval(visibilityInterval);
    };
  }, [visibleIndex]);

  // Updated heading sizes with better size scaling for each device
  const getHeadingSize = () => {
    if (screenSize.isMobile) return "text-3xl";
    if (screenSize.isTablet) return "text-4xl";
    return "text-5xl";
  };

  // Create duplicated content for continuous scrolling
  const scrollWords = [...content, ...content, ...content];

  return (
    <section
      className="relative transition-all duration-300 overflow-hidden bg-black bg-opacity-80"
      style={{
        minHeight: screenSize.isMobile ? "auto" : "100vh",
        backgroundImage: "url('/images/hero-poster.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "overlay",
      }}
    >
      <style jsx>{`
        @keyframes scrollWords {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }

        .scroll-container {
          position: relative;
          background-color: #044e80;
          border-radius: 9999px;
          overflow: hidden;
          width: 100%;
          max-width: 680px;
          margin: 0 auto;
          z-index: 1;
          display: flex;
          align-items: center;
          padding: 0;
          height: auto;
        }

        .scroll-content {
          display: inline-flex;
          white-space: nowrap;
          animation: scrollWords 40s linear infinite;
          align-items: center;
          padding-left: 16px; /* Add padding to ensure first word is fully visible */
        }

        .scroll-word-container {
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
          overflow: visible;
        }

        .scroll-word {
          color: #333333;
          font-weight: bold;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
          white-space: nowrap;
          overflow: visible;
        }
        
        /* Style for the separator */
        .word-separator {
          color: inherit;
          display: inline-block;
          margin: 0 12px; /* Consistent spacing */
          font-weight: bold;
        }

        /* Custom responsive font size with better vertical alignment */
        @media (max-width: 640px) {
          .scroll-word-container {
            height: 42px;
          }
          .scroll-word {
            font-size: 1.75rem;
          }
          .scroll-container {
            max-width: 100%;
            border-radius: 21px;
          }
          .scroll-content {
            padding-left: 10px; /* Smaller padding on mobile */
          }
          .word-separator {
            margin: 0 8px; /* Smaller spacing on mobile */
          }
        }

        @media (min-width: 641px) and (max-width: 1023px) {
          .scroll-word-container {
            height: 56px;
          }
          .scroll-word {
            font-size: 2.5rem;
          }
          .scroll-container {
            max-width: 90%;
            border-radius: 28px;
          }
          .scroll-content {
            padding-left: 12px; /* Medium padding on tablet */
          }
          .word-separator {
            margin: 0 10px; /* Medium spacing on tablet */
          }
        }

        @media (min-width: 1024px) {
          .scroll-word-container {
            height: 64px;
          }
          .scroll-word {
            font-size: 3rem;
            color: #ffb500;
          }
          .scroll-container {
            border-radius: 32px;
          }
          .scroll-content {
            padding-left: 16px; /* Larger padding on desktop */
          }
        }

        /* Rotating text animation */
        @keyframes rotateText {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .circular-text-container {
          position: absolute;
          width: 100px;
          height: 100px;
          z-index: 20;
        }

        .rotating-text {
          position: absolute;
          width: 100%;
          height: 100%;
          animation: rotateText 20s linear infinite;
        }

        .circular-button {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60px;
          height: 60px;
          background-color: #044e80;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease;
          z-index: 2;
          padding: 8px;
        }

        .circular-button:hover {
          transform: translate(-50%, -50%) scale(1.1);
        }

        /* Add responsive styles for the circular button */
        @media (max-width: 640px) {
          .circular-text-container {
            width: 80px;
            height: 80px;
            top: 0 !important;
            right: 0 !important;
          }

          .circular-button {
            width: 50px;
            height: 50px;
          }
        }

        @media (max-width: 480px) {
          .circular-text-container {
            width: 70px;
            height: 70px;
          }

          .circular-button {
            width: 40px;
            height: 40px;
          }
        }
      `}</style>

      <div
        className={`relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 xl:px-20 
          ${
            screenSize.isMobile
              ? "pt-24 pb-12"
              : screenSize.isTablet
              ? "pt-28 pb-16"
              : "pt-32 pb-20"
          }`}
      >
        {/* Flex container for left-right layout with improved responsive layout */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12 md:gap-6 lg:gap-8">
          {/* Left side content */}
          <div className="w-full md:w-1/2">
            <div className="text-left">
              {/* Using the dynamic heading size function */}
              <h3
                className={`${getHeadingSize()} font-bold leading-none text-white`}
              >
                <span>Resilient by Design:</span>
                <br />
                <span>Structural Engineering</span>
                <br />
                <span>for a Safer,</span>
                <br />
                <span>Stronger Future for Aotearoa</span>

                {/* Improved scrolling banner */}
                <div className="my-2">
                  <div
                    className="scroll-container mx-auto md:ml-0"
                    ref={marqueeContainerRef}
                  >
                    <div className="scroll-content">
                      {scrollWords.map((item, index) => (
                        <div 
                          key={index} 
                          className="scroll-word-container"
                          data-index={index % content.length}
                        >
                          <span className="scroll-word">{item.highlighted}</span>
                          <span className="word-separator">|</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </h3>

              {/* Description text with circular button positioned to the right */}
              <div className="mt-6 sm:mt-8 mb-6 text-left max-w-xl relative">
                <p className="text-white text-xl leading-relaxed pr-16 sm:pr-32">
                  GDC Consultants delivers practical and compliant engineering
                  solutions to ensure your buildings stand the test of time—and
                  nature.
                </p>

                {/* Circular text button with more responsive positioning */}
                <div className="circular-text-container absolute top-0 right-0 sm:top-1/2 sm:-translate-y-1/2 transform scale-80 sm:scale-90 md:scale-100 origin-top-right">
                  <Link href="tel:+6478380090" className="block w-full h-full">
                    <div className="rotating-text">
                      <svg viewBox="0 0 100 100" width="100%" height="100%">
                        <defs>
                          <path
                            id="circle-path"
                            d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
                          />
                        </defs>
                        <text
                          fontSize="11"
                          fontWeight="600"
                          fill="white"
                          letterSpacing="2"
                        >
                          <textPath
                            xlinkHref="#circle-path"
                            startOffset="0%"
                            textLength="251"
                          >
                            • CALL • US • NOW&nbsp;
                          </textPath>
                        </text>
                      </svg>
                    </div>
                    <div className="circular-button">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="4"
                          y="13"
                          rx="2"
                          ry="2"
                          width="4"
                          height="5"
                        ></rect>
                        <rect
                          x="16"
                          y="13"
                          rx="2"
                          ry="2"
                          width="4"
                          height="5"
                        ></rect>
                        <path d="M4 15v-3a8 8 0 0 1 16 0v3"></path>
                        <path d="M18 19a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-1.5"></path>
                        <path d="M6 15H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2"></path>
                      </svg>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right side content - with improved vertical spacing on mobile */}
          <div className="w-full md:w-1/2 flex justify-center items-center mt-6 md:mt-0">
            {RightSideComponent ? <RightSideComponent /> : <PricingCard />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;