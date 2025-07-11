// components/location-sections/AreasServedSection.js

import React from 'react';

const AreasServedSection = ({ areasServed }) => {
  if (!areasServed) return null;

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-customBlue text-center mb-4">{areasServed.title}</h2>
        <div className="w-24 h-1 bg-customYellow mx-auto mb-8"></div>
        <p className="text-lg text-gray-700 text-center mb-8">{areasServed.subtitle}</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          {areasServed.areas.map((area, index) => (
            <div key={index} className="bg-white rounded-lg p-4 text-center shadow-sm">
              <p className="text-gray-700 font-medium">{area}</p>
            </div>
          ))}
        </div>
        
        {areasServed.conclusion && (
          <p className="text-center text-gray-600 italic">{areasServed.conclusion}</p>
        )}
      </div>
    </section>
  );
};

export default AreasServedSection;