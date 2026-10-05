// components/location-sections/AdditionalLinksSection.js

import React from 'react';

const AdditionalLinksSection = ({ additionalLinks }) => {
  if (!additionalLinks) return null;

  return (
    <section className="py-8 bg-off-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="space-x-4">
          {additionalLinks.portfolio && (
            <a href="#" className="text-primary-navy hover:text-primary-blue transition-colors font-medium">
              {additionalLinks.portfolio}
            </a>
          )}
          {additionalLinks.team && (
            <span className="text-secondary">|</span>
          )}
          {additionalLinks.team && (
            <a href="#" className="text-primary-navy hover:text-primary-blue transition-colors font-medium">
              {additionalLinks.team}
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdditionalLinksSection;