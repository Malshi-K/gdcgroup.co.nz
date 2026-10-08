import { SITE_NAME, SITE_URL } from "@/lib/siteConfig";
// pages/about-us/who-we-are.js
import React, { Suspense } from "react";
import "@/app/globals.css";
import JoinOurTeam from "@/components/about/JoinOurTeam";
import JobList from "@/components/about/JobList";
import CareerFormEmbed from "@/components/about/CareerFormEmbed";

export const generateMetadata = async () => {
  return {
    metadataBase: new URL(SITE_URL),
    title: "Careers at GDC Group | Join Our Engineering Team",
    description:
      "Explore exciting career opportunities at GDC Group. Join our team of professionals in architecture, engineering, and project management across New Zealand.",
    keywords:
      "GDC careers, engineering jobs, architectural jobs, New Zealand engineering careers, project management jobs, engineering consultant positions",
    openGraph: {
      title: "Careers at GDC Group | Join Our Engineering Team",
      description:
        "Join our team of innovative engineers and architects at GDC Group. Discover exciting career opportunities across New Zealand.",
      type: "website",
      url: "https://gdcgroup.co.nz/about-us/careers",
      siteName: SITE_NAME,
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
      <Suspense
        fallback={
          <div className="flex justify-center items-center min-h-[50vh]">
            Loading service details...
          </div>
        }
      >
        <JoinOurTeam />
        <JobList />
        <div className="py-12 bg-off-white">
          <div className="site-x">
            <h2 className="text-3xl font-bold text-primary-navy text-center mb-2">
              Didn&apos;t find a position that matches your interests?
            </h2>
            <p className="text-center text-secondary mb-8">
              Tell us about your interests and qualifications, and we&apos;ll reach out if a suitable opportunity arises!
            </p>
          </div>
        </div>
        <CareerFormEmbed />
      </Suspense>
    </>
  );
};

export default Careers;
