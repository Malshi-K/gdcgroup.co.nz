// components/JobList.js

"use client"; // Ensure this is treated as a client component

import { useState, useEffect } from "react";
import JobApplicationModal from "./JobApplicationModal";

// Current job openings
const jobs = [
  {
    title: "Geotechnical Field Technician - Part Time",
    postedDate: "Current opening",
    location: "Napier & Gisborne",
    locations: ["Napier", "Gisborne"],
    category: "Geotechnical",
    type: "Part Time",
    description:
      "GDC Consultants Ltd is seeking a part time Geotechnical Field Technician to support our teams in Napier and Gisborne.",
    aboutRole:
      "This is a varied, practical position ideal for someone who enjoys working outdoors, learning new skills, and supporting project delivery. Hours can be structured to suit workload and availability, making it a great fit for someone seeking part time employment while still engaging in meaningful technical work.",
    responsibilities: [
      "Carry out field based geotechnical testing, sampling, and site investigation activities in accordance with project requirements and relevant standards.",
      "Undertake laboratory testing of soils and materials, ensuring all procedures follow established methodologies and quality standards.",
      "Safely operate and maintain heavy testing equipment, soil sampling tools, and associated field instrumentation.",
      "Monitor, maintain, and record data from geotechnical instrumentation, ensuring accuracy and reliability of results.",
      "Conduct environmental monitoring tasks as required, including sampling, observations, and reporting.",
      "Complete data entry, field records, and administrative tasks to a high standard, ensuring all documentation is accurate, timely, and compliant with GDC quality systems.",
    ],
    requirements: [
      "Previous fieldwork experience, or a degree/diploma in Science, Geology, Engineering, or a related discipline.",
      "A good level of physical fitness, including the ability to lift, carry, and handle field equipment.",
      "A positive, team focused attitude with strong communication and interpersonal skills.",
      "Willingness to work outdoors, get hands on with equipment, and adapt to varying site conditions.",
      "High standards of accuracy in record keeping, data entry, and reporting.",
      "Strong time management, troubleshooting, and problem solving abilities.",
      "A proactive approach, strong work ethic, and a desire to learn and contribute to project outcomes.",
      "Understanding of quality management systems, safe work practices, and adherence to GDC procedures.",
      "A full New Zealand driver's licence, including the ability to operate a manual vehicle.",
    ],
  },
];

// const locationOptions = [
//   "All Locations",
//   ...new Set(jobs.flatMap((job) => job.locations ?? [job.location])),
// ];

// Function to group jobs by category
const groupByCategory = (jobs) => {
  return jobs.reduce((groups, job) => {
    if (!groups[job.category]) {
      groups[job.category] = [];
    }
    groups[job.category].push(job);
    return groups;
  }, {});
};

export default function JobList() {
  // const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [filteredGroupedJobs, setFilteredGroupedJobs] = useState(
    groupByCategory(jobs)
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Update filtered jobs based on selected location
  // useEffect(() => {
  //   const updatedFilteredJobs =
  //     selectedLocation === "All Locations"
  //       ? jobs
  //       : jobs.filter((job) =>
  //           (job.locations ?? [job.location]).includes(selectedLocation)
  //         );

  //   setFilteredGroupedJobs(groupByCategory(updatedFilteredJobs));
  // }, [selectedLocation]);

  // Trigger animations after initial render
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="bg-gray-100">
      <div 
        className={`max-w-6xl p-6 mx-auto rounded-md transition-all duration-500 ease-out ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        {/* Header */}
        <div 
          className={`flex justify-between items-center mb-4 transition-all duration-500 ease-out ${
            isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}
        >
          <h2 className="text-xl text-customBlue font-semibold">
            Job Openings
          </h2>
          {/* <div className="relative">
            <select
              className="bg-gray-100 text-customBlue border border-customBlue rounded-md p-2"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              {locationOptions.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div> */}
        </div>

        {/* Display jobs section-wise based on categories */}
        {Object.keys(filteredGroupedJobs).map((category, categoryIndex) => (
          <div
            key={category}
            className={`space-y-6 mb-6 transition-all duration-500 ease-out ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
            style={{ transitionDelay: `${categoryIndex * 100}ms` }}
          >
            {/* <div className="border-b pb-2">
              <h3 className="text-lg text-customBlue font-medium">
                {category}
              </h3>
            </div> */}
            {filteredGroupedJobs[category].map((job, index) => (
              <div
                key={job.title}
                className={`p-6 bg-white shadow-sm rounded-md hover:border hover:border-customBlue transition-all duration-300 ${
                  isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                }`}
                style={{ transitionDelay: `${(categoryIndex * 100) + (index * 75)}ms` }}
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1 space-y-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h4 className="text-xl text-customYellow font-bold">
                          {job.title}
                        </h4>
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-customBlue">
                          {job.type}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        {job.location} | {job.postedDate}
                      </p>
                    </div>

                    <p className="text-gray-700">{job.description}</p>
                    <p className="text-sm text-gray-500">
                      Click apply to view the full job details and submit your application.
                    </p>
                  </div>

                  <div className="lg:w-48 lg:flex-shrink-0">
                    <button
                      onClick={() => {
                        setSelectedJob(job);
                        setIsModalOpen(true);
                      }}
                      className="w-full px-4 py-3 bg-customYellow text-white font-semibold rounded-md hover:bg-yellow-500 transition-colors"
                    >
                      Apply for this role
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <JobApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        job={selectedJob}
      />
    </div>
  );
}