"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eyebrow } from "./homeTheme";

const BlogSkeleton = () => (
  <div className="bg-white shadow-lg rounded-lg overflow-hidden animate-pulse">
    <div className="h-48 bg-light-blue" />
    <div className="p-6">
      <div className="h-4 bg-light-blue rounded w-3/4 mb-4" />
      <div className="h-8 bg-light-blue rounded mb-4" />
      <div className="h-4 bg-light-blue rounded w-1/4" />
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
        const response = await fetch("/api/blogs");
        const data = await response.json();

        if (!response.ok)
          throw new Error(data.error || "Failed to fetch blogs");

        setBlogs(data.blogs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const animations = {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
      },
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
      },
    },
  };

  if (loading) {
    return (
      <div className="site-x">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((n) => (
            <BlogSkeleton key={n} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="site-x py-12 text-center text-red-500">
        Error loading blogs: {error}
      </div>
    );
  }

  if (!blogs?.length) {
    return (
      <div className="site-x py-12 text-center">
        No blogs available at the moment.
      </div>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <motion.div
        className="site-x"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={animations.container}
      >
        <motion.div className="text-center mb-12" variants={animations.item}>
          <Eyebrow center>From Our Blog</Eyebrow>
          <h2 className="text-4xl text-primary-blue uppercase font-bold mt-2">
            Latest News & Updates
          </h2>
          <h3 className="text-md text-primary-navy tracking-wide max-w-3xl mx-auto">
            Stay up-to-date with the latest news and insights from the
            construction industry by checking out our blog.
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.article
              key={blog.id}
              className="bg-white border border-light rounded-xl overflow-hidden group hover:border-primary-blue hover:-translate-y-1 hover:shadow-lg transition-all duration-300 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              variants={animations.item}
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={blog.featuredImage || "/images/default-blog.webp"}
                  alt={blog.htmlTitle}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  loading={index < 3 ? "eager" : "lazy"}
                  quality={75}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSAyVC1ELjAsQU5MTlAvRWFGS0VKU0ZPVk9gZGR4Y0tgiXBfcXR4c2z/2wBDARUXFx4aHR4eHWxvQkJsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGz/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />
              </div>

              <div className="p-6 text-center">
                <h4 className="text-lg font-semibold text-primary-navy mb-4 line-clamp-2 group-hover:text-primary-blue transition-colors duration-300">
                  {blog.name}
                </h4>

                <Link
                  href={blog.slug}
                  className="btn-primary btn-sm"
                >
                  Read More
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default BlogSection;
