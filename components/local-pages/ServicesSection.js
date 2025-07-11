// components/location-sections/ServicesSection.js
"use client";
import React, { useState } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  WrenchScrewdriverIcon,
  BuildingOfficeIcon,
  TruckIcon,
  HomeModernIcon,
  ScaleIcon,
  ClipboardDocumentListIcon,
  MapIcon,
  BriefcaseIcon,
  MagnifyingGlassIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

const ServicesSection = ({ services }) => {
  const [expandedCards, setExpandedCards] = useState({});

  if (!services) return null;

  // Toggle card expansion
  const toggleCard = (index) => {
    setExpandedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Function to get appropriate icon for each service type
  const getServiceIcon = (serviceName) => {
    const iconMap = {
      // Geotechnical services
      "Geotechnical Engineering": ScaleIcon,
      "Geotechnical Reports": ScaleIcon,
      "Geotech Assessments": ScaleIcon,
      "Geotechnical & Soil Reports": ScaleIcon,

      // Structural services
      "Structural Engineering Services": BuildingOfficeIcon,
      "Structural Engineering": BuildingOfficeIcon,
      "Structural & Civil Engineering": BuildingOfficeIcon,

      // Civil Engineering
      "Civil Engineering Solutions": TruckIcon,
      "Civil Infrastructure Solutions": TruckIcon,
      "Civil Engineering & Infrastructure": TruckIcon,
      "Drainage & Infrastructure": GlobeAltIcon,

      // Architectural services
      "Architectural Design Services": HomeModernIcon,
      "Architectural Design": HomeModernIcon,
      "Architectural Design & Drafting": HomeModernIcon,

      // Seismic services
      "Seismic Assessments & Building Strengthening": ShieldCheckIcon,
      "Seismic Reports & Strengthening": ShieldCheckIcon,
      "Seismic Design and Assessments": ShieldCheckIcon,
      "Seismic & Building Assessments": ShieldCheckIcon,

      // Planning services
      "Planning & Resource Consents": ClipboardDocumentListIcon,
      "Council Consent Support": ClipboardDocumentListIcon,
      "Environmental Planning": ClipboardDocumentListIcon,
      "Planning & Surveying Services": MapIcon,

      // Surveying
      "Surveying Services": MagnifyingGlassIcon,

      // Subdivision/Development
      "Subdivision/ Land Development": BriefcaseIcon,
    };

    return iconMap[serviceName] || WrenchScrewdriverIcon; // Default icon
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-customBlue mb-4">
            {services.title}
          </h2>
          <div className="w-24 h-1 bg-customYellow mx-auto mb-6"></div>
          {services.subtitle && (
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              {services.subtitle}
            </p>
          )}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.serviceList.map((service, index) => {
            const isExpanded = expandedCards[index];
            const IconComponent = getServiceIcon(service.name);

            return (
              <div
                key={index}
                className={`bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group overflow-hidden ${
                  isExpanded ? "md:col-span-2 lg:col-span-3" : ""
                }`}
              >
                {/* Top Section - Icon Area */}
                <div className="relative h-40 flex items-center justify-center overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='m0 40l40-40h-40z'/%3E%3Cpath d='m0 0l40 40v-40z'/%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: "40px 40px",
                      }}
                    ></div>
                  </div>

                  {/* Expand/Collapse Button */}
                  <button
                    onClick={() => toggleCard(index)}
                    className="absolute top-4 right-4 bg-white bg-opacity-20 backdrop-blur-sm hover:bg-customYellow text-customBlue hover:text-customBlue p-2 rounded-full transition-all duration-200"
                    aria-label={isExpanded ? "Collapse" : "Expand"}
                  >
                    {isExpanded ? (
                      <ChevronUpIcon className="w-5 h-5" />
                    ) : (
                      <ChevronDownIcon className="w-5 h-5" />
                    )}
                  </button>

                  {/* Icon */}
                  <div className="relative z-10 text-center">
                    <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full shadow-xl p-6 mx-auto w-fit group-hover:bg-customYellow group-hover:bg-opacity-90 transition-all duration-300">
                      <IconComponent className="w-16 h-16 text-customBlue group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>
                </div>

                {/* Bottom Section - Content Area */}
                <div className="p-6">
                  {/* Service Title */}
                  <h3 className="text-xl font-bold text-customBlue mb-3 group-hover:text-customYellow transition-colors duration-200 text-center">
                    {service.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-700 leading-relaxed mb-4 text-center text-sm">
                    {service.description}
                  </p>
                </div>

                {/* Expanded Content - Only show if there's expandable content */}
                {isExpanded &&
                  (service.details ||
                    service.additional ||
                    service.conclusion ||
                    service.features) && (
                    <div className="border-t border-gray-100 p-6 bg-gray-50">
                      {/* Details Column */}
                      <div className="space-y-6">
                        {service.details && (
                          <div>
                            <h4 className="text-lg font-semibold text-customBlue mb-3 flex items-center">
                              <ClipboardDocumentListIcon className="w-5 h-5 mr-2" />
                              Service Details
                            </h4>
                            <p className="text-gray-700 leading-relaxed">
                              {service.details}
                            </p>
                          </div>
                        )}

                        {service.additional && (
                          <div>
                            <h4 className="text-lg font-semibold text-customBlue mb-3 flex items-center">
                              <WrenchScrewdriverIcon className="w-5 h-5 mr-2" />
                              Additional Information
                            </h4>
                            <p className="text-gray-700 leading-relaxed">
                              {service.additional}
                            </p>
                          </div>
                        )}

                        {service.conclusion && (
                          <div className="border-l-4 border-customYellow p-4 rounded-r">
                            <h4 className="text-lg font-semibold text-customBlue mb-2 flex items-center">
                              <ShieldCheckIcon className="w-5 h-5 mr-2" />
                              Summary
                            </h4>
                            <p className="text-gray-700 leading-relaxed italic">
                              {service.conclusion}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Features Column */}
                      {service.features && service.features.length > 0 && (
                        <div>
                          <h4 className="text-lg font-semibold text-customBlue mt-3 mb-3 flex items-center">
                            <BriefcaseIcon className="w-5 h-5 mr-2" />
                            Key Features & Services
                          </h4>
                          <ul className="space-y-3">
                            {service.features.map((feature, featureIndex) => (
                              <li
                                key={featureIndex}
                                className="flex items-start"
                              >
                                <div className="bg-customYellow w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                <span className="text-gray-700 leading-relaxed text-sm">
                                  {feature}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Collapse Button at Bottom */}
                      <div className="flex justify-center mt-6">
                        <button
                          onClick={() => toggleCard(index)}
                          className="flex items-center gap-2 text-customBlue hover:text-customYellow transition-colors duration-200 font-medium"
                        >
                          <span>Show Less</span>
                          <ChevronUpIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
              </div>
            );
          })}
        </div>

        
      </div>
    </section>
  );
};

export default ServicesSection;
