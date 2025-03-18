// components/BlogGalleryClient.js
"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import "@/app/globals.css";

const BlogGalleryClient = ({ blogs }) => {
  // State to control animation
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isBlogsVisible, setIsBlogsVisible] = useState(false);
  
  // Use IntersectionObserver to detect when elements come into view
  useEffect(() => {
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeroVisible(true);
        } else {
          // Reset for re-animation when scrolling back
          setIsHeroVisible(false);
        }
      },
      { threshold: 0.2 }
    );
    
    const blogsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsBlogsVisible(true);
        } else {
          // Reset for re-animation when scrolling back
          setIsBlogsVisible(false);
        }
      },
      { threshold: 0.2 }
    );
    
    const heroSection = document.getElementById('blog-hero-section');
    const blogsSection = document.getElementById('blog-grid-section');
    
    if (heroSection) {
      heroObserver.observe(heroSection);
    }
    
    if (blogsSection) {
      blogsObserver.observe(blogsSection);
    }
    
    return () => {
      if (heroSection) {
        heroObserver.unobserve(heroSection);
      }
      if (blogsSection) {
        blogsObserver.unobserve(blogsSection);
      }
    };
  }, []);

  return (
    <>
      <div className="relative" id="blog-hero-section">
        <div
          className={`w-full h-96 relative transition-all duration-800 ease-out ${
            isHeroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <Image
            src="/images/projects/3.webp"
            fill
            sizes="100vw"
            quality={90}
            className="object-cover transition-opacity duration-700 ease-in-out"
            alt="Background Image"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent transition-opacity duration-600 ease-out ${
              isHeroVisible ? "opacity-100" : "opacity-0"
            }`}
          ></div>
        </div>

        <div
          className={`absolute bottom-5 left-5 p-6 text-center md:text-left transition-all duration-600 ease-out ${
            isHeroVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
          }`}
          style={{ transitionDelay: "150ms" }}
        >
          <nav className="text-2xl text-white font-bold mb-2 flex items-center justify-center md:justify-start space-x-1">
            <h1 className="hover:text-customYellow">Our Blog</h1>
          </nav>
          <h2 className="text-white text-5xl font-bold leading-tight">
            Latest News & Updates
          </h2>
        </div>
      </div>

      {/* Blog grid section */}
      <div className="px-10 py-10 min-h-screen" id="blog-grid-section">
        {Array.isArray(blogs) && blogs.length > 0 ? (
          <section
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 transition-all duration-600 ease-out ${
              isBlogsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            {blogs.map((blog, index) => {
              const cardSize = getRandomCardSize();
              return (
                <Link href={`/blogs/${blog.slug}`} key={index}>
                  <div
                    className={`relative flex flex-col justify-between rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 ${cardSize} ${
                      isBlogsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                    }`}
                    style={{ 
                      minHeight: "300px",
                      transitionDelay: `${100 + (index * 50)}ms` 
                    }}
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
                  </div>
                </Link>
              );
            })}
          </section>
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