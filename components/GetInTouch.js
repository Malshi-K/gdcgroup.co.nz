"use client"; // Ensure this is treated as a client component

import React from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/outline";

// Data array for dynamic rendering
const contactDetails = [
  {
    id: 1,
    title: "CONTACT US",
    description: "Our friendly team is here to help.",
    contactInfo: "hamilton@gdcgroup.co.nz",
    link: "mailto:hamilton@gdcgroup.co.nz",
    icon: <EnvelopeIcon/>, 
  },
  {
    id: 2,
    title: "OFFICE",
    description: "Come say hello at our office HQ.",
    contactInfo: "89 Church Road, Pukete, Hamilton 3200",
    link: "https://www.google.com/maps?q=89+Church+Road,+Pukete,+Hamilton+3200",
    icon: <MapPinIcon/>, 
  },
  {
    id: 3,
    title: "PHONE",
    description: "Mon-Fri from 8am to 5pm",
    contactInfo: "+64 7 838 0090",
    link: "tel:+6478380090",
    icon: <PhoneIcon/>, 
  },
];

// Define animation variants
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const cardHoverVariants = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const GetInTouch = () => {
  return (
    <motion.div
      className="bg-gray-50 py-16 px-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
    >
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          className="text-3xl text-customYellow font-bold mb-4"
          variants={fadeInUpVariants}
        >
          From Concept to Creation
        </motion.h2>
        <motion.p
          className="text-sm text-customBlue mb-10"
          variants={fadeInUpVariants}
        >
          Our focus on quality and attention to detail ensure that every project
          we undertake is a success. Contact us to start building your project
          on a solid foundation.
        </motion.p>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={fadeInUpVariants}
        >
          {contactDetails.map((detail) => (
            <motion.div
              key={detail.id}
              className="relative bg-white p-6 rounded-lg shadow-md flex flex-col items-center overflow-hidden group transition-all duration-300 border-b-4 border-customBlue"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              whileHover="hover"
              variants={cardHoverVariants}
            >
              {/* Sliding Background Effect */}
              <motion.div
                className="absolute inset-0 bg-customBlue transition-transform duration-300 transform translate-y-full group-hover:translate-y-0"
              ></motion.div>

              {/* Icon with Initial Blue Background, Padding, and Hover Effect */}
              <motion.div
                className="relative w-20 h-20 bg-customBlue rounded-full flex items-center justify-center mb-4 z-10 transition-colors duration-300 group-hover:bg-customYellow p-3"
              >
                {React.cloneElement(detail.icon, {
                  className: "w-10 h-10 text-white transition-colors duration-300 group-hover:text-white",
                })}
              </motion.div>

              <motion.h3
                className="text-xl font-semibold mb-2 text-customBlue z-10 relative group-hover:text-white"
                variants={fadeInUpVariants}
              >
                {detail.title}
              </motion.h3>
              <motion.p
                className="text-gray-600 mb-1 z-10 relative group-hover:text-white"
                variants={fadeInUpVariants}
              >
                {detail.description}
              </motion.p>
              <motion.a
                href={detail.link}
                className="text-customBlue font-semibold z-10 relative group-hover:text-white"
                variants={fadeInUpVariants}
                target="_blank" // Opens link in a new tab for address link
                rel="noopener noreferrer" // Security measure for external links
              >
                {detail.contactInfo}
              </motion.a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GetInTouch;
