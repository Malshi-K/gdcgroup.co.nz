// components/JobList.js

"use client"; // Ensure this is treated as a client component

import { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Import Framer Motion

// Sample job data
const jobs = [
  {
    title: "Graduate Civil Engineer",
    postedDate: "13 days ago",
    location: "All Locations",
    category: "Engineering",
  },
  {
    title: "Campaign Manager",
    postedDate: "15 days ago",
    location: "New Zealand",
    category: "Marketing",
  },
  {
    title: "Software Developer",
    postedDate: "10 days ago",
    location: "Sri Lanka",
    category: "Engineering",
  },
  {
    title: "Marketing Specialist",
    postedDate: "5 days ago",
    location: "All Locations",
    category: "Marketing",
  },
];

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
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [filteredGroupedJobs, setFilteredGroupedJobs] = useState(
    groupByCategory(jobs)
  );

  // Update filtered jobs based on selected location
  useEffect(() => {
    const updatedFilteredJobs =
      selectedLocation === "All Locations"
        ? jobs
        : jobs.filter((job) => job.location === selectedLocation);

    setFilteredGroupedJobs(groupByCategory(updatedFilteredJobs));
  }, [selectedLocation]);

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="bg-gray-100"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      <div className="max-w-6xl p-6 mx-auto rounded-md">
        {/* Header */}
        <motion.div
          className="flex justify-between items-center mb-4"
          variants={slideInLeft}
        >
          <h2 className="text-xl text-customBlue font-semibold">
            Job Openings
          </h2>
          <div className="relative">
            <select
              className="bg-gray-100 text-customBlue border border-customBlue rounded-md p-2"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option>All Locations</option>
              <option>New Zealand</option>
              <option>Sri Lanka</option>
            </select>
          </div>
        </motion.div>

        {/* Display jobs section-wise based on categories */}
        {Object.keys(filteredGroupedJobs).map((category) => (
          <motion.div
            key={category}
            className="space-y-6 mb-6"
            variants={fadeInUp}
          >
            <div className="border-b pb-2">
              <h3 className="text-lg text-customBlue font-medium">
                {category}
              </h3>
            </div>
            {filteredGroupedJobs[category].map((job, index) => (
              <motion.div
                key={index}
                className="flex justify-between items-center p-4 bg-white shadow-sm rounded-md hover:border hover:border-customBlue transition cursor-pointer"
                variants={fadeInUp}
              >
                <div>
                  <h4 className="text-md text-customYellow font-bold">
                    {job.title}
                  </h4>
                  <p className="text-sm text-gray-500">
                    Posted {job.postedDate}
                  </p>
                </div>
                <span className="text-sm text-gray-700">{job.location}</span>
              </motion.div>
            ))}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
