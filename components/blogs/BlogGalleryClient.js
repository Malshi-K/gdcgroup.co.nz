// components/BlogGalleryClient.js
"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import "@/app/globals.css";
import { Eyebrow, BlueprintGrid, Crosshair } from "@/components/home/homeTheme";

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
      <section
        id="blog-hero-section"
        className="relative z-10 overflow-hidden bg-primary-navy [clip-path:polygon(0_0,100%_0,100%_calc(100%-20px),0_100%)] md:[clip-path:polygon(0_0,100%_0,100%_calc(100%-56px),0_100%)]"
      >
        <BlueprintGrid className="z-[1]" />
        <div className="relative">
          <div className="site-x relative z-10 flex flex-col justify-center pb-24 pt-36 md:min-h-[500px] md:pb-40 md:pt-44">
            <div
              className={`max-w-xl text-center transition-all duration-600 ease-out motion-reduce:transition-none md:text-left ${
                isHeroVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
              }`}
              style={{ transitionDelay: "150ms" }}
            >
              <Eyebrow tone="dark">Our Blog</Eyebrow>
              <h1 className="mt-2 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                Latest News & Updates
              </h1>
            </div>
          </div>
          <div className="hero-fade relative h-64 md:absolute md:inset-y-0 md:right-0 md:h-auto md:w-[58%]">
            <Image
              src="/images/projects/3.webp"
              fill
              priority
              sizes="(min-width: 768px) 58vw, 100vw"
              quality={90}
              className="object-cover opacity-80"
              alt="Background Image"
            />
          </div>
        </div>
      </section>

      {/* Blog grid section */}
      <div className="relative -mt-5 bg-off-white pb-16 pt-10 md:-mt-14 md:pt-20" id="blog-grid-section">
        <Crosshair className="absolute left-6 top-24 hidden opacity-40 md:block" />
        <Crosshair className="absolute right-6 top-24 hidden opacity-40 md:block" />
        <div className="site-x">
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
                    className={`relative flex flex-col justify-between rounded-xl overflow-hidden border border-light hover:border-primary-blue hover:-translate-y-1 hover:shadow-xl transition-all duration-500 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${cardSize} ${
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
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-navy/80 via-primary-navy/20 to-transparent flex items-end p-6 transition-opacity duration-500 hover:from-primary-navy/90">
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
          <p className="text-center text-secondary">No blogs available.</p>
        )}
        </div>
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