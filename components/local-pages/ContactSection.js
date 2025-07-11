// components/location-sections/ContactSection.js

import React from 'react';
import { MapPinIcon, EnvelopeIcon, PhoneIcon, ClockIcon, UserIcon } from '@heroicons/react/24/solid';

const ContactSection = ({ contact, locationImage }) => {
  if (!contact) return null;

  // Debug logging - remove in production
  console.log('ContactSection props:', { contact: contact.title, locationImage });

  // Function to render contact item with icon
  const renderContactItem = (icon, label, value, isLink = false, linkType = '') => {
    if (!value) return null;

    const IconComponent = icon;
    
    return (
      <div className="flex items-start">
        <div className="bg-customYellow rounded-full p-3 mr-4 flex-shrink-0">
          <IconComponent className="h-6 w-6 text-customBlue" />
        </div>
        <div>
          <h3 className="font-bold text-lg mb-2">{label}</h3>
          {isLink ? (
            <a
              href={linkType === 'email' ? `mailto:${value}` : `tel:${value}`}
              className="text-gray-100 hover:text-customYellow transition-colors duration-200 text-base break-all"
            >
              {value}
            </a>
          ) : (
            <p className="text-gray-100 text-base leading-relaxed whitespace-pre-line">
              {value}
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="py-0 bg-white">
      <div className="max-w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          {/* Left Column - Contact Information */}
          <div className="bg-customBlue text-white flex items-center">
            <div className="w-full px-8 lg:px-16 py-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">{contact.title}</h2>
              <div className="w-24 h-1 bg-customYellow mb-12"></div>

              {/* Contact Description */}
              {contact.description && (
                <div className="mb-8">
                  <p className="text-lg text-gray-100 leading-relaxed">
                    {contact.description}
                  </p>
                </div>
              )}

              <div className="space-y-6">
                {/* Address - Always display prominently if available */}
                {contact.address && (
                  <div className="mb-8">
                    {renderContactItem(MapPinIcon, 'Address', contact.address)}
                  </div>
                )}

                {/* Main Contact */}
                {contact.mainContact && (
                  <div className="mb-6">
                    {renderContactItem(UserIcon, 'Main Contact', contact.mainContact)}
                  </div>
                )}

                {/* Contact Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email */}
                  {contact.email && renderContactItem(
                    EnvelopeIcon, 
                    'Email', 
                    contact.email, 
                    true, 
                    'email'
                  )}

                  {/* Phone */}
                  {contact.phone && renderContactItem(
                    PhoneIcon, 
                    'Phone', 
                    contact.phone, 
                    true, 
                    'tel'
                  )}

                  {/* Mobile */}
                  {contact.mobile && renderContactItem(
                    PhoneIcon, 
                    'Mobile', 
                    contact.mobile, 
                    true, 
                    'tel'
                  )}

                  {/* Hours */}
                  {contact.hours && renderContactItem(
                    ClockIcon, 
                    'Hours', 
                    contact.hours
                  )}
                </div>

                {/* CTA Button */}
                {contact.ctaText && (
                  <div className="pt-8">
                    <button className="bg-customYellow text-customBlue px-8 py-4 rounded-lg font-bold hover:bg-opacity-90 transition-all duration-200 transform hover:scale-105 shadow-lg text-lg w-full sm:w-auto">
                      {contact.ctaText}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Location Image */}
          <div className="relative order-first lg:order-last overflow-hidden">
            {locationImage ? (
              <img
                src={locationImage}
                alt="Location"
                className="w-full h-64 lg:h-full lg:min-h-screen object-cover"
                style={{ objectPosition: 'center' }}
              />
            ) : (
              <div className="w-full h-64 lg:h-full lg:min-h-screen bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-xl">Location Image</span>
              </div>
            )}
            
            {/* Optional overlay for better visual balance */}
            <div className="absolute inset-0 bg-black bg-opacity-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;