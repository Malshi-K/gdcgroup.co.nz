import PrivacyPolicy from "@/components/cookie/PrivacyPolicy";
import { Suspense } from "react";

// pages/privacy-policy.js
export default function PrivacyPolicyPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-[50vh]">
          Loading service details...
        </div>
      }
    >
      <PrivacyPolicy />
    </Suspense>
  );
}

export const metadata = {
  title: "GDC Group | Privacy Policy",
  description:
    "Learn about GDC Group's privacy practices, how we collect, use and protect your personal information, and your rights regarding your data.",
  keywords:
    "GDC careers, engineering jobs, architectural jobs, New Zealand engineering careers, project management jobs, engineering consultant positions",

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
    canonical: "https://gdcgroup.co.nz/privacy-policy",
    languages: {
      "en-NZ": "https://gdcgroup.co.nz/privacy-policy",
      en: "https://gdcgroup.co.nz/privacy-policy",
    },
  },
};
