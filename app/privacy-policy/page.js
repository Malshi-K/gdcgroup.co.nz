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
  title: "Privacy Policy | GDC Consultants NZ",
  description:
    "Learn how GDC Consultants NZ collects, uses, and protects your personal information. Read our full privacy policy to understand your data rights and security.",
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
