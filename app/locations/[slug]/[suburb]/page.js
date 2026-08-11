// app/locations/[slug]/[suburb]/page.js

import { notFound } from 'next/navigation';
import {
  getLocationContent,
  generateSuburbStaticParams,
  suburbExistsUnderParent,
} from '@/utils/locationContent';
import LocationPage from '@/components/local-pages/LocationPage';

export async function generateStaticParams() {
  return generateSuburbStaticParams();
}

export async function generateMetadata({ params }) {
  const { slug, suburb } = await params;

  if (!suburbExistsUnderParent(slug, suburb)) {
    return {
      title: 'Location Not Found - GDC Group',
    };
  }

  const locationData = getLocationContent(suburb);

  return {
    title: `${locationData.title} - GDC Group`,
    description: locationData.metaDescription || locationData.description,
    keywords: `engineering, architectural services, ${locationData.title || suburb}, GDC Group`,
    alternates: {
      canonical: `https://gdcgroup.co.nz/locations/${slug}/${suburb}`,
    },
  };
}

export default async function SuburbLocationRoute({ params }) {
  const { slug, suburb } = await params;

  if (!suburbExistsUnderParent(slug, suburb)) {
    notFound();
  }

  const locationData = getLocationContent(suburb);

  return <LocationPage locationData={locationData} />;
}
