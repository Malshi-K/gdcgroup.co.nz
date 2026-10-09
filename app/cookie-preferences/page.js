import { SITE_URL } from "@/lib/siteConfig";
// app/cookie-preferences/page.js
// This is a Server Component that handles metadata

import CookiePreferencesClient from '@/components/cookie/CookiePreferencesClient';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Cookie Preferences | GDC Group",
  description: "Manage your cookie preferences for the GDC Group website, including analytics and marketing cookies, and update your consent at any time.",
  keywords:
    "GDC Group cookie preferences, cookie consent, analytics cookies, marketing cookies, New Zealand engineering consultants",
  
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