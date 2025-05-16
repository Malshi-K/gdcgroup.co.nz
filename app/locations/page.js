// app/locations/page.js
import MapSection from "@/components/locations/MapSection";
import { Suspense } from "react";

// Add metadata for SEO
export const metadata = {
  title: "Our Locations | GDC Group",
  description: "Find GDC Group offices and service locations across New Zealand. Contact our local teams for engineering, architectural, and project management services in your area.",
  keywords: "GDC locations, GDC offices, New Zealand engineering offices, GDC Auckland, GDC Wellington, GDC Christchurch, engineering consultancy locations",
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
    canonical: "https://gdcgroup.co.nz/locations",
    languages: {
      "en-NZ": "https://gdcgroup.co.nz/locations",
      en: "https://gdcgroup.co.nz/locations",
    },
  },
};

export default function LocationsPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-[50vh]">Loading locations...</div>}>
      <MapSection />
    </Suspense>
  );
}