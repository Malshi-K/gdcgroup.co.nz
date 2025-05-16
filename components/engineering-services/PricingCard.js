// PricingCard.jsx
import Link from "next/link";
import React, { useEffect, useState } from "react";

const PricingCard = () => {
  const [screenSize, setScreenSize] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  const [formData, setFormData] = useState({
    firstname: "", // Changed from full_name to firstname to match HubSpot property
    email: "",
    phone: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("idle");
  const [formMessage, setFormMessage] = useState("");

  useEffect(() => {
    // Function to update screen size state
    const updateScreenSize = () => {
      const width = window.innerWidth;
      setScreenSize({
        isMobile: width < 640,
        isTablet: width >= 640 && width < 1024,
        isDesktop: width >= 1024,
      });
    };

    // Initial size detection
    updateScreenSize();

    // Set up resize listener
    window.addEventListener("resize", updateScreenSize);

    // Clean up event listener
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("submitting");

    // Use the HubSpot form API endpoint
    const endpoint =
      "https://api.hsforms.com/submissions/v3/integration/submit/6187835/5ab46a54-d6a7-458d-a847-f1567845027d";

    try {
      // Map field names correctly according to HubSpot property names
      const payload = {
        fields: [
          // Using the correct HubSpot property name "firstname"
          { name: "firstname", value: formData.firstname },
          { name: "email", value: formData.email },
          { name: "phone", value: formData.phone },
          { name: "message", value: formData.message },
        ],
        context: {
          pageUri: window.location.href,
          pageName: "Website Development Pricing",
        },
        // Add this to ensure notifications are sent
        legalConsentOptions: {
          consent: {
            consentToProcess: true,
            text: "I agree to allow GDC Digital Solutions to store and process my personal data.",
          },
        },
      };

      console.log("Submitting form with payload:", payload);

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();
      console.log("HubSpot API response:", responseData);

      if (response.ok) {
        // Track form submission conversion if needed
        // if (typeof window !== "undefined" && window.gtag) {
        //   window.gtag("event", "conversion", {
        //     send_to: "AW-16917143672/LaiLCKf31asaEPjA3II_",
        //   });
        // }

        setFormStatus("success");
        setFormMessage("Thank you! We'll be in touch soon.");
        setFormData({
          firstname: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        console.error("Form submission error:", responseData);
        setFormStatus("error");
        setFormMessage(
          responseData.message ||
            "There was an issue with your submission. Please try again."
        );
      }
    } catch (error) {
      console.error("Form submission exception:", error);
      setFormStatus("error");
      setFormMessage(
        "There was an error submitting the form. Please check your internet connection and try again."
      );
    }
  };

  return (
    <div className="bg-white/80 w-full rounded-xl shadow-xl overflow-hidden backdrop-blur-sm">
      <div className="mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8">
        {/* Header Text - Responsive sizing */}
        <div className="mb-4 sm:mb-5 text-center">
          <h2 className="text-customBlue font-bold mb-2 sm:mb-3 text-3xl sm:text-4xl leading-tight">
            Need Expert Engineering Solutions?
          </h2>
          <p className="text-gray-900 text-sm sm:text-base mb-3 max-w-xl mx-auto">
            Our team of structural, geotechnical, and seismic engineering
            experts is ready to help with your project. Whether you're building
            a new structure or needing assessment of an existing one, we deliver
            practical and compliant solutions tailored to New Zealand's unique
            conditions.
          </p>
        </div>

        {/* Card with proper sizing - white background and yellow border matching screenshot */}
        <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 text-center mx-auto">
          {/* Form Section with improved text visibility */}
          <div className="w-full">
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              {/* Name field with improved text visibility - using firstname instead of full_name */}
              <div className="bg-gray-100 rounded-lg p-1">
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full p-2 bg-gray-100 text-gray-900 font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                />
              </div>

              {/* Email field with improved text visibility */}
              <div className="bg-gray-100 rounded-lg p-1">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address*"
                  className="w-full p-2 bg-gray-100 text-gray-900 font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                />
              </div>

              {/* Phone field with improved text visibility */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full p-2 bg-gray-100 text-gray-900 font-medium rounded-r-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              {/* Message field with improved text visibility */}
              <div className="bg-gray-100 rounded-lg p-1">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message"
                  className="w-full p-2 bg-gray-100 text-gray-900 font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 h-24 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={formStatus === "submitting"}
                className={`w-full py-3 ${
                  formStatus === "submitting"
                    ? "bg-gray-400"
                    : "bg-customBlue hover:bg-customBlue"
                } text-white rounded-lg font-medium transition duration-300`}
              >
                {formStatus === "submitting" ? "Submitting..." : "Submit"}
              </button>
            </form>

            {formStatus === "success" && (
              <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg">
                {formMessage}
              </div>
            )}

            {formStatus === "error" && (
              <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
                {formMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
