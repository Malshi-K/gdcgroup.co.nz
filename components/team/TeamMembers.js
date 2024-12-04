"use client";
import React from "react";
import Image from "next/image";
import "@/app/globals.css";
import { motion } from "framer-motion";
import SubContact from "@/components/SubContact";
import { teamMembers } from "@/app/data/teamMembers";

const TeamMembers = () => {
  return (
    <div className="min-h-screen bg-white">
      <header className="pt-8 pb-16 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-10">
          <h1 className="text-6xl font-bold text-center text-customBlue">
            Our Core Team
          </h1>
        </div>
      </header>
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-24"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center group"
            >
              <div className="relative mb-8 w-full h-[450px] overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-all duration-300 group-hover:grayscale-[50%]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <h3 className="text-2xl font-semibold text-customBlue mb-2">
                {member.name}
              </h3>
              <p className="text-gray-600 text-base text-center max-w-[280px]">
                {member.position}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <SubContact />
    </div>
  );
};

export default TeamMembers;