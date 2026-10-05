import { SITE_NAME, SITE_URL } from "@/lib/siteConfig";
// 1. page.js (Server Component)
import ContactSection from "@/components/locations/ContactSection";
import MapSection from "@/components/locations/MapSection";
import "@/app/globals.css";

export const generateMetadata = async () => {
  return {
    metadataBase: new URL(SITE_URL),
    title: 'Our Locations | GDC Group - Engineering Consulting Locations',
    description: 'Leading engineering consulting firm offering innovative solutions across New Zealand. Find your nearest GDC office for expert guidance and support. Contact us today.',
    keywords: 'GDC locations, engineering consultants, New Zealand offices, engineering firm locations, contact GDC, Hamilton office, Auckland office, Thames office, Whitianga office',
    openGraph: {
      title: 'Our Locations | GDC Group - Engineering Consulting Locations',
      description: 'Find your nearest GDC office for expert engineering and architectural solutions.',
      type: 'website',
      url: 'https://gdcgroup.co.nz/locations',
      siteName: SITE_NAME,
      locale: 'en_NZ',      
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: 'https://gdcgroup.co.nz/locations',
      languages: {
        'en-NZ': 'https://gdcgroup.co.nz/locations',
        'en': 'https://gdcgroup.co.nz/locations',
      },
    },
  };
};

export default function ContactUsPage() {
  return (
    <>
      <ContactSection />
      <MapSection />
    </>
  );
}