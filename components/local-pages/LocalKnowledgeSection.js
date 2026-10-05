// components/location-sections/LocalKnowledgeSection.js

import React from 'react';

const LocalKnowledgeSection = ({ localKnowledge }) => {
  if (!localKnowledge) return null;

  return (
    <section className="py-16 bg-white">
      <div className="site-x">
        <h2 className="text-3xl font-bold text-primary-navy text-center mb-4">{localKnowledge.title}</h2>
        <div className="w-24 h-1 bg-primary-blue mx-auto mb-8"></div>
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <p className="text-lg text-dark leading-relaxed">{localKnowledge.description}</p>
          <div className="bg-off-white rounded-lg p-6 border-l-4 border-primary-blue">
            <p className="text-lg text-dark leading-relaxed italic font-medium">
              {localKnowledge.philosophy}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocalKnowledgeSection;