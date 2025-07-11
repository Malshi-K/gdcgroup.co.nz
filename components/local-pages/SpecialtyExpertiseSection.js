// components/location-sections/SpecialtyExpertiseSection.js

import React from 'react';

const SpecialtyExpertiseSection = ({ specialtyExpertise }) => {
  if (!specialtyExpertise) return null;

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-customBlue text-center mb-4">{specialtyExpertise.title}</h2>
        <div className="w-24 h-1 bg-customYellow mx-auto mb-8"></div>
        <p className="text-lg text-gray-700 text-center mb-12 max-w-4xl mx-auto">{specialtyExpertise.description}</p>
        
        <div className="space-y-4 mb-8">
          {specialtyExpertise.expertiseAreas.map((area, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md border-l-4 border-customBlue">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-customBlue rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <span className="text-white font-bold text-sm">{index + 1}</span>
                </div>
                <p className="text-gray-700 leading-relaxed">{area}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Optional conclusion for specialty expertise */}
        {specialtyExpertise.conclusion && (
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 text-center leading-relaxed italic border-l-4 border-customYellow pl-6 bg-white py-4 rounded-lg shadow-sm">
              {specialtyExpertise.conclusion}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SpecialtyExpertiseSection;