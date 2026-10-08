// components/location-sections/WhyChooseSection.js

import React from 'react';

const WhyChooseSection = ({ whyChoose }) => {
  if (!whyChoose) return null;

  return (
    <section className="py-16 bg-white">
      <div className="site-x">
        <h2 className="text-3xl font-bold text-primary-navy text-center mb-4">{whyChoose.title}</h2>
        <div className="w-24 h-1 bg-primary-blue mx-auto mb-8"></div>
        
        {/* Optional description - only shows if it exists */}
        {whyChoose.description && (
          <p className="text-lg text-dark text-center mb-12 max-w-4xl mx-auto leading-relaxed">
            {whyChoose.description}
          </p>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChoose.reasons.map((reason, index) => (
            <div key={index} className="bg-off-white rounded-lg p-6 text-center hover:bg-off-white transition-colors">
              <div className="w-12 h-12 bg-primary-navy rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold">{index + 1}</span>
              </div>
              <p className="text-dark font-medium leading-relaxed">{reason}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;