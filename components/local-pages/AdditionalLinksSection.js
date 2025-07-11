// components/location-sections/AdditionalLinksSection.js

import React from 'react';

const AdditionalLinksSection = ({ additionalLinks }) => {
  if (!additionalLinks) return null;

  return (
    <section className="py-8 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="space-x-4">
          {additionalLinks.portfolio && (
            <a href="#" className="text-customBlue hover:text-customYellow transition-colors font-medium">
              {additionalLinks.portfolio}
            </a>
          )}
          {additionalLinks.team && (
            <span className="text-gray-400">|</span>
          )}
          {additionalLinks.team && (
            <a href="#" className="text-customBlue hover:text-customYellow transition-colors font-medium">
              {additionalLinks.team}
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdditionalLinksSection;