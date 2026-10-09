import { SITE_URL } from "@/lib/siteConfig";
// app/services/page.js
import ServicesSection from "@/components/home/ServicesSection";
import { Suspense } from "react";

// Add metadata for SEO
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Professional Services | GDC Group",
  description:
    "Explore GDC Group's engineering, infrastructure and project management services for developers, businesses and organisations across New Zealand.",
  keywords:
    "GDC services, engineering services, infrastructure engineering, project management, New Zealand consultancy, construction services, building services",
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
    canonical: "https://gdcgroup.co.nz/services",
    languages: {
      "en-NZ": "https://gdcgroup.co.nz/services",
      en: "https://gdcgroup.co.nz/services",
    },
  },
};

export default function ServicePage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-[50vh]">
          Loading service details...
        </div>
      }
    >
      <ServicesSection />
    </Suspense>
  );
}
