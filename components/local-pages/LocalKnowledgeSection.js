// components/location-sections/LocalKnowledgeSection.js

import React from 'react';

const LocalKnowledgeSection = ({ localKnowledge }) => {
  if (!localKnowledge) return null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-customBlue text-center mb-4">{localKnowledge.title}</h2>
        <div className="w-24 h-1 bg-customYellow mx-auto mb-8"></div>
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed">{localKnowledge.description}</p>
          <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-customYellow">
            <p className="text-lg text-gray-700 leading-relaxed italic font-medium">
              {localKnowledge.philosophy}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocalKnowledgeSection;