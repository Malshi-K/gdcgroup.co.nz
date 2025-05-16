"use client";
import React, { useEffect, useRef } from 'react';

const ServicesBar = () => {
  // List of services to display
  const services = [
    "15 years experience",
    "Licensed experts",
    "Local ground knowledge",
  ];
  
  const scrollContainerRef = useRef(null);
  
  useEffect(() => {
    // Check if window is available (browser environment)
    if (typeof window !== 'undefined') {
      // Function to check which service is most visible
      const checkVisibleService = () => {
        if (!scrollContainerRef.current) return;
        
        const containerRect = scrollContainerRef.current.getBoundingClientRect();
        const containerCenter = containerRect.left + containerRect.width / 2;
        
        const serviceElements = document.querySelectorAll('.service-item');
        let closestService = null;
        let closestDistance = Infinity;
        
        serviceElements.forEach((service) => {
          const serviceRect = service.getBoundingClientRect();
          const serviceCenter = serviceRect.left + serviceRect.width / 2;
          const distance = Math.abs(containerCenter - serviceCenter);
          
          if (distance < closestDistance) {
            closestDistance = distance;
            closestService = service;
          }
        });
      };
      
      // Set up interval to check visible service
      const visibilityInterval = setInterval(checkVisibleService, 100);
      
      return () => {
        clearInterval(visibilityInterval);
      };
    }
  }, []);
  
  // Create duplicated service array for continuous scrolling
  const scrollServices = [...services, ...services, ...services];
  
  return (
    <div className="w-full bg-customBlue py-4 overflow-hidden" ref={scrollContainerRef}>
      {/* CSS for scrolling animation */}
      <style jsx>{`
        @keyframes scrollServices {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%); /* Move by 1/3 for complete cycle */
          }
        }
        
        .scroll-content {
          display: inline-flex;
          white-space: nowrap;
          animation: scrollServices 20s linear infinite;
          align-items: center;
        }
        
        .service-item {
          color: white;
          font-weight: bold;
          padding: 0 20px;
        }
        
        .image-separator {
          padding: 0 10px;
          display: flex;
          align-items: center;
        }
      `}</style>
      
      {/* Scrolling content container */}
      <div className="flex justify-center">
        <div className="overflow-hidden max-w-full">
          <div className="scroll-content">
            {scrollServices.map((service, index) => (
              <React.Fragment key={index}>
                <span 
                  className="service-item text-customBlue text-lg"
                  data-index={index % services.length}
                >
                  {service}
                </span>
                
                {/* PNG image separator */}
                <span className="image-separator">
                  <div className="relative h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6">
                    <img
                      src="/images/1.png" 
                      alt="Separator"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesBar;