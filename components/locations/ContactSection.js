"use client";

import React, { useState, useRef, useEffect } from "react";
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import Image from "next/image";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Handle intersection observer to detect when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false); // Reset for re-animation when scrolling back
        }
      },
      { threshold: 0.2 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstname, lastname, phone, email, message } = formData;

    try {
      const hubspotPortalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;
      const hubspotFormId = process.env.NEXT_PUBLIC_HUBSPOT_CONTACT_FORM_ID;

      const url = `https://api.hsforms.com/submissions/v3/integration/submit/${hubspotPortalId}/${hubspotFormId}`;

      const payload = {
        fields: [
          { name: "firstname", value: firstname },
          { name: "lastname", value: lastname },
          { name: "phone", value: phone },
          { name: "email", value: email },
          { name: "message", value: message },
        ],
      };

      await axios.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setSubmitted(true);
      setFormData({
        firstname: "",
        lastname: "",
        phone: "",
        email: "",
        message: "",
      });
    } catch (error) {
      setError("There was an error submitting the form. Please try again.");
      console.error("Error submitting to HubSpot:", error);
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`relative flex flex-col lg:flex-row bg-white text-black py-6 px-4 md:px-8 lg:px-16 overflow-hidden transition-all duration-600 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
    >
      {/* Left Content Column */}
      <div
        className={`flex-1 flex items-center justify-center py-6 md:py-0 transition-all duration-600 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
        style={{ transitionDelay: "100ms" }}
      >
        <div className="text-left max-w-sm -mt-20 md:mt-0">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 text-customBlue">
            Head Office
          </h1>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-customBlue p-3 rounded-full">
                <MapPinIcon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4 text-customBlue">
                <p className="font-semibold">Address</p>
                <p>89 Church Road, Pukete, Hamilton 3200</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-customBlue p-3 rounded-full">
                <PhoneIcon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4 text-customBlue">
                <p className="font-semibold">Phone</p>
                <a
                  href="tel:+6478380090"
                  className="text-customBlue hover:underline"
                >
                  +64 7 838 0090
                </a>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-customBlue p-3 rounded-full">
                <EnvelopeIcon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4 text-customBlue">
                <p className="font-semibold">Email</p>
                <a
                  href="mailto:hamilton@gdcgroup.co.nz"
                  className="text-customBlue hover:underline"
                >
                  hamilton@gdcgroup.co.nz
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Center Map Column */}
      <div
        className={`flex-1 relative flex justify-center items-center max-w-full min-h-[300px] sm:min-h-[400px] md:min-h-[450px] mx-auto transition-all duration-600 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
        style={{ width: "100%", height: "auto", transitionDelay: "200ms" }}
      >
        <Image
          src="/images/contact-map.webp" // Ensure the correct path is used
          alt="Map"
          width={700} // You can set this as per the aspect ratio of the image
          height={500} // This should be adjusted for proper aspect ratio
          style={{ objectFit: "contain" }}
        />
      </div>

      {/* Right Form Column */}
      <div
        className={`flex-1 p-6 bg-white shadow-md rounded-md mt-8 lg:mt-0 transition-all duration-600 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
        style={{ transitionDelay: "300ms" }}
      >
        <h3 className="text-lg md:text-xl lg:text-2xl text-customBlue font-semibold mb-4">
          Send Message
        </h3>
        {submitted ? (
          <p className="text-green-600">Thank you for your message!</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={formData.lastname}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="Mobile Number"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                name="message"
                placeholder="Type your message..."
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            {error && <p className="text-red-600">{error}</p>}
            <button
              type="submit"
              className="w-full bg-customBlue text-white py-2 px-4 rounded-md hover:bg-customYellow transition"
            >
              Send
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default ContactSection;