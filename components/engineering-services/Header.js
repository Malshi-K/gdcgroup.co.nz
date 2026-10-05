"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});
  const pathname = usePathname();
  const sidebarRef = useRef(null);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.closest(".menu-button")
      ) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  // Lock body scroll when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSidebarOpen]);

  // Close sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Toggle dropdown in sidebar
  const toggleDropdown = (index) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <>
      {/* Header */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 site-x ${
          isScrolled ? "bg-primary-navy bg-opacity-90 shadow-md" : "bg-transparent"
        }`}
      >
        <div className="w-full flex items-center justify-between py-3 sm:py-4">
          {/* Logo with increased size */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/gdc-group-logo.png"
              alt="GDC Group"
              width={320}  /* Increased from 240 */
              height={128}  /* matches new logo aspect ratio (1983x793) */
              className="h-auto w-auto max-w-[200px] sm:max-w-[250px] md:max-w-[280px] lg:max-w-[320px]"  /* Increased all max-width values */
              priority={true}
              loading="eager"
              sizes="(max-width: 640px) 200px, (max-width: 768px) 250px, (max-width: 1024px) 280px, 320px"  /* Updated sizes attribute */
              quality={85}
              // TODO: replace with official white/reversed logo
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;