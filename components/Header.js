"use client"; // Add this line to make it a Client Component

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image"; // Importing Image from next/image for optimization
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  
  const pathname = usePathname(); // Get the current pathname

  // Detect if the current view is mobile or desktop
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth <= 1024);
    };

    checkMobileView();
    window.addEventListener("resize", checkMobileView);

    return () => {
      window.removeEventListener("resize", checkMobileView);
    };
  }, []);

  // Close menu when pathname changes
  useEffect(() => {
    setIsMenuOpen(false); // Close the menu when the pathname changes
    setActiveDropdown(null); // Close any active dropdown
  }, [pathname]);

  // Toggle menu on mobile
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  // Handle dropdown toggle for mobile view
  const handleMobileDropdownToggle = useCallback((dropdown) => {
    setActiveDropdown((prev) => (prev === dropdown ? null : dropdown));
  }, []);

  // Toggle "More" items in submenus
  const toggleMoreItems = useCallback(() => {
    setIsMoreOpen((prev) => !prev);
  }, []);

  // Desktop hover functions
  const handleDesktopDropdownMouseEnter = useCallback((dropdown) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(dropdown);
  }, []);

  const handleDesktopDropdownMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200); // Delay for smooth closing
  }, []);

  // Handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-md">
      {/* Navigation Bar */}
      <div className="max-w-screen-full mx-auto px-5 sm:px-8 md:px-10">
        <nav className="flex justify-between items-center py-3 px-4 lg:px-6">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/images/GDC LOGOS 2024 BLUE.webp"
                alt="GDC Consultants Ltd Logo"
                width={500} // Set a higher intrinsic width
                height={200} // Set a higher intrinsic height
                priority
                className="w-[150px] h-auto md:w-[150px] lg:w-[200px] cursor-pointer"
              />
            </Link>
          </div>

          {/* Hamburger Menu Icon for Mobile on the Right */}
          <div className="flex lg:hidden ml-auto">
            {/* Mobile Menu Toggle Button */}
            <button onClick={toggleMenu} className="lg:hidden">
              {isMenuOpen ? (
                <XMarkIcon className="w-6 h-6 text-black transition-transform duration-300" />
              ) : (
                <Bars3Icon className="w-6 h-6 text-black transition-transform duration-300" />
              )}
            </button>
          </div>

          {/* Desktop Menu Items */}
          <ul className="hidden lg:flex lg:space-x-2 lg:items-center">
            {[
              { href: "/", label: "HOME" },
              {
                label: "SERVICES",
                dropdown: "services",
                items: [
                  {
                    href: "/services/3-waters",
                    label: "3 Waters & Contamination",
                  },
                  {
                    href: "/services/architectural-designs",
                    label: "Architectural Designs",
                  },
                  {
                    href: "/services/electrical-engineering",
                    label: "Electrical Engineering",
                  },
                  {
                    href: "/services/project-management",
                    label: "Project & Construction Management",
                  },
                  {
                    href: "/services/geotechnical-engineering",
                    label: "Geotechnical Engineering",
                  },
                  {
                    href: "/services/infrastructure",
                    label: "Infrastructure & Subdivision Engineering",
                  },
                  {
                    href: "/services/research-development",
                    label: "Research & Development",
                  },
                  { href: "/services/road-transport", label: "Road Transport" },
                  {
                    href: "/services/seismic-engineering",
                    label: "Seismic Engineering",
                  },
                  {
                    href: "/services/structural-engineering",
                    label: "Structural Engineering",
                  },
                  { href: "/services/planning", label: "Planning" },
                  { href: "/services/surveying", label: "Surveying" },
                  { href: "/services/training", label: "Training" },
                ],
              },
              { href: "/portfolio/all-projects", label: "OUR PORTFOLIO" },
              {
                label: "ABOUT US",
                dropdown: "aboutus",
                items: [
                  { href: "/about-us/who-we-are", label: "Who We Are" },
                  { href: "/about-us/careers", label: "Careers" },
                  { href: "/about-us/review", label: "Leave us a Review" },
                  { href: "/locations", label: "Our Locations" },
                ],
              },
              { href: "/team", label: "OUR TEAM" },
              { href: "/blogs", label: "BLOGS" },
            ].map((item) =>
              item.items ? (
                <li
                  key={item.label}
                  className="relative text-center"
                  onMouseEnter={() =>
                    !isMobileView &&
                    handleDesktopDropdownMouseEnter(item.dropdown)
                  }
                  onMouseLeave={() =>
                    !isMobileView && handleDesktopDropdownMouseLeave()
                  }
                >
                  <button
                    className="flex items-center justify-center text-sm sm:text-base font-semibold py-1 px-2 lg:py-2 lg:px-3 cursor-pointer text-customBlue"
                    onClick={() =>
                      isMobileView
                        ? handleMobileDropdownToggle(item.dropdown)
                        : null
                    }
                  >
                    {item.label}
                    <ChevronDownIcon className="w-3 h-3 ml-1" />
                  </button>
                  {/* Dropdown Items for Desktop */}
                  <ul
                    className={`${
                      activeDropdown === item.dropdown ? "block" : "hidden"
                    } absolute left-0 mt-6 ${
                      item.dropdown === "services" ? "w-[700px]" : "w-[200px]"
                    } bg-white opacity-90 shadow-lg rounded-lg p-3`}
                  >
                    <div
                      className={`grid ${
                        item.dropdown === "services"
                          ? "grid-cols-2"
                          : "grid-cols-1"
                      }`}
                    >
                      {item.items.map((subItem, index) => (
                        <li
                          key={subItem.href}
                          className="whitespace-nowrap text-left"
                        >
                          {/* Make sure the text is left-aligned */}
                          <Link
                            href={subItem.href}
                            className={`block px-2 py-2 text-sm sm:text-base font-semibold ${
                              pathname === subItem.href
                                ? "text-customYellow"
                                : "text-customBlue"
                            } hover:text-customYellow hover:rounded-md transition-all duration-300`}
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </div>
                  </ul>
                </li>
              ) : (
                <li key={item.href} className="text-center">
                  <Link
                    href={item.href}
                    className={`block text-center text-sm sm:text-base font-semibold py-1 px-2 lg:py-2 lg:px-3 ${
                      pathname === item.href
                        ? "text-customYellow"
                        : "text-customBlue"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          {/* Mobile Menu Items */}
          <ul
            className={`absolute top-full left-0 w-full bg-white shadow-md lg:hidden transition-all duration-300 ease-in-out ${
              isMenuOpen
                ? "max-h-[75vh] opacity-100 overflow-y-auto"
                : "max-h-0 hidden"
            }`}
            style={{ zIndex: 100 }}
          >
            {[
              { href: "/", label: "Home" },
              {
                label: "Services",
                dropdown: "services",
                items: [
                  {
                    href: "/services/3-waters",
                    label: "3 Waters & Contamination",
                  },
                  {
                    href: "/services/architectural-designs",
                    label: "Architectural Designs",
                  },
                  {
                    href: "/services/electrical-engineering",
                    label: "Electrical Engineering",
                  },
                  {
                    href: "/services/project-management",
                    label: "Project & Construction Management",
                  },
                  {
                    href: "/services/geotechnical-engineering",
                    label: "Geotechnical Engineering",
                  },
                  {
                    href: "/services/infrastructure",
                    label: "Infrastructure & Subdivision Engineering",
                  },
                  {
                    href: "/services/research-development",
                    label: "Research & Development",
                  },
                  { href: "/services/road-transport", label: "Road Transport" },
                  {
                    href: "/services/seismic-engineering",
                    label: "Seismic Engineering",
                  },
                  {
                    href: "/services/structural-engineering",
                    label: "Structural Engineering",
                  },
                  { href: "/services/planning", label: "Planning" },
                  { href: "/services/surveying", label: "Surveying" },
                  { href: "/services/training", label: "Training" },
                ],
              },
              { href: "/portfolio/all-projects", label: "Our Portfolio" },
              {
                label: "About Us",
                dropdown: "aboutus",
                items: [
                  { href: "/about-us/who-we-are", label: "Who We Are" },
                  { href: "/about-us/careers", label: "Careers" },
                  { href: "/about-us/review", label: "Leave us a Review" },
                  { href: "/locations", label: "Our Locations" },
                ],
              },
              { href: "/team", label: "Our Team" },
              { href: "/blogs", label: "Blogs" },
              { href: "tel:+6478380090", label: "Call Now" },
              { href: "/locations", label: "Our Locations" },
            ].map((item) =>
              item.items ? (
                <li key={item.label} className="relative">
                  <button
                    className="flex justify-between items-center w-full py-2 px-4 text-left font-light text-gray-800"
                    onClick={() => handleMobileDropdownToggle(item.dropdown)}
                  >
                    <span className="flex items-center">
                      {activeDropdown === item.dropdown ? (
                        <MinusIcon className="w-5 h-5 mr-2" />
                      ) : (
                        <PlusIcon className="w-5 h-5 mr-2" />
                      )}
                      {item.label}
                    </span>
                  </button>
                  <ul
                    className={`${
                      activeDropdown === item.dropdown ? "block" : "hidden"
                    } pl-4 bg-gray-50 border-l border-gray-200`}
                  >
                    {item.items
                      .slice(0, isMoreOpen ? item.items.length : 4)
                      .map((subItem) => (
                        <li key={subItem.href}>
                          <Link
                            href={subItem.href}
                            className={`block py-2 px-11 ${
                              pathname === subItem.href
                                ? "text-customYellow"
                                : "text-gray-700"
                            } hover:text-customBlue transition-all duration-300`}
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    {item.items.length > 4 && (
                      <li>
                        <button
                          onClick={toggleMoreItems}
                          className="block w-full text-left py-2 px-11 font-semibold text-customBlue"
                        >
                          {isMoreOpen ? "Less" : "More"}
                        </button>
                      </li>
                    )}
                  </ul>
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block py-2 px-11 font-light ${
                      pathname === item.href
                        ? "text-customYellow"
                        : "text-gray-800"
                    } hover:text-customBlue transition-all duration-300`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          {/* Desktop version of the "OUR LOCATIONS" button */}
          <div className="flex items-center lg:space-x-4">
            {/* CALL NOW Button */}
            <Link
              href="tel:+6478380090"
              className="hidden text-center lg:flex justify-center items-center bg-customYellow text-white text-xs sm:text-sm font-semibold px-3 py-1 lg:px-4 lg:py-2 rounded-md hover:bg-yellow-600"
              onClick={() => setIsMenuOpen(false)}
            >
              CALL NOW
            </Link>

            {/* OUR LOCATIONS Button */}
            <Link
              href="/locations"
              className="hidden text-center lg:flex justify-center items-center bg-customYellow text-white text-xs sm:text-sm font-semibold px-3 py-1 lg:px-4 lg:py-2 rounded-md hover:bg-yellow-600"
              onClick={() => setIsMenuOpen(false)}
            >
              OUR LOCATIONS
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
