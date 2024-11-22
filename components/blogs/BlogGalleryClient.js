// components/BlogGalleryClient.js
"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import "@/app/globals.css";

const BlogGalleryClient = ({ blogs }) => {
  // Animation Variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const slideInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <>
      <div className="relative">
        <motion.div
          className="w-full h-96 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={slideInUp}
        >
          <Image
            src="/images/projects/3.webp"
            fill
            sizes="100vw"
            quality={90}
            className="object-cover transition-opacity duration-700 ease-in-out"
            alt="Background Image"
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"
            variants={fadeIn}
          ></motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-5 left-5 p-6 text-center md:text-left"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={slideInLeft}
        >
          <nav className="text-2xl text-white font-bold mb-2 flex items-center justify-center md:justify-start space-x-1">
            <h1 className="hover:text-customYellow">Our Blog</h1>
          </nav>
          <h1 className="text-white text-5xl font-bold leading-tight">
            Latest News & Updates
          </h1>
        </motion.div>
      </div>

      {/* Blog grid section */}
      <div className="px-10 py-10 min-h-screen">
        {Array.isArray(blogs) && blogs.length > 0 ? (
          <motion.section
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={fadeIn}
          >
            {blogs.map((blog, index) => {
              const cardSize = getRandomCardSize();
              return (
                <Link href={`/blogs/${blog.slug}`} key={index}>
                  <motion.div
                    className={`relative flex flex-col justify-between rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200 ${cardSize}`}
                    style={{ minHeight: "300px" }}
                    variants={fadeIn}
                  >
                    <Image
                      src={blog.featuredImage || "/images/GDC-OFFICE-EDIT-scaled.webp"}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-opacity duration-700 hover:opacity-90"
                      alt={blog.featuredImageAltText || "Blog Post"}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end p-6 transition-opacity duration-500 hover:bg-opacity-40">
                      <h3 className="text-xl font-semibold text-white">
                        {blog.name}
                      </h3>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </motion.section>
        ) : (
          <p className="text-center text-gray-500">No blogs available.</p>
        )}
      </div>
    </>
  );
};

// Function to randomly assign size and positioning to the card
const getRandomCardSize = () => {
  const sizes = [
    "sm:col-span-2 lg:col-span-2 row-span-2",
    "lg:row-span-2",
    "lg:col-span-2",
    "",
  ];

  const randomIndex = Math.floor(Math.random() * sizes.length);
  return sizes[randomIndex];
};

export default BlogGalleryClient;