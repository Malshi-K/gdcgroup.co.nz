// app/services/page.js
import ServicesSection from "@/components/home/ServicesSection";
import { Suspense } from "react";

// Add metadata for SEO
export const metadata = {
  title: "Professional Services | GDC Group",
  description:
    "Explore GDC Group's comprehensive range of engineering, architectural, and project management services for businesses and organizations across New Zealand.",
  keywords:
    "GDC services, engineering services, architectural services, project management, New Zealand consultancy, construction services, building services",
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
