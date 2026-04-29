"use client";

import React from "react";
import CareerFormEmbed from "./CareerFormEmbed";

const JobApplicationModal = ({ isOpen, onClose, job }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-customBlue">
            Apply for Position
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-8 rounded-lg bg-gray-50 p-6">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-2xl font-semibold text-customYellow">
                {job?.title}
              </h3>
              {job?.type ? (
                <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-customBlue">
                  {job.type}
                </span>
              ) : null}
            </div>
            <p className="mt-2 text-sm text-gray-500">
              {job?.location} | {job?.postedDate}
            </p>
            <p className="mt-4 text-gray-700">{job?.description}</p>

            <div className="mt-6">
              <h4 className="text-base font-semibold text-customBlue">
                About the Role
              </h4>
              <p className="mt-2 text-sm leading-6 text-gray-700">
                {job?.aboutRole}
              </p>
            </div>

            <div className="mt-6">
              <h4 className="text-base font-semibold text-customBlue">
                Key Responsibilities
              </h4>
              <ul className="mt-2 space-y-2 text-sm text-gray-700">
                {job?.responsibilities?.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-customYellow" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
                <h4 className="text-base font-semibold text-customBlue">
                What You&apos;ll Bring
              </h4>
              <ul className="mt-2 space-y-2 text-sm text-gray-700">
                {job?.requirements?.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-customYellow" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <CareerFormEmbed
            containerId={`hubspot-job-form-${job?.title?.replace(/[^a-z0-9]+/gi, "-").toLowerCase() || "role"}`}
            title="Apply now"
            showLogo={false}
            intro="Complete the form below to apply for this position."
            portalId="6187835"
            formId="777aedc5-7e7c-447c-b8a9-b10846a53fdc"
            region="ap1"
            hiddenFields={{
              job_role: "Geotechnical Field Technician",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default JobApplicationModal;
