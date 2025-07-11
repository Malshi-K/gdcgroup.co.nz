// components/location-sections/HeroSection.js

import React from 'react';

const HeroSection = ({ 
  title, 
  subtitle, 
  description, 
  introduction, 
  locationDescription, 
  serviceArea,
  backgroundImage // New prop for dynamic background image
}) => {
  return (
    <section 
      className="relative bg-customBlue text-white py-16 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none'
      }}
    >
      {/* Overlay for better text readability */}
      {backgroundImage && (
        <div className="absolute inset-0 bg-customBlue bg-opacity-70"></div>
      )}
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        <div className="w-24 h-1 bg-customYellow mb-6 mx-auto"></div>
        <h2 className="text-xl md:text-2xl font-semibold mb-4">{subtitle}</h2>
        <p className="text-lg leading-relaxed mb-4 max-w-4xl mx-auto">{description}</p>
        <p className="text-base leading-relaxed mb-4 max-w-4xl mx-auto">{introduction}</p>
        {locationDescription && (
          <p className="text-base leading-relaxed mb-4 max-w-4xl mx-auto">{locationDescription}</p>
        )}
        {serviceArea && (
          <p className="text-base leading-relaxed max-w-4xl mx-auto">{serviceArea}</p>
        )}
      </div>
    </section>
  );
};

export default HeroSection;