// components/MapSection.js

import React from "react";
import { MapPinIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";
import officeLocations from "@/app/data/officeLocations";
import Image from "next/image";
import Link from "next/link";

const MapSection = () => {
  // Define which offices have dedicated location pages
  const officesWithLocationPages = [
    'hamilton-head-office',
    'rotorua-office',
    'thames-office',
    'wellington-office',
    'napier-office'
  ];

  // Function to generate URL-friendly slug from office name
  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .trim();
  };

  // Check if office has a dedicated location page
  const hasLocationPage = (officeName) => {
    const slug = generateSlug(officeName);
    return officesWithLocationPages.includes(slug);
  };

  return (
    <section className="py-12 px-4 md:px-16 lg:px-24 bg-gray-100">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-customBlue text-center mb-8 relative">
        All Offices
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-24 h-1 bg-customYellow mt-2"></div>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {officeLocations.map((office) => {
          const officeSlug = generateSlug(office.name);
          const hasPage = hasLocationPage(office.name);
          
          return (
            <div
              key={office.id}
              className="bg-white shadow-lg rounded-md overflow-hidden"
            >
              {office.mapSrc && (
                <iframe
                  src={office.mapSrc}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  className="rounded-t-md"
                ></iframe>
              )}

              <div className="p-6">
                {office.qrCodeSrc && (
                  <Image
                    src={office.qrCodeSrc}
                    alt={`${office.name} QR Code`}
                    className="mb-4 w-30 h-30 mx-auto"
                    width={120}
                    height={120}
                  />
                )}

                {/* Conditional rendering: Link only if office has location page */}
                {hasPage ? (
                  <Link href={`/locations/${officeSlug}`}>
                    <h3 className="text-xl text-customBlue font-semibold text-center cursor-pointer hover:text-customYellow transition-colors duration-200 hover:underline">
                      {office.name}
                      <span className="ml-2 text-xs text-customYellow">• View Details</span>
                    </h3>
                  </Link>
                ) : (
                  <h3 className="text-xl text-customBlue font-semibold text-center">
                    {office.name}
                  </h3>
                )}

                {office.address && office.address.trim() !== "" && (
                  <div className="flex items-start mt-2 text-gray-600">
                    <MapPinIcon className="h-5 w-5 text-customBlue" />
                    <div className="ml-2">
                      <p className="font-bold text-customBlue">Our Address</p>
                      <p className="text-sm text-gray-700 mt-1">
                        {office.address}
                      </p>
                    </div>
                  </div>
                )}

                {office.email && (
                  <div className="flex items-start mt-4 text-gray-600">
                    <EnvelopeIcon className="h-5 w-5 text-customBlue" />
                    <div className="ml-2">
                      <p className="font-bold text-customBlue">Email Address</p>
                      <a
                        href={`mailto:${office.email}`}
                        className="text-sm text-gray-700 mt-1 block hover:text-customBlue transition-colors"
                      >
                        {office.email}
                      </a>
                    </div>
                  </div>
                )}

                {office.phone && (
                  <div className="flex items-start mt-4 text-gray-600">
                    <PhoneIcon className="h-5 w-5 text-customBlue" />
                    <div className="ml-2">
                      <p className="font-bold text-customBlue">Call us on</p>
                      <a
                        href={`tel:${office.phone}`}
                        className="text-sm text-gray-700 mt-1 block hover:text-customBlue transition-colors"
                      >
                        {office.phone}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MapSection;