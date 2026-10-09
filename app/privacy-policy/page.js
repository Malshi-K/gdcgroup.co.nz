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
  title: "Privacy Policy | GDC Group",
  description:
    "Learn how GDC Group collects, uses, and protects your personal information. Read our full privacy policy to understand your data rights and security.",
  keywords:
    "GDC Group privacy policy, personal information, data protection, privacy rights, New Zealand engineering consultants",
  
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
