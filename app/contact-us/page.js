import { SITE_NAME, SITE_URL } from "@/lib/siteConfig";
// 1. page.js (Server Component)
import ContactSection from "@/components/locations/ContactSection";
import MapSection from "@/components/locations/MapSection";
import "@/app/globals.css";

export const generateMetadata = async () => {
  return {
    metadataBase: new URL(SITE_URL),
    title: 'Contact Us | GDC Group',
    description: 'Contact GDC Group, engineering consultants across New Zealand. Find your nearest office and speak to our team about your next project.',
    keywords: 'GDC locations, engineering consultants, New Zealand offices, engineering firm locations, contact GDC, Hamilton office, Auckland office, Thames office',
    openGraph: {
      title: 'Contact Us | GDC Group',
      description: 'Find your nearest GDC Group office and contact our team for expert engineering and infrastructure consultancy.',
      type: 'website',
      url: 'https://gdcgroup.co.nz/contact-us',
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
      canonical: 'https://gdcgroup.co.nz/contact-us',
      languages: {
        'en-NZ': 'https://gdcgroup.co.nz/contact-us',
        'en': 'https://gdcgroup.co.nz/contact-us',
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