// components/home/BlogSection.js
"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  CalendarIcon,
  UserIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/solid";

const BlogSkeleton = () => (
  <div className="bg-white shadow-lg rounded-lg overflow-hidden animate-pulse">
    <div className="h-48 bg-gray-200" />
    <div className="p-6">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
      <div className="h-8 bg-gray-200 rounded mb-4" />
      <div className="h-4 bg-gray-200 rounded w-1/4" />
    </div>
  </div>
);

const BlogSection = () => {
  const [blogs, setBlogs] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs');
        const data = await response.json();
        
        if (!response.ok) throw new Error(data.error || 'Failed to fetch blogs');
        
        setBlogs(data.blogs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Animation variants
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const scaleUpVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((n) => (
          <BlogSkeleton key={n} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 text-center text-red-500">
        Error loading blogs: {error}
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="py-12 text-center">
        No blogs available at the moment.
      </div>
    );
  }

  return (
    <motion.div
      className="py-12 bg-gray-50 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
    >
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        variants={fadeInUpVariants}
      >
        <motion.div
          className="text-center mb-12 px-6 md:px-10 xl:px-16"
          variants={fadeInUpVariants}
        >
          <h2 className="text-4xl text-customYellow uppercase font-bold mt-2">
            Latest News & Updates
          </h2>
          <h3 className="text-md text-customBlue tracking-wide">
            Stay up-to-date with the latest news and insights from the
            construction industry by checking out our blog.
          </h3>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={fadeInUpVariants}
        >
          {blogs.map((blog) => (
            <motion.div
              key={blog.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden group hover:shadow-2xl transition duration-300"
              variants={scaleUpVariants}
              whileInView="visible"
              initial="hidden"
              viewport={{ once: false, amount: 0.2 }}
            >
              <Image
                src={blog.featuredImage || "/images/default-blog.webp"}
                alt={blog.htmlTitle}
                width={600}
                height={300}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                priority
              />

              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <span className="flex items-center mr-4">
                    <CalendarIcon className="w-5 h-5 text-customYellow mr-1" />
                    {new Date(blog.publishDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span className="flex items-center mr-4">
                    <UserIcon className="w-5 h-5 text-customYellow mr-1" />
                    Bethany Rutter
                  </span>
                  <span className="flex items-center">
                    <ChatBubbleLeftEllipsisIcon className="w-5 h-5 text-customYellow mr-1" />
                    {blog.commentsCount || 0}
                  </span>
                </div>

                <h4 className="text-lg font-semibold text-customBlue mb-4 group-hover:text-customYellow transition-colors duration-300">
                  {blog.name}
                </h4>

                <a          
                  href={blog.slug}
                  className="inline-block text-sm text-white bg-customBlue py-2 px-4 rounded-full hover:bg-customYellow transition-colors duration-300"
                >
                  Read More
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default BlogSection;