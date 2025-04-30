// app/cookie-preferences/page.js
// This is a Server Component that handles metadata

import CookiePreferencesClient from '@/components/cookie/CookiePreferencesClient';

export const metadata = {
  title: "Cookie Preferences | GDC Group",
  description: "Manage your cookie preferences for GDC Group website",
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
    canonical: "https://gdcgroup.co.nz/cookie-preferences",
    languages: {
      "en-NZ": "https://gdcgroup.co.nz/cookie-preferences",
      en: "https://gdcgroup.co.nz/cookie-preferences",
    },
  },
};

export default function CookiePreferencesPage() {
  return <CookiePreferencesClient />;
}