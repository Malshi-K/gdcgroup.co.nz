"use client"
import React, { useEffect } from "react";
import Image from "next/image";

const CareerFormEmbed = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.hsforms.net/forms/v2.js";
    document.body.appendChild(script);

    script.onload = () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId: process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID,
          formId: process.env.NEXT_PUBLIC_HUBSPOT_CAREER_FORM_ID,
          target: "#hubspotForm",
          cssRequired: false,
          overrideDefaultStyles: true,
          cssClass: "custom-hs-form",
        });
      }
    };

    return () => {
      // Cleanup script when component unmounts
      const existingScript = document.querySelector('script[src="https://js.hsforms.net/forms/v2.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div className="flex justify-center w-full px-4">
      <div className="career-form-container w-full max-w-2xl">
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/images/GDC LOGOS 2024 BLUE.webp"
            alt="Logo"
            className="mb-4 w-60"
            width={240}
            height={96}
          />
          <h1 className="text-2xl text-customBlue font-semibold">Apply Now</h1>
        </div>
        <div id="hubspotForm" className="w-full"></div>
      </div>
    </div>
  );
};

export default CareerFormEmbed;