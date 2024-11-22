"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Head from "next/head";

const Hero = () => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/locations");
    router.prefetch("/portfolio/all-projects");
  }, []);

  return (
    <>
      <Head>
        <title>GDC Consultants: Your Engineering Partner for Success</title>
        <meta
          name="description"
          content="GDC Consultants Ltd offers expert engineering consulting services, delivering innovative solutions tailored to meet your project's unique needs and challenges."
        />
      </Head>

      <section className="relative h-[400px] sm:h-[400px] md:h-[500px] lg:h-[580px] overflow-hidden">
      <motion.div
          className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-center md:text-left z-0 transition-all duration-500 ease-in-out"
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className="container mx-auto px-5 sm:px-8 md:px-10 py-8 sm:py-10 md:py-16 lg:py-20 text-white flex flex-col items-center md:items-start">
            <h1
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-center md:text-left mb-6 leading-snug max-w-3xl text-white"
            >
              TRUSTED ADVISORS FOR EVERY STAGE OF YOUR PROJECT
            </h1>
            <p
              className="mb-6 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed"
            >
              Team of chartered professional engineers & architectural designers
              providing innovative solutions and expert guidance.
            </p>
            <div
              className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4"
              >
              <button onClick={() => router.push("/locations")} className="bg-customYellow text-white px-6 py-3 rounded-xl font-semibold">GET IN TOUCH</button>
              <button onClick={() => router.push("/portfolio/all-projects")} className="bg-white text-customBlue px-6 py-3 rounded-xl font-semibold ml-4">EXPLORE OUR PROJECTS</button>
            </div>
          </div>
        </motion.div>

        <motion.div className="absolute inset-0 z-[-1]">
          <video
            className="w-full h-full object-cover"
            src="/video/Hero.webm"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/images/hero-poster.webp"
          />
        </motion.div>
      </section>
    </>
  );
};

export default Hero;