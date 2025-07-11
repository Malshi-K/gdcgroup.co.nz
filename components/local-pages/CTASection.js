// components/location-sections/CTASection.js

import React from 'react';

const CTASection = ({ ctaSection }) => {
  if (!ctaSection) return null;

  return (
    <section className="py-16 bg-customBlue text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">{ctaSection.title}</h2>
        <div className="w-24 h-1 bg-customYellow mx-auto mb-8"></div>
        <p className="text-lg leading-relaxed mb-6">{ctaSection.description}</p>
        <div className="bg-white bg-opacity-10 rounded-lg p-6 mb-6">
          <p className="text-xl font-semibold mb-2">{ctaSection.tagline}</p>
          <p className="text-lg leading-relaxed">{ctaSection.finalMessage}</p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;