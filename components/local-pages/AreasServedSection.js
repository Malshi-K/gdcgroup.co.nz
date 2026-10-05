// components/location-sections/AreasServedSection.js

import React from 'react';
import Link from 'next/link';

const AreasServedSection = ({ areasServed }) => {
  if (!areasServed) return null;

  return (
    <section className="py-16 bg-off-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-primary-navy text-center mb-4">{areasServed.title}</h2>
        <div className="w-24 h-1 bg-primary-blue mx-auto mb-8"></div>
        <p className="text-lg text-dark text-center mb-8">{areasServed.subtitle}</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          {areasServed.areas.map((area, index) => {
            const name = typeof area === 'string' ? area : area.name;
            const href = typeof area === 'object' ? area.href : null;

            return (
              <div key={index} className="bg-white rounded-lg p-4 text-center shadow-sm">
                {href ? (
                  <Link
                    href={href}
                    className="text-primary-navy font-medium hover:text-primary-blue transition-colors"
                  >
                    {name}
                  </Link>
                ) : (
                  <p className="text-dark font-medium">{name}</p>
                )}
              </div>
            );
          })}
        </div>
        
        {areasServed.conclusion && (
          <p className="text-center text-secondary italic">{areasServed.conclusion}</p>
        )}
      </div>
    </section>
  );
};

export default AreasServedSection;