import { SITE_URL } from "@/lib/siteConfig";
// app/locations/[slug]/page.js

import { notFound } from 'next/navigation';
import { 
  getLocationContent, 
  generateLocationStaticParams, 
  locationExists 
} from '@/utils/locationContent';
import LocationPage from '@/components/local-pages/LocationPage';

// Generate static params for all locations
export async function generateStaticParams() {
  return generateLocationStaticParams();
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params; // Await params
  const locationData = getLocationContent(slug);
  
  if (!locationData) {
    return {
      metadataBase: new URL(SITE_URL),
      title: 'Location Not Found | GDC Group',
    };
  }

  return {
    metadataBase: new URL(SITE_URL),
    title: `${locationData.metaTitle || locationData.title} | GDC Group`,
    description: locationData.metaDescription || locationData.description,
    keywords: `engineering, planning, ${slug}, GDC Group`,
    alternates: {
      canonical: `https://gdcgroup.co.nz/locations/${slug}`,
    },
  };
}

export default async function LocationRoute({ params }) {
  const { slug } = await params; // Await params
  
  // Check if location exists
  if (!locationExists(slug)) {
    notFound();
  }

  // Get location content
  const locationData = getLocationContent(slug);

  return <LocationPage locationData={locationData} />;
}