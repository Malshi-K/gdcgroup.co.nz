import { SITE_NAME, SITE_URL } from "@/lib/siteConfig";
// 1. page.js (Server Component)
import ReviewHeader from "@/components/about/ReviewHeader";
import ReviewForm from "@/components/about/ReviewForm";
import "@/app/globals.css";

export const generateMetadata = async () => {
  return {
    metadataBase: new URL(SITE_URL),
    title: "Share Your Experience | GDC Group Review",
    description:
      "Share your experience with GDC Group. We value your feedback to help us improve our services in architecture, engineering, and project management across New Zealand.",
    keywords:
      "GDC reviews, engineering consultant reviews, client feedback, architecture reviews, New Zealand engineering services, project management feedback",
    openGraph: {
      title: "Share Your Experience | GDC Group Review",
      description:
        "Help us improve our engineering and architectural services by sharing your valuable feedback.",
      type: "website",
      url: "https://gdcgroup.co.nz/about-us/review",
      siteName: SITE_NAME,
      locale: "en_NZ",
    },

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
      canonical: "https://gdcgroup.co.nz/about-us/review",
      languages: {
        "en-NZ": "https://gdcgroup.co.nz/about-us/review",
        en: "https://gdcgroup.co.nz/about-us/review",
      },
    },
  };
};

export default function ReviewPage() {
  return (
    <>
      <ReviewHeader />
      <ReviewForm />
    </>
  );
}
