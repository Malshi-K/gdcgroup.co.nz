// pages/about-us/who-we-are.js
import React, { Suspense } from "react";
import "@/app/globals.css";
import JoinOurTeam from "@/components/about/JoinOurTeam";
import CareerFormEmbed from "@/components/about/CareerFormEmbed";

export const generateMetadata = async () => {
  return {
    title: "Careers at GDC Consultants | Join Our Engineering Team",
    description:
      "Explore exciting career opportunities at GDC Consultants. Join our team of professionals in architecture, engineering, and project management across New Zealand.",
    keywords:
      "GDC careers, engineering jobs, architectural jobs, New Zealand engineering careers, project management jobs, engineering consultant positions",
    openGraph: {
      title: "Careers at GDC Consultants | Join Our Engineering Team",
      description:
        "Join our team of innovative engineers and architects at GDC Consultants. Discover exciting career opportunities across New Zealand.",
      type: "website",
      url: "https://gdcgroup.co.nz/about-us/careers",
      siteName: "GDC Consultants",
      locale: "en_NZ",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: "https://gdcgroup.co.nz/about-us/careers",
      languages: {
        "en-NZ": "https://gdcgroup.co.nz/about-us/careers",
        en: "https://gdcgroup.co.nz/about-us/careers",
      },
    },
  };
};

const Careers = () => {
  return (
    <>
      <Suspense fallback={<div className="text-center py-10">Loading job opportunities...</div>}>
        <JoinOurTeam />
        <CareerFormEmbed />
      </Suspense>
    </>
  );
};

export default Careers;