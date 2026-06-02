"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
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

  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 },
    );

    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { firstname, lastname, phone, email, message } = formData;

    try {
      const hubspotPortalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;
      const hubspotFormId = process.env.NEXT_PUBLIC_HUBSPOT_CONTACT_FORM_ID;
      const url = `https://api.hsforms.com/submissions/v3/integration/submit/${hubspotPortalId}/${hubspotFormId}`;

      // Extract the HubSpot User Tracking Token safely
      const cookieMatch = document.cookie.split("; ").find((row) => row.startsWith("hubspotutk="));
      const hutk = cookieMatch ? cookieMatch.split("=")[1] : "";

      const payload = {
        fields: [
          { name: "firstname", value: firstname },
          { name: "lastname", value: lastname },
          { name: "phone", value: phone },
          { name: "email", value: email },
          { name: "message", value: message },
        ],
        context: {
          hutk: hutk,
          pageUri: window.location.href,
          pageName: document.title,
        },
        legalConsentOptions: {
          consent: {
            consentToProcess: true,
            text: "I agree to allow GDC Consultants Ltd to store and process my personal data.",
          },
        },
      };

      // 1. Submit to HubSpot
      await axios.post(url, payload, {
        headers: { "Content-Type": "application/json" },
      });

      // 2. Fire Google Ads conversion after successful form submission
      if (typeof window !== "undefined" && window.gtag) {
        const transactionId = Date.now().toString();

        await new Promise((resolve) => {
          let isResolved = false;
          const done = () => {
            if (!isResolved) {
              isResolved = true;
              resolve();
            }
          };

          window.gtag("event", "conversion", {
            send_to: "AW-742615805/RGWiCIamnIEbEP3VjeIC",
            value: 4.0,
            currency: "NZD",
            transaction_id: transactionId,
            event_callback: done,
          });

          // Force progress if network lag stops Google's callback from firing within 1 second
          setTimeout(done, 1000);
        });
      } else {
        console.log("[Conversion Debug] Google tag not available on submit.");
      }

      // 3. Successful execution path clear, redirect
      router.push("/thank-you");
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
      <div className="flex-1 flex items-center justify-center py-6 md:py-0">
        <div className="text-left max-w-sm -mt-20 md:mt-0">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 text-customBlue">Head Office</h1>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-customBlue p-3 rounded-full"><MapPinIcon className="h-6 w-6 text-white" /></div>
              <div className="ml-4 text-customBlue">
                <p className="font-semibold">Address</p>
                <p>89 Church Road, Pukete, Hamilton 3200</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-customBlue p-3 rounded-full"><PhoneIcon className="h-6 w-6 text-white" /></div>
              <div className="ml-4 text-customBlue">
                <p className="font-semibold">Phone</p>
                <a href="tel:+6478380090" className="hover:underline">+64 7 838 0090</a>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-customBlue p-3 rounded-full"><EnvelopeIcon className="h-6 w-6 text-white" /></div>
              <div className="ml-4 text-customBlue">
                <p className="font-semibold">Email</p>
                <a href="mailto:hamilton@gdcgroup.co.nz" className="hover:underline">hamilton@gdcgroup.co.nz</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 relative flex justify-center items-center max-w-full min-h-[300px] sm:min-h-[400px] mx-auto">
        <Image src="/images/contact-map.webp" alt="Map" width={700} height={500} style={{ objectFit: "contain" }} />
      </div>

      <div className="flex-1 p-6 bg-white shadow-md rounded-md mt-8 lg:mt-0">
        <h3 className="text-lg md:text-xl lg:text-2xl text-customBlue font-semibold mb-4">Send Message</h3>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input type="text" name="firstname" placeholder="First Name" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" value={formData.firstname} onChange={handleChange} required />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input type="text" name="lastname" placeholder="Last Name" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" value={formData.lastname} onChange={handleChange} required />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
            <input type="tel" name="phone" placeholder="Mobile Number" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" value={formData.phone} onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" name="email" placeholder="Email" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea name="message" placeholder="Type your message..." className="mt-1 block w-full p-2 border border-gray-300 rounded-md" rows="4" value={formData.message} onChange={handleChange} required />
          </div>
          {error && <p className="text-red-600 mb-2">{error}</p>}
          <button type="submit" className="w-full text-white py-2 px-4 rounded-md transition bg-customBlue hover:bg-customYellow">
            Send
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;